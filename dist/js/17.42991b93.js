(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"4vbh":function(e,t,n){"use strict";n.r(t);n("pNMO"),n("4Brf"),n("0oug"),n("4mDm"),n("PKPk"),n("3bBZ"),n("+2oP"),n("sMBO"),n("pjDv"),n("tkto"),n("TeQF"),n("5DmW"),n("FZtP"),n("27RR"),n("L/Qf");var r=n("2/Rp"),a=(n("mbEz"),n("wCAj")),l=(n("AUBz"),n("ZTPi")),c=n("BkRI"),o=n.n(c),i=(n("2B1R"),n("qePV"),n("zKZe"),n("rB9j"),n("EnZy"),n("07d7"),n("JfAA"),n("q1tI")),u=n.n(i),d=n("DgvE"),s=n("739K"),m=n("DeUx"),p=n("xvlK"),b=n("55Ip"),f=(n("k3Gp"),n("kLXV")),y=n("Nlzp"),v=n("P2RN");function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){I(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,l=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){o=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw a}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var j=function(e){var t=e.productId,n=e.voiceType,r=e.visible,l=e.handleCancel,c=e.handleOk,o=g(Object(i.useState)([]),2),d=o[0],s=o[1],m=g(Object(i.useState)(0),2),p=m[0],b=m[1],O=g(Object(i.useState)(""),2),I=O[0],h=O[1],j=[{title:"语音能力ID",dataIndex:"abilityId",key:"abilityId",width:120},{title:"语音能力名称",dataIndex:"abilityName",key:"abilityName",width:120},{title:"语言调用词",dataIndex:"abilityDesc",key:"abilityDesc"},{title:"关联物模型功能",dataIndex:"schemeRelationList",key:"schemeRelationList",render:function(e){return e.map((function(e,t){return u.a.createElement("span",{key:t},e,u.a.createElement("br",null))}))}}];Object(i.useEffect)((function(){var e;e={voiceType:n,productId:t},Object(y.c)(y.a.getAllVoiceList,e,{loading:!0}).then((function(e){s(e.data.list)}))}),[]);var w={onChange:function(e,t){b(t.length),h(e)}};return u.a.createElement(f.a,{title:"增加能力",destroyOnClose:!0,maskClosable:!1,visible:r,width:1100,onOk:function(){if(!p)return Object(v.a)({type:"warn",description:"请配置语音能力"});var e={abilityIdList:I,productId:t,operation:"1"};Object(y.c)(y.a.addOrRemoveVoice,e,{loading:!0}).then((function(e){Object(v.a)({type:"success",description:"提交成功，需管理后台审核！"}),c()}))},okText:"提交",onCancel:l},u.a.createElement("div",{style:{marginBottom:10}},"已选择",u.a.createElement("a",null," ",p," "),"项"),u.a.createElement("div",null,u.a.createElement(a.a,{rowSelection:E({type:"checkbox"},w),rowKey:"abilityId",columns:j,dataSource:d,pagination:!1})))},w=n("ORHb"),S=n("MeRu");n("znv9");function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,l=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){o=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw a}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return T(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return T(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var D=l.a.TabPane;t.default=function(){var e,t=Object(b.useHistory)(),n=N(Object(i.useState)(!1),2),c=n[0],f=n[1],O=N(Object(i.useState)("0"),2),E=O[0],I=O[1],g=N(Object(i.useState)(!1),2),h=g[0],k=g[1],C=N(Object(i.useState)([]),2),T=C[0],x=C[1],A=N(Object(i.useState)({pageIndex:1,totalRows:0,pageRows:1e6}),2),R=(A[0],A[1]),B=N(Object(i.useState)(sessionStorage.getItem("productItem")?JSON.parse(sessionStorage.getItem("productItem")):{}),2),L=B[0],V=B[1],K=N(Object(i.useState)(!1),2),M=K[0],z=K[1],H=[{title:"语音能力ID",dataIndex:"abilityId",key:"abilityId"},{title:"语音能力名称",dataIndex:"abilityName",key:"abilityName"},{title:"状态",dataIndex:"status",key:"status",render:function(e){return u.a.createElement("span",{style:{color:["","#2f78ff","#f58542"][e]}},1===e?"已发布":2===e?"审核中":"")}},{title:"语言调用词",dataIndex:"abilityDesc",key:"abilityDesc"},{title:"关联物模型功能",dataIndex:"schemeRelationList",key:"schemeRelationList",render:function(e){return e.map((function(e,t){return u.a.createElement("span",{key:t},e,u.a.createElement("br",null))}))}},{title:"操作",key:"action",render:function(e,t){return 1===t.status?u.a.createElement("span",null,u.a.createElement("a",{onClick:function(){return U(t)}},"移除")):2===t.status?"-":void 0}}],q=u.a.createElement("div",{className:"product_title_baseinfo_list"},u.a.createElement("div",null,u.a.createElement("div",null,"品类："),u.a.createElement("div",null,L.deviceType)),u.a.createElement("div",null,u.a.createElement("div",null,"产品ID："),u.a.createElement("div",null,L.productId)),u.a.createElement("div",null,u.a.createElement("div",null,"通讯协议："),u.a.createElement("div",null,L.bindTypeStr)),u.a.createElement("div",null,u.a.createElement("div",null,"产品编码："),u.a.createElement("div",null,L.code)),u.a.createElement("div",null,u.a.createElement("div",null,"产品密钥："),u.a.createElement("div",null,(e=L.deviceKey,e=c?e:Object(d.m)(e,10)),u.a.createElement("span",{onClick:function(){f(!c)},style:{cursor:"pointer"}}," ",c?u.a.createElement(s.a,null):u.a.createElement(m.a,null))))),J=function(){var e={voiceType:Number(E)+1,productId:L.productId};Object(y.c)(y.a.getProductVoiceList,e,{loading:!0}).then((function(e){x(Object(d.b)(e.data.list)),R((function(t){return Object.assign(o()(t),{totalRows:e.data.pager.totalRows})}))}))};Object(i.useEffect)((function(){J()}),[]);var U=function(e){var t={abilityIdList:e.abilityId.toString().split("").map((function(e){return Number(e)})),productId:L.productId,operation:"0"};Object(y.c)(y.a.addOrRemoveVoice,t,{loading:!0}).then((function(e){Object(v.a)({type:"success",description:"操作成功，需管理后台审核！"}),J()}))};return u.a.createElement("div",{className:"voice-setting-page"},u.a.createElement(S.a,{title:L.productName,titleTag:L.schemeName,btnTxt:"编辑",btnClickHandle:function(){return k(!0)},backHandle:function(){1==Object(d.h)("detail")?t.go(-1):t.push("/open/product/proManage/list")},backTitle:"开发流程"},q),u.a.createElement("div",null,u.a.createElement(l.a,{activeKey:E,onChange:function(e){return function(e){I(e)}(e)}},["小度语音"].map((function(e,t){return u.a.createElement(D,{tab:"".concat(e),key:t+""})}))),u.a.createElement("div",{className:"comm-shadowbox"},u.a.createElement(a.a,{columns:H,className:"ant-table-fixed",rowKey:"abilityId",dataSource:T,pagination:!1}),u.a.createElement(r.a,{type:"primary",ghost:!0,className:"add-table-btn",onClick:function(){return z(!0)}},u.a.createElement(p.a,null),"增加能力"),u.a.createElement("div",{style:{padding:"20px 10px"}},"请搜索下载小度APP进行语音测试。"))),h&&u.a.createElement(w.a,{titleVisible:h,onCloseTitle:function(){return k(!1)},onOkClose:function(e){var t=P(P({},JSON.parse(sessionStorage.productItem)),e);V(t),sessionStorage.setItem("productItem",JSON.stringify(t)),Object(v.a)({type:"success",description:"更新成功！"}),k(!1)}}),M&&u.a.createElement(j,{voiceType:Number(E)+1,productId:L.productId,visible:M,handleOk:function(){z(!1),J()},handleCancel:function(){return z(!1)}}))}},ORHb:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));n("pNMO"),n("4Brf"),n("07d7"),n("0oug"),n("4mDm"),n("PKPk"),n("3bBZ"),n("+2oP"),n("sMBO"),n("pjDv"),n("rB9j"),n("Re5i");var r=n("/wGt"),a=(n("1vPl"),n("5rEg")),l=(n("L/Qf"),n("2/Rp")),c=(n("tULf"),n("Vl3Y")),o=n("q1tI"),i=n.n(o),u=n("rVDo"),d=n("Nlzp"),s=n("S18n"),m=n("DgvE");n("T8Ho");function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,l=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){o=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw a}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return b(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function f(e){var t=e.titleVisible,n=e.onCloseTitle,b=e.onOkClose,f=e.productItem,y=p(c.a.useForm(),1)[0],v=Object(o.useRef)(),O=p(Object(o.useState)([]),2),E=(O[0],O[1]);Object(o.useEffect)((function(){Object(d.c)(d.a.getProductBrand).then((function(e){E(e.data)}))}),[]);return i.a.createElement(r.a,{title:"产品信息",placement:"right",closable:!1,onClose:n,visible:t,destroyOnClose:!0,width:393,footer:i.a.createElement("div",{style:{textAlign:"right"}},i.a.createElement(l.a,{onClick:n,style:{marginRight:8}},"取消"),i.a.createElement(l.a,{onClick:function(){y.validateFields().then((function(e){var t={productId:f.productId,productName:e.productName,brandId:e.brandId,productIcon:e.productIcon[0].url,productCode:e.productCode};Object(d.c)(d.a.editProductInfo,t).then((function(t){var n={productName:e.productName,brandId:e.brandId,productIcon:e.productIcon[0].url,productCode:e.productCode,modifyTime:t.data.modifyTime};b(n)}))}))},type:"primary"},"确定"))},i.a.createElement("div",{className:"edit-left-protocol-wrap"},i.a.createElement(c.a,{labelCol:{span:8},wrapperCol:{span:16},form:y,initialValues:{productIcon:[{url:f.productIcon}],productName:f.productName,brandId:f.brandId,productCode:f.productCode}},i.a.createElement(c.a.Item,{label:"产品名称",name:"productName",rules:[{required:!0}]},i.a.createElement(a.a,{maxLength:30})),i.a.createElement(c.a.Item,{label:"产品ID"},i.a.createElement("span",null,f.productId)),i.a.createElement(c.a.Item,{label:"品类"},i.a.createElement("span",null,f.deviceType)),i.a.createElement(c.a.Item,{label:"品牌",name:"brandId",rules:[{required:!0}]},i.a.createElement("span",null,f.brandName)),i.a.createElement(c.a.Item,{label:"产品型号",name:"productCode"},i.a.createElement(a.a,null)),i.a.createElement(c.a.Item,{label:"通信协议"},i.a.createElement("span",null,f.bindTypeStr)),i.a.createElement(c.a.Item,{label:"智能化方案"},i.a.createElement("span",null,f.schemeName)),i.a.createElement(c.a.Item,{label:"产品编码"},i.a.createElement("span",null,f.code)),i.a.createElement(c.a.Item,{label:"产品密钥"},i.a.createElement("span",null,i.a.createElement(s.a,{label:f.deviceKey,tip:"",copy:!1}))),i.a.createElement(c.a.Item,{label:"产品图片",name:"productIcon",rules:[{required:!0}]},i.a.createElement(u.b,{ref:v,maxSize:10,format:".gif,.jpeg,.jpg,.png"})),i.a.createElement(c.a.Item,{label:"创建时间"},i.a.createElement("span",null,m.a.utcToDev(f.createTime))),i.a.createElement(c.a.Item,{label:"更新时间"},i.a.createElement("span",null,f.modifyTime?m.a.utcToDev(f.modifyTime):"--")))))}},T8Ho:function(e,t,n){},znv9:function(e,t,n){}}]);