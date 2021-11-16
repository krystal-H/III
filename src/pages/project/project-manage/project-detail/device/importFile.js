import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Button, Input, Select, InputNumber, Form } from 'antd';
import { UploadFileHooks } from '../../../../../components/upload-file';
import './index.scss'
import { post, Paths } from '../../../../../api';
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel }) {
    const [selectPro, setSelectPro] = useState(null)
    const [form] = Form.useForm();
    const $el = useRef(null)
    //提交数据
    const subData = () => {
        form.validateFields().then(value => {
            let params = {
                productId: value.productId,
                data: value.upload[0].url
            }
            post(Paths.proReledExport, params).then((res) => {
                colseMoadl()
            });
        }).catch(err => {
            // 验证不通过时进入
        });
    }

    //下载模板
    const downfile = () => {
        window.open('https://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx')
    }
    return (
        <div>
            <Modal title="导入设备" visible={isModalVisible} onOk={subData} onCancel={cancelModel} width='650px' wrapClassName='add-protocols-wrap'>
                <div style={{ padding: '0 80px' }}>
                    <Form form={form} labelAlign='right' labelCol={{
                        span: 6,
                    }}
                        wrapperCol={{
                            span: 18,
                        }}>
                        <Form.Item
                            name="productId"
                            label="批次名称"
                            rules={[{ required: true }]}
                        ><Input readOnly />
                        </Form.Item>
                        <Form.Item
                            label="上传文件"

                        >
                            <Form.Item
                                name="upload"
                                noStyle
                                rules={[{ required: true, message: '请上传文件' }]}
                            >
                                <UploadFileHooks
                                    ref={$el}
                                    maxCount={1}
                                    format='.xls,.xlsx'
                                    isNotImg={true}
                                    maxSize={10} />
                            </Form.Item>
                            <a className='down-model' onClick={downfile}>下载模板</a>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}