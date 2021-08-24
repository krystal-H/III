import React, { useState, useEffect, useRef } from 'react'
import { Modal, Input, Form, Select, Row, Col } from 'antd'
import { Paths, post } from '../../../../../api'
import './networkInfo.scss'


const { Option } = Select;

export default function NetworkInfo({ productId, networkModalVisible, cancelHandle }) {
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

  // 获取配网方式
  const getNetDataByProductId = () => {
    post(Paths.getNetDataByProductId, { productId })
      .then(res => {
        // setNetData(res.data)
        // // form.resetFields()
        // // formRef.current.setFieldsValue(res.data)
        // formRef.current.setFieldsValue({
        //   baseTypeId: res.data.baseTypeId,
        //   guidePage: res.data.guidePage.guidePage,
        //   bindFailPage: res.data.guidePage.bindFailPage,
        //   imageUrlList: res.data.helpPage.imageUrls
        // })
        // setGuidePage(res.data.guidePage.guidePage)
        // setBindFailPage(res.data.guidePage.bindFailPage)
        // imgRef.current.setFileList(res.data.helpPage.imageUrls.filter(item => item).map(item => {
        //   return { url: item, status: 'done' }
        // }))
      })
  }

  useEffect(() => {
    getNetDataByProductId()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      title="配网信息"
      visible={networkModalVisible}
      width={875}
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="network-detail-modal">
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}>
          <div className="network-detail-modal-title">配网方式</div>
          <Form.Item
            label="已选通信协议"
            name="username">
            <span>WiFi</span>
          </Form.Item>
          <Form.Item
            label="配网方式"
            name="username">
            <span>WiFi</span>
          </Form.Item>
          <Form.Item
            label="输入AP-SSID"
            name="AP-SSID">
            <span>WiFi</span>
          </Form.Item>
          <div className="network-detail-modal-title">配网图片引导
            <span className="tip">（需产品支持WiFi或蓝牙配置能力）</span>
          </div>
          <Row>
            <Col span={12}>
              <Form.Item
                label="默认联网指引"
                name="default"
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 10 }}
                className="show-img-box"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <div className="img-box">
                  <img src="#" alt="图片" />
                </div>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="默认联网失败提示"
                name="default2"
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 10 }}
                className="show-img-box"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <div className="img-box">
                  <img src="#" alt="图片" />
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="图片轮播帮助信息"
            name="default3"
            className="show-img-box2"
            rules={[{ required: true, message: 'Please input your username!' }]}>
            <div className="img-box">
              <div className="img-box-item">
                <img src="#" alt="图片" />
              </div>
              <div className="img-box-item">
                <img src="#" alt="图片" />
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}