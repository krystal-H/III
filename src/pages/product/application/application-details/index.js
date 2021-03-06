import React, { PureComponent } from 'react';

import { Tabs, Button, Row, Col, Table, Tooltip,Form } from 'antd';
import ActionConfirmModal from '../../../../components/action-confirm-modal/ActionConfirmModal';
import { Notification } from '../../../../components/Notification';
import ProductIcon from '../../../../components/product-components/product-icon/ProductIcon';
import DetailInHeader from '../../../../components/detail-in-header';
import PageTitle from '../../../../components/page-title/PageTitle';
import { strToAsterisk, DateTool } from '../../../../util/util';
import AddProductRelationModal from './AddProductRelationModal';
import _ from 'lodash';


import PushMsgConfig from './pushMsgConfig'
import { get, Paths, post } from '../../../../api';
import { REQUEST_SUCCESS } from '../../../../configs/request.config';
import { AddAppVersionForm } from "./AddAppVersion";
import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
import MyIcon from '../../../../components/my-icon/MyIcon';
import { EditApplicationForm } from './form/editApplicationForm';
import { withRouter } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 12 }
};
import './style.scss';

const { TabPane } = Tabs;
const initPager = {
    pageRows: 10,
    pageIndex: 1,
};
const texts = [{
    title: '删除应用',
    desc: '应用删除后将无法继续APPID。即将删除应用',
    tip: '应用删除操作不可恢复。是否确认删除?',
    targetName: '我的app',
}, {
    title: '删除产品关联',
    desc: '即将删除产品关联',
    tip: '是否确认删除?',
    targetName: '宝莱特血压计',
}, {
    title: '删除应用版本',
    desc: '删除后用户将无法再获取到该版本升级，已升级用户不受影响。即将删除应用版本',
    tip: '是否确认删除?',
    targetName: 'V1.1.3',
}]

