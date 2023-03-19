import { defineStore } from "pinia";
import { fetchGoodAdd, fetchGoodEdit, fetchGoodsList, fetchGoodsToggle, fetchGoodDetail } from "@@/apis/goodsApi";

const useGoodsStore = defineStore('goods', {
  state: () => {
    return {
      goodsList: [], //商品列表
      goodsPage: 1,//商品列表当前页码
      goodsSize: 10,//商品列表一页展示数量
      goodsCount: 0,//商品总数
      goodsTotalPage: 0,//商品总页数
      goodsFilter: '',//商品搜索关键词
      goodsSellStatus: ''//商品筛选状态
    }
  },
  actions: {
    //获取商品列表
    getGoodsList(num, size, name, status) {
      const obj = {}
      obj.pageNumber = num
      obj.pageSize = size
      name == '' ? '' : obj.goodsName = name
      status == '' ? '' : obj.goodsSellStatus = status
      return fetchGoodsList(obj).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取商品列表成功---')
            this.goodsList = res.data.data.list
            this.goodsCount = res.data.data.totalCount
            this.goodsTotalPage = res.data.data.totalPage
          } else {
            console.log('获取商品列表失败---', res.data.message)
          }
        } else {
          console.log('请求获取商品列表失败---', res)
        }
      })
    },
    //修改商品
    getGoodEdit(val) {
      return fetchGoodEdit(val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('修改商品成功---')
            ElMessage.success({ message: res.data.message })
            this.getGoodsList(this.goodsPage, this.goodsSize, this.goodsFilter, this.goodsSellStatus)//修改成功后更新列表
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('修改商品失败---', res.data.message)
          }
        } else {
          console.log('请求修改商品失败---', res)
        }
      })
    },
    //新增商品
    getGoodAdd(val) {
      return fetchGoodAdd(val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('新增商品成功---')
            ElMessage.success({ message: res.data.message })
            this.getGoodsList(this.goodsPage, this.goodsSize, this.goodsFilter, this.goodsSellStatus)
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('新增商品失败---', res.data.message)
          }
        } else {
          console.log('请求新增商品失败---', res)
        }
      })
    },
    //改商品状态
    getGoodsToggle(status, val) {
      return fetchGoodsToggle(status, val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('修改商品状态成功---')
            ElMessage.success({ message: res.data.message })
            this.getGoodsList(this.goodsPage, this.goodsSize, this.goodsFilter, this.goodsSellStatus)
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('修改商品状态失败---', res.data.message)
          }
        } else {
          console.log('请求修改商品状态失败---', res)
        }
      })
    },
  }
})
export default useGoodsStore