
import { useRef, useEffect } from 'react'
import * as echarts from 'echarts'
import './GEcharts.module.less'

const GEcharts = (props: any): JSX.Element => {
  const { options, className, propsRef } = props

  const chartNode = useRef<HTMLDivElement | HTMLCanvasElement | any>(null)
  const myCharts = useRef(null);

  useEffect(() => {
    const { current: node } = chartNode;

    if (!node) {
      return;
    }
    // 第一次
    if (!myCharts.current) {
      (myCharts.current as any) = echarts.init(node);
    }

    // options数据更新
    (myCharts.current as any).setOption(options, true);

    window.addEventListener('resize', function () {
      (myCharts.current as any).resize();
    })
  }, [options]);

  return (

    <div
      className={`GEcharts ${className}`}
      ref={propsRef || chartNode}
    />

  )
}

export default GEcharts
