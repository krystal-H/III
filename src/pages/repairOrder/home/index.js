import React, { useState } from 'react'
import './index.scss'
import { Tabs, Radio, Table } from 'antd';
import SubOrder from './subOrder'
import MyOrder from './myOrder'
const { TabPane } = Tabs;
export default function DeviceShadow() {

    return (<div id='order-home'>
        <div className='common-tab comm-shadowbox'>
            <Tabs defaultActiveKey='1' className='shadow-tab'>
                <TabPane key={'1'} tab={'提交工单'}>
                    <SubOrder />
                </TabPane>
                <TabPane key={'2'} tab={'我的工单'}>
                    <MyOrder />
                </TabPane>
            </Tabs>
        </div>
    </div>)
}