import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, Input } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import './configFirmware.scss'
import { Paths, post } from '../../../../../api'
import { Notification } from '../../../../../components/Notification'

function ConfigFirmware({ productId, firmwareVisible, cancelHandle, type, editData, confirmHandle }) {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Received values of form: ', values, type, 'type');
    if (type === 'edit') {
      post(Paths.updateFirmwareModule, {
        id: editData.id,
        firmwareTypeName: values.firmwareTypeName,
        firmwareTypeMark: values.firmwareTypeMark
      }).then(res => {
        Notification({ description: '操作成功！', type: 'success' })
        confirmHandle()
      })
    } else {
      let arr = [{
        deviceVersionType: 5,
        productId,
        firmwareTypeMark: values.firmwareTypeMark,
        firmwareTypeName: values.firmwareTypeName
      }]
      if (values.list && values.list.length) {
        values.list.forEach(ele => {
          arr.push({
            deviceVersionType: 5,
            productId,
            firmwareTypeMark: ele.firmwareTypeMark,
            firmwareTypeName: ele.firmwareTypeName
          })
        })
      }
  
      post(Paths.addFirmwareModule, arr).then(res => {
        Notification({ description: '操作成功！', type: 'success' })
        confirmHandle()
      })
    }
  }

  const onOk = () => {
    form.submit()
  }

  useEffect(() => {
    if (type === 'edit') {
      form.setFieldsValue({
        firmwareTypeMark: editData.firmwareTypeMark,
        firmwareTypeName: editData.firmwareTypeName
      })
    }
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      title={type === 'edit' ? '编辑产品固件模块' : '配置产品固件模块'}
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
              name='firmwareTypeMark'
              rules={[
                { required: true, message: '请输入英文字符' },
                { pattern: new RegExp(/^[a-zA-Z]+$/, "g"), message: '请输入英文字符' }
              ]}>
              <Input maxLength={50} placeholder="请输入英文字符" />
            </Form.Item>
            <Form.Item
              label="配置固件模块名称"
              name='firmwareTypeName'
              rules={[
                { required: true, message: '请输入中文名称' },
                { pattern: new RegExp(/^[\u2E80-\u9FFF]+$/, "g"), message: '请输入中文产品名称' }
              ]}>
              <Input maxLength={50} placeholder="请输入中文名称" />
            </Form.Item>
          </div>
          {
            type === 'add' &&
            <Form.List name="list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div className="form-item-block" key={key}>
                      <Form.Item
                        label="配置固件模块标识"
                        {...restField}
                        name={[name, 'firmwareTypeMark']}
                        fieldKey={[fieldKey, 'firmwareTypeMark']}
                        rules={[
                          { required: true, message: '请输入英文字符' },
                          { pattern: new RegExp(/^[a-zA-Z]+$/, "g"), message: '请输入英文字符' }
                        ]}>
                        <Input maxLength={50} placeholder="请输入英文字符" />
                      </Form.Item>
                      <Form.Item
                        label="配置固件模块名称"
                        {...restField}
                        name={[name, 'firmwareTypeName']}
                        fieldKey={[fieldKey, 'firmwareTypeName']}
                        rules={[
                          { required: true, message: '请输入中文名称' },
                          { pattern: new RegExp(/^[\u2E80-\u9FFF]+$/, "g"), message: '请输入中文产品名称' }
                        ]}>
                        <Input maxLength={50} placeholder="请输入中文名称" />
                      </Form.Item>
                      <div className="delete-btn" onClick={() => remove(name)}><DeleteOutlined />&nbsp;&nbsp;删除</div>
                    </div>
                  ))}
                  <div className="add-btn" onClick={() => add()}>新增</div>
                </>
              )}
            </Form.List>
          }
        </Form>
      </div>
    </Modal>
  )
}

export default ConfigFirmware
