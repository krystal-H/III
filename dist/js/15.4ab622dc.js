(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"0eIn":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAACB0lEQVQ4T32ST2sTQRjGn9nZTTEKBeOtbv1T7zUHi8vmZMCw/QCBYsGT+DH88wEUeoseVTx4USyJFWpVYldaEJQEFROxCVqbi1Q0oWZnXpmZ3XRz0IXd2d2Z9/c+7/s+7HmzFzBChUi4RACZBwgYX6X6p/bQJViXS2fcmjrCXjS+d6QkdywoDdBAA44BitwtzZ2Y1oC1d9uUZDVJyagAYDGrcC4/9Up/AHi6ueVLIepqNzh7kmnAs7ffVISWTFI/RxDObb+Yn1pPA4QCEGHem0kAXzskyTWZk7pjFUlP0srUIYbuvHfKlLD6ZjsgiAqRdEe1GpIGDiWwvjOJ97uHMIhsHJ6IkJsYLu9QtvygzAZaxr8u7wYdsA5i1bbgZSzAYYATrxmOcJhB8b+Awm26agNXksCFWeBRA9Awc19jK5tfAoBVSKoS4mbGXrj1aRq/hw4cbrI/vAhcuLuvwrHQZisbWx1Vf9pAyfvSxxlwMCzmgYXT+4U+bgC1plbyhz15/Vm3jBMvnPeOjWZeDVv+nZZb74uMzq5k31sELt03CjKqHxxtVg3b2jWcc780d3w08+rLD/7Gj1y9uXtk1LzyLLDcMOUooK16UAvb2srGpuPzjyTDWu8ofkbZ8QmY4HBPoMiqYSsgQRWpfBAbJu0HQQytXzn09iYhyEaWiz5jfKkfWddvltngL3uXRG6qfr/OAAAAAElFTkSuQmCC"},"17x9":function(e,t,a){e.exports=a("WUjv")(13)},"5CxI":function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return F}));a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("sMBO"),a("pjDv"),a("tkto"),a("TeQF"),a("5DmW"),a("FZtP"),a("27RR"),a("mbEz");var n=a("wCAj"),r=(a("L/Qf"),a("2/Rp")),l=(a("1vPl"),a("5rEg")),o=(a("tULf"),a("Vl3Y")),c=(a("RKNx"),a("L41K")),m=(a("8QGh"),a("2fM7")),i=a("BkRI"),u=a.n(i),s=(a("zKZe"),a("SYor"),a("2B1R"),a("q1tI")),d=a.n(s),b=a("MeRu"),y=a("0eIn"),p=a.n(y),f=a("NsHq"),S=a("Nlzp"),g=a("mU7p"),N=a("DgvE"),v=a("P2RN"),E=a("S18n"),h=(a("Q5Nt"),a("k3Gp"),a("kLXV")),O=a("rVDo"),w=a("rwTb");function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return I(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return I(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function j(e){var t=e.isModalVisible,a=e.colseMoadl,n=e.cancelModel,r=e.optionArr,l=A(o.a.useForm(),1)[0],c=Object(s.useRef)(null),i=A(Object(s.useState)(""),2),u=i[0],b=i[1],y=Object(s.useMemo)((function(){if(u){var e=0;return r.forEach((function(t){t.productId===u&&(e=t.authorityType)})),0===e?d.a.createElement("span",null,"一型一密",d.a.createElement(w.a,{tip:"设备通信时，仅校验烧录的产品密钥，设备安全性较低。"})):1===e?d.a.createElement("span",null,"一型一密plus",d.a.createElement(w.a,{tip:"设备通信时，需校验烧录的产品密钥以及Clife平台设备注册的设备ID，较为安全。"})):2===e?d.a.createElement("span",null,"一机一密",d.a.createElement(w.a,{tip:"设备通信时，需校验烧录的设备密钥和设备ID，安全性最高。"})):void 0}}),[u]);return d.a.createElement(h.a,{title:"注册设备",visible:t,onOk:function(){l.validateFields().then((function(e){var t={productId:e.productId,data:e.upload[0].url};Object(S.c)(S.a.proReledExport,t).then((function(e){a()}))})).catch((function(e){}))},onCancel:n,width:"555px",wrapClassName:"add-protocols-wrap"},d.a.createElement("div",{className:"device-regist"},d.a.createElement(o.a,{form:l,labelAlign:"right"},d.a.createElement(o.a.Item,{name:"productId",label:"产品名称",rules:[{required:!0}]},d.a.createElement(m.a,{onChange:function(e){b(e)}},r.map((function(e){return d.a.createElement(m.a.Option,{value:e.productId,key:e.productId},e.productName)})))),d.a.createElement(o.a.Item,{label:"验证方式："},d.a.createElement("span",null,y)),d.a.createElement(o.a.Item,{label:"导入设备物理地址"},d.a.createElement(o.a.Item,{name:"upload",noStyle:!0,rules:[{required:!0,message:"请上传文件"}]},d.a.createElement(O.b,{ref:c,maxCount:1,format:".xls,.xlsx",isNotImg:!0,maxSize:10})),d.a.createElement("a",{className:"down-model",onClick:function(){window.open("https://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx")}},"下载模板")))))}function k(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function x(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?k(Object(a),!0).forEach((function(t){C(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):k(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function C(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return V(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return V(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var D=m.a.Option,B=c.a.Step;function F(){var e=R(o.a.useForm(),1)[0],t=R(Object(s.useState)([]),2),a=(t[0],t[1],R(Object(s.useState)({}),2)),i=(a[0],a[1],R(Object(s.useState)([]),2)),y=i[0],h=i[1],O=R(Object(s.useState)([]),2),w=O[0],A=O[1],I=R(Object(s.useState)(""),2),k=I[0],C=I[1],V=R(Object(s.useState)([{label:"设备总数量",count:0},{label:"已入网设备",count:0},{label:"未入网设备",count:0}]),2),F=V[0],P=V[1];Object(s.useEffect)((function(){z(),T()}),[]);var T=function(e){var t={};e&&(t.productId=e),Object(S.c)(S.a.proReledCount,t).then((function(e){P([{label:"设备总数量",count:e.data.total},{label:"已入网设备",count:e.data.activate},{label:"未入网设备",count:e.data.unactivate}])}))},z=function(){Object(S.c)(S.a.getProductPlus,{}).then((function(e){e.data.unshift({productId:0,productName:"全部产品"}),A(e.data)}))},J=R(Object(s.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),Q=J[0],M=J[1];Object(s.useEffect)((function(){L()}),[Q.pageIndex,Q.pageRows,k]);var L=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],a=x({},Q);-1!=e.getFieldValue("status")&&(a.status=e.getFieldValue("status")),e.getFieldValue("id")&&e.getFieldValue("id").trim()&&(a.id=e.getFieldValue("id")),k&&(a.productId=k),Object(S.c)(S.a.proReledRegist,a,{loading:t}).then((function(e){h(e.data.list),M((function(t){var a=JSON.parse(JSON.stringify(t));return Object.assign(a,{totalRows:e.data.pager.totalRows})}))}))},Z=R(Object(s.useState)(!1),2),U=Z[0],H=Z[1],W=[{title:"设备ID",dataIndex:"did",key:"did"},{title:"物理地址",dataIndex:"physicalAddr",key:"physicalAddr"},{title:"通信验证方式",dataIndex:"authorityType",key:"authorityType",render:function(e){return 0===(t=e)?"一型一密":1===t?"一型一密plus":2===t?"一机一密":void 0;var t}},{title:"归属产品名称",dataIndex:"productName",key:"productName"},{title:"设备秘钥",dataIndex:"deviceSecret",key:"deviceSecret",width:"330px",render:function(e){return d.a.createElement("span",null,d.a.createElement(E.a,{label:e,copy:!1}))}},{title:"入网状态",dataIndex:"status",key:"status",render:function(e){return d.a.createElement("span",null,e?"已入网":"未入网")}},{title:"入网时间",dataIndex:"activeTime",key:"activeTime",render:function(e){return e&&N.a.utcToDev(e)}}];return d.a.createElement("div",{id:"device-regist"},d.a.createElement(b.a,{title:"设备注册"},d.a.createElement("div",{className:"top-select"},d.a.createElement(m.a,{style:{width:200},defaultValue:0,onChange:function(e){M((function(e){var t=u()(e);return Object.assign(t,{pageIndex:1})})),T(e),C(e)}},w.map((function(e){return d.a.createElement(D,{value:e.productId,key:e.productId},e.productName)}))))),d.a.createElement("div",{className:"comm-shadowbox comm-setp-ttip"},d.a.createElement("div",{className:"step-title"},d.a.createElement("img",{src:p.a,alt:""}),d.a.createElement("span",null,"注册设备步骤")),d.a.createElement(c.a,{current:-1,initial:0},d.a.createElement(B,{title:"选择不同校验机制",description:"注册设备，产品发布前，需在配置服务步骤，确定安全通信安全机制。"}),d.a.createElement(B,{title:"注册设备物理地址",description:"Clife平台提供产品密钥验证、产品密钥&设备ID验证、设备ID&设备密钥验证多种安全通信机制。"}),d.a.createElement(B,{title:"查看入网设备",description:d.a.createElement(d.a.Fragment,null,d.a.createElement("span",null,"Clife平台提供产品密钥验证、产品密钥&设备ID验证、设备ID&设备密钥验证多种安全通信机制。"),d.a.createElement("a",{onClick:function(){alert("暂无")}},"下载密钥烧录工具"))}))),d.a.createElement(f.a,{data:F}),d.a.createElement("div",{className:"comm-shadowbox device-content"},d.a.createElement("div",{className:"content-top"},d.a.createElement("div",{className:"content-top-left"},d.a.createElement(o.a,{className:"device-filter-form",form:e,layout:"inline",initialValues:{status:"-1"}},d.a.createElement(o.a.Item,{name:"status",label:"入网状态"},d.a.createElement(m.a,{style:{width:"200px"}},g.d.map((function(e){return d.a.createElement(D,{value:e.key,key:e.key},e.value)})))),d.a.createElement(o.a.Item,{label:"请输入设备ID"},d.a.createElement(o.a.Item,{name:"id",noStyle:!0},d.a.createElement(l.a,{style:{width:"350px"},placeholder:"请输入设备ID"})),d.a.createElement(r.a,{type:"primary",onClick:function(){1===Q.pageIndex?L():M((function(e){var t=JSON.parse(JSON.stringify(e));return Object.assign(t,{pageIndex:1})}))}},"查询")))),d.a.createElement("div",null,d.a.createElement(r.a,{type:"primary",onClick:function(){var t={};-1!=e.getFieldValue("status")&&(t.status=e.getFieldValue("status")),e.getFieldValue("id")&&e.getFieldValue("id").trim()&&(t.id=e.getFieldValue("id")),k&&(t.productId=k),Object(S.c)(S.a.exportRegistFile,t).then((function(e){window.open(e.data)}))},style:{marginRight:"15px"}},"导出数据"),d.a.createElement(r.a,{type:"primary",onClick:function(){H(!0)}},"注册设备"))),d.a.createElement(n.a,{rowKey:"did",dataSource:y,columns:W,pagination:{defaultCurrent:1,current:Q.pageIndex,onChange:function(e,t){t==Q.pageRows?M((function(a){var n=JSON.parse(JSON.stringify(a));return Object.assign(n,{pageIndex:e,pageRows:t})})):M((function(e){var a=JSON.parse(JSON.stringify(e));return Object.assign(a,{pageIndex:1,pageRows:t})}))},pageSize:Q.pageRows,total:Q.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return d.a.createElement("span",null,"共 ",d.a.createElement("a",null,Q.totalRows)," 条")}}})),U&&d.a.createElement(j,{isModalVisible:U,cancelModel:function(){H(!1)},colseMoadl:function(){Object(v.a)({type:"success",description:"注册成功！"}),H(!1)},optionArr:w}))}},Q5Nt:function(e,t,a){},mU7p:function(e,t,a){"use strict";a.d(t,"e",(function(){return n})),a.d(t,"a",(function(){return r})),a.d(t,"f",(function(){return l})),a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return c})),a.d(t,"g",(function(){return m})),a.d(t,"c",(function(){return i}));var n={0:"开发中",1:"已发布",2:"审核中"},r={1:"草稿",2:"审核中",3:"灰度版本",4:"正式版本"},l={1:"SDK开发",2:"在线拖拽"},o={0:"草稿",1:"已发布",2:"删除"},c=[{value:"全部状态 ",key:"-1"},{value:"已入网 ",key:"1 "},{key:"0 ",value:"未入网 "}],m=[{Symbol:"cal",Name:"卡路里"},{Symbol:"g",Name:"克"},{Symbol:"kg",Name:"千克"},{Symbol:"t",Name:"吨"},{Symbol:"mL",Name:"毫升"},{Symbol:"L",Name:"升"},{Symbol:"℉",Name:"华氏度"},{Symbol:"°C",Name:"摄氏度"},{Symbol:"%RH",Name:"相对湿度"},{Symbol:"nm",Name:"纳米"},{Symbol:"μm",Name:"微米"},{Symbol:"cm",Name:"厘米"},{Symbol:"m",Name:"米"},{Symbol:"km",Name:"千米"},{Symbol:"s",Name:"秒"},{Symbol:"min",Name:"分钟"},{Symbol:"h",Name:"小时"},{Symbol:"day",Name:"日"},{Symbol:"week",Name:"周"},{Symbol:"month",Name:"月"},{Symbol:"year",Name:"年"},{Symbol:"mmHg",Name:"血压"},{Symbol:"mmol/L",Name:"血糖"},{Symbol:"pH",Name:"PH值"},{Symbol:"dS/m",Name:"土壤EC值"},{Symbol:"W/㎡",Name:"太阳总辐射"},{Symbol:"mm/hour",Name:"降雨量"},{Symbol:"N",Name:"牛"},{Symbol:"aw",Name:"饱和度"},{Symbol:"pixel",Name:"像素"},{Symbol:"Lux",Name:"照度"},{Symbol:"grav",Name:"重力加速度"},{Symbol:"dB",Name:"分贝"},{Symbol:"lm",Name:"流明"},{Symbol:"bit",Name:"比特"},{Symbol:"count",Name:"次"},{Symbol:"turn/m",Name:"转每分钟"},{Symbol:"GB",Name:"吉字节"},{Symbol:"MB",Name:"兆字节"},{Symbol:"KB",Name:"千字节"},{Symbol:"B",Name:"字节"},{Symbol:"%",Name:"百分比"},{Symbol:"g/L",Name:"克每升"},{Symbol:"g/m³",Name:"克每立方米"},{Symbol:"kg/m³",Name:"千克每立方米"},{Symbol:"F",Name:"法拉"},{Symbol:"Ω",Name:"欧姆"},{Symbol:"mA",Name:"毫安"},{Symbol:"A",Name:"安培"},{Symbol:"V",Name:"伏特"},{Symbol:"kV",Name:"千伏"},{Symbol:"Hz",Name:"赫兹"},{Symbol:"W",Name:"瓦特"},{Symbol:"Wh",Name:"瓦时"},{Symbol:"eV",Name:"电子伏"},{Symbol:"J",Name:"焦耳"},{Symbol:"kJ",Name:"千焦"},{Symbol:"hPa",Name:"百帕"},{Symbol:"kPa",Name:"千帕"},{Symbol:"cm³",Name:"立方厘米"},{Symbol:"m³",Name:"立方米"},{Symbol:"h㎡",Name:"公顷"},{Symbol:"c㎡",Name:"平方厘米"},{Symbol:"㎡",Name:"平方米"}],i=[{value:10,label:10},{value:100,label:100},{value:1e3,label:1e3},{value:1e4,label:1e4}]}}]);