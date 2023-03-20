import{m as f,r as c,o as k,x as P,w as a,d as l,v as t,e as V}from"./index-87dc6a3d.js";import{b as E}from"./el-scrollbar-10e2dddd.js";import{a as U,E as q}from"./el-form-item-9887e1f6.js";import{E as w,a as x}from"./el-input-feb6af59.js";import{u as D,a as F,E as A,b as B}from"./useCategoryStore-f901f982.js";import{E as M}from"./el-switch-f1422462.js";import{_ as $}from"./UploadBox-ae10d77b.js";import"./strings-31cb2fe7.js";import"./goodsApi-e52c28cf.js";/* empty css                */const X={__name:"AddPage",setup(G){const b=D(),m=F();m.getCategoryList();const n=f(),g=f();let e=c({});const _=c({goodsCategoryId:[{required:!0,message:"请指定类别",trigger:"blur"}],goodsCoverImg:[{required:!0,message:"请上传图片",trigger:"blur"}],goodsDetailContent:[{required:!0,message:"请输入详情",trigger:"blur"}],goodsIntro:[{required:!0,message:"请输入简介",trigger:"blur"}],goodsName:[{required:!0,message:"请设置商品名称",trigger:"blur"}],originalPrice:[{required:!0,message:"请设置价格",trigger:"blur"}],sellingPrice:[{required:!0,message:"请设置价格",trigger:"blur"}],stockNum:[{required:!0,message:"请设置库存",trigger:"blur"}],tag:[{required:!0,message:"请设置关键字",trigger:"blur"}]}),C=d=>{console.log("新增"),d&&d.validate(async o=>{if(o)await b.getGoodAdd({goodsCategoryId:e.goodsCategoryId instanceof Array?e.goodsCategoryId[2]:e.goodsCategoryId,goodsCoverImg:e.goodsCoverImg.replace("http://192.168.1.3:28019",""),goodsDetailContent:e.goodsDetailContent,goodsIntro:e.goodsIntro,goodsName:e.goodsName,goodsSellStatus:e.goodsSellStatus?"0":"1",originalPrice:e.originalPrice,sellingPrice:e.sellingPrice,stockNum:e.stockNum,tag:e.tag}),console.log(d),i(d),g.value.clear();else return console.log("error submit!"),!1})},i=d=>{d&&d.resetFields()};return(d,o)=>{const I=A,s=U,u=w,v=M,y=B,p=x,N=q,S=E;return k(),P(S,null,{default:a(()=>[l(N,{ref_key:"ruleFormRef",ref:n,model:t(e),"status-icon":"",rules:t(_),"label-width":"80px",class:"demo-ruleForm"},{default:a(()=>[l(s,{label:"分类",prop:"goodsCategoryId"},{default:a(()=>[l(I,{modelValue:t(e).goodsCategoryId,"onUpdate:modelValue":o[0]||(o[0]=r=>t(e).goodsCategoryId=r),options:t(m).categoryList,props:{expandTrigger:"click"},"show-all-levels":!1},null,8,["modelValue","options"])]),_:1}),l(s,{label:"上传图片",prop:"goodsCoverImg"},{default:a(()=>[l($,{ref_key:"upload",ref:g,modelValue:t(e).goodsCoverImg,"onUpdate:modelValue":[o[1]||(o[1]=r=>t(e).goodsCoverImg=r),o[2]||(o[2]=r=>t(e).goodsCoverImg=r)]},null,8,["modelValue"])]),_:1}),l(s,{label:"详情",prop:"goodsDetailContent"},{default:a(()=>[l(u,{modelValue:t(e).goodsDetailContent,"onUpdate:modelValue":o[3]||(o[3]=r=>t(e).goodsDetailContent=r),autocomplete:"off"},null,8,["modelValue"])]),_:1}),l(s,{label:"简介",prop:"goodsIntro"},{default:a(()=>[l(u,{modelValue:t(e).goodsIntro,"onUpdate:modelValue":o[4]||(o[4]=r=>t(e).goodsIntro=r),autocomplete:"off"},null,8,["modelValue"])]),_:1}),l(s,{label:"商品名称",prop:"goodsName"},{default:a(()=>[l(u,{modelValue:t(e).goodsName,"onUpdate:modelValue":o[5]||(o[5]=r=>t(e).goodsName=r),autocomplete:"off"},null,8,["modelValue"])]),_:1}),l(s,{prop:"goodsSellStatus"},{default:a(()=>[l(v,{modelValue:t(e).goodsSellStatus,"onUpdate:modelValue":o[6]||(o[6]=r=>t(e).goodsSellStatus=r),style:{"--el-switch-on-color":"#13ce66","--el-switch-off-color":"#ff4949"},"active-text":"现在上架","inactive-text":"暂不上架"},null,8,["modelValue"])]),_:1}),l(s,{label:"原价",prop:"originalPrice"},{default:a(()=>[l(u,{modelValue:t(e).originalPrice,"onUpdate:modelValue":o[7]||(o[7]=r=>t(e).originalPrice=r),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])]),_:1}),l(s,{label:"现价",prop:"sellingPrice"},{default:a(()=>[l(u,{modelValue:t(e).sellingPrice,"onUpdate:modelValue":o[8]||(o[8]=r=>t(e).sellingPrice=r),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])]),_:1}),l(s,{label:"库存",prop:"stockNum"},{default:a(()=>[l(y,{modelValue:t(e).stockNum,"onUpdate:modelValue":o[9]||(o[9]=r=>t(e).stockNum=r),min:1},null,8,["modelValue"])]),_:1}),l(s,{label:"关键词",prop:"tag"},{default:a(()=>[l(u,{modelValue:t(e).tag,"onUpdate:modelValue":o[10]||(o[10]=r=>t(e).tag=r),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])]),_:1}),l(s,null,{default:a(()=>[l(p,{type:"primary",onClick:o[11]||(o[11]=r=>C(n.value))},{default:a(()=>[V("提交")]),_:1}),l(p,{onClick:o[12]||(o[12]=r=>i(n.value))},{default:a(()=>[V("重置")]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1})}}};export{X as default};
