(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{a971:function(t,e,a){},uTBI:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return x}));a("ef1R"),a("Ra8s"),a("sfoS"),a("HsXu"),a("bs69"),a("Lm8M"),a("ryEf"),a("qgAm"),a("Ck9u"),a("59iL");var n=a("f6Fh"),r=(a("QcZr"),a("b+L2")),o=(a("oENA"),a("uTCA")),u=(a("W0kV"),a("caRq")),i=(a("xzjF"),a("PeP6")),l=(a("av3G"),a("9b3Y"),a("62KB"),a("JiFE"),a("T9Mk")),c=a.n(l),s=a("MeRu"),m=a("Nlzp"),d=a("rwTb"),f=(a("a971"),a("6Tta")),y=a.n(f),b=a("bmQt");function D(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var n,r,o=[],u=!0,i=!1;try{for(a=a.call(t);!(u=(n=a.next()).done)&&(o.push(n.value),!e||o.length!==e);u=!0);}catch(t){i=!0,r=t}finally{try{u||null==a.return||a.return()}finally{if(i)throw r}}return o}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return v(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return v(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var h=[{label:"近7天",value:"1"},{label:"近30天",value:"2"}],Y=(i.a.Option,u.a.RangePicker),p=[{label:"新增用户数",count:0},{label:"活跃用户数",count:0},{label:"新增用户次日留存率(昨日)",count:0},{label:"活跃用户次日留存率(昨日)",count:0},{label:"累计用户数",count:0}],w=[{title:"日期",dataIndex:"summaryDate",key:"summaryDate"},{title:"新增用户数",dataIndex:"newNum",key:"newNum"},{title:"活跃用户数",dataIndex:"activeNum",key:"activeNum"},{title:"新增用户次日留存率(昨日)",dataIndex:"newRatio",key:"newRatio"},{title:"活跃用户次日留存率(昨日)",dataIndex:"activeRatio",key:"activeRatio"},{title:"累计用户数",dataIndex:"totalNum",key:"totalNum"}];function x(){var t=D(Object(l.useState)([]),2),e=t[0],a=t[1],n=D(Object(l.useState)(),2),u=n[0],i=n[1],f=D(Object(l.useState)(),2),v=f[0],x=f[1],E=D(Object(l.useState)("1"),2),g=E[0],k=E[1],M=D(Object(l.useState)(p),2),I=M[0],S=M[1],O=D(Object(l.useState)(0),2),R=O[0],j=O[1],A=D(Object(l.useState)([]),2),T=A[0],L=A[1],C=D(Object(l.useState)(""),2),F=C[0],P=C[1];Object(l.useEffect)((function(){q()}),[g,v,F]);var K=D(Object(l.useState)(!1),2),B=K[0],J=K[1];Object(l.useEffect)((function(){T.length&&(2==R||3==R?J(!0):(J(!1),G(T)))}),[R]);var q=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e={};1==g?(e.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=y()().subtract(8,"day").format("YYYY-MM-DD")):2==g&&(e.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=y()().subtract(31,"day").format("YYYY-MM-DD")),v&&v.length&&(e.endDate=v[1].format("YYYY-MM-DD"),e.startDate=v[0].format("YYYY-MM-DD")),F&&(e.productId=F),Object(m.c)(m.a.userDataAn,e,{loading:t}).then((function(t){if(Array.isArray(t.data)){for(var a=[],n=[];y()(e.startDate).isBefore(e.endDate,"day");)a.push(e.startDate),e.startDate=y()(e.startDate).add(1,"day").format("YYYY-MM-DD"),console.log(a);a.push(e.endDate),a.reverse().forEach((function(t){var e={activeNum:0,activeRatio:0,newRatio:0,totalNum:0,summaryDate:t,newNum:0};n.push(e)})),G(n),L(n),z({})}else G(t.data.summaryList||[]),z(t.data||{}),L(t.data.summaryList||[])}))},z=function(t){var e=[{label:"新增用户数",count:t.newNum||0},{label:"活跃用户数",count:t.activeNum||0},{label:"新增用户次日留存率(昨日)",count:t.newRatio||0},{label:"活跃用户次日留存率(昨日)",count:t.activeRatio||0},{label:"累计用户数",count:t.totalNum||0}];S(e)},G=function(t){var e,a,n,r=(e=[],a=[],t.forEach((function(t){e.push(t.summaryDate),0==R?a.push(t.newNum):1==R?a.push(t.activeNum):2==R?a.push(t.newRatio):3==R&&a.push(t.activeRatio)})),e=e.reverse(),a=a.reverse(),{xTime:e,xData:a}),o=document.getElementById("echart-show"),u=b.init(o);(n={xAxis:{type:"category",data:r.xTime,axisTick:{show:!1},axisLine:{lineStyle:{color:"#E9E9E9"}},axisLabel:{textStyle:{color:"#000"}}},yAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},axisLabel:{textStyle:{color:"#000"}},splitLine:{show:!0,lineStyle:{color:"#E9E9E9"}}},grid:{left:"0%",right:"2%",bottom:"0%",top:"4%",containLabel:!0},tooltip:{trigger:"axis",formatter:function(t){for(var e=t[0].name+"<br>",a=0;a<t.length;a++)e+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+t[a].color+';"></span>',e+=I[R].label+":"+t[a].value+"<br>";return e}},series:[{data:r.xData,type:"line",lineStyle:{normal:{color:"#1890FF"}},itemStyle:{normal:{color:"#1890FF"}}}]})&&u.setOption(n)};return c.a.createElement("div",{id:"device-analysis"},c.a.createElement(s.a,{title:"用户分析",selectOnchange:function(t){return P(t)},isRelProductData:!0}),c.a.createElement("div",{className:"comm-shadowbox filter-wrap"},c.a.createElement(o.a.Group,{options:h,onChange:function(t){x(null),k(t.target.value)},value:g,optionType:"button"}),c.a.createElement(Y,{value:u||v,disabledDate:function(t){if(!e||0===e.length)return!1;var a=e[0]&&t.diff(e[0],"days")>30,n=e[1]&&e[1].diff(t,"days")>30;return t>y()().subtract(1,"day")||e[0]>y()().subtract(1,"day")||e[1]>y()().subtract(1,"day")||n||a},onCalendarChange:function(t){return a(t)},onChange:function(t){return function(t){x(t)}(t)},onOpenChange:function(t){t?(i([]),a([])):i(void 0)},format:"YYYY-MM-DD"})),c.a.createElement("div",{className:"comm-shadowbox main-echart"},c.a.createElement("h3",null,"用户趋势分析",c.a.createElement(d.a,{tip:"【新增用户数】：新增在当前账号下关联应用的注册用户数。\r\n【活跃用户数】：在当前账号下关联应用上有登录动作的人数（单日去重）。\r\n【新增用户次日留存】：当日新增用户中，第二日有启动过应用或控制面板的数量占比。\r\n【活跃用户次日留存】：当日活跃用户中，第二日有启动过应用或控制面板的数量占比。\r\n【累计用户数】：产品历史以来总的平台账号下关联注册用户总数"})),c.a.createElement("div",{className:"echart-count-tab"},I.map((function(t,e){return c.a.createElement("div",function(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}({key:e,className:"count-item",onClick:function(){!function(t){4!=t&&j(t)}(e)}},"className",[R===e?"current-tab":"",4==e?"last-wrap":""].join(" ")),c.a.createElement("div",{className:"item-label"},t.label),c.a.createElement("div",{className:"item-number"},t.count))}))),B?c.a.createElement(N,{tableData:T}):null,c.a.createElement("div",{style:{height:B?0:"303px",overflow:"hidden"},id:"echart-show"})),c.a.createElement("div",{className:"comm-shadowbox main-echart"},c.a.createElement("h3",null,"统计数据"),c.a.createElement("div",{className:"echart-download"},c.a.createElement("a",{onClick:function(){var t={};1==g?(t.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=y()().subtract(8,"day").format("YYYY-MM-DD")):2==g&&(t.endDate=y()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=y()().subtract(31,"day").format("YYYY-MM-DD")),v&&v.length&&(t.endDate=v[1].format("YYYY-MM-DD"),t.startDate=v[0].format("YYYY-MM-DD")),F&&(t.productId=F),Object(m.c)(m.a.userDataDown,t).then((function(t){window.open(t.data.path)}))}},"下载数据")),c.a.createElement(r.a,{dataSource:T,columns:w,pagination:!1,rowKey:"summaryDate"})))}function N(t){var e=t.tableData,a=n.a.TabPane,o=[{title:"首次使用时间",dataIndex:"summaryDate",key:"summaryDate"},{title:"新用户",dataIndex:"newNum",key:"newNum",render:function(t,e){return 0}},{title:"1天后",dataIndex:"activeNum",key:"activeNum",render:function(t,e){return 0}},{title:"2天后",dataIndex:"newRatio",key:"newRatio",render:function(t,e){return 0}},{title:"3天后",dataIndex:"activeRatio",key:"activeRatio",render:function(t,e){return 0}},{title:"4天后",dataIndex:"totalNum",key:"totalNum",render:function(t,e){return 0}},{title:"5天后",dataIndex:"totalNum1",key:"totalNum1",render:function(t,e){return 0}},{title:"6天后",dataIndex:"totalNum2",key:"totalNum2",render:function(t,e){return 0}},{title:"7天后",dataIndex:"totalNum3",key:"totalNum3",render:function(t,e){return 0}},{title:"14天后",dataIndex:"totalNum4",key:"totalNum4",render:function(t,e){return 0}},{title:"30天后",dataIndex:"totalNum5",key:"totalNum5",render:function(t,e){return 0}}];return c.a.createElement(n.a,{defaultActiveKey:"1"},c.a.createElement(a,{tab:"留存率",key:"1"},c.a.createElement(r.a,{dataSource:e,columns:o,pagination:!1,rowKey:"summaryDate"})),c.a.createElement(a,{tab:"留存数",key:"2"},c.a.createElement(r.a,{dataSource:e,columns:o,pagination:!1,rowKey:"summaryDate"})))}}}]);