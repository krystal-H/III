import React,{Component} from 'react';
import { connect } from 'react-redux';
import { post,Paths } from '../../../../../api';
import ProduceInfo from '../product-info/ProductInfo';
import ProductProtocols from '../product-protocols/ProductProtocols';
import FirmwareManagement from '../firmware-management/FirmwareManagement';
// import DebuggingTool from '../../deviceDebugging/deviceDebuggerTest/StartTest';
import AppControl from '../app-control/AppControl';
import CommercailInfo from '../basic-information/commercailinfo';
import Firmware from '../basic-information/firmware';

import {getUrlParam} from '../../../../../util/util';
// import {
//     updateDeviceDebugAccountListAction,//更新账号列表
//     updateDeviceDebugMacListAction,//更新mac列表
// } from '../../store/ActionCreator_debug.js';



import { Tabs } from 'antd';
const { TabPane } = Tabs;


const mapStateToProps = state => {
    return {
        // deviceDebugAccountList: state.getIn(['deviceDebug','deviceDebugAccountList']).toJS(),
        // deviceDebugMacList: state.getIn(['deviceDebug','deviceDebugMacList']).toJS(),
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // updateDeviceDebugAccountList: (data)=>dispatch(updateDeviceDebugAccountListAction(data)),
        // updateDeviceDebugMacList: (data)=>dispatch( updateDeviceDebugMacListAction(data))
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
        window.location.hash = `#/open/product/proManage/detail/${productId}?step=${steps}`;
        if(steps=='4'){
            // let accountList = [],
            // macList = [];
            // this.setState({steps},()=>{
            //     post(Paths.deviceDebugAccountGetList,{productId}).then((model) => {
            //         if(model.code==0){
            //             accountList = model.data;
            //             this.props.updateDeviceDebugAccountList(model);
            //             post(Paths.debugSecretList,{productId}).then((res) => {
            //                 if(res.code==0){
            //                     macList = res.data;
            //                     this.props.updateDeviceDebugMacList(res);
            //                     if(macList.length<1){
            //                         this.debugVisible.debugVisible();
            //                     }
            //                 }
            //             });
            //         }
            //     });
            // });
        }else{
            if(this.debugVisible&&this.debugVisible.goout){
                this.debugVisible.goout()
            }
            this.setState({steps});
        }
    }
    render() {
        let {productId,productBaseInfo,protocolLists} = this.props;
        return (
            <div className='comm-shadowbox common-tab'>
                 <Tabs defaultActiveKey={this.state.steps} onChange={value => this.callback(value)}>
                    <TabPane key={'1'} tab={'基本信息'}>
                        <ProduceInfo productId={productId} productBaseInfo={productBaseInfo}/>
                    </TabPane>
                    <TabPane key={'2'} tab={'功能定义'}>
                        <ProductProtocols productId={productId} productBaseInfo={productBaseInfo} protocolLists={protocolLists}/>
                    </TabPane>
                    <TabPane key={'10'} tab={'硬件开发'}>
                        <Firmware productId={productId}/>
                    </TabPane>
                    <TabPane key={'3'} tab={'固件管理'}>
                        <FirmwareManagement productId={productId} productBaseInfo={productBaseInfo}/>
                    </TabPane>
                    {/*<TabPane key={'4'} tab={'调试工具'}>
                        <div className="gray-bg-padding">
                            <DebuggingTool productId={productId} onRef={ref => this.debugVisible = ref} />
                        </div>
                    </TabPane>*/}
                    <TabPane key={'5'} tab={'APP控制'}>
                        <AppControl productId={productId} productBaseInfo={productBaseInfo}/>
                    </TabPane>
                    <TabPane key={'9'} tab={'商业化信息'}>
                        <CommercailInfo productId={productId} productBaseInfo={productBaseInfo} />
                    </TabPane>
                </Tabs> 
            </div>
        )
    }
}
