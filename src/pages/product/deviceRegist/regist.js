import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Input, Select, Upload, Form } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { UploadFileHooks } from '../../../components/upload-file';
import './index.scss'
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel }) {
  const [form] = Form.useForm();
  const $el = useRef(null)
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const subData = () => {
    form.validateFields().then(value => {
      // 验证通过后进入
      console.log(value,'==========aaaaaaaaa1'); 
    }).catch(err => {
      // 验证不通过时进入
      console.log(err);
    });
    return
    colseMoadl()
  }
  return (
    <Modal title="注册设备" visible={isModalVisible} onOk={subData} onCancel={cancelModel} width='555px' wrapClassName='add-protocols-wrap'>
      <div className='device-regist'>
        <Form form={form} labelAlign='right'>
          <Form.Item
            name="select"
            label="产品名称："
            rules={[{ required: true }]}
          >
            <Select >
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>
          <Form.Item label="验证方式：">
            <span></span>
          </Form.Item>
          <Form.Item
            label="导入设备物理地址："
          >
            <Form.Item
              name="upload"
              valuePropName="upload"
              getValueFromEvent={normFile}
            >
              <UploadFileHooks
                ref={$el}
                maxCount={1}
                format='.xls,.xlsx'
                isNotImg={true}
                maxSize={10} />
            </Form.Item>
            <a className='down-model'>下载模板</a>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}