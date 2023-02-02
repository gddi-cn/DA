// import { message } from 'antd';

import S3 from 'aws-sdk/clients/s3';
import api from '@api'
import path from 'path';
import { debounce, isEmpty, isNil } from 'lodash'

const AWS = require('aws-sdk/lib/core');
const byteLength = AWS.util.string.byteLength;

interface InitConfig {
    accessKeyId: string,
    secretAccessKey: string,
    // bucket: 'test',
    endpoint: string,
    region: string,
    sslEnabled: boolean,
    s3ForcePathStyle: boolean
}
/**
 *
 * 这个东西很多方法也是基于aws的工具的，不懂就看s3源码，node_module里面有。有问题就找小胖哥，他是大佬
 *
 */
export default class S3Uploader {
  service: any = null;
  options: any = {

  };

  // defaultInitConfig = {
  //   accessKeyId: 'HCIYFRUYM897VE1PUG47',
  //   secretAccessKey: 'krjFd3Tdhx2XcX0psfVJWfr0jkrfNKpEj40AsLDD',
  //   // bucket: 'test',
  //   endpoint: 's3.local.cdn.desauto.net',
  //   region: 'ceph',
  //   sslEnabled: false,
  //   s3ForcePathStyle: true
  // }

  callback: any = () => undefined
  // 文件
  body: any = null;

  // 总大小
  totalBytes: any;

  // 切片大小，如果大于10000W就按1W来切
  partSize = 1024 * 1024 * 15;

  maxTotalParts = 1000;

  // 最小的
  // minPartSize = 1024 * 1024 * 5;

  // 二进制类型的切片函数
  sliceFn: any;

  // 上传ID
  UploadId: any
  // 是否全部切了
  isDoneChunking = false;

  numParts = 0
  // 活跃的部分
  activeParts = 0

  // 当前允许并发的队列
  queueSize = 4

  // 切片的位置
  partPos = 0

  // 总的片
  totalPartNumbers = 0

  failed = false

  // 完成的信息，就是Etag
  completeInfo: any[] = []

  // 上传的list
  parts: any = {}
  // 完成的
  doneParts = 0;
  // 每个接口需要的参数一样的
  serviceParams: any = {}
  // 保存
  saveParams: any = {}
  // 进度相关的
  totalUploadedBytes = 0

  _lastUploadedBytes = 0

  // 上传进度回调
  processCallback: any

  fileHash: any

  filename: any = ''

  fileSize: number = 0

  debounced: any

  constructor (config: InitConfig) {
    // s3实例

    this.bindServiceObject({ ...config });
  }

  //  总大小和判定一下是否超过10000个片，有的话最大就是一万
  private adjustTotalBytes = () => {
    try {
      this.totalBytes = byteLength(this.body);
    } catch (e) { }

    if (this.totalBytes) {
      const newPartSize = Math.ceil(this.totalBytes / this.maxTotalParts);
      if (newPartSize > this.partSize) this.partSize = newPartSize;
    } else {
      this.totalBytes = undefined;
    }
  }

  // 初始化这个东西
  private bindServiceObject = (config: InitConfig) => {
    this.service = new S3(config)
  }

  // 检测并且buffer
  private validateBody = (Body: any) => {
    this.body = Body
    // 如果是大的字符串也可以转buffer切切切
    if (typeof this.body === 'string') {
      this.body = AWS.util.buffer.toBuffer(this.body);
    } else if (!this.body) {
      throw new Error('请传个BODY');
    }
    this.sliceFn = AWS.util.arraySliceFn(this.body);
  }

  // TS类型哪个大佬看着不爽就补一下吧，我也不知道怎么写这个兼容类型
  private arraySliceFn = (obj: any) => {
    const fn = obj.slice || obj.webkitSlice || obj.mozSlice;
    return typeof fn === 'function' ? fn : null;
  }

  // configure = () => {
  //   this.validateBody();
  //   this.adjustTotalBytes();
  // }

