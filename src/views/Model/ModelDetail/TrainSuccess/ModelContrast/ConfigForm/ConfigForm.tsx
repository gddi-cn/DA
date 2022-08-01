import { ReactCusScrollBar, ModelOpreationTitle, GSelect } from '@src/UIComponents'
import { Form, Select } from 'antd'
import { useEffect } from 'react';

import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import './ConfigForm.module.less'

const { Option } = Select;

const children: React.ReactNode[] = [];
for (let i = 1; i <= 100; i++) {
  children.push(<Option key={i} value={i}>{i / 100}</Option>);
}

const ConfigForm = (props:any): JSX.Element => {
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })

  const { versionListSet, setFilterParams } = props
  const {
    dataset_list,
    modelVersions,
  } = versionListSet

  const [form] = Form.useForm()

  useEffect(() => {
    // 默认
    const best_threshold = versionInfo.iter.result?.best_threshold
    const best = best_threshold * 100
    form.setFieldsValue({
      dataset_version: dataset_list[0]?.dataset_id,
      config_type: 'version',
      thres_s: best
    })
  }, [form, dataset_list, modelVersions, versionInfo])

  const handleOnValuesChange = (c_values:any, allValues:any) => {
    // console.log(c_values, allValues)

    const best_threshold = versionInfo.iter.result?.best_threshold
    const best = best_threshold * 100
    if (c_values.dataset_version) {
      form.setFieldsValue({
        config_type: 'version',
        thres_s: best
      })

      const { dataset_version, config_type } = allValues
      const params = {
        thres_s: best,
        version_m: [],
        dataset_version,
        config_type
      }
      setFilterParams(params)
      return
    }

    if (c_values.config_type) {
      if (c_values.config_type === 'version') {
        form.setFieldsValue({
          version_m: [],
          thres_s: best
        })
        const { dataset_version, config_type } = allValues
        const params = {
          thres_s: best,
          version_m: [],
          dataset_version,
          config_type
        }
        setFilterParams(params)
      } else {
        form.setFieldsValue({
          thres_m: [best],
          version_s: modelVersions[0]?.tag
        })

        const { dataset_version, config_type } = allValues
        const params = {
          thres_m: [best],
          version_s: modelVersions[0]?.tag,
          dataset_version,
          config_type
        }
        setFilterParams(params)
      }

      return
    }
    setFilterParams(allValues)
  }
  return (
    <div styleName='ConfigForm'>
      <ReactCusScrollBar id='ReactCusScrollBar'>

        <div className='ConfigForm_wrap'>
          <Form
            name="basic"
            form={form}
            autoComplete="off"
            onValuesChange={handleOnValuesChange}
          >
            <div className='forecast_paramas_block'>

              <ModelOpreationTitle text="基准选择"></ModelOpreationTitle>
              <Form.Item

                name="dataset_version"

              >
                <GSelect style={{ width: '100%' }}>
                  {
                    dataset_list.map((o:any) => {
                      return (
                        <Option value={o.dataset_id} key={o.dataset_id}>{o.name}</Option>
                      )
                    })
                  }
                </GSelect>
              </Form.Item>
            </div>
            <div className='forecast_paramas_block'>

              <ModelOpreationTitle text="模型对比维度"></ModelOpreationTitle>
              <Form.Item

                name="config_type"

              >
                <GSelect style={{ width: '100%' }}>
                  <Option value="version">模型版本</Option>
                  <Option value="threshold">阈值</Option>
                </GSelect>
              </Form.Item>
            </div>
            <div className='forecast_paramas_block'>
              <ModelOpreationTitle text="参数选择"></ModelOpreationTitle>
              <Form.Item dependencies={['config_type']} noStyle>
                {({ getFieldValue }) => {
                  const type = getFieldValue('config_type')
                  console.log(type, 'typetype')
                  // if (type === 'threshold') {
                  //   return (

                  // }
                  return (
                    <>
                      <span style={{ display: type === 'threshold' ? 'block' : 'none' }}>
                        <Form.Item
                          label='阈值'
                          name="thres_m"

                        >
                          <GSelect
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="选择阈值"

                          >
                            {children}
                          </GSelect>
                        </Form.Item>
                        <Form.Item
                          label='模型版本'
                          name="version_s"

                        >
                          <GSelect style={{ width: '100%' }}>
                            {
                              modelVersions.map((o: any) => {
                                return (
                                  <Option value={o.tag} key={o.tag}>{o.tag}</Option>
                                )
                              })
                            }
                          </GSelect>
                        </Form.Item>

                      </span>

                      <span style={{ display: type === 'version' ? 'block' : 'none' }}>
                        <Form.Item
                          label='模型版本'
                          name="version_m"

                        >
                          <GSelect
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="选择模型版本"

                          >
                            {
                              modelVersions.map((o: any) => {
                                return (
                                  <Option value={o.tag} key={o.tag}>{o.tag}</Option>
                                )
                              })
                            }
                          </GSelect>
                        </Form.Item>
                        <Form.Item
                          label='阈值'
                          name="thres_s"

                        >
                          <GSelect style={{ width: '100%' }} placeholder="选择阈值">
                            {children}
                          </GSelect>
                        </Form.Item>
                      </span>
                    </>
                  )
                }}
              </Form.Item>

            </div>
          </Form>

        </div>
      </ReactCusScrollBar>

    </div>
  )
}

export default ConfigForm
