(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"17x9":function(t,e,a){t.exports=a("WUjv")(13)},H2we:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return x}));a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("pjDv"),a("AUBz");var n=a("ZTPi"),r=(a("mbEz"),a("wCAj")),o=(a("K4yd"),a("9yH6")),l=(a("U8R4"),a("+eQT")),u=(a("8QGh"),a("2fM7")),c=(a("FZtP"),a("sMBO"),a("2B1R"),a("oVuX"),a("q1tI")),i=a.n(c),m=(a("55Ip"),a("MeRu")),d=a("Nlzp"),s=a("rwTb"),f=(a("a971"),a("Wgwc")),y=a.n(f),b=a("MT78");function p(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var n,r,o=[],l=!0,u=!1;try{for(a=a.call(t);!(l=(n=a.next()).done)&&(o.push(n.value),!e||o.length!==e);l=!0);}catch(t){u=!0,r=t}finally{try{l||null==a.return||a.return()}finally{if(u)throw r}}return o}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return h(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return h(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var v=[{label:"近7天",value:"1"},{label:"近30天",value:"2"}],D=u.a.Option,Y=l.a.RangePicker,w=[{label:"新增设备用户数",count:"--"},{label:"活跃设备用户数",count:"--"},{label:"新增设备用户次日留存率(昨日)",count:"--"},{label:"活跃设备用户次日留存率(昨日)",count:"--"},{label:"累计设备用户数",count:"--"}],E=[{title:"日期",dataIndex:"summaryDate",key:"summaryDate"},{title:"新增设备用户数",dataIndex:"newNum",key:"newNum"},{title:"活跃设备用户数",dataIndex:"activeNum",key:"activeNum"},{title:"新增设备用户次日留存率(昨日)",dataIndex:"newRatio",key:"newRatio"},{title:"活跃设备用户次日留存率(昨日)",dataIndex:"activeRatio",key:"activeRatio"},{title:"累计设备用户数",dataIndex:"totalNum",key:"totalNum"}];function x(){var t=p(Object(c.useState)([]),2),e=(t[0],t[1]),a=p(Object(c.useState)(),2),n=a[0],l=a[1],f=p(Object(c.useState)(),2),h=f[0],x=f[1],g=p(Object(c.useState)("1"),2),M=g[0],k=g[1],I=p(Object(c.useState)(w),2),S=I[0],j=I[1],O=p(Object(c.useState)(0),2),R=O[0],A=O[1],C=p(Object(c.useState)([]),2),T=C[0],P=C[1],L=p(Object(c.useState)([]),2),B=L[0],F=L[1],K=p(Object(c.useState)(0),2),U=K[0],z=K[1];Object(c.useEffect)((function(){Object(d.c)(d.a.allProductPubList,{}).then((function(t){t.data.unshift({productId:0,productName:"全部产品"}),F(t.data)}))}),[]),Object(c.useEffect)((function(){J()}),[M,h,U]);var Z=p(Object(c.useState)(!1),2),G=Z[0],H=Z[1];Object(c.useEffect)((function(){T.length&&(2==R||3==R?H(!0):(H(!1),W(T)))}),[R]);var J=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e={};1==M?(e.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=y()().subtract(7,"day").format("YYYY-MM-DD")):2==M&&(e.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=y()().subtract(30,"day").format("YYYY-MM-DD")),h&&h.length&&(e.endDate=h[1].format("YYYY-MM-DD"),e.startDate=h[0].format("YYYY-MM-DD")),U&&(e.appId=U),Object(d.c)(d.a.deviceUserAn,e,{loading:t}).then((function(t){if(Array.isArray(t.data)){for(var a=[],n=[];y()(e.startDate).isBefore(e.endDate,"day");)a.push(e.startDate),e.startDate=y()(e.startDate).add(1,"day").format("YYYY-MM-DD"),console.log(a);a.push(e.endDate),a.reverse().forEach((function(t){var e={activeNum:0,activeRatio:0,newRatio:0,totalNum:0,summaryDate:t,newNum:0};n.push(e)})),W(n),P(n),Q({})}else W(t.data.summaryList||[]),Q(t.data||{}),P(t.data.summaryList||[])}))},Q=function(t){var e=[{label:"新增设备用户数",count:t.newNum||0},{label:"活跃设备用户数",count:t.activeNum||0},{label:"新增设备用户次日留存率(昨日)",count:t.newRatio||0},{label:"活跃设备用户次日留存率(昨日)",count:t.activeRatio||0},{label:"累计设备用户数",count:t.totalNum||0}];j(e)},W=function(t){var e,a,n,r=(e=[],a=[],t.forEach((function(t){e.push(t.summaryDate),0==R?a.push(t.newNum):1==R?a.push(t.activeNum):2==R?a.push(t.newRatio):3==R&&a.push(t.activeRatio)})),e=e.reverse(),a=a.reverse(),{xTime:e,xData:a}),o=document.getElementById("echart-show"),l=b.init(o);(n={xAxis:{type:"category",data:r.xTime,axisTick:{show:!1},axisLine:{lineStyle:{color:"#E9E9E9"}},axisLabel:{textStyle:{color:"#000"}}},yAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},axisLabel:{textStyle:{color:"#000"}},splitLine:{show:!0,lineStyle:{color:"#E9E9E9"}}},grid:{left:"0%",right:"2%",bottom:"0%",top:"4%",containLabel:!0},tooltip:{trigger:"axis",formatter:function(t){for(var e=t[0].name+"<br>",a=0;a<t.length;a++)e+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+t[a].color+';"></span>',e+=S[R].label+":"+t[a].value+"<br>";return e}},series:[{data:r.xData,type:"line",lineStyle:{normal:{color:"#1890FF"}},itemStyle:{normal:{color:"#1890FF"}}}]})&&l.setOption(n)};return i.a.createElement("div",{id:"device-analysis"},i.a.createElement(m.a,{title:"设备用户分析"},i.a.createElement("div",{className:"top-select"},i.a.createElement(u.a,{style:{width:150},value:U,onChange:function(t){z(t)},showSearch:!0,optionFilterProp:"children"},B.map((function(t){return i.a.createElement(D,{value:t.productId,key:t.productId},t.productName)}))))),i.a.createElement("div",{className:"comm-shadowbox filter-wrap"},i.a.createElement(o.a.Group,{options:v,onChange:function(t){x(null),k(t.target.value)},value:M,optionType:"button"}),i.a.createElement(Y,{value:n||h,disabledDate:function(t){return t&&t>y()().subtract(1,"day")||t<y()().subtract(30,"day")},onCalendarChange:function(t){return e(t)},onChange:function(t){return function(t){k(""),x(t)}(t)},onOpenChange:function(t){t?(l([]),e([])):l(void 0)},format:"YYYY-MM-DD",allowClear:!1,style:{borderColor:h&&h.length?"#1890ff":""}})),i.a.createElement("div",{className:"comm-shadowbox main-echart"},i.a.createElement("h3",null,"用户趋势分析",i.a.createElement(s.a,{tip:i.a.createElement("span",null,"【新增设备用户数】：新增绑定到设备的用户数（重复绑定，绑定过此账号下其他设备用户均不去重）。",i.a.createElement("br",null),"【活跃设备用户数】：绑定了设备的用户，当日有过设备控制页面打开行为，记一次活跃。",i.a.createElement("br",null),"【新增设备用户次日留存】：当日新增设备用户，次日有过设备控制页面打开行为，记一次留存。",i.a.createElement("br",null),"【活跃设备用户次日留存】：当日活跃设备用户，次日有过设备控制页面打开行为，记一次留存。",i.a.createElement("br",null),"【累计设备用户数】：累计绑定过此账号平台下产品设备的用户数量（重复绑定，绑定多个设备用户均不去重）。")})),i.a.createElement("div",{className:"echart-count-tab"},S.map((function(t,e){return i.a.createElement("div",{key:e,onClick:function(){!function(t){4!==t&&A(t)}(e)},className:["count-item",R===e?"current-tab":"",4===e?"last-wrap":""].join(" ")},i.a.createElement("div",{className:"item-label"},t.label),i.a.createElement("div",{className:"item-number"},t.count))}))),G?i.a.createElement(N,{tableData:T}):null,i.a.createElement("div",{style:{height:G?0:"303px",overflow:"hidden"},id:"echart-show"})),i.a.createElement("div",{className:"comm-shadowbox main-echart"},i.a.createElement("h3",null,"统计数据"),i.a.createElement("div",{className:"echart-download"},i.a.createElement("a",{onClick:function(){var t={};1==M?(t.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=y()().subtract(8,"day").format("YYYY-MM-DD")):2==M&&(t.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=y()().subtract(31,"day").format("YYYY-MM-DD")),h&&h.length&&(t.endDate=h[1].format("YYYY-MM-DD"),t.startDate=h[0].format("YYYY-MM-DD")),U&&(t.appId=U),Object(d.c)(d.a.deviceUserFile,t).then((function(t){window.open(t.data.path)}))}},"下载数据")),i.a.createElement(r.a,{dataSource:T,columns:E,pagination:!1,rowKey:"summaryDate"})))}function N(t){var e=t.tableData,a=n.a.TabPane,o=[{title:"首次使用时间",dataIndex:"summaryDate",key:"summaryDate"},{title:"新用户",dataIndex:"newNum",key:"newNum",render:function(t,e){return 0}},{title:"1天后",dataIndex:"activeNum",key:"activeNum",render:function(t,e){return 0}},{title:"2天后",dataIndex:"newRatio",key:"newRatio",render:function(t,e){return 0}},{title:"3天后",dataIndex:"activeRatio",key:"activeRatio",render:function(t,e){return 0}},{title:"4天后",dataIndex:"totalNum",key:"totalNum",render:function(t,e){return 0}},{title:"5天后",dataIndex:"totalNum1",key:"totalNum1",render:function(t,e){return 0}},{title:"6天后",dataIndex:"totalNum2",key:"totalNum2",render:function(t,e){return 0}},{title:"7天后",dataIndex:"totalNum3",key:"totalNum3",render:function(t,e){return 0}},{title:"14天后",dataIndex:"totalNum4",key:"totalNum4",render:function(t,e){return 0}},{title:"30天后",dataIndex:"totalNum5",key:"totalNum5",render:function(t,e){return 0}}];return i.a.createElement(n.a,{defaultActiveKey:"1"},i.a.createElement(a,{tab:"留存率",key:"1"},i.a.createElement(r.a,{dataSource:e,columns:o,pagination:!1,rowKey:"summaryDate"})),i.a.createElement(a,{tab:"留存数",key:"2"},i.a.createElement(r.a,{dataSource:e,columns:o,pagination:!1,rowKey:"summaryDate"})))}},a971:function(t,e,a){}}]);