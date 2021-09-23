import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Select, Checkbox, Form, Space, Upload, message } from 'antd';
import { UploadFileHooks } from '../../../../../components/upload-file';
import { post, Paths } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import './newModal.scss';
function debounce(fn, wait = 1000, immediate) {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        if (immediate && !timer) {
            fn.apply(this, args)
        }
        // ------ 新增部分 end ------ 

        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}
export default function AddModal({ isAddModalVisible, closeAdd, CancelAdd }) {
    const [form] = Form.useForm();
    useEffect(() => {
    }, [])
    const $el = useRef(null)
    const $apkel = useRef(null)
    const closeReqAdd = () => {
        let productId = 0
        if (sessionStorage.getItem('productItem')) {
            productId = JSON.parse(sessionStorage.getItem('productItem')).productId
        }
        form.validateFields().then(value => {
            // 验证通过后进入
            let params = {
                productId,
                filePath: value.filePath[0].url,
                projectType: 1,
                projectName: value.projectName,
                page1: value.page1[0].url,
                panelType: 3
            }
            post(Paths.cusSavePanel, params).then((res) => {
                Notification({
                    type: 'success',
                    description: '新增成功！',
                });
                closeAdd()
            });
        }).catch(err => {
            // 验证不通过时进入
        });
    }
    return (
        <Modal title="新增面板" visible={isAddModalVisible} onOk={debounce(closeReqAdd)} onCancel={CancelAdd} width='570px' wrapClassName='add-modal-dialog-wrap'>
            <div>
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                >
                    <Form.Item
                        label="产品名称"
                        name="projectName"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="封面"
                        name="page1"
                        className="clearfix"
                        rules={[{ required: true, message: '请上传封面' }]}
                    >

                        <UploadFileHooks
                            ref={$el}
                            maxCount={1}
                            preferSize={'247*439'}
                            format='.jpeg,.jpg,.png'
                            maxSize={0.5} />
                    </Form.Item>
                    <Form.Item
                        label="上传H5包"
                        name="filePath"
                        className="clearfix"
                        rules={[{ required: true, message: '请上传H5包' }]}
                    >
                        <UploadFileHooks
                            ref={$apkel}
                            maxCount={1}
                            format='.zix'
                            maxSize={5}
                            isNotImg={true}
                        />
                    </Form.Item>

                </Form>
            </div>
        </Modal>
    )
}