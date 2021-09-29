import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { Descriptions,Table,Input } from 'antd';
import PageTitle from '../../../components/page-title/PageTitle';
import {get,post, Paths} from '../../../api';
import { DateTool } from '../../../util/util';
import {UPRANGE,UPDATETYPE,TRIGGERTIME,VERFIRMTYPE,VERTYPE,STATUSTAG,UPDATESTATUS} from './store/constData'

export default class FirmwareDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.deviceVersionId = props.match.params.id
        this.state = {
            batchId:undefined,
            list:[],
            pager:{},
            details:{},
        }
        this.columns = [
            { title: '批次ID', dataIndex: 'batchId',},
            { title: '发布时间', dataIndex: 'createTime', 
                render: c => <span>{c && DateTool.utcToDev(c) || '--'}</span>
            },
            { title: '升级范围', dataIndex: 'upgradeRange', render: u => UPRANGE[u].nam},
            { title: '升级方式', dataIndex: 'upgradeType', render: u => UPDATETYPE[u-1].nam},
            { title: '升级策略', dataIndex: 'triggerTime', render: t => TRIGGERTIME[t] },
            { title: '状态', dataIndex: 'upgradeStatus', render: u => ['升级中','已完成'][u] },
            { title: '操作', key: 'id',
                render: (id, {batchId}) => <Link to={`/open/product/otaUpdate/batch/${this.deviceVersionId}/${batchId}`}>查看</Link>
            },
        ];
    }

    componentDidMount() {
        this.getBatch()
        this.getDetail()
    }
    getBatch = (pageIndex=1)=>{
        const deviceVersionId = this.deviceVersionId
        const {batchId} = this.state
        get(Paths.otaGetBatch,{deviceVersionId,batchId,pageIndex,pageRows:10}).then(({data}) => {
            const {list=[] ,pager={}} = data
            this.setState({list,pager}) 
        });
    }
    getDetail=()=>{
        const deviceVersionId = this.deviceVersionId
        post(Paths.otaGetVersionDetail,{deviceVersionId}).then(({data}) => {
            this.setState({details:{...data}}) 
        });
    }
    search = batchId => {
        this.setState({batchId},()=>{
            this.getBatch();
        });
    }
    render() {
        const { pager:{pageIndex,totalRows,totalPages},list,details:{
            firmwareVersionTypeName,productName,deviceVersionTypeName,
            productFirmwareVersion,uploadTime,mainVersion,totalVersion
        } } = this.state;

        return (
            <section className="ota-firmwaredetail flex-column">
                <PageTitle title={firmwareVersionTypeName} titleBack={true} >
                    <header className="page-content-header">
                        <Descriptions title="" className='descriptions' column={4}>
                            <Descriptions.Item label="归属产品" >{productName}</Descriptions.Item>
                            <Descriptions.Item label="固件类型">{deviceVersionTypeName}</Descriptions.Item>
                            <Descriptions.Item label="上传时间">{uploadTime && DateTool.utcToDev(uploadTime)}</Descriptions.Item>
                            <Descriptions.Item label="内部版本号">{mainVersion}</Descriptions.Item>
                            <Descriptions.Item label="产品版本号">{productFirmwareVersion}</Descriptions.Item>
                            <Descriptions.Item label="固件模块">{firmwareVersionTypeName}</Descriptions.Item>
                            <Descriptions.Item label="固件系列标识">{totalVersion}</Descriptions.Item>
                        </Descriptions> 
                    </header>
                </PageTitle>
                <div className='comm-shadowbox' style={{padding:"24px"}}>
                    <Input.Search placeholder="输入发布批次ID查询"
                        className='search'
                        enterButton
                        maxLength={20}
                        onSearch={value => this.search(value)} 
                    />
                    <Table 
                        rowKey="batchId"
                        columns={this.columns} 
                        dataSource={list}
                        pagination={{
                            defaultCurrent:pageIndex, 
                            total:totalRows,
                            hideOnSinglePage:true,
                            onChange:val=>{this.getBatch(val)},
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
