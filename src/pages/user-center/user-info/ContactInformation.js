import React, { Component,createRef } from 'react'
import { Input, Button, Form, notification,Spin,Row,Col } from 'antd';
import { Paths,post} from '../../../api';

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    },
};


export default class ContactInformation extends Component {
    constructor (props) {
        super(props);
        this.formRef = createRef();
    }
    componentDidUpdate(prevProps) {
        if(prevProps.developerInfo.phone == undefined && this.props.developerInfo.phone){
            this.formRef.current.resetFields();
        }
    }
    
    onFinish = values => {
        const { developerInfo:{userId} , getDeveloperInfo} = this.props;
        post(Paths.upDeveloperInfo,{
            ...values,userId
        },{
            loading:true
        }).then(data => {
            notification.success({
                message:'更新成功',
                description:'用户信息更新成功！'
            })
            getDeveloperInfo()
        })
    }
    render() {
        const {developerInfo:{phone,nickName} } = this.props;
        return (
           
                <Form {...formItemLayout} onFinish={this.onFinish} initialValues={{phone,nickName}} ref={this.formRef}>
                    <Form.Item label="联系人" name='nickName' rules={[{pattern : /^[a-zA-Z0-9\u4e00-\u9fa5]{2,20}$/,message:'请输入2到20长度的汉字、字母和数字'}]}>
                        <Input placeholder="请输入联系人" />
                    </Form.Item>
                <Form.Item label="联系电话" name='phone' rules={[{pattern: /^(((\d{3,4}-)?\d{7,8})|(1\d{10}))$/, message: '请输入固话号码或者手机号码' }]}>
                    <Input placeholder="请输入联系电话" />
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={5}> </Col>
                        <Col span={19}><Button type="primary" htmlType="submit" >保存</Button></Col>
                    </Row>
                </Form.Item>
            </Form>
            

            
        );
    }
}
