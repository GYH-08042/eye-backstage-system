import{f as A,j as g,$ as W,ap as $,k as L,a8 as me,l as j,m as Y,o as b,x as U,w as E,c as S,Y as ve,ag as ye,A as h,v as e,aJ as le,z as R,a9 as _,b as F,av as O,d as C,E as T,aP as ge,H as Q,aQ as he,t as be,aR as _e,aA as ke,au as $e,aS as Ee,aT as we,aU as Re,_ as q,al as Ce,F as Se,aV as X,aW as Ue,aX as Fe,s as Z,M as Le,n as x,U as Pe,C as Te,a5 as Oe,aY as ee,K as te,B as Be,r as De,aZ as je,e as Ae,ak as Ne}from"./index-87dc6a3d.js";/* empty css                */import{t as G,j as re,e as M,h as qe}from"./el-input-feb6af59.js";const ie=Symbol("uploadContextKey"),Me="ElUpload";class Ve extends Error{constructor(l,s,n,c){super(l),this.name="UploadAjaxError",this.status=s,this.method=n,this.url=c}}function se(o,l,s){let n;return s.response?n=`${s.response.error||s.response}`:s.responseText?n=`${s.responseText}`:n=`fail to ${l.method} ${o} ${s.status}`,new Ve(n,s.status,l.method,o)}function He(o){const l=o.responseText||o.response;if(!l)return l;try{return JSON.parse(l)}catch{return l}}const Ke=o=>{typeof XMLHttpRequest>"u"&&G(Me,"XMLHttpRequest is undefined");const l=new XMLHttpRequest,s=o.action;l.upload&&l.upload.addEventListener("progress",p=>{const f=p;f.percent=p.total>0?p.loaded/p.total*100:0,o.onProgress(f)});const n=new FormData;if(o.data)for(const[p,f]of Object.entries(o.data))Array.isArray(f)?n.append(p,...f):n.append(p,f);n.append(o.filename,o.file,o.file.name),l.addEventListener("error",()=>{o.onError(se(s,o,l))}),l.addEventListener("load",()=>{if(l.status<200||l.status>=300)return o.onError(se(s,o,l));o.onSuccess(He(l))}),l.open(o.method,s,!0),o.withCredentials&&"withCredentials"in l&&(l.withCredentials=!0);const c=o.headers||{};if(c instanceof Headers)c.forEach((p,f)=>l.setRequestHeader(f,p));else for(const[p,f]of Object.entries(c))re(f)||l.setRequestHeader(p,String(f));return l.send(n),l},ue=["text","picture","picture-card"];let ze=1;const J=()=>Date.now()+ze++,de=A({action:{type:String,default:"#"},headers:{type:g(Object)},method:{type:String,default:"post"},data:{type:Object,default:()=>W({})},multiple:{type:Boolean,default:!1},name:{type:String,default:"file"},drag:{type:Boolean,default:!1},withCredentials:Boolean,showFileList:{type:Boolean,default:!0},accept:{type:String,default:""},type:{type:String,default:"select"},fileList:{type:g(Array),default:()=>W([])},autoUpload:{type:Boolean,default:!0},listType:{type:String,values:ue,default:"text"},httpRequest:{type:g(Function),default:Ke},disabled:Boolean,limit:Number}),Ie=A({...de,beforeUpload:{type:g(Function),default:$},beforeRemove:{type:g(Function)},onRemove:{type:g(Function),default:$},onChange:{type:g(Function),default:$},onPreview:{type:g(Function),default:$},onSuccess:{type:g(Function),default:$},onProgress:{type:g(Function),default:$},onError:{type:g(Function),default:$},onExceed:{type:g(Function),default:$}}),We=A({files:{type:g(Array),default:()=>W([])},disabled:{type:Boolean,default:!1},handlePreview:{type:g(Function),default:$},listType:{type:String,values:ue,default:"text"}}),Xe={remove:o=>!!o},Je=["onKeydown"],Ye=["src"],Ge=["onClick"],Qe=["onClick"],Ze=["onClick"],xe=L({name:"ElUploadList"}),et=L({...xe,props:We,emits:Xe,setup(o,{emit:l}){const{t:s}=me(),n=j("upload"),c=j("icon"),p=j("list"),f=M(),w=Y(!1),k=u=>{l("remove",u)};return(u,y)=>(b(),U(Re,{tag:"ul",class:h([e(n).b("list"),e(n).bm("list",u.listType),e(n).is("disabled",e(f))]),name:e(p).b()},{default:E(()=>[(b(!0),S(ve,null,ye(u.files,m=>(b(),S("li",{key:m.uid||m.name,class:h([e(n).be("list","item"),e(n).is(m.status),{focusing:w.value}]),tabindex:"0",onKeydown:le(a=>!e(f)&&k(m),["delete"]),onFocus:y[0]||(y[0]=a=>w.value=!0),onBlur:y[1]||(y[1]=a=>w.value=!1),onClick:y[2]||(y[2]=a=>w.value=!1)},[R(u.$slots,"default",{file:m},()=>[u.listType==="picture"||m.status!=="uploading"&&u.listType==="picture-card"?(b(),S("img",{key:0,class:h(e(n).be("list","item-thumbnail")),src:m.url,alt:""},null,10,Ye)):_("v-if",!0),m.status==="uploading"||u.listType!=="picture-card"?(b(),S("div",{key:1,class:h(e(n).be("list","item-info"))},[F("a",{class:h(e(n).be("list","item-name")),onClick:O(a=>u.handlePreview(m),["prevent"])},[C(e(T),{class:h(e(c).m("document"))},{default:E(()=>[C(e(ge))]),_:1},8,["class"]),F("span",{class:h(e(n).be("list","item-file-name"))},Q(m.name),3)],10,Ge),m.status==="uploading"?(b(),U(e(he),{key:0,type:u.listType==="picture-card"?"circle":"line","stroke-width":u.listType==="picture-card"?6:2,percentage:Number(m.percentage),style:be(u.listType==="picture-card"?"":"margin-top: 0.5rem")},null,8,["type","stroke-width","percentage","style"])):_("v-if",!0)],2)):_("v-if",!0),F("label",{class:h(e(n).be("list","item-status-label"))},[u.listType==="text"?(b(),U(e(T),{key:0,class:h([e(c).m("upload-success"),e(c).m("circle-check")])},{default:E(()=>[C(e(_e))]),_:1},8,["class"])):["picture-card","picture"].includes(u.listType)?(b(),U(e(T),{key:1,class:h([e(c).m("upload-success"),e(c).m("check")])},{default:E(()=>[C(e(ke))]),_:1},8,["class"])):_("v-if",!0)],2),e(f)?_("v-if",!0):(b(),U(e(T),{key:2,class:h(e(c).m("close")),onClick:a=>k(m)},{default:E(()=>[C(e($e))]),_:2},1032,["class","onClick"])),_(" Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn"),_(" This is a bug which needs to be fixed "),_(" TODO: Fix the incorrect navigation interaction "),e(f)?_("v-if",!0):(b(),S("i",{key:3,class:h(e(c).m("close-tip"))},Q(e(s)("el.upload.deleteTip")),3)),u.listType==="picture-card"?(b(),S("span",{key:4,class:h(e(n).be("list","item-actions"))},[F("span",{class:h(e(n).be("list","item-preview")),onClick:a=>u.handlePreview(m)},[C(e(T),{class:h(e(c).m("zoom-in"))},{default:E(()=>[C(e(Ee))]),_:1},8,["class"])],10,Qe),e(f)?_("v-if",!0):(b(),S("span",{key:0,class:h(e(n).be("list","item-delete")),onClick:a=>k(m)},[C(e(T),{class:h(e(c).m("delete"))},{default:E(()=>[C(e(we))]),_:1},8,["class"])],10,Ze))],2)):_("v-if",!0)])],42,Je))),128)),R(u.$slots,"append")]),_:3},8,["class","name"]))}});var ae=q(et,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-list.vue"]]);const tt=A({disabled:{type:Boolean,default:!1}}),st={file:o=>Ce(o)},at=["onDrop","onDragover"],ce="ElUploadDrag",ot=L({name:ce}),nt=L({...ot,props:tt,emits:st,setup(o,{emit:l}){const s=Se(ie);s||G(ce,"usage: <el-upload><el-upload-dragger /></el-upload>");const n=j("upload"),c=Y(!1),p=M(),f=k=>{if(p.value)return;c.value=!1,k.stopPropagation();const u=Array.from(k.dataTransfer.files),y=s.accept.value;if(!y){l("file",u);return}const m=u.filter(a=>{const{type:r,name:t}=a,d=t.includes(".")?`.${t.split(".").pop()}`:"",v=r.replace(/\/.*$/,"");return y.split(",").map(i=>i.trim()).filter(i=>i).some(i=>i.startsWith(".")?d===i:/\/\*$/.test(i)?v===i.replace(/\/\*$/,""):/^[^/]+\/[^/]+$/.test(i)?r===i:!1)});l("file",m)},w=()=>{p.value||(c.value=!0)};return(k,u)=>(b(),S("div",{class:h([e(n).b("dragger"),e(n).is("dragover",c.value)]),onDrop:O(f,["prevent"]),onDragover:O(w,["prevent"]),onDragleave:u[0]||(u[0]=O(y=>c.value=!1,["prevent"]))},[R(k.$slots,"default")],42,at))}});var lt=q(nt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-dragger.vue"]]);const rt=A({...de,beforeUpload:{type:g(Function),default:$},onRemove:{type:g(Function),default:$},onStart:{type:g(Function),default:$},onSuccess:{type:g(Function),default:$},onProgress:{type:g(Function),default:$},onError:{type:g(Function),default:$},onExceed:{type:g(Function),default:$}}),it=["onKeydown"],ut=["name","multiple","accept"],dt=L({name:"ElUploadContent",inheritAttrs:!1}),ct=L({...dt,props:rt,setup(o,{expose:l}){const s=o,n=j("upload"),c=M(),p=X({}),f=X(),w=t=>{if(t.length===0)return;const{autoUpload:d,limit:v,fileList:i,multiple:N,onStart:P,onExceed:V}=s;if(v&&i.length+t.length>v){V(t,i);return}N||(t=t.slice(0,1));for(const H of t){const B=H;B.uid=J(),P(B),d&&k(B)}},k=async t=>{if(f.value.value="",!s.beforeUpload)return u(t);let d;try{d=await s.beforeUpload(t)}catch{d=!1}if(d===!1){s.onRemove(t);return}let v=t;d instanceof Blob&&(d instanceof File?v=d:v=new File([d],t.name,{type:t.type})),u(Object.assign(v,{uid:t.uid}))},u=t=>{const{headers:d,data:v,method:i,withCredentials:N,name:P,action:V,onProgress:H,onSuccess:B,onError:pe,httpRequest:fe}=s,{uid:K}=t,z={headers:d||{},withCredentials:N,file:t,data:v,method:i,filename:P,action:V,onProgress:D=>{H(D,t)},onSuccess:D=>{B(D,t),delete p.value[K]},onError:D=>{pe(D,t),delete p.value[K]}},I=fe(z);p.value[K]=I,I instanceof Promise&&I.then(z.onSuccess,z.onError)},y=t=>{const d=t.target.files;d&&w(Array.from(d))},m=()=>{c.value||(f.value.value="",f.value.click())},a=()=>{m()};return l({abort:t=>{Ue(p.value).filter(t?([v])=>String(t.uid)===v:()=>!0).forEach(([v,i])=>{i instanceof XMLHttpRequest&&i.abort(),delete p.value[v]})},upload:k}),(t,d)=>(b(),S("div",{class:h([e(n).b(),e(n).m(t.listType),e(n).is("drag",t.drag)]),tabindex:"0",onClick:m,onKeydown:le(O(a,["self"]),["enter","space"])},[t.drag?(b(),U(lt,{key:0,disabled:e(c),onFile:w},{default:E(()=>[R(t.$slots,"default")]),_:3},8,["disabled"])):R(t.$slots,"default",{key:1}),F("input",{ref_key:"inputRef",ref:f,class:h(e(n).e("input")),name:t.name,multiple:t.multiple,accept:t.accept,type:"file",onChange:y,onClick:d[0]||(d[0]=O(()=>{},["stop"]))},null,42,ut)],42,it))}});var oe=q(ct,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-content.vue"]]);const ne="ElUpload",pt=o=>{var l;(l=o.url)!=null&&l.startsWith("blob:")&&URL.revokeObjectURL(o.url)},ft=(o,l)=>{const s=Fe(o,"fileList",void 0,{passive:!0}),n=a=>s.value.find(r=>r.uid===a.uid);function c(a){var r;(r=l.value)==null||r.abort(a)}function p(a=["ready","uploading","success","fail"]){s.value=s.value.filter(r=>!a.includes(r.status))}const f=(a,r)=>{const t=n(r);t&&(console.error(a),t.status="fail",s.value.splice(s.value.indexOf(t),1),o.onError(a,t,s.value),o.onChange(t,s.value))},w=(a,r)=>{const t=n(r);t&&(o.onProgress(a,t,s.value),t.status="uploading",t.percentage=Math.round(a.percent))},k=(a,r)=>{const t=n(r);t&&(t.status="success",t.response=a,o.onSuccess(a,t,s.value),o.onChange(t,s.value))},u=a=>{re(a.uid)&&(a.uid=J());const r={name:a.name,percentage:0,status:"ready",size:a.size,raw:a,uid:a.uid};if(o.listType==="picture-card"||o.listType==="picture")try{r.url=URL.createObjectURL(a)}catch(t){qe(ne,t.message),o.onError(t,r,s.value)}s.value=[...s.value,r],o.onChange(r,s.value)},y=async a=>{const r=a instanceof File?n(a):a;r||G(ne,"file to be removed not found");const t=d=>{c(d);const v=s.value;v.splice(v.indexOf(d),1),o.onRemove(d,v),pt(d)};o.beforeRemove?await o.beforeRemove(r,s.value)!==!1&&t(r):t(r)};function m(){s.value.filter(({status:a})=>a==="ready").forEach(({raw:a})=>{var r;return a&&((r=l.value)==null?void 0:r.upload(a))})}return Z(()=>o.listType,a=>{a!=="picture-card"&&a!=="picture"||(s.value=s.value.map(r=>{const{raw:t,url:d}=r;if(!d&&t)try{r.url=URL.createObjectURL(t)}catch(v){o.onError(v,r,s.value)}return r}))}),Z(s,a=>{for(const r of a)r.uid||(r.uid=J()),r.status||(r.status="success")},{immediate:!0,deep:!0}),{uploadFiles:s,abort:c,clearFiles:p,handleError:f,handleProgress:w,handleStart:u,handleSuccess:k,handleRemove:y,submit:m}},mt=L({name:"ElUpload"}),vt=L({...mt,props:Ie,setup(o,{expose:l}){const s=o,n=Le(),c=M(),p=X(),{abort:f,submit:w,clearFiles:k,uploadFiles:u,handleStart:y,handleError:m,handleRemove:a,handleSuccess:r,handleProgress:t}=ft(s,p),d=x(()=>s.listType==="picture-card"),v=x(()=>({...s,fileList:u.value,onStart:y,onProgress:t,onSuccess:r,onError:m,onRemove:a}));return Pe(()=>{u.value.forEach(({url:i})=>{i!=null&&i.startsWith("blob:")&&URL.revokeObjectURL(i)})}),Te(ie,{accept:Oe(s,"accept")}),l({abort:f,submit:w,clearFiles:k,handleStart:y,handleRemove:a}),(i,N)=>(b(),S("div",null,[e(d)&&i.showFileList?(b(),U(ae,{key:0,disabled:e(c),"list-type":i.listType,files:e(u),"handle-preview":i.onPreview,onRemove:e(a)},ee({append:E(()=>[C(oe,te({ref_key:"uploadRef",ref:p},e(v)),{default:E(()=>[e(n).trigger?R(i.$slots,"trigger",{key:0}):_("v-if",!0),!e(n).trigger&&e(n).default?R(i.$slots,"default",{key:1}):_("v-if",!0)]),_:3},16)]),_:2},[i.$slots.file?{name:"default",fn:E(({file:P})=>[R(i.$slots,"file",{file:P})])}:void 0]),1032,["disabled","list-type","files","handle-preview","onRemove"])):_("v-if",!0),!e(d)||e(d)&&!i.showFileList?(b(),U(oe,te({key:1,ref_key:"uploadRef",ref:p},e(v)),{default:E(()=>[e(n).trigger?R(i.$slots,"trigger",{key:0}):_("v-if",!0),!e(n).trigger&&e(n).default?R(i.$slots,"default",{key:1}):_("v-if",!0)]),_:3},16)):_("v-if",!0),i.$slots.trigger?R(i.$slots,"default",{key:2}):_("v-if",!0),R(i.$slots,"tip"),!e(d)&&i.showFileList?(b(),U(ae,{key:3,disabled:e(c),"list-type":i.listType,files:e(u),"handle-preview":i.onPreview,onRemove:e(a)},ee({_:2},[i.$slots.file?{name:"default",fn:E(({file:P})=>[R(i.$slots,"file",{file:P})])}:void 0]),1032,["disabled","list-type","files","handle-preview","onRemove"])):_("v-if",!0)]))}});var yt=q(vt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload.vue"]]);const gt=Be(yt);const ht=F("div",{class:"el-upload__text"},[Ae(" 将图片拖拽至此或者"),F("em",null,"点击此处上传")],-1),bt=F("div",{class:"el-upload__tip"}," 支持jpg/png格式,文件大小不超过500kb ",-1),Et={__name:"UploadBox",props:{modelValue:{type:String}},emits:["update:modelValue"],setup(o,{expose:l,emit:s}){const n=o,c=localStorage.getItem("token"),p=Y(),f=De([]);n.modelValue&&f.push({name:"上次图片",url:`http://192.168.1.3:28019${n.modelValue}`});const w=y=>{console.log(y),s("update:modelValue",y.data)};l({clear:()=>{p.value.clearFiles()}});const u=()=>{Ne.error({message:"仅支持单张图片！请删除重新上传"})};return(y,m)=>{const a=T,r=gt;return b(),U(r,{ref_key:"upload",ref:p,class:"upload-demo",drag:"",limit:1,"file-list":e(f),"show-file-list":"","list-type":"picture-card",action:"/api/manage-api/v1/upload/file",headers:{token:e(c)},"on-success":w,"on-exceed":u},{tip:E(()=>[bt]),default:E(()=>[C(a,{class:"el-icon--upload"},{default:E(()=>[C(e(je))]),_:1}),ht]),_:1},8,["file-list","headers"])}}};export{Et as _};