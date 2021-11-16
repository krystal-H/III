import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Button, Input, Select, InputNumber, Form, Upload, message } from 'antd';
import { UploadFileHooks } from '../../../../../components/upload-file';
import { UploadOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash'
import './index.scss'
import { post, Paths } from '../../../../../api';
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel }) {
    const [selectPro, setSelectPro] = useState(null)
    const [form] = Form.useForm();
    const $el = useRef(null)
    //提交数据
    const subData = () => {
        form.validateFields().then(value => {
            console.log(value, '=======')
            return
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
    const [fileList, setfileList] = useState([])
    //下载模板
    const downfile = () => {
        window.open('https://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx')
    }
    //导入
    const customRequest = (option) => {
        post(Paths.projectImportFile, { uploadExcel: option.file }, { needFormData: true }, { timeout: 1000 * 30 }).then(res => {
            console.log(form.getFieldsValue())
            setfileList(pre => {
                let file = cloneDeep(pre)
                file.push({ name: option.file.name, url: "" })
                return file
            })
        })
    }
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }

        if (['xls', 'xlsx'].indexOf(e.file.name.split('.').slice(-1)[0]) == -1) {
            e.fileList.pop()
        }
        return e && e.fileList;
    };
    const beforeUpload = (file, fileList, type) => {
        return new Promise((resolve, reject) => {
            let isFormal = type.indexOf(file.name.split('.').slice(-1)[0]) > -1
            if (!isFormal) {
                message.error(`只能上传${type.join(',')}格式`);
                return reject(false)
            }
            return resolve(true)
        })
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
                                noStyle
                                rules={[{ required: true, message: '请上传文件' }]}
                                name="upload"
                                getValueFromEvent={normFile}
                            >
                                <Upload customRequest={customRequest} showUploadList={false} accept='.xls,.xlsx' fileList={fileList}
                                    beforeUpload={(file, fileList) => { return beforeUpload(file, fileList, ['xls', 'xlsx']) }}
                                >
                                    <Button type='primary' icon={<UploadOutlined />}>导入自定义功能</Button>
                                </Upload>
                            </Form.Item>
                            <a className='down-model' onClick={downfile} style={{ marginLeft: '20px' }}>下载模板</a>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}