<script setup>
import { watchEffect, ref, reactive, unref } from 'vue';

//调档
const checkData = ref()//清单表
if (localStorage.getItem('checkToDo').length) {
  console.log('取数据checkToDo')
  checkData.value = reactive(JSON.parse(localStorage.getItem('checkToDo')))
}
if (localStorage.getItem('lastReprot')) {
  console.log('取数据lastReport')
  lastReportData.value = reactive(JSON.parse(localStorage.getItem('lastReport')))
}
//当日日期
const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)
const date = ref(new Date().getDate())
const day = ref()
switch (new Date().getDay()) {
  case 0: day.value = '日'; break;
  case 1: day.value = '一'; break;
  case 2: day.value = '二'; break;
  case 3: day.value = '三'; break;
  case 4: day.value = '四'; break;
  case 5: day.value = '五'; break;
  case 6: day.value = '六'; break;
}
const today = computed(() => {
  return `${month.value}月${date.value}日\n
  星期${day.value}`
})
//当月总天数
let count = ref()
switch (new Date().getMonth() + 1) {
  case 1: count.value = 31; break;
  case 2: count.value = (new Date().getFullYear() % 4 == 0 && new Date().getFullYear() % 100 != 0) || new Date().getFullYear() % 400 == 0 ? 29 : 28; break;
  case 3: count.value = 31; break;
  case 4: count.value = 30; break;
  case 5: count.value = 31; break;
  case 6: count.value = 30; break;
  case 7: count.value = 31; break;
  case 8: count.value = 31; break;
  case 9: count.value = 30; break;
  case 10: count.value = 31; break;
  case 11: count.value = 30; break;
  case 12: count.value = 31; break;
}
let total = unref(count)
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
//添加打卡事项
function NewList(text) {//清单项数据构造函数
  this.id = +new Date(); this.text = text; this.day1 = 0; this.day2 = 0;
  this.day3 = 0; this.day3 = 0; this.day4 = 0; this.day5 = 0; this.day6 = 0;
  this.day7 = 0; this.day8 = 0; this.day9 = 0; this.day10 = 0; this.day11 = 0;
  this.day12 = 0; this.day13 = 0; this.day14 = 0; this.day15 = 0; this.day16 = 0;
  this.day17 = 0; this.day18 = 0; this.day19 = 0; this.day20 = 0; this.day21 = 0;
  this.day22 = 0; this.day23 = 0; this.day24 = 0; this.day25 = 0; this.day26 = 0;
  this.day27 = 0; this.day28 = 0; this.day29 = 0; this.day30 = 0; this.day31 = 0
}
const input = ref()
const addList = () => {
  checkData.value.push(new NewList(input.value))
  input.value = ''
}
//删除打卡事项
const multipleTableRef = ref()//获取表格实例
const deleteList = (scope) => {//单条操作
  checkData.value.splice(scope.$index, 1)
}
const ifOperate = ref(false)//控制批量操作列的显示与隐藏
const multiOperate = () => {//批量操作
  if (ifOperate.value && multipleTableRef.value.getSelectionRows()?.length) {
    multipleTableRef.value.getSelectionRows().forEach(item => {
      console.log(item)
      checkData.value = checkData.value.filter(item2 => {
        return item2.id != item.id
      })
    })
  }
  ifOperate.value = !ifOperate.value
}
//报表
const drawer = ref(false)//控制报表抽屉的显示与隐藏
const reportData = computed(() => {//当月报表数据
  let data = { date: '', list: [] }
  if (checkData.value?.length) {
    data.date = `${year.value}年${month.value}月${date.value}日`
    checkData.value.forEach(item => {
      let calc = 0
      for (let k in item) {
        k == 'id' || k == 'text' ? '' : calc += item[k] - 0
      }
      data.list.push({ text: item.text, done: calc, total: total })
    })
  }
  console.log('统计报表', reportData)
  return data
})
const lastReportData = reactive({ date: '', list: [] })
const openDrawer = () => {
  drawer.value = !drawer.value
}
//存档
onMounted(() => {
  watchEffect(() => {//实时存储
    console.log('实时存储清单')
    localStorage.setItem('checkToDo', JSON.stringify(checkData.value == undefined ? [] : checkData.value))
  })
  watchEffect(() => {//实时存储
    console.log('实时存储报表')
    localStorage.setItem('currentReport', JSON.stringify(reportData.value))
  })
})

