import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './grayDebugg.scss';
const { TabPane } = Tabs;
export default function AddFuncModal({ isGrayModalVisible, closeDebugg, CancelDebugg }) {
    const formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            span: 16, offset: 8
        },
    };
    useEffect(() => {
    }, [])
    const callback = (key) => {
        console.log(key);
    }
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    return (
        <div >
            <Modal title="灰度调试" visible={isGrayModalVisible} onOk={closeDebugg} onCancel={CancelDebugg} width='764px' wrapClassName='add-protocols-wrap'>
                <div>
                    <div className='GrayModal-top'>
                        <div>即将发布的页面：</div>
                        <div>面板2</div>
                    </div>
                    <div className='GrayModal-tip'>发布到应用：</div>
                    <div className='GrayModal-tab'>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="C-Life官方应用" key="1">
                                <div className='GrayModal-img-wrap'>
                                    <div className='GrayModal-img-wrap-item'>
                                        <img src='https://oimagec7.ydstatic.com/image?id=-636285311512234656&product=dict-homepage&w=200&h=150&fill=0&cw=200&ch=150&sbc=0&cgra=CENTER&of=jpeg'></img>
                                        <div className='GrayModal-img-wrap-check'>
                                            <Checkbox onChange={onChange}></Checkbox>
                                        </div>
                                    </div>
                                </div>
                                <div className='GrayModal-form-wrap'>
                                    <Form
                                        name="basic"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="gender"
                                            label="Gender"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Select
                                                allowClear
                                            >
                                                <Option value="male">male</Option>
                                                <Option value="female">female</Option>
                                                <Option value="other">other</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.List
                                            name="names2"
                                        >
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    {fields.map((field, index) => (
                                                        <Form.Item
                                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                            label={index === 0 ? '指定调试账号：' : ''}
                                                            required={false}
                                                            key={field.key}
                                                        >
                                                            <Form.Item
                                                                {...field}
                                                                validateTrigger={['onChange', 'onBlur']}
                                                                noStyle
                                                            >
                                                                <Input placeholder="passenger name" style={{ width: '214px', marginRight: '10px' }} />
                                                            </Form.Item>
                                                            {fields.length ? (
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    onClick={() => remove(field.name)}
                                                                />
                                                            ) : null}
                                                        </Form.Item>
                                                    ))}
                                                    <Form.Item {...(fields.length === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={fields.length === 0 ? '指定调试账号：' : ''}>
                                                        <a
                                                            onClick={() => add()}
                                                        >
                                                            添加参数
                                                        </a>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </Form>
                                </div>
                            </TabPane>
                            <TabPane tab="独立MCU方案" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                        </Tabs>
                    </div>
                </div>

            </Modal>
        </div>
    )
}