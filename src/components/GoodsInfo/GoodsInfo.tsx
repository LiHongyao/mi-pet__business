import React, { memo } from 'react'
import Image from '../@lgs/Image'
import './GoodsInfo.scss'
interface IProps {
  showNum?: boolean,
  customCls?: string,
  data: SPMS.IGoodsItem
  onTap?: () => void
}
const GoodsInfo: React.FC<IProps> = props => {
  const { showNum = true, customCls, data } = props;
  const { onTap } = props;
  return (
    <div className={`d-flex ${customCls ? customCls : ''}`} onClick = { () => { onTap && onTap()  }}>
      <Image className="goods-image border rounded-5 mr-12" src={data.thumbnail} />
      <div className="flex-1">
        <div className="f14 lh-20 color-2D2D2D line-clamp-2">{data.title}</div>
        <div className="mt-15 f13 lh-18 color-2D2D2D d-flex justify-content-between align-items-center">
          <div className="flex-center">
            <span className="f13 lh-18 color-2D2D2D mr-5">规格：{data.spaceName}</span>
            <span className="100kg"></span>
          </div>
         {showNum && <span className=" mr-5">x{data.num}</span>}
        </div>
      </div>
    </div>
  )
}

export default memo(GoodsInfo);