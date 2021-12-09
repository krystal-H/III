import { get, Paths, post } from '../../../../api';
import { 
    GETPROLIST, 
    FIRMWAREFROMPRO,
    GETVERLI,
    EXTVERLI,
    DEVGROUPLIST,
    FIRMWAREDETAIL
} from './actionTypes';

export const getMcuSocProLi = param => {
    return (dispatch) => {
        post(Paths.getMcuSocProLi,{},{ loading:true }).then(({data=[]}) => {
            dispatch({
                type: GETPROLIST,
                mcusocproLi:data,
            });
        });
    }
}


export const firmwareLastVersion = (productId) => {
    return (dispatch) => {
        post(Paths.firmwareLastVersion,{productId},{loading:true}).then(({data={}}) => {
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
        post(Paths.otaProDevVersionList,{...defaultparams,...params}).then(({data={}}) => {
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

export const sendFirmwareDetails = detail => {
    return (dispatch) => {
        dispatch({
            type: FIRMWAREDETAIL,
            firmwareDetails:detail,
        });
        
    }
}






    

