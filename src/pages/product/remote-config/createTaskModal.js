import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button, Table, Select, Steps, Form, Input } from 'antd'
import { createArrayByLength } from '../../../util/util'
import { get, post, Paths } from '../../../api'
import { Notification } from '../../../components/Notification'
import { cloneDeep } from 'lodash'
import AddConfigData from './addConfigData'
import ChooseUpdateDevice from './chooseUpdateDevice'

import './createTaskModal.scss'


const { TextArea } = Input
const { Option } = Select
const { Step } = Steps

const stepList = [
    {
        title: '填写任务说明'
    },
    {
        title: '添加配置数据'
    },
    {
        title: '选择配置更新的设备'
    }
]

function CreateTask({ visible, onCancel, allProductList, editData, getRemoteConfigList }) {
    const refConfig = useRef()
    const refDevice = useRef()
    const [form] = Form.useForm()
    const [stepcurrent, setStepcurrent] = useState(0)
    const [productId, setProductId] = useState('')


    const onOk = () => {
        form.submit()
    }

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        sessionStorage.setItem('remoteConfigtaskDesc', JSON.stringify(values))
        setProductId(values.productId)
        let index = cloneDeep(stepcurrent)
        setStepcurrent(++index)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    // 上一步
    const clickPrevious = () => {
        setStepcurrent(stepcurrent - 1)
    }

    // 下一步
    const nextStep = () => {
        setStepcurrent(stepcurrent + 1)
    }

    // 下一步前验证
    const clickNext = () => {
        if (stepcurrent === 0) { // 填写任务说明
            onOk()
        } else if (stepcurrent === 1) { // 添加配置数据
            console.log(refConfig, '-----------refConfig')
            refConfig.current.onFinish()
        } else if (stepcurrent === 2) { // 选择配置更新的设备
            console.log(refDevice, '-----------refDevice')
            refDevice.current.onFinish()
        }
    }

    return (
        <Modal
            title="创建任务"
            centered
            destroyOnClose
            maskClosable={false}
            visible={visible}
            width={1100}
            onCancel={onCancel}
            wrapClassName={'remote-config-modal'}
            footer={[
                stepcurrent !== 0 && <Button key="previous" onClick={() => clickPrevious()}>上一步</Button>,
                <Button type="primary" key="next" onClick={() => clickNext()}>{stepcurrent === 2 ? '提交' : '下一步'}</Button>
            ]}>
            <div className="remote-config">
                <div className="step-box">
                    <Steps current={stepcurrent}>
                        {stepList.map((item, index) => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </div>
                {/* 填写任务说明 */}
                {
                    stepcurrent === 0 &&
                    <Form
                        form={form}
                        name="filTask"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{
                            productId: editData.productId || '',
                            taskName: editData.taskName,
                            taskExplain: editData.taskExplain
                        }}>
                        <Form.Item
                            label="归属产品"
                            name="productId"
                            rules={[{ required: true, message: '请选择归属产品' }]}>
                            <Select style={{ width: '100%' }} placeholder="请选择归属产品">
                                {
                                    allProductList && allProductList.map(item => (
                                        <Option key={item.productId} value={item.productId}>{item.productName}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="任务名称"
                            name="taskName"
                            rules={[
                                { required: true, message: '请输入任务名称' },
                                { max: 20, message: '最大输入长度为20' },
                            ]}>
                            <Input style={{ width: '100%' }} placeholder="请输入任务名称，不能超过20个字符" />
                        </Form.Item>
                        <Form.Item
                            label="任务说明"
                            name="taskExplain"
                            rules={[
                                { required: true, message: '请输入任务说明' }
                            ]}>
                            <TextArea showCount maxLength={100}
                                placeholder="请输入任务说明"
                                autoSize={{ minRows: 4 }} />
                        </Form.Item>
                    </Form>
                }

                {/* 添加配置数据 */}
                {
                    stepcurrent === 1 &&
                    <AddConfigData
                        ref={refConfig}
                        productId={productId}
                        editData={editData}
                        nextStep={nextStep} />
                }

                {/* 选择配置更新的设备 */}
                {
                    stepcurrent === 2 &&
                    <ChooseUpdateDevice
                        ref={refDevice}
                        productId={productId}
                        editData={editData}
                        onCancel={onCancel}
                        getRemoteConfigList={getRemoteConfigList} />
                }

            </div>
        </Modal>
    )
}

export default CreateTask
