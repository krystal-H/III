import React, { PureComponent } from 'react'
import { Descriptions ,Table,Input } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import {get,post, Paths} from '../../../api';
import { DateTool } from '../../../util/util';
import {UPGRADESTATUS,VERFIRMTYPE,UPDATESTATUS,UPRANGE,TRIGGERTIME,UPDATETYPE} from './store/constData'

export default class FirmwareDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.id = props.match.params.id
        this.verid = props.match.params.verid
        this.state = {
            list:[],
            pager:{},
            details:{},
        }
        this.columns = [
            { title: '设备ID', dataIndex: 'deviceUniqueId'},
            { title: '设备MAC', dataIndex: 'macAddress'},
            { title: '状态', dataIndex: 'upgradeStatus', render:u => (u && UPDATESTATUS[u].nam ) },
            { title: '日志', dataIndex: 'remark'},
        ]; 

    }
    componentDidMount() {
        this.getList()
        this.getDetail()
    }
    getList = (pageIndex=1)=>{
        const deviceVersionId = this.verid
        const batchId = this.id
        get(Paths.otaGetBatchDevice,{deviceVersionId,batchId,pageIndex,pageRows:10}).then(({data}) => {
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
    render() {
        const { pager:{pageIndex,totalRows,totalPages},list,details:{
            productName,
            productVersion,
            deviceVersionName,
            uploadTime,
            createTime,
            upgradeRange=0,
            upgradeType
        } } = this.state;

        return (
            <section className="ota-firmwaredetail flex-column">
                <PageTitle title={`批次id: ${this.id}`} titleBack={true} >
                    <header className="page-content-header">
                        <Descriptions title="" className='descriptions' column={4}>
                            <Descriptions.Item label="产品名称">{productName}</Descriptions.Item>
                            <Descriptions.Item label="产品版本号">{productVersion}</Descriptions.Item>
                            <Descriptions.Item label="产品版本名称">{deviceVersionName}</Descriptions.Item>
                            <Descriptions.Item label="上传时间">{uploadTime && DateTool.utcToDev(uploadTime)}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{createTime && DateTool.utcToDev(createTime)}</Descriptions.Item>
                            <Descriptions.Item label="升级范围">{UPRANGE[upgradeRange].nam}</Descriptions.Item>
                            <Descriptions.Item label="升级方式">{upgradeType && UPDATETYPE[upgradeType-1].nam || "--"}</Descriptions.Item>
                        </Descriptions> 
                    </header>
                </PageTitle>
                <div className='comm-shadowbox' style={{padding:"24px"}}>
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