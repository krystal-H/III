(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{QOSG:function(e,t,a){"use strict";a.r(t);a("NBAS"),a("SuFq"),a("tkto"),a("pNMO"),a("TeQF"),a("5DmW"),a("FZtP"),a("27RR"),a("4Brf"),a("0oug"),a("4mDm"),a("PKPk"),a("3bBZ"),a("k3Gp");var n=a("kLXV"),o=(a("mbEz"),a("wCAj")),r=(a("L/Qf"),a("2/Rp")),l=(a("8QGh"),a("2fM7")),c=(a("1vPl"),a("5rEg")),i=a("BkRI"),m=a.n(i),s=(a("SYor"),a("07d7"),a("5s+n"),a("p532"),a("ma9I"),a("2B1R"),a("q1tI")),u=a.n(s),d=a("mU7p"),p=a("kqA8"),y=a("FC04"),b=a("P2RN"),f=a("MeRu"),N=a("Nlzp"),S=a("Uz1T");a("dP/0");function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function v(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(Object(a),!0).forEach((function(t){P(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function P(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function w(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function O(e,t){return(O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function I(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=E(e);if(t){var o=E(this).constructor;a=Reflect.construct(n,arguments,o)}else a=n.apply(this,arguments);return k(this,a)}}function k(e,t){if(t&&("object"===h(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var V=c.a.Search,C=l.a.Option,L=["开发中","已发布","审核中"],j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&O(e,t)}(h,e);var t,a,i,s=I(h);function h(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,h),(t=s.call(this,e)).getProductListNew=function(){Object(N.c)(N.a.getProductListNew,v({},t.state.listParams),{loading:!0}).then((function(e){var a={current:e.data.current,size:e.data.size,pages:e.data.pages,total:e.data.total};t.setState({dataSource:e.data.records,pager:a})}))},t.searchProduct=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=m()(t.state.listParams);a.productName=e.trim(),a.current=1,t.setState({listParams:a},(function(){t.getProductListNew()}))},t.handleChange=function(e){var a=m()(t.state.listParams);a.mode=e,a.current=1,t.setState({listParams:a},(function(){t.getProductListNew()}))},t.changePage=function(e,a){var n=v({},t.state.listParams);n.current=e,t.setState({listParams:n},(function(){t.getProductListNew()}))},t.deleteModalOKHandle=function(){var e=t.state,a=e.selectedItem,n=e.deleteInputValue.trim(),o=a.productId;if(!n||"delete"!==n)return Object(b.a)({type:"warn",message:"异常操作",description:'请输入"delete"来确认删除！'});t.setState({deleteLoading:!0},(function(){Object(N.c)(N.a.deleteProductNew,{productId:o}).then((function(e){Object(b.a)({type:"success",description:"删除成功！"}),t.setState({deleteVisible:!1,deleteInputValue:""}),t.getProductListNew()})).finally((function(){return t.setState({deleteLoading:!1})}))}))},t.copyModalOKHandle=function(){var e=t.state,a=e.copyInputValue,n=e.selectedItem,o=a.trim(),r=n.productId;if(!o)return Object(b.a)({type:"warn",message:"异常操作",description:"请输入产品名称！"});t.setState({copyLoading:!0},(function(){Object(N.c)(N.a.copyProductNew,{productId:r,productName:o}).then((function(e){0===e.code&&Object(b.a)({type:"success",description:"复制成功！"}),t.setState({listParams:m()(t.defaultListParams),copyModalVisible:!1,copyInputValue:""},(function(){t.getProductListNew()}))})).finally((function(){t.setState({copyLoading:!1})}))}))},t.createProduct=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t.setState({isClicked:!e})},t.toggleOldProVisiable=function(){t.setState({oldProIngVisiable:!t.state.oldProIngVisiable})},t.changeVisible=function(){t.setState({isClicked:!1})},t.defaultListParams={current:1,size:6,productName:"",mode:""},t.state={dataSource:[],pager:{},listParams:m()(t.defaultListParams),selectedItem:null,deleteVisible:!1,deleteLoading:!1,deleteInputValue:"",copyModalVisible:!1,copyLoading:!1,copyInputValue:"",isClicked:!1,oldProIngVisiable:!1},t.columns=[{title:"产品",dataIndex:"productName",key:"productName",width:380,render:function(e,t,a){return u.a.createElement("div",{className:"pro-show"},u.a.createElement(p.a,{icon:t.productIcon}),u.a.createElement("div",{className:"pro-show-cont"},u.a.createElement("div",{className:"pro-show-cont-title"},e),u.a.createElement("div",{className:"pro-show-cont-item"},"产品ID：",t.productId),u.a.createElement("div",{className:"pro-show-cont-item"},"型号：",t.productCode)))}},{title:"品类",dataIndex:"deviceType",key:"deviceType"},{title:"智能化方案",dataIndex:"schemeName",key:"schemeName"},{title:"通信协议",dataIndex:"bindTypeStr",key:"bindTypeStr"},{title:"状态",dataIndex:"status",key:"status",render:function(e){return u.a.createElement("span",{className:"status status-".concat(e)},d.e[""+e]||"")}},{title:"操作",key:"",width:250,render:function(e,a){return u.a.createElement("div",{className:"operation"},u.a.createElement("span",{className:"continue",onClick:function(){return t.clickProductInfo(a)}},1===a.status?"开发详情":"继续开发"),1===a.voiceable&&u.a.createElement("span",{className:"copy mar25",onClick:function(){return t.setVoice(a)}},"语音"),0===a.isOldProduct&&u.a.createElement("span",{className:"copy mar25",onClick:function(){return t.operateProduct(a,"copyModalVisible")}},"复制"),0===a.status&&u.a.createElement("span",{className:"delete mar25",onClick:function(){return t.operateProduct(a,"deleteVisible")}},"删除"))}}],t}return t=h,(a=[{key:"componentDidMount",value:function(){this.getProductListNew(),sessionStorage.removeItem("productItem")}},{key:"setVoice",value:function(e){sessionStorage.setItem("productItem",JSON.stringify(e)),this.props.history.push({pathname:"/open/product/proManage/voiceSetting/".concat(e.productId)})}},{key:"clickProductInfo",value:function(e){var t=e.status,a=e.isOldProduct,n=e.productId,o=e.step,r=void 0===o?1:o;if(a&&1!==t)this.toggleOldProVisiable();else{var l="details";1!==t?l="edit":a&&(l="detail"),sessionStorage.setItem("productItem",JSON.stringify(e)),sessionStorage.setItem("stepnum",r-1),this.props.history.push({pathname:"/open/product/proManage/".concat(l,"/").concat(n)})}}},{key:"operateProduct",value:function(e,t){var a;if(2===e.mode)return!1;this.setState((P(a={},t,!0),P(a,"selectedItem",e),a))}},{key:"modalCancelHandle",value:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copyModalVisible",a=arguments.length>1?arguments[1]:void 0;this.setState((P(e={},t,!1),P(e,a,""),e))}},{key:"inputOnChangeHandle",value:function(e,t){this.setState(P({},e,t.target.value))}},{key:"render",value:function(){var e=this,t=this.state,a=t.listParams,i=t.selectedItem,m=t.deleteVisible,s=t.deleteLoading,d=t.deleteInputValue,p=t.copyModalVisible,b=t.copyLoading,N=t.copyInputValue,h=t.isClicked,g=t.dataSource,v=t.pager,P=t.oldProIngVisiable;return u.a.createElement("section",{className:"page-wrapper"},u.a.createElement(f.a,{title:"我的智能产品"}),u.a.createElement("div",{className:"page-header comm-shadowbox"},u.a.createElement("div",{className:"page-header-left"},u.a.createElement(V,{placeholder:"产品名称/ID/型号",allowClear:!0,onSearch:function(t){return e.searchProduct(t)},style:{width:465,margin:"0 22px"}}),u.a.createElement(l.a,{allowClear:!0,onChange:this.handleChange,placeholder:"产品状态",style:{width:120}},L.map((function(e,t){return u.a.createElement(C,{value:t,key:e},e)})))),u.a.createElement("div",{className:"page-header-right"},u.a.createElement(r.a,{type:"primary",onClick:this.createProduct.bind(this,!1)},"创建产品"))),u.a.createElement("div",{className:"bg-wrapper flex1 flex-column comm-shadowbox"},u.a.createElement("div",{className:"page-table-wrapper flex-column flex1"},u.a.createElement(o.a,{rowKey:"productId",dataSource:g,columns:this.columns,pagination:{defaultCurrent:1,current:a.current,onChange:this.changePage,pageSize:6,total:v.total,showSizeChanger:!1,showQuickJumper:v.pages>5,showTotal:function(e){return u.a.createElement("span",null,"共 ",u.a.createElement("a",null,e)," 条")}}}))),i&&m&&u.a.createElement(y.a,{visible:m,modalOKHandle:this.deleteModalOKHandle,modalCancelHandle:this.modalCancelHandle.bind(this,"deleteVisible","deleteInputValue"),targetName:i.productName,confirmLoading:s,title:"删除产品",needWarnIcon:!0,descText:"即将删除的产品",tipText:"产品的所有信息将完全被删除，无法找回，请谨慎操作"},u.a.createElement(c.a,{className:"modal-content-input",onChange:function(t){e.inputOnChangeHandle("deleteInputValue",t)},onPressEnter:this.deleteModalOKHandle,placeholder:"请输入“delete”确认删除该产品",maxLength:20,value:d})),i&&p&&u.a.createElement(y.a,{visible:p,modalOKHandle:this.copyModalOKHandle,modalCancelHandle:this.modalCancelHandle.bind(this,"copyModalVisible","copyInputValue"),targetName:i.productName,confirmLoading:b,title:"复制产品",descText:"即将复制的产品",tipText:"创建与原产品的功能和服务配置一样的新产品"},u.a.createElement(c.a,{className:"modal-content-input",onChange:function(t){e.inputOnChangeHandle("copyInputValue",t)},onPressEnter:this.copyModalOKHandle,value:N,maxLength:20,placeholder:"新产品名称"})),h&&u.a.createElement(S.a,{visible:h,cancelHandle:this.createProduct.bind(this,!0),getProductListNew:function(){e.getProductListNew()}}),u.a.createElement(n.a,{title:"更新升级",visible:P,onOk:this.toggleOldProVisiable,onCancel:this.toggleOldProVisiable},u.a.createElement("p",null," clife平台全新升级，老版本的开发中或审核中状态的产品，需要在新平台重新创建")))}}])&&w(t.prototype,a),i&&w(t,i),h}(s.PureComponent);t.default=j},"dP/0":function(e,t,a){},mU7p:function(e,t,a){"use strict";a.d(t,"e",(function(){return n})),a.d(t,"a",(function(){return o})),a.d(t,"f",(function(){return r})),a.d(t,"b",(function(){return l})),a.d(t,"d",(function(){return c})),a.d(t,"g",(function(){return i})),a.d(t,"c",(function(){return m}));var n={0:"开发中",1:"已发布",2:"审核中"},o={1:"草稿",2:"审核中",3:"灰度版本",4:"正式版本"},r={1:"SDK开发",2:"在线拖拽"},l={0:"草稿",1:"已发布",2:"删除"},c=[{value:"全部状态 ",key:"-1"},{value:"已入网 ",key:"1 "},{key:"0 ",value:"未入网 "}],i=[{Symbol:"无",Name:"无"},{Symbol:"μg/m³",Name:"不知道2"},{Symbol:"mV",Name:"mV"},{Symbol:"mg/m³",Name:"不知道3"},{Symbol:"cal",Name:"卡路里"},{Symbol:"g",Name:"克"},{Symbol:"kg",Name:"千克"},{Symbol:"t",Name:"吨"},{Symbol:"mL",Name:"毫升"},{Symbol:"L",Name:"升"},{Symbol:"℉",Name:"华氏度"},{Symbol:"°C",Name:"摄氏度"},{Symbol:"%RH",Name:"相对湿度"},{Symbol:"nm",Name:"纳米"},{Symbol:"μm",Name:"微米"},{Symbol:"cm",Name:"厘米"},{Symbol:"m",Name:"米"},{Symbol:"km",Name:"千米"},{Symbol:"s",Name:"秒"},{Symbol:"min",Name:"分钟"},{Symbol:"h",Name:"小时"},{Symbol:"day",Name:"日"},{Symbol:"week",Name:"周"},{Symbol:"month",Name:"月"},{Symbol:"year",Name:"年"},{Symbol:"mmHg",Name:"血压"},{Symbol:"mmol/L",Name:"血糖"},{Symbol:"pH",Name:"PH值"},{Symbol:"dS/m",Name:"土壤EC值"},{Symbol:"W/㎡",Name:"太阳总辐射"},{Symbol:"mm/hour",Name:"降雨量"},{Symbol:"N",Name:"牛"},{Symbol:"aw",Name:"饱和度"},{Symbol:"pixel",Name:"像素"},{Symbol:"Lux",Name:"照度"},{Symbol:"grav",Name:"重力加速度"},{Symbol:"dB",Name:"分贝"},{Symbol:"lm",Name:"流明"},{Symbol:"bit",Name:"比特"},{Symbol:"count",Name:"次"},{Symbol:"turn/m",Name:"转每分钟"},{Symbol:"GB",Name:"吉字节"},{Symbol:"MB",Name:"兆字节"},{Symbol:"KB",Name:"千字节"},{Symbol:"B",Name:"字节"},{Symbol:"%",Name:"百分比"},{Symbol:"g/L",Name:"克每升"},{Symbol:"g/m³",Name:"克每立方米"},{Symbol:"kg/m³",Name:"千克每立方米"},{Symbol:"F",Name:"法拉"},{Symbol:"Ω",Name:"欧姆"},{Symbol:"mA",Name:"毫安"},{Symbol:"A",Name:"安培"},{Symbol:"V",Name:"伏特"},{Symbol:"kV",Name:"千伏"},{Symbol:"Hz",Name:"赫兹"},{Symbol:"W",Name:"瓦特"},{Symbol:"Wh",Name:"瓦时"},{Symbol:"eV",Name:"电子伏"},{Symbol:"J",Name:"焦耳"},{Symbol:"kJ",Name:"千焦"},{Symbol:"hPa",Name:"百帕"},{Symbol:"kPa",Name:"千帕"},{Symbol:"cm³",Name:"立方厘米"},{Symbol:"m³",Name:"立方米"},{Symbol:"h㎡",Name:"公顷"},{Symbol:"c㎡",Name:"平方厘米"},{Symbol:"㎡",Name:"平方米"}],m=[{value:1,label:1},{value:10,label:10},{value:100,label:100},{value:1e3,label:1e3},{value:1e4,label:1e4}]}}]);