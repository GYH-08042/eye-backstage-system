<script setup>
import { ref } from 'vue'
import useHomeStore from '@@/pages/manage/homeManage/useHomeStore';
import { Search } from '@element-plus/icons-vue'

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
  seckill: {
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
//商品搜索
const filter = ref()//现有商品搜索关键词
const ifOpen = ref(false)//控制订单状态栏筛选框的显示与隐藏
const onFilter = () => {//搜索框输入完毕时将值用于筛选
  store.goodsFilter = filter.value
}
//翻页操作
const currentPage = computed({//当前页码
  get() {
    return store.goodsPage
  },
  set(val) {
    store.goodsPage = val
  }
})
const pageSize = computed({//一页显示多少项
  get() {
    return store.goodsSize
  },
  set(val) {
    store.goodsSize = val
  }
})
watchEffect(async () => {
  await store.getGoodsList(currentPage.value, pageSize.value, filter.value, 0)
})
//提交表单
const ruleFormRef = ref()//表单实例
let ruleForm = reactive({})//表单收集

watchEffect(() => {
  if (props.ifEdit) {//编辑时表单带入初始数据
    ruleForm.configRank = props.seckill.configRank,
      ruleForm.goodsId = props.seckill.goodsId,
      ruleForm.configName = props.seckill.configName,
      ruleForm.configId = props.seckill.configId//编辑场景下需要额外提交的数据
  } else {//新增时表单清空
    ruleForm.configRank = '',
      ruleForm.goodsId = '',
      ruleForm.configName = '',
      ruleForm.configId = '' //编辑场景下需要额外提交的数据
  }
})

const rules = reactive({//定义表单校验规则
  configRank: [{ required: true, message: '请设置权重等级', trigger: 'blur' }],
  goodsId: [{ required: true, message: '请选择商品', trigger: 'blur' }],
  configName: [{ required: true, message: '请设置秒杀名称', trigger: 'blur' }],
})
const submitForm = (ruleFormRef) => {//点击提交新增
  console.log('新增')
  if (!ruleFormRef) return
  ruleFormRef.validate(async (valid) => {
    if (valid) {
      await store.getSeckillAdd({ configRank: ruleForm.configRank, goodsId: ruleForm.goodsId, configName: ruleForm.configName })
      console.log(ruleFormRef)
      resetForm(ruleFormRef)//提交成功后重置表单
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
      await store.getSeckillEdit({ configRank: ruleForm.configRank, goodsId: ruleForm.goodsId, configName: ruleForm.configName, configId: ruleForm.configId })
      console.log(ruleFormRef)
      resetForm(ruleFormRef)//提交成功后重置表单
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
  store.$patch('goodsFilter', '')
}
</script>

<template>
  <el-drawer v-model="drawer" direction="rtl" :lock-scroll="false" size="50%" destroy-on-close>
    <!-- 标题 -->
    <template #header>
      <h4>{{ `${props.ifEdit ? '编辑' : '新增'}新品秒杀配置` }}</h4>
    </template>
    <!-- 表单 -->
    <template #default>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="展示权重" prop="configRank">
          <el-input v-model.number="ruleForm.configRank" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选择商品" prop="goodsId">
          <!-- 商品选择器 -->
          <el-select v-model="ruleForm.goodsId" class="m-2" placeholder="Select" size="large" :validate-event="false">
            <el-option-group lable="可筛选后进行选择">
              <el-input v-model="filter" class="w-50 m-2" placeholder="搜索现有商品" :prefix-icon="Search" @change="onFilter"
                style="width:80%;margin-left:30px" />
              <!-- 分页器 -->
              <el-pagination v-model:currentPage="currentPage" small layout="total, prev, pager, next"
                :total="store.goodsCount" :page-count="store.goodstotalPage" style="margin:0 20px" />
              <el-option v-for="item in store.goodsList" :key="item.goodsId" :label="item.label" :value="item.goodsId"
                style="height:160px">
                <!-- 选项卡片 -->
                <el-card :body-style="{ padding: '10px', width: '300px', height: '140px' }"
                  style="width:300px;height:140px;margin:14px;padding:0;display: flex;justify-content: center;">
                  <el-row style="flex:1">
                    <el-col :span="8" style="display:flex;justify-content: center;align-items: center;">
                      <el-image :src="`http://192.168.1.3:28019${item?.goodsCoverImg}`" style="width:100px;height: 120px;"
                        fit="contain" :hide-on-click-modal="true" lazy />
                    </el-col>
                    <el-col :span="16"
                      style="display: flex;flex-flow: column;align-items:center;font-size:14px;padding:5px">
                      <span
                        style="width:100%;font-weight:800;text-align: center;flex:1;display: flex;flex-flow: row wrap;white-space:pre-wrap;line-height: 15px;">{{
                          item?.goodsName }}</span>
                      <span style="width:100%;flex:1;white-space:pre-wrap;flex-flow: row wrap;line-height: 15px;">{{
                        item?.goodsIntro
                      }}</span>
                    </el-col>
                  </el-row>
                </el-card>
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="秒杀名称" prop="configName">
          <el-input v-model="ruleForm.configName" autocomplete="off" />
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