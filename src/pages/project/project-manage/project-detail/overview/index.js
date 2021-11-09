import React, { useState, useEffect } from 'react'
import { Descriptions, Divider, Icon, Tooltip, Modal, Form, Input } from 'antd';
import { post, Paths, get } from '../../../../../api';
import LabelVisible from '../../../../../components/form-com/LabelVisible';
import LabelTip from '../../../../../components/form-com/LabelTip';
import { copyTextToClipBoard, strToAsterisk, DateTool } from '../../../../../util/util';
import EditableTable from './editTable'
import './index.scss'
export default function DeviceInfo({ devceId }) {
    const [data, setData] = useState({})
    const [form] = Form.useForm();
    //修改密码
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then(val => {
            // setIsModalVisible(false);
        })

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        if (devceId) {
            getDetail()
        }
    }, [devceId])
    const getDetail = (loading = true) => {

    }
    const handleClick = (text) => {
        return copyTextToClipBoard(text)
    }
    //过滤函数
    const fliterFn = (value) => {
    }
    return (<div id='project-detail-info'>
        <div className='wrap-item'>
            <div className='item-title'>
                <span>设备信息<LabelTip tip="产品标签是您给产品自定义的标识，您可以使用标签功能实现产品的分类统一管理。"></LabelTip></span>
            </div>
            <div className='item-content'>
                <div className='item'>
                    <div className='label'>账号名称：</div>
                    <div className='name'>
                        <span>产品标签是您给产品自定义的标识</span>
                        <span className='copy' onClick={() => { handleClick('产品标签是您给产品自定义的标识') }} >复制</span>
                    </div>
                </div>
                <div className='item'>
                    <div className='label'>初始密码：</div>
                    <div className='name'>
                        <LabelVisible label={'面对疾风吧'} tip="点击复制" copy={true} />
                    </div>
                </div>
            </div>
            <div className='item-content'>
                <div className='item'>
                    <div className='label'>账号 ID：</div>
                    <div className='name'>
                        <span>7778444</span>
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
                    </div>
                </div>
            </div>
            <div className='item-content'>
                <div className='item'>
                    <div className='label'>项目SecretKey：：</div>
                    <div className='name'>
                        <LabelVisible label={'面对疾风吧'} tip="点击复制" copy={true} />
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
                <EditableTable />
            </div>
        </div>
        {
            <Modal title="设置密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                >
                    <Form.Item label="输入旧密码" required >
                        <Input  />
                    </Form.Item>
                    <Form.Item label="输入新密码" required >
                        <Input  />
                    </Form.Item>
                    <Form.Item label="确定新密码" required >
                        <Input  />
                    </Form.Item>
                </Form>
            </Modal>
        }
    </div>)
}