(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"7EV8":function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("62KB"),n("av3G"),n("I9ul");var a=function(e,t,n,a,r){if(!Array.isArray(e))return 1;for(var i=e.map((function(e){return e[r]})),c=e.map((function(e){return e[t]})),o=i[0],l=[[o]],u=0,s=1;s<i.length;s++)i[s]===o?l[u].push(i[s]):(l[u+=1]=[],l[u].push(i[s]),o=i[s]);var d=[];l.forEach((function(e,t){d[t]=[],d[t]=c.splice(0,e.length)}));var f=[];d.forEach((function(e,t){var n=d[t][0],a=0;f[t]=[],f[t][a]=[],e.forEach((function(e,r){n===e?f[t][a].push(e):(a+=1,f[t][a]=[],f[t][a].push(e),n=e)}))}));var m=[];f.forEach((function(e){e.forEach((function(e){m.push(e)}))}));var p=[];m.forEach((function(e){for(var t=e.length,n=0;n<t;n++)p.push(0===n?t:0)}));var b={children:a,props:{}};return b.props.rowSpan=p[n],b}},"VS/T":function(e,t,n){},aoTg:function(e,t,n){},d0cm:function(e,t,n){},hplX:function(e,t,n){},iPVe:function(e,t,n){},qG2J:function(e,t,n){"use strict";n.r(t);n("ef1R"),n("Ra8s"),n("HsXu"),n("bs69"),n("Lm8M"),n("ryEf"),n("qgAm"),n("9b3Y"),n("Ck9u"),n("IHDg"),n("vV4J"),n("av3G"),n("RfWx"),n("QcZr");var a=n("b+L2"),r=(n("MNU5"),n("YeX6")),i=(n("6IzV"),n("QFmM")),c=(n("SmMv"),n("DTgQ")),o=(n("UdMA"),n("ViyK")),l=(n("2ek4"),n("oWtQ")),u=(n("xzjF"),n("PeP6")),s=n("CvKH"),d=n.n(s),f=(n("hEGT"),n("sfoS"),n("gAA8"),n("0Us0"),n("62KB"),n("P37N"),n("T9Mk")),m=n.n(f),p=n("DgvE"),b=n("MeRu"),v=n("wmP4"),y=n.n(v),g=n("TL2v"),h=n("FC04"),O=(n("UTJx"),n("dVdO")),I=(n("pckg"),n("Nlzp")),E=n("wZVF");function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,i=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(a=n.next()).done)&&(i.push(a.value),!t||i.length!==t);c=!0);}catch(e){o=!0,r=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return w(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return w(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function x(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=[];return e.forEach((function(e){e.funcParamList&&e.funcParamList.length&&e.funcParamList.forEach((function(t){var a=JSON.parse(JSON.stringify(e));n.push(S(S({},a),t))}))})),n.forEach((function(e,n){(e.key=n,e.sendData="",e.isCheck=!1,Object.keys(t).length>0)&&JSON.parse(t.remoteProtocol.protocolJson).forEach((function(t){t.funcIdentifier===e.funcIdentifier&&(e.isCheck=!0,("properties"===e.funcType||e.identifier===t.identifier)&&(e.sendData=t.sendData))}))})),n}function A(e,t){var n=e.nextStep,a=e.productId,r=e.editData,i=void 0===r?{}:r,c=j(Object(f.useState)([]),2),o=c[0],l=c[1],u=j(Object(f.useState)(Object.keys(i).length>0?"edit":"add"),1)[0],s=Object(f.useRef)(null);Object(f.useEffect)((function(){d()}),[]);var d=function(){Object(I.c)(I.a.standardFnList,{productId:a},{loading:!0}).then((function(e){var t=e.data.standard.concat(e.data.custom);t=t.filter((function(e){return"服务"===e.funcTypeCN||"属性"===e.funcTypeCN&&"r"!==e.funcParamList[0].accessMode?e:void 0})),t="edit"===u?x(t,i):x(t),l(t)}))},p=function(){s.current.subOrder()};return Object(f.useImperativeHandle)(t,(function(){return{onFinish:p}}),[o]),m.a.createElement(E.a,{dataSource:o,ref:s,finishSub:function(e){sessionStorage.setItem("addConfigData",JSON.stringify(e)),n()},actionType:u})}var P=Object(f.forwardRef)(A),N=(n("59iL"),n("f6Fh")),D=n("9Sz/"),L=n.n(D),T=(n("sSxo"),n("I9ul"),n("V9IP"),n("vERT"),n("OXkf"),n("FIdd")),R=n("rUyw"),U=n("P2RN"),q=["设备ID的长度超过限制","物理地址的长度超限制","设备ID发生重复","物理地址发生重复","设备ID不存在或未联网","物理地址不存在或未联网"];var M=function(e){var t=e.visible,n=e.errorList,r=e.onCancel,i=[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId"},{title:"物理地址",dataIndex:"macAddress",key:"macAddress"},{title:"错误原因",dataIndex:"errorType",width:200,key:"errorType",render:function(e,t){var n=t.errorType;return m.a.createElement("span",null,q[n-1])}}];return m.a.createElement(O.a,{visible:t,width:600,className:"romote-modal",title:"设备导入错误日志",centered:!0,closable:!0,onOk:null,onCancel:r,destroyOnClose:!0,maskClosable:!1,footer:null},m.a.createElement("div",null,m.a.createElement(a.a,{columns:i,dataSource:n||[],pagination:{total:n.length,defaultCurrent:1,defaultPageSize:5,showQuickJumper:!1,hideOnSinglePage:!0,size:"small",showTotal:function(e){return m.a.createElement("span",null,"共 ",m.a.createElement("a",null,e)," 条")}}})))};n("iPVe");function J(e){return function(e){if(Array.isArray(e))return B(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Q(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function F(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?V(Object(n),!0).forEach((function(t){K(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function K(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,i=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(a=n.next()).done)&&(i.push(a.value),!t||i.length!==t);c=!0);}catch(e){o=!0,r=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw r}}return i}(e,t)||Q(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Q(e,t){if(e){if("string"==typeof e)return B(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?B(e,t):void 0}}function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}u.a.Option;var H=o.a.Search,Z=N.a.TabPane;function X(e,t){var n=e.productId,i=e.editData,c=e.onCancel,o=e.getRemoteConfigList,l=z(Object(f.useState)("1"),2),u=l[0],s=l[1],b=z(Object(f.useState)(!1),2),v=b[0],y=b[1],g=z(Object(f.useState)({curDeviceInfoList:[],allDeviceInfoList:[],allDeviceInfoPager:{pageIndex:1,currPageRows:10}}),2),h=g[0],O=g[1],E=z(Object(f.useState)([]),2),j=E[0],w=E[1],k=z(Object(f.useState)({rightAllList:[],rightTempList:[]}),2),S=k[0],C=k[1],x=Object(f.useRef)(null),A=z(Object(f.useState)({allList:[],successList:[],errorList:[],errorVisible:!1}),2),P=A[0],D=A[1],q=z(Object(f.useState)(""),2),V=q[0],K=q[1],Q=z(Object(f.useState)(!1),2),B=Q[0],X=Q[1],G=h.curDeviceInfoList,W=h.allDeviceInfoList,Y=h.allDeviceInfoPager,$=S.rightAllList,_=S.rightTempList,ee=P.allList,te=P.successList,ne=P.errorList,ae=P.errorVisible,re=[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId"},{title:"物理地址",dataIndex:"macAddress",key:"macAddress"},{title:"操作",key:"action",width:50,render:function(e,t){return m.a.createElement("span",{onClick:function(){return oe(t)},className:"remove-single"},"移除")}}],ie=function(){if(0===_.length)return Object(U.a)({description:"请选择要更新的设备数据！"});var e=JSON.parse(sessionStorage.getItem("remoteConfigtaskDesc")),t=sessionStorage.getItem("addConfigData"),n=d()(_);n.forEach((function(e){delete e.key}));var a={taskId:i.taskId||"",taskName:e.taskName||"",taskExplain:e.taskExplain||"",productId:e.productId||"",protocolJson:t,remoteProductDeviceList:n};console.log("最后提交的数据",a),Object(I.c)(I.a.saveRemoteConfig5x,a,{loading:!0}).then((function(e){Object(U.a)({description:"操作成功！",type:"success"}),c(),o()}))};Object(f.useImperativeHandle)(t,(function(){return{onFinish:ie}}),[_]);var ce=function(e,t){var n=d()(e),a=n.findIndex((function(e){return e.deviceUniqueId===t.deviceUniqueId}));return n.splice(a,1),n},oe=function(e){C(F(F({},S),{},{rightAllList:ce($,e),rightTempList:ce(_,e)}));var t=d()(j),n=t.findIndex((function(t){return t===e.deviceUniqueId}));t.splice(n,1),w(t)},le={selectedRowKeys:j,onChange:function(e){console.log(e,"左侧list选中的数据"),w((function(t){var n=d()(t);return L()(n.concat(e))}))}},ue=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";Object(I.c)(I.a.getRemoteDeviceList5x,{productId:n,deviceUniqueId:t,pageIndex:e||Y.pageIndex,pageRows:8},{loading:!0}).then((function(e){var t=e.data,n=t.list,a=void 0===n?[]:n,r=t.pager,i=void 0===r?{}:r,c=[].concat(J(W),J(a));a.forEach((function(e){e.key=e.deviceUniqueId})),O({curDeviceInfoList:a,allDeviceInfoPager:i,allDeviceInfoList:c})})).finally((function(){y(!1)})),w(_.map((function(e){return e.deviceUniqueId})))};Object(f.useEffect)((function(){if(ue(),Object.keys(i).length>0){var e=i.remoteProductDevicePage.list.map((function(e){return{deviceId:e.deviceId,deviceUniqueId:e.deviceUniqueId,macAddress:e.macAddress,key:e.deviceUniqueId}}));C({rightAllList:d()(e),rightTempList:d()(e)}),w(i.remoteProductDevicePage.list.map((function(e){return e.deviceUniqueId})))}}),[]);var se=G;return m.a.createElement("div",{className:"choose-update-device"},m.a.createElement("div",{className:"device-block"},m.a.createElement("p",{className:"device-block-tip"},"选择配置更新的设备"),m.a.createElement("div",{className:"device-block-item padtop0"},m.a.createElement(N.a,{activeKey:u,defaultActiveKey:"1",onChange:function(e){console.log(e),s(e)}},m.a.createElement(Z,{tab:"设备列表",key:"1"},m.a.createElement(H,{enterButton:"查 找",allowClear:!0,loading:v,onSearch:function(e){y(!0),ue(Y.pageIndex,e)},maxLength:50,className:"search-box",placeholder:"请输入设备ID/物理地址查找"}),m.a.createElement(a.a,{columns:[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId",width:140},{title:"物理地址",dataIndex:"macAddress",width:140,key:"macAddress"}],dataSource:se,rowSelection:le,pagination:{total:Y.totalRows,defaultCurrent:1,defaultPageSize:Y.currPageRows,showQuickJumper:!1,hideOnSinglePage:!0,showSizeChanger:!1,size:"small",onChange:function(e){return ue(e)},showTotal:function(e){return m.a.createElement("span",null,"共 ",m.a.createElement("a",null,e)," 条")}}})),m.a.createElement(Z,{tab:"本地导入",key:"2"},B?m.a.createElement("div",null,m.a.createElement("div",{className:"result-area"},m.a.createElement("h3",{className:"excel-style"},V||"--"),m.a.createElement("div",{style:{marginTop:14}},"共".concat(ee.length,"条数据")),m.a.createElement("div",{className:"upload-data"},"成功：",te.length,"条 / ",m.a.createElement("span",{className:"red"},"失败：",ne.length,"条，请修改完成后重上传")),ne.length>0&&m.a.createElement("div",null,m.a.createElement("a",{onClick:function(){return D(F(F({},P),{},{errorVisible:!0}))}},"错误日志"))),m.a.createElement(r.a,{type:"primary",className:"upload-btn martop22",onClick:function(){return X(!1)}},m.a.createElement(T.a,null)," 重新上传")):m.a.createElement("div",{className:"local-import"},m.a.createElement("div",{className:"file-input-wrapper"},m.a.createElement(r.a,{type:"primary",className:"upload-btn"},m.a.createElement(T.a,null)," 选择本地设备数据文件"),m.a.createElement("input",{type:"file",onInput:function(e){var t=e.target;if(t.files&&t.files.length>0){var a=Object(p.d)(t.files,["xls","xlsx"],1e4),r=a.isOk;a.type,a.size;if(!r)return Object(U.a)({description:"文件类型或者大小不符合要求"});var i=t.files[0];Object(I.c)(I.a.importRemoteConfigExcel,{uploadExcel:i,productId:n},{needFormData:!0,loading:!0}).then((function(e){if(e.data){var t=e.data,n=[],a=[];if(t.forEach((function(e,t){var r=e.errorType,i=e.deviceUniqueId,c=e.macAddress;e.key=i,r?a.push({deviceUniqueId:i,macAddress:c,errorType:r,key:i}):n.push(F({},e))})),D(F(F({},P),{},{allList:t,successList:n,errorList:a})),n.length>0){var r=Object(p.n)([].concat(J($),n),"deviceUniqueId");C({rightAllList:r,rightTempList:r})}K(i.name),X(!0)}}))}},accept:".xls,.xlsx"}),m.a.createElement("a",{className:"get-template",onClick:function(){window.open("http://skintest.hetyj.com/b325662c4122f1b8948fe07c9d782ecb.xlsx")}},"设备数据模板")),m.a.createElement("p",{className:"local-import-tip"},"支持xls、xlsx格式，每次添加最多支持20,000个设备，总体文件大小不超过10MB")))))),m.a.createElement("div",{className:"transfer-icon",onClick:function(){var e=W.filter((function(e){return j.includes(e.deviceUniqueId)})),t=Object(p.n)([].concat(J($),J(e)),"deviceUniqueId");x&&(x.current.input.value=""),C({rightAllList:t,rightTempList:t})}}),m.a.createElement("div",{className:"device-block"},m.a.createElement("p",{className:"device-block-tip"},"已选中：",j.length||0,"条"),m.a.createElement("div",{className:"device-block-item"},m.a.createElement(H,{enterButton:"查 找",ref:x,allowClear:!0,onSearch:function(e){var t=J($);if(e&&e.trim()){var n=e.trim();t=$.filter((function(e){var t=e.deviceUniqueId,a=e.macAddress;return t.indexOf(n)>-1||a.indexOf(n)>-1}))}C(F(F({},S),{},{rightTempList:t}))},maxLength:50,placeholder:"请输入设备ID/物理地址查找"}),m.a.createElement("div",{className:"remove-all"},m.a.createElement("a",{className:_.length>0?"":"disable",onClick:function(){_.length>0&&(C({rightAllList:[],rightTempList:[]}),w([]))}},m.a.createElement(R.a,null)," 一键移除")),m.a.createElement(a.a,{className:"config-data-table",columns:re,dataSource:_,pagination:!1,scroll:{y:344}}))),ae&&m.a.createElement(M,{visible:ae,errorList:ne,onCancel:function(){return D(F(F({},P),{},{errorVisible:!1}))}}))}var G=Object(f.forwardRef)(X);n("hplX");function W(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,i=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(a=n.next()).done)&&(i.push(a.value),!t||i.length!==t);c=!0);}catch(e){o=!0,r=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Y(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var $=o.a.TextArea,_=u.a.Option,ee=l.a.Step,te=[{title:"填写任务说明"},{title:"添加配置数据"},{title:"选择配置更新的设备"}];var ne=function(e){var t=e.visible,n=e.onCancel,a=e.allProductList,c=e.editData,s=e.getRemoteConfigList,p=Object(f.useRef)(),b=Object(f.useRef)(),v=W(i.a.useForm(),1)[0],y=W(Object(f.useState)(0),2),g=y[0],h=y[1],I=W(Object(f.useState)(""),2),E=I[0],j=I[1],w=function(){0===g?v.submit():1===g?p.current.onFinish():2===g&&b.current.onFinish()};return m.a.createElement(O.a,{title:"创建任务",centered:!0,destroyOnClose:!0,maskClosable:!1,visible:t,width:1100,onCancel:n,wrapClassName:"remote-config-modal",footer:[0!==g&&m.a.createElement(r.a,{key:"previous",onClick:function(){h(g-1)}},"上一步"),m.a.createElement(r.a,{type:"primary",key:"next",onClick:function(){return w()}},2===g?"提交":"下一步")]},m.a.createElement("div",{className:"remote-config"},m.a.createElement("div",{className:"step-box"},m.a.createElement(l.a,{current:g},te.map((function(e,t){return m.a.createElement(ee,{key:e.title,title:e.title})})))),0===g&&m.a.createElement(i.a,{form:v,name:"filTask",labelCol:{span:4},wrapperCol:{span:18},onFinish:function(e){console.log("Received values of form: ",e),sessionStorage.setItem("remoteConfigtaskDesc",JSON.stringify(e)),j(e.productId);var t=d()(g);h(++t)},onFinishFailed:function(e){console.log("Failed:",e)},initialValues:{productId:c.productId||"",taskName:c.taskName,taskExplain:c.taskExplain}},m.a.createElement(i.a.Item,{label:"归属产品",name:"productId",rules:[{required:!0,message:"请选择归属产品"}]},m.a.createElement(u.a,{style:{width:"100%"},placeholder:"请选择归属产品",showSearch:!0,optionFilterProp:"children"},a&&a.map((function(e){return m.a.createElement(_,{key:e.productId,value:e.productId},e.productName)})))),m.a.createElement(i.a.Item,{label:"任务名称",name:"taskName",rules:[{required:!0,message:"请输入任务名称"},{max:20,message:"最大输入长度为20"}]},m.a.createElement(o.a,{style:{width:"100%"},placeholder:"请输入任务名称，不能超过20个字符"})),m.a.createElement(i.a.Item,{label:"任务说明",name:"taskExplain",rules:[{required:!0,message:"请输入任务说明"}]},m.a.createElement($,{showCount:!0,maxLength:100,placeholder:"请输入任务说明",autoSize:{minRows:4}}))),1===g&&m.a.createElement(P,{ref:p,productId:E,editData:c,nextStep:function(){h(g+1)}}),2===g&&m.a.createElement(G,{ref:b,productId:E,editData:c,onCancel:n,getRemoteConfigList:s})))};n("d0cm");function ae(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,i=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(a=n.next()).done)&&(i.push(a.value),!t||i.length!==t);c=!0);}catch(e){o=!0,r=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return re(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return re(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function re(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function ie(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function ce(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ie(Object(n),!0).forEach((function(t){oe(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ie(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function oe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var le=function(e){var t,n=e.visible,r=e.detailData,i=e.onCancel,c=e.allProductList,o=e.actionType,l=ae(Object(f.useState)([]),2),u=l[0],s=l[1],d=ae(Object(f.useState)([]),2),p=d[0],b=d[1],v=function(){Object(I.c)(I.a.standardFnList,{productId:r.productId},{loading:!0}).then((function(e){var t=e.data.standard.concat(e.data.custom);t=function(e,t){var n=[];return e.forEach((function(e){e.funcParamList&&e.funcParamList.length&&e.funcParamList.forEach((function(t){var a=JSON.parse(JSON.stringify(e));n.push(ce(ce({},a),t))}))})),n.forEach((function(e,n){(e.key=n,e.sendData="",e.isCheck=!1,Object.keys(t).length>0)&&JSON.parse(t.remoteProtocol.protocolJson).forEach((function(t){t.funcIdentifier===e.funcIdentifier&&(e.isCheck=!0,("properties"===e.funcType||e.identifier===t.identifier)&&(e.sendData=t.sendData))}))})),n}(t=t.filter((function(e){return"服务"===e.funcTypeCN||"属性"===e.funcTypeCN&&"r"!==e.funcParamList[0].accessMode?e:void 0})),r),"detail"===o&&(t=t.filter((function(e){return e.isCheck}))),s(t)}))};return Object(f.useEffect)((function(){v()}),[]),Object(f.useEffect)((function(){if(Object.keys(r).length>0){var e=r.remoteProductDevicePage.list.map((function(e){return{deviceId:e.deviceId,deviceUniqueId:e.deviceUniqueId,macAddress:e.macAddress,key:e.deviceUniqueId}}));b(e)}}),[]),m.a.createElement(O.a,{title:"远程配置任务",width:1100,visible:n,onOk:i,onCancel:i,maskClosable:!1,destroyOnClose:!0,wrapClassName:"replace-module-modal"},m.a.createElement("div",{className:"remote-config-detail-modal"},m.a.createElement("div",{className:"title"},"任务说明"),m.a.createElement("div",{className:"task-desc"},m.a.createElement("div",null,m.a.createElement("span",{className:"title"},"归属产品："),(t="",c.forEach((function(e){e.productId===r.productId&&(t=e.productName)})),t)),m.a.createElement("div",null,m.a.createElement("span",{className:"title"},"任务名称："),r.taskName),m.a.createElement("div",null,m.a.createElement("span",{className:"title"},"任务说明："),r.taskExplain)),m.a.createElement("div",{className:"title marT22"},"配置数据"),m.a.createElement("div",null,m.a.createElement(E.a,{dataSource:u,actionType:"detail"})),m.a.createElement("div",{className:"title marT22"},"配置更新的设备"),m.a.createElement("div",null,m.a.createElement(a.a,{className:"config-data-table",columns:[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId"},{title:"物理地址",dataIndex:"macAddress",key:"macAddress"}],dataSource:p,pagination:!1,scroll:{y:155}}))))};n("VS/T");function ue(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function se(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ue(Object(n),!0).forEach((function(t){de(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ue(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function de(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function fe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,i=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(a=n.next()).done)&&(i.push(a.value),!t||i.length!==t);c=!0);}catch(e){o=!0,r=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return me(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return me(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function me(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var pe=u.a.Option,be=l.a.Step,ve=o.a.Search,ye=["平台支持远程更新设备的配置数据，您可以提交远程配置任务，实时对设备的系统参数等数据进行远程更新，并且获取设备配置的更新状态；详细说明可参考文档"],ge=["","待执行","","已执行"];t.default=function(){var e=Object(f.useState)([]),t=fe(e,2),n=t[0],o=(t[1],Object(f.useState)(!1)),s=fe(o,2),v=s[0],O=s[1],E=Object(f.useState)({}),j=fe(E,2),w=j[0],k=j[1],S=Object(f.useState)({}),C=fe(S,2),x=C[0],A=C[1],P=Object(f.useState)(!1),N=fe(P,2),D=N[0],L=N[1],T=Object(f.useState)({pageIndex:1}),R=fe(T,2),q=R[0],M=(R[1],Object(f.useState)({deletevisible:!1,deleteItem:null,deleteLoading:!1})),J=fe(M,2),V=J[0],F=J[1],K=Object(f.useState)([]),z=fe(K,2),Q=z[0],B=z[1],H=Object(f.useState)(""),Z=fe(H,2),X=Z[0],G=Z[1],W=Object(f.useState)(""),Y=fe(W,2),$=Y[0],_=Y[1],ee=Object(f.useState)([]),te=fe(ee,2),ae=te[0],re=te[1],ie=Object(f.useState)({pageIndex:1,totalRows:0,pageRows:6}),ce=fe(ie,2),oe=ce[0],ue=ce[1],de=(q.totalRows,q.pageIndex,q.pageRows,V.deletevisible),me=V.deleteItem,he=V.deleteLoading,Oe=[{title:"任务ID",dataIndex:"taskId",key:"taskId"},{title:"任务名称",dataIndex:"taskName",key:"taskName"},{title:"任务说明",dataIndex:"taskExplain",key:"taskExplain",width:300},{title:"归属产品名称",dataIndex:"productName",key:"productName"},{title:"更新设备数量",dataIndex:"deviceTotal",key:"deviceTotal"},{title:"任务状态",dataIndex:"status",key:"status",render:function(e,t){var n=t.status;return m.a.createElement("span",{className:"h5-statu-".concat(n+1)},ge[n])}},{title:"执行时间",dataIndex:"execTime",key:"execTime",render:function(e,t){var n=t.execTime;return m.a.createElement("span",null,n?p.a.utcToDev(n):"--")}},{title:"操作",key:"action",render:function(e,t){var n=t.status;t.taskId;return m.a.createElement("span",null,""+n=="1"?m.a.createElement(m.a.Fragment,null,m.a.createElement("a",{onClick:function(){return Ie(t)}},"编辑"),m.a.createElement(c.a,{type:"vertical"}),m.a.createElement("a",{onClick:function(){return Ee(t)}},"执行"),m.a.createElement(c.a,{type:"vertical"}),m.a.createElement("a",{onClick:function(){return F({deletevisible:!0,deleteItem:t})}},"删除")):m.a.createElement("a",{onClick:function(){return je(t)}},"查看"))}}],Ie=function(e){e?Object(I.c)(I.a.getRemoteConfig5x,{taskId:e.taskId},{loading:!0}).then((function(e){k(e.data),O(!v)})):O(!v)},Ee=function(e){Object(I.c)(I.a.executeTask5x,{taskId:e.taskId},{loading:!0}).then((function(e){we(),Object(U.a)({description:"执行成功！",type:"success"})}))},je=function(e){Object(I.c)(I.a.getRemoteConfig5x,{taskId:e.taskId},{loading:!0}).then((function(e){A(e.data),L(!0)}))},we=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=se({productId:X,status:-1===$?"":$,taskName:e},oe);Object(I.c)(I.a.getRomoteConfigListByProduct5x,t,{loading:!0}).then((function(e){B(Object(p.b)(e.data.list)),ue((function(t){return Object.assign(d()(t),{totalRows:e.data.pager.totalRows})}))}))};Object(f.useEffect)((function(){we()}),[oe.pageIndex,oe.pageRows,$,X]);var ke=function(){Object(I.c)(I.a.allProductPubList,{loading:!0}).then((function(e){re(e.data)}),(function(){return re([])}))};Object(f.useEffect)((function(){ke(),sessionStorage.removeItem("addConfigData"),sessionStorage.removeItem("remoteConfigtaskDesc")}),[]);var Se=function(e){we(e)},Ce=function(e,t){ue((function(n){return Object.assign(d()(n),{pageIndex:t===oe.pageRows?e:1,pageRows:t})}))},xe=function(){var e=me.taskId;F(se(se({},V),{},{deleteLoading:!0})),Object(I.c)(I.a.deleteRemoteConfig,{taskId:e},{loading:!0}).then((function(e){we()})).finally((function(){F({deletevisible:!1,deleteItem:null,deleteLoading:!1})}))};return m.a.createElement("div",{id:"remote-config"},m.a.createElement(b.a,{title:"远程配置",selectOnchange:function(e){return G(e)},selectData:ae}),m.a.createElement("div",{className:"comm-shadowbox setp-tip comm-setp-ttip"},m.a.createElement("div",{className:"step-title"},m.a.createElement("img",{src:y.a,alt:""}),m.a.createElement("span",null,"远程配置步骤")),m.a.createElement(g.a,{desc:ye,style:{marginBottom:22}}),m.a.createElement(l.a,{current:-1,initial:0},m.a.createElement(be,{title:"创建远程配置任务",description:"创建远程配置任务，填写任务的目的或备注信息。"}),m.a.createElement(be,{title:"添加配置数据",description:"添加要更新的产品配置数据字段和更新的数值。"}),m.a.createElement(be,{title:"选择设备",description:"可通过设备ID/物理地址，设备标签，本地导入确定要配置的设备。"}),m.a.createElement(be,{title:"执行任务",description:"提交执行远程配置任务，设备更新结果实时可见。"}))),m.a.createElement("div",{className:"comm-shadowbox device-content"},m.a.createElement("div",{className:"content-top"},m.a.createElement("div",{className:"content-top-left"},m.a.createElement(i.a,{layout:"inline",labelCol:{span:7},wrapperCol:{span:17}},m.a.createElement(i.a.Item,{label:"任务状态"},m.a.createElement(u.a,{onChange:function(e){return _(e)},style:{width:150,marginRight:40},defaultValue:-1},m.a.createElement(u.a.Option,{value:-1},"全部状态"),ge.filter((function(e){return e})).map((function(e,t){return m.a.createElement(pe,{key:e,value:t+1},e)})))),m.a.createElement(i.a.Item,{label:"任务名称"},m.a.createElement(ve,{placeholder:"请输入任务名称",allowClear:!0,onSearch:Se,style:{width:465}})))),m.a.createElement(r.a,{type:"primary",onClick:function(){return Ie()}},"创建任务")),m.a.createElement(a.a,{columns:Oe,className:"ant-table-fixed",rowKey:"taskId",dataSource:Q,pagination:{defaultCurrent:1,current:oe.pageIndex,pageSize:oe.pageRows,total:oe.totalRows,showSizeChanger:!1,showQuickJumper:oe.totalPages>5,onChange:Ce,showTotal:function(e){return m.a.createElement("span",null,"共 ",m.a.createElement("a",null,e)," 条")}}})),v&&m.a.createElement(ne,{visible:v,allProductList:ae,onCancel:function(){O(!1),k({})},editData:w,configProtoclList:n,getRemoteConfigList:we}),de&&m.a.createElement(h.a,{visible:de,modalOKHandle:xe,modalCancelHandle:function(){return F({deletevisible:!1,deleteItem:null,deleteLoading:!1})},targetName:me.taskId,confirmLoading:he,title:"删除任务",needWarnIcon:!0,descText:"即将删除的任务",tipText:"任务的所有信息将完全被删除，无法找回，请谨慎操作"}),D&&m.a.createElement(le,{visible:D,detailData:x,allProductList:ae,onCancel:function(){return L(!1)}}))}},wZVF:function(e,t,n){"use strict";n("ef1R"),n("Ra8s"),n("sfoS"),n("HsXu"),n("bs69"),n("Lm8M"),n("ryEf"),n("qgAm"),n("9b3Y"),n("Ck9u"),n("QcZr");var a=n("b+L2"),r=(n("UdMA"),n("ViyK")),i=(n("8OUX"),n("KCXd")),c=(n("DBxd"),n("sQtw")),o=(n("xzjF"),n("PeP6")),l=n("CvKH"),u=n.n(l),s=(n("pckg"),n("av3G"),n("P37N"),n("IHDg"),n("62KB"),n("4dS9"),n("T9Mk")),d=n.n(s),f=n("7EV8"),m=n("P2RN");n("aoTg");function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,i=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(a=n.next()).done)&&(i.push(a.value),!t||i.length!==t);c=!0);}catch(e){o=!0,r=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return b(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var v=o.a.Option;function y(e,t){var n=e.dataSource,l=e.finishSub,b=e.actionType,y=p(Object(s.useState)([]),2),g=y[0],h=y[1],O=p(Object(s.useState)([]),2),I=O[0],E=O[1];Object(s.useEffect)((function(){E(u()(n));var e=[];n.forEach((function(t){if(t.isCheck)return-1===e.indexOf(t.funcIdentifier)&&e.push(t.funcIdentifier),t})),h(e)}),[n.length]);var j=function(e,t){var n=u()(I);n[t].sendData=e,E(n)},w=[{title:"勾选",width:"50px",dataIndex:"isCheck",fixed:"left",render:function(e,t,a){var r=Object(f.a)(n,"funcIdentifier",a,t.funcIdentifier,"funcIdentifier");return r.children=d.a.createElement(c.a,{checked:e,onChange:function(e){!function(e,t,n){var a=e.target.checked,r=u()(I);r[n].isCheck=a,E(r),h((function(e){var n=u()(e);return a?n.push(t.funcIdentifier):n=n.filter((function(e){if(e!==t.funcIdentifier)return e})),console.log(n,"勾选"),n}))}(e,t,a)},disabled:"detail"===b}),r}},{title:"功能类型",dataIndex:"funcTypeCN",width:"4%",render:function(e,t,a){return Object(f.a)(n,"funcIdentifier",a,e,"funcTypeCN")}},{title:"功能点名称",dataIndex:"funcName",width:"10%",render:function(e,t,a){return Object(f.a)(n,"funcIdentifier",a,e,"funcName")}},{title:"标识符",dataIndex:"funcIdentifier",width:"10%",render:function(e,t,a){return Object(f.a)(n,"funcIdentifier",a,e,"funcIdentifier")}},{title:"参数名称",dataIndex:"name",width:"12%"},{title:"参数标识",dataIndex:"identifier",width:"10%"},{title:"数据类型",width:"8%",dataIndex:"dataType",render:function(e,t){return d.a.createElement("span",null,t.dataTypCN)}},{title:"数据属性",dataIndex:"propertyMap",render:function(e,t){return d.a.createElement("span",null,function(e){var t=null;switch(e.dataTypeEN){case"float":case"int":t="数值范围：".concat(e.propertyMap.min,"-").concat(e.propertyMap.max,",间距：").concat(e.propertyMap.interval,",倍数：").concat(e.propertyMap.multiple,",单位：").concat(e.propertyMap.unit);break;case"bool":t="0：".concat(e.propertyMap[0],",1：").concat(e.propertyMap[1]);break;case"enum":var n="";for(var a in e.propertyMap)n+=a+"："+e.propertyMap[a]+", ";t="枚举值：".concat(n);break;default:return""}return t}(t))}},{title:"下发数据",dataIndex:"sendData",key:"sendData",fixed:"right",render:function(e,t,n){var a=t.dataTypeEN,c=t.propertyMap,l=null;if("detail"===b)return"bool"===a||"enum"===a?c[e]:e;switch(a){case"int":case"double":case"float":l=d.a.createElement(i.a,{value:t.sendData,min:c.min,max:c.max,onChange:function(e){return j(e,n)},placeholder:"请输入参数"});break;case"text":l=d.a.createElement(r.a,{value:t.sendData,allowClear:!0,maxLength:30,onChange:function(e){return j(e,n)},placeholder:"请输入参数"});break;case"enum":case"bool":l=d.a.createElement(o.a,{onChange:function(e){return j(e,n)},allowClear:!0,value:t.sendData},Object.keys(c)&&Object.keys(c).map((function(e,t){return d.a.createElement(v,{key:t+e,value:Number(e)},c[e])})))}return d.a.createElement("span",null,l)}}];return Object(s.useImperativeHandle)(t,(function(){return{subOrder:function(){var e,t;e=[],t=I.filter((function(t){var n=!0;if(t.sendData||0===t.sendData||(n=!1),0!==t&&g.indexOf(t.funcIdentifier)>-1&&n)return-1===e.indexOf(t.funcIdentifier)&&e.push(t.funcIdentifier),t})),e.length?e.length===g.length?(t=t.map((function(e){return{identifier:"properties"===e.funcType?e.funcIdentifier:e.identifier,sendData:e.sendData,funcIdentifier:e.funcIdentifier}})),l(t)):Object(m.a)({description:"部分勾选数据未配置"}):Object(m.a)({description:"请为配置协议添加参数"})}}}),[g,I]),d.a.createElement("div",null,d.a.createElement(a.a,{rowKey:"key",columns:w,className:"config-data-table",dataSource:I,locale:{emptyText:"暂无协议，请先去配置"},pagination:!1,scroll:{y:440,x:1e3}}))}t.a=Object(s.forwardRef)(y)},wmP4:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABsklEQVQokWWRvW4TQRSFv5nMLE4U8IJEEaFFUUJhCQpA4idNKFJQUiU0eYM8QOqUCCSQeAXShJISCQch4QYqQEHhV3LjmCoKyEnsvZdixrtr+xazO3N3vnPuWfP2c2dPoYEqqqBhQeMehucCwz78vH97fhHAqdIoLkHlcgRU9qGtqOoCsVzRjAAVjapaKI4ARIlSJaC0L1WVEUjhhGKMccCk7XJ+ZTKbIUCqI4zaRpVTgVY3Ze9wlt7AceFMn8a5I1Z3dPrlmumZ1x/bClrOVgH0BbZ/zNE5rpFY8AZ8fCZTtPoJK05VylmJTiS8v++mHBzXSAxs3IEshSe7YBS8YWkmZ9OGVKKqKCLKEPr18CzewMZd+NKBm5fg+lzpwhvWgwMpE64G1csd3sLlFB5cDaFldfh2ECCJJXMKzxQWwGCQmHr4eNbJ8kCm0se7QTmrw8MbkOfw4Td4S9swVs3mr9o/398W1bz15+Kt73/Pz1fDu7cIy1fg+Rtwlq0JwKt3+59U5JqiDMTQ7GYcDWZG/4AFZ2md5KxMAMZrdUen6zmb3rCeWDJvaTvDi5OcR0/XTO8/FFxXqP9J8G8AAAAASUVORK5CYII="}}]);