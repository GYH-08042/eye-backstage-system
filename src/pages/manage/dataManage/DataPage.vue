<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart, PieChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, onUnmounted } from 'vue';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LineChart,
  PieChart,
  LegendComponent,
  ToolboxComponent
])
let lineChart
let pieChart
onMounted(() => {
  //挂载折线图
  if (document.getElementById('line')) {
    lineChart = echarts.init(document.getElementById('line'), 'dark')
    lineChart.setOption({
      title: {
        text: '近7天订单情况'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['订单数量', '订单金额']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [`${new Date().getMonth() + 1}月${new Date().getDate() - 6}日`, `${new Date().getMonth() + 1}月${new Date().getDate() - 5}日`, `${new Date().getMonth() + 1}月${new Date().getDate() - 4}日`, `${new Date().getMonth() + 1}月${new Date().getDate() - 3}日`, `${new Date().getMonth() + 1}月${new Date().getDate() - 2}日`, `${new Date().getMonth() + 1}月${new Date().getDate() - 1}日`, `${new Date().getMonth() + 1}月${new Date().getDate()}日`]
      },
      yAxis: [
        {
          name: '数量(单)',
          type: 'value'
        },
        {
          name: '金额(元)',
          type: 'value'
        },

      ],
      series: [
        {
          name: '订单数量',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
          yAxisIndex: 0
        },
        {
          name: '订单金额',
          type: 'line',
          stack: 'Total',
          data: [2200, 1820, 1910, 2340, 2900, 3300, 3100],
          yAxisIndex: 1
        },
      ]
    })
  }
  //挂载饼图
  if (document.getElementById('pie')) {
    pieChart = echarts.init(document.getElementById('pie'), 'dark')
    pieChart.setOption({
      title: {
        text: '热销品类'
      },
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          type: 'pie',
          radius: [25, 125],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: '美妆' },
            { value: 38, name: '电器' },
            { value: 32, name: '手机' },
            { value: 30, name: '电脑' },
            { value: 28, name: '女装' },
            { value: 26, name: '男装' },
            { value: 22, name: '宠物' },
            { value: 18, name: '个护' }
          ]
        }
      ]
    }
    )
  }
})
//图表大小随窗口变化
window.addEventListener('resize', function () {
  lineChart.resize();
  pieChart.resize();
});
//组件卸载时销毁图表
onUnmounted(() => {
  lineChart.dispose();
  pieChart.dispose();
})

</script>

<template>
  <div
    style="flex:1;width:100%;box-shadow:0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);padding:10px;box-sizing: border-box;display: flex;justify-content: center;align-items: center"
    id="line">
  </div>
  <div
    style="flex:1;width:100%;box-shadow:0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);padding:10px;box-sizing: border-box;display: flex;justify-content: center;align-items: center"
    id="pie">
  </div>
</template>
