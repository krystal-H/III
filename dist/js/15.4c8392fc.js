(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"0eIn":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAACB0lEQVQ4T32ST2sTQRjGn9nZTTEKBeOtbv1T7zUHi8vmZMCw/QCBYsGT+DH88wEUeoseVTx4USyJFWpVYldaEJQEFROxCVqbi1Q0oWZnXpmZ3XRz0IXd2d2Z9/c+7/s+7HmzFzBChUi4RACZBwgYX6X6p/bQJViXS2fcmjrCXjS+d6QkdywoDdBAA44BitwtzZ2Y1oC1d9uUZDVJyagAYDGrcC4/9Up/AHi6ueVLIepqNzh7kmnAs7ffVISWTFI/RxDObb+Yn1pPA4QCEGHem0kAXzskyTWZk7pjFUlP0srUIYbuvHfKlLD6ZjsgiAqRdEe1GpIGDiWwvjOJ97uHMIhsHJ6IkJsYLu9QtvygzAZaxr8u7wYdsA5i1bbgZSzAYYATrxmOcJhB8b+Awm26agNXksCFWeBRA9Awc19jK5tfAoBVSKoS4mbGXrj1aRq/hw4cbrI/vAhcuLuvwrHQZisbWx1Vf9pAyfvSxxlwMCzmgYXT+4U+bgC1plbyhz15/Vm3jBMvnPeOjWZeDVv+nZZb74uMzq5k31sELt03CjKqHxxtVg3b2jWcc780d3w08+rLD/7Gj1y9uXtk1LzyLLDcMOUooK16UAvb2srGpuPzjyTDWu8ofkbZ8QmY4HBPoMiqYSsgQRWpfBAbJu0HQQytXzn09iYhyEaWiz5jfKkfWddvltngL3uXRG6qfr/OAAAAAElFTkSuQmCC"},"17x9":function(e,t,a){e.exports=a("WUjv")(13)},"5CxI":function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return V}));a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("sMBO"),a("pjDv"),a("tkto"),a("TeQF"),a("5DmW"),a("FZtP"),a("27RR"),a("mbEz");var n=a("wCAj"),r=(a("L/Qf"),a("2/Rp")),l=(a("1vPl"),a("5rEg")),o=(a("tULf"),a("Vl3Y")),c=(a("RKNx"),a("L41K")),m=(a("8QGh"),a("2fM7")),i=(a("zKZe"),a("SYor"),a("2B1R"),a("q1tI")),u=a.n(i),s=a("MeRu"),d=a("0eIn"),b=a.n(d),y=a("NsHq"),p=a("Nlzp"),f=a("mU7p"),S=a("DgvE"),N=a("P2RN"),g=a("S18n"),v=(a("Q5Nt"),a("k3Gp"),a("kLXV")),E=a("rVDo"),O=a("rwTb");function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return A(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return A(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function w(e){var t=e.isModalVisible,a=e.colseMoadl,n=e.cancelModel,r=e.optionArr,l=h(o.a.useForm(),1)[0],c=Object(i.useRef)(null),s=h(Object(i.useState)(""),2),d=s[0],b=s[1],y=Object(i.useMemo)((function(){if(d){var e=0;return r.forEach((function(t){t.productId===d&&(e=t.authorityType)})),0===e?u.a.createElement("span",null,"一型一密",u.a.createElement(O.a,{tip:"设备通信时，仅校验烧录的产品密钥，设备安全性较低。"})):1===e?u.a.createElement("span",null,"一型一密plus",u.a.createElement(O.a,{tip:"设备通信时，需校验烧录的产品密钥以及Clife平台设备注册的设备ID，较为安全。"})):2===e?u.a.createElement("span",null,"一机一密",u.a.createElement(O.a,{tip:"设备通信时，需校验烧录的设备密钥和设备ID，安全性最高。"})):void 0}}),[d]);return u.a.createElement(v.a,{title:"注册设备",visible:t,onOk:function(){l.validateFields().then((function(e){var t={productId:e.productId,data:e.upload[0].url};Object(p.c)(p.a.proReledExport,t).then((function(e){a()}))})).catch((function(e){}))},onCancel:n,width:"555px",wrapClassName:"add-protocols-wrap"},u.a.createElement("div",{className:"device-regist"},u.a.createElement(o.a,{form:l,labelAlign:"right"},u.a.createElement(o.a.Item,{name:"productId",label:"产品名称",rules:[{required:!0}]},u.a.createElement(m.a,{onChange:function(e){b(e)}},r.map((function(e){return u.a.createElement(m.a.Option,{value:e.productId,key:e.productId},e.productName)})))),u.a.createElement(o.a.Item,{label:"验证方式："},u.a.createElement("span",null,y)),u.a.createElement(o.a.Item,{label:"导入设备物理地址"},u.a.createElement(o.a.Item,{name:"upload",noStyle:!0,rules:[{required:!0,message:"请上传文件"}]},u.a.createElement(E.b,{ref:c,maxCount:1,format:".xls,.xlsx",isNotImg:!0,maxSize:10})),u.a.createElement("a",{className:"down-model",onClick:function(){window.open("https://skintest.hetyj.com/31438/6b0b20891e06ac31d0eed37a5083cca9.xlsx")}},"下载模板")))))}function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function j(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(Object(a),!0).forEach((function(t){k(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function k(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],o=!0,c=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return C(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return C(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var R=m.a.Option,D=c.a.Step;function V(){var e=x(o.a.useForm(),1)[0],t=x(Object(i.useState)([]),2),a=(t[0],t[1],x(Object(i.useState)({}),2)),d=(a[0],a[1],x(Object(i.useState)([]),2)),v=d[0],E=d[1],O=x(Object(i.useState)([]),2),h=O[0],A=O[1],I=x(Object(i.useState)(""),2),k=I[0],C=I[1],V=x(Object(i.useState)([{label:"设备总数量",count:0},{label:"已入网设备",count:0},{label:"未入网设备",count:0}]),2),P=V[0],T=V[1];Object(i.useEffect)((function(){J(),B()}),[]);var B=function(e){var t={};e&&(t.productId=e),Object(p.c)(p.a.proReledCount,t).then((function(e){T([{label:"设备总数量",count:e.data.total},{label:"已入网设备",count:e.data.activate},{label:"未入网设备",count:e.data.unactivate}])}))},J=function(){Object(p.c)(p.a.getProductPlus,{}).then((function(e){e.data.unshift({productId:0,productName:"全部产品"}),A(e.data)}))},z=x(Object(i.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),Q=z[0],M=z[1];Object(i.useEffect)((function(){L()}),[Q.pageIndex,Q.pageRows,k]);var L=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],a=j({},Q);-1!=e.getFieldValue("status")&&(a.status=e.getFieldValue("status")),e.getFieldValue("id")&&e.getFieldValue("id").trim()&&(a.id=e.getFieldValue("id")),k&&(a.productId=k),Object(p.c)(p.a.proReledRegist,a,{loading:t}).then((function(e){E(e.data.list),M((function(t){var a=JSON.parse(JSON.stringify(t));return Object.assign(a,{totalRows:e.data.pager.totalRows})}))}))},Z=x(Object(i.useState)(!1),2),F=Z[0],U=Z[1],H=[{title:"设备ID",dataIndex:"did",key:"did"},{title:"物理地址",dataIndex:"physicalAddr",key:"physicalAddr"},{title:"通信验证方式",dataIndex:"authorityType",key:"authorityType",render:function(e){return 0===(t=e)?"一型一密":1===t?"一型一密plus":2===t?"一机一密":void 0;var t}},{title:"设备秘钥",dataIndex:"deviceSecret",key:"deviceSecret",width:"330px",render:function(e){return u.a.createElement("span",null,u.a.createElement(g.a,{label:e,copy:!1}))}},{title:"入网状态",dataIndex:"status",key:"status",render:function(e){return u.a.createElement("span",null,e?"已入网":"未入网")}},{title:"入网时间",dataIndex:"activeTime",key:"activeTime",render:function(e){return S.a.utcToDev(e)}}];return u.a.createElement("div",{id:"device-regist"},u.a.createElement(s.a,{title:"设备注册"},u.a.createElement("div",{className:"top-select"},u.a.createElement(m.a,{style:{width:200},defaultValue:0,onChange:function(e){M((function(e){var t=JSON.parse(JSON.stringify(e));return Object.assign(t,{pageIndex:1})})),B(e),C(e)}},h.map((function(e){return u.a.createElement(R,{value:e.productId,key:e.productId},e.productName)}))))),u.a.createElement("div",{className:"comm-shadowbox comm-setp-ttip"},u.a.createElement("div",{className:"step-title"},u.a.createElement("img",{src:b.a,alt:""}),u.a.createElement("span",null,"注册设备步骤")),u.a.createElement(c.a,{current:-1,initial:0},u.a.createElement(D,{title:"选择不同校验机制",description:"注册设备，产品发布前，需在配置服务步骤，确定安全通信安全机制。"}),u.a.createElement(D,{title:"注册设备物理地址",description:"Clife平台提供产品密钥验证、产品密钥&设备ID验证、设备ID&设备密钥验证多种安全通信机制。"}),u.a.createElement(D,{title:"查看入网设备",description:u.a.createElement(u.a.Fragment,null,u.a.createElement("span",null,"Clife平台提供产品密钥验证、产品密钥&设备ID验证、设备ID&设备密钥验证多种安全通信机制。"),u.a.createElement("a",{onClick:function(){}},"下载密钥烧录工具"))}))),u.a.createElement(y.a,{data:P}),u.a.createElement("div",{className:"comm-shadowbox device-content"},u.a.createElement("div",{className:"content-top"},u.a.createElement("div",{className:"content-top-left"},u.a.createElement(o.a,{className:"device-filter-form",form:e,layout:"inline",initialValues:{status:"-1"}},u.a.createElement(o.a.Item,{name:"status",label:"入网状态"},u.a.createElement(m.a,{style:{width:"200px"}},f.d.map((function(e){return u.a.createElement(R,{value:e.key,key:e.key},e.value)})))),u.a.createElement(o.a.Item,{label:"请输入设备ID"},u.a.createElement(o.a.Item,{name:"id",noStyle:!0},u.a.createElement(l.a,{style:{width:"465px"},placeholder:"请输入设备ID"})),u.a.createElement(r.a,{type:"primary",onClick:function(){1===Q.pageIndex?L():M((function(e){var t=JSON.parse(JSON.stringify(e));return Object.assign(t,{pageIndex:1})}))}},"查询")))),u.a.createElement("div",null,u.a.createElement(r.a,{type:"primary",onClick:function(){},style:{marginRight:"15px"}},"导出数据"),u.a.createElement(r.a,{type:"primary",onClick:function(){U(!0)}},"注册设备"))),u.a.createElement(n.a,{rowKey:"did",dataSource:v,columns:H,pagination:{defaultCurrent:1,current:Q.pageIndex,onChange:function(e,t){t==Q.pageRows?M((function(a){var n=JSON.parse(JSON.stringify(a));return Object.assign(n,{pageIndex:e,pageRows:t})})):M((function(e){var a=JSON.parse(JSON.stringify(e));return Object.assign(a,{pageIndex:1,pageRows:t})}))},pageSize:Q.pageRows,total:Q.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return u.a.createElement("span",null,"共 ",u.a.createElement("a",null,Q.totalRows)," 条")}}})),F&&u.a.createElement(w,{isModalVisible:F,cancelModel:function(){U(!1)},colseMoadl:function(){Object(N.a)({type:"success",description:"注册成功！"}),U(!1)},optionArr:h}))}},Q5Nt:function(e,t,a){},mU7p:function(e,t,a){"use strict";a.d(t,"e",(function(){return n})),a.d(t,"a",(function(){return r})),a.d(t,"f",(function(){return l})),a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return c})),a.d(t,"g",(function(){return m})),a.d(t,"c",(function(){return i}));var n={0:"开发中",1:"已发布",2:"审核中"},r={1:"草稿",2:"审核中",3:"灰度版本",4:"正式版本"},l={1:"SDK开发",2:"在线拖拽"},o={0:"草稿",1:"已发布",2:"删除"},c=[{value:"全部状态 ",key:"-1"},{value:"已入网 ",key:"1 "},{key:"0 ",value:"未入网 "}],m=[{Symbol:"cal",Name:"卡路里"},{Symbol:"g",Name:"克"},{Symbol:"kg",Name:"千克"},{Symbol:"t",Name:"吨"},{Symbol:"mL",Name:"毫升"},{Symbol:"L",Name:"升"},{Symbol:"℉",Name:"华氏度"},{Symbol:"°C",Name:"摄氏度"},{Symbol:"%RH",Name:"相对湿度"},{Symbol:"nm",Name:"纳米"},{Symbol:"μm",Name:"微米"},{Symbol:"cm",Name:"厘米"},{Symbol:"m",Name:"米"},{Symbol:"km",Name:"千米"},{Symbol:"s",Name:"秒"},{Symbol:"min",Name:"分钟"},{Symbol:"h",Name:"小时"},{Symbol:"day",Name:"日"},{Symbol:"week",Name:"周"},{Symbol:"month",Name:"月"},{Symbol:"year",Name:"年"},{Symbol:"mmHg",Name:"血压"},{Symbol:"mmol/L",Name:"血糖"},{Symbol:"pH",Name:"PH值"},{Symbol:"dS/m",Name:"土壤EC值"},{Symbol:"W/㎡",Name:"太阳总辐射"},{Symbol:"mm/hour",Name:"降雨量"},{Symbol:"N",Name:"牛"},{Symbol:"aw",Name:"饱和度"},{Symbol:"pixel",Name:"像素"},{Symbol:"Lux",Name:"照度"},{Symbol:"grav",Name:"重力加速度"},{Symbol:"dB",Name:"分贝"},{Symbol:"lm",Name:"流明"},{Symbol:"bit",Name:"比特"},{Symbol:"count",Name:"次"},{Symbol:"turn/m",Name:"转每分钟"},{Symbol:"GB",Name:"吉字节"},{Symbol:"MB",Name:"兆字节"},{Symbol:"KB",Name:"千字节"},{Symbol:"B",Name:"字节"},{Symbol:"%",Name:"百分比"},{Symbol:"g/L",Name:"克每升"},{Symbol:"g/m³",Name:"克每立方米"},{Symbol:"kg/m³",Name:"千克每立方米"},{Symbol:"F",Name:"法拉"},{Symbol:"Ω",Name:"欧姆"},{Symbol:"mA",Name:"毫安"},{Symbol:"A",Name:"安培"},{Symbol:"V",Name:"伏特"},{Symbol:"kV",Name:"千伏"},{Symbol:"Hz",Name:"赫兹"},{Symbol:"W",Name:"瓦特"},{Symbol:"Wh",Name:"瓦时"},{Symbol:"eV",Name:"电子伏"},{Symbol:"J",Name:"焦耳"},{Symbol:"kJ",Name:"千焦"},{Symbol:"hPa",Name:"百帕"},{Symbol:"kPa",Name:"千帕"},{Symbol:"cm³",Name:"立方厘米"},{Symbol:"m³",Name:"立方米"},{Symbol:"h㎡",Name:"公顷"},{Symbol:"c㎡",Name:"平方厘米"},{Symbol:"㎡",Name:"平方米"}],i=[{value:10,label:10},{value:100,label:100},{value:1e3,label:1e3},{value:1e4,label:1e4}]}}]);