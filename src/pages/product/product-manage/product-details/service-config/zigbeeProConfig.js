import React from 'react'
import { Modal } from 'antd'
import TableCom from '../../product-edit/config-service/selectTable'

function ZigbeeProConfig({ visible, productId, cancelHandle, initialProtoclList }) {
  return (
    <Modal
      title="zigbee协议描述信息"
      visible={visible}
      width={1100}
      onOk={cancelHandle}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="zigbee-pro-modal">
      <TableCom dataSource={initialProtoclList} actionType="detail" />
    </Modal>
  )
}

export default ZigbeeProConfig
