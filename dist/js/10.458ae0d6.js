(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"VS/T":function(e,t,a){},d0cm:function(e,t,a){},hplX:function(e,t,a){},iPVe:function(e,t,a){},qG2J:function(e,t,a){"use strict";a.r(t);a("ef1R"),a("Ra8s"),a("HsXu"),a("bs69"),a("Lm8M"),a("ryEf"),a("qgAm"),a("9b3Y"),a("Ck9u"),a("IHDg"),a("vV4J"),a("av3G"),a("RfWx"),a("QcZr");var n=a("b+L2"),r=(a("MNU5"),a("YeX6")),i=(a("6IzV"),a("QFmM")),c=(a("SmMv"),a("DTgQ")),l=(a("UdMA"),a("ViyK")),o=(a("2ek4"),a("oWtQ")),s=(a("xzjF"),a("PeP6")),u=a("CvKH"),d=a.n(u),m=(a("hEGT"),a("sfoS"),a("gAA8"),a("0Us0"),a("62KB"),a("P37N"),a("T9Mk")),f=a.n(m),p=a("DgvE"),v=a("MeRu"),g=a("wmP4"),b=a.n(g),y=a("TL2v"),h=a("FC04"),E=(a("UTJx"),a("dVdO")),I=(a("W0kV"),a("caRq")),O=(a("8OUX"),a("KCXd")),k=(a("JiFE"),a("mPWi"),a("V9IP"),a("vERT"),a("OXkf"),a("P2RN")),w=a("Nlzp"),j=a("yq+b"),S=a.n(j);function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],c=!0,l=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);c=!0);}catch(e){l=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(l)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return A(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return A(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var C=s.a.Option;function D(e,t){var a=e.nextStep,r=e.productId,i=e.editData,c=x(Object(m.useState)([]),2),o=c[0],u=c[1],p=x(Object(m.useState)([]),2),v=p[0],g=(p[1],x(Object(m.useState)([]),2)),b=g[0],y=g[1],h=x(Object(m.useState)([]),2),E=(h[0],h[1],function(){if(0===o.length)return Object(k.a)({description:"请至少选择一条配置协议"});for(var e=0;e<o.length;e++)for(var t=o[e],n=0;n<b.length;n++){var r=b[n];if(t===r.identifier&&!r.sendData&&0!=r.sendData)return Object(k.a)({description:"请为配置协议添加参数"})}console.log("提交的数据",b.filter((function(e){return e.sendData})),"*************"),sessionStorage.setItem("addConfigData",JSON.stringify(b.filter((function(e){return e.sendData})))),a()});Object(m.useImperativeHandle)(t,(function(){return{onFinish:E}}),[o,b]);Object(m.useEffect)((function(){Object(w.c)(w.a.getPhysicalModel,{productId:r},{loading:!0}).then((function(e){if(e.data.properties&&e.data.properties.forEach((function(e){e.sendData=""})),Object.keys(i).length>0){var t=JSON.parse(i.remoteProtocol.protocolJson);e.data.properties.forEach((function(e){t.forEach((function(t){t.identifier===e.identifier&&(e.sendData=t.sendData,u((function(e){var a=d()(e);return a.push(t.identifier),a})))}))}))}y(e.data.properties)}))}),[r]),Object(m.useEffect)((function(){console.log(o,"selectedProtocolsselectedProtocolsselectedProtocols")}),[o]);var j=function(e,t){var a=d()(b);a[t].sendData=e,y(a)},A={selectedRowKeys:o,onChange:function(e){u(e)}},D=[{title:"数据名称",dataIndex:"name",key:"name",width:190},{title:"数据标识",dataIndex:"identifier",key:"identifier",width:200},{title:"数据类型",dataIndex:"dataType",key:"dataType",render:function(e,t){return f.a.createElement("span",null,t.dataType.type)}},{title:"数据属性",render:function(e,t){switch(t.dataType.type){case"int":case"double":case"float":return f.a.createElement("span",null,t.dataType.specs.min," ~ ",t.dataType.specs.max);case"text":return"-";case"enum":case"bool":return f.a.createElement("span",null,Object.values(t.dataType.specs).join(" | "));case"date":return"-"}}},{title:"下发数据",dataIndex:"sendData",key:"sendData",render:function(e,t,a){var n=t.dataType,r=n.specs,i=null;switch(n.type){case"int":case"double":case"float":i=f.a.createElement(O.a,{value:t.sendData,min:r.min,max:r.max,onChange:function(e){return j(e,a)},placeholder:"请输入参数"});break;case"text":i=f.a.createElement(l.a,{value:t.sendData,maxLength:30,onChange:function(e){return j(e.target.value.trim(),a)},placeholder:"请输入参数"});break;case"enum":case"bool":i=f.a.createElement(s.a,{value:t.sendData,onChange:function(e){return j(e,a)}},f.a.createElement(C,{key:-1,value:""},"请选择参数"),Object.values(r)&&Object.values(r).map((function(e,t){return f.a.createElement(C,{key:t+e,value:e},e)})));break;case"date":i=f.a.createElement(I.a,{style:{width:182},defaultValue:t.sendData?S()(t.sendData,"YYYY-MM-DD HH:mm:ss"):"",onChange:function(e,t){!function(e,t,a){j(t,a)}(0,t,a)},format:"YYYY-MM-DD HH:mm:ss",showTime:!0,showNow:!0})}return f.a.createElement("span",{className:"config-send-data ".concat(v.includes(a)?"warn":"")},i)}}];return f.a.createElement(n.a,{columns:D,className:"config-data-table",rowSelection:A,dataSource:b,rowKey:"identifier",scroll:{y:300},pagination:!1})}var N=Object(m.forwardRef)(D),T=(a("59iL"),a("f6Fh")),P=a("9Sz/"),L=a.n(P),R=(a("sSxo"),a("I9ul"),a("pckg"),a("FIdd")),U=a("rUyw"),q=["设备ID的长度超过限制","物理地址的长度超限制","设备ID发生重复","物理地址发生重复","设备ID不存在或未联网","物理地址不存在或未联网"];var J=function(e){var t=e.visible,a=e.errorList,r=e.onCancel,i=[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId"},{title:"物理地址",dataIndex:"macAddress",key:"macAddress"},{title:"错误原因",dataIndex:"errorType",width:200,key:"errorType",render:function(e,t){var a=t.errorType;return f.a.createElement("span",null,q[a-1])}}];return f.a.createElement(E.a,{visible:t,width:600,className:"romote-modal",title:"设备导入错误日志",centered:!0,closable:!0,onOk:null,onCancel:r,destroyOnClose:!0,maskClosable:!1,footer:null},f.a.createElement("div",null,f.a.createElement(n.a,{columns:i,dataSource:a||[],pagination:{total:a.length,defaultCurrent:1,defaultPageSize:5,showQuickJumper:!1,hideOnSinglePage:!0,size:"small",showTotal:function(e){return f.a.createElement("span",null,"共 ",f.a.createElement("a",null,e)," 条")}}})))};a("iPVe");function M(e){return function(e){if(Array.isArray(e))return Y(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||Q(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function K(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function V(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?K(Object(a),!0).forEach((function(t){F(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):K(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function F(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],c=!0,l=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);c=!0);}catch(e){l=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(l)throw r}}return i}(e,t)||Q(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Q(e,t){if(e){if("string"==typeof e)return Y(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Y(e,t):void 0}}function Y(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}s.a.Option;var H=l.a.Search,W=T.a.TabPane;function B(e,t){var a=e.productId,i=e.editData,c=e.onCancel,l=e.getRemoteConfigList,o=z(Object(m.useState)("1"),2),s=o[0],u=o[1],v=z(Object(m.useState)(!1),2),g=v[0],b=v[1],y=z(Object(m.useState)({curDeviceInfoList:[],allDeviceInfoList:[],allDeviceInfoPager:{pageIndex:1,currPageRows:10}}),2),h=y[0],E=y[1],I=z(Object(m.useState)([]),2),O=I[0],j=I[1],S=z(Object(m.useState)({rightAllList:[],rightTempList:[]}),2),x=S[0],A=S[1],C=Object(m.useRef)(null),D=z(Object(m.useState)({allList:[],successList:[],errorList:[],errorVisible:!1}),2),N=D[0],P=D[1],q=z(Object(m.useState)(""),2),K=q[0],F=q[1],Q=z(Object(m.useState)(!1),2),Y=Q[0],B=Q[1],X=h.curDeviceInfoList,G=h.allDeviceInfoList,Z=h.allDeviceInfoPager,$=x.rightAllList,_=x.rightTempList,ee=N.allList,te=N.successList,ae=N.errorList,ne=N.errorVisible,re=[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId"},{title:"物理地址",dataIndex:"macAddress",key:"macAddress"},{title:"操作",key:"action",width:50,render:function(e,t){return f.a.createElement("span",{onClick:function(){return le(t)},className:"remove-single"},"移除")}}],ie=function(){if(0===_.length)return Object(k.a)({description:"请选择要更新的设备数据！"});var e=JSON.parse(sessionStorage.getItem("remoteConfigtaskDesc")),t=JSON.parse(sessionStorage.getItem("addConfigData")),a=d()(_);a.forEach((function(e){delete e.key}));var n={taskId:i.taskId||"",taskName:e.taskName||"",taskExplain:e.taskExplain||"",productId:e.productId||"",protocolJson:t,remoteProductDeviceList:a};console.log("最后提交的数据",n),Object(w.c)(w.a.saveRemoteConfig5x,n,{loading:!0}).then((function(e){Object(k.a)({description:"操作成功！",type:"success"}),c(),l()}))};Object(m.useImperativeHandle)(t,(function(){return{onFinish:ie}}),[_]);var ce=function(e,t){var a=d()(e),n=a.findIndex((function(e){return e.deviceUniqueId===t.deviceUniqueId}));return a.splice(n,1),a},le=function(e){A(V(V({},x),{},{rightAllList:ce($,e),rightTempList:ce(_,e)}));var t=d()(O),a=t.findIndex((function(t){return t===e.deviceUniqueId}));t.splice(a,1),j(t)},oe={selectedRowKeys:O,onChange:function(e){console.log(e,"左侧list选中的数据"),j((function(t){var a=d()(t);return L()(a.concat(e))}))}},se=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";Object(w.c)(w.a.getRemoteDeviceList5x,{productId:a,deviceUniqueId:t,pageIndex:e||Z.pageIndex,pageRows:8},{loading:!0}).then((function(e){var t=e.data,a=t.list,n=void 0===a?[]:a,r=t.pager,i=void 0===r?{}:r,c=[].concat(M(G),M(n));n.forEach((function(e){e.key=e.deviceUniqueId})),E({curDeviceInfoList:n,allDeviceInfoPager:i,allDeviceInfoList:c})})).finally((function(){b(!1)})),j(_.map((function(e){return e.deviceUniqueId})))};Object(m.useEffect)((function(){if(se(),Object.keys(i).length>0){var e=i.remoteProductDevicePage.list.map((function(e){return{deviceId:e.deviceId,deviceUniqueId:e.deviceUniqueId,macAddress:e.macAddress,key:e.deviceUniqueId}}));A({rightAllList:d()(e),rightTempList:d()(e)}),console.log(i.remoteProductDevicePage.list.map((function(e){return e.deviceUniqueId})),"/////"),j(i.remoteProductDevicePage.list.map((function(e){return e.deviceUniqueId})))}}),[]);var ue=X;return f.a.createElement("div",{className:"choose-update-device"},f.a.createElement("div",{className:"device-block"},f.a.createElement("p",{className:"device-block-tip"},"选择配置更新的设备"),f.a.createElement("div",{className:"device-block-item padtop0"},f.a.createElement(T.a,{activeKey:s,defaultActiveKey:"1",onChange:function(e){console.log(e),u(e)}},f.a.createElement(W,{tab:"设备列表",key:"1"},f.a.createElement(H,{enterButton:"查 找",allowClear:!0,loading:g,onSearch:function(e){b(!0),se(Z.pageIndex,e)},maxLength:50,className:"search-box",placeholder:"请输入设备ID/物理地址查找"}),f.a.createElement(n.a,{columns:[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId",width:140},{title:"物理地址",dataIndex:"macAddress",width:140,key:"macAddress"}],dataSource:ue,rowSelection:oe,pagination:{total:Z.totalRows,defaultCurrent:1,defaultPageSize:Z.currPageRows,showQuickJumper:!1,hideOnSinglePage:!0,showSizeChanger:!1,size:"small",onChange:function(e){return se(e)},showTotal:function(e){return f.a.createElement("span",null,"共 ",f.a.createElement("a",null,e)," 条")}}})),f.a.createElement(W,{tab:"本地导入",key:"2"},Y?f.a.createElement("div",null,f.a.createElement("div",{className:"result-area"},f.a.createElement("h3",{className:"excel-style"},K||"--"),f.a.createElement("div",{style:{marginTop:14}},"共".concat(ee.length,"条数据")),f.a.createElement("div",{className:"upload-data"},"成功：",te.length,"条 / ",f.a.createElement("span",{className:"red"},"失败：",ae.length,"条，请修改完成后重上传")),ae.length>0&&f.a.createElement("div",null,f.a.createElement("a",{onClick:function(){return P(V(V({},N),{},{errorVisible:!0}))}},"错误日志"))),f.a.createElement(r.a,{type:"primary",className:"upload-btn martop22",onClick:function(){return B(!1)}},f.a.createElement(R.a,null)," 重新上传")):f.a.createElement("div",{className:"local-import"},f.a.createElement("div",{className:"file-input-wrapper"},f.a.createElement(r.a,{type:"primary",className:"upload-btn"},f.a.createElement(R.a,null)," 选择本地设备数据文件"),f.a.createElement("input",{type:"file",onInput:function(e){var t=e.target;if(t.files&&t.files.length>0){var n=Object(p.d)(t.files,["xls","xlsx"],1e4),r=n.isOk;n.type,n.size;if(!r)return Object(k.a)({description:"文件类型或者大小不符合要求"});var i=t.files[0];Object(w.c)(w.a.importRemoteConfigExcel,{uploadExcel:i,productId:a},{needFormData:!0,loading:!0}).then((function(e){if(e.data){var t=e.data,a=[],n=[];if(t.forEach((function(e,t){var r=e.errorType,i=e.deviceUniqueId,c=e.macAddress;e.key=i,r?n.push({deviceUniqueId:i,macAddress:c,errorType:r,key:i}):a.push(V({},e))})),P(V(V({},N),{},{allList:t,successList:a,errorList:n})),a.length>0){var r=Object(p.m)([].concat(M($),a),"deviceUniqueId");A({rightAllList:r,rightTempList:r})}F(i.name),B(!0)}}))}},accept:".xls,.xlsx"}),f.a.createElement("a",{className:"get-template",onClick:function(){window.open("http://skintest.hetyj.com/b325662c4122f1b8948fe07c9d782ecb.xlsx")}},"设备数据模板")),f.a.createElement("p",{className:"local-import-tip"},"支持xls、xlsx格式，每次添加最多支持20,000个设备，总体文件大小不超过10MB")))))),f.a.createElement("div",{className:"transfer-icon",onClick:function(){var e=G.filter((function(e){return O.includes(e.deviceUniqueId)})),t=Object(p.m)([].concat(M($),M(e)),"deviceUniqueId");C&&(C.current.input.value=""),A({rightAllList:t,rightTempList:t})}}),f.a.createElement("div",{className:"device-block"},f.a.createElement("p",{className:"device-block-tip"},"已选中：",O.length||0,"条"),f.a.createElement("div",{className:"device-block-item"},f.a.createElement(H,{enterButton:"查 找",ref:C,allowClear:!0,onSearch:function(e){var t=M($);if(e&&e.trim()){var a=e.trim();t=$.filter((function(e){var t=e.deviceUniqueId,n=e.macAddress;return t.indexOf(a)>-1||n.indexOf(a)>-1}))}A(V(V({},x),{},{rightTempList:t}))},maxLength:50,placeholder:"请输入设备ID/物理地址查找"}),f.a.createElement("div",{className:"remove-all"},f.a.createElement("a",{className:_.length>0?"":"disable",onClick:function(){A({rightAllList:[],rightTempList:[]}),j([])}},f.a.createElement(U.a,null)," 一键移除")),f.a.createElement(n.a,{className:"config-data-table",columns:re,dataSource:_,pagination:!1,scroll:{y:344}}))),ne&&f.a.createElement(J,{visible:ne,errorList:ae,onCancel:function(){return P(V(V({},N),{},{errorVisible:!1}))}}))}var X=Object(m.forwardRef)(B);a("hplX");function G(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],c=!0,l=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);c=!0);}catch(e){l=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(l)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return Z(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return Z(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Z(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var $=l.a.TextArea,_=s.a.Option,ee=o.a.Step,te=[{title:"填写任务说明"},{title:"添加配置数据"},{title:"选择配置更新的设备"}];var ae=function(e){var t=e.visible,a=e.onCancel,n=e.allProductList,c=e.editData,u=e.getRemoteConfigList,p=Object(m.useRef)(),v=Object(m.useRef)(),g=G(i.a.useForm(),1)[0],b=G(Object(m.useState)(0),2),y=b[0],h=b[1],I=G(Object(m.useState)(""),2),O=I[0],k=I[1],w=function(){0===y?g.submit():1===y?(console.log(p,"-----------refConfig"),p.current.onFinish()):2===y&&(console.log(v,"-----------refDevice"),v.current.onFinish())};return f.a.createElement(E.a,{title:"创建任务",centered:!0,destroyOnClose:!0,maskClosable:!1,visible:t,width:1100,onCancel:a,wrapClassName:"remote-config-modal",footer:[0!==y&&f.a.createElement(r.a,{key:"previous",onClick:function(){h(y-1)}},"上一步"),f.a.createElement(r.a,{type:"primary",key:"next",onClick:function(){return w()}},2===y?"提交":"下一步")]},f.a.createElement("div",{className:"remote-config"},f.a.createElement("div",{className:"step-box"},f.a.createElement(o.a,{current:y},te.map((function(e,t){return f.a.createElement(ee,{key:e.title,title:e.title})})))),0===y&&f.a.createElement(i.a,{form:g,name:"filTask",labelCol:{span:4},wrapperCol:{span:18},onFinish:function(e){console.log("Received values of form: ",e),sessionStorage.setItem("remoteConfigtaskDesc",JSON.stringify(e)),k(e.productId);var t=d()(y);h(++t)},onFinishFailed:function(e){console.log("Failed:",e)},initialValues:{productId:c.productId||"",taskName:c.taskName,taskExplain:c.taskExplain}},f.a.createElement(i.a.Item,{label:"归属产品",name:"productId",rules:[{required:!0,message:"请选择归属产品"}]},f.a.createElement(s.a,{style:{width:"100%"},placeholder:"请选择归属产品"},n&&n.map((function(e){return f.a.createElement(_,{key:e.productId,value:e.productId},e.productName)})))),f.a.createElement(i.a.Item,{label:"任务名称",name:"taskName",rules:[{required:!0,message:"请输入任务名称"},{max:20,message:"最大输入长度为20"}]},f.a.createElement(l.a,{style:{width:"100%"},placeholder:"请输入任务名称，不能超过20个字符"})),f.a.createElement(i.a.Item,{label:"任务说明",name:"taskExplain",rules:[{required:!0,message:"请输入任务说明"}]},f.a.createElement($,{showCount:!0,maxLength:100,placeholder:"请输入任务说明",autoSize:{minRows:4}}))),1===y&&f.a.createElement(N,{ref:p,productId:O,editData:c,nextStep:function(){h(y+1)}}),2===y&&f.a.createElement(X,{ref:v,productId:O,editData:c,onCancel:a,getRemoteConfigList:u})))};a("d0cm");function ne(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],c=!0,l=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);c=!0);}catch(e){l=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(l)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return re(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return re(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function re(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var ie=function(e){var t,a=e.visible,r=e.detailData,i=e.onCancel,c=e.allProductList,l=ne(Object(m.useState)([]),2),o=l[0],s=l[1],u=ne(Object(m.useState)([]),2),d=u[0],p=u[1],v=[{title:"数据名称",dataIndex:"name",key:"name",width:190},{title:"数据标识",dataIndex:"identifier",key:"identifier",width:200},{title:"数据类型",dataIndex:"dataType",key:"dataType",render:function(e,t){return f.a.createElement("span",null,t.dataType.type)}},{title:"数据属性",render:function(e,t){switch(t.dataType.type){case"int":case"double":case"float":return f.a.createElement("span",null,t.dataType.specs.min," ~ ",t.dataType.specs.max);case"text":return"-";case"enum":case"bool":return f.a.createElement("span",null,Object.values(t.dataType.specs).join(" | "));case"date":return"-"}}},{title:"下发数据",dataIndex:"sendData",key:"sendData",render:function(e,t,a){return f.a.createElement("span",{className:"config-send-data"},t.sendData||"")}}];return Object(m.useEffect)((function(){Object(w.c)(w.a.getPhysicalModel,{productId:r.productId},{loading:!0}).then((function(e){if(e.data.properties&&e.data.properties.forEach((function(e){e.sendData=""})),Object.keys(r).length>0){var t=JSON.parse(r.remoteProtocol.protocolJson);e.data.properties.forEach((function(e){t.forEach((function(t){t.identifier===e.identifier&&(e.sendData=t.sendData)}))}))}s(e.data.properties)}))}),[]),Object(m.useEffect)((function(){if(Object.keys(r).length>0){var e=r.remoteProductDevicePage.list.map((function(e){return{deviceId:e.deviceId,deviceUniqueId:e.deviceUniqueId,macAddress:e.macAddress,key:e.deviceUniqueId}}));p(e)}}),[]),f.a.createElement(E.a,{title:"远程配置任务",width:1100,visible:a,onOk:i,onCancel:i,maskClosable:!1,destroyOnClose:!0,wrapClassName:"replace-module-modal"},f.a.createElement("div",{className:"remote-config-detail-modal"},f.a.createElement("div",{className:"title"},"任务说明"),f.a.createElement("div",{className:"task-desc"},f.a.createElement("div",null,f.a.createElement("span",{className:"title"},"归属产品："),(t="",c.forEach((function(e){e.productId===r.productId&&(t=e.productName)})),t)),f.a.createElement("div",null,f.a.createElement("span",{className:"title"},"任务名称："),r.taskName),f.a.createElement("div",null,f.a.createElement("span",{className:"title"},"任务说明："),r.taskExplain)),f.a.createElement("div",{className:"title marT22"},"配置数据"),f.a.createElement("div",null,f.a.createElement(n.a,{columns:v,className:"config-data-table",dataSource:o,rowKey:"identifier",scroll:{y:140},pagination:!1})),f.a.createElement("div",{className:"title marT22"},"配置更新的设备"),f.a.createElement("div",null,f.a.createElement(n.a,{className:"config-data-table",columns:[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId"},{title:"物理地址",dataIndex:"macAddress",key:"macAddress"}],dataSource:d,pagination:!1,scroll:{y:155}}))))};a("VS/T");function ce(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function le(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ce(Object(a),!0).forEach((function(t){oe(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ce(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function oe(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function se(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],c=!0,l=!1;try{for(a=a.call(e);!(c=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);c=!0);}catch(e){l=!0,r=e}finally{try{c||null==a.return||a.return()}finally{if(l)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ue(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return ue(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ue(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var de=s.a.Option,me=o.a.Step,fe=l.a.Search,pe=["平台支持远程更新设备的配置数据，您可以提交远程配置任务，实时对设备的系统参数等数据进行远程更新，并且获取设备配置的更新状态；详细说明可参考文档"],ve=["","待执行","执行中","已执行"];t.default=function(){var e=Object(m.useState)([]),t=se(e,2),a=t[0],l=(t[1],Object(m.useState)(!1)),u=se(l,2),g=u[0],E=u[1],I=Object(m.useState)({}),O=se(I,2),j=O[0],S=O[1],x=Object(m.useState)({}),A=se(x,2),C=A[0],D=A[1],N=Object(m.useState)(!1),T=se(N,2),P=T[0],L=T[1],R=Object(m.useState)({pageIndex:1}),U=se(R,2),q=U[0],J=(U[1],Object(m.useState)({deletevisible:!1,deleteItem:null,deleteLoading:!1})),M=se(J,2),K=M[0],V=M[1],F=Object(m.useState)([]),z=se(F,2),Q=z[0],Y=z[1],H=Object(m.useState)(""),W=se(H,2),B=W[0],X=W[1],G=Object(m.useState)(""),Z=se(G,2),$=Z[0],_=Z[1],ee=Object(m.useState)([]),te=se(ee,2),ne=te[0],re=te[1],ce=Object(m.useState)({pageIndex:1,totalRows:0,pageRows:6}),oe=se(ce,2),ue=oe[0],ge=oe[1],be=(q.totalRows,q.pageIndex,q.pageRows,K.deletevisible),ye=K.deleteItem,he=K.deleteLoading,Ee=[{title:"任务ID",dataIndex:"taskId",key:"taskId"},{title:"任务名称",dataIndex:"taskName",key:"taskName"},{title:"任务说明",dataIndex:"taskExplain",key:"taskExplain",width:300},{title:"归属产品名称",dataIndex:"productName",key:"productName"},{title:"更新设备数量",dataIndex:"deviceTotal",key:"deviceTotal"},{title:"任务状态",dataIndex:"status",key:"status",render:function(e,t){var a=t.status;return f.a.createElement("span",{className:"h5-statu-".concat(a+1)},ve[a])}},{title:"执行时间",dataIndex:"execTime",key:"execTime",render:function(e,t){var a=t.execTime;return f.a.createElement("span",null,a?p.a.utcToDev(a):"--")}},{title:"操作",key:"action",render:function(e,t){var a=t.status;t.taskId;return f.a.createElement("span",null,""+a=="1"?f.a.createElement(f.a.Fragment,null,f.a.createElement("a",{onClick:function(){return Ie(t)}},"编辑"),f.a.createElement(c.a,{type:"vertical"}),f.a.createElement("a",{onClick:function(){return Oe(t)}},"执行"),f.a.createElement(c.a,{type:"vertical"}),f.a.createElement("a",{onClick:function(){return V({deletevisible:!0,deleteItem:t})}},"删除")):f.a.createElement("a",{onClick:function(){return ke(t)}},"查看"))}}],Ie=function(e){e?Object(w.c)(w.a.getRemoteConfig5x,{taskId:e.taskId},{loading:!0}).then((function(e){S(e.data),E(!g)})):E(!g)},Oe=function(e){Object(w.c)(w.a.executeTask5x,{taskId:e.taskId},{loading:!0}).then((function(e){we(),Object(k.a)({description:"执行成功！",type:"success"})}))},ke=function(e){Object(w.c)(w.a.getRemoteConfig5x,{taskId:e.taskId},{loading:!0}).then((function(e){D(e.data),L(!0)}))},we=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=le({productId:B,status:e,taskName:t},ue);Object(w.c)(w.a.getRomoteConfigListByProduct5x,a,{loading:!0}).then((function(e){Y(Object(p.b)(e.data.list)),ge((function(t){return Object.assign(d()(t),{totalRows:e.data.pager.totalRows})}))}))};Object(m.useEffect)((function(){we()}),[ue.pageIndex,ue.pageRows,$,B]);var je=function(){Object(w.b)(w.a.cloudGetProductList,{loading:!0}).then((function(e){re(e.data)}),(function(){return re([])}))};Object(m.useEffect)((function(){je()}),[]);var Se=function(e){we($,e)},xe=function(e,t){ge((function(a){return Object.assign(d()(a),{pageIndex:t===ue.pageRows?e:1,pageRows:t})}))},Ae=function(){var e=ye.taskId;V(le(le({},K),{},{deleteLoading:!0})),Object(w.c)(w.a.deleteRemoteConfig,{taskId:e},{loading:!0}).then((function(e){we()})).finally((function(){V({deletevisible:!1,deleteItem:null,deleteLoading:!1})}))};return f.a.createElement("div",{id:"remote-config"},f.a.createElement(v.a,{title:"远程配置",selectOnchange:function(e){return X(e)}}),f.a.createElement("div",{className:"comm-shadowbox setp-tip"},f.a.createElement("div",{className:"step-title"},f.a.createElement("img",{src:b.a,alt:""}),f.a.createElement("span",null,"远程配置步骤")),f.a.createElement(y.a,{desc:pe,style:{marginBottom:22}}),f.a.createElement(o.a,{current:-1,initial:0},f.a.createElement(me,{title:"创建远程配置任务",description:"创建远程配置任务，填写任务的目的或备注信息。"}),f.a.createElement(me,{title:"添加配置数据",description:"添加要更新的产品配置数据字段和更新的数值。"}),f.a.createElement(me,{title:"选择设备",description:"可通过设备ID/物理地址，设备标签，本地导入确定要配置的设备。"}),f.a.createElement(me,{title:"执行任务",description:"提交执行远程配置任务，设备更新结果实时可见。"}))),f.a.createElement("div",{className:"comm-shadowbox device-content"},f.a.createElement("div",{className:"content-top"},f.a.createElement("div",{className:"content-top-left"},f.a.createElement(i.a,{layout:"inline",labelCol:{span:7},wrapperCol:{span:17}},f.a.createElement(i.a.Item,{label:"任务状态"},f.a.createElement(s.a,{allowClear:!0,onChange:function(e){return _(e)},style:{width:150,marginRight:40}},ve.filter((function(e){return e})).map((function(e,t){return f.a.createElement(de,{key:e,value:t},e)})))),f.a.createElement(i.a.Item,{label:"任务名称"},f.a.createElement(fe,{placeholder:"请输入任务名称",allowClear:!0,onSearch:Se,style:{width:465}})))),f.a.createElement(r.a,{type:"primary",onClick:function(){return Ie()}},"创建任务")),f.a.createElement(n.a,{columns:Ee,className:"ant-table-fixed",rowKey:"taskId",dataSource:Q,pagination:{defaultCurrent:1,current:ue.pageIndex,pageSize:ue.pageRows,total:ue.totalRows,showSizeChanger:!1,showQuickJumper:ue.totalPages>5,onChange:xe,showTotal:function(e){return f.a.createElement("span",null,"共 ",f.a.createElement("a",null,e)," 条")}}})),g&&f.a.createElement(ae,{visible:g,allProductList:ne,onCancel:function(){E(!1),S({})},editData:j,configProtoclList:a,getRemoteConfigList:we}),be&&f.a.createElement(h.a,{visible:be,modalOKHandle:Ae,modalCancelHandle:function(){return V({deletevisible:!1,deleteItem:null,deleteLoading:!1})},targetName:ye.taskId,confirmLoading:he,title:"删除任务",needWarnIcon:!0,descText:"即将删除的任务",tipText:"任务的所有信息将完全被删除，无法找回，请谨慎操作"}),P&&f.a.createElement(ie,{visible:P,detailData:C,allProductList:ne,onCancel:function(){return L(!1)}}))}},wmP4:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABsklEQVQokWWRvW4TQRSFv5nMLE4U8IJEEaFFUUJhCQpA4idNKFJQUiU0eYM8QOqUCCSQeAXShJISCQch4QYqQEHhV3LjmCoKyEnsvZdixrtr+xazO3N3vnPuWfP2c2dPoYEqqqBhQeMehucCwz78vH97fhHAqdIoLkHlcgRU9qGtqOoCsVzRjAAVjapaKI4ARIlSJaC0L1WVEUjhhGKMccCk7XJ+ZTKbIUCqI4zaRpVTgVY3Ze9wlt7AceFMn8a5I1Z3dPrlmumZ1x/bClrOVgH0BbZ/zNE5rpFY8AZ8fCZTtPoJK05VylmJTiS8v++mHBzXSAxs3IEshSe7YBS8YWkmZ9OGVKKqKCLKEPr18CzewMZd+NKBm5fg+lzpwhvWgwMpE64G1csd3sLlFB5cDaFldfh2ECCJJXMKzxQWwGCQmHr4eNbJ8kCm0se7QTmrw8MbkOfw4Td4S9swVs3mr9o/398W1bz15+Kt73/Pz1fDu7cIy1fg+Rtwlq0JwKt3+59U5JqiDMTQ7GYcDWZG/4AFZ2md5KxMAMZrdUen6zmb3rCeWDJvaTvDi5OcR0/XTO8/FFxXqP9J8G8AAAAASUVORK5CYII="}}]);