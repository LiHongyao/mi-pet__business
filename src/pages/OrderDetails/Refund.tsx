import React, { memo } from "react";
import Utils from '../../utils/utils'

interface IProps {
  data: SPMS.IRefund
}

const Refund: React.FC<IProps> = (props) => {
  const { data } = props;
  const handlerStatus = (status: number) => {
    switch(status) {
      case 1:
        return '正在审核';
      case 2:
        return '已退款';
      default:
        return '退款失败'
    }
  }
  return (
    <div className="py-13 px-19 bg-FFFFFF mt-6">
      <h1 className="f14 lh-20 mb-13">退款原因 - <span className="color-828282">{handlerStatus(data.status)}</span></h1>
      <p className="f12 lh-17 color-393939 mb-9">{data.reason}</p>
      <p className="f11 lh-16 color-828282">{data.refundTime && Utils.dateFormat(data.refundTime)}</p>
    </div>
  );
};

export default memo(Refund);
