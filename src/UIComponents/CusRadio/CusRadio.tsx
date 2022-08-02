
import './CusRadio.module.less'

type Props = {
    value: string,
    onChange: (value: string) => void,
    options:{label:string, value:string}[],
    className?:string
}
const CusRadio = (props: Props): JSX.Element => {
  const { value, onChange, options, className } = props

  const handleSelect = (v: string) => {
    onChange(v)
  }

  const getActiveCls = (v: string) => {
    if (v === value) {
      return 'item_active'
    }

    return ''
  }
  return (
    <div styleName='CusRadio' className={className}>
      {
        options.map((o, i) => {
          return (
            <div key={i} className={`radio_wrap ${getActiveCls(o.value)} `} onClick={() => handleSelect(o.value)}>{o.label}</div>
          )
        })
      }
      {/* <div className={`x86_wrap ${getActiveCls('x86')} `} onClick={() => handleSelect('x86')}>X86</div>
      <div className={`arm_wrap ${getActiveCls('arm')} `} onClick={() => handleSelect('arm')}>ARM</div> */}
    </div>
  )
}

export default CusRadio
