import { fromJS } from 'immutable';
import * as ActionTypes from './ActionTypes';

const defaultState = fromJS({
    loginModalStatu:false,
    developerInfo : {

    },
    menulist:[],
    instanceList:[],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOGIN_MODAL:
      return state.set('loginModalStatu',action.statu || false)
    case ActionTypes.UPDATE_DEVELOPER_INFO:
      return state.set('developerInfo',action.info || false)
    case ActionTypes.MUEN_LIST:
      return state.set('menulist',action.data || [])
    case ActionTypes.UPDATE_INSTANCELIST:
      return state.set('instanceList',action.data || [])
    default:
      return state;
  }
}