watch([month, reportData], ([newM, oldM], [newR, oldR]) => {
  if (newM - oldM == 1 || newM - oldM == -11) {//月份变动了就把实时存储的报表存至上月记录，并把当月报表的清空，同时将打卡全部归零
    console.log('月份变了吗', newM, oldM)
    localStorage.setItem('lastReport', JSON.stringify(oldR))
    localStorage.setItem('currentReport', '')
    checkData.value.forEach(item => {
      for (let k in item) {
        k == 'id' || k == 'text' ? '' : item[k] = 0
      }
    })
  }
})
//格式化
const clear = () => {
  checkData.value = []
  lastReportData.date = ''
  lastReportData.list = []
  localStorage.removeItem('lastReport')
  localStorage.removeItem('currentReport')
  localStorage.removeItem('checkToDo')

}

</script>

<template>
  <div class="checkToDo">
    <!-- 页面头部 -->
    <header class="header">
      <el-row style="height:100%">
        <el-col :span="9"
          style="height:100%;font-size:30px;line-height:100%;font-weight: 800;text-decoration: underline;overflow: hidden;">
          <img src="https://socialbeta.oss-cn-hangzhou.aliyuncs.com/avatar/5659-1460605047.png"
            style="height:60px;vertical-align: middle;margin-right: 20px;" />每日打卡记录
        </el-col>
        <el-col :span="5">
          <el-card shadow="always"
            style="width:100%;text-align: center;font-size:20px;line-height:20px;background-color: bisque;margin-top:-10px;color:brown;white-space:pre-line">
            {{ today }}
          </el-card>
        </el-col>
        <el-col :span="10" style="padding-left:20px">
          <el-input v-model="input" style="margin-top:10px;width:calc(100% - 80px)" size="large" placeholder="添加打卡项……"
            @change="addList" />
          <el-button type="warning" round style="margin-left:5px;margin-top:10px;width:60px">添加</el-button>
        </el-col>
      </el-row>
    </header>
    <!-- 主体区域 -->
    <main class="main" ref="tableContainerRef">
      <!-- 表格 -->
      <el-table ref="multipleTableRef" :data="checkData" style="width: 100%" :height="currentHeight"
        :max-height="currentHeight" border row-key="id">
        <el-table-column prop="text" :label="`${month}月打卡清单`" width="150px" fixed />
        <el-table-column v-for="num in total" :key="num" :prop="`day${num}`" :label="`${num}日`" width="30px">
          <template #default="scope">
            <el-switch v-model="scope.row[`day${num}`]"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: gray;transform: rotate(90deg);"
              active-value="1" inactive-value="0"
              :disabled="new Date(`${year}-${month}-${num} 0:0:0`).getTime() < new Date(`${year}-${month}-${date} 0:0:0`).getTime() || new Date(`${year}-${month}-${num} 0:0:0`).getTime() > new Date(`${year}-${month}-${date} 23:59:59`).getTime()" />
          </template>
        </el-table-column>
        <el-table-column v-if="ifOperate" type="selection" width="30px" reserve-selection fixed="right" />
        <el-table-column label="批量操作" min-width="150px" fixed="right">
          <template #header>
            <span @click="multiOperate" style="cursor:pointer;color:brown">{{ ifOperate ?
              '删除所选/取消批量操作' : '点击此处可批量操作' }}</span>
          </template>
          <template #default="scope">
            <el-popconfirm title="确定删除这条事项吗?" confirm-button-text="确认删除" cancel-button-text="不了"
              @confirm="deleteList(scope)">
              <template #reference>
                <el-button :disabled="ifOperate ? true : false" size="default" type="danger" plain>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="一个计划都没有呢…………" style="height:100%" />
        </template>
      </el-table>
      <!-- 独立的报表按钮 -->
      <div class="report" @click="openDrawer">{{ drawer ? '关闭' : '报表' }}</div>
      <!-- 报表抽屉 -->
      <el-drawer v-model="drawer" title="❤打卡统计" direction="rtl" :show-close="false" style="text-align: center;"
        class="reportDrawer">
        <!-- 本月统计 -->
        <el-card style="margin-bottom:20px">
          <template #header>
            <div>
              <span>{{ '本月' }}</span>
            </div>
          </template>
          <div v-for=" (item, index) in reportData.list" :key="index"
            style="text-align: left;margin-bottom: 20px;line-height: 25px;">
            <div style="color:brown">{{ ` ${item.text}：` }}</div>
            {{ `已打卡${item.done}天（共${item.total}天,打卡率${(item.done / total * 100).toFixed(2)}%)` }}
          </div>
        </el-card>
        <!-- 上月统计 -->
        <el-card>
          <template #header>
            <div>
              <span>{{ `${lastReportData.list.length ? lastReportData.date : '暂无'}历史记录` }}</span>
            </div>
          </template>
          <div v-for=" (item, index) in lastReportData.list" :key="index" style="text-align: left;">
            <div style="color:brown">{{ ` ${item.text}：` }}</div>
            {{ `打卡${item.done}天（共${item.total}天,打卡率${(item.done / total * 100).toFixed(2)}%)` }}
          </div>
        </el-card>
      </el-drawer>
    </main>
    <!-- 独立的格式化按钮 -->
    <el-popconfirm title="需要格式化数据吗？" confirm-button-text="格式化" cancel-button-text="不了" @confirm="clear">
      <template #reference>
        <el-icon class="clear">
          <Setting />
        </el-icon>
      </template>
    </el-popconfirm>
  </div>
