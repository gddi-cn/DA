import { useEffect, useState } from 'react'
import { Cascader } from 'antd';
import api from '@api'
import './SelectDevice.module.less'
import { isNil, isEmpty } from 'lodash';

import { CaretDownOutlined } from '@ant-design/icons'

const defaultTypes = ['Mobile', 'Edge', 'Terminal']

const SelectDevice = (props: any): JSX.Element => {
  console.log(props)
  const { onChange, showTypes, value } = props
  const [options, setOptions] = useState<any>([])

  useEffect(() => {
    const ishow = (type:string) => {
      let types = []
      if (isNil(showTypes)) {
        types = defaultTypes
      } else {
        types = showTypes
      }
      return types.find((o:any) => o === type)
    }
    const fn = async () => {
      try {
        const res = await api.get('/v3/device/types')
        if (res.code === 0) {
          const { items } = res?.data
          if (isNil(items)) {
            setOptions([])
          } else {
            const mlist = items.filter((o: any) => o.type === 'Mobile').map((o: any) => {
              return {
                value: o.key,
                label: o.name,
              }
            })

            const elist = items.filter((o: any) => o.type === 'Edge').map((o: any) => {
              return {
                value: o.key,
                label: o.name,
              }
            })

            const tlist = items.filter((o: any) => o.type === 'Terminal').map((o: any) => {
              return {
                value: o.key,
                label: o.name,
              }
            })
            const list = [

            ]
            if (ishow('Mobile')) {
              list.push({
                value: 'Mobile',
                label: '移动端',
                disabled: isEmpty(mlist),
                children: mlist
              })
            }
            if (ishow('Terminal')) {
              list.push({
                value: 'Terminal',
                label: '终端',
                disabled: isEmpty(tlist),
                children: tlist
              })
            }
            if (ishow('Edge')) {
              list.push({
                value: 'Edge',
                label: '边缘端',
                disabled: isEmpty(elist),
                children: elist
              })
            }
            setOptions(list)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    fn()
  }, [showTypes])

  const handleTypeChange = (v:any) => {
    console.log(v, 999)
    onChange && onChange(v)
  }
  function filter (inputValue:any, path:any) {
    return path.some((option:any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  return (
    <div styleName='SelectDevice'>
      <Cascader
        getPopupContainer={triggerNode => triggerNode.parentNode}
        options={options}
        onChange={handleTypeChange}
        placeholder="请选择类型"
        showSearch={{ filter }}
        allowClear
        value={value}
        suffixIcon={<CaretDownOutlined/>}
      />

    </div>
  )
}

export default SelectDevice
