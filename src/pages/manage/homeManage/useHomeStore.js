import { defineStore } from "pinia";
import { fetchCarouselEdit, fetchCarouselList, fetchCarouselAdd, fetchCarouselDelete } from "@@/apis/carouselApi";
import { fetchGoodsList, fetchGoodDetail } from '@@/apis/goodsApi'
import { fetchSeckillList, fetchSeckillEdit, fetchSeckillAdd, fetchSeckillDelete } from '@@/apis/seckillApi'
import { fetchRecommendList, fetchRecommendEdit, fetchRecommendAdd, fetchRecommendDelete } from '@@/apis/recommendApi'

const useHomeStore = defineStore('home', {
  state: () => {
    return {
      carouselList: [],//轮播图列表     
      goodsList: [],//商品列表
      seckillList: [],//秒杀配置列表
      recommendList: [],//推荐配置列表
      currPage: 1, //公用当前页码(除商品列表)
      pageSize: 10, //公用一页展示数量(除商品列表)
      totalCount: 0, //公用记录总个数(除商品列表)
      totalPage: 0, //公用记录总页数(除商品列表)
      goodsPage: 1,//商品列表当前页码
      goodsSize: 10,//商品列表一页展示数量
      goodsCount: 0,//商品总数
      goodsTotalPage: 0,//商品总页数
      goodsFilter: '',//商品搜索关键词
      goodsSellStatus: 0//商品筛选状态
    }
  },
  actions: {
    //获取轮播图列表
    getCarouselList(num, size) {
      return fetchCarouselList({ pageNumber: num, pageSize: size }).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取轮播图列表成功---')
            this.carouselList = res.data.data.list
            this.totalCount = res.data.data.totalCount
            this.totalPage = res.data.data.totalPage
          } else {
            console.log('获取轮播图列表失败---', res.data.message)
          }
        } else {
          console.log('请求获取轮播图列表失败---', res)
        }
      })
    },
    //修改轮播图
    getCarouselEdit(val) {
      return fetchCarouselEdit(val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('修改轮播图成功---')
            ElMessage.success({ message: res.data.message })
            this.getCarouselList(this.currPage, this.pageSize)
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('修改轮播图失败---', res.data.message)
          }
        } else {
          console.log('请求修改轮播图失败---', res)
        }
      })
    },
    //新增轮播图
    getCarouselAdd(val) {
      return fetchCarouselAdd(val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('新增轮播图成功---')
            ElMessage.success({ message: res.data.message })
            this.getCarouselList(this.currPage, this.pageSize)//修改成功后更新列表
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('新增轮播图失败---', res.data.message)
          }
        } else {
          console.log('请求新增轮播图失败---', res)
        }
      })
    },
    //删轮播图
    getCarouselDelete(val) {
      return fetchCarouselDelete(val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('删除轮播图成功---')
            ElMessage.success({ message: res.data.message })
            this.getCarouselList(this.currPage, this.pageSize)//修改成功后更新列表
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('删除轮播图失败---', res.data.message)
          }
        } else {
          console.log('请求删除轮播图失败---', res)
        }
      })
    },


    //获取商品列表
    getGoodsList(num, size, name, status) {
      const obj = {}
      obj.pageNumber = num
      obj.pageSize = size
      name == '' ? '' : obj.goodsName = name
      status == '' ? '' : obj.goodsSellStatus = status
      return fetchGoodsList({ pageNumber: num, pageSize: size, goodsName: name, goodsSellStatus: status }).then(res => {
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
    //获取单个商品信息
    getGoodDetail(id, index, type) {
      return fetchGoodDetail(id).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取单个商品信息成功---')
            type == 'seckill' ? this.seckillList[index].goodDetail = res.data.data.goods : this.recommendList[index].goodDetail = res.data.data.goods
          } else {
            console.log('获取单个商品信息失败---', res.data.message)
          }
        } else {
          console.log('请求获取单个商品信息失败---', res)
        }
      })
    },



    //获取秒杀列表
    getSeckillList(num, size) {
      return fetchSeckillList({ pageNumber: num, pageSize: size, configType: 3 }).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取秒杀列表成功---')
            this.seckillList = res.data.data.list
            this.totalCount = res.data.data.totalCount
            this.totalPage = res.data.data.totalPage
            this.seckillList.forEach((item, index) => {//获取秒杀列表对应的商品信息
              this.getGoodDetail(item.goodsId, index, 'seckill')
            })
          } else {
            console.log('获取秒杀列表失败---', res.data.message)
          }
        } else {
          console.log('请求获取秒杀列表失败---', res)
        }
      })
    },
    //修改秒杀
    getSeckillEdit(val) {
      return fetchSeckillEdit({ ...val, configType: 3 }).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('修改秒杀成功---')
            ElMessage.success({ message: res.data.message })
            this.getSeckillList(this.currPage, this.pageSize)//修改成功后更新列表
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('修改秒杀失败---', res.data.message)
          }
        } else {
          console.log('请求修改秒杀失败---', res)
        }
      })
    },
    //新增秒杀
    getSeckillAdd(val) {
      return fetchSeckillAdd({ ...val, configType: 3 }).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('新增秒杀成功---')
            ElMessage.success({ message: res.data.message })
            this.getSeckillList(this.currPage, this.pageSize)
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('新增秒杀失败---', res.data.message)
          }
        } else {
          console.log('请求新增秒杀失败---', res)
        }
      })
    },
    //删秒杀
    getSeckillDelete(val) {
      return fetchSeckillDelete(val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('删除秒杀成功---')
            ElMessage.success({ message: res.data.message })
            this.getSeckillList(this.currPage, this.pageSize)
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('删除秒杀失败---', res.data.message)
          }
        } else {
          console.log('请求删除秒杀失败---', res)
        }
      })
    },

    //获取推荐列表
    getRecommendList(num, size) {
      return fetchRecommendList({ pageNumber: num, pageSize: size, configType: 4 }).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取推荐列表成功---')
            this.recommendList = res.data.data.list
            this.totalCount = res.data.data.totalCount
            this.totalPage = res.data.data.totalPage
            this.recommendList.forEach((item, index) => {//获取秒杀列表对应的商品信息
              this.getGoodDetail(item.goodsId, index, 'recommend')
            })
          } else {
            console.log('获取推荐列表失败---', res.data.message)
          }
        } else {
          console.log('请求获取推荐列表失败---', res)
        }
      })
    },
    //修改推荐
    getRecommendEdit(val) {
      console.log('修改推荐', val)
      return fetchRecommendEdit({ ...val, configType: 4 }).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('修改推荐成功---')
            ElMessage.success({ message: res.data.message })
            this.getRecommendList(this.currPage, this.pageSize)//修改成功后更新列表
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('修改推荐失败---', res.data.message)
          }
        } else {
          console.log('请求修改推荐失败---', res)
        }
      })
    },
    //新增推荐
    getRecommendAdd(val) {
      return fetchRecommendAdd({ ...val, configType: 4 }).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('新增推荐成功---')
            ElMessage.success({ message: res.data.message })
            this.getRecommendList(this.currPage, this.pageSize)
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('新增推荐失败---', res.data.message)
          }
        } else {
          console.log('请求新增推荐失败---', res)
        }
      })
    },
    //删推荐
    getRecommendDelete(val) {
      return fetchRecommendDelete(val).then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('删除推荐成功---')
            ElMessage.success({ message: res.data.message })
            this.getRecommendList(this.currPage, this.pageSize)
          } else {
            ElMessage.error({ message: res.data.message })
            console.log('删除推荐失败---', res.data.message)
          }
        } else {
          console.log('请求删除推荐失败---', res)
        }
      })
    }
  }
})
export default useHomeStore