import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import { getProductBaseInfo, getProtocolLists } from '../store/ActionCreator';
import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
// import ProductInfo from '../../../../components/product-components/product-info/ProductInfo';
import PageTitle from '../../../../components/page-title/PageTitle';
import ProductTabs from './product-tabs/ProductTabs';

import './ProductDetails.scss'
import '../product-edit/ProductEdit.scss'
const mapStateToProps = state => {
    return {
        productBaseInfo: state.getIn(['product', 'productBaseInfo']).toJS(),
        protocolLists: state.getIn(['product', 'productProtocolLists']).toJS()
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductBaseInfo: id => dispatch(getProductBaseInfo(id)), // 获取产品基本信息
        getProtocolLists: id => dispatch(getProtocolLists(id))
    }
}

// 获取路由中的ID参数
const getProductIdFromPath = (match) => +match.params.id;

function ProductDetails({ productBaseInfo, match, getProductBaseInfo, getProtocolLists, protocolLists }) {

    let productIdInRoutePath = getProductIdFromPath(match);

    useEffect(() => {
        // 产品ID更新后，重新获取数据
        if (productIdInRoutePath) {
            getProductBaseInfo(productIdInRoutePath)
            getProtocolLists(productIdInRoutePath)
        }
    }, [getProductBaseInfo, getProtocolLists, productIdInRoutePath])

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
        <div className="eidt-wrapper">
            <PageTitle title='开发流程' titleTag='免开发方案' btnTxt='编辑' backTitle='开发流程' children={titleCom} />
            <div className='comm-shadowbox product-detail-wrap'>
                <ProductTabs productId={productIdInRoutePath} protocolLists={protocolLists} productBaseInfo={productBaseInfo}
                ></ProductTabs>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
