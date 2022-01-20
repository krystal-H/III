import React, { useState } from 'react'
import { Modal, Form } from 'antd'

function ZigbeeConfig({ visible, cancelHandle, zigbeeSign = '' }) {
  const [form] = Form.useForm()

  return (
    <Modal
      title="zigbee3.0产品标示配置"
      visible={visible}
      width={740}
      onOk={cancelHandle}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div>
        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ zigbeeSign }}>
          <Form.Item name="zigbeeSign" label="产品标示" >
            <span>{zigbeeSign}</span>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default ZigbeeConfig
