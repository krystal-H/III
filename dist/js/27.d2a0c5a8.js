(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{AFux:function(e,t,r){"use strict";r.r(t);r("pNMO"),r("4Brf"),r("07d7"),r("0oug"),r("4mDm"),r("PKPk"),r("3bBZ"),r("+2oP"),r("sMBO"),r("pjDv"),r("tkto"),r("TeQF"),r("5DmW"),r("FZtP"),r("27RR"),r("mbEz");var n=r("wCAj"),a=(r("L/Qf"),r("2/Rp")),o=(r("qNb/"),r("PArb")),c=(r("1vPl"),r("5rEg")),i=r("BkRI"),l=r.n(i),u=(r("zKZe"),r("q1tI")),s=r.n(u),p=r("55Ip"),f=r("DgvE"),d=r("MeRu"),m=r("Nlzp"),b=(r("k3Gp"),r("kLXV")),y=(r("tULf"),r("Vl3Y")),g=r("P2RN");function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function O(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],c=!0,i=!1;try{for(r=r.call(e);!(c=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);c=!0);}catch(e){i=!0,a=e}finally{try{c||null==r.return||r.return()}finally{if(i)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var w=function(e){var t=e.visible,r=e.handleCancel,n=e.handleOk,a=e.opeType,o=e.editData,i=void 0===o?{}:o,l=h(y.a.useForm(),1)[0];return s.a.createElement(b.a,{title:"add"===a?"创建项目":"编辑项目",destroyOnClose:!0,maskClosable:!1,visible:t,width:600,onCancel:r,onOk:function(){l.submit()},wrapClassName:"remote-config-modal"},s.a.createElement(y.a,{form:l,name:"filTask",labelCol:{span:4},wrapperCol:{span:18},onFinish:function(e){console.log("Success:",e);var t=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){O(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e);"edit"===a&&(t.projectId=i.projectId),Object(m.c)(m.a.saveProjectInfo,t,{loading:!0}).then((function(e){Object(g.a)({description:"操作成功！",type:"success"}),n()}))},onFinishFailed:function(e){console.log("Failed:",e)},autoComplete:"off",initialValues:{name:i.name||"",desc:i.desc||""}},s.a.createElement(y.a.Item,{label:"项目名称",name:"projectName",initialValue:i.projectName,rules:[{required:!0,message:"请输入项目名称"},{max:50,message:"最大输入长度为50"}]},s.a.createElement(c.a,{placeholder:"请输入项目名称，不能超过50个字符",style:{width:415}})),s.a.createElement(y.a.Item,{name:"projectDesc",label:"项目描述",initialValue:i.projectDesc},s.a.createElement(c.a.TextArea,{showCount:!0,maxLength:50})),s.a.createElement(y.a.Item,{name:"brokerUrl",label:"项目地址",initialValue:i.brokerUrl},s.a.createElement(c.a,{maxLength:100}))))};r("RRhQ");function E(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function I(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,a,o=[],c=!0,i=!1;try{for(r=r.call(e);!(c=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);c=!0);}catch(e){i=!0,a=e}finally{try{c||null==r.return||r.return()}finally{if(i)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return P(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return P(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var k=c.a.Search;t.default=function(){var e=Object(p.useHistory)(),t=S(Object(u.useState)(""),2),r=t[0],c=t[1],i=S(Object(u.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),b=i[0],y=i[1],g=S(Object(u.useState)(!1),2),j=g[0],O=g[1],h=S(Object(u.useState)("add"),2),v=h[0],P=h[1],x=S(Object(u.useState)({}),2),C=x[0],D=x[1],R=S(Object(u.useState)([]),2),N=R[0],A=R[1],T=[{title:"项目名称",dataIndex:"projectName",key:"projectName",width:350},{title:"项目ID",dataIndex:"projectId",key:"projectId"},{title:"创建时间",dataIndex:"createTime",key:"createTime",render:function(e){return e&&f.a.utcToDev(e)}},{title:"更新时间",dataIndex:"updateTime",key:"updateTime",render:function(e){return e&&f.a.utcToDev(e)}},{title:"操作",key:"action",render:function(e,t){return s.a.createElement("div",{className:"operation"},s.a.createElement("a",{onClick:function(){return L(t,"edit")}},"编辑"),s.a.createElement(o.a,{type:"vertical"}),s.a.createElement("a",{onClick:function(){return M(t)}},"查看详情"))}}],F=function(){var e=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?E(Object(r),!0).forEach((function(t){I(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({projectName:r},b);Object(m.c)(m.a.projectList,e,{loading:!0}).then((function(e){A(e.data.list),y((function(t){var r=l()(t);return r.totalRows=e.data.pager.totalRows,r}))}))};Object(u.useEffect)((function(){sessionStorage.removeItem("d_data")}),[]),Object(u.useEffect)((function(){F()}),[b.pageIndex,b.pageRows,r]);var L=function(e,t){O(!0),P(t),D("add"===t?{}:e)},M=function(t){sessionStorage.setItem("d_data",JSON.stringify(t)),e.push("/open/project/projectManage/detail/".concat(t.projectId,"?step=1"))};return s.a.createElement("div",{id:"project-mgt"},s.a.createElement(d.a,{title:"项目管理"}),s.a.createElement("div",{className:"page-header comm-shadowbox"},s.a.createElement("div",{className:"page-header-left"},s.a.createElement(k,{placeholder:"项目名称",allowClear:!0,onSearch:function(e){return c(e),void y((function(e){return Object.assign(l()(e),{pageIndex:1})}))},style:{width:465,margin:"0 22px"}})),s.a.createElement("div",{className:"page-header-right"},s.a.createElement(a.a,{type:"primary",onClick:function(){return L("","add")}},"创建项目"))),s.a.createElement("div",{className:"comm-shadowbox pd22"},s.a.createElement(n.a,{columns:T,className:"ant-table-fixed",rowKey:"projectId",dataSource:N,pagination:{defaultCurrent:1,current:b.pageIndex,pageSize:b.pageRows,total:b.totalRows,showSizeChanger:!1,showQuickJumper:b.totalPages>5,onChange:function(e,t){y((function(r){return Object.assign(l()(r),{pageIndex:t===b.pageRows?e:1,pageRows:t})}))},showTotal:function(e){return s.a.createElement("span",null,"共 ",s.a.createElement("a",null,e)," 条")}}})),j&&s.a.createElement(w,{opeType:v,editData:C,visible:j,handleCancel:function(){return O(!1)},handleOk:function(){O(!1),F()}}))}},RRhQ:function(e,t,r){}}]);