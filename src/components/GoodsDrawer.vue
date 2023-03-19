<script setup>
import { ref } from 'vue'
import useGoodsStore from '@@/pages/manage/goodsManage/useGoodsStore';
import useCategoryStore from '@@/pages/manage/categoryManage/useCategoryStore';
import UploadBox from './UploadBox.vue';

const store = useGoodsStore()
const store2 = useCategoryStore()
const props = defineProps({
  drawer: {
    type: Boolean,
    default() { return false }
  },
  ifEdit: {//分辨是新增场景还是编辑场景
    type: Boolean,
    default() {
      return false
    }
  },
  goods: {
    type: Object
  }
})
const emit = defineEmits(['update:drawer'])
const drawer = computed({//控制抽屉显示与隐藏
  get() {
    return props.drawer
  },
  set(val) {
    emit('update:drawer', val)
  }
})
//获取分类表单
store2.getCategoryList()
//提交表单
const ruleFormRef = ref()//表单实例
const upload = ref()//图片上传组件实例
let ruleForm = reactive({})//表单收集
watchEffect(() => {
  if (props.ifEdit) {//编辑时表单带入初始数据
    ruleForm.goodsCategoryId = props.goods.goodsCategoryId
    ruleForm.goodsCoverImg = props.goods.goodsCoverImg
    ruleForm.goodsDetailContent = props.goods.goodsDetailContent
    ruleForm.goodsIntro = props.goods.goodsIntro
    ruleForm.goodsName = props.goods.goodsName
    ruleForm.goodsSellStatus = !props.goods.goodsSellStatus//上架状态和开关正好相反
    ruleForm.originalPrice = props.goods.originalPrice
    ruleForm.sellingPrice = props.goods.sellingPrice
    ruleForm.stockNum = props.goods.stockNum
    ruleForm.tag = props.goods.tag
    ruleForm.goodsId = props.goods.goodsId//编辑场景下需要额外提交的数据
  } else {//新增时表单清空
    ruleForm.goodsCategoryId = ''
    ruleForm.goodsCoverImg = ''
    ruleForm.goodsDetailContent = ''
    ruleForm.goodsIntro = ''
    ruleForm.goodsName = ''
    ruleForm.goodsSellStatus = true
    ruleForm.originalPrice = ''
    ruleForm.sellingPrice = ''
    ruleForm.stockNum = ''
    ruleForm.tag = ''
    ruleForm.goodsId = ''//编辑场景下需要额外提交的数据
  }
})

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
const submitEdit = (ruleFormRef) => {//点击提交修改
  console.log('修改')
  if (!ruleFormRef) return
  ruleFormRef.validate(async (valid) => {
    if (valid) {
      await store.getGoodEdit({
        goodsCategoryId: ruleForm.goodsCategoryId instanceof Array ? ruleForm.goodsCategoryId[2] : ruleForm.goodsCategoryId,
        goodsCoverImg: ruleForm.goodsCoverImg.replace('http://192.168.1.3:28019', ''),
        goodsDetailContent: ruleForm.goodsDetailContent,
        goodsIntro: ruleForm.goodsIntro,
        goodsName: ruleForm.goodsName,
        goodsSellStatus: ruleForm.goodsSellStatus ? '0' : '1',//上架状态和开关正好相反
        originalPrice: ruleForm.originalPrice,
        sellingPrice: ruleForm.sellingPrice,
        stockNum: ruleForm.stockNum,
        tag: ruleForm.tag,
        goodsId: ruleForm.goodsId
      })
      console.log(ruleFormRef)
      resetForm(ruleFormRef)//提交成功后重置表单
      upload.value.clear()//提交成功后重置图片上传列表
      emit('update:drawer', false)//提交成功后关闭编辑框
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
  <el-drawer v-model="drawer" direction="rtl" :lock-scroll="false" size="50%" destroy-on-close>
    <!-- 标题 -->
    <template #header>
      <h4>{{ `${props.ifEdit ? '编辑' : '新增'}商品信息` }}</h4>
    </template>
    <!-- 表单 -->
    <template #default>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="分类" prop="goodsCategoryId">
          <el-cascader v-model="ruleForm.goodsCategoryId" :options="store2.categoryList"
            :props="{ expandTrigger: 'click' }" :show-all-levels="false" />
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
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="现在上架"
            inactive-text="暂不上架" />
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
          <el-button type="primary"
            @click="props.ifEdit ? submitEdit(ruleFormRef) : submitForm(ruleFormRef)">提交</el-button>
          <el-button v-show="!props.ifEdit" @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>