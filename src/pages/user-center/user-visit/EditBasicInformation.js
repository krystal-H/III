import React, { Component } from 'react'
import { connect } from 'react-redux'
import {trim} from 'lodash';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Switch, Button } from 'antd';
import {get, post, Paths} from '../../../api';
import {encryption,checkAccount} from '../../../util/util'
import {Notification} from '../../../components/Notification';
import TextAreaCounter from '../../../components/textAreaCounter/TextAreaCounter';

import './editBasicInformation.scss';

const {Option} = Select;
const passwordList = [
    {
        id:1,
        text:'自动生成默认密码',
    },
    {
        id:2,
        text:'手动设置登录密码',
    }
];
const formItemLayout = {
    labelCol: {
        xs: { span: 5 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 19 },
        sm: { span: 19 },
    },
};
const mapStateToProps = state => {
    return {
        developerInfo: state.getIn(['userCenter', 'developerInfo']).toJS()
    }
}
@connect(mapStateToProps, null)
class EditBasicInformationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            resetChecked:false,//是否重置密码
            resetSelectId:null,
            password:null,//密码
            userName:this.props.userData.userName||null,//用户名称
            remark:this.props.userData.remark||'',//备注
            roleId:this.props.userData.roleId||null,//角色ID
            roleList:[],
            ipWhiteSelect:this.props.userData.ipWhiteList?true:false,//是否提白名单
            ipWhiteList:this.props.userData.ipWhiteList
        };
    }
    componentDidMount() {
        this.props.onRef(this);
        post(Paths.getRolePage,{pageIndex:1,pageRows:9999}).then((res) => {
            this.setState({
                roleList:res.data.list,
            })
        });
    }
    //角色选择
    roleSelect = (roleId) => {
        this.setState({roleId});
    }
    //是否重置密码
    reset = (resetChecked) => {
        this.setState({resetChecked});
    }
    //密码
    resetSelect = (resetSelectId) => {
        if(resetSelectId==1){
            this.setState({resetSelectId});
            setTimeout(()=>{this.props.form.setFieldsValue({password:'a123456'})},100);//第一次选择时，由于dom没有回出现警告，并且设置不了password得值。
        }else{
            this.setState({resetSelectId});
            this.props.form.setFieldsValue({password:''});
        }
    }
    //密码输入
    passwordInput = (val) => {
        this.setState({password:val.target.value});
    }
    userName = (e) => {
        this.setState({userName:e.target.value});
    }
    remark = (e) => {
        this.setState({remark:e.target.value});
    }
    //确认保存
    affirm = (e) => {
        e.preventDefault();
        const { validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                let {resetChecked} = this.state,
                    {userId} = this.props.userData,
                    {roleId,userName,password,remark} = values;
                    let data = {
                    userId,
                    roleIds:roleId
                    // userName:userName+'@'+this.props.developerInfo.id,
                };
                if(resetChecked){
                    data.password = encryption(password);//密码 加密
                }
                if(remark){
                    data.remark = remark;
                }
                post(Paths.updateChild,data,{needFormData:true,loading:true}).then((res) => {
                    if(res.code==0){
                        this.props.handleClose();
                    }
                });
            }
        });
    }
    passwordCheck = (rule, value, callback) => {
        if(!(/^^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(value))){
            callback('密码格式为大小写字母加数字，长度为6-18');
        }else{
            callback();
        }
    }
    render() {
        let { resetChecked, remark, userName, roleId,roleList} = this.state;
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const resetSelectId = resetChecked ? getFieldValue('resetSelectId') : null;
       
        
        return (
            <Form {...formItemLayout} onSubmit={this.affirm} className='edit-basic-information'>
               
                <div className='common_title_input'>
                    <span className='common_title'>用户名:</span>
                    <div className='common_content'>{userName}</div>
                </div>
                <div className='common_title_input'>
                    <Form.Item label='用户角色' hasFeedback >
                        {getFieldDecorator('roleId', {
                            rules: [{ required: true, message: '请选择用户角色' }],
                            initialValue:roleId
                        })(
                            <Select style={{width:'180px'}} placeholder="请选择">
                                {
                                    roleList.map((item,index)=>{
                                        return <Option key={index+'用户角色'} value={item.roleId} >{item.roleName}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                </div>
                    <div className='common_title_input'>
                        <Form.Item label='重置密码：' >
                            {getFieldDecorator('resetChecked')(
                                <Switch size="small" checked={resetChecked} onClick={this.reset} />
                            )}
                        </Form.Item>
                        {
                            resetChecked?
                                <div className='reset-select'>
                                    <Form.Item label=' ' colon={false} >
                                        {getFieldDecorator('resetSelectId', {
                                            rules: [{ required: true, message: '请选择密码生成方式' }]
                                        })(
                                            <Select style={{width:'180px'}} placeholder="请选择密码生成方式" onChange={this.resetSelect}>
                                                {passwordList.map((item,index)=>{
                                                    return <Option key={index+'登录密码'} value={item.id} >{item.text}</Option>
                                                })}
                                            </Select>
                                        )}
                                    </Form.Item>
                                    {resetSelectId?
                                        <Form.Item label=' ' colon={false} >
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, validator:this.passwordCheck, message: '密码格式为大小写字母加数字，长度为6-18' }]
                                            })(
                                                resetSelectId==1?
                                                <Input style={{width:'240px'}} disabled={true}/>
                                                :<Input.Password style={{width:'240px'}} placeholder='密码格式为大小写字母加数字，长度为6-18' />
                                            )}
                                        </Form.Item>
                                    :null}
                                </div>
                                :null
                        }
                    </div>
                <div className='common_title_input'>
                    <TextAreaCounter
                        label="备注"
                        formId='remark'
                        astrictNub='100'
                        rows='2' 
                        placeholder='请输入备注' 
                        getFieldDecorator={getFieldDecorator}
                        initialVal={remark}
                        width='300px'
                        getFieldValue={getFieldValue}
                    />
                </div>
                <div className='but'>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                    <Button className='cancel' onClick={this.props.onCancel}>
                        取消
                    </Button>
                </div>
            </Form>
        );
    }
}

export const EditBasicInformation = Form.create({
    name: 'editBasicInformation',
})(EditBasicInformationForm);