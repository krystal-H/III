(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"15YJ":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return U}));n("NBAS"),n("SuFq"),n("zKZe"),n("pNMO"),n("4Brf"),n("07d7"),n("0oug"),n("4mDm"),n("PKPk"),n("3bBZ"),n("FZtP"),n("tkto"),n("rB9j"),n("UxlC"),n("oVuX"),n("2B1R"),n("Rm1S");var a=n("q1tI"),r=n.n(a),o=n("55Ip"),c=n("/MKj"),s=n("Nlzp"),i=n("d8kt"),u=n("vS40"),l=n("k+EZ"),f=n("UpsA"),p=n("MeRu"),d=n("MUf8"),g=(n("mbEz"),n("wCAj")),y=(n("L/Qf"),n("2/Rp")),m=(n("K4yd"),n("9yH6")),b=(n("+2oP"),n("sMBO"),n("pjDv"),n("cu44")),h=n("DgvE"),v=n("P2RN");function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,o=[],c=!0,s=!1;try{for(n=n.call(e);!(c=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);c=!0);}catch(e){s=!0,r=e}finally{try{c||null==n.return||n.return()}finally{if(s)throw r}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return R(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return R(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var O=[{title:"消息标题",dataIndex:"noticeTitle",render:function(e,t){var n=t.noticeTitle,a=t.noticeId,c=t.read;return r.a.createElement(o.Link,{className:c?"gray":"",to:{pathname:"/messageCenter/detail/".concat(a),state:{read:c}}},n)}},{title:"消息类型",dataIndex:"noticeType",width:"300px",render:function(e,t){return 1==e?"系统公告":2==e?"流程消息":31==e?"APP控制服务":32==e?"云端定时服务":33==e?"场景联动服务":""}},{title:"时间",width:"400px",dataIndex:"updateTime",render:function(e,t){var n=t.updateTime;return r.a.createElement("span",null,h.a.utcToDev(n))}}];function E(e){var t=e.messageList,n=void 0===t?[]:t,o=(e.selectedRowKeys,e.noticeType,e.onSelectChange,e.newMessageNums,e.pageIndex,e.changePage,e.read),c=w(Object(a.useState)({pageIndex:1,totalRows:0,pageRows:10}),2),i=c[0],u=c[1];n=Object(h.c)(n);var l=w(Object(a.useState)(""),2),f=l[0],p=l[1],d={onChange:function(e,t){console.log("selectedRowKeys: ".concat(e),"selectedRows: ",t),p(e)},getCheckboxProps:function(e){return{disabled:e.isRead,name:e.noticeTitle}},selectedRowKeys:f},R=w(Object(a.useState)([]),2),E=R[0],j=R[1],x=w(Object(a.useState)(""),2),I=x[0],T=x[1],C=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t={pager:i};"boolean"==typeof o&&(t.isRead=o),I&&(t.noticeType=I),Object(s.c)(s.a.getNoticeList,t,{loading:e}).then((function(e){j(e.data.list),u((function(t){p("");var n=JSON.parse(JSON.stringify(t));return Object.assign(n,{totalRows:e.data.pager.totalRows})}))}))},N=w(Object(a.useState)({}),2),P=N[0],M=N[1];return Object(a.useEffect)((function(){C()}),[i.pageRows,i.pageIndex,I,o]),Object(a.useEffect)((function(){var e;e={},"boolean"==typeof o&&(e.isRead=o),Object(s.c)(s.a.getUnreadQuantity,e).then((function(e){M(e.data)}))}),[]),r.a.createElement(b.a,null,r.a.createElement("div",{className:"message-wrapper"},r.a.createElement(m.a.Group,{value:I,onChange:function(e){T(e.target.value)}},r.a.createElement(m.a.Button,{value:""},"全部类型消息 ",!0!==o?S(P.totalUnRead):""),r.a.createElement(m.a.Button,{value:"2"},"  流程消息 ",!0!==o?S(P.processUnRead):""),r.a.createElement(m.a.Button,{value:"3"},"  服务消息 ",!0!==o?S(P.serviceUnRead):""),r.a.createElement(m.a.Button,{value:"1"},"  公告消息 ",!0!==o?S(P.publicUnRead):"")),r.a.createElement(y.a,{style:{float:"right"},disabled:!f.length,onClick:function(){return function(){console.log(f);var e={noticeIds:f.join(",")};Object(s.c)(s.a.setRead,e).then((function(e){Object(v.a)({type:"success",description:"操作成功！"}),C()}))}()},type:"primary"},"标记已读")),r.a.createElement("section",{className:"table-wrapper"},r.a.createElement(g.a,{rowKey:"noticeId",rowSelection:d,dataSource:E,columns:O,pagination:{defaultCurrent:1,current:i.pageIndex,onChange:function(e,t){t==i.pageRows?u((function(n){var a=JSON.parse(JSON.stringify(n));return Object.assign(a,{pageIndex:e,pageRows:t})})):u((function(e){var n=JSON.parse(JSON.stringify(e));return Object.assign(n,{pageIndex:1,pageRows:t})}))},pageSize:i.pageRows,total:i.totalRows,showQuickJumper:!0,pageSizeOptions:[10],showTotal:function(){return r.a.createElement("span",null,"共 ",r.a.createElement("a",null,i.totalRows)," 条")}}})))}function S(e){return e?(e>99&&(e="99+"),"(".concat(e,")")):""}n("ma9I");function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function I(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function C(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=P(e);if(t){var r=P(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return N(this,n)}}function N(e,t){return!t||"object"!==j(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var M,k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}(c,e);var t,n,a,o=C(c);function c(){var e;x(this,c);for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return(e=o.call.apply(o,[this].concat(n))).state={detail:null},e.setReaded=function(e){var t={noticeIds:e};Object(s.c)(s.a.setRead,t).then((function(e){}))},e.getMessageDetail=function(){var t=e.props,n=t.match,a=void 0===n?{}:n,r=t.location,o=a.params,c=(void 0===o?{}:o).noticeId,i=r.state,u=(void 0===i?{}:i).read;c&&Object(s.c)(s.a.getNoticeDetail,{noticeId:c-0}).then((function(t){!1===u&&e.setReaded(c),e.setState({detail:t.data})}))},e.goBackList=function(){e.props.history.replace({pathname:"/messageCenter/list"})},e}return t=c,(n=[{key:"componentDidMount",value:function(){this.getMessageDetail()}},{key:"render",value:function(){var e=this.state.detail;return r.a.createElement(b.a,null,e&&r.a.createElement("div",{className:"message-detail-wrapper"},r.a.createElement("h2",{className:"message-title"},e.noticeTitle),r.a.createElement("p",{className:"message-tips"},r.a.createElement("span",null,r.a.createElement("b",null,"发布时间："),h.a.utcToDev(e.sendTime)),r.a.createElement("span",null,r.a.createElement("b",null,"消息类型："),1==e.noticeType?"系统公告":2==e.noticeType?"流程消息":3==e.noticeType?"服务消息":void 0)),r.a.createElement("div",{className:"message-content",dangerouslySetInnerHTML:{__html:e.noticeContent}}),r.a.createElement("a",{className:"left-top",onClick:this.goBackList},"返回消息列表")))}}])&&I(t.prototype,n),a&&I(t,a),c}(r.a.PureComponent);n("yeL8");function L(e){return(L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _(){return(_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function K(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function B(e,t){return(B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function J(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=D(e);if(t){var r=D(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return A(this,n)}}function A(e,t){return!t||"object"!==L(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function D(e){return(D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var U=Object(c.connect)((function(e){return{developerInfo:e.getIn(["userCenter","developerInfo"]).toJS(),newMessageNums:e.getIn(["message","newMessageNums"]).toJS()}}),(function(e){return{getNewMessageNums:function(){return e(Object(i.a)())},getDeveloperInfo:function(){return e(Object(u.c)())}}}))(M=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}(i,e);var t,n,a,c=J(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=c.call(this,e)).getMessageList=function(e,n){var a=t.state,r=a.noticeType,o=a.read,c=a.pageIndex,i=a.selectedRowKeys,u=a.messageList,l={pageIndex:c,pageRows:20,noticeType:r,read:o},f={};return u.length>0&&i.length===u.length&&l.pageIndex>1&&l.pageIndex--,void 0!==e&&(l[n]=e,"pageIndex"!==n&&(l.pageIndex=1)),Object.keys(l).forEach((function(e){""!==l[e]&&(f[e]=l[e])})),Object(s.b)(s.a.getNoticeList,f,{needVersion:1.1,loading:!0}).then((function(a){var r=a.data,o={messageList:r.list,pager:r.pager,selectedRowKeys:[]};n&&(o[n]=e,"pageIndex"!==n&&(o.pageIndex=1)),t.setState(o)}))},t.changeRead=function(e){t.setState({read:e});var n=t.props.history;!(window.location.hash.indexOf("/messageCenter/detail/")>-1)||n.replace({pathname:"/messageCenter/list"})},t.changeMessageType=function(e){var n=e.target.value;t.getMessageList(n,"noticeType")},t.onSelectChange=function(e){t.setState({selectedRowKeys:e})},t.setReaded=function(e){var n=t.state,a=n.selectedRowKeys,r=n.messageList,o=t.props.getNewMessageNums,c="";c=e||a.map((function(e){return r[e].noticeId})).join(","),Object(s.c)(s.a.setRead,{noticeIds:c},{needVersion:1.1,loading:!0}).then((function(e){t.getMessageList(),o()}))},t.chearSelectedRowKeys=function(){t.setState({selectedRowKeys:[]})},t.changePage=function(e){t.getMessageList(e,"pageIndex")},t.state={selectedRowKeys:[],messageList:[],noticeType:"",read:"",pager:{totalPages:0,currPageRows:null},pageIndex:1},t.pageTabClickHandles=[function(){return t.changeRead("")},function(){return t.changeRead(!1)},function(){return t.changeRead(!0)}],t}return t=i,(n=[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.state,n=t.messageList,a=t.selectedRowKeys,c=t.pager,s=t.noticeType,i=t.pageIndex,u=t.read,g=this.props,y=g.match,m=g.newMessageNums,b=void 0===m?{}:m,h=g.developerInfo,v=void 0===h?{}:h,w=y.path,R=b.totalUnRead;return r.a.createElement(d.a,null,r.a.createElement("div",{className:"page-header-wrapper"},r.a.createElement(l.a,{newMessageNums:b,developerInfo:v,noCollapsed:!0})),r.a.createElement("div",{className:"page-content-wrapper message-main"},r.a.createElement(f.a,{Nums:[0,R||0,0],clickHandles:this.pageTabClickHandles}),r.a.createElement("section",{className:"right-wrapper flex-column"},r.a.createElement(p.a,{noback:!0,title:"消息中心"}),r.a.createElement("div",{className:"flex1 scroll-y"},r.a.createElement(o.Switch,null,r.a.createElement(o.Route,{path:"".concat(w,"/list"),render:function(t){return r.a.createElement(E,_({},t,{messageList:n,selectedRowKeys:a,noticeType:s,pager:c,pageIndex:i,changePage:e.changePage,onSelectChange:e.onSelectChange,newMessageNums:b,setReaded:e.setReaded,read:u,changeMessageType:e.changeMessageType}))}}),r.a.createElement(o.Route,{path:"".concat(w,"/detail/:noticeId"),render:function(t){return r.a.createElement(k,_({},t,{setReaded:e.setReaded}))}}),r.a.createElement(o.Redirect,{to:"".concat(w,"/list")}))))))}}])&&K(t.prototype,n),a&&K(t,a),i}(a.Component))||M},QZRf:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a={"/userCenter":{title:{titleIcon:"user",titleText:"用户中心"},tabs:[{tabText:"基本资料",tabPath:"/userCenter/info"},{tabText:"安全设置",tabPath:"/userCenter/security"},{tabText:"访问用户",tabPath:["/userCenter/visit","/userCenter/look"]},{tabText:"用户角色",tabPath:["/userCenter/role","/userCenter/add"]},{tabText:"操作日志",tabPath:"/userCenter/log"},{tabText:"实例管理",tabPath:["/userCenter/case"]},{tabText:"授权管理",tabPath:["/userCenter/authorize"]},{tabText:"数据资产",tabPath:["/userCenter/dataasset","userCenter/assetdetail"]}]},"/messageCenter":{title:{titleIcon:"sound",titleText:"消息中心"},notRoute:!0,tabs:[{tabText:"全部消息"},{tabText:"未读消息"},{tabText:"已读消息"}]}}},yeL8:function(e,t,n){}}]);