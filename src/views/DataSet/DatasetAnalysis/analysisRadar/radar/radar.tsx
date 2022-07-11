import { FC, useEffect, useCallback, useRef, useState } from 'react';
import * as echarts from 'echarts'
import { getOptions } from './options'
import Details from '../details'
import './radar.module.less'
import { isEmpty } from 'lodash';

interface IProps {
  dataList: any,
  formatData?:any,
  hasDetails?:boolean,
  handleClickRadar?:(o:any)=>any
}

// 这个算是公用组件了吧。不过懒得迁移了

const EchartsRadarComponent:FC<IProps> = (props): JSX.Element => {
  const { dataList = [], formatData, hasDetails = true, handleClickRadar } = props
  console.log(dataList, 'dataListdataList')
  const EchartsRefs = useRef<any>(null)
  const indicatorArr = useRef<any>([])
  const dataArr = useRef<any>([])
  const richArr = useRef<any>({})
  const radarChart = useRef<any>(null)
  const [initChart, setinitChart] = useState(false)
  const imgObj: any = {}

  const [disPlayData, setdisPlayData] = useState<any>({})

  const radarPart = useCallback(() => {
    const radarOption = getOptions({
      indicatorArr: indicatorArr.current,
      richArr: richArr.current,
      dataArr: dataArr.current,
      formatter: function (value: any, params: any) {
        let text = ''
        if ((params.name) === (indicatorArr.current as Array<any>)[0].name) {
          text = `{bg|${value}}`
        } else {
          text = `{value|${value}}`
        }
        return text
      }
    })
    console.log(radarOption, 'radarOption')
    radarChart.current.setOption(radarOption);
  }, [])

  useEffect(() => {
    if (!initChart) {
      return
    }
    const updateFn = (obj: any) => {
      const radarOption = getOptions({
        indicatorArr: indicatorArr.current,
        richArr: richArr.current,
        dataArr: dataArr.current,
        formatter: function (value: any, params: any) {
          let text = ''
          if (obj.name.includes(params.name)) {
            text = `{bg|${value}}`
          } else {
            text = `{value|${value}}`
          }

          return text
        },
      })
      radarChart.current.setOption(radarOption);
      const data = (indicatorArr.current as Array<any>).filter((o: any) => obj.name.includes(o.name))[0]
      setdisPlayData(data)
    }

    radarChart.current.on('mousemove', function (obj: any) {
      const { componentType } = obj
      if (componentType === 'series' || handleClickRadar) {
        return
      }
      updateFn(obj)
    });

    radarChart.current.on('click', function (params: any) {
      console.log('click', params)
      const { componentType } = params
      if (componentType === 'series') {
        return
      }
      if (handleClickRadar) {
        updateFn(params)
      }
      handleClickRadar && handleClickRadar(params)
    });
  }, [handleClickRadar, initChart])

  useEffect(() => {
    if (EchartsRefs.current) {
      radarChart.current = echarts.init(EchartsRefs.current);
      window.addEventListener('resize', function () {
        (radarChart.current as any).resize();
      })

      radarChart.current.setOption(getOptions());
    }

    // 有毒的hooks，这也能给老子更新，usememo都不顶使。不过数据也的确存在，就很烦，也可以从父组件离开时清理。
    const init = () => {
      indicatorArr.current = []
      dataArr.current = []
      richArr.current = []
    }

    init()

    if (!isEmpty(dataList)) {
      // 也可以自己定义数据展示方式，默认是这
      if (formatData) {
        formatData({
          dataList, indicatorArr, dataArr, richArr, setdisPlayData
        })
      } else {
        dataList.map((item: any) => {
          imgObj[item.sign] = item?.img?.input
          indicatorArr.current.push({ name: item.label, value: item.value, img: item?.img, sign: item.sign, max: 100, min: -1, text: JSON.stringify(item) })
          dataArr.current.push(item.value)
          return item
        })
        indicatorArr.current.map((item: any, index: number) => {
          const obj = {
            backgroundColor: {
              image: imgObj[item.sign]
            },
            align: 'left',
            height: 35,
            width: 35,
            padding: [0, 0, 0, 0],

          }
          richArr.current[index] = obj
          return item
        })
        const initData = (indicatorArr.current as Array<any>)[0]
        setdisPlayData(initData)
        richArr.current.value = {
          width: 80,
          height: 35,
          lineHeight: 35,
          color: '#48A2DF',
          align: 'center',
          backgroundColor: 'transparent',
        }

        richArr.current.bg = {
          width: 80,
          height: 35,
          lineHeight: 35,
          color: '#48A2DF',
          align: 'center',
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#48A2DF',
        }
      }
      setinitChart(true)
      radarPart()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radarPart, dataList])

  return (
    <div styleName='EchartsRadarComponent-echart'>

      <div className='idname'>
        <div id='idname' ref={EchartsRefs} className='r-canvas' />
        {
          isEmpty(disPlayData) ? (
            <div className='rotate'>
              <div className='pointer' style={{ width: window.innerHeight * 0.36, height: window.innerHeight * 0.36 }} />
            </div>
          ) : null
        }
      </div>
      {
        hasDetails ? (
          <div className='left'>
            <div className='details'>
              <Details disPlayData={disPlayData} />
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default EchartsRadarComponent
