import React, {  memo, forwardRef,useEffect } from 'react';
import { Input,Form} from 'antd';
import DoubleBtns from '../../../../../components/double-btns/DoubleBtns';
const { TextArea } = Input;
const { Item } = Form;
const formlayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

function baseForm({
    setStepCur,
    formdata
},_ref){
    const [form] = Form.useForm();
    useEffect( () => {
        console.log("---form1--",formdata)
        if(formdata.name){
            form.setFieldsValue({...formdata})
        }else{
            // form.resetFields()
        }
    },[formdata.name])

    const onFinish=(values)=>{
        // console.log("---finish1---",form.getFieldsValue())
        setStepCur(1)
    }

    

    return <div>
            <Form ref={_ref} form={form} {...formlayout} onFinish={onFinish}>
                <Item label="规则名称" name='name' rules={[
                    { required: true, message: '请输入告警规则名称' },{ max: 30, message: '最大输入长度为30字符' },
                ]}>
                    <Input placeholder="请输入告警规则名称" />
                </Item>

                <Item label="规则描述" name='remark' rules={[
                    { max: 100, message: '最大输入长度为100字符' },
                ]}>
                    <TextArea placeholder="告警规则描述" showCount maxLength={100} rows={4} />
                </Item>
            </Form>
            <DoubleBtns preBtn={false} nextHandle={form.submit} />
        </div>

}

export default memo(forwardRef(baseForm));
