import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Modal, Button, Input, Select, InputNumber, Form, Upload, message } from 'antd';
import { UploadFileHooks } from '../../../../../components/upload-file';
import { UploadOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash'
import ErrorModal from './errorModel'
import { Notification } from '../../../../../components/Notification';
import './index.scss'
import { post, Paths } from '../../../../../api';
import { DateTool } from '../../../../../util/util'
export default function AddFuncModal({ isModalVisible, colseMoadl, cancelModel, projectId }) {
    const [form] = Form.useForm();
    const [fileList, setfileList] = useState([])
    const [errorList, setErrorList] = useState([])
    const [showError, setShowError] = useState(false)
    const [isHasError, setIsHasError] = useState(false)
    const [sentData,setSentData]= useState([])
    //提交数据
    const subData = () => {
        form.validateFields().then(value => {
            let isContinue = errorList.every(item => {
                if (!item.errorType) {
                    return true
                }
            })
            if (isHasError) {
                Notification({
                    type: 'warn',
                    description: '请导入正确的文件',
                });
                return
            }
            let params = {
                projectBatch: {
                    batchName: value.name,
                    projectId
                },
                projectBatchDetailList: sentData
            }
            post(Paths.projectSaveFile, params,{loading:true}).then((res) => {
                Notification({ description: '操作成功！', type: 'success' })
                colseMoadl()
            });
        }).catch(err => {
            // 验证不通过时进入
        });
    }

    //下载模板
    const downfile = () => {
        window.open('https://skintest.hetyj.com/b325662c4122f1b8948fe07c9d782ecb.xlsx')
    }
    //导入
    const customRequest = (option) => {
        post(Paths.projectImportFile, { uploadExcel: option.file }, {loading:true, needFormData: true }, { timeout: 1000 * 30 }).then(res => {
            console.log(form.getFieldsValue())
            setfileList(pre => {
                let file = [{ name: option.file.name, url: "" }]
                return file
            })
            let isError = res.data.every(item => {
                if (!item.errorType) {
                    return true
                }
            })
            setIsHasError(!isError)
            setErrorList(pre => {
                let arr = res.data.filter(item => {
                    if (item.errorType) {
                        return item
                    }
                })
                return arr
            })
            setSentData(res.data)
            let name = ''+DateTool.pekingToStr(new Date())+'导入'
            form.setFieldsValue({ name })

        })
    }
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        if (['xls', 'xlsx'].indexOf(e.file.name.split('.').slice(-1)[0]) == -1 || e.fileList.length > 1) {
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
    const onCancelError = () => {
        setShowError(false)
    }
    return (
        <div>
            <Modal title="导入设备" visible={isModalVisible} onOk={subData} onCancel={cancelModel} width='650px' wrapClassName='add-protocols-wrap'>
                <div style={{ padding: '0 80px' }} className='project-import-file-wrap'>
                    <Form form={form} labelAlign='right' labelCol={{
                        span: 6,
                    }}
                        wrapperCol={{
                            span: 18,
                        }}>
                        <Form.Item
                            name="name"
                            label="批次名称"
                            rules={[{ required: true }]}
                        ><Input  placeholder='默认批次名称为导入时间+导入字样后缀' maxLength={50}/>
                        </Form.Item>
                        <Form.Item
                            label="上传文件"
                            className='file-form-item'
                            extra='支持xls、xlsx格式'
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
                                    {<Button type='primary' icon={<UploadOutlined />}>{fileList.length ? '重新上传' : '上传附件'}</Button>}
                                </Upload>
                            </Form.Item>
                            <a className='down-model' onClick={downfile} style={{ marginLeft: '20px' }}>下载模板</a>
                        </Form.Item>
                        <div className='project-import-file-list'>
                            {
                                fileList.map((item, index) => {
                                    return <div key={index}>
                                        <span className='name'>{item.name}</span>
                                        {isHasError && <span className='tip' onClick={() => { setShowError(true) }}>错误日志</span>}
                                    </div>
                                })
                            }
                        </div>
                    </Form>
                </div>
            </Modal>
            {
                showError && <ErrorModal errorList={errorList} visible={showError} onCancel={onCancelError} />
            }
        </div>
    )
}