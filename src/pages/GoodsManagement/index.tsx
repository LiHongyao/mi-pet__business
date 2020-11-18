import React, { useCallback, useState, useRef, useEffect } from 'react'


import Search from '../../components/@lgs/Search'

import Scroll, { kPullUpStatus, kPullDownStatus } from '../../components/@lgs/Scroll/index'
import NoData from '../../components/@lgs/NoData'
import Item from '../../components/Item/Item'
import Loading from '../../components/@lgs/Loading/index'

import { useTitle } from '../../hooks/index'
import Api from '../../api'
import './index.scss';
import { useHistory } from 'react-router'
import { Toast } from 'antd-mobile'


enum PullType {
  REFRESH = 'REFRESH', 
  LOAD_MORE = 'LOAD_MORE'
};


const GoodsManagement:React.FC = () => {
  const history = useHistory();

  const listRef = useRef(null)
  // state
  const [scrollHeight, setScrollHeight] = useState(0);
  const [data, setData] = useState<SPMS.IGoodsItem[]>(null)
  const [page, setPage] = useState(0);
  const [pullUpStatus, setPullUpStatus] = useState<kPullUpStatus>(kPullUpStatus.INITIAL);
  const [pullDownStatus, setPullDownStatus] = useState<kPullDownStatus>(kPullDownStatus.REFRESH)
  const [keywords, setKeywords] = useState('');


  //  methods
  const getPage = useCallback((pull: PullType) => {
    switch(pull) {
      case PullType.LOAD_MORE:
        return page + 1;
      default:
        return 1;
    }
  }, [page]);

  const handleStartStatus = (pull: PullType) => {
    switch(pull) {
      case PullType.LOAD_MORE:
        setPullUpStatus(kPullUpStatus.LOADING);
        break;
      default: 
        setPullDownStatus(kPullDownStatus.LOADING)
    }
  }

  const handleEndStatus = (pull: PullType, hasMore: boolean) => {
    console.log('hasMore', hasMore)
    switch(pull) {
      // 上拉加载更多
      case PullType.LOAD_MORE:
        setPullUpStatus(hasMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
        break;
      default:
        setPullDownStatus(kPullDownStatus.DONE);
        setPullUpStatus(hasMore ? kPullUpStatus.MORE : kPullUpStatus.NO_MORE);
        setTimeout(() => {
          setPullDownStatus(kPullDownStatus.REFRESH);
        }, 500);
    }
  }

  const getData = useCallback((pull: PullType) => {
    // 获取请求页码
    const page = getPage(pull);
    // 处理开始状态
    handleStartStatus(pull);
    // 请求数据
    setTimeout(() => {
      Api.goods.list({
        keyword: keywords ? keywords : undefined,
        pageSize: 10,
        page,
      }).then(res => {
        const { data, pages: { pageNo, total }} = res.data;
        // 处理数据
        switch(pull) {
          case PullType.LOAD_MORE:
            setData(prev => {
              return prev.concat(data)
            });
            break;
          default: 
            setData(data);
        }
        setPage(pageNo);
        // 处理结束状态
        handleEndStatus(pull, pageNo < total);

      });
    }, 1000);
  }, [getPage, keywords]);
  const refresh = useCallback(() => {
    getData(PullType.REFRESH);
  }, [getData]);
  const load = useCallback(() => {
    getData(PullType.LOAD_MORE);
  }, [getData]);

  // events
  const onItemTap = useCallback(({ goodsId }) => {
    history.push(`/goods-details/${goodsId}`)
  }, [history]);

  const onSearch = useCallback((keywords: string) => {
    setKeywords(keywords);
  }, []);

  const onSoldout = useCallback((goodsId: number, index: number) => {
    Api.goods.soldout(goodsId).then(() => {
      Toast.info('下架成功！');
      setData(prevState => {
        let _data = [...prevState];
        _data.splice(index, 1);
        return _data;
      })
    });
  }, []);

  // effects
  useEffect(() => {
    setScrollHeight(document.body.clientHeight - listRef.current.getBoundingClientRect().top);
  }, [listRef])

  useEffect(() => {
    getData(PullType.REFRESH);
  }, [keywords, getData]);


  useTitle('商品管理');

  return (
    <div className="page">
      {/* 搜索 */}
      <Search round={true} onSearch={onSearch} />
      {/* 商品列表 */}
      <div ref={listRef} className="px-10">
        <Scroll
          height={scrollHeight}
          pullUpStatus={pullUpStatus}
          onPullUp={load}
          pullDownStatus={pullDownStatus}
          onPullDown={refresh}
        >
          {data ? (
            <>
              {data.length === 0 && <NoData />}
              {data.length > 0 && data.map((item, index) => (
                <Item key={index} type={4} data={item} onTap={onItemTap} index={index} onSoldout={onSoldout} />
              ))}
            </>
          ): (
            <Loading />
          )}
        </Scroll>
      </div>
    </div>
  )
}

export default GoodsManagement;