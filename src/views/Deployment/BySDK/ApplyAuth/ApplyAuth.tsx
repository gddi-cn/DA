import { Select, message } from 'antd';
import { GSelect, GButton } from '@src/UIComponents'
import { useEffect, useState, useCallback, useRef } from 'react'
import api from '@api'
import DeviceGridTable from './DeviceGridTable'
import { isNil, isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import { RootState } from '@reducer/index'
import './ApplyAuth.module.less'

const { Option } = Select;

type OptionsT = Array<any>

const optionsList: OptionsT = [
  { label: '移动端', value: 'Mobile' },
  { label: '边缘端', value: 'Edge' },
  { label: '终端', value: 'Terminal' }
]

const ApplyAuth = (): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<Array<any>>([])
  const [dataSource, setDataSource] = useState<Array<any>>([])
  const [currentKey, setCurrentKey] = useState<string>('Edge')
  const [selected, setSelected] = useState<any>({})

  const [selectKeys, setSelectKeys] = useState<any[]>([])

  const previousId = useRef<undefined | '' | number>(undefined)

  const params = useRef({
    page: 1,
    page_size: 1000,

    name: '',

  })

  const model_iter_id = useSelector((state: RootState) => {
    // return '342463664469155840'
    if (state.tasksSilce.activePipeLine) {
      return state.tasksSilce.activePipeLine.APP_MODEL_TRAIN_DETAIL?.version_id
    }
    return ''
  })

  const resSet = () => {
    setSelected({})
    setDataSource([])
  }

  useEffect(
    () => {
      const fn = async () => {
        try {
          setLoading(true)
          const res = await api.get('/v3/devicegroups', {
            params: { page: 1, type: currentKey, page_size: 1000 }
          })
          if (res.code === 0) {
            const { items } = res.data
            setOptions(items || [])
          } else {
            message.error(res?.message)
          }
        } catch (e) {

        } finally {
          setLoading(false)
        }
      }
      fn()
    }, [currentKey]
  )

  const fetchFn = useCallback(
    async () => {
      // 如果不等于上一个selected,init参数

      if (isNil(selected) || isEmpty(selected)) {
        setDataSource([])
        return
      }
      const { group_id } = selected
      if (previousId.current !== group_id) {
        previousId.current = group_id
        params.current = Object.assign(params.current, {
          page: 1,

        })
      }
      try {
        setLoading(true);
        const res = await api.get(`/v3/devicegroups/${group_id}/devices`, { params: { ...params.current, model_iter_id: model_iter_id } })
        if (res.code === 0) {
          const { total, items } = res.data
          if (total > 0 && isNil(items)) {
            params.current = Object.assign(params.current, {
              page: --params.current.page,

            })
            fetchFn()
          } else {
            setDataSource(items || [])
            setLoading(false)
          }
        }
      } catch (e) {
        console.log(e, 111)
        setLoading(false)
      }
    }, [model_iter_id, selected]
  )

  useEffect(() => {
    fetchFn()
  }, [fetchFn])

  const handleSelectGroup = (v: any) => {
    setSelected({ group_id: v })
  }

  const handleTypeChange = (v: string) => {
    resSet()
    setCurrentKey(v)
  }

  const handleAuthClick = async () => {
    const id = '370711229819887616'
    try {
      const res = await api.post(`/v3/models/${id}/versions/${model_iter_id}/download/apply`, { apply_type: 1, device_ids: selectKeys })
      if (res.code === 0) {
        message.success(res?.message)
        fetchFn()
      } else {
        message.error(res?.message)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setSelectKeys([])
    }
  }
  return (
    <div styleName='ApplyAuth'>
      <div className='params_select_header'>
        <GSelect value={currentKey} onChange={handleTypeChange}>
          {
            optionsList.map((o, i) => {
              return (
                <Option key={i} value={o.value}>{o.label}</Option>
              )
            })
          }

        </GSelect>
        <GSelect
          showSearch
          filterOption={(input, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={handleSelectGroup}
          value={selected?.group_id}
        >
          {
            options.map((o: any, i: number) => {
              return (
                <Option key={i} value={o.id}>{o.name}</Option>
              )
            })
          }

        </GSelect>
      </div>
      <div className='device_table'>
        <DeviceGridTable dataSource={dataSource} loading={loading} onChange={setSelectKeys}/>
      </div>
      <div className='summit_wrap'>
        <GButton className='btn' type='primary' onClick={handleAuthClick}>申请授权</GButton>
      </div>
    </div>
  )
}

export default ApplyAuth
