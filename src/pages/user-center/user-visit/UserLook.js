import React, { Component } from 'react';
import {  Paths,post} from '../../../api';
import { getUrlParam } from '../../../util/util';
import BasicInformation from './BasicInformation';
import {EditBasicInformation} from './EditBasicInformation';
import TreeStructureDisplay from '../../../components/tree-structure-display/TreeStructureDisplay';
import {strToAsterisk} from '../../../util/util';
import PageTitle from '../../../components/page-title/PageTitle';
import AloneSection from '../../../components/alone-section/AloneSection';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import { Tree, Modal } from 'antd';
import './userLook.scss'


const {TreeNode} = Tree;
export default class UserLook extends Component {
    constructor(props){
        super(props);
        this.state = {
            permissionsTabsKey:'1',//tabs 切换key
            userEditVisible:false,//用户信息编辑
            userInfo:{},
            loading:true,//key 列表加载
            dataTable:[],
            secretKey:'',
            secretId:'',

            eye:true,

            treeData:{},
        };
        this.columns = [
            {
                title: '用户SecretId',
                dataIndex: 'secretId',
                key: 'secretId',
            },
            {
                title: '用户SecretKey',
                dataIndex: 'secret',
                key: 'secret',
                render: text => <a>{this.state.eye?strToAsterisk(text,10):text}{this.state.eye?<EyeInvisibleOutlined className='eyeLeft' onClick={this.clickEye} />:<EyeOutlined className='eyeLeft' onClick={this.clickEye} />}</a>
            },
            {
                title: '创建时间',
                dataIndex: 'time',
                key: 'time',
            }
        ];
    }
    // 获取用户详情
    getChildWithSecret = () => {
        let userId = getUrlParam('userId');
        post(Paths.getChildWithSecret,{userId},{loading:true}).then((res) => {
            
            this.setState({userInfo:res.data,loading:false,secretKey:res.data.secretKey,secretId:res.data.secretId});
        });
    }
    // 获取权限列表
    getRights(){
        let userId = getUrlParam('userId');
        post(Paths.getRights,{userId},{loading:true}).then((model) => {
            this.setState({ treeData:model.data || {} }); 
        });
    }
    componentDidMount() {
        this.getChildWithSecret();
        this.getRights();
    }
    clickEye = (state) => {
        this.setState({eye:!this.state.eye});
    }
    renderTreeNodes = data =>
        data.map(item => {
        if (item.children) {
            return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
            </TreeNode>
            );
        }
        return <TreeNode key={item.key} {...item} />;
    });
    //确认弹窗
    handleOk = () => {
        this.editAffirm.affirm();
    }
    //保存清空关闭
    handleOkCancel = () => {
        this.editAffirm.setState({
            resetChecked:false,
            resetSelectId:null,
            password:null,//密码
            userName:'',//用户名称
            remark:'',//备注
            roleId:null,//角色ID
            ipWhiteSelect:false,//是否提白名单
            ipWhiteList:'',//白名单
        },()=>{
            this.getChildWithSecret();
            // this.getRights();
        })
        this.setState({userEditVisible:false});
        console.log('---close');
        this.editAffirm.props.form.resetFields();
    }
    //取消
    handleCancel = (state,e) => {
        this.setState({userEditVisible:false});
        console.log('---close');
        this.editAffirm.props.form.resetFields();
        console.log(this.editAffirm.props.form.getFieldsValue());
    }
    //打开编辑
    editUserInfo = () => {
        if(this.editAffirm){
            this.editAffirm.backfill(this.state.userInfo);
        }
        this.setState({userEditVisible:true});
    }
    render() {
        let { userInfo, secretKey, secretId, userEditVisible, treeData} = this.state;
        return (
            <div className='user-info-box'>
            <PageTitle title="用户详情" titleBack={true}/>
                <BasicInformation editUserInfo={this.editUserInfo} userInfo={userInfo} secretKey={secretKey} secretId={secretId}/>
                
                <AloneSection title="权限信息" className='comm-shadowbox'>
                    <TreeStructureDisplay treeData={treeData}/>
                </AloneSection>

            <Modal
                title="编辑用户信息"
                visible={userEditVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                maskClosable={false}
                className="self-modal"
                footer={null}
            >
                <EditBasicInformation userData={userInfo} onCancel={this.handleCancel} onRef={ref => this.editAffirm  = ref} handleClose={this.handleOkCancel}/>
            </Modal>
            </div>
        );
    }
}