class ApplicationDetail extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            appId: this.props.match.params.appId,
            showDeleteDialog: false,
            showAddProductRelationDialog: false,
            showAppVersionDialog: false,
            showApplicationDialog: false,
            curProductID: null,
            curAppVersionId: null,
            currentTab: 1,
            currentAppType: 1,
            curAppVersionDetail: {},
            appInfo: {
                appId: { value: '' },
                appName: { value: '' },
                appSecret: { value: '' },
                createTime: { value: '' },
                appType: { value: '' },
                appMode: { value: '' },
                iosBundleId: { value: '' },
                appDesc: { value: '' },
                weChatAppId: { value: '' },
                secret: { value: '' },
                androidPkg: { value: '' },
                appIconLow: { value: '' },
                appVersionType: { value: '' }
            },
            showSecret: false,
            relationProductList: { listAndroid: [], listIos: [] }, // 已关联的产品列表
            versionList: { list: [], pager: {} }, // 版本列表
            relationProductJurisdiction: '关联产品',
            versionPublishJurisdiction: '发布版本',
            showEditAppForm: true,
            relationedProductIds: {},
            deleteAppVersionItem: {}
        }
    }

    componentDidMount = () => {
        let { appId } = this.state;
        this._getAppInfo(appId);
    };

    // 防止内存泄漏
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }

    handleChange = (type, activeKey) => {
        this.setState(() => {
            return { [type]: activeKey };
        });
    };

    // 翻页
    onChange = pageNumber => {
        this._getVersionList({
            pageIndex: pageNumber,
            pageRows: 5,
        })
    }

    // 获取版本列表记录
    _getVersionList = (param) => {
        let { appId } = this.state
        post(Paths.getAppVersionList5x, {
            appId, ...param,
        }, { loading: true }).then((res) => {
            const code = res.code;
            const data = res.data;
            if (code === REQUEST_SUCCESS) {
                if ('{}' !== JSON.stringify(data)) {
                    this.setState(() => {
                        return { versionList: data };
                    });
                }
            }
        });
    };

    // 创建应用版本
    createAppVersion = (params) => {
        let { appId } = this.state;
        post(Paths.addAppVersionInfo5x, {
            ...params,
            appType: Number(params.appType),
            status: Number(params.status),
            appId: Number(appId),
        }, { loading: true }).then((res) => {
            const code = res.code;
            if (code === REQUEST_SUCCESS) {
                Notification({ description: '操作成功！', type: 'success' })
                this.setState((preState) => {
                    let { showAppVersionDialog } = preState;
                    return { showAppVersionDialog: !showAppVersionDialog };
                }, () => {
                    this._getVersionList({
                        ...initPager,
                        pageRows: 5,
                    });
                });
            }
        });
    };

    // 保存应用信息
    saveAppInfo = (params) => {
        let { appId, appInfo } = this.state;
        let appType = appInfo.appType.value;
        params = { ...params, appMode: 1, appId, appType: Number(appType) };
        let app = appType === 0 ? '移动应用编辑成功' : '小程序应用编辑成功';
        if (appType === 2) {
            params = { ...params, weChatAppId: appInfo.weChatAppId.value, secret: appInfo.secret.value }
        }
        post(Paths.saveAppInfo5x, {
            ...params
        }, { loading: true }).then((res) => {
            const code = res.code;
            if (code === REQUEST_SUCCESS) {
                Notification({ description: app, type: 'success' })
                this.setState((preState) => {
                    let { showEditAppForm } = preState;
                    return { showEditAppForm: !showEditAppForm };
                }, () => {
                    let { appId } = this.state;
                    this._getAppInfo(appId);
                });
            }
        });
    };

    // 获取关联产品信息
    _getRelaProducts = (appId) => {
        post(Paths.getRelateProduct5x, {
            appId,
            paged: false,
        }, { loading: true }).then((res) => {
            const code = res.code;
            const data = res.data;
            if (code === REQUEST_SUCCESS) {
                // 将接口数据格式化成state需要的格式，ps：后端不要改返回的格式啊，好烦
                let relationProductList = {
                    listAndroid: [],
                    listIos: [],
                },
                    relationedProductIds = { android: [], ios: [] };

                data.list && data.list.length > 0 && data.list.forEach((item) => {
                    let { appVersionType, productId } = item;
                    if (appVersionType === 1) {
                        relationProductList.listAndroid.push(item);
                        relationedProductIds.android.push(productId)
                    } else if (appVersionType === 2) {
                        relationProductList.listIos.push(item);
                        relationedProductIds.ios.push(productId)
                    } else {
                        relationProductList.listAndroid.push(item);
                        relationProductList.listIos.push(item);
                        relationedProductIds.ios.push(productId)
                        relationedProductIds.android.push(productId)
                    }
                });
                this.setState(() => {
                    return { relationProductList, relationedProductIds };
                });
            }
        });
    };

    // 获取详情接口
    _getAppInfo = (appId) => {
        post(Paths.getAppDetail5x, {
            appId,
        }, { loading: true }).then((res) => {
            const code = res.code;
            const data = res.data;
            if (code === REQUEST_SUCCESS) {
                // 将appInfo构造成antd需要的格式
                let antdAppInfo = {};
                let appInfo = _.cloneDeep(data);
                texts[2].targetName = appInfo.appName;
                for (let key of Object.keys(appInfo)) {
                    antdAppInfo[key] = {
                        value: appInfo[key],
                    }
                }
                let { androidPkg, iosBundleId, appType } = appInfo;
                this.setState((preState) => {
                    return {
                        appInfo: { ...preState.appInfo, ...antdAppInfo },
                        currentAppType: !androidPkg && iosBundleId ? 2 : 1,
                    };
                });
                if (appType === 0 || appType === 2) {
                    this._getRelaProducts(appId);
                    this._getVersionList({
                        ...initPager,
                        pageRows: 5,
                    });
                }
            }
        });
    };

    updateOkHandle = (type) => {
        let { curProductID, curAppVersionId } = this.state;
        if (type === 'relationProduct') {
            this.deleteRelationProduct(curProductID);
        } else if (type === 'appVersion') {
            this.deleteAppVersion(curAppVersionId);
        } else {
            this.deleteApp();
        }
    };

    updateCancelHandle = (type) => {
        this.changeState(type);
    };

    showDialog = (dialogType, curIdType, id, targetType, targetTypeValue) => {
        if (targetType === 'targetName') {
            texts[1].targetName = targetTypeValue;
        }
        if (targetType === 'versionTargetName') {
            texts[2].targetName = targetTypeValue;
        }
        this.setState((preState) => {
            if (curIdType || id) {
                return {
                    [dialogType]: !preState[dialogType],
                    [curIdType]: id
                };
            }
            return {
                [dialogType]: !preState[dialogType],
            };
        });
    };

    // 删除关联信息
    deleteRelationProduct = (productId) => {
        post(Paths.deleteAppRelaProducts5x, {
            productId,
            appId: Number(this.state.appId),
            appType: Number(this.state.currentAppType),
        }, { loading: true }).then((res) => {
            const code = res.code;
            if (code === REQUEST_SUCCESS) {
                this.setState((preState) => {
                    return { showDeleteDialog: !preState.showDeleteDialog };
                }, () => {
                    this._getRelaProducts(this.state.appId)
                });
            }
        });
    };

    // 删除版本信息
    deleteAppVersion = (appVersionId) => {
        post(Paths.deleteAppVersion5x, {
            appVersionId,
            appType: this.state.deleteAppVersionItem.appType
        }, { loading: true }).then((res) => {
            const code = res.code;
            if (code === REQUEST_SUCCESS) {
                Notification({ description: '删除成功！', type: 'success' })
                this.setState((preState) => {
                    return { showDeleteDialog: !preState.showDeleteDialog };
                }, () => {
                    this._getVersionList({
                        ...initPager,
                        pageRows: 5,
                    });
                });
            }
        });
    };

    // 保存关联的产品
    updateRelaProduct = (productIds) => {
        let { appId, currentAppType } = this.state;
        post(Paths.updateRelaProduct5x, {
            productIds: [...productIds],
            appId: Number(appId),
            appType: Number(currentAppType),
        }, { loading: true, needJson: true, noInstance: true }).then((res) => {
            const code = res.code;
            if (code === REQUEST_SUCCESS) {
                this.setState((preState) => {
                    return { showAddProductRelationDialog: !preState.showAddProductRelationDialog };
                }, () => {
                    Notification({
                        message: '关联成功',
                        description: '产品关联成功',
                        type: 'success'
                    });
                    this._getRelaProducts(appId);
                });
            }
        });
    };

    changeState = (type) => {
        this.setState((preState) => {
            return {
                [type]: !preState[type],
            };
        });
    };

    // 编辑版本信息-获取详情
    getAppVersionDetail = (curAppVersionId) => {
        post(Paths.getAppVersionDetail5x, {
            appVersionId: curAppVersionId,
        }, { loading: true }).then((res) => {
            const code = res.code;
            const data = res.data;
            if (code === REQUEST_SUCCESS) {
                this.setState(() => {
                    return { curAppVersionDetail: data }
                }, () => {
                    this.showDialog('showAppVersionDialog', 'curAppVersionId', curAppVersionId)
                });
            }
        });
    };

    _getAppTypeHTML = () => {
        let { appInfo, currentAppType } = this.state;
        let { androidPkg, iosBundleId, appType } = appInfo;
        let appTypeAndroidHTML = '';
        let appTypeIosHTML = '';
        let weChatHTML = '';
        if (appType.value === 0) {
            appTypeAndroidHTML = (
                <Button onClick={() => this.handleChange('currentAppType', 1)}
                    type={currentAppType === 1 ? 'primary' : 'default'}
                    ghost={currentAppType === 1}>Android端</Button>
            )

            appTypeIosHTML = (
                <Button onClick={() => this.handleChange('currentAppType', 2)}
                    type={currentAppType === 2 ? 'primary' : 'default'}
                    ghost={currentAppType === 2}>iOS端</Button>
            )
        } else {
            weChatHTML = (<Button type={'primary'} ghost >小程序</Button>);
        }
        return { appTypeAndroidHTML, appTypeIosHTML, weChatHTML }
    };

    // 创建应用版本
    addNewVersion = () => {
        this.setState({ curAppVersionId: null })
        let { versionList } = this.state,
            { appVersionMaxNum = 0, currentNum = 0 } = versionList;
        if (currentNum >= appVersionMaxNum) {
            return Notification({ description: `最多只能创建${appVersionMaxNum}个应用版本` })
        }
        this.showDialog('showAppVersionDialog', 'curAppVersionDetail', {})
    }

    getAntDVersionList = () => {
        let { versionList } = this.state;
        let antDVersionList = versionList.list.slice();
        antDVersionList.forEach((item, index) => {
            item.key = item.appVersionId;
        });
        let columns = [{
            title: '版本号',
            dataIndex: 'externalVersion',
            key: 'externalVersion',
        }, 
        {
            title: '版本类型',
            dataIndex: 'appType',
            key: 'appType',
            render: (appType) => {
                return (<div className="version-type">{Number(appType) === 1 ? 'Android' : 'iOS'}</div>)
            }
        }, {
            title: '升级方式',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return (<div className="upgrade">{Number(status) === 1 ? '普通升级' : '强制升级'}</div>)
            }
        }, {
            title: '创建时间',
            dataIndex: 'releaseTime',
            key: 'releaseTime',
            render(releaseTime) {
                return releaseTime ? DateTool.utcToDev(releaseTime) : '--';
            }
        }, {
            title: '操作',
            dataIndex: 'opt',
            key: 'opt',
            render: (text, record) => {
                return (
                    <div>
                        <a onClick={() => this.getAppVersionDetail(record.appVersionId)}>编辑</a>
                        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <a onClick={() => {
                            this.setState({
                                deleteAppVersionItem: record
                            })
                            this.showDialog('showDeleteDialog', 'curAppVersionId', record.appVersionId, 'versionTargetName', record.externalVersion)
                        }}
                        >删除</a>
                    </div>
                )
            }
        }];
        return {
            antDVersionList,
            columns,
        }
    };

    render() {
        let {
            showDeleteDialog, versionPublishJurisdiction, relationProductJurisdiction, versionList,
            showAppVersionDialog, showAddProductRelationDialog, currentAppType, showSecret,
            appInfo, relationProductList, showEditAppForm
        } = this.state;
        let {
            appId, appName, appSecret, appType, iosBundleId, androidPkg, appDesc,
            androidSchema, iosSchema, appIconLow
        } = appInfo;
        let currentTab = Number(this.state.currentTab);
        let deleteType = currentTab === 1 ? 'relationProduct' : 'appVersion';

        let appSecretText = showSecret ? appSecret.value : strToAsterisk(appSecret.value, 10);
        let relationProductListType = currentAppType === 1 ? relationProductList.listAndroid : relationProductList.listIos;
        let { pager } = versionList;
        let appTypeHTML = this._getAppTypeHTML();

        const { antDVersionList, columns } = this.getAntDVersionList();
        return (
            <section className="application-detail-wrapper flex-column">
                <header className="application-detail-header">
                    <PageTitle backTitle='应用详情'>
                        <DetailInHeader className="clearfix">
                            <span className="fl app-name">应用名称：{appName.value}</span>
                            <span className="fl app-id">APPID：{appId.value}</span>
                            <span className="fl app-secret">
                                APPSecret：{strToAsterisk(appSecret.value, 10)}
                            </span>
                        </DetailInHeader>
                    </PageTitle>
                </header>
                <div className="antd-content flex-column flex1">
                    <Tabs defaultActiveKey="0" onChange={(activeKey) => this.handleChange('currentTab', activeKey)}
                        tabBarStyle={{ background: "#fff", padding: "0 24px" }}>
                        <TabPane tab="基础信息" key="0">
                            {showEditAppForm ? <div className="application-detail-content flex1">
                                <Button type="primary" className="edit-app"
                                    onClick={() => this.changeState('showEditAppForm')}>
                                    编辑应用
                                </Button>
                                <Row gutter={8} className="detail-line">
                                    <Col span={2} className="detail-left">应用名称：</Col>
                                    <Col span={10} className="detail-right">{appName.value}</Col>
                                </Row>
                                <Row gutter={8} className="detail-line">
                                    <Col span={2} className="detail-left">应用类型：</Col>
                                    <Col span={21} className="detail-right">
                                        {appType.value === 0 ? '移动应用' : '小程序应用'}
                                    </Col>
                                </Row>
                                <Row gutter={8} className="detail-line">
                                    <Col span={2} className="detail-left">APPID：</Col>
                                    <Col span={21} className="detail-right">
                                        {appId.value}&nbsp;&nbsp;&nbsp;
                                        <Tooltip
                                            title={'由系统自动分配的APP唯一标识码'}
                                            placement="top">
                                            <QuestionCircleOutlined className="tooltip-icon" />
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Row gutter={8} className="detail-line">
                                    <Col span={2} className="detail-left">APPSecret：</Col>
                                    <Col span={21} className="detail-right">
                                        {appSecretText}
                                        {
                                            showSecret ?
                                                <EyeInvisibleOutlined className="eye-icon" onClick={() => this.changeState('showSecret')} /> :
                                                <EyeOutlined className="eye-icon" onClick={() => this.changeState('showSecret')} />
                                        }&nbsp;&nbsp;&nbsp;
                                        <Tooltip
                                            title={'由系统自动分配的密码'}
                                            placement="top">
                                            <QuestionCircleOutlined className="tooltip-icon" />
                                        </Tooltip>
                                        {/* <span className="secret-desc">由系统自动分配的密码</span> */}
                                    </Col>
                                </Row>
                                <Row gutter={8} className="detail-line app-icon">
                                    <Col span={2} className="detail-left">应用图标：</Col>
                                    <Col span={21} className="detail-right">
                                        <ProductIcon icon={appIconLow.value} />
                                    </Col>
                                </Row>
                                <Row gutter={8} className="detail-line app-package">
                                    <Col span={2} className="detail-left">应用包：</Col>
                                    <Col span={21} className="detail-right">
                                        <div className="android clearfix">
                                            {androidPkg.value && <div className="android-package fl">
                                                {androidPkg.value} - Android版
                                            </div>}
                                            {androidSchema && androidSchema.value && <div className="android-schema fl">
                                                分享Schema为 ：{androidSchema && androidSchema.value}
                                            </div>}
                                        </div>
                                        <div className="ios clearfix">
                                            {iosBundleId.value && <div className="ios-package fl">
                                                {iosBundleId.value} - iOS版
                                            </div>}
                                            {iosSchema && iosSchema.value && <div className="ios-schema fl">
                                                分享Schema为 ：{iosSchema && iosSchema.value}
                                            </div>}
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={8} className="detail-line">
                                    <Col span={2} className="detail-left">构建模式：</Col>
                                    <Col span={21} className="detail-right">开发模式</Col>
                                </Row>
                                <Row gutter={8} className="detail-line">
                                    <Col span={2} className="detail-left">应用简介：</Col>
                                    <Col span={21} className="detail-right">{appDesc.value}</Col>
                                </Row>
                            </div> :
                                <div className="application-detail-content">
                                    <EditApplicationForm
                                        appInfo={appInfo}
                                        saveAppBaseInfo={this.saveAppInfo}
                                        handleCancel={this.changeState} />
                                </div>}
                        </TabPane>
                        {relationProductJurisdiction ?
                            <TabPane tab="关联产品" key="1">
                                <div className="application-detail-content flex-column flex1">
                                    <div className="content flex-column clearfix">
                                        <div className="content-header">
                                            <div className="app-type">
                                                {appTypeHTML.appTypeAndroidHTML}
                                                {appTypeHTML.appTypeIosHTML}
                                                {appTypeHTML.weChatHTML}
                                            </div>
                                            <Button type="primary" className="add-relation"
                                                onClick={() => this.showDialog('showAddProductRelationDialog')}>添加</Button>
                                        </div>
                                        {(true) ?
                                            <ul className={`product-list flex1`}>
                                                {(relationProductListType && relationProductListType.length > 0) ? relationProductListType.map((item, index) => {
                                                    let { productId, productName, productIcon } = item;
                                                    return <li key={index} className="list-item flex-column">
                                                        <i className="product-pic">
                                                            <ProductIcon icon={productIcon} />
                                                        </i>
                                                        <div className="product-name single-text flex1 flex-row">
                                                            {productName}
                                                        </div>
                                                        <div className="product-id flex-row flex1">
                                                            {productId}
                                                        </div>
                                                        <a
                                                            onClick={() => this.showDialog('showDeleteDialog', 'curProductID', productId, 'targetName', productName)}
                                                            className="delete-product-relation">
                                                            <MyIcon style={{ fontSize: 20 }} type="icon-shanchu" />
                                                        </a>
                                                    </li>
                                                }) : <NoSourceWarn />}
                                            </ul> : <NoSourceWarn />}
                                    </div>
                                </div>
                            </TabPane> : null}
                        {versionPublishJurisdiction && appType.value == 0 ?
                            <TabPane tab="版本发布" key="2">
                                <div className="application-detail-content flex-column flex1">
                                    {
                                        <div className="add-version-wrapper">
                                            <h5>版本历史</h5>
                                            <Button className="add-version" type="primary"
                                                onClick={this.addNewVersion}>
                                                创建应用版本</Button>
                                        </div>
                                    }
                                    <Table
                                        className="version-content"
                                        dataSource={antDVersionList}
                                        columns={columns}
                                        pagination={{
                                            onChange: this.onChange,
                                            defaultCurrent: 1,
                                            current: pager.pageIndex,
                                            pageSize: pager.pageRows,
                                            total: pager.totalRows,
                                            showSizeChanger: false,
                                            showQuickJumper: pager.totalPages > 5
                                        }}
                                    />
                                </div>
                            </TabPane>
                            : null}
                        <TabPane tab="推送设置" key="3" >
                            <PushMsgConfig appId={this.state.appId} currentTab={currentTab}/>
                        </TabPane>
                    </Tabs>
                </div>
                {showDeleteDialog &&
                    <ActionConfirmModal
                        visible={showDeleteDialog}
                        modalOKHandle={() => this.updateOkHandle(deleteType)}
                        modalCancelHandle={() => this.updateCancelHandle('showDeleteDialog')}
                        targetName={texts[currentTab].targetName}
                        title={texts[currentTab].title}
                        descText={texts[currentTab].desc}
                        needWarnIcon={true}
                        tipText={texts[currentTab].tip}
                    />
                }
                {/* 添加关联产品 */}
                {showAddProductRelationDialog &&
                    <AddProductRelationModal
                        {...this.state}
                        showDialog={this.showDialog}
                        updateRelaProduct={this.updateRelaProduct}
                    />
                }
                {/* 创建应用版本、编辑应用版本 */}
                {showAppVersionDialog &&
                    <AddAppVersionForm
                        {...this.state}
                        showDialog={this.showDialog}
                        createAppVersion={this.createAppVersion}
                    />
                }
            </section>
        );
    }
}

export default withRouter(ApplicationDetail)
