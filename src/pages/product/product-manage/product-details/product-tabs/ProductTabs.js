import React,{Component} from 'react'
import ProductInfo from '../info';
import FnDefintion from '../function-definition';
import HardwareDep from '../hardware-dep'
import ServiceConfig from '../service-config'
import ConfirmModal from '../../product-edit/firmpanel/index'
import RegiserProduct from '../regist-product'
import {getUrlParam} from '../../../../../util/util';

import './ProductTabs.scss'

import { Tabs } from 'antd';
const { TabPane } = Tabs;

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
        const {productId} = this.props;
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
                        <ServiceConfig productId={productId}/>
                    </TabPane>
                    <TabPane key={'7'} tab={'设备注册'}>
                        <RegiserProduct />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
