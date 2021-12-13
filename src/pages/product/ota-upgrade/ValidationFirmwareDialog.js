import React, { Component } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Radio, Alert, Input, Upload ,Modal, Form} from 'antd';
import { post,Paths } from '../../../api';
import {Notification} from '../../../components/Notification'
const { TextArea } = Input;
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
    wrapperCol: { xs: { span: 24 }, sm: { span: 19 }, },
};
const desc = [
    '系统验证：要求输入的设备全部都升级成功到新版本后，状态才更新成验证完成。',
    '手动验证：用户线下自行对设备验证，验证通过后，选择验证完成状态。'
]
export class ValidationFirmwareDialog  extends Component{
    constructor(props){
        super();
        const { validationDetail:{macSet,validateType} } = props
        // console.log(777,validateType)
        this.state = {
            status:0,
            error:false,
            macSet,
            validateType
        }
    }
    changeValidateType = ()=>{

    }
    handleSubmit =() =>{
        const { deviceVersionId, pagerIndex, pageIndex, close } = this.props
        const { macSet, validateType, status  } = this.state
        if(!macSet){
            this.setState({error:true})
            return
        }
        
        post(Paths.otaValidate,{deviceVersionId,macSet,validateType,status},{loading:true}).then((model) => {
            pagerIndex(pageIndex) 
            close()
        });
    }
    //mac模板下载
    downloadMac =()=>{
        window.location.href = 'https://open.clife.cn/v1/web/open/device/mac/download?type=2';//v5.0版 域名 cms 所以改用绝对地址
    }
    //批量导入
    beforeUpload = file => {
        const isLt2M = file.size / 1024 < 500;//限制500k
        if (!isLt2M) {
            Notification({
                description:'文件上传大小超过500k限制'
            });
            return false;
        }
        const {deviceVersionId} = this.props
        post(Paths.otaImportMac,{multipartFile:file,deviceVersionId},{needFormData:true}).then(({data={}}) => {
            const {successes,totalCount,successCount,failCount} = data
            let macSet = successes.join(','),failsStr='';
            this.setState({macSet})
            Notification({
                message:'Mac导入结果',
                description:`共导入${totalCount}条，成功了${successCount}条，失败了${failCount}条${failsStr}`
            });
            
        });
        return false;
    };
    changeValue = (key,e)=>{
        const val = e.target.value
        this.setState({[key]:val})

    }
    render() {
        const { title, close } = this.props
        const { error, macSet, validateType, status } = this.state
        return (

            <Modal
                title={title}
                visible={true}
                onOk={ this.handleSubmit }
                onCancel={ close }
                width={650}
                maskClosable={false}
            >
                <div className="ota_validationdialog" >
                    <Form {...formItemLayout} >
                        <Form.Item label='验证模式'>
                            <Radio.Group value={+validateType} onChange={e=>{this.changeValue('validateType',e)}} >
                                <Radio.Button value={0}>系统验证</Radio.Button>
                                <Radio.Button value={1}>手动验证</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label='设备Mac' required help={!macSet&&error&&'请输入或导入要验证的设备Mac'||''} validateStatus={!macSet&&error&&'error'||''}>
                            <TextArea
                                value={macSet}
                                placeholder='请输入或导入要验证的设备Mac，多个用逗号隔开'
                                rows={7}
                                onChange={e=>{this.changeValue('macSet',e)}}
                            />
                        </Form.Item>
                        <div className='ota_uploadbox'>
                            <Upload className='upbtn' beforeUpload={this.beforeUpload} fileList={[]} accept='.xls,.xlsx'>
                                <Button type="primary" icon={<UploadOutlined />}>批量导入</Button>
                            </Upload>
                            <Button className='downbtn' type="link" onClick={this.downloadMac}>下载模板</Button>
                        </div>
                        {validateType==1&&
                        <Form.Item label='线下验证状态'>
                            <Radio.Group value={status}  onChange={(e)=>{this.changeValue('status',e)}}>
                                <Radio.Button value={0}>验证中</Radio.Button>
                                <Radio.Button value={1}>验证完成</Radio.Button>
                            </Radio.Group>
                        </Form.Item>}
                    </Form>
                    <Alert message={desc[validateType]} type="info" showIcon />
                </div>
            </Modal>
        );
    }
}

                        
