import React, {  memo, forwardRef,useEffect ,useState } from 'react';
import { Input,Form, Radio } from 'antd';
import DoubleBtns from '../../../../../components/double-btns/DoubleBtns';
const { TextArea } = Input;
const { Item } = Form;
const formlayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

function pubForm({
    setStepCur,
    commitAll,
    formdata
},_ref){
    const [form] = Form.useForm();

    const [warningWay, setWarningWay] = useState(formdata.warningWay);

    useEffect( () => {
        console.log("---form3--",formdata)
        if(formdata.warningTitle){
            form.setFieldsValue({...formdata})
        }else{
            // form.resetFields()
        }
    },[formdata.warningTitle])

    const onFinish=(values)=>{
        commitAll()
    }

    

    return <div>
            <Form ref={_ref} form={form} {...formlayout} onFinish={onFinish}>
                <Item label="触发告警" name='warningWay' rules={[{ required: true, message: '请选择告警方式'}]} initialValue="1">
                   <Radio.Group onChange={ e=>{setWarningWay(e.target.value)}}>
                        <Radio value="1">极光推送</Radio>
                    </Radio.Group>
                </Item>
                <Item label="消息标题" name='warningTitle' rules={[{ required: true, message: '请输入消息标题'},{ max: 40, message: '最大输入长度为50' }]} >
                    <Input placeholder="请输入消息标题" />
                </Item>
                <Item label="消息内容" name='warningDetails' rules={[{ required: true, message: '请输入告警内容'},{ max: 250, message: '最大输入长度为250' }]}>
                    <TextArea 
                        rows='3'
                        // showCount={true} 
                        placeholder="请输入消息内容" 
                    />
                </Item>
            </Form>
            <DoubleBtns nextText={'提交'} preHandle={()=>setStepCur(1)} nextHandle={form.submit} />
        </div>

}

export default memo(forwardRef(pubForm));