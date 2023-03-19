import { defineStore } from "pinia";
import { fetchCategoryList } from "@@/apis/categoryApi";

const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categoryList: [],//分类列表
    }
  },
  actions: {
    getCategoryList() {
      return fetchCategoryList().then(res => {
        if (res.status == 200) {
          if (res.data.resultCode == 200) {
            console.log('获取分类列表成功---')
            res.data.data.forEach(item => {
              this.categoryList.push({
                value: item.categoryId, label: item.categoryName, children: item.secondLevelCategoryVOS.map(item2 => {
                  return {
                    value: item2.categoryId, label: item2.categoryName, children: item2.thirdLevelCategoryVOS.map(item3 => {
                      return { value: item3.categoryId, label: item3.categoryName }
                    })
                  }
                })
              })
            })
          } else {
            console.log('获取分类列表失败---', res.data.message)
          }
        } else {
          console.log('请求获取分类列表失败---', res)
        }
      })
    }
  }
})

export default useCategoryStore