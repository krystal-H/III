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

function CreateTask({ visible, onCancel }) {
    const refConfig = useRef()
    const [form] = Form.useForm()
    const [stepcurrent, setStepcurrent] = useState(2)

    const onOk = () => {
        form.submit()
    }

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
            console.log(refConfig, 'refConfig')
            refConfig.current.onFinish()
        } else if (stepcurrent === 2) { // 选择配置更新的设备

        }
    }

    return (
        <Modal
            title="创建任务"
            centered
            destroyOnClose
            maskClosable={false}
            visible={visible}
            width={900}
            onCancel={onCancel}
            wrapClassName={'remote-config-modal'}
            footer={[
                stepcurrent !== 0 && <Button key="previous" onClick={() => clickPrevious()}>上一步</Button>,
                <Button type="primary" key="next" onClick={() => clickNext()}>{stepcurrent === 2 ? '确认创建' : '下一步'}</Button>
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
                        initialValues={{}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Form.Item
                            label="归属产品"
                            name="brandId"
                            rules={[{ required: true, message: '请选择归属产品' }]}>
                            <Select style={{ width: '100%' }} placeholder="请选择归属产品">
                                <Option value="option1">option1</Option>
                                <Option value="option2">option2</Option>
                                {/* {
                                    productBrandList.length > 0 && productBrandList.map(item => (
                                        <Option value={item.brandId} key={item.brandId}>{item.fullName}</Option>
                                    ))
                                } */}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="任务名称"
                            name="productName"
                            rules={[
                                { required: true, message: '请输入任务名称' },
                                { max: 20, message: '最大输入长度为20' },
                            ]}>
                            <Input style={{ width: '100%' }} placeholder="请输入任务名称，不能超过20个字符" />
                        </Form.Item>
                        <Form.Item
                            label="任务说明"
                            name="productParam"
                            rules={[
                                { required: true, message: '请输入任务说明' }
                            ]}>
                            <TextArea showCount maxLength={100}
                                placeholder="请输入任务说明"
                                autoSize={{ minRows: 4 }}
                            />
                        </Form.Item>
                    </Form>
                }

                {/* 添加配置数据 */}
                {
                    stepcurrent === 1 &&
                    <AddConfigData
                        ref={refConfig}
                        nextStep={nextStep} />
                }

                {/* 选择配置更新的设备 */}
                {
                    stepcurrent === 2 &&
                    <ChooseUpdateDevice />
                }

            </div>
        </Modal>
    )
}

export default CreateTask