import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Input, Select, Radio, Button, Upload ,Form, Modal,Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { post,Paths } from '../../../api';
import {Notification} from '../../../components/Notification';
import LabelTip from '../../../components/form-com/LabelTip';
import { SCHMETYPE,formrules,TXTUPNAME } from './store/constData'
import {getVersionList,firmwareLastVersion} from './store/actionCreators'
const { Option } = Select;
const { Item } = Form;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
};


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
    editId,editProductFirParams,
    firmwareLastVersion,mcusocproLi,firmwareFrPro,getVersionLi
})=>{


    const [mcuIsUp, setMcuIsUp] = useState(1);
    const [modIsUp, setModIsUp] = useState(1);
    const [curTabNo, setCurTabNo] = useState('tab0');
    const [latestModLi, setLatestModLi] = useState([]);
    const [editFirParamsInfoLi, setEditFirParamsInfoLi] = useState([]);
    const [editFirParamsFm, setEditFirParamsFm] = useState({});
    const [editFirParams, setEditFirParams] = useState([]);
    const { f_firmwareVersionTypeName,f_curExtVersion } = editFirParamsFm;
    
    const { 
        schemeType=editProductFirParams.schemeType, 
        productFirmwareVersion=0 , 
        productId, 
        productName, 
        summaryVersions=[] ,
        productFirmwareName
    } = firmwareFrPro;//schemeType: 2 MCU, 3 SoC,  5 系统
    const communicationMod = summaryVersions.find((itm)=>{return itm.firmwareVersionType == 0}) || {} //通信模组
    const { firmwareVersionTypeName,curExtVersion } = communicationMod;
    const [updateFirmwareLi, setUpdateFirmwareLi] = useState(['tab0']);
    const [formInstance] = Form.useForm();
    const newTabIndex = useRef(0);

    useEffect(() => {
        if(schemeType == 2){
            post(Paths.getModuleDeviceVersionList,{productId:editId||productId},{loading:true}).then(({data={}}) => {
                setLatestModLi(data)
               
                console.log(777,data)
            });
        }
    }, [schemeType])
    useEffect(() => {
        if(editId){
            changedPro(editId)
            post(Paths.otaDevVersionList,{...editProductFirParams}).then(({data=[]}) => {
                setEditFirParamsInfoLi(data)
            })
        }
    }, [editId])
    useEffect(() => {
        if(productFirmwareName){
            formInstance.setFieldsValue({productFirmwareName})
        }
    }, [productFirmwareName])

    useEffect(() => {//修改固件初始化表单
        if(editFirParamsInfoLi.length){
            let alldata = JSON.parse(JSON.stringify(editFirParamsInfoLi));
            let communicationMod = null;
            let idx =  alldata.findIndex(itm=>{
                return itm.firmwareVersionType == 0
            });
            if(idx>-1){
                communicationMod = alldata.slice(idx,1);
                setModIsUp(0);
                setEditFirParamsFm(communicationMod);
                // deviceVersionId
                formInstance.setFieldsValue({
                    modUpgrade:0,
                    f_extVersion:communicationMod.extVersion
                })
                if(schemeType==3){
                    formInstance.setFieldsValue({
                        f_totalVersion:communicationMod.totalVersion,
                        f_filePath:communicationMod.filePath
                    })
                }
            }
            if(alldata.length){
                setMcuIsUp(0);
                setEditFirParams(alldata);
                formInstance.setFieldsValue({mcuUpgrade:0});
                let _updateFirmwareLi = [], form_val = {}
                for(let i=0;i<alldata.length;i++){
                    let k = "tab"+i, _data = alldata[i];
                    _updateFirmwareLi.push(k);
                    let { firmwareVersionTypeName,firmwareTypeNo,totalVersion,extVersion,filePath } =_data;
                   
                    form_val["firmwareVersionTypeName_"+k] = firmwareVersionTypeName;
                    form_val["firmwareTypeNo_"+k] = firmwareTypeNo;
                    form_val["totalVersion_"+k] = totalVersion;
                    form_val["extVersion_"+k] = extVersion;
                    form_val["filePath_"+k] = filePath;

                }
                console.log('--form_val--',form_val)
                setUpdateFirmwareLi(_updateFirmwareLi);
                formInstance.setFieldsValue(form_val)

            }
            
            
            
        }
    }, [editFirParamsInfoLi])

    const changedPro= productId =>{
        // productId = 12150;
        firmwareLastVersion(productId)   
    }

    const onFinish=(values)=>{
        console.log("---formvalues---",values)
        const { productId,productFirmwareName,f_firmwareVersionTypeName,f_curExtVersion,f_extVersion,f_totalVersion,f_filePath } = values;
        let params = {
            productId:editId||productId, 
            productFirmwareName, 
            productFirmwareVersion:editId ?productFirmwareVersion : (productFirmwareVersion+1 ),
        }

        if(schemeType==5||mcuIsUp==0){
            let deviceVersions = updateFirmwareLi.map((k,i)=>{
                const  firmwareTypeNo = values[`firmwareTypeNo_${k}`],
                    firmwareVersionTypeName = values[`firmwareVersionTypeName_${k}`],
                    extVersion = values[`extVersion_${k}`],
                    totalVersion = values[`totalVersion_${k}`],
                    filePath = values[`filePath_${k}`];

                    
                return {
                    deviceVersionName:firmwareVersionTypeName,
                    firmwareVersionType:firmwareTypeNo,
                    mainVersion:'', extVersion, totalVersion, filePath,
                    productId,deviceVersionType: {'2':2,'3':1,'5':4}[schemeType+""],
                    deviceVersionId:editFirParams[i] && editFirParams[i].deviceVersionId
                }
            })
            params = {...params,deviceVersions}
        }
        if(schemeType!=5&&modIsUp==0){
            let deviceVersion = {
                firmwareVersionType:0,
                deviceVersionName:f_firmwareVersionTypeName,
                mainVersion:'',
                extVersion:f_extVersion,
                totalVersion:f_totalVersion,
                filePath:f_filePath,productId,deviceVersionType:{'2':2,'3':1,'5':4}[schemeType+""],
                curExtVersion:f_curExtVersion,
                deviceVersionId:editFirParamsFm.deviceVersionId
            }
            if(params.deviceVersions){
                params.deviceVersions.push(deviceVersion)
            }else{
                params.deviceVersions = [deviceVersion]
            }
        }

        post(Paths.otaAddVersion,params).then((res) => {
            Notification({type:'success',description:'操作成功！'});
            getVersionLi();
            changeState('addFirmwareVisiable',false); 
            changeState('editId',0)
            changeState('editProductFirParams',{})

            
        }); 
    }


    const uploadChange = ({file})=>{
        if(file.response){ //上传成功返回 file.status=="done"
            const url = file.response.data && file.response.data.url || '';
            formInstance.setFieldsValue({ 
                [`filePath_${curTabNo}`]:url
            })
        }
        if(file.status=="removed"){ //删除操作
            formInstance.setFieldsValue({ 
                [`filePath_${curTabNo}`]:""
            })

        }
    }
    const uploadChangeSoc = ({file})=>{
        if(file.response){ //上传成功返回 file.status=="done"
            const url = file.response.data && file.response.data.url || '';
            formInstance.setFieldsValue({ 
                'f_filePath':url
            })
        }
        if(file.status=="removed"){ //删除操作
            formInstance.setFieldsValue({ 
                'f_filePath':""
            })

        }

    }

    const onEditTab = (targetKey, action) => {
        
        if (action === 'add') {
            if(updateFirmwareLi.length){

            }
            add();
        } else {
            console.log('---del--',targetKey)
            remove(targetKey);
        }
    };
    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setUpdateFirmwareLi(pre=>{
            return [...pre,newActiveKey]
        })
        setCurTabNo(newActiveKey);
        // console.log('--addd---',newActiveKey)
    };
    
    const remove = (targetKey) => {
        let newActiveKey = curTabNo;
        let lastIndex = -1;
        updateFirmwareLi.forEach((key, i) => {
          if (key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newPanes = updateFirmwareLi.filter((k) => k !== targetKey);
    
        if (newPanes.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newPanes[lastIndex];
          } else {
            newActiveKey = newPanes[0];
          }
        }
        setUpdateFirmwareLi(newPanes)
        setCurTabNo(newActiveKey);
    };
    

    const cngTab = cur=>{
        setCurTabNo(cur)
    }

    

    return (
        <Modal
            title={editId&&'修改固件'||'新增固件' + editId}
            visible={true}
            onOk={formInstance.submit}
            onCancel={()=>{ 
                changeState('addFirmwareVisiable',false); 
                changeState('editId',0);
                changeState('editProductFirParams',{})
                
            }}
            width={650}
            maskClosable={false}
        >
            <Form form={formInstance} {...formItemLayout} className="ota_add_firmware_dialog" onFinish={onFinish} id='area'>
                
                {
                    editId && <Item label="产品名称"> { productName}</Item> || 
                    <Item label="产品名称" name='productId' rules={[{ required: true, message: '请选择产品' }]}>
                    <Select showSearch optionFilterProp="children" placeholder="请选择产品" onChange={changedPro} getPopupContainer={() => document.getElementById('area')}>
                        {
                            mcusocproLi.map(item => {
                                const {productName,productId} = item;
                                return <Option key={productId} value={productId}>{productName}</Option>
                            })
                        }
                    </Select>
                </Item>
                }
                <Item label="开发方案"> { schemeType && SCHMETYPE.find(({id})=>id==schemeType).nam || '--' }</Item>
                <Item label={<LabelTip label="产品版本号" tip="产品版本自动生成，自增长，产品的整体内部版本号"/>}>
                    { editId ?productFirmwareVersion : (productFirmwareVersion+1 )}
                </Item>
                <Item label="产品版本名称" name='productFirmwareName'   rules={[{ required: true, message: '请输入产品版本名称' }]}>
                    <Input maxLength={30} placeholder='最多30个字符' />
                </Item>
                {
                    schemeType == 5 ? <Item label="操作系统">Android/Linux</Item> :
                    (schemeType == 2 || schemeType == 3) ?
                    <Item label="通信模组升级" name='modUpgrade' initialValue={1}>
                        <Radio.Group onChange={e=>{setModIsUp(e.target.value)}}>
                            <Radio.Button value={1}>不升级</Radio.Button><Radio.Button value={0}>升级</Radio.Button>
                        </Radio.Group>
                    </Item>:null
                }
                {
                    schemeType==2&&modIsUp==0&&
                    <div className='modupbox'>
                        <Item label="通信模组" >{f_firmwareVersionTypeName||firmwareVersionTypeName}</Item>
                        <Item label="当前模组固件版本" > {f_curExtVersion|| curExtVersion}</Item>
                        <Item label="最新模组固件版本" name='f_extVersion' rules={[{ required: true, message: '请选择' }]}>
                            <Select placeholder="请选择"  getPopupContainer={() => document.getElementById('area')}>
                                {
                                    latestModLi.map(item => {
                                        const {deviceVersionId} = item;
                                        return <Option key={deviceVersionId} value={deviceVersionId}>{deviceVersionId}</Option>
                                    })
                                }
                            </Select>
                        </Item>
                        <div className='tips'>备注：自动获取最新模组固件版本，点确定可进行验证和升级。</div>
                    </div>
                }

                {
                    schemeType==3&&modIsUp==0&&
                    <div className='modupbox'>
                        <Item label="通信模组"  >{f_firmwareVersionTypeName||firmwareVersionTypeName}</Item>
                        <Item label='硬件版本号' name="f_totalVersion" > <Input maxLength={30}  placeholder='非必填'/> </Item>
                        <Item label='当前软件版本号' >{f_curExtVersion||curExtVersion}</Item>
                        <Item label="待上传软件版本号" name={'f_extVersion'} rules={[{ required: true, message: '待上传软件版本号' }]}>
                            <Input maxLength={30} placeholder='最多30个字符' />
                        </Item>
                        <Item label='固件程序' name={'f_filePath'}
                            rules={[{ required: true, message: '请输入URL' },{pattern: formrules.url, message: '请输入正确的URL'}]}
                        ><Input maxLength={200} placeholder='请输入URL或者上传一个附件自动填充' />
                        </Item>
                        <Upload className='filepathinpt' onChange={uploadChangeSoc}
                            accept='.bin,.hex,.zip,.cyacd,.apk,.dpkg'
                            maxCount={1}
                            // fileList={[]}
                            action={Paths.upFileUrl}
                            data={{ appId: 31438, domainType: 4, }}>
                                <Button type="primary" ><UploadOutlined />上传附件</Button>
                                <div>支持.bin,.hex,.zip,.cyacd,.apk,.dpkg格式，不超过200MB。</div>
                        </Upload>
                    </div>
                }

                {
                    (schemeType==2 || schemeType==3) &&
                    <Item label= {['','',"MCU升级","自定义插件升级"][schemeType]}  name='mcuUpgrade' initialValue={1}>
                        <Radio.Group onChange={e=>{setMcuIsUp(e.target.value) }}>
                            <Radio.Button value={1}>不升级</Radio.Button><Radio.Button value={0}>升级</Radio.Button>
                        </Radio.Group>
                    </Item>
                }

                { (schemeType==5||mcuIsUp==0) && <>

                    <Tabs className='tabs'type="editable-card" onChange={cngTab} activeKey={curTabNo} onEdit={onEditTab} hideAdd={updateFirmwareLi.length>=5}>
                        {
                            updateFirmwareLi.map( (key,i) =>{
                                return <Tabs.TabPane tab={`${TXTUPNAME[schemeType]}${i}`} key={key} >
                                    <Item label={TXTUPNAME[schemeType] +"名称"} name={`firmwareVersionTypeName_${key}`} rules={[{ required: true, message: '请填写模块名称' }]}>
                                        <Input maxLength={30}  placeholder='不超过30字符'/>
                                    </Item>
                                    <Item label={TXTUPNAME[schemeType] +"编号"} name={`firmwareTypeNo_${key}`} rules={[{ required: true, message: '请填写模块编号' }]}>
                                        <Input maxLength={3}  placeholder='请输入1-100的整数字，编号须唯一'/>
                                    </Item>
                                    <Item label='硬件版本号' name={`totalVersion_${key}`} > <Input maxLength={30}  placeholder='非必填'/> </Item>
                                    <Item label="待上传软件版本号" name={`extVersion_${key}`} rules={[{ required: true, message: '待上传软件版本号' }]}>
                                        <Input maxLength={30} placeholder='最多30个字符' />
                                    </Item>
                                    <Item label='固件程序' name={`filePath_${key}`}
                                        rules={[{ required: true, message: '请输入URL' },{pattern: formrules.url, message: '请输入正确的URL'}]}
                                    ><Input maxLength={200} placeholder='请输入URL或者上传一个附件自动填充' />
                                    </Item>
                                </Tabs.TabPane>
                            })
                        }    
                    </Tabs>
                    {
                        updateFirmwareLi.length>0 && 
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



