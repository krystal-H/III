import React, { PureComponent } from 'react'
import FullScreenFlexWrapper from '../full-screen-flex-wrapper/FullScreenFlexWrapper';
import { Button, notification} from 'antd';
import {Link} from 'react-router-dom';
import {post,Paths,get} from '../../../api'
import {getUrlParam} from '../../../util/util';
import Registform from './Registform';

import mailOkImage from '../../../assets/images/account/email-auth-ok.png';
import mailErrorImage from '../../../assets/images/account/email-auth-error.png';
import mailMap from '../../../configs/mail.manage';

const RegistOk = ['成功','ok',mailOkImage,'您可以正式使用C-Life物联网云平台','立即登录']
const RegissError = ['失败','error',mailErrorImage,'邮箱验证失败，请重新提交发送验证邮箱','重新发送邮件']

export default class Register extends PureComponent {
    constructor (props) {
        super(props);
        this._countDown = null;
        this.state = {
            registerConfirm:'loading',
            countDownNum:-1,
            account:'',
            email:getUrlParam('email'),
            uuid:getUrlParam('uuid'),
        }
    }
    componentDidMount(){
        const{ email,uuid }= this.state;
        if(email) {//从验证邮箱的地址进来的注册页面，则根据地址栏参数验证邮箱
            get(Paths.registerConfirm,{ email, uuid },{ loading:true })
            .then(() => {
                this.setState({
                    registerConfirm:true
                })
            }).catch(error => {
                this.setState({
                    registerConfirm:false
                })
            })
        }
    }
    checkedHandle = () => {//验证结束 点击登录或者重发邮件
        const {registerConfirm} = this.state;
        if (registerConfirm) {
            // 此种方式是为了去掉URL中的参数
            window.location = window.location.origin + window.location.pathname + '#/account/login'
        } else {
            this.resendEmail()
        }
    }
    registerEmailGuide = data => {
        this.setState({
            ...data
        })
        this.countDown()
    }
    backToRegister = () => {
        if(this._countDown){
            clearInterval(this._countDown)
        }
        this.setState({
            account:'',
            countDownNum:-1
        })
    }
    resendEmail = (account) => {
        const email = account || this.email
        post(Paths.resendRegisterEmail,{email},{loading:true}).then(data => {
            notification.success({
                message:'发送成功',
                description:'注册邮件发送成功，请注意查收'
            })
            this.countDown()
            if(!account) {
                this.setState({
                    account:email,
                    email:'',
                    uuid:''
                })
            }
        })
    }
    countDown = () => {
        this.setState({
            countDownNum:60
        },()=>{
            this._countDown = setInterval(() => {
                let {countDownNum} = this.state;
                if(countDownNum<0){
                    clearInterval(this._countDown)
                }else{
                    this.setState({
                        countDownNum: countDownNum - 1
                    })
                }
            }, 1000 )
        }) 
    }
    openMailPage = () => {
        let {account} = this.state,
            suffix = account.substring(account.indexOf('@') + 1);

        if(!account || !suffix || !mailMap[suffix]) {
            notification.warn({
                message:'跳转失败',
                description:'没有找到对应邮箱网址，请手动登录'
            })
            return false
        }

        window.location = mailMap[suffix];
    }
    render() {
        const { account,countDownNum,registerConfirm,email } = this.state;
        const showConfirm = registerConfirm !== 'loading',
              okerror = showConfirm && (registerConfirm && RegistOk || RegissError) || null;

        return (
            <FullScreenFlexWrapper>
                {
                    email ?
                    (   // 邮件确认结果部分
                        showConfirm ? 
                        <div className="content-area">
                            <div className="sub-title"> {okerror[0]} </div>
                            <div style={{width:'300px'}} className={`img-wrapper ${okerror[1]}`}>
                                <img style={{width:'160px'}} src={okerror[2]} alt="反馈图标"/>
                                <p>{okerror[3]}</p>
                            </div>
                            <div style={{marginTop:'110px'}} className="button-wrapper">
                                <Button onClick={this.checkedHandle} type="primary">{okerror[4]}</Button>
                            </div>
                        </div> 
                        : 
                        <div> 验证中......</div> 
                    ):
                    (
                        account ?
                        // 发送注册邮箱后的引导验证部分
                        <div className="content-area">
                            <div className="sub-title">
                                邮箱验证
                            </div>
                            <div className="mail-content-wrapper">
                                <div className="mail-title" style={{marginBottom:'20px'}}>尊敬的用户，您好：</div>
                                <div>您的帐户已注册成功！在您正式使用账户之前，我们需要验证您邮箱的有效性。</div>
                                <div>我们已经向您的注册邮箱  {account}  发送了一封验证邮件，请您登录邮箱按邮件指引完成验证。</div>
                            </div>
                            <div style={{width:'300px'}} className="button-wrapper" onClick={this.openMailPage}>
                                <Button type="primary">登录邮箱</Button>
                            </div>
                            <div className="mail-content-wrapper bg-gray">

                                <div className="mail-title">没有收到邮件？</div>
                                <div>1、请检查邮箱地址是否正确，你可以返回 <a onClick={this.backToRegister}>重新填写</a> 。</div>
                                <div>2、请检查你的邮箱垃圾箱。</div>
                                <div>3、若仍然没有收到，请尝试
                                    {
                                        countDownNum>0 ? <span className='gray'>重新发送 {`${countDownNum}S`}</span> 
                                        : <a onClick={()=>{this.resendEmail(account)}}>重新发送</a>

                                    }
                                </div>
                            </div>
                        </div>
                        :
                        // 注册表单输入部分
                        <div className="content-area">
                            <div className="sub-title"> 欢迎注册C-Life物联网云平台 </div>
                            <Registform registerEmailGuide={this.registerEmailGuide} />
                            <div className="right-top">
                                <span className="tip">已有C-Life云帐号? </span> <Link to="/account/login">快速登录</Link>
                            </div>
                        </div>
                    )
                }
            </FullScreenFlexWrapper>
        )
    }
}
