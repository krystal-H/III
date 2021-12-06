import React, { forwardRef,useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, Select, Radio, Button, Upload ,Form, Modal,Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { get,post,Paths } from '../../../api';
import {Notification} from '../../../components/Notification';
import { getUploadUrl } from '../../../util/util';
import LabelTip from '../../../components/form-com/LabelTip';
import { SCHMETYPE,formrules, VERTYPE } from './store/constData'
import {getVersionList,firmwareLastVersion} from './store/actionCreators'
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
        firmwareLastVersion: id => dispatch(firmwareLastVersion(id))
    }
}

const AddMod = connect(mapStateToProps, mapDispatchToProps)(({
    refInstance,

    changeState,

    firmwareLastVersion,mcusocproLi,firmwareFrPro,getVersionLi
})=>{


    const [mcuIsUp, setMcuIsUp] = useState(1);
    const [uploadType, setUploadType] = useState("0");
    const [firmwareList, setFirmwareList] = useState([]);

    const [formInstance] = Form.useForm();

    const { schemeType, productFirmwareVersion='--',deviceVersionId } = firmwareFrPro;//schemeType: 2 MCU, 3 SoC

    useEffect(() => {
        console.log(22222,firmwareFrPro)
        if( schemeType ){
            setFirmwareList([
                {firmwareTypeName:'aaa',firmwareTypeNo:1},
                {firmwareTypeName:'bbb',firmwareTypeNo:2},
                {firmwareTypeName:'ccc',firmwareTypeNo:3},
                {firmwareTypeName:'eee',firmwareTypeNo:4},
            ])

            post(Paths.getFirmwareList,{productId,schemeType}).then((res) => {
                console.log(333,res)
               
                
            }); 
        }
    }, [firmwareFrPro])

    useEffect(() => {
        if( firmwareList.length ){
            
        }
    }, [firmwareList.length])



    const changedPro= productId =>{
        productId = 12150;
        firmwareLastVersion(productId)   
    }

    const onFinish=(values)=>{
        const { filePath1, filePath2, ...otherPar } = values;
        const deviceVersionType = 5;
        let filePath=undefined;

        if( schemeType ==3 || mcuIsUp==0){
            // console.log(222,filePath1, getUploadUrl(filePath2) )
            filePath = uploadType=="1" && filePath1 || getUploadUrl(filePath2);

        }

        // const filePath = schemeType==3 && (uploadType=="1" && filePath1 || getUploadUrl(filePath2)) || undefined;

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
                <Item label="开发方案"> { schemeType && SCHMETYPE[schemeType-2] && SCHMETYPE[schemeType-2].nam || '--' }</Item>
                {
                    schemeType==2&&<>
                        <Item label="当前模组固件版本"> {   }</Item>
                        <Item label="最新模组固件版本"> {   }</Item>
                    </>
                }
                <Item label={<LabelTip label="产品版本号" tip="产品版本自动生成，自增长，产品的整体内部版本号"/>}>
                    {productFirmwareVersion}
                </Item>
                <Item label="产品版本名称" name='deviceVersionName' rules={[{ required: true, message: '请输入产品版本名称' }]}>
                    <Input maxLength={30} placeholder='最多30个字符' />
                </Item>

                {
                    schemeType==2 &&
                    <Item label="MCU升级" name='mcuUpgrade' initialValue={1}>
                        <Radio.Group onChange={e=>{setMcuIsUp(e.target.value)}}>
                            <Radio.Button value={1}>不升级</Radio.Button><Radio.Button value={0}>升级</Radio.Button>
                        </Radio.Group>
                    </Item>
                }
                { "(schemeType==3||mcuIsUp==0)" && <>
                    <Item label={schemeType==3&&"模块"||"模块/插件"}  >
                        <Select placeholder="选择固件模块" onChange={()=>{}} mode="multiple">
                            {
                                firmwareList.map(({firmwareTypeName,firmwareTypeNo},i) => {
                                    return <Option key={firmwareTypeNo} disabled={i==0} value={firmwareTypeNo}>{firmwareTypeName}</Option>
                                })
                            }
                        </Select>
                    </Item>


                    {/* <Tabs activeKey={'0'}>
                        <TabPane tab="告警信息" key={'0'}>
                            <BaseInfoForm ref={ref0} setStepCur={setStepCur} formdata={baseFormData}/>
                        </TabPane>
                        <TabPane tab="规则配置"  key={'1'}>
                            <RuleForm ref={ref1} setStepCur={setStepCur} formdata={ruleFormData}/>
                        </TabPane>
                        <TabPane tab="通知方式"  key={'2'}>
                            <PublictypeForm ref={ref2} setStepCur={setStepCur} commitAll={commitAll} formdata={pubFormData}/>
                        </TabPane>
                    </Tabs> */}




                    <Item label={<LabelTip label="固件系列标识" tip="区分不同固件包，只有相同的固件才能升级"/>} name='totalVersion'
                        rules={[{ required: true, message: '请输入固件系列标识' },{pattern: formrules.strextVer,message: '仅支持字母、数字、下划线、短横线、点号，不超过30个字符'}]}
                    >
                        <Input maxLength={30} placeholder='仅支持字母、数字、下划线、短横线、点号' />
                    </Item>
                    <Item label={<LabelTip label="内部版本号" tip="同一系列标识的固件通过对比内部版本号决定是否升级"/>} name='mainVersion'
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
                        <Item  className='filepathinpt' name="filePath1"
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