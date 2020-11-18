import React, { useCallback, useState, useEffect } from "react";


import GoodsInfo from "../../components/GoodsInfo/GoodsInfo";
import AddressInfo from "../../components/AddressInfo/AddressInfo";
import Button from '../../components/@lgs/Button';
import Logistics from './Logistics';
import Refund from './Refund';
import Api from '../../api';

import { List } from 'antd-mobile'

import JustifyView from '../../components/@lgs/JustifyView'
import InputItem from '../../components/@lgs/InputItem/InputItem'


import { useParams, useHistory } from "react-router";
import { useTitle } from '../../hooks'

import "./index.scss";
import { Toast } from 'antd-mobile';


interface IOrder {
  address: SPMS.IAddress,
  goods: SPMS.IGoodsItem,
  logistics?: SPMS.ILogistics,
  refund?: SPMS.IRefund
}

interface IParams {
  orderId: string,
  type: string
}

// const LOGISTICS_DATA = [
//   { label: '', value: 1 },
// ]

const Item = List.Item;


const OrderDetails = () => {


  const { orderId, type } = useParams<IParams>();
  const history = useHistory();
  // const [expName, setExpName] = useState('');
  const [expNumber, setExpNumber] = useState('');
  const [order, setOrder] = useState<IOrder>();
  
  // events
  const onDeliverGoods = useCallback(() => {
    Api.order.deliver({
      orderId: +orderId,
      expNumber
    }).then(() => {
      Toast.info('发货成功', 1, () => {
        history.goBack();
      });
    })
  }, [expNumber, history, orderId]);


  
  // effects
  useTitle('订单详情');
  useEffect(() => {
    Api.order.details(+orderId).then(res => {
      setOrder(res.data);
    });
  }, [orderId, type]);
  return (
    <div className="page">
      {order ? (
        <>
          {/* 商品信息 */}
          <GoodsInfo data={order.goods} customCls="bg-FFFFFF pt-13 pb-17 pl-19 pr-16" />
          {/* 地址信息 */}
          <AddressInfo address={order.address} />
          {type === '1' && (
            <>
              {/* 物流单号 */}
              <div className="py-13 px-19 bg-FFFFFF mt-6">
                <h1 className="f14 lh-20 mb-13">物流信息</h1>
                <List>
                  {/* <Picker
                    data={}
                    value={[expName]}
                    cols={1}
                    extra="请选择"
                    // @ts-ignore
                    onChange={(value: Array<number>) => setExpName(value[0])}
                  >
                    <List.Item arrow="horizontal">
                      <JustifyView text="分类" />
                    </List.Item>
                  </Picker> */}
                  <Item>
                    <JustifyView text="物流单号" />
                    <InputItem placeHolder="请填写物流单号" clear onChange={(value: string) => setExpNumber(value)}/>
                  </Item>
                </List>
              </div>
              {/* 确认发货 */}
              <Button text="确认发货" round customCls="d-block mx-auto mt-22" onTap={onDeliverGoods} />
            </>
          )}
          {/* 物流信息 */}
          {type === '2' && order.logistics &&  <Logistics data={order.logistics}/>}
          {/* 退款/售后 */}
          {type === '3' && order.refund && <Refund data={order.refund}/>}
        </>
      ): null}
      
    </div>
  );
};

export default OrderDetails;
