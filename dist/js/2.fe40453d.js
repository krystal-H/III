(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"10qG":function(e,t,n){e.exports=n.p+"static/images/panel-pic.e33b714b43374f4771f4eac6f758c62d.png"},"Ex+q":function(e,t,n){},Uz1T:function(e,t,n){"use strict";n("NBAS"),n("SuFq"),n("pNMO"),n("4Brf"),n("07d7"),n("0oug"),n("4mDm"),n("PKPk"),n("3bBZ"),n("k3Gp");var r=n("kLXV"),c=(n("L/Qf"),n("2/Rp")),o=(n("8QGh"),n("2fM7")),a=(n("RKNx"),n("L41K")),i=n("BkRI"),u=n.n(i),s=(n("x0AG"),n("FZtP"),n("TeQF"),n("2B1R"),n("q1tI")),l=n.n(s),f=(n("AUBz"),n("ZTPi")),p=n("/MKj"),d=n("dL2e"),y=n("Nlzp"),m=(n("mbEz"),n("wCAj"));n("sMBO");function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=P(e);if(t){var c=P(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return S(this,n)}}function S(e,t){return!t||"object"!==h(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var O=f.a.TabPane,I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(i,e);var t,r,o,a=g(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=a.call(this,e)).state={planActiveKey:"0",btnIndex:0,summaryText:"",propertyText:"",suitableText:"",picture:"",currentSchemList:[],currentPhysicalModelId:"",dataSource:[],panelPic:""},t.columns=[{title:"功能名称",dataIndex:"name"},{title:"标识符",dataIndex:"identifier"},{title:"数据类型",dataIndex:"type",render:function(e,t){return l.a.createElement("span",null,t.dataType.type)}}],t}return t=i,(r=[{key:"componentDidMount",value:function(){var e=this;this.props.onRef&&this.props.onRef(this),console.log(this.props.btnList,"this.props.btnListthis.props.btnList"),this.setState({currentSchemList:this.props.btnList,currentPhysicalModelId:this.props.btnList[0].physicalModelId},(function(){e.getPlanMsg(0),e.getPanel()}))}},{key:"handleChange",value:function(e){this.setState({planActiveKey:e}),1==e&&this.getPhysicalModelId(this.state.currentPhysicalModelId)}},{key:"changeBtn",value:function(e,t,n,r){var c=this;this.setState({btnIndex:e,planActiveKey:"0",currentPhysicalModelId:n.physicalModelId},(function(){c.props.changeBtnIndex(e),c.getPlanMsg(e),c.getPanel()}))}},{key:"getPanel",value:function(){var e=this;Object(y.c)(y.a.getPanel,{deviceTypeId:this.props.deviceTypeId}).then((function(t){e.setState({panelPic:t.data&&t.data[0]&&t.data[0].page1})}))}},{key:"getPhysicalModelId",value:function(e){var t=this;Object(y.c)(y.a.getPhysicalModelId,{id:e}).then((function(e){t.setState({dataSource:e.data})}),(function(){t.setState({dataSource:[]})}))}},{key:"getPlanMsg",value:function(e){this.setState({summaryText:this.state.currentSchemList[e].summarize||"",propertyText:this.state.currentSchemList[e].feature||"",suitableText:this.state.currentSchemList[e].illustrate||"",picture:this.props.btnList[e].picture||""})}},{key:"saveSchemeData",value:function(){var e=u()(this.state.currentSchemList)[this.state.btnIndex];if(console.log(e,"select scheme-----------"),!e)return Notification({description:"请选择对应方案！",type:"warn"});var t={schemeId:e.schemeId,schemeTypeId:e.schemeTypeId,physicalModelId:e.physicalModelId,panelId:e.panelId,moduleId:e.moduleId};this.props.createSchemem(t)}},{key:"resetIndex",value:function(){this.setState({planActiveKey:"0"})}},{key:"render",value:function(){var e=this,t=this.state,r=t.btnIndex,o=t.planActiveKey,a=t.summaryText,i=t.propertyText,u=t.suitableText,s=t.picture,p=t.dataSource,d=t.panelPic,y=this.props,h=y.tip,b=y.btnList;return l.a.createElement("div",{className:"dep-plan-block"},l.a.createElement("p",{className:"dep-plan-tip"},h),b?b.map((function(t,n){return l.a.createElement(c.a,{className:"dep-btn ".concat(r===n?"active-btn":""),key:t.schemeId,onClick:function(r){return e.changeBtn(n,"btnIndex",t,r)}},t.name)})):null,l.a.createElement("div",{className:"dep-plan-cont"},l.a.createElement(f.a,{activeKey:o,tabPosition:"left",onChange:function(t){return e.handleChange(t)}},l.a.createElement(O,{tab:"方案简介",key:"0"},l.a.createElement("div",{className:"dep-brief"},l.a.createElement("div",{className:"dep-brief-img"},l.a.createElement("img",{src:s,alt:"图片"})),l.a.createElement("div",{className:"flex1 dep-brief-cont-box"},l.a.createElement("div",{className:"dep-brief-cont"},l.a.createElement("p",{className:"dep-brief-cont-title"},"概述："),l.a.createElement("p",{className:"dep-brief-cont-desc"},a)),l.a.createElement("div",{className:"dep-brief-cont"},l.a.createElement("p",{className:"dep-brief-cont-title"},"特点："),l.a.createElement("p",{className:"dep-brief-cont-desc"},i)),l.a.createElement("div",{className:"dep-brief-cont"},l.a.createElement("p",{className:"dep-brief-cont-title"},"适合："),l.a.createElement("p",{className:"dep-brief-cont-desc"},u))))),l.a.createElement(O,{tab:"方案功能点",key:"1"},l.a.createElement("div",{className:"pad20"},l.a.createElement(m.a,{columns:this.columns,dataSource:p,rowKey:"identifier",pagination:!1,size:"small"}))),l.a.createElement(O,{tab:"方案控制面板",key:"2"},l.a.createElement("div",{className:"dep-brief"},l.a.createElement("div",{className:"dep-brief-img"},l.a.createElement("img",{src:d||n("10qG"),alt:""})))))))}}])&&b(t.prototype,r),o&&b(t,o),i}(s.Component),E=Object(p.connect)((function(e){return{schememData:e.getIn(["product","createProductScheme"]),btnkey:e.getIn(["product","createProductSchemeBtnKey"])}}),(function(e){return{createSchemem:function(t){return e(Object(d.c)(t))},changeBtnIndex:function(t){return e(Object(d.d)(t))}}}))(I);n("Ex+q");function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function x(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=k(e);if(t){var c=k(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return T(this,n)}}function T(e,t){return!t||"object"!==w(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var R=f.a.TabPane,N=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(o,e);var t,n,r,c=x(o);function o(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),(t=c.call(this,e)).handleChange=function(e){t.refSwitchTab.resetIndex(),t.setState((function(){return{currentActiveKey:e}})),t.props.changeKey(e)},t.state={btnList1:[],btnList2:[],btnList3:[],btnList4:[],btnList5:[],thirdCategoryId:e.thirdCategoryId},t.refSwitchTab=null,t}return t=o,(n=[{key:"componentDidMount",value:function(){this.props.onRef&&this.props.onRef(this),this.getScheme()}},{key:"getScheme",value:function(){var e=this;Object(y.c)(y.a.getScheme,{deviceTypeId:this.state.thirdCategoryId}).then((function(t){for(var n in t.data)e.setState(C({},"btnList".concat(n),t.data[n]))}))}},{key:"render",value:function(){var e=this,t=this.state,n=(t.currentActiveKey,t.btnList1),r=t.btnList2,c=t.btnList3,o=t.btnList4,a=t.btnList5,i=this.props.thirdCategoryId;return l.a.createElement(f.a,{onChange:function(t){return e.handleChange(t)},destroyInactiveTabPane:!0},n.length>0&&l.a.createElement(R,{tab:"免开发方案",key:"1"},l.a.createElement(E,{tip:"免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化。",btnList:n,deviceTypeId:i,onRef:function(t){e.refSwitchTab=t}})),r.length>0&&l.a.createElement(R,{tab:"独立MCU方案",key:"2"},l.a.createElement(E,{tip:"独立MCU方案，需选择下载MCU开发资料包等，进行相应开发。",btnList:r,deviceTypeId:i,onRef:function(t){e.refSwitchTab=t}})),c.length>0&&l.a.createElement(R,{tab:"SoC方案",key:"3"},l.a.createElement(E,{tip:"SoC方案，不提供通用固件程序，需自行开发模组固件。",btnList:c,deviceTypeId:i,onRef:function(t){e.refSwitchTab=t}})),o.length>0&&l.a.createElement(R,{tab:"成品接入方案",key:"4"},l.a.createElement(E,{tip:"成品接入方案，支持已上市的产品，云对云方式或C-Life代理直连方式接入C-Life平台。",btnList:o,deviceTypeId:i,onRef:function(t){e.refSwitchTab=t}})),a.length>0&&l.a.createElement(R,{tab:"操作系统方案",key:"5"},l.a.createElement(E,{tip:"操作系统方案，产品自带Android或者Linux系统，可实现丰富的功能。",btnList:a,deviceTypeId:i,onRef:function(t){e.refSwitchTab=t}})),n.length===r.length===c.length===0&&l.a.createElement("div",null,"暂无数据"))}}])&&j(t.prototype,n),r&&j(t,r),o}(s.Component),B=Object(p.connect)((function(e){return{activeKey:e.getIn(["product","createProductSchemekey"])}}),(function(e){return{changeKey:function(t){return e(Object(d.e)(t))}}}))(N),_=(n("tkto"),n("5DmW"),n("27RR"),n("tULf"),n("Vl3Y")),M=(n("1vPl"),n("5rEg")),D=(n("rB9j"),n("EnZy"),n("TWNs"),n("JfAA"),n("P2RN"));function F(e){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(Object(n),!0).forEach((function(t){q(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function U(e,t){return(U=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function G(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=W(e);if(t){var c=W(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return V(this,n)}}function V(e,t){return!t||"object"!==F(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function W(e){return(W=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}o.a.Option;var Z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&U(e,t)}(o,e);var t,n,r,c=G(o);function o(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),(t=c.call(this,e)).formRef=l.a.createRef(),t.getProductBrand=function(){Object(y.c)(y.a.getProductBrand,{}).then((function(e){t.setState({productBrandList:e.data})}),(function(){t.setState({productBrandList:[]})}))},t.resetData=function(){t.props.createProductForm({}),t.props.createProduct_Category({}),t.props.createProductScheme({}),t.props.createProductSchemekey("1"),t.props.createProductSchemeBtnKey(0)},t.onFinish=function(e){t.props.createProductForm(e);var n=A(A(A({},t.props.createProductCategory),t.props.schememData),e);console.log("submit",n),Object(y.c)(y.a.createProduct,A({},n),{loading:!0}).then((function(e){Object(D.a)({description:"创建成功！",type:"success"}),t.props.handleCancel(),t.resetData(),t.props.getProductListNew()}),(function(){Object(D.a)({description:"创建失败！",type:"error"})}))},t.onFinishFailed=function(e){console.log("Failed:",e)},t.changeProtocol=function(e){t.formRef.current.setFieldsValue({netTypeId:""});var n=e.target.value.split("#")[0];t.state.networkWayList.forEach((function(e){n==e.txfs&&t.setState({networkList:e.pwfs})}))},t.state={productBrandList:[],protocolList:[],networkList:[],networkWayList:[]},t}return t=o,(n=[{key:"componentDidMount",value:function(){this.props.onRef&&this.props.onRef(this),this.getProductBrand()}},{key:"render",value:function(){var e=this.state,t=(e.productBrandList,e.protocolList,e.networkList,this.props.saveProductForm);return l.a.createElement(_.a,{ref:this.formRef,name:"setupProduct",labelCol:{span:4},wrapperCol:{span:19},initialValues:{productName:t.productName||"",brandName:t.brandName||""},onFinish:this.onFinish,onFinishFailed:this.onFinishFailed,autoComplete:"off"},l.a.createElement(_.a.Item,{label:"产品名称",name:"productName",rules:[{required:!0,message:"请输入产品名称"},{pattern:new RegExp(/^(?!\s)(?!.*\s$)/),message:"首尾不能输入空格"}]},l.a.createElement(M.a,{placeholder:"请输入产品名称，不能超过50个字符",maxLength:50})),l.a.createElement("div",null),l.a.createElement(_.a.Item,{label:"产品品牌",name:"brandName",rules:[{required:!0,message:"请输入产品品牌"},{pattern:new RegExp(/^(?!\s)(?!.*\s$)/),message:"首尾不能输入空格"}]},l.a.createElement(M.a,{placeholder:"请输入产品品牌，不能超过50个字符",maxLength:50})),l.a.createElement(_.a.Item,{label:"产品型号",name:"productCode",rules:[{required:!1,message:"请输入产品型号"},{pattern:new RegExp(/^(?!\s)(?!.*\s$)/),message:"首尾不能输入空格"}]},l.a.createElement(M.a,{maxLength:50,placeholder:"请输入产品型号"})))}}])&&z(t.prototype,n),r&&z(t,r),o}(s.Component),H=Object(p.connect)((function(e){return{createProductCategory:e.getIn(["product","createProductCategory"]),schememData:e.getIn(["product","createProductScheme"]),saveProductForm:e.getIn(["product","createProductForm"])}}),(function(e){return{createProductForm:function(t){return e(Object(d.b)(t))},createProduct_Category:function(t){return e(Object(d.a)(t))},createProductScheme:function(t){return e(Object(d.c)(t))},createProductSchemekey:function(t){return e(Object(d.e)(t))},createProductSchemeBtnKey:function(t){return e(Object(d.d)(t))}}}))(Z),J=n("55Ip");function Q(e){return(Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function $(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function X(e,t){return(X=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=te(e);if(t){var c=te(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return ee(this,n)}}function ee(e,t){return!t||"object"!==Q(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function te(e){return(te=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var ne=a.a.Step,re=o.a.Option,ce=[{title:"选择对应品类",content:"First-content"},{title:"确定开发方案",content:"Second-content"},{title:"建立产品信息",content:"Last-content"}],oe={cursor:"pointer"},ae=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&X(e,t)}(f,e);var t,n,i,s=Y(f);function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=s.call(this,e)).resetData=function(){t.props.createProductForm({}),t.props.createProduct_Category({}),t.props.createProductScheme({}),t.props.createProductSchemekey("1"),t.props.createProductSchemeBtnKey(0)},t.getThirdCategory=function(){Object(y.b)(y.a.getThirdCategory,{},{loading:!0}).then((function(e){0===e.code&&t.setState({thirdCategoryList:e.data})}))},t.getSecondCategory=function(){Object(y.b)(y.a.getSecondCategory,{},{loading:!0}).then((function(e){0===e.code&&(t.setState({secondCategoryList:e.data}),e.data[0].deviceTypeList&&t.setState({needShowThirdList:e.data[0].deviceTypeList}))}))},t.getSecondById=function(e){Object(y.c)(y.a.getSecondById,{deviceTypeId:e},{loading:!0}).then((function(n){if(0===n.code){var r=u()(t.state.secondCategoryList).findIndex((function(e){return e.subCategoryId===n.data.subCategoryId}));t.setState({currentIndex:r,needShowThirdList:n.data.deviceTypeList},(function(){var n=u()(t.state.needShowThirdList).findIndex((function(t){return t.deviceTypeId===e}));t.setState({currentIndex2:n})}))}}))},t.searchHandle=function(e){e&&t.getSecondById(e)},t.judgeStep1=function(e){if(!t.state.currentIndex2&&0!==t.state.currentIndex2)return Object(D.a)({description:"请选择对应品类！",type:"warn"});u()(t.state.needShowThirdList).forEach((function(n,r){r===t.state.currentIndex2&&(t.props.createCategory({deviceTypeId:n.deviceTypeId,deviceSubtypeId:n.defaultDeviceSubtype.deviceSubtypeId,devSubKeyId:n.defaultDeviceSubtype.devSubKeyId,controlClass:n.defaultDeviceSubtype.controlClass,deviceTypeName:n.deviceTypeName,productIcon:n.deviceIcon,productClassId:n.productClassId}),t.setState({thirdCategoryId:n.deviceTypeId},(function(){t.setState({stepcurrent:++e})})))}))},t.clickNext=function(e,n){0===e?t.judgeStep1(e):1===e?(t.refScheme.refSwitchTab.saveSchemeData(),t.setState({stepcurrent:++e})):2===e&&t.refSetupProduct.formRef.current.submit()},t.clickPrevious=function(e,n){t.setState({stepcurrent:--e})},t.goOrder=function(){t.props.history.push({pathname:"/open/repairOrder"})},t.state={stepcurrent:0,currentIndex:0,currentIndex2:null,isDisabled:!1,thirdCategoryList:[],secondCategoryList:[],needShowThirdList:[],thirdCategoryId:""},t.refScheme=null,t.refSetupProduct=null,t}return t=f,(n=[{key:"componentDidMount",value:function(){this.resetData(),this.props.onRef&&this.props.onRef(this),this.getThirdCategory(),this.getSecondCategory()}},{key:"selectCategory",value:function(e,t,n){if("currentIndex"===t){var r=u()(this.state.secondCategoryList).filter((function(e){return e.subCategoryId===n.subCategoryId}));this.setState({needShowThirdList:r[0]&&r[0].deviceTypeList})}var c,o,a;this.setState((a=e,(o=t)in(c={currentIndex2:null})?Object.defineProperty(c,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):c[o]=a,c))}},{key:"render",value:function(){var e=this,t=this.state,n=t.stepcurrent,i=t.currentIndex,u=t.currentIndex2,s=t.isDisabled,f=t.thirdCategoryList,p=t.secondCategoryList,d=t.needShowThirdList,y=t.thirdCategoryId,m=this.props,h=m.cancelHandle,b=m.visible,v=m.getProductListNew;return l.a.createElement(r.a,{title:"创建产品",centered:!0,destroyOnClose:!0,maskClosable:!1,visible:b,width:900,onCancel:h,wrapClassName:"add-modal",footer:[0!==n&&l.a.createElement(c.a,{key:"previous",onClick:function(t){return e.clickPrevious(n,t)}},"上一步"),l.a.createElement(c.a,{type:"primary",key:"next",disabled:s,onClick:function(t){return e.clickNext(n,t)}},2===n?"确认创建":"下一步")]},l.a.createElement("div",{className:"add-product"},l.a.createElement("div",{className:"step-box"},l.a.createElement(a.a,{current:n},ce.map((function(e,t){return l.a.createElement(ne,{key:e.title,title:e.title,style:oe})})))),0===n&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"search-box"},l.a.createElement(o.a,{showSearch:!0,allowClear:!0,style:{width:674},placeholder:"搜索产品品类",filterOption:function(e,t){return t.children.toLowerCase().indexOf(e.toLowerCase())>=0},onSelect:function(t){return e.searchHandle(t)}},f&&f.length>0&&f.map((function(e){return l.a.createElement(re,{key:e.deviceTypeId,value:e.deviceTypeId},e.deviceTypeName)}))),l.a.createElement("div",null,"找不到想要的品类？   ",l.a.createElement("span",{className:"submit-item",style:oe,onClick:function(){return e.goOrder()}},"提交工单"))),l.a.createElement("div",{className:"level1-box"},p?p.map((function(t,n){return l.a.createElement("div",{className:"level1-box-item ".concat(i===n?"onwActive":""),key:t.subCategoryId,onClick:e.selectCategory.bind(e,n,"currentIndex",t)},t.subCategoryName)})):null),l.a.createElement("div",{className:"level2-box"},d?d.map((function(t,n){return l.a.createElement("div",{className:"level2-box-item ".concat(u===n?"twoActive":""),key:t.deviceTypeId,onClick:e.selectCategory.bind(e,n,"currentIndex2",t)},t.deviceTypeName,u===n&&l.a.createElement("span",{className:"selected-icon"}))})):null)),1===n&&l.a.createElement(B,{onRef:function(t){return e.refScheme=t},thirdCategoryId:y}),2===n&&l.a.createElement(H,{onRef:function(t){return e.refSetupProduct=t},handleCancel:h,getProductListNew:v})))}}])&&$(t.prototype,n),i&&$(t,i),f}(s.Component);t.a=Object(p.connect)((function(e){return{createProductCategory:e.getIn(["product","createProductCategory"])}}),(function(e){return{changeBtnIndex:function(t){return e(Object(d.d)(t))},changeKey:function(t){return e(Object(d.e)(t))},createCategory:function(t){return e(Object(d.a)(t))},createProductForm:function(t){return e(Object(d.b)(t))},createProduct_Category:function(t){return e(Object(d.a)(t))},createProductScheme:function(t){return e(Object(d.c)(t))},createProductSchemekey:function(t){return e(Object(d.e)(t))},createProductSchemeBtnKey:function(t){return e(Object(d.d)(t))}}}))(Object(J.withRouter)(ae))}}]);