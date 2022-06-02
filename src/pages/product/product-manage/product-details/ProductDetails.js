import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    EyeInvisibleTwoTone,
    EyeTwoTone,
} from '@ant-design/icons';
import { getProtocolLists } from '../store/ActionCreator';
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
        getProtocolLists: id => dispatch(getProtocolLists(id))
    }
}

// 获取路由中的ID参数
const getProductIdFromPath = (match) => +match.params.id;

export default function ProductDetails({ productBaseInfo, match, getProtocolLists, protocolLists }) {
    let history = useHistory();
    // let productIdInRoutePath = getProductIdFromPath(match);
    let productItem = {}
    const [showSecret, setShowSecret] = useState(false)
    if (sessionStorage.getItem('productItem')) {
        productItem = JSON.parse(sessionStorage.getItem('productItem'))
    } else {
        return <NoSourceWarn tipText="没有传入产品ID哦"></NoSourceWarn>
    }
    
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
            <div>{productItem.code}</div>
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
            <PageTitle title={productItem.productName} backHandle={() => { history.push('/open/product/proManage/list') }} titleTag={productItem.schemeName} backTitle='开发详情' children={titleCom} />
            <div className='comm-shadowbox product-detail-wrap'>
                <ProductTabs productId={productItem.productId} 
                ></ProductTabs>
            </div>
        </div>
    )
}

// export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
