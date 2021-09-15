import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Table, Divider, Tag, Modal,Select ,Steps} from 'antd';
import { get,Paths } from '../../../api';
import AddFirmwareDialog from './AddFirmwareDialog';
import {ReleaseFirmware} from './ReleaseFirmware';
import {ValidationFirmwareDialog} from './ValidationFirmwareDialog';

import { DateTool } from '../../../util/util';
import {Notification} from '../../../components/Notification';
import PageTitle from '../../../components/page-title/PageTitle'

import {VERTYPE,STATUSTAG,UPDATESTATUS,PACKAGETYPE,schemeType} from './store/constData'
import {getVersionList,getExtVerLi} from './store/actionCreators'
import upIconImg from '../../../assets/images/upota.png';
const { Step } = Steps;
import './FirmwareManagement.scss';
const { Search,Group } = Input;
const { Option } = Select;
const mapStateToProps = state => {
    const {versionList,extVerisonLi} = state.get('otaUpgrade')
    return {
        versionList,
        extVerisonLi
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getVersionLi: param => dispatch(getVersionList(param)),
        getExtVerLi: param => dispatch(getExtVerLi(param)),
        
    }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class FirmwareManagement  extends Component {
    constructor(props){
        super(props);
        this.refAddFirmware = {}
        this.refValidationFirmware = ()=>{}
        this.state = {
            versionList:[],
            pager:{
                pageIndex:1,
                totalRows:10,
            },
            //搜索字段
            productId:undefined,
            schemeType:undefined,
            deviceVersionName:undefined,
            addFirmwareDialog:false,//增加弹窗
            validationFirmwareDialog:false,//验证弹窗
            deviceVersionId:'',//当前操作（验证、修改验证、发布）的固件id
            validationDetail:{macSet:'',validateType:0},//修改验证 详情
            validationModTit:'验证',
            validateInfo:[
                // {mac:111,upgradeTime:34234123443531,beforeVersion:1.1,updateStatus:2}

            ],//查看验证信息，同时根据validateInfo.lengt>0与否来判断查看验证弹窗是否可见

            releaseFirmwareDialog:false,//升级弹窗
            releasePackageType:0
        }
        
        this.columns = [

            { title: '产品名称', dataIndex: 'productName'},
            { title: '开发方案', dataIndex: 'schemeType', 
                render: s => s>0 && schemeType[s-1].nam || "脏数据"
            },
            { title: '产品版本号', dataIndex: 'productFirmwareVersion'},
            { title: '固件名称', dataIndex: 'firmwareVersionTypeName'},

            { title: '运行状态',  dataIndex: 'updateStatus',
              render: u => {
                  const {nam,color} = STATUSTAG[u]
                  return <Tag color={color} >{nam}</Tag>
              }
            },
            { title: '创建时间',dataIndex: 'releaseTime',
                render: t => <span>{DateTool.utcToDev(t)}</span>
            },
            { title: '操作',dataIndex: 'action',
                render:(a,recard) => {//runStatus 0：待验证 1：验证中 2：已发布,3 验证完成,4
                    const {
                        status,deviceVersionId,
                        macSet='',validateType=0,
                        productId,totalVersion,
                        schemeType,firmwareVersionType,
                        packageType
                    } = recard
                    return <span>
                        {
                            status==0?<a onClick={()=>{this.openValidation(deviceVersionId)}}>验证</a>:
                            status==1?<>
                                <a onClick={()=>{this.openValidation(deviceVersionId,{macSet,validateType:validateType||0})}}>修改验证</a>
                                <Divider type="vertical" />
                                <a onClick={()=>{this.getValidateInfo(deviceVersionId)}}>查看验证</a>
                            </>:<>
                                {
                                    status!=4&&<>
                                        <a onClick={()=>{this.openRelease({deviceVersionId,packageType},{productId,totalVersion,schemeType,firmwareVersionType})}}>发布</a>
                                        <Divider type="vertical" />
                                    </>
                                }
                                {
                                    status!=3&&<a onClick={()=>{this.toFirmwareDetails(deviceVersionId)}}>查看批次</a>
                                }
                            </>
                        }
                        <Divider type="vertical" />
                        <a onClick={()=>{this.deleteConfirm(deviceVersionId)}}>删除</a>
                    </span>
                },
            },
        ];
        this.valInfoColumns = [
            { title: 'Mac地址', dataIndex: 'macAddress'},
            { title: '验证时间',dataIndex: 'upgradeTime',
                render: t => <span>{DateTool.utcToDev(t)}</span>
            },
            { title: '升级前版本', dataIndex: 'beforeVersion'},
            { title: '验证状态',  dataIndex: 'upgradeStatus',
              render: u => {
                  const {nam,color} = UPDATESTATUS[u]
                  return <Tag color={color} >{nam}</Tag>
              }
            },
            { title: '失败原因', dataIndex: 'remark', 
                render: (r,{upgradeStatus})=>(upgradeStatus==3&&r||'--')
            },
            
        ];
    }
    componentDidMount() {
        this.pagerIndex()
    }
    toFirmwareDetails = deviceVersionId=>{
        window.location.hash = `#/open/bigData/OTA/firmwareDetails/${deviceVersionId}`;
    }

    changeState=(k,v)=>{
        this.setState({
            [k]:v
        })
    }
    //打开或者关闭弹窗
    switchDialog = (dialog)=>{
        let pre = this.state[dialog]
        this.setState({
            [dialog]:!pre
        })
    }
    openRelease=({deviceVersionId,packageType},params)=>{
        this.props.getExtVerLi(params)
        this.setState({releaseFirmwareDialog:true,deviceVersionId,releasePackageType:packageType})
    }
    openValidation = (deviceVersionId,validationDetail={macSet:'',validateType:0})=>{
        // console.log(111,validationDetail)
        this.setState({
            validationFirmwareDialog:true,
            deviceVersionId,
            validationDetail,
            validationModTit:validationDetail.macSet&&'修改验证'||'验证'
        })
        
    }
    getValidateInfo = deviceVersionId=>{
        get(Paths.otaValiGetinfo,{deviceVersionId}).then(({data}) => {
            let validateInfo = data||[]
            this.setState({validateInfo});
            if(!validateInfo.length){
                Notification({
                    description:'没有查到验证信息',
                });
            }
        });
    }
    closeValidateInfo = ()=>{
        this.setState({validateInfo:[]});
    }
    //删除固件
    deleteConfirm = (deviceVersionId)=> {
        Modal.confirm({
          title: '删除固件',
          content: `即将删除 ID 为 ${deviceVersionId} 的固件，此固件包下各批次的升级设备信息也将一并删除。`,
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk:()=>{
            get(Paths.otaDeleteVer,{deviceVersionId}).then((model) => {
                let {totalRows,pageIndex} = this.state.pager;
                pageIndex = (totalRows % ((pageIndex-1)*10))>1?pageIndex:pageIndex-1;
                this.pagerIndex(pageIndex)
            });
          }
        });
    }
    //获取固件列表
    pagerIndex=(pageIndex=1)=>{
        let {productId,schemeType,deviceVersionName} = this.state
        let params ={pageIndex,productId}
        schemeType!=-1 && (params.schemeType = schemeType)
        deviceVersionName && (params.deviceVersionName = deviceVersionName)

        this.props.getVersionLi(params)
    }
    closeValiFirm=()=>{
        this.switchDialog('validationFirmwareDialog')
        // this.setState({
        //     validationDetail:{macSet:'',validateType:0}
        // })
    }
    setValidationDetail=(k,v)=>{
        let validationDetail = this.state.validationDetail
        this.setState({
            validationDetail:{...validationDetail,[k]:v}
        })
    }
    render() {
        const {
            addFirmwareDialog,releaseFirmwareDialog,validationFirmwareDialog,
            deviceVersionId,validationDetail,validateInfo,releasePackageType,validationModTit
        } = this.state;
        const {versionList:{list,pager}} = this.props;
        const {pageIndex,totalRows} =pager;
        
        return (
            <div className="ota-firmware-up">
                <PageTitle title="固件升级" selectOnchange={val=>{this.changeState('productId',val)}} />
                <div className='comm-shadowbox comm-setp-ttip'>
                    <div className='step-title'>
                        <img src={upIconImg}/>
                        <span>固件升级步骤</span>
                    </div>
                    <Steps current={-1} initial={0}>
                        <Step title="添加升级包" description="添加升级包，区分不同的MCU、模组、系统，区分整体包、差分包等。" />
                        <Step title="配置升级策略" description="配置升级对象，配置升级批次、升级范围、升级时间等升级具体策略。" />
                        <Step title="查看升级详情" description="查看升级包各升级批次的具体设备列表，以及各设备的升级状态。" />
                    </Steps>
                </div>

                <div className='otacontent comm-shadowbox'>
                    <div className='otasearchbox'>
                        <div className="searchgroupbox">
                            <span>方案类型：</span>
                            <Select className='typeselect' defaultValue={-1} onChange={val=>{this.changeState('schemeType',val)}}>
                                <Option value={-1}>全部类型</Option>
                                {
                                    schemeType.map(({id,nam},i)=><Option key={i} value={id}>{nam}</Option>)
                                }
                            </Select>
                            <span>固件包名称：</span>
                            <Search placeholder="输入升级包名称查找"
                                className='serachinpt'
                                enterButton
                                maxLength={20}
                                onChange={e=>{this.changeState('deviceVersionName',e.target.value)}}
                                onSearch={()=>{this.pagerIndex(1)}} 
                            />
                        </div>
                        <Button className='button' onClick={()=>{this.switchDialog('addFirmwareDialog')}} type="primary">添加固件</Button>
                    </div>
                    
                   
                    <Table 
                        rowKey={({deviceVersionId})=>deviceVersionId+"_"}
                        columns={this.columns}
                        dataSource={list}
                        pagination={{
                            defaultCurrent:pageIndex, 
                            total:totalRows, 
                            hideOnSinglePage:false,
                            onChange:this.pagerIndex
                        }} 
                    />

                    <AddFirmwareDialog onRef={ref=>{this.refAddFirmware = ref}} changeState={this.changeState} />

                    {releaseFirmwareDialog&&
                        <Modal 
                            title='发布固件' 
                            visible={true}
                            width={660}
                            onCancel={()=>{this.switchDialog('releaseFirmwareDialog')}}
                            footer={null}
                            maskClosable={false}
                        >
                            <ReleaseFirmware packageType={releasePackageType} deviceVersionId={deviceVersionId} close={()=>{this.switchDialog('releaseFirmwareDialog')}} />
                        </Modal>
                    }
                    <Modal 
                        title={validationModTit} 
                        visible={validationFirmwareDialog}
                        onOk={()=>{this.refValidationFirmware()}}
                        onCancel={this.closeValiFirm}
                        width={650}
                        maskClosable={false}
                    >
                        <ValidationFirmwareDialog 
                            deviceVersionId={deviceVersionId}
                            validationDetail={{...validationDetail}}
                            setValidationDetail= {this.setValidationDetail}
                            pagerIndex={this.pagerIndex}
                            pageIndex={pageIndex}
                            onRef={ref=>{this.refValidationFirmware = ref}}
                            close = {this.closeValiFirm}
                        />
                    </Modal>
                    <Modal 
                        title='验证信息' 
                        visible={!!validateInfo.length}
                        onCancel={this.closeValidateInfo}
                        width={800}
                        footer={null}
                        maskClosable={false}
                    >
                        <Table rowKey="macAddress" columns={this.valInfoColumns} dataSource={validateInfo} pagination={false} />
                    </Modal>
                </div>
            </div>
        )
    }
}
