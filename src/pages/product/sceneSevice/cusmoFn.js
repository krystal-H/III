import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form, Input, Table, Modal } from 'antd'
const { TextArea } = Input;
export default function AddModel({ addVisible, addOk, CancelAdd }) {
  const [form] = Form.useForm();
  return (
    <div >
      <Modal title="自定义" visible={addVisible} onOk={addOk} onCancel={CancelAdd} width='725px' wrapClassName='add-protocols-wrap'>
        <div>
        </div>
      </Modal>
    </div>
  )
}