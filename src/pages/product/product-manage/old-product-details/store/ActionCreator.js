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