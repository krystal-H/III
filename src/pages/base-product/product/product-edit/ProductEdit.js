import React, { useEffect, useState } from 'react'
import { Switch, Redirect, Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Steps, Button, message } from 'antd';

import { getProductBaseInfo } from '../store/ActionCreator';
import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
import ProductLinks from './product-links/ProductLinks';
import './ProductEdit.scss'

import ProductProtocols from './product-protocols/ProductProtocols';
import ProductServices from './product-services/ProductServices';
import { CommercialInfo } from './commercialInformation/CommercialInfo';
import ApplyRelease from './commercialInformation/ApplyRelease';
import ProductInfo from './product-info/ProductInfo';
import PageTitle from '../../../../components/page-title/PageTitle';
import Hardware from './firmware/Hardware';
import ConfirmPanel from './firmpanel';
import Validation from './validation'


// 此部分路由不需要展示产品信息
const NOT_SHOW = /(\/service\/appcontrol|cloudtime|scenelink)|\/applyRelease/;

const mapStateToProps = state => {
    return {
        productBaseInfo: state.getIn(['product', 'productBaseInfo']).toJS()
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductBaseInfo: id => dispatch(getProductBaseInfo(id)) // 获取产品基本信息
    }
}

// 获取路由中的ID参数
const getProductIdFromPath = (match) => +match.params.id;


function ProductEdit({ productBaseInfo, getProductBaseInfo, match, location, history }) {
    let { path } = match,
        { pathname = '' } = location,
        showTitle = !NOT_SHOW.test(pathname),
        productIdInRoutePath = getProductIdFromPath(match),
        { mode } = productBaseInfo,
        canOperate = (mode === 0);

    // let history = useHistory();

    const { Step } = Steps;
    const stepList = [
        {
            title: '定义功能',
            content: 'protocols',
        },
        {
            title: '确定面板',
            content: 'firmpanel',
        },
        {
            title: '开发硬件',
            content: 'projectSelect',
        },
        {
            title: '配置服务',
            content: 'service',
        },
        {
            title: '调试验证',
            content: 'validation',
        },
    ];
    let origincurrent = 0
    stepList.forEach((item, index) => {
        if (item.content == location.pathname.split('/')[6]) {
            origincurrent = index
        }
    })
    const [current, setcurrent] = useState(origincurrent);
    //下一步
    const next = () => {
        setcurrent(current + 1);
    };
    //上一步
    const prev = () => {
        setcurrent(current - 1);
    };
    useEffect(() => {
    }, [productIdInRoutePath])
    //tab切换
    useEffect(() => {
        if (location.pathname.split('/')[6] != stepList[current].content) {
            history.push(match.url + '/' + stepList[current].content);
        }

    }, [current])
    if (!productIdInRoutePath) {
        return <NoSourceWarn tipText="没有传入产品ID哦"></NoSourceWarn>
    }

    return (
        <React.Fragment>
            <div className="eidt-wrapper">
                <div className='product_title_wrap'>
                    <PageTitle title='开发流程' />
                    {/* <ProductLinks productId={productIdInRoutePath}></ProductLinks> */}
                    <div className='product_title_baseinfo'>
                        <div className='product_title_baseinfo_name'>
                            <div>睡眠监测器</div>
                            <a>编辑</a>
                        </div>
                        <div className='product_title_baseinfo_list'>
                            <div>
                                <div>品类：</div>
                                <div>睡眠监测</div>
                            </div>
                            <div>
                                <div>产品ID：</div>
                                <div>睡眠监测</div>
                            </div>
                            <div>
                                <div>通讯协议：</div>
                                <div>睡眠监测</div>
                            </div>
                            <div>
                                <div>产品编码：</div>
                                <div>睡眠监测</div>
                            </div>
                            <div>
                                <div>产品密钥：</div>
                                <div>睡眠监测</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='product-main-wrap'>
                    <div className='product-main-wrap_step'>
                        <Steps current={current}>
                            {stepList.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                    </div>
                    <Switch>
                        <Route path={`${path}/protocols`} render={(props) => <ProductProtocols {...props} canOperate={canOperate} productId={productIdInRoutePath}></ProductProtocols>}></Route>
                        <Route path={`${path}/firmpanel`} render={(props) => <ConfirmPanel {...props} canOperate={canOperate} getProductBaseInfo={getProductBaseInfo} productId={productIdInRoutePath}></ConfirmPanel>}></Route>
                        <Route path={`${path}/projectSelect`} render={(props) => <Hardware {...props} canOperate={canOperate} productId={productIdInRoutePath}></Hardware>}></Route>
                        <Route path={`${path}/service`} render={(props) => <ProductServices {...props} canOperate={canOperate} productId={productIdInRoutePath}></ProductServices>}></Route>
                        <Route path={`${path}/validation`} render={(props) => <Validation {...props} canOperate={canOperate} productId={productIdInRoutePath}></Validation>}></Route>
                        <Redirect to={`${path}/protocols`} />
                    </Switch>
                </div>
                <div className='product-main-footer'>
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            上一步
                        </Button>
                    )}
                    {current < stepList.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            下一步
                        </Button>
                    )}

                    {current === stepList.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)