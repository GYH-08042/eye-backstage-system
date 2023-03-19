<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import useGoodsStore from './useGoodsStore.js'
import GoodsDrawer from '@@/components/GoodsDrawer.vue';

const store = useGoodsStore()
//表格高度自适应
let tableContainerRef = ref()//表格外的容器实例
let currentHeight = ref()//表格高度
onMounted(() => {//DOM渲染出来再获取容器高度数值
  tableContainerRef.value
  currentHeight.value = window.getComputedStyle(tableContainerRef.value).height
})
window.onresize = () => {//监听窗口大小变化并重新获取容器高度数值
  let paddingTop = 0
  let paddingBottom = 0
  if (window.getComputedStyle(tableContainerRef.value).boxSizing == 'border-box') {
    paddingTop = window.getComputedStyle(tableContainerRef.value).paddingTop ? window.getComputedStyle(tableContainerRef.value).paddingTop.replace('px', '') : 0
    paddingBottom = window.getComputedStyle(tableContainerRef.value).paddingBottom ? window.getComputedStyle(tableContainerRef.value).paddingBottom.replace('px', '') : 0
  }
  currentHeight.value = `${window.getComputedStyle(tableContainerRef.value).height.replace('px', '') - paddingTop - paddingBottom}px`
  console.log(window.getComputedStyle(tableContainerRef.value).height, paddingTop, paddingBottom, currentHeight.value)
}
// 表格操作
const multipleTableRef = ref()//表格实例
const ifOperate = ref(false)//控制打钩列的显示与隐藏
//新增和编辑
const drawer = ref(false)//控制新增和编辑界面的显示与隐藏
const ifEdit = ref()//通知子组件是新增还是编辑
let goods = reactive({})//编辑场景下通知子组件本次修改的是哪条
const handleAdd = () => {//点击新增
  drawer.value = true
  ifEdit.value = false
}
const handleEdit = (scope) => {//点击编辑
  drawer.value = true
  ifEdit.value = true
  goods.goodsCategoryId = scope.row.goodsCategoryId
  goods.goodsCoverImg = scope.row.goodsCoverImg
  goods.goodsDetailContent = scope.row.goodsDetailContent
  goods.goodsIntro = scope.row.goodsIntro
  goods.goodsName = scope.row.goodsName
  goods.goodsSellStatus = scope.row.goodsSellStatus
  goods.originalPrice = scope.row.originalPrice
  goods.sellingPrice = scope.row.sellingPrice
  goods.stockNum = scope.row.stockNum
  goods.tag = scope.row.tag
  goods.goodsId = scope.row.goodsId
}
const handleToggle = (scope) => {//点击单行切换销售状态
  store.getGoodsToggle(scope.row.goodsSellStatus ? 0 : 1, { ids: [scope.row.goodsId] })
}
const toggleMore = (status) => {//点击批量切换销售状态
  if (ifOperate.value && multipleTableRef.value.getSelectionRows().length) { store.getGoodsToggle(status, { ids: multipleTableRef.value.getSelectionRows().map(item => { return item.goodsId }) }) }
  ifOperate.value = !ifOperate.value
}

//商品搜索
const filter = ref()//现有商品搜索关键词
const selected = ref()//商品状态筛选值
const ifOpen = ref(false)//控制订单状态栏筛选框的显示与隐藏
const onFilter = () => {//搜索框输入完毕时将值用于筛选
  store.goodsFilter = filter.value
}
const onSelect = () => {//选择订单状态筛选选项
  store.goodsSellStatus = selected.value[0]
  ifOpen.value = false
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
  await store.getGoodsList(currentPage.value, pageSize.value, store.goodsFilter, store.goodsSellStatus)
})

