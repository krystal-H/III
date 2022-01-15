
import React, { useState, useEffect } from "react";
import { Steps,Select,Table,Button } from "antd";
import { DateTool } from "../../../util/util";
import { post, Paths } from "../../../api";
import PageTitle from "../../../components/page-title/PageTitle";
import { PUSHNOTTYPE } from "./constData";

import stepIcon from '../../../assets/images/upota.png';

const { Step } = Steps;
const { Option } = Select
const initPager = {
    pageRows: 10,
    pageIndex: 1
};

export default props => {
    const [productId, setProductId] = useState("-1");
    const [status, setStatus] = useState("-1");
    const [warningList, setWarningList] = useState({
        pager: {},
        list: []
    });
    const { list, pager } = warningList;
    useEffect(() => {
        getList();
    }, []);
    const columns = [
        {title: "规则名称", dataIndex: "name", },
        { title: "规则描述", dataIndex: "remark",  ellipsis: true },
        { title: "产品名称", dataIndex: "productName",  ellipsis: true },
        { title: "最近编辑时间", dataIndex: "updateTime", render:t =>{ return t ? DateTool.utcToDev(t) : "--"; } },
        { title: "状态", dataIndex: "status", render: s => <span>{PUSHNOTTYPE[s]}</span> },
        
        // {
        //     title: "操作", dataIndex: "id", key: "id", width: "70px",
        //     render: (id, record) => {
        //         let { state } = record;
        //         return <a onClick={() => { warnDetail(id) }}  >{state == "1" && "处理" || "查看"}</a>

        //     }
        // }
    ];


    const changeProduct = productId=>{
        setProductId(productId)
        getList({productId})
        
    }

    const cngeStatus = status=>{
        setStatus(status)
        getList({status})
    }
    const getList = (p={}) => {
        let params =  {
            ...initPager,
            productId,
            status,
            ...p
        }
        if(params.productId=="-1"){
            delete params.productId
        }
        if(params.status=="-1"){
            delete params.status
        }
        post(Paths.getWarningConfigLi,params, { loading: true }).then(res => {
            setWarningList(res.data);
        });
    };
    const getIndexPage = pageIndex=>{
        getList({pageIndex})
    }
    return (
        <section className="page-devwarnlist">
            <PageTitle title="消息推送" 
                selectOnchange={val => { changeProduct(val) }} 
                defaultValue='-1'
                // selectData={mcusocproLi}
            />
            <div className='comm-shadowbox comm-setp-ttip'>
                <div className='step-title'>
                    <img src={stepIcon} />
                    <span>配置消息推送步骤</span>
                </div>
                <Steps current={-1} initial={0}>
                    <Step title="创建消息推送任务" description="创建消息推送任务" />
                    <Step title="添加规则" description="选择产品，配置产品需要推送的规则" />
                    <Step title="启动任务" description='提交规则，启动后可在APP或短信收到推送消息产品开发阶段只支持"数联智能"APP查看推送消息' />
                </Steps>
            </div>

            <div className='comm-shadowbox comm-boxpadding' style={{marginTop:"16px"}}>
                <div>
                    <span>启动状态：</span>
                    <Select className='typeselect' defaultValue={-1}  style={{width:"120px"}}
                        onChange={cngeStatus}
                    >
                        <Option value={-1}>全部状态</Option>
                        {
                            PUSHNOTTYPE.map((nam,i)=><Option key={i} value={i}>{nam}</Option>)
                        }
                    </Select>
                    <Button className='button' onClick={() => { }} type="primary" style={{float:"right"}}>新增</Button>
                </div>
                <Table
                    style={{marginTop:"16px"}}
                    rowKey="id"
                    columns={columns}
                    dataSource={list}
                    pagination={{
                        defaultCurrent: pager.pageIndex,
                        total: pager.totalRows,
                        onChange: getIndexPage,
                        current: pager.pageIndex,
                        showSizeChanger: false,
                        showQuickJumper: pager.totalPages > 5,
                        hideOnSinglePage: true,
                    }}
                />

            </div>
            {/* {addFirmwareVisiable && <AddFirmwareDialog changeState={this.changeState} />} */}
            
            
        </section>
    );
};
