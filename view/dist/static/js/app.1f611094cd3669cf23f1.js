webpackJsonp([1],{"4/VP":function(t,e){},"C4V+":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var c=n("VU/8")({name:"App"},s,!1,function(t){n("4/VP")},null,null).exports,l=n("/ocq"),o=void 0,a={name:"Main",data:function(){return{msg:[],list:[]}},mounted:function(){o=io("http://192.168.1.102:3000/?type=admin"),this.listener()},methods:{listener:function(){var t=this;o.on("playerChange",function(e){t.list=e})}}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mainWrap"},[n("img",{attrs:{src:"/qrcode"}}),t._v(" "),n("div",{staticClass:"msgWrap"},[n("table",[t._m(0),t._v(" "),t._l(t.list,function(e,i){return n("tr",{key:e},[n("td",[t._v(t._s(i+1))]),t._v(" "),n("td",[t._v(t._s(e))])])})],2)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",[this._v("序号")]),this._v(" "),e("td",[this._v("ID")])])}]};var u=n("VU/8")(a,d,!1,function(t){n("mduL")},null,null).exports,h=n("mvHQ"),r=n.n(h),p=void 0,v=["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","up","down","left","right"],m={name:"Con",data:function(){return this.touchX=0,this.touchY=0,{popupVisible:!1,slots:[{values:v}],edit:!1,btnList:[],editBtnList:[],selectIndex:-1,newBtnKey:v[0]}},mounted:function(){p=io("/?type=player"),this.listener()},methods:{listener:function(){p.on("welcome",function(){console.log("welcome")})},onValuesChange:function(t,e){this.newBtnKey=e[0]},handleGoEdit:function(){this.edit=!0,this.editBtnList=JSON.parse(r()(this.btnList))},handleClickAdd:function(){this.popupVisible=!0},handleKeyDown:function(t){console.log("按键被按下",t),p.emit("keydown",t)},handleKeyUp:function(t){console.log("按键被抬起",t),p.emit("keyup",t)},handleTouchStart:function(t,e){console.log(t),this.selectIndex=e,this.touchX=t.targetTouches[0].clientX,this.touchY=t.targetTouches[0].clientY},handleTouchMove:function(t,e){var n=t.targetTouches[0].clientX,i=t.targetTouches[0].clientY,s=n-this.touchX,c=i-this.touchY;this.touchX=n,this.touchY=i,this.btnList[this.selectIndex].x+=s,this.btnList[this.selectIndex].y+=c},handleClickCancel:function(){this.btnList=[].concat(this.editBtnList),this.editBtnList=[],this.edit=!1,this.selectIndex=-1},handleClickSure:function(){this.editBtnList=[],this.edit=!1,this.selectIndex=-1},handleClickAddSure:function(){this.btnList.push({key:this.newBtnKey,side:60,x:50,y:50}),this.selectIndex=-1,this.newBtnKey=v[0],this.popupVisible=!1},handleClickDel:function(){this.btnList.splice(this.selectIndex,1),this.selectIndex=-1},handleClickLarge:function(){this.btnList[this.selectIndex].side<200&&(this.btnList[this.selectIndex].side+=10)},handleClickSmall:function(){this.btnList[this.selectIndex].side>10&&(this.btnList[this.selectIndex].side-=10)}}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"conWrap"},[t.edit?t._e():n("mt-button",{staticClass:"conGoEdit",attrs:{type:"primary",size:"small"},on:{click:t.handleGoEdit}},[t._v("自定义")]),t._v(" "),t.edit?n("div",{staticClass:"conOpeBar"},[n("mt-button",{staticClass:"conBtn",attrs:{type:"primary",size:"small",disabled:t.selectIndex<0},on:{click:t.handleClickLarge}},[t._v("放大")]),t._v(" "),n("mt-button",{staticClass:"conBtn",attrs:{type:"primary",size:"small",disabled:t.selectIndex<0},on:{click:t.handleClickSmall}},[t._v("缩小")]),t._v(" "),n("mt-button",{staticClass:"conBtn",attrs:{type:"primary",size:"small"},on:{click:t.handleClickAdd}},[t._v("新增")]),t._v(" "),n("mt-button",{staticClass:"conBtn",attrs:{type:"primary",size:"small"},on:{click:t.handleClickSure}},[t._v("完成")]),t._v(" "),n("mt-button",{staticClass:"conBtn",attrs:{type:"danger",size:"small",disabled:t.selectIndex<0},on:{click:t.handleClickDel}},[t._v("删除")]),t._v(" "),n("mt-button",{staticClass:"conBtn",attrs:{size:"small"},on:{click:t.handleClickCancel}},[t._v("取消")])],1):t._e(),t._v(" "),n("div",{staticClass:"conBoard"},t._l(t.btnList,function(e,i){return n("div",{key:i,staticClass:"conBoardBtn",class:{conBoardBtnActive:t.selectIndex===i},style:{width:e.side+"px",height:e.side+"px",left:e.x+"px",top:e.y+"px"},on:{touchstart:function(n){t.edit?t.handleTouchStart(n,i):t.handleKeyDown(e.key)},touchmove:function(n){t.edit&&t.handleTouchMove(n,e)},touchend:function(n){!t.edit&&t.handleKeyUp(e.key)}}},[t._v("\n      "+t._s(e.key)+"\n    ")])})),t._v(" "),n("mt-popup",{staticStyle:{width:"100%"},attrs:{position:"bottom",closeOnClickModal:!1},model:{value:t.popupVisible,callback:function(e){t.popupVisible=e},expression:"popupVisible"}},[n("div",{staticClass:"conPopOpe"},[n("div",{staticClass:"conPopOpeCancel",on:{click:function(e){t.popupVisible=!1}}},[t._v("取消")]),t._v(" "),n("div",{staticClass:"contPopOpeSure",on:{click:t.handleClickAddSure}},[t._v("确定")])]),t._v(" "),n("mt-picker",{staticStyle:{width:"100%"},attrs:{slots:t.slots},on:{change:t.onValuesChange}})],1)],1)},staticRenderFns:[]};var _=n("VU/8")(m,f,!1,function(t){n("C4V+")},null,null).exports;i.default.use(l.a);var C=new l.a({routes:[{path:"/",name:"main",component:u},{path:"/control",component:_}]}),y=n("Au9i"),k=n.n(y);n("d8/S");i.default.use(k.a),i.default.config.productionTip=!1,new i.default({el:"#app",router:C,components:{App:c},template:"<App/>"})},"d8/S":function(t,e){},mduL:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.1f611094cd3669cf23f1.js.map