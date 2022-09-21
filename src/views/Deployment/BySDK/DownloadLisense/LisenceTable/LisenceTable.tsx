import { SmallButton } from '@src/UIComponents';
import { Table, Tag, Spin, Modal } from 'antd';
import moment from 'moment';
import api from '@api'
import { useState, useRef, useMemo } from 'react';
import './LisenceTable.module.less'
interface DownLoadBtnProps {
    id?: string,
    model_id?: string,
    model_iter_id?: string
}
const DownLoadBtn = (props: DownLoadBtnProps) => {
  const { id: license_id, model_id, model_iter_id } = props
  const [loading, setloading] = useState(false)

  const [progress, setProgress] = useState<any>(0)
  const timeRef = useRef<any>({
    pre: 0,
    next: 0,
    preLoad: 0,
    nextLoad: 0
  });
  const onprogress = (event: any) => {
    console.log(event, 'event')
    const tmp = event.loaded / event.total * 100

    const pre = timeRef.current.pre
    const preLoad = timeRef.current.preLoad

    timeRef.current = {
      pre: pre,
      next: new Date().valueOf() / 1000,
      preLoad: preLoad,
      nextLoad: event.loaded
    }
    setProgress(tmp.toFixed(0))
  };

  const handleDownClick = (cusFileName?: string) => {
    function downLoad (data: any, filename: string) {
      const url = URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }));

      downloadAs(url, filename);
      URL.revokeObjectURL(url);

      function downloadAs (url: any, fileName: any) {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.target = '_blank'

        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    }

    const fn = async () => {
      setloading(true)
      try {
        const res = await api.get(`/v3/models/${model_id}/versions/${model_iter_id}/license/${license_id}`, { responseType: 'blob', onDownloadProgress: onprogress })

        downLoad(res, cusFileName || 'model.gem')
        setloading(false)
      } catch (e) {
        setloading(false)
      }
    }
    fn()
  }
  if (loading) {
    return (
      <Spin spinning={loading} tip={`${progress}%`}></Spin>
    )
  }
  return (

    <SmallButton type='primary' onClick={() => handleDownClick()}>
            下载
    </SmallButton>

  )
}

const DevicesModalView = (props:any) => {
  const { devices } = props
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns: any[] = useMemo(() => {
    return [

      {
        title: '设备名',
        dataIndex: 'name',
        render (name: string) {
          return name
        },
        ellipsis: true,
      },
      {
        title: '设备SN',
        dataIndex: 'sn',
        ellipsis: true,
        render (sn: string) {
          return sn
        },
      },
      {
        title: '类型',
        dataIndex: 'type',
        ellipsis: true,
      },

      // {
      //   label: '操作',

      // },
    ]
  }, [])
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <span className='look_over_some_shit' onClick={showModal}>查看设备列表</span>
      <Modal title="设备列表" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} destroyOnClose={true} getContainer={false}>
        <Table
          dataSource={devices || []}
          columns={columns}
          pagination={false}
        />
      </Modal>
    </div>
  )
}

const LisenceTable = (props: any): JSX.Element => {
  const { dataSource, model_id, model_iter_id } = props
  const columns: any[] = useMemo(() => {
    return [

      {
        title: '创建时间',
        dataIndex: 'created',
        render (created: number) {
          const time = moment(created * 1000).format('YYYY-MM-DD hh:mm:ss')
          return time
        },
        ellipsis: true,
      },
      {
        title: '有效期',
        dataIndex: 'expire',
        ellipsis: true,
        render (expire: number) {
          const time = expire + '天'
          return time
        },
      },
      {
        title: '设备数量',
        dataIndex: 'quantity',
        ellipsis: true,
      },
      {
        ellipsis: true,
        title: '设备列表',
        dataIndex: 'devices',
        render (devices: any[]) {
          console.log(devices)
          return (
            <DevicesModalView devices={devices}/>
          )
        }
      },
      {
        ellipsis: true,
        title: '授权状态',
        dataIndex: 'status',
        render (status: number) {
          // 1 - 审核中
          // 2 - 通过
          // 3 - 拒绝
          const text: any = {
            1: '审核中',
            2: '通过',
            3: '拒绝'
          }
          const color: any = {
            1: '#FAD514',
            2: '#2EC16B',
            3: '#FF6177'
          }
          return (
            <Tag color={color[status] || 'magenta'}>
              {
                text[status] || '未知'
              }
            </Tag>
          )
        },
      },
      {
        title: '操作',
        render (devices: any[], record: any) {
          console.log(record)
          const { status, id } = record

          if (status === 2) {
            return (
              <DownLoadBtn id={id} model_id={model_id} model_iter_id={model_iter_id} />
            )
          }
          return (
            <div>-</div>
          )
        }
      },
      // {
      //   label: '操作',

      // },
    ]
  }, [model_id, model_iter_id])

  return (
    <div styleName='LisenceTable'>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  )
}

export default LisenceTable
