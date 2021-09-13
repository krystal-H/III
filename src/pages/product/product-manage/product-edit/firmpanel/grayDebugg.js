import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { post, Paths } from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import './grayDebugg.scss';
const { TabPane } = Tabs;
export default function AddFuncModal({ isGrayModalVisible, closeDebugg, CancelDebugg, actionObj }) {
    let productId = 0
    if (sessionStorage.getItem('productItem')) {
        productId = JSON.parse(sessionStorage.getItem('productItem')).productId
    }
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
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
    const [applist, setApplist] = useState([])
    const getAoolist = () => {
        post(Paths.panelApplicationList, { productId }).then((res) => {
            setApplist(res.data)
        });
    }
    useEffect(() => {
        getAoolist()
    }, [])
    const [currentTab, setCurrentTab] = useState('1')
    const callback = (key) => {
        setCurrentTab(key);
    }
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    const closeOk = () => {
        let currentForm
        if (currentTab == 1) {
            currentForm = form
        } else {
            currentForm = form2
        }
        let value = currentForm.getFieldsValue()
        let accountList = []
        if(value.accountList){
            value.accountList.forEach(item => {
                accountList.push(Number(item))
            })
        }
        
        let params = {
            productId,
            projectId: actionObj.projectId,
            newAppIds: selectAppId,
            accountList
        }
        if(!selectAppId){
            return
        }
        // console.log(params,'=============')
        // return
        post(Paths.greyModel, params).then((res) => {
            closeDebugg()
        });
        // currentForm.validateFields().then(value => {
        //     let accountList=[]
        //     value.accountList.forEach(item=>{
        //         accountList.push(Number(item))
        //     })
        //     let params = {
        //         productId,
        //         projectId: actionObj.projectId,
        //         newAppIds: selectAppId,
        //         accountList
        //     }
        //     post(Paths.greyModel, params).then((res) => {
        //         closeDebugg()
        //     });
        // }).catch(err => {
        //     // 验证不通过时进入
        // });
    }
    //
    const [selectAppId, setSelectAppId] = useState('')
    const selectApp = (type, appId) => {
        setSelectAppId(appId)
    }
    //添加枚举参数
    const AddEnums = (add, count) => {
        if (count > 10) {
            Notification({
                description: `不能超过10条数据`,
                type: 'warn'
            });
            return
        }
        add()
    }
    const getAppListDOM = (type) => {
        let _apps = applist.filter(item => type ? item.isOfficialApp : !item.isOfficialApp),
            className = 'app-icon';
        return (
            _apps.length > 0 ?
                _apps.map((item) => {
                    let { appIcon, appName, appId } = item;

                    className = 'app-icon'; // 重置class的值

                    if (selectAppId == appId) {
                        className += ' active';
                    }

                    return (
                        <div className="app-item" key={type + '-' + appId} onClick={() => selectApp(type, appId)}>
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
                                    <div className="app-items-wrapper">
                                        {
                                            getAppListDOM(true)
                                        }
                                    </div>
                                </div>
                                <div className='GrayModal-form-wrap'>
                                    <Form
                                        wrapperCol={{ span: 16 }}
                                        form={form}
                                    >
                                        <Form.List
                                            name="accountList"
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
                                                                rules={[{ pattern: /^(((\d{3,4}-)?\d{7,8})|(1\d{10}))$/, whitespace: true, message: '请输入正确的手机号码' }]}
                                                                noStyle
                                                            >
                                                                <Input placeholder="请输入手机号码"
                                                                    style={{ width: '214px', marginRight: '10px' }} />
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
                                                            onClick={() => AddEnums(add, fields.length)}
                                                        >
                                                            添加调试账号
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
                                <div className='GrayModal-img-wrap'>
                                    <div className="app-items-wrapper">
                                        {
                                            getAppListDOM(false)
                                        }
                                    </div>
                                </div>
                                <div className='GrayModal-form-wrap'>
                                    <Form
                                        wrapperCol={{ span: 16 }}
                                        form={form2}
                                    >
                                        <Form.List
                                            name="accountList"
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
                                                                rules={[{ pattern: /^(((\d{3,4}-)?\d{7,8})|(1\d{10}))$/, whitespace: true, message: '请输入正确的手机号码' }]}
                                                                noStyle
                                                            >
                                                                <Input placeholder="请输入手机号码"
                                                                    style={{ width: '214px', marginRight: '10px' }} />
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
                                                            onClick={() =>{AddEnums(add, fields.length)}}
                                                        >
                                                            添加调试账号
                                                        </a>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </Form>
                                </div>

                            </TabPane>

                        </Tabs>
                    </div>
                </div>

            </Modal>
        </div>
    )
}