import React, { useState, useEffect } from "react"
import { Tabs } from "antd"
import { DateTool } from "../../../../../util/util"
import { get, Paths } from "../../../../../api"
import APIList from './APIList'
import APIdebug from "./APIdebug"
import './index.scss'

const { TabPane } = Tabs;
function OpenAPI() {
    const [activeKey, setactiveKey] = useState('1')
    const changeKey = (val) => {
        setactiveKey(val)
    }
    return (
        <section className="page-apilist">
            <div className='comm-shadowbox common-tab'>
                <Tabs onChange={(val) => changeKey(val)} activeKey={activeKey}>
                    <TabPane tab="API列表" key="1">
                        <APIList changeKey={changeKey} />
                    </TabPane>
                    <TabPane tab="调试" key="2">
                        <APIdebug/>
                    </TabPane>
                </Tabs>
            </div>
        </section>
    );
}

export default OpenAPI
