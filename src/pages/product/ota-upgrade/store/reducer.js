import * as actionTypes from './actionTypes';

const defaultState = {
    productList: [],
    versionList:{
        list:[],
        pager:{}
    },
    extVerisonLi:[],
    deviceGorupLi:[],
    firmwareDetails:{},
    firmwareFrPro:{}
};
const {
    GETPROLIST,
    GETVERLI,
    EXTVERLI,
    DEVGROUPLIST,
    FIRMWAREDETAIL,
    FIRMWAREFROMPRO
} = actionTypes


export default (state = defaultState, {
    type,
    productList,
    versionList,
    extVerisonLi,
    deviceGorupLi,
    firmwareDetails,
    firmwareFrPro,
}) => {
    switch (type) {
        case GETPROLIST:
            return {...state,productList}
        case GETVERLI:
            return {...state,versionList}
        case EXTVERLI:
            return {...state,extVerisonLi}
        case DEVGROUPLIST:
            return {...state,deviceGorupLi}
        case FIRMWAREDETAIL:
            return {...state,firmwareDetails}
        case FIRMWAREFROMPRO:
            return {...state,firmwareFrPro}


            
        default:
            return state;
    }
}
