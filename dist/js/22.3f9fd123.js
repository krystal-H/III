(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{IF1Y:function(e,t,n){},JuQn:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return M}));n("QcZr");var r=n("b+L2"),a=(n("MNU5"),n("YeX6")),o=(n("UdMA"),n("ViyK")),i=(n("SmMv"),n("DTgQ")),c=(n("sfoS"),n("gAA8"),n("0Us0"),n("pckg"),n("9b3Y"),n("SlgS"),n("lf9m"),n("IHDg"),n("ef1R"),n("P37N"),n("vV4J"),n("av3G"),n("RfWx"),n("Ra8s"),n("HsXu"),n("bs69"),n("Lm8M"),n("ryEf"),n("T9Mk")),l=n.n(c),u=n("DndG"),s=n("Nlzp"),f=n("FC04"),p=(n("qgAm"),n("Ck9u"),n("hEGT"),n("UTJx"),n("dVdO")),d=(n("6IzV"),n("QFmM")),m=n("P2RN");function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,o=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){c=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return O(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v=o.a.TextArea,w=d.a.Item,j={labelCol:{span:4},wrapperCol:{span:20}};function x(e,t){var n=e.visible,r=e.switchOpen,a=e.pagerIndex,i=g(d.a.useForm(),1)[0],c=function(){r(!1),i.resetFields()};return l.a.createElement(p.a,{title:"新增分组",visible:n,width:600,onOk:i.submit,onCancel:c,maskClosable:!1,className:"self-modal"},l.a.createElement(d.a,b({form:i},j,{onFinish:function(e){Object(s.c)(s.a.updateGroup,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){h(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e)).then((function(e){Object(m.a)({type:"success",description:"新增成功！"}),c(),a(1)}))}}),l.a.createElement(w,{label:"分组名称",name:"name",rules:[{required:!0,message:"请输入分组名称"},{max:30,message:"最大输入长度为30"}]},l.a.createElement(o.a,{placeholder:"请输入分组名称"})),l.a.createElement(w,{label:"分组描述",name:"remark",rules:[{max:50,message:"最大输入长度为50"}]},l.a.createElement(v,{placeholder:"分组描述",showCount:!0,maxLength:50,rows:4}))))}var E=Object(c.memo)(Object(c.forwardRef)(x)),S=n("MeRu"),P=n("DgvE");n("IF1Y");function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){D(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function D(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function L(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=G(e);if(t){var a=G(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return A(this,n)}}function A(e,t){return!t||"object"!==I(t)&&"function"!=typeof t?T(e):t}function T(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function G(e){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var M=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(d,e);var t,n,c,p=L(d);function d(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,d),(t=p.call(this,e)).getList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.state,r=n.pageIndex,a=n.searchName;Object(s.c)(s.a.getGroupList,C({pageIndex:r,pageRows:10,name:a||void 0},e)).then((function(e){t.setState({caseList:e.data.list||[],pager:e.data.pager||{}})})).finally((function(){t.setState({loading:!1})}))},t.switchOpen=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];t.setState({addVisible:e})},t.openDel=function(e,n){t.setState({id:e,name:n})},t.delOkCancel=function(e){if("ok"==e){var n=t.state.id;Object(s.c)(s.a.deleteGroup,{id:n}).then((function(e){t.setState({loading:!0,id:""},(function(){t.getList()}))}))}else t.setState({id:""})},t.searchGroup=function(e){t.setState({loading:!0,searchName:e},(function(){t.pagerIndex(1)}))},t.pagerIndex=function(e){t.setState({pageIndex:e,loading:!0},(function(){t.getList()}))},t.state={loading:!0,caseList:[],pager:{},searchName:void 0,name:"",id:"",addVisible:!1,pageIndex:1},t.columns=[{title:"分组名称",dataIndex:"name",ellipsis:!0},{title:"分组ID",dataIndex:"id",width:"100px"},{title:"描述",dataIndex:"remark",ellipsis:!0},{title:"添加时间",dataIndex:"createTime",width:"180px",render:function(e){return l.a.createElement("span",null,e&&P.a.utcToDev(e)||"--")}},{title:"操作",key:"action",width:"120px",render:function(e,n){return l.a.createElement("span",null,l.a.createElement(u.b,{to:"/open/device/devGroup/details/".concat(n.id,"/").concat(n.groupId)},"查看"),l.a.createElement(i.a,{type:"vertical"}),l.a.createElement("a",{onClick:t.openDel.bind(T(t),n.id,n.name)},"删除"))}}],t}return t=d,(n=[{key:"componentDidMount",value:function(){this.getList()}},{key:"render",value:function(){var e=this,t=this.state,n=t.loading,i=t.addVisible,c=t.caseList,u=t.pager,s=u.pageIndex,p=void 0===s?1:s,d=u.totalRows,m=void 0===d?0:d,b=u.totalPages,y=void 0===b?0:b,h=t.id,g=t.name;return l.a.createElement("div",{className:"page-devicegroup"},l.a.createElement(S.a,{title:"设备分组"}),l.a.createElement("div",{className:"comm-shadowbox searchbox"},l.a.createElement("div",{className:"comm-searchBox"},l.a.createElement(o.a.Search,{placeholder:"请输入分组名查找",enterButton:!0,maxLength:20,onSearch:function(t){return e.searchGroup(t)}})),l.a.createElement(a.a,{className:"btn",type:"primary",onClick:this.switchOpen},"新增分组")),l.a.createElement("div",{className:"comm-shadowbox tablebox"},l.a.createElement(r.a,{rowKey:"id",columns:this.columns,dataSource:c,pagination:{defaultCurrent:p,total:m,onChange:this.pagerIndex,current:p,showSizeChanger:!1,showQuickJumper:y>5,hideOnSinglePage:!0},loading:n})),l.a.createElement(E,{visible:i,switchOpen:this.switchOpen,pagerIndex:this.pagerIndex}),l.a.createElement(f.a,{visible:!!h,modalOKHandle:this.delOkCancel.bind(this,"ok"),modalCancelHandle:this.delOkCancel.bind(this,"cancel"),title:"删除分组",descText:"即将删除分组",targetName:g}))}}])&&N(t.prototype,n),c&&N(t,c),d}(c.Component)}}]);