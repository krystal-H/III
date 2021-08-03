import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import './configFirmware.scss'

function ConfigFirmware({ firmwareVisible, cancelHandle }) {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const onOk = () => {
    form.submit()
  }


  return (
    <Modal
      title="配置产品固件模块"
      visible={firmwareVisible}
      width={555}
      onOk={onOk}
      onCancel={cancelHandle}
      maskClosable={false}
      wrapClassName="replace-module-modal">
      <div className="config-firmware-modal">
        <Form
          form={form}
          name="config-firmware-form"
          onFinish={onFinish}
          autoComplete="off">
          <div className="form-item-block">
            <Form.Item
              label="配置固件模块标识"
              name='first'
              rules={[
                { required: true, message: '请输入英文字符' },
                { pattern: new RegExp(/^[a-zA-Z]+$/, "g"), message: '请输入英文字符' }
              ]}>
              <Input placeholder="请输入英文字符" />
            </Form.Item>
            <Form.Item
              label="配置固件模块名称"
              name='last'
              rules={[
                { required: true, message: '请输入中文名称' },
                { pattern: new RegExp(/^[\u2E80-\u9FFF]+$/, "g"), message: '请输入中文产品名称' }
              ]}>
              <Input placeholder="请输入中文名称" />
            </Form.Item>
          </div>
          <Form.List name="list">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div className="form-item-block" key={key}>
                    <Form.Item
                      label="配置固件模块标识"
                      {...restField}
                      name={[name, 'first']}
                      fieldKey={[fieldKey, 'first']}
                      rules={[
                        { required: true, message: '请输入英文字符' },
                        { pattern: new RegExp(/^[a-zA-Z]+$/, "g"), message: '请输入英文字符' }
                      ]}>
                      <Input placeholder="请输入英文字符" />
                    </Form.Item>
                    <Form.Item
                      label="配置固件模块名称"
                      {...restField}
                      name={[name, 'last']}
                      fieldKey={[fieldKey, 'last']}
                      rules={[
                        { required: true, message: '请输入中文名称' },
                        { pattern: new RegExp(/^[\u2E80-\u9FFF]+$/, "g"), message: '请输入中文产品名称' }
                      ]}>
                      <Input placeholder="请输入中文名称" />
                    </Form.Item>
                    <div className="delete-btn" onClick={() => remove(name)}><DeleteOutlined />&nbsp;&nbsp;删除</div>
                  </div>
                ))}
                <div className="add-btn" onClick={() => add()}>新增</div>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </Modal>
  )
}

export default ConfigFirmware
