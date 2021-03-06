import { combineReducers } from "redux-immutable";
import { reducer as productReducer } from "../pages/product/product-manage/store";
import { reducer as userCenterReducer } from "../pages/user-center/store";
import { reducer as loadingShow } from "../components/loading/store";
import { reducer as messageReducer } from "../pages/message-center/store";

/* add by lcp at 2020-05-20 10:03 */
// import drawViewReducer from "../pages/logicDevelop/DrawView/store/reducer";
import { reducer as otaUpgradeReducer } from "../pages/product/ota-upgrade/store";

/* 旧产品的详情页面 单独store */
import oldProDetailReducer from "../pages/product/product-manage/old-product-details/store/reducer";

import customerServiceReducer from "../pages/customerService/store/reducer";


const reducer = combineReducers({
  oldProduct:oldProDetailReducer,
  product: productReducer,
  userCenter: userCenterReducer,
  otaUpgrade:otaUpgradeReducer,
  /**
   * loading是否显示得状态
   */
  loadingShow: loadingShow,
  /**
   * 消息中心状态
   */
  message: messageReducer,

  /**
   * 开发画布
   */
  // drawView: drawViewReducer,

  customerService:customerServiceReducer
});

export default reducer;
