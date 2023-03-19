<script setup>
import { ref } from 'vue'
import useHomeStore from '@@/pages/manage/homeManage/useHomeStore';
import UploadBox from './UploadBox.vue';

const store = useHomeStore()
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
  carousel: {
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

//提交表单
const ruleFormRef = ref()//表单实例
const upload = ref()//图片上传组件实例
let ruleForm = reactive({})//表单收集

watchEffect(() => {
  if (props.ifEdit) {//编辑时表单带入初始数据
    ruleForm.carouselRank = props.carousel.carouselRank,
      ruleForm.carouselUrl = props.carousel.carouselUrl.replace('http://192.168.1.3:28019', ''),
      ruleForm.redirectUrl = props.carousel.redirectUrl,
      ruleForm.carouselId = props.carousel.carouselId//编辑场景下需要额外提交的数据
  } else {//新增时表单清空
    ruleForm.carouselRank = '',
      ruleForm.carouselUrl = '',
      ruleForm.redirectUrl = '',
      ruleForm.carouselId = '' //编辑场景下需要额外提交的数据
  }
})

const rules = reactive({//定义表单校验规则
  carouselRank: [{ required: true, message: '请设置权重等级', trigger: 'blur' }],
  carouselUrl: [{ required: true, message: '请上传图片', trigger: 'blur' }],
  redirectUrl: [{ required: true, message: '请设置跳转链接', trigger: 'blur' }],
})
const submitForm = (ruleFormRef) => {//点击提交新增
  console.log('新增')
  if (!ruleFormRef) return
  ruleFormRef.validate(async (valid) => {
    if (valid) {
      await store.getCarouselAdd({ carouselRank: ruleForm.carouselRank, carouselUrl: ruleForm.carouselUrl, redirectUrl: ruleForm.redirectUrl })
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
      await store.getCarouselEdit({ carouselRank: ruleForm.carouselRank, carouselUrl: ruleForm.carouselUrl, redirectUrl: ruleForm.redirectUrl, carouselId: ruleForm.carouselId })
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
      <h4>{{ `${props.ifEdit ? '编辑' : '新增'}轮播图信息` }}</h4>
    </template>
    <!-- 表单 -->
    <template #default>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="展示权重" prop="carouselRank">
          <el-input v-model.number="ruleForm.carouselRank" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上传图片" prop="carouselUrl">
          <UploadBox ref="upload" v-model="ruleForm.carouselUrl" @update:modelValue="ruleForm.carouselUrl = $event">
          </UploadBox>
        </el-form-item>
        <el-form-item label="跳转网址" prop="redirectUrl">
          <el-input v-model="ruleForm.redirectUrl" autocomplete="off" />
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