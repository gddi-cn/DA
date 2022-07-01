
import './Tag.module.less'

type Props = {
  type?: 'ongoing' | 'success' | 'falied' | 'not_start'
}

// const colors={

// }
const Tag = (props: Props): JSX.Element => {
  console.log(props)
  return (
    <span styleName='Tag'>
      Tag
    </span>
  )
}

export default Tag
