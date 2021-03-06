import React, { Component } from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Radio, Checkbox, Row, Col,Tooltip } from 'antd';
import {post,Paths} from '../../api';
import { encryption ,getVcodeImgUrl,psdPattern} from '../../util/util';

class EmailAuthWordForm extends Component {

    state = {
        vCodeImgUrl:getVcodeImgUrl()
    }
    refreshVeriCode = () => {
        this.setState({
            vCodeImgUrl: getVcodeImgUrl()
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();

        let {form,changeType,type = 1,code} = this.props;

        form.validateFields((err, values) => {
          if (!err) {
            let _values = {...values},
                path = Paths.resetAuth,
                data = _values;

            if (type === 2) {
                path = Paths.resetEmail;
                data = {
                    ..._values,
                    code
                }
            }

            post(path,data,{
              loading:true
            }).then(data => {
                if (type === 1) {
                    changeType({
                        type:1,
                        email:_values.email
                    })
                }

                if (type === 2) {
                    changeType({
                        type:1,
                        isResetEmail:true,
                        NewEmail:_values.email
                    })
                }

            }).catch(error => {
                if (type === 1) {
                    this.refreshVeriCode()
                }
                this.resetPswAndCode()
            })
          }
        });
    }
    resetPswAndCode = () => {
        let {form,type = 1} = this.props,
            _array = (type === 1) ?  ['email','verifyCode'] : ['email'];

        form.resetFields(_array)
    }
    render () {
        let {form,loading,type=1} = this.props,
        {vCodeImgUrl} = this.state,
        {getFieldDecorator} = form;

        return (
            <Form className="form-wrapper"  onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules:[{ required: true, message: '?????????????????????' },
                        { type: 'email', message: '???????????????????????????????????????' }
                        ],
                        initialValue: ''
                    })(<Input placeholder={`???????????????${(type === 1) ? "??????" : "??????"}??????`} />)
                    }
                </Form.Item>
                {
                    type === 1 && 

                    <Form.Item>
                        <Row>
                            <Col span={15}>
                                {getFieldDecorator('verifyCode', {
                                    rules:[{required:true,message:'??????????????????'},{len:4,message:'??????????????????4'}],
                                    initialValue: '',
                                    
                                })(<Input placeholder="??????????????????" />)}
                            </Col>
                            <Col span={8} offset={1}>
                                <div className="code-img-wrapper">
                                    <Tooltip title="?????????????????????">
                                        <img style={{height:'100%',width:'100%',cursor:'pointer'}} 
                                            src={vCodeImgUrl}
                                            onClick={this.refreshVeriCode} 
                                            alt="???????????????"/>
                                    </Tooltip>
                                </div>
                            </Col>
                        </Row>
                    </Form.Item>
                }
                <Form.Item>
                    <Button type="primary" 
                            htmlType="submit" 
                            loading={loading}>??? ???</Button>
                </Form.Item>
            </Form>
        )
    }
}

class SetPassWordForm extends Component {
    resetPswAndCode = () => {
        let {form} = this.props;
        form.resetFields(['password','passwordComfirm'])
    }
    handleSubmit = e => {
        e.preventDefault();

        let {form,code,email,changeType,cType} = this.props;

        form.validateFields((err, values) => {
          if (!err) {
              
            let _values = {
                newPwd : encryption(values.password)
            }

            post(Paths.setPassword,{
                ..._values,
                code,
                email,
                type:cType
            },{
              loading:true
            }).then(data => {
                changeType({
                    type:4
                })
            }).catch(error => {
                this.resetPswAndCode()
            })
          }
        }) 
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('??????????????????????????????');
        } else {
          callback();
        }
    };

    render () {
        let {form,style} = this.props,
        {getFieldDecorator} = form;

        return (
            <Form className="form-wrapper" style={style} onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '?????????????????????' },
                        { pattern: psdPattern, message: '8???18??????????????????????????????????????????'}],
                        initialValue: ''    
                    })(<Input.Password placeholder="????????????????????????" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('passwordComfirm', {
                        rules: [{ required: true, message: '?????????????????????' },
                                { validator: this.compareToFirstPassword}],
                        initialValue: ''
                    })(<Input.Password placeholder="???????????????????????????" />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" 
                            htmlType="submit">??? ???</Button>
                </Form.Item>
            </Form>
        )
    }
}

class CloseAccountForm extends Component {
    state = {
        otherReason:''
    }
    handleSubmit = e => {
        e.preventDefault();

        let {form,code,email,changeType} = this.props,
            {otherReason}=this.state;

        form.validateFields((err, values) => {
            values.reason = values.reason.join();

          if (!err) {
            let _values = {
                ...values,
                applyDesc:otherReason
            }

            post(Paths.cancelAccount,{
                ..._values,
                code,
                email
            },{
              loading:true
            }).then(data => {
                changeType({
                    type:4
                })
            })
          }
        });
    }