  // 创建上传的UPLOADID
  public create = async (params: any) => {
    const { Body } = params
    // 这个可以wasm优化、但是也要考虑兼容问题
    this.fileHash = await this.fileMd5(Body)
    console.log(this.fileHash, 'this.fileHash')
    this.filename = Body.name
    this.fileSize = Body.size

    // 添加KEY，，然后还给张宇key加个后缀。后面谁维护谁找张宇，别问。
    this.saveParams = { ...params, Key: this.fileHash + new Date().valueOf() + '.' + path.extname(this.filename).substr(1) }
    this.validateBody(Body)
    this.adjustTotalBytes()
    const { Bucket, Key } = this.saveParams
    this.serviceParams = { Bucket, Key }
    this.processCallback = params?.processCallback
    // 防抖这个B
    this.debounced = debounce(this.processCallback, 1000, { maxWait: 1200 });
    this.callback = params?.callback || function (err: any) { if (err) throw err; };
    // 然后生成ID
    const hashRes = await api.get(`/v2/storage/s3/sessions/${this.fileHash}`)

    const createRes: any = await new Promise((resolve, reject) => {
      if (hashRes.code === 0) {
        const UploadId = hashRes?.data?.data?.UploadId

        resolve({
          UploadId, hasUploadParts: true
        })
      } else {
        const { Key, Bucket, ACL } = this.saveParams
        this.service.createMultipartUpload({ Key, Bucket, ACL }, async (err: any, data: any) => {
          if (err) {
            console.log(err, err.stack); // an error occurred
            reject(err)
          } else {
            await api.post('/v2/storage/s3/sessions', {
              hash: this.fileHash,
              data: {
                UploadId: data?.UploadId
              }
            })
            resolve({
              ...data,
              hasUploadParts: false
            })
          }
        });
      }
    })
    //
    if (createRes?.UploadId) {
      // 保存ID
      this.UploadId = createRes?.UploadId
      this.serviceParams.UploadId = createRes?.UploadId

      return createRes
    } else {
      throw new Error('生成任务失败')
    }
  }

  // 点击发车，开始切片next chunk
  public send = () => {
    this.fillBuffer()
  }

  private deleteUploadId = async () => {
    await api.delete(`/v2/storage/s3/sessions/${this.fileHash}`)
    // console.log('deleteUploadId')
  }

