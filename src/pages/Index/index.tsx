import React from 'react'
import { useTitle } from '../../hooks/index'
import { useHistory } from 'react-router'
import './index.scss'

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
    icon: require('../../assets/images/icon_goods_mag.png'),
    path: '/goods-management'
  },
]

const Index = () => {
  const history = useHistory();
  // hooks
  useTitle('首页');
  // events
  const onItemTap = (path: string) => {
    history.push(path);
  }

  // render
  return (
    <div className="home d-flex justify-content-between flex-wrap px-10 pt-10">
      {data.map(item => (
        <section className="menu-item bg-FFFFFF flex-v-center rounded-10" key={item.title} onClick={() => { onItemTap(item.path)}}>
          <img className="menu-icon" src={item.icon} alt="" />
          <p className="f13 lh-18 color-272727 mt-13">{item.title}</p>
        </section>
      ))}
    </div>
  )
}

export default Index;



