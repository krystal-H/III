import React, { useEffect } from 'react'
import { Switch,Redirect,Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {getProductBaseInfo} from '../store/ActionCreator';
import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
import ProductLinks from './product-links/ProductLinks';
import './ProductEdit.scss'

import ProductProtocols from './product-protocols/ProductProtocols';
import ProductServices from './product-services/ProductServices';
import {CommercialInfo} from './commercialInformation/CommercialInfo';
import ApplyRelease from './commercialInformation/ApplyRelease';
import ProductInfo from './product-info/ProductInfo';
import PageTitle from '../../../../components/page-title/PageTitle';
import Hardware from './firmware/Hardware';


// 此部分路由不需要展示产品信息
const NOT_SHOW = /(\/service\/appcontrol|cloudtime|scenelink)|\/applyRelease/;

const mapStateToProps = state => {
    return {
        productBaseInfo: state.getIn(['product','productBaseInfo']).toJS()
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductBaseInfo: id => dispatch(getProductBaseInfo(id)) // 获取产品基本信息
    }
}

// 获取路由中的ID参数
const getProductIdFromPath = (match) => +match.params.id;


function ProductEdit ({productBaseInfo,getProductBaseInfo,match,location, history}) {
    let {path} = match,
        {pathname = ''} = location,
        showTitle = !NOT_SHOW.test(pathname),
        productIdInRoutePath = getProductIdFromPath(match),
        {mode} = productBaseInfo,
        canOperate = (mode === 0);

    // const hashChangeHandle = e => {
    //     console.log('hashchange事件触发',e)
    // }
    
    // useEffect( () => {
    //     console.log('注册hashchange事件');
    //     window.addEventListener('hashchange',hashChangeHandle)
    //     return () => {
    //         console.log('移除hashchange事件');
    //         window.removeEventListener('hashchange',hashChangeHandle)
    //     }
    // },[])

    useEffect( () => {
        // 产品ID更新后，重新获取数据
        if (productIdInRoutePath) {
            getProductBaseInfo(productIdInRoutePath)
        }
    },[getProductBaseInfo, productIdInRoutePath])

    if (!productIdInRoutePath) {
        return <NoSourceWarn tipText="没有传入产品ID哦"></NoSourceWarn>
    }

    return (
        <React.Fragment>
            <div className="eidt-wrapper">
                {
                    showTitle && 
                    <>
                        <PageTitle title={productBaseInfo.productName} />
                        <ProductLinks productId={productIdInRoutePath}></ProductLinks>
                    </>
                }
                <div>
                    {
                        productIdInRoutePath && 
                        <Switch>
                            <Route path={`${path}/info`} render={(props) => <ProductInfo {...props} canOperate={canOperate} info={productBaseInfo}></ProductInfo>}></Route>
                            <Route path={`${path}/protocols`} render={(props) => <ProductProtocols {...props} canOperate={canOperate} productId={productIdInRoutePath}></ProductProtocols>}></Route>
                            <Route path={`${path}/projectSelect`}  render={(props) => <Hardware {...props} canOperate={canOperate} getProductBaseInfo={getProductBaseInfo} productId={productIdInRoutePath}></Hardware>}></Route>
                            <Route path={`${path}/service`} render={(props) => <ProductServices {...props} canOperate={canOperate} productId={productIdInRoutePath}></ProductServices>}></Route>
                            <Route path={`${path}/CommercialInfo`} render={(props) => <CommercialInfo {...props} canOperate={canOperate} productId={productIdInRoutePath}></CommercialInfo>}></Route>
                            <Route path={`${path}/applyRelease`} render={(props) => <ApplyRelease {...props} canOperate={canOperate} productId={productIdInRoutePath}></ApplyRelease>}></Route>
                            <Redirect to={`${path}/info`}/>
                        </Switch>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)