    otherReasonChange = (value) => {
        this.setState({
            otherReason:value
        })
    }

    render () {
        let {form,style,isCloseAccount} = this.props,
            {otherReason} = this.state,
            {getFieldDecorator,getFieldValue} = form,
            reasons = getFieldValue('reason') || [];
        
        return (
            <Form className={"form-wrapper " + (isCloseAccount ? 'for-close-account' : '')} style={style} layout="horizontal" onSubmit={this.handleSubmit}>
                <Form.Item label="??????????????????">
                    {getFieldDecorator('reason', {
                        initialValue: [],
                    })(
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                <Col span={6}>
                                <Checkbox value="1"> ?????????????????????????????? </Checkbox>
                                </Col>
                                <Col span={6}>
                                <Checkbox value="2"> ????????????????????????????????? </Checkbox>
                                </Col>
                                <Col span={6}>
                                <Checkbox value="3"> ???????????????????????? </Checkbox>
                                </Col>
                                {   reasons.includes('3') &&
                                    <Col span={6}>
                                        <Input type="text"
                                            value={otherReason} 
                                            placeholder="???????????????????????????"
                                            onChange={e => this.otherReasonChange(e.target.value)}></Input>
                                    </Col>
                                }
                            </Row>
                        </Checkbox.Group>,
                    )}
                </Form.Item>
                <Form.Item label="??????????????????">
                    {getFieldDecorator('hardware',{
                        initialValue:'1'
                    })(
                        <Radio.Group style={{ width: '100%' }}>
                            <Row>
                                <Col span={6}>
                                    <Radio value="1">????????????????????????</Radio>
                                </Col>
                                <Col span={6}>
                                    <Radio value="2">?????????????????????</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item label="??????????????????">
                    {getFieldDecorator('appApply',{
                        initialValue:'1'
                    })(
                        <Radio.Group style={{ width: '100%' }}>
                            <Row>
                                <Col span={6}>
                                    <Radio value="1">????????????&APP??????</Radio>
                                </Col>
                                <Col span={6}>
                                    <Radio value="2">??????&APP?????????</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item className="center">
                    <Button type="primary" 
                            htmlType="submit">??? ???</Button>
                </Form.Item>
            </Form>
        )
    }
}

class SubResetPassWordForm extends Component {
    resetPswAndCode = () => {
        let {form} = this.props;
        form.resetFields(['oldPassword','password','passwordComfirm'])
    }
    handleSubmit = e => {
        e.preventDefault();

        let {form} = this.props;

        form.validateFields((err, values) => {
          if (!err) {
            let _values = {
                // oldPassword:encryption(values.oldPassword),
                newPwd : encryption(values.password)
            }

            post(Paths.subResetPassword,{
                ..._values
            },{
              loading:true
            }).then(data => {
                this.goLogin()
            }).catch(error => {
                this.resetPswAndCode()
            })
          }
        });
    }

    goLogin = () => {
        let {history} = this.props;

       history.push({
            pathname:'/account/login'
       })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('??????????????????????????????');
        } else {
          callback();
        }
    };

    render () {
        let {form,style} = this.props,
        {getFieldDecorator} = form;

        return (
            <Form className="form-wrapper" style={style} onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('oldPassword', {
                        rules: [{ required: true, message: '????????????????????????' },
                                // { pattern: /^[a-zA-Z]\w{5,17}$/ , message: '?????????????????????????????????6???18??????????????????????????????'}
                            ],
                        initialValue: ''    
                    })(<Input.Password placeholder="????????????????????????" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '?????????????????????' },
                        { pattern: psdPattern, message: '8???18??????????????????????????????????????????'}],
                        initialValue: ''    
                    })(<Input.Password placeholder="???????????????????????????" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('passwordComfirm', {
                        rules: [{ required: true, message: '?????????????????????' },
                                { validator: this.compareToFirstPassword}],
                        initialValue: ''
                    })(<Input.Password placeholder="???????????????????????????" />)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" 
                            htmlType="submit">??? ???</Button>
                </Form.Item>
            </Form>
        )
    }
}


export const EmailAuthFormWrapper = Form.create({name:'email-auth-form'})(EmailAuthWordForm)
export const SetPassWordFormWrapper = Form.create({name:'set-password-form'})(SetPassWordForm)
export const CloseAccountFormWrapper = Form.create({name:'close-account-form'})(CloseAccountForm)
export const SubResetPassWordFormWrapper = Form.create({name:'sub-reset-password-form'})(SubResetPassWordForm)