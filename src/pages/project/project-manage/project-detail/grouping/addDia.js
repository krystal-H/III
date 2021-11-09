import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form } from 'antd';
import { post, Paths } from '../../../../../api';
export default function InfoModal({ ModalVisible, closeOk, onCancel }) {
    const [form] = Form.useForm();
    const subData = () => {
        form.validateFields().then(val=>{
            
        })
    }
    return (
        <div >
            <Modal title="新增分组" visible={ModalVisible} onOk={subData} onCancel={onCancel} width='564px' wrapClassName='add-protocols-wrap'>
                <div>
                    <Form
                        form={form}
                        name="InfoModal"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                    >
                        <Form.Item
                            name="password"
                            label="分组名称"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password1"
                            label="分组描述"
                        >
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}