  // 点击取消上传 取消完回调在业务上删除这个任务
  public cansel = () => {
    this.cleanup(AWS.util.error(new Error('canselByUser'), {
      code: 'ETagMissing', retryable: false
    }))

    return new Promise((resolve, reject) => {
      this.service.abortMultipartUpload(this.serviceParams, async (err: any, data: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
          await this.deleteUploadId()
        }
      })
    })
  }

  // 直接暂停就完事了
  public pause = () => {
    this.cleanup(AWS.util.error(new Error('pause'), {
      code: 'ETagMissing', retryable: false
    }))
  }

  /**
     *
     * @param params 需要上传ID去查询，然后再切片再队列上传，淦
     * @param callBack 这个回调保留吧
     */
  continueOrRetry = async () => {
    /**
      * 这个切片是个问题阿，不会存在中间没切的吧，感觉也不会，反正跪了的话就都GG了
      */
    const listPartsRes: any = await this.listParts()
    // console.log(listPartsRes, 'resres')

    const { Parts } = listPartsRes
    // 没有就当是新的
    if (isNil(Parts) || isEmpty(Parts)) {
      await this.deleteUploadId()
      delete this.saveParams.UploadId
      await this.create(this.saveParams)
      this.fillBuffer()
    } else {
      // 最后一小部分问题是不够一小块的，刚好到这里断掉就会出大问题，会一直上传不了，就直接从前面一节重新开始
      const len = (Parts.length * this.partSize) > this.totalBytes ? Parts.length - 2 : Parts.length
      // 上次传到的位置就跪下来了
      const index = len
      // 替换上传完成的信息
      this.completeInfo = Parts
      // 认定为当前位置
      this.totalPartNumbers = this.doneParts = index
      // 认定为当前上传进度
      this.partPos = this.totalUploadedBytes = this.partSize * len

      this.failed = false;

      this.isDoneChunking = false
      // 继续搞buffer
      this.fillBuffer();
    }
  }

  private listParts = () => {
    return new Promise((resolve) => {
      this.service.listParts(this.serviceParams, (err: any, data: any) => {
        if (err) {
          this.callback(AWS.util.error(new Error('获取上传列表失败'), {
            code: 'ETagMissing', retryable: false
          }));
          resolve({})
        } else {
          resolve(data)
        }
      })
    })
  }

  // 文件MD5，去找有没有这个辣鸡上传ID，有的话就变秒传，没有就是直接create。然后把ID发给后端，就算发失败也无所谓，反正后端的锅不影响上传就行了

  fileMd5 = (file: File) => {
    return new Promise(function (resolve, reject) {
      AWS.util.crypto.md5(file, 'binary', (err: any, hash: any) => {
        if (err) {
          console.log(err)
          reject(err)
          return
        }

        resolve(AWS.util.crypto.toHex(hash))
      })
    })
  }

  // 切片并且上传，这是文件完全不存在的时候的做法
  private fillBuffer = () => {
    const bodyLen = byteLength(this.body);
    console.warn(bodyLen, this.partPos)
    if (bodyLen === 0) {
      this.isDoneChunking = true;
      this.numParts = 1;
      this.nextChunk(this.body);

      return;
    }

    while (this.activeParts < this.queueSize && this.partPos < bodyLen) {
      const endPos = Math.min(this.partPos + this.partSize, bodyLen);
      const buf = this.sliceFn.call(this.body, this.partPos, endPos);
      this.partPos += this.partSize;

      if (byteLength(buf) < this.partSize || this.partPos === bodyLen) {
        this.isDoneChunking = true;
        this.numParts = this.totalPartNumbers + 1;
      }

      this.nextChunk(buf)
    }
  }

  private nextChunk = (chunk: any) => {
    if (this.failed) return null;
    this.activeParts++;
    const partNumber = ++this.totalPartNumbers;

    this.uploadPart(chunk, partNumber);
  }

  private uploadPart = (chunk: any, partNumber: number) => {
    const partParams = {
      Body: chunk,
      ContentLength: AWS.util.string.byteLength(chunk),
      PartNumber: partNumber,
      UploadId: this.UploadId,
      ...this.serviceParams
    };

    const partInfo = { ETag: null, PartNumber: partNumber };

    this.completeInfo[partNumber] = partInfo;

    const req = this.service.uploadPart(partParams);

    this.parts[partNumber] = req;

    req._lastUploadedBytes = 0;
    const lastUploadedBytes = {
      value: 0
    }
    req.on('httpUploadProgress', (info: any) => this.progress(info, lastUploadedBytes));
    req.send((err: any, data: any) => {
      delete this.parts[partParams.PartNumber];
      this.activeParts--;

      if (!err && (!data || !data.ETag)) {
        let message = 'No access to ETag property on response.';
        if (AWS.util.isBrowser()) {
          message += ' Check CORS configuration to expose ETag header.';
        }

        err = AWS.util.error(new Error(message), {
          code: 'ETagMissing', retryable: false
        });
      }
      if (err) return this.cleanup(err);
      // prevent sending part being returned twice (https://github.com/aws/aws-sdk-js/issues/2304)
      if (this.completeInfo[partNumber] && this.completeInfo[partNumber].ETag !== null) return null;
      partInfo.ETag = data.ETag;
      // 当前完成的分片
      this.doneParts++;
      // 切完的最后一块等于当前完成的
      // console.log(this.isDoneChunking && this.doneParts === this.numParts, 'this.isDoneChunking && this.doneParts === this.numParts')
      if (this.isDoneChunking && this.doneParts === this.numParts) {
        this.finishMultiPart();
      } else {
        // 没完事就继续

        this.fillBuffer();
      }
    });
  }

  private finishMultiPart = () => {
    const completeParams = {
      UploadId: this.UploadId,
      MultipartUpload: {
        Parts: this.completeInfo.map((o: any) => {
          const { PartNumber, ETag } = o
          return { PartNumber, ETag }
        })
      },
      ...this.serviceParams
    };

    this.service.completeMultipartUpload(completeParams, (err: any, data: any) => {
      if (err) {
        this.cleanup(err);
        this.deleteUploadId()
        this.callback(err, {

        });
        return
        // 失败了要不要重新搞？还是直接重新上传是个问题
      }

      if (data && typeof data.Location === 'string') {
        data.Location = data.Location.replace(/%2F/g, '/');
        this.deleteUploadId()
      }

      this.callback(err, {
        ...data,
        key: this.serviceParams.Key,
        filename: this.filename,
        size: this.fileSize,
        bucket: this.serviceParams.Bucket,
        hash: this.fileHash
      });
    });
  }

  private progress = (info: any, lastUploadedBytes: any) => {
    this.totalUploadedBytes += info.loaded - lastUploadedBytes.value;
    lastUploadedBytes.value = info.loaded;
    info = {
      loaded: this.totalUploadedBytes,
      total: this.totalBytes,
      // part: this.params.PartNumber,
      // key: this.params.Key
    };

    this.debounced({
      percent: (info.loaded / info.total * 100).toFixed(1),
      ...info
    })
  }

  private cleanup = (err: any) => {
    if (this.failed) return;

    // if (self.service.config.params.UploadId && !self.leavePartsOnError) {
    //   self.service.abortMultipartUpload().send();
    // } else if (self.leavePartsOnError) {
    //   self.isDoneChunking = false;
    // }

    AWS.util.each(this.parts, function (partNumber: number, part: any) {
      part.removeAllListeners('complete');
      part.abort();
    });

    this.activeParts = 0;
    this.partPos = 0;
    this.numParts = 0;
    this.totalPartNumbers = 0;
    this.parts = {};
    this.failed = true;
    this.completeInfo = []
    this.callback(err);
  }
}
