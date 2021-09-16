import { get, Paths, post } from '../../../../api';
import { 
    GETPROLIST, 
    FIRMWAREFROMPRO,
    GETVERLI,
    EXTVERLI,
    DEVGROUPLIST,
    FIRMWAREDETAIL
} from './actionTypes';

export const getProductList = param => {
    return (dispatch) => {
        get(Paths.getProductType,{},{ loading:true }).then(({data}) => {
            const productList = Object.keys(data).map(id=>{
                return {productId:id,productName:data[id]}
            });
            dispatch({
                type: GETPROLIST,
                productList,
            });
        });
    }
}
export const firmwareFromProduct = (productId) => {
    return (dispatch) => {
        post(Paths.firmwareFromProduct,{productId},{loading:true}).then(({data={}}) => {
            dispatch({
                type: FIRMWAREFROMPRO,
                firmwareFrPro:data,
            });
        }); 
    }
}





export const getVersionList = (params={}) => {
    const defaultparams  = {pageIndex:1,pageRows:10}
    return (dispatch) => {
        post(Paths.otaDevVersionList,{...defaultparams,...params}).then(({data={}}) => {
            dispatch({
                type: GETVERLI,
                versionList:data,
            });
        }); 
    }
}

export const getExtVerLi = param => {
    return (dispatch) => {
        if(param){
            get(Paths.otaGetExtVersion,param).then(({data}) => {
                dispatch({
                    type: EXTVERLI,
                    extVerisonLi:data||[],
                });
            });
        }else{
            dispatch({
                type: EXTVERLI,
                extVerisonLi:[],
            });
        } 
    }
}

export const getDeviceGroupLi = () => {
    return (dispatch) => {
        get(Paths.getGroupList,{pageRows:9999}).then(({data={}}) => {
            dispatch({
                type: DEVGROUPLIST,
                deviceGorupLi:data.list||[],
            });
        }); 
    }
}

export const sendFirmwareDetails = detail => {
    return (dispatch) => {
        dispatch({
            type: FIRMWAREDETAIL,
            firmwareDetails:detail,
        });
        
    }
}






    

