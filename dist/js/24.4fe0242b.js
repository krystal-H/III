(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{gbE0:function(e,t,a){"use strict";a.r(t);a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("sMBO"),a("pjDv"),a("AUBz");var n=a("ZTPi"),r=a("q1tI"),l=a.n(r),i=a("DgvE"),c=a("Nlzp"),o=a("MeRu"),u=(a("tkto"),a("TeQF"),a("5DmW"),a("FZtP"),a("27RR"),a("L/Qf"),a("2/Rp")),s=(a("1vPl"),a("5rEg")),m=(a("qNb/"),a("PArb")),d=(a("mbEz"),a("wCAj")),f=a("FC04"),p=(a("k3Gp"),a("kLXV")),g=(a("Jmwx"),a("BMrR")),b=(a("rO+z"),a("kPKH")),y=a("v7xx"),v=a("P2RN");function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return O(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return O(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var h=function(e){var t=e.warningInof,a=e.closeDetailMod,n=e.delwithWarn,o=t.alarmTime,u=t.warningTitle,m=t.state,d=t.warningWay,f=t.ruleName,O=t.warningDetail,h=t.deviceIds,j=t.dealDetail,w=t.id,S=t.productName,I=E(Object(r.useState)(""),2),x=I[0],P=I[1],C=E(Object(r.useState)(""),2),k=C[0],A=C[1],N=1==m&&l.a.createElement(y.a,{style:{padding:"0"},preText:"取消",nextText:"提交",preHandle:a,nextHandle:function(){x?n({id:w,dealDetail:x}):Object(v.a)({description:"请填写处理记录",type:"warn"})}})||l.a.createElement(y.a,{style:{padding:"0"},nextBtn:!1,preText:"关闭",preHandle:a});return l.a.createElement(p.a,{className:"page-warninginfo-modal",title:u,visible:!!u,width:700,onCancel:a,footer:N},l.a.createElement(g.a,{gutter:[12,16]},l.a.createElement(b.a,{span:5,className:"detail-label"},"告警时间："),l.a.createElement(b.a,{span:18},i.a.utcToDev(o)||"--"),l.a.createElement(b.a,{span:5,className:"detail-label"},"告警消息类型："),l.a.createElement(b.a,{span:18},{0:"站内",1:"站内+邮件"}[d]),l.a.createElement(b.a,{span:5,className:"detail-label"},"关联的告警规则："),l.a.createElement(b.a,{span:18},f||"--"),l.a.createElement(b.a,{span:5,className:"detail-label"},"告警内容："),l.a.createElement(b.a,{span:18},l.a.createElement("div",null,O||"--")),l.a.createElement(b.a,{span:5,className:"detail-label"},"产品名称："),l.a.createElement(b.a,{span:18},S||"--"),l.a.createElement(b.a,{span:5,className:"detail-label"},"告警设备ID："),l.a.createElement(b.a,{span:16},l.a.createElement("div",null,k||h||"")),l.a.createElement(b.a,{span:2},l.a.createElement("a",{onClick:function(){Object(c.c)(c.a.getWarningInfo,{id:w},{loading:!0}).then((function(e){A(e.data.deviceIds)}))}},"刷新")),l.a.createElement(b.a,{span:5,className:"detail-label"},"处理记录："),l.a.createElement(b.a,{span:18},1==m&&l.a.createElement(s.a.TextArea,{rows:3,value:x||j||"",placeholder:"处理记录",onChange:function(e){P(e.target.value)}})||l.a.createElement("div",null,x||j||""))))},j=(a("RKNx"),a("L41K")),w=(a("zKZe"),a("tULf"),a("Vl3Y"));function S(){return(S=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function x(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function P(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return C(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return C(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var k=s.a.TextArea,A=w.a.Item,N={labelCol:{span:6},wrapperCol:{span:12}};function T(e,t){var a=e.setStepCur,n=e.formdata,i=P(w.a.useForm(),1)[0];Object(r.useEffect)((function(){n.name?i.setFieldsValue(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(Object(a),!0).forEach((function(t){x(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},n)):i.resetFields()}),[n.name]);return l.a.createElement("div",null,l.a.createElement(w.a,S({ref:t,form:i},N,{onFinish:function(e){a(1)}}),l.a.createElement(A,{label:"告警规则名称",name:"name",rules:[{required:!0,message:"请输入告警规则名称"},{max:30,message:"最大输入长度为30字符"}]},l.a.createElement(s.a,{placeholder:"请输入告警规则名称"})),l.a.createElement(A,{label:"描述",name:"remark",rules:[{max:100,message:"最大输入长度为100字符"}]},l.a.createElement(k,{placeholder:"告警规则描述",showCount:!0,maxLength:100,rows:4}))),l.a.createElement(y.a,{preBtn:!1,nextHandle:i.submit}))}var D=Object(r.memo)(Object(r.forwardRef)(T)),F=(a("K4yd"),a("9yH6")),W=(a("8QGh"),a("2fM7"));a("ma9I"),a("rB9j"),a("EnZy"),a("2B1R");function M(){return(M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function q(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function V(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?q(Object(a),!0).forEach((function(t){R(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):q(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function R(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function L(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return B(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return B(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var H=W.a.Option,K=w.a.Item,U={labelCol:{span:8},wrapperCol:{span:16}},z=[{id:0,nam:"属性触发"},{id:1,nam:"事件触发"},{id:3,nam:"上线触发"},{id:4,nam:"下线触发"},{id:2,nam:"上下线触发"}],J=[{id:"1",nam:"=="},{id:"2",nam:">"},{id:"3",nam:"<"},{id:"4",nam:">="},{id:"5",nam:"<="},{id:"6",nam:"!="},{id:"7",nam:"in"},{id:"8",nam:"between"}],$=[{id:"1",nam:"="},{id:"6",nam:"!="},{id:"7",nam:"in"}];function G(e,t){var a=e.setStepCur,n=e.formdata,i=L(w.a.useForm(),1)[0],o=L(Object(r.useState)([]),2),u=o[0],s=o[1],m=L(Object(r.useState)([]),2),d=m[0],f=m[1],p=L(Object(r.useState)([]),2),v=p[0],E=p[1],O=L(Object(r.useState)([]),2),h=O[0],j=O[1],S=L(Object(r.useState)(n.triggerMode),2),I=S[0],x=S[1],P=L(Object(r.useState)(n.productId),2),C=P[0],k=P[1],A=L(Object(r.useState)(n.connType||"0"),2),N=A[0],T=A[1],D=L(Object(r.useState)(!1),2),q=D[0],R=D[1];Object(r.useEffect)((function(){0==u.length&&J()}),[]),Object(r.useEffect)((function(){C&&$(C)}),[C]),Object(r.useEffect)((function(){if(!q)if(n.productId){if(u.length>0&&d>0){var e=n.productId,t=n.deviceIds,a=n.triggerMode,r=n.props,l={productId:e,deviceIds:t,triggerMode:a};if(a>1)i.setFieldsValue(V({},l));else{l.ruletype=N;for(var c=0;c<r.length;c++){var o=r[c],s=o.propName,m=o.propIdentifier,f=o.propFieldType,p=o.judge,g=o.propVal,b=c>0?"_add":"";l["propName".concat(b)]="".concat(m,",").concat(f,",").concat(s),l["judge".concat(b)]=p,l["propVal".concat(b)]=g}if(1==a){G(e);var y=n.eventName,E=n.eventIdentifier+","+y;l.identifier=E,Q(E),h.length>0&&v.length>0&&i.setFieldsValue(V({},l))}else 0==a&&(Q(),v.length>0&&i.setFieldsValue(V({},l)))}}}else i.resetFields()}),[n.productId,u,d,v,h,q]),Object(r.useImperativeHandle)(t,(function(){return{formDataToData:B}}),[B]);var B=function(){var e=i.getFieldsValue();console.log(111,e);var t=e.triggerName,a=e.productId,n=e.deviceIds,r=e.triggerMode,l={triggerName:t,productId:a,deviceIds:n,triggerMode:r};if(r<2){var c=e.identifier,o=e.ruletype,u=e.propName,s=e.judge,m=e.propVal;if(c){var d=c.split(",");l.eventName=d[1],l.eventIdentifier=d[0]}var f=u.split(","),p=[{propName:f[2],propIdentifier:f[0],propFieldType:f[1],judge:s,propVal:m}];if("0"!==o){l.connType=o;var g=e.propName_add,b=e.judge_add,y=e.propVal_add,v=g.split(",");p.push({propName:v[2],propIdentifier:v[0],propFieldType:v[1],judge:b,propVal:y})}l.props=p}return l},J=function(){Object(c.b)(c.a.getProductType,{},{loading:!0}).then((function(e){var t=e.data,a=Object.keys(t).map((function(e){return{id:e,name:t[e]}}));s(a)}))},$=function(e){Object(c.c)(c.a.getDeviceListByProId,{productId:e,pageIndex:1,pageRows:9999},{loading:!0}).then((function(e){f(e.data.list)}))},G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C;Object(c.c)(c.a.getWarnEventLi,{productId:e},{loading:!0}).then((function(e){var t=e&&e.data||[];j(t)}))},Q=function(e){var t={productId:C},a=c.a.getWarnProperty;e&&(a=c.a.getWarnEventProperty,t.eventIdentifier=e.split(",")[0]),Object(c.c)(a,t,{loading:!0}).then((function(e){var t=e&&e.data||[];E(t)}))};return l.a.createElement("div",null,l.a.createElement(w.a,{form:i,onFinish:function(e){a(2)}},l.a.createElement(g.a,{gutter:14},l.a.createElement(b.a,{span:10},l.a.createElement(K,M({},U,{label:"触发对象",name:"triggerName",initialValue:"deviceTrigger",required:!0}),l.a.createElement(W.a,null,l.a.createElement(H,{value:"deviceTrigger"},"设备触发")))),l.a.createElement(b.a,{span:7},l.a.createElement(K,{name:"productId",rules:[{required:!0,message:"请选择产品"}]},l.a.createElement(W.a,{showSearch:!0,optionFilterProp:"children",onChange:function(e){k(e),R(!0)},placeholder:"请选择产品"},u.map((function(e){var t=e.id,a=e.name;return l.a.createElement(H,{key:t,value:t},a)}))))),l.a.createElement(b.a,{span:7},l.a.createElement(K,{name:"deviceIds",rules:[{required:!0,message:"请选择设备"}]},l.a.createElement(W.a,{allowClear:!0,mode:"multiple",placeholder:"请选择设备"},d.map((function(e){var t=e.deviceId;e.deviceMac;return l.a.createElement(H,{key:t,value:t},t)})))))),l.a.createElement(g.a,{gutter:14},l.a.createElement(b.a,{span:10},l.a.createElement(K,M({label:"触发方式"},U,{name:"triggerMode",rules:[{required:!0,message:"请选择触发方式"}]}),l.a.createElement(W.a,{disabled:!C,placeholder:"请选择触发方式",onChange:function(e){1===e&&(G(),E([]),R(!0)),0===e&&(Q(),R(!0)),x(e)}},z.map((function(e){var t=e.id,a=e.nam;return l.a.createElement(H,{key:t,value:t},a)}))))),1===I&&l.a.createElement(b.a,{span:7},l.a.createElement(K,{name:"identifier",rules:[{required:!0,message:"请选择事件"}]},l.a.createElement(W.a,{placeholder:"请选择事件",onChange:function(e){Q(e),R(!0)}},h.map((function(e){var t=e.identifier,a=e.name;return l.a.createElement(H,{key:t,value:t+","+a},a)})))))),(0==I||1==I)&&l.a.createElement(l.a.Fragment,null,l.a.createElement(g.a,{gutter:14},l.a.createElement(b.a,{span:16},l.a.createElement(K,{label:"触发条件类型",name:"ruletype",labelCol:{span:5},required:!0,initialValue:"0"},l.a.createElement(F.a.Group,{onChange:function(e){T(e.target.value)}},l.a.createElement(F.a,{value:"0"},"单条"),l.a.createElement(F.a,{value:"and"},"and 组合"),l.a.createElement(F.a,{value:"or"},"or 组合"))))),l.a.createElement(Z,{propEventList:v,add:""}),"0"!==N&&l.a.createElement(l.a.Fragment,null,l.a.createElement(g.a,{gutter:[14]},l.a.createElement(b.a,{span:4}),l.a.createElement(b.a,{style:{fontSize:"16px",fontWeight:"bold",marginBottom:"14px"},span:6},N)),l.a.createElement(Z,{propEventList:v,add:"_add"})))),l.a.createElement(y.a,{preHandle:function(){return a(0)},nextHandle:i.submit}))}var Q=Object(r.memo)(Object(r.forwardRef)(G)),Z=function(e){var t=e.propEventList,a=void 0===t?[]:t,n=e.add,i=L(Object(r.useState)(""),2),c=i[0],o=i[1],u=L(Object(r.useState)("请输入比较值"),2),m=u[0],d=u[1];return l.a.createElement(g.a,{gutter:14},l.a.createElement(b.a,{span:10},l.a.createElement(K,M({label:"触发规则",name:"propName".concat(n)},U,{rules:[{required:!0,message:"请选择属性"}]}),l.a.createElement(W.a,{showSearch:!0,optionFilterProp:"children",onChange:function(e){var t=e.split(",")[1];o(t)},placeholder:"请选择属性"},a.map((function(e){var t=e.srcCode,a=e.srcName,n=e.srcType;return l.a.createElement(H,{key:t,value:t+","+n+","+a},"".concat(a,"( ").concat(t," )"))}))))),l.a.createElement(b.a,{span:4},l.a.createElement(K,{name:"judge".concat(n),rules:[{required:!0,message:"请选择比较方式"}]},l.a.createElement(W.a,{onChange:function(e){var t="请输入比较直";"in"==e?t="多个值请以逗号隔开":"between"==e&&(t="逗号隔开起始值，例如“1,5” "),d(t)},placeholder:"比较方式"},(("char"==c||"string"==c)&&$||J).map((function(e){var t=e.id,a=e.nam;return l.a.createElement(H,{key:t,value:a},a)}))))),l.a.createElement(b.a,{span:10},l.a.createElement(K,{name:"propVal".concat(n),rules:[{required:!0,message:"请输入比较值"}]},l.a.createElement(s.a,{placeholder:m}))))};function _(){return(_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function X(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function Y(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function ee(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return te(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return te(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function te(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var ae=s.a.TextArea,ne=w.a.Item,re={labelCol:{span:6},wrapperCol:{span:12}};function le(e,t){var a=e.setStepCur,n=e.commitAll,i=e.formdata,c=ee(w.a.useForm(),1)[0],o=ee(Object(r.useState)(i.warningWay),2),u=o[0],m=o[1];Object(r.useEffect)((function(){i.warningTitle?c.setFieldsValue(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?X(Object(a),!0).forEach((function(t){Y(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):X(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},i)):c.resetFields()}),[i.warningTitle]);return l.a.createElement("div",null,l.a.createElement(w.a,_({ref:t,form:c},re,{onFinish:function(e){n()}}),l.a.createElement(ne,{label:"触发告警",name:"warningWay",rules:[{required:!0,message:"请选择告警方式"}],initialValue:"0"},l.a.createElement(F.a.Group,{onChange:function(e){m(e.target.value)}},l.a.createElement(F.a,{value:"0"},"站内消息"),l.a.createElement(F.a,{value:"1"},"站内消息+邮件"))),l.a.createElement(ne,{label:"消息标题",name:"warningTitle",rules:[{required:!0,message:"请输入消息标题"},{max:50,message:"最大输入长度为50"}]},l.a.createElement(s.a,{placeholder:"请输入消息标题"})),"1"==u&&l.a.createElement(ne,{label:"邮件地址",name:"emailAddress",rules:[{required:!0,message:"请输入邮件地址"},{max:100,message:"最大输入长度为100"}]},l.a.createElement(s.a,{placeholder:"请输入邮件地址"})),l.a.createElement(ne,{label:"告警内容",name:"warningDetails",rules:[{required:!0,message:"请输入告警内容"},{max:100,message:"最大输入长度为100"}]},l.a.createElement(ae,{rows:"3",maxLength:100,showCount:!0,placeholder:"请输入告警内容"})),l.a.createElement(ne,{label:"发送频率",name:"waringFreq",required:!0,initialValue:"0"},l.a.createElement(F.a.Group,null,l.a.createElement(F.a,{value:"0"},"首次发送后，相同故障间隔6小时发送一次，最高单日发送4次      "),l.a.createElement(F.a,{value:"1"},"首次发送后，相同故障间隔24小时发送一次")))),l.a.createElement(y.a,{nextText:"提交",preHandle:function(){return a(1)},nextHandle:c.submit}))}var ie=Object(r.memo)(Object(r.forwardRef)(le)),ce=["warningWay","warningTitle","warningDetails","waringFreq","emailAddress"];function oe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ue(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(a),!0).forEach((function(t){se(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):oe(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function se(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function me(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}function de(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return fe(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return fe(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function fe(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var pe=j.a.Step,ge=n.a.TabPane,be=function(e){var t=e.visible,a=e.closeEditMod,i=e.editData,o=i.id,u=i.name,s=de(Object(r.useState)({}),2),m=s[0],d=s[1],f=de(Object(r.useState)({}),2),g=f[0],b=f[1],y=de(Object(r.useState)({}),2),v=y[0],E=y[1],O=de(Object(r.useState)(0),2),h=O[0],w=O[1];Object(r.useEffect)((function(){var e=i.remark,t=i.content;if(void 0!==o){var a=JSON.parse(t),n=a.warningWay,r=a.warningTitle,l=a.warningDetails,c=a.waringFreq,s=a.emailAddress,m=me(a,ce);d({name:u,remark:e}),b(m),E({warningWay:n,warningTitle:r,warningDetails:l,waringFreq:c,emailAddress:s})}}),[i]);var S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;w(e)},I=Object(r.useRef)(),x=Object(r.useRef)(),P=Object(r.useRef)();return l.a.createElement(p.a,{title:void 0!==o?"编辑规则":"新增规则",visible:t,width:1e3,footer:null,maskClosable:!1,onCancel:a,className:"page-devwarn-config-modal",afterClose:function(){w(0),d({}),b({}),E({})}},l.a.createElement(j.a,{current:h},l.a.createElement(pe,{title:"告警信息"}),l.a.createElement(pe,{title:"规则配置"}),l.a.createElement(pe,{title:"通知方式"})),l.a.createElement("div",{className:"formbox"},l.a.createElement(n.a,{activeKey:h+""},l.a.createElement(ge,{tab:"告警信息",key:"0"},l.a.createElement(D,{ref:I,setStepCur:S,formdata:m})),l.a.createElement(ge,{tab:"规则配置",key:"1"},l.a.createElement(Q,{ref:x,setStepCur:S,formdata:g})),l.a.createElement(ge,{tab:"通知方式",key:"2"},l.a.createElement(ie,{ref:P,setStepCur:S,commitAll:function(){var e=I.current.getFieldsValue(),t=x.current.formDataToData(),n=P.current.getFieldsValue(),r=ue(ue({},t),n),l=JSON.stringify(r),i=ue(ue({},e),{},{id:o,content:l});Object(c.c)(c.a.saveWarningConfig,i,{loading:!0}).then((function(e){a()}))},formdata:v})))))};function ye(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ve(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ye(Object(a),!0).forEach((function(t){Ee(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ye(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function Ee(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Oe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return he(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return he(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function he(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var je={pageRows:10,pageIndex:1},we={id:void 0,status:void 0,name:"",remark:"",content:""},Se=function(e){var t=Oe(Object(r.useState)({pager:{},list:[]}),2),a=t[0],n=t[1],o=a.list,u=a.pager,s=Oe(Object(r.useState)({}),2),m=s[0],f=s[1];Object(r.useEffect)((function(){p(je)}),[]);var p=function(e){Object(c.c)(c.a.getWarningList,e,{loading:!0}).then((function(e){n(e.data)}))},g=[{title:"告警时间",dataIndex:"alarmTime",key:"alarmTime",width:"180px",render:function(e){return e?i.a.utcToDev(e):"--"}},{title:"告警标题",dataIndex:"warningTitle",key:"warningTitle",ellipsis:!0},{title:"产品名称",dataIndex:"productName",key:"productName",ellipsis:!0},{title:"告警消息类型",dataIndex:"warningWay",key:"warningWay",width:"130px",render:function(e){return l.a.createElement("span",null,{0:"站内",1:"站内+邮件"}[e])}},{title:"告警状态",dataIndex:"state",key:"state",width:"90px",render:function(e){return l.a.createElement("span",null,{0:"草稿",1:"待处理",2:"已处理",3:"已发送"}[e])}},{title:"关联的告警规则",dataIndex:"ruleName",key:"ruleName",ellipsis:!0},{title:"操作",dataIndex:"id",key:"id",width:"70px",render:function(e,t){var a=t.state;return l.a.createElement("a",{onClick:function(){y(e)}},"1"==a?"处理":"查看")}}],b=function(e){p(ve(ve({},je),{},{pageIndex:e}))},y=function(e){Object(c.c)(c.a.getWarningInfo,{id:e},{loading:!0}).then((function(e){f(e.data)}))},v=function(){f({})};return l.a.createElement(l.a.Fragment,null,l.a.createElement(d.a,{rowKey:"id",columns:g,dataSource:o,pagination:{defaultCurrent:u.pageIndex,total:u.totalRows,onChange:b,current:u.pageIndex,showSizeChanger:!1,showQuickJumper:u.totalPages>5,hideOnSinglePage:!0}}),l.a.createElement("p",null,"注：仅限站内消息类型有“待处理”和“已处理状态”，站内消息+邮件均为“已发送”状态"),l.a.createElement(h,{warningInof:m,closeDetailMod:v,getIndexPage:b,delwithWarn:function(e){Object(c.c)(c.a.dealWithWarning,e,{loading:!0}).then((function(e){b(u.pageIndex||1),v()}))}}))},Ie=function(e){var t=Oe(Object(r.useState)({pager:{},list:[]}),2),a=t[0],n=t[1],o=Oe(Object(r.useState)([]),2),p=o[0],g=o[1],b=Oe(Object(r.useState)(""),2),y=b[0],v=b[1],E=Oe(Object(r.useState)(!1),2),O=E[0],h=E[1],j=Oe(Object(r.useState)(we),2),w=j[0],S=j[1];Object(r.useEffect)((function(){I(je)}),[]);var I=function(e){Object(c.c)(c.a.getWarningConfigLi,e,{loading:!0}).then((function(e){n(e.data)}))},x=[{title:"规则名称",dataIndex:"name",key:"name",ellipsis:!0},{title:"描述",dataIndex:"remark",key:"remark",ellipsis:!0},{title:"产品名称",dataIndex:"productName",key:"productName",ellipsis:!0},{title:"设备ID",dataIndex:"deviceIds",key:"deviceIds",ellipsis:!0},{title:"运行状态",dataIndex:"status",key:"status",width:"100px",render:function(e){return l.a.createElement("span",null,{0:"初始状态",1:"运行中",2:"已停止"}[e])}},{title:"最近编辑时间",dataIndex:"updateTime",key:"updateTime",width:"200px",render:function(e){return e?i.a.utcToDev(e):"--"}},{title:"操作",dataIndex:"id",key:"id",width:"180px",render:function(e,t){var a=t.id,n=t.name,r=t.status,i=t.remark,c=t.content;return l.a.createElement("span",null,l.a.createElement("a",{onClick:function(){k({id:a,name:n,remark:i,status:r,content:c})}},"编辑"),l.a.createElement(m.a,{type:"vertical"}),1==r&&l.a.createElement("a",{onClick:function(){g([a,n,"stop"])}},"停止")||l.a.createElement("a",{onClick:function(){C(a)}},"启动"),l.a.createElement(m.a,{type:"vertical"}),l.a.createElement("a",{onClick:function(){g([a,n,"del"])}},"删除"))}}],P=function(e){var t=ve(ve({},je),{},{pageIndex:e});""!=y&&(t.name=y),I(t)},C=function(e){Object(c.c)(c.a.startWarningConfigLi,{id:e},{loading:!0}).then((function(e){P(a.pager.pageIndex||1)}))},k=function(e){h(!0),S(e)},A=a.list,N=a.pager;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"searchrulebox"},l.a.createElement("div",{className:"comm-searchBox"},l.a.createElement(s.a.Search,{placeholder:"请输入规则名词查找",enterButton:!0,maxLength:20,onSearch:function(e){v(e);var t=ve({},je);""!=e&&(t.name=e),I(t)}})),l.a.createElement(u.a,{className:"btn",onClick:function(){k(we)},type:"primary"},"新增")),l.a.createElement(d.a,{rowKey:"id",columns:x,dataSource:A,pagination:{defaultCurrent:N.pageIndex,total:N.totalRows,onChange:P,current:N.pageIndex,showSizeChanger:!1,showQuickJumper:N.totalPages>5,hideOnSinglePage:!0}}),l.a.createElement(f.a,{visible:p.length>0,modalOKHandle:function(){var e="del"==p[2]&&c.a.delWarningConfig||c.a.stopWarningConfig;Object(c.c)(e,{id:p[0]},{loading:!0}).then((function(e){P(a.pager.pageIndex||1),g([])}))},modalCancelHandle:function(){g([])},title:"del"==p[2]?"删除":"停止",descText:"即将".concat("del"==p[2]?"删除":"停止","告警配置"),needWarnIcon:!0,targetName:p[1]}),l.a.createElement(be,{visible:O,closeEditMod:function(){h(!1)},editData:ve({},w)}))};a("yfFx");function xe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Pe(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return Pe(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Pe(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var Ce=n.a.TabPane;t.default=function(e){var t=xe(Object(r.useState)({}),2),a=t[0],u=t[1],s=a.pendingCount,m=a.processedCount,d=a.sentCount,f=a.leastWaringDate;Object(r.useEffect)((function(){p()}),[p]);var p=function(){Object(c.b)(c.a.getDeviceWarningTotal,{loading:!0}).then((function(e){var t=e.data||{};u(t)}))};return l.a.createElement("section",{className:"page-devwarnlist"},l.a.createElement(o.a,{title:"设备消息"}),l.a.createElement("div",{className:"comm-shadowbox comm-countbox"},l.a.createElement("div",{className:"item"},"待处理告警",l.a.createElement("br",null),l.a.createElement("span",{className:"num"},s)),l.a.createElement("div",{className:"item"},"已处理告警",l.a.createElement("br",null),l.a.createElement("span",{className:"num"},m)),l.a.createElement("div",{className:"item"},"已发送告警",l.a.createElement("br",null),l.a.createElement("span",{className:"num"},d)),l.a.createElement("div",{className:"item"},"最近告警时间",l.a.createElement("br",null),l.a.createElement("span",{className:"num time"},f&&i.a.utcToDev(f)||"--"))),l.a.createElement("div",{className:"comm-shadowbox common-tab"},l.a.createElement(n.a,{defaultActiveKey:"1"},l.a.createElement(Ce,{tab:"消息列表",key:"1"},l.a.createElement(Se,null)),l.a.createElement(Ce,{tab:"规则列表",key:"2"},l.a.createElement(Ie,null)))))}},yfFx:function(e,t,a){}}]);