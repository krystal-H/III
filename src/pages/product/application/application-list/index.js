import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Input, Pagination, Button } from 'antd';
import ApplicationCard from './application-card/ApplicationCard';
import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
import { CheckPermissions } from '../../../../components/CheckPermissions';
import { get, Paths, post } from '../../../../api';
import { REQUEST_SUCCESS } from '../../../../configs/request.config';
import PageTitle from '../../../../components/page-title/PageTitle';
import DescWrapper from '../../../../components/desc-wrapper/DescWrapper';
import { Notification } from '../../../../components/Notification';
import { InfoCircleFilled } from '@ant-design/icons';

import './style.scss';

const { Search } = Input;
const initPager = {
    pageRows: 4,
    pageIndex: 1,
};

export default class Application extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            application: {
                appMaxNum: 100,
                currentNum: 25,
                list: [
                    {
                        androidDownUrl: null,
                        apkResult: 1,
                        appCopyright: null,
                        appDesc: "健康人居事业部试衣镜项目健康人居事业部试衣镜项目健康人居事业部试衣镜项目",
                        appEngDesc: null,
                        appEngName: null,
                        appFaq: null,
                        appIconHigh: null,
                        appIconLow: "",
                        appId: 31689,
                        appMode: 1,
                        appName: "试衣镜",
                        appPrivacy: null,
                        appSecret: "7e3cee171b304b25817cbcd5cd2c75be",
                        appType: 0,
                        appVersionType: 0,
                        appleId: null,
                        createTime: "2021-08-04 08:58:42",
                        ct: 1628038722000,
                        developerId: 1,
                        developerName: "深圳和而泰智能控制股份有限公司",
                        iosDownUrl: null,
                        ipWhitelist: null,
                        isEnable: 1,
                        isValid: null,
                        productId: null,
                        qrcode: "http://fileserver1.clife.net/group1/M01/F8/A0/CvtlhmEKVsKAMBZ8AAAJDPRFiQw893.png",
                        secret: null,
                        softIntroduce: null,
                        statu: 1,
                        updateTime: 1628038722000,
                        weChatAppId: null,
                    },
                ],
                pager: {
                    currPageRows: 4,
                    defaultPageRows: 20,
                    hasNextPage: true,
                    hasPrevPage: false,
                    pageEndRow: 3,
                    pageIndex: 1,
                    pageRows: 4,
                    pageStartRow: 0,
                    paged: false,
                    totalPages: 32,
                    totalRows: 125,
                },
            },
            searchValue: '',
            createAppJurisdiction: '创建应用', // CheckPermissions('创建应用'),
        }
    }

    componentDidMount = () => {
        this._getApplicationList(initPager);
    };

    // 翻页
    onChange = pageNumber => {
        this._getApplicationList({
            ...initPager,
            pageIndex: pageNumber,
            appName: this.state.searchValue,
        });
    };

    // 搜索应用
    searchApplication = (value) => {
        this.setState(() => {
            return { searchValue: value };
        }, () => {
            this._getApplicationList({ ...initPager, appName: value });
        });
    };

    // 获取应用列表
    _getApplicationList = (params) => {
        get(Paths.getApplicationList, {
            ...params
        }, { loading: true }).then((res) => {
            const code = res.code;
            const data = res.data;
            if (code === REQUEST_SUCCESS) {
                this.setState(() => {
                    return { application: data };
                });
            }
        });
    };

    // 删除应用
    deleteApp = (appId) => {
        post(Paths.deleteApp, {
            appId: Number(appId),
        }, { loading: true }).then((res) => {
            const code = res.code;
            if (code === REQUEST_SUCCESS) {
                Notification({
                    message: '删除成功',
                    description: '应用删除成功',
                    type: 'success'
                });

                this._getApplicationList(initPager);
            }
        });
    };

    _getApplicationListHTML = () => {
        let { application } = this.state;
        return application.list && application.list.length > 0 ? application.list.map((item, index) => {
            return (
                <div className="list-item" key={item.appId}>
                    <ApplicationCard deleteApp={this.deleteApp} Info={item} />
                </div>
            );
        }) : <NoSourceWarn style={{ margin: 'auto' }} />;
    };

    addNewApplication = () => {
        let { application = {} } = this.state,
            { appMaxNum = 0, currentNum = 0 } = application;

        if (currentNum >= appMaxNum) {
            Notification({
                description: `最多只能创建${appMaxNum}个应用！`
            })
            return
        }

        window.location.hash = '/open/app/add';
    }

    render() {
        let { application, createAppJurisdiction } = this.state;
        let { list, pager } = application;
        let listWrapperClassName = list.length <= 5 ? "lists-wrapper flex-row flex1" : "lists-wrapper flex-row flex1 six-item";
        let desc = (
            <h6>C-Life平台提供完善的应用开发管理服务。您可以构建自主品牌的APP终端应用或小程序应用，您可以在这里对应用进行统一管理。
                {/* &nbsp;&nbsp;<a href="https://opendoc.clife.cn/book/content?documentId=88&identify=develop" target='_blank'>获取开发指导</a>&nbsp;&nbsp; */}
                {/* <a href="https://opendoc.clife.cn/download" target='_blank' >下载SDk</a> */}
            </h6>
        );
        return (
            <section className="application-wrapper flex-column">
                <PageTitle title="应用管理" />
                <div className="application-content-wrapper flex-column flex1">
                    {/* 搜索 */}
                    <div className="application-search">
                        <div className="application-header-input-wrapper searchBox">
                            <Search placeholder="请输入应用名称查找"
                                enterButton
                                maxLength={100}
                                onSearch={value => this.searchApplication(value)}
                            />
                        </div>
                        <div className='butFloatRight'>
                            {createAppJurisdiction ?
                                <Button type="primary"
                                    onClick={this.addNewApplication}
                                    className="application-header-add">创建应用</Button>
                                : null}
                        </div>
                    </div>
                    {/* 内容 */}
                    <div className="application-content flex-column">
                        <div className="application-content-tip">
                            <InfoCircleFilled className="icon" />
                            <span>{desc}</span>
                        </div>
                        <section className={listWrapperClassName}>
                            {this._getApplicationListHTML()}
                        </section>
                        <footer className="application-list-pagination">
                            {
                                pager && pager.totalRows &&
                                <Pagination
                                    className="self-pa"
                                    total={pager.totalRows}
                                    current={pager.pageIndex}
                                    defaultCurrent={1}
                                    defaultPageSize={pager.pageRows}
                                    onChange={(page) => this.onChange(page)}
                                    pageSize={pager.pageRows}
                                    showTotal={total => <span>共 <a>{total}</a> 条</span>}
                                    showQuickJumper
                                    hideOnSinglePage
                                />
                            }
                        </footer>
                    </div>
                </div>
            </section>
        )
    }
}
