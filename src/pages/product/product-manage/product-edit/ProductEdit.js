import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Switch, Redirect, Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Steps, Button, message } from 'antd';

import { getProductBaseInfo } from '../store/ActionCreator';
import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
import './ProductEdit.scss'

import ProductProtocols from './product-protocols/index.js';
import PageTitle from '../../../../components/page-title/PageTitle';
import Hardware from './dev-hardware';
import ConfirmPanel from './firmpanel';
import Validation from './validation'
import ConfigService from './config-service';
import TitleSet from './titleSet'
import { MyContext } from './context'
import { Notification } from '../../../../components/Notification';
import { strToAsterisk, DateTool } from '../../../../util/util';
import {
    EyeInvisibleTwoTone,
    EyeTwoTone,
} from '@ant-design/icons';

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


function ProductEdit({ productBaseInfo, getProductBaseInfo, match, location }) {
    // let productItem = {}
    const [productItem,setProductItem]=useState( sessionStorage.getItem('productItem') ? JSON.parse(sessionStorage.getItem('productItem')) : {})
    let history = useHistory();
    // if (sessionStorage.getItem('productItem')) {
    //     productItem = JSON.parse(sessionStorage.getItem('productItem'))
    // } else {
    //     return <NoSourceWarn tipText="没有传入产品ID哦"></NoSourceWarn>
    // }
    let { path } = match,
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
            content: 'configService',
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
    const refArr = {
        active_0: useRef(),
        active_1: useRef(),
        active_2: useRef(),
        active_3: useRef(),
        active_4: useRef(),
    }
    //下一步
    const [isContinue, setIsContinue] = useState(false);
    const next = () => {
        if (current === 2) {
            refArr['active_' + current].onFinish()
        } else {
            refArr['active_' + current].current.onFinish()
        }
    };
    // 发布产品
    const releaseProduct = () => {
        refArr['active_' + current].current.showRelease()
    }
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
    const [showSecret, setShowSecret] = useState(false)
    const changeState = () => {
        setShowSecret(!showSecret)
    }
    const showText = (value) => {
        value = showSecret ? value : strToAsterisk(value, 10)
        return value
    }
    //标题修改
    const [titleVisible, setTitleVisible] = useState(false)
    const openTitle = () => {
        setTitleVisible(true)
    }
    const onCloseTitle = () => {
        setTitleVisible(false)
    }
    const onOkClose=(data)=>{
        setProductItem(data)
        sessionStorage.setItem('productItem',JSON.stringify(data))
        Notification({
            type: 'success',
            description: '更新成功！',
        });
        setTitleVisible(false)
    }
    const titleCom = (<div className='product_title_baseinfo_list'>
        <div>
            <div>品类：</div>
            <div>{productItem.deviceType}</div>
        </div>
        <div>
            <div>产品ID：</div>
            <div>{productItem.productId}</div>
        </div>
        <div>
            <div>通讯协议：</div>
            <div>{productItem.bindTypeStr}</div>
        </div>
        <div>
            <div>产品编码：</div>
            <div>{productItem.code}</div>
        </div>
        <div>
            <div>产品密钥：</div>
            <div>{showText(productItem.deviceKey)}
            <span onClick={changeState}>
                    {
                        showSecret ? <EyeInvisibleTwoTone /> : <EyeTwoTone />
                    }
                </span>
            </div>
        </div>
    </div>)
    return (
        <React.Fragment>
            <div className="eidt-wrapper">
                <PageTitle title={productItem.productName} titleTag={productItem.schemeName} btnTxt='编辑' backTitle='开发流程' btnClickHandle={openTitle} >

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
                    <MyContext.Provider value={{ productIdInRoutePath }}>
                        <Switch>
                            <Route path={`${path}/protocols`} render={(props) => <ProductProtocols ref={refArr.active_0} isContinue={isContinue} {...props} nextStep={nextStep} canOperate={canOperate} productId={productIdInRoutePath}></ProductProtocols>}></Route>
                            <Route path={`${path}/firmpanel`} render={(props) => <ConfirmPanel ref={refArr.active_1} isContinue={isContinue} {...props} nextStep={nextStep} canOperate={canOperate} getProductBaseInfo={getProductBaseInfo} productId={productIdInRoutePath}></ConfirmPanel>}></Route>
                            <Route path={`${path}/projectSelect`} render={(props) => <Hardware ref={ref => refArr.active_2 = ref} isContinue={isContinue} {...props} nextStep={nextStep} canOperate={canOperate} productId={productIdInRoutePath}></Hardware>}></Route>
                            <Route path={`${path}/configService`} render={(props) => <ConfigService ref={refArr.active_3} isContinue={isContinue} {...props} nextStep={nextStep} canOperate={canOperate} productId={productIdInRoutePath}></ConfigService>}></Route>
                            <Route path={`${path}/validation`} render={(props) => <Validation ref={refArr.active_4} isContinue={isContinue} {...props} nextStep={nextStep} canOperate={canOperate} productId={productIdInRoutePath}></Validation>}></Route>
                            <Redirect to={`${path}/protocols`} />
                        </Switch>
                    </MyContext.Provider>
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
                        <Button type="primary" onClick={() => releaseProduct()}>
                            发布产品
                        </Button>
                    )}
                </div>
            </div>
            {
                titleVisible && <TitleSet titleVisible={titleVisible} onCloseTitle={onCloseTitle} onOkClose={onOkClose}></TitleSet>
            }
            
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)