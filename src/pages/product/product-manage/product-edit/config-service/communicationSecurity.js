import React, { useState, useRef } from 'react';
import { Modal, Form, Radio, Row, Tooltip } from 'antd';
import { UploadFileHooks } from '../../../../../components/upload-file';
import { InfoCircleFilled } from '@ant-design/icons';

import './communicationSecurity.scss'

function CommunicateSecurity({ securityVisible, cancelHandle }) {
  const [form] = Form.useForm()
  const $imgel1 = useRef()
  const [radioVal, setRadioVal] = useState('a')

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  }
  const onOk = () => {
    form.submit()
  }
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setRadioVal(e.target.value)
  }
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
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="communication-security-modal">
        <div className="tip-desc"><InfoCircleFilled /><span className="tip-text">数据在产品发布后可在设备注册模块查看</span></div>
        <Form
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{ 'radio-group': 'a', }}>
          <Form.Item
            name="radio-group"
            label="通信协议"
            rules={[
              { required: true, message: 'Please select your favourite colors!', },
            ]}>
            <Radio.Group onChange={onChange}>
              <Radio value="a">
                <Tooltip
                  title='设备通信时，仅校验烧录的产品密钥，设备安全性较低。'
                  placement="bottom"> 一型一密 </Tooltip>
              </Radio>
              <Radio value="b">
                <Tooltip
                  title='设备通信时，需校验烧录的产品密钥以及Clife平台设备注册的设备ID，较为安全。'
                  placement="bottom">
                  一型一密plus
                </Tooltip>
              </Radio>
              <Radio value="c">
                <Tooltip
                  title='设备通信时，需校验烧录的设备密钥和设备ID，安全性最高。'
                  placement="bottom">
                  一机一密
                </Tooltip>
              </Radio>
            </Radio.Group>
          </Form.Item>
          {
            radioVal !== 'c' &&
            <Form.Item
              name="data"
              label="导入设备物理地址"
              className="upload-file"
              rules={[
                { required: true, message: '请上传附件', },
              ]}>
              <Row align="middle">
                <UploadFileHooks
                  ref={$imgel1}
                  isNotImg={true}
                  maxCount={1}
                  format='.xls,.xlsx'
                  maxSize={10} />
                <a className="download-btn" href="http://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx">下载模板</a>
              </Row>
            </Form.Item>
          }
          {
            radioVal === 'c' &&
            <div className="download-tool">
              仅支持烧录工具烧入：<a href="#">下载密钥烧录工具</a>
            </div>
          }
        </Form>
      </div>
    </Modal>
  )
}

export default CommunicateSecurity
