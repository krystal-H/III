(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"6hB6":function(e,t,r){},TUtz:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return I}));r("pNMO"),r("4Brf"),r("07d7"),r("0oug"),r("4mDm"),r("PKPk"),r("3bBZ"),r("+2oP"),r("sMBO"),r("pjDv"),r("L/Qf");var a=r("2/Rp"),n=(r("AUBz"),r("ZTPi")),l=r("q1tI"),o=r.n(l),i=(r("6hB6"),r("gySj"),r("DFOY")),c=(r("tULf"),r("Vl3Y")),s=(r("1vPl"),r("5rEg")),u=(r("FZtP"),r("rVDo")),m=r("Nlzp"),d=r("P2RN");function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,l=[],o=!0,i=!1;try{for(r=r.call(e);!(o=(a=r.next()).done)&&(l.push(a.value),!t||l.length!==t);o=!0);}catch(e){i=!0,n=e}finally{try{o||null==r.return||r.return()}finally{if(i)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var b=s.a.TextArea;function y(e,t){e.onSuccess;var r=f(c.a.useForm(),1)[0];Object(l.useEffect)((function(){y()}),[]);var a=f(Object(l.useState)([]),2),n=a[0],p=a[1],y=function(){Object(m.c)(m.a.getWorkOrderDictionary).then((function(e){var t=[];for(var r in e.data.problemTypeOneLevel){var a={value:r,label:e.data.problemTypeOneLevel[r],children:[]};for(var n in e.data.problemTypeTwoLevel[r])a.children.push({value:n,label:e.data.problemTypeTwoLevel[r][n]});t.push(a)}p(t)}))},v=Object(l.useRef)(null);var h=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];r.validateFields().then((function(t){var a,l,o="";t.image.forEach((function(e,r){r===t.image.length-1?o+=e.url:o+=e.url+","})),n.forEach((function(e){e.value===t.problemType[0]&&(a=e.label,e.children.forEach((function(e){e.value===t.problemType[1]&&(l=e.label)})))}));var i={phone:t.phone,problemDesc:t.problemDesc,image:o,problemTypeOneLevel:t.problemType[0],problemTypeTwoLevel:t.problemType[1],problemTypeOneName:a,problemTypeTwoName:l};Object(m.c)(m.a.subWorkOrder,i,{loading:e}).then((function(e){Object(d.a)({type:"success",description:"提交成功！"}),r.resetFields()}))}))};return Object(l.useImperativeHandle)(t,(function(){return{subOrder:h}}),[n.length]),o.a.createElement("div",{id:"order-home-sub"},o.a.createElement(c.a,{name:"basic",form:r,initialValues:{image:[]}},o.a.createElement(c.a.Item,{label:"选择内容分类",name:"problemType",rules:[{required:!0}]},o.a.createElement(i.a,{options:n,onChange:function(e){console.log(e)},style:{width:"612px"},popupClassName:"order-Cascader"})),o.a.createElement(c.a.Item,{label:"问题描述",name:"problemDesc",rules:[{required:!0,whitespace:!0}]},o.a.createElement(b,{rows:4,maxLength:1e3,showCount:!0,style:{width:"612px"}})),o.a.createElement(c.a.Item,{label:"上传问题图片",name:"image"},o.a.createElement(u.b,{style:{width:"612px"},ref:v,maxCount:10,format:".jpg,.png,.gif",preferSize:"不限"})),o.a.createElement(c.a.Item,{label:"联系方式",name:"phone",rules:[{pattern:/^(((\d{3,4}-)?\d{7,8})|(1\d{10}))$/,whitespace:!0,message:"请输入正确的手机号码"}]},o.a.createElement(s.a,{style:{width:"612px"}}))))}y=Object(l.forwardRef)(y);r("Re5i");var v=r("/wGt"),h=(r("qNb/"),r("PArb")),g=(r("7vYg"),r("1GRj")),E=(r("mbEz"),r("wCAj")),w=(r("zKZe"),r("2B1R"),r("rB9j"),r("EnZy"),r("DgvE"));function O(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,l=[],o=!0,i=!1;try{for(r=r.call(e);!(o=(a=r.next()).done)&&(l.push(a.value),!t||l.length!==t);o=!0);}catch(e){i=!0,n=e}finally{try{o||null==r.return||r.return()}finally{if(i)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return N(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return N(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function T(e){var t=e.isRefresh,r=O(Object(l.useState)(!1),2),a=r[0],n=r[1],i=O(Object(l.useState)([]),2),c=i[0],s=i[1],u=O(Object(l.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),d=u[0],f=u[1],p=O(Object(l.useState)({}),2),b=p[0],y=p[1],N=[{title:"问题描述",dataIndex:"problemDesc",key:"problemDesc",render:function(e,t){return o.a.createElement("div",{className:"single-text",style:{width:400}},e)}},{title:"问题分类",dataIndex:"age",key:"age",render:function(e,t){return o.a.createElement("span",null,t.problemTypeOneName," - ",t.problemTypeTwoName)}},{title:"提交时间",dataIndex:"createTime",key:"createTime",render:function(e){return o.a.createElement("span",null,e&&w.a.utcToDev(e))}},{title:"工单状态",dataIndex:"status",key:"status",render:function(e,t){return o.a.createElement("span",null,e?"已回复":"未回复")}},{title:"操作",dataIndex:"address",key:"address",render:function(e,t){return o.a.createElement("span",null,o.a.createElement("a",{onClick:function(){var e;e=t.workOrderId,T(e),n(!0)}},"查看"))}}],T=function(e){Object(m.c)(m.a.WorkOrderDetail,{workOrderId:e}).then((function(e){y(e.data)}))};return Object(l.useEffect)((function(){!function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];Object(m.c)(m.a.WorkOrderList,d,{loading:e}).then((function(e){s(e.data.list),f((function(t){var r=JSON.parse(JSON.stringify(t));return Object.assign(r,{totalRows:e.data.pager.totalRows})}))}))}()}),[d.pageRows,d.pageIndex,t]),o.a.createElement("div",{id:"order-home-self"},o.a.createElement(E.a,{dataSource:c,columns:N,rowKey:"workOrderId",pagination:{defaultCurrent:1,current:d.pageIndex,onChange:function(e,t){t===d.pageRows?f((function(r){var a=JSON.parse(JSON.stringify(r));return Object.assign(a,{pageIndex:e,pageRows:t})})):f((function(e){var r=JSON.parse(JSON.stringify(e));return Object.assign(r,{pageIndex:1,pageRows:t})}))},pageSize:d.pageRows,total:d.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return o.a.createElement("span",null,"共 ",o.a.createElement("a",null,d.totalRows)," 条")}}}),o.a.createElement(v.a,{title:"工单详情",placement:"right",closable:!1,onClose:function(){n(!1)},visible:a,width:470},o.a.createElement("div",{className:"my-order-detail"},o.a.createElement("div",{className:"order-item"},o.a.createElement("div",{className:"order-item-label"},"问题分类："),o.a.createElement("div",{className:"order-item-text"},b.problemTypeOneName,"-",b.problemTypeTwoName,o.a.createElement("span",{className:"order-item-span",style:{color:b.status?"#15C054":"#2F78FF"}},b.status?"已回复":"待回复"))),o.a.createElement("div",{className:"order-item"},o.a.createElement("div",{className:"order-item-label"},"提交时间："),o.a.createElement("div",{className:"order-item-text"},b.createTime&&w.a.utcToDev(b.createTime))),o.a.createElement("div",{className:"order-item"},o.a.createElement("div",{className:"order-item-label"},"问题描述："),o.a.createElement("div",{className:"order-item-text"},b.problemDesc)),o.a.createElement("div",{className:"order-item"},o.a.createElement("div",{className:"order-item-label"},"上传问题图片/视频："),o.a.createElement("div",{className:"order-item-text"},b.image&&b.image.split(",").map((function(e,t){return o.a.createElement(g.a,{key:t,src:e,width:100})})))),o.a.createElement("div",{className:"order-item"},o.a.createElement("div",{className:"order-item-label"},"联系方式："),o.a.createElement("div",{className:"order-item-text"},b.phone)),1==b.status?o.a.createElement("div",{className:"order-feedback"},o.a.createElement("div",{style:{margin:"0 -24px"}},o.a.createElement(h.a,null)),o.a.createElement("div",{className:"feedback-title"},"回复详情："),o.a.createElement("div",{className:"feedback-dec"},b.replyContent)):null)))}function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var a,n,l=[],o=!0,i=!1;try{for(r=r.call(e);!(o=(a=r.next()).done)&&(l.push(a.value),!t||l.length!==t);o=!0);}catch(e){i=!0,n=e}finally{try{o||null==r.return||r.return()}finally{if(i)throw n}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return S(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return S(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var x=n.a.TabPane;function I(){var e=j(Object(l.useState)("1"),2),t=e[0],r=e[1],i=j(Object(l.useState)(0),2),c=i[0],s=i[1],u=Object(l.useRef)(null);return o.a.createElement("div",{id:"order-home"},o.a.createElement("div",{className:"common-tab comm-shadowbox"},o.a.createElement(n.a,{activeKey:t,className:"shadow-tab",onChange:function(e){r(e),console.log("=============="),e!=t&&2==e&&s(c+1)}},o.a.createElement(x,{key:"1",tab:"提交工单"},o.a.createElement(y,{ref:u,onSuccess:function(){}})),o.a.createElement(x,{key:"2",tab:"我的工单"},o.a.createElement(T,{isRefresh:c})))),"1"==t&&o.a.createElement("div",{className:"order-home-footer"},o.a.createElement(a.a,{type:"primary",onClick:function(){u.current.subOrder()}},"提交")))}}}]);