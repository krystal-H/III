(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"5jjE":function(e,t,n){},"7EV8":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("2B1R"),n("FZtP"),n("pDQq");var a=function(e,t,n,a,r){if(!Array.isArray(e))return 1;for(var c=e.map((function(e){return e[r]})),l=e.map((function(e){return e[t]})),i=c[0],o=[[i]],u=0,s=1;s<c.length;s++)c[s]===i?o[u].push(c[s]):(o[u+=1]=[],o[u].push(c[s]),i=c[s]);var d=[];o.forEach((function(e,t){d[t]=[],d[t]=l.splice(0,e.length)}));var m=[];d.forEach((function(e,t){var n=d[t][0],a=0;m[t]=[],m[t][a]=[],e.forEach((function(e,r){n===e?m[t][a].push(e):(a+=1,m[t][a]=[],m[t][a].push(e),n=e)}))}));var f=[];m.forEach((function(e){e.forEach((function(e){f.push(e)}))}));var p=[];f.forEach((function(e){for(var t=e.length,n=0;n<t;n++)p.push(0===n?t:0)}));var b={children:a,props:{}};return b.props.rowSpan=p[n],b}},Hg3J:function(e,t,n){},"OBs/":function(e,t,n){},aIR0:function(e,t,n){},gyoc:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return xe}));n("AUBz");var a=n("ZTPi"),r=(n("rB9j"),n("Rm1S"),n("pNMO"),n("4Brf"),n("07d7"),n("0oug"),n("4mDm"),n("PKPk"),n("3bBZ"),n("+2oP"),n("sMBO"),n("pjDv"),n("qNb/"),n("PArb")),c=(n("OrB1"),n("gFTJ")),l=n("q1tI"),i=n.n(l),o=n("Nlzp"),u=n("DgvE"),s=n("739K"),d=n("DeUx");n("5jjE");function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);l=!0);}catch(e){i=!0,r=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function p(e){var t=e.devceId,n=m(Object(l.useState)({}),2),a=n[0],f=n[1];Object(l.useEffect)((function(){y()}),[]);var p,b,y=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(o.c)(o.a.getDeviceInfo,{deviceId:t},{loading:e}).then((function(e){f(e.data)}))},v=m(Object(l.useState)(!1),2),E=v[0],g=v[1],h=function(){g(!E)},O=function(e){return e=E?e:Object(u.m)(e,10)};return i.a.createElement("div",{id:"device-info"},i.a.createElement(c.b,{title:"设备信息"},i.a.createElement(c.b.Item,{label:"设备ID"},a.deviceUniqueId),i.a.createElement(c.b.Item,{label:"设备秘钥"},O(a.deviceSecret),i.a.createElement("span",{onClick:h},E?i.a.createElement(s.a,null):i.a.createElement(d.a,null))),i.a.createElement(c.b.Item,{label:"物理地址"},a.deviceMac),i.a.createElement(c.b.Item,{label:"入网时间"},a.connectTime),i.a.createElement(c.b.Item,{label:"模组固件版本"},a.moduleVersion),i.a.createElement(c.b.Item,{label:"MCU固件版本"},a.pcbVersion),i.a.createElement(c.b.Item,{label:"绑定网关"},a.gateWay),i.a.createElement(c.b.Item,{label:"设备名称"},a.deviceName),i.a.createElement(c.b.Item,{label:"设备位置"},a.deviceSite),i.a.createElement(c.b.Item,{label:"绑定C端用户"},a.bindCUser),i.a.createElement(c.b.Item,{label:"SIM卡号"},a.simNumber),i.a.createElement(c.b.Item,{label:"IMEI"},a.deviceIdentifier)),i.a.createElement(r.a,null),i.a.createElement(c.b,{title:"产品信息"},i.a.createElement(c.b.Item,{label:"产品名称"},a.productName),i.a.createElement(c.b.Item,{label:"产品ID"},a.productId),i.a.createElement(c.b.Item,{label:"所属分类"},a.productType),i.a.createElement(c.b.Item,{label:"产品类型"},(p=a.productClass,b=null,"number"==typeof p&&(b=1==p?"网关设备":"普通设备"),b)),i.a.createElement(c.b.Item,{label:"产品编码"},a.productCode),i.a.createElement(c.b.Item,{label:"产品密钥"},O(a.productKey),i.a.createElement("span",{onClick:h},E?i.a.createElement(s.a,null):i.a.createElement(d.a,null)))))}n("tkto"),n("TeQF"),n("5DmW"),n("FZtP"),n("27RR"),n("5s+n"),n("L/Qf");var b=n("2/Rp"),y=(n("mbEz"),n("wCAj")),v=(n("Y2jk"),n("zeV3")),E=(n("O+5t"),n("wFql")),g=(n("tULf"),n("Vl3Y")),h=(n("1vPl"),n("5rEg")),O=(n("QCje"),n("fyUT")),I=(n("2B1R"),n("ls82"),n("FC04"));function w(e){var t=e.operate,n=e.visible,a=e.updateOkHandle,r=e.updateCancelHandle,c=null;switch(t){case 1:c={title:"发布云端定时功能",desc:"即将发布的功能",tip:"功能发布后，APP上可以看到并启用，是否确认发布？",needWarnIcon:!1};break;case 2:c={title:"删除标签",tip:"标签删除后将无法找回，是否确认删除？",needWarnIcon:!0};break;case 3:c={title:"下线云端定时功能",desc:"即将下线的功能",tip:"功能下线后将无法看到，是否确认下线？",needWarnIcon:!0}}return i.a.createElement(I.a,{visible:n,modalOKHandle:function(){return a(t)},modalCancelHandle:r,targetName:"test",title:c.title,descGray:!0,needWarnIcon:c.needWarnIcon,descText:c.desc,tipText:c.tip})}n("OBs/");var j=n("P2RN"),S=["editing","dataIndex","title","inputType","record","index","children"];function A(e,t,n,a,r,c,l){try{var i=e[c](l),o=i.value}catch(e){return void n(e)}i.done?t(o):Promise.resolve(o).then(a,r)}function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function T(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);l=!0);}catch(e){i=!0,r=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function D(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var P=function(e){var t=e.editing,n=e.dataIndex,a=e.title,r=e.inputType,c=(e.record,e.index,e.children),l=D(e,S),o="number"===r?i.a.createElement(O.a,null):i.a.createElement(h.a,null);return i.a.createElement("td",l,t?i.a.createElement(g.a.Item,{name:n,style:{margin:0,style:"100%"},rules:[{required:!0,message:"Please Input ".concat(a,"!")}]},o):c)};function R(e){var t=e.devceId,n=T(g.a.useForm(),1)[0],a=T(Object(l.useState)([]),2),r=a[0],c=a[1],u=T(Object(l.useState)(null),2),s=u[0],d=u[1],m=T(Object(l.useState)(""),2),f=m[0],p=m[1],h=T(Object(l.useState)(null),2),O=h[0],I=h[1],S=function(e){return e.id===f},x=T(Object(l.useState)(!1),2),C=x[0],N=x[1];Object(l.useEffect)((function(){B()}),[]);var D=function(e){n.setFieldsValue(k({name:"",age:""},e)),p(e.id)},R=function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];e.deviceId=t,Object(o.c)(o.a.addDeviceLabel,e,{loading:n}).then((function(e){p(""),Object(j.a)({type:"success",description:"新增成功！"}),B()})).catch((function(e){p(""),B()}))},J=function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];e.deviceId=t,Object(o.c)(o.a.updateDeviceLabel,e,{loading:n}).then((function(e){p(""),Object(j.a)({type:"success",description:"编辑成功！"}),B()})).catch((function(e){p(""),B()}))},M=function(){var e,t=(e=regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.validateFields();case 3:a=e.sent,t.id?(a.labelId=t.id,J(a)):R(a),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("Validate Failed:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})),function(){var t=this,n=arguments;return new Promise((function(a,r){var c=e.apply(t,n);function l(e){A(c,a,r,l,i,"next",e)}function i(e){A(c,a,r,l,i,"throw",e)}l(void 0)}))});return function(e){return t.apply(this,arguments)}}(),V=[{title:"标签Key",dataIndex:"labelKey",editable:!0},{title:"标签Value",dataIndex:"labelValue",editable:!0},{title:"操作",dataIndex:"operation",render:function(e,t){return S(t)?i.a.createElement("span",null,i.a.createElement("a",{onClick:function(){return M(t)},style:{marginRight:8}},"保存")):i.a.createElement(v.b,null,i.a.createElement(E.a.Link,{disabled:""!==f,onClick:function(){return D(t)}},"编辑"),i.a.createElement(E.a.Link,{disabled:""!==f,onClick:function(){var e,n;e=2,n=t.id,N(!0),I(n),d(e)}},"删除"))}}].map((function(e){return e.editable?k(k({},e),{},{onCell:function(t){return{record:t,inputType:"text",dataIndex:e.dataIndex,title:e.title,editing:S(t)}}}):e})),B=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(o.c)(o.a.getDeviceLabelList,{deviceId:t},{loading:e}).then((function(e){c(e.data.list)}))};return i.a.createElement("div",{id:"device-tag"},i.a.createElement(g.a,{form:n,component:!1},i.a.createElement(y.a,{components:{body:{cell:P}},dataSource:r,columns:V,rowClassName:"editable-row",rowKey:"id",pagination:!1})),i.a.createElement(b.a,{type:"primary",ghost:!0,className:"edit-table-btn",onClick:function(){!function(){var e=!1;if(f&&(e=!0),r.map((function(t){t.id||(e=!0)})),!e){var t=JSON.parse(JSON.stringify(r)),n={key:"".concat(t.length+1),labelKey:"",labelValue:"",id:0};t.push(n),c(t),D(n)}}()}},"添加标签"),C&&i.a.createElement(w,{visible:C,operate:s,updateOkHandle:function(){Object(o.c)(o.a.deleteDeviceLabel,{labelId:O}).then((function(e){N(!1),Object(j.a)({type:"success",description:"删除成功！"}),B()}))},updateCancelHandle:function(){N(!1)}}))}n("K4yd");var J=n("9yH6"),M=(n("t7Rh"),n("TL2v")),V=(n("zKZe"),n("ma9I"),n("wd/R"),n("7EV8")),B=(n("k3Gp"),n("kLXV")),K=(n("8QGh"),n("2fM7")),L=(n("i6mW"),n("MT78")),U=K.a.Option,F=[{key:1,value:"最近1小时"},{key:2,value:"最近6小时"},{key:3,value:"最近24小时"},{key:4,value:"最近7天"}];function q(e){var t=e.ModalVisible,n=e.closeOk,a=e.sentData,r=e.productId;Object(l.useEffect)((function(){c()}),[]);var c=function(e){var t={column:a.funcIdentifier,productId:r,tslType:a.funcType};e&&(t.selectType=e),Object(o.c)(o.a.deviceShadowHis,t).then((function(e){!function(e){var t=[],n=[];e.forEach((function(e){t.push(e.datatimestamp),n.push(e.data)}));var a,r=document.getElementById("echart-show"),c=L.init(r);(a={title:{},tooltip:{trigger:"axis"},legend:{label:{narmal:{show:!1}}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"category",data:t},yAxis:{type:"value"},series:[{name:"Step Start",type:"line",step:"start",data:n}]})&&c.setOption(a)}(e.data)}))};return i.a.createElement("div",null,i.a.createElement(B.a,{title:"查看",visible:t,onOk:n,onCancel:n,width:"764px",wrapClassName:"add-protocols-wrap"},i.a.createElement("div",{className:"device-shadow-modal"},i.a.createElement("div",{className:"device-shadow-modal-header"},i.a.createElement(K.a,{style:{width:200},onChange:function(e){c(e)}},F.map((function(e){return i.a.createElement(U,{value:e.key,key:e.key},e.value)}))),i.a.createElement("a",null,"导出数据")),i.a.createElement("div",{style:{height:"303px"},id:"echart-show"}))))}function Q(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);l=!0);}catch(e){i=!0,r=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function W(e){var t=e.dataSource,n={};sessionStorage.DEVICE_DETAIL_BASE&&(n=JSON.parse(sessionStorage.DEVICE_DETAIL_BASE)),Object(l.useEffect)((function(){u()}),[]);var a=Q(Object(l.useState)(""),2),r=a[0],c=a[1],u=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(o.c)(o.a.getDeviceInfo,{deviceId:n.deviceId},{loading:e}).then((function(e){c(e.data.productId)}))},s=Q(Object(l.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),d=s[0],m=s[1],f=function(){var e=(d.pageIndex-1)*d.pageRows;return t.slice(e,e+10)},p=Q(Object(l.useState)(!1),2),b=p[0],v=p[1],E=Q(Object(l.useState)({}),2),g=E[0],h=E[1],O=[{title:"功能类型",dataIndex:"funcTypeCN",render:function(e,t,n){return Object(V.a)(f(),"funcIdentifier",n,e,"funcTypeCN")}},{title:"功能点名称",dataIndex:"funcName",render:function(e,t,n){return Object(V.a)(f(),"funcIdentifier",n,e,"funcName")}},{title:"标识符",dataIndex:"funcIdentifier",render:function(e,t,n){return Object(V.a)(f(),"funcIdentifier",n,e,"funcIdentifier")}},{title:"参数名称",dataIndex:"name"},{title:"参数标识",dataIndex:"identifier"},{title:"数据传输类型",dataIndex:"accessMode",render:function(e,t){return"rw"==e?"可下发可上报":"w"==e?"可下发":"r"==e?"可上报":""}},{title:"数据类型",dataIndex:"dataType",render:function(e,t){return i.a.createElement("span",null,t.dataTypCN)}},{title:"数据属性",dataIndex:"propertyMap",render:function(e,t){return i.a.createElement("span",null,function(e){var t=null;switch(e.dataTypeEN){case"double":t="数值范围：".concat(e.propertyMap.min,"-").concat(e.propertyMap.max,",间距：").concat(e.propertyMap.interval,",倍数：").concat(e.propertyMap.multiple,",单位：").concat(e.propertyMap.unit);break;case"bool":t="0：".concat(e.propertyMap[0],",1：").concat(e.propertyMap[1]);break;case"enum":var n="";for(var a in e.propertyMap)n+=e.propertyMap[a]+"，";t="枚举值：".concat(n);break;default:return""}return t}(t))}},{title:"最新数据",dataIndex:"funcData"},{title:"操作",dataIndex:"dd",render:function(e,t){return i.a.createElement("a",{onClick:function(){h(t),v(!0)}},"查看")}}];return i.a.createElement("div",null,i.a.createElement(y.a,{rowKey:"key",columns:O,dataSource:t,pagination:{defaultCurrent:1,current:d.pageIndex,onChange:function(e,t){t===d.pageRows?m((function(n){var a=JSON.parse(JSON.stringify(n));return Object.assign(a,{pageIndex:e,pageRows:t})})):m((function(e){var n=JSON.parse(JSON.stringify(e));return Object.assign(n,{pageIndex:1,pageRows:t})}))},pageSize:d.pageRows,total:d.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return i.a.createElement("span",null,"共 ",i.a.createElement("a",null,t.length)," 条")}}}),b&&i.a.createElement(q,{ModalVisible:b,closeOk:function(){v(!1)},sentData:g,productId:r}))}var H=n("/Zbm");function Z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);l=!0);}catch(e){i=!0,r=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?G(Object(n),!0).forEach((function(t){X(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function X(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var $=a.a.TabPane;function ee(e){var t=[];return e.forEach((function(e){e.funcParamList&&e.funcParamList.length&&e.funcParamList.forEach((function(n){var a=JSON.parse(JSON.stringify(e));t.push(Y(Y({},a),n))}))})),t.forEach((function(e,t){e.key=t})),t}function te(){var e={};sessionStorage.DEVICE_DETAIL_BASE&&(e=JSON.parse(sessionStorage.DEVICE_DETAIL_BASE));var t=Z(Object(l.useState)([]),2),n=t[0],r=t[1],c=Z(Object(l.useState)(""),2),u=c[0],s=c[1];Object(l.useEffect)((function(){d()}),[]);var d=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(o.c)(o.a.deviceShadow,{deviceUniqueId:e.deviceId},{loading:t}).then((function(e){r(ee(e.data.list)),s(JSON.stringify(e.data.jsonString))}))};return i.a.createElement("div",{id:"device-shadow"},i.a.createElement(M.a,{style:{marginBottom:8,width:"100%",display:"flex"},desc:["设备影子是设备最新状态在平台的缓存信息，您可以在平台实时查询设备的运行和状态信息，也可以通过API获取设备状态信息。详细说明可参考",i.a.createElement("a",{onClick:function(){window.open("https://dp.clife.net/iotdoc/")}},"帮助文档")]}),i.a.createElement(a.a,{defaultActiveKey:"1",className:"shadow-tab"},i.a.createElement($,{key:"1",tab:"表单模式"},i.a.createElement("div",null,i.a.createElement(J.a.Group,{defaultValue:"a",size:"middle",onChange:function(e){},style:{margin:"6px 0  22px 0"}},i.a.createElement(J.a.Button,{value:"a"},"属性"),i.a.createElement(J.a.Button,{value:"b"},"事件"),i.a.createElement(J.a.Button,{value:"c"},"服务")),i.a.createElement(W,{dataSource:n}))),i.a.createElement($,{key:"2",tab:"Json模式"},i.a.createElement("div",null,i.a.createElement(H.a,{code:u})))))}n("RKNx");var ne=n("L41K"),ae=n("BkRI"),re=n.n(ae),ce=(n("pDQq"),n("wmP4")),le=n.n(ce);n("oVuX"),n("B6y2");function ie(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);l=!0);}catch(e){i=!0,r=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return oe(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return oe(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function oe(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var ue=h.a.TextArea;function se(e){var t=e.addVisible,n=(e.addOk,e.CancelAdd),a={};sessionStorage.DEVICE_DETAIL_BASE&&(a=JSON.parse(sessionStorage.DEVICE_DETAIL_BASE));var r=ie(Object(l.useState)([]),2),c=r[0],u=r[1],s=ie(g.a.useForm(),1)[0];Object(l.useEffect)((function(){f()}),[]);var d=ie(Object(l.useState)(""),2),m=(d[0],d[1]),f=function(){Object(o.c)(o.a.getDeviceInfo,{deviceId:a.deviceId}).then((function(e){e.data.productId&&(p(e.data.productId),m(e.data.productId))}))},p=function(e){Object(o.c)(o.a.getPhysicalModel,{productId:e}).then((function(e){u(e.data.properties)}))},b=[{title:"数据名称",dataIndex:"name",key:"name",width:160,editable:!0},{title:"数据标识",dataIndex:"identifier",key:"identifier"},{title:"数据类型",dataIndex:"dataType",key:"dataType",render:function(e,t){return i.a.createElement("span",null,t.dataType.type)}},{title:"数据属性",render:function(e,t){switch(t.dataType.type){case"int":case"double":case"float":return i.a.createElement("span",null,t.dataType.specs.min," ~ ",t.dataType.specs.max);case"text":break;case"enum":return i.a.createElement("span",null,Object.values(t.dataType.specs).join(" | "));case"date":break;case"bool":return i.a.createElement("span",null,Object.values(t.dataType.specs).join(" | "))}}},{title:"下发数据",dataIndex:"execTime",key:"execTime",width:180,render:function(e,t,n){return i.a.createElement(h.a,{value:t.name,onChange:function(e){return function(e,t){u((function(n){var a=JSON.parse(JSON.stringify(c));return a[t].name=e.target.value,a})),console.log(e,t,"====")}(e,n)}})}}];return i.a.createElement("div",null,i.a.createElement(B.a,{title:"远程配置任务",visible:t,onOk:function(){},onCancel:n,width:"825px",wrapClassName:"add-protocols-wrap"},i.a.createElement("div",null,i.a.createElement(g.a,{form:s},i.a.createElement(g.a.Item,{label:"任务名称",name:"problemType",rules:[{required:!0}]},i.a.createElement(h.a,null)),i.a.createElement(g.a.Item,{label:"任务说明",name:"problemDesc",rules:[{required:!0}]},i.a.createElement(ue,{rows:4}))),i.a.createElement("div",{style:{marginBottom:"10px"}},"请添加配置信息"),i.a.createElement(y.a,{dataSource:c,columns:b,rowKey:"identifier"}))))}function de(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);l=!0);}catch(e){i=!0,r=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return me(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return me(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function me(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}h.a.TextArea;function fe(e){var t=e.detailVis,n=e.onCancel,a=e.actionData,r=de(g.a.useForm(),1)[0],c=de(Object(l.useState)([]),2),u=c[0];c[1];Object(l.useEffect)((function(){f()}),[]);var s=de(Object(l.useState)({}),2),d=s[0],m=s[1],f=function(){var e={taskId:a.taskId};Object(o.c)(o.a.singelDeviceRemoset,e).then((function(e){m(e.data),console.log(JSON.parse(e.data.remoteProtocol.protocolJson),6666),e.data.remoteProtocol&&e.data.remoteProtocol.protocolJson&&JSON.parse(e.data.remoteProtocol.protocolJson).length}))},p=[{title:"数据名称",dataIndex:"name",key:"name",width:160},{title:"数据标识",dataIndex:"identifier",key:"identifier"},{title:"数据类型",dataIndex:"dataType",key:"dataType",render:function(e,t){return i.a.createElement("span",null,t.dataType.type)}},{title:"数据属性",render:function(e,t){switch(t.dataType.type){case"int":case"double":case"float":return i.a.createElement("span",null,t.dataType.specs.min," ~ ",t.dataType.specs.max);case"text":break;case"enum":return i.a.createElement("span",null,Object.values(t.dataType.specs).join(" | "));case"date":break;case"bool":return i.a.createElement("span",null,Object.values(t.dataType.specs).join(" | "))}}},{title:"下发数据",dataIndex:"execTime",key:"execTime",width:180}];return i.a.createElement("div",null,i.a.createElement(B.a,{title:"远程配置任务",visible:t,onOk:n,onCancel:n,width:"725px",wrapClassName:"add-protocols-wrap"},i.a.createElement("div",null,i.a.createElement(g.a,{form:r},i.a.createElement(g.a.Item,{label:"任务名称",name:"problemType"},i.a.createElement("span",null,d.taskName)),i.a.createElement(g.a.Item,{label:"任务说明",name:"problemDesc"},i.a.createElement("span",null,d.taskExplain))),i.a.createElement("div",{style:{marginBottom:"10px"}},"配置数据"),i.a.createElement(y.a,{dataSource:u,columns:p}))))}n("Hg3J");function pe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function be(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?pe(Object(n),!0).forEach((function(t){ye(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):pe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ye(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ve(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],l=!0,i=!1;try{for(n=n.call(e);!(l=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);l=!0);}catch(e){i=!0,r=e}finally{try{l||null==n.return||n.return()}finally{if(i)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Ee(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ee(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ee(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}K.a.Option;var ge=ne.a.Step,he=(h.a.Search,["平台支持远程更新设备的配置数据，您可以提交远程配置任务，实时对设备的系统参数等数据进行远程更新，并且获取设备配置的更新状态；详细说明可参考文档"]),Oe=[{title:"创建远程配置任务"},{title:"添加配置数据"},{title:"选择设备"},{title:"执行任务"}],Ie=["草稿","待执行","执行中","已执行"],we=["","执行中","执行成功","执行失败"];var je=function(e){e.devceId;var t=e.remoteType,n=void 0===t?"device":t,a=ve(Object(l.useState)(!1),2),c=a[0],s=a[1],d=ve(Object(l.useState)({}),2),m=d[0],f=d[1],p=ve(Object(l.useState)({deletevisible:!1,deleteItem:null,deleteLoading:!1}),2),v=p[0],E=p[1],g=ve(Object(l.useState)([]),2),h=g[0],O=g[1],w=ve(Object(l.useState)(""),2),S=(w[0],w[1],ve(Object(l.useState)({pageIndex:1,totalRows:0,pageRows:10}),2)),A=S[0],x=S[1],k=v.deletevisible,C=v.deleteItem,T=v.deleteLoading,N=[{title:"任务ID",dataIndex:"taskId",key:"taskId"},{title:"任务名称",dataIndex:"taskName",key:"taskName"},{title:"任务说明",dataIndex:"taskExplain",key:"taskExplain",width:300},{title:"任务状态",dataIndex:"status",key:"status",render:function(e,t){var n=t.status;return i.a.createElement("span",{className:"h5-statu-".concat(n+1)},R[n])}},{title:"执行时间",dataIndex:"execTime",key:"execTime",render:function(e,t){var n=t.execTime;return i.a.createElement("span",null,n?u.a.utcToDev(n):"--")}},{title:"操作",key:"action",render:function(e,t){var n=t.status,a=t.taskId;return D?i.a.createElement("span",null,""+n=="1"?i.a.createElement(i.a.Fragment,null,i.a.createElement("a",{onClick:function(){return J(t)}},"编辑"),i.a.createElement(r.a,{type:"vertical"}),i.a.createElement("a",{onClick:function(){return E({deletevisible:!0,deleteItem:t})}},"删除")):i.a.createElement("a",{onClick:function(){return L(t)}},"查看")):i.a.createElement("span",null,i.a.createElement("a",{onClick:function(){return L(t)}},"查看"),""+n=="3"?i.a.createElement(i.a.Fragment,null,i.a.createElement(r.a,{type:"vertical"}),i.a.createElement("a",{onClick:function(){return U(a)}},"重试"),i.a.createElement(r.a,{type:"vertical"}),i.a.createElement("a",{onClick:function(){return F(t)}},"日志")):null)}}],D="device"===n,P=re()(Oe);D&&P.splice(2,1);var R=D?we:Ie,J=function(){s(!0)},V=ve(Object(l.useState)(!1),2),B=V[0],K=V[1],L=function(e){f(e),K(!0)},U=function(){},F=function(){};Object(l.useEffect)((function(){q()}),[A.pageRows,A.pageIndex]);var q=function(e){var t=be({deviceId:1321312312243},A);Object(o.c)(o.a.deviceRemoteConfigList,t,{loading:!0}).then((function(e){var t=e.data.list,n=void 0===t?[]:t;O(Object(u.c)(n)),x((function(t){var n=JSON.parse(JSON.stringify(t));return Object.assign(n,{totalRows:e.data.pager.totalRows})}))}))};return i.a.createElement("div",{id:"remote-config"},i.a.createElement("div",{className:"comm-shadowbox setp-tip"},i.a.createElement("div",{className:"step-title"},i.a.createElement("img",{src:le.a,alt:""}),i.a.createElement("span",null,"远程配置步骤")),i.a.createElement(M.a,{desc:he,style:{marginBottom:22}}),i.a.createElement(ne.a,{current:-1,initial:0},i.a.createElement(ge,{title:"创建远程配置任务",description:"创建远程配置任务，填写任务的目的或备注信息。"}),i.a.createElement(ge,{title:"添加配置数据",description:"添加要更新的产品配置数据字段和更新的数值。"}),i.a.createElement(ge,{title:"选择设备",description:"可通过设备ID/物理地址，设备标签，本地导入确定要配置的设备。"}),i.a.createElement(ge,{title:"执行任务",description:"提交执行远程配置任务，设备更新结果实时可见。"}))),i.a.createElement("div",{className:"comm-shadowbox device-content"},i.a.createElement("div",{className:"content-top"},i.a.createElement("div",null),i.a.createElement(b.a,{type:"primary",onClick:function(){return J()}},"创建任务")),i.a.createElement(y.a,{columns:N,className:"ant-table-fixed",rowKey:"taskId",dataSource:h,pagination:{defaultCurrent:1,current:A.pageIndex,onChange:function(e,t){t===A.pageRows?x((function(n){var a=JSON.parse(JSON.stringify(n));return Object.assign(a,{pageIndex:e,pageRows:t})})):x((function(e){var n=JSON.parse(JSON.stringify(e));return Object.assign(n,{pageIndex:1,pageRows:t})}))},pageSize:A.pageRows,total:A.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return i.a.createElement("span",null,"共 ",i.a.createElement("a",null,A.totalRows)," 条")}}})),k&&i.a.createElement(I.a,{visible:k,modalOKHandle:function(){var e=C.taskId;Object(o.c)(o.a.delDeviceRemoset,{taskId:e}).then((function(e){Object(j.a)({type:"success",description:"删除成功！"}),q()}))},modalCancelHandle:function(){return E({deletevisible:!1,deleteItem:null,deleteLoading:!1})},targetName:C.taskId,confirmLoading:T,title:"删除任务",needWarnIcon:!0,descText:"即将删除的任务",tipText:"任务的所有信息将完全被删除，无法找回，请谨慎操作"}),c&&i.a.createElement(se,{addVisible:c,addOk:function(){s(!1)},CancelAdd:function(){s(!1)}}),B&&i.a.createElement(fe,{detailVis:B,onCancel:function(){K(!1)},actionData:m}))},Se=n("MeRu"),Ae=(n("aIR0"),a.a.TabPane);function xe(e){var t=e.match,n=e.history,r=Object(l.useMemo)((function(){return Object(u.h)("step")||"1"}),[]),c=t.params.id,o={};return sessionStorage.DEVICE_DETAIL_BASE&&(o=JSON.parse(sessionStorage.DEVICE_DETAIL_BASE)),i.a.createElement("div",{id:"device-detail"},i.a.createElement(Se.a,{backTitle:"设备详情"},i.a.createElement("div",{className:"device-top"},i.a.createElement("div",{className:"device-top-item"},i.a.createElement("label",{className:"device-label"},"设备ID："),i.a.createElement("span",{className:"device-text"},o.deviceId),i.a.createElement("span",{className:"device-status"},1==o.onlineStatus?"在线":"离线")),i.a.createElement("div",{className:"device-top-item"},i.a.createElement("label",{className:"device-label"},"物理地址ID："),i.a.createElement("span",{className:"device-text"}),o.deviceMac),i.a.createElement("div",{className:"device-top-item"},i.a.createElement("label",{className:"device-label"},"产品名称："),i.a.createElement("span",{className:"device-text"},o.productName)),i.a.createElement("div",{className:"device-top-item"},i.a.createElement("label",{className:"device-label"},"所属分类："),i.a.createElement("span",{className:"device-text"},o.productType)))),i.a.createElement("div",{className:"comm-shadowbox common-tab device-content"},i.a.createElement(a.a,{defaultActiveKey:r,onChange:function(e){n.push(t.url+"?"+"step=".concat(e))}},i.a.createElement(Ae,{key:"1",tab:"基本信息"},i.a.createElement(p,{devceId:c})),i.a.createElement(Ae,{key:"2",tab:"设备标签"},i.a.createElement(R,{devceId:c})),i.a.createElement(Ae,{key:"3",tab:"设备影子"},i.a.createElement(te,{devceId:c})),i.a.createElement(Ae,{key:"4",tab:"远程配置"},i.a.createElement(je,{devceId:c})))))}},i6mW:function(e,t,n){},t7Rh:function(e,t,n){},wmP4:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABsklEQVQokWWRvW4TQRSFv5nMLE4U8IJEEaFFUUJhCQpA4idNKFJQUiU0eYM8QOqUCCSQeAXShJISCQch4QYqQEHhV3LjmCoKyEnsvZdixrtr+xazO3N3vnPuWfP2c2dPoYEqqqBhQeMehucCwz78vH97fhHAqdIoLkHlcgRU9qGtqOoCsVzRjAAVjapaKI4ARIlSJaC0L1WVEUjhhGKMccCk7XJ+ZTKbIUCqI4zaRpVTgVY3Ze9wlt7AceFMn8a5I1Z3dPrlmumZ1x/bClrOVgH0BbZ/zNE5rpFY8AZ8fCZTtPoJK05VylmJTiS8v++mHBzXSAxs3IEshSe7YBS8YWkmZ9OGVKKqKCLKEPr18CzewMZd+NKBm5fg+lzpwhvWgwMpE64G1csd3sLlFB5cDaFldfh2ECCJJXMKzxQWwGCQmHr4eNbJ8kCm0se7QTmrw8MbkOfw4Td4S9swVs3mr9o/398W1bz15+Kt73/Pz1fDu7cIy1fg+Rtwlq0JwKt3+59U5JqiDMTQ7GYcDWZG/4AFZ2md5KxMAMZrdUen6zmb3rCeWDJvaTvDi5OcR0/XTO8/FFxXqP9J8G8AAAAASUVORK5CYII="}}]);