</template>

<style lang="scss">
.checkToDo {
  box-sizing: border-box;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  border: 10px solid black;
  border-radius: 10px;
  display: flex;
  flex-flow: column nowrap;
  padding: 10px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  .header {
    width: 100%;
    height: 100px;

  }

  .main {
    width: 100%;
    height: calc(100% - 100px);
    flex: 1;
    padding: 10px 0;
    height: calc(100% - 52px - 42px);
    position: relative;

    //表头
    .el-table__header-wrapper {
      box-sizing: border-box;
      height: 50px;

      .el-table__header {
        box-sizing: border-box;
        height: 100%;
        border-bottom: 1px solid gray;

        tr {
          th {
            text-align: center;
            font-size: 12px;

            .cell {
              padding: 0
            }
          }
        }


      }
    }

    //表内容
    .el-table__body-wrapper {
      box-sizing: border-box;

      tr {
        height: 50px;

        td {
          text-align: center;
          height: 50px;

          .cell {
            box-sizing: border-box;
            padding: 0;
            width: 30px;
            text-align: center;

            .el-switch {
              box-sizing: border-box;
              height: 32px;
              width: 30px;

              .el-switch__core {
                box-sizing: border-box;
                height: 20px;
                min-width: 31px;
              }
            }

            .el-checkbox {
              width: 100%;
              justify-content: center;

            }
          }
        }

        td:first-child,
        td:last-child {
          .cell {
            width: 100%
          }
        }
      }
    }

    //查看报表按钮
    .report {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgb(169, 67, 67);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      margin-right: -30px;
      margin-bottom: -30px;
      z-index: 4000;
      text-align: left;
      color: white;
      padding: 14px 0 0 10px;
      cursor: pointer;
      transition: all ease .5s;

      &:hover {
        transform: scale(1.2)
      }
    }
  }
}

//报表抽屉
.reportDrawer {
  width: 1136px;
  box-sizing: border-box;
  padding-bottom: 28px;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .el-drawer__title {
    font-size: 24px;
    text-decoration: underline;
  }

  .el-card__header {
    padding: 0;

    div {
      width: 100%;
      line-height: 35px;
      background-color: bisque;
      font-weight: 700;
    }
  }
}

//右上角格式化按钮
.clear {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  cursor: pointer;
  transition: all ease .2s;

  &:hover {
    font-size: 30px;
  }
}
</style>