import React  from 'react';
import { Modal, Select,Tabs} from 'antd';
import { Notification} from '../../../../../../components/Notification';
import {Paths,post} from '../../../../../../api';
import DefaultIconImg from '../../../../../../assets/images/product/app-default-icon.png';

const { Option } = Select;
const {TabPane}  = Tabs;

export class H5PagePublish extends React.Component {
    state = {
        selectedAppId:null, 
        status:'1', // 升级类型 1：普通，2：强制
        FormalPubHistory:[],
        GrayPubHistory:[]
    }
    getPubHistory = (appId,_name) => {
        let {productId,publishType} = this.props,
            _path = publishType == 3 ? Paths.getGreyPubHistory : Paths.getFormalPubHistory;

        post(_path,{
            appId,
            productId
        }).then(res => {
            this.setState({
                [_name]: res.data
            })
        })
    }
    changeStatus = (value) => {
        this.setState({
            status:value
        })
    }
    selectApp = (type,appId) => {
        let {selectedAppId} = this.state,
            {publishType}  = this.props,
            _name = publishType == 3 ? "GrayPubHistory" : "FormalPubHistory",
            _state = {};
        
        _state.selectedAppId = selectedAppId === appId ? null : appId;

        _state[_name] = []

        if (_state.selectedAppId !== null) {
            this.getPubHistory(appId,_name)
        } 
        
        this.setState(_state)
    }
    getAppListDOM = (type) => {
        let {selectedAppId} = this.state,
            {appsByProductId} = this.props,
            _apps = appsByProductId.filter(item => type == '0' ? item.isOfficialApp : !item.isOfficialApp),
            className = 'app-icon';

        
        return (
            _apps.length > 0 ?
            _apps.map((item) => {
                let {appIcon,appName,appId} = item;

                className = 'app-icon'; // 重置class的值
                
                if (selectedAppId == appId) {
                    className += ' active';
                }
                
                return (
                    <div className="app-item" key={type + '-' + appId} onClick={() => this.selectApp(type,appId)}>
                        <div className={className}>
                            <img src={appIcon || DefaultIconImg} alt="应用图标"/>
                        </div>
                        <span className="gray-text app-name">{appName}</span>
                    </div>
                )
            })
            :
            <div style={{textAlign:'center'}} className="explain-text">{`该产品暂无${type == '0' ? '官方' : "私有"}应用`}</div>  
        )
    }
    okHandle = () => {
        let {publishOkHandle} = this.props,
            {selectedAppId,status} = this.state;


        if (!selectedAppId) {
            Notification({
                type:'warn',
                message: '参数缺失',
                description: '请选中一个APP再进行发布'
            })

            return false;
        }

        publishOkHandle({
            newAppIds : '' + selectedAppId,
            status
        })
    }
    render () {
        let {visible,onCancel,projectName,publishLoading,publishType} = this.props,
            {status,FormalPubHistory,GrayPubHistory} = this.state;

        return (
            <Modal
                visible={visible}
                className="self-modal"
                width={700}
                title="发布H5页面"
                okText="发布"
                confirmLoading={publishLoading}
                onOk={this.okHandle}
                cancelText="取消"
                onCancel={onCancel}
                centered={true}
                closable={false}
                maskClosable={false}
                >
                    <div>
                        <p className="desc-content">即将发布的页面：<span>{projectName}</span></p>
                        <p style={{color:'rgba(0,0,0,0.85)'}}>发布到应用：</p>
                        <Tabs defaultActiveKey="0">
                            <TabPane tab="C-Life官方应用" key='0'>
                                <div className="app-items-wrapper">
                                    {
                                        this.getAppListDOM('0')
                                    }
                                </div>
                            </TabPane>
                            <TabPane tab="私有应用" key='1'>
                                <div className="app-items-wrapper">
                                    {
                                        this.getAppListDOM('1')
                                    }
                                </div>
                            </TabPane>
                        </Tabs>
                        {
                            (publishType == 3 ? (GrayPubHistory.length > 0) : (FormalPubHistory.length > 0)) &&
                            <div className="app-has-pulish">
                                该产品已发布过H5页面到该APP，继续发布将替换掉原H5页面
                            </div>
                        }
                        <div className="select-update-type">
                                <div>
                                    <span>发布模式:</span>
                                    <Select value={status} 
                                            onChange={value => this.changeStatus(value)}
                                            style={{ width: 100,marginLeft:8}}>
                                        <Option value="1">普通升级</Option>
                                        <Option value="2">强制升级</Option>
                                    </Select>
                                </div>
                                <p className="update-desc gray-text">{status == '1' ? 'APP将显示升级提醒，用户可以选择升级或不升级' : 'APP将显示升级提醒，用户必须确认升级才可以继续使用'}</p>
                        </div>
                    </div>
            </Modal>
        )
    }
}