import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {
    EyeInvisibleTwoTone,
    EyeTwoTone,
} from '@ant-design/icons';
import { getProductBaseInfo, getProtocolLists } from '../store/ActionCreator';
import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
import PageTitle from '../../../../components/page-title/PageTitle';
import ProductTabs from './product-tabs/ProductTabs';
import { strToAsterisk, DateTool } from './../../../../util/util';
import './ProductDetails.scss'
import '../product-edit/ProductEdit.scss'
import { post, Paths, get } from './../../../../api';
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
    let productItem = {}
    if (sessionStorage.getItem('productItem')) {
        productItem = JSON.parse(sessionStorage.getItem('productItem'))
    } else {
        return <NoSourceWarn tipText="没有传入产品ID哦"></NoSourceWarn>
    }
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
            <div>{productItem.productCode}</div>
        </div>
        <div>
            <div>产品密钥：</div>
            <div>
                {showText(productItem.deviceKey)}
                <span onClick={changeState}>
                    {
                        showSecret ? <EyeInvisibleTwoTone /> : <EyeTwoTone />
                    }
                </span>
            </div>
        </div>
    </div>)
    return (
        <div className="eidt-wrapper">
            <PageTitle title={productItem.productName} titleTag={productItem.statusStr} backTitle='开发流程' children={titleCom} />
            <div className='comm-shadowbox product-detail-wrap'>
                <ProductTabs productId={productIdInRoutePath} protocolLists={protocolLists} productBaseInfo={productBaseInfo}
                ></ProductTabs>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
