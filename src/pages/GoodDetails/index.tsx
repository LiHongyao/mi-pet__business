import React, { useEffect, useState, useCallback } from 'react'
import Api from '../../api'
import { Carousel } from 'antd-mobile'
import { useTitle } from '../../hooks'
import './index.scss'
import { useParams } from 'react-router'

import SpecBox from '../../components/SpecBox'

const GoodsDetails: React.FC = () => {
  const { goodsId } = useParams();
  
  // state
  const [spec, setSpec] = useState<SPMS.ISpec>()
  const [data, setData] = useState<SPMS.IGoodsDetails>() ;


  // events
  const onSpecChange = useCallback((spec: SPMS.ISpec) => {
    setSpec(spec);
  }, []);
  // effects

  useTitle('商品详情');

  useEffect(() => {
    Api.goods.details(goodsId).then(res => {
      setData(res.data);
      setSpec(res.data.specifications[0])
    })
  }, [goodsId]);

  return (
    <div className="page">
      {data && spec ? (
        <>
          {/* 轮播图 */}
          <Carousel infinite autoplay={true}>
            {data.images.map((item, index) => (
              <img 
                key={index} 
                src={item} 
                alt=""
              />
            ))}
          </Carousel>
          {/* 价格相关 */}
          <div className="px-20 bg-FFFFFF py-14">
            <h1 className="color-1A1A1A f15 lh-21 mt-12">{data.title}</h1>
            <div className="d-flex justify-content-between align-items-center f14 color-828282">
              <section>批发价：¥{spec.WholesalePrice}</section>
              <section>零售价：¥{spec.originPrice}</section>
            </div>
          </div>
          {/* 商品信息 */}
          <div className="px-20 mt-12 bg-FFFFFF py-14 f14 lh-31">
            <div className="flex-1 d-flex justify-content-between align-items-center">
              <section className="flex-1">
                <span className="color-828282">品牌：</span>
                <span className="color-272727">{data.brand}</span>
              </section>
              <section className="flex-1">
                <span className="color-828282">分类：</span>
                <span className="color-272727">{data.category}</span>
              </section>
            </div>
            <div className="flex-1 d-flex justify-content-between align-items-center">
              <section className="flex-1">
                <span className="color-828282">品种：</span>
                <span className="color-272727">{data.breed}</span>
              </section>
              <section className="flex-1">
                <span className="color-828282">保质期：</span>
                <span className="color-272727">{data.expires}个月</span>
              </section>
            </div>
          </div>
          <SpecBox data={data.specifications} onChange={onSpecChange}/>
          {/* 商品详情 */}
          <div className="mt-12 pt-14 bg-FFFFFF">
            <header className="px-20 mb-20 f14 d-flex justify-content-center align-items-center">  
              <section className="line"></section>
              <h1 className="color-272727 f14  mx-8">商品详情</h1>
              <section className="line"></section>
            </header>
            {data.infos.map((item, index) => (
              <img className="w-full" key={index} src={item} alt=""/>
            ))}
          </div>

          <p className="f12 lh-47 text-center color-828282">没有更多啦~</p>
        </>
      ) : null}
    </div>
  )
}

export default GoodsDetails;

