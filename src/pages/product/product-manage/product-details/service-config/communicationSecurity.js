import React, { useState, useRef } from 'react'
import { Modal, Form, Radio, Row, Tooltip } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'

import './communicationSecurity.scss'

const authorityMap = ['一型一密', '一型一密pro', '一机一密']

function CommunicateSecurity({ securityVisible, cancelHandle, productExtend }) {
  const [form] = Form.useForm()
  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 14,
    },
  }
  return (
    <Modal
      title="通信安全机制"
      visible={securityVisible}
      width={740}
      onOk={cancelHandle}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="communication-security-modal">
        <div className="tip-desc">
          <InfoCircleFilled /><span className="tip-text">数据在产品发布后可在设备注册模块查看</span>
        </div>
        <Form form={form} {...formItemLayout} >
          <Form.Item
            name="authorityType"
            label="验证方式">
            <span>{authorityMap[productExtend]}</span>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default CommunicateSecurity
