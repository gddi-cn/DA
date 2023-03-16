import React from 'react'
import styled from 'styled-components'
import { currentModelVersionIdAtom, currentDatasetIdAtom } from '@src/store/dataset'

import Step from './Step'
import Footer from './Footer'

import SelectApp from './SelectApp'
import SecondLayout from './SecondLayout'
import Sync from './Sync'
import Notify from './Notify'

import { usePlatform } from './hook'
import { useAtomValue } from 'jotai'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 100px);
  background-color: #FFF;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding-top: 60px;
`

const Wrap = styled.div`
  flex: 1;
  overflow: hidden;
  padding-bottom: 20px;
  max-height: 970px;
`

const Platform: React.FC = () => {
  const { showSelectApp, showConfig, showSelectDevice, showContent, showSync } = usePlatform()

  return (
    <Container>
      {
        showContent ? (
          <>
            <Content>
              <Step />
              <Wrap>
                {
                  showSelectApp ? <SelectApp /> : null
                }
                {
                  showConfig || showSelectDevice ? (
                    <SecondLayout />
                  ) : null
                }
                {
                  showSync ? <Sync /> : null
                }
              </Wrap>
            </Content>
            <Footer />
          </>
        ) : (
          <Notify />
        )
      }
    </Container>
  )
}

export default Platform
