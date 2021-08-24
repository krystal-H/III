import React, {  memo, forwardRef,useEffect ,useState } from 'react';
import { Input,Form,Radio} from 'antd';
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
        // console.log("---form1--",formdata)
        if(formdata.warningTitle){
            form.setFieldsValue({...formdata})
        }else{
            form.resetFields()
        }
    },[formdata.warningTitle])

    const onFinish=(values)=>{
        commitAll()
        // console.log("---finish1---",form.getFieldsValue())
    }

    

    return <div>
            <Form ref={_ref} form={form} {...formlayout} onFinish={onFinish}>
                <Item label="触发告警" name='warningWay' rules={[{ required: true, message: '请选择告警方式'}]} initialValue="0">
                   <Radio.Group onChange={ e=>{setWarningWay(e.target.value)}}>
                        <Radio value="0">站内消息</Radio>
                        <Radio value="1">站内消息+邮件</Radio>
                    </Radio.Group>
                </Item>
                <Item label="消息标题" name='warningTitle' rules={[{ required: true, message: '请输入消息标题'},{ max: 50, message: '最大输入长度为50' }]} >
                    <Input placeholder="请输入消息标题" />
                </Item>
                {warningWay=="1" &&
                    <Item label="邮件地址" name='emailAddress' rules={[{ required: true, message: '请输入邮件地址'},{ max: 100, message: '最大输入长度为100' }]} >
                        <Input placeholder="请输入邮件地址" />
                    </Item>
                }
                <Item label="告警内容" name='warningDetails' initialValue="您好，{pruductname}，{time}出现配置规则下的异常，请在站内消息查看详情！">
                    <TextArea rows='3' disabled={true} />
                </Item>
                <Item label="发送频率" name='waringFreq' required initialValue="0">
                    <Radio.Group >
                        <Radio value="0">首次发送后，相同故障间隔6小时发送一次，最高单日发送4次&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Radio>
                        <Radio value="1">首次发送后，相同故障间隔24小时发送一次</Radio>
                    </Radio.Group>
                </Item>
            </Form>
            <DoubleBtns nextText={'提交'} preHandle={()=>setStepCur(1)} nextHandle={form.submit} />
        </div>

}

export default memo(forwardRef(pubForm));