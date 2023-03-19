<script setup>
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'
import useUsersStore from './useUsersStore.js'

const store = useUsersStore()
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
//修改用户状态
const handleToggle = (scope) => {//点击单行切换销售状态
  store.getUsersToggle(scope.row.lockedFlag ? 0 : 1, { ids: [scope.row.userId] })
}
const toggleMore = (status) => {//点击批量切换销售状态
  if (ifOperate.value && multipleTableRef.value.getSelectionRows().length) { store.getUsersToggle(status, { ids: multipleTableRef.value.getSelectionRows().map(item => { return item.userId }) }) }
  ifOperate.value = !ifOperate.value
}
//表格筛选
const filterHandler = (value, row, column) => {
  const property = column['property']
  return row[property] === value
}
// const selected = ref()//用户状态筛选值
// const ifOpen = ref(false)//控制用户状态栏筛选框的显示与隐藏
// const onSelect = () => {//选择用户状态筛选选项
//   store.lockedFlag = selected.value[0]
//   ifOpen.value = false
// }

//翻页操作
const currentPage = computed({//当前页码
  get() {
    return store.usersPage
  },
  set(val) {
    store.usersPage = val
  }
})
const pageSize = computed({//一页显示多少项
  get() {
    return store.usersSize
  },
  set(val) {
    store.usersSize = val
  }
})
watchEffect(async () => {
  await store.getUsersList(currentPage.value, pageSize.value, store.lockedFlag)
})
</script>

<template>
  <!-- 操作行 -->
  <div class="row1">
    <el-button @click="ifOperate = !ifOperate" type='default'>{{ ifOperate ?
      '取消批量操作' : '批量操作' }}</el-button>
    <el-button v-show="ifOperate" @click="toggleMore(0)" type='success'>{{ '激活' }}</el-button>
    <el-button v-show="ifOperate" @click="toggleMore(1)" type='danger'>{{ '锁定' }}</el-button>
  </div>
  <!-- 表格 -->
  <div ref="tableContainerRef" class="row2">
    <el-table ref="multipleTableRef" stripe border :height="currentHeight" style="width:100%;text-align: center;"
      :data="store.usersList" row-key="userId">
      <!-- 勾选列，仅点击批量管理时出现 -->
      <el-table-column v-if="ifOperate" type="selection" min-width="55px" reserve-selection fixed />
      <!-- 序号列 -->
      <el-table-column type="index" min-width="55px" label="序号" fixed />
      <!-- 用户ID列 -->
      <el-table-column label="ID" min-width="50px" property="userId" />
      <!-- 登录名列 -->
      <el-table-column label="登录名" min-width="150px" property="loginName" />
      <!-- 昵称名列 -->
      <el-table-column label="昵称" min-width="150px" property="nickName" />
      <!-- 简介列 -->
      <el-table-column label="简介" min-width="200px" property="introduceSign" />
      <!-- 创建时间 -->
      <el-table-column label="创建时间" min-width="200px" property="createTime" />
      <!-- 用户状态列 -->
      <el-table-column property="lockedFlag" label="用户状态" min-width="120" show-overflow-tooltip column-key="8" :filters="[
        { text: '已禁用', value: 1 },
        { text: '使用中', value: 0 },
      ]" :filter-method="filterHandler">
        <!-- <template #header>
                                                  <el-popover placement="bottom-end" :width="100" :visible="ifOpen">
                                                    <template #reference>
                                                      <div style="cursor:pointer" @click="ifOpen = !ifOpen">
                                                        <span>用户状态</span>
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
                                                        <el-checkbox label="1">已禁用</el-checkbox>
                                                        <el-checkbox label="0">使用中</el-checkbox>
                                                      </el-checkbox-group>
                                                    </template>
                                                  </el-popover>
                                                </template> -->
        <template #default="scope">
          <span>{{ scope.row.lockedFlag ? '已禁用' : '使用中' }}</span>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" fixed="right" min-width="100px">
        <template #default="scope">
          <el-button :disabled="ifOperate ? true : false" size="default"
            :type="scope.row.lockedFlag ? 'success' : 'danger'" @click="handleToggle(scope)">{{
              scope.row.lockedFlag ? '激活' : '禁用' }}</el-button>
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
      layout="total, sizes, prev, pager, next, jumper" :total="store.usersCount" :page-count="store.usersTotalPage" />
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