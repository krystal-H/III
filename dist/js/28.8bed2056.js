(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{XXRt:function(e,t,a){},o3rT:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return v}));a("pNMO"),a("4Brf"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("+2oP"),a("sMBO"),a("pjDv"),a("rB9j"),a("mbEz");var n=a("wCAj"),r=(a("L/Qf"),a("2/Rp")),c=(a("tULf"),a("Vl3Y")),l=(a("8QGh"),a("2fM7")),o=(a("U8R4"),a("+eQT")),i=(a("07d7"),a("FZtP"),a("2B1R"),a("q1tI")),m=a.n(i),s=a("MeRu"),u=a("Nlzp"),d=a("Wgwc"),f=a.n(d);a("XXRt");function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,c=[],l=!0,o=!1;try{for(a=a.call(e);!(l=(n=a.next()).done)&&(c.push(n.value),!t||c.length!==t);l=!0);}catch(e){o=!0,r=e}finally{try{l||null==a.return||a.return()}finally{if(o)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return y(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return y(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var E=o.a.RangePicker,b=l.a.Option;function v(){var e=p(c.a.useForm(),1)[0],t=p(Object(i.useState)([]),2),a=t[0],o=t[1],d=p(Object(i.useState)({sumApiCount:"--",topProjectName:"--",topProjectCount:"--",topInterfaceName:"--"}),2),y=d[0],v=d[1],j=p(Object(i.useState)([]),2),N=j[0],I=j[1];Object(i.useEffect)((function(){Object(u.b)(u.a.projectSummary).then((function(e){v(e.data)})),Object(u.c)(u.a.projectList,{pageIndex:1,pageRows:9999}).then((function(e){I(e.data.list)})),h()}),[]);var h=function(){var t={},a=e.getFieldValue("projectId"),n=e.getFieldValue("times");a&&(t.projectId=a),n&&n.length&&(t.startDate=n[0].format("YYYY-MM-DD"),t.endDate=n[1].format("YYYY-MM-DD")),Object(u.c)(u.a.projectSummaryList,t,{loading:!0}).then((function(e){e.data.forEach((function(e,t){e.key=t})),o(e.data)}))};return m.a.createElement("div",{className:"project-count-page"},m.a.createElement(s.a,{title:"项目统计"}),m.a.createElement("div",{className:"comm-shadowbox content"},m.a.createElement("div",{className:"count-wrap"},m.a.createElement("div",{className:"item"},m.a.createElement("div",{className:"label"},"API调用总次数（昨日）"),m.a.createElement("div",{className:"text"},y.sumApiCount)),m.a.createElement("div",{className:"item"},m.a.createElement("div",{className:"label"},"TOP1 调用次数项目（昨日）"),m.a.createElement("div",{className:"text"},y.topProjectName||"--")),m.a.createElement("div",{className:"item"},m.a.createElement("div",{className:"label"},"TOP1 项目调用次数（昨日）"),m.a.createElement("div",{className:"text"},y.topProjectCount)),m.a.createElement("div",{className:"item"},m.a.createElement("div",{className:"label"},"TOP1 调用次数API（昨日）"),m.a.createElement("div",{className:"text"},y.topInterfaceName||"--"))),m.a.createElement("div",{className:"content-filter"},m.a.createElement(c.a,{className:"device-filter-form",form:e,layout:"inline"},m.a.createElement(c.a.Item,{name:"projectId",label:"选择项目"},m.a.createElement(l.a,{style:{width:202},showSearch:!0,optionFilterProp:"children"},N.map((function(e){return m.a.createElement(b,{value:e.projectId,key:e.projectId},e.projectName)})))),m.a.createElement(c.a.Item,{name:"times",label:"时间"},m.a.createElement(E,{disabledDate:function(e){return e&&e>f()().subtract(1,"day")},format:"YYYY-MM-DD",allowClear:!1})),m.a.createElement(c.a.Item,{label:" ",colon:!1,style:{marginRight:"2px"}},m.a.createElement(r.a,{type:"primary",onClick:function(){h()}},"查询")),m.a.createElement(c.a.Item,{label:" ",colon:!1,style:{marginRight:"0px"}},m.a.createElement(r.a,{onClick:function(){e.resetFields()}},"重置")))),m.a.createElement("div",{className:"content-main"},m.a.createElement(n.a,{rowKey:"key",dataSource:a,columns:[{title:"API名称",dataIndex:"apiName",key:"apiName"},{title:"API详情",dataIndex:"apiInfo",key:"apiInfo"},{title:"调用次数",dataIndex:"counter",key:"counter"}],pagination:!1}))))}}}]);