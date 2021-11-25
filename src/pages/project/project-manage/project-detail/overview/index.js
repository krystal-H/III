import React, { useState, useEffect } from 'react'
import { Descriptions, Divider, Icon, Tooltip, Modal, Form, Input } from 'antd';
import { post, Paths, get } from '../../../../../api';
import LabelVisible from '../../../../../components/form-com/LabelVisible';
import LabelTip from '../../../../../components/form-com/LabelTip';
import { Notification } from '../../../../../components/Notification';
import { copyTextToClipBoard, strToAsterisk, DateTool } from '../../../../../util/util';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import EditableTable from './editTable'
import './index.scss'
export default function DeviceInfo({ baseInfo, projectId }) {
    const [form] = Form.useForm();
    //修改密码
    const [isModalVisible, setIsModalVisible] = useState(false);
    //
    const [showPassWord, setShowPassWord] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(val => {
            let params = {
                accountId: baseInfo.accountId,
                password: val.password,
                oldPassword: val.oldPass
            }
            post(Paths.projectSavePS, params, { loading: true }).then(res => {
                Notification({
                    type: 'success',
                    description: '修改成功！',
                });
                setIsModalVisible(false);
            })
        })

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleClick = (text) => {
        return copyTextToClipBoard(text)
    }
    return (<div id='project-detail-info'>
        <div className='wrap-item'>
            <div className='item-title'>
                <span>设备信息</span>
            </div>
            <div className='item-content'>
                <div className='item'>
                    <div className='label'>账号名称：</div>
                    <div className='name'>
                        <span>{baseInfo.accountInitName}</span>
                        <a className='copy' onClick={() => { handleClick(baseInfo.accountInitName) }} >复制</a>
                    </div>
                </div>
                <div className='item'>
                    <div className='label'>初始密码：</div>
                    <div className='name'>
                        <span style={{marginRight:'5px'}}>
                        {
                            showPassWord ? baseInfo.accountInitPassword : '*********'
                        }
                        </span>
                        {
                            showPassWord ? <EyeOutlined style={{ color: '#2F78FF' }} onClick={() => setShowPassWord(!showPassWord)} /> :
                                <EyeInvisibleOutlined style={{ color: '#2F78FF' }} onClick={() => setShowPassWord(!showPassWord)} />
                        }
                        <a className='copy' onClick={() => { handleClick(baseInfo.accountInitPassword) }} >复制</a>
                    </div>
                </div>
            </div>
            <div className='item-content'>
                <div className='item'>
                    <div className='label'>账号 ID：</div>
                    <div className='name'>
                        <span>{baseInfo.accountId}</span>
                    </div>
                </div>
                <div className='item'>
                    <div className='label'><a onClick={showModal}>设置密码</a></div>
                </div>
            </div>
        </div>
        <Divider />
        <div className='wrap-item'>
            <div className='item-title'>
                <span>授权密钥</span>
            </div>
            <div className='item-content'>
                <div className='item'>
                    <div className='label'>项目secretId：</div>
                    <div className='name'>
                        {baseInfo.secretId}
                    </div>
                </div>
            </div>
            <div className='item-content'>
                <div className='item'>
                    <div className='label'>项目SecretKey：</div>
                    <div className='name'>
                        <LabelVisible label={baseInfo.secretKey} tip="点击复制" copy={true} />
                    </div>
                </div>
            </div>
        </div>
        <Divider />
        <div className='wrap-item'>
            <div className='item-title'>
                <span>IP白名单</span>
            </div>
            <div>
                <EditableTable projectId={projectId} />
            </div>
        </div>
        {
            isModalVisible && <Modal title="设置密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                >
                    <Form.Item label="输入旧密码" name='oldPass' rules={[
                        {
                            required: true,
                            validator: (_, value) => {
                                if (value) {
                                    if (value == baseInfo.accountInitPassword) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject(`原始密码有误`)
                                    }
                                } else {
                                    return Promise.reject(`请输入旧密码`)
                                }

                            }
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="输入新密码" name='password' rules={[{ required: true, message: '请输入新密码' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="确定新密码" name='conFirmPs' rules={[
                        {
                            required: true,
                            validator: (_, value) => {
                                if (value) {
                                    if (value == form.getFieldValue('password')) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject(`密码不一致`)
                                    }
                                } else {
                                    return Promise.reject(`请再次输入新密码`)
                                }

                            }
                        }
                    ]} >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        }
    </div>)
}