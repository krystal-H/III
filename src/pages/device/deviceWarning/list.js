
import React, { useState, useEffect } from "react";
import {  Button, Table, Divider,Input } from "antd";
import { DateTool } from "../../../util/util";
import {Paths,post } from "../../../api";

import ActionConfirmModal from '../../../components/action-confirm-modal/ActionConfirmModal';
import WarningInofMod from './info';
import ConfigModal from './detail';


const initPager = {
    pageRows: 10,
    pageIndex: 1
};
const initialData = {
    id: undefined,
    status:undefined,
    name:"",
    remark:"",
    content:"",
}

//告警消息列表
const WarningList = props=>{
    const [warningList, setWarningList] = useState({
        pager: {},
        list: []
    });
    const {list,pager} = warningList;
    const [warningInof, setWarningInof] = useState({});
    useEffect(() => {
        getWarningList(initPager);
    }, []);
    
    const getWarningList = param => {
        post(Paths.getWarningList, param, { loading: true }).then(res => {
            setWarningList(res.data);
        });
    };
    const columns = [
        { title: "告警时间", dataIndex: "alarmTime", key: "alarmTime",
            render(t) {
                return t ? DateTool.utcToDev(t) : "--";
            }
        },
        { title: "告警标题", dataIndex: "warningTitle", key: "warningTitle" },
        { title: "告警状态", dataIndex: "state", key: "state",
            render:s=><span>{{"1":"待处理","2": "已处理", "3" :"已发送"}[s]}</span>
        },
        { title: "告警消息类型", dataIndex: "warningWay", key: "warningWay",
            render:w=><span>{{"0":"站内","1": "站内+邮件"}[w]}</span>
        },
        { title: "关联的告警规则", dataIndex: "ruleName", key: "ruleName" },
        { title: "操作", dataIndex: "id", key: "id",
            render: (id,record)=>{
                let {state} = record;
                return <a onClick={()=>{warnDetail(id)} }  >{state=="1"&&"处理"||"查看"}</a>
                   
            }
        }
    ];
    const getIndexPage = index =>{
        getWarningList({...initPager, pageIndex: index})
    }
    const warnDetail = id =>{
        post(Paths.getWarningInfo, {id}, { loading: true }).then(res => {
            setWarningInof(res.data);
        });
    }
    const closeDetailMod = ()=>{
        setWarningInof({});
    }

    const delwithWarn = params=>{
        post(Paths.dealWithWarning, params, { loading: true }).then(res => {
            getIndexPage(pager.pageIndex || 1);
            closeDetailMod();
        });
    }

    return <>
        <Table 
            rowKey="id"
            columns={columns} 
            dataSource={list} 
            pagination={{
                defaultCurrent:pager.pageIndex, 
                total:pager.totalRows, 
                hideOnSinglePage:true,
                onChange:getIndexPage,
                current: pager.pageIndex,
                showSizeChanger:false
            }}
        />
        <p>注：仅限站内消息类型有“待处理”和“已处理状态”，站内消息+邮件均为“已发送”状态</p>
        <WarningInofMod warningInof={warningInof} closeDetailMod={closeDetailMod} getIndexPage={getIndexPage} delwithWarn={delwithWarn}/>
    </>
}

//配置规则列表
const WarningConfigList = props=>{
    const [warningList, setWarningList] = useState({
        pager: {},
        list: []
    });
    const [operateId, setOperateId] = useState([]);//当前操作的告警配置 [id,name,删除还是停止]
    const [name, setName] = useState("");//搜索名 规则列表
    const [configVisible, setConfigVisible] = useState(false);// 新增/编辑 规则弹窗是否显示
    const [editData, setEditData] = useState(initialData);// 当前要编辑的规则数据对象,initialData代表 新增

    useEffect(() => {
        console.log('getlist')
        getWarningList(initPager);
    }, []);
    
    const getWarningList = param => {
        post(Paths.getWarningConfigLi, param, { loading: true }).then(res => {
            setWarningList(res.data);
        });
    };
    const columns = [
        {title: "规则名称",dataIndex: "name",key: "name"},
        {title: "描述",dataIndex: "remark", key: "remark"},
        {title: "运行状态",dataIndex: "status",key: "status",
            render: s => <span>{ {'0':'初始状态','1':'运行中','2':'已停止'}[s] }</span>
        },
        {title: "最近编辑时间",dataIndex: "updateTime",key: "updateTime",
            render: t=>  t ? DateTool.utcToDev(t) : "--"
        },
        {title: "操作",dataIndex: "id", key: "id",
            render: (t,record)=>{
                const {id,name,status,remark,content} = record;
                return <span>
                    <a onClick={()=>{openEditMod({id,name,remark,status,content})}} >编辑</a>
                    <Divider type="vertical" />
                    {
                        status==1&&
                        <a onClick={()=>{setOperateId([id,name,"stop"])} } >停止</a>||
                        <a onClick={()=>{startRule(id)} } >启动</a>
                    }
                    <Divider type="vertical" />
                    <a onClick={()=>{setOperateId([id,name,"del"])} } >删除</a>
                </span>
            }
        }
    ];
    const getIndexPage = index =>{
        let params = {
            ...initPager, pageIndex: index
        }
        if(name!=""){
            params.name = name
        }
        getWarningList(params)
    }
    const delOrStop = ()=>{
        let questurl =  operateId[2] == "del" && Paths.delWarningConfig || Paths.stopWarningConfig;
        post(questurl, {id:operateId[0]}, { loading: true }).then(res => {
            getIndexPage(warningList.pager.pageIndex || 1);
            setOperateId([]);
        });
    }
    const startRule = (id)=>{
        post(Paths.startWarningConfigLi, {id}, { loading: true }).then(res => {
            getIndexPage(warningList.pager.pageIndex || 1);
        });
        
    }
    const searchRule = name=>{
        setName(name)
        let p = {...initPager}
        if(name!=""){
            p.name = name
        }
        getWarningList(p)

    }
    const closeEditMod = ()=>{
        setConfigVisible(false)

    }
    const openEditMod = (data)=>{
        setConfigVisible(true);
        setEditData(data)
    }
    const {list,pager} = warningList;

    return <>
        <div className='searchrulebox'>
            <div className='comm-searchBox'>
                <Input.Search placeholder="请输入规则名词查找"
                    enterButton
                    maxLength={20}
                    onSearch={searchRule} 
                />
            </div>
            <Button className='btn' onClick={()=>{openEditMod(initialData)} } type="primary">新增</Button>
        </div>
        <Table 
            rowKey="id"
            columns={columns} 
            dataSource={list}
            pagination={{
                defaultCurrent:pager.pageIndex, 
                total:pager.totalRows, 
                hideOnSinglePage:true,
                onChange:getIndexPage,
                current: pager.pageIndex,
                showSizeChanger:false
            }}
        />
        <ActionConfirmModal
            visible={operateId.length>0}
            modalOKHandle={delOrStop}
            modalCancelHandle={()=>{setOperateId([])}}
            title={operateId[2]=="del"&&"删除"||"停止"}
            descText={`即将${operateId[2]=="del"&&"删除"||"停止"}告警配置`}
            needWarnIcon={true}
            targetName={operateId[1]}
        />

        <ConfigModal
            visible ={configVisible}
            closeEditMod={closeEditMod}
            editData={{...editData}}
        
        
        />

    </>


}

export { WarningList,WarningConfigList }
