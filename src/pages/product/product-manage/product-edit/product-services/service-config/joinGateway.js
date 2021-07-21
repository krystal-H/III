import React, { useState, useRef } from 'react';
import { Modal, Input, Form, Select, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import './joinGateway.scss'

const { Option } = Select;

function JoinGateway({ gatewayVisible, cancelHandle }) {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const onOk = () => {
    form.submit()
  }

  return (
    <Modal
      title="加入网关"
      visible={gatewayVisible}
      width={555}
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="join-gateway-modal">
        <div className="title">ZigBee协议设备，需要Clife网关做一定的协议适配，时间为2-3个工作日。并需要邮寄硬件样品给Clife平台调试。
          <span className="concat">联系客服</span>
        </div>
        <Form
          form={form}
          name="join-gateway-form"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ portName: 'IOT' }}>
          {/* <Form.Item
            label="选择网关对象"
            name='portName'
            rules={[
              { required: true, message: '请输入英文字符' },
              { pattern: new RegExp(/^[a-zA-Z]+$/, "g"), message: '请输入英文字符' }
            ]}>
            <Select style={{ width: 200 }}>
              <Option value="IOT">Clife IOT 边缘网关</Option>
              <Option value="china">china</Option>
            </Select>&nbsp;&nbsp;
            <span className="icon"><QuestionCircleOutlined /></span>
          </Form.Item> */}
          <Form.Item label="选择网关对象">
            <Space>
              <Form.Item
                name="portName"
                noStyle
                rules={[
                  { required: true, message: '请输入英文字符' },
                  { pattern: new RegExp(/^[a-zA-Z]+$/, "g"), message: '请输入英文字符' }
                ]}>
                <Select style={{ width: 200 }}>
                  <Option value="IOT">Clife IOT 边缘网关</Option>
                  <Option value="china">china</Option>
                </Select>
              </Form.Item>
              <span className="icon"><QuestionCircleOutlined /></span>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default JoinGateway
