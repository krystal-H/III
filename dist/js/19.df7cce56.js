(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"JzY+":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAv0lEQVQ4T+XUSwrCMBAG4H/0QFLpXdy4FzxBpfvSA/QKRY8iuFAP1IxMIVBqJjPZarYZvsyL0K5hRua8eyK5tuIiQVbgH4CxRK2t+4YPARgZ2KZivnqYAy1MHnCDKYyAaZ2pC9Qw2uAYAq7L0k0whz07uq3XLgtaWGrhVbBqueYJ92WPpGdSpmSmbYEKMjNVLQYOOM/Tc2DmlCOKgJOWWVEP5cUZvaB+9fRIlVkM5n6ioqFYULw3M/RC7in/PvgBL+qur9K0TXkAAAAASUVORK5CYII="},SlUZ:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return A}));a("ef1R"),a("Ra8s"),a("sfoS"),a("HsXu"),a("bs69"),a("Lm8M"),a("ryEf"),a("qgAm"),a("9b3Y"),a("Ck9u"),a("IHDg"),a("P37N"),a("vV4J"),a("av3G"),a("RfWx"),a("QcZr");var n=a("b+L2"),r=(a("MNU5"),a("YeX6")),l=(a("UdMA"),a("ViyK")),i=(a("SiC7"),a("AePH")),c=(a("6IzV"),a("QFmM")),o=(a("xzjF"),a("PeP6")),u=(a("hEGT"),a("T9Mk")),s=a.n(u),d=a("q5+0"),p=a("MeRu"),f=a("NsHq"),m=a("Nlzp"),g=a("JzY+"),y=a.n(g);a("TI28");function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function v(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(Object(a),!0).forEach((function(t){E(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function E(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function O(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,l=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(n=a.next()).done)&&(l.push(n.value),!t||l.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return w(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return w(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var S=o.a.Option,I=[{label:"当前异常数",count:"--"},{label:"累积设备总数",count:"--"},{label:"累积入网总数",count:"--"},{label:"今日入网总数",count:"--"}];function A(){var e=Object(d.g)(),t=O(Object(u.useState)(I),2),a=t[0],g=t[1],b=O(c.a.useForm(),1)[0],E=O(Object(u.useState)([]),2),w=E[0],A=E[1],h=O(Object(u.useState)(""),2),j=h[0],x=h[1],N=O(Object(u.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),R=N[0],k=N[1];Object(u.useEffect)((function(){P()}),[]),Object(u.useEffect)((function(){C()}),[j,R.pageRows,R.pageIndex]);var C=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=["innet","fault","gatewayType"],a={};for(var n in b.getFieldsValue())t.indexOf(n)>-1&&"string"==typeof b.getFieldsValue()[n]||(a[n]=b.getFieldsValue()[n],"gatewayType"===n&&(a[n]=b.getFieldsValue()[n]-1));var r=v(v({},a),R);j&&(r.productId=j),Object(m.c)(m.a.getDeviceList,r,{loading:e}).then((function(e){A(e.data.list),k((function(t){var a=JSON.parse(JSON.stringify(t));return Object.assign(a,{totalRows:e.data.pager.totalRows})}))}))},P=function(e){var t={};e&&(t.productId=e),Object(m.c)(m.a.devMnCount,t).then((function(e){g([{label:"当前异常数",count:e.data.exception},{label:"累积设备总数",count:e.data.total},{label:"累积入网总数",count:e.data.totalActive},{label:"今日入网总数",count:e.data.todayActive}])}))},V=function(e,t){var a=null;switch(e){case"productClass":if(!isNaN(t)){a=["网关设备","子设备","普通设备"][t-1]}break;case"internetStatus":isNaN(t)||(a=1==t?"已入网":"未入网");break;case"onlineStatus":isNaN(t)||(a=1==t?"在线":"离线");break;case"faultStatus":isNaN(t)||(a=1==t?"正常运行":"故障");break;default:return""}return a},J=[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId"},{title:"物理地址",dataIndex:"deviceMac",key:"deviceMac"},{title:"产品名称",dataIndex:"productName",key:"productName"},{title:"分类",dataIndex:"productType",key:"productType"},{title:"类型",dataIndex:"productClass",key:"productClass",render:function(e){return s.a.createElement("span",null,V("productClass",e))}},{title:"入网状态",dataIndex:"internetStatus",key:"internetStatus",render:function(e,t,a){return s.a.createElement("span",null,V("internetStatus",e))}},{title:"在线状态",dataIndex:"onlineStatus",key:"onlineStatus",render:function(e,t,a){return s.a.createElement("span",null,V("onlineStatus",e))}},{title:"故障状态",dataIndex:"faultStatus",key:"faultStatus",render:function(e,t,a){return s.a.createElement("span",null,V("faultStatus",e))}},{title:"操作",render:function(t,a){return s.a.createElement(i.b,{size:"middle"},s.a.createElement("a",{onClick:function(){var t;t=a,window.sessionStorage.setItem("DEVICE_DETAIL_BASE",JSON.stringify(t)),e.push("/open/device/devManage/detail/".concat(t.deviceUniqueId,"?step=1"))}},"查看"))}}],M=function(){Object(m.c)(m.a.downDeviceFile).then((function(e){window.open(e.data)}))};return s.a.createElement("div",{id:"device-manage"},s.a.createElement(p.a,{title:"设备管理",selectOnchange:function(e){return t=e,k((function(e){var t=JSON.parse(JSON.stringify(e));return Object.assign(t,{pageIndex:1})})),x(t),void P(t);var t}}),s.a.createElement(f.a,{data:a}),s.a.createElement("div",{className:"comm-shadowbox device-main"},s.a.createElement("div",{className:"device-filter"},s.a.createElement(c.a,{className:"device-filter-form",form:b,layout:"inline",initialValues:{innet:"1",online:"1",fault:"1",gatewayType:"1"}},s.a.createElement(c.a.Item,{label:"设备ID/物理地址"},s.a.createElement(l.a.Group,{compact:!0},s.a.createElement(c.a.Item,{name:"infoType",noStyle:!0},s.a.createElement(o.a,{style:{width:"102px"}},s.a.createElement(S,{value:"1"},"设备ID"),s.a.createElement(S,{value:"2"},"物理地址"))),s.a.createElement(c.a.Item,{name:"field",noStyle:!0},s.a.createElement(l.a,{style:{width:"228px"},placeholder:"请输入设备物理地址或者ID"})))),s.a.createElement(c.a.Item,{name:"innet",label:"入网状态"},s.a.createElement(o.a,{style:{width:"102px"}},s.a.createElement(S,{value:"1"},"全部状态"),s.a.createElement(S,{value:1},"已入网"),s.a.createElement(S,{value:0},"未入网"))),s.a.createElement(c.a.Item,{name:"fault",label:"故障状态"},s.a.createElement(o.a,{style:{width:"102px"}},s.a.createElement(S,{value:"1"},"全部状态"),s.a.createElement(S,{value:!1},"正常运行"),s.a.createElement(S,{value:!0},"今日故障"))),s.a.createElement(c.a.Item,{label:" ",colon:!1,style:{marginRight:"2px"}},s.a.createElement(r.a,{type:"primary",onClick:function(){var e=b.getFieldsValue();C(e)}},"查询")),s.a.createElement(c.a.Item,{label:" ",colon:!1,style:{marginRight:"0px"}},s.a.createElement(r.a,{onClick:function(){b.resetFields()}},"重置")))),s.a.createElement("div",{className:"export-wrap"},s.a.createElement("a",{onClick:M},"导出数据"),s.a.createElement("img",{onClick:M,src:y.a,style:{marginRight:"15px"},alt:""})),s.a.createElement("div",null,s.a.createElement(n.a,{rowKey:"deviceId",dataSource:w,columns:J,pagination:{defaultCurrent:1,current:R.pageIndex,onChange:function(e,t){t===R.pageRows?k((function(a){var n=JSON.parse(JSON.stringify(a));return Object.assign(n,{pageIndex:e,pageRows:t})})):k((function(e){var a=JSON.parse(JSON.stringify(e));return Object.assign(a,{pageIndex:1,pageRows:t})}))},pageSize:R.pageRows,total:R.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return s.a.createElement("span",null,"共 ",s.a.createElement("a",null,R.totalRows)," 条")}}}))))}},TI28:function(e,t,a){}}]);