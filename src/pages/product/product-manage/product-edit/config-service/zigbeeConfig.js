import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'

function ZigbeeConfig({ visible, productId, cancelHandle }) {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log({ ...values })
    // post(Paths.saveProductSecurityConfig, {
    //   productId,
    //   authorityType: Number(radioVal),
    //   isGateWayDevice: isGateWayDevice || ''
    // }).then(res => {
    //   Notification({ description: '操作成功！', type: 'success' })
    //   isConfigedFunc()
    // })
  }

  const onOk = () => {
    form.submit()
  }

  return (
    <Modal
      title="zigbee3.0产品标示配置"
      visible={visible}
      width={740}
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div>
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 14 }}>
          <Form.Item
            name="flag"
            label="产品标示"
            rules={[{ required: true, message: '请输入自定义字符串' },]}
            style={{ marginTop: 22 }}>
            <Input placeholder='请输入自定义字符串' />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default ZigbeeConfig
