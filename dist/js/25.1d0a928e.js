(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"6hB6":function(e,t,r){},TUtz:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return I}));r("ef1R"),r("Ra8s"),r("sfoS"),r("HsXu"),r("bs69"),r("Lm8M"),r("ryEf"),r("qgAm"),r("9b3Y"),r("Ck9u"),r("MNU5");var a=r("YeX6"),n=(r("59iL"),r("f6Fh")),l=r("T9Mk"),o=r.n(l),c=(r("6hB6"),r("SeTJ"),r("9iNK")),i=(r("6IzV"),r("QFmM")),u=(r("UdMA"),r("ViyK")),m=(r("av3G"),r("rVDo")),s=r("Nlzp"),d=r("P2RN");function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,l=[],o=!0,c=!1;try{for(r=r.call(e);!(o=(a=r.next()).done)&&(l.push(a.value),!t||l.length!==t);o=!0);}catch(e){c=!0,n=e}finally{try{o||null==r.return||r.return()}finally{if(c)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var b=u.a.TextArea;function y(e,t){var r=e.onSuccess,a=f(i.a.useForm(),1)[0];Object(l.useEffect)((function(){v()}),[]);var n=f(Object(l.useState)([]),2),p=n[0],y=n[1],v=function(){Object(s.c)(s.a.getWorkOrderDictionary).then((function(e){var t=[];for(var r in e.data.problemTypeOneLevel){var a={value:r,label:e.data.problemTypeOneLevel[r],children:[]};for(var n in e.data.problemTypeTwoLevel[r])a.children.push({value:n,label:e.data.problemTypeTwoLevel[r][n]});t.push(a)}y(t)}))},h=Object(l.useRef)(null);var E=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];a.validateFields().then((function(t){var n,l,o="";t.image.forEach((function(e,r){r===t.image.length-1?o+=e.url:o+=e.url+","})),p.forEach((function(e){e.value===t.problemType[0]&&(n=e.label,e.children.forEach((function(e){e.value===t.problemType[1]&&(l=e.label)})))}));var c={phone:t.phone,problemDesc:t.problemDesc,image:o,problemTypeOneLevel:t.problemType[0],problemTypeTwoLevel:t.problemType[1],problemTypeOneName:n,problemTypeTwoName:l};Object(s.c)(s.a.subWorkOrder,c,{loading:e}).then((function(e){Object(d.a)({type:"success",description:"提交成功！"}),a.resetFields(),r("2")}))})).catch((function(e){console.log(e)}))};return Object(l.useImperativeHandle)(t,(function(){return{subOrder:E}})),o.a.createElement("div",{id:"order-home-sub"},o.a.createElement(i.a,{name:"basic",form:a,initialValues:{image:[]}},o.a.createElement(i.a.Item,{label:"选择内容分类",name:"problemType",rules:[{required:!0}]},o.a.createElement(c.a,{options:p,onChange:function(e){console.log(e)},style:{width:"612px"},popupClassName:"order-Cascader"})),o.a.createElement(i.a.Item,{label:"问题描述",name:"problemDesc",rules:[{required:!0,whitespace:!0}]},o.a.createElement(b,{rows:4,style:{width:"612px"}})),o.a.createElement(i.a.Item,{label:"上传问题图片/视频",name:"image"},o.a.createElement(m.b,{style:{width:"612px"},ref:h,maxCount:10,format:".jpg,.png,.gif",maxSize:5})),o.a.createElement(i.a.Item,{label:"联系方式",name:"phone",rules:[{pattern:/^(((\d{3,4}-)?\d{7,8})|(1\d{10}))$/,whitespace:!0,message:"请输入正确的手机号码"}]},o.a.createElement(u.a,{style:{width:"612px"}}))))}y=Object(l.forwardRef)(y);r("KFG7");var v=r("IDv4"),h=(r("SmMv"),r("DTgQ")),E=(r("M8/c"),r("dZM2")),g=(r("QcZr"),r("b+L2")),w=(r("62KB"),r("J2lP"),r("hjnz"),r("DgvE"));function O(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,l=[],o=!0,c=!1;try{for(r=r.call(e);!(o=(a=r.next()).done)&&(l.push(a.value),!t||l.length!==t);o=!0);}catch(e){c=!0,n=e}finally{try{o||null==r.return||r.return()}finally{if(c)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return T(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return T(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function N(){var e=O(Object(l.useState)(!1),2),t=e[0],r=e[1],a=O(Object(l.useState)([]),2),n=a[0],c=a[1],i=O(Object(l.useState)(!1),2),u=(i[0],i[1],O(Object(l.useState)({}),2)),m=u[0],d=u[1],f=[{title:"订阅号",dataIndex:"workOrderId",key:"workOrderId"},{title:"问题分类",dataIndex:"age",key:"age",render:function(e,t){return o.a.createElement("span",null,t.problemTypeOneName," - ",t.problemTypeTwoName)}},{title:"提交时间",dataIndex:"createTime",key:"createTime",render:function(e){return w.a.utcToDev(e)}},{title:"工单状态",dataIndex:"status",key:"status",render:function(e,t){return o.a.createElement("span",null,e?"已回复":"未回复")}},{title:"操作",dataIndex:"address",key:"address",render:function(e,t){return o.a.createElement("span",null,o.a.createElement("a",{onClick:function(){var e;e=t.workOrderId,p(e),r(!0)}},"查看"))}}],p=function(e){Object(s.c)(s.a.WorkOrderDetail,{workOrderId:e}).then((function(e){d(e.data)}))};return Object(l.useEffect)((function(){!function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(s.c)(s.a.WorkOrderList,{},{loading:e}).then((function(e){c(e.data.list)}))}()}),[]),o.a.createElement("div",{id:"order-home-self"},o.a.createElement(g.a,{dataSource:n,columns:f,rowKey:"workOrderId"}),o.a.createElement(v.a,{title:"工单详情",placement:"right",closable:!1,onClose:function(){r(!1)},visible:t,width:470},o.a.createElement("div",{className:"my-order-detail"},o.a.createElement("div",{className:"order-item"},o.a.createElement("div",{className:"order-item-label"},"问题分类："),o.a.createElement("div",{className:"order-item-text"},m.problemTypeOneName,"-",m.problemTypeTwoName,o.a.createElement("span",{className:"order-item-span",style:{color:m.status?"#15C054":"#2F78FF"}},m.status?"已回复":"待回复"))),o.a.createElement("div",{className:"order-item"},o.a.createElement("div",{className:"order-item-label"},"提交时间："),o.a.createElement("div",{className:"order-item-text"},m.createTime)),o.a.createElement("div",{className:"order-item"},o.a.createElement("div",{className:"order-item-label"},"问题描述："),o.a.createElement("div",{className:"order-item-text"},m.problemDesc)),o.a.createElement("div",{className:"order-item"},o.a.createElement("div",{className:"order-item-label"},"上传问题图片/视频："),o.a.createElement("div",{className:"order-item-text"},m.image&&m.image.split(",").map((function(e,t){return o.a.createElement(E.a,{key:t,src:e,width:100})})))),o.a.createElement("div",{className:"order-item"},o.a.createElement("div",{className:"order-item-label"},"联系方式："),o.a.createElement("div",{className:"order-item-text"},m.phone)),1==m.status?o.a.createElement("div",{className:"order-feedback"},o.a.createElement("div",{style:{margin:"0 -24px"}},o.a.createElement(h.a,null)),o.a.createElement("div",{className:"feedback-title"},"回复详情："),o.a.createElement("div",{className:"feedback-dec"},m.replyContent)):null)))}function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,l=[],o=!0,c=!1;try{for(r=r.call(e);!(o=(a=r.next()).done)&&(l.push(a.value),!t||l.length!==t);o=!0);}catch(e){c=!0,n=e}finally{try{o||null==r.return||r.return()}finally{if(c)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return S(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return S(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var k=n.a.TabPane;function I(){var e=j(Object(l.useState)("1"),2),t=e[0],r=e[1],c=Object(l.useRef)(null),i=function(e){r(e)};return o.a.createElement("div",{id:"order-home"},o.a.createElement("div",{className:"common-tab comm-shadowbox"},o.a.createElement(n.a,{activeKey:t,className:"shadow-tab",onChange:i},o.a.createElement(k,{key:"1",tab:"提交工单"},o.a.createElement(y,{ref:c,onSuccess:i})),o.a.createElement(k,{key:"2",tab:"我的工单"},o.a.createElement(N,null)))),"1"==t&&o.a.createElement("div",{className:"order-home-footer"},o.a.createElement(a.a,{type:"primary",onClick:function(){c.current.subOrder()}},"提交")))}}}]);