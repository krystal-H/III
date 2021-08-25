
import React, { useState, useEffect } from "react";
import { Tabs} from "antd";
import { DateTool } from "../../../util/util";
import { get, Paths } from "../../../api";
import PageTitle from "../../../components/page-title/PageTitle";
import { WarningList,WarningConfigList } from './list';
import './devwarn.scss'
const { TabPane } = Tabs;

export default props => {
    const [totalData, setTotalData] = useState({});
    const { pendingCount, processedCount, sentCount, leastWaringDate} = totalData
    useEffect(() => {
        getTotalData();
    }, [getTotalData]);
    const getTotalData = () => {
        get(Paths.getDeviceWarningTotal, { loading: true }).then(res => {
            const data = res.data;
            setTotalData(data);
        });
    };
    return (
        <section className="page-devwarnlist">
            <PageTitle title="设备消息" />
            <div className="comm-shadowbox countbox">
                <div className="item">待处理告警<br/><span className="num">{pendingCount}</span></div>
                <div className="item">已处理告警<br/><span className="num">{processedCount}</span></div>
                <div className="item">已发送告警<br/><span className="num">{sentCount}</span></div>
                <div className="item">最近告警时间<br/><span className="num time">{leastWaringDate&&DateTool.utcToDev(leastWaringDate) || "--"}</span></div>
            </div>
            <div className='comm-shadowbox common-tab'>
                <Tabs defaultActiveKey={"1"}>
                    <TabPane tab="消息列表" key="1">
                        <WarningList />
                    </TabPane>
                    <TabPane tab="规则列表" key="2">
                        <WarningConfigList />
                    </TabPane>
                </Tabs> 
            </div>
        </section>
    );
};
