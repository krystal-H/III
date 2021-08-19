import React, { useState, useEffect, useRef } from 'react';
import { Modal, Tooltip, Form } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { UploadFileHooks } from '../../../../../components/upload-file';
import './index.scss'
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel }) {
  const [form] = Form.useForm();
  const $el = useRef(null)
  //提交数据
  const subData = () => {
    // const fileList = $el.current.getFileListUrl()
    // if (fileList.length) {
    form.validateFields().then(value => {
      // 验证通过后进入
      console.log(value, '==========aaaaaaaaa1');
    }).catch(err => {
      // 验证不通过时进入
    });
  }
  return (
    <Modal title="注册设备" visible={isModalVisible} onOk={subData} onCancel={cancelModel} width='555px' wrapClassName='add-protocols-wrap'>
      <div className='device-regist'>
        <Form form={form} labelAlign='right'>
          <Form.Item label="验证方式：">
            <Tooltip
              title='设备通信时，需校验烧录的设备密钥和设备ID，安全性最高。'
              placement="bottom">
              一机一密
            </Tooltip>
          </Form.Item>
          <Form.Item
            label="导入设备物理地址"
          >
            <Form.Item
              name="upload"
              rules={[{ required: true, message: '请上传文件' }]}
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