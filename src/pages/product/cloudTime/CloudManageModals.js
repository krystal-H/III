import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, Form, Select, Tooltip, Button } from 'antd';
import { DeleteOutlined, QuestionCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Notification } from '../../../components/Notification';
import { cloneDeep, uniq, difference } from 'lodash'

import './CloudManageModals.scss'

const { Option } = Select;

export function CloudAddForm({ cloudAddVisible, onCancel, type }) {
    const [form] = Form.useForm()

    const [isShowAddItem, setIsShowAddItem] = useState(false)
    const [protocolItemIndex, setProtocolItemIndex] = useState('') // 当前选中的协议
    const [selectedProtocolList, setSelectedProtocolList] = useState([]) // 弹框中所有被选中的协议

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const onOk = () => {
        form.submit()
    }
    const initialList = [
        {
            key: 1,
            value: 'aaa'
        },
        {
            key: 2,
            value: 'bbb'
        },
        {
            key: 3,
            value: 'ccc'
        },
        {
            key: 4,
            value: 'ddd'
        },

    ]
    useEffect(() => {
        console.log(selectedProtocolList)
    }, [selectedProtocolList])
    // 确定选择协议
    const addProtocol = () => {
        if (protocolItemIndex === '') {
            Notification({
                type: 'error',
                message: '参数缺失',
                description: '请先选择一个控制协议字段'
            })
            return false;
        }
        setSelectedProtocolList((prev) => {
            const preArr = cloneDeep(prev)
            preArr.push(protocolItemIndex)
            return uniq(preArr)
        })

        setIsShowAddItem(false)
    }
    // 协议下拉选项
    const getOptions = () => {
        // 剩余未选择的list返回
        const remainList = []
        return initialList.map((item, index) => {
            return <Option key={index} value={item.value}>{item.value}</Option>
        })
    }
    // 过滤选择过的

    return (
        <Modal
            title="添加云端定时功能"
            width={555}
            visible={cloudAddVisible}
            onOk={onOk}
            onCancel={onCancel}
            maskClosable={false}
            destroyOnClose={true}
            wrapClassName="replace-module-modal">
            <div className="cloud-manage-modal">
                <Form
                    form={form}
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 19 }}>
                    <Form.Item
                        label="功能名称"
                        name="serviceName"
                        rules={[
                            { required: true, message: '请输入功能名称' }, { max: 20, message: '最大输入长度为20' }
                        ]}>
                        <Input placeholder="不超过20个字符" />
                    </Form.Item>
                    <Form.Item
                        label="归属产品"
                        name="username"
                        rules={[{ required: true, message: '请选择归属产品' }]}>
                        <Select >
                            <Option value="Option1-1">Option1-1</Option>
                            <Option value="Option1-2">Option1-2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={
                            <>
                                关联协议
                                <Tooltip
                                    title={'MCU' ? '包含MCU SDK、串口协议、模组调试助手等' : '包含模组 SDK、Bin文件等'}
                                    placement="top">
                                    <QuestionCircleOutlined className="tooltip-icon" />
                                </Tooltip>
                            </>
                        }>
                        <Form.List name="list">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                        
                                        // fields.length - 1 !== key && 
                                        <div className="relation-agree-wrapper" key={key}>
                                            <div className="select-area">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'first']}
                                                    fieldKey={[fieldKey, 'first']}
                                                    rules={[
                                                        { required: true, message: '请选择关联协议' },
                                                        { pattern: new RegExp(/^[a-zA-Z]+$/, "g"), message: '请选择关联协议' }
                                                    ]}>
                                                    <Select value={protocolItemIndex}
                                                        onChange={value => setProtocolItemIndex(value)}
                                                        style={{ width: 290 }}>
                                                        <Option key="" value=""></Option>
                                                        {getOptions()}
                                                    </Select>
                                                </Form.Item>
                                            </div>
                                            <div className="control-btns">
                                                <div className="confirm-btn" onClick={() => {
                                                    console.log(fields, 'arrr', key, name, fieldKey, index)
                                                    addProtocol()

                                                }}>
                                                    <CheckCircleOutlined />&nbsp;确定
                                                </div>
                                                <div className="del-btn" onClick={() => remove(name)}>
                                                    <DeleteOutlined />&nbsp;删除
                                                </div>
                                            </div>
                                        </div>
                                        // }
                                    ))}
                                    {/* <div className="add-btn" onClick={() => add()}>新增</div> */}
                                    <Button className="add-btn" onClick={() => {
                                        setIsShowAddItem(true)
                                        add()
                                    }}>添加功能点</Button>
                                </>
                            )}
                        </Form.List>
                        {/* {
                            <div className="relation-agree-wrapper">
                                <div className="protocol-select-area">
                                    <Select value={currentItem}
                                        onChange={value => setCurrentItem(value)}
                                        style={{ width: 290 }}>
                                        <Option key="" value=""></Option>
                                    </Select>
                                </div>
                                <div className="control-btns">
                                    <div className="confirm-btn">
                                        <CheckCircleOutlined />&nbsp;确定
                                    </div>
                                    <div className="del-btn">
                                        <DeleteOutlined />&nbsp;删除
                                    </div>
                                </div>
                            </div>
                        } */}
                        {/* <Button className="add-btn" >添加功能点</Button> */}
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}