import { defineStore } from "pinia";
import { fetchOrdersList, fetchOrderDetail, fetchOrdersDeliver, fetchOrdersPrepare, fetchOrdersClose } from "@@/apis/ordersApi";

const useOrderStore = defineStore('orders', {
  state: () => {
    return {
      ordersList: [], //原始订单列表
      ordersPage: 1,//订单列表当前页码
      ordersSize: 10,//订单列表一页展示数量
      ordersCount: 0,//订单总数
      ordersTotalPage: 0,//订单总页数
      ordersFilter: '',//订单搜索关键词
      orderStatus: '',//订单筛选状态
    }
  },
  actions: {
    //获取订单列表
    getOrdersList(num, size, No, status) {
      const obj = {}
      obj.pageNumber = num
      obj.pageSize = size
      No == '' ? '' : obj.orderNo = No
      status == '' ? '' : obj.orderStatus = status
      console.log(obj)
      return fetchOrdersList(obj).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取订单列表成功---')
            this.ordersList = res.data.data.list
            this.ordersCount = res.data.data.totalCount
            this.ordersTotalPage = res.data.data.totalPage
            this.ordersList.forEach((item, index) => {//获取秒杀列表对应的商品信息
              this.getOrderDetail(item.orderId, index)
            })
          } else {
            console.log('获取订单列表失败---', res.data.message)
          }
        } else {
          console.log('请求获取订单列表失败---', res)
        }
      })
    },
    //配货
    getOrdersPrepare(val) {
      return fetchOrdersPrepare(val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('配货成功---')
            ElMessage.success({ message: res.data.message })
            this.getOrdersList(this.ordersPage, this.ordersSize, this.ordersFilter, this.orderStatus)//配货成功后更新列表
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('配货失败---', res.data.message)
          }
        } else {
          console.log('请求配货失败---', res)
        }
      })
    },
    //出库
    getOrdersDeliver(val) {
      return fetchOrdersDeliver(val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('出库成功---')
            ElMessage.success({ message: res.data.message })
            this.getOrdersList(this.ordersPage, this.ordersSize, this.ordersFilter, this.orderStatus)//配货成功后更新列表
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('出库失败---', res.data.message)
          }
        } else {
          console.log('请求出库失败---', res)
        }
      })
    },
    //关闭订单
    getOrdersClose(val) {
      return fetchOrdersClose(val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('关闭订单成功---')
            ElMessage.success({ message: res.data.message })
            this.getOrdersList(this.ordersPage, this.ordersSize, this.ordersFilter, this.orderStatus)//配货成功后更新列表
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('关闭订单失败---', res.data.message)
          }
        } else {
          console.log('请求关闭订单失败---', res)
        }
      })
    },
    //获取单个订单详情
    getOrderDetail(id, index) {
      return fetchOrderDetail(id).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取单个订单信息成功---')
            this.ordersList[index].orderDetail = res.data.data.newBeeMallOrderItemVOS
            this.ordersList[index].payTime = res.data.data.payTime
            this.ordersList[index].payTypeString = res.data.data.payTypeString
            this.ordersList[index].totalPrice = res.data.data.totalPrice
          } else {
            console.log('获取单个订单信息失败---', res.data.message)
          }
        } else {
          console.log('请求获取单个订单信息失败---', res)
        }
      })
    },

  }
})
export default useOrderStore