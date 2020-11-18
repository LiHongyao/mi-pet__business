import React, { memo } from 'react'
import GoodsInfo from '../GoodsInfo/GoodsInfo'
import './Item.scss'


interface IProps {
  type: number, // 1：待发货，2：已完成，3：退款/售后 4：商品管理
  data: SPMS.IGoodsItem,
  index: number,
  onTap?: (options:{goodsId: number, type: number, orderId: number}) => void,
  onSoldout?: (goodsId: number, index: number) => void
}
const Item: React.FC<IProps> = props => {
  // props
  const { type, data, index,onTap, onSoldout } = props;


  const _onTap = () => {
    onTap && onTap({
      goodsId: data.goodsId,
      type,
      orderId: data.orderId ? data.orderId : undefined
    });
  }
  const _onSoldout = (event: any) => {
    event.stopPropagation();
    onSoldout && onSoldout(data.goodsId, index);
  }

  // render
  return (
    <div className="item__wrapper bg-FFFFFF pl-10 pr-7 pt-14 pb-15 rounded-12 mb-10" onClick={_onTap}>
      <GoodsInfo data={data} />
      <div className="d-flex justify-content-end align-items-center mt-14">
        {/^[12]$/.test(type.toString()) && <section className="button flex-center rounded-17 color-272727 f13 border border-E1E1E1">查看详情</section>}
        {/^[4]$/.test(type.toString()) && <section className="button flex-center rounded-17 color-272727 f13 border border-E1E1E1" onClick={_onSoldout}>下架</section>}
        {/^[1]$/.test(type.toString()) && <section className="button flex-center rounded-17 color-FFFFFF f13 ml-14 bg-F82F5C">发货</section>}
        {/^[2]$/.test(type.toString()) && <section className="button flex-center rounded-17 color-FFFFFF f13 ml-14 bg-F82F5C">物流信息</section>}
        {/^[34]$/.test(type.toString()) && <section className="button flex-center rounded-17 color-FFFFFF f13 ml-14 bg-F82F5C">查看详情</section>}
      </div>
    </div>
  )
}

export default memo(Item);