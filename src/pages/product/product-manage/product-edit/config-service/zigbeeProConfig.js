import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import TableCom from './selectTable'

function ZigbeeProConfig({ visible, productId, cancelHandle, initialProtoclList }) {
  const [form] = Form.useForm()

  const onOk = () => {
    form.submit()
  }

  return (
    <Modal
      title="zigbee协议描述信息"
      visible={visible}
      width={1100}
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="zigbee-pro-modal">
      <TableCom dataSource={initialProtoclList} />
    </Modal>
  )
}

export default ZigbeeProConfig
