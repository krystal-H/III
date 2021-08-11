import React, { Component } from 'react'
import { Form,Input, Button } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Header from '../../open/header/Header';
import {Link} from 'react-router-dom';
import VerificationCodeInput from '../../../components/verification-code-input/VerificationCodeInput';
import OutsideWrapper from '../../../components/outside-wrapper/OutsideWrapper'
import {post,Paths} from '../../../api';
import {encryption,getVcodeImgUrl} from '../../../util/util';
import IntroImg from '../../../assets/images/account/login-intro.png';
import {getMenuList} from '../../user-center/store/ActionCreator';
import './Login.scss'

class WrappedLoginForm extends Component {
	state = {
		showVerifyCode:false,
		vcodeImageUrl:getVcodeImgUrl(),

	}
		
    onFinish = values => {
          let _values = values;
          // 对密码进行加密
          _values.password = encryption(_values.password)
          post(Paths.loginCheck,_values,{
            loading:true,
          }).then(data => {
			  this.props.getMenuList();
			  window.location = window.location.origin + window.location.pathname + '#/open/home';
          }).catch(error => {
			  let {needVeriCode} = error,
			  	  {showVerifyCode} = this.state;

			  if (needVeriCode) {
				  if (!showVerifyCode) {
					this.setState({
						showVerifyCode:true
					})
				  } else {
					this.setState({
						vcodeImageUrl:getVcodeImgUrl()
					})
				  }
			  }
		  })
	};
	
	refreshVeriCode = () => {
        this.setState({
            vcodeImageUrl: getVcodeImgUrl()
        })
    }
  
    render() {
	  const { showVerifyCode ,vcodeImageUrl} = this.state;

      return (
          <Form className="login-form" onFinish={this.onFinish}>
            <Form.Item name='userName' rules={[{ required: true, message: '请输入用户名' }]}>
                <Input className='iconinput' placeholder="请输入用户名" prefix={<UserOutlined />}/>
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
				<Input.Password className='iconinput' placeholder="请输入密码"  prefix={<LockOutlined />} />
            </Form.Item>
            {
                showVerifyCode &&
                  <VerificationCodeInput
				  	className='vcode'
					imgSrc={vcodeImageUrl}
					refreshVeriCode={this.refreshVeriCode}
				/>
            }
            <Form.Item className="login-form-button">
              <Button type="primary" htmlType="submit">
                登 录
              </Button>
            </Form.Item>
          </Form>
      );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMenuList: () => dispatch(getMenuList()),
    }
}
const LoginForm = connect(null, mapDispatchToProps)(WrappedLoginForm);


export default function Login () {
        return (
			<OutsideWrapper>
				<Header onlyLogo={true}></Header>
				<div className="page-content-wrapper in-login">
					<section className="login-content-wrapper flex-row">
						<section className="left-intro">
							<div className="left-content">
								<div className="intro-title">
									C-Life物联网云平台
								</div>
								<div className="intro-content">
									深度融合物联网，人工智能，大数据技术，深耕多种行业场景，助力企业数据价值挖掘，创造未来智慧生活。
								</div>
								<div className="intro-img-wrapper">
									<img src={IntroImg} alt="介绍图片"/>
								</div>
							</div>
						</section>
						<section className="login-wrapper">
							<div className="login-content">
								<div className="login-title" style={{position: "relative"}}>
									使用C-Life云帐号登录
								</div>
								<LoginForm />
								<div className="login-other">
									<span>还没有帐号? <Link to="/account/register">免费注册</Link></span>
									<span style={{float:'right'}}><Link to="/account/forgtopassword">忘记密码</Link></span>
								</div>
							</div>
						</section>
					</section>
					</div>
			</OutsideWrapper>
    )
}


