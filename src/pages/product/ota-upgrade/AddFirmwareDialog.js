import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Input, Select, Radio, Button, Upload ,Form, Modal,Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FIRMWAREFROMPRO } from "./store/actionTypes";
import { post,Paths } from '../../../api';
import {Notification} from '../../../components/Notification';
import LabelTip from '../../../components/form-com/LabelTip';
import { SCHMETYPE,formrules,TXTUPNAME } from './store/constData'
import {getVersionList,firmwareLastVersion} from './store/actionCreators'
import store from '../../../store';
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
    firmwareLastVersion,mcusocproLi,firmwareFrPro={},getVersionLi
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
        productFirmwareName,
        productFirmwareId
    } = firmwareFrPro;//schemeType: 2 MCU, 3 SoC,  5 ??????
    const communicationMod = summaryVersions.find((itm)=>{return itm.firmwareVersionType == 0}) || {} //????????????
    const { firmwareVersionTypeName,curExtVersion } = communicationMod;
    const [updateFirmwareLi, setUpdateFirmwareLi] = useState(['tab0']);
    const [formInstance] = Form.useForm();
    const newTabIndex = useRef(0);

    const selectproId = useRef();

    useEffect(() => {
        let id = editId || selectproId.current;
        if(schemeType == 2 && id){
            post(Paths.getModuleDeviceVersionList,{productId:id},{loading:true}).then(({data={}}) => {
                console.log('---lastmodinfo--',data)
                setLatestModLi(data)
            });
        }
    }, [firmwareFrPro])
    useEffect(() => {
        if(editId){
            changedPro(editId)
            post(Paths.otaDevVersionList,{...editProductFirParams}).then(({data=[]}) => {
                setEditFirParamsInfoLi(data)
            })
        }else{
            store.dispatch({
                type: FIRMWAREFROMPRO,
                firmwareFrPro:{},
            })
        }
    }, [editId])
    useEffect(() => {
        if(productFirmwareName && editId){
            formInstance.setFieldsValue({productFirmwareName})
        }else{
            formInstance.setFieldsValue({productFirmwareName:''})
        }
    }, [productFirmwareName])

    useEffect(() => {//???????????????????????????
        if(editFirParamsInfoLi.length){
            let alldata = JSON.parse(JSON.stringify(editFirParamsInfoLi));
            let communicationMod = null;
            let idx =  alldata.findIndex(itm=>{
                return itm.firmwareVersionType == 0
            });
            if(idx>-1){
                communicationMod = alldata.splice(idx,1)[0];
                const { extVersion,totalVersion,filePath } = communicationMod
                console.log(444,communicationMod)
                setModIsUp(0);
                setEditFirParamsFm(communicationMod);
                formInstance.setFieldsValue({
                    modUpgrade:0,
                    f_extVersion:extVersion
                })
                if(schemeType==3){
                    console.log(555,totalVersion,filePath)
                    formInstance.setFieldsValue({
                        f_totalVersion:totalVersion,
                        f_filePath:filePath
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
                    let { firmwareVersionTypeName,firmwareVersionType,totalVersion,extVersion,filePath } =_data;
                   
                    form_val["firmwareVersionTypeName_"+k] = firmwareVersionTypeName;
                    form_val["firmwareTypeNo_"+k] = firmwareVersionType;
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
        firmwareLastVersion(productId)
        selectproId.current = productId
    }

    const onFinish=(values)=>{
        if(mcuIsUp&&modIsUp&&schemeType!=5){
            Notification({type:'info',description:'?????????????????????'});
            return
        }

        const { productId,productFirmwareName,f_extVersion,f_totalVersion,f_filePath } = values;
        let params = {
            productId:editId||productId, 
            productFirmwareName, 
            productFirmwareVersion:editId ?productFirmwareVersion : (productFirmwareVersion+1 ),
            productFirmwareId:editId?productFirmwareId:undefined
        }
        const indexarr = []

        if(schemeType==5||mcuIsUp==0){
            let deviceVersions = updateFirmwareLi.map((k,i)=>{
                const  firmwareTypeNo = values[`firmwareTypeNo_${k}`],
                    firmwareVersionTypeName = values[`firmwareVersionTypeName_${k}`],
                    extVersion = values[`extVersion_${k}`],
                    totalVersion = values[`totalVersion_${k}`],
                    filePath = values[`filePath_${k}`];
                indexarr.push(firmwareTypeNo)    
                return {
                    deviceVersionName:firmwareVersionTypeName,
                    firmwareVersionType:firmwareTypeNo,
                    mainVersion:'', extVersion, totalVersion, filePath,
                    productId,deviceVersionType: {'2':2,'3':1,'5':4}[schemeType+""],
                    deviceVersionId:editFirParams[i] && editFirParams[i].deviceVersionId
                }
            })
            if(Array.from(new Set(indexarr)).length<indexarr.length){
                Notification({type:'info',description:TXTUPNAME[schemeType] +"??????????????????"});
                return

            }
            params = {...params,deviceVersions}
        }
        if(schemeType!=5&&modIsUp==0){

            let deviceVersion = {
                firmwareVersionType:0,
                deviceVersionName:f_firmwareVersionTypeName || firmwareVersionTypeName,
                mainVersion:'',
                // extVersion:f_extVersion,
                totalVersion:f_totalVersion,
                filePath:f_filePath,productId,deviceVersionType:{'2':1,'3':1,'5':4}[schemeType+""],
                curExtVersion:f_curExtVersion,
                deviceVersionId:editFirParamsFm.deviceVersionId,
            }

            if(schemeType == 3){
                deviceVersion.extVersion = f_extVersion
            }else{
                let lastmodinfo = latestModLi.find(t=>{return t.deviceVersionId==f_extVersion}) || {}
                console.log(777,f_extVersion,lastmodinfo)
                deviceVersion = {...deviceVersion,...lastmodinfo}

            }


            if(params.deviceVersions){
                params.deviceVersions.push(deviceVersion)
            }else{
                params.deviceVersions = [deviceVersion]
            }
        }
        let reqpath = Paths.otaAddVersion
        if(editId){
            reqpath = Paths.otaUpdateVersion;
        }

        post(reqpath,params,{loading:true}).then((res) => {
            Notification({type:'success',description:'???????????????'});
            getVersionLi();
            changeState('addFirmwareVisiable',false); 
            changeState('editId',0)
            changeState('editProductFirParams',{}) 
        }); 
    }


    const uploadChange = ({file},key)=>{
        if(file.response){ //?????????????????? file.status=="done"
            const url = file.response.data && file.response.data.url || '';
            formInstance.setFieldsValue({ 
                [`filePath_${key}`]:url
            })
            
        }
        if(file.status=="removed"){ //????????????
            formInstance.setFieldsValue({ 
                [`filePath_${key}`]:""
            })

        }
    }
    const uploadChangeSoc = ({file})=>{
        if(file.response){ //?????????????????? file.status=="done"
            const url = file.response.data && file.response.data.url || '';
            formInstance.setFieldsValue({ 
                'f_filePath':url
            })
        }
        if(file.status=="removed"){ //????????????
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
            title={editId&&'????????????'||'????????????'}
            visible={true}
            onOk={formInstance.submit}
            onCancel={()=>{ 
                changeState('addFirmwareVisiable',false); 
                changeState('editId',0);
                changeState('editProductFirParams',{})
                
            }}
            width={700}
            maskClosable={false}
        >
            <Form form={formInstance} {...formItemLayout} className="ota_add_firmware_dialog" onFinish={onFinish} id='area'>
                
                {
                    editId && <Item label="????????????"> { productName}</Item> || 
                    <Item label="????????????" name='productId' rules={[{ required: true, message: '???????????????' }]}>
                    <Select showSearch optionFilterProp="children" placeholder="???????????????" onChange={changedPro} getPopupContainer={() => document.getElementById('area')}>
                        {
                            mcusocproLi.map(item => {
                                const {productName,productId} = item;
                                return <Option key={productId} value={productId}>{productName}</Option>
                            })
                        }
                    </Select>
                </Item>
                }
                <Item label="????????????"> { schemeType && SCHMETYPE.find(({id})=>id==schemeType).nam || '--' }</Item>
                <Item label={<LabelTip label="???????????????" tip="?????????????????????????????????????????????????????????????????????"/>}>
                    { editId ?productFirmwareVersion : (productFirmwareVersion+1 )}
                </Item>
                <Item label="??????????????????" name='productFirmwareName'   rules={[{ required: true, message: '???????????????????????????' }]}>
                    <Input maxLength={30} placeholder='??????30?????????' />
                </Item>
                {
                    schemeType == 5 ? <Item label="????????????">Android/Linux</Item> :
                    (schemeType == 2 || schemeType == 3) ?
                    <Item label="??????????????????" name='modUpgrade' initialValue={1}>
                        <Radio.Group onChange={e=>{setModIsUp(e.target.value)}}>
                            <Radio.Button value={1}>?????????</Radio.Button><Radio.Button value={0}>??????</Radio.Button>
                        </Radio.Group>
                    </Item>:null
                }
                {
                    schemeType==2&&modIsUp==0&&
                    <div className='modupbox margb'>
                        <Item label="????????????" >{f_firmwareVersionTypeName||firmwareVersionTypeName}</Item>
                        <Item label="????????????????????????" > {f_curExtVersion|| curExtVersion}</Item>
                        <Item label="????????????????????????" name='f_extVersion' rules={[{ required: true, message: '?????????' }]}>
                            <Select placeholder="?????????"  getPopupContainer={() => document.getElementById('area')}>
                                {
                                    latestModLi.map(item => {
                                        const {deviceVersionId,extVersion} = item;
                                        return <Option key={deviceVersionId} value={deviceVersionId}>{extVersion}</Option>
                                    })
                                }
                            </Select>
                        </Item>
                        <div className='tips'>????????????????????????????????????????????????????????????????????????????????????</div>
                    </div>
                }

                {
                    schemeType==3&&modIsUp==0&&
                    <div className='modupbox margb'>
                        <Item label="????????????"  >{f_firmwareVersionTypeName||firmwareVersionTypeName}</Item>
                        <Item label='???????????????' name="f_totalVersion" ><Input maxLength={30}  placeholder='?????????'/></Item>
                        <Item label='?????????????????????' >{f_curExtVersion||curExtVersion}</Item>
                        <Item label="????????????????????????" name='f_extVersion' rules={[{ required: true, message: '????????????????????????' }]}>
                            <Input maxLength={30} placeholder='??????30?????????' />
                        </Item>
                        <Item label='????????????' name='f_filePath'
                            rules={[{ required: true, message: '?????????URL' },{pattern: formrules.url, message: '??????????????????URL'}]}
                        ><Input maxLength={200} placeholder='?????????URL????????????????????????????????????' />
                        </Item>
                        <Upload className='filepathinpt' onChange={uploadChangeSoc}
                            accept='.bin,.hex,.zip,.cyacd,.apk,.dpkg'
                            maxCount={1}
                            action={Paths.upFileUrl}
                            data={{ appId: 31438, domainType: 4, }}>
                                <Button type="primary" ><UploadOutlined />????????????</Button>
                                <div>??????.bin,.hex,.zip,.cyacd,.apk,.dpkg??????????????????200MB???</div>
                        </Upload>
                    </div>
                }

                {
                    (schemeType==2 || schemeType==3) &&
                    <Item label= {['','',"MCU??????","?????????????????????"][schemeType]}  name='mcuUpgrade' initialValue={1}>
                        <Radio.Group onChange={e=>{setMcuIsUp(e.target.value) }}>
                            <Radio.Button value={1}>?????????</Radio.Button><Radio.Button value={0}>??????</Radio.Button>
                        </Radio.Group>
                    </Item>
                }

                { (schemeType==5||mcuIsUp==0) && <div className='modupbox'>

                    <Tabs className='tabs' type="editable-card" onChange={cngTab} activeKey={curTabNo} onEdit={onEditTab} hideAdd={updateFirmwareLi.length>=5}>
                        {
                            updateFirmwareLi.map( (key,i) =>{
                                return <Tabs.TabPane tab={`${{2:"MCU",3:"??????",5:"??????"}[schemeType]}${TXTUPNAME[schemeType]}${i+1}`} key={key} >
                                    <Item label={TXTUPNAME[schemeType] +"??????"} name={`firmwareVersionTypeName_${key}`} rules={[{ required: true, message: '?????????????????????' }]}>
                                        <Input maxLength={30}  placeholder='?????????30??????'/>
                                    </Item>
                                    <Item label={TXTUPNAME[schemeType] +"??????"} name={`firmwareTypeNo_${key}`} rules={[
                                        { required: true, message: '?????????????????????' },
                                        {pattern: formrules.mainVer, message: '?????????1-100?????????'}
                                    ]}>
                                        <Input maxLength={3}  placeholder='?????????1-100??????????????????????????????'/>
                                    </Item>
                                    <Item label='???????????????' name={`totalVersion_${key}`} >
                                        <Input maxLength={30}  placeholder='?????????'/>
                                    </Item>
                                    <Item label="????????????????????????" name={`extVersion_${key}`} rules={[{ required: true, message: '????????????????????????' }]}>
                                        <Input maxLength={30} placeholder='??????30?????????' />
                                    </Item>
                                    <Item label='????????????' name={`filePath_${key}`}
                                        rules={[{ required: true, message: '?????????URL' },{pattern: formrules.url, message: '??????????????????URL'}]}
                                    ><Input maxLength={200} placeholder='?????????URL????????????????????????????????????' />
                                    </Item>

                                    <Upload className='filepathinpt' onChange={data=>{uploadChange(data,key)}} accept='.bin,.hex,.zip,.cyacd,.apk,.dpkg' maxCount={1}
                                        // fileList={[]}
                                        action={Paths.upFileUrl}
                                        data={{ appId: 31438, domainType: 4, }}>
                                            <Button type="primary" ><UploadOutlined />????????????</Button>
                                            <div>??????.bin,.hex,.zip,.cyacd,.apk,.dpkg??????????????????200MB???</div>
                                    </Upload>

                                </Tabs.TabPane>
                            })
                        }    
                    </Tabs>
                </div >
                }
            </Form>

        </Modal>
    )
})

export default AddMod



