<script setup>
import { ref } from 'vue'
import useHomeStore from './useHomeStore.js'
import CarouselDrawer from '@@/components/CarouselDrawer.vue';

const store = useHomeStore()
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
let carousel = reactive({})//编辑场景下通知子组件本次修改的是哪条
const handleAdd = () => {//点击新增
  drawer.value = true
  ifEdit.value = false
}
const handleEdit = (scope) => {//点击编辑
  drawer.value = true
  ifEdit.value = true
  carousel.carouselId = scope.row.carouselId
  carousel.carouselRank = scope.row.carouselRank
  carousel.carouselUrl = scope.row.carouselUrl
  carousel.redirectUrl = scope.row.redirectUrl
}
const handleDelete = (scope) => {//点击单行删除
  store.getCarouselDelete({ ids: [scope.row.carouselId] })
}
const deleteMore = () => {//点击批量删除
  if (ifOperate.value && multipleTableRef.value.getSelectionRows().length) { store.getCarouselDelete({ ids: multipleTableRef.value.getSelectionRows().map(item => { return item.carouselId }) }) }
  ifOperate.value = !ifOperate.value
}

//翻页操作
const currentPage = computed({//当前页码
  get() {
    return store.currPage
  },
  set(val) {
    store.currPage = val
  }
})
const pageSize = computed({//一页显示多少项
  get() {
    return store.pageSize
  },
  set(val) {
    store.pageSize = val
  }
})
watchEffect(async () => {
  await store.getCarouselList(currentPage.value, pageSize.value)
})

</script>
<template>
  <!-- 操作行 -->
  <div class="row1">
    <el-button @click="handleAdd" type="primary">新增</el-button>
    <el-button @click="deleteMore" :type="ifOperate ? 'danger' : 'default'">{{ ifOperate ?
      '批量删除/取消批量操作' : '批量操作' }}</el-button>
  </div>
  <!-- 表格 -->
  <div ref="tableContainerRef" class="row2">
    <el-table ref="multipleTableRef" stripe border :height="currentHeight" style="width:100%;text-align: center;"
      :data="store.carouselList" row-key="carouselId">
      <!-- 勾选列，仅点击批量管理时出现 -->
      <el-table-column v-if="ifOperate" type="selection" min-width="55px" reserve-selection fixed />
      <!-- 序号列 -->
      <el-table-column type="index" min-width="70px" label="序号" fixed />
      <!-- 轮播图ID列 -->
      <el-table-column label="ID" min-width="70px" property="carouselId"> </el-table-column>
      <!-- 图片列 -->
      <el-table-column label="图片展示" min-width="300px">
        <template #default="scope">
          <el-image style="width: 200px; height: 100px" :src="scope.row.carouselUrl" fit="contain"
            :hide-on-click-modal="true" lazy :preview-src-list="[scope.row.carouselUrl]" /></template>
      </el-table-column>
      <!-- 图片排序列 -->
      <el-table-column property="carouselRank" label="展示权重" min-width="120px" show-overflow-tooltip sortable>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" min-width="150px" fixed="right">
        <template #default="scope">
          <el-button :disabled="ifOperate ? true : false" size="default" @click="handleEdit(scope)">编辑</el-button>
          <el-button :disabled="ifOperate ? true : false" size="default" type="danger" @click="handleDelete(scope)"
            style="margin:12px 0">删除</el-button>
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
      layout="total, sizes, prev, pager, next, jumper" :total="store.totalCount" :page-count="store.totalPage" />
  </div>
  <!-- 编辑框 -->
  <CarouselDrawer v-model:drawer="drawer" @updata:drawer="drawer = $event" :ifEdit="ifEdit" :carousel="carousel">
  </CarouselDrawer>
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