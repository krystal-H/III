(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"0eIn":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAACB0lEQVQ4T32ST2sTQRjGn9nZTTEKBeOtbv1T7zUHi8vmZMCw/QCBYsGT+DH88wEUeoseVTx4USyJFWpVYldaEJQEFROxCVqbi1Q0oWZnXpmZ3XRz0IXd2d2Z9/c+7/s+7HmzFzBChUi4RACZBwgYX6X6p/bQJViXS2fcmjrCXjS+d6QkdywoDdBAA44BitwtzZ2Y1oC1d9uUZDVJyagAYDGrcC4/9Up/AHi6ueVLIepqNzh7kmnAs7ffVISWTFI/RxDObb+Yn1pPA4QCEGHem0kAXzskyTWZk7pjFUlP0srUIYbuvHfKlLD6ZjsgiAqRdEe1GpIGDiWwvjOJ97uHMIhsHJ6IkJsYLu9QtvygzAZaxr8u7wYdsA5i1bbgZSzAYYATrxmOcJhB8b+Awm26agNXksCFWeBRA9Awc19jK5tfAoBVSKoS4mbGXrj1aRq/hw4cbrI/vAhcuLuvwrHQZisbWx1Vf9pAyfvSxxlwMCzmgYXT+4U+bgC1plbyhz15/Vm3jBMvnPeOjWZeDVv+nZZb74uMzq5k31sELt03CjKqHxxtVg3b2jWcc780d3w08+rLD/7Gj1y9uXtk1LzyLLDcMOUooK16UAvb2srGpuPzjyTDWu8ofkbZ8QmY4HBPoMiqYSsgQRWpfBAbJu0HQQytXzn09iYhyEaWiz5jfKkfWddvltngL3uXRG6qfr/OAAAAAElFTkSuQmCC"},"17x9":function(e,t,a){e.exports=a("WUjv")(13)},"420Q":function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("sMBO"),a("pjDv"),a("rB9j"),a("k3Gp");var n=a("kLXV"),r=(a("mbEz"),a("wCAj")),l=a("q1tI"),o=a.n(l),c=a("Nlzp"),i=a("DgvE");a("we4v");function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return m(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function d(e){var t=e.handleCancel,a=e.productId,m=e.isShowDn,d=u(Object(l.useState)([]),2),s=d[0],b=d[1],y=u(Object(l.useState)({pageIndex:1,totalRows:0,pageRows:10}),2);y[0],y[1];Object(l.useEffect)((function(){S()}),[]);var p=[{title:"产品名称",dataIndex:"productName",key:"productName"},{title:"下载时间时间",dataIndex:"createTime",key:"createTime",render:function(e){return e&&i.a.utcToDev(e)}},{title:"配置数量",dataIndex:"applyNum",key:"applyNum"},{title:"操作",dataIndex:"",key:"",render:function(e,t){return o.a.createElement("a",{onClick:function(){f(t.applyId)}},"下载")}}],f=function(e){Object(c.c)(c.a.downRegistFlie,{applyId:e},{loading:!0}).then((function(e){window.open(e.data)}))},S=function(){Object(c.c)(c.a.registerTable,{productId:a}).then((function(e){b(e.data)}))};return o.a.createElement("div",null,o.a.createElement(n.a,{title:"密钥下载",visible:m,onCancel:t,footer:null,width:"750px"},o.a.createElement(r.a,{rowKey:"did",dataSource:s,columns:p})))}},"5CxI":function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return Q}));a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("sMBO"),a("pjDv"),a("rB9j"),a("tkto"),a("TeQF"),a("5DmW"),a("FZtP"),a("27RR"),a("mbEz");var n=a("wCAj"),r=(a("L/Qf"),a("2/Rp")),l=(a("tULf"),a("Vl3Y")),o=(a("1vPl"),a("5rEg")),c=(a("RKNx"),a("L41K")),i=(a("8QGh"),a("2fM7")),u=a("BkRI"),m=a.n(u),d=(a("zKZe"),a("SYor"),a("2B1R"),a("q1tI")),s=a.n(d),b=a("MeRu"),y=a("0eIn"),p=a.n(y),f=a("NsHq"),S=a("Nlzp"),g=a("mU7p"),v=a("DgvE"),N=a("P2RN"),h=a("S18n"),E=(a("Q5Nt"),a("k3Gp"),a("kLXV")),w=(a("QCje"),a("fyUT")),I=(a("5s+n"),a("rVDo")),O=a("rwTb"),j=a("420Q");function A(e){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return k(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return k(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function C(e){var t=e.isModalVisible,a=e.colseMoadl,n=e.cancelModel,r=e.optionArr,o=x(Object(d.useState)(null),2),c=o[0],u=o[1],m=x(Object(d.useState)(!1),2),b=m[0],y=m[1],p=x(l.a.useForm(),1)[0],f=Object(d.useRef)(null),g=Object(d.useMemo)((function(){if("object"!=!A(c))return 0===c?s.a.createElement("span",null,"一型一密",s.a.createElement(O.a,{tip:"设备通信时，仅校验烧录的产品密钥，设备安全性较低。"})):1===c?s.a.createElement("span",null,"一型一密pro",s.a.createElement(O.a,{tip:"设备通信时，需校验烧录的产品密钥以及Clife平台设备注册的设备ID，较为安全。"})):2===c?s.a.createElement("span",null,"一机一密",s.a.createElement(O.a,{tip:"设备通信时，需校验烧录的设备密钥和设备ID，安全性最高。"})):void 0}),[c]);return s.a.createElement("div",null,s.a.createElement(E.a,{title:"注册设备",visible:t,onOk:function(){2!=c?p.validateFields().then((function(e){var t={productId:e.productId,data:e.upload[0].url};Object(S.c)(S.a.proReledExport,t,{loading:!0}).then((function(e){a()}))})).catch((function(e){})):n()},onCancel:n,width:"600px",wrapClassName:"add-protocols-wrap"},s.a.createElement("div",{className:"device-regist"},s.a.createElement(l.a,{form:p,labelAlign:"right"},s.a.createElement(l.a.Item,{name:"productId",label:"产品名称",rules:[{required:!0}]},s.a.createElement(i.a,{onChange:function(e){var t=0;r.forEach((function(a){a.productId===e&&(t=a.authorityType)})),u(t)}},r.map((function(e){return s.a.createElement(i.a.Option,{value:e.productId,key:e.productId},e.productName)})))),s.a.createElement(l.a.Item,{label:"验证方式："},s.a.createElement("span",null,g)),(1===c||0===c)&&s.a.createElement(l.a.Item,{label:"导入设备物理地址"},s.a.createElement(l.a.Item,{name:"upload",noStyle:!0,rules:[{required:!0,message:"请上传文件"}]},s.a.createElement(I.b,{ref:f,maxCount:1,format:".xls,.xlsx",isNotImg:!0,maxSize:10})),s.a.createElement("a",{className:"down-model",onClick:function(){window.open("https://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx")}},"下载模板")),2==c&&s.a.createElement(s.a.Fragment,null,s.a.createElement(l.a.Item,{label:"配置密钥下载数量",name:"number",extra:"最多支持500个，请在【密钥下载】功能中导出配置数据。",rules:[{validator:function(e,t){return t?t>0&&t<=500&&parseInt(t)==t?Promise.resolve():Promise.reject("范围在0~500之间的整数"):Promise.resolve()}}]},s.a.createElement(w.a,{style:{width:"130px",textAlign:"center"},min:1,max:500})),s.a.createElement("a",{className:"regist-product-btn",onClick:function(){var e={num:p.getFieldValue("number"),productId:p.getFieldValue("productId")};e.num?Object(S.c)(S.a.replayRegistFile,e,{loading:!0}).then((function(e){y(!0)})):y(!0)}},"密钥下载"))))),b&&s.a.createElement(j.a,{isShowDn:b,handleCancel:function(){y(!1)},productId:p.getFieldValue("productId")}))}function R(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function V(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?R(Object(a),!0).forEach((function(t){D(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):R(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function D(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function P(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return T(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return T(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var B=i.a.Option,F=c.a.Step,z=o.a.Search;function Q(){var e=P(l.a.useForm(),1)[0],t=P(Object(d.useState)([]),2),a=t[0],o=t[1],u=P(Object(d.useState)([]),2),y=u[0],E=u[1],w=P(Object(d.useState)([]),2),I=w[0],O=w[1],j=P(Object(d.useState)(""),2),A=j[0],x=j[1],k=P(Object(d.useState)([{label:"设备总数量",count:"--"},{label:"已入网设备",count:"--"},{label:"未入网设备",count:"--"}]),2),R=k[0],D=k[1];Object(d.useEffect)((function(){Q(),T()}),[]);var T=function(e){var t={};e&&(t.productId=e),Object(S.c)(S.a.proReledCount,t).then((function(e){D([{label:"设备总数量",count:e.data.total},{label:"已入网设备",count:e.data.activate},{label:"未入网设备",count:e.data.unactivate}])}))},Q=function(){Object(S.c)(S.a.getProductPlus).then((function(e){O(e.data||[])})),Object(S.c)(S.a.allProductPubList).then((function(e){var t=e.data||[];t.unshift({productId:0,productName:"全部产品"}),E(t)}))},M=P(Object(d.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),J=M[0],L=M[1];Object(d.useEffect)((function(){U()}),[J.pageIndex,J.pageRows,A]);var U=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],a=V({},J);-1!=e.getFieldValue("status")&&(a.status=e.getFieldValue("status")),e.getFieldValue("id")&&e.getFieldValue("id").trim()&&(a.id=e.getFieldValue("id")),A&&(a.productId=A),Object(S.c)(S.a.proReledRegist,a,{loading:t}).then((function(e){o(e.data.list),L((function(t){var a=JSON.parse(JSON.stringify(t));return Object.assign(a,{totalRows:e.data.pager.totalRows})}))}))},Z=P(Object(d.useState)(!1),2),H=Z[0],K=Z[1],W=[{title:"设备ID",dataIndex:"did",key:"did"},{title:"物理地址",dataIndex:"physicalAddr",key:"physicalAddr"},{title:"通信验证方式",dataIndex:"authorityType",key:"authorityType",render:function(e){return 0===(t=e)?"一型一密":1===t?"一型一密pro":2===t?"一机一密":void 0;var t}},{title:"归属产品名称",dataIndex:"productName",key:"productName"},{title:"设备秘钥",dataIndex:"deviceSecret",key:"deviceSecret",width:"330px",render:function(e){return s.a.createElement("span",null,s.a.createElement(h.a,{label:e,copy:!1}))}},{title:"入网状态",dataIndex:"status",key:"status",render:function(e){return s.a.createElement("span",null,e?"已入网":"未入网")}},{title:"入网时间",dataIndex:"activeTime",key:"activeTime",render:function(e){return e&&v.a.utcToDev(e)}}];return s.a.createElement("div",{id:"device-regist"},s.a.createElement(b.a,{title:"设备注册"},s.a.createElement("div",{className:"top-select"},s.a.createElement(i.a,{style:{width:150},defaultValue:0,onChange:function(e){L((function(e){var t=m()(e);return Object.assign(t,{pageIndex:1})})),T(e),x(e)}},y.map((function(e){return s.a.createElement(B,{value:e.productId,key:e.productId},e.productName)}))))),s.a.createElement("div",{className:"comm-shadowbox comm-setp-ttip"},s.a.createElement("div",{className:"step-title"},s.a.createElement("img",{src:p.a,alt:""}),s.a.createElement("span",null,"注册设备步骤")),s.a.createElement(c.a,{current:-1,initial:0},s.a.createElement(F,{title:"选择不同校验机制",description:"注册设备，产品发布前，需在配置服务步骤，确定安全通信安全机制。"}),s.a.createElement(F,{title:"注册设备物理地址",description:"Clife平台提供产品密钥验证、产品密钥&设备ID验证、设备ID&设备密钥验证多种安全通信机制。"}),s.a.createElement(F,{title:"查看入网设备",description:"安全级别最高的设备ID&设备密钥验证，即一机一码，需要下载密钥文件。"}))),s.a.createElement(f.a,{data:R}),s.a.createElement("div",{className:"comm-shadowbox device-content"},s.a.createElement("div",{className:"content-top"},s.a.createElement("div",{className:"content-top-left"},s.a.createElement(l.a,{className:"device-filter-form",form:e,layout:"inline",initialValues:{status:"-1"}},s.a.createElement(l.a.Item,{name:"status",label:"入网状态"},s.a.createElement(i.a,{style:{width:"200px"}},g.d.map((function(e){return s.a.createElement(B,{value:e.key,key:e.key},e.value)})))),s.a.createElement(l.a.Item,{label:"设备ID",name:"id"},s.a.createElement(z,{placeholder:"请输入设备ID",onSearch:function(){1===J.pageIndex?U():L((function(e){var t=JSON.parse(JSON.stringify(e));return Object.assign(t,{pageIndex:1})}))},style:{width:"260px"}})))),s.a.createElement("div",null,s.a.createElement(r.a,{type:"primary",onClick:function(){var t={};-1!=e.getFieldValue("status")&&(t.status=e.getFieldValue("status")),e.getFieldValue("id")&&e.getFieldValue("id").trim()&&(t.id=e.getFieldValue("id")),A&&(t.productId=A),Object(S.c)(S.a.exportRegistFile,t,{loading:!0}).then((function(e){window.open(e.data)}))},style:{marginRight:"15px"}},"导出数据"),s.a.createElement(r.a,{type:"primary",onClick:function(){K(!0)}},"注册设备"))),s.a.createElement(n.a,{rowKey:"did",dataSource:a,columns:W,pagination:{defaultCurrent:1,current:J.pageIndex,onChange:function(e,t){t==J.pageRows?L((function(a){var n=JSON.parse(JSON.stringify(a));return Object.assign(n,{pageIndex:e,pageRows:t})})):L((function(e){var a=JSON.parse(JSON.stringify(e));return Object.assign(a,{pageIndex:1,pageRows:t})}))},pageSize:J.pageRows,total:J.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return s.a.createElement("span",null,"共 ",s.a.createElement("a",null,J.totalRows)," 条")}}})),H&&s.a.createElement(C,{isModalVisible:H,cancelModel:function(){K(!1)},colseMoadl:function(){Object(N.a)({type:"success",description:"注册成功！"}),K(!1)},optionArr:I}))}},Q5Nt:function(e,t,a){},mU7p:function(e,t,a){"use strict";a.d(t,"e",(function(){return n})),a.d(t,"a",(function(){return r})),a.d(t,"f",(function(){return l})),a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return c})),a.d(t,"g",(function(){return i})),a.d(t,"c",(function(){return u}));var n={0:"开发中",1:"已发布",2:"审核中"},r={1:"草稿",2:"审核中",3:"灰度版本",4:"正式版本"},l={1:"SDK开发",2:"在线拖拽"},o={0:"草稿",1:"已发布",2:"删除"},c=[{value:"全部状态 ",key:"-1"},{value:"已入网 ",key:"1 "},{key:"0 ",value:"未入网 "}],i=[{Symbol:"无",Name:"无"},{Symbol:"μg/m³",Name:"不知道2"},{Symbol:"mg/m³",Name:"不知道3"},{Symbol:"cal",Name:"卡路里"},{Symbol:"g",Name:"克"},{Symbol:"kg",Name:"千克"},{Symbol:"t",Name:"吨"},{Symbol:"mL",Name:"毫升"},{Symbol:"L",Name:"升"},{Symbol:"℉",Name:"华氏度"},{Symbol:"°C",Name:"摄氏度"},{Symbol:"%RH",Name:"相对湿度"},{Symbol:"nm",Name:"纳米"},{Symbol:"μm",Name:"微米"},{Symbol:"cm",Name:"厘米"},{Symbol:"m",Name:"米"},{Symbol:"km",Name:"千米"},{Symbol:"s",Name:"秒"},{Symbol:"min",Name:"分钟"},{Symbol:"h",Name:"小时"},{Symbol:"day",Name:"日"},{Symbol:"week",Name:"周"},{Symbol:"month",Name:"月"},{Symbol:"year",Name:"年"},{Symbol:"mmHg",Name:"血压"},{Symbol:"mmol/L",Name:"血糖"},{Symbol:"pH",Name:"PH值"},{Symbol:"dS/m",Name:"土壤EC值"},{Symbol:"W/㎡",Name:"太阳总辐射"},{Symbol:"mm/hour",Name:"降雨量"},{Symbol:"N",Name:"牛"},{Symbol:"aw",Name:"饱和度"},{Symbol:"pixel",Name:"像素"},{Symbol:"Lux",Name:"照度"},{Symbol:"grav",Name:"重力加速度"},{Symbol:"dB",Name:"分贝"},{Symbol:"lm",Name:"流明"},{Symbol:"bit",Name:"比特"},{Symbol:"count",Name:"次"},{Symbol:"turn/m",Name:"转每分钟"},{Symbol:"GB",Name:"吉字节"},{Symbol:"MB",Name:"兆字节"},{Symbol:"KB",Name:"千字节"},{Symbol:"B",Name:"字节"},{Symbol:"%",Name:"百分比"},{Symbol:"g/L",Name:"克每升"},{Symbol:"g/m³",Name:"克每立方米"},{Symbol:"kg/m³",Name:"千克每立方米"},{Symbol:"F",Name:"法拉"},{Symbol:"Ω",Name:"欧姆"},{Symbol:"mA",Name:"毫安"},{Symbol:"A",Name:"安培"},{Symbol:"V",Name:"伏特"},{Symbol:"kV",Name:"千伏"},{Symbol:"Hz",Name:"赫兹"},{Symbol:"W",Name:"瓦特"},{Symbol:"Wh",Name:"瓦时"},{Symbol:"eV",Name:"电子伏"},{Symbol:"J",Name:"焦耳"},{Symbol:"kJ",Name:"千焦"},{Symbol:"hPa",Name:"百帕"},{Symbol:"kPa",Name:"千帕"},{Symbol:"cm³",Name:"立方厘米"},{Symbol:"m³",Name:"立方米"},{Symbol:"h㎡",Name:"公顷"},{Symbol:"c㎡",Name:"平方厘米"},{Symbol:"㎡",Name:"平方米"}],u=[{value:1,label:1},{value:10,label:10},{value:100,label:100},{value:1e3,label:1e3},{value:1e4,label:1e4}]},we4v:function(e,t,a){}}]);