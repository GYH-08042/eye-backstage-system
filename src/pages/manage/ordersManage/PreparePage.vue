<script setup>
import { ref } from 'vue'
import { Search, ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'
import useOrderStore from './useOrderStore.js'

const store = useOrderStore()
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
//配货和关闭订单
const handleSingle = (scope, option) => {//点击单行操作按钮
  if (option == 'prepare') {
    store.getOrdersPrepare({ ids: [scope.row.orderId] })
  } else {
    store.getOrdersClose({ ids: [scope.row.orderId] })
  }
}
const handleMore = (option) => { //点击批量操作
  if (ifOperate.value && multipleTableRef.value.getSelectionRows().length) {
    if (option == 'prepare') {
      store.getOrdersPrepare({ ids: multipleTableRef.value.getSelectionRows().map(item => { return item.orderId }) })
    } else {
      store.getOrdersClose({ ids: multipleTableRef.value.getSelectionRows().map(item => { return item.orderId }) })
    }
    ifOperate.value = !ifOperate.value
  }
}
//判断订单状态
const status = (code) => {
  switch (code) {
    case -1: return '已关闭'
    case 0: return '待支付'
    case 1: return '待配货'
    case 2: return '待发货'
    case 3: return '待收货'
    case 4: return '交易成功'
  }
}
//表格筛选
const filterHandler = (value, row, column) => {
  const property = column['property']
  return row[property] === value
}
const filter = ref()//订单号搜索框的值
const selected = ref()//订单状态筛选值
const ifOpen = ref(false)//控制订单状态栏筛选框的显示与隐藏
const onFilter = () => {//搜索框输入完毕时将值用于筛选
  store.ordersFilter = filter.value
}
const onSelect = () => {//选择订单状态筛选选项
  store.orderStatus = selected.value[0]
  ifOpen.value = false
}
//翻页操作
const currentPage = computed({//当前页码
  get() {
    return store.ordersPage
  },
  set(val) {
    store.ordersPage = val
  }
})
const pageSize = computed({//一页显示多少项
  get() {
    return store.ordersSize
  },
  set(val) {
    store.ordersSize = val
  }
})
watchEffect(async () => {
  await store.getOrdersList(currentPage.value, pageSize.value, store.ordersFilter, store.orderStatus)
})

</script>
<template>
  <!-- 操作行 -->
  <div class="row1">
    <el-button @click="ifOperate = !ifOperate" type='default'>{{ ifOperate ?
      '取消批量操作' : '批量操作' }}</el-button>
    <el-button v-show="ifOperate" @click="handleMore('prepare')" type='success'>{{ '配货' }}</el-button>
    <el-button v-show="ifOperate" @click="handleMore('close')" type='danger'>{{ '关闭订单' }}</el-button>
    <el-input v-model="filter" class="w-50 m-2" placeholder="搜索订单号" :prefix-icon="Search" @change="onFilter"
      style="width:200px" />
    <span @click="store.ordersFilter = ''; filter = ''" style="margin-left:10px;cursor: pointer;">清空搜索</span>
  </div>
  <!-- 表格 -->
  <div ref="tableContainerRef" class="row2">
    <el-table ref="multipleTableRef" border stripe :height="currentHeight" style="width:100%;text-align: center;"
      :data="store.ordersList" row-key="orderNo">
      <!-- 勾选列，仅点击批量管理时出现 -->
      <el-table-column v-if="ifOperate" type="selection" min-width="55px" reserve-selection fixed />
      <!-- 序号列 -->
      <el-table-column type="index" min-width="55px" label="序号" />
      <!-- 订单号列 -->
      <el-table-column label="ID" width="200px" property="orderNo" />
      <!-- 订单内容列 -->
      <el-table-column label="订单内容" min-width="320px">
        <template #default="scope">
          <el-card :body-style="{ padding: '10px' }" style="width:300px;padding:0;display: flex;justify-content: center;">
            <el-row style="flex:1;border-bottom:1px solid gray" v-for="item in scope.row.orderDetail" :key="item.goodsId">
              <el-col :span="8" style="display:flex;justify-content: center;align-items: center">
                <el-image :src="`http://192.168.1.3:28019${item?.goodsCoverImg}`" style="width:100px;height: 120px;"
                  fit="contain" :hide-on-click-modal="true" lazy
                  :preview-src-list="[`http://192.168.1.3:28019${item?.goodsCoverImg}`]" />
              </el-col>
              <el-col :span="16"
                style="display: flex;flex-flow: column;align-items:flex-start;font-size:14px;padding:0 14px">
                <el-row :gutter="10" style="flex:1"><span style="font-weight:800;text-align:left">{{
                  `商品名称：${item?.goodsName}` }}</span></el-row>
                <el-row style="flex:1"> <span style=" text-align:left">{{ `订购数量：${item?.goodsCount
                  }` }}</span></el-row>
                <el-row style="flex:1"> <span style=" text-align:left">{{ `商品价格：${item?.sellingPrice
                  }` }}</span></el-row>
              </el-col>
            </el-row>
            <el-row style="height:15px;text-align:center"> <span style=" text-align:center">{{
              `下单时间：${scope.row?.createTime
              }` }}</span></el-row>
          </el-card>
        </template>
      </el-table-column>
      <!-- 订单总额列 -->
      <el-table-column v-if="false" property="totalPrice" label="订单金额" min-width="140px" />
      <!-- 支付状态列 -->
      <el-table-column property="payStatus" label="支付状态" min-width="150px" show-overflow-tooltip sortable :filters="[
        { text: '已支付', value: 1 },
        { text: '未支付', value: 0 },
      ]" :filter-method="filterHandler">
        <template #default="scope">
          <span>{{ scope.row.payStatus ? '已支付' : '未支付' }}</span>
        </template>
      </el-table-column>
      <!-- 支付时间列 -->
      <el-table-column property="payTime" label="支付时间" min-width="160px" show-overflow-tooltip sortable />
      <!-- 支付方式列 -->
      <el-table-column property="payTypeString" label="支付方式" min-width="100px" show-overflow-tooltip />
      <!-- 订单状态列 -->
      <el-table-column property="orderStatus" label="订单状态" min-width="120px" show-overflow-tooltip>
        <template #header>
          <el-popover placement="top-start" :width="100" :visible="ifOpen">
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
                <el-checkbox label="-1">已关闭</el-checkbox>
                <el-checkbox label="0">待支付</el-checkbox>
                <el-checkbox label="1">待配货</el-checkbox>
                <el-checkbox label="2">待发货</el-checkbox>
                <el-checkbox label="3">待收货</el-checkbox>
                <el-checkbox label="4">交易成功</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-popover>
        </template>
        <template #default="scope">
          <span>{{ status(scope.row.orderStatus) }}</span>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" min-width="100px" fixed="right">
        <template #default="scope">
          <el-button :disabled="ifOperate || scope.row.orderStatus != 1 ? true : false" size="default"
            @click="handleSingle(scope, 'prepare')" type="success">配货</el-button>
          <el-button :disabled="ifOperate || scope.row.orderStatus == -1 ? true : false" size="default" type="danger"
            @click="handleSingle(scope, 'close')" style="margin:12px 0">关闭订单</el-button>
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
      layout="total, sizes, prev, pager, next, jumper" :total="store.ordersCount" :page-count="store.ordersTotalPage" />
  </div>
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