import * as ActionTypes from './ActionTypes';
import {get,Paths} from '../../../api';
import { fromJS } from 'immutable';
import {menuList,getNavRoutes} from '../../../configs/route.config'

export const changeLoginModalStatu= (statu) => {
  return {
    type: ActionTypes.SHOW_LOGIN_MODAL,
    statu
  }
}

export const updateDeveloperInfo= (info) => {
  return {
    type: ActionTypes.UPDATE_DEVELOPER_INFO,
    info:fromJS(info)
  }
}

export const getDeveloperInfo= () => {
  return (dispatch,getState) => {
    get(Paths.getDeveloperInfo,{},{
      needVersion:1.1,
      loading: true
    }).then((res) => {
      let info = res.data,
          action = updateDeveloperInfo(info);
      dispatch(action);
    });
  }
}
//获取菜单
export const getMenuList = () => {
  return (dispatch,getState) => {
    get(Paths.getGroupMenuList,{version:1.1}).then((res) => {
        // let action = updateMuenList(res.data);
        let data = getNavRoutes(menuList)
        console.log('---routesMenu--',data)
        let action = updateMuenList(data);
        dispatch(action);
    });
  }
}
export const updateMuenList= (data) => {
  return {
    type: ActionTypes.MUEN_LIST,
    data:fromJS(data)
  }
}

// 删除用户角色
export const deleteRole = (roleId) => {
  return (dispatch) => {
    return get(Paths.deleteRole,{roleId}, {loading: true}).then((res) => {
        if(res.code === 0){
            return Promise.resolve(1);   
        }
        return Promise.resolve(0);
    }).catch(err => Promise.resolve(0));
  }
}
