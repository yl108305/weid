(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"01f8":function(e,t,a){"use strict";var n=a("6591"),o=a.n(n);o.a},"44bd":function(e,t,a){"use strict";a.r(t);var n=a("545e"),o=a("4c33");for(var u in o)"default"!==u&&function(e){a.d(t,e,(function(){return o[e]}))}(u);a("01f8");var s,r=a("f0c5"),c=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);t["default"]=c.exports},"4c33":function(e,t,a){"use strict";a.r(t);var n=a("fcf8"),o=a.n(n);for(var u in n)"default"!==u&&function(e){a.d(t,e,(function(){return n[e]}))}(u);t["default"]=o.a},"545e":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return u})),a.d(t,"a",(function(){return n}));var o=function(){var e=this,t=e.$createElement;e._self._c},u=[]},6591:function(e,t,a){},dbb7:function(e,t,a){"use strict";(function(e){a("d404");n(a("66fd"));var t=n(a("44bd"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=a,e(t.default)}).call(this,a("543d")["createPage"])},fcf8:function(e,t,a){"use strict";(function(e){var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{user:"",password:""}},onLoad:function(){a=this,e.getStorage({key:"user",success:function(e){a.user=e.data}}),e.getStorage({key:"password",success:function(e){a.password=e.data}})},methods:{sub:function(){e.showLoading({title:"登录ing"}),e.login({provider:"weixin",success:function(t){e.request({url:a.$api_url+"merchant/openid",data:{code:t.code},success:function(t){e.setStorage({key:"openid",data:t.data.data.openid}),"success"==t.data.msg&&e.request({url:a.$api_url+"merchant/login",data:{openid:t.data.data.openid,user:a.user,password:a.password},method:"post",header:{"custom-header":"hello"},success:function(t){console.log(t.data.msg),e.hideLoading(),"登陆成功"==t.data.msg?(e.navigateTo({url:"../home/index"}),e.setStorage({key:"user",data:a.user}),e.setStorage({key:"password",data:a.password})):e.showModal({title:t.data.msg})}})}})}})}}};t.default=n}).call(this,a("543d")["default"])}},[["dbb7","common/runtime","common/vendor"]]]);