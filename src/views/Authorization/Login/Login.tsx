
import Header from './Header'
import LoginForm from './LoginForm'
import Earth from '../common/Earth'
// import hero from './assets/hero-glow.svg'
import './Login.module.less'

const Login = (props: any): JSX.Element => {
  console.log(props)
  return (
    <div styleName='Login'>

      <Header/>
      {/* <img src={hero} className='home-hero-glow' alt='bg' /> */}
      <div className='earth_wrap'>
        <Earth />
      </div>

      <LoginForm/>

    </div>
  )
}

export default Login
