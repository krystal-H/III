(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"4vbh":function(e,t,n){"use strict";n.r(t);n("pNMO"),n("4Brf"),n("07d7"),n("0oug"),n("4mDm"),n("PKPk"),n("3bBZ"),n("+2oP"),n("sMBO"),n("pjDv"),n("tkto"),n("TeQF"),n("5DmW"),n("FZtP"),n("27RR"),n("L/Qf");var r=n("2/Rp"),a=(n("mbEz"),n("wCAj")),l=(n("AUBz"),n("ZTPi")),c=n("BkRI"),o=n.n(c),i=(n("2B1R"),n("qePV"),n("zKZe"),n("q1tI")),u=n.n(i),d=n("DgvE"),s=n("739K"),m=n("DeUx"),p=n("xvlK"),f=n("55Ip"),b=(n("k3Gp"),n("kLXV")),y=n("Nlzp"),v=n("P2RN");function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){O(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,l=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){o=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw a}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var j=function(e){var t=e.productId,n=e.voiceType,r=e.visible,l=e.handleCancel,c=e.handleOk,o=I(Object(i.useState)([]),2),d=o[0],s=o[1],m=I(Object(i.useState)(0),2),p=m[0],f=m[1],E=I(Object(i.useState)(""),2),O=E[0],h=E[1],j=I(Object(i.useState)({pageIndex:1,totalRows:0,pageRows:1e7}),2),w=j[0],S=(j[1],[{title:"语音能力ID",dataIndex:"abilityId",key:"abilityId",width:120},{title:"语音能力名称",dataIndex:"abilityName",key:"abilityName",width:120},{title:"语言调用词",dataIndex:"abilityDesc",key:"abilityDesc",render:function(e){var t=e&&JSON.parse(e);return[u.a.createElement("div",null,t.desc),t.examples.map((function(e,t){return u.a.createElement("span",{key:t},e,u.a.createElement("br",null))}))]}},{title:"关联物模型功能",dataIndex:"schemeRelationList",key:"schemeRelationList",render:function(e){return e.map((function(e,t){return u.a.createElement("span",{key:t},e,u.a.createElement("br",null))}))}}]);Object(i.useEffect)((function(){var e;e=g({voiceType:n,productId:t},w),Object(y.c)(y.a.getAllVoiceList,e,{loading:!0}).then((function(e){s(e.data.list)}))}),[]);var k={onChange:function(e,t){f(t.length),h(e)}};return u.a.createElement(b.a,{title:"增加能力",destroyOnClose:!0,maskClosable:!1,visible:r,width:1200,onOk:function(){if(!p)return Object(v.a)({type:"warn",description:"请配置语音能力"});var e={abilityIdList:O,productId:t,operation:"1"};Object(y.c)(y.a.addOrRemoveVoice,e,{loading:!0}).then((function(e){Object(v.a)({type:"success",description:"提交成功，需管理后台审核！"}),c()}))},okText:"提交",onCancel:l},u.a.createElement("div",{style:{marginBottom:10}},"已选择",u.a.createElement("a",null," ",p," "),"项"),u.a.createElement("div",null,u.a.createElement(a.a,{rowSelection:g({type:"checkbox"},k),rowKey:"abilityId",columns:S,dataSource:d,pagination:!1,scroll:{y:450}})))},w=n("ORHb"),S=n("MeRu");n("znv9");function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,l=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){o=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw a}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return x(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var R=l.a.TabPane;t.default=function(){var e,t=Object(f.useHistory)(),n=N(Object(i.useState)(!1),2),c=n[0],b=n[1],E=N(Object(i.useState)("0"),2),g=E[0],O=E[1],I=N(Object(i.useState)(!1),2),h=I[0],k=I[1],C=N(Object(i.useState)([]),2),x=C[0],T=C[1],D=N(Object(i.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),A=D[0],L=D[1],B=N(Object(i.useState)(sessionStorage.getItem("productItem")?JSON.parse(sessionStorage.getItem("productItem")):{}),2),V=B[0],z=B[1],K=N(Object(i.useState)(!1),2),M=K[0],J=K[1],H=[{title:"语音能力ID",dataIndex:"abilityId",key:"abilityId"},{title:"语音能力名称",dataIndex:"abilityName",key:"abilityName"},{title:"状态",dataIndex:"status",key:"status",render:function(e){return u.a.createElement("span",{style:{color:["","#2f78ff","#f58542"][e]}},1===e?"已发布":2===e?"审核中":"")}},{title:"语言调用词",dataIndex:"abilityDesc",key:"abilityDesc",render:function(e){var t=e&&JSON.parse(e);return[u.a.createElement("div",null,t.desc),t.examples.map((function(e,t){return u.a.createElement("span",{key:t},e,u.a.createElement("br",null))}))]}},{title:"关联物模型功能",dataIndex:"schemeRelationList",key:"schemeRelationList",render:function(e){return e.map((function(e,t){return u.a.createElement("span",{key:t},e,u.a.createElement("br",null))}))}},{title:"操作",key:"action",render:function(e,t){return 1===t.status?u.a.createElement("span",null,u.a.createElement("a",{onClick:function(){return Z(t)}},"移除")):2===t.status?"-":void 0}}],q=u.a.createElement("div",{className:"product_title_baseinfo_list"},u.a.createElement("div",null,u.a.createElement("div",null,"品类："),u.a.createElement("div",null,V.deviceType)),u.a.createElement("div",null,u.a.createElement("div",null,"产品ID："),u.a.createElement("div",null,V.productId)),u.a.createElement("div",null,u.a.createElement("div",null,"通讯协议："),u.a.createElement("div",null,V.bindTypeStr)),u.a.createElement("div",null,u.a.createElement("div",null,"产品编码："),u.a.createElement("div",null,V.code)),u.a.createElement("div",null,u.a.createElement("div",null,"产品密钥："),u.a.createElement("div",null,(e=V.deviceKey,e=c?e:Object(d.l)(e,10)),u.a.createElement("span",{onClick:function(){b(!c)},style:{cursor:"pointer"}}," ",c?u.a.createElement(s.a,null):u.a.createElement(m.a,null))))),U=function(){var e=P({voiceType:Number(g)+1,productId:V.productId},A);Object(y.c)(y.a.getProductVoiceList,e,{loading:!0}).then((function(e){T(Object(d.b)(e.data.list)),L((function(t){return Object.assign(o()(t),{totalRows:e.data.pager.totalRows})}))}))};Object(i.useEffect)((function(){U()}),[A.pageIndex,A.pageRows]);var Z=function(e){var t={abilityIdList:[Number(e.abilityId)],productId:V.productId,operation:"0"};Object(y.c)(y.a.addOrRemoveVoice,t,{loading:!0}).then((function(e){Object(v.a)({type:"success",description:"操作成功，需管理后台审核！"}),U()}))};return u.a.createElement("div",{className:"voice-setting-page"},u.a.createElement(S.a,{title:V.productName,titleTag:V.schemeName,btnClickHandle:function(){return k(!0)},backHandle:function(){1==Object(d.g)("detail")?t.go(-1):t.push("/open/product/proManage/list")},backTitle:"开发流程"},q),u.a.createElement("div",null,u.a.createElement(l.a,{activeKey:g,onChange:function(e){return function(e){O(e)}(e)}},["小度语音"].map((function(e,t){return u.a.createElement(R,{tab:"".concat(e),key:t+""})}))),u.a.createElement("div",{className:"comm-shadowbox"},u.a.createElement(a.a,{columns:H,className:"ant-table-fixed",rowKey:"abilityId",dataSource:x,pagination:{defaultCurrent:1,current:A.pageIndex,pageSize:A.pageRows,total:A.totalRows,showSizeChanger:!1,showQuickJumper:A.totalPages>5,onChange:function(e,t){L((function(n){return Object.assign(o()(n),{pageIndex:t===A.pageRows?e:1,pageRows:t})}))},showTotal:function(e){return u.a.createElement("span",null,"共 ",u.a.createElement("a",null,e)," 条")}}}),u.a.createElement(r.a,{type:"primary",ghost:!0,className:"add-table-btn",onClick:function(){return J(!0)}},u.a.createElement(p.a,null),"增加能力"),u.a.createElement("div",{style:{padding:"20px 10px"}},"请搜索下载小度APP进行语音测试。"))),h&&u.a.createElement(w.a,{titleVisible:h,onCloseTitle:function(){return k(!1)},onOkClose:function(e){var t=P(P({},JSON.parse(sessionStorage.productItem)),e);z(t),sessionStorage.setItem("productItem",JSON.stringify(t)),Object(v.a)({type:"success",description:"更新成功！"}),k(!1)}}),M&&u.a.createElement(j,{voiceType:Number(g)+1,productId:V.productId,visible:M,handleOk:function(){J(!1),U()},handleCancel:function(){return J(!1)}}))}},ORHb:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));n("pNMO"),n("4Brf"),n("07d7"),n("0oug"),n("4mDm"),n("PKPk"),n("3bBZ"),n("+2oP"),n("sMBO"),n("pjDv"),n("Re5i");var r=n("/wGt"),a=(n("1vPl"),n("5rEg")),l=(n("L/Qf"),n("2/Rp")),c=(n("tULf"),n("Vl3Y")),o=n("q1tI"),i=n.n(o),u=n("rVDo"),d=n("Nlzp"),s=n("S18n"),m=n("DgvE");n("T8Ho");function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,l=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){o=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw a}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function b(e){var t=e.titleVisible,n=e.onCloseTitle,f=e.onOkClose,b=e.productItem,y=p(c.a.useForm(),1)[0],v=Object(o.useRef)(),E=p(Object(o.useState)([]),2),g=(E[0],E[1]);Object(o.useEffect)((function(){Object(d.c)(d.a.getProductBrand).then((function(e){g(e.data)}))}),[]);return i.a.createElement(r.a,{title:"产品信息",placement:"right",closable:!1,onClose:n,visible:t,destroyOnClose:!0,width:393,footer:i.a.createElement("div",{style:{textAlign:"right"}},i.a.createElement(l.a,{onClick:n,style:{marginRight:8}},"取消"),i.a.createElement(l.a,{onClick:function(){y.validateFields().then((function(e){var t={productId:b.productId,productName:e.productName,brandId:e.brandId,productIcon:e.productIcon[0].url,productCode:e.productCode};Object(d.c)(d.a.editProductInfo,t).then((function(t){var n={productName:e.productName,brandId:e.brandId,productIcon:e.productIcon[0].url,productCode:e.productCode,modifyTime:t.data.modifyTime};f(n)}))}))},type:"primary"},"确定"))},i.a.createElement("div",{className:"edit-left-protocol-wrap"},i.a.createElement(c.a,{labelCol:{span:8},wrapperCol:{span:16},form:y,initialValues:{productIcon:[{url:b.productIcon}],productName:b.productName,brandId:b.brandId,productCode:b.productCode}},i.a.createElement(c.a.Item,{label:"产品名称",name:"productName",rules:[{required:!0}]},i.a.createElement(a.a,{maxLength:30})),i.a.createElement(c.a.Item,{label:"产品ID"},i.a.createElement("span",null,b.productId)),i.a.createElement(c.a.Item,{label:"品类"},i.a.createElement("span",null,b.deviceType)),i.a.createElement(c.a.Item,{label:"品牌",name:"brandId",rules:[{required:!0}]},i.a.createElement("span",null,b.brandName)),i.a.createElement(c.a.Item,{label:"产品型号",name:"productCode"},i.a.createElement(a.a,null)),i.a.createElement(c.a.Item,{label:"通信协议"},i.a.createElement("span",null,b.bindTypeStr)),i.a.createElement(c.a.Item,{label:"智能化方案"},i.a.createElement("span",null,b.schemeName)),i.a.createElement(c.a.Item,{label:"产品编码"},i.a.createElement("span",null,b.code)),i.a.createElement(c.a.Item,{label:"产品密钥"},i.a.createElement("span",null,i.a.createElement(s.a,{label:b.deviceKey,tip:"",copy:!1}))),i.a.createElement(c.a.Item,{label:"产品图片",name:"productIcon",rules:[{required:!0}]},i.a.createElement(u.b,{ref:v,maxSize:10,format:".gif,.jpeg,.jpg,.png"})),i.a.createElement(c.a.Item,{label:"创建时间"},i.a.createElement("span",null,m.a.utcToDev(b.createTime))),i.a.createElement(c.a.Item,{label:"更新时间"},i.a.createElement("span",null,b.modifyTime?m.a.utcToDev(b.modifyTime):"--")))))}},T8Ho:function(e,t,n){},znv9:function(e,t,n){}}]);