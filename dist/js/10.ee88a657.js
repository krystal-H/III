(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"Ex+q":function(e,t,n){},QOSG:function(e,t,n){"use strict";n.r(t);n("NBAS"),n("SuFq"),n("tkto"),n("pNMO"),n("TeQF"),n("5DmW"),n("FZtP"),n("27RR"),n("4Brf"),n("0oug"),n("4mDm"),n("PKPk"),n("3bBZ"),n("YQTV");var a=n("NUBc"),r=(n("mbEz"),n("wCAj")),o=(n("L/Qf"),n("2/Rp")),c=(n("8QGh"),n("2fM7")),l=(n("1vPl"),n("5rEg")),i=n("BkRI"),u=n.n(i),s=(n("SYor"),n("07d7"),n("5s+n"),n("p532"),n("ma9I"),n("q1tI")),f=n.n(s),p=(n("dP/0"),n("/MKj")),d=n("dL2e"),m=n("mU7p"),y=n("kqA8"),b=n("FC04"),h=n("P2RN"),v=n("MeRu"),g=n("Nlzp"),E=(n("k3Gp"),n("kLXV")),O=(n("RKNx"),n("L41K")),w=(n("2B1R"),n("Ex+q"),n("AUBz"),n("ZTPi"));function P(e){return(P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function x(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=C(e);if(t){var r=C(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return N(this,n)}}function N(e,t){return!t||"object"!==P(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var I=w.a.TabPane,j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(l,e);var t,n,a,c=x(l);function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=c.call(this,e)).state={planActiveKey:"1",btnIndex:0,summaryText:"",propertyText:"",suitableText:""},t.columns=[{title:"功能名称",dataIndex:"name"},{title:"标识符",dataIndex:"age"},{title:"数据类型",dataIndex:"address"}],t.dataSource=[],t}return t=l,(n=[{key:"componentDidMount",value:function(){this.props.onRef&&this.props.onRef(this),this.getInitMsg()}},{key:"handleChange",value:function(e){this.setState({planActiveKey:e})}},{key:"changeBtn",value:function(e,t,n,a){this.setState({btnIndex:e,planActiveKey:"1"},this.getPlanMsg)}},{key:"getInitMsg",value:function(){this.setState({summaryText:"通信模组负责与云端信息的交互，通过串口与主控板（即MCU）进行通信，需要在MCU上进行协议解析与外设控制的开发。",propertyText:"独立MCU能提供更丰富的系统资源。",suitableText:"复杂的智能硬件设备。"})}},{key:"getPlanMsg",value:function(){this.setState({summaryText:"无需开发，选择clife推荐模组，配置相关固件信息，采购使用即可，极速实现硬件智能化。",propertyText:"无需开发",suitableText:"功能简单的硬件设备。"})}},{key:"resetIndex",value:function(){this.setState({btnIndex:0,planActiveKey:"1"})}},{key:"render",value:function(){var e=this,t=this.state,n=t.btnIndex,a=t.planActiveKey,c=t.summaryText,l=t.propertyText,i=t.suitableText,u=this.props,s=u.tip,p=u.btnList;return f.a.createElement("div",{className:"dep-plan-block"},f.a.createElement("p",{className:"dep-plan-tip"},s),p?p.map((function(t,a){return f.a.createElement(o.a,{className:"dep-btn ".concat(n===a?"active-btn":""),key:t.key,onClick:function(n){return e.changeBtn(a,"btnIndex",t,n)}},t.value)})):null,f.a.createElement("div",{className:"dep-plan-cont"},f.a.createElement(w.a,{activeKey:a,tabPosition:"left",onChange:function(t){return e.handleChange(t)}},f.a.createElement(I,{tab:"方案简介",key:"1"},f.a.createElement("div",{className:"dep-brief"},f.a.createElement("div",{className:"dep-brief-img"}),f.a.createElement("div",{className:"flex1 dep-brief-cont-box"},f.a.createElement("div",{className:"dep-brief-cont"},f.a.createElement("p",{className:"dep-brief-cont-title"},"概述："),f.a.createElement("p",{className:"dep-brief-cont-desc"},c)),f.a.createElement("div",{className:"dep-brief-cont"},f.a.createElement("p",{className:"dep-brief-cont-title"},"特点："),f.a.createElement("p",{className:"dep-brief-cont-desc"},l)),f.a.createElement("div",{className:"dep-brief-cont"},f.a.createElement("p",{className:"dep-brief-cont-title"},"适合："),f.a.createElement("p",{className:"dep-brief-cont-desc"},i))))),f.a.createElement(I,{tab:"方案功能点",key:"2"},f.a.createElement("div",{className:"pad20"},f.a.createElement(r.a,{columns:this.columns,dataSource:this.dataSource,pagination:!1,size:"small"}))),f.a.createElement(I,{tab:"方案控制面板",key:"3"},f.a.createElement("div",{className:"dep-brief"},f.a.createElement("div",{className:"dep-brief-img"}))))))}}])&&k(t.prototype,n),a&&k(t,a),l}(s.Component);function R(e){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=V(e);if(t){var r=V(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return M(this,n)}}function M(e,t){return!t||"object"!==R(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function V(e){return(V=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var B=w.a.TabPane,K=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(o,e);var t,n,a,r=T(o);function o(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),(t=r.call(this,e)).handleChange=function(e){t.refSwitchTab.resetIndex(),t.setState((function(){return{currentActiveKey:e}}))},t.state={currentActiveKey:"1"},t.refSwitchTab=null,t}return t=o,(n=[{key:"render",value:function(){var e=this,t=this.state.currentActiveKey;return f.a.createElement(w.a,{activeKey:t,defaultActiveKey:"1",onChange:function(t){return e.handleChange(t)}},f.a.createElement(B,{tab:"免开发方案",key:"1"},f.a.createElement(j,{tip:"免开发方案，只需选择推荐模组以及配置固件信息，快速实现硬件智能化。",btnList:[{key:"1",value:"气体感觉报警器_NB"},{key:"2",value:"气体感觉报警器_zigbee"}],onRef:function(t){e.refSwitchTab=t}})),f.a.createElement(B,{tab:"独立MCU方案",key:"2"},f.a.createElement(j,{tip:"独立MCU方案，需选择下载MCU开发资料包等，进行相应开发。",btnList:[{key:"1",value:"MCU气体感觉报警器_NB"},{key:"2",value:"MCU气体感觉报警器_zigbee"}],onRef:function(t){e.refSwitchTab=t}})),f.a.createElement(B,{tab:"SoC方案",key:"3"},f.a.createElement(j,{tip:"SoC方案，不提供通用固件程序，需自行开发模组固件。",btnList:[{key:"1",value:"Soc气体感觉报警器_NB"},{key:"2",value:"Soc气体感觉报警器_zigbee"}],onRef:function(t){e.refSwitchTab=t}})))}}])&&_(t.prototype,n),a&&_(t,a),o}(s.Component),H=(n("K4yd"),n("9yH6")),A=(n("tULf"),n("Vl3Y"));n("TWNs"),n("rB9j"),n("JfAA");function F(e){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function D(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function U(e,t){return(U=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function q(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=Z(e);if(t){var r=Z(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return z(this,n)}}function z(e,t){return!t||"object"!==F(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function Z(e){return(Z=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var Q=c.a.Option,G=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&U(e,t)}(o,e);var t,n,a,r=q(o);function o(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),(t=r.call(this,e)).formRef=f.a.createRef(),t.onFinish=function(e){console.log("Success:",e)},t.onFinishFailed=function(e){console.log("Failed:",e)},t.state={},t}return t=o,(n=[{key:"componentDidMount",value:function(){this.props.onRef&&this.props.onRef(this)}},{key:"render",value:function(){return f.a.createElement(A.a,{ref:this.formRef,name:"basic",labelCol:{span:4},wrapperCol:{span:19},initialValues:{portNum:"china"},onFinish:this.onFinish,onFinishFailed:this.onFinishFailed},f.a.createElement(A.a.Item,{label:"产品名称",name:"username",rules:[{required:!0,message:"请输入中文产品名称"},{max:20,message:"最大输入长度为20"},{pattern:new RegExp(/^[\u2E80-\u9FFF]+$/,"g"),message:"请输入中文产品名称"}]},f.a.createElement(l.a,{placeholder:"请输入中文产品名称，不能超过20个字符"})),f.a.createElement(A.a.Item,{label:"产品品牌",name:"password",rules:[{required:!0,message:"请输入中文/英文品牌名称"},{pattern:new RegExp(/^[a-zA-Z\u4e00-\u9fa5]+$/,"g"),message:"请输入中文/英文品牌名称"}]},f.a.createElement(l.a,{placeholder:"请输入中文/英文品牌名称"})),f.a.createElement(A.a.Item,{label:"产品型号",name:"type",rules:[{pattern:new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9]+$/,"g"),message:"请输入产品型号，支持中英文、数字"}]},f.a.createElement(l.a,{placeholder:"请输入产品型号，支持中英文、数字"})),f.a.createElement(A.a.Item,{name:"agree",label:"通信协议",rules:[{required:!0,message:"请选择通信协议"}]},f.a.createElement(H.a.Group,null,f.a.createElement(H.a,{value:"a"},"NB"),f.a.createElement(H.a,{value:"b"},"NB＋ZigBee"),f.a.createElement(H.a,{value:"c"},"bie"),f.a.createElement(H.a,{value:"c"},"NB＋ZigBee＋bie"))),f.a.createElement(A.a.Item,{name:"radio-group",label:"网关子设备协议",rules:[{required:!0,message:"网关子设备协议"}]},f.a.createElement(H.a.Group,null,f.a.createElement(H.a,{value:"bie"},"bie"),f.a.createElement(H.a,{value:"红外"},"红外"),f.a.createElement(H.a,{value:"PLC"},"PLC"))),f.a.createElement(A.a.Item,{name:"portNum",label:"控制端口数",rules:[{required:!0,message:"控制端口数"}]},f.a.createElement(c.a,{style:{width:200}},f.a.createElement(Q,{value:"china"},"China"),f.a.createElement(Q,{value:"usa"},"U.S.A"))))}}])&&D(t.prototype,n),a&&D(t,a),o}(s.Component);function J(e){return(J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function W(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function Y(e,t){return(Y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function $(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=ee(e);if(t){var r=ee(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return X(this,n)}}function X(e,t){return!t||"object"!==J(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function ee(e){return(ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var te=O.a.Step,ne=c.a.Option,ae=[{title:"选择对应品类",content:"First-content"},{title:"确定开发方案",content:"Second-content"},{title:"建立产品信息",content:"Last-content"}],re=[{key:1,value:"家居安防"},{key:2,value:"电工照明"},{key:3,value:"大家电"},{key:4,value:"厨房电器"}],oe=[{key:1,value:"气体感应报警1"},{key:2,value:"气体感应报警11"},{key:3,value:"气体感应报警111"},{key:4,value:"气体感应报警1111"}],ce={cursor:"pointer"},le=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Y(e,t)}(l,e);var t,n,a,r=$(l);function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=r.call(this,e)).clickNext=function(e,n){2===e?t.refSetupProduct.formRef.current.submit():t.setState({stepcurrent:++e})},t.clickPrevious=function(e,n){t.setState({stepcurrent:--e})},t.state={stepcurrent:0,category:"",currentIndex:0,currentIndex2:null,isDisabled:!1},t.refSetupProduct=null,t}return t=l,(n=[{key:"searchCont",value:function(e){e.target.value=e.target.value.trim(),e.target.value&&this.setState({category:e.target.value},this.getList)}},{key:"getList",value:function(){}},{key:"selectItem",value:function(e,t,n){var a,r,o;this.setState((o=e,(r=t)in(a={})?Object.defineProperty(a,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[r]=o,a))}},{key:"render",value:function(){var e=this,t=this.state,n=t.stepcurrent,a=t.currentIndex,r=t.currentIndex2,l=t.isDisabled,i=this.props,u=i.cancelHandle,s=i.visible;return f.a.createElement(E.a,{title:"创建产品",centered:!0,destroyOnClose:!0,maskClosable:!1,visible:s,width:900,onCancel:u,wrapClassName:"add-modal",footer:[0!==n&&f.a.createElement(o.a,{key:"previous",onClick:function(t){return e.clickPrevious(n,t)}},"上一步"),f.a.createElement(o.a,{type:"primary",key:"next",disabled:l,onClick:function(t){return e.clickNext(n,t)}},2===n?"确认创建":"下一步")]},f.a.createElement("div",{className:"add-product"},f.a.createElement("div",{className:"step-box"},f.a.createElement(O.a,{current:n},ae.map((function(e,t){return f.a.createElement(te,{key:e.title,title:e.title,style:ce})})))),0===n&&f.a.createElement(f.a.Fragment,null,f.a.createElement("div",{className:"search-box"},f.a.createElement(c.a,{showSearch:!0,allowClear:!0,style:{width:674},placeholder:"搜索产品品类",optionFilterProp:"children",filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},f.a.createElement(ne,{value:"1"},"气体感应报警"),f.a.createElement(ne,{value:"2"},"气体感应报警"),f.a.createElement(ne,{value:"3"},"气体感应报警"),f.a.createElement(ne,{value:"4"},"气体感应报警"),f.a.createElement(ne,{value:"5"},"气体感应报警")),f.a.createElement("div",null,"找不到想要的品类？   ",f.a.createElement("span",{className:"submit-item"},"提交工单"))),f.a.createElement("div",{className:"level1-box"},re?re.map((function(t,n){return f.a.createElement("div",{className:"level1-box-item ".concat(a===n?"onwActive":""),key:t.value,onClick:e.selectItem.bind(e,n,"currentIndex",t)},t.value)})):null),f.a.createElement("div",{className:"level2-box"},oe?oe.map((function(t,n){return f.a.createElement("div",{className:"level2-box-item ".concat(r===n?"twoActive":""),key:t.value,onClick:e.selectItem.bind(e,n,"currentIndex2",t)},t.value,r===n&&f.a.createElement("span",{className:"selected-icon"}))})):null)),1===n&&f.a.createElement(K,null),2===n&&f.a.createElement(G,{onRef:function(t){return e.refSetupProduct=t}})))}}])&&W(t.prototype,n),a&&W(t,a),l}(s.Component);function ie(e){return(ie="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ue(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function se(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ue(Object(n),!0).forEach((function(t){fe(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ue(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function fe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function pe(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function de(e,t){return(de=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function me(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=he(e);if(t){var r=he(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return ye(this,n)}}function ye(e,t){return!t||"object"!==ie(t)&&"function"!=typeof t?be(e):t}function be(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function he(e){return(he=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var ve=l.a.Search,ge=c.a.Option,Ee=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&de(e,t)}(p,e);var t,n,i,s=me(p);function p(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),(t=s.call(this,e)).searchProduct=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";e=e.trim();var n=u()(t.state.listParams);n.productName=e,n.pageIndex=1,t.setState({listParams:n},t.getProductList)},t.handleChange=function(e){t.setState({status:e})},t.changePage=function(e){var n=se({},t.state.listParams);n.pageIndex=e,t.setState({listParams:n},t.getProductList)},t.deleteModalOKHandle=function(){var e=t.state,n=e.selectedItem,a=e.deleteInputValue.trim(),r=n.productId;if(!a||"delete"!==a)return Object(h.a)({type:"warn",message:"异常操作",description:'请输入"delete"来确认删除！'});t.setState({deleteLoading:!0},(function(){Object(g.d)(g.a.delectProduct,{productId:r},{needVersion:1.1}).then((function(e){0===e.code&&Object(h.a)({type:"success",description:"删除成功！"}),t.setState({deleteVisible:!1,deleteInputValue:""}),t.getProductList()})).finally((function(){return t.setState({deleteLoading:!1})}))}))},t.copyModalOKHandle=function(){var e=t.state,n=e.copyInputValue,a=e.selectedItem,r=n.trim(),o=a.productId;if(!r)return Object(h.a)({type:"warn",message:"异常操作",description:"请输入产品名称！"});t.setState({copyLoading:!0},(function(){Object(g.d)(g.a.copyProduct,{productId:o,productName:r},{needVersion:1.1}).then((function(e){0===e.code&&Object(h.a)({type:"success",description:"复制成功！"}),t.setState({listParams:u()(t.defaultListParams),copyModalVisible:!1,copyInputValue:""},t.getProductList)})).finally((function(){t.setState({copyLoading:!1})}))}))},t.makeHandle=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t.setState({isClicked:!e})},t.defaultListParams={pageIndex:1,pageRows:8,productName:""},t.state={status:"all",listParams:u()(t.defaultListParams),selectedItem:null,deleteVisible:!1,deleteLoading:!1,deleteInputValue:"",copyModalVisible:!1,copyLoading:!1,copyInputValue:"",isClicked:!1},t.columns=[{title:"产品",dataIndex:"productName",key:"productName",render:function(e,t,n){return f.a.createElement("div",{className:"pro-show"},f.a.createElement(y.a,{icon:t.productIcon}),f.a.createElement("div",{className:"pro-show-cont"},f.a.createElement("div",{className:"pro-show-cont-title"},e),f.a.createElement("div",{className:"pro-show-cont-item"},"产品ID：",t.productId),f.a.createElement("div",{className:"pro-show-cont-item"},"型号：adehfuweh")))}},{title:"品类",dataIndex:"productClassName",key:"productClassName"},{title:"智能化方案",dataIndex:"",key:""},{title:"通信协议",dataIndex:"bindTypeName",key:"bindTypeName"},{title:"状态",dataIndex:"mode",key:"mode",render:function(e){return f.a.createElement("span",{className:"status status-".concat(e)},m.f[""+e]||"")}},{title:"操作",key:"",render:function(e,n,a){return f.a.createElement("div",{className:"operation"},f.a.createElement("span",{className:"continue",onClick:t.clickProductInfo.bind(be(t),n.mode,n.productId)},"继续开发"),2!==n.mode&&f.a.createElement("span",{className:"copy mar25",onClick:t.operateProduct.bind(be(t),n,"copyModalVisible")},"复制"),2!==n.mode&&f.a.createElement("span",{className:"delete",onClick:t.operateProduct.bind(be(t),n,"deleteVisible")},"删除"))}}],t}return t=p,(n=[{key:"componentDidMount",value:function(){this.getProductList()}},{key:"getProductList",value:function(){this.props.getProductList(se({},this.state.listParams))}},{key:"clickProductInfo",value:function(e,t){var n="details";1!==e&&(n="edit"),this.props.history.push({pathname:"/open/product/proManage/".concat(n,"/").concat(t)})}},{key:"operateProduct",value:function(e,t){var n;if(2===e.mode)return!1;this.setState((fe(n={},t,!0),fe(n,"selectedItem",e),n))}},{key:"modalCancelHandle",value:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copyModalVisible",n=arguments.length>1?arguments[1]:void 0;this.setState((fe(e={},t,!1),fe(e,n,""),e))}},{key:"inputOnChangeHandle",value:function(e,t){this.setState(fe({},e,t.target.value))}},{key:"render",value:function(){var e=this,t=this.state,n=t.listParams,i=t.selectedItem,u=t.deleteVisible,s=t.deleteLoading,p=t.deleteInputValue,d=t.copyModalVisible,m=t.copyLoading,y=t.copyInputValue,h=t.isClicked,g=this.props.productList,E=g.list,O=g.pager;return f.a.createElement("section",{className:"page-wrapper"},f.a.createElement(v.a,{title:"我的智能产品"}),f.a.createElement("div",{className:"page-header comm-shadowbox"},f.a.createElement("div",{className:"page-header-left"},f.a.createElement(ve,{placeholder:"产品名称/ID/型号",maxLength:20,onSearch:function(t){return e.searchProduct(t)},style:{width:465,margin:"0 22px"}}),f.a.createElement(c.a,{defaultValue:"all",style:{width:120},onChange:this.handleChange},f.a.createElement(ge,{value:"all"},"全部状态"),f.a.createElement(ge,{value:"dev"},"开发中"),f.a.createElement(ge,{value:"done"},"开发完成"))),f.a.createElement("div",{className:"page-header-right"},f.a.createElement(o.a,{type:"primary",onClick:this.makeHandle.bind(this,!1)},"制作产品"))),f.a.createElement("div",{className:"bg-wrapper flex1 flex-column comm-shadowbox"},f.a.createElement("div",{className:"page-table-wrapper flex-column flex1"},f.a.createElement(r.a,{rowKey:"productId",dataSource:E,columns:this.columns,pagination:!1}),f.a.createElement("footer",{className:"list-pagination"},O&&O.totalRows>0?f.a.createElement(a.a,{className:"self-pa",total:O.totalRows,current:n.pageIndex,defaultCurrent:1,defaultPageSize:n.pageRows,onChange:this.changePage,showTotal:function(e){return f.a.createElement("span",null,"共 ",f.a.createElement("a",null,e)," 条")},showQuickJumper:!0,hideOnSinglePage:!0}):null))),i&&u&&f.a.createElement(b.a,{visible:u,modalOKHandle:this.deleteModalOKHandle,modalCancelHandle:this.modalCancelHandle.bind(this,"deleteVisible","deleteInputValue"),targetName:i.productName,confirmLoading:s,title:"删除产品",needWarnIcon:!0,descText:"即将删除的产品",tipText:"产品的所有信息将完全被删除，无法找回，请谨慎操作"},f.a.createElement(l.a,{className:"modal-content-input",onChange:function(t){e.inputOnChangeHandle("deleteInputValue",t)},onPressEnter:this.deleteModalOKHandle,placeholder:"请输入“delete”确认删除该产品",maxLength:20,value:p})),i&&d&&f.a.createElement(b.a,{visible:d,modalOKHandle:this.copyModalOKHandle,modalCancelHandle:this.modalCancelHandle.bind(this,"copyModalVisible","copyInputValue"),targetName:i.productName,confirmLoading:m,title:"复制产品",descText:"即将复制的产品",tipText:"创建与原产品的功能和服务配置一样的新产品"},f.a.createElement(l.a,{className:"modal-content-input",onChange:function(t){e.inputOnChangeHandle("copyInputValue",t)},onPressEnter:this.copyModalOKHandle,value:y,maxLength:20,placeholder:"新产品名称"})),h&&f.a.createElement(le,{visible:h,cancelHandle:this.makeHandle.bind(this,!0)}))}}])&&pe(t.prototype,n),i&&pe(t,i),p}(s.PureComponent);t.default=Object(p.connect)((function(e){return{productList:e.getIn(["product","productList"]).toJS()}}),(function(e){return{getProductList:function(t){return e(Object(d.e)(t))}}}))(Ee)},"dP/0":function(e,t,n){},mU7p:function(e,t,n){"use strict";n.d(t,"f",(function(){return a})),n.d(t,"a",(function(){return r})),n.d(t,"g",(function(){return o})),n.d(t,"e",(function(){return c})),n.d(t,"b",(function(){return l})),n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return u}));var a={0:"开发中",1:"已发布",2:"审核中"},r={1:"草稿",2:"审核中",3:"灰度版本",4:"正式版本"},o={1:"SDK开发",2:"在线拖拽"},c={0:"草稿",1:"已发布",2:"删除"},l={1:"大于",2:"小于",3:"范围"},i={1:"条件",2:"动作"},u={1:"草稿",2:"审核中",3:"已发布",4:"驳回"}}}]);