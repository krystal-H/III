import React, { useEffect, useState } from 'react'
import { Modal, Input, Form, Row, Col, Select } from 'antd';
import './modifyFirmware.scss'
const { Option } = Select;

export default function ModifyFirmwareModal({ modifyFirmwareVisible,handleCancelFirmware }) {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const onOk = () => {
    form.submit()
  }
  return (
    <Modal
      title="修改固件"
      visible={modifyFirmwareVisible}
      onOk={onOk}
      onCancel={handleCancelFirmware}
      maskClosable={false}
      destroyOnClose={true}
      width={857}
      okText="重新生成固件"
      wrapClassName="replace-module-modal"
      >
      <div className="modify-firmware-modal">
        <div className="modify-firmware-modal-left">
          <Form
            form={form}
            onFinish={onFinish}
            name="modify-firmware-form"
            initialValues={{ portNum1: 'Option1-1', portNum2: 'Option2-2', "Option1-1": "Option1-1", "Option2-2": "Option2-2" }}>
            <div className="modify-firmware-title">配网相关</div>
            <Form.Item
              label="通断电复位次数"
              name="username"
              style={{width: 410}}
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>

            <div className="modify-firmware-title">IO引脚配置</div>
            <Form.Item
              label="白光输出引脚-C/Bright"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input.Group compact>
                <Form.Item
                  name="portNum1"
                  noStyle
                  rules={[{ required: true, message: 'Province is required' }]}>
                  <Select  style={{width: 190}}>
                    <Option value="Option1-1">Option1-1</Option>
                    <Option value="Option1-2">Option1-2</Option>
                  </Select>
                </Form.Item>
                &nbsp;&nbsp;
                <Form.Item
                  name="portNum2"
                  noStyle
                  rules={[{ required: true, message: 'Province is required' }]}>
                  <Select  style={{width: 190}}>
                    <Option value="Option2-1">Option2-1</Option>
                    <Option value="Option2-2">Option2-2</Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item
              label="暖光输出引脚 - W/CCT"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input.Group compact>
                <Form.Item
                  name="Option1-1"
                  noStyle
                  rules={[{ required: true, message: 'Province is required' }]}>
                  <Select style={{width: 190}}>
                    <Option value="Option1-1">Option1-1</Option>
                    <Option value="Option1-2">Option1-2</Option>
                  </Select>
                </Form.Item>
                &nbsp;&nbsp;
                <Form.Item
                  name="Option2-2"
                  noStyle
                  rules={[{ required: true, message: 'Province is required' }]}>
                  <Select style={{width: 190}}>
                    <Option value="Option2-1">Option2-1</Option>
                    <Option value="Option2-2">Option2-2</Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <div className="modify-firmware-title">产品功能相关</div>
            <Form.Item
              label="白光亮度最大值"
              name="username"
              style={{width: 410}}
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="白光亮度最小值"
              name="username"
              style={{width: 410}}
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>
          </Form>
        </div>
        <div className="modify-firmware-modal-right">
          <img />
        </div>
      </div>
    </Modal>
  )
}