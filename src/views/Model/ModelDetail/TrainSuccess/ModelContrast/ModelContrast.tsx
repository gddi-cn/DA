
import ConfigForm from './ConfigForm'
import ContrastView from './ContrastView'
import api from '@api'
import { RootState } from '@reducer/index'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './ModelContrast.module.less'

const ModelContrast = (): JSX.Element => {
  const versionInfo = useSelector((state: RootState) => {
    return state.modelDetailSlice.versionInfo
  })

  const [loading, setloading] = useState(false)
  console.log(loading)

  useEffect(() => {
    const fn = async () => {
      try {
        setloading(true)
        const res = await api.get(`/v2/models/${versionInfo.id}/compareversions`)
        if (res.code === 0) {
          console.log(res)
        } else {
          setloading(false)
        }
      } catch (e) {
        console.log(e, 'eeee')

        setloading(false)
      }
    }
    fn()
  }, [versionInfo])
  return (
    <div styleName='ModelContrast'>
      <div className='model_info_wrap'>
        <ConfigForm />

      </div>
      <div className='ModelContrast_wrap'>
        <ContrastView />

      </div>
    </div>
  )
}

export default ModelContrast
