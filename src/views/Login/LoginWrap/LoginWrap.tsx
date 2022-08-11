import ForgetPasswordFrom from '../ForgetPasswordFrom'
import RegisterFrom from '../RegisterFrom'
import LoginForm from '../LoginForm'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

import { useEffect, useState } from 'react'

import { ReactComponent as Gddilogo } from '../icon/gddi.svg'
// import { ReactComponent as Background } from './icon/background.svg'
// import { DrawSvg } from './gsapCusPlugin'
import './LoginWrap.module.less'

type Active = 'LoginForm' | 'ForgetPasswordFrom' |'RegisterFrom'

const LoginWrap = (): JSX.Element => {
  const [active, setActive] = useState<Active>('LoginForm')

  useEffect(() => {
    gsap.registerPlugin(TextPlugin)
    gsap.defaults({ ease: 'none' });

    const tl = gsap.timeline({ yoyo: true });
    tl.to('.system_name', { duration: 0.5, text: '共达地智能系统' })
      .to('.system_des', { duration: 0.8, text: '零门槛定制高精度AI模型 零代码部署至终端设备' })
      .fromTo('.breeze', { duration: 0.5, y: -50 }, { duration: 0.5, y: 0 })
  }, [])

  // useEffect(() => {
  //   gsap.registerPlugin(DrawSvg);
  //   let i = 0;

  //   gsap.set('.line', { attr: { stroke: 'hsl(1,100%, 50%)', 'stroke-width': 4, 'stroke-linecap': 'round' } });
  //   gsap.set('.line2', { attr: { 'stroke-width': 6 }, opacity: 0.4 });
  //   gsap.set('.line3', { attr: { 'stroke-width': 9 }, opacity: 0.15 });

  //   [].forEach.call(document.getElementsByClassName('line'), (el) => {
  //     gsap.timeline({ defaults: { duration: 1 }, repeat: -1, repeatDelay: (27 - i) / 50 })
  //       .to(el, { duration: 2, attr: { stroke: 'hsl(360, 100%, 50%)', ease: 'power2.inOut' } }, 0)
  //       .fromTo(el, { drawSVG: 0 }, { drawSVG: '35% 70%', ease: 'sine.in' }, i / 50)
  //       .to(el, { drawSVG: '100% 100%', ease: 'sine.out' }, 1 + i / 50)
  //       .progress(i / 20)
  //     i++;
  //   });
  // }, [])

  const getCls = (key: Active) => {
    if (active === key) {
      return 'form_wrap_item form_wrap_item_active'
    }
    return 'form_wrap_item'
  }
  return (
    <div styleName='LoginWrap'>
      <div className='gddi_info_wrap'>

        <div className='gddi_info_inner'>
          <Gddilogo />

          <h3 className='system_name'></h3>
          <h5 className='system_des'></h5>

        </div>
        <p className='footer_title'>网站备案：<a href='https://beian.miit.gov.cn/#/Integrated/recordQuery' target='blank'>粤ICP备2020111095号</a></p>
        {/* <Background className='Background_svg' /> */}
      </div>
      <div className='form_wrap'>
        <div className={getCls('LoginForm')}>
          <LoginForm setActive={setActive}/>
        </div>
        <div className={getCls('ForgetPasswordFrom')}>
          <ForgetPasswordFrom setActive={setActive} />
        </div>
        <div className={getCls('RegisterFrom')}>
          <RegisterFrom setActive={setActive} />
        </div>

      </div>
    </div>
  )
}

export default LoginWrap
