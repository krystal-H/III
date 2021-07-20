import React, { useState, useRef } from 'react';
import { Modal, Input, Table, Form, Select, Upload } from 'antd';
import { UploadFileHooks } from '../../../../../../components/upload-file';
import './networkInfo.scss';

const { Option } = Select;

export default function NetworkInfo({ networkModalVisible, cancelHandle }) {
  const [form] = Form.useForm()
  const $imgel1 = useRef() // {current:''}
  const $imgel2 = useRef() // {current:''}
  const $imgel3 = useRef() // {current:''}

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const onOk = () => {
    form.submit()
  }

  return (
    <Modal
      title="配网信息"
      visible={networkModalVisible}
      width={875}
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="network-info-modal">
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}>
          <div className="network-info-modal-title">配网方式</div>
          <Form.Item
            label="已选通信协议"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <span>WiFi</span>
          </Form.Item>
          <Form.Item
            label="配网方式"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Select style={{ width: 265 }}>
              <Option value="Option1-1">Option1-1</Option>
              <Option value="Option1-2">Option1-2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="输入AP-SSID"
            name="AP-SSID"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input style={{ width: 380 }} />
          </Form.Item>
          <div className="network-info-modal-title">配网图片引导<span className="tip">（需产品支持WiFi或蓝牙配置能力）</span></div>
          <div className="flex">
            <Form.Item
              label="默认联网指引"
              name="default"
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 10 }}
              className="upload-img"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              {
                <UploadFileHooks
                  ref={$imgel1}
                  maxCount={1}
                  preferSize={'150*267'}
                  format='.gif,.jpeg,.jpg,.png'
                  maxSize={0.5} />
              }
            </Form.Item>
            <Form.Item
              label="默认联网失败提示"
              name="default2"
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 10 }}
              className="upload-img"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              {
                <UploadFileHooks
                  ref={$imgel2}
                  maxCount={1}
                  preferSize={'150*267'}
                  format='.gif,.jpeg,.jpg,.png'
                  maxSize={0.5} />
              }
            </Form.Item>
          </div>
          <Form.Item
            label="图片轮播帮助信息"
            name="default3"
            className="upload-img"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            {
              <UploadFileHooks
                ref={$imgel3}
                maxCount={5}
                preferSize={'90*90'}
                format='.gif,.jpeg,.jpg,.png'
                maxSize={0.5} />
            }
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}