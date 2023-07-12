import React from 'react'
import styled from 'styled-components'

import detection from './icon/detection.png'
import classify from './icon/classify.png'
import cityscapes from './icon/cityscapes_segment.png'
import keypointsBased from './icon/keypoints_based_action.png'
import keypointsDetection from './icon/keypoints_detection.png'
import carPose from './icon/car_pose_detection.png'
import poseDetection from './icon/pose_detection.png'
import imageRetrieval from './icon/imageRetrieval.png'
import { sceneNameMapping } from '@src/shared/mapping/dataset'

import { DatasetScene } from '@src/shared/enum/dataset'
import { useAtom } from 'jotai'
import { trainTypeAtom } from '../store'

const sceneImgMapping: Map<DatasetScene, any> = new Map([
  [DatasetScene.Detection, /*            */detection],
  [DatasetScene.Classify, /*             */classify],
  [DatasetScene.CityscapesSegment, /*    */cityscapes],
  [DatasetScene.KeyPointsBasedAction, /* */keypointsBased],
  [DatasetScene.PoseDetection, /*        */poseDetection],
  [DatasetScene.CarPoseDetection, /*     */carPose],
  [DatasetScene.KeypointsDetection, /*   */keypointsDetection],
  [DatasetScene.ImageRetrieval, /*       */imageRetrieval],
])

export const useTrainTypeItem = (scene: DatasetScene) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [currentScene, setCurrentScene] = useAtom(trainTypeAtom)

  const selected = (currentScene as DatasetScene) === scene

  const handleClick = () => {
    if (selected) return
    setCurrentScene(scene)
  }

  React.useEffect(
    () => {
      const $c = containerRef.current
      if (!$c) return

      if (selected) {
        $c.setAttribute('selected', '')
      } else {
        $c.removeAttribute('selected')
      }
    },
    [selected]
  )

  return {
    containerRef,
    handleClick,
  }
}


const Container = styled.div<{ scene: DatasetScene }>`
  width: 284px;
  height: 180px;
  padding: 20px;
  background-color: #edf8ff;
  border-radius: 4px;
  cursor: pointer;
  transition:
          box-shadow ease-in-out .2s;
  &:not([selected]) {
    box-shadow: 0px 2px 4px rgba(177, 191, 202, 0.36);
  }
  &:hover:not([selected]) {
    box-shadow: 1px 4px 6px rgba(177, 191, 202, 0.36);
  }
  &[selected] {
    outline: 2px solid #62b0e5;
  }
  background-image: url(${props => sceneImgMapping.get(props.scene)});
  background-size: 100% 100%;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 36px;
  color: #2582C1;
`

const Item: React.FC<{ scene: DatasetScene }> = ({ scene }) => {
  const { containerRef, handleClick } = useTrainTypeItem(scene)

  return (
    <Container scene={scene} ref={containerRef} onClick={handleClick}>
      <Title>{sceneNameMapping.get(scene) || ''}</Title>
    </Container>
  )
}

export default Item
