(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{HRY9:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return w}));a("pNMO"),a("4Brf"),a("07d7"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("sMBO"),a("pjDv"),a("mbEz");var n=a("wCAj"),r=(a("K4yd"),a("9yH6")),o=(a("8QGh"),a("2fM7")),c=(a("U8R4"),a("+eQT")),l=(a("FZtP"),a("2B1R"),a("q1tI")),u=a.n(l),i=a("MeRu"),m=a("Nlzp"),s=(a("a971"),a("Wgwc")),d=a.n(s),f=a("MT78");function b(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var a=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==a)return;var n,r,o=[],c=!0,l=!1;try{for(a=a.call(t);!(c=(n=a.next()).done)&&(o.push(n.value),!e||o.length!==e);c=!0);}catch(t){l=!0,r=t}finally{try{c||null==a.return||a.return()}finally{if(l)throw r}}return o}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return y(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return y(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var Y=[{label:"近7天",value:"1"},{label:"近30天",value:"2"}],h=c.a.RangePicker,p=[{label:"新增设备数",count:0},{label:"入网设备数",count:0},{label:"活跃设备数",count:0},{label:"异常设备数",count:0},{label:"设备累计总数",count:0}],D=[{title:"日期",dataIndex:"summaryDate",key:"summaryDate"},{title:"新增设备数",dataIndex:"newNum",key:"newNum"},{title:"入网设备数",dataIndex:"joinNum",key:"joinNum"},{title:"活跃设备数",dataIndex:"activeNum",key:"activeNum"},{title:"异常设备数",dataIndex:"exceptionNum",key:"exceptionNum"},{title:"累积设备总数",dataIndex:"totalNum",key:"totalNum"}],v=o.a.Option;function w(){var t=b(Object(l.useState)([]),2),e=t[0],a=t[1],c=b(Object(l.useState)(),2),s=c[0],y=c[1],w=b(Object(l.useState)(),2),E=w[0],M=w[1],N=b(Object(l.useState)([]),2),x=N[0],g=N[1],j=b(Object(l.useState)(""),2),O=j[0],S=j[1],k=b(Object(l.useState)("1"),2),I=k[0],C=k[1],A=b(Object(l.useState)(p),2),L=A[0],P=A[1],T=b(Object(l.useState)(0),2),B=T[0],F=T[1],R=b(Object(l.useState)([]),2),K=R[0],z=R[1];Object(l.useEffect)((function(){Object(m.c)(m.a.getProductPlus,{}).then((function(t){g(t.data)}))}),[]),Object(l.useEffect)((function(){G()}),[I,E,O]),Object(l.useEffect)((function(){K.length&&J(K)}),[B]);var G=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e={};"1"===I?(e.endDate=d()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=d()().subtract(8,"day").format("YYYY-MM-DD")):"2"===I&&(e.endDate=d()().subtract(1,"day").format("YYYY-MM-DD"),e.startDate=d()().subtract(31,"day").format("YYYY-MM-DD")),E&&E.length&&(e.endDate=E[1].format("YYYY-MM-DD"),e.startDate=E[0].format("YYYY-MM-DD")),O&&(e.productId=O),Object(m.c)(m.a.deviceDataAn,e,{loading:t}).then((function(t){J(t.data.summaryList),H(t.data),z(t.data.summaryList)}))},H=function(t){var e=[{label:"新增设备数",count:t.newNum},{label:"入网设备数",count:t.joinNum},{label:"活跃设备数",count:t.activeNum},{label:"异常设备数",count:t.exceptionNum},{label:"设备累计总数",count:t.totalNum}];P(e)},J=function(t){var e,a,n,r=(e=[],a=[],t.forEach((function(t){e.push(t.summaryDate),0===B?a.push(t.newNum):1===B?a.push(t.joinNum):2===B?a.push(t.activeNum):3===B&&a.push(t.exceptionNum)})),{xTime:e,xData:a}),o=document.getElementById("echart-show"),c=f.init(o);(n={xAxis:{type:"category",data:r.xTime,axisTick:{show:!1},axisLine:{lineStyle:{color:"#E9E9E9"}},axisLabel:{textStyle:{color:"#000"}}},yAxis:{type:"value",axisLine:{show:!1},axisTick:{show:!1},axisLabel:{textStyle:{color:"#000"}},splitLine:{show:!0,lineStyle:{color:"#E9E9E9"}}},grid:{left:"0%",right:"2%",bottom:"0%",top:"4%",containLabel:!0},series:[{data:r.xData,type:"line",lineStyle:{normal:{color:"#1890FF"}},itemStyle:{normal:{color:"#1890FF"}}}]})&&c.setOption(n)};return u.a.createElement("div",{id:"device-analysis"},u.a.createElement(i.a,{title:"设备分析"},u.a.createElement("div",{className:"top-select"},u.a.createElement(o.a,{style:{width:200},allowClear:!0,onChange:function(t){S(t)}},x.map((function(t){return u.a.createElement(v,{value:t.productId,key:t.productId},t.productName)}))))),u.a.createElement("div",{className:"comm-shadowbox filter-wrap"},u.a.createElement(r.a.Group,{options:Y,onChange:function(t){M(null),C(t.target.value)},value:I,optionType:"button"}),u.a.createElement(h,{value:s||E,disabledDate:function(t){if(!e||0===e.length)return!1;var a=e[0]&&t.diff(e[0],"days")>30;return e[1]&&e[1].diff(t,"days")>30||a},onCalendarChange:function(t){return a(t)},onChange:function(t){return function(t){M(t)}(t)},onOpenChange:function(t){t?(y([]),a([])):y(void 0)},format:"YYYY-MM-DD"})),u.a.createElement("div",{className:"comm-shadowbox main-echart"},u.a.createElement("h3",null,"设备趋势分析"),u.a.createElement("div",{className:"echart-count-tab"},L.map((function(t,e){return u.a.createElement("div",function(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}({key:e,className:"count-item",onClick:function(){!function(t){4!==t&&F(t)}(e)}},"className",B===e?"current-tab":""),u.a.createElement("div",{className:"item-label"},t.label),u.a.createElement("div",{className:"item-number"},t.count))}))),u.a.createElement("div",{style:{height:"303px"},id:"echart-show"})),u.a.createElement("div",{className:"comm-shadowbox main-echart"},u.a.createElement("h3",null,"统计数据"),u.a.createElement("div",{className:"echart-download"},u.a.createElement("a",{onClick:function(){var t={};"1"===I?(t.endDate=d()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=d()().subtract(8,"day").format("YYYY-MM-DD")):"2"===I&&(t.endDate=d()().subtract(1,"day").format("YYYY-MM-DD"),t.startDate=d()().subtract(31,"day").format("YYYY-MM-DD")),E&&E.length&&(t.endDate=E[1].format("YYYY-MM-DD"),t.startDate=E[0].format("YYYY-MM-DD")),O&&(t.productId=O),Object(m.c)(m.a.deviceDataDown,t).then((function(t){window.open(t.data.path)}))}},"下载数据")),u.a.createElement(n.a,{dataSource:K,columns:D,pagination:!1,rowKey:"summaryDate"})))}},a971:function(t,e,a){}}]);