import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form, Space, Upload, message } from 'antd';
import { MinusCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFileHooks } from '../../../../../components/upload-file';
import './newModal.scss';
export default function AddModal({ isAddModalVisible, closeAdd, CancelAdd }) {
    useEffect(() => {
    }, [])
    const $el = useRef(null)
    const $apkel = useRef(null)
    const onFinish = value => {
        console.log(value)
    }
    return (
            <Modal title="新增面板" visible={isAddModalVisible} onOk={closeAdd} onCancel={CancelAdd} width='570px' wrapClassName='add-modal-dialog-wrap'>
                <div>
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="发布模式："
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="封面："
                            name="basic2"
                            className="clearfix"
                        >
                            {
                                <UploadFileHooks
                                    ref={$el}
                                    maxCount={1}
                                    preferSize={'750*1334'}
                                    format='.gif,.jpeg,.jpg,.png'
                                    maxSize={0.5} />

                            }
                        </Form.Item>
                        <Form.Item
                            label="上传H5包："
                            name="basic3"
                            className="clearfix"
                        >
                            <UploadFileHooks
                                ref={$apkel}
                                maxCount={1}
                                format='.apk'
                                maxSize={50}
                                isNotImg={true}
                               />
                        </Form.Item>

                    </Form>
                </div>
            </Modal>
    )
}