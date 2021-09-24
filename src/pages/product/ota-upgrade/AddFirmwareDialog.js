import React, { forwardRef,useState } from 'react';
import { connect } from 'react-redux';
import { Input, Select, Radio, Button, Upload ,Form, Modal} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { get,post,Paths } from '../../../api';
import {Notification} from '../../../components/Notification';
import { getUploadUrl } from '../../../components/upload-file';
import LabelTip from '../../../components/form-com/LabelTip';
import { SCHMETYPE,formrules, VERTYPE } from './store/constData'
import {getVersionList,firmwareFromProduct} from './store/actionCreators'
const { Option } = Select;
const { Item } = Form;

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 7 }, },
    wrapperCol: { xs: { span: 24 }, sm: { span: 15 }, },
};

const checkMainVersion = (rule, value, callback)=> {
    if(+value>2147483647){
        callback('最大不能超过数值2147483647');
    }else{
        callback()
    }
}

const mapStateToProps = state => {
    const { mcusocproLi, firmwareFrPro } = state.get('otaUpgrade')
    return {
        mcusocproLi, firmwareFrPro
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getVersionLi: param => dispatch(getVersionList(param)),
        firmwareFromProduct: id => dispatch(firmwareFromProduct(id))
    }
}

const AddMod = connect(mapStateToProps, mapDispatchToProps)(({
    refInstance,

    changeState,

    firmwareFromProduct,mcusocproLi,firmwareFrPro,getVersionLi
})=>{


    const [mcuIsUp, setMcuIsUp] = useState(1);
    const [uploadType, setUploadType] = useState("0");
    const [firmwareList, setFirmwareList] = useState([]);

    const [formInstance] = Form.useForm();
    const changedPro= productId =>{
        firmwareFromProduct(productId)
        post(Paths.getFirmwareList,{productId}).then((res) => {
            setFirmwareList(res.data || [])
        }); 

        
    }
    const onFinish=(values)=>{
        const { filePath1, filePath2, ...otherPar } = values,
              { schemeType, deviceVersionId } = firmwareFrPro;
        const deviceVersionType = 5;
        const filePath = schemeType==3 && (uploadType=="1" && filePath1 || getUploadUrl(filePath2)) || undefined;

        post(Paths.otaAddVersion,{...otherPar,deviceVersionId,deviceVersionType,filePath}).then((res) => {
            Notification({type:'success',description:'新增成功！'});
            getVersionLi();
            changeState('addFirmwareVisiable',false); 
        }); 
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    const { schemeType, moduleName } = firmwareFrPro;

    return (
        <Modal
            title='新增固件' 
            visible={true}
            onOk={formInstance.submit}
            onCancel={()=>{ 
                changeState('addFirmwareVisiable',false); 
            }}
            width={650}
            maskClosable={false}
        >
            <Form form={formInstance} {...formItemLayout} className="ota_add_firmware_dialog" onFinish={onFinish}>
                <Item label="产品名称" name='productId' rules={[{ required: true, message: '请选择产品' }]}>
                    <Select showSearch optionFilterProp="children" placeholder="请选择产品" onChange={changedPro}>
                        {
                            mcusocproLi.map(item => {
                                const {productName,productId} = item;
                                return <Option key={productId} value={productId}>{productName}</Option>
                            })
                        }
                    </Select>
                </Item>
                { schemeType && <Item label="开发方案"> { SCHMETYPE[schemeType-1] && SCHMETYPE[schemeType-1].nam || "出错了！" }</Item> }
                { schemeType==2 && <Item label="模组固件名称"> { moduleName }</Item> }
                <Item name="productFirmwareVersion"
                    label={<LabelTip label="产品版本号" tip="说明是啥我也不知道"/>}
                    rules={[{ required: true, message: '请输入产品版本号' },{
                        pattern: formrules.strextVer,
                        message: '仅支持字母、数字、下划线、短横线、点号，不超过30个字符',
                    }]}
                    hasFeedback
                >
                    <Input maxLength={30} placeholder='仅支持字母、数字、下划线、短横线、点号' />
                </Item>
                {
                    schemeType==2 &&
                    <Item label="MCU升级" name='mcuUpgrade' initialValue={1}>
                        <Radio.Group onChange={e=>{setMcuIsUp(e.target.value)}}>
                            <Radio.Button value={1}>不升级</Radio.Button><Radio.Button value={0}>升级</Radio.Button>
                        </Radio.Group>
                    </Item>
                }
                { (schemeType==3||mcuIsUp==0) && <>

                    <Item  name='deviceVersionName' label={<LabelTip label="固件包名称" tip="说明是啥我也不知道"/>} rules={[{ required: true, message: '请输入升级包名称' }]} hasFeedback>
                        <Input maxLength={30} placeholder='请输入升级包名称' />
                    </Item>
                    <Item label="固件模块" name='firmwareVersionType' rules={[{ required: true, message: '请选择固件模块' }]}>
                        <Select placeholder="选择固件模块" onChange={()=>{}} >
                            {
                                firmwareList.map(({firmwareTypeName,firmwareTypeNo,deviceVersionType}) => {
                                    return <Option key={firmwareTypeNo} value={firmwareTypeNo}>{firmwareTypeName}</Option>
                                })
                            }
                        </Select>
                    </Item>
                    <Item label={<LabelTip label="固件系列标识" tip="说明是啥我也不知道"/>} hasFeedback name='totalVersion'
                        rules={[{ required: true, message: '请输入固件系列标识' },{pattern: formrules.strextVer,message: '仅支持字母、数字、下划线、短横线、点号，不超过30个字符'}]}
                    >
                        <Input maxLength={30} placeholder='仅支持字母、数字、下划线、短横线、点号' />
                    </Item>
                    <Item label={<LabelTip label="内部版本号" tip="同一系列标识的固件通过对比内部版本号决定是否升级"/>} hasFeedback name='mainVersion'
                        rules={[{ required: true, message: '请输入内部版本号' },{ pattern: formrules.mainVer,message: '须为不小于0的整数'},{ validator:checkMainVersion}]}
                    >
                        <Input maxLength={10} placeholder='内部版本须为不小于0的整数' />
                    </Item>
                    <Item label="固件程序" name="notneed" required initialValue="0">
                        <Radio.Group onChange={e=>{setUploadType(e.target.value)}}>
                            <Radio.Button value="0">本地上传</Radio.Button><Radio.Button value="1">填写URL</Radio.Button>
                        </Radio.Group>
                    </Item>
                    {
                        uploadType=="1" ? 
                        <Item  className='filepathinpt' hasFeedback name="filePath1"
                            rules={[{ required: true, message: '请输入URL' },{pattern: formrules.url, message: '请输入正确的URL'}]}
                        ><Input maxLength={100} placeholder='请输入URL' />
                        </Item>  
                        :
                        <Item name="filePath2" className='filepathinpt'
                            valuePropName="fileList" getValueFromEvent={normFile}
                            rules={[{ required: true, message: '请上传文件' }]}
                        ><Upload
                                accept='.bin,.hex,.zip,.cyacd,.apk,.dpkg'
                                maxCount={1}
                                action={Paths.upFileUrl}
                                data={{
                                    appId: 31438,
                                    domainType: 4,
                                }}>
                                    <Button type="primary" ><UploadOutlined />上传附件</Button>
                                    <div>支持.bin,.hex,.zip,.cyacd,.apk,.dpkg格式，不超过200MB。</div>
                            </Upload>
                        </Item>
                    }
                </>
                }
            </Form>

        </Modal>
    )
})

export default forwardRef( (props,_ref) => <AddMod  {...props}  refInstance={_ref} />   )