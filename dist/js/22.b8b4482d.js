(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{a971:function(t,e,a){},uTBI:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return x}));a("ef1R"),a("Ra8s"),a("sfoS"),a("HsXu"),a("bs69"),a("Lm8M"),a("ryEf"),a("qgAm"),a("Ck9u"),a("59iL");var n=a("f6Fh"),r=(a("QcZr"),a("b+L2")),o=(a("oENA"),a("uTCA")),u=(a("W0kV"),a("caRq")),l=(a("xzjF"),a("PeP6")),i=(a("av3G"),a("9b3Y"),a("62KB"),a("JiFE"),a("T9Mk")),c=a.n(i),m=a("MeRu"),s=a("Nlzp"),d=a("rwTb"),f=(a("a971"),a("6Tta")),y=a.n(f),b=a("bmQt");function h(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var n,r,o=[],u=!0,l=!1;try{for(a=a.call(t);!(u=(n=a.next()).done)&&(o.push(n.value),!e||o.length!==e);u=!0);}catch(t){l=!0,r=t}finally{try{u||null==a.return||a.return()}finally{if(l)throw r}}return o}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return p(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var v=[{label:"近7天",value:"1"},{label:"近30天",value:"2"}],D=l.a.Option,Y=u.a.RangePicker,w=[{label:"新增用户数",count:"--"},{label:"活跃用户数",count:"--"},{label:"新增用户次日留存率(昨日)",count:"--"},{label:"活跃用户次日留存率(昨日)",count:"--"},{label:"累计用户数",count:"--"}],N=[{title:"日期",dataIndex:"summaryDate",key:"summaryDate"},{title:"新增用户数",dataIndex:"newNum",key:"newNum"},{title:"活跃用户数",dataIndex:"activeNum",key:"activeNum"},{title:"新增用户次日留存率(昨日)",dataIndex:"newRatio",key:"newRatio"},{title:"活跃用户次日留存率(昨日)",dataIndex:"activeRatio",key:"activeRatio"},{title:"累计用户数",dataIndex:"totalNum",key:"totalNum"}];function x(){var t=h(Object(i.useState)([]),2),e=(t[0],t[1]),a=h(Object(i.useState)(),2),n=a[0],u=a[1],f=h(Object(i.useState)(),2),p=f[0],x=f[1],g=h(Object(i.useState)("1"),2),k=g[0],M=g[1],I=h(Object(i.useState)(w),2),S=I[0],j=I[1],O=h(Object(i.useState)(0),2),R=O[0],A=O[1],C=h(Object(i.useState)([]),2),L=C[0],T=C[1],F=h(Object(i.useState)([]),2),P=F[0],K=F[1],B=h(Object(i.useState)(0),2),J=B[0],q=B[1];Object(i.useEffect)((function(){Object(s.c)(s.a.allProductPubList,{}).then((function(t){t.data.unshift({productId:0,productName:"全部产品"}),K(t.data)}))}),[]),Object(i.useEffect)((function(){H()}),[k,p,J]);var z=h(Object(i.useState)(!1),2),G=z[0],Q=z[1];Object(i.useEffect)((function(){L.length&&(2==R||3==R?Q(!0):(Q(!1),V(L)))}),[R]);var H=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e={};1==k?(e.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=y()().subtract(8,"day").format("YYYY-MM-DD")):2==k&&(e.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=y()().subtract(31,"day").format("YYYY-MM-DD")),p&&p.length&&(e.endDate=p[1].format("YYYY-MM-DD"),e.startDate=p[0].format("YYYY-MM-DD")),J&&(e.productId=J),Object(s.c)(s.a.userDataAn,e,{loading:t}).then((function(t){if(Array.isArray(t.data)){for(var a=[],n=[];y()(e.startDate).isBefore(e.endDate,"day");)a.push(e.startDate),e.startDate=y()(e.startDate).add(1,"day").format("YYYY-MM-DD"),console.log(a);a.push(e.endDate),a.reverse().forEach((function(t){var e={activeNum:0,activeRatio:0,newRatio:0,totalNum:0,summaryDate:t,newNum:0};n.push(e)})),V(n),T(n),U({})}else V(t.data.summaryList||[]),U(t.data||{}),T(t.data.summaryList||[])}))},U=function(t){var e=[{label:"新增用户数",count:t.newNum||0},{label:"活跃用户数",count:t.activeNum||0},{label:"新增用户次日留存率(昨日)",count:t.newRatio||0},{label:"活跃用户次日留存率(昨日)",count:t.activeRatio||0},{label:"累计用户数",count:t.totalNum||0}];j(e)},V=function(t){var e,a,n,r=(e=[],a=[],t.forEach((function(t){e.push(t.summaryDate),0==R?a.push(t.newNum):1==R?a.push(t.activeNum):2==R?a.push(t.newRatio):3==R&&a.push(t.activeRatio)})),e=e.reverse(),a=a.reverse(),{xTime:e,xData:a}),o=document.getElementById("echart-show"),u=b.init(o);(n={xAxis:{type:"category",data:r.xTime,axisTick:{show:!1},axisLine:{lineStyle:{color:"#E9E9E9"}},axisLabel:{textStyle:{color:"#000"}}},yAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},axisLabel:{textStyle:{color:"#000"}},splitLine:{show:!0,lineStyle:{color:"#E9E9E9"}}},grid:{left:"0%",right:"2%",bottom:"0%",top:"4%",containLabel:!0},tooltip:{trigger:"axis",formatter:function(t){for(var e=t[0].name+"<br>",a=0;a<t.length;a++)e+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+t[a].color+';"></span>',e+=S[R].label+":"+t[a].value+"<br>";return e}},series:[{data:r.xData,type:"line",lineStyle:{normal:{color:"#1890FF"}},itemStyle:{normal:{color:"#1890FF"}}}]})&&u.setOption(n)};return c.a.createElement("div",{id:"device-analysis"},c.a.createElement(m.a,{title:"用户分析"},c.a.createElement("div",{className:"top-select"},c.a.createElement(l.a,{style:{width:150},value:J,onChange:function(t){q(t)},showSearch:!0,optionFilterProp:"children"},P.map((function(t){return c.a.createElement(D,{value:t.productId,key:t.productId},t.productName)}))))),c.a.createElement("div",{className:"comm-shadowbox filter-wrap"},c.a.createElement(o.a.Group,{options:v,onChange:function(t){x(null),M(t.target.value)},value:k,optionType:"button"}),c.a.createElement(Y,{value:n||p,disabledDate:function(t){return t&&t>y()().subtract(1,"day")||t<y()().subtract(30,"day")},onCalendarChange:function(t){return e(t)},onChange:function(t){return function(t){M(""),x(t)}(t)},onOpenChange:function(t){t?(u([]),e([])):u(void 0)},format:"YYYY-MM-DD",allowClear:!1,style:{borderColor:p&&p.length?"#1890ff":""}})),c.a.createElement("div",{className:"comm-shadowbox main-echart"},c.a.createElement("h3",null,"用户趋势分析",c.a.createElement(d.a,{tip:"【新增用户数】：新增在当前账号下关联应用的注册用户数。\r\n【活跃用户数】：在当前账号下关联应用上有登录动作的人数（单日去重）。\r\n【新增用户次日留存】：当日新增用户中，第二日有启动过应用或控制面板的数量占比。\r\n【活跃用户次日留存】：当日活跃用户中，第二日有启动过应用或控制面板的数量占比。\r\n【累计用户数】：产品历史以来总的平台账号下关联注册用户总数"})),c.a.createElement("div",{className:"echart-count-tab"},S.map((function(t,e){return c.a.createElement("div",function(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}({key:e,className:"count-item",onClick:function(){!function(t){4!=t&&A(t)}(e)}},"className",[R===e?"current-tab":"",4==e?"last-wrap":""].join(" ")),c.a.createElement("div",{className:"item-label"},t.label),c.a.createElement("div",{className:"item-number"},t.count))}))),G?c.a.createElement(E,{tableData:L}):null,c.a.createElement("div",{style:{height:G?0:"303px",overflow:"hidden"},id:"echart-show"})),c.a.createElement("div",{className:"comm-shadowbox main-echart"},c.a.createElement("h3",null,"统计数据"),c.a.createElement("div",{className:"echart-download"},c.a.createElement("a",{onClick:function(){var t={};1==k?(t.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=y()().subtract(8,"day").format("YYYY-MM-DD")):2==k&&(t.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=y()().subtract(31,"day").format("YYYY-MM-DD")),p&&p.length&&(t.endDate=p[1].format("YYYY-MM-DD"),t.startDate=p[0].format("YYYY-MM-DD")),J&&(t.productId=J),Object(s.c)(s.a.userDataDown,t).then((function(t){window.open(t.data.path)}))}},"下载数据")),c.a.createElement(r.a,{dataSource:L,columns:N,pagination:!1,rowKey:"summaryDate"})))}function E(t){var e=t.tableData,a=n.a.TabPane,o=[{title:"首次使用时间",dataIndex:"summaryDate",key:"summaryDate"},{title:"新用户",dataIndex:"newNum",key:"newNum",render:function(t,e){return 0}},{title:"1天后",dataIndex:"activeNum",key:"activeNum",render:function(t,e){return 0}},{title:"2天后",dataIndex:"newRatio",key:"newRatio",render:function(t,e){return 0}},{title:"3天后",dataIndex:"activeRatio",key:"activeRatio",render:function(t,e){return 0}},{title:"4天后",dataIndex:"totalNum",key:"totalNum",render:function(t,e){return 0}},{title:"5天后",dataIndex:"totalNum1",key:"totalNum1",render:function(t,e){return 0}},{title:"6天后",dataIndex:"totalNum2",key:"totalNum2",render:function(t,e){return 0}},{title:"7天后",dataIndex:"totalNum3",key:"totalNum3",render:function(t,e){return 0}},{title:"14天后",dataIndex:"totalNum4",key:"totalNum4",render:function(t,e){return 0}},{title:"30天后",dataIndex:"totalNum5",key:"totalNum5",render:function(t,e){return 0}}];return c.a.createElement(n.a,{defaultActiveKey:"1"},c.a.createElement(a,{tab:"留存率",key:"1"},c.a.createElement(r.a,{dataSource:e,columns:o,pagination:!1,rowKey:"summaryDate"})),c.a.createElement(a,{tab:"留存数",key:"2"},c.a.createElement(r.a,{dataSource:e,columns:o,pagination:!1,rowKey:"summaryDate"})))}}}]);