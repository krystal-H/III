(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"0eIn":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAACB0lEQVQ4T32ST2sTQRjGn9nZTTEKBeOtbv1T7zUHi8vmZMCw/QCBYsGT+DH88wEUeoseVTx4USyJFWpVYldaEJQEFROxCVqbi1Q0oWZnXpmZ3XRz0IXd2d2Z9/c+7/s+7HmzFzBChUi4RACZBwgYX6X6p/bQJViXS2fcmjrCXjS+d6QkdywoDdBAA44BitwtzZ2Y1oC1d9uUZDVJyagAYDGrcC4/9Up/AHi6ueVLIepqNzh7kmnAs7ffVISWTFI/RxDObb+Yn1pPA4QCEGHem0kAXzskyTWZk7pjFUlP0srUIYbuvHfKlLD6ZjsgiAqRdEe1GpIGDiWwvjOJ97uHMIhsHJ6IkJsYLu9QtvygzAZaxr8u7wYdsA5i1bbgZSzAYYATrxmOcJhB8b+Awm26agNXksCFWeBRA9Awc19jK5tfAoBVSKoS4mbGXrj1aRq/hw4cbrI/vAhcuLuvwrHQZisbWx1Vf9pAyfvSxxlwMCzmgYXT+4U+bgC1plbyhz15/Vm3jBMvnPeOjWZeDVv+nZZb74uMzq5k31sELt03CjKqHxxtVg3b2jWcc780d3w08+rLD/7Gj1y9uXtk1LzyLLDcMOUooK16UAvb2srGpuPzjyTDWu8ofkbZ8QmY4HBPoMiqYSsgQRWpfBAbJu0HQQytXzn09iYhyEaWiz5jfKkfWddvltngL3uXRG6qfr/OAAAAAElFTkSuQmCC"},"17x9":function(e,t,a){e.exports=a("WUjv")(13)},"4ZAH":function(e,t,a){},RGxR:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return L}));a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("sMBO"),a("pjDv"),a("tkto"),a("TeQF"),a("5DmW"),a("FZtP"),a("27RR"),a("mbEz");var n=a("wCAj"),r=(a("L/Qf"),a("2/Rp")),l=(a("Y2jk"),a("zeV3")),c=(a("tULf"),a("Vl3Y")),i=(a("1vPl"),a("5rEg")),o=(a("RKNx"),a("L41K")),u=(a("8QGh"),a("2fM7")),s=(a("zKZe"),a("q1tI")),m=a.n(s),d=a("MeRu"),f=a("0eIn"),b=a.n(f),p=(a("K4yd"),a("9yH6")),v=(a("k3Gp"),a("kLXV")),E=(a("AUBz"),a("ZTPi")),y=(a("4ZAH"),a("rwTb"));function g(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return O(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return O(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var h=o.a.Step,A=E.a.TabPane;function j(e){var t=e.isModalVisible,a=(e.colseMoadl,e.cancelModel),n=g(Object(s.useState)(0),2),l=n[0],c=n[1],i=Object(s.useRef)(null),u=Object(s.useRef)(null),d=Object(s.useRef)(null),f=[m.a.createElement("div",{key:"1"},l>0&&m.a.createElement(r.a,{style:{margin:"0 8px"},onClick:function(){c(l-1)}},"上一步"),l<2&&m.a.createElement(r.a,{type:"primary",onClick:function(){c(l+1)}},"下一步"),2===l&&m.a.createElement(r.a,{type:"primary",onClick:function(){return message.success("Processing complete!")}},"完成"))];return m.a.createElement(v.a,{title:"新增订阅",visible:t,onOk:function(){},onCancel:a,width:"900px",wrapClassName:"add-subscribe-modal",footer:f},m.a.createElement("div",{className:"add-subscribe"},m.a.createElement(o.a,{current:l},m.a.createElement(h,{title:"选择订阅对象"}),m.a.createElement(h,{title:"配置订阅内容"}),m.a.createElement(h,{title:"确定订阅方式"})),m.a.createElement("div",{className:"add-subscribe-main"},0===l&&m.a.createElement(I,{ref:i}),1===l&&m.a.createElement(w,{ref:u}),2===l&&m.a.createElement(S,{ref:d}))))}function I(e,t){var a=g(c.a.useForm(),1)[0];return Object(s.useImperativeHandle)(t,(function(){return{}})),m.a.createElement("div",{className:"step-one"},m.a.createElement(c.a,{form:a,labelAlign:"right"},m.a.createElement(c.a.Item,{name:"select",label:"订阅名称",rules:[{required:!0}]},m.a.createElement(i.a,null)),m.a.createElement(c.a.Item,{name:"select",label:"归属产品",rules:[{required:!0}]},m.a.createElement(u.a,null,m.a.createElement(u.a.Option,{value:"china"},"China"))),m.a.createElement(c.a.Item,{name:"radio-group",label:"选择设备"},m.a.createElement(p.a.Group,null,m.a.createElement(p.a,{value:"a"},"全部设备"),m.a.createElement(p.a,{value:"b"},"根据标签筛选设备"))),"a"===a.getFieldValue("radio-group")&&m.a.createElement(c.a.Item,{name:"address",label:""},m.a.createElement("div",null,m.a.createElement("div",null,"标签")))))}function w(e,t){return Object(s.useImperativeHandle)(t,(function(){return{}})),m.a.createElement("div",{className:"step-two"},m.a.createElement("div",{className:"product-title"},"已选择产品：睡眠监测器Light2.0"),m.a.createElement("div",{className:"select-tip"},"选择协议类型"),m.a.createElement(E.a,{defaultActiveKey:"1"},m.a.createElement(A,{tab:"属性",key:"1"},"Content of Tab Pane 1"),m.a.createElement(A,{tab:"事件",key:"2"},"Content of Tab Pane 2"),m.a.createElement(A,{tab:"服务",key:"3"},"Content of Tab Pane 3")))}function S(e,t){var a=g(c.a.useForm(),1)[0];return Object(s.useImperativeHandle)(t,(function(){return{}})),m.a.createElement("div",{className:"step-one"},m.a.createElement(c.a,{form:a,labelAlign:"right"},m.a.createElement(c.a.Item,{name:"radio-group",label:"订阅方式",rules:[{required:!0}]},m.a.createElement(p.a.Group,null,m.a.createElement(p.a,{value:"a"},"API数据PUSH形式"),m.a.createElement(p.a,{value:"b"},"MQTT主题订阅"))),m.a.createElement(c.a.Item,{name:"select",label:m.a.createElement(y.a,{label:"数据订阅URL",tip:"第三方云服务接口的唯一标识，供C-life云推送服务给第三方云推送数据使用，现仅支持http方式"}),rules:[{required:!0}]},m.a.createElement(i.a,null)),m.a.createElement(c.a.Item,{name:"select",label:m.a.createElement(y.a,{label:"Token",tip:"第三方云服务接口对接C-life云推送服务的凭证，用来验证厂商服务接口的合法性"}),rules:[{required:!0}]},m.a.createElement(i.a,null)),m.a.createElement(c.a.Item,{label:" ",colon:!1},m.a.createElement("a",null,"订阅帮助文档"))))}I=Object(s.forwardRef)(I),w=Object(s.forwardRef)(w),S=Object(s.forwardRef)(S);var C=a("Nlzp"),N=a("P2RN"),k=a("FC04");function T(e){var t=e.operate,a=e.visible,n=e.updateOkHandle,r=e.updateCancelHandle,l=e.actionObj,c=null;switch(t){case 1:c={title:"启动数据订阅",desc:"启动",needWarnIcon:!1};break;case 2:c={title:"停用数据订阅",desc:"停用",needWarnIcon:!0}}return m.a.createElement(k.a,{visible:a,modalOKHandle:function(){return n(t)},modalCancelHandle:r,targetName:l.subscription,title:c.title,descGray:!0,needWarnIcon:c.needWarnIcon,descText:c.desc,tipText:c.tip})}a("qSPm");function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return R(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return R(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var P=[{title:"数据名称",dataIndex:"funcName",key:"funcName"},{title:"数据标识",dataIndex:"funcIdentifier",key:"funcIdentifier"},{title:"数据属性",dataIndex:"funcType",key:"funcType"}];function H(e){var t=e.rightVisible,a=e.onCloseRight,r=(e.id,x(Object(s.useState)({subscriptDataList:[]}),2)),l=r[0],c=r[1];Object(s.useEffect)((function(){i()}),[]);var i=function(){var e=C.a.subscribeDetail+"?urlConfId=238";Object(C.c)(e).then((function(e){c(e.data)}))};return m.a.createElement(v.a,{title:"远程配置任务",footer:!1,visible:t,onOk:a,onCancel:a,width:"900px"},m.a.createElement("div",{className:"subscrbe-info"},m.a.createElement("div",{className:"subscrbe-c"},m.a.createElement("div",{className:"subscrbe-t"},"订阅对象"),m.a.createElement("div",{className:"subscrbe-item"},m.a.createElement("div",{className:"item-label"},"订阅名称："),m.a.createElement("div",{className:"item-value"},l.subscription)),m.a.createElement("div",{className:"subscrbe-item"},m.a.createElement("div",{className:"item-label"},"归属产品："),m.a.createElement("div",{className:"item-value"},l.productName)),m.a.createElement("div",{className:"subscrbe-item"},m.a.createElement("div",{className:"item-label"},"订阅设备："),m.a.createElement("div",{className:"item-value"},l.subscription)),m.a.createElement("div",{className:"subscrbe-t"},"配置数据"),m.a.createElement(n.a,{dataSource:l.subscriptDataList,columns:P}),m.a.createElement("div",{className:"subscrbe-t",style:{marginTop:"22px"}},"订阅方式"),m.a.createElement("div",{className:"subscrbe-item"},m.a.createElement("div",{className:"item-label"},"订阅方式："),m.a.createElement("div",{className:"item-value"},l.pushWay?"MQTT主题订阅":"API数据PUSH形式")),m.a.createElement("div",{className:"subscrbe-item"},m.a.createElement("div",{className:"item-label"},"数据订阅URL："),m.a.createElement("div",{className:"item-value"},l.url)),m.a.createElement("div",{className:"subscrbe-item"},m.a.createElement("div",{className:"item-label"},"Token："),m.a.createElement("div",{className:"item-value"},l.pushToken)))))}a("rvOk");var M=a("wd/R"),U=a.n(M);function Q(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function z(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Q(Object(a),!0).forEach((function(t){D(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Q(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function D(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function V(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],c=!0,i=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);c=!0);}catch(e){i=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(i)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Z(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return Z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var W=u.a.Option,Y=o.a.Step;i.a.Search;function L(){var e=V(c.a.useForm(),1)[0],t=V(Object(s.useState)([]),2),a=(t[0],t[1],V(Object(s.useState)({}),2)),f=(a[0],a[1],V(Object(s.useState)([]),2)),p=f[0],v=f[1],E=V(Object(s.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),y=E[0],g=E[1],O=V(Object(s.useState)(!1),2),h=O[0],A=O[1],I=V(Object(s.useState)(null),2),w=I[0],S=I[1],k=V(Object(s.useState)({}),2),x=k[0],R=k[1],P=function(e,t){A(!0),R(t),S(e)},M=V(Object(s.useState)(!1),2),Q=M[0],D=M[1],Z=function(e){console.log(e,99),R(e),D(!0)},L=[{title:"订阅ID",dataIndex:"urlConfId",key:"urlConfId"},{title:"订阅名称",dataIndex:"subscription",key:"subscription"},{title:"订阅方式",dataIndex:"pushWay",key:"pushWay",render:function(e){return m.a.createElement("span",null,e?"MQTT主题订阅":"API数据PUSH形")}},{title:"归属产品名称",dataIndex:"address",key:"address"},{title:"订阅更新时间",dataIndex:"updateTime",key:"updateTime",render:function(e){return m.a.createElement("span",null,e&&U()(e).add(8,"h").format("YYYY-MM-DD HH:mm:ss")||"--")}},{title:"状态",dataIndex:"pushState",key:"pushState",render:function(e){return m.a.createElement("span",null,e?"正常":"停用")}},{title:"操作",render:function(e,t){return m.a.createElement(l.b,{size:"middle"},m.a.createElement("a",{onClick:function(){Z(t)}},"查看"),m.a.createElement("a",{onClick:function(){Z(t)}},"编辑"),t.pushState?m.a.createElement("a",{onClick:function(){P(2,t)}},"停用"):m.a.createElement("a",{onClick:function(){P(1,t)}},"启动"))}}];Object(s.useEffect)((function(){J()}),[y.pageRows,y.pageIndex]);var J=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],a={devicePushUrlConf:z(z({},e.getFieldsValue()),{},{developerId:1}),pager:y};Object(C.c)(C.a.subscribeList,a,{loading:t}).then((function(e){v(e.data.list),g((function(t){var a=JSON.parse(JSON.stringify(t));return Object.assign(a,{totalRows:e.data.pager.totalRows})}))}))},B=V(Object(s.useState)(!1),2),G=B[0],K=B[1];return m.a.createElement("div",{id:"subscribe-data"},m.a.createElement(d.a,{title:"数据订阅"},m.a.createElement("div",{className:"top-select"},m.a.createElement(u.a,{style:{width:200},allowClear:!0},m.a.createElement(W,{value:"0"},"API数据PUSH形式 "),m.a.createElement(W,{value:"1"},"MQTT主题订阅")))),m.a.createElement("div",{className:"comm-shadowbox setp-ttip"},m.a.createElement("div",{className:"step-title"},m.a.createElement("img",{src:b.a,alt:""}),m.a.createElement("span",null,"数据订阅步骤")),m.a.createElement(o.a,{current:-1,initial:0},m.a.createElement(Y,{title:"选择产品",description:"可根据产品订阅以及设备性能标签，选择需要的数据对象。"}),m.a.createElement(Y,{title:"配置订阅内容",description:"可知产品或设备的物模型，订阅详细的功能点数据信息。"}),m.a.createElement(Y,{title:"确定订阅方式",description:"支持数据发送服务或MQTT订阅，两种不同的方式。"}))),m.a.createElement("div",{className:"comm-shadowbox device-content"},m.a.createElement("div",{className:"content-top"},m.a.createElement("div",{className:"content-top-left"},m.a.createElement(c.a,{className:"device-filter-form",form:e,layout:"inline"},m.a.createElement(c.a.Item,{name:"push_way",label:"订阅方式"},m.a.createElement(u.a,{allowClear:!0,style:{width:"200px"}},m.a.createElement(W,{value:"1"},"API数据PUSH形式"),m.a.createElement(W,{value:"0"},"MQTT主题订阅"))),m.a.createElement(c.a.Item,{label:"订阅名称"},m.a.createElement(c.a.Item,{name:"subscription",noStyle:!0},m.a.createElement(i.a,{style:{width:"228px"}})),m.a.createElement(r.a,{type:"primary",onClick:function(){1==y.pageIndex?J():g((function(e){var t=JSON.parse(JSON.stringify(e));return Object.assign(t,{pageIndex:1})}))}},"查询")))),m.a.createElement(r.a,{type:"primary",onClick:function(){K(!0)}},"添加订阅")),m.a.createElement(n.a,{rowKey:"urlConfId",dataSource:p,columns:L,pagination:{defaultCurrent:1,current:y.pageIndex,onChange:function(e,t){t==y.pageRows?g((function(a){var n=JSON.parse(JSON.stringify(a));return Object.assign(n,{pageIndex:e,pageRows:t})})):g((function(e){var a=JSON.parse(JSON.stringify(e));return Object.assign(a,{pageIndex:1,pageRows:t})}))},pageSize:y.pageRows,total:y.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return m.a.createElement("span",null,"共 ",m.a.createElement("a",null,y.totalRows)," 条")}}})),G&&m.a.createElement(j,{isModalVisible:G,cancelModel:function(){K(!1)},colseMoadl:function(){K(!1)}}),h&&m.a.createElement(T,{visible:h,operate:w,actionObj:x,updateOkHandle:function(){return function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(1===w){var t=C.a.subscribeStart+"?urlConfId="+x.urlConfId;Object(C.c)(t,{},{loading:e}).then((function(e){A(!1),Object(N.a)({type:"success",description:"操作成功！"}),J()}))}else{var a=C.a.subscribeClose+"?urlConfId="+x.urlConfId;Object(C.c)(a,{},{loading:e}).then((function(e){A(!1),Object(N.a)({type:"success",description:"操作成功！"}),J()}))}}()},updateCancelHandle:function(){A(!1)}}),Q&&m.a.createElement(H,{rightVisible:Q,onCloseRight:function(){D(!1)},id:x.urlConfId}))}},qSPm:function(e,t,a){},rvOk:function(e,t,a){}}]);