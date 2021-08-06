import React, { useState } from 'react'
import './index.scss'
import { Tabs, Radio, Table, Button } from 'antd';
import SubOrder from './subOrder'
import MyOrder from './myOrder'
const { TabPane } = Tabs;
export default function DeviceShadow() {
    const [currentTab, setCurrentTab] = useState('1')
    // test.push(1)
    // setTest(2)
    // test.push(3)


    const subData = () => {
    }
    const tabHandle = (val) => {
        setCurrentTab(val)
    }
    return (<div id='order-home'>
        <div className='common-tab comm-shadowbox'>
            <Tabs defaultActiveKey='1' className='shadow-tab' onChange={tabHandle}>
                <TabPane key={'1'} tab={'提交工单'}>
                    <SubOrder />
                </TabPane>
                <TabPane key={'2'} tab={'我的工单'}>
                    <MyOrder />
                </TabPane>
            </Tabs>
        </div>
        {
            currentTab == '1' && <div className='order-home-footer'>
                <Button type="primary" onClick={subData}>提交</Button>
            </div>
        }

    </div>)
}