import React, { PureComponent } from 'react'
import { Descriptions ,Table,Input } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import {get,post, Paths} from '../../../api';
import { DateTool } from '../../../util/util';
import {UPGRADESTATUS,VERFIRMTYPE,UPDATESTATUS,UPRANGE,TRIGGERTIME} from './store/constData'

export default class FirmwareDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.id = props.match.params.id
        this.verid = props.match.params.verid
        this.state = {
            deviceId:undefined,
            list:[],
            pager:{},
            details:{},
        }
        this.columns = [
            { title: '设备ID', dataIndex: 'deviceId'},
            { title: 'MAC地址', dataIndex: 'mac'},
            { title: '产品', dataIndex: 'productName'},
            { title: '设备分组名', dataIndex: 'groupName'},
            { title: '最新升级时间', dataIndex: 'updateTime', 
                render: u => <span>{u && DateTool.utcToDev(u) || '--'}</span>
            },
            { title: '升级前版本', dataIndex: 'beforeVersion'},
            { title: '升级状态', dataIndex: 'upgradeStatus', render:u => (u && UPDATESTATUS[u].nam ) },
            { title: '操作', key: 'act',
                render: (id, {deviceId,upgradeStatus}) => (
                    <span>
                        {
                            upgradeStatus==0&&<a onClick={()=>{this.cancel(deviceId)}}>取消</a>
                        }
                    </span>
                ),
            },
        ]; 

    }
    componentDidMount() {
        this.getList()
        this.getDetail()
    }
    cancel=(deviceId)=>{
        const deviceVersionId = this.verid
        const batchId = this.id
        Modal.confirm({
            title: '取消升级',
            content: `即将取消升级 deviceId 为 ${deviceId} 的设备。`,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk:()=>{
                get(Paths.otaCancelDevicePub,{deviceVersionId,batchId,deviceId}).then(() => {
                    let {totalRows,pageIndex} = this.state.pager;
                    pageIndex = (totalRows % ((pageIndex-1)*10))>1?pageIndex:pageIndex-1;
                    this.getList(pageIndex)
                });
            }
          });
        
    }
    getList = (pageIndex=1)=>{
        const deviceVersionId = this.verid
        const batchId = this.id
        const {deviceId} = this.state
        get(Paths.otaGetBatchDevice,{deviceVersionId,batchId,deviceId,pageIndex,pageRows:10}).then(({data}) => {
            const {list=[] ,pager={}} = data
            this.setState({
                list:list.map((li,i)=>({...li,index:i})),
                pager
            }) 
        });
    }
    getDetail=()=>{
        const deviceVersionId = this.verid
        const batchId = this.id
        get(Paths.otaGetBatchInfo,{deviceVersionId,batchId}).then(({data}) => {
            this.setState({details:{...data}}) 
        });
    }
    search = deviceId => {
        this.setState({deviceId},()=>{
            this.getList();
        });
    }
    render() {
        const { pager:{pageIndex,totalRows,totalPages},list,details:{
            deviceVersionName,
            upgradeStatus=0,
            upgradeRange=0,
            createTime,
            triggerTime,
            beginTime,
            endTime,
            retryCount,
            retryTime,
            upgradeType,
        } } = this.state;

        return (
            <section className="ota-firmwaredetail flex-column">
                <PageTitle title={`${deviceVersionName||'固件包'}/${this.id}`} titleBack={true} >
                    <header className="page-content-header">
                        <Descriptions title="" className='descriptions' column={4}>
                            <Descriptions.Item label="升级状态">{UPGRADESTATUS[upgradeStatus]}</Descriptions.Item>
                            <Descriptions.Item label="升级范围">{UPRANGE[upgradeRange].nam}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{createTime && DateTool.utcToDev(createTime)}</Descriptions.Item>
                            <Descriptions.Item label="升级方式">{UPDATETYPE[upgradeType-1].nam}</Descriptions.Item>
                            <Descriptions.Item label="升级触发策略">{TRIGGERTIME[triggerTime]}</Descriptions.Item>
                            <Descriptions.Item label="升级开始时间">{beginTime && DateTool.utcToDev(beginTime)}</Descriptions.Item>
                            <Descriptions.Item label="升级结束时间">{endTime && DateTool.utcToDev(endTime)}</Descriptions.Item>
                            <Descriptions.Item label="升级失败重试">{retryTime}</Descriptions.Item>
                            <Descriptions.Item label="失败重试次数">{retryCount}次</Descriptions.Item>
                        </Descriptions> 
                    </header>
                </PageTitle>
                <div className='comm-shadowbox' style={{padding:"24px"}}>
                    <Input.Search placeholder="输入设备ID查询"
                        className='search'
                        enterButton
                        maxLength={20}
                        onSearch={value => this.search(value)} 
                    />
                    <Table 
                        rowKey="index"
                        columns={this.columns} 
                        dataSource={list}
                        pagination={{
                            defaultCurrent:pageIndex, 
                            total:totalRows,
                            hideOnSinglePage:false,
                            onChange:val=>{this.getList(val)},
                            current: pageIndex,
                            showSizeChanger:false,
                            showQuickJumper: totalPages > 5


                        }} 
                    />
                </div>
            </section>
        )
    }
}