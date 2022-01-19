import React, {  memo,useEffect,useState } from 'react';
import { Input,Radio ,Form,Button} from 'antd';
const { Item } = Form;
import {Paths, post } from '../../../../api';


const formlayout = {
    labelCol: { span: 2},
    wrapperCol: { span: 8 },
};

function configForm({
    appId,
    currentTab
}){
    const [form] = Form.useForm();
    const [config, setConfig] = useState([]);
    const [getNewInfo, setgetNewInfo] = useState();
    useEffect( () => {
        // console.log(0,currentTab)
        if(appId){
            post(Paths.getAppInfoPushSet, {appId},{loading:true} ).then((res) => {
                setConfig(res.data || [])
            });
        }

    },[appId,currentTab,getNewInfo])

    useEffect( () => {
        if(config.length>0){
            let data = config[0]  //暂时只有一个元素
            form.setFieldsValue({...data})
        }
    },[config.length])

    const onFinish=(values)=>{
        console.log(99999,values)
        post(Paths.setAppInfoPushSet, {
            appId,
            ...values,
            // configId:config.length>0 && config[0].configId || undefined
        },{loading:true} ).then((res) => {
            setgetNewInfo(true)
        });

    }

    

    return <div>
            <Form  form={form} {...formlayout} onFinish={onFinish}>
                <Item label="推送方式" name='targetType' initialValue={1}>
                   <Radio.Group >
                        <Radio value={1}>极光推送</Radio>
                    </Radio.Group>
                </Item>
                <Item label="key" name='appKey' rules={[{ required: true, message: '请输入key'},{ max: 100, message: '最大输入长度为100' }]} >
                    <Input placeholder="请输入key" />
                </Item>
                <Item label="secret" name='secret' rules={[{ required: true, message: '请输入secret'},{ max: 300, message: '最大输入长度为300' }]}>
                    <Input placeholder="请输入secret" />
                </Item>

                <Item name='configId' style={{"display":'none'}}>
                    <Input />
                </Item>
                
                <Button htmlType="submit" style={{"marginLeft":'8.3%'}} type='primary'>保存</Button>
                
            </Form>
            
        </div>

}

export default memo(configForm);