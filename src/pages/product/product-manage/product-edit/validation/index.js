import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { connect } from 'react-redux';
import { Table, Tabs, Input, Button } from 'antd';
import { cloneDeep } from "lodash";
import {get, post, Paths} from '../../../../../api';
import { Notification } from '../../../../../components/Notification';
import LabelTip from '../../../../../components/form-com/LabelTip';
import History from './historyInfo';
import Simulat from './simulation';
import ObjectView from "../../../../../components/ObjectView";
import './index.scss'
import ReleaseProduct from './releaseProduct';
const { TabPane } = Tabs;

const columns = [
    { title: '序列号', dataIndex: 'index' },
    { title: 'topic数据内容', dataIndex: 'topic' },
    { title: '物理地址', dataIndex: 'physicalAddr'},
    { title: 'DID', dataIndex: 'did'}
];

let ws = null, //保存websocket连接
    wsTimer = null; //websocket心跳连接定时器，页面销毁时，需要同时销毁定时器

// 如果存在连接的ws, 关闭，并置空（下次启动是新的连接） 
const closeWebsocket = ()=>{
    if(ws){
        ws.close();
        ws = null;
    }
    clearInterval(wsTimer);
}

const mapStateToProps = state => {
    return {
        developerInfo: state.getIn(['userCenter', 'developerInfo']).toJS(),
    }
}

const temp = [
    {  topic:"topictopic", physicalAddr:"32423423", did:"11", map:{a:1,b:2,c:3}, index:1 },
    {  topic:"topictopic", physicalAddr:"345345", did:"22", map:"wer", index:2 },
    {  topic:"topictopic", physicalAddr:"rwerwe", did:"33", map:"erwe", index:3 },
    {  topic:"topictopic", physicalAddr:"32423423", did:"11", map:{a:1,b:2,c:3}, index:1 },
    {  topic:"topictopic", physicalAddr:"345345", did:"22", map:"wer", index:2 },
    {  topic:"topictopic", physicalAddr:"rwerwe", did:"33", map:"erwe", index:3 },
    {  topic:"topictopic", physicalAddr:"32423423", did:"11", map:{a:1,b:2,c:3}, index:1 },
    {  topic:"topictopic", physicalAddr:"345345", did:"22", map:"wer", index:2 },
    {  topic:"topictopic", physicalAddr:"rwerwe", did:"33", map:"erwe", index:3 },
    {  topic:"topictopic", physicalAddr:"32423423", did:"11", map:{a:1,b:2,c:3}, index:1 },
    {  topic:"topictopic", physicalAddr:"345345", did:"22", map:"wer", index:2 },
    {  topic:"topictopic", physicalAddr:"rwerwe", did:"33", map:"erwe", index:3 },
    {  topic:"topictopic", physicalAddr:"32423423", did:"11", map:{a:1,b:2,c:3}, index:1 },
    {  topic:"topictopic", physicalAddr:"345345", did:"22", map:"wer", index:2 },
    {  topic:"topictopic", physicalAddr:"rwerwe", did:"33", map:"erwe", index:3 },
    {  topic:"topictopic", physicalAddr:"32423423", did:"11", map:{a:1,b:2,c:3}, index:1 },
    {  topic:"topictopic", physicalAddr:"345345", did:"22", map:"wer", index:2 },
    {  topic:"topictopic", physicalAddr:"rwerwe", did:"33", map:"erwe", index:3 },
    {  topic:"topictopic", physicalAddr:"32423423", did:"11", map:{a:1,b:2,c:3}, index:1 },
    {  topic:"topictopic", physicalAddr:"345345", did:"22", map:"wer", index:2 },
    {  topic:"topictopic", physicalAddr:"rwerwe", did:"33", map:"erwe", index:3 },
]

