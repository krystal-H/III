(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"0eIn":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAACB0lEQVQ4T32ST2sTQRjGn9nZTTEKBeOtbv1T7zUHi8vmZMCw/QCBYsGT+DH88wEUeoseVTx4USyJFWpVYldaEJQEFROxCVqbi1Q0oWZnXpmZ3XRz0IXd2d2Z9/c+7/s+7HmzFzBChUi4RACZBwgYX6X6p/bQJViXS2fcmjrCXjS+d6QkdywoDdBAA44BitwtzZ2Y1oC1d9uUZDVJyagAYDGrcC4/9Up/AHi6ueVLIepqNzh7kmnAs7ffVISWTFI/RxDObb+Yn1pPA4QCEGHem0kAXzskyTWZk7pjFUlP0srUIYbuvHfKlLD6ZjsgiAqRdEe1GpIGDiWwvjOJ97uHMIhsHJ6IkJsYLu9QtvygzAZaxr8u7wYdsA5i1bbgZSzAYYATrxmOcJhB8b+Awm26agNXksCFWeBRA9Awc19jK5tfAoBVSKoS4mbGXrj1aRq/hw4cbrI/vAhcuLuvwrHQZisbWx1Vf9pAyfvSxxlwMCzmgYXT+4U+bgC1plbyhz15/Vm3jBMvnPeOjWZeDVv+nZZb74uMzq5k31sELt03CjKqHxxtVg3b2jWcc780d3w08+rLD/7Gj1y9uXtk1LzyLLDcMOUooK16UAvb2srGpuPzjyTDWu8ofkbZ8QmY4HBPoMiqYSsgQRWpfBAbJu0HQQytXzn09iYhyEaWiz5jfKkfWddvltngL3uXRG6qfr/OAAAAAElFTkSuQmCC"},GZn0:function(e,t,n){},q18a:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return Y}));n("IHDg"),n("ef1R"),n("vV4J"),n("RfWx"),n("Ra8s"),n("sfoS"),n("HsXu"),n("bs69"),n("Lm8M"),n("ryEf"),n("qgAm"),n("9b3Y"),n("Ck9u"),n("QcZr");var a=n("b+L2"),r=(n("MNU5"),n("YeX6")),c=(n("UdMA"),n("ViyK")),i=(n("6IzV"),n("QFmM")),o=(n("2ek4"),n("oWtQ")),u=(n("xzjF"),n("PeP6")),l=n("CvKH"),s=n.n(l),d=(n("av3G"),n("V9IP"),n("pckg"),n("P37N"),n("62KB"),n("T9Mk")),f=n.n(d),m=n("MeRu"),p=n("0eIn"),y=n.n(p),v=n("Nlzp"),b=n("DgvE"),h=n("P2RN"),E=n("FC04"),O=(n("GZn0"),n("UTJx"),n("dVdO")),g=(n("DBxd"),n("sQtw")),j=n("rwTb");function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return S(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){k(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function k(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var I=g.a.Group,C=u.a.Option;function P(e,t){var n=[];return e.forEach((function(e){e.funcParamList&&e.funcParamList.length&&e.funcParamList.forEach((function(a){var r=JSON.parse(JSON.stringify(e));t?r.funcParamList[0].statusQueryId||n.push(N(N({},r),a)):r.funcParamList[0].deviceFunctionId||n.push(N(N({},r),a))}))})),n.forEach((function(e,n){e.typeS=t,e.label=e.funcName,e.value=e.funcIdentifier,e.key=n})),n}function x(e){var t=e.addVisible,n=e.optionArr,a=e.addOk,c=e.CancelAdd,i=A(Object(d.useState)(n[0].productId),2),o=i[0],l=i[1],m=A(Object(d.useState)([]),2),p=m[0],y=m[1],b=A(Object(d.useState)([]),2),h=b[0],E=b[1],S=A(Object(d.useState)({}),2),w=S[0],N=S[1],k=A(f.a.useState({}),2),x=k[0],T=k[1],D=A(f.a.useState({}),2),L=D[0],Q=D[1],V=A(Object(d.useState)({}),2),F=V[0],Z=V[1],z=A(f.a.useState({}),2),U=z[0],Y=z[1],B=A(f.a.useState({}),2),H=B[0],J=B[1];Object(d.useEffect)((function(){o&&G()}),[o]);var R=function(e){if(!e.length)return[];var t=[],n=[];return e.forEach((function(e){var a=n.indexOf(e.dataTypCN);a>-1?t[a].content.push(e):(n.push(e.dataTypCN),t.push({content:[e],title:e.dataTypCN}))})),t},G=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t={filter:!1};t.productId=o,t.id&&t.id.trim()||delete t.id,Object(v.c)(v.a.scenceList,t,{loading:e}).then((function(e){var t=P(e.data.conditionFunc,!0),n=P(e.data.controlFunc,!1);y(R(t)),E(R(n))}))},W=function(){N({}),T({}),Q({})};return f.a.createElement("div",null,f.a.createElement(O.a,{title:"自定义",visible:t,onOk:function(){var e=[];for(var t in w)e=e.concat(w[t]);var n=[];for(var r in F)n=n.concat(F[r]);var c={};c.productId=o,c.data=e.concat(n),Object(v.c)(v.a.saveScenceData,c).then((function(e){a(o)}))},onCancel:c,width:"905px",wrapClassName:"add-protocols-wrap"},f.a.createElement("div",{className:"scene-sevice-model"},f.a.createElement("div",{className:"top"},f.a.createElement("span",null,"产品名称："),f.a.createElement(u.a,{style:{width:220},value:o,onChange:function(e){l(e),W()},showSearch:!0,optionFilterProp:"children"},n.map((function(e){return f.a.createElement(C,{value:e.productId,key:e.productId},e.productName)})))),f.a.createElement("div",{className:"middle"},f.a.createElement("div",{className:"middle-clear"},f.a.createElement("span",{className:"middle-title"}," 场景触发条件设置",f.a.createElement(j.a,{tip:"物模型的可上行、可下行、可上行可下行3种数据类型都支持条件"})),f.a.createElement(r.a,{type:"primary",ghost:!0,onClick:W},"清空")),f.a.createElement("div",{className:"middle-tip"},"场景触发条件设置以后该功能点即可出现在App-场景-我的场景-添加条件处，作为场景的触发条件来设置")),f.a.createElement("div",{className:"content"},p.map((function(e,t){return f.a.createElement("div",{key:t,className:"content-item"},f.a.createElement("h3",null,e.title),f.a.createElement("div",null,f.a.createElement(g.a,{indeterminate:x[e.title]||!1,onChange:function(t){return function(e,t,n){N((function(a){var r=s()(a),c=[];return e.target.checked&&n.forEach((function(e){c.push(e.value)})),r[t]=c,r})),Q((function(n){var a=s()(n);return a[t]=e.target.checked,a})),T((function(e){var n=s()(e);return n[t]=!1,n}))}(t,e.title,e.content)},checked:L[e.title]||!1},"全选"),f.a.createElement(I,{options:e.content,value:w[e.title]||[],onChange:function(t){return function(e,t,n){N((function(n){var a=s()(n);return a[t]=e,a})),T((function(a){var r=s()(a),c=!!e.length&&e.length<n.length;return r[t]=c,r})),Q((function(a){var r=s()(a);return r[t]=e.length===n.length,r}))}(t,e.title,e.content)}})))}))),f.a.createElement("div",{className:"middle"},f.a.createElement("div",{className:"middle-clear"},f.a.createElement("span",{className:"middle-title"}," 场景执行动作设置",f.a.createElement(j.a,{tip:"物模型的仅可下行、可上行可下行2种数据类型支持动作"})),f.a.createElement(r.a,{type:"primary",ghost:!0,onClick:function(){Z({}),Y({}),J({})}},"清空")),f.a.createElement("div",{className:"middle-tip"},"场景执行动作设置以后，该功能点即可出现在APP-场景-我的场景-添加动作处，作为场景的执行动作来设置")),f.a.createElement("div",{className:"content"},h.map((function(e,t){return f.a.createElement("div",{key:t,className:"content-item"},f.a.createElement("h3",null,e.title),f.a.createElement("div",null,f.a.createElement(g.a,{indeterminate:U[e.title]||!1,onChange:function(t){return function(e,t,n){Z((function(a){var r=s()(a),c=[];return e.target.checked&&n.forEach((function(e){c.push(e.value)})),r[t]=c,r})),J((function(n){var a=s()(n);return a[t]=e.target.checked,a})),Y((function(e){var n=s()(e);return n[t]=!1,n}))}(t,e.title,e.content)},checked:H[e.title]||!1},"全选"),f.a.createElement(I,{options:e.content,value:F[e.title]||[],onChange:function(t){return function(e,t,n){Z((function(n){var a=s()(n);return a[t]=e,a})),Y((function(a){var r=s()(a),c=!!e.length&&e.length<n.length;return r[t]=c,r})),J((function(a){var r=s()(a);return r[t]=e.length===n.length,r}))}(t,e.title,e.content)}})))}))))))}function T(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,c=[],i=!0,o=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(c.push(a.value),!t||c.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return D(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return D(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){V(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function V(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var F=u.a.Option,Z=o.a.Step,z=[{value:"条件",key:!0},{value:"任务",key:!1}];function U(e,t){var n=[];return e.forEach((function(e){e.funcParamList&&e.funcParamList.length&&e.funcParamList.forEach((function(t){var a=JSON.parse(JSON.stringify(e));n.push(Q(Q({},a),t))}))})),n.forEach((function(e,n){e.typeS=t,e.key=n})),n}function Y(){var e=T(i.a.useForm(),1)[0],t=T(Object(d.useState)([]),2),n=t[0],l=t[1],p=T(Object(d.useState)([]),2),O=p[0],g=p[1],j=T(Object(d.useState)(""),2),A=j[0],S=j[1],w=T(Object(d.useState)([]),2),N=w[0],k=w[1];Object(d.useEffect)((function(){V()}),[]);var I=T(Object(d.useState)(!1),2),C=I[0],P=I[1],D=T(Object(d.useState)({}),2),L=D[0],Q=D[1],V=function(){Object(v.b)(v.a.getProductType,{},{loading:!0}).then((function(e){var t=e.data,n=Object(b.h)("productId");n?(S(n),t.forEach((function(e){n==e.productId&&H(e.productName)}))):(S(t[0].productId),H(t[0].productName)),g(t)}))},Y=T(Object(d.useState)(""),2),B=Y[0],H=Y[1],J=function(e){S(e)};Object(d.useEffect)((function(){A&&(R(),O.forEach((function(e){e.productId==A&&H(e.productName)})))}),[A]);var R=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t={filter:!0};t.productId=A,t.id&&t.id.trim()||delete t.id,Object(v.c)(v.a.scenceList,t,{loading:e}).then((function(e){var t=U(e.data.conditionFunc,!0),n=U(e.data.controlFunc,!1);k(t.concat(n)),G(t.concat(n))}))},G=function(t){var n=e.getFieldsValue(),a=t?s()(t):s()(N);"boolean"==typeof n.typeS&&(a=a.filter((function(e){if(n.typeS==e.typeS)return e}))),n.funcName&&n.funcName.trim()&&(a=a.filter((function(e){if(e.funcName.indexOf(n.funcName.trim())>-1)return e}))),l(a)},W=T(Object(d.useState)(!1),2),X=W[0],M=W[1],K=[{title:"类型",dataIndex:"type",render:function(e,t){return f.a.createElement("span",null,t.typeS?"条件":"任务")}},{title:"数据类型",dataIndex:"dataTypCN",key:"dataTypCN"},{title:"归属产品名称",dataIndex:"authorityType",key:"authorityType",render:function(){return f.a.createElement("span",null,B)}},{title:"状态",dataIndex:"statusDesc",key:"statusDesc"},{title:"功能名称",dataIndex:"funcName",key:"funcName"},{title:"操作",dataIndex:"activeTime",key:"activeTime",render:function(e,t){return f.a.createElement("a",{onClick:function(){Q(t),P(!0)}},"删除")}}];return f.a.createElement("div",{id:"device-regist2"},f.a.createElement(m.a,{title:"场景服务"},f.a.createElement("div",{className:"top-select"},f.a.createElement(u.a,{style:{width:200},value:A,onChange:J,showSearch:!0,optionFilterProp:"children"},O.map((function(e){return f.a.createElement(F,{value:e.productId,key:e.productId},e.productName)}))))),f.a.createElement("div",{className:"comm-shadowbox comm-setp-ttip"},f.a.createElement("div",{className:"step-title"},f.a.createElement("img",{src:y.a,alt:""}),f.a.createElement("span",null,"配置场景步骤")),f.a.createElement(o.a,{current:-1,initial:0},f.a.createElement(Z,{title:"配置自动化",description:"进入产品设备联动服务，配置自动化条件和动作"}),f.a.createElement(Z,{title:"验证自动化",description:"可通过调试验证工具，对条件和动作进行功能验证。"}),f.a.createElement(Z,{title:"发布自动化",description:"查看升级包各升级批次的具体设备列表，以及各设备的升级状态。"}),f.a.createElement(Z,{title:"配置场景",description:"使用已发布的自动化条件和动作配置场景。"}))),f.a.createElement("div",{className:"comm-shadowbox device-content"},f.a.createElement("div",{className:"content-top"},f.a.createElement("div",{className:"content-top-left"},f.a.createElement(i.a,{className:"device-filter-form",form:e,layout:"inline"},f.a.createElement(i.a.Item,{name:"typeS",label:"类型"},f.a.createElement(u.a,{allowClear:!0,style:{width:"200px"}},z.map((function(e){return f.a.createElement(F,{value:e.key,key:e.key},e.value)})))),f.a.createElement(i.a.Item,{label:"功能名称"},f.a.createElement(i.a.Item,{name:"funcName",noStyle:!0},f.a.createElement(c.a,{style:{width:"465px"},placeholder:"功能名称"})),f.a.createElement(r.a,{type:"primary",onClick:function(){G()}},"查询")))),f.a.createElement(r.a,{type:"primary",onClick:function(){M(!0)}},"自定义")),f.a.createElement(a.a,{rowKey:"funcIdentifier",dataSource:n,columns:K})),X&&f.a.createElement(x,{addVisible:X,addOk:function(e){Object(h.a)({type:"success",description:"提交成功！"}),e==A?R():J(e),M(!1)},optionArr:O,CancelAdd:function(){M(!1)}}),C&&f.a.createElement(E.a,{visible:C,modalOKHandle:function(){var e="";e=L.typeS?v.a.delScenceRun+"?statusQueryId="+L.statusQueryId:v.a.delScenceControl+"?deviceFunctionId="+L.deviceFunctionId,Object(v.c)(e).then((function(e){Object(h.a)({type:"success",description:"删除成功！"}),P(!1),R()}))},modalCancelHandle:function(){P(!1)},targetName:L.funcName,title:"删除",descGray:!0,needWarnIcon:!0,descText:"确定删除此数据"}))}}}]);