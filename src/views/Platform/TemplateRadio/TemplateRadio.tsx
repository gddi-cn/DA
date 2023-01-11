import React from 'react'
import styled from 'styled-components'
import { Collapse as AntCollapse } from 'antd'
const AntPanel = AntCollapse.Panel

import RadioItem from './RadioItem'

interface TemplateRadioProps {
  value?: App.Template.Instance['id']
  onChange?: (id?: App.Template.Instance['id']) => void
  templateList: Array<App.Template.Instance>
  advanceTemplateList: Array<App.Template.Instance>
}

const ListWrap = styled.div`
  display: grid;
  grid-template: auto/repeat(2, 1fr);
  gap: 20px;
`

const NoData = styled.p`
  font-size: 24px;
  margin: 24px 0;
  font-weight: 500;
  color: #a8a8a8;
  text-align: center;
  width: 100%;
`

const Collapse = styled(AntCollapse)`
  margin-top: 16px;
  background-color: transparent;
  border: none;
  .ant-collapse-item {
    border: none;
    .ant-collapse-header {
      padding: 0;
      margin-bottom: 12px;
      color: #48A2DF;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
    }
  }
  .ant-collapse-content {
    background-color: transparent;
    border: none;
  }
  .ant-collapse-content-box {
    padding: 0;
  }
`

const Panel = styled(AntPanel)`
`

const TemplateRadio: React.FC<TemplateRadioProps> = (
  {
    templateList,
    advanceTemplateList,
    value,
    onChange,
  }
) => {

  const handleClick = (id: App.Template.Instance['id']) => {
    if (value === id) {
      onChange && onChange(undefined)
    } else {
      onChange && onChange(id)
    }
  }

  return (
    <>
      <ListWrap>
        {
          templateList.map(t => (
            <RadioItem key={t.id} {...t} onClick={handleClick} selected={value === t.id} />
          ))
        }
      </ListWrap>
      {
        advanceTemplateList.length ? (
          <Collapse>
            <Panel header={'高级模板'} key={1}>
              <ListWrap>
                {
                  advanceTemplateList.map(t => (
                    <RadioItem key={t.id} {...t} onClick={handleClick} selected={value === t.id} />
                  ))
                }
              </ListWrap>
            </Panel>
          </Collapse>
        ) : null
      }
      {
        !templateList.length && !advanceTemplateList.length ? (
          <NoData>暂无模板</NoData>
        ) : null
      }
    </>
  )
}

export default TemplateRadio
