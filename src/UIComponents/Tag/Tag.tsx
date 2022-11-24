
import './Tag.module.less'

type Props = {
  type?: 'ongoing' | 'success' | 'falied' | 'not_start' | 'nomal' | 'primary',
  text?:React.ReactNode,
  className?:string
}

const classes:{[index:string]:string} = {
  ongoing: 'ongoing',
  success: 'success',
  falied: 'falied',
  not_start: 'not_start',
  normal: 'nomal',
  primary: 'primary',
}

const Tag = (props: Props): JSX.Element => {
  const { text, type, className } = props
  return (
    <span styleName='Tag' className={className}>
      <span className={type ? classes[type] : 'primary'}>
        {text || '--'}
      </span>

    </span>
  )
}

export default Tag
