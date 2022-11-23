import React from 'react'
import { useCheckAll, useGroupDevice, useSelect } from '../hook'
import NoGroupDevice from './NoGroupDevice'
import { Checkbox, Col, Pagination, Row as AntRow, Typography } from 'antd'
import styled from 'styled-components'
import { GroupDevice } from '@src/shared/types/device'
import Divider from '../../../../components/Divider'
import { formatUnixTime } from '@src/utils/tools'
import { useAtom } from 'jotai'
import { groupDeviceAtom } from '@views/Deployment/BySDK/DeviceLicense/components/Apply/store'

const Row = styled(AntRow)`
  padding: 0 12px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: #061926;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const Table = styled.div`
  width: 100%;
  //width: 784px;
  //max-width: 100%;
  overflow: hidden;
  margin-top: 20px;
`

const BodyRow = styled(AntRow)`
  padding: 14px 12px;
  .ant-typography {
    color: #606266;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Header: React.FC = () => {
  const { indeterminate, checkedAll, handleToggle } = useCheckAll()

  return (
    <Row wrap={false} gutter={8}>
      <Col span={2}>
        <Checkbox checked={checkedAll} indeterminate={indeterminate} onChange={handleToggle} />
      </Col>
      <Col span={5}>
        设备名称
      </Col>
      <Col span={6}>
        设备 SN
      </Col>
      <Col span={5}>
        AI 芯片型号
      </Col>
      <Col span={5}>
        注册时间
      </Col>
    </Row>
  )
}

const TableRow: React.FC<GroupDevice> = (
  {
    id,
    name,
    sn,
    type,
    create_time,
  }
) => {
  const { checked, handleToggle } = useSelect(id)

  return (
    <>
      <Divider />
      <BodyRow align={'middle'} gutter={8}>
        <Col span={2}>
          <Checkbox checked={checked} onChange={handleToggle} />
        </Col>
        <Col span={5}>
          <Typography.Text ellipsis>
            {name || '-'}
          </Typography.Text>
        </Col>
        <Col span={6}>
          <Typography.Text ellipsis>
            {sn || '-'}
          </Typography.Text>
        </Col>
        <Col span={5}>
          <Typography.Text ellipsis>
            {type || '-'}
          </Typography.Text>
        </Col>
        <Col span={5}>
          <Typography.Text ellipsis>
            {formatUnixTime(create_time)}
          </Typography.Text>
        </Col>
      </BodyRow>
    </>
  )
}

const Body: React.FC = () => {
  const [deviceList] = useAtom(groupDeviceAtom)
  return (
    <>
      {
        deviceList.map(device => (
          <TableRow key={device.id} {...device} />
        ))
      }
    </>
  )
}

const GroupDeviceList: React.FC = () => {
  const { deviceList, page, setPage, total } = useGroupDevice()

  return (
    <Container>
      {
        deviceList.length ? (
          <Table>
            <Header />
            <Body />
            <Footer>
              <Pagination
                pageSize={7}
                onChange={(p) => setPage(p)}
                current={page}
                total={total}
                showQuickJumper
                size={'small'}
              />
            </Footer>
          </Table>
        ) : (
          <NoGroupDevice />
        )
      }
    </Container>
  )

}

export default GroupDeviceList
