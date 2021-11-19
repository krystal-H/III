import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { post, Paths} from '../../../../../api';
import { Input, Button, Table, Divider } from 'antd';
import ActionConfirmModal from '../../../../../components/action-confirm-modal/ActionConfirmModal';
import ModeAddForm from './addForm';
import { DateTool } from '../../../../../util/util';
import './deviceGroup.scss'

export default class DeviceGroup extends Component {
    constructor(props){
        super(props);
        this.projectId = this.props.projectId;
        this.state = {
            loading:true,// 列表加载
            caseList:[],
            pager:{},
            searchName:undefined,//搜索框
            name:'',// 当前操作的分组名称
            id:'',//当前操作的分组id
            addVisible:false,//新增分组弹窗
            pageIndex: 1,
        };
        this.columns = [
            { title: '分组名称', dataIndex: 'groupName',ellipsis:true },
            { title: '分组ID', dataIndex: 'groupId', width:'100px',},
            { title: '描述', dataIndex: 'groupDesc',ellipsis:true},
            { title: '添加时间', dataIndex: 'createTime', width:'180px',
                render: text => <span>{text && DateTool.utcToDev(text) || '--'}</span>
            },
            { title: '操作', key: 'action', width:'120px',
                render: (text, record) => (
                    <span>
                        <Link to={`/open/device/devGroup/details/${record.id}/${record.groupId}`}>查看</Link>
                        <Divider type="vertical" />
                        <a onClick={this.openDel.bind(this,record.id,record.name)} >删除</a>
                    </span>
                ),
            },
        ];
    }
    //获取分组列表
    getList = (data={}) => {
        const {pageIndex, searchName} =this.state;
        post(Paths.getGroupList,
            { pageIndex,pageRows:10,groupName:searchName||undefined, projectId:this.projectId, ...data}
        ).then((res) => {
            this.setState({
                caseList:res.data.list || [],
                pager:res.data.pager || {},
            });
        }).finally( () => {
            this.setState({
                loading:false
            })
        });
    }
    componentDidMount() {
        this.getList();
    }
    //打开、关闭新增弹窗
    switchOpen = (open=true) => {
        this.setState({addVisible:open});
    }
    //打开删除框
    openDel = (id,name) => {
        this.setState({id,name});
    }
    //删除确认框的确认和取消
    delOkCancel = (type)=>{
        if(type=='ok'){// 点击确认
            let {id} = this.state;
            post(Paths.deleteGroup,{groupId}).then((res) => {
                this.setState({loading:true,id:''},()=>{
                    this.getList();
                });
            });
        }else{
            this.setState({id:''}); 
        }
    }
    //查找
    searchGroup = (searchName) => {
        this.setState({loading:true,
            searchName
       },()=>{
            this.pagerIndex(1);
        });
    }
    pagerIndex = (pageIndex) => {
        this.setState({pageIndex,loading:true},()=>{
            this.getList();
        });
    }
    render() {
        let { loading, addVisible,caseList, pager:{pageIndex=1,totalRows=0,totalPages=0},id,name } = this.state;
        
        return (
           <div className='page-devicegroup'>
                <div className='searchbox'>
                    <div className='comm-searchBox'>
                        <Input.Search placeholder="请输入分组名查找"
                            enterButton
                            maxLength={20}
                            onSearch={value => this.searchGroup(value)} 
                        />
                    </div>
                    <Button className='btn' type="primary" onClick={this.switchOpen}>新增分组</Button>
                </div>

                <div className='tablebox'>
                    <Table
                        rowKey="id"
                        columns={this.columns} 
                        dataSource={caseList} 
                        pagination={{
                            defaultCurrent:pageIndex, 
                            total:totalRows, 
                            onChange:this.pagerIndex,
                            current: pageIndex,
                            showSizeChanger:false,
                            showQuickJumper: totalPages > 5,
                            hideOnSinglePage:true,
                        }} 
                        loading={loading}
                    />
                </div>

                <ModeAddForm visible={addVisible} switchOpen={this.switchOpen} pagerIndex={this.pagerIndex} projectId={this.projectId}/>
                
                <ActionConfirmModal
                    visible={!!id}
                    modalOKHandle={this.delOkCancel.bind(this,'ok')}
                    modalCancelHandle={this.delOkCancel.bind(this,'cancel')}
                    title='删除分组'
                    descText='即将删除分组'
                    targetName={name}
                />
           </div>
        )
    }
}
