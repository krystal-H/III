import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Input, Select, Radio, Button, Upload ,Form, Modal,Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { get,post,Paths } from '../../../api';
import {Notification} from '../../../components/Notification';
import LabelTip from '../../../components/form-com/LabelTip';
import { SCHMETYPE,formrules, VERTYPE } from './store/constData'
import {getVersionList,firmwareLastVersion} from './store/actionCreators'
const { Option } = Select;
const { Item } = Form;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
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
    changeState,
    firmwareLastVersion,mcusocproLi,firmwareFrPro,getVersionLi
})=>{


    const [mcuIsUp, setMcuIsUp] = useState(1);
    
    const [firmwareList, setFirmwareList] = useState([]);
    const [selectedFirmwareLi, setSelectedFirmwareLi] = useState([]);
    const [curFirmwareTypeNo, setCurFirmwareTypeNo] = useState();

    const [formInstance] = Form.useForm();

    const { schemeType, productFirmwareVersion=0 , productId, summaryVersions=[] } = firmwareFrPro;//schemeType: 2 MCU, 3 SoC

    useEffect(() => {
        console.log(22222,firmwareFrPro)
        if( schemeType ){
            post(Paths.getFirmwareList,{productId,schemeType}).then(({data = []}) => {
                if(schemeType==2){
                    formInstance.setFieldsValue({ mcuUpgrade:1 })
                    setMcuIsUp(1)
                }
                setFirmwareList(data)
                setSelectedFirmwareLi([])
                // setCurFirmwareTypeNo()
                // if(data.length>0){
                //     const firstNo = data[0].firmwareTypeNo
                //     setSelectedFirmwareLi([firstNo])
                //     setCurFirmwareTypeNo(firstNo)
                // }
                
            }); 
        }
    }, [firmwareFrPro])

    const changedPro= productId =>{
        // productId = 12150;
        firmwareLastVersion(productId)   
    }

    const onFinish=(values)=>{
        console.log(111,values)
        const { productId, productFirmwareName } = values;
        let params = {
            productId, 
            productFirmwareName, 
            productFirmwareVersion:productFirmwareVersion+1,
            deviceVersionIds:summaryVersions[0].deviceVersionId,
        }

        if(schemeType==3||mcuIsUp==0){
            let deviceVersions = selectedFirmwareLi.map(firmwareTypeNo=>{
                let o = firmwareList.find(a=>a.firmwareTypeNo==firmwareTypeNo) || {}
                const { firmwareTypeName, deviceVersionType } = o;
                const mainVersion = values[`mainVersion_${firmwareTypeNo}`],
                    extVersion = mainVersion,
                    totalVersion = values[`totalVersion_${firmwareTypeNo}`],
                    filePath = values[`filePath_${firmwareTypeNo}`];
                return {
                    deviceVersionName:firmwareTypeName,
                    deviceVersionType,
                    firmwareVersionType:firmwareTypeNo,
                    mainVersion, extVersion, totalVersion, filePath,
                    productId
                }
            })
            params = {...params,deviceVersions}
        }

        post(Paths.otaAddVersion,params).then((res) => {
            Notification({type:'success',description:'新增成功！'});
            getVersionLi();
            changeState('addFirmwareVisiable',false); 
        }); 
    }


    const uploadChange = ({file})=>{
        if(file.response){
            const url = file.response.data && file.response.data.url || '';
            formInstance.setFieldsValue({ 
                [`filePath_${curFirmwareTypeNo}`]:url
            })
        }
    }

    const cngTab = cur=>{
        setCurFirmwareTypeNo(cur)
    }

    

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
                <Item label="开发方案"> { schemeType && SCHMETYPE[schemeType-1] && SCHMETYPE[schemeType-1].nam || '--' }</Item>
                {
                    schemeType==2&&<>
                        <Item label="当前模组固件版本"> { summaryVersions[0] && summaryVersions[0].curMainVersion  }</Item>
                        <Item label="最新模组固件版本"> { summaryVersions[0] && summaryVersions[0].mainVersion  }</Item>
                    </>
                }
                <Item label={<LabelTip label="产品版本号" tip="产品版本自动生成，自增长，产品的整体内部版本号"/>}>
                    { productFirmwareVersion+1 }
                </Item>
                <Item label="产品版本名称" name='productFirmwareName' rules={[{ required: true, message: '请输入产品版本名称' }]}>
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
                { (schemeType==3||mcuIsUp==0) && <>
                    <Item label={schemeType==3&&"模块"||"模块/插件"}>
                        <Select placeholder="选择固件模块" onChange={v=>{setSelectedFirmwareLi(v)}} mode="multiple" value={selectedFirmwareLi}>
                            {
                                firmwareList.map(({firmwareTypeName,firmwareTypeNo},i) => {
                                    return <Option key={firmwareTypeNo} 
                                    // disabled={i==0} 
                                    value={firmwareTypeNo}>{firmwareTypeName}</Option>
                                })
                            }
                        </Select>
                    </Item>

                    <Tabs className='tabs'type="card" onChange={cngTab}>
                        {
                            selectedFirmwareLi.map( firmwareTypeNo =>{
                                const data = summaryVersions.find(a=>a.firmwareVersionType == firmwareTypeNo) || {}
                                let { firmwareVersionTypeName, totalVersion=0, curMainVersion=0 } = data;
                                if(!firmwareVersionTypeName){
                                    let lidata = firmwareList.find((a)=>a.firmwareTypeNo==firmwareTypeNo) || {firmwareTypeName:'未知模块名'}
                                    firmwareVersionTypeName = lidata.firmwareTypeName
                                }

                                return <Tabs.TabPane tab={ firmwareVersionTypeName } key={firmwareTypeNo} >
                                {/* return <Tabs.TabPane tab={data.firmwareVersionType+'_'+firmwareVersionTypeName + "_" + selectedFirmwareLi.length} key={firmwareTypeNo} > */}
                                    <Item label={schemeType==3&&"模块编号"||"模块/插件编号"}>{firmwareTypeNo}</Item>
                                    <Item label='硬件版本号' name={`totalVersion_${firmwareTypeNo}`} initialValue={totalVersion}>
                                        <Input className='noborderinpt' disabled/>
                                    </Item>
                                    <Item label='当前软件版本号'>{curMainVersion}</Item>
                                    <Item label="待上传软件版本号" name={`mainVersion_${firmwareTypeNo}`} rules={[{ required: true, message: '待上传软件版本号' }]}>
                                        <Input maxLength={10} placeholder='最多30个字符' />
                                    </Item>
                                    <Item label='固件程序' name={`filePath_${firmwareTypeNo}`}
                                            rules={[{ required: true, message: '请输入URL' },{pattern: formrules.url, message: '请输入正确的URL'}]}
                                        ><Input maxLength={100} placeholder='请输入URL或者上传一个附件自动填充' />
                                        
                                    </Item>
                                </Tabs.TabPane>
                            })
                        }    
                    </Tabs>
                    {
                        selectedFirmwareLi.length>0 && 
                        <Upload className='filepathinpt' onChange={uploadChange}
                            accept='.bin,.hex,.zip,.cyacd,.apk,.dpkg'
                            maxCount={1}
                            action={Paths.upFileUrl}
                            data={{ appId: 31438, domainType: 4, }}>
                                <Button type="primary" ><UploadOutlined />上传附件</Button>
                                <div>支持.bin,.hex,.zip,.cyacd,.apk,.dpkg格式，不超过200MB。</div>
                        </Upload>
                    }
                </>
                }
            </Form>

        </Modal>
    )
})

export default AddMod



