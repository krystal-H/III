(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{HRY9:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return x}));a("ef1R"),a("Ra8s"),a("sfoS"),a("HsXu"),a("bs69"),a("Lm8M"),a("ryEf"),a("qgAm"),a("Ck9u"),a("QcZr");var n=a("b+L2"),r=(a("oENA"),a("uTCA")),o=(a("xzjF"),a("PeP6")),l=(a("W0kV"),a("caRq")),c=(a("av3G"),a("9b3Y"),a("62KB"),a("JiFE"),a("T9Mk")),u=a.n(c),i=a("MeRu"),s=a("Nlzp"),m=a("rwTb"),d=(a("a971"),a("6Tta")),f=a.n(d),b=(a("yq+b"),a("bmQt"));function y(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var n,r,o=[],l=!0,c=!1;try{for(a=a.call(t);!(l=(n=a.next()).done)&&(o.push(n.value),!e||o.length!==e);l=!0);}catch(t){c=!0,r=t}finally{try{l||null==a.return||a.return()}finally{if(c)throw r}}return o}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return p(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var h=[{label:"近7天",value:"1"},{label:"近30天",value:"2"}],Y=l.a.RangePicker,D=[{label:"新增设备数",count:"--"},{label:"入网设备数",count:"--"},{label:"活跃设备数",count:"--"},{label:"异常设备数",count:"--"},{label:"设备累计总数",count:"--"}],v=[{title:"日期",dataIndex:"summaryDate",key:"summaryDate"},{title:"新增设备数",dataIndex:"newNum",key:"newNum"},{title:"入网设备数",dataIndex:"joinNum",key:"joinNum"},{title:"活跃设备数",dataIndex:"activeNum",key:"activeNum"},{title:"异常设备数",dataIndex:"exceptionNum",key:"exceptionNum"},{title:"累积设备总数",dataIndex:"totalNum",key:"totalNum"}],E=o.a.Option;function x(){var t=y(Object(c.useState)([]),2),e=t[0],a=t[1],l=y(Object(c.useState)(),2),d=l[0],p=l[1],x=y(Object(c.useState)(),2),N=x[0],w=x[1],g=y(Object(c.useState)([]),2),M=g[0],j=g[1],S=y(Object(c.useState)(0),2),k=S[0],O=S[1],I=y(Object(c.useState)("1"),2),A=I[0],C=I[1],L=y(Object(c.useState)(D),2),T=L[0],F=L[1],P=y(Object(c.useState)(0),2),R=P[0],q=P[1],B=y(Object(c.useState)([]),2),J=B[0],z=B[1];Object(c.useEffect)((function(){G()}),[A,N,k]),Object(c.useEffect)((function(){J.length&&K(J)}),[R]),Object(c.useEffect)((function(){Object(s.c)(s.a.allProductPubList,{}).then((function(t){t.data.unshift({productId:0,productName:"全部产品"}),j(t.data)}))}),[]);var G=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e={};"1"===A?(e.endDate=f()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=f()().subtract(7,"day").format("YYYY-MM-DD")):"2"===A&&(e.endDate=f()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=f()().subtract(30,"day").format("YYYY-MM-DD")),N&&N.length&&(e.endDate=N[1].format("YYYY-MM-DD"),e.startDate=N[0].format("YYYY-MM-DD")),k&&(e.productId=k),Object(s.c)(s.a.deviceDataAn,e,{loading:t}).then((function(t){if(Array.isArray(t.data)){for(var a=[],n=[];f()(e.startDate).isBefore(e.endDate,"day");)a.push(e.startDate),e.startDate=f()(e.startDate).add(1,"day").format("YYYY-MM-DD"),console.log(a);a.push(e.endDate),a.reverse().forEach((function(t){var e={activeNum:0,exceptionNum:0,joinNum:0,totalNum:0,summaryDate:t,newNum:0};n.push(e)})),K(n),z(n),H({})}else K(t.data.summaryList||[]),H(t.data||{}),z(t.data.summaryList||[])}))},H=function(t){var e=[{label:"新增设备数",count:t.newNum||0},{label:"入网设备数",count:t.joinNum||0},{label:"活跃设备数",count:t.activeNum||0},{label:"异常设备数",count:t.exceptionNum||0},{label:"设备累计总数",count:t.totalNum||0}];F(e)},K=function(t){var e,a,n,r=(e=[],a=[],t.forEach((function(t){e.push(t.summaryDate),0===R?a.push(t.newNum):1===R?a.push(t.joinNum):2===R?a.push(t.activeNum):3===R&&a.push(t.exceptionNum)})),e=e.reverse(),a=a.reverse(),{xTime:e,xData:a}),o=document.getElementById("echart-show"),l=b.init(o);(n={xAxis:{type:"category",data:r.xTime,axisTick:{show:!1},axisLine:{lineStyle:{color:"#E9E9E9"}},axisLabel:{textStyle:{color:"#000"}}},yAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},axisLabel:{textStyle:{color:"#000"}},splitLine:{show:!0,lineStyle:{color:"#E9E9E9"}}},grid:{left:"0%",right:"2%",bottom:"0%",top:"4%",containLabel:!0},tooltip:{trigger:"axis",formatter:function(t){for(var e=t[0].name+"<br>",a=0;a<t.length;a++)e+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+t[a].color+';"></span>',e+=T[R].label+":"+t[a].value+"<br>";return e}},series:[{data:r.xData,type:"line",lineStyle:{normal:{color:"#1890FF"}},itemStyle:{normal:{color:"#1890FF"}}}]})&&l.setOption(n)};return u.a.createElement("div",{id:"device-analysis"},u.a.createElement(i.a,{title:"设备分析"},u.a.createElement("div",{className:"top-select"},u.a.createElement(o.a,{style:{width:150},value:k,onChange:function(t){O(t)},showSearch:!0,optionFilterProp:"children"},M.map((function(t){return u.a.createElement(E,{value:t.productId,key:t.productId},t.productName)}))))),u.a.createElement("div",{className:"comm-shadowbox filter-wrap"},u.a.createElement(r.a.Group,{options:h,onChange:function(t){w(null),C(t.target.value)},value:A,optionType:"button"}),u.a.createElement(Y,{value:d||N,disabledDate:function(t){e[0]&&t.diff(e[0],"days"),e[1]&&e[1].diff(t,"days");return t&&t>f()().subtract(1,"day")||t<f()().subtract(30,"day")},onCalendarChange:function(t){return a(t)},onChange:function(t){return function(t){C(""),w(t)}(t)},onOpenChange:function(t){t?(p([]),a([])):p(void 0)},format:"YYYY-MM-DD",allowClear:!1,style:{borderColor:N&&N.length?"#1890ff":""}})),u.a.createElement("div",{className:"comm-shadowbox main-echart"},u.a.createElement("h3",null,"设备趋势分析",u.a.createElement(m.a,{tip:u.a.createElement("span",null,"【新增设备数】：平台导入或者录入的设备数。",u.a.createElement("br",null),"【入网设备数】：首次入网统计激活的设备数。",u.a.createElement("br",null),"【活跃设备数】：和clife平台有过一次数据上行或下行的设备数。",u.a.createElement("br",null),"【异常设备数】：一天之内上报过一次故障状态或持续上报过多次故障数值的设备，记为一次异常设备。",u.a.createElement("br",null),"【累计设备数】：产品历史以来总的平台入网设备总数")})),u.a.createElement("div",{className:"echart-count-tab"},T.map((function(t,e){return u.a.createElement("div",{key:e,onClick:function(){!function(t){4!==t&&q(t)}(e)},className:["count-item",R===e?"current-tab":"",4===e?"last-wrap":""].join(" ")},u.a.createElement("div",{className:"item-label"},t.label),u.a.createElement("div",{className:"item-number"},t.count))}))),u.a.createElement("div",{style:{height:"303px"},id:"echart-show"})),u.a.createElement("div",{className:"comm-shadowbox main-echart"},u.a.createElement("h3",null,"统计数据"),u.a.createElement("div",{className:"echart-download"},u.a.createElement("a",{onClick:function(){var t={};"1"===A?(t.endDate=f()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=f()().subtract(8,"day").format("YYYY-MM-DD")):"2"===A&&(t.endDate=f()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=f()().subtract(31,"day").format("YYYY-MM-DD")),N&&N.length&&(t.endDate=N[1].format("YYYY-MM-DD"),t.startDate=N[0].format("YYYY-MM-DD")),k&&(t.productId=k),Object(s.c)(s.a.deviceDataDown,t).then((function(t){window.open(t.data.path)}))}},"下载数据")),u.a.createElement(n.a,{dataSource:J,columns:v,pagination:!1,rowKey:"summaryDate"})))}},a971:function(t,e,a){}}]);