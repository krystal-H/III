(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{gbE0:function(e,t,a){"use strict";a.r(t);a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("sMBO"),a("pjDv"),a("rB9j"),a("AUBz");var r=a("ZTPi"),n=a("q1tI"),l=a.n(n),i=a("DgvE"),o=a("Nlzp"),c=a("MeRu"),u=(a("tkto"),a("TeQF"),a("5DmW"),a("FZtP"),a("27RR"),a("L/Qf"),a("2/Rp")),s=(a("qNb/"),a("PArb")),m=(a("mbEz"),a("wCAj")),d=(a("tULf"),a("Vl3Y")),f=(a("1vPl"),a("5rEg")),p=(a("RKNx"),a("L41K")),g=(a("8QGh"),a("2fM7")),b=(a("2B1R"),a("FC04")),y=(a("k3Gp"),a("kLXV")),v=(a("Jmwx"),a("BMrR")),E=(a("rO+z"),a("kPKH")),O=a("v7xx"),h=a("P2RN");function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],i=!0,o=!1;try{for(a=a.call(e);!(i=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);i=!0);}catch(e){o=!0,n=e}finally{try{i||null==a.return||a.return()}finally{if(o)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return w(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return w(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var S=function(e){var t=e.warningInof,a=e.closeDetailMod,r=e.delwithWarn,c=t.alarmTime,u=t.warningTitle,s=t.state,m=t.warningWay,d=t.ruleName,p=t.warningDetail,g=t.deviceIds,b=t.dealDetail,w=t.id,S=t.productName,I=j(Object(n.useState)(""),2),x=I[0],P=I[1],C=j(Object(n.useState)(""),2),N=C[0],k=C[1],A=1==s&&l.a.createElement(O.a,{style:{padding:"0"},preText:"取消",nextText:"提交",preHandle:a,nextHandle:function(){x?r({id:w,dealDetail:x}):Object(h.a)({description:"请填写处理记录",type:"warn"})}})||l.a.createElement(O.a,{style:{padding:"0"},nextBtn:!1,preText:"关闭",preHandle:a});return l.a.createElement(y.a,{className:"page-warninginfo-modal",title:u,visible:!!u,width:700,onCancel:a,footer:A},l.a.createElement(v.a,{gutter:[12,16]},l.a.createElement(E.a,{span:5,className:"detail-label"},"告警时间："),l.a.createElement(E.a,{span:18},i.a.utcToDev(c)||"--"),l.a.createElement(E.a,{span:5,className:"detail-label"},"告警消息类型："),l.a.createElement(E.a,{span:18},{0:"站内",1:"站内+邮件"}[m]),l.a.createElement(E.a,{span:5,className:"detail-label"},"关联的告警规则："),l.a.createElement(E.a,{span:18},d||"--"),l.a.createElement(E.a,{span:5,className:"detail-label"},"告警内容："),l.a.createElement(E.a,{span:18},l.a.createElement("div",null,p||"--")),l.a.createElement(E.a,{span:5,className:"detail-label"},"产品名称："),l.a.createElement(E.a,{span:18},S||"--"),l.a.createElement(E.a,{span:5,className:"detail-label"},"告警设备ID："),l.a.createElement(E.a,{span:16},l.a.createElement("div",null,N||g||"")),l.a.createElement(E.a,{span:2},l.a.createElement("a",{onClick:function(){Object(o.c)(o.a.getWarningInfo,{id:w},{loading:!0}).then((function(e){k(e.data.deviceIds)}))}},"刷新")),l.a.createElement(E.a,{span:5,className:"detail-label"},"处理记录："),l.a.createElement(E.a,{span:18},1==s&&l.a.createElement(f.a.TextArea,{rows:3,value:x||b||"",placeholder:"处理记录",onChange:function(e){P(e.target.value)}})||l.a.createElement("div",null,x||b||""))))};a("zKZe");function I(){return(I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function x(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function P(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],i=!0,o=!1;try{for(a=a.call(e);!(i=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);i=!0);}catch(e){o=!0,n=e}finally{try{i||null==a.return||a.return()}finally{if(o)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return N(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return N(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var k=f.a.TextArea,A=d.a.Item,D={labelCol:{span:6},wrapperCol:{span:12}};function T(e,t){var a=e.setStepCur,r=e.formdata,i=C(d.a.useForm(),1)[0];Object(n.useEffect)((function(){console.log("---form1--",r),r.name&&i.setFieldsValue(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?x(Object(a),!0).forEach((function(t){P(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):x(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},r))}),[r.name]);return l.a.createElement("div",null,l.a.createElement(d.a,I({ref:t,form:i},D,{onFinish:function(e){a(1)}}),l.a.createElement(A,{label:"告警规则名称",name:"name",rules:[{required:!0,message:"请输入告警规则名称"},{max:30,message:"最大输入长度为30字符"}]},l.a.createElement(f.a,{placeholder:"请输入告警规则名称"})),l.a.createElement(A,{label:"描述",name:"remark",rules:[{max:100,message:"最大输入长度为100字符"}]},l.a.createElement(k,{placeholder:"告警规则描述",showCount:!0,maxLength:100,rows:4}))),l.a.createElement(O.a,{preBtn:!1,nextHandle:i.submit}))}var F=Object(n.memo)(Object(n.forwardRef)(T)),W=(a("K4yd"),a("9yH6"));a("ma9I"),a("EnZy");function M(){return(M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function V(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function q(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],i=!0,o=!1;try{for(a=a.call(e);!(i=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);i=!0);}catch(e){o=!0,n=e}finally{try{i||null==a.return||a.return()}finally{if(o)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return L(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return L(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var H=g.a.Option,B=d.a.Item,K={labelCol:{span:8},wrapperCol:{span:16}},U=[{id:0,nam:"属性触发"},{id:1,nam:"事件触发"},{id:3,nam:"上线触发"},{id:4,nam:"下线触发"},{id:2,nam:"上下线触发"}],z=[{id:"1",nam:"=="},{id:"2",nam:">"},{id:"3",nam:"<"},{id:"4",nam:">="},{id:"5",nam:"<="},{id:"6",nam:"!="},{id:"7",nam:"in"},{id:"8",nam:"between"}],_=[{id:"1",nam:"="},{id:"6",nam:"!="},{id:"7",nam:"in"}];function J(e,t){var a=e.setStepCur,r=e.formdata,i=R(d.a.useForm(),1)[0],c=R(Object(n.useState)([]),2),u=c[0],s=c[1],m=R(Object(n.useState)([]),2),f=m[0],p=m[1],b=R(Object(n.useState)([]),2),y=b[0],h=b[1],j=R(Object(n.useState)([]),2),w=j[0],S=j[1],I=R(Object(n.useState)(r.triggerMode),2),x=I[0],P=I[1],C=R(Object(n.useState)(r.productId),2),N=C[0],k=C[1],A=R(Object(n.useState)(r.connType||"0"),2),D=A[0],T=A[1];Object(n.useEffect)((function(){0==u.length&&L()}),[]),Object(n.useEffect)((function(){N&&z(N)}),[N]),Object(n.useEffect)((function(){if(r.productId){console.log("333-11-aa",r);var e=r.productId,t=r.deviceIds,a=r.triggerMode,n=r.props,l=r.connType,o=void 0===l?"0":l,c=r.eventName,u=r.eventIdentifier,s={productId:e,deviceIds:t,triggerMode:a};if(a>1);else{s.ruletype=o;for(var m=0;m<n.length;m++){var d=n[m],f=d.propName,p=d.propIdentifier,g=d.propFieldType,b=d.judge,y=d.propVal,v=m>0?"_add":"";s["propName".concat(v)]="".concat(p,",").concat(g,",").concat(f),s["judge".concat(v)]=b,s["propVal".concat(v)]=y}if(1==a){_(e);var E=u+","+c;s.identifier=E,J(E)}else 0==a&&J()}console.log(999,s),i.setFieldsValue(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?V(Object(a),!0).forEach((function(t){q(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):V(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},s))}}),[r.productId]),Object(n.useImperativeHandle)(t,(function(){return{formDataToData:F}}),[F]);var F=function(){var e=i.getFieldsValue();console.log(111,e);var t=e.triggerName,a=e.productId,r=e.deviceIds,n=e.triggerMode,l={triggerName:t,productId:a,deviceIds:r,triggerMode:n};if(n<2){var o=e.identifier,c=e.ruletype,u=e.propName,s=e.judge,m=e.propVal;if(o){var d=o.split(",");l.eventName=d[1],l.eventIdentifier=d[0]}var f=u.split(","),p=[{propName:f[2],propIdentifier:f[0],propFieldType:f[1],judge:s,propVal:m}];if("0"!==c){l.connType=c;var g=e.propName_add,b=e.judge_add,y=e.propVal_add,v=g.split(",");p.push({propName:v[2],propIdentifier:v[0],propFieldType:v[1],judge:b,propVal:y})}l.props=p}return l},L=function(){Object(o.c)(o.a.getProductPlus,{},{loading:!0}).then((function(e){var t=e.data||[],a=[];t.forEach((function(e){a.push({id:e.productId,name:e.productName})})),s(a)}))},z=function(e){Object(o.c)(o.a.getDeviceListByProId,{productId:e,pageIndex:1,pageRows:9999},{loading:!0}).then((function(e){p(e.data.list)}))},_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N;Object(o.c)(o.a.getWarnEventLi,{productId:e},{loading:!0}).then((function(e){var t=e&&e.data||[];S(t)}))},J=function(e){var t={productId:N},a=o.a.getWarnProperty;e&&(a=o.a.getWarnEventProperty,t.eventIdentifier=e.split(",")[0]),Object(o.c)(a,t,{loading:!0}).then((function(e){var t=e&&e.data||[];h(t)}))};return l.a.createElement("div",null,l.a.createElement(d.a,{form:i,onFinish:function(e){a(2)}},l.a.createElement(v.a,{gutter:14},l.a.createElement(E.a,{span:10},l.a.createElement(B,M({},K,{label:"触发对象",name:"triggerName",initialValue:"deviceTrigger",required:!0}),l.a.createElement(g.a,null,l.a.createElement(H,{value:"deviceTrigger"},"设备触发")))),l.a.createElement(E.a,{span:7},l.a.createElement(B,{name:"productId",rules:[{required:!0,message:"请选择产品"}]},l.a.createElement(g.a,{showSearch:!0,optionFilterProp:"children",onChange:function(e){k(e),i.resetFields(["deviceIds"])},placeholder:"请选择产品"},u.map((function(e){var t=e.id,a=e.name;return l.a.createElement(H,{key:t,value:t},a)}))))),l.a.createElement(E.a,{span:7},l.a.createElement(B,{name:"deviceIds",rules:[{required:!0,message:"请选择设备"}]},l.a.createElement(g.a,{allowClear:!0,mode:"multiple",placeholder:"请选择设备"},f.map((function(e){var t=e.deviceId;e.deviceMac;return l.a.createElement(H,{key:t,value:t},t)})))))),l.a.createElement(v.a,{gutter:14},l.a.createElement(E.a,{span:10},l.a.createElement(B,M({label:"触发方式"},K,{name:"triggerMode",rules:[{required:!0,message:"请选择触发方式"}]}),l.a.createElement(g.a,{disabled:!N,placeholder:"请选择触发方式",onChange:function(e){var t=[];1===e&&(_(),h([]),t.push("identifier")),0===e&&J(),i.resetFields([].concat(t,["propName","judge","propVal","propName_add","judge_add","propVal_add"])),P(e)}},U.map((function(e){var t=e.id,a=e.nam;return l.a.createElement(H,{key:t,value:t},a)}))))),1===x&&l.a.createElement(E.a,{span:7},l.a.createElement(B,{name:"identifier",rules:[{required:!0,message:"请选择事件"}]},l.a.createElement(g.a,{placeholder:"请选择事件",onChange:function(e){J(e)}},w.map((function(e){var t=e.identifier,a=e.name;return l.a.createElement(H,{key:t,value:t+","+a},a)})))))),(0==x||1==x)&&l.a.createElement(l.a.Fragment,null,l.a.createElement(v.a,{gutter:14},l.a.createElement(E.a,{span:16},l.a.createElement(B,{label:"触发条件类型",name:"ruletype",labelCol:{span:5},required:!0,initialValue:"0"},l.a.createElement(W.a.Group,{onChange:function(e){T(e.target.value)}},l.a.createElement(W.a,{value:"0"},"单条"),l.a.createElement(W.a,{value:"and"},"and 组合"),l.a.createElement(W.a,{value:"or"},"or 组合"))))),l.a.createElement(G,{propEventList:y,add:""}),"0"!==D&&l.a.createElement(l.a.Fragment,null,l.a.createElement(v.a,{gutter:[14]},l.a.createElement(E.a,{span:4}),l.a.createElement(E.a,{style:{fontSize:"16px",fontWeight:"bold",marginBottom:"14px"},span:6},D)),l.a.createElement(G,{propEventList:y,add:"_add"})))),l.a.createElement(O.a,{preHandle:function(){return a(0)},nextHandle:i.submit}))}var $=Object(n.memo)(Object(n.forwardRef)(J)),G=function(e){var t=e.propEventList,a=void 0===t?[]:t,r=e.add,i=R(Object(n.useState)(""),2),o=i[0],c=i[1],u=R(Object(n.useState)("请输入比较值"),2),s=u[0],m=u[1];return l.a.createElement(v.a,{gutter:14},l.a.createElement(E.a,{span:10},l.a.createElement(B,M({label:"触发规则",name:"propName".concat(r)},K,{rules:[{required:!0,message:"请选择属性"}]}),l.a.createElement(g.a,{showSearch:!0,optionFilterProp:"children",onChange:function(e){var t=e.split(",")[1];c(t)},placeholder:"请选择属性"},a.map((function(e){var t=e.srcCode,a=e.srcName,r=e.srcType;return l.a.createElement(H,{key:t,value:t+","+r+","+a},"".concat(a,"( ").concat(t," )"))}))))),l.a.createElement(E.a,{span:4},l.a.createElement(B,{name:"judge".concat(r),rules:[{required:!0,message:"请选择比较方式"}]},l.a.createElement(g.a,{onChange:function(e){var t="请输入比较直";"in"==e?t="多个值请以逗号隔开":"between"==e&&(t="逗号隔开起始值，例如“1,5” "),m(t)},placeholder:"比较方式"},(("char"==o||"string"==o)&&_||z).map((function(e){var t=e.id,a=e.nam;return l.a.createElement(H,{key:t,value:a},a)}))))),l.a.createElement(E.a,{span:10},l.a.createElement(B,{name:"propVal".concat(r),rules:[{required:!0,message:"请输入比较值"}]},l.a.createElement(f.a,{placeholder:s}))))};function Q(){return(Q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function Z(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function X(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],i=!0,o=!1;try{for(a=a.call(e);!(i=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);i=!0);}catch(e){o=!0,n=e}finally{try{i||null==a.return||a.return()}finally{if(o)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ee(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return ee(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ee(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var te=f.a.TextArea,ae=d.a.Item,re={labelCol:{span:6},wrapperCol:{span:12}};function ne(e,t){var a=e.setStepCur,r=e.commitAll,i=e.formdata,o=Y(d.a.useForm(),1)[0],c=Y(Object(n.useState)(i.warningWay),2),u=c[0],s=c[1];Object(n.useEffect)((function(){console.log("---form3--",i),i.warningTitle&&o.setFieldsValue(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Z(Object(a),!0).forEach((function(t){X(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Z(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},i))}),[i.warningTitle]);return l.a.createElement("div",null,l.a.createElement(d.a,Q({ref:t,form:o},re,{onFinish:function(e){r()}}),l.a.createElement(ae,{label:"触发告警",name:"warningWay",rules:[{required:!0,message:"请选择告警方式"}],initialValue:"0"},l.a.createElement(W.a.Group,{onChange:function(e){s(e.target.value)}},l.a.createElement(W.a,{value:"0"},"站内消息"),l.a.createElement(W.a,{value:"1"},"站内消息+邮件"))),l.a.createElement(ae,{label:"消息标题",name:"warningTitle",rules:[{required:!0,message:"请输入消息标题"},{max:50,message:"最大输入长度为50"}]},l.a.createElement(f.a,{placeholder:"请输入消息标题"})),"1"==u&&l.a.createElement(ae,{label:"邮件地址",name:"emailAddress",rules:[{required:!0,message:"请输入邮件地址"},{max:100,message:"最大输入长度为100"}]},l.a.createElement(f.a,{placeholder:"请输入邮件地址"})),l.a.createElement(ae,{label:"告警内容",name:"warningDetails",rules:[{required:!0,message:"请输入告警内容"},{max:100,message:"最大输入长度为100"}],initialValue:"您好，{pruductname}，{time}出现配置规则下的异常，请在站内消息查看详情！"},l.a.createElement(te,{rows:"3",disabled:!0})),l.a.createElement(ae,{label:"发送频率",name:"waringFreq",required:!0,initialValue:"0"},l.a.createElement(W.a.Group,null,l.a.createElement(W.a,{value:"0"},"首次发送后，相同故障间隔6小时发送一次，最高单日发送4次      "),l.a.createElement(W.a,{value:"1"},"首次发送后，相同故障间隔24小时发送一次")))),l.a.createElement(O.a,{nextText:"提交",preHandle:function(){return a(1)},nextHandle:o.submit}))}var le=Object(n.memo)(Object(n.forwardRef)(ne)),ie=["warningWay","warningTitle","warningDetails","waringFreq","emailAddress"];function oe(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function ce(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(a),!0).forEach((function(t){ue(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):oe(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function ue(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function se(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function me(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],i=!0,o=!1;try{for(a=a.call(e);!(i=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);i=!0);}catch(e){o=!0,n=e}finally{try{i||null==a.return||a.return()}finally{if(o)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return de(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return de(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function de(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var fe=p.a.Step,pe=r.a.TabPane,ge=function(e){var t=e.visible,a=e.closeEditMod,i=e.editData,c=i.id,u=i.name,s=me(Object(n.useState)({}),2),m=s[0],d=s[1],f=me(Object(n.useState)({}),2),g=f[0],b=f[1],v=me(Object(n.useState)({}),2),E=v[0],O=v[1],h=me(Object(n.useState)(0),2),j=h[0],w=h[1];Object(n.useEffect)((function(){var e=i.remark,t=i.content;if(void 0!==c){var a=JSON.parse(t),r=a.warningWay,n=a.warningTitle,l=a.warningDetails,o=a.waringFreq,s=a.emailAddress,m=se(a,ie);console.log("--ruleFormData--",m),d({name:u,remark:e}),b(m),O({warningWay:r,warningTitle:n,warningDetails:l,waringFreq:o,emailAddress:s})}}),[i.id]);var S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;w(e)},I=Object(n.useRef)(),x=Object(n.useRef)(),P=Object(n.useRef)();return l.a.createElement(y.a,{title:void 0!==c?"编辑规则":"新增规则",visible:t,width:1e3,footer:null,maskClosable:!1,onCancel:function(){a(!1)},className:"page-devwarn-config-modal"},l.a.createElement(p.a,{current:j},l.a.createElement(fe,{title:"告警信息"}),l.a.createElement(fe,{title:"规则配置"}),l.a.createElement(fe,{title:"通知方式"})),l.a.createElement("div",{className:"formbox"},l.a.createElement(r.a,{activeKey:j+""},l.a.createElement(pe,{tab:"告警信息",key:"0"},l.a.createElement(F,{ref:I,setStepCur:S,formdata:m})),l.a.createElement(pe,{tab:"规则配置",key:"1"},l.a.createElement($,{ref:x,setStepCur:S,formdata:g})),l.a.createElement(pe,{tab:"通知方式",key:"2"},l.a.createElement(le,{ref:P,setStepCur:S,commitAll:function(){var e=I.current.getFieldsValue(),t=x.current.formDataToData(),r=P.current.getFieldsValue(),n=ce(ce({},t),r),l=JSON.stringify(n),i=ce(ce({},e),{},{id:c,content:l});Object(o.c)(o.a.saveWarningConfig,i,{loading:!0}).then((function(e){a(!0)}))},formdata:E})))))};function be(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function ye(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?be(Object(a),!0).forEach((function(t){ve(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):be(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function ve(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function Ee(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],i=!0,o=!1;try{for(a=a.call(e);!(i=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);i=!0);}catch(e){o=!0,n=e}finally{try{i||null==a.return||a.return()}finally{if(o)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Oe(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return Oe(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Oe(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var he=g.a.Option,je=(p.a.Step,f.a.Search,{pageRows:10,pageIndex:1}),we={id:void 0,status:void 0,name:"",remark:"",content:""},Se=["站内","站内+邮件"],Ie=function(e){var t=Ee(Object(n.useState)({pager:{},list:[]}),2),a=t[0],r=t[1],c=a.list,u=a.pager,s=Ee(Object(n.useState)({}),2),p=s[0],b=s[1],y=Ee(Object(n.useState)(""),2),v=(y[0],y[1]),E=Ee(Object(n.useState)(""),2),O=E[0],h=E[1];Object(n.useEffect)((function(){j(je)}),[]);var j=function(e){var t=ye({ruleName:"",warningWay:O},e);Object(o.c)(o.a.getWarningList,t,{loading:!0}).then((function(e){r(e.data)}))},w=[{title:"告警时间",dataIndex:"alarmTime",key:"alarmTime",render:function(e){return e?i.a.utcToDev(e):"--"}},{title:"告警标题",dataIndex:"warningTitle",key:"warningTitle",ellipsis:!0},{title:"产品名称",dataIndex:"productName",key:"productName",ellipsis:!0},{title:"告警消息类型",dataIndex:"warningWay",key:"warningWay",render:function(e){return l.a.createElement("span",null,{0:"站内",1:"站内+邮件"}[e])}},{title:"告警状态",dataIndex:"state",key:"state",render:function(e){return l.a.createElement("span",null,{0:"草稿",1:"待处理",2:"已处理",3:"已发送"}[e])}},{title:"关联的告警规则",dataIndex:"ruleName",key:"ruleName",ellipsis:!0},{title:"操作",dataIndex:"id",key:"id",width:"70px",render:function(e,t){var a=t.state;return l.a.createElement("a",{onClick:function(){x(e)}},"1"==a?"处理":"查看")}}],I=function(e){j(ye(ye({},je),{},{pageIndex:e}))},x=function(e){Object(o.c)(o.a.getWarningInfo,{id:e},{loading:!0}).then((function(e){b(e.data)}))},P=function(){b({})};return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"searchrulebox"},l.a.createElement(d.a,{layout:"inline",labelCol:{span:8},wrapperCol:{span:15}},l.a.createElement(d.a.Item,{label:"告警消息类型"},l.a.createElement(g.a,{defaultValue:"",onChange:function(e){return h(e)},style:{width:150,marginRight:40}},l.a.createElement(g.a.Option,{value:""},"全部类型"),Se.map((function(e,t){return l.a.createElement(he,{key:e,value:t},e)})))),l.a.createElement(d.a.Item,{label:"告警规则名称"},l.a.createElement(f.a.Search,{placeholder:"请输入规则名词查找",style:{width:380},allowClear:!0,maxLength:20,onSearch:function(e){v(e);var t=ye({},je);""!=e&&(t.ruleName=e),j(t)}})))),l.a.createElement(m.a,{rowKey:"id",columns:w,dataSource:c,pagination:{defaultCurrent:u.pageIndex,total:u.totalRows,onChange:I,current:u.pageIndex,showSizeChanger:!1,showQuickJumper:u.totalPages>5,hideOnSinglePage:!0}}),l.a.createElement("p",null,"注：仅限站内消息类型有“待处理”和“已处理状态”，站内消息+邮件均为“已发送”状态"),l.a.createElement(S,{warningInof:p,closeDetailMod:P,getIndexPage:I,delwithWarn:function(e){Object(o.c)(o.a.dealWithWarning,e,{loading:!0}).then((function(e){I(u.pageIndex||1),P()}))}}))},xe=function(e){var t=Ee(Object(n.useState)({pager:{},list:[]}),2),a=t[0],r=t[1],c=Ee(Object(n.useState)([]),2),d=c[0],p=c[1],g=Ee(Object(n.useState)(""),2),y=g[0],v=g[1],E=Ee(Object(n.useState)(!1),2),O=E[0],h=E[1],j=Ee(Object(n.useState)(we),2),w=j[0],S=j[1];Object(n.useEffect)((function(){I(je)}),[]);var I=function(e){Object(o.c)(o.a.getWarningConfigLi,e,{loading:!0}).then((function(e){r(e.data)}))},x=[{title:"规则名称",dataIndex:"name",key:"name",ellipsis:!0},{title:"描述",dataIndex:"remark",key:"remark",ellipsis:!0},{title:"产品名称",dataIndex:"productName",key:"productName",ellipsis:!0},{title:"设备ID",dataIndex:"deviceIds",key:"deviceIds",ellipsis:!0},{title:"运行状态",dataIndex:"status",key:"status",width:"100px",render:function(e){return l.a.createElement("span",null,{0:"初始状态",1:"运行中",2:"已停止"}[e])}},{title:"最近编辑时间",dataIndex:"updateTime",key:"updateTime",width:"200px",render:function(e){return e?i.a.utcToDev(e):"--"}},{title:"操作",dataIndex:"id",key:"id",width:"180px",render:function(e,t){var a=t.id,r=t.name,n=t.status,i=t.remark,o=t.content;return l.a.createElement("span",null,l.a.createElement("a",{onClick:function(){N({id:a,name:r,remark:i,status:n,content:o})}},"编辑"),l.a.createElement(s.a,{type:"vertical"}),1==n&&l.a.createElement("a",{onClick:function(){p([a,r,"stop"])}},"停止")||l.a.createElement("a",{onClick:function(){C(a)}},"启动"),l.a.createElement(s.a,{type:"vertical"}),l.a.createElement("a",{onClick:function(){p([a,r,"del"])}},"删除"))}}],P=function(e){var t=ye(ye({},je),{},{pageIndex:e});""!=y&&(t.name=y),I(t)},C=function(e){Object(o.c)(o.a.startWarningConfigLi,{id:e},{loading:!0}).then((function(e){P(a.pager.pageIndex||1)}))},N=function(e){h(!0),S(e)},k=a.list,A=a.pager;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"searchrulebox"},l.a.createElement("div",{className:"comm-searchBox"},l.a.createElement(f.a.Search,{placeholder:"请输入规则名词查找",allowClear:!0,maxLength:20,onSearch:function(e){v(e);var t=ye({},je);""!=e&&(t.name=e),I(t)}})),l.a.createElement(u.a,{className:"btn",onClick:function(){N(we)},type:"primary"},"新增")),l.a.createElement(m.a,{rowKey:"id",columns:x,dataSource:k,pagination:{defaultCurrent:A.pageIndex,total:A.totalRows,onChange:P,current:A.pageIndex,showSizeChanger:!1,showQuickJumper:A.totalPages>5,hideOnSinglePage:!0}}),l.a.createElement(b.a,{visible:d.length>0,modalOKHandle:function(){var e="del"==d[2]&&o.a.delWarningConfig||o.a.stopWarningConfig;Object(o.c)(e,{id:d[0]},{loading:!0}).then((function(e){P(a.pager.pageIndex||1),p([])}))},modalCancelHandle:function(){p([])},title:"del"==d[2]?"删除":"停止",descText:"即将".concat("del"==d[2]?"删除":"停止","告警配置"),needWarnIcon:!0,targetName:d[1]}),O&&l.a.createElement(ge,{visible:O,closeEditMod:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];h(!1),e&&(v(""),I({pageRows:10,pageIndex:1}))},editData:ye({},w)}))};a("yfFx");function Pe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var r,n,l=[],i=!0,o=!1;try{for(a=a.call(e);!(i=(r=a.next()).done)&&(l.push(r.value),!t||l.length!==t);i=!0);}catch(e){o=!0,n=e}finally{try{i||null==a.return||a.return()}finally{if(o)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Ce(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return Ce(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ce(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var Ne=r.a.TabPane;t.default=function(e){var t=Pe(Object(n.useState)({}),2),a=t[0],u=t[1],s=a.pendingCount,m=a.processedCount,d=a.sentCount,f=a.leastWaringDate;Object(n.useEffect)((function(){p()}),[p]);var p=function(){Object(o.b)(o.a.getDeviceWarningTotal,{},{loading:!0}).then((function(e){var t=e.data||{};u(t)}))};return l.a.createElement("section",{className:"page-devwarnlist"},l.a.createElement(c.a,{title:"设备消息"}),l.a.createElement("div",{className:"comm-shadowbox comm-countbox"},l.a.createElement("div",{className:"item"},"待处理告警",l.a.createElement("br",null),l.a.createElement("span",{className:"num"},s)),l.a.createElement("div",{className:"item"},"已处理告警",l.a.createElement("br",null),l.a.createElement("span",{className:"num"},m)),l.a.createElement("div",{className:"item"},"已发送告警",l.a.createElement("br",null),l.a.createElement("span",{className:"num"},d)),l.a.createElement("div",{className:"item"},"最近告警时间",l.a.createElement("br",null),l.a.createElement("span",{className:"num time"},f&&i.a.utcToDev(f)||"--"))),l.a.createElement("div",{className:"comm-shadowbox common-tab"},l.a.createElement(r.a,{defaultActiveKey:"1"},l.a.createElement(Ne,{tab:"消息列表",key:"1"},l.a.createElement(Ie,null)),l.a.createElement(Ne,{tab:"规则列表",key:"2"},l.a.createElement(xe,null)))))}},yfFx:function(e,t,a){}}]);