function Validation({ productId,developerInfo,refInstance }) {
    const mountRef = useRef(-1);
    const [releaseVisible, setReleaseVisible] = useState(false); // 发布产品
    const [dataList, setDataList] = useState([]);//原始数据
    const [debugInfo, setDebugInfo] = useState(["",""]); //
    const [serverIp, setServerIp] = useState(""); //ws 请求配置 ip
    const [serverToken, setServerToken] = useState(""); //ws 请求配置 token
    // const [webSocketStatu, setWebSocketStatu] = useState(0); //ws 连接状态 0失败，1成功
    const [historyVisiable, setHistoryVisiable] = useState(false);

    const [analysisData, setAnalysisData] = useState(null);

    const [tabShow, setTabShow] = useState("1"); 

    useEffect(() => {
        get(Paths.queryServerConfig,{productId},{loading:true}).then(({data={}})=>{
            setServerIp(data.ip)
        })
        
        return closeWebsocket //组件卸载时执行
    }, [productId])

    //拿到token后 发起ws连接，（真实、虚拟设备的ws推送都通过监听 token 的变化来启动）
    useEffect(() => {
        console.log("----serverToken---",serverToken) 
        if(serverToken){
            newWebSocket();
        }
    }, [serverToken])

    useImperativeHandle(refInstance, () => ({
        showRelease
    }))
    // 展示发布产品弹窗
    const showRelease = () => { setReleaseVisible(true) }

    const getAccessToken = ()=>{
        get(Paths.accessToken,{},{loading:true}).then(({data=""})=>{
            setServerToken(data)
        })
    }
    //启动真实设备调试
    const startDebug = ()=>{
        if(account=="" || devMac==""){
            Notification({
                description: "账号和设备物理地址都不能为空",
                type: 'warn'
            })
            return
        }
        if(!devMac.match(/^[\da-zA-Z]{1,50}$/)){
            Notification({
                description:'物理地址格式应为50位以内的大小写字母加数字组成!',
                type:'warn'
            });
            return
        }

        //虽然ws有传账号 和 mac，然前端仍需调用之前老版本的接口保存 账号 和 mac
        post(Paths.deviceDebugAccountInsert,{
            productId: +productId,
            account,
            remark: ""
        },{needVersion:1.1,loading:true,needFormData:true}).then((model) => { });
        post(Paths.addDebugMac,{
            productId:+productId,
            physicalAddr:devMac
        },{loading:true,needFormData:true}).then((model) => {});

        getAccessToken();
    }
    //修改调试账号、设备
    const set_DebugInfo = (e,i)=>{
        let _Info = [...debugInfo];
        _Info[i] = e.target.value.trim();
        setDebugInfo([..._Info])
    }
    //建立 ws 连接
    const newWebSocket = ()=> {
        // let wsProtocol = 'wss:';
        // let httpProtocol = window.location.protocol;
        //     wsProtocol = httpProtocol.replace(/https?/, 'wss');
        ws = new WebSocket('wss://' + serverIp);
        
        
        ws.onopen = ()=> {//连接成功
            mountRef.current = 0
            // setWebSocketStatu(1);
            clearInterval(wsTimer);
            wsTimer = setInterval(()=>{ ws.send('') }, 5000); //告诉服务器“请保持联系”
            const product = JSON.parse(sessionStorage.getItem('productItem'));
            const {deviceTypeId,deviceSubtypeId,productVersion} = product;

            let sendMsg  = "["+serverToken+"|"+developerInfo.userId+"|"+
                            deviceTypeId+"#"+deviceSubtypeId+"#"+productVersion+
                            "|"+debugInfo[0]+"|"+debugInfo[1]+"]";
            if(tabShow=="2"){
                sendMsg=""//待定
                
            }

            ws.send(sendMsg);

        };
        ws.onmessage =  (data)=> {//接收到消息
            mountRef.current += 1;
            if(tabShow=="1"){
                toDataList(data.data || "{}")
            }
            
            
        };
        ws.onclose = (e) =>{//检测到断开连接
            console.log("检测到断开连接",mountRef.current)
            // setWebSocketStatu(0);
            clearInterval(wsTimer);
            if (mountRef.current>-1 && e.code == '1006') {//如果异常断开，尝试重连
                setTimeout(getAccessToken,5000);
            }
            ws = null;
            mountRef.current = -1
        }
    }

    //真实设备上报数据显示
    const toDataList = data=>{
        const _d = JSON.parse(data);
        const { topic, physicalAddr, did, map } = _d;
        setDataList(preLi=>{
            let li = cloneDeep(preLi);
            if( li.unshift({ topic, physicalAddr, did, map, index:mountRef.current }) == 901 ){//页面最多显示900条数据
                li.pop();
            }
            return li
        })
    }

    const cleanDataLi = ()=>{
        setDataList([]);
        setAnalysisData(null);
    }

    const openHistory =  open =>{
        setHistoryVisiable(open)
    }

    const changeTab = tab=>{
        setTabShow(tab)
        //如果有ws，关掉
        closeWebsocket()
        if(tab=="2"){
            getAccessToken();
        }
    }


    const [ account, devMac ]= debugInfo
    return <div id='product-edit-validation'>
        <div className='validation-top'>在真实设备调试的配置调试信息步骤，添加设备物理地址后，既默认此设备在clife平台注册，不受通信安全校验机制（如一机一密）的影响</div>
        <div className='validation-tab'>
            <Tabs defaultActiveKey="1" onChange={changeTab}>
                <TabPane tab="真实设备调试" key="1">
                    <div className='tab-one-title'>
                        <div className='tab-one-title-left'>
                            <div className='btn-label'>配置调试信息<LabelTip tip="WiFi蓝牙设备需先登录数联智能App，并搜索绑定需要调试的设备，蜂窝设备不需要。"></LabelTip>：</div>
                            <Input value={account} onChange={e => set_DebugInfo(e,0)} placeholder='请输入数联智能App登录账号' />
                            <Input value={devMac} onChange={e => set_DebugInfo(e,1)} placeholder='输入设备物理地址' />
                            <Button type='primary' onClick={startDebug}>确定调试</Button>
                            <Button onClick={()=>{setDebugInfo(['',''])}}>重置</Button>
                        </div>
                        {/* <a onClick={()=>{openHistory(true)} }>历史调试信息</a> */}
                    </div>
                    <div className='tab-one-content'>
                        <div className='left-content'>
                            <div className='left-content-title'>
                                <h3>原始数据</h3>
                                <div>
                                    <Button type="primary" ghost onClick={cleanDataLi} >清空当前信息</Button>
                                    {/* <Button type="primary" ghost>导出数据</Button> */}
                                </div>
                            </div>
                            <div className="tablebox">
                                <Table columns={columns} rowKey="index"
                                dataSource={dataList}
                                pagination={false}
                                        onRow={r=> {
                                            return {
                                                onClick: e => { setAnalysisData(r.map || {}) },
                                            };
                                        }}
                                        scroll={{ y: 305 }}
                                />
                            </div>
                        </div>
                        <div className='right-content'>
                            <h3>解析数据</h3>
                            <div className="analysisdata-box">
                                {
                                    analysisData && <ObjectView keyName="明文" data={analysisData} />  || "点击左侧原始数据在此解析"
                                }
                            </div>
                            
                        </div>
                    </div>
                </TabPane>
                {/* <TabPane tab="虚拟设备调试" key="2">
                    <Simulat productId={productId} serverIp={serverIp}/>
                    
                </TabPane> */}
            </Tabs>
        </div>
        <History historyVisiable={historyVisiable} openHistory={openHistory} />
        {/* 确认发布产品弹窗 */}
        {
            releaseVisible &&
            <ReleaseProduct
                productId={productId}
                releaseVisible={releaseVisible}
                cancelHandle={() => { setReleaseVisible(false) }} />
        }
    </div>
}
let Component = connect(mapStateToProps, null)(Validation)

export default forwardRef( (props,ref) => <Component  {...props}  refInstance={ref} />   )