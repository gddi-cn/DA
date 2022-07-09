
import './PlatSelect.module.less'

type Props={
    companyList:any[],
    handlePartyChange:any,
    value?:any,
    onChange?:any
}
const PlatSelect = (props: Props): JSX.Element => {
  const { companyList, onChange, value, handlePartyChange } = props

  const handleSelect = (data:any) => {
    onChange(data.value)
    handlePartyChange(data.value, data)
  }

  const getCls = (data:any) => {
    if (value === data.value) {
      return 'item item_active'
    }
    return 'item'
  }
  return (
    <div styleName='PlatSelect'>
      {
        companyList.map((o, i) => {
          console.log(o)
          return (
            <div className={getCls(o)} key={i} onClick={() => handleSelect(o)}>
              {o.name}
            </div>
          )
        })
      }

    </div>
  )
}

export default PlatSelect
