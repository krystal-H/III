import React,{Component} from 'react'
import { post,Paths } from '../../../../../api';
// import ProduceInfo from '../../product-edit/product-info/ProductInfo';
// import ProductProtocols from '../../product-edit/product-protocols/ProductProtocols';
// import FirmwareManagement from '../firmware-management/FirmwareManagement';
// import DebuggingTool from '../../deviceDebugging/deviceDebuggerTest/StartTest';
// import AppControl from '../../product-edit/product-services/app-control/AppControl';
// import CloudTime from '../../product-edit/product-services/cloud-time/CloudTime';
// import SceneLink from '../../product-edit/product-services/scene-link/SceneLink';
// import DeviceRegister from '../device-register';
// import CommercailInfo from '../basic-information/commercailinfo';
// import Firmware from '../basic-information/firmware';
// import RemoteConfig from '../remote-config/RemoteConfig';
// import LabelManage from '../label-manage/LabelManage';
// import TopicList from '../topic-list/TopicList'
// import PtotocalTag from '../protocal-tag/PtotocalTag';

import ProductInfo from '../info';
import FnDefintion from '../function-definition';
import HardwareDep from '../hardware-dep'
import ServiceConfig from '../service-config'
import ConfirmModal from '../../product-edit/firmpanel/index'
import RegiserProduct from '../regist-product'
import {getUrlParam} from '../../../../../util/util';
import {
    updateDeviceDebugAccountListAction,//更新账号列表
    updateDeviceDebugMacListAction,//更新mac列表
} from '../../store/ActionCreator_debug.js';
import { connect } from 'react-redux';

import './ProductTabs.scss'

import { Tabs } from 'antd';
const { TabPane } = Tabs;


const mapStateToProps = state => {
    return {
        deviceDebugAccountList: state.getIn(['deviceDebug','deviceDebugAccountList']).toJS(),
        deviceDebugMacList: state.getIn(['deviceDebug','deviceDebugMacList']).toJS(),
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateDeviceDebugAccountList: (data)=>dispatch(updateDeviceDebugAccountListAction(data)),
        updateDeviceDebugMacList: (data)=>dispatch( updateDeviceDebugMacListAction(data))
    }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class ProductTabs  extends Component {
    constructor(props){
        super(props);
        this.state = {
            steps:getUrlParam('step')||'1',
        }
    }
    callback = (steps) => {
        let {productId} = this.props;
        window.location.hash = `#/open/product/proManage/details/${productId}?step=${steps}`;
    }
    render() {
        let {productId,productBaseInfo,protocolLists} = this.props;
        let { authorityType, accessModeId } = productBaseInfo;
        return (
            <div className='comm-shadowbox common-tab'>
                <Tabs defaultActiveKey={this.state.steps} onChange={value => this.callback(value)}>
                    <TabPane key={'1'} tab={'基本信息'}>
                        <ProductInfo  productId={productId}/>
                    </TabPane>
                    <TabPane key='2' tab={'功能定义'}>
                        <FnDefintion></FnDefintion>
                    </TabPane>
                    <TabPane key='3' tab={'控制面板'}>
                        <ConfirmModal></ConfirmModal>
                    </TabPane>
                    <TabPane key={'4'} tab={'硬件开发'}>
                        <HardwareDep productId={productId}/>
                    </TabPane>
                    <TabPane key={'5'} tab={'服务配置'}>
                        <ServiceConfig />
                    </TabPane>
                    <TabPane key={'7'} tab={'设备注册'}>
                        <RegiserProduct />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
