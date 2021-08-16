import React, { useState, useRef } from 'react'
import { Modal, Input, Form } from 'antd';
import { UploadFileHooks } from '../../../../../components/upload-file';
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'

import './releaseProduct.scss'

const { TextArea } = Input

export default function ReleaseProduct({ releaseVisible, cancelHandle, productId }) {
  const [form] = Form.useForm()
  const $imgel1 = useRef()

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const insList = values.instruction.length && values.instruction.map(item => {
      return {
        file: null,
        filename: item.name,
        filesrc: item.url
      }
    })
    // 产品说明文件
    values.instruction = insList
    // 成品图片
    values.productPic = values.productPic && values.productPic[0].url
    // 产品图标
    values.productIcon = values.productIcon && values.productIcon[0].url
    values.productId = productId
    console.log('请求接口的参数')
    post(Paths.publishProduct, {...values}).then(res => {
      Notification({ description: '发布成功成功！', type: 'success' })
    })
  }

  const onOk = () => {
    form.submit()
  }
  
  const onChange = e => {
    // console.log('Change:', e.target.value)
  }

  return (
    <Modal
      title="发布产品"
      visible={releaseVisible}
      width={740}
      onOk={onOk}
      onCancel={cancelHandle}
      okText="确认发布"
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="release-product-modal">
        <Form
          form={form}
          name="release-product-form"
          labelCol={{ span: 5, }}
          wrapperCol={{ span: 14, }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ portName: 'IOT' }}>
          <div>
            <div className="release-item-title">公司信息</div>
            <Form.Item
              label="产品所属公司名称"
              name="supplier"
              rules={[
                { required: true, message: '请输入公司名称' },
                { pattern: new RegExp(/^[a-zA-Z\u4e00-\u9fa5]+$/, "g"), message: '请输入中文/英文品牌名称' }
              ]}>
              <Input placeholder="请输入公司名称" />
            </Form.Item>
            <Form.Item
              label="产品联系人"
              name="contact"
              rules={[
                { required: true, message: '请输入联系人名称' },
                { pattern: new RegExp(/^[a-zA-Z\u4e00-\u9fa5]+$/, "g"), message: '请输入联系人名称' }
              ]}>
              <Input placeholder="请输入联系人名称" />
            </Form.Item>
            <Form.Item
              label="联系方式"
              name="tel"
              rules={[
                { required: true, message: '请输入联系人手机号码' }
              ]}>
              <Input placeholder="请输入联系人手机号码" />
            </Form.Item>
            <div className="release-item-title">产品信息</div>
            <Form.Item
              label="产品尺寸"
              name="size"
              rules={[
                { required: true, message: '请输入产品尺寸，如50*30*30' }
              ]}>
              <Input placeholder="请输入产品尺寸，如50*30*30" />
            </Form.Item>
            <Form.Item
              label="产品重量"
              name="weight"
              rules={[
                { required: true, message: '请输入产品重量，如2' }
              ]}>
              <Input placeholder="请输入产品重量，如2" />
            </Form.Item>
            <Form.Item
              label="产品参数"
              name="productParam"
              rules={[
                { required: true, message: '请输入产品参数' }
              ]}>
              <TextArea showCount maxLength={100}
                placeholder="请输入产品参数"
                autoSize={{ minRows: 4 }}
                onChange={onChange} />
            </Form.Item>
            <Form.Item
              label="产品介绍"
              name="introduction"
              rules={[
                { required: true, message: '请输入产品介绍' }
              ]}>
              <TextArea showCount maxLength={100}
                placeholder="请输入产品介绍"
                autoSize={{ minRows: 4 }}
                onChange={onChange} />
            </Form.Item>
            <div className="release-item-title">产品附件</div>
            <Form.Item
              className="upload-file"
              label="产品说明书"
              name="instruction"
              rules={[
                { required: true, message: '请上传产品说明书' }
              ]}>
              {
                <UploadFileHooks
                  ref={$imgel1}
                  isNotImg={true}
                  format='.doc,.docx,.pdf,.jpg,.png'
                  maxSize={20}
                  maxCount={5} />
              }
            </Form.Item>
            <Form.Item
              className="upload-file"
              label="产品图标"
              name="productIcon">
              {
                <UploadFileHooks
                  ref={$imgel1}
                  isNotImg={false}
                  format='.gif,.jpeg,.jpg,.png'
                  preferSize={'64*64'}
                  maxSize={0.512}
                  maxCount={1} />
              }
            </Form.Item>
            <Form.Item
              className="upload-file"
              label="成品图片"
              name="productPic" >
              {
                <UploadFileHooks
                  ref={$imgel1}
                  isNotImg={false}
                  format='.gif,.jpeg,.jpg,.png'
                  preferSize={'192*192'}
                  maxSize={0.512}
                  maxCount={1} />
              }
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  )
}