</script>
<template>
  <!-- 操作行 -->
  <div class="row1">
    <el-button @click="handleAdd" type="primary">新增</el-button>
    <el-button @click="ifOperate = !ifOperate" type='default'>{{ ifOperate ?
      '取消批量操作' : '批量操作' }}</el-button>
    <el-button v-show="ifOperate" @click="toggleMore(0)" type='success'>{{ '上架' }}</el-button>
    <el-button v-show="ifOperate" @click="toggleMore(1)" type='danger'>{{ '下架' }}</el-button>
    <el-input v-model="filter" placeholder="搜索现有商品" :prefix-icon="Search" @change="onFilter"
      style="width:200px;margin-left:10px" />
  </div>
  <!-- 表格 -->
  <div ref="tableContainerRef" class="row2">
    <el-table ref="multipleTableRef" stripe border :height="currentHeight" style="width:100%;text-align: center;"
      :data="store.goodsList" row-key="goodsId">
      <!-- 勾选列，仅点击批量管理时出现 -->
      <el-table-column v-if="ifOperate" type="selection" min-width="55px" reserve-selection fixed />
      <!-- 序号列 -->
      <el-table-column type="index" min-width="55px" label="序号" fixed />
      <!-- 商品ID列 -->
      <el-table-column label="ID" min-width="70px" property="goodsId" />
      <!-- 封面图片列 -->
      <el-table-column label="封面图片" min-width="140px">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="`http://192.168.1.3:28019${scope.row.goodsCoverImg}`"
            fit="contain" :hide-on-click-modal="true" lazy
            :preview-src-list="[`http://192.168.1.3:28019${scope.row.goodsCoverImg}`]" /></template>
      </el-table-column>
      <!-- 详情图列 -->
      <!-- :preview-src-list="scope.row.goodsCarousel.map(item => { return `http://192.168.1.3:28019${item}` })" -->
      <el-table-column v-if="false" label="详情图" min-width="140px">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="`http://192.168.1.3:28019${scope.row.goodsCarousel}`"
            fit="contain" :hide-on-click-modal="true" lazy /></template>
      </el-table-column>
      <!-- 商品标题列 -->
      <el-table-column property="goodsName" label="标题" min-width="150px" show-overflow-tooltip />
      <!-- 商品描述列 -->
      <el-table-column property="goodsIntro" label="描述" min-width="250px" show-overflow-tooltip />
      <!-- 商品原价列 -->
      <el-table-column property="originalPrice" label="原价" min-width="80px" show-overflow-tooltip sortable />
      <!-- 商品现价列 -->
      <el-table-column property="sellingPrice" label="现价" min-width="80px" show-overflow-tooltip sortable />
      <!-- 商品库存列 -->
      <el-table-column property="stockNum" label="库存" min-width="70px" show-overflow-tooltip />
      <!-- 商品关键词列 -->
      <el-table-column property="tag" label="关键词" min-width="120px" show-overflow-tooltip />
      <!-- 商品状态列 -->
      <el-table-column label="状态" min-width="120px" show-overflow-tooltip>
        <template #header>
          <el-popover placement="bottom-end" :width="100" :visible="ifOpen">
            <template #reference>
              <div style="cursor:pointer" @click="ifOpen = !ifOpen">
                <span>订单状态</span>
                <el-icon size="16px" v-if="!ifOpen">
                  <ArrowDownBold />
                </el-icon>
                <el-icon size="16px" v-if="ifOpen">
                  <ArrowUpBold />
                </el-icon>
              </div>
            </template>
            <template #default>
              <el-checkbox-group v-model="selected" :max="1" @change="onSelect">
                <el-checkbox label="1">已下架</el-checkbox>
                <el-checkbox label="0">上架中</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-popover>
        </template>
        <template #default="scope">
          <span>{{ scope.row.goodsSellStatus ? '已下架' : '上架中' }}</span>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" fixed="right" min-width="150px">
        <template #default="scope">
          <el-button :disabled="ifOperate ? true : false" size="default" @click="handleEdit(scope)">编辑</el-button>
          <el-button :disabled="ifOperate ? true : false" size="default"
            :type="scope.row.goodsSellStatus ? 'success' : 'danger'" @click="handleToggle(scope)" style="margin:12px 0">{{
              scope.row.goodsSellStatus ? '上架' : '下架' }}</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="加载中" />
      </template>
    </el-table>
  </div>
  <!-- 分页器 -->
  <div class="row3">
    <el-pagination v-model:currentPage="currentPage" v-model:pageSize="pageSize" :page-sizes="[10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper" :total="store.goodsCount" :page-count="store.goodstotalPage" />
  </div>
  <!-- 编辑框 -->
  <GoodsDrawer v-model:drawer="drawer" @updata:drawer="drawer = $event" :ifEdit="ifEdit" :goods="goods">
  </GoodsDrawer>
</template>

<style lang="scss">
// 操作行盒子
.row1 {
  box-sizing: border-box;
  height: 52px;
  padding-bottom: 5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
}

//表格行盒子
.row2 {
  height: calc(100% - 52px - 42px);
  align-self: stretch;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 10px;
  position: relative;

  //表头
  .el-table__header-wrapper {
    box-sizing: border-box;
    height: 50px;

    .el-table__header {
      box-sizing: border-box;
      height: 100%;
      border-bottom: 1px solid gray;

      th {
        text-align: center;
      }
    }
  }

  //表内容
  .el-table__body-wrapper {
    box-sizing: border-box;

    tr {
      td {
        text-align: center;
      }

      td:last-child>.cell {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

//分页器盒子
.row3 {
  box-sizing: border-box;
  height: 42px;
  padding-top: 10px;
  flex-wrap: nowrap;

  el-pagination {
    height: 32px;
  }
}
</style>