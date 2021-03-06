export const UPDATE_PRODUCT_LIST = "UPDATE_PRODUCT_LIST"; // 产品列表
export const UPDATE_PRODUCT_BASE_INFO = "GET_PRODUCT_BASE_INFO"; // 获取产品详情
export const UPDATE_PRODUCT_BASE_INFO_DETAIL = "UPDATE_PRODUCT_BASE_INFO_DETAIL"; // 更新产品信息
export const UPDATE_PRODUCT_PROTOCOL_LISTS = "UPDATE_PRODUCT_PROTOCOL_LISTS"; // 获取产品的协议列表
export const UPDATE_CONFIG_STEPS = "UPDATE_CONFIG_STEPS"; 
export const UPDATE_H5MANAGE_PAGES = "UPDATE_H5MANAGE_PAGES"; // H5页面列表
export const UPDATE_APPS_BY_PRODUCTID = "UPDATE_APPS_BY_PRODUCTID"; // H5页面升级所需的APP列表
export const UPDATE_TIME_SERVICE_LIST = "UPDATE_TIME_SERVICE_LIST"; // 云端定时列表 

// --------------5.x
// 创建产品
export const CREATE_PRODUCT_CATEGORY = "CREATE_PRODUCT_CATEGORY" // 创建产品-选择品类
export const CREATE_PRODUCT_SCHEME = "CREATE_PRODUCT_SCHEME" // 创建产品-确定方案
export const CREATE_PRODUCT_FORM = "CREATE_PRODUCT_FORM" // 创建产品-建立产品信息
export const CREATE_PRODUCT_SCHEMEKEY = "CREATE_PRODUCT_SCHEMEKEY" // 大方案索引
export const CREATE_PRODUCT_BTNKEY = "CREATE_PRODUCT_BTNKEY" // 子方案索引

export const PRODUCT_HEAD_INFO = "PRODUCT_HEAD_INFO" // 继续开发-产品头部信息

// --------------

/**
 * 新建产品 start
 * aize-2019-09-10
 */ 
export const GET_CATALOG_LIST = "GET_CATALOG_LIST";//产品三级类目list
export const PRODUCT_BASE_TYPE_LIST = "PRODUCT_BASE_TYPE_LIST";//获取产品基本数据类型列表 productBaseTypeList

/**
 * 协议脚本
 *  */
export const TRIGGER_DEBUGGER_MODAL = "TRIGGER_DEBUGGER_MODAL"; // 协议脚本窗口显示关闭
export const SET_JS_CONTENT = "SET_JS_CONTENT"; // 设置协议脚本

/**
 * 硬件开发
 */
export const SWITCH_TAB = "hardware/SWITCH_TAB";
export const SET_MODULE_LIST = "hardware/SET_MODULE_LIST";
export const SET_MODULE_ITEM = "hardware/SET_MODULE_ITEM";
export const CHANGE_MODULE = "hardware/CHANGE_MODULE";
export const SET_HARDWARE_TYPE = "hardware/SET_HARDWARE_TYPE";
export const CHANGE_PRODUCT_INFO = "hardware/CHANGE_PRODUCT_INFO";
export const MODIFY_COM_FREQ = "hardware/MODIFY_COM_FREQ";
export const MCU_CODE_CHECK = "hardware/MCU_CODE_CHECK";