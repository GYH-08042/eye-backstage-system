<script setup>
import { ref } from 'vue'
import useGoodsStore from '@@/pages/manage/goodsManage/useGoodsStore';
import useCategoryStore from '@@/pages/manage/categoryManage/useCategoryStore';
import UploadBox from '@@/components/UploadBox.vue';

const store = useGoodsStore()
const store2 = useCategoryStore()
//获取分类表单
store2.getCategoryList()
//提交表单
const ruleFormRef = ref()//表单实例
const upload = ref()//图片上传组件实例
let ruleForm = reactive({})//表单收集

const rules = reactive({//定义表单校验规则
  goodsCategoryId: [{ required: true, message: '请指定类别', trigger: 'blur' }],
  goodsCoverImg: [{ required: true, message: '请上传图片', trigger: 'blur' }],
  goodsDetailContent: [{ required: true, message: '请输入详情', trigger: 'blur' }],
  goodsIntro: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  goodsName: [{ required: true, message: '请设置商品名称', trigger: 'blur' }],
  originalPrice: [{ required: true, message: '请设置价格', trigger: 'blur' }],
  sellingPrice: [{ required: true, message: '请设置价格', trigger: 'blur' }],
  stockNum: [{ required: true, message: '请设置库存', trigger: 'blur' }],
  tag: [{ required: true, message: '请设置关键字', trigger: 'blur' }],
})
const submitForm = (ruleFormRef) => {//点击提交新增
  console.log('新增')
  if (!ruleFormRef) return
  ruleFormRef.validate(async (valid) => {
    if (valid) {
      await store.getGoodAdd({
        goodsCategoryId: ruleForm.goodsCategoryId instanceof Array ? ruleForm.goodsCategoryId[2] : ruleForm.goodsCategoryId,
        goodsCoverImg: ruleForm.goodsCoverImg.replace('http://192.168.1.3:28019', ''),
        goodsDetailContent: ruleForm.goodsDetailContent,
        goodsIntro: ruleForm.goodsIntro,
        goodsName: ruleForm.goodsName,
        goodsSellStatus: ruleForm.goodsSellStatus ? '0' : '1',//上架状态和开关正好相反
        originalPrice: ruleForm.originalPrice,
        sellingPrice: ruleForm.sellingPrice,
        stockNum: ruleForm.stockNum,
        tag: ruleForm.tag
      })
      console.log(ruleFormRef)
      resetForm(ruleFormRef)//提交成功后重置表单
      upload.value.clear()//提交成功后重置图片上传列表
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (ruleFormRef) => {//点击重置
  if (!ruleFormRef) return
  ruleFormRef.resetFields()
}
</script>

<template>
  <!-- 表单 -->
  <el-scrollbar>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-form-item label="分类" prop="goodsCategoryId">
        <el-cascader v-model="ruleForm.goodsCategoryId" :options="store2.categoryList" :props="{ expandTrigger: 'click' }"
          :show-all-levels="false" />
      </el-form-item>
      <el-form-item label="上传图片" prop="goodsCoverImg">
        <UploadBox ref="upload" v-model="ruleForm.goodsCoverImg" @update:modelValue="ruleForm.goodsCoverImg = $event">
        </UploadBox>
      </el-form-item>
      <el-form-item label="详情" prop="goodsDetailContent">
        <el-input v-model="ruleForm.goodsDetailContent" autocomplete="off" />
      </el-form-item>
      <el-form-item label="简介" prop="goodsIntro">
        <el-input v-model="ruleForm.goodsIntro" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="ruleForm.goodsName" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="goodsSellStatus">
        <el-switch v-model="ruleForm.goodsSellStatus"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="现在上架" inactive-text="暂不上架" />
      </el-form-item>
      <el-form-item label="原价" prop="originalPrice">
        <el-input v-model.number="ruleForm.originalPrice" autocomplete="off" />
      </el-form-item>
      <el-form-item label="现价" prop="sellingPrice">
        <el-input v-model.number="ruleForm.sellingPrice" autocomplete="off" />
      </el-form-item>
      <el-form-item label="库存" prop="stockNum">
        <el-input-number v-model="ruleForm.stockNum" :min="1" />
      </el-form-item>
      <el-form-item label="关键词" prop="tag">
        <el-input v-model.number="ruleForm.tag" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-scrollbar>
</template>