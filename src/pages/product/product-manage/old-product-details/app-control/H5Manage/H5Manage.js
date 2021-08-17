import React, { Component } from 'react'
import { Input, Divider,Table } from 'antd'
import { Notification} from '../../../../../../components/Notification'
import {cloneDeep} from 'lodash'
import { addKeyToTableData} from '../../../../../../util/util';
import {Paths,post,axios} from '../../../../../../api';
import ActionConfirmModal from '../../../../../../components/action-confirm-modal/ActionConfirmModal';
import AloneSection from '../../../../../../components/alone-section/AloneSection';
import FlowChart from '../../../../../../components/flow-chart/FlowChart';
import './H5Manage.scss';

import {H5Status,projectType} from '../../../../../../configs/text-map';
import {H5PagePublish} from './H5ManageModals';

import ProductHelpConfig from "./ProductHelpConfig";
const { Search } = Input;

const flowLists = [
    {
        title:'创建H5页面'
    },
    {
        title:'配置产品帮助'
    },
    {
        title:'调试H5页面'
    },
    {
        title:'发布H5页面'
    }
]

export default class H5Manage extends Component {
    state = {
        
        h5CopyVisible:false, // 页面复制框状态
        copyLoading:false, // 复制按钮loading状态
        h5DeleteVisible:false, // 页面删除框状态
        deleteLoading:false, // 页面删除按钮loading状态
        h5PublishVisible:false, // 发布框状态
        publishType:null, // 发布类型；发布正式时，选中APP需要获取是否已经在该APP存在发布过的页面，并进行提示 3：灰度，4：正式
        publishLoading:false, // 发布按钮loading状态
        h5OffLineVisible:false, // 下线框状态
        offLineLoading:false, // 下线按钮loading状态
        currentOperateItem:null, // 当前正在操作的页面数据 （复制，删除，下线，发布）
        projectType:'2', // 创建页面的类型（1-sdk开发，2-在线编辑）
        listPager: {  // 页面列表的分页管理
            pageRows:20,
            pageIndex:1
        },
        projectName:'', // 页面搜索的输入框字段
    }
    constructor(props) {
        super(props);
        this.h5PageColumns = [
            {
                title: 'ID',
                dataIndex: 'projectId',
                key: 'projectId',
            },
            {
                title: '页面名称',
                dataIndex: 'projectNameVersion',
                key: 'projectNameVersion',
            },
            {
                title: '模式',
                dataIndex: 'projectType',
                key: 'projectType',
                render: (text, record) => (
                    <span>
                        {projectType[record.projectType]}
                    </span>
                )
            },
            {
                title: '发布应用',
                dataIndex: 'appName',
                key: 'appName',
            },
            {
                title: '状态',
                dataIndex: 'judgeStatu',
                key: 'judgeStatu',
                render: (text, record) => (
                    <span className={`h5-statu-${record.judgeStatu}`}>
                        {H5Status[record.judgeStatu]}
                    </span>
                )
            },
            {
                title: '操作',
                key: 'action',
                width:260,
                render: (text, record) => {
                    let {judgeStatu,projectType} = record;

                    return (
                        <span>
                        {
                            // 灰度版本可以更新
                            [3].includes(judgeStatu) && 
                            <React.Fragment>
                            <a onClick={ e => this.openModal('h5PublishVisible',record,true)}>更新</a>
                                <Divider type="vertical" />
                            </React.Fragment>
                        }
                        {
                            // 草稿，和灰度版本可以发布
                            [1,3].includes(judgeStatu) && 
                            <React.Fragment>
                            <a onClick={ e => this.openModal('h5PublishVisible',record)}>{judgeStatu === 1 ? '灰度' : '发布'}</a>
                                <Divider type="vertical" />
                            </React.Fragment>
                        }
                        {
                            // SDK模式不能复制
                            (projectType == '2') && 
                            <React.Fragment>
                                <a onClick={ e => this.openModal('h5CopyVisible',record)}>复制</a>
                                <Divider type="vertical" />
                            </React.Fragment>
                        }
                        {
                            // 草稿状态才可以删除
                            [1].includes(judgeStatu) && 
                            <React.Fragment>
                                <a onClick={ e => this.openModal('h5DeleteVisible',record)}>删除</a>
                            </React.Fragment>
                        }
                        {
                            // 灰度版本或者正式版本才会有下线操作
                            [3,4].includes(judgeStatu) && 
                            <React.Fragment>
                                <a onClick={ e => this.openModal('h5OffLineVisible',record)}>下线</a>
                            </React.Fragment>
                        }
                    </span>
                    )
                },
            }
        ]
    }
    componentDidMount(){
        // 此处是为了页面从H5编辑器返回时，能及时更新数据
        this.getPages()
    }
    openModal = (type,record,isGrayUpdate) => {
        let _state = {
            [type]:true 
        }
        
        if (type == 'h5PublishVisible') {
            let {judgeStatu,projectStatus,projectType} = record,
                // 草稿状态时需要发布灰度，灰度状态时需要发布正式 , 灰度状态可以更新
                publishType = (judgeStatu == 1) ? 3 : (isGrayUpdate ? 3 : 4);
            
            if (projectStatus == '0' && projectType == '2') {
                Notification({
                    type:'warn',
                    message: '无法发布',
                    description: '此条HTML数据没有保存，请先保存！'
                })
                return false;
            }

            _state.publishType = publishType;
        }

        if (record ) {
            _state.currentOperateItem = record
        }

        this.setState(_state)  
    }
    close (type) {        
        this.setState({
            [type]:false
        })
    }
    deleteOkHandle = () => {
        let {currentOperateItem} = this.state,
            {projectId} = currentOperateItem;
        
        this.setState({
            deleteLoading:true
        },() => {
            post(Paths.delProject,{
                projectId
            }).then(res => {
                this.setState({
                    h5DeleteVisible:false
                })
                this.getPages()
            }).finally( () => {
                this.setState({
                    deleteLoading:false
                })
            })
        })
    }
    copyOKHandle = () => {
        let {currentOperateItem} = this.state,
            {productId} = this.props,
            {projectId} = currentOperateItem;
        
        this.setState({
            copyLoading:true
        })

        post(Paths.copyProject,{
            projectId,
            productId
        }).then( res => {
            this.getPages()
            this.setState({
                h5CopyVisible:false
            })
        }).finally( () => {
            this.setState({
                copyLoading:false
            })
        })
    }
    offLineOkHandle = () => {
        let {currentOperateItem} = this.state,
            {productId} = this.props,
            {projectId,judgeStatu} = currentOperateItem,
            path = Paths.cancelGrayUpdate,
            _data = {projectId};
        
        this.setState({
            offLineLoading:true
        })

        if (judgeStatu == '4') { //灰度时，撤销灰度；正式时，下线
            path = Paths.offlineUiDesign;
            _data.productId = productId;
        }

        post(path,_data,{
            needVersion: '1.1'
        }).then( res => {
            this.getPages()
            this.setState({
                h5OffLineVisible:false
            })
        }).finally( () => {
            this.setState({
                offLineLoading:false
            })
        })
    }
    publishOkHandle = data => {
        let {currentOperateItem,publishType} = this.state,
            {productId} = this.props,
            {projectId} = currentOperateItem,
            path = Paths.garyUpdate;
            
        if (publishType == '4') {
            path = Paths.formalUpdate;
            data.appId = data.newAppIds;
            delete data.newAppIds
        }

        this.setState({
            publishLoading:true
        })

        post(path,{
            ...data,
            projectId,
            productId
         },{
             needVersion:'1.1'
        }).then(res => {
            this.setState({
                h5PublishVisible:false
            })
            this.getPages()
        }).finally(() => {
            this.setState({
                publishLoading:false
            })
        })
    }
    getPages = () => {
        let {listPager,projectName} = this.state,
            {productId,getH5Manages} = this.props;
        
        getH5Manages({
            ...listPager,
            projectName,
            productId
        })
    }
    changePageIndex = (page) => {
        this.setState({
            listPager: {
                pageIndex:page,
                pageRows:20
            } 
        },this.getPages)
    }
    SearchInputHandle = value => {
        this.setState({
            projectName:value
        })
    }
    // 1:草稿 2:审核中 3:灰度版本 4:正式版本
    judgeH5Status = (listItem) => { //计算H5页面的状态 -- 原有的参数太杂乱了，内部使用此字段标记
        let {isGray,status,verifyStatus} = listItem,
            _statu = null;

        if (isGray == '1') {
            _statu = 3;
        } else {
            if (status == '0') {
                _statu = 1;
            } else {
                if (verifyStatus == '3') {
                    _statu = 2;
                } else if (verifyStatus == '1'){
                    _statu = 4;
                } else {
                    _statu = 1;
                }
            }
        }
        return _statu;
    }
    dealList (list = []) {
        let {productName} = this.props;

        let _list = cloneDeep(list);
        _list = addKeyToTableData(_list);
        _list = _list.map(item => {
            let {projectName,externalVersion} = item;
            // 旧逻辑是项目名称是自动生成的，由产品名称和一个扩展号组成；新逻辑中，项目名称可以自定义输入
            item.projectNameVersion = (productName == projectName) ?  `${projectName} - V${externalVersion}` : projectName;
            // 项目的状态由太多字段一起标记，这里计算出一个统一字段进行管理
            item.judgeStatu = this.judgeH5Status(item);
            return item;
        })
        return _list;
    }
    render() {
        let {h5DeleteVisible,h5CopyVisible,
            h5PublishVisible,h5OffLineVisible,listPager,projectName,
            currentOperateItem,deleteLoading,copyLoading,offLineLoading,publishType,publishLoading} = this.state,
            {productH5Pages,appsByProductId,productId} = this.props,
            {pageIndex,pageRows} = listPager,
            {list,pager} = productH5Pages,        
            _list = this.dealList(list);

        let _columns = cloneDeep(this.h5PageColumns);
        
        return (
            <div className="app-control-wrapper">
                <AloneSection style={{margin:'0 0 24px'}} title="使用流程">
                    <div className="use-service-flow-wrapper">
                        <FlowChart type={3} flowLists={flowLists}></FlowChart>
                        <div className="extra-descs">
                            <div className="descs-item">
                                <div>使用H5开发工具拖拽生成页面;</div>
                                <div>基于H5 SDK开发页面并上传;</div>
                                
                            </div>
                            <div className="descs-item">
                                <p>配置产品在APP上的联网指引、使用帮助等信息。</p>
                            </div>
                            <div className="descs-item">
                                <p>通过 调试工具验证H5页面面的控制功能和状态显示是否正常。
                                </p>
                            </div>
                            <div className="descs-item">
                                <p>调试完成后，可以将页面发布到C家或您创建的APP上。</p>
                            </div>
                        </div>
                    </div>
                </AloneSection>
                <section className="h5-manage-wrapper">
                    <h3>H5页面</h3>
                    <div className="page-manage">
                        <div className="tool-area">
                            <div className="comm-searchBox">
                                <Search enterButton
                                    value={projectName}
                                    onChange={e => this.SearchInputHandle(e.target.value)}
                                    onSearch={this.getPages}
                                    maxLength={20}
                                    placeholder="请输入页面名称查找">
                                </Search>
                            </div>

                        </div>
                        <div className="h5-manage-tab">
                            <Table columns={_columns} 
                                   dataSource={_list}
                                   pagination = {
                                    pager ? 
                                    {
                                        total:pager.totalRows,
                                        current:pageIndex,
                                        defaultCurrent:1,
                                        pageSize:pageRows,
                                        defaultPageSize:20,
                                        onChange:(page) => this.changePageIndex(page),
                                        showTotal: total => <span>共 <a>{total}</a> 条</span>,
                                        showQuickJumper:true,
                                        hideOnSinglePage:true,
                                    }:
                                    false
                                   }
                                   />
                        </div>
                    </div>
                </section>

                <ProductHelpConfig productId={productId}></ProductHelpConfig>
                {/* 页面发布弹框 */}
                {
                    h5PublishVisible &&
                    <H5PagePublish visible={h5PublishVisible} 
                        appsByProductId={appsByProductId}
                        projectName={currentOperateItem.projectNameVersion}
                        productId={productId}
                        publishType={publishType}
                        publishOkHandle={this.publishOkHandle}
                        publishLoading={publishLoading}
                        onCancel={this.close.bind(this,'h5PublishVisible')}>
                        </H5PagePublish>
                }

                {/* 页面删除弹框 */}
                {   h5DeleteVisible && 
                    <ActionConfirmModal
                        visible={h5DeleteVisible}
                        modalOKHandle={this.deleteOkHandle}
                        modalCancelHandle={this.close.bind(this,'h5DeleteVisible')}
                        targetName={currentOperateItem.projectNameVersion}
                        confirmLoading={deleteLoading}
                        title={'删除页面'}
                        descGray={true}
                        descText={'即将删除的页面'}
                        needWarnIcon={true}
                        tipText={'页面删除后将无法找回，是否确认删除？'}
                    ></ActionConfirmModal>
                }
                {/* 页面复制弹框 */}
                {
                    h5CopyVisible && 
                    <ActionConfirmModal
                        visible={h5CopyVisible}
                        modalOKHandle={this.copyOKHandle}
                        modalCancelHandle={this.close.bind(this,'h5CopyVisible')}
                        targetName={currentOperateItem.projectNameVersion}
                        confirmLoading={copyLoading}
                        title={'复制页面'}
                        descGray={true}
                        descText={'即将复制的页面'}
                        tipText={'将创建与原页面功能一样的新页面，是否确认创建？'}
                    ></ActionConfirmModal>
                }
                {/* 页面下线弹框 */}
                {
                    h5OffLineVisible && 
                    <ActionConfirmModal
                        visible={h5OffLineVisible}
                        modalOKHandle={this.offLineOkHandle}
                        modalCancelHandle={this.close.bind(this,'h5OffLineVisible')}
                        targetName={currentOperateItem.projectNameVersion}
                        confirmLoading={offLineLoading}
                        title={'下线页面'}
                        descGray={true}
                        descText={'即将下线的页面'}
                        needWarnIcon={true}
                        tipText={'页面下线后，已发布的APP将无法拉取到该页面，是否确认下线？'}
                    ></ActionConfirmModal>
                }
                
            </div>
        )
    }
}
