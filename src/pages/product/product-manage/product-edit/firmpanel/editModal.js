import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Select, Checkbox, Form, Space, Upload, message } from 'antd';
import { UploadFileHooks } from '../../../../../components/upload-file';
import { post, Paths } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import './newModal.scss';
export default function AddModal({ isAddModalVisible, closeAdd, CancelAdd ,actionObj}) {
    const [form] = Form.useForm();
    const $apkel = useRef(null)
    const $el = useRef(null)
    const closeReqAdd = () => {
        let productId=0
        if (sessionStorage.getItem('productItem')) {
            productId = JSON.parse(sessionStorage.getItem('productItem')).productId
        }
        form.validateFields().then(value => {
            // 验证通过后进入
            let params = {
                productId,
                filePath: value.filePath[0].url,
                projectType:1,
                projectName:value.projectName,
                projectId:actionObj.projectId,
                page1:value.page1[0].url,
                panelType:3
            }
            post(Paths.cusSavePanel, params,{loading:true}).then((res) => {
                Notification({
                    type: 'success',
                    description: '更新成功！',
                });
                closeAdd()
            });
        }).catch(err => {
            // 验证不通过时进入
        });
    }
    return (
        <Modal title="编辑面板" visible={isAddModalVisible} onOk={closeReqAdd} onCancel={CancelAdd} width='570px' wrapClassName='add-modal-dialog-wrap'>
            <div>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    initialValues={{
                        projectName:actionObj.projectName,
                        filePath:[{url:actionObj.filePath,name:actionObj.filePath}],
                        page1:[{url:actionObj.page1}]
                    }}
                >
                    <Form.Item
                        label="产品名称"
                        name="projectName"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="封面："
                        name="page1"
                        className="clearfix"
                        rules={[{ required: true, message: '请上传封面' }]}
                    >
                        {
                            <UploadFileHooks
                                ref={$el}
                                maxCount={1}
                                preferSize={'750*1334'}
                                format='.jpeg,.jpg,.png'
                                maxSize={0.5} />

                        }
                    </Form.Item>
                    <Form.Item
                        label="上传H5包："
                        name="filePath"
                        className="clearfix"
                        rules={[{ required: true, message: '请上传H5包'  }]}
                    >
                        <UploadFileHooks
                            ref={$apkel}
                            maxCount={1}
                            format='.zix'
                            maxSize={50}
                            isNotImg={true}
                        />
                    </Form.Item>

                </Form>
            </div>
        </Modal>
    )
}