import {get, post, Paths} from '../../../../api';
import { fromJS } from 'immutable';
import { cloneDeep} from 'lodash';
import * as ActionTypes from './ActionTypes';
import { message } from 'antd';
import { Notification } from '../../../../components/Notification';
// --------------5.x
// 创建产品-选择品类
export const createProductCategoryAction = (info) => {
  // console.log(info, '步骤一存的数据')
  return {
    type: ActionTypes.CREATE_PRODUCT_CATEGORY,
    info
  }
}

// 创建产品-确定方案
export const createProductSchemeAction = (info) => {
  // console.log(info, '步骤二二二存的数据')
  return {
    type: ActionTypes.CREATE_PRODUCT_SCHEME,
    info
  }
}

// 创建产品-建立产品信息
export const createProductFormAction = (info) => {
  // console.log(info, '步骤三三三存的数据')
  return {
    type: ActionTypes.CREATE_PRODUCT_FORM,
    info
  }
}

// 大方案索引
export const createProductSchemekeyAction = (data) => {
  return {
    type: ActionTypes.CREATE_PRODUCT_SCHEMEKEY,
    data
  }
}

// 子方案索引
export const createProductSchemeBtnKeyAction = (data) => {
  return {
    type: ActionTypes.CREATE_PRODUCT_BTNKEY,
    data
  }
}

// -----------------


// 更新产品列表
export const updateProductListAction = (list) => {
  return {
    type: ActionTypes.UPDATE_PRODUCT_LIST,
    list: fromJS(list)
  }
}

// 获取当前账号下的产品列表
export const getProductListAction = (data) => {
  return (dispatch,getState) => {
    get(Paths.getProductList,{
        ...data,
        instanceId:2
    },{
      needVersion:1.2,loading:true
    }).then((res) => {
      let list = res.data,
          action = updateProductListAction(list);
      dispatch(action);
    });
  }
}


// 更新产品基本信息
export const updateProductBaseInfo = (info) => {
  return {
    type: ActionTypes.UPDATE_PRODUCT_BASE_INFO,
    info:fromJS(info)
  }
}

// 更新产品的协议列表
export const updateProtocolLists= (list) => {
  return {
    type: ActionTypes.UPDATE_PRODUCT_PROTOCOL_LISTS,
    list: fromJS(list)
  }
}

// 获取产品协议列表
export const getProtocolLists = (productId) => {
  return (dispatch,getState) => {
    post(Paths.getProtocolList,{
      productId
    },{
      needVersion:1.2,
      loading:true
    }).then(data => {
      let action = updateProtocolLists(data.data.list);
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
    post(Paths.getAppsByProductId,{
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

// 更新云端定时列表
export const updateTimeServiceList= (data) => {
   return {
     type: ActionTypes.UPDATE_TIME_SERVICE_LIST,
     data: fromJS(data)
   }
}

// 获取云端定时列表
export const getTimeServiceList = (params) => {
  return (dispatch,getState) => {
    get(Paths.getTimeServiceList,params,{loading:true}).then(data => {
          
      let action = updateTimeServiceList(data.data);
      dispatch(action);
    })
  }
}

/**
 * 新建产品 start
 * aize-2019-09-10
 */ 


// 更新产品信息
export const updateInfo = (params) => {
  return (dispatch) => {
    return post(Paths.updateProductBaseInfo, params, {
      needFormData:true,
      loading:true
    }).then(res => {
      if(res.code === 0){
        message.success("保存成功");
        dispatch(updateInfoDetail(params));
        return Promise.resolve(1);
      }
      return Promise.resolve(0);
    })
  }
}

export const updateInfoDetail = (info) => ({
  type: ActionTypes.UPDATE_PRODUCT_BASE_INFO_DETAIL,
  info
})

// 切换当前模块
export const switchTab = (tabIndex) => {
  return (dispatch) => {
    if(tabIndex === 1){
      dispatch(setModuleItem({}))
    }
    return dispatch({
      type: ActionTypes.SWITCH_TAB,
      tabIndex
    })
  }
};

// 根据hardwareType获取模组列表
export const getModuleList = (params) => {
  return (dispatch) => {
    dispatch(setHardwareTypeAction(params.hardwareType));
    return get(Paths.getModuleList, params, {loading: true}).then(res => {
      if(res.code === 0){
        dispatch(setModuleList(res.data));
        return Promise.resolve(res.data);
      }
      return Promise.resolve(0);
    })
  }
};

// 设置方案类型
export const setHardwareTypeAction = (hardwareType) => ({
  type: ActionTypes.SET_HARDWARE_TYPE,
  hardwareType
});
export const setHardwareType = (typ) => {
  return (dispatch) => {
    dispatch(setHardwareTypeAction(typ))
  }
}

// 设置模组列表
export const setModuleList = (list) => ({
  type: ActionTypes.SET_MODULE_LIST,
  list: fromJS(list)
});

// 设置模组
export const setModuleItem = (moduleItem) => ({
    type: ActionTypes.SET_MODULE_ITEM,
    moduleItem: fromJS(moduleItem)
});

// 修改模组
export const changeModule = () => ({
  type: ActionTypes.CHANGE_MODULE,
});

// 保存模组数据
export const saveModule = (_params = {}) => {
  return (dispatch, getState) => {
    const { hardwareType, commFreq, moduleItem, productBaseInfo } = getState().getIn(['product']).toJS();
    let params = {
      productId: productBaseInfo.productId,
      hardwareType,
      commFreq: +commFreq,
	  moduleId: moduleItem.moduleId,
	  ..._params
    };

    return get(Paths.saveModule, params, {loading: true}).then(res => {
      if(res.code === 0){
        Notification({
          type:'success',
          message: "保存信息成功！",
          duration: 3
        })
        dispatch(setProductInfo(params))
        return Promise.resolve(1);
      }
      return Promise.resolve(0);
    })
  }
}

// 修改产品基础信息
export const setProductInfo = (params) => ({
  type: ActionTypes.CHANGE_PRODUCT_INFO,
  params
})

// 修改上报频率
export const modifyCommFreq = (commFreq) => ({
  type: ActionTypes.MODIFY_COM_FREQ,
  commFreq
})

// 设置硬件开发参数
export const setHardwareParam = (params) => {
  const { hardwareType, commFreq } = params;
  debugger;
  return (dispatch) => {
    dispatch(setHardwareType(hardwareType));
    dispatch(modifyCommFreq(commFreq));
  }
}

export const updateMcuCodeCheck = (bl) => {
	return {
		type: ActionTypes.MCU_CODE_CHECK,
		bl: fromJS(bl)
	}
}

export const getMcuCodeCheck = (productId) => {
	return (dispatch) => {
		return get(Paths.mcuCodeCheck,{productId},{noNotification:true}).then((model) => {
			if(model.code === 0){//检测成功
				dispatch(updateMcuCodeCheck(true))
			}
		});
	}
}

// 获取产品-继续开发-头部信息
export const getProductHeadInfo = (productId) => {
  return (dispatch) => {
    return post(Paths.getProductListNew, { productName: productId }, { loading: true }).then(res => {
      // console.log('调用/**********', res.data.records[0])
      dispatch({
        type: ActionTypes.PRODUCT_HEAD_INFO,
        data: res.data.records[0]
      })
    })
  }
}
