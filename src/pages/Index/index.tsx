import React from 'react'
import { useTitle } from '../../hooks/index'
import './index.scss'
import { useHistory } from 'react-router'
const data = [
  {
    title: '上传商品',
    icon: require('../../assets/images/icon_upload.png'),
    path: '/upload-goods'
  },
  {
    title: '订单管理',
    icon: require('../../assets/images/icon_order_mag.png'),
    path: '/order-management'
  },
  {
    title: '商品管理',
    icon: require('../../assets/images/icon_goods_mag.png')
  },
]

const Index = () => {
  const history = useHistory();
  // hooks
  useTitle('首页');
  // events
  const onItemTap = (path: string | undefined) => {
    path && history.push(path);
  }
  return (
    <div className="page d-flex flex-wrap px-10 pt-10">
      {/* 渲染菜单 */}
      {data.map(item => (
        <section className="menu-item bg-FFFFFF flex-v-center mb-10 rounded-10" key={item.title} onClick={() => { onItemTap(item.path)}}>
          <img className="menu-icon" src={item.icon} alt="" />
          <p className="f13 lh-18 color-272727 mt-13">{item.title}</p>
        </section>
      ))}
    </div>
  )
}

export default Index;



