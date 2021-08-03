import React, { useState } from 'react'
import VerificationCodeInput from '../../../components/verification-code-input/VerificationCodeInput';
import { Input, Button, Checkbox, Modal,Form } from 'antd';
import {post,Paths} from '../../../api'
import { encryption ,getVcodeImgUrl,psdPattern} from '../../../util/util';
import ServiceAgreeMentModal from './ClifeAgree';

export default function RegisterForm({
    registerEmailGuide
}){
    const [vCodeImgUrl, setvCodeImgUrl] = useState(getVcodeImgUrl());
    const [agreeVisible, setAgreeVisible] = useState(false);
    const [form] = Form.useForm();
    const onFinish = values => {
        const {email,password,veriCode} = values
        const _values = {
            email,
            password:encryption(password),
            userName:email,
            verifyCode:veriCode
        };

        post(Paths.register,_values,{loading:true,}).then(data => {
            registerEmailGuide({ account:email })
        }).catch(error => {
            refreshVeriCode()
            resetPswAndCode()
        })

    };
    const refreshVeriCode = () => {
        setvCodeImgUrl(getVcodeImgUrl())
    }
    const resetPswAndCode = () => {
        // form.resetFields();
        form.resetFields([
            // 'password','passwordComfirm',
            'veriCode'
        ])
    }
    const toggleAgreVisi = () => {
        setAgreeVisible(!agreeVisible)
    }
            
    return <div>
            <Form form={form} className="form-wrapper" onFinish={onFinish}>
                <Form.Item name='email'
                    rules={[
                        { required: true, message: '请输入注册邮箱' },
                        { type: 'email', message: '请输入正确格式的邮箱' },
                        { max: 50,message:'邮箱地址最长为50个字符'}
                    ]}
                >
                    <Input placeholder="请使用邮箱注册" />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[
                        { required: true, message: '请输入账号密码' },
                        { pattern: psdPattern , message: '密码要求8到18位须同时包含字母、数字、符号'}
                    ]}
                >
                    <Input.Password placeholder="设置您的登录密码" />
                </Form.Item>
                <Form.Item
                    name='passwordComfirm'
                    dependencies={['password']}
                    rules={[
                        { required: true, message: '请确认账号密码' },
                        // { validator: (_, value) =>{
                        //     if (!value || form.getFieldValue('password') === value) {
                        //       return Promise.resolve();
                        //     }
                        //     return Promise.reject(new Error('两次密码输入不一致'));
                        //   }
                        // },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码输入不一致'));
                            },
                        }),
                        
                    ]}
                >
                    <Input.Password placeholder="请再次输入登录密码" />
                </Form.Item>
                <VerificationCodeInput imgSrc={vCodeImgUrl} refreshVeriCode={refreshVeriCode} />
                <Form.Item name='agreement' valuePropName='checked' >
                    <Checkbox>阅读并同意<a onClick={toggleAgreVisi}>C-Life物联网云平台服务协议</a></Checkbox>
                </Form.Item> 
               
                <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.agreement !== currentValues.agreement} >
                    {
                        ({ getFieldValue }) =>
                        <Button type="primary" htmlType="submit" disabled={ !getFieldValue('agreement') } >同意协议并注册</Button>
                    }
                </Form.Item>
                
            </Form>
            <ServiceAgreeMentModal visible={agreeVisible} onCancel={toggleAgreVisi} />
        </div>
}
