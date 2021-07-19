import React, { useEffect, useState, useRef, useCallback } from 'react'
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
import Hardware from './firmware/hardware';
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
    //当前tab
    const [current, setcurrent] = useState(origincurrent);
    //
    const refOne = useRef()
    const refTwo = useRef()
    const [refThree, setRefThree] = useState('');
    const [refFour, setRefFour] = useState('');

    // const refArr = {
    //     active_0: useRef(),
    //     active_1: useRef(),
    //     active_2: useRef(),
    //     active_3: useRef(),
    //     active_4: useRef(),
    // }
    //下一步
    const [isContinue, setIsContinue] = useState(false);
    const next = () => {
        // if (current < 2) {
        //     refArr['active_' + current].current.onFinish()
        // }
        if (current == 0) {
            refOne.current.onFinish()
        } else if (current == 1) {
            refTwo.current.onFinish()
        } else if (current == 2) {
            console.log(refThree,'aaaa')
            // refThree.onFinish()
        } else if (current == 3) {
            refFour.onFinish()
        }
        // console.log(refArr['active_' + current], '====',refThree)
    };
    const nextStep = useCallback(() => {
        setcurrent(current + 1)
    });
    //上一步
    const prev = () => {
        setcurrent(current - 1);
    };
    //tab切换
    useEffect(() => {
        if (location.pathname.split('/')[6] != stepList[current].content) {
            history.push(match.url + '/' + stepList[current].content);
        }
    }, [current])
    if (!productIdInRoutePath) {
        return <NoSourceWarn tipText="没有传入产品ID哦"></NoSourceWarn>
    }
    const titleCom = (<div className='product_title_baseinfo_list'>
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
    </div>)
    return (
        <React.Fragment>
            <div className="eidt-wrapper">
                <PageTitle title='开发流程' titleTag='免开发方案' btnTxt='编辑' backTitle='开发流程'  >

                    {titleCom}

                </PageTitle>
                <div className='product-main-wrap comm-shadowbox'>
                    <div className='product-main-wrap_step'>
                        <Steps current={current}>
                            {stepList.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                    </div>
                    <Switch>
                        <Route path={`${path}/protocols`} render={(props) => <ProductProtocols ref={refOne} isContinue={isContinue} {...props} nextStep={nextStep} canOperate={canOperate} productId={productIdInRoutePath}></ProductProtocols>}></Route>
                        <Route path={`${path}/firmpanel`} render={(props) => <ConfirmPanel ref={refTwo} isContinue={isContinue} {...props} nextStep={nextStep} canOperate={canOperate} getProductBaseInfo={getProductBaseInfo} productId={productIdInRoutePath}></ConfirmPanel>}></Route>
                        <Route path={`${path}/projectSelect`} render={(props) => <Hardware onRef={(ref) => { setRefThree(ref) }} isContinue={isContinue} {...props} nextStep={nextStep} canOperate={canOperate} productId={productIdInRoutePath}></Hardware>}></Route>
                        <Route path={`${path}/service`} render={(props) => <ProductServices onRef={(ref) => { setRefFour(ref) }} isContinue={isContinue} {...props} nextStep={nextStep} canOperate={canOperate} productId={productIdInRoutePath}></ProductServices>}></Route>
                        <Route path={`${path}/validation`} render={(props) => <Validation ref={refArr.active_4} isContinue={isContinue} {...props} nextStep={nextStep} canOperate={canOperate} productId={productIdInRoutePath}></Validation>}></Route>
                        <Redirect to={`${path}/protocols`} />
                    </Switch>
                </div>
                <div className='product-main-footer'>
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()} type="primary" ghost>
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
                            发布产品
                        </Button>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)