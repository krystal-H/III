import React, { forwardRef,useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, Select, Radio, Cascader, AutoComplete ,Form, Modal} from 'antd';

import { get,post,Paths } from '../../../api';
import {Notification} from '../../../components/Notification';
import { UploadFileClass } from '../../../components/upload-file';
import LabelTip from '../../../components/form-com/LabelTip';
import { SCHMETYPE,formrules, VERTYPE } from './store/constData'
import {getVersionList,getExtVerLi,firmwareFromProduct} from './store/actionCreators'
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
    const { productList, firmwareFrPro, extVerisonLi } = state.get('otaUpgrade')
    return {
        productList, firmwareFrPro,
        // extVerisonLi
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // getVersionLi: param => dispatch(getVersionList(param)),
        // getExtVerLi: param => dispatch(getExtVerLi(param)),
        firmwareFromProduct: id => dispatch(firmwareFromProduct(id)),
    }
}

const AddMod = connect(mapStateToProps, mapDispatchToProps)(({
    refInstance,

    visiable,
    changeState,

    firmwareFromProduct,productList,firmwareFrPro
})=>{


    const [mcuIsUp, setMcuIsUp] = useState(1);
    const [uploadType, setUploadType] = useState("0");

    const [formInstance] = Form.useForm();

    

    // useEffect( () => {
    //     // console.log(777,editData)
    //     const { remark,content } = editData;
    //     if(id!==undefined){
    //         const contobj = JSON.parse(content);
    //         const {warningWay,warningTitle,warningDetails,waringFreq,emailAddress,...others} = contobj;
    //         setBaseFormData({name,remark});
    //         setRuleFormData(others);
    //         setPubFormData({warningWay,warningTitle,warningDetails,waringFreq,emailAddress});
    //     }
    // },[editData])

    const changedPro= productId =>{
        firmwareFromProduct(productId)
    }
    const onFinish=(values)=>{
        console.log(333,values)
        return;
        post(Paths.otaAddVersion,{...values}).then((res) => {
            Notification({type:'success',description:'新增成功！'});
        }); 
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    const { schemeType = 2, extVersion, moduleName, updatePackgeName } = firmwareFrPro;

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
                            productList.map(item => {
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
                                VERTYPE.map(item => {
                                    const {id,nam} = item;
                                    return <Option key={id} value={id}>{nam}</Option>
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
                        <Item  className='filepathinpt' hasFeedback name="filePath2"
                            rules={[{ required: true, message: '请上传文件' }] }
                        ><UploadFileClass 
                                onRef={el => {}}
                                isNotImg={true}
                                format='.bin,.hex,.zip,.cyacd,.apk,.dpkg'
                                maxSize={200}
                            />
                        </Item>
                    }
                </>
                }
            </Form>

        </Modal>
    )
})

export default forwardRef( (props,_ref) => <AddMod  {...props}  refInstance={_ref} />   )