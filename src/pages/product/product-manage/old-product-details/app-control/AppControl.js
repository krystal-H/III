import React , {useEffect ,useState} from 'react';
import {post, Paths} from '../../../../../api';
import H5Manage from './H5Manage/H5Manage';


export default function AppControl ({
    productId,
    productBaseInfo,
    }) {
        const [pagelist, setPagelist] = useState({
            pager: {},
            list: []
        });
        const [applist, setApplist] = useState([]);
        
        let {productName,deviceTypeId,deviceSubtypeId,allCategoryName} = productBaseInfo,
            deviceTypeName = allCategoryName || '';

        useEffect(() => {
            if (productId) {
                // getH5Manages(productId)
                getAppsByProductId(productId)
            }
        },[productId])

        const getH5Manages = params=>{
            post(Paths.getH5Pages,{...params},{
                needVersion: '1.1'
              }).then(({data={}}) => {
                setPagelist({
                    pager: data.pager,
                    list: data.list
                })
            })
        }
        const getAppsByProductId = productId=>{
            post(Paths.getAppsByProductId,{
                productId
              },{
                needVersion: '1.1'
              }).then(data => {
                setApplist(data.data || []);
            })
        }

        


        return (
            <div className="app-control">
                <H5Manage productId={productId}
                            productName={productName}
                            deviceTypeId={deviceTypeId}
                            deviceSubtypeId={deviceSubtypeId}
                            productH5Pages={pagelist} 
                            appsByProductId={applist}
                            deviceTypeName={deviceTypeName}
                            getH5Manages={getH5Manages}></H5Manage>
                
            </div>
        )
}