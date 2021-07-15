import React, { useEffect, useState } from 'react'
import { Modal, Input, Form, Row, Col } from 'antd';
import './freeApply.scss'

export default function FreeApplyModal({ freeApplyVisible, handleFreeApply }) {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const onOk = () => {
    form.submit()
  }
  const formItemLayout = {
    labelCol: {
      md: {
        span: 3,
      },
    },
    wrapperCol: {
      md: {
        span: 8,
      },
    },
  };
  return (
    <Modal
      title="免费申请"
      visible={freeApplyVisible}
      onOk={onOk}
      onCancel={handleFreeApply}
      maskClosable={false}
      destroyOnClose={true}
      width={857}
      wrapClassName="replace-module-modal free-apply-modal">
      <div className="free-apply-modal-top">
        <div className="confirm-tip">请确认以下信息：</div>
        <div className="f-module-box">
          <div className="f-module-title">模组名称：WR3L Wi-Fi模组</div>
          <div className="pad22">
            <div className="firmware-msg">固件信息</div>
            <div>
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="固件名称" className="txt-color">瑞昱SOC线上灯光固件 2M</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="产品功能相关" className="txt-color">白光亮度最大值：100</Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="固件Key" className="txt-color">瑞昱SOC线上灯光固件 2M</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="暖光输出引脚-W/CCT" className="txt-color">白光亮度最大值：100</Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="固件版本" className="txt-color">瑞昱SOC线上灯光固件 2M</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="白光亮度最小值" className="txt-color">白光亮度最大值：100</Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="配网相关" className="txt-color">白光输出引脚-C/Bright：GPIO12、高电平有效</Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {/* form表单 */}
      <div className="free-apply-modal-form">
        <Form
          {...formItemLayout}
          form={form}
          name="freeApply"
          onFinish={onFinish}>
          <Form.Item
            name="contact"
            label="产品联系人"
            rules={[{ required: true, message: '请输入联系人名称', }]}>
            <Input placeholder="请输入联系人名称" />
          </Form.Item>
          <Form.Item
            name="contact2"
            label="联系方式"
            rules={[{ required: true, message: '请输入联系方式', }]}>
            <Input placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item
            name="address"
            label="邮寄地址"
            rules={[{ required: true, message: '请输入联系邮寄地址', },]}>
            <Input placeholder="请输入联系邮寄地址" />
          </Form.Item>
        </Form>
      </div>
    </Modal >
  )
}
