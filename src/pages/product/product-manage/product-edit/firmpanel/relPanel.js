import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Table, Input, Select, Checkbox, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { post, Paths } from '../../../../../api';
import './grayDebugg.scss';
const { TabPane } = Tabs;
export default function AddFuncModal({ relPanVis,  CancelRel, actionObj,closeOkRel }) {
    let productId = 0
    if (sessionStorage.getItem('productItem')) {
        productId = JSON.parse(sessionStorage.getItem('productItem')).productId
    }
    const [applist, setApplist] = useState([])
    const getAoolist = () => { 
        post(Paths.panelApplicationList,{productId}).then((res) => {
            setApplist(res.data)
        });
    }
    useEffect(() => {
        getAoolist()
    }, [])
    const [currentTab, setCurrentTab] = useState('1')
    const callback = (key) => {
        setCurrentTab(key);
    }
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    const closeOk = () => {
    }
    //
    const [selectAppId, setSelectAppId] = useState('')
    const selectApp = (type, appId) => {
        setSelectAppId(appId)
    }
    const getAppListDOM = (type) => {
        let _apps = applist.filter(item => type ? item.isOfficialApp : !item.isOfficialApp),
            className = 'app-icon';
        return (
            _apps.length > 0 ?
                _apps.map((item) => {
                    let { appIcon, appName, appId } = item;

                    className = 'app-icon'; // 重置class的值

                    if (selectAppId == appId) {
                        className += ' active';
                    }

                    return (
                        <div className="app-item" key={type + '-' + appId} onClick={() => selectApp(type, appId)}>
                            <div className={className}>
                                <img src={appIcon} alt="应用图标" />
                            </div>
                            <span className="gray-text app-name">{appName}</span>
                        </div>
                    )
                })
                :
                <div style={{ textAlign: 'center' }} className="explain-text">{`该产品暂无${type === '0' ? '官方' : "私有"}应用`}</div>
        )
    }
    const subdata=()=>{
        let params = {
            productId,
            projectId: actionObj.projectId,
            appId: selectAppId,
        }
        if(!selectAppId){
            return
        }
        post(Paths.modelRel, params,{loading:true}).then((res) => {
            closeOkRel()
        });
    }
    return (
        <div >
            <Modal title="发布" visible={relPanVis} onOk={subdata} onCancel={CancelRel} width='764px' wrapClassName='add-protocols-wrap'>
                <div>
                    <div className='GrayModal-top'>
                        <div>即将发布的页面：</div>
                        <div>{actionObj.projectName}</div>
                    </div>
                    <div className='GrayModal-tip'>发布到应用：</div>
                    <div className='GrayModal-tab'>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="C-Life官方应用" key="1">
                                <div className='GrayModal-img-wrap'>
                                    <div className="app-items-wrapper">
                                        {
                                            getAppListDOM(true)
                                        }
                                    </div>
                                </div> </TabPane>
                            <TabPane tab="私有应用" key="2">
                                <div className='GrayModal-img-wrap'>
                                    <div className="app-items-wrapper">
                                        {
                                            getAppListDOM(false)
                                        }
                                    </div>
                                </div>
                            </TabPane>

                        </Tabs>
                    </div>
                </div>

            </Modal>
        </div>
    )
}