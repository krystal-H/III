import React, { useState, useRef } from 'react'
import './index.scss'
import { Tabs, Button } from 'antd';
import SubOrder from './subOrder'
import MyOrder from './myOrder'
const { TabPane } = Tabs;
export default function DeviceShadow() {
    const [currentTab, setCurrentTab] = useState('1')
    const [isRefresh,setIsRefresh]=useState(0)
    const refObj = useRef(null)
    const subData = () => {
        refObj.current.subOrder()
    }
    const tabHandle = (val) => {
        setCurrentTab(val)
    }
    const goMyOrder = () => {
        setCurrentTab('2')
        setIsRefresh(isRefresh+1)
    }
    return (<div id='order-home'>
        <div className='common-tab comm-shadowbox'>
            <Tabs activeKey={currentTab} className='shadow-tab' onChange={tabHandle}>
                <TabPane key={'1'} tab={'提交工单'}>
                    <SubOrder ref={refObj} onSuccess={goMyOrder} />
                </TabPane>
                <TabPane key={'2'} tab={'我的工单'}>
                    <MyOrder  isRefresh={isRefresh}/>
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