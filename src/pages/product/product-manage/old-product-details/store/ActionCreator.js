import {get, post, Paths} from '../../../../../api';
import { fromJS } from 'immutable';
import { cloneDeep} from 'lodash';
import * as ActionTypes from './ActionTypes';
import { message } from 'antd';
import { Notification } from '../../../../../components/Notification';

// 打开 or 关闭 协议脚本窗口
export const triggerDebugger = (visible, productId = "") => {
  return (dispatch) => {
    if(visible && productId){
      dispatch(getJsContent(productId));
    }else{
      dispatch(setJsContent(""));
    }
    return dispatch({
      type: ActionTypes.TRIGGER_DEBUGGER_MODAL,
      visible
    })
  }
};

// 获取协议脚本
export const getJsContent = (productId) => {
  return (dispatch) => {
    return get(Paths.getJsContent, {productId}, {loading: true}).then((data) => {
      let result = data.data;
      if(data.code === 0){
        dispatch(setJsContent(result ? result.scriptContent : ""))
      }
    });
  };
}

// 设置协议脚本
export const setJsContent = (jsContent) => ({
    type: ActionTypes.SET_JS_CONTENT,
    jsContent
});

// 提交协议脚本
export const submitJsContent = (productId, javascript) => {
  return (dispatch) => {
    return post(Paths.sumbitJsContent, {productId, javascript}, {loading: true}).then((data) => {
      if(data.code === 0){
        Notification({
          type:'success',
          duration: 3,
          message: "保存成功"
        });
        dispatch(triggerDebugger(false));
      }
    });
  };
}



// 更新产品关联的APP
export const updateAppsByProductId= (list) => {
  return {
    type: ActionTypes.UPDATE_APPS_BY_PRODUCTID,
    list: fromJS(list)
  }
}

// 获取产品关联的APP
export const getAppsByProductId = (productId) => {
 return (dispatch,getState) => {
   get(Paths.getAppsByProductId,{
     productId
   },{
     needVersion: '1.1'
   }).then(data => {
         
     let _data = cloneDeep(data.data || []);

     let action = updateAppsByProductId(_data);
     dispatch(action);
   })
 }
}

// 更新产品页面配置步骤信息
export const updateConfigSteps = (configList) => {
  return {
    type: ActionTypes.UPDATE_CONFIG_STEPS,
    list: fromJS(configList)
  }
}

// 获取产品页面步骤配置信息
export const getConfigSteps = (productId) => {
 return (dispatch,getState) => {
   get(Paths.getConfigSteps,{
     productId
   }).then(data => {
     let action = updateConfigSteps(data.data);
     dispatch(action);
   })
 }
}


// 更新产品H5页面信息
export const updateH5Manages= (data) => {
  return {
    type: ActionTypes.UPDATE_H5MANAGE_PAGES,
    data: fromJS(data)
  }
}

// 获取产品H5页面信息
export const getH5Manages = (params) => {
 return (dispatch,getState) => {
   get(Paths.getH5Pages,{...params,date: +new Date()},{
     needVersion: '1.1'
   }).then(data => {
     let action = updateH5Manages(data.data);
     dispatch(action);
   })
 }
}