import { createRouter, createWebHistory } from 'vue-router'
import useLoginStore from '@@/pages/useLoginStore'
const LoginPage = () => import('@@/pages/LoginPage.vue')
const DesktopPage = () => import('@@/pages/DesktopPage.vue')
const homeManage = () => import('@@/pages/manage/homeManage/homeManage.vue')
const CarouselPage = () => import('@@/pages/manage/homeManage/CarouselPage.vue')
const SeckillPage = () => import('@@/pages/manage/homeManage/SeckillPage.vue')
const RecommendPage = () => import('@@/pages/manage/homeManage/RecommendPage.vue')
// const categoryManage = () => import('@@/pages/manage/categoryManage/categoryManage.vue')
// const CategoryPage = () => import('@@/pages/manage/categoryManage/CategoryPage.vue')
const goodsManage = () => import('@@/pages/manage/goodsManage/goodsManage.vue')
const AddPage = () => import('@@/pages/manage/goodsManage/AddPage.vue')
const EditPage = () => import('@@/pages/manage/goodsManage/EditPage.vue')
const ordersManage = () => import('@@/pages/manage/ordersManage/ordersManage.vue')
const PreparePage = () => import('@@/pages/manage/ordersManage/PreparePage.vue')
const DeliverPage = () => import('@@/pages/manage/ordersManage/DeliverPage.vue')
const usersManage = () => import('@@/pages/manage/usersManage/usersManage.vue')
const UsersPage = () => import('@@/pages/manage/usersManage/UsersPage.vue')
const dataManage = () => import('@@/pages/manage/dataManage/dataManage.vue')
const DataPage = () => import('@@/pages/manage/dataManage/DataPage.vue')

//创建路由系统
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/desktop', components: { desktop: DesktopPage }, name: 'desktop', meta: { role: ['admin', 'employeeA', 'employeeB'] } },
    { path: '/login', components: { desktop: LoginPage }, name: 'login', alias: "/", meta: { role: ['admin', 'employeeA', 'employeeB'] } },
    { path: '/*', redirect: '/desktop' }//重定向
  ]
})
//需要鉴权的路径汇总，根据登录用户动态筛选添加至路由规则
export const moreRoutes = [
  {
    path: '/desktop/homeManagement', components: { module: homeManage }, meta: { id: 1, title: '首页管理', icon: 'House', role: ['admin', 'employeeA'] }, children: [
      { path: '/desktop/homeManagement/carousel', components: { management: CarouselPage }, meta: { id: 1.1, title: '轮播图配置', icon: 'Loading', role: ['admin', 'employeeA'] } },
      { path: '/desktop/homeManagement/seckill', components: { management: SeckillPage }, meta: { id: 1.2, title: '新品秒杀配置', icon: 'StarFilled', role: ['admin', 'employeeA'] } },
      { path: '/desktop/homeManagement/recommend', components: { management: RecommendPage }, meta: { id: 1.3, title: '推荐商品配置', icon: 'Promotion', role: ['admin', 'employeeA'] } }
    ]
  },
  // {
  //   path: '/desktop/cateManagement',  name:'cateManagement', components: { module: categoryManage }, meta: { id: 2, title: '分类页管理', icon: 'Reading', role: ['admin', 'employeeA'] }, children: [
  //     { path: '/desktop/cateManagement/category', components: { management: CategoryPage }, meta: { id: 2.1, title: '分类配置', icon: 'SetUp', role: ['admin', 'employeeA'] } },
  //   ]
  // },
  {
    path: '/desktop/goodsManagement', components: { module: goodsManage }, meta: { id: 3, title: '商品管理', icon: 'Goods', role: ['admin', 'employeeB'] }, children: [
      { path: '/desktop/goodsManagement/add', components: { management: AddPage }, meta: { id: 3.1, title: '新增商品', icon: 'Plus', role: ['admin', 'employeeB'] } },
      { path: '/desktop/goodsManagement/edit', components: { management: EditPage }, meta: { id: 3.2, title: '修改商品信息', icon: 'Edit', role: ['admin', 'employeeB'] } }
    ]
  },
  {
    path: '/desktop/ordersManagement', components: { module: ordersManage }, meta: { id: 4, title: '订单管理', icon: 'ShoppingCartFull', role: ['admin', 'employeeA', 'employeeB'] }, children: [
      { path: '/desktop/ordersManagement/prepare', components: { management: PreparePage }, meta: { id: 4.1, title: '配货', icon: 'Box', role: ['admin', 'employeeA'] } },
      { path: '/desktop/ordersManagement/deliver', components: { management: DeliverPage }, meta: { id: 4.2, title: '发货', icon: 'Ship', role: ['admin', 'employeeB'] } },
    ]
  },
  {
    path: '/desktop/usersManagement', components: { module: usersManage }, meta: { id: 5, title: '用户管理', icon: 'Avatar', role: ['admin', 'employeeB'] }, children: [
      { path: '/desktop/usersManagement/users', components: { management: UsersPage }, meta: { id: 5.1, title: '修改用户状态', icon: 'Tools', role: ['admin', 'employeeB'] } },
    ]
  },
  {
    path: '/desktop/data', components: { module: dataManage }, meta: { id: 6, title: '数据统计', icon: 'Histogram', role: ['admin'] }, children: [
      { path: '/desktop/Data/sellData', components: { management: DataPage }, meta: { id: 6.1, title: '销售数据', icon: 'Trophy', role: ['admin'] } },
    ]
  }
]

//路由守卫
router.beforeEach(async (to) => {
  useLoginStore().progressShow = true;//开启进度条
  let ifAddSuccess = false//用于判断权限是否加载完毕
  if (localStorage.getItem('token')) {//如果有token
    if (to.path == '/login') {//登录页直接跳到桌面
      return '/desktop'
    } else {
      if (!useLoginStore().info.loginUserName) {
        await useLoginStore().getInfo()//获取管理员信息并获取权限路由
        useLoginStore().allowedRoutes.forEach(item => {//添加路由规则
          useLoginStore().removeRoutes.push(router.addRoute('desktop', item))
          ifAddSuccess = true
          router.push({ ...to, raplace: true })
        })
        if (ifAddSuccess) {
          return
        }
      }
    }
  } else {
    if (to.path != '/login') {
      return '/login'
    }
    return
  }
})
router.afterEach(() => {
  setTimeout(() => {
    useLoginStore().progressShow = false;//关闭进度条
  }, 2000)
})

router.afterEach((to) => {
  //记录面包屑
  useLoginStore().breadCrumb = to.path.slice(1).split('/')
  //记录工作标签
  useLoginStore().addTags({ index: to.path })
})

