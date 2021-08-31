import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { post, Paths } from '../../../../../api';
import './grayDebugg.scss';
const { TabPane } = Tabs;
export default function AddFuncModal({ isGrayModalVisible, closeDebugg, CancelDebugg, actionObj }) {
    const [form] = Form.useForm();
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
    const closeOk = () => {
        form.validateFields().then(value => {
            // 验证通过后进入
            let params = {

            }
            post(Paths.cusSavePanel, params).then((res) => {
                closeDebugg()
            });
        }).catch(err => {
            // 验证不通过时进入
        });
    }
    //
    const getAppListDOM = (type) => {
        let { selectedAppId } = this.state,
            { appsByProductId } = this.props,
            _apps = appsByProductId.filter(item => type == '0' ? item.isOfficialApp : !item.isOfficialApp),
            className = 'app-icon';
        return (
            _apps.length > 0 ?
                _apps.map((item) => {
                    let { appIcon, appName, appId } = item;

                    className = 'app-icon'; // 重置class的值

                    if (selectedAppId == appId) {
                        className += ' active';
                    }

                    return (
                        <div className="app-item" key={type + '-' + appId} onClick={() => this.selectApp(type, appId)}>
                            <div className={className}>
                                <img src={appIcon} alt="应用图标" />
                            </div>
                            <span className="gray-text app-name">{appName}</span>
                        </div>
                    )
                })
                :
                <div style={{ textAlign: 'center' }} className="explain-text">{`该产品暂无${type === '0' ? '官方' : "私有"}应用`}</div>
        )
    }
    return (
        <div >
            <Modal title="灰度调试" visible={isGrayModalVisible} onOk={closeOk} onCancel={CancelDebugg} width='764px' wrapClassName='add-protocols-wrap'>
                <div>
                    <div className='GrayModal-top'>
                        <div>即将发布的页面：</div>
                        <div>{actionObj.projectName}</div>
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
                                        wrapperCol={{ span: 16 }}
                                    >
                                        {/* <Form.Item
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
                                        </Form.Item> */}
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