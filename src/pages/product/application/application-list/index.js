import React, { PureComponent } from 'react';
import { Input, Pagination, Button } from 'antd';
import ApplicationCard from './ApplicationCard';
import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
import { Paths, post } from '../../../../api';
import { REQUEST_SUCCESS } from '../../../../configs/request.config';
import PageTitle from '../../../../components/page-title/PageTitle';
import { Notification } from '../../../../components/Notification';
import { InfoCircleFilled } from '@ant-design/icons';

import './style.scss';

const { Search } = Input;
const initPager = {
    pageRows: 9,
    pageIndex: 1,
};

export default class Application extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            application: {
                list: [],
                pager: {},
            },
            searchValue: '',
            createAppJurisdiction: '创建应用',
        }
    }

    componentDidMount = () => {
        this._getApplicationList(initPager)
    }

    // 防止内存泄漏
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }

    // 翻页
    onChange = pageNumber => {
        this._getApplicationList({
            ...initPager,
            pageIndex: pageNumber,
            appName: this.state.searchValue,
        })
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
        post(Paths.getAppInfoList, {
            ...params
        }, { loading: true }).then((res) => {
            const code = res.code
            const data = res.data
            if (code === REQUEST_SUCCESS) {
                this.setState(() => {
                    return { application: data }
                })
            }
        })
    }

    // 删除应用
    deleteApp = (appId) => {
        post(Paths.deleteApp5x, {
            appId: Number(appId),
        }, { loading: true }).then((res) => {
            const code = res.code
            if (code === REQUEST_SUCCESS) {
                Notification({ description: '应用删除成功！', type: 'success' })
                this._getApplicationList(initPager)
            }
        })
    }

    _getApplicationListHTML = () => {
        let { application } = this.state;
        return application.list && application.list.length > 0 ? application.list.map((item, index) => {
            return (
                <div className="list-item" key={item.appId}>
                    <ApplicationCard deleteApp={this.deleteApp} Info={item} />
                </div>
            )
        }) : <NoSourceWarn style={{ margin: 'auto' }} />
    }

    // 创建应用
    addNewApplication = () => {
        let { application = {} } = this.state,
            { appMaxNum = 0, currentNum = 0 } = application
        if (currentNum >= appMaxNum) {
            return Notification({ description: `最多只能创建${appMaxNum}个应用！` })
        }
        window.location.hash = '/open/app/add'
    }

    render() {
        let { application, createAppJurisdiction } = this.state;
        let { list, pager = {} } = application;
        let listWrapperClassName = list.length <= 5 ? "lists-wrapper flex-row flex1" : "lists-wrapper flex-row flex1 six-item";
        let desc = (
            <h6>C-Life平台提供完善的应用开发管理服务。您可以构建自主品牌的APP终端应用或小程序应用，您可以在这里对应用进行统一管理。
            </h6>
        )
        return (
            <section className="application-wrapper flex-column">
                <PageTitle title="应用管理" />
                <div className="application-content-wrapper flex-column flex1">
                    {/* 搜索 */}
                    <div className="application-search">
                        <div className="application-header-input-wrapper comm-searchBox">
                            <Search placeholder="请输入应用名称查找"
                                allowClear
                                maxLength={100}
                                onSearch={value => this.searchApplication(value)} />
                        </div>
                        <div className='butFloatRight'>
                            {createAppJurisdiction ?
                                <Button type="primary"
                                    onClick={this.addNewApplication}
                                    className="application-header-add">创建应用</Button>
                                : null
                            }
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
                                Object.keys(pager).length > 0 &&
                                <Pagination
                                    className="self-pa"
                                    total={pager.totalRows}
                                    current={pager.pageIndex}
                                    defaultCurrent={1}
                                    defaultPageSize={pager.pageRows}
                                    onChange={(page) => this.onChange(page)}
                                    pageSize={pager.pageRows}
                                    showTotal={total => <span>共 <a>{total}</a> 条</span>}
                                    hideOnSinglePage
                                    showSizeChanger={false}
                                    showQuickJumper={pager.totalPages > 5}
                                />
                            }
                        </footer>
                    </div>
                </div>
            </section>
        )
    }
}
