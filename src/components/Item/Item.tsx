import React, { memo } from 'react'
import HYImage from '../HYImage/HYImage'
import './Item.scss'

interface IProps {
  type: number, // 0：待发货，1：已完成，2：退款/售后 3：商品管理
}
const Item: React.FC<IProps> = props => {
  // props
  const { type } = props;
  // render
  return (
    <div className="item__wrapper bg-FFFFFF pl-10 pr-7 pt-14 pb-15 rounded-12 mt-10">
      <div className="d-flex">
        <HYImage className="goods-image border rounded-5 mr-12" src="http://www.shuoshuokong.com/d/file/2019-01/8481e48f8586fd81214f07659818eec1.jpg" />
        <div className="flex-1">
          <p className="f14 lh-20 color-2D2D2D line-clamp-2">冠能猫粮幼猫粮奶糕初乳粮增肥发腮离乳期猫粮1.2kg</p>
          <p className="mt-15">
            <span className="f13 lh-18 color-2D2D2D mr-5">价格</span>
            <span className="f10 lh-19 color-FF2121 f-bold">¥</span>
            <span className="f16 lh-19 color-FF2121 f-bold">199.00</span>
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center mt-14">
        {/^[01]$/.test(type.toString()) && <section className="button flex-center rounded-17 color-272727 f13 border border-E1E1E1">查看详情</section>}
        {/^[3]$/.test(type.toString()) && <section className="button flex-center rounded-17 color-272727 f13 border border-E1E1E1">下架</section>}
        {/^[0]$/.test(type.toString()) && <section className="button flex-center rounded-17 color-FFFFFF f13 ml-14 bg-F82F5C">发货</section>}
        {/^[1]$/.test(type.toString()) && <section className="button flex-center rounded-17 color-FFFFFF f13 ml-14 bg-F82F5C">物流信息</section>}
        {/^[23]$/.test(type.toString()) && <section className="button flex-center rounded-17 color-FFFFFF f13 ml-14 bg-F82F5C">查看详情</section>}



      </div>
    </div>
  )
}

export default memo(Item);