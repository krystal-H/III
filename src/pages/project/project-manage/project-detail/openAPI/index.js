import React, { useState } from "react"
import { Tabs } from "antd"
import APIList from './APIList'
import APIdebug from "./APIdebug"
import './index.scss'

const { TabPane } = Tabs;
function OpenAPI({ projectId }) {
    const [activeKey, setactiveKey] = useState('1')
    const [listItem, setListItem] = useState() // 点击的某一条数据

    const changeKey = (val, record) => {
        setactiveKey(val)
        setListItem(record)
    }
    
    return (
        <section className="page-apilist">
            <div className='comm-shadowbox common-tab'>
                <Tabs onChange={(val) => changeKey(val, {})} activeKey={activeKey}>
                    <TabPane tab="API列表" key="1">
                        <APIList changeKey={changeKey} projectId={projectId} />
                    </TabPane>
                    <TabPane tab="调试" key="2">
                        <APIdebug listItem={listItem} projectId={projectId} />
                    </TabPane>
                </Tabs>
            </div>
        </section>
    )
}

export default OpenAPI
