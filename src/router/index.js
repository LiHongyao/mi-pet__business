import React from 'react'
import { Redirect } from 'react-router-dom'
const routes = [
  {
    path: '/',
    exact: true,
    component: () => {
     return (<Redirect to='/auth/jump' />)
    }
  },
  {
    // 授权
    path: '/auth/:type',
    exact: true,
    component: React.lazy(() => import('../pages/Auth/index.tsx'))
  },
  {
     // 首页
     path: '/index',
     exact: true,
     component: React.lazy(() => import('../pages/Index/index.tsx'))
  },
  {
    // 上传商品
    path: '/upload-goods',
    exact: true,
    component: React.lazy(() => import('../pages/UploadGoods/index.tsx'))
  },
  {
    // 商品管理
    path: '/goods-management',
    exact: true,
    component: React.lazy(() => import('../pages/GoodsManagement/index.tsx'))
  },
  {
    // 商品详情
    path: '/goods-details/:goodsId',
    exact: true,
    component: React.lazy(() => import('../pages/GoodDetails/index.tsx'))
  },
  {
    // 订单管理
    path: '/order-management',
    exact: true,
    component: React.lazy(() => import('../pages/OrderManagement/index.tsx'))
  },
  {
    // 订单详情
    path: '/order-details/:orderId/:type',
    exact: true,
    component: React.lazy(() => import('../pages/OrderDetails/index.tsx'))
  },
  {
    // 入驻申请
    path: '/business-apply',
    exact: true,
    component: React.lazy(() => import('../pages/BusinessApply/index.tsx'))
  },
  {
    // 入驻审核中
    path: '/applying',
    exact: true,
    component: React.lazy(() => import('../pages/Applying/index.tsx'))
  },
  {
    // test
    path: '/test',
    exact: true,
    component: React.lazy(() => import('../pages/Test/Test.tsx'))
  }
]

export default routes;