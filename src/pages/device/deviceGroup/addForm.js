import React, {  memo, forwardRef } from 'react';
import { Input,Form,Modal} from 'antd';
import {post, Paths} from '../../../api';
import { Notification } from '../../../components/Notification';
const { TextArea } = Input;
const { Item } = Form;
const formlayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

function addForm({
    visible,
    switchOpen,
    pagerIndex
},_ref){
    const [form] = Form.useForm();

    const onFinish=(values)=>{
        post(Paths.updateGroup,{...values}).then((res) => {
            Notification({type:'success',description:'新增成功！'});
            handleCancel();
            pagerIndex(1);
        }); 
    }
    const handleCancel =()=>{
        switchOpen(false);
        form.resetFields();
    }
    return(<Modal
        title="新增分组"
        visible={visible}
        width={600}
        onOk={form.submit}
        onCancel={handleCancel}
        maskClosable={false}
        className="self-modal"
    >
        <Form form={form} {...formlayout} onFinish={onFinish}>
            <Item label="分组名称" name='name' rules={[
                { required: true, message: '请输入分组名称' },{ max: 30, message: '最大输入长度为30' },
            ]}>
                <Input placeholder="请输入分组名称" />
            </Item>

            <Item label="分组描述" name='remark' rules={[
                { max: 30, message: '最大输入长度为50' },
            ]}>
                <TextArea placeholder="分组描述" showCount maxLength={50} rows={4} />
            </Item>
        </Form>
    </Modal>)

}

export default memo(forwardRef(addForm));