
import React, { useState, useEffect } from "react";
import { Steps,Select,Table,Button,Divider  } from "antd";
import { DateTool } from "../../../util/util";
import { post, get, Paths } from "../../../api";
import PageTitle from "../../../components/page-title/PageTitle";
import ActionConfirmModal from '../../../components/action-confirm-modal/ActionConfirmModal';
import ConfigModal from './detail';
import { PUSHNOTTYPE } from "./constData";

import stepIcon from '../../../assets/images/upota.png';

const { Step } = Steps;
const { Option } = Select
const initPager = {
    pageRows: 10,
    pageIndex: 1
};
const initialData = {
    id: undefined,
    status: undefined,
    name: "",
    remark: "",
    content: "",
}
export default props => {
    const [productList, setProductList] = useState([]);
    const [productId, setProductId] = useState("-1");
    const [status, setStatus] = useState("-1");
    const [warningList, setWarningList] = useState({
        pager: {},
        list: []
    });
    const [editData, setEditData] = useState(initialData);// 当前要编辑的规则数据对象,initialData代表 新增
    const [configVisible, setConfigVisible] = useState(false);// 新增/编辑 规则弹窗是否显示
    const [operateId, setOperateId] = useState([]);//当前操作的告警配置 [id,name,删除还是停止]
    const { list, pager } = warningList;
    useEffect(() => {
        getList();
        get(Paths.getProductType, {}, { loading: true }).then((res) => {
            setProductList(res.data || [])
        });
    }, []);
    const columns = [
        {title: "规则名称", dataIndex: "name", },
        { title: "规则描述", dataIndex: "remark",  ellipsis: true },
        { title: "产品名称", dataIndex: "productName",  ellipsis: true },
        { title: "最近编辑时间", dataIndex: "updateTime", render:t =>{ return t ? DateTool.utcToDev(t) : "--"; } },
        { title: "状态", dataIndex: "status", render: s => <span>{PUSHNOTTYPE[s]}</span> },
        {
            title: "操作", dataIndex: "id", width: "180px",
            render: (t, record) => {
                const { id, name, status, remark, content } = record;
                return <span>
                    <a onClick={() => { openEditMod({ id, name, remark, status, content }) }} >编辑</a>
                    <Divider type="vertical" />
                    {
                        status == 1 &&
                        <a onClick={() => { setOperateId([id, name, "stop"]) }} >停止</a> ||
                        <a onClick={() => { startRule(id) }} >启动</a>
                    }
                    <Divider type="vertical" />
                    <a onClick={() => { setOperateId([id, name, "del"]) }} >删除</a>
                </span>
            }
        }
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
    const openEditMod = (data) => {
        setConfigVisible(true);
        setEditData(data)
    }
    const closeEditMod = (updatelist=false) => {
        setConfigVisible(false)
        if(updatelist){
            // setName("");
            // getList({pageRows: 10, pageIndex: 1})
            // window.location.reload()
        }

    }
    const delOrStop = () => {
        let questurl = operateId[2] == "del" && Paths.delWarningConfig || Paths.stopWarningConfig;
        post(questurl, { id: operateId[0] }, { loading: true }).then(res => {
            getIndexPage(pager.pageIndex || 1);
            setOperateId([]);
        });
    }
    const startRule = (id) => {
        post(Paths.startWarningConfigLi, { id }, { loading: true }).then(res => {
            getIndexPage(warningList.pager.pageIndex || 1);
        });

    }
    return (
        <section className="page-devwarnlist">
            <PageTitle title="消息推送" 
                selectOnchange={val => { changeProduct(val) }} 
                defaultValue='-1'
                selectData={productList}
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
                    <Button className='button'onClick={() => { openEditMod(initialData) }} type="primary" style={{float:"right"}}>新增</Button>
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
            <ActionConfirmModal
                visible={operateId.length > 0}
                modalOKHandle={delOrStop}
                modalCancelHandle={() => { setOperateId([]) }}
                title={operateId[2] == "del" && "删除" || "停止"}
                descText={`即将${operateId[2] == "del" && "删除" || "停止"}告警配置`}
                needWarnIcon={true}
                targetName={operateId[1]}
            />
            { configVisible && <ConfigModal closeEditMod={closeEditMod} editData={{ ...editData }} productList={productList}/> }
        </section>
    );
};
