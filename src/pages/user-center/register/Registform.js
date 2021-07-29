import React, { useState } from 'react'
import VerificationCodeInput from '../../../components/verification-code-input/VerificationCodeInput';
import { Input, Button, Checkbox, notification, Modal,Form } from 'antd';
import {Link} from 'react-router-dom';
import {post,Paths,get} from '../../../api'
import { encryption ,getVcodeImgUrl,getUrlParam,psdPattern} from '../../../util/util';
import './Register.scss'

export default function RegisterForm({
    registerEmailGuide
}){
    const [vCodeImgUrl, setvCodeImgUrl] = useState(getVcodeImgUrl());
    const [agreeVisible, setAgreeVisible] = useState(false);
    const [form] = Form.useForm();
    const onFinish = values => {
        // console.log(123,values)
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


function ServiceAgreeMentModal({visible,onCancel}) {
    return (
        <Modal
        visible={visible}
        className="self-modal"
        width={1000}
        title={'C-Life物联网云平台服务协议'}
        centered={true}
        closable={true}
        footer={null}
        onCancel={onCancel}
        maskClosable={false}>
            <div className="aggrement-text-wrapper">
                 <h3>介绍</h3>
                 <p>最后修改：2019年12月</p>
                <p>欢迎来到C-Life物联网云平台，希望您喜欢使用我们的服务。</p>
                <p>请仔细阅读本协议，C-Life物联网云平台将依据以下条件和条款为您提供服务。</p>
                <p>欢迎阅读C-Life物联网云平台用户协议(下称“本协议”)。本协议阐述之条款和条件适用于您使用C-Life物联网云平台所提供的各种工具和服务(下称“服务”)。</p>

                <h3>1．服务条款的确认</h3>
                <p>C-Life物联网云平台根据本服务条款及对该条款的修改向用户提供服务。本服务条款具有合同法上的法律效力。</p>
                <p>如果您点选“注册”并通过注册程序，即表示您自愿接受本协议之所有条款，并且同意接受C-Life物联网云平台会员服务提供的各类信息服务。</p>

                <h3>2．服务内容及修改、中断、终止</h3>
                <p>2.1 C-Life物联网云平台服务的具体内容由本平台根据实际情况提供，并对所提供之服务拥有最终解释权。</p>
                <p>2.2 C-Life物联网云平台仅向其会员提供相关服务，与相关服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均由会员自行负担。</p>
                <p>2.3 鉴于网络服务的特殊性，用户同意C-Life物联网云平台有权不经过事先通知，随时变更、中断或终止部分或全部的网络服务（包括收费网络服务）。C-Life物联网云平台不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。</p>
                <p>2.4 C-Life物联网云平台需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，如因此类情况而造成网络服务（包括收费网络服务）在合理时间内的中断，C-Life物联网云平台无需为此承担任何责任。</p>
                <p>2.5 C-Life物联网云平台有权于任何时间暂时或永久修改或终止本服务（或其任何部分），而无论其通知与否，C-Life物联网云平台对用户和任何第三人均无需承担任何责任。</p>
                <p>2.6 如果C-Life物联网云平台认为您已经违反本服务协议的文字及精神或者发布违背平台服务等的不道德言论，本平台无需进行事先通知即可立即关闭或删除您的帐号及您帐号中所有相关信息及文件，或禁止继续使用前述文件或本服务。</p>

                <h3>3．会员帐号及密码</h3>
                <p>用户注册会员成功后，C-Life物联网云平台将给予每个会员一个帐号及相应的密码，该帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</p>
                <p>因黑客行为或会员保管疏忽致使帐号、密码被他人非法使用的，本公司不承担任何责任。如您发现任何非法使用会员帐号或安全漏洞的情况，请立即与本公司联系。</p>

                <h3>4. 注册信息和隐私保护</h3>
                <p>4.1 C-Life物联网云平台帐号（即C-Life物联网云平台用户ID）的所有权归C-Life物联网云平台，用户完成注册申请手续后，获得C-Life物联网云平台帐号的使用权。用户应提供及时、详尽及准确的个人资料，并不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将作为注册资料。如果因用户注册信息不真实而引起的问题及其产生的后果，C-Life物联网云平台不负任何责任。</p>
                <p>4.2 用户不得将其帐号、密码转让或出借予他人使用。如发现其帐号遭他人非法使用，应立即通知C-Life物联网云平台。</p>
                <div className='p'>4.3 C-Life物联网云平台不对外公开或向第三方提供单个用户的注册资料，除非：
                   <ul>
                       <li>事先获得用户的明确授权</li>
                       <li>只有透露你的个人资料，才能提供你所要求的产品和服务</li>
                       <li>根据有关的法律法规要求；</li>
                       <li>按照相关政府主管部门的要求；</li>
                       <li>为维护C-Life物联网云平台的合法权益；</li>
                   </ul>
                </div>
                <p>4.4 在您注册C-Life物联网云平台帐户，使用C-Life物联网云平台产品或服务，或访问C-Life物联网云平台网页时，C-Life物联网云平台会收集您的个人身份识别资料，并会将这些资料用于：改进为您提供的服务及网页内容。</p>

                <h3>5. 用户权责</h3>
                <p>5.1 用户有权按照C-Life物联网云平台规定的程序和要求使用C-Life物联网云平台向会员提供的各项网络服务，如果会员对该服务有异议，可以与C-Life物联网云平台联系以便得到及时解决。</p>
                <p>5.2 用户在使用C-Life物联网云平台服务时，必须遵守中华人民共和国相关法律法规的规定，不得利用本服务进行任何违法或不正当的活动，包括但不限于下列行为∶</p>
                <div className='p'>5.2.1 制作、复制、发布、传播或以其它方式传送含有下列内容之一的信息：
                    <ul>
                        <li>反对宪法所确定的基本原则的；</li>
                        <li>危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
                        <li>损害国家荣誉和利益的；</li>
                        <li>煽动民族仇恨、民族歧视、破坏民族团结的；</li>
                        <li>破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
                        <li>散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
                        <li>散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</li>
                        <li>侮辱或者诽谤他人，侵害他人合法权利的；</li>
                        <li>煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</li>
                        <li>以非法民间组织名义活动的；</li>
                        <li>含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；</li>
                        <li>含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；</li>
                    </ul>
                </div>
                <div className='p'>5.2.2 不得利用C-Life物联网云平台服务从事以下活动：
                    <ul>
                        <li>未经允许，进入计算机信息网络或者使用计算机信息网络资源；</li>
                        <li>未经允许，对计算机信息网络功能进行删除、修改或者增加；</li>
                        <li>未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；</li>
                        <li>其他危害计算机信息网络安全的行为；</li>
                    </ul>
                </div>
                <p>5.3 用户违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，您同意赔偿C-Life物联网云平台与合作公司、关联公司，并使之免受损害。对此，C-Life物联网云平台有权视用户的行为性质，采取包括但不限于删除用户发布信息内容、暂停使用许可、终止服务、限制使用、回收C-Life物联网云平台帐号、追究法律责任等措施。对恶意注册C-Life物联网云平台帐号或利用C-Life物联网云平台帐号进行违法活动、捣乱、骚扰、欺骗、其他用户以及其他违反本协议的行为，C-Life物联网云平台有权回收其帐号。同时，本公司会视司法部门的要求，协助调查。</p>
                <p>5.4 用户不得对C-Life物联网云平台任何部分通过任何方式进行复制、拷贝、出售、转售或用于任何其它商业目的。</p>
                <p>5.5 用户须对自己在使用C-Life物联网云平台服务过程中的行为承担法律责任。用户承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在C-Life物联网云平台运营公司首先承担了因用户行为导致的行政处罚或侵权损害赔偿责任后，用户应给予C-Life物联网云平台运营公司等额的赔偿。</p>

                <h3>6. 知识产权</h3>
                <p>C-Life物联网云平台网站及网站所使用的任何相关软件、程序、内容，包括但不限于作品、图片、档案、资料、网站构架、网站版面的安排、网页设计、经由本网站或广告商向用户呈现的广告或资讯，均由本公司或其它权利人依法享有相应的知识产权，包括但不限于著作权、商标权、专利权或其它专属权利等，受到相关法律的保护。未经本公司或权利人明示授权，用户保证不修改、出租、出借、出售、散布本网站及本网站所使用的上述任何资料和资源，或根据上述资料和资源制作成任何种类物品。</p>
                <h3>7. 其他</h3>
                <p>7.1 因不可抗力或者其他意外事件，使得本协议的履行不可能、不必要或者无意义的，双方均不承担责任。本协议所称之不可抗力意指不能预见、不能避免并不能克服的客观情况，包括但不限于战争、台风、水灾、火灾、雷击或地震、罢工、暴动、法定疾病、黑客攻击、网络病毒、电信部门技术管制、政府行为或任何其它自然或人为造成的灾难等客观情况。</p>
                <p>7.2 因本条款所引起的用户与本公司的任何纠纷或争议，首先应友好协商解决，协商不成的，用户在此同意将纠纷或争议提交本公司住所地有管辖权的人民法院诉讼解决。</p>
                <p>7.3 用户正确提交注册程序所需的资料并确认本协议后，本协议在C-Life物联网云平台与用户之间成立并生效。</p>
                <p>7.4 协议有效期：从用户同意本协议或使用C-Life物联网云平台起至用户注销C-Life物联网云平台服务止。</p>
                <p>7.5 本协议的最终解释权归C-Life物联网云平台所有</p>
                <p>7.6 如果您对我们的服务或软件的使用有任何疑问或疑问，您可以通过电子邮件与我们联系：het@szhittech.com，这是您联系我们的最有效的方式。</p> 
            </div>
        </Modal>
    )
}
