import React from 'react'
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts'

export interface ChartProps {
  value: number
  total: number
  name: string
  unit: string
  infinity?: boolean
  bgcolor?: React.CSSProperties['backgroundColor']
  activeBgcolor?: React.CSSProperties['backgroundColor']
}

const Chart: React.FC<ChartProps> = (
  {
    value,
    total,
    name,
    unit,
    infinity = false,
    bgcolor = '#97caec',
    activeBgcolor = '#48a2df',
  }
) => {
  const percent = infinity ? 0 : Math.floor(((value / total) * 100))
  const statistics = `${value} / ${infinity ? '无限制' : total} ${unit}`

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RadialBarChart
        cx='50%' cy='50%'
        innerRadius='95%'
        outerRadius='95%'
        barSize={15}
        data={[{
          name,
          value: infinity ? 0 : value,
        }]}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type='number'
          domain={[0, total]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background={{ fill: bgcolor }}
          dataKey='value'
          cornerRadius='50%'
          fill={activeBgcolor}
        />
        <text
          x='50%'
          y='40%'
          dominantBaseline='middle'
          textAnchor='middle'
          style={{
            fontSize: '35px',
            fontWeight: 600,
            fill: activeBgcolor,
          }}
        >
          {percent}%
        </text>
        <text
          x='50%'
          y='56%'
          dominantBaseline='middle'
          textAnchor='middle'
          style={{
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          {name}
        </text>
        <text
          x='50%'
          y='70%'
          dominantBaseline='middle'
          textAnchor='middle'
          style={{
            fontSize: '12px',
            fontWeight: 400,
            fill: activeBgcolor,
          }}
        >
          {statistics}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export default Chart
