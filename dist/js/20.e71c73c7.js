(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"17x9":function(t,e,a){t.exports=a("WUjv")(13)},HRY9:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return x}));a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("pjDv"),a("mbEz");var n=a("wCAj"),r=(a("K4yd"),a("9yH6")),o=(a("8QGh"),a("2fM7")),c=(a("U8R4"),a("+eQT")),l=(a("FZtP"),a("sMBO"),a("2B1R"),a("oVuX"),a("q1tI")),u=a.n(l),i=a("MeRu"),s=a("Nlzp"),m=a("rwTb"),d=(a("a971"),a("Wgwc")),f=a.n(d),b=(a("wd/R"),a("MT78"));function p(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var n,r,o=[],c=!0,l=!1;try{for(a=a.call(t);!(c=(n=a.next()).done)&&(o.push(n.value),!e||o.length!==e);c=!0);}catch(t){l=!0,r=t}finally{try{c||null==a.return||a.return()}finally{if(l)throw r}}return o}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return y(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return y(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var h=[{label:"近7天",value:"1"},{label:"近30天",value:"2"}],D=c.a.RangePicker,Y=[{label:"新增设备数",count:"--"},{label:"入网设备数",count:"--"},{label:"活跃设备数",count:"--"},{label:"异常设备数",count:"--"},{label:"设备累计总数",count:"--"}],v=[{title:"日期",dataIndex:"summaryDate",key:"summaryDate"},{title:"新增设备数",dataIndex:"newNum",key:"newNum"},{title:"入网设备数",dataIndex:"joinNum",key:"joinNum"},{title:"活跃设备数",dataIndex:"activeNum",key:"activeNum"},{title:"异常设备数",dataIndex:"exceptionNum",key:"exceptionNum"},{title:"累积设备总数",dataIndex:"totalNum",key:"totalNum"}],w=o.a.Option;function x(){var t=p(Object(l.useState)([]),2),e=t[0],a=t[1],c=p(Object(l.useState)(),2),d=c[0],y=c[1],x=p(Object(l.useState)(),2),N=x[0],g=x[1],E=p(Object(l.useState)([]),2),M=E[0],j=E[1],O=p(Object(l.useState)(0),2),S=O[0],k=O[1],I=p(Object(l.useState)("1"),2),A=I[0],C=I[1],L=p(Object(l.useState)(Y),2),P=L[0],T=L[1],B=p(Object(l.useState)(0),2),F=B[0],R=B[1],K=p(Object(l.useState)([]),2),U=K[0],z=K[1];Object(l.useEffect)((function(){G()}),[A,N,S]),Object(l.useEffect)((function(){U.length&&J(U)}),[F]),Object(l.useEffect)((function(){Object(s.c)(s.a.allProductPubList,{}).then((function(t){t.data.unshift({productId:0,productName:"全部产品"}),j(t.data)}))}),[]);var G=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e={};"1"===A?(e.endDate=f()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=f()().subtract(7,"day").format("YYYY-MM-DD")):"2"===A&&(e.endDate=f()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=f()().subtract(30,"day").format("YYYY-MM-DD")),N&&N.length&&(e.endDate=N[1].format("YYYY-MM-DD"),e.startDate=N[0].format("YYYY-MM-DD")),S&&(e.productId=S),Object(s.c)(s.a.deviceDataAn,e,{loading:t}).then((function(t){if(Array.isArray(t.data)){for(var a=[],n=[];f()(e.startDate).isBefore(e.endDate,"day");)a.push(e.startDate),e.startDate=f()(e.startDate).add(1,"day").format("YYYY-MM-DD"),console.log(a);a.push(e.endDate),a.reverse().forEach((function(t){var e={activeNum:0,exceptionNum:0,joinNum:0,totalNum:0,summaryDate:t,newNum:0};n.push(e)})),J(n),z(n),H({})}else J(t.data.summaryList||[]),H(t.data||{}),z(t.data.summaryList||[])}))},H=function(t){var e=[{label:"新增设备数",count:t.newNum||0},{label:"入网设备数",count:t.joinNum||0},{label:"活跃设备数",count:t.activeNum||0},{label:"异常设备数",count:t.exceptionNum||0},{label:"设备累计总数",count:t.totalNum||0}];T(e)},J=function(t){var e,a,n,r=(e=[],a=[],t.forEach((function(t){e.push(t.summaryDate),0===F?a.push(t.newNum):1===F?a.push(t.joinNum):2===F?a.push(t.activeNum):3===F&&a.push(t.exceptionNum)})),e=e.reverse(),a=a.reverse(),{xTime:e,xData:a}),o=document.getElementById("echart-show"),c=b.init(o);(n={xAxis:{type:"category",data:r.xTime,axisTick:{show:!1},axisLine:{lineStyle:{color:"#E9E9E9"}},axisLabel:{textStyle:{color:"#000"}}},yAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},axisLabel:{textStyle:{color:"#000"}},splitLine:{show:!0,lineStyle:{color:"#E9E9E9"}}},grid:{left:"0%",right:"2%",bottom:"0%",top:"4%",containLabel:!0},tooltip:{trigger:"axis",formatter:function(t){for(var e=t[0].name+"<br>",a=0;a<t.length;a++)e+='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+t[a].color+';"></span>',e+=P[F].label+":"+t[a].value+"<br>";return e}},series:[{data:r.xData,type:"line",lineStyle:{normal:{color:"#1890FF"}},itemStyle:{normal:{color:"#1890FF"}}}]})&&c.setOption(n)};return u.a.createElement("div",{id:"device-analysis"},u.a.createElement(i.a,{title:"设备分析"},u.a.createElement("div",{className:"top-select"},u.a.createElement(o.a,{style:{width:150},value:S,onChange:function(t){k(t)},showSearch:!0,optionFilterProp:"children"},M.map((function(t){return u.a.createElement(w,{value:t.productId,key:t.productId},t.productName)}))))),u.a.createElement("div",{className:"comm-shadowbox filter-wrap"},u.a.createElement(r.a.Group,{options:h,onChange:function(t){g(null),C(t.target.value)},value:A,optionType:"button"}),u.a.createElement(D,{value:d||N,disabledDate:function(t){e[0]&&t.diff(e[0],"days"),e[1]&&e[1].diff(t,"days");return t&&t>f()().subtract(1,"day")||t<f()().subtract(30,"day")},onCalendarChange:function(t){return a(t)},onChange:function(t){return function(t){C(""),g(t)}(t)},onOpenChange:function(t){t?(y([]),a([])):y(void 0)},format:"YYYY-MM-DD",allowClear:!1,style:{borderColor:N&&N.length?"#1890ff":""}})),u.a.createElement("div",{className:"comm-shadowbox main-echart"},u.a.createElement("h3",null,"设备趋势分析",u.a.createElement(m.a,{tip:"【新增设备数】：平台导入或者录入的设备数。\r\n【入网设备数】：首次入网统计激活的设备数。\r\n【活跃设备数】：和clife平台有过一次数据上行或下行的设备数。\r\n【异常设备数】：出现故障等异常的数据数量。\r\n【累计设备数】：产品历史以来总的平台入网设备总数"})),u.a.createElement("div",{className:"echart-count-tab"},P.map((function(t,e){return u.a.createElement("div",function(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}({key:e,className:"count-item",onClick:function(){!function(t){4!==t&&R(t)}(e)}},"className",[F===e?"current-tab":"",4==e?"last-wrap":""].join(" ")),u.a.createElement("div",{className:"item-label"},t.label),u.a.createElement("div",{className:"item-number"},t.count))}))),u.a.createElement("div",{style:{height:"303px"},id:"echart-show"})),u.a.createElement("div",{className:"comm-shadowbox main-echart"},u.a.createElement("h3",null,"统计数据"),u.a.createElement("div",{className:"echart-download"},u.a.createElement("a",{onClick:function(){var t={};"1"===A?(t.endDate=f()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=f()().subtract(8,"day").format("YYYY-MM-DD")):"2"===A&&(t.endDate=f()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=f()().subtract(31,"day").format("YYYY-MM-DD")),N&&N.length&&(t.endDate=N[1].format("YYYY-MM-DD"),t.startDate=N[0].format("YYYY-MM-DD")),S&&(t.productId=S),Object(s.c)(s.a.deviceDataDown,t).then((function(t){window.open(t.data.path)}))}},"下载数据")),u.a.createElement(n.a,{dataSource:U,columns:v,pagination:!1,rowKey:"summaryDate"})))}},a971:function(t,e,a){}}]);