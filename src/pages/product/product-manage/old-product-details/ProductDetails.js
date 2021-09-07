import React, { useEffect,useState } from 'react'
import NoSourceWarn from '../../../../components/no-source-warn/NoSourceWarn';
import PageTitle from '../../../../components/page-title/PageTitle';
import ProductTabs from './product-tabs/ProductTabs';
import {get,post,Paths} from '../../../../api';
import './ProductDetails.scss'

// 获取路由中的ID参数
const getProductIdFromPath = (match) => +match.params.id;

export default function ProductDetail ({match}) {
    const [productBaseInfo, setProductBaseInfo] = useState({})

    let productIdInRoutePath = getProductIdFromPath(match);

    useEffect( () => {
        // 产品ID更新后，重新获取数据
        if (productIdInRoutePath) {
            getBaseInfo(productIdInRoutePath)
        }
    },[getBaseInfo,productIdInRoutePath])

    const getBaseInfo = productId=>{
        post(Paths.getOldProductBaseInfo,{productId},{
            needVersion:1.1,
            loading:true
          }).then(data => {
            setProductBaseInfo(data.data)
        })
    }

    if (!productIdInRoutePath) {
        return <NoSourceWarn tipText="没有传入产品ID哦"></NoSourceWarn>
    }
    return (
        <div className="old-pro-detail">
            <PageTitle title={productBaseInfo.productName} titleBack={true}></PageTitle>
            <div className={'content-wrapper'}>
                <ProductTabs productId={productIdInRoutePath} productBaseInfo={productBaseInfo}
                ></ProductTabs>
            </div>
        </div>
    )
}
