import{m as g,D as J,n as V,a0 as K,o as w,c as D,b as s,d as e,w as t,e as i,H as f,W as R,X as O,v as u,ah as Q,x as k,a9 as E,Y as N,ag as Z,b5 as ee,b6 as te,ae as F,E as le}from"./index-87dc6a3d.js";import{E as oe}from"./el-select-a16e320c.js";import{a as ae,E as re}from"./el-input-feb6af59.js";import{c as ne,d as se}from"./el-scrollbar-10e2dddd.js";/* empty css                 */import{E as de,a as ie,b as pe}from"./el-table-column-d69f2288.js";import{E as ue}from"./el-popover-ffc4f456.js";/* empty css                          *//* empty css                */import{a as ce,b as fe,E as _e}from"./el-col-cf38a599.js";import{E as ge}from"./el-image-viewer-b78ccc76.js";import{u as ve}from"./useOrderStore-72e0ced4.js";import"./strings-31cb2fe7.js";const me={class:"row1"},we={style:{"font-weight":"800","text-align":"left"}},ye={style:{"text-align":"left"}},xe={style:{"text-align":"left"}},be={style:{"text-align":"center"}},he=s("span",null,"订单状态",-1),Ce={class:"row3"},Fe={__name:"DeliverPage",setup(Se){const r=ve();let p=g(),x=g();J(()=>{p.value,x.value=window.getComputedStyle(p.value).height}),window.onresize=()=>{let n=0,l=0;window.getComputedStyle(p.value).boxSizing=="border-box"&&(n=window.getComputedStyle(p.value).paddingTop?window.getComputedStyle(p.value).paddingTop.replace("px",""):0,l=window.getComputedStyle(p.value).paddingBottom?window.getComputedStyle(p.value).paddingBottom.replace("px",""):0),x.value=`${window.getComputedStyle(p.value).height.replace("px","")-n-l}px`,console.log(window.getComputedStyle(p.value).height,n,l,x.value)};const b=g(),d=g(!1),P=(n,l)=>{l=="deliver"?r.getOrdersDeliver({ids:[n.row.orderId]}):r.getOrdersClose({ids:[n.row.orderId]})},T=n=>{d.value&&b.value.getSelectionRows().length&&(n=="deliver"?r.getOrdersDeliver({ids:b.value.getSelectionRows().map(l=>l.orderId)}):r.getOrdersClose({ids:b.value.getSelectionRows().map(l=>l.orderId)}),d.value=!d.value)},U=n=>{switch(n){case-1:return"已关闭";case 0:return"待支付";case 1:return"待配货";case 2:return"待发货";case 3:return"待收货";case 4:return"交易成功"}},j=(n,l,_)=>{const $=_.property;return l[$]===n},h=g(),z=g(),v=g(!1),H=()=>{r.ordersFilter=h.value},L=()=>{r.orderStatus=z.value[0],v.value=!1},C=V({get(){return r.ordersPage},set(n){r.ordersPage=n}}),S=V({get(){return r.ordersSize},set(n){r.ordersSize=n}});return K(async()=>{await r.getOrdersList(C.value,S.value,r.ordersFilter,r.orderStatus)}),(n,l)=>{const _=ae,$=re,c=de,M=ge,I=ce,y=fe,G=_e,B=le,m=ne,W=se,X=ue,Y=ie,q=pe,A=oe;return w(),D(N,null,[s("div",me,[e(_,{onClick:l[0]||(l[0]=o=>d.value=!d.value),type:"default"},{default:t(()=>[i(f(d.value?"取消批量操作":"批量操作"),1)]),_:1}),R(e(_,{onClick:l[1]||(l[1]=o=>T("prepare")),type:"success"},{default:t(()=>[i(f("发货"))]),_:1},512),[[O,d.value]]),R(e(_,{onClick:l[2]||(l[2]=o=>T("close")),type:"danger"},{default:t(()=>[i(f("关闭订单"))]),_:1},512),[[O,d.value]]),e($,{modelValue:h.value,"onUpdate:modelValue":l[3]||(l[3]=o=>h.value=o),class:"w-50 m-2",placeholder:"搜索订单号","prefix-icon":u(Q),onChange:H,style:{width:"200px"}},null,8,["modelValue","prefix-icon"]),s("span",{onClick:l[4]||(l[4]=o=>{u(r).ordersFilter="",h.value=""}),style:{"margin-left":"10px",cursor:"pointer"}},"清空搜索")]),s("div",{ref_key:"tableContainerRef",ref:p,class:"row2"},[e(q,{ref_key:"multipleTableRef",ref:b,stripe:"",border:"",height:u(x),style:{width:"100%","text-align":"center"},data:u(r).ordersList,"row-key":"orderNo"},{empty:t(()=>[e(Y,{description:"加载中"})]),default:t(()=>[d.value?(w(),k(c,{key:0,type:"selection","min-width":"55px","reserve-selection":"",fixed:""})):E("",!0),e(c,{type:"index","min-width":"55px",label:"序号",fixed:""}),e(c,{label:"ID","min-width":"200px",property:"orderNo"}),e(c,{label:"订单内容","min-width":"320px"},{default:t(o=>[e(G,{"body-style":{padding:"10px"},style:{width:"300px",padding:"0",display:"flex","justify-content":"center"}},{default:t(()=>[(w(!0),D(N,null,Z(o.row.orderDetail,a=>(w(),k(y,{style:{flex:"1","border-bottom":"1px solid gray"},key:a.goodsId},{default:t(()=>[e(I,{span:8,style:{display:"flex","justify-content":"center","align-items":"center"}},{default:t(()=>[e(M,{src:`http://192.168.1.3:28019${a==null?void 0:a.goodsCoverImg}`,style:{width:"100px",height:"120px"},fit:"contain","hide-on-click-modal":!0,lazy:"","preview-src-list":[`http://192.168.1.3:28019${a==null?void 0:a.goodsCoverImg}`]},null,8,["src","preview-src-list"])]),_:2},1024),e(I,{span:16,style:{display:"flex","flex-flow":"column","align-items":"flex-start","font-size":"14px",padding:"0 14px"}},{default:t(()=>[e(y,{gutter:10,style:{flex:"1"}},{default:t(()=>[s("span",we,f(`商品名称：${a==null?void 0:a.goodsName}`),1)]),_:2},1024),e(y,{style:{flex:"1"}},{default:t(()=>[s("span",ye,f(`订购数量：${a==null?void 0:a.goodsCount}`),1)]),_:2},1024),e(y,{style:{flex:"1"}},{default:t(()=>[s("span",xe,f(`商品价格：${a==null?void 0:a.sellingPrice}`),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128)),e(y,{style:{height:"15px","text-align":"center"}},{default:t(()=>{var a;return[s("span",be,f(`下单时间：${(a=o.row)==null?void 0:a.createTime}`),1)]}),_:2},1024)]),_:2},1024)]),_:1}),E("",!0),e(c,{property:"payStatus",label:"支付状态","min-width":"150px","show-overflow-tooltip":"",sortable:"",filters:[{text:"已支付",value:1},{text:"未支付",value:0}],"filter-method":j},{default:t(o=>[s("span",null,f(o.row.payStatus?"已支付":"未支付"),1)]),_:1}),e(c,{property:"payTime",label:"支付时间","min-width":"160px","show-overflow-tooltip":"",sortable:""}),e(c,{property:"payTypeString",label:"支付方式","min-width":"100px","show-overflow-tooltip":""}),e(c,{property:"orderStatus",label:"订单状态","min-width":"120px","show-overflow-tooltip":""},{header:t(()=>[e(X,{placement:"top-start",width:100,visible:v.value},{reference:t(()=>[s("div",{style:{cursor:"pointer"},onClick:l[5]||(l[5]=o=>v.value=!v.value)},[he,v.value?E("",!0):(w(),k(B,{key:0,size:"16px"},{default:t(()=>[e(u(ee))]),_:1})),v.value?(w(),k(B,{key:1,size:"16px"},{default:t(()=>[e(u(te))]),_:1})):E("",!0)])]),default:t(()=>[e(W,{modelValue:z.value,"onUpdate:modelValue":l[6]||(l[6]=o=>z.value=o),max:1,onChange:L},{default:t(()=>[e(m,{label:"-1"},{default:t(()=>[i("已关闭")]),_:1}),e(m,{label:"0"},{default:t(()=>[i("待支付")]),_:1}),e(m,{label:"1"},{default:t(()=>[i("待配货")]),_:1}),e(m,{label:"2"},{default:t(()=>[i("待发货")]),_:1}),e(m,{label:"3"},{default:t(()=>[i("待收货")]),_:1}),e(m,{label:"4"},{default:t(()=>[i("交易成功")]),_:1})]),_:1},8,["modelValue"])]),_:1},8,["visible"])]),default:t(o=>[s("span",null,f(U(o.row.orderStatus)),1)]),_:1}),e(c,{label:"操作",fixed:"right","min-width":"100px"},{default:t(o=>[e(_,{disabled:!!(d.value||o.row.orderStatus==-1),size:"default",onClick:a=>P(o,"deliver"),type:"success"},{default:t(()=>[i("发货")]),_:2},1032,["disabled","onClick"]),e(_,{disabled:!!(d.value||o.row.orderStatus==-1),size:"default",type:"danger",onClick:a=>P(o,"close"),style:{margin:"12px 0"}},{default:t(()=>[i("关闭订单")]),_:2},1032,["disabled","onClick"])]),_:1})]),_:1},8,["height","data"])],512),s("div",Ce,[e(A,{currentPage:u(C),"onUpdate:currentPage":l[7]||(l[7]=o=>F(C)?C.value=o:null),pageSize:u(S),"onUpdate:pageSize":l[8]||(l[8]=o=>F(S)?S.value=o:null),"page-sizes":[10,15,20],layout:"total, sizes, prev, pager, next, jumper",total:u(r).ordersCount,"page-count":u(r).ordersTotalPage},null,8,["currentPage","pageSize","total","page-count"])])],64)}}};export{Fe as default};