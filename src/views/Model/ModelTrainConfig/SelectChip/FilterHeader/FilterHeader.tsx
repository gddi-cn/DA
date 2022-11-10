
import { GIconInput, GSelect, TagRadioSelect } from '@src/UIComponents'

import { Select, Form } from 'antd';

import { CaretDownOutlined } from '@ant-design/icons'

import './FilterHeader.module.less'

const { Option } = Select;

// const dataList: { label: string, id: string }[] = [
//   { label: '全部品牌', id: 'all' },
//   { label: '全部品牌', id: 'all' },
//   { label: '全部品牌', id: 'all' },
//   { label: '全部品牌', id: 'all' },
//   { label: '全部品牌', id: 'all' },
//   { label: '全部品牌', id: 'all' },
//   { label: '全部品牌', id: 'all' },
//   { label: '全部品牌', id: 'all' }
// ]
// band name  chip_type
// task_type 之前选中数据决定的
type Props = {
  brandList: any[],
  fetchChipList: (data: any) => void,
}
const FilterHeader = (props: Props): JSX.Element => {
  const { brandList, fetchChipList } = props
  const [form] = Form.useForm();
  const onValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues)
    // todo fetch
    const { brand, ...rest } = allValues
    fetchChipList({
      ...rest,
      brand: brand.id
    })
  }
  return (
    <div styleName='FilterHeader'>

      <Form form={form} name="control-hooks" className='form_wrap' onValuesChange={onValuesChange}>
        <Form.Item
          name="name"

        >

          <GIconInput autoComplete='off' placeholder='搜索芯片名称' />
        </Form.Item>

        <Form.Item
          name="chip_type"
          initialValue=""
        >

          <GSelect suffixIcon={<CaretDownOutlined />} placeholder='全部芯片类型'>
            <Option value="">全部芯片类型</Option>
            <Option value="CPU">CPU</Option>
            <Option value="GPU">GPU</Option>
            <Option value="NPU">NPU</Option>
          </GSelect>
        </Form.Item>

        <Form.Item
          name="brand"
          initialValue=""
        >
          <TagRadioSelect dataList={brandList} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default FilterHeader
