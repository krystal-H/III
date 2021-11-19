export const urlPrefix = '/v5x/web/open';//接口统一公共路径
// export const urlPrefix = '/v5/web/open';//接口统一公共路径
let fileTourl = "/v4/web/tencentcloud/upload"; //上传腾讯云接口，生产环境上用跨域的绝对路径
if(window.location.hostname == "open.clife.cn" || window.location.hostname == "cms.clife.cn"){
    fileTourl = "https://cms.clife.cn/v4/web/tencentcloud/upload"
}

let version = '?version=1.1';

const NOT_NEED_PREFIX = ['upFileUrl']

let Paths = {
    /* 上传文件*/
    upFileUrl:fileTourl,

    /* 账户、用户中心*/
    loginCheck: '/common/login',
    logout: '/common/loginOut',
    verifyCodeUrl : '/common/getImgVeriCode',
    register:'/common/register',
    registerConfirm : '/common/authConfirm',
    resendRegisterEmail : '/common/resendEmail',
    subResetPassword:'/common/sub/resetPwd',
    resetAuth: '/common/forgetPwd',
    resetEmail : '/common/resetEmail',
    setPassword : '/common/setPassWord',
    getDeveloperInfo : '/user/getUserInfo',
    upDeveloperInfo : '/common/updateUserInfo',
    getRightsOneself : '/common/getSubInfo',
    cancelAccount : '/common/cancelAccount',
    withdraw : '/common/withdraw',
    getGroupMenuList: '/common/getMenus',//获取账号权限菜单
    customerServiceHistory: '/support/getHistory',//客服历史信息

    /* 产品信息 */
    getProductList: '/product/listAllProductAndAccreditInfo',
    copyProduct: '/product/copy',
    delectProduct: '/product/deleteProduct',
    updateProductBaseInfo: '/product/update',

    // 5.x产品列表功能
    getProductListNew: '/product/list', // 获取产品列表
    deleteProductNew: '/product/delete', // 删除产品
    copyProductNew: '/product/copy', // 复制产品

    // 5.x新建产品品类信息
    getThirdCategory: '/deviceCategory/deviceType/all', // 获取所有的三级品类
    getSecondCategory: '/deviceCategory/subCategory/all', // 二级品类
    getSecondById: '/deviceCategory/subCategory/deviceTypeId', // 根据三级品类id查二级
    confirmDeviceType: '/product/create/confirm/deviceTypeId', // 选择品类下一步
    getProductBrand: '/productBrand/all', // 产品品牌
    getCommunicationProtocol: '/module/type/all', // 通信协议
    createProduct: '/product/create', // 创建产品
    downloadData: '/product/dev/module/data/url', // 下载资料路径
    getPanel: '/panelManage/getTemplateMarketByDeviceTypeId', // 获取品类下的面板
    getBindTypeNetworkTypeMap: '/product/getBindTypeNetworkTypeMap', // 获取配网方式

    // 5.x确定方案
    getScheme: '/scheme/list/deviceType', // 获取方案数据
    getPhysicalModelId: '/physicalModel/func', // 获取功能点
    confirmScheme: 'product/create/confirm/scheme', // 创建方案下一步

    // 5.x继续开发-发布产品
    publishProduct: '/product/publish', // 继续开发-发布产品

    // 5.x继续开发-服务配置
    getSecurityConfigStatus: '/productManage/getConfigBaseInfoByProductId', // 服务配置-获取标志
    saveProductSecurityConfig: '/productManage/saveProductSecurityConfig', // 服务配置-通信安全机制
    getProductExtendInfo: '/productManage/getProductExtendInfo', // 服务配置-配网信息  是否为网关设备
    saveNetworkConfig: '/productManage/saveProductConfig', // 服务配置-保存配网信息
    getNetDataByProductId: '/productManage/getNetDataByProductId', // 服务配置-获取配网方式
    getFirmwareList: '/firmware/productFirmware/type/get', // 固件模块-获取固件类型-判断是否配置过
    addFirmwareModule: '/firmware/productFirmware/type/add', // 新增固件模块
    delFirmwareModule: '/firmware/productFirmware/type/del', // 删除固件类型模块
    updateFirmwareModule: '/firmware/productFirmware/type/update', // 修改固件类型模块

    // 5.x继续开发-开发硬件
    getMoudleInfo: '/product/dev/show/module',
    replaceModuleList: '/module/list/scheme', // 更换模组列表
    modifyFirmware: '/firmware/show/config', // 修改固件配置项
    saveFirmwareSetting: '/firmware/config/setting', // 保存固件信息
    freeApplyModule: '/module/apply/create', // 免费申请模组
    showFirmware: '/product/dev/show/firmware/config', // 免费申请固件信息

    // 5.xAPP-应用管理
    getAppInfoList: '/appInfoManage/getAppInfoList', // app应用列表
    deleteApp5x: '/appInfoManage/delete', // app应用删除
    saveAppInfo5x: '/appInfoManage/saveAppBaseInfo', // 保存app应用信息
    getAppDetail5x: '/appInfoManage/getAppInfo', // 获取app应用详情
    getRelateProduct5x: '/appInfoManage/getRelaProducts', // 获取关联产品数据-tab
    getAppVersionList5x: '/appInfoManage/getAppVersionList', // 获取版本列表记录-tab
    addAppVersionInfo5x: '/appInfoManage/version/add', // 添加版本信息
    deleteAppVersion5x: '/appInfoManage/version/delete', // 删除版本信息
    getAppVersionDetail5x: '/appInfoManage/version/get', // 获取版本信息详情
    getAppDevProductList5x: '/appInfoManage/getDevProductList', // 获取可关联的产品列表
    updateRelaProduct5x: '/appInfoManage/updateRelaProduct', // 保存可关联的产品
    deleteAppRelaProducts5x: '/appInfoManage/deleteRelaProducts', // 删除关联的产品

    /* 协议 */
    getProtocolTemplates: '/protoManage/getProtocolTemplatesByProductId',
    addProtocolTemplates: '/protoManage/saveProtocolTemplates',
    getProtocolList: '/productProtocol/getProtocolListByProductId',
    saveProtocol: '/productProtocol/saveProtocol',
    delProtocol: '/protoManage/delProtocol',
    exportProtocol: '//protoManage/exportProtocolToJson',
    getProtocolDictionaryCommonList: '/protoManage/getProtocolDictionaryCommonList',
    searchProtocolDictionary: '/protoManage/searchProtocolDictionary',
    getSubjectMenu: '/protoManage/getSubjectMenu',
    getSubjectExtendMenu: '/protoManage/getSubjectExtendMenu',
    getFunctionMenu: '/protoManage/getFunctionMenu',
    getFunctionExtendMenu: '/protoManage/getFunctionExtendMenu',
    getTsl:'/tsl/getTSL',
    exportTsl:'/tsl/export',
    saveNoProductId:'/thing/label/saveNoProductId',
    
    /* 页面配置步骤信息*/
    getConfigSteps: '/product/getConfigSteps',
    saveConfigSteps: '/product/saveConfigSteps',

    /* v5.x之前的旧产品详情页面 */
    getOldProductBaseInfo: '/product/detail/old',
    getH5Pages: '/projectManage/getProjectList',
    getAppsByProductId: '/projectManage/getAppsByProductId',
    delApph5Project: '/projectManage/delProject',
    getGreyPubHistory:'/projectManage/getGreyPubHistory',
    getFormalPubHistory: '/projectManage/getFormalPubHistory',
    garyUpdate: '/projectManage/garyUpdate',
    formalUpdate: '/projectManage/formalUpdate',
    offlineUiDesign: '/projectManage/offlineUiDesign',
    cancelGrayUpdate: '/projectManage/cancelGrayUpdate',
    getLinkConfiguration: '/netWorkLogo/getDetail',
    getLinkHelpImg: '/productManage/getProductHelp',
    saveLinkHelpImg: '/productManage/saveProductHelp',
    netWorkDelete: '/netWorkLogo/delete',
    netWorkAddAndUpdate: '/netWorkLogo/addAndUpdate',
    getPublishProductInfo: '/productManage/getV4PublishProductInfo',
    getV4Protocol: '/productManage/getV4ProtocolListByProductId',
    oldVersionList: '/firmware/old/device/version/list', //固件列表
    oldGetAllDeviceVersionType: '/firmware/old/device/version/getAllDeviceVersionType',//固件类型
    oldGetAllFirmwareVersionType: '/firmware/old/device/version/getAllFirmwareVersionType',//固件模块
    oldVersionAdd: '/firmware/old/device/version/add',//固件添加
    oldVersionDelete: '/firmware/old/device/version/delete',//固件删除
    versionCheckMac: '/firmware/old/device/version/checkMac',//批量导入mac
    versionValidate: '/firmware/device/version/validate',//发起验证
    oldVersionPublish: '/firmware/old/device/version/publish',//发布

    
    

    /* 云端定时功能5x */
    cloudGetProductList: '/productManage/getProductList', // 产品列表
    getTimeServiceList: '/timeServer/getList', // 获取列表
    getPhysicalModel: '/productManage/physicalModel/get', // 获取物模型  关联协议
    saveTimeService: '/timeServer/save', // 保存定时信息
    updateTimeServiceStatus: '/timeServer/updateStatus', // 修改云端定时状态

    /* 场景配置服务 */
    getSceneFunctionList: '/scene/getSceneFunctionList',
    addBatchSceneFunction: '/scene/addBatchSceneFunction',
    addOrUpdateSingleCondition: '/scene/addOrUpdateSingleCondition',
    addCustomAction: '/scene/addCustomAction',
    updateSceneFunction: '/scene/updateSceneFunction',
    deleteSceneFunctionById: '/scene/deleteSceneFunctionById',
    auditBatchSceneFunction: '/scene/auditBatchSceneFunction',
    getAuditRecord: '/scene/getAuditRecord',

    /**************************/
    queryServerConfig: '/device/debug/queryServerConfig',//设备调试-获取websocket服务器的IP和端口
    accessToken: '/device/debug/getAccessToken',//设备调试-获取登录凭证
    dataTypeList: '/device/debug/getDataTypeList', //获取数据类型
    propertyConfig: '/device/debug/getPropertyConfig_v1.1',//根据产品ID获取协议信息
    deviceDebugAccountGetList: "/device/debug/account/getList",//调试账号列表
    
    deviceDebugAccountDelete: "/device/debug/account/delete",//调试账号删除
    deviceDebugMacGetList: "/device/debug/mac/getList",//调试MAC列表
    deviceDebugMacDelete: "/device/debug/mac/delete",//调试MAC删除
    upgradeDebug: "/device/debug/upgradeDebug",//固件升级调试

    debugSecretList:'/device/debug/mac/debugSecretList',//调试密钥列表
    deviceDebugAccountInsert: "/device/debug/account/insert",//调试账号添加
    addDebugMac:'/device/debug/mac/addDebugMac',
    delDebugMac:'/device/debug/mac/delDebugMac',
    getMockDeviceId:'/device/debug/mockDevice/active',//虚拟设备调试获得虚拟设备id

    


    /* 设备数据api start */
    getApiList: '/apiInfo/getOpenApiList',
    getDimensionList: '/dimension/getDimensionList',
    /* 设备数据api end */

    /* 自定义统计方法 start */
    getMethodList: '/stats/customApi/getMethodList',
    getMethodLimit: '/stats/customApi/getMethodLimit',
    getMethodProductList: '/stats/singleMonitor/behavior/getProductList',
    getProtocolListByProductId: '/protoManage/getProtocolListByProductId',
    addMethod: '/stats/customApi/addMethod',
    getMethodDetail: '/stats/customApi/getMethodDeail',
    delMethod: '/stats/customApi/delMethod',
    /* 自定义统计方法 end */

    /**
     * 新建产品 start
     * aize-2019-09-10
     */
    getCatalogList: '/product/getCatalogList',//产品三级类目list
    productBaseTypeList: '/product/baseType/list',//获取产品基本数据类型列表 productBaseTypeList
    addProduct: '/product/addProduct',//新建产品
    /* 新建产品 end */

     /**
     * 硬件开发 start
     * aize-2019-09-11
     */
    moduleBrandList: '/product/moduleBrand/list',//获取模组厂家列表
    getModuleList: '/product/getModuleList',//获取模组列表
    mcuCodeCheck: '/protoManage/mcuCodeCheck',//生成并下载MCU SDK --- 检测与协议得关系
    mcuCodeExport: '/protoManage/mcuCodeExport',//生成并下载MCU SDK
    saveModule: '/product/saveModule',//保存产品所选模组信息
    getModuleInfo:'/product/getModuleInfo',


    /**
     * 商业发布 start
     * aize-2019-09-17
     */
    saveCommerceInfo: '/product/saveCommerceInfo',//保存产品商业化信息
    productPublishAdd: '/productPublish/add',//产品发布
    getCommerceInfo: '/product/getCommerceInfo',//获取商业化信息
    /* 商业发布 end */

    /**
     * 产品-基本信息 start
     * aize-2019-09-18
     */
    getBusinessInfo: '/product/commerce/info/show',//产品-基本信息-商业化信息
    getPublishProductFn:'',//功能定义
    getPublishProductLabelList:'/label/list',//标签列表
    getPublishProductLabelAdd:'/label/create',//新增标签
    getPublishProductLabelDel:'/label/delete',//删除标签
    getPublishProductLabelEdit:'/label/update',//编辑标签


    /*产品-标签*/
    getProductLabelList:'/label/getList',
    getProductLabelBaseList:'/label/getDownList',
    addProductLabel:'/label/add',
    updateProductLabel:'/label/update',
    delProductLabel:'/label/delete',

     /*产品-物标签*/
     getThingLabelList:'/thing/label/getList',

    /*设备管理*/
    
    getUserProduct:'/deviceInfo/getProduct',//获取账号下的产品
    getDeviceStat:'/deviceInfo/deviceStat',//获取设备入网统计
    getDeviceList:'/deviceManage/getDeviceList',//获取联网设备列表
    getDeviceInfo:'/deviceManage/getDeviceDetailInfo',//获取设备详情
    getDeviceLabelList:'/deviceLabel/getList',//获取设备标签列表
    getLabelBaseList:'/deviceLabel/getDownList',//获取标签库列表
    addDeviceLabel:'/deviceLabel/add',//新增设备标签
    updateDeviceLabel:'/deviceLabel/update',//修改设备标签
    deleteDeviceLabel:'/deviceLabel/delete',//删除设备标签
    exportDeviceList:'/deviceManage/exportDeviceList',//导出数据
    deviceShadow:'/deviceManage/getProtocolList',//设备影子
    deviceShadowHis:'/deviceManage/getHistoryProtocolList',//设备影子历史数据
    exportShadowHis:'/deviceManage/exportHistoryProtocolList',//设备影子历史数据
    getDeviceTitle:'/getDeviceDetailList',//设备头部
    

    /**
     * 账户-访问用户 start
     * aize-2019-10-30
     */
    getChildlist: '/common/getSubUserList',//获得子账户分页列表
    freezeChild: '/common/freezeSubUser',//停用子账户
    unfreezeChild: '/common/activeSubUser',//启动子账户
    deleteChild: '/common/deleteSubUser',//删除子账户
    getRoleList: '/role/getRoleList',//角色下拉框
    addMultiChild: '/common/createSubUser',//添加用户
    updateChild: '/common/updateSubUser',
    getChildWithSecret: '/common/getSubUserInfo',//获得单个子账号+secret数据

    
    getRights: '/rights/getRights',//获得角色/子账户正在使用的角色的权限数据及相关列表
    /* 账户-访问用户 end */

    /**
     * 账户-用户角色 start
     * aize-2019-11-06
     */
    getRolePage: '/rights/getRolePage',
    deleteRole: '/rights/deleteRole',
    
    saveRole: '/rights/createRole',

    /**
     * 数据订阅 start
     * xiao-2019-10-16
     */
    getDataSubscriptionList: '/data/push/config/getList',
    getCurSubscription: '/data/push/config/getByUrlConfId',
    stopCurSubscription: '/data/push/config/stop'+version,
    enabledCurSubscription: '/data/push/config/enabled'+version,
    getProductByDeveloperId: '/data/push/config/getProductByDeveloperId',
    getLabelByProductId: '/data/push/config/getLabelByProductId',
    createSubscription: '/data/push/config/create'+version,
    saveSubscription: '/data/push/config/save'+version,
    subscribeList:'/datapush/getSubscriptConfList', //数据订阅列表
    subscribeStart:'/datapush/enabled',//启动数据订阅
    subscribeClose:'/datapush/stop',//停用数据订阅
    subscribeDetail:'/datapush/getByUrlConfId',//订阅详情
    addsubscribe:'/datapush/create',//新增数据订阅
    getLabelByAddress:'/deviceLabel/getDeviceLabelByProductId',//通过地区获取label

    /**
     * 基础产品--应用 start
     * xiao-2019-10-17
     */
    getApplicationList: '/devapp/getAppList',
    saveAppBaseInfo: '/devapp/saveAppBaseInfo'+version,
    saveMiniProgramsInfo: '/devapp/saveMiniProgramsInfo'+version,
    deleteRelationProduct: '/devapp/deleteRelaProduct'+version,
    deleteAppVersion: '/devapp/version/delete'+version,
    getAppInfo: '/devapp/getAppInfo',
    updateRelaProduct: '/devapp/updateRelaProduct'+version,
    deleteApp: '/devapp/delete'+version,
    createAppVersion: '/devapp/version/add'+version,
    getAppVersionDetail: '/devapp/version/get',
    getRelaProducts: '/devapp/getRelaProducts',
    getVersionList: '/devapp/getList',
    getDevProductList: '/devapp/getDevProductList',

    /**
     * 控制日志
     */
    getOperateLogList: '/operate/log/getList',

    /**
     * 消息中心
     */

    getNoticeList: '/systemNotice/getNoticeList',
    getNoticeDetail: '/systemNotice/getNoticeDetail',
    setRead: '/systemNotice/setRead',
    getUnreadQuantity: '/systemNotice/getUnreadQuantity',

    /**
     * 基础产品--产品--设备注册 start
     * xiao-2019-12-02
     */
    getStatisticsData: '/device/register/statistics',
    getDeviceRegisterList: '/device/register/list',
    registerImport: '/device/register/import',

    //设备告警
    getDeviceWarningTotal: '/device/warning/info/summary',
    getWarningList: '/device/warning/info/list',
    saveWarningConfig: '/device/warning/rule/save',
    getWarningConfigLi: '/device/warning/rule/list',
    delWarningConfig: '/device/warning/rule/delete',
    startWarningConfigLi: '/device/warning/rule/start',
    stopWarningConfig: '/device/warning/rule/stop',
    getWarningConfigDetail: '/device/warning/rule/get',
    getWarningInfo: '/device/warning/info/get',
    dealWithWarning: '/device/warning/info/update',
    
    getDeviceListByProId: '/remoteConfig/deviceInfo/getList',
    getWarnProperty:'/device/warning/property/get',
    getWarnEventProperty:'/device/warning/event/get',
    getWarnEventLi:'/device/warning/event/list',

    
    // 5.x远程配置
    getRomoteConfigListByProduct5x: '/remoteConfig/product/getList', // 主页列表
    getRemoteDeviceList5x: '/remoteConfig/deviceInfo/getList', // 获得单个产品下的设备列表
    importRemoteConfigExcel: '/remoteConfig/deviceInfo/import', // 本地导入设备列表
    saveRemoteConfig5x: '/remoteConfig/product/save', // 保存单个产品的远程配置任务
    executeTask5x: '/remoteConfig/product/submit', // 执行远程配置任务
    getRemoteConfig5x: '/remoteConfig/product/get', // 获得单个产品的远程配置任务
    deleteRemoteConfig: '/remoteConfig/product/delete', // 删除单个产品的配置任务
    

    // 远程配置
    getRomoteConfigListByProduct:'/remote/config/product/task/getPage',
    saveRomoteConfig:'/remote/config/product/task/save',
    submitRomoteConfig:'/remote/config/product/task/submit',
    deleteRomoteConfig:'/remote/config/product/task/delete',
    getAllDeviceInfo:'/remote/config/product/device/getAllDeviceInfoPage',
    getDeviceInfoByIdOrMacAddress:'/remote/config/product/device/getDeviceInfoByIdOrMacAddress',
    downloadRemoteDeviceTemplateExcel:'/remote/config/product/device/downloadExcel',
    importRemoteDeviceExcel:'/remote/config/product/device/importExcel',
    getRemoteDetail:'/remote/config/product/task/get',
    getResultTotal:'/remote/config/product/task/getResultTotal',
    getDeviceResultList:'/remote/config/product/task/getResultPager',
    retryByTaskId:'/remote/config/product/task/retry',
    batchRetry:'/remote/config/product/task/batchRetry',
    exportTaskResult:'/remote/config/product/task/exportResult',
    getReceiveMsg:'/remote/config/product/task/getReceiveMsg',
    getRomoteConfigListForDevice:'/remote/config/device/task/getPage',
    getRemoteDetailForDevice:'/remote/config/device/task/get',
    saveRomoteConfigForDevice:'/remote/config/device/task/saveAndSubmit',
    retryByTaskIdForDevice:'/remote/config/device/task/retry',
    getReceiveMsgForDevice:'/remote/config/device/task/getReceiveMsg',

    //设备分组,废弃待删除，迁移至项目下面的分组
    // getGroupList:'/deviceGroup/getDeviceGroupList',
    // getGroupListAuth:'/group/getGroupList',
    // updateGroup:'/deviceGroup/addOrUpdate',
    // deleteGroup:'/deviceGroup/deleteGroup',
    // getGroupDetail:'/deviceGroup/getDeviceGroupInfo',
    // getGroupDeviceList:'/deviceGroup/getGroupDeviceList',
    // addGroupDevice:'/deviceGroup/groupRelaDevice',
    // getGroupSlctDev:'/deviceGroup/getRelaDeviceList',
    // delGroupDevice:'/deviceGroup/groupDeleteRelaDevice',
    // getCreateProduct:'/prod/getCreateProduct',
    // groupUpDevice:'/deviceGroup/importDevices',  

    //项目-设备分组
    getGroupList:'/projectGroup/getProjectGroupList',
    // getGroupListAuth:'/group/getGroupList',
    updateGroup:'/projectGroup/saveProjectGroup',
    deleteGroup:'/projectGroup/deleteProjectGroup',
    
    getGroupDetail:'/deviceGroup/getDeviceGroupInfo',
    getGroupDeviceList:'/deviceGroup/getGroupDeviceList',
    addGroupDevice:'/deviceGroup/groupRelaDevice',
    getGroupSlctDev:'/deviceGroup/getRelaDeviceList',
    delGroupDevice:'/deviceGroup/groupDeleteRelaDevice',
    getCreateProduct:'/prod/getCreateProduct',
    groupUpDevice:'/deviceGroup/importDevices',


    
    
    // 项目管理
    getProjectList:'/project/getList',    
    addProject:'/project/add',
    updateProject:'/project/update',
    deleteProject:'/project/delete',
    getProductInProject:'/prod/getProduct',
    getRelaProduct:'/prod/getRelaProduct',
    getRelaDevice:'/project/device/getRelaDevice',
    getDeviceInProject:'/project/device/getDevice',
    getServeList:'/serve/getList',
    serveAdd:'/serve/add',
    serveCopy:'/serveOpe/duplicate',
    serveDelete:'/serve/delete',
    servePublish:'/serveOpe/publish',
    serveInvoke:'/serveOpe/invoke',
    serveCallExplain:'/serveOpe/callExplain',
    getAllRelatedProduct:'/project/device/getDownProduct',
    getAllRelatedDevice:'/project/device/getRelatedDevice',
    unrelaProduct:'/prod/unrelaProduct',
    unrelaDevice:'/project/device/unrelaDevice',
    relaProduct:'/prod/relaProduct', 
    relaDevice:'/project/device/relaDevice', 
    addDevice:'/project/device/addDevice',
    getServiceLog:'/serveOpe/getServiceLog',
    getFlowData:'/serveOpe/editFlow',
    saveFlowData:'/serveOpe/saveFlow',
    getDataAnlzType:'/serveOpe/getDataAnlzType',
    getInvokeUrl:'/serveOpe/getInvokeUrl',
    parserSql:'/dataAccess/parserSql',
    getServeStatu:'/serve/get',
    getDownTbTreeByDs:'/dataAccess/getDownTbTreeByDs',
    getPublishParam:'/serveOpe/getPublishParam',
    updateServe:'/serve/update',
    sqlTestTslData:'/dataoperate/search/tslData',
    getProLogicTreeData:'/dataoperate/search/struct/product',
    sqlTestProductData:'/dataoperate/search/data/product',
    downTslHistory:'/dataoperate/search/download/history',
    addTslHistory: '/dataoperate/search/dataDownload',
    
    //设备监控
    geMonitorList:'/monitor/list',
    startMonitor:'/monitor/start',
    stopMonitor:'/monitor/stop',
    deleteMonitor:'/monitor/delete',
    addMonitor:'/monitor/add',
    updateMonitor:'/monitor/update',
    getMonitor:'/monitor/get',
    getTransfer4Monitor:'/transfer/getTransferList4Monitor',

    //OTA升级
    otaDevVersionList:'/firmware/productFirmware/getList',
    otaGetExtVersion:'/device/version/5/getExtVersion',
    otaDeleteVer:'/device/version/5/delete',

    firmwareFromProduct:'/product/firmware/package',
    otaAddVersion:'/firmware/device/version/add',
    otaGetVersionDetail:'/firmware/device/version/get',
    otaGetBatch:'/firmware/device/upgrade/publish/getBatch',
    otaGetBatchDevice:'/firmware/device/upgrade/publish/get',
    otaGetBatchInfo:'/firmware/device/upgrade/publish/getBatchInfo',
    otaCancelDevicePub:'/firmware/device/upgrade/publish/cancel',
    otaValiGetinfo:'/firmware/device/version/validate/getInfo',
    otaImportMac:'/firmware/device/version/importMac',
    otaValidate:'/firmware/device/version/validate',
    otaRelease:'/firmware/device/upgrade/publish',
    getMcuSocProLi:'/productManage/getFilterSchemaSelList',
    
    //总览页
    homeBanner:'/cover/getBannerList',//banner图
    messageList:'/cover/getSystemNotice' ,//消息列表
    appList:'/appInfoManage/getAppInfoList' ,//app列表
    devWarnCount:'/deviceCount/deviceWarningCount' ,//设备报警统计
    devSecreCount:'/deviceCount/deviceSecretKeyCount' ,//设备密钥统计
    devMnCount:'/deviceCount/deviceManageCount' ,//设备管理统计
    productCount:'/cover/getDeviceProductCount' ,//产品统计
    productList:'/productManage/getProductList' ,//产品列表

    // 产品发布前-定义功能
    editProductInfo:'/product/update',//产品-基本信息-编辑
    standardFnList:'/product/dev/show/func', //标准和自定义功能列表
    Physpanel:'/physicalModel/func/search',//产品-定义功能-创建物模型-查询模型列表
    exportPhysicalModel:'/physicalModel/export/product',//产品-定义功能-导出物模型
    PhysicalModelAction:'/physicalModel/func/product/action',//产品-功能定义-物模型-功能-增
    sepanel:'/physicalModel/func/search',//产品-功能定义-创建物模型-查询模型列表
    addPhticalStard:'/physicalModel/func/product/add',//产品-功能定义-物模型-新增标准模型
    downPhysicalModel:'/physicalModel/download/product',//产品-功能定义-下载物模型
    PhysicalModelList:'/physicalModel/func/search',//产品-定义功能-创建物模型-查询模型列表
    exportFnFile:'/product/dev/custom/func/upload',//产品-功能定义-导入自定义功能

    upProMaxStep:'/product/update/step',//记录产品最新配置步骤

    // //设备-设备管理
    // getDeviceList
    //工单
    getWorkOrderDictionary:'/workOrder/getWorkOrderDictionary',//工单-字典
    subWorkOrder :'/workOrder/createWorkOrder',//新增工单
    WorkOrderList:'/workOrder/getHistoryWorkOrderList',//工单列表
    WorkOrderDetail:'/workOrder/getWorkOrder',//工单详情
    downDeviceFile:'/deviceExport/exportDeviceList',//下载设备数据

    //数据服务
    deviceDataAn:'/summary/device/dashboard',//设备分析
    userDataAn:'/summary/account/dashboard',//用户分析
    deviceDataDown:'/summary/device/download',//设备分析下载
    userDataDown:'/summary/account/download',//用户分析下载
    allProductPubList:'/productManage/getPublishProductList',
    //公共接口
    getProductType:'/productManage/getSelectList',//产品下拉列表
    

    // 产品发布后-设备注册
    proReledRegist:'/deviceRegister/deviceList',//设备注册列表
    proReledCount:'/deviceRegister/statistics',//设备注册统计
    proReledExport:'/deviceRegister/importAddr',//设备注册导出
    proReledInfo:'/product/detail',//设备基本详情
    getProductPlus:'/productManage/getProductExtendList',//产品下拉带验证方式
    exportRegistFile:'/deviceRegister/export',//导出设备注册文件
    

    //确定面板接口
    cusSavePanel:'/panelManage/saveProject',//自定义-保存/更新面板
    delPanel:'/panelManage/delProject',//删除项目面板
    greyModel:'/panelManage/garyUpdate',//灰度
    modelRel:'/panelManage/formalUpdate',//发布
    greyHistory:'/panelManage/getGreyPubHistory',//项目灰度历史列表
    panelRelHistory:'/panelManage/getFormalPubHistory',//项目发布历史列表
    panelOffLine:'/panelManage/offlineUiDesign',//下线
    panelList:'/panelManage/getProjectPage',//获取产品下的所有项目
    panelApplicationList:'/panelManage/getAppsByProductId',//应用列表
    standardPanelList:'/panelManage/getTemplateMarketByProduct',//标准面板列表

    //场景服务
    scenceList:'/deviceProtocol/queryProtocolFromDevice',//获取场景规则列表
    // saveScenceData:'/deviceProtocol/saveProtocolToScene',//保存场景规则数据到规则引擎服务
    delScenceControl:'/deviceProtocol/deleteControlScene',//删除场景控制规则
    delScenceRun:'/deviceProtocol/deleteStatusScene',//删除场景运行规则
    saveScenceData:'/deviceProtocol/save',//新增

    //设备远程配置
    deviceRemoteConfigList:'/remoteConfig/device/getList',//获得设备远程配置分页列表
    singelDeviceRemoset:'/remoteConfig/device/get',//获得单个设备的远程配置任务
    delDeviceRemoset:'/remoteConfig/device/delete',//删除单个设备的远程配置任务
    saveDeviceRemoset:'/remoteConfig/device/save',//保存单个设备的远程配置任务
    addDeviceRemoset:'/remoteConfig/product/submit',//提交单个产品的远程配置任务
    excelDevTask:'/remoteConfig/device/submit',//执行设备下的任务

    //项目列表
    projectList:'/projectInfo/listByPage',

    // 项目新增/编辑
    saveProjectInfo: '/projectInfo/saveProjectInfo',

    // 项目详情-api列表
    getProjectApiList: '/projectDetail/getProjectApiList',

    //项目详情-概述
    projectInfoOverview:'/projectDetail/getProjectAuth',// 项目详情-概述
    projectWhiteList:'/projectDetail/getProjectWhiteList',//项目详情-白名单-列表
    projectWhiteDel:'/projectDetail/delProjectWhite',//项目详情-白名单-删除
    projectWhiteSave:'/projectDetail/saveProjectWhite',//项目详情-白名单-新增/保存
    projectSavePS:'/projectDetail/setPassword',//设置密码
    //项目详情-设备
    projectInfoBatchList:'/projectDevice/getProjectBatch',//项目详情-设备-查询项目批次列表
    projectInfoDevlist:'/projectDevice/getProjectDeviceList',// 项目详情-设备-查询项目设备列表
    projectImportFile:'/projectDevice/importDevice',//项目详情-设备-导入设备
    projectSaveFile:'/projectDevice/saveDevice',//项目详情-设备-导入设备-保存
    projectBatchInfo:'/projectDevice/getProjectBatchDetail',//项目详情-设备-批次-明细
    projectDelDev:'/projectDevice/deleteDeviceList',//项目详情-设备-删除设备列表
    projectRemoveDev:'/projectDevice/unbind',//项目详情-设备-移除绑定
};

// 拼接 urlPrefix
Object.keys(Paths).forEach(key => {
    if(!NOT_NEED_PREFIX.includes(key)) {
        Paths[key] = urlPrefix + Paths[key]
    }
})

export default Paths;
