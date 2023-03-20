import{al as N,am as V,ae as re,l as H,an as ie,ac as X,Q as G,s as z,ad as ue,O as de,ao as fe,P as ce,ap as h,f as B,j as $,k as Z,aq as me,d as v,z as b,V as ye,h as pe,ar as ve,aa as be,m as C,as as Ce,at as Ee,n as E,q as j,a4 as Se,D as we,I as Te,Z as U,E as ke,au as Ae,a8 as De,_ as Be,a6 as k,o as y,x as Ie,w as A,W as Le,b as q,K as Oe,av as Me,A as m,c as T,H as Ne,a9 as p,X as he,T as Re,aw as ze,B as $e}from"./index-87dc6a3d.js";import{t as He,U as Q,c as K,u as P}from"./el-input-feb6af59.js";import{g as Ye,e as ge}from"./el-scrollbar-10e2dddd.js";var D=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))(D||{});const R=e=>{const s=N(e)?e:[e],t=[];return s.forEach(o=>{var n;N(o)?t.push(...R(o)):V(o)&&N(o.children)?t.push(...R(o.children)):(t.push(o),V(o)&&((n=o.component)!=null&&n.subTree)&&t.push(...R(o.component.subTree)))}),t},Ve=(e,s={})=>{re(e)||He("[useLockscreen]","You need to pass a ref param to this function");const t=s.ns||H("popup"),o=ie(()=>t.bm("parent","hidden"));if(!X||G(document.body,o.value))return;let n=0,a=!1,l="0";const u=()=>{setTimeout(()=>{ce(document==null?void 0:document.body,o.value),a&&document&&(document.body.style.width=l)},200)};z(e,r=>{if(!r){u();return}a=!G(document.body,o.value),a&&(l=document.body.style.width),n=Ye(t.namespace.value);const f=document.documentElement.clientHeight<document.body.scrollHeight,d=ue(document.body,"overflowY");n>0&&(f||d==="scroll")&&a&&(document.body.style.width=`calc(100% - ${n}px)`),de(document.body,o.value)}),fe(()=>u())},Ge=e=>{if(!e)return{onClick:h,onMousedown:h,onMouseup:h};let s=!1,t=!1;return{onClick:l=>{s&&t&&e(l),s=t=!1},onMousedown:l=>{s=l.target===l.currentTarget},onMouseup:l=>{t=l.target===l.currentTarget}}},Ue=B({mask:{type:Boolean,default:!0},customMaskEvent:{type:Boolean,default:!1},overlayClass:{type:$([String,Array,Object])},zIndex:{type:$([String,Number])},isGlobal:{type:Boolean}}),qe={click:e=>e instanceof MouseEvent},W="overlay";var Ke=Z({name:"ElOverlay",props:Ue,emits:qe,setup(e,{slots:s,emit:t}){const o=e.isGlobal?me(W).ns:H(W),n=r=>{t("click",r)},{onClick:a,onMousedown:l,onMouseup:u}=Ge(e.customMaskEvent?void 0:n);return()=>e.mask?v("div",{class:[o.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:a,onMousedown:l,onMouseup:u},[b(s,"default")],D.STYLE|D.CLASS|D.PROPS,["onClick","onMouseup","onMousedown"]):ye("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[b(s,"default")])}});const Pe=Ke,We=B({center:{type:Boolean,default:!1},alignCenter:{type:Boolean,default:!1},closeIcon:{type:pe},customClass:{type:String,default:""},draggable:{type:Boolean,default:!1},fullscreen:{type:Boolean,default:!1},showClose:{type:Boolean,default:!0},title:{type:String,default:""}}),Xe=B({...We,appendToBody:{type:Boolean,default:!1},beforeClose:{type:$(Function)},destroyOnClose:{type:Boolean,default:!1},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:{type:Boolean,default:!1},modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:{type:Boolean,default:!1}}),Ze={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[Q]:e=>ve(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},je=(e,s)=>{const o=Te().emit,{nextZIndex:n}=be();let a="";const l=K(),u=K(),r=C(!1),f=C(!1),d=C(!1),I=C(e.zIndex||n());let S,w;const J=Ce("namespace",Ee),_=E(()=>{const i={},c=`--${J.value}-dialog`;return e.fullscreen||(e.top&&(i[`${c}-margin-top`]=e.top),e.width&&(i[`${c}-width`]=j(e.width))),i}),F=E(()=>e.alignCenter?{display:"flex"}:{});function x(){o("opened")}function ee(){o("closed"),o(Q,!1),e.destroyOnClose&&(d.value=!1)}function oe(){o("close")}function Y(){w==null||w(),S==null||S(),e.openDelay&&e.openDelay>0?{stop:S}=U(()=>g(),e.openDelay):g()}function L(){S==null||S(),w==null||w(),e.closeDelay&&e.closeDelay>0?{stop:w}=U(()=>M(),e.closeDelay):M()}function O(){function i(c){c||(f.value=!0,r.value=!1)}e.beforeClose?e.beforeClose(i):L()}function se(){e.closeOnClickModal&&O()}function g(){X&&(r.value=!0)}function M(){r.value=!1}function te(){o("openAutoFocus")}function le(){o("closeAutoFocus")}function ne(i){var c;((c=i.detail)==null?void 0:c.focusReason)==="pointer"&&i.preventDefault()}e.lockScroll&&Ve(r);function ae(){e.closeOnPressEscape&&O()}return z(()=>e.modelValue,i=>{i?(f.value=!1,Y(),d.value=!0,I.value=e.zIndex?I.value++:n(),Se(()=>{o("open"),s.value&&(s.value.scrollTop=0)})):r.value&&L()}),z(()=>e.fullscreen,i=>{s.value&&(i?(a=s.value.style.transform,s.value.style.transform=""):s.value.style.transform=a)}),we(()=>{e.modelValue&&(r.value=!0,d.value=!0,Y())}),{afterEnter:x,afterLeave:ee,beforeLeave:oe,handleClose:O,onModalClick:se,close:L,doClose:M,onOpenAutoFocus:te,onCloseAutoFocus:le,onCloseRequested:ae,onFocusoutPrevented:ne,titleId:l,bodyId:u,closed:f,style:_,overlayDialogStyle:F,rendered:d,visible:r,zIndex:I}},Qe=B({...Xe,direction:{type:String,default:"rtl",values:["ltr","rtl","ttb","btt"]},size:{type:[String,Number],default:"30%"},withHeader:{type:Boolean,default:!0},modalFade:{type:Boolean,default:!0}}),Je=Ze,_e=Z({name:"ElDrawer",components:{ElOverlay:Pe,ElFocusTrap:ge,ElIcon:ke,Close:Ae},inheritAttrs:!1,props:Qe,emits:Je,setup(e,{slots:s}){P({scope:"el-drawer",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/drawer.html#slots"},E(()=>!!s.title)),P({scope:"el-drawer",from:"custom-class",replacement:"class",version:"2.3.0",ref:"https://element-plus.org/en-US/component/drawer.html#attributes",type:"Attribute"},E(()=>!!e.customClass));const t=C(),o=C(),n=H("drawer"),{t:a}=De(),l=E(()=>e.direction==="rtl"||e.direction==="ltr"),u=E(()=>j(e.size));return{...je(e,t),drawerRef:t,focusStartRef:o,isHorizontal:l,drawerSize:u,ns:n,t:a}}}),Fe=["aria-label","aria-labelledby","aria-describedby"],xe=["id"],eo=["aria-label"],oo=["id"];function so(e,s,t,o,n,a){const l=k("close"),u=k("el-icon"),r=k("el-focus-trap"),f=k("el-overlay");return y(),Ie(ze,{to:"body",disabled:!e.appendToBody},[v(Re,{name:e.ns.b("fade"),onAfterEnter:e.afterEnter,onAfterLeave:e.afterLeave,onBeforeLeave:e.beforeLeave,persisted:""},{default:A(()=>[Le(v(f,{mask:e.modal,"overlay-class":e.modalClass,"z-index":e.zIndex,onClick:e.onModalClick},{default:A(()=>[v(r,{loop:"",trapped:e.visible,"focus-trap-el":e.drawerRef,"focus-start-el":e.focusStartRef,onReleaseRequested:e.onCloseRequested},{default:A(()=>[q("div",Oe({ref:"drawerRef","aria-modal":"true","aria-label":e.title||void 0,"aria-labelledby":e.title?void 0:e.titleId,"aria-describedby":e.bodyId},e.$attrs,{class:[e.ns.b(),e.direction,e.visible&&"open",e.customClass],style:e.isHorizontal?"width: "+e.drawerSize:"height: "+e.drawerSize,role:"dialog",onClick:s[1]||(s[1]=Me(()=>{},["stop"]))}),[q("span",{ref:"focusStartRef",class:m(e.ns.e("sr-focus")),tabindex:"-1"},null,2),e.withHeader?(y(),T("header",{key:0,class:m(e.ns.e("header"))},[e.$slots.title?b(e.$slots,"title",{key:1},()=>[p(" DEPRECATED SLOT ")]):b(e.$slots,"header",{key:0,close:e.handleClose,titleId:e.titleId,titleClass:e.ns.e("title")},()=>[e.$slots.title?p("v-if",!0):(y(),T("span",{key:0,id:e.titleId,role:"heading",class:m(e.ns.e("title"))},Ne(e.title),11,xe))]),e.showClose?(y(),T("button",{key:2,"aria-label":e.t("el.drawer.close"),class:m(e.ns.e("close-btn")),type:"button",onClick:s[0]||(s[0]=(...d)=>e.handleClose&&e.handleClose(...d))},[v(u,{class:m(e.ns.e("close"))},{default:A(()=>[v(l)]),_:1},8,["class"])],10,eo)):p("v-if",!0)],2)):p("v-if",!0),e.rendered?(y(),T("div",{key:1,id:e.bodyId,class:m(e.ns.e("body"))},[b(e.$slots,"default")],10,oo)):p("v-if",!0),e.$slots.footer?(y(),T("div",{key:2,class:m(e.ns.e("footer"))},[b(e.$slots,"footer")],2)):p("v-if",!0)],16,Fe)]),_:3},8,["trapped","focus-trap-el","focus-start-el","onReleaseRequested"])]),_:3},8,["mask","overlay-class","z-index","onClick"]),[[he,e.visible]])]),_:3},8,["name","onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["disabled"])}var to=Be(_e,[["render",so],["__file","/home/runner/work/element-plus/element-plus/packages/components/drawer/src/drawer.vue"]]);const ro=$e(to);export{ro as E,R as f};