(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"6S62":function(e,t,n){e.exports=n.p+"static/images/login-intro.caeb3acb16e6082b8d9f4e2151022ed6.png"},"8Q97":function(e,t,n){},ZMiO:function(e,t,n){},ppGR:function(e,t,n){},rPAB:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return se}));n("J2lP"),n("DJj6");var a=n("T9Mk"),r=n.n(a),l=n("q5+0"),o=(n("MNU5"),n("YeX6")),c=(n("6IzV"),n("QFmM")),i=(n("UdMA"),n("ViyK")),u=(n("pckg"),n("SlgS"),n("lf9m"),n("ef1R"),n("Ra8s"),n("sfoS"),n("HsXu"),n("bs69"),n("Lm8M"),n("ryEf"),n("alLo")),m=n("UEj0"),s=n("ivud"),f=n("k+EZ"),p=n("DndG"),E=n("Ua2U"),d=n("MUf8"),y=n("Nlzp"),h=n("DgvE"),b=n("6S62"),v=n.n(b),g=n("vS40");n("8Q97");function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function O(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=S(e);if(t){var r=S(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return N(this,n)}}function N(e,t){return!t||"object"!==w(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var P=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(s,e);var t,n,a,l=j(s);function s(){var e;C(this,s);for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return(e=l.call.apply(l,[this].concat(n))).state={showVerifyCode:!1,vcodeImageUrl:Object(h.i)()},e.onFinish=function(t){var n=t;n.password=Object(h.f)(n.password),Object(y.c)(y.a.loginCheck,n,{loading:!0}).then((function(t){e.props.getMenuList(),window.location=window.location.origin+window.location.pathname+"#/open/home"})).catch((function(t){var n=t.needVeriCode,a=e.state.showVerifyCode;n&&(a?e.setState({vcodeImageUrl:Object(h.i)()}):e.setState({showVerifyCode:!0}))}))},e.refreshVeriCode=function(){e.setState({vcodeImageUrl:Object(h.i)()})},e}return t=s,(n=[{key:"render",value:function(){var e=this.state,t=e.showVerifyCode,n=e.vcodeImageUrl;return r.a.createElement(c.a,{className:"login-form",onFinish:this.onFinish},r.a.createElement(c.a.Item,{name:"userName",rules:[{required:!0,message:"请输入用户名"}]},r.a.createElement(i.a,{className:"iconinput",placeholder:"请输入用户名",prefix:r.a.createElement(u.a,null)})),r.a.createElement(c.a.Item,{name:"password",rules:[{required:!0,message:"请输入密码"}]},r.a.createElement(i.a.Password,{className:"iconinput",placeholder:"请输入密码",prefix:r.a.createElement(m.a,null)})),t&&r.a.createElement(E.a,{className:"vcode",imgSrc:n,refreshVeriCode:this.refreshVeriCode}),r.a.createElement(c.a.Item,{className:"login-form-button"},r.a.createElement(o.a,{type:"primary",htmlType:"submit"},"登 录")))}}])&&O(t.prototype,n),a&&O(t,a),s}(a.Component),_=Object(s.b)(null,(function(e){return{getMenuList:function(){return e(Object(g.d)())}}}))(P);function k(){return r.a.createElement(d.a,null,r.a.createElement(f.a,{onlyLogo:!0}),r.a.createElement("div",{className:"page-content-wrapper in-login"},r.a.createElement("section",{className:"login-content-wrapper flex-row"},r.a.createElement("section",{className:"left-intro"},r.a.createElement("div",{className:"left-content"},r.a.createElement("div",{className:"intro-title"},"C-Life物联网云平台"),r.a.createElement("div",{className:"intro-content"},"深度融合物联网，人工智能，大数据技术，深耕多种行业场景，助力企业数据价值挖掘，创造未来智慧生活。"),r.a.createElement("div",{className:"intro-img-wrapper"},r.a.createElement("img",{src:v.a,alt:"介绍图片"})))),r.a.createElement("section",{className:"login-wrapper"},r.a.createElement("div",{className:"login-content"},r.a.createElement("div",{className:"login-title",style:{position:"relative"}},"使用C-Life云帐号登录"),r.a.createElement(_,null),r.a.createElement("div",{className:"login-other"},r.a.createElement("span",null,"还没有帐号? ",r.a.createElement(p.b,{to:"/account/register"},"免费注册")),r.a.createElement("span",{style:{float:"right"}},r.a.createElement(p.b,{to:"/account/forgtopassword"},"忘记密码"))))))))}n("IHDg"),n("P37N"),n("vV4J"),n("av3G"),n("RfWx"),n("8ynC");var R=n("K2PE"),D=n("g5u9"),x=(n("qgAm"),n("9b3Y"),n("Ck9u"),n("DBxd"),n("sQtw")),I=(n("gAA8"),n("UTJx"),n("dVdO"));n("ppGR");function T(e){var t=e.visible,n=e.onCancel;return r.a.createElement(I.a,{visible:t,className:"self-modal",width:1e3,title:"C-Life物联网云平台服务协议",centered:!0,closable:!0,footer:null,onCancel:n,maskClosable:!1},r.a.createElement("div",{className:"aggrement-text-wrapper"},r.a.createElement("h3",null,"介绍"),r.a.createElement("p",null,"最后修改：2019年12月"),r.a.createElement("p",null,"欢迎来到C-Life物联网云平台，希望您喜欢使用我们的服务。"),r.a.createElement("p",null,"请仔细阅读本协议，C-Life物联网云平台将依据以下条件和条款为您提供服务。"),r.a.createElement("p",null,"欢迎阅读C-Life物联网云平台用户协议(下称“本协议”)。本协议阐述之条款和条件适用于您使用C-Life物联网云平台所提供的各种工具和服务(下称“服务”)。"),r.a.createElement("h3",null,"1．服务条款的确认"),r.a.createElement("p",null,"C-Life物联网云平台根据本服务条款及对该条款的修改向用户提供服务。本服务条款具有合同法上的法律效力。"),r.a.createElement("p",null,"如果您点选“注册”并通过注册程序，即表示您自愿接受本协议之所有条款，并且同意接受C-Life物联网云平台会员服务提供的各类信息服务。"),r.a.createElement("h3",null,"2．服务内容及修改、中断、终止"),r.a.createElement("p",null,"2.1 C-Life物联网云平台服务的具体内容由本平台根据实际情况提供，并对所提供之服务拥有最终解释权。"),r.a.createElement("p",null,"2.2 C-Life物联网云平台仅向其会员提供相关服务，与相关服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均由会员自行负担。"),r.a.createElement("p",null,"2.3 鉴于网络服务的特殊性，用户同意C-Life物联网云平台有权不经过事先通知，随时变更、中断或终止部分或全部的网络服务（包括收费网络服务）。C-Life物联网云平台不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。"),r.a.createElement("p",null,"2.4 C-Life物联网云平台需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，如因此类情况而造成网络服务（包括收费网络服务）在合理时间内的中断，C-Life物联网云平台无需为此承担任何责任。"),r.a.createElement("p",null,"2.5 C-Life物联网云平台有权于任何时间暂时或永久修改或终止本服务（或其任何部分），而无论其通知与否，C-Life物联网云平台对用户和任何第三人均无需承担任何责任。"),r.a.createElement("p",null,"2.6 如果C-Life物联网云平台认为您已经违反本服务协议的文字及精神或者发布违背平台服务等的不道德言论，本平台无需进行事先通知即可立即关闭或删除您的帐号及您帐号中所有相关信息及文件，或禁止继续使用前述文件或本服务。"),r.a.createElement("h3",null,"3．会员帐号及密码"),r.a.createElement("p",null,"用户注册会员成功后，C-Life物联网云平台将给予每个会员一个帐号及相应的密码，该帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。"),r.a.createElement("p",null,"因黑客行为或会员保管疏忽致使帐号、密码被他人非法使用的，本公司不承担任何责任。如您发现任何非法使用会员帐号或安全漏洞的情况，请立即与本公司联系。"),r.a.createElement("h3",null,"4. 注册信息和隐私保护"),r.a.createElement("p",null,"4.1 C-Life物联网云平台帐号（即C-Life物联网云平台用户ID）的所有权归C-Life物联网云平台，用户完成注册申请手续后，获得C-Life物联网云平台帐号的使用权。用户应提供及时、详尽及准确的个人资料，并不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将作为注册资料。如果因用户注册信息不真实而引起的问题及其产生的后果，C-Life物联网云平台不负任何责任。"),r.a.createElement("p",null,"4.2 用户不得将其帐号、密码转让或出借予他人使用。如发现其帐号遭他人非法使用，应立即通知C-Life物联网云平台。"),r.a.createElement("div",{className:"p"},"4.3 C-Life物联网云平台不对外公开或向第三方提供单个用户的注册资料，除非：",r.a.createElement("ul",null,r.a.createElement("li",null,"事先获得用户的明确授权"),r.a.createElement("li",null,"只有透露你的个人资料，才能提供你所要求的产品和服务"),r.a.createElement("li",null,"根据有关的法律法规要求；"),r.a.createElement("li",null,"按照相关政府主管部门的要求；"),r.a.createElement("li",null,"为维护C-Life物联网云平台的合法权益；"))),r.a.createElement("p",null,"4.4 在您注册C-Life物联网云平台帐户，使用C-Life物联网云平台产品或服务，或访问C-Life物联网云平台网页时，C-Life物联网云平台会收集您的个人身份识别资料，并会将这些资料用于：改进为您提供的服务及网页内容。"),r.a.createElement("h3",null,"5. 用户权责"),r.a.createElement("p",null,"5.1 用户有权按照C-Life物联网云平台规定的程序和要求使用C-Life物联网云平台向会员提供的各项网络服务，如果会员对该服务有异议，可以与C-Life物联网云平台联系以便得到及时解决。"),r.a.createElement("p",null,"5.2 用户在使用C-Life物联网云平台服务时，必须遵守中华人民共和国相关法律法规的规定，不得利用本服务进行任何违法或不正当的活动，包括但不限于下列行为∶"),r.a.createElement("div",{className:"p"},"5.2.1 制作、复制、发布、传播或以其它方式传送含有下列内容之一的信息：",r.a.createElement("ul",null,r.a.createElement("li",null,"反对宪法所确定的基本原则的；"),r.a.createElement("li",null,"危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；"),r.a.createElement("li",null,"损害国家荣誉和利益的；"),r.a.createElement("li",null,"煽动民族仇恨、民族歧视、破坏民族团结的；"),r.a.createElement("li",null,"破坏国家宗教政策，宣扬邪教和封建迷信的；"),r.a.createElement("li",null,"散布谣言，扰乱社会秩序，破坏社会稳定的；"),r.a.createElement("li",null,"散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；"),r.a.createElement("li",null,"侮辱或者诽谤他人，侵害他人合法权利的；"),r.a.createElement("li",null,"煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；"),r.a.createElement("li",null,"以非法民间组织名义活动的；"),r.a.createElement("li",null,"含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；"),r.a.createElement("li",null,"含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；"))),r.a.createElement("div",{className:"p"},"5.2.2 不得利用C-Life物联网云平台服务从事以下活动：",r.a.createElement("ul",null,r.a.createElement("li",null,"未经允许，进入计算机信息网络或者使用计算机信息网络资源；"),r.a.createElement("li",null,"未经允许，对计算机信息网络功能进行删除、修改或者增加；"),r.a.createElement("li",null,"未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；"),r.a.createElement("li",null,"其他危害计算机信息网络安全的行为；"))),r.a.createElement("p",null,"5.3 用户违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，您同意赔偿C-Life物联网云平台与合作公司、关联公司，并使之免受损害。对此，C-Life物联网云平台有权视用户的行为性质，采取包括但不限于删除用户发布信息内容、暂停使用许可、终止服务、限制使用、回收C-Life物联网云平台帐号、追究法律责任等措施。对恶意注册C-Life物联网云平台帐号或利用C-Life物联网云平台帐号进行违法活动、捣乱、骚扰、欺骗、其他用户以及其他违反本协议的行为，C-Life物联网云平台有权回收其帐号。同时，本公司会视司法部门的要求，协助调查。"),r.a.createElement("p",null,"5.4 用户不得对C-Life物联网云平台任何部分通过任何方式进行复制、拷贝、出售、转售或用于任何其它商业目的。"),r.a.createElement("p",null,"5.5 用户须对自己在使用C-Life物联网云平台服务过程中的行为承担法律责任。用户承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在C-Life物联网云平台运营公司首先承担了因用户行为导致的行政处罚或侵权损害赔偿责任后，用户应给予C-Life物联网云平台运营公司等额的赔偿。"),r.a.createElement("h3",null,"6. 知识产权"),r.a.createElement("p",null,"C-Life物联网云平台网站及网站所使用的任何相关软件、程序、内容，包括但不限于作品、图片、档案、资料、网站构架、网站版面的安排、网页设计、经由本网站或广告商向用户呈现的广告或资讯，均由本公司或其它权利人依法享有相应的知识产权，包括但不限于著作权、商标权、专利权或其它专属权利等，受到相关法律的保护。未经本公司或权利人明示授权，用户保证不修改、出租、出借、出售、散布本网站及本网站所使用的上述任何资料和资源，或根据上述资料和资源制作成任何种类物品。"),r.a.createElement("h3",null,"7. 其他"),r.a.createElement("p",null,"7.1 因不可抗力或者其他意外事件，使得本协议的履行不可能、不必要或者无意义的，双方均不承担责任。本协议所称之不可抗力意指不能预见、不能避免并不能克服的客观情况，包括但不限于战争、台风、水灾、火灾、雷击或地震、罢工、暴动、法定疾病、黑客攻击、网络病毒、电信部门技术管制、政府行为或任何其它自然或人为造成的灾难等客观情况。"),r.a.createElement("p",null,"7.2 因本条款所引起的用户与本公司的任何纠纷或争议，首先应友好协商解决，协商不成的，用户在此同意将纠纷或争议提交本公司住所地有管辖权的人民法院诉讼解决。"),r.a.createElement("p",null,"7.3 用户正确提交注册程序所需的资料并确认本协议后，本协议在C-Life物联网云平台与用户之间成立并生效。"),r.a.createElement("p",null,"7.4 协议有效期：从用户同意本协议或使用C-Life物联网云平台起至用户注销C-Life物联网云平台服务止。"),r.a.createElement("p",null,"7.5 本协议的最终解释权归C-Life物联网云平台所有"),r.a.createElement("p",null,"7.6 如果您对我们的服务或软件的使用有任何疑问或疑问，您可以通过电子邮件与我们联系：het@szhittech.com，这是您联系我们的最有效的方式。")))}function V(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var a,r,l=[],o=!0,c=!1;try{for(n=n.call(e);!(o=(a=n.next()).done)&&(l.push(a.value),!t||l.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==n.return||n.return()}finally{if(c)throw r}}return l}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return M(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function U(e){var t=e.registerEmailGuide,n=V(Object(a.useState)(Object(h.i)()),2),l=n[0],u=n[1],m=V(Object(a.useState)(!1),2),s=m[0],f=m[1],p=V(c.a.useForm(),1)[0],d=function(){u(Object(h.i)())},b=function(){p.resetFields(["veriCode"])},v=function(){f(!s)};return r.a.createElement("div",null,r.a.createElement(c.a,{form:p,className:"form-wrapper",onFinish:function(e){var n=e.email,a=e.password,r=e.veriCode,l={email:n,password:Object(h.f)(a),userName:n,verifyCode:r};Object(y.c)(y.a.register,l,{loading:!0}).then((function(e){t({account:n})})).catch((function(e){d(),b()}))}},r.a.createElement(c.a.Item,{name:"email",rules:[{required:!0,message:"请输入注册邮箱"},{type:"email",message:"请输入正确格式的邮箱"},{max:50,message:"邮箱地址最长为50个字符"}]},r.a.createElement(i.a,{placeholder:"请使用邮箱注册"})),r.a.createElement(c.a.Item,{name:"password",rules:[{required:!0,message:"请输入账号密码"},{pattern:h.k,message:"密码要求8到18位须同时包含字母、数字、符号"}]},r.a.createElement(i.a.Password,{placeholder:"设置您的登录密码"})),r.a.createElement(c.a.Item,{name:"passwordComfirm",dependencies:["password"],rules:[{required:!0,message:"请确认账号密码"},function(e){var t=e.getFieldValue;return{validator:function(e,n){return n&&t("password")!==n?Promise.reject(new Error("两次密码输入不一致")):Promise.resolve()}}}]},r.a.createElement(i.a.Password,{placeholder:"请再次输入登录密码"})),r.a.createElement(E.a,{imgSrc:l,refreshVeriCode:d}),r.a.createElement(c.a.Item,{name:"agreement",valuePropName:"checked"},r.a.createElement(x.a,null,"阅读并同意",r.a.createElement("a",{onClick:v},"C-Life物联网云平台服务协议"))),r.a.createElement(c.a.Item,{shouldUpdate:function(e,t){return e.agreement!==t.agreement}},(function(e){var t=e.getFieldValue;return r.a.createElement(o.a,{type:"primary",htmlType:"submit",disabled:!t("agreement")},"同意协议并注册")}))),r.a.createElement(T,{visible:s,onCancel:v}))}var A=n("cNfs"),q=n.n(A),F=n("5hwo"),B=n.n(F),G={"qq.com":"http://mail.qq.com","gmail.com":"http://mail.google.com","sina.com":"http://mail.sina.com.cn","sina.cn":"http://mail.sina.com.cn","163.com":"http://mail.163.com","126.com":"http://mail.126.com","yeah.net":"http://www.yeah.net/","sohu.com":"http://mail.sohu.com/","tom.com":"http://mail.tom.com/","sogou.com":"http://mail.sogou.com/","139.com":"http://mail.10086.cn/","hotmail.com":"http://www.hotmail.com","live.com":"http://login.live.com/","live.cn":"http://login.live.cn/","live.com.cn":"http://login.live.com.cn","189.cn":"http://webmail16.189.cn/webmail/","yahoo.com.cn":"http://mail.cn.yahoo.com/","yahoo.cn":"http://mail.cn.yahoo.com/","eyou.com":"http://www.eyou.com/","21cn.com":"http://mail.21cn.com/","188.com":"http://www.188.com/","foxmail.coom":"http://www.foxmail.com"};function J(e){return(J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function H(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function z(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function Z(e,t){return(Z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function K(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=Y(e);if(t){var r=Y(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return X(this,n)}}function X(e,t){return!t||"object"!==J(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function Y(e){return(Y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var W=["成功","ok",q.a,"您可以正式使用C-Life物联网云平台","立即登录"],$=["失败","error",B.a,"邮箱验证失败，请重新提交发送验证邮箱","重新发送邮件"],ee=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Z(e,t)}(c,e);var t,n,a,l=K(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=l.call(this,e)).checkedHandle=function(){t.state.registerConfirm?window.location=window.location.origin+window.location.pathname+"#/account/login":t.resendEmail()},t.registerEmailGuide=function(e){t.setState(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?H(Object(n),!0).forEach((function(t){Q(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):H(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e)),t.countDown()},t.backToRegister=function(){t._countDown&&clearInterval(t._countDown),t.setState({account:"",countDownNum:-1})},t.resendEmail=function(e){var n=e||t.state.email;Object(y.c)(y.a.resendRegisterEmail,{email:n},{loading:!0}).then((function(a){R.a.success({message:"发送成功",description:"注册邮件发送成功，请注意查收"}),t.countDown(),e||t.setState({account:n,email:"",uuid:""})}))},t.countDown=function(){t.setState({countDownNum:60},(function(){t._countDown=setInterval((function(){var e=t.state.countDownNum;e<0?clearInterval(t._countDown):t.setState({countDownNum:e-1})}),1e3)}))},t.openMailPage=function(){var e=t.state.account,n=e.substring(e.indexOf("@")+1);if(!e||!n||!G[n])return R.a.warn({message:"跳转失败",description:"没有找到对应邮箱网址，请手动登录"}),!1;window.location=G[n]},t._countDown=null,t.state={registerConfirm:"loading",countDownNum:-1,account:"",email:Object(h.h)("email"),uuid:Object(h.h)("uuid")},t}return t=c,(n=[{key:"componentDidMount",value:function(){var e=this;console.log(111,location),console.log(222,this.props);var t=this.state,n=t.email,a=t.uuid;n&&Object(y.c)(y.a.registerConfirm,{email:n,uuid:a},{loading:!0}).then((function(){e.setState({registerConfirm:!0})})).catch((function(t){e.setState({registerConfirm:!1})}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.account,a=t.countDownNum,l=t.registerConfirm,c=t.email,i="loading"!==l,u=i&&(l&&W||$)||null;return r.a.createElement(D.a,null,c?i?r.a.createElement("div",{className:"content-area"},r.a.createElement("div",{className:"sub-title"}," ",u[0]," "),r.a.createElement("div",{style:{width:"300px"},className:"img-wrapper ".concat(u[1])},r.a.createElement("img",{style:{width:"160px"},src:u[2],alt:"反馈图标"}),r.a.createElement("p",null,u[3])),r.a.createElement("div",{style:{marginTop:"110px"},className:"button-wrapper"},r.a.createElement(o.a,{onClick:this.checkedHandle,type:"primary"},u[4]))):r.a.createElement("div",null," 验证中......"):n?r.a.createElement("div",{className:"content-area"},r.a.createElement("div",{className:"sub-title"},"邮箱验证"),r.a.createElement("div",{className:"mail-content-wrapper"},r.a.createElement("div",{className:"mail-title",style:{marginBottom:"20px"}},"尊敬的用户，您好："),r.a.createElement("div",null,"您的帐户已注册成功！在您正式使用账户之前，我们需要验证您邮箱的有效性。"),r.a.createElement("div",null,"我们已经向您的注册邮箱  ",n,"  发送了一封验证邮件，请您登录邮箱按邮件指引完成验证。")),r.a.createElement("div",{style:{width:"300px"},className:"button-wrapper",onClick:this.openMailPage},r.a.createElement(o.a,{type:"primary"},"登录邮箱")),r.a.createElement("div",{className:"mail-content-wrapper bg-gray"},r.a.createElement("div",{className:"mail-title"},"没有收到邮件？"),r.a.createElement("div",null,"1、请检查邮箱地址是否正确，你可以返回 ",r.a.createElement("a",{onClick:this.backToRegister},"重新填写")," 。"),r.a.createElement("div",null,"2、请检查你的邮箱垃圾箱。"),r.a.createElement("div",null,"3、若仍然没有收到，请尝试",a>0?r.a.createElement("span",{className:"gray"},"重新发送 ","".concat(a,"S")):r.a.createElement("a",{onClick:function(){e.resendEmail(n)}},"重新发送")))):r.a.createElement("div",{className:"content-area"},r.a.createElement("div",{className:"sub-title"}," 欢迎注册C-Life物联网云平台 "),r.a.createElement(U,{registerEmailGuide:this.registerEmailGuide}),r.a.createElement("div",{className:"right-top"},r.a.createElement("span",{className:"tip"},"已有C-Life云帐号? ")," ",r.a.createElement(p.b,{to:"/account/login"},"快速登录"))))}}])&&z(t.prototype,n),a&&z(t,a),c}(a.PureComponent),te=n("7U7l");function ne(e){return(ne="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ae(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function re(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function le(e,t){return(le=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function oe(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=ie(e);if(t){var r=ie(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return ce(this,n)}}function ce(e,t){return!t||"object"!==ne(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function ie(e){return(ie=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var ue=[{title:"身份验证"},{title:"重置密码"},{title:"完成"}],me=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&le(e,t)}(o,e);var t,n,a,l=oe(o);function o(){return ae(this,o),l.apply(this,arguments)}return t=o,(n=[{key:"render",value:function(){return r.a.createElement(te.a,{FlowList:ue,cType:1,title:"忘记密码"})}}])&&re(t.prototype,n),a&&re(t,a),o}(a.Component);n("ZMiO");function se(e){var t=e.match.path;return r.a.createElement("div",{className:"account-wrapper"},r.a.createElement(l.d,null,r.a.createElement(l.b,{path:"".concat(t,"/login"),component:k}),r.a.createElement(l.b,{path:"".concat(t,"/register"),component:ee}),r.a.createElement(l.b,{path:"".concat(t,"/forgtopassword"),component:me}),r.a.createElement(l.a,{to:"".concat(t,"/login")})))}}}]);