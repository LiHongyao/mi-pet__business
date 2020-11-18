import React, { useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useTitle } from '../../hooks/index';

import Scroll, { kPullUpStatus, kPullDownStatus } from '../../components/@lgs/Scroll/index';
import NoData from '../../components/@lgs/NoData'
import Item from '../../components/Item/Item'
import Loading from '../../components/@lgs/Loading/index'
import TabMenu from '../../components/@lgs/TabMenu/index';

import Api from '../../api'
import './index.scss';



enum PullType {
  A_REFRESH, // 0
  B_REFRESH, // 1
  C_REFRESH, // 2

  A_LOAD_MORE, // 3
  B_LOAD_MORE, // 4
  C_LOAD_MORE  // 5
}

const OrderManagement: React.FC = () => {
  // history
  const history = useHistory();

  // state

  const [type, setType] = useState(1);

  const [aData, setAData] = useState<SPMS.IGoodsItem[]>(null);
  const [bData, setBData] = useState<SPMS.IGoodsItem[]>(null);
  const [cData, setCData] = useState<SPMS.IGoodsItem[]>(null);

  const [aPage, setApage] = useState(0);
  const [bPage, setBpage] = useState(0);
  const [cPage, setCpage] = useState(0);

  const [aPullUpStatus, setAPullUpStatus] = useState(kPullUpStatus.INITIAL)
  const [bPullUpStatus, setBPullUpStatus] = useState(kPullUpStatus.INITIAL)
  const [cPullUpStatus, setCPullUpStatus] = useState(kPullUpStatus.INITIAL)

  const [aPullDownStatus, setAPullDownStatus] = useState(kPullDownStatus.REFRESH)
  const [bPullDownStatus, setBPullDownStatus] = useState(kPullDownStatus.REFRESH)
  const [cPullDownStatus, setCPullDownStatus] = useState(kPullDownStatus.REFRESH)

  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const menuRef = useRef<any>();
  useLayoutEffect(() => {
    setScrollHeight(menuRef.current.height)
  }, []);


  // methods
  const getPage = useCallback((pull: PullType) => {
    switch(pull) {
      case PullType.A_LOAD_MORE:
        return aPage + 1;
      case PullType.B_LOAD_MORE:
        return bPage + 1;
      case PullType.C_LOAD_MORE:
        return cPage + 1;
      default:
        return 1;
    }
  }, [aPage, bPage, cPage]);

  const handleStartStatus = (pull: PullType) => {
    switch(pull) {
      case PullType.A_LOAD_MORE:
        setAPullUpStatus(kPullUpStatus.LOADING);
        break;
      case PullType.B_LOAD_MORE:
        setBPullUpStatus(kPullUpStatus.LOADING);
        break;
      case PullType.C_LOAD_MORE:
        setCPullUpStatus(kPullUpStatus.LOADING);
        break;
      case PullType.A_REFRESH:
        setAPullDownStatus(kPullDownStatus.LOADING);
      break;
      case PullType.B_REFRESH:
        setBPullDownStatus(kPullDownStatus.LOADING);
        break;
      case PullType.C_REFRESH:
        setCPullDownStatus(kPullDownStatus.LOADING);
        break;
    }
  }

  const handleEndStatus = (pull: PullType, hasMore: boolean) => {
    switch(pull) {
      case PullType.A_LOAD_MORE:
        setAPullUpStatus(hasMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
        break;
      case PullType.B_LOAD_MORE:
        setBPullUpStatus(hasMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
        break;
      case PullType.C_LOAD_MORE:
        setCPullUpStatus(hasMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
        break;
      case PullType.A_REFRESH:
        setAPullDownStatus(kPullDownStatus.LOADING);
        setAPullDownStatus(kPullDownStatus.DONE);
        setAPullUpStatus(hasMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
        setTimeout(() => {
          setAPullDownStatus(kPullDownStatus.REFRESH);
        }, 500);
      break;
      case PullType.B_REFRESH:
        setBPullDownStatus(kPullDownStatus.LOADING);
        setBPullDownStatus(kPullDownStatus.LOADING);
        setBPullDownStatus(kPullDownStatus.DONE);
        setBPullUpStatus(hasMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
        setTimeout(() => {
          setBPullDownStatus(kPullDownStatus.REFRESH);
        }, 500);
        break;
      case PullType.C_REFRESH:
        setCPullDownStatus(kPullDownStatus.LOADING);
        setCPullDownStatus(kPullDownStatus.LOADING);
        setCPullDownStatus(kPullDownStatus.DONE);
        setCPullUpStatus(hasMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
        setTimeout(() => {
          setCPullDownStatus(kPullDownStatus.REFRESH);
        }, 500);
        break;
    }
  }

  const setDataCallback = (setData, data, isLoad) => {
    if(isLoad) {
      setData(prev => {
        return prev.concat(data)
      });
    }else {
      setData(data);
    }
  }

  const getData = useCallback((pull: PullType) => {
    // 获取请求页码
    const page = getPage(pull);
    // 处理开始状态
    handleStartStatus(pull);
    // 请求数据
    Api.order.list({
      type,
      pageSize: 10,
      page,
    }).then(res => {
      const { data, pages: { pageNo, total }} = res.data;
      // 处理数据
      switch(pull) {
        case PullType.A_LOAD_MORE:
          setDataCallback(setAData, data, true);
          setApage(pageNo);
          break;
        case PullType.B_LOAD_MORE:
          setDataCallback(setBData, data, true);
          setBpage(pageNo);
          break;
        case PullType.C_LOAD_MORE:
          setDataCallback(setCData, data, true);
          setCpage(pageNo);
          break;
        case PullType.A_REFRESH:
          setDataCallback(setAData, data, false);
          setApage(pageNo);
          break;
        case PullType.B_REFRESH:
          setDataCallback(setBData, data, false);
          setBpage(pageNo);
          break;
        case PullType.C_REFRESH:
          setDataCallback(setCData, data, false);
          setCpage(pageNo);
          break;
      }
      // 处理结束状态
      handleEndStatus(pull, pageNo < total);
    });
  }, [getPage, type]);

  const refresh = useCallback(() => {
    switch(type) {
      case 1: 
        getData(PullType.A_REFRESH)
        break;
      case 2:
        getData(PullType.B_REFRESH)
        break;
      case 3:
        getData(PullType.C_REFRESH)
        break;
    }
  }, [getData, type]);
  const load = useCallback(() => {
    switch(type) {
      case 1: 
        getData(PullType.A_LOAD_MORE)
        break;
      case 2:
        getData(PullType.B_LOAD_MORE)
        break;
      case 3:
        getData(PullType.C_LOAD_MORE)
        break;
    }
  }, [getData, type]);




  // events
  const onMenuItemTap = useCallback((index: number) => {
    setType(index + 1);
  }, []);


  const onItemTap = useCallback(({ orderId, type}) => {
    history.push(`/order-details/${orderId}/${type}`)
  }, [history]);

  // hooks
  useTitle('订单管理');

  useEffect(() => {
    switch(type) {
      case 1:
        !aData && getData(PullType.A_REFRESH);
        break;
      case 2:
        !bData && getData(PullType.B_REFRESH);
        break;
      case 3:
        !cData && getData(PullType.C_REFRESH);
        break;
    }
  }, [type, aData, bData, cData, getData]);




  return (
    <div className="page order-management">
      <TabMenu
        ref={menuRef}
        menus={['待发货', '已完成', '退款/售后']}
        onMenuItemTap={onMenuItemTap}
      >
        {/* 待发货 */}
        <React.Fragment>
          <div className="px-10 mt-10">
            <Scroll
              height={scrollHeight}
              pullUpStatus={aPullUpStatus}
              pullDownStatus={aPullDownStatus}
              onPullDown={refresh}
              onPullUp={load}
            >
              {aData ? (
                <>
                  {aData.length === 0 && <NoData />}
                  {aData.length > 0 && aData.map((item, index) => (
                    <Item key={index} type={1} data={item} index={index} onTap={onItemTap}/>
                  ))}
                </>
              ): (
                <Loading />
              )}
            </Scroll>
          </div>
        </React.Fragment>
        {/* 已完成 */}
        <React.Fragment>
          <div className="px-10 mt-10">
            <Scroll
              height={scrollHeight}
              pullUpStatus={bPullUpStatus}
              pullDownStatus={bPullDownStatus}
              onPullDown={refresh}
              onPullUp={load}
            >
              {bData ? (
                <>
                  {bData.length === 0 && <NoData />}
                  {bData.length > 0 && bData.map((item, index) => (
                    <Item key={index} type={2} data={item} index={index} onTap={onItemTap}/>
                  ))}
                </>
              ): (
                <Loading />
              )}
            </Scroll>
          </div>
        </React.Fragment>
        {/* 退款/售后 */}
        <React.Fragment>
          <div className="px-10 mt-10">
            <Scroll
              height={scrollHeight}
              pullUpStatus={cPullUpStatus}
              pullDownStatus={cPullDownStatus}
              onPullDown={refresh}
              onPullUp={load}
            >
              {cData ? (
                <>
                  {cData.length === 0 && <NoData />}
                  {cData.length > 0 && cData.map((item, index) => (
                    <Item key={index} type={3} data={item} index={index} onTap={onItemTap}/>
                  ))}
                </>
              ): (
                <Loading />
              )}
            </Scroll>
          </div>
        </React.Fragment>
      </TabMenu>
    </div>
  )
};

export default OrderManagement;