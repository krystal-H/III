import React, { useEffect,useState } from 'react'
import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
import PageTitle from '../../../../components/page-title/PageTitle';
import ProductTabs from './product-tabs/ProductTabs';
import {get,post,Paths} from '../../../../api';
import { withRouter } from "react-router"
import './ProductDetails.scss'

// 获取路由中的ID参数
const getProductIdFromPath = (match) => +match.params.id;

function ProductDetail ({match, history}) {
    const [productBaseInfo, setProductBaseInfo] = useState({})

    let productIdInRoutePath = getProductIdFromPath(match);

    useEffect( () => {
        // 产品ID更新后，重新获取数据
        if (productIdInRoutePath) {
            getBaseInfo(productIdInRoutePath)
        }
    // eslint-disable-next-line no-use-before-define
    },[getBaseInfo,productIdInRoutePath])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getBaseInfo = productId=>{
        post(Paths.getOldProductBaseInfo,{productId},{
            needVersion:1.1,
            loading:true
          }).then(data => {
            setProductBaseInfo(data.data)
        })
    }

    const goProductList = () => {
        history.push('/open/product/proManage/list')
    }

    if (!productIdInRoutePath) {
        return <NoSourceWarn tipText="没有传入产品ID哦"></NoSourceWarn>
    }
    return (
        <div className="old-pro-detail">
            <PageTitle title={productBaseInfo.productName} titleBack={true} backHandle={() => {goProductList()}}></PageTitle>
            <div className={'content-wrapper'}>
                <ProductTabs productId={productIdInRoutePath} productBaseInfo={productBaseInfo}
                ></ProductTabs>
            </div>
        </div>
    )
}

export default withRouter(ProductDetail)
