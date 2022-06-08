import React, { useState } from 'react'
import { Modal, Form, Radio, Tooltip } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'
import './communicationSecurity.scss'

function CommunicateSecurity({ securityVisible, productId, cancelHandle, isGateWayDevice, isConfigedFunc, productExtend }) {
  const [form] = Form.useForm()
  const [radioVal, setRadioVal] = useState('0')

  const onFinish = (values) => {
    post(Paths.saveProductSecurityConfig, {
      productId,
      authorityType: Number(radioVal),
      isGateWayDevice: isGateWayDevice || ''
    }).then(res => {
      Notification({ description: '操作成功！', type: 'success' })
      isConfigedFunc()
    })
  }

  const onOk = () => {
    form.submit()
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
        <div className="tip-desc">
          <InfoCircleFilled /><span className="tip-text">数据在产品发布后可在设备注册模块查看</span>
        </div>
        <Form
          form={form}
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{ authorityType: productExtend + '' }}>
          <Form.Item
            name="authorityType"
            label="验证方式"
            rules={[
              { required: true, message: '请选择验证方式！' },
            ]}>
            <Radio.Group onChange={(e) => setRadioVal(e.target.value)}>
              <Radio value="0">
                <Tooltip
                  title='设备通信时，仅校验烧录的产品密钥，设备安全性较低。'
                  placement="bottom"> 一型一密 </Tooltip>
              </Radio>
              <Radio value="1">
                <Tooltip
                  title='设备通信时，需校验烧录的产品密钥，同时需校验在Clife平台设备注册的设备ID，较为安全。'
                  placement="bottom">
                  一型一密pro
                </Tooltip>
              </Radio>
              <Radio value="2">
                <Tooltip
                  title='设备通信时，需校验烧录的设备密钥，同时需校验烧录的设备ID，安全性最高。'
                  placement="bottom">
                  一机一密
                </Tooltip>
              </Radio>
            </Radio.Group>
          </Form.Item>
          {/* {
            radioVal !== '2' &&
            <div className="import-macAddr">
              <Form.Item
                name="macAddress"
                label="导入设备物理地址"
                className="upload-file"
              >
                <UploadFileHooks
                  ref={$imgel1}
                  isNotImg={true}
                  maxCount={1}
                  format='.xls,.xlsx'
                  maxSize={10} />
              </Form.Item>
              <a className="download-btn" href="http://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx">下载模板</a>
            </div>
          }
          {
            radioVal === '2' &&
            <div className="download-tool">
              仅支持烧录工具烧入：<a href="#">下载密钥烧录工具</a>
            </div>
          } */}
        </Form>
      </div>
    </Modal>
  )
}

export default CommunicateSecurity
