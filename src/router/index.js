import React from 'react'

const routes = [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('../pages/Index/index.tsx'))
  },
  {
    // 订单管理
    path: '/order-management',
    exact: true,
    component: React.lazy(() => import('../pages/OrderManagement/index.tsx'))
  },
  {
    // 上传商品
    path: '/upload-goods',
    exact: true,
    component: React.lazy(() => import('../pages/UploadGoods/index.tsx'))
  }
]

export default routes;