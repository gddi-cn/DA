import { GButton } from '@src/UIComponents'
import { addActiveTask } from '@reducer/tasksSilce'
import { useDispatch } from 'react-redux'
import { useDebounceFn } from 'ahooks'
// import { useNavigate } from 'react-router-dom'
// import { APP_DATA_SET_INDEX } from '@router'
import { ReactComponent as Bushu } from './icon/bushu.svg'
import { ReactComponent as Shangchaun } from './icon/shangchaun.svg'
import { ReactComponent as Youhua } from './icon/youhua.svg'

import { ReactComponent as CAMB } from './icon/CAMB.svg'
import { ReactComponent as Yingwenda } from './icon/yingwenda.svg'
import { ReactComponent as HISI } from './icon/HISI.svg'
import { ReactComponent as MEDI } from './icon/MEDI.svg'
import { ReactComponent as SOPH } from './icon/SOPH.svg'
import { ReactComponent as Rock } from './icon/Rock.svg'
import { ReactComponent as QUAL } from './icon/QUAL.svg'
import { ReactComponent as SIGM } from './icon/SIGM.svg'
import { gsap } from 'gsap'

import './GuideHome.module.less'
import { useEffect } from 'react'

// 这里的开始就是添加一个任务
const GuideHome = (): JSX.Element => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  useEffect(() => {
    try {
      // gsap.fromTo('.gsap_GuideHome_manufature_svg', { autoAlpha: 0, x: -100 }, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.025 });

      // gsap.fromTo('.gsap_GuideHome_step_1 g path', { autoAlpha: 0, x: -100 }, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.025, onComplete: step2 });
      const tl = gsap.timeline();
      tl.fromTo('.gsap_GuideHome_step_1 path', { autoAlpha: 0, x: -100 }, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.025 })
        .fromTo('.gsap_GuideHome_step_2 path', { autoAlpha: 0, y: -100 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.025 })
        .fromTo('.gsap_GuideHome_step_3 path', { autoAlpha: 0, x: 100 }, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.025 });
    } catch (e) {

    }
  }, [])
  const handleAddTask = useDebounceFn(() => {
    // 创建好像不需要什么信息
    dispatch(addActiveTask(null))

    // navigate({
    //   pathname: APP_DATA_SET_INDEX
    // })
  }, {
    wait: 0
  })
  return (
    <div styleName='GuideHome'>
      <div className='title'>共达地智能系统</div>
      <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0LjUgMi41aC0xM0EuNS41IDAgMDAxIDN2MTBhLjUuNSAwIDAwLjUuNWgxM2EuNS41IDAgMDAuNS0uNVYzYS41LjUgMCAwMC0uNS0uNXpNNS4yODEgNC43NWExIDEgMCAwMTAgMiAxIDEgMCAwMTAtMnptOC4wMyA2LjgzYS4xMjcuMTI3IDAgMDEtLjA4MS4wM0gyLjc2OWEuMTI1LjEyNSAwIDAxLS4wOTYtLjIwN2wyLjY2MS0zLjE1NmEuMTI2LjEyNiAwIDAxLjE3Ny0uMDE2bC4wMTYuMDE2TDcuMDggMTAuMDlsMi40Ny0yLjkzYS4xMjYuMTI2IDAgMDEuMTc3LS4wMTZsLjAxNS4wMTYgMy41ODggNC4yNDRhLjEyNy4xMjcgMCAwMS0uMDIuMTc1eiIgZmlsbD0iIzhDOEM4QyIvPjwvc3ZnPg=='/>
      <div className='sub_title'>从开发到部署只需简单三步</div>
      <GButton onClick={handleAddTask.run} className='start_gddi' type='primary'>自动训练模型</GButton>
      <div className='train_process'>
        <Shangchaun className='gsap_GuideHome_step_1'/>
        <Youhua className='gsap_GuideHome_step_2' />
        <Bushu className='gsap_GuideHome_step_3' />
      </div>
      <div className='manefature_list_title'>我们支持多种类型芯片,完美定制高精度AI模型</div>
      <div className='manefature_list'>
        <CAMB className='gsap_GuideHome_manufature_svg'/>
        <Yingwenda className='gsap_GuideHome_manufature_svg' />
        <HISI className='gsap_GuideHome_manufature_svg' />
        <MEDI className='gsap_GuideHome_manufature_svg' />
        <QUAL className='gsap_GuideHome_manufature_svg' />
        <Rock className='gsap_GuideHome_manufature_svg' />
        <SIGM className='gsap_GuideHome_manufature_svg' />
        <SOPH className='gsap_GuideHome_manufature_svg' />
      </div>
    </div>
  )
}

export default GuideHome
