import { titleMap, imgSrcMap } from '../../config'
import { ReactComponent as Gddi } from '../../icon/gddi.svg'
import './ChipItem.module.less'

const ChipItem = (props: ModelTrainConfigType.ChipItem): JSX.Element => {
  const { data, selected, setSelected } = props
  const brand = data?.brand || ''

  const handleOnClick = () => {
    setSelected(data)
  }

  const getlcs = () => {
    if (
      selected.name === data.name &&
      selected.chip_type === data.chip_type &&
      selected.brand === data.brand
    ) {
      return 'info_wrap info_wrap_active'
    }
    return 'info_wrap'
  }
  return (
    <div styleName='ChipItem' onClick={handleOnClick}>
      <Gddi className='gddi_svg'/>

      <div className='icon_wrap'>
        {imgSrcMap[brand] || ''}
      </div>

      <div className={getlcs()}>
        <p className='chip_brand'>
          {titleMap[brand] || '--'}
        </p>
        <div className='chip_info'>
          <p className='chip_type'>{data.chip_type}</p>
          <p className='chip_name'>{data.name}</p>
        </div>
      </div>
    </div>
  )
}

export default ChipItem
