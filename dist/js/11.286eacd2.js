(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"VS/T":function(e,t,a){},hplX:function(e,t,a){},iPVe:function(e,t,a){},qG2J:function(e,t,a){"use strict";a.r(t);a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("sMBO"),a("pjDv"),a("tkto"),a("TeQF"),a("5DmW"),a("FZtP"),a("27RR"),a("mbEz");var n=a("wCAj"),r=(a("L/Qf"),a("2/Rp")),i=(a("tULf"),a("Vl3Y")),l=(a("qNb/"),a("PArb")),c=(a("1vPl"),a("5rEg")),o=(a("RKNx"),a("L41K")),u=(a("8QGh"),a("2fM7")),s=a("BkRI"),d=a.n(s),m=(a("pDQq"),a("2B1R"),a("q1tI")),f=a.n(m),p=a("DgvE"),v=a("MeRu"),g=a("wmP4"),b=a.n(g),y=a("TL2v"),h=a("FC04"),E=(a("k3Gp"),a("kLXV")),I=a("Nlzp"),O=a("P2RN"),k=(a("U8R4"),a("+eQT")),w=(a("QCje"),a("fyUT")),j=(a("oVuX"),a("B6y2"),a("SYor"),a("yq1k"),a("JTJg"),a("wd/R")),S=a.n(j);function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return x(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return x(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var C=u.a.Option;function D(e,t){var a=e.nextStep,r=e.productId,i=e.editData,l=A(Object(m.useState)([]),2),o=l[0],s=l[1],p=A(Object(m.useState)([]),2),v=p[0],g=(p[1],A(Object(m.useState)([]),2)),b=g[0],y=g[1],h=A(Object(m.useState)([]),2),E=(h[0],h[1],function(){if(0===o.length)return Object(O.a)({description:"请至少选择一条配置协议"});for(var e=0;e<o.length;e++)for(var t=o[e],n=0;n<b.length;n++){var r=b[n];if(t===r.identifier&&!r.sendData)return Object(O.a)({description:"请为配置协议添加参数"})}console.log("提交的数据",b.filter((function(e){return e.sendData})),"*************"),sessionStorage.setItem("addConfigData",JSON.stringify(b.filter((function(e){return e.sendData})))),a()});Object(m.useImperativeHandle)(t,(function(){return{onFinish:E}}));Object(m.useEffect)((function(){Object(I.c)(I.a.getPhysicalModel,{productId:r},{loading:!0}).then((function(e){if(e.data.properties&&e.data.properties.forEach((function(e){e.sendData=""})),Object.keys(i).length>0){var t=JSON.parse(i.remoteProtocol.protocolJson);e.data.properties.forEach((function(e){t.forEach((function(t){t.identifier===e.identifier&&(e.sendData=t.sendData)}))}))}y(e.data.properties)}))}),[r]);var j=function(e,t){var a=d()(b);a[t].sendData=e,y(a)},x={selectedRowKeys:o,onChange:function(e){s(e)}},D=[{title:"数据名称",dataIndex:"name",key:"name",width:190},{title:"数据标识",dataIndex:"identifier",key:"identifier",width:200},{title:"数据类型",dataIndex:"dataType",key:"dataType",render:function(e,t){return f.a.createElement("span",null,t.dataType.type)}},{title:"数据属性",render:function(e,t){switch(t.dataType.type){case"int":case"double":case"float":return f.a.createElement("span",null,t.dataType.specs.min," ~ ",t.dataType.specs.max);case"text":return"-";case"enum":return f.a.createElement("span",null,Object.values(t.dataType.specs).join(" | "));case"date":return"-";case"bool":return f.a.createElement("span",null,Object.values(t.dataType.specs).join(" | "))}}},{title:"下发数据",dataIndex:"sendData",key:"sendData",render:function(e,t,a){var n=t.dataType,r=n.specs,i=null;switch(n.type){case"int":case"double":case"float":i=f.a.createElement(w.a,{value:t.sendData,min:r.min,max:r.max,onChange:function(e){return j(e,a)},placeholder:"请输入参数"});break;case"text":i=f.a.createElement(c.a,{value:t.sendData,maxLength:30,onChange:function(e){return j(e.target.value.trim(),a)},placeholder:"请输入参数"});break;case"enum":case"bool":i=f.a.createElement(u.a,{value:t.sendData,onChange:function(e){return j(e,a)}},f.a.createElement(C,{key:-1,value:""},"请选择参数"),Object.values(r)&&Object.values(r).map((function(e,t){return f.a.createElement(C,{key:t+e,value:e},e)})));break;case"date":i=f.a.createElement(k.a,{style:{width:182},defaultValue:S()(t.sendData,"YYYY-MM-DD HH:mm:ss")||"",onChange:function(e,t){!function(e,t,a){j(t,a)}(0,t,a)},format:"YYYY-MM-DD HH:mm:ss",showTime:!0,showNow:!0})}return f.a.createElement("span",{className:"config-send-data ".concat(v.includes(a)?"warn":"")},i)}}];return f.a.createElement(n.a,{columns:D,className:"config-data-table",rowSelection:x,dataSource:b,rowKey:"identifier",scroll:{y:300},pagination:!1})}var P=Object(m.forwardRef)(D),L=(a("AUBz"),a("ZTPi")),N=(a("x0AG"),a("5s+n"),a("p532"),a("ma9I"),a("z7Xi")),T=a("wlus"),R=["设备ID的长度超过限制","物理地址的长度超限制","设备ID发生重复","物理地址发生重复","设备ID不存在或未联网","物理地址不存在或未联网"];var U=function(e){var t=e.visible,a=e.errorList,r=e.onCancel,i=[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId"},{title:"物理地址",dataIndex:"macAddress",key:"macAddress"},{title:"错误原因",dataIndex:"errorType",width:200,key:"errorType",render:function(e,t){var a=t.errorType;return f.a.createElement("span",null,R[a-1])}}];return f.a.createElement(E.a,{visible:t,width:600,className:"romote-modal",title:"设备导入错误日志",centered:!0,closable:!0,onOk:null,onCancel:r,destroyOnClose:!0,maskClosable:!1,footer:null},f.a.createElement("div",null,f.a.createElement(n.a,{columns:i,dataSource:a||[],pagination:{total:a.length,defaultCurrent:1,defaultPageSize:10,showQuickJumper:!1,hideOnSinglePage:!0,size:"small",showTotal:function(e){return f.a.createElement("span",null,"共 ",f.a.createElement("a",null,e)," 条")}}})))};a("iPVe");function q(e){return function(e){if(Array.isArray(e))return F(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||z(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function J(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function K(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?J(Object(a),!0).forEach((function(t){M(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):J(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function M(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function V(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw r}}return i}(e,t)||z(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(e,t){if(e){if("string"==typeof e)return F(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?F(e,t):void 0}}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}u.a.Option;var Q=c.a.Search,B=L.a.TabPane;function Y(e,t){var a=e.productId,i=e.editData,l=e.onCancel,c=e.getRemoteConfigList,o=V(Object(m.useState)("1"),2),u=o[0],s=o[1],v=V(Object(m.useState)(!1),2),g=v[0],b=v[1],y=V(Object(m.useState)([]),2),h=(y[0],y[1],V(Object(m.useState)({curDeviceInfoList:[],allDeviceInfoList:[],allDeviceInfoPager:{pageIndex:1,currPageRows:10}}),2)),E=h[0],k=h[1],w=V(Object(m.useState)([]),2),j=w[0],S=w[1],A=V(Object(m.useState)({rightAllList:[],rightTempList:[]}),2),x=A[0],C=A[1],D=Object(m.useRef)(null),P=V(Object(m.useState)({allList:[],successList:[],errorList:[],errorVisible:!1}),2),R=P[0],J=P[1],M=V(Object(m.useState)([]),2),z=(M[0],M[1]),F=V(Object(m.useState)(""),2),Y=F[0],Z=F[1],G=V(Object(m.useState)(!1),2),H=G[0],W=G[1],X=V(Object(m.useState)([]),2),$=(X[0],X[1],E.curDeviceInfoList),_=E.allDeviceInfoList,ee=E.allDeviceInfoPager,te=x.rightAllList,ae=x.rightTempList,ne=R.allList,re=R.successList,ie=R.errorList,le=R.errorVisible,ce=[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId"},{title:"物理地址",dataIndex:"macAddress",key:"macAddress"},{title:"操作",key:"action",render:function(e,t){return f.a.createElement("span",{onClick:function(){return se(t)},className:"remove-single"},"移除")}}],oe=function(){if(0===ae.length)return Object(O.a)({description:"请选择要更新的设备数据！"});var e=JSON.parse(sessionStorage.getItem("remoteConfigtaskDesc")),t=JSON.parse(sessionStorage.getItem("addConfigData")),a=d()(ae);a.forEach((function(e){delete e.key}));var n={taskId:i.taskId||"",taskName:e.taskName||"",taskExplain:e.taskExplain||"",productId:e.productId||"",protocolJson:t,remoteProductDeviceList:a};console.log("最后提交的数据",n),Object(I.c)(I.a.saveRemoteConfig5x,n,{loading:!0}).then((function(e){Object(O.a)({description:"操作成功！",type:"success"}),l(),c()}))};Object(m.useImperativeHandle)(t,(function(){return{onFinish:oe}}));var ue=function(e,t){var a=d()(e),n=a.findIndex((function(e){return e.deviceUniqueId===t.deviceUniqueId}));return a.splice(n,1),a},se=function(e){C(K(K({},x),{},{rightAllList:ue(te,e),rightTempList:ue(ae,e)}));var t=d()(j),a=t.findIndex((function(t){return t===e.deviceUniqueId}));t.splice(a,1),S(t)},de={selectedRowKeys:j,onChange:function(e){console.log(e,"左侧list选中的数据"),S(e)}},me=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";Object(I.c)(I.a.getRemoteDeviceList5x,{productId:a,deviceUniqueId:t,pageIndex:e||ee.pageIndex,pageRows:8},{loading:!0}).then((function(e){var t=e.data,a=t.list,n=void 0===a?[]:a,r=t.pager,i=void 0===r?{}:r,l=[].concat(q(_),q(n));n.forEach((function(e){e.key=e.deviceUniqueId})),k({curDeviceInfoList:n,allDeviceInfoPager:i,allDeviceInfoList:l})})).finally((function(){b(!1)}))};Object(m.useEffect)((function(){if(me(),Object.keys(i).length>0){var e=i.remoteProductDevicePage.list.map((function(e){return{deviceId:e.deviceId,deviceUniqueId:e.deviceUniqueId,macAddress:e.macAddress,key:e.deviceUniqueId}}));C({rightAllList:d()(e),rightTempList:d()(e)}),console.log(i.remoteProductDevicePage.list.map((function(e){return e.deviceUniqueId})),"/////"),S(i.remoteProductDevicePage.list.map((function(e){return e.deviceUniqueId})))}}),[]);var fe=$;return f.a.createElement("div",{className:"choose-update-device"},f.a.createElement("div",{className:"device-block"},f.a.createElement("p",{className:"device-block-tip"},"选择配置更新的设备"),f.a.createElement("div",{className:"device-block-item padtop0"},f.a.createElement(L.a,{activeKey:u,defaultActiveKey:"1",onChange:function(e){console.log(e),s(e)}},f.a.createElement(B,{tab:"设备列表",key:"1"},f.a.createElement(Q,{enterButton:"查 找",allowClear:!0,loading:g,onSearch:function(e){b(!0),me(ee.pageIndex,e)},maxLength:50,className:"search-box",placeholder:"请输入设备ID/物理地址查找"}),f.a.createElement(n.a,{columns:[{title:"设备ID",dataIndex:"deviceUniqueId",key:"deviceUniqueId",width:140},{title:"物理地址",dataIndex:"macAddress",width:140,key:"macAddress"}],dataSource:fe,rowSelection:de,pagination:{total:ee.totalRows,defaultCurrent:1,defaultPageSize:ee.currPageRows,showQuickJumper:!1,hideOnSinglePage:!0,showSizeChanger:!1,size:"small",onChange:function(e){return me(e)},showTotal:function(e){return f.a.createElement("span",null,"共 ",f.a.createElement("a",null,e)," 条")}}})),f.a.createElement(B,{tab:"本地导入",key:"2"},H?f.a.createElement("div",null,f.a.createElement("div",{className:"result-area"},f.a.createElement("h3",{className:"excel-style"},Y||"--"),f.a.createElement("div",{style:{marginTop:14}},"共".concat(ne.length,"条数据")),f.a.createElement("div",{className:"upload-data"},"成功：",re.length,"条 / ",f.a.createElement("span",{className:"red"},"失败：",ie.length,"条，请修改完成后重上传")),ie.length>0&&f.a.createElement("div",null,f.a.createElement("a",{onClick:function(){return J(K(K({},R),{},{errorVisible:!0}))}},"错误日志"))),f.a.createElement(r.a,{type:"primary",className:"upload-btn martop22",onClick:function(){return W(!1)}},f.a.createElement(N.a,null)," 重新上传")):f.a.createElement("div",{className:"local-import"},f.a.createElement("div",{className:"file-input-wrapper"},f.a.createElement(r.a,{type:"primary",className:"upload-btn"},f.a.createElement(N.a,null)," 选择本地设备数据文件"),f.a.createElement("input",{type:"file",onInput:function(e){var t=e.target;if(t.files&&t.files.length>0){var n=Object(p.e)(t.files,["xls","xlsx"],1e4),r=n.isOk;n.type,n.size;if(!r)return Object(O.a)({description:"文件类型或者大小不符合要求"});var i=t.files[0];Object(I.c)(I.a.importRemoteConfigExcel,{uploadExcel:i,productId:a},{needFormData:!0,loading:!0}).then((function(e){if(e.data){var t=e.data,a=[],n=[];t.forEach((function(e,t){var r=e.errorType,i=e.deviceUniqueId,l=e.macAddress;e.key=i,r?n.push({deviceUniqueId:i,macAddress:l,errorType:r,key:i}):a.push(K({},e))})),J(K(K({},R),{},{allList:t,successList:a,errorList:n})),a.length>0&&(C({rightAllList:[].concat(q(te),a),rightTempList:[].concat(q(te),a)}),z([])),Z(i.name),W(!0)}}))}},accept:".xls,.xlsx"}),f.a.createElement("a",{className:"get-template",onClick:function(){window.open("http://skintest.hetyj.com/b325662c4122f1b8948fe07c9d782ecb.xlsx")}},"设备数据模板")),f.a.createElement("p",{className:"local-import-tip"},"支持xls、xlsx格式，每次添加最多支持20,000个设备，总体文件大小不超过10MB")))))),f.a.createElement("div",{className:"transfer-icon",onClick:function(){var e=_.filter((function(e){return j.includes(e.deviceUniqueId)})),t=Object(p.n)([].concat(q(te),q(e)),"deviceUniqueId");D&&(D.current.input.value=""),C({rightAllList:t,rightTempList:t})}}),f.a.createElement("div",{className:"device-block"},f.a.createElement("p",{className:"device-block-tip"},"已选中：",j.length||0,"条"),f.a.createElement("div",{className:"device-block-item"},f.a.createElement(Q,{enterButton:"查 找",ref:D,onSearch:function(e){var t=q(te);if(e&&e.trim()){var a=e.trim();t=te.filter((function(e){var t=e.deviceUniqueId,n=e.macAddress;return t.indexOf(a)>-1||n.indexOf(a)>-1}))}C(K(K({},x),{},{rightTempList:t}))},maxLength:50,placeholder:"请输入设备ID/物理地址查找"}),f.a.createElement("div",{className:"remove-all"},f.a.createElement("a",{className:ae.length>0?"":"disable",onClick:function(){C({rightAllList:[],rightTempList:[]}),S([])}},f.a.createElement(T.a,null)," 一键移除")),f.a.createElement(n.a,{columns:ce,dataSource:ae,pagination:{total:ae.length,defaultCurrent:1,defaultPageSize:10,showQuickJumper:!1,hideOnSinglePage:!0,size:"small",showTotal:function(e){return f.a.createElement("span",null,"共 ",f.a.createElement("a",null,e)," 条")}}}))),le&&f.a.createElement(U,{visible:le,errorList:ie,onCancel:function(){return J(K(K({},R),{},{errorVisible:!1}))}}))}var Z=Object(m.forwardRef)(Y);a("hplX");function G(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return H(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return H(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var W=c.a.TextArea,X=u.a.Option,$=o.a.Step,_=[{title:"填写任务说明"},{title:"添加配置数据"},{title:"选择配置更新的设备"}];var ee=function(e){var t=e.visible,a=e.onCancel,n=e.allProductList,l=e.editData,s=e.getRemoteConfigList,p=Object(m.useRef)(),v=Object(m.useRef)(),g=G(i.a.useForm(),1)[0],b=G(Object(m.useState)(0),2),y=b[0],h=b[1],I=G(Object(m.useState)(""),2),O=I[0],k=I[1],w=function(){0===y?g.submit():1===y?(console.log(p,"-----------refConfig"),p.current.onFinish()):2===y&&(console.log(v,"-----------refDevice"),v.current.onFinish())};return f.a.createElement(E.a,{title:"创建任务",centered:!0,destroyOnClose:!0,maskClosable:!1,visible:t,width:1100,onCancel:a,wrapClassName:"remote-config-modal",footer:[0!==y&&f.a.createElement(r.a,{key:"previous",onClick:function(){h(y-1)}},"上一步"),f.a.createElement(r.a,{type:"primary",key:"next",onClick:function(){return w()}},2===y?"提交":"下一步")]},f.a.createElement("div",{className:"remote-config"},f.a.createElement("div",{className:"step-box"},f.a.createElement(o.a,{current:y},_.map((function(e,t){return f.a.createElement($,{key:e.title,title:e.title})})))),0===y&&f.a.createElement(i.a,{form:g,name:"filTask",labelCol:{span:4},wrapperCol:{span:18},onFinish:function(e){console.log("Received values of form: ",e),sessionStorage.setItem("remoteConfigtaskDesc",JSON.stringify(e)),k(e.productId);var t=d()(y);h(++t)},onFinishFailed:function(e){console.log("Failed:",e)},initialValues:{productId:l.productId||"",taskName:l.taskName,taskExplain:l.taskExplain}},f.a.createElement(i.a.Item,{label:"归属产品",name:"productId",rules:[{required:!0,message:"请选择归属产品"}]},f.a.createElement(u.a,{style:{width:"100%"},placeholder:"请选择归属产品"},n&&n.map((function(e){return f.a.createElement(X,{key:e.productId,value:e.productId},e.productName)})))),f.a.createElement(i.a.Item,{label:"任务名称",name:"taskName",rules:[{required:!0,message:"请输入任务名称"},{max:20,message:"最大输入长度为20"}]},f.a.createElement(c.a,{style:{width:"100%"},placeholder:"请输入任务名称，不能超过20个字符"})),f.a.createElement(i.a.Item,{label:"任务说明",name:"taskExplain",rules:[{required:!0,message:"请输入任务说明"}]},f.a.createElement(W,{showCount:!0,maxLength:100,placeholder:"请输入任务说明",autoSize:{minRows:4}}))),1===y&&f.a.createElement(P,{ref:p,productId:O,editData:l,nextStep:function(){h(y+1)}}),2===y&&f.a.createElement(Z,{ref:v,productId:O,editData:l,onCancel:a,getRemoteConfigList:s})))};a("VS/T");function te(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ae(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?te(Object(a),!0).forEach((function(t){ne(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):te(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function ne(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function re(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,i=[],l=!0,c=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(c)throw r}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return ie(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return ie(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ie(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var le=u.a.Option,ce=o.a.Step,oe=c.a.Search,ue=["平台支持远程更新设备的配置数据，您可以提交远程配置任务，实时对设备的系统参数等数据进行远程更新，并且获取设备配置的更新状态；详细说明可参考文档"],se=[{title:"创建远程配置任务"},{title:"添加配置数据"},{title:"选择设备"},{title:"执行任务"}],de=["草稿","待执行","执行中","已执行"],me=["","执行中","执行成功","执行失败"];t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"product",t=Object(m.useState)([]),a=re(t,2),c=a[0],s=(a[1],Object(m.useState)(!1)),g=re(s,2),E=g[0],O=g[1],k=Object(m.useState)({}),w=re(k,2),j=w[0],S=w[1],A=Object(m.useState)({pageIndex:1}),x=re(A,2),C=x[0],D=x[1],P=Object(m.useState)({deletevisible:!1,deleteItem:null,deleteLoading:!1}),L=re(P,2),N=L[0],T=L[1],R=Object(m.useState)([]),U=re(R,2),q=U[0],J=U[1],K=Object(m.useState)(""),M=re(K,2),V=M[0],z=M[1],F=Object(m.useState)(""),Q=re(F,2),B=Q[0],Y=Q[1],Z=Object(m.useState)([]),G=re(Z,2),H=G[0],W=G[1],X=C.totalRows,$=C.pageIndex,_=(C.pageRows,N.deletevisible),te=N.deleteItem,ne=N.deleteLoading,ie=[{title:"任务ID",dataIndex:"taskId",key:"taskId"},{title:"任务名称",dataIndex:"taskName",key:"taskName"},{title:"任务说明",dataIndex:"taskExplain",key:"taskExplain",width:300},{title:"归属产品名称",dataIndex:"productName",key:"productName"},{title:"更新设备数量",dataIndex:"deviceTotal",key:"deviceTotal"},{title:"任务状态",dataIndex:"status",key:"status",render:function(e,t){var a=t.status;return f.a.createElement("span",{className:"h5-statu-".concat(a+1)},ve[a])}},{title:"执行时间",dataIndex:"execTime",key:"execTime",render:function(e,t){var a=t.execTime;return f.a.createElement("span",null,a?p.a.utcToDev(a):"--")}},{title:"操作",key:"action",render:function(e,t){var a=t.status,n=t.taskId;return fe?f.a.createElement("span",null,f.a.createElement("a",{onClick:function(){return ye(t)}},"查看"),""+a=="3"?f.a.createElement(f.a.Fragment,null,f.a.createElement(l.a,{type:"vertical"}),f.a.createElement("a",{onClick:function(){return he(n)}},"重试"),f.a.createElement(l.a,{type:"vertical"}),f.a.createElement("a",{onClick:function(){return Ee(t)}},"日志")):null):f.a.createElement("span",null,""+a=="1"?f.a.createElement(f.a.Fragment,null,f.a.createElement("a",{onClick:function(){return ge(t)}},"编辑"),f.a.createElement(l.a,{type:"vertical"}),f.a.createElement("a",{onClick:function(){return be(t)}},"执行"),f.a.createElement(l.a,{type:"vertical"}),f.a.createElement("a",{onClick:function(){return T({deletevisible:!0,deleteItem:t})}},"删除")):f.a.createElement("a",{onClick:function(){return ye(t)}},"查看"))}}],fe="device"===e,pe=d()(se);fe&&pe.splice(2,1);var ve=fe?me:de,ge=function(e){return alert("敬请期待！")},be=function(e){Object(I.c)(I.a.executeTask5x,{taskId:e.taskId},{loading:!0}).then((function(e){ke()}))},ye=function(){},he=function(){},Ee=function(){};Object(m.useEffect)((function(){ke()}),[$,fe,V]);var Ie=function(){Object(I.b)(I.a.cloudGetProductList,{loading:!0}).then((function(e){W(e.data)}),(function(){return W([])}))};Object(m.useEffect)((function(){Ie()}),[]);var Oe=function(e){ke($,B,e)},ke=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n={productId:V,pageRows:10,pageIndex:e||$,status:t,taskName:a};Object(I.c)(I.a.getRomoteConfigListByProduct5x,n,{loading:!0}).then((function(e){var t=e.data,a=t.pager,n=void 0===a?{}:a,r=t.list,i=void 0===r?[]:r;J(Object(p.c)(i)),D(n)}))},we=function(e){ke(e)},je=function(){te.taskId;T(ae(ae({},N),{},{deleteLoading:!0}))};return f.a.createElement("div",{id:"remote-config"},f.a.createElement(v.a,{title:"远程配置",selectOnchange:function(e){return z(e)}}),f.a.createElement("div",{className:"comm-shadowbox setp-tip"},f.a.createElement("div",{className:"step-title"},f.a.createElement("img",{src:b.a,alt:""}),f.a.createElement("span",null,"远程配置步骤")),f.a.createElement(y.a,{desc:ue,style:{marginBottom:22}}),f.a.createElement(o.a,{current:-1,initial:0},f.a.createElement(ce,{title:"创建远程配置任务",description:"创建远程配置任务，填写任务的目的或备注信息。"}),f.a.createElement(ce,{title:"添加配置数据",description:"添加要更新的产品配置数据字段和更新的数值。"}),f.a.createElement(ce,{title:"选择设备",description:"可通过设备ID/物理地址，设备标签，本地导入确定要配置的设备。"}),f.a.createElement(ce,{title:"执行任务",description:"提交执行远程配置任务，设备更新结果实时可见。"}))),f.a.createElement("div",{className:"comm-shadowbox device-content"},f.a.createElement("div",{className:"content-top"},f.a.createElement("div",{className:"content-top-left"},f.a.createElement(i.a,{layout:"inline",labelCol:{span:7},wrapperCol:{span:17}},f.a.createElement(i.a.Item,{label:"任务状态"},f.a.createElement(u.a,{allowClear:!0,onChange:function(e){return Y(e)},style:{width:150,marginRight:40}},de.map((function(e,t){return f.a.createElement(le,{key:e,value:t},e)})))),f.a.createElement(i.a.Item,{label:"任务名称"},f.a.createElement(oe,{placeholder:"请输入任务名称",allowClear:!0,enterButton:!0,onSearch:Oe,style:{width:465}})))),f.a.createElement(r.a,{type:"primary",onClick:function(){return ge()}},"创建任务")),f.a.createElement(n.a,{columns:ie,className:"ant-table-fixed",rowKey:"taskId",dataSource:q,pagination:{total:X,current:$,defaultCurrent:1,defaultPageSize:10,onChange:function(e){return we(e)},showQuickJumper:!0,hideOnSinglePage:!0,showTotal:function(e){return f.a.createElement("span",null,"共 ",f.a.createElement("a",null,e)," 条")}}})),E&&f.a.createElement(ee,{visible:E,allProductList:H,onCancel:function(){O(!1),S({})},editData:j,configProtoclList:c,getRemoteConfigList:ke}),_&&f.a.createElement(h.a,{visible:_,modalOKHandle:je,modalCancelHandle:function(){return T({deletevisible:!1,deleteItem:null,deleteLoading:!1})},targetName:te.taskId,confirmLoading:ne,title:"删除任务",needWarnIcon:!0,descText:"即将删除的任务",tipText:"任务的所有信息将完全被删除，无法找回，请谨慎操作"}))}},wmP4:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABsklEQVQokWWRvW4TQRSFv5nMLE4U8IJEEaFFUUJhCQpA4idNKFJQUiU0eYM8QOqUCCSQeAXShJISCQch4QYqQEHhV3LjmCoKyEnsvZdixrtr+xazO3N3vnPuWfP2c2dPoYEqqqBhQeMehucCwz78vH97fhHAqdIoLkHlcgRU9qGtqOoCsVzRjAAVjapaKI4ARIlSJaC0L1WVEUjhhGKMccCk7XJ+ZTKbIUCqI4zaRpVTgVY3Ze9wlt7AceFMn8a5I1Z3dPrlmumZ1x/bClrOVgH0BbZ/zNE5rpFY8AZ8fCZTtPoJK05VylmJTiS8v++mHBzXSAxs3IEshSe7YBS8YWkmZ9OGVKKqKCLKEPr18CzewMZd+NKBm5fg+lzpwhvWgwMpE64G1csd3sLlFB5cDaFldfh2ECCJJXMKzxQWwGCQmHr4eNbJ8kCm0se7QTmrw8MbkOfw4Td4S9swVs3mr9o/398W1bz15+Kt73/Pz1fDu7cIy1fg+Rtwlq0JwKt3+59U5JqiDMTQ7GYcDWZG/4AFZ2md5KxMAMZrdUen6zmb3rCeWDJvaTvDi5OcR0/XTO8/FFxXqP9J8G8AAAAASUVORK5CYII="}}]);