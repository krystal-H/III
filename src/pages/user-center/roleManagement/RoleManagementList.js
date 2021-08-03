import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { Input, Button, Table, Tag, Card, Divider, Popconfirm } from 'antd';
import {get, Paths} from '../../../api';
import './roleManagement.scss';
import { deleteRole } from '../store/ActionCreator';
import { DateTool } from '../../../util/util';
import { Notification } from './../../../components/Notification';
import PageTitle from '../../../components/page-title/PageTitle';

const mapStateToProps = state => {
    return {
        // optionsList: state.getIn(['product','optionsList']).toJS(),
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // getCatalogList: () => dispatch(getCatalogListAction()),
        deleteRole: (roleId) => dispatch(deleteRole(roleId))
    }
}
@connect(mapStateToProps, mapDispatchToProps)
// class addProduct extends Component{
export default class RoleManagementList extends Component {
    constructor(props){
        super(props);
        this.state = {
            versionList:[],
            loading:true,
            roleList:[],
            pager:{},
        };
        this.columns = [
            { title: '角色名', dataIndex: 'roleName', key: 'roleName' },
            { title: '备注', dataIndex: 'remark', key: 'remark' },
            { title: '访问方式',key: 'userCategory',dataIndex: 'userCategory',
              render: userCategory => (
                <span>
                  <Tag color={userCategory ==1 ? 'blue' :'green'} >{userCategory ==1 ? '控制台访问用户' :'接口访问用户'}</Tag>
                </span>
              ),
            },
            { title: '最新修改时间', dataIndex: 'modifyTime', key: 'modifyTime', render: text => <span>{DateTool.utcToDev(text)}</span> },
            { title: '操作', key: 'tags', dataIndex: 'tags',
             render:(text, {roleId,roleName,remark,userCategory}) => (
                    <span>
                        <Link to={{
                                    pathname:`/userCenter/role/add`,
                                    search:`?roleId=${roleId}&roleName=${encodeURI(roleName)}&remark=${encodeURI(remark)}&userCategory=${userCategory}`
                                }}
                        >编辑
                        </Link>
                        <Divider type="vertical" />
                        <Popconfirm 
                            title="你确定要删除该角色吗？"
                            onConfirm={this.deleteRole.bind(this,record.roleId)}
                            okText="是"
                            cancelText="否"
                            placement="topRight"
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                ),
            },
        ];
        this.pagerIndex = this.pagerIndex.bind(this);
    }
    //获取角色列表
    getList = (data={}) => {
        get(Paths.getRolePage,data).then((res) => {
            this.setState({
                roleList:res.data.list,
                pager:res.data.pager,
                loading:false,
            });
        });
    }
    componentDidMount() {
        this.getList({pageIndex:1,pageRows:10});
    }
    deleteRole = (roleId) => {
        let pager = this.state.pager,
            { totalRows, pageIndex } = pager;
            pageIndex = (totalRows % ((pageIndex-1)*10))>1?pageIndex:pageIndex-1;
       
        this.props.deleteRole(roleId).then((res) => {
            if(res){
				Notification({type:'success',description:'删除用户角色成功！'});
                this.setState({loading: true});
                this.getList({pageIndex,pageRows:10});
            }
        })
    }
    //查询
    searchProduct = (value = '') => {
        value = value.trim();//去除头尾空格
        this.setState({loading:true},()=>{
            this.getList({pageIndex:1,pageRows:10,roleName:value});
        });
    }
    pagerIndex(pageIndex){
        this.setState({loading:true},()=>{
            this.getList({pageIndex,pageRows:10});
        });
    }
    render() {
        let { loading, roleList, pager } = this.state;
        return (
            <div className='role-management'>
                <PageTitle title="用户角色">
                    <div className="user-page-content-header">
                        <div className="searchBox">
                            <Input.Search placeholder="请输入用户角色名查找" maxLength={20} onSearch={value => this.searchProduct(value)} enterButton />
                        </div>
                        <div className='butFloatRight'>
                            <Link to={{
                                    pathname:`/userCenter/role/add`
                                }}><Button type="primary">创建用户角色</Button>
                            </Link>  
                        </div>
                    </div>
                </PageTitle>
                <Card>
                    <Table 
                        rowKey='roleId'
                        columns={this.columns} 
                        dataSource={roleList} 
                        pagination={{
                            defaultCurrent:pager.pageIndex, 
                            total:pager.totalRows, 
                            current: pager.pageIndex,
                            hideOnSinglePage:false,
                            onChange:this.pagerIndex
                        }}
                        loading={loading}
                    />
                </Card>
            </div>
        );
    }
}