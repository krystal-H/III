(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"5jjE":function(e,t,n){},"7EV8":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("2B1R"),n("FZtP"),n("pDQq");var a=function(e,t,n,a,r){if(!Array.isArray(e))return 1;for(var c=e.map((function(e){return e[r]})),i=e.map((function(e){return e[t]})),o=c[0],l=[[o]],u=0,d=1;d<c.length;d++)c[d]===o?l[u].push(c[d]):(l[u+=1]=[],l[u].push(c[d]),o=c[d]);var s=[];l.forEach((function(e,t){s[t]=[],s[t]=i.splice(0,e.length)}));var f=[];s.forEach((function(e,t){var n=s[t][0],a=0;f[t]=[],f[t][a]=[],e.forEach((function(e,r){n===e?f[t][a].push(e):(a+=1,f[t][a]=[],f[t][a].push(e),n=e)}))}));var p=[];f.forEach((function(e){e.forEach((function(e){p.push(e)}))}));var m=[];p.forEach((function(e){for(var t=e.length,n=0;n<t;n++)m.push(0===n?t:0)}));var b={children:a,props:{}};return b.props.rowSpan=m[n],b}},Hg3J:function(e,t,n){},"OBs/":function(e,t,n){},aIR0:function(e,t,n){},aoTg:function(e,t,n){},gyoc:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return Ae}));n("AUBz");var a=n("ZTPi"),r=(n("rB9j"),n("Rm1S"),n("pNMO"),n("4Brf"),n("07d7"),n("0oug"),n("4mDm"),n("PKPk"),n("3bBZ"),n("+2oP"),n("sMBO"),n("pjDv"),n("qNb/"),n("PArb")),c=(n("OrB1"),n("gFTJ")),i=n("q1tI"),o=n.n(i),l=n("Nlzp"),u=n("DgvE"),d=n("S18n");n("5jjE");function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function p(e){var t=e.devceId,n=s(Object(i.useState)({}),2),a=n[0],f=n[1];Object(i.useEffect)((function(){t&&b()}),[t]);var p,m,b=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(l.c)(l.a.getDeviceInfo,{deviceId:t},{loading:e}).then((function(e){f(e.data)}))};return o.a.createElement("div",{id:"device-info"},o.a.createElement(c.b,{title:"设备信息"},o.a.createElement(c.b.Item,{label:"设备ID"},a.deviceUniqueId),o.a.createElement(c.b.Item,{label:"设备秘钥"},o.a.createElement("span",null,o.a.createElement(d.a,{label:a.deviceSecret,tip:"点击复制",copy:!0}))),o.a.createElement(c.b.Item,{label:"物理地址"},a.deviceMac),o.a.createElement(c.b.Item,{label:"入网时间"},a.connectTime&&u.a.utcToDev(a.connectTime)),o.a.createElement(c.b.Item,{label:"模组固件版本"},a.moduleVersion),o.a.createElement(c.b.Item,{label:"MCU固件版本"},a.pcbVersion),o.a.createElement(c.b.Item,{label:"绑定网关"},a.gateWay),o.a.createElement(c.b.Item,{label:"设备名称"},a.deviceName),o.a.createElement(c.b.Item,{label:"设备位置"},a.deviceSite),o.a.createElement(c.b.Item,{label:"绑定C端用户"},a.bindCUser),o.a.createElement(c.b.Item,{label:"SIM卡号"},a.simNumber),o.a.createElement(c.b.Item,{label:"IMEI"},a.deviceIdentifier)),o.a.createElement(r.a,null),o.a.createElement(c.b,{title:"产品信息"},o.a.createElement(c.b.Item,{label:"产品名称"},a.productName),o.a.createElement(c.b.Item,{label:"产品ID"},a.productId),o.a.createElement(c.b.Item,{label:"所属分类"},a.productType),o.a.createElement(c.b.Item,{label:"产品类型"},(p=a.productClass,m=null,"number"==typeof p&&(m=1==p?"网关设备":"普通设备"),m)),o.a.createElement(c.b.Item,{label:"产品编码"},a.productCode),o.a.createElement(c.b.Item,{label:"产品密钥"},o.a.createElement("span",null,o.a.createElement(d.a,{label:a.productKey,tip:"点击复制",copy:!0})))))}n("tkto"),n("TeQF"),n("5DmW"),n("FZtP"),n("27RR"),n("5s+n"),n("L/Qf");var m=n("2/Rp"),b=(n("mbEz"),n("wCAj")),y=(n("Y2jk"),n("zeV3")),v=(n("O+5t"),n("wFql")),h=(n("tULf"),n("Vl3Y")),g=(n("1vPl"),n("5rEg")),O=(n("QCje"),n("fyUT")),E=(n("2B1R"),n("ls82"),n("FC04"));function I(e){var t=e.operate,n=e.visible,a=e.updateOkHandle,r=e.updateCancelHandle,c=null;switch(t){case 1:c={title:"发布云端定时功能",desc:"即将发布的功能",tip:"功能发布后，APP上可以看到并启用，是否确认发布？",needWarnIcon:!1};break;case 2:c={title:"删除标签",tip:"标签删除后将无法找回，是否确认删除？",needWarnIcon:!0};break;case 3:c={title:"下线云端定时功能",desc:"即将下线的功能",tip:"功能下线后将无法看到，是否确认下线？",needWarnIcon:!0}}return o.a.createElement(E.a,{visible:n,modalOKHandle:function(){return a(t)},modalCancelHandle:r,targetName:"test",title:c.title,descGray:!0,needWarnIcon:c.needWarnIcon,descText:c.desc,tipText:c.tip})}n("OBs/");var w=n("P2RN"),j=["editing","dataIndex","title","inputType","record","index","children"];function S(e,t,n,a,r,c,i){try{var o=e[c](i),l=o.value}catch(e){return void n(e)}o.done?t(l):Promise.resolve(l).then(a,r)}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){A(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function T(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var P=function(e){var t=e.editing,n=e.dataIndex,a=e.title,r=e.inputType,c=(e.record,e.index,e.children),i=T(e,j),l="number"===r?o.a.createElement(O.a,null):o.a.createElement(g.a,{maxLength:50});return o.a.createElement("td",i,t?o.a.createElement(h.a.Item,{name:n,style:{margin:0,style:"100%"},rules:[{required:!0,message:"Please Input ".concat(a,"!")}]},l):c)};function D(e){var t=e.devceId,n=C(h.a.useForm(),1)[0],a=C(Object(i.useState)([]),2),r=a[0],c=a[1],u=C(Object(i.useState)(null),2),d=u[0],s=u[1],f=C(Object(i.useState)(""),2),p=f[0],g=f[1],O=C(Object(i.useState)(null),2),E=O[0],j=O[1],k=function(e){return e.id===p},A=C(Object(i.useState)(!1),2),N=A[0],T=A[1];Object(i.useEffect)((function(){t&&K()}),[t]);var D=function(e){n.setFieldsValue(x({name:"",age:""},e)),g(e.id)},M=function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];e.deviceId=t,Object(l.c)(l.a.addDeviceLabel,e,{loading:n}).then((function(e){g(""),Object(w.a)({type:"success",description:"新增成功！"}),K()})).catch((function(e){g(""),K()}))},R=function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];e.deviceId=t,Object(l.c)(l.a.updateDeviceLabel,e,{loading:n}).then((function(e){g(""),Object(w.a)({type:"success",description:"编辑成功！"}),K()})).catch((function(e){g(""),K()}))},J=function(){var e,t=(e=regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.validateFields();case 3:a=e.sent,t.id?(a.labelId=t.id,R(a)):M(a),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("Validate Failed:",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})),function(){var t=this,n=arguments;return new Promise((function(a,r){var c=e.apply(t,n);function i(e){S(c,a,r,i,o,"next",e)}function o(e){S(c,a,r,i,o,"throw",e)}i(void 0)}))});return function(e){return t.apply(this,arguments)}}(),L=[{title:"标签Key",dataIndex:"labelKey",editable:!0},{title:"标签Value",dataIndex:"labelValue",editable:!0},{title:"操作",dataIndex:"operation",render:function(e,t){return k(t)?o.a.createElement("span",null,o.a.createElement("a",{onClick:function(){return J(t)},style:{marginRight:8}},"保存")):o.a.createElement(y.b,null,o.a.createElement(v.a.Link,{disabled:""!==p,onClick:function(){return D(t)}},"编辑"),o.a.createElement(v.a.Link,{disabled:""!==p,onClick:function(){var e,n;e=2,n=t.id,T(!0),j(n),s(e)}},"删除"))}}].map((function(e){return e.editable?x(x({},e),{},{onCell:function(t){return{record:t,inputType:"text",dataIndex:e.dataIndex,title:e.title,editing:k(t)}}}):e})),K=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(l.c)(l.a.getDeviceLabelList,{deviceId:t},{loading:e}).then((function(e){c(e.data.list)}))};return o.a.createElement("div",{id:"device-tag"},o.a.createElement(h.a,{form:n,component:!1},o.a.createElement(b.a,{components:{body:{cell:P}},dataSource:r,columns:L,rowClassName:"editable-row",rowKey:"id",pagination:!1})),o.a.createElement(m.a,{type:"primary",ghost:!0,className:"edit-table-btn",onClick:function(){!function(){var e=!1;if(p&&(e=!0),r.map((function(t){t.id||(e=!0)})),!e){var t=JSON.parse(JSON.stringify(r)),n={key:"".concat(t.length+1),labelKey:"",labelValue:"",id:0};t.push(n),c(t),D(n)}}()}},"添加标签"),N&&o.a.createElement(I,{visible:N,operate:d,updateOkHandle:function(){Object(l.c)(l.a.deleteDeviceLabel,{labelId:E}).then((function(e){T(!1),Object(w.a)({type:"success",description:"删除成功！"}),K()}))},updateCancelHandle:function(){T(!1)}}))}n("K4yd");var M=n("9yH6"),R=(n("t7Rh"),n("TL2v")),J=(n("zKZe"),n("ma9I"),n("wd/R"),n("55Ip")),L=n("7EV8"),K=(n("k3Gp"),n("kLXV")),V=(n("8QGh"),n("2fM7")),U=(n("i6mW"),n("MT78"));function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return F(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return F(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var q=V.a.Option,z=[{key:1,value:"最近1小时"},{key:2,value:"最近6小时"},{key:3,value:"最近24小时"}];function Q(e){var t=e.ModalVisible,n=e.closeOk,a=e.sentData,r=e.baseInfo,c=B(Object(i.useState)(1),2),u=c[0],d=c[1];Object(i.useEffect)((function(){s()}),[]);var s=function(e){var t={column:a.funcIdentifier,productId:r.productId,tslType:a.funcType,deviceId:r.deviceId};e&&(t.selectType=e),Object(l.c)(l.a.deviceShadowHis,t).then((function(e){!function(e){var t=[],n=[];e.forEach((function(e){t.push(e.datatimestamp),n.push(e.data)}));var a,r=document.getElementById("echart-show"),c=U.init(r);(a={title:{},tooltip:{trigger:"axis"},legend:{label:{narmal:{show:!1}}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{},xAxis:{type:"category",data:t},yAxis:{type:"value"},series:[{name:"Step Start",type:"line",step:"start",data:n}]})&&c.setOption(a)}(e.data)}))};return o.a.createElement("div",null,o.a.createElement(K.a,{title:"查看",visible:t,onOk:n,onCancel:n,width:"764px",wrapClassName:"add-protocols-wrap"},o.a.createElement("div",{className:"device-shadow-modal"},o.a.createElement("div",{className:"device-shadow-modal-header"},o.a.createElement(V.a,{style:{width:200},onChange:function(e){d(e),s(e)}},z.map((function(e){return o.a.createElement(q,{value:e.key,key:e.key},e.value)}))),o.a.createElement("a",{onClick:function(){var e={column:a.funcIdentifier,productId:r.productId,tslType:a.funcType,selectType:u,deviceId:r.deviceId};Object(l.c)(l.a.exportShadowHis,e).then((function(e){window.open(e.data)}))}},"导出数据")),o.a.createElement("div",{style:{height:"303px"},id:"echart-show"}))))}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function W(e){var t=e.dataSource,n=(e.deviceId,e.baseInfo),a=H(Object(i.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),r=a[0],c=a[1],l=function(){var e=(r.pageIndex-1)*r.pageRows;return t.slice(e,e+10)},u=H(Object(i.useState)(!1),2),d=u[0],s=u[1],f=H(Object(i.useState)({}),2),p=f[0],m=f[1],y=[{title:"功能类型",dataIndex:"funcTypeCN",render:function(e,t,n){return Object(L.a)(l(),"funcIdentifier",n,e,"funcTypeCN")}},{title:"功能点名称",dataIndex:"funcName",render:function(e,t,n){return Object(L.a)(l(),"funcIdentifier",n,e,"funcName")}},{title:"标识符",dataIndex:"funcIdentifier",render:function(e,t,n){return Object(L.a)(l(),"funcIdentifier",n,e,"funcIdentifier")}},{title:"参数名称",dataIndex:"name"},{title:"参数标识",dataIndex:"identifier"},{title:"数据传输类型",dataIndex:"accessMode",render:function(e,t){return"rw"==e?"可下发可上报":"w"==e?"可下发":"r"==e?"可上报":""}},{title:"数据类型",dataIndex:"dataType",render:function(e,t){return o.a.createElement("span",null,t.dataTypCN)}},{title:"数据属性",dataIndex:"propertyMap",render:function(e,t){return o.a.createElement("span",null,function(e){var t=null;switch(e.dataTypeEN){case"float":case"int":t="数值范围：".concat(e.propertyMap.min,"-").concat(e.propertyMap.max,",间距：").concat(e.propertyMap.interval,",倍数：").concat(e.propertyMap.multiple,",单位：").concat(e.propertyMap.unit);break;case"bool":t="0：".concat(e.propertyMap[0],",1：").concat(e.propertyMap[1]);break;case"enum":var n="";for(var a in e.propertyMap)n+=a+"："+e.propertyMap[a]+", ";t="枚举值：".concat(n);break;default:return""}return t}(t))}},{title:"最新数据",dataIndex:"funcData"},{title:"操作",dataIndex:"dd",render:function(e,t){return o.a.createElement("a",{onClick:function(){m(t),s(!0)}},"查看")}}];return o.a.createElement("div",null,o.a.createElement(b.a,{rowKey:"key",columns:y,dataSource:t,pagination:{defaultCurrent:1,current:r.pageIndex,onChange:function(e,t){t===r.pageRows?c((function(n){var a=JSON.parse(JSON.stringify(n));return Object.assign(a,{pageIndex:e,pageRows:t})})):c((function(e){var n=JSON.parse(JSON.stringify(e));return Object.assign(n,{pageIndex:1,pageRows:t})}))},pageSize:r.pageRows,total:r.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return o.a.createElement("span",null,"共 ",o.a.createElement("a",null,t.length)," 条")}}}),d&&o.a.createElement(Q,{ModalVisible:d,closeOk:function(){s(!1)},sentData:p,baseInfo:n}))}var G=n("/Zbm");function Y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return X(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return X(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function X(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function $(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?$(Object(n),!0).forEach((function(t){ee(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):$(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ee(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var te=a.a.TabPane;function ne(e){var t=[];return e.forEach((function(e){e.funcParamList&&e.funcParamList.length&&e.funcParamList.forEach((function(n){var a=JSON.parse(JSON.stringify(e));t.push(_(_({},a),n))}))})),t.forEach((function(e,t){e.key=t})),t}function ae(e){var t=e.baseInfo,n=e.devceId,r=Y(Object(i.useState)([]),2),c=r[0],u=r[1],d=Y(Object(i.useState)(""),2),s=d[0],f=d[1],p=Y(Object(i.useState)("a"),2),m=p[0],b=p[1];Object(i.useEffect)((function(){n&&y()}),[n]);var y=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(l.c)(l.a.deviceShadow,{deviceUniqueId:t.deviceUniqueId},{loading:e}).then((function(e){"properties"==e.data.tslType?b("a"):"events"==e.data.tslType?b("b"):"services"==e.data.tslType&&b("c"),u(ne(e.data.list));var t=e.data.jsonString||{};f(JSON.stringify(t))}))};return o.a.createElement("div",{id:"device-shadow"},o.a.createElement(R.a,{style:{marginBottom:8,width:"100%",display:"flex"},desc:["设备影子是设备最新状态在平台的缓存信息，您可以在平台实时查询设备的运行和状态信息，也可以通过API获取设备状态信息。详细说明可参考",o.a.createElement("a",{onClick:function(){window.open("https://cms.clife.cn/clifeIotDoc/")}},"帮助文档")]}),o.a.createElement(a.a,{defaultActiveKey:"1",className:"shadow-tab"},o.a.createElement(te,{key:"1",tab:"表单模式"},o.a.createElement("div",null,o.a.createElement(M.a.Group,{defaultValue:m,size:"middle",onChange:function(e){},style:{margin:"6px 0  22px 0"}},o.a.createElement(M.a.Button,{value:"a",disabled:"a"!=m},"属性"),o.a.createElement(M.a.Button,{value:"b",disabled:"b"!=m},"事件"),o.a.createElement(M.a.Button,{value:"c",disabled:"c"!=m},"服务")),o.a.createElement(W,{dataSource:c,deviceId:n,baseInfo:t}))),o.a.createElement(te,{key:"2",tab:"Json模式"},o.a.createElement("div",null,o.a.createElement(G.a,{code:s})))))}n("RKNx");var re=n("L41K"),ce=n("wmP4"),ie=n.n(ce),oe=n("wZVF");n("Hg3J");function le(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ue(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ue(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ue(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function de(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function se(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?de(Object(n),!0).forEach((function(t){fe(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):de(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function fe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var pe=g.a.TextArea;function me(e,t){var n=[];return e.forEach((function(e){e.funcParamList&&e.funcParamList.length&&e.funcParamList.forEach((function(t){var a=JSON.parse(JSON.stringify(e));n.push(se(se({},a),t))}))})),n.forEach((function(e,n){e.key=n,e.sendData="",e.isCheck=!1,t&&t.forEach((function(t){t.funcIdentifier===e.funcIdentifier&&(e.isCheck=!0,("properties"===e.funcType||e.identifier===t.identifier)&&(e.sendData=t.sendData))}))})),n}function be(e){var t=e.addVisible,n=e.addOk,a=e.CancelAdd,r=e.deviceId,c=e.baseInfo,u=e.actionType,d=e.actionData,s=le(Object(i.useState)([]),2),f=s[0],p=s[1],m=le(Object(i.useState)({}),2),b=m[0],y=m[1],v=le(h.a.useForm(),1)[0],O=Object(i.useRef)(null);Object(i.useEffect)((function(){"add"!==u?E():I()}),[]);var E=function(){var e=c.productId,t=[Object(l.c)(l.a.standardFnList,{productId:e}),Object(l.c)(l.a.singelDeviceRemoset,{taskId:d.taskId})];Promise.all(t).then((function(e){v.setFieldsValue({taskName:e[1].data.taskName,taskExplain:e[1].data.taskExplain}),y(e[1].data);var t=e[0].data.standard.concat(e[0].data.custom);t=me(t=t.filter((function(e){return"服务"===e.funcTypeCN||"属性"===e.funcTypeCN&&"r"!==e.funcParamList[0].accessMode?e:void 0})),JSON.parse(e[1].data.remoteProtocol.protocolJson)),"detail"===u&&(t=t.filter((function(e){if(e.isCheck)return e}))),p(t)}))},I=function(){var e=c.productId;Object(l.c)(l.a.standardFnList,{productId:e}).then((function(e){var t=e.data.standard.concat(e.data.custom);t=me(t=t.filter((function(e){return"服务"===e.funcTypeCN||"属性"===e.funcTypeCN&&"r"!==e.funcParamList[0].accessMode?e:void 0}))),p(t)}))};return o.a.createElement("div",null,o.a.createElement(K.a,{maskClosable:!1,title:"远程配置任务",visible:t,onOk:function(){"detail"!==u?O.current.subOrder():a()},onCancel:a,width:"1300px",wrapClassName:"device-remote-config-modal"},o.a.createElement("div",null,o.a.createElement(h.a,{form:v},o.a.createElement(h.a.Item,{label:"任务名称",name:"taskName",rules:[{required:!0}]},"detail"===u?o.a.createElement("span",null,b.taskName):o.a.createElement(g.a,{style:{width:"300px"},maxLength:20})),o.a.createElement(h.a.Item,{label:"任务说明",name:"taskExplain",rules:[{required:!0}]},"detail"===u?o.a.createElement("span",null,b.taskExplain):o.a.createElement(pe,{rows:4,maxLength:100,showCount:!0}))),o.a.createElement("div",{style:{marginBottom:"10px"}},"detail"===u?"配置数据":"请添加配置信息"," "),o.a.createElement(oe.a,{dataSource:f,ref:O,finishSub:function(e){v.validateFields().then((function(t){var a={taskName:t.taskName,deviceId:r,taskExplain:t.taskExplain,protocolJson:JSON.stringify(e)};"edit"===u&&(a.taskId=d.taskId),Object(l.c)(l.a.saveDeviceRemoset,a,{loading:!0}).then((function(e){Object(w.a)({type:"success",description:"操作成功"}),n()}))}))},actionType:u}))))}function ye(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function ve(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ye(Object(n),!0).forEach((function(t){he(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ye(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function he(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ge(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Oe(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Oe(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Oe(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var Ee=re.a.Step,Ie=["草稿","待执行","执行成功","执行失败"];var we=function(e){var t=e.devceId,n=e.baseInfo,a=ge(Object(i.useState)(!1),2),c=a[0],d=a[1],s=ge(Object(i.useState)({}),2),f=s[0],p=s[1],y=ge(Object(i.useState)({deletevisible:!1,deleteItem:null,deleteLoading:!1}),2),v=y[0],h=y[1],g=ge(Object(i.useState)([]),2),O=g[0],I=g[1],j=ge(Object(i.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),S=j[0],k=j[1],x=ge(Object(i.useState)("add"),2),A=x[0],C=x[1],N=v.deletevisible,T=v.deleteItem,P=v.deleteLoading,D=[{title:"任务ID",dataIndex:"taskId",key:"taskId"},{title:"任务名称",dataIndex:"taskName",key:"taskName"},{title:"任务说明",dataIndex:"taskExplain",key:"taskExplain",render:function(e,t){return o.a.createElement("div",{className:"single-text",style:{width:400}},e)}},{title:"任务状态",dataIndex:"status",key:"status",render:function(e,t){var n=t.status;return o.a.createElement("span",{className:"device-h5-statu-".concat(n+1)},Ie[n])}},{title:"执行时间",dataIndex:"execTime",key:"execTime",render:function(e,t){var n=t.execTime;return o.a.createElement("span",null,n?u.a.utcToDev(n):"--")}},{title:"操作",key:"action",render:function(e,t){var n=t.status;t.taskId;return""+n=="1"?o.a.createElement(o.a.Fragment,null,o.a.createElement("a",{onClick:function(){return L(t)}},"编辑"),o.a.createElement(r.a,{type:"vertical"}),o.a.createElement("a",{onClick:function(){return function(e){Object(l.c)(l.a.excelDevTask,{taskId:e.taskId},{loading:!0}).then((function(e){J(),Object(w.a)({description:"执行成功！",type:"success"})})).catch((function(e){J()}))}(t)}},"执行"),o.a.createElement(r.a,{type:"vertical"}),o.a.createElement("a",{onClick:function(){return h({deletevisible:!0,deleteItem:t})}},"删除")):o.a.createElement("a",{onClick:function(){return M(t)}},"查看")}}],M=function(e){p(e),C("detail"),d(!0)};Object(i.useEffect)((function(){t&&J()}),[S.pageRows,S.pageIndex,t]);var J=function(e){var n=ve({deviceId:t},S);Object(l.c)(l.a.deviceRemoteConfigList,n,{loading:!0}).then((function(e){var t=e.data.list,n=void 0===t?[]:t;I(Object(u.b)(n)),k((function(t){var n=JSON.parse(JSON.stringify(t));return Object.assign(n,{totalRows:e.data.pager.totalRows})}))}))},L=function(e){p(e),C("edit"),d(!0)};return o.a.createElement("div",{id:"device-remote-config"},o.a.createElement("div",{className:"comm-shadowbox setp-tip"},o.a.createElement("div",{className:"step-title"},o.a.createElement("img",{src:ie.a,alt:""}),o.a.createElement("span",null,"远程配置步骤")),o.a.createElement(R.a,{style:{marginBottom:18,width:"100%",display:"flex",alignItems:"center"},desc:[o.a.createElement("div",null,"平台支持远程更新设备的配置数据，您可以提交远程配置任务，实时对设备的系统参数等数据进行远程更新，并且获取设备配置的更新状态。详细说明可参考",o.a.createElement("a",{onClick:function(){window.open("https://cms.clife.cn/clifeIotDoc/")}},"帮助文档"))]}),o.a.createElement(re.a,{current:-1,initial:0},o.a.createElement(Ee,{title:"创建远程配置任务",description:"创建远程配置任务，填写任务的目的或备注信息。"}),o.a.createElement(Ee,{title:"添加配置数据",description:"添加要更新的产品配置数据字段和更新的数值。"}),o.a.createElement(Ee,{title:"执行任务",description:"提交执行远程配置任务，设备更新结果实时可见。"}))),o.a.createElement("div",{className:"comm-shadowbox device-content"},o.a.createElement("div",{className:"content-top"},o.a.createElement("div",null," "),o.a.createElement(m.a,{type:"primary",onClick:function(){return C("add"),void d(!0)}},"创建任务")),o.a.createElement(b.a,{columns:D,className:"ant-table-fixed",rowKey:"taskId",dataSource:O,pagination:{defaultCurrent:1,current:S.pageIndex,onChange:function(e,t){t===S.pageRows?k((function(n){var a=JSON.parse(JSON.stringify(n));return Object.assign(a,{pageIndex:e,pageRows:t})})):k((function(e){var n=JSON.parse(JSON.stringify(e));return Object.assign(n,{pageIndex:1,pageRows:t})}))},pageSize:S.pageRows,total:S.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return o.a.createElement("span",null,"共 ",o.a.createElement("a",null,S.totalRows)," 条")}}})),N&&o.a.createElement(E.a,{visible:N,modalOKHandle:function(){var e=T.taskId;Object(l.c)(l.a.delDeviceRemoset,{taskId:e}).then((function(e){Object(w.a)({type:"success",description:"删除成功！"}),h({deletevisible:!1,deleteItem:null,deleteLoading:!1}),J()}))},modalCancelHandle:function(){return h({deletevisible:!1,deleteItem:null,deleteLoading:!1})},targetName:T.taskName,confirmLoading:P,title:"删除任务",needWarnIcon:!0,descText:"即将删除的任务",tipText:"任务的所有信息将完全被删除，无法找回，请谨慎操作"}),c&&o.a.createElement(be,{addVisible:c,actionData:f,addOk:function(){J(),d(!1)},CancelAdd:function(){d(!1)},deviceId:t,baseInfo:n,actionType:A}))},je=n("MeRu");n("aIR0");function Se(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ke(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ke(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ke(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var xe=a.a.TabPane;function Ae(e){var t=e.match,n=Object(J.useHistory)(),r=Object(i.useMemo)((function(){return Object(u.g)("step")||"1"}),[]),c=t.params.id,d=Se(Object(i.useState)({}),2),s=d[0],f=d[1];return Object(i.useEffect)((function(){var e={infoType:"1",field:c,pageIndex:1,pageRows:1};Object(l.c)(l.a.getDeviceList,e).then((function(e){f(e.data.list[0])}))}),[c]),o.a.createElement("div",{id:"device-detail"},o.a.createElement(je.a,{backTitle:"设备详情",backHandle:function(){n.push("/open/device/devManage/list")}},o.a.createElement("div",{className:"device-top"},o.a.createElement("div",{className:"device-top-item"},o.a.createElement("label",{className:"device-label"},"设备ID："),o.a.createElement("span",{className:"device-text"},s.deviceUniqueId),o.a.createElement("span",{className:"device-status"},1==s.onlineStatus?"在线":"离线")),o.a.createElement("div",{className:"device-top-item"},o.a.createElement("label",{className:"device-label"},"物理地址："),o.a.createElement("span",{className:"device-text"}),s.deviceMac),o.a.createElement("div",{className:"device-top-item"},o.a.createElement("label",{className:"device-label"},"产品名称："),o.a.createElement("span",{className:"device-text"},s.productName)),o.a.createElement("div",{className:"device-top-item"},o.a.createElement("label",{className:"device-label"},"所属分类："),o.a.createElement("span",{className:"device-text"},s.productType)))),o.a.createElement("div",{className:"comm-shadowbox common-tab device-content"},o.a.createElement(a.a,{defaultActiveKey:r,onChange:function(e){n.push(t.url+"?"+"step=".concat(e))}},o.a.createElement(xe,{key:"1",tab:"基本信息"},o.a.createElement(p,{devceId:s.deviceId})),o.a.createElement(xe,{key:"2",tab:"设备标签"},o.a.createElement(D,{devceId:s.deviceId})),o.a.createElement(xe,{key:"3",tab:"设备影子"},o.a.createElement(ae,{devceId:s.deviceId,baseInfo:s})),o.a.createElement(xe,{key:"4",tab:"远程配置"},o.a.createElement(we,{devceId:s.deviceId,baseInfo:s})))))}},i6mW:function(e,t,n){},t7Rh:function(e,t,n){},wZVF:function(e,t,n){"use strict";n("pNMO"),n("4Brf"),n("07d7"),n("0oug"),n("4mDm"),n("PKPk"),n("3bBZ"),n("+2oP"),n("sMBO"),n("pjDv"),n("mbEz");var a=n("wCAj"),r=(n("1vPl"),n("5rEg")),c=(n("QCje"),n("fyUT")),i=(n("MKzF"),n("kaz8")),o=(n("8QGh"),n("2fM7")),l=n("BkRI"),u=n.n(l),d=(n("ma9I"),n("FZtP"),n("TeQF"),n("tkto"),n("2B1R"),n("qePV"),n("q1tI")),s=n.n(d),f=n("7EV8"),p=n("P2RN");n("aoTg");function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return b(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var y=o.a.Option;function v(e,t){var n=e.dataSource,l=e.finishSub,b=e.actionType,v=m(Object(d.useState)([]),2),h=v[0],g=v[1],O=m(Object(d.useState)([]),2),E=O[0],I=O[1];Object(d.useEffect)((function(){I(u()(n));var e=[];n.forEach((function(t){if(t.isCheck)return-1===e.indexOf(t.funcIdentifier)&&e.push(t.funcIdentifier),t})),g(e)}),[n.length]);var w=function(e,t){var n=u()(E);n[t].sendData=e,I(n)},j=[{title:"勾选",width:"50px",dataIndex:"isCheck",fixed:"left",render:function(e,t,a){var r=Object(f.a)(n,"funcIdentifier",a,t.funcIdentifier,"funcIdentifier");return r.children=s.a.createElement(i.a,{checked:e,onChange:function(e){!function(e,t,n){var a=e.target.checked,r=u()(E);r[n].isCheck=a,I(r),g((function(e){var n=u()(e);return a?n.push(t.funcIdentifier):n=n.filter((function(e){if(e!==t.funcIdentifier)return e})),console.log(n,"勾选"),n}))}(e,t,a)},disabled:"detail"===b}),r}},{title:"功能类型",dataIndex:"funcTypeCN",width:"4%",render:function(e,t,a){return Object(f.a)(n,"funcIdentifier",a,e,"funcTypeCN")}},{title:"功能点名称",dataIndex:"funcName",width:"10%",render:function(e,t,a){return Object(f.a)(n,"funcIdentifier",a,e,"funcName")}},{title:"标识符",dataIndex:"funcIdentifier",width:"10%",render:function(e,t,a){return Object(f.a)(n,"funcIdentifier",a,e,"funcIdentifier")}},{title:"参数名称",dataIndex:"name",width:"12%"},{title:"参数标识",dataIndex:"identifier",width:"10%"},{title:"数据类型",width:"8%",dataIndex:"dataType",render:function(e,t){return s.a.createElement("span",null,t.dataTypCN)}},{title:"数据属性",dataIndex:"propertyMap",render:function(e,t){return s.a.createElement("span",null,function(e){var t=null;switch(e.dataTypeEN){case"float":case"int":t="数值范围：".concat(e.propertyMap.min,"-").concat(e.propertyMap.max,",间距：").concat(e.propertyMap.interval,",倍数：").concat(e.propertyMap.multiple,",单位：").concat(e.propertyMap.unit);break;case"bool":t="0：".concat(e.propertyMap[0],",1：").concat(e.propertyMap[1]);break;case"enum":var n="";for(var a in e.propertyMap)n+=a+"："+e.propertyMap[a]+", ";t="枚举值：".concat(n);break;default:return""}return t}(t))}},{title:"下发数据",dataIndex:"sendData",key:"sendData",fixed:"right",render:function(e,t,n){var a=t.dataTypeEN,i=t.propertyMap,l=null;if("detail"===b)return"bool"===a||"enum"===a?i[e]:e;switch(a){case"int":case"double":case"float":l=s.a.createElement(c.a,{value:t.sendData,min:i.min,max:i.max,onChange:function(e){return w(e,n)},placeholder:"请输入参数"});break;case"text":l=s.a.createElement(r.a,{value:t.sendData,allowClear:!0,maxLength:30,onChange:function(e){return w(e,n)},placeholder:"请输入参数"});break;case"enum":case"bool":l=s.a.createElement(o.a,{onChange:function(e){return w(e,n)},allowClear:!0,value:t.sendData},Object.keys(i)&&Object.keys(i).map((function(e,t){return s.a.createElement(y,{key:t+e,value:Number(e)},i[e])})))}return s.a.createElement("span",null,l)}}];return Object(d.useImperativeHandle)(t,(function(){return{subOrder:function(){var e,t;e=[],t=E.filter((function(t){var n=!0;if(t.sendData||0===t.sendData||(n=!1),0!==t&&h.indexOf(t.funcIdentifier)>-1&&n)return-1===e.indexOf(t.funcIdentifier)&&e.push(t.funcIdentifier),t})),e.length?e.length===h.length?(t=t.map((function(e){return{identifier:"properties"===e.funcType?e.funcIdentifier:e.identifier,sendData:e.sendData,funcIdentifier:e.funcIdentifier}})),l(t)):Object(p.a)({description:"部分勾选数据未配置"}):Object(p.a)({description:"请为配置协议添加参数"})}}}),[h,E]),s.a.createElement("div",null,s.a.createElement(a.a,{rowKey:"key",columns:j,className:"config-data-table",dataSource:E,locale:{emptyText:"暂无协议，请先去配置"},pagination:!1,scroll:{y:440,x:1e3}}))}t.a=Object(d.forwardRef)(v)},wmP4:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABsklEQVQokWWRvW4TQRSFv5nMLE4U8IJEEaFFUUJhCQpA4idNKFJQUiU0eYM8QOqUCCSQeAXShJISCQch4QYqQEHhV3LjmCoKyEnsvZdixrtr+xazO3N3vnPuWfP2c2dPoYEqqqBhQeMehucCwz78vH97fhHAqdIoLkHlcgRU9qGtqOoCsVzRjAAVjapaKI4ARIlSJaC0L1WVEUjhhGKMccCk7XJ+ZTKbIUCqI4zaRpVTgVY3Ze9wlt7AceFMn8a5I1Z3dPrlmumZ1x/bClrOVgH0BbZ/zNE5rpFY8AZ8fCZTtPoJK05VylmJTiS8v++mHBzXSAxs3IEshSe7YBS8YWkmZ9OGVKKqKCLKEPr18CzewMZd+NKBm5fg+lzpwhvWgwMpE64G1csd3sLlFB5cDaFldfh2ECCJJXMKzxQWwGCQmHr4eNbJ8kCm0se7QTmrw8MbkOfw4Td4S9swVs3mr9o/398W1bz15+Kt73/Pz1fDu7cIy1fg+Rtwlq0JwKt3+59U5JqiDMTQ7GYcDWZG/4AFZ2md5KxMAMZrdUen6zmb3rCeWDJvaTvDi5OcR0/XTO8/FFxXqP9J8G8AAAAASUVORK5CYII="}}]);