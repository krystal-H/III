(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"Ex+q":function(e,t,n){},Uz1T:function(e,t,n){"use strict";n("SlgS"),n("lf9m"),n("ef1R"),n("Ra8s"),n("sfoS"),n("HsXu"),n("bs69"),n("Lm8M"),n("ryEf"),n("UTJx");var r=n("dVdO"),o=(n("MNU5"),n("YeX6")),c=(n("xzjF"),n("PeP6")),a=(n("2ek4"),n("oWtQ")),i=n("CvKH"),u=n.n(i),s=(n("sSxo"),n("av3G"),n("P37N"),n("62KB"),n("T9Mk")),l=n.n(s),f=(n("59iL"),n("f6Fh")),d=n("ivud"),p=n("dL2e"),y=n("Nlzp"),m=(n("QcZr"),n("b+L2"));n("9b3Y");function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=O(e);if(t){var o=O(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return S(this,n)}}function S(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var P=f.a.TabPane,I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(a,e);var t,n,r,c=v(a);function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=c.call(this,e)).state={planActiveKey:"0",btnIndex:0,summaryText:"",propertyText:"",suitableText:"",picture:"",currentSchemList:[],currentPhysicalModelId:"",dataSource:[]},t.columns=[{title:"功能名称",dataIndex:"name"},{title:"标识符",dataIndex:"identifier"},{title:"数据类型",dataIndex:"type",render:function(e,t){return l.a.createElement("span",null,t.dataType.type)}}],t}return t=a,(n=[{key:"componentDidMount",value:function(){var e=this;this.props.onRef&&this.props.onRef(this),console.log(this.props.btnList,"this.props.btnListthis.props.btnList"),this.setState({currentSchemList:this.props.btnList,currentPhysicalModelId:this.props.btnList[0].physicalModelId},(function(){e.getPlanMsg(0)}))}},{key:"handleChange",value:function(e){this.setState({planActiveKey:e}),1==e&&this.getPhysicalModelId(this.state.currentPhysicalModelId)}},{key:"changeBtn",value:function(e,t,n,r){var o=this;this.setState({btnIndex:e,planActiveKey:"0",currentPhysicalModelId:n.physicalModelId},(function(){o.props.changeBtnIndex(e),o.getPlanMsg(e)}))}},{key:"getPhysicalModelId",value:function(e){var t=this;Object(y.c)(y.a.getPhysicalModelId,{id:e}).then((function(e){t.setState({dataSource:e.data})}),(function(){t.setState({dataSource:[]})}))}},{key:"getPlanMsg",value:function(e){this.setState({summaryText:this.state.currentSchemList[e].summarize||"",propertyText:this.state.currentSchemList[e].feature||"",suitableText:this.state.currentSchemList[e].illustrate||"",picture:this.props.btnList[e].picture||""})}},{key:"saveSchemeData",value:function(){var e=u()(this.state.currentSchemList)[this.state.btnIndex];if(console.log(e,"select scheme-----------"),!e)return Notification({description:"请选择对应方案！",type:"warn"});var t={schemeId:e.schemeId,schemeTypeId:e.schemeTypeId,physicalModelId:e.physicalModelId,panelId:e.panelId,moduleId:e.moduleId};this.props.createSchemem(t)}},{key:"resetIndex",value:function(){this.setState({planActiveKey:"0"})}},{key:"render",value:function(){var e=this,t=this.state,n=t.btnIndex,r=t.planActiveKey,c=t.summaryText,a=t.propertyText,i=t.suitableText,u=t.picture,s=t.dataSource,d=this.props,p=d.tip,y=d.btnList;return l.a.createElement("div",{className:"dep-plan-block"},l.a.createElement("p",{className:"dep-plan-tip"},p),y?y.map((function(t,r){return l.a.createElement(o.a,{className:"dep-btn ".concat(n===r?"active-btn":""),key:t.schemeId,onClick:function(n){return e.changeBtn(r,"btnIndex",t,n)}},t.name)})):null,l.a.createElement("div",{className:"dep-plan-cont"},l.a.createElement(f.a,{activeKey:r,tabPosition:"left",onChange:function(t){return e.handleChange(t)}},l.a.createElement(P,{tab:"方案简介",key:"0"},l.a.createElement("div",{className:"dep-brief"},l.a.createElement("div",{className:"dep-brief-img"},l.a.createElement("img",{src:u,alt:"图片"})),l.a.createElement("div",{className:"flex1 dep-brief-cont-box"},l.a.createElement("div",{className:"dep-brief-cont"},l.a.createElement("p",{className:"dep-brief-cont-title"},"概述："),l.a.createElement("p",{className:"dep-brief-cont-desc"},c)),l.a.createElement("div",{className:"dep-brief-cont"},l.a.createElement("p",{className:"dep-brief-cont-title"},"特点："),l.a.createElement("p",{className:"dep-brief-cont-desc"},a)),l.a.createElement("div",{className:"dep-brief-cont"},l.a.createElement("p",{className:"dep-brief-cont-title"},"适合："),l.a.createElement("p",{className:"dep-brief-cont-desc"},i))))),l.a.createElement(P,{tab:"方案功能点",key:"1"},l.a.createElement("div",{className:"pad20"},l.a.createElement(m.a,{columns:this.columns,dataSource:s,rowKey:"identifier",pagination:!1,size:"small"}))),l.a.createElement(P,{tab:"方案控制面板",key:"2"},l.a.createElement("div",{className:"dep-brief"},l.a.createElement("div",{className:"dep-brief-img"}))))))}}])&&h(t.prototype,n),r&&h(t,r),a}(s.Component),E=Object(d.b)((function(e){return{schememData:e.getIn(["product","createProductScheme"]),btnkey:e.getIn(["product","createProductSchemeBtnKey"])}}),(function(e){return{createSchemem:function(t){return e(Object(p.c)(t))},changeBtnIndex:function(t){return e(Object(p.d)(t))}}}))(I);n("Ex+q");function C(e){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function x(e,t){return(x=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=L(e);if(t){var o=L(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return k(this,n)}}function k(e,t){return!t||"object"!==C(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function L(e){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var N=f.a.TabPane,R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&x(e,t)}(c,e);var t,n,r,o=T(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=o.call(this,e)).handleChange=function(e){t.refSwitchTab.resetIndex(),t.setState((function(){return{currentActiveKey:e}})),t.props.changeKey(e)},t.state={btnList1:[],btnList2:[],btnList3:[],thirdCategoryId:e.thirdCategoryId},t.refSwitchTab=null,t}return t=c,(n=[{key:"componentDidMount",value:function(){this.props.onRef&&this.props.onRef(this),this.getScheme()}},{key:"getScheme",value:function(){var e=this;Object(y.c)(y.a.getScheme,{deviceTypeId:this.state.thirdCategoryId}).then((function(t){for(var n in t.data)e.setState(w({},"btnList".concat(n),t.data[n]))}))}},{key:"render",value:function(){var e=this,t=this.state,n=(t.currentActiveKey,t.btnList1),r=t.btnList2,o=t.btnList3;return l.a.createElement(f.a,{onChange:function(t){return e.handleChange(t)},destroyInactiveTabPane:!0},n.length>0&&l.a.createElement(N,{tab:"免开发方案",key:"1"},l.a.createElement(E,{tip:"免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化。",btnList:n,onRef:function(t){e.refSwitchTab=t}})),r.length>0&&l.a.createElement(N,{tab:"独立MCU方案",key:"2"},l.a.createElement(E,{tip:"独立MCU方案，需选择下载MCU开发资料包等，进行相应开发。",btnList:r,onRef:function(t){e.refSwitchTab=t}})),o.length>0&&l.a.createElement(N,{tab:"SoC方案",key:"3"},l.a.createElement(E,{tip:"SoC方案，不提供通用固件程序，需自行开发模组固件。",btnList:o,onRef:function(t){e.refSwitchTab=t}})),n.length===r.length===o.length===0&&l.a.createElement("div",null,"暂无数据"))}}])&&j(t.prototype,n),r&&j(t,r),c}(s.Component),_=Object(d.b)((function(e){return{activeKey:e.getIn(["product","createProductSchemekey"])}}),(function(e){return{changeKey:function(t){return e(Object(p.e)(t))}}}))(R),B=(n("IHDg"),n("vV4J"),n("RfWx"),n("oENA"),n("uTCA")),M=(n("6IzV"),n("QFmM")),F=(n("UdMA"),n("ViyK")),D=(n("ETCN"),n("J2lP"),n("xc6N"),n("pckg"),n("P2RN"));function K(e){return(K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(Object(n),!0).forEach((function(t){q(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function V(e,t){return(V=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function H(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=G(e);if(t){var o=G(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return J(this,n)}}function J(e,t){return!t||"object"!==K(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function G(e){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var Q=c.a.Option,W=["Wifi","蓝牙","zigbee2.0","zigbee3.0","超级开关/衣柜"],X=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&V(e,t)}(a,e);var t,n,r,o=H(a);function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=o.call(this,e)).formRef=l.a.createRef(),t.getProductBrand=function(){Object(y.c)(y.a.getProductBrand,{}).then((function(e){t.setState({productBrandList:e.data})}),(function(){t.setState({productBrandList:[]})}))},t.getCommunicationProtocol=function(){Object(y.c)(y.a.getCommunicationProtocol,{},{loading:!0}).then((function(e){t.setState({protocolList:e.data})}))},t.resetData=function(){t.props.createProductForm({}),t.props.createProduct_Category({}),t.props.createProductScheme({}),t.props.createProductSchemekey("1"),t.props.createProductSchemeBtnKey(0)},t.onFinish=function(e){t.props.createProductForm(e);var n=z(z(z({},t.props.createProductCategory),t.props.schememData),e);console.log("调用提交的接口",n),Object(y.c)(y.a.createProduct,z({},n),{loading:!0}).then((function(e){Object(D.a)({description:"创建成功！",type:"success"}),t.props.handleCancel(),t.resetData(),t.props.getProductListNew()}),(function(){Object(D.a)({description:"创建失败！",type:"error"})}))},t.onFinishFailed=function(e){console.log("Failed:",e)},t.state={productBrandList:[],protocolList:[]},t}return t=a,(n=[{key:"componentDidMount",value:function(){this.props.onRef&&this.props.onRef(this),this.getProductBrand(),this.getCommunicationProtocol()}},{key:"render",value:function(){var e=this.state,t=e.productBrandList,n=e.protocolList,r=this.props.saveProductForm;return l.a.createElement(M.a,{ref:this.formRef,name:"setupProduct",labelCol:{span:4},wrapperCol:{span:19},initialValues:{productName:r.productName||"",brandId:r.brandId||""},onFinish:this.onFinish,onFinishFailed:this.onFinishFailed},l.a.createElement(M.a.Item,{label:"产品名称",name:"productName",rules:[{required:!0,message:"请输入产品名称"},{max:50,message:"最大输入长度为50"}]},l.a.createElement(F.a,{placeholder:"请输入产品名称，不能超过50个字符"})),l.a.createElement(M.a.Item,{label:"产品品牌",name:"brandId",rules:[{required:!0,message:"请选择产品品牌"}]},l.a.createElement(c.a,{style:{width:"100%"}},t.length>0&&t.map((function(e){return l.a.createElement(Q,{value:e.brandId,key:e.brandId},e.fullName)})))),l.a.createElement(M.a.Item,{label:"产品型号",name:"productCode",rules:[{pattern:new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9]+$/,"g"),message:"请输入产品型号，支持中英文、数字"}]},l.a.createElement(F.a,{maxLength:50,placeholder:"请输入产品型号，支持中英文、数字"})),l.a.createElement(M.a.Item,{name:"bindType",label:"通信协议",rules:[{required:!0,message:"请选择通信协议"}]},l.a.createElement(B.a.Group,null,n.length>0&&n.map((function(e){return l.a.createElement(B.a,{value:"".concat(e.bindTypeId,"#").concat(e.bindTypeVersion),key:"".concat(e.bindTypeId,"#").concat(e.bindTypeVersion),style:{marginBottom:8}},e.bindTypeName)})))),-1!==this.props.createProductCategory.deviceTypeName.indexOf("网关")&&l.a.createElement(M.a.Item,{name:"gatewayType",label:"网关子设备协议",rules:[{required:!0,message:"网关子设备协议"}]},l.a.createElement(B.a.Group,null,W.map((function(e,t){return l.a.createElement(B.a,{value:t+1,key:e},e)})))),1==this.props.createProductCategory.controlClass&&l.a.createElement(M.a.Item,{name:"portNumber",label:"控制端口数",rules:[{required:!0,pattern:new RegExp(/^[0-9]+$/,"g"),message:"请输入控制端口数，支持数字"}]},l.a.createElement(F.a,{placeholder:"请输入控制端口数，支持数字"})))}}])&&U(t.prototype,n),r&&U(t,r),a}(s.Component),Y=Object(d.b)((function(e){return{createProductCategory:e.getIn(["product","createProductCategory"]),schememData:e.getIn(["product","createProductScheme"]),saveProductForm:e.getIn(["product","createProductForm"])}}),(function(e){return{createProductForm:function(t){return e(Object(p.b)(t))},createProduct_Category:function(t){return e(Object(p.a)(t))},createProductScheme:function(t){return e(Object(p.c)(t))},createProductSchemekey:function(t){return e(Object(p.e)(t))},createProductSchemeBtnKey:function(t){return e(Object(p.d)(t))}}}))(X),Z=n("q5+0");function $(e){return($="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ee(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function te(e,t){return(te=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ne(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=oe(e);if(t){var o=oe(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return re(this,n)}}function re(e,t){return!t||"object"!==$(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function oe(e){return(oe=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var ce=a.a.Step,ae=c.a.Option,ie=[{title:"选择对应品类",content:"First-content"},{title:"确定开发方案",content:"Second-content"},{title:"建立产品信息",content:"Last-content"}],ue={cursor:"pointer"},se=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&te(e,t)}(f,e);var t,n,i,s=ne(f);function f(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(t=s.call(this,e)).resetData=function(){t.props.createProductForm({}),t.props.createProduct_Category({}),t.props.createProductScheme({}),t.props.createProductSchemekey("1"),t.props.createProductSchemeBtnKey(0)},t.getThirdCategory=function(){Object(y.b)(y.a.getThirdCategory,{},{loading:!0}).then((function(e){0===e.code&&t.setState({thirdCategoryList:e.data})}))},t.getSecondCategory=function(){Object(y.b)(y.a.getSecondCategory,{},{loading:!0}).then((function(e){0===e.code&&(t.setState({secondCategoryList:e.data}),e.data[0].deviceTypeList&&t.setState({needShowThirdList:e.data[0].deviceTypeList}))}))},t.getSecondById=function(e){Object(y.c)(y.a.getSecondById,{deviceTypeId:e},{loading:!0}).then((function(n){if(0===n.code){var r=u()(t.state.secondCategoryList).findIndex((function(e){return e.subCategoryId===n.data.subCategoryId}));t.setState({currentIndex:r,needShowThirdList:n.data.deviceTypeList},(function(){var n=u()(t.state.needShowThirdList).findIndex((function(t){return t.deviceTypeId===e}));t.setState({currentIndex2:n})}))}}))},t.searchHandle=function(e){e&&t.getSecondById(e)},t.judgeStep1=function(e){if(!t.state.currentIndex2&&0!==t.state.currentIndex2)return Object(D.a)({description:"请选择对应品类！",type:"warn"});u()(t.state.needShowThirdList).forEach((function(n,r){r===t.state.currentIndex2&&(t.props.createCategory({deviceTypeId:n.deviceTypeId,deviceSubtypeId:n.defaultDeviceSubtype.deviceSubtypeId,devSubKeyId:n.defaultDeviceSubtype.devSubKeyId,controlClass:n.defaultDeviceSubtype.controlClass,deviceTypeName:n.deviceTypeName,productIcon:n.deviceIcon}),t.setState({thirdCategoryId:n.deviceTypeId},(function(){t.setState({stepcurrent:++e})})))}))},t.clickNext=function(e,n){0===e?t.judgeStep1(e):1===e?(t.refScheme.refSwitchTab.saveSchemeData(),t.setState({stepcurrent:++e})):2===e&&t.refSetupProduct.formRef.current.submit()},t.clickPrevious=function(e,n){t.setState({stepcurrent:--e})},t.goOrder=function(){t.props.history.push({pathname:"/open/repairOrder"})},t.state={stepcurrent:0,currentIndex:0,currentIndex2:null,isDisabled:!1,thirdCategoryList:[],secondCategoryList:[],needShowThirdList:[],thirdCategoryId:""},t.refScheme=null,t.refSetupProduct=null,t}return t=f,(n=[{key:"componentDidMount",value:function(){this.resetData(),this.props.onRef&&this.props.onRef(this),this.getThirdCategory(),this.getSecondCategory()}},{key:"selectCategory",value:function(e,t,n){if("currentIndex"===t){var r=u()(this.state.secondCategoryList).filter((function(e){return e.subCategoryId===n.subCategoryId}));this.setState({needShowThirdList:r[0]&&r[0].deviceTypeList})}var o,c,a;this.setState((a=e,(c=t)in(o={currentIndex2:null})?Object.defineProperty(o,c,{value:a,enumerable:!0,configurable:!0,writable:!0}):o[c]=a,o))}},{key:"render",value:function(){var e=this,t=this.state,n=t.stepcurrent,i=t.currentIndex,u=t.currentIndex2,s=t.isDisabled,f=t.thirdCategoryList,d=t.secondCategoryList,p=t.needShowThirdList,y=t.thirdCategoryId,m=this.props,b=m.cancelHandle,h=m.visible,g=m.getProductListNew;return l.a.createElement(r.a,{title:"创建产品",centered:!0,destroyOnClose:!0,maskClosable:!1,visible:h,width:900,onCancel:b,wrapClassName:"add-modal",footer:[0!==n&&l.a.createElement(o.a,{key:"previous",onClick:function(t){return e.clickPrevious(n,t)}},"上一步"),l.a.createElement(o.a,{type:"primary",key:"next",disabled:s,onClick:function(t){return e.clickNext(n,t)}},2===n?"确认创建":"下一步")]},l.a.createElement("div",{className:"add-product"},l.a.createElement("div",{className:"step-box"},l.a.createElement(a.a,{current:n},ie.map((function(e,t){return l.a.createElement(ce,{key:e.title,title:e.title,style:ue})})))),0===n&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"search-box"},l.a.createElement(c.a,{showSearch:!0,allowClear:!0,style:{width:674},placeholder:"搜索产品品类",filterOption:function(e,t){return t.children.toLowerCase().indexOf(e.toLowerCase())>=0},onSelect:function(t){return e.searchHandle(t)}},f&&f.length>0&&f.map((function(e){return l.a.createElement(ae,{key:e.deviceTypeId,value:e.deviceTypeId},e.deviceTypeName)}))),l.a.createElement("div",null,"找不到想要的品类？   ",l.a.createElement("span",{className:"submit-item",style:ue,onClick:function(){return e.goOrder()}},"提交工单"))),l.a.createElement("div",{className:"level1-box"},d?d.map((function(t,n){return l.a.createElement("div",{className:"level1-box-item ".concat(i===n?"onwActive":""),key:t.subCategoryId,onClick:e.selectCategory.bind(e,n,"currentIndex",t)},t.subCategoryName)})):null),l.a.createElement("div",{className:"level2-box"},p?p.map((function(t,n){return l.a.createElement("div",{className:"level2-box-item ".concat(u===n?"twoActive":""),key:t.deviceTypeId,onClick:e.selectCategory.bind(e,n,"currentIndex2",t)},t.deviceTypeName,u===n&&l.a.createElement("span",{className:"selected-icon"}))})):null)),1===n&&l.a.createElement(_,{onRef:function(t){return e.refScheme=t},thirdCategoryId:y}),2===n&&l.a.createElement(Y,{onRef:function(t){return e.refSetupProduct=t},handleCancel:b,getProductListNew:g})))}}])&&ee(t.prototype,n),i&&ee(t,i),f}(s.Component);t.a=Object(d.b)((function(e){return{createProductCategory:e.getIn(["product","createProductCategory"])}}),(function(e){return{changeBtnIndex:function(t){return e(Object(p.d)(t))},changeKey:function(t){return e(Object(p.e)(t))},createCategory:function(t){return e(Object(p.a)(t))},createProductForm:function(t){return e(Object(p.b)(t))},createProduct_Category:function(t){return e(Object(p.a)(t))},createProductScheme:function(t){return e(Object(p.c)(t))},createProductSchemekey:function(t){return e(Object(p.e)(t))},createProductSchemeBtnKey:function(t){return e(Object(p.d)(t))}}}))(Object(Z.i)(se))}}]);