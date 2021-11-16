import React, { useState, useEffect } from 'react'
import { Modal, Form, Input } from 'antd'
import { Paths, post, get } from '../../../../api'
import { Notification } from '../../../../components/Notification'

function CreateProject({ visible, handleCancel, handleOk, opeType, editData = {} }) {
  const [form] = Form.useForm()

  const onOk = () => {
    form.submit();
  }

  const onFinish = (values) => {
    console.log('Success:', values)
    let params = {...values}
    if (opeType === 'edit') {
      params.projectId = editData.projectId
    }
    post(Paths.saveProjectInfo, params, { loading: true })
      .then(res => {
        Notification({ description: '操作成功！', type: 'success' })
        handleOk()
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal
      title={opeType === 'add' ? "创建项目" : '编辑项目'}
      destroyOnClose
      maskClosable={false}
      visible={visible}
      width={600}
      onCancel={handleCancel}
      onOk={onOk}
      wrapClassName={'remote-config-modal'}>
      <Form
        form={form}
        name="filTask"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          name: editData.name || '',
          desc: editData.desc || ''
        }}
      >
        <Form.Item
          label="项目名称"
          name="projectName"
          initialValue={editData.projectName}
          rules={[
            { required: true, message: '请输入项目名称' },
            { max: 50, message: '最大输入长度为50' },]}>
          <Input placeholder="请输入项目名称，不能超过50个字符" style={{ width: 415 }} />
        </Form.Item>
        <Form.Item name="projectDesc" label="项目描述" initialValue={editData.projectDesc} >
          <Input.TextArea showCount maxLength={50} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateProject
