import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Tag, Modal, Select, Steps, Space } from 'antd';
import { get, Paths } from '../../../api';
import AddFirmwareDialog from './AddFirmwareDialog';
import { ReleaseFirmware } from './ReleaseFirmware';
import { ValidationFirmwareDialog } from './ValidationFirmwareDialog';
import ViewFirmList from './viewFirmList';
import { DateTool } from '../../../util/util';
import { Notification } from '../../../components/Notification';
import PageTitle from '../../../components/page-title/PageTitle'

import { VERTYPE, STATUSTAG, UPDATESTATUS, SCHMETYPE } from './store/constData'
import { getVersionList, getExtVerLi, getMcuSocProLi } from './store/actionCreators'
import upIconImg from '../../../assets/images/upota.png';
import './FirmwareManagement.scss';
import { getUrlParam } from '../../../util/util';
const { Step } = Steps;
const { Option } = Select;
const mapStateToProps = state => {
    const { versionList,mcusocproLi } = state.get('otaUpgrade')
    return {
        versionList,mcusocproLi
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getVersionLi: param => dispatch(getVersionList(param)),
        getExtVerLi: param => dispatch(getExtVerLi(param)),
        getMcuSocProLi: param => dispatch(getMcuSocProLi()),

    }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class FirmwareManagement extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.refValidationFirmware = () => { }
        this.state = {
            versionList: [],
            pager: {
                pageIndex: 1,
                totalRows: 10,
            },
            //搜索字段
            productId: getUrlParam('productId') || "-1",
            schemeType: undefined,
            addFirmwareVisiable: false,//增加弹窗
            validationFirmwareDialog: false,//验证弹窗
            productFirmwareId: '',//当前操作（验证、修改验证、发布）的id
            validationDetail: { macSet: '', validateType: 0 },//修改验证 详情
            validationModTit: '验证',
            validateInfo: [
                // {macAddress:111,upgradeTime:34234123443531,beforeVersion:1.1,upgradeStatus:2}

            ],//查看验证信息，同时根据validateInfo.lengt>0与否来判断查看验证弹窗是否可见

            releaseFirmwareDialog: false,//升级弹窗

            viewFirmid:undefined,//查看固件的产品id，同时控制查看弹窗是否可见
            viewFirmtype:undefined,
        }

        this.columns = [

            { title: '产品名称', dataIndex: 'productName' },
            {
                title: '开发方案', dataIndex: 'schemeType',
                render: s => s > 0 && SCHMETYPE[s - 2].nam || "脏数据"
            },
            { title: '产品版本号', dataIndex: 'extVersion' },
            { title: '产品版本名称', dataIndex: 'productFirmwareName' },
            {
                title: '运行状态', dataIndex: 'status',
                render: u => {
                    const { nam, color } = STATUSTAG[u]
                    return <Tag color={color} >{nam}</Tag>
                }
            },
            {
                title: '创建时间', dataIndex: 'createTime',
                render: t => <span>{t && DateTool.utcToDev(t) || "--"}</span>
            },
            {
                title: '操作', dataIndex: 'action',
                render: (a, recard) => {//status 0：待验证 1：验证中 2：已发布,3 验证完成
                    const {
                        status = 0, macSet = '', validateType = 0,
                        productId, productFirmwareId,
                        schemeType, firmwareVersionType,
                    } = recard
                    return <Space>
                        <a onClick={() => { this.openCloseViewFirmList(productFirmwareId,schemeType) }}>查看固件</a>
                        {
                            status == 0 ? <a onClick={() => { this.openValidation(productFirmwareId) }}>验证</a> :
                            status == 1 ?
                                    <>
                                        <a onClick={() => { this.openValidation(productFirmwareId, { macSet, validateType: validateType || 0 }) }}>修改验证</a>
                                        <a onClick={() => { this.getValidateInfo(productFirmwareId) }}>查看验证</a>
                                    </> : 
                            status == 2 ? <Link to={`/open/product/otaUpdate/details/${productFirmwareId}`}>查看批次</Link> :
                            <a onClick={() => { this.openRelease(productFirmwareId) }}>发布</a>
                        }
                        {/* <a onClick={()=>{this.deleteConfirm(productFirmwareId)}}>删除</a> */}
                    </Space>
                },
            },
        ];
        this.valInfoColumns = [
            { title: 'Mac地址', dataIndex: 'macAddress' },
            {
                title: '验证时间', dataIndex: 'upgradeTime',
                render: t => <span>{t && DateTool.utcToDev(t) || "--"}</span>
            },
            { title: '升级前版本', dataIndex: 'beforeVersion' },
            {
                title: '验证状态', dataIndex: 'upgradeStatus',
                render: u => {
                    const { nam, color } = UPDATESTATUS[u]
                    return <Tag color={color} >{nam}</Tag>
                }
            },
            {
                title: '备注', dataIndex: 'remark',
                render: (r, { upgradeStatus }) => (upgradeStatus == 3 && r || '')
            },

        ];
    }
    componentDidMount() {
        this.pagerIndex()
        this.props.getMcuSocProLi();
    }

    changeState = (k, v) => {
        this.setState({
            [k]: v
        })
    }
    //打开或者关闭弹窗
    switchDialog = (dialog) => {
        let pre = this.state[dialog]
        this.setState({
            [dialog]: !pre
        })
    }
    openRelease = (productFirmwareId) => {
        this.setState({ releaseFirmwareDialog: true, productFirmwareId })
    }
    openValidation = (productFirmwareId, validationDetail = { macSet: '', validateType: 0 }) => {
        // console.log(111,validationDetail)
        this.setState({
            validationFirmwareDialog: true,
            productFirmwareId,
            validationDetail,
            validationModTit: validationDetail.macSet && '修改验证' || '验证'
        })

    }
    getValidateInfo = deviceVersionId => {
        get(Paths.otaValiGetinfo, { deviceVersionId }).then(({ data }) => {
            let validateInfo = data || []
            this.setState({ validateInfo });
            if (!validateInfo.length) {
                Notification({
                    description: '没有查到验证信息',
                });
            }
        });
    }
    closeValidateInfo = () => {
        this.setState({ validateInfo: [] });
    }
    //删除固件
    deleteConfirm = (deviceVersionId) => {
        Modal.confirm({
            title: '删除固件',
            content: `即将删除 ID 为 ${deviceVersionId} 的固件，此固件包下各批次的升级设备信息也将一并删除。`,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                get(Paths.otaDeleteVer, { deviceVersionId }).then((model) => {
                    let { totalRows, pageIndex } = this.state.pager;
                    pageIndex = (totalRows % ((pageIndex - 1) * 10)) > 1 ? pageIndex : pageIndex - 1;
                    this.pagerIndex(pageIndex)
                });
            }
        });
    }
    //获取固件列表
    pagerIndex = (pageIndex = 1) => {
        let { productId, schemeType } = this.state
        let params = { pageIndex }
        productId != "-1" && (params.productId = productId)
        schemeType != "-1" && (params.schemeType = schemeType)
        this.props.getVersionLi(params)
    }
    closeValiFirm = () => {
        this.switchDialog('validationFirmwareDialog')
        // this.setState({
        //     validationDetail:{macSet:'',validateType:0}
        // })
    }
    setValidationDetail = (k, v) => {
        let validationDetail = this.state.validationDetail
        this.setState({
            validationDetail: { ...validationDetail, [k]: v }
        })
    }

    changeParamsGet = (k,v)=>{
        this.setState({
            [k]: v
        },()=>{
            this.pagerIndex(1) 
        })
    }
    openCloseViewFirmList = (viewFirmid,viewFirmtype)=>{
        this.setState({viewFirmid,viewFirmtype})
    }
    render() {
        const {
            addFirmwareVisiable, releaseFirmwareDialog, validationFirmwareDialog,
            productFirmwareId, validationDetail, validateInfo, validationModTit,viewFirmid,viewFirmtype
        } = this.state;
        const { versionList: { list, pager } ,mcusocproLi} = this.props;
        const { pageIndex, totalRows } = pager;

        return (
            <div className="ota-firmware-up">
                <PageTitle title="固件升级" 
                    selectOnchange={val => { this.changeParamsGet('productId',val) }} 
                    defaultValue={getUrlParam('productId') || '-1'}
                    selectData={mcusocproLi}
                />
                <div className='comm-shadowbox comm-setp-ttip'>
                    <div className='step-title'>
                        <img src={upIconImg} alt="" />
                        <span>固件升级步骤</span>
                    </div>
                    <Steps current={-1} initial={0}>
                        <Step title="添加升级包" description="添加升级包，区分不同的MCU、模组、系统。" />
                        <Step title="配置升级策略" description="配置升级对象，配置升级批次、升级范围、升级时间等升级具体策略。" />
                        <Step title="查看升级详情" description="查看升级包各升级批次的具体设备列表，以及各设备的升级状态。" />
                    </Steps>
                </div>

                <div className='otacontent comm-shadowbox'>
                    <div className='otasearchbox'>
                        <div className="searchgroupbox">
                            <span>方案类型：</span>
                            <Select className='typeselect' defaultValue={-1} onChange={val => { this.changeParamsGet('schemeType', val) }}>
                                <Option value={-1}>全部类型</Option>
                                {
                                    SCHMETYPE.map(({ id, nam }, i) => <Option key={i} value={id}>{nam}</Option>)
                                }
                            </Select>
                        </div>
                        <Button className='button' onClick={() => { this.switchDialog('addFirmwareVisiable') }} type="primary">添加固件</Button>
                    </div>


                    <Table
                        rowKey={({ productFirmwareId }) => productFirmwareId + "_"}
                        columns={this.columns}
                        dataSource={list}
                        pagination={{
                            defaultCurrent: pageIndex,
                            total: totalRows,
                            hideOnSinglePage: false,
                            onChange: this.pagerIndex
                        }}
                    />
                    {addFirmwareVisiable && <AddFirmwareDialog changeState={this.changeState} />}


                    {releaseFirmwareDialog &&
                        <Modal
                            title='发布固件'
                            visible={true}
                            width={660}
                            onCancel={() => { this.switchDialog('releaseFirmwareDialog') }}
                            footer={null}
                            maskClosable={false}
                        >
                            <ReleaseFirmware deviceVersionId={productFirmwareId} close={() => { this.switchDialog('releaseFirmwareDialog') }} />
                        </Modal>
                    }
                    {
                        validationFirmwareDialog && 
                        <Modal
                            title={validationModTit}
                            visible={true}
                            onOk={() => { this.refValidationFirmware() }}
                            onCancel={this.closeValiFirm}
                            width={650}
                            maskClosable={false}
                        >
                            <ValidationFirmwareDialog
                                deviceVersionId={productFirmwareId}
                                validationDetail={{ ...validationDetail }}
                                setValidationDetail={this.setValidationDetail}
                                pagerIndex={this.pagerIndex}
                                pageIndex={pageIndex}
                                onRef={ref => { this.refValidationFirmware = ref }}
                                close={this.closeValiFirm}
                            />
                        </Modal>
                    }
                    <ViewFirmList productFirmwareId={viewFirmid} schemeType={viewFirmtype} openClose={this.openCloseViewFirmList} />
                    
                    <Modal title='验证信息' visible={!!validateInfo.length} onCancel={this.closeValidateInfo} width={800} footer={null} >
                        <Table rowKey="macAddress" columns={this.valInfoColumns} dataSource={validateInfo} pagination={false} />
                    </Modal>
                </div>
            </div>
        )
    }
}
