import React, { useCallback, useState, useRef, useEffect } from "react";

import Search from "../../components/@lgs/Search";
import Scroll, {
  kPullDownStatus,
  kPullType,
  kPullUpStatus,
  usePullDown,
  usePullUp,
} from "../../components/@lgs/Scroll/index";
import NoData from "../../components/@lgs/NoData";
import Item from "../../components/Item/Item";
import Loading from "../../components/@lgs/Loading/index";

import { useTitle } from "../../hooks/index";
import Api from "../../api";
import "./index.scss";
import { useHistory } from "react-router";
import { Toast } from "antd-mobile";

const GoodsManagement: React.FC = () => {
  const history = useHistory();

  const listRef = useRef(null);
  // state
  const [scrollHeight, setScrollHeight] = useState(0);
  const [data, setData] = useState<SPMS.IGoodsItem[]>(null);
  const [page, setPage] = useState(1);
  const [keywords, setKeywords] = useState("");

  //  methods
  const getData = useCallback(
    (type: kPullType) => {
      // 根据上拉/下拉处理页码
      let _page: number;
      switch (type) {
        case kPullType.REFRESH:
          _page = 1;
          break;
        case kPullType.LOAD_MORE:
          _page = page + 1;
          break;
      }
      return new Promise((resolve, reject) => {
        Api.goods
          .list({
            keyword: keywords ? keywords : undefined,
            pageSize: 10,
            page: _page,
          })
          .then((res) => {
            const {
              data,
              pages: { pageNo, total },
            } = res.data;
            setPage(pageNo);
            setData((prevState) => {
              if (!prevState || type === kPullType.REFRESH) {
                pageNo >= total
                  ? resolve(kPullDownStatus.NO_MORE)
                  : resolve(kPullDownStatus.MORE);
                return data;
              } else {
                pageNo >= total
                  ? resolve(kPullUpStatus.NO_MORE)
                  : resolve(kPullUpStatus.MORE);
                return prevState.concat(data);
              }
            });
            setPage(pageNo);
          });
      });
    },
    [page, keywords]
  );

  // events
  const onItemTap = useCallback(
    ({ goodsId }) => {
      history.push(`/goods-details/${goodsId}`);
    },
    [history]
  );

  const onSearch = (keywords: string) => {
    setKeywords(keywords);
  };

  const onSoldout = useCallback((goodsId: number, index: number) => {
    Api.goods.soldout(goodsId).then(() => {
      Toast.info("下架成功！");
      setData((prevState) => {
        let _data = [...prevState];
        _data.splice(index, 1);
        return _data;
      });
    });
  }, []);

  // hooks
  const [pullDownStatus, onPullDown] = usePullDown(
    getData.bind(null, kPullType.REFRESH),
    true,
  );
  const [pullUpStatus, onPullUp] = usePullUp(
    getData.bind(null, kPullType.LOAD_MORE),
    pullDownStatus,
  );

  // effects
  useEffect(() => {
    setScrollHeight(
      document.body.clientHeight - listRef.current.getBoundingClientRect().top
    );
  }, [listRef]);
  useEffect(() => {
    setData(null);
    onPullDown();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords])

  useTitle("商品管理");

  return (
    <div className="page">
      {/* 搜索 */}
      <Search round={true} onSearch={onSearch} />
      {/* 商品列表 */}
      <div ref={listRef} className="px-10">
        <Scroll
          height={scrollHeight}
          pullUpStatus={pullUpStatus}
          onPullUp={onPullUp}
          pullDownStatus={pullDownStatus}
          onPullDown={onPullDown}
        >
          {data ? (
            <>
              {data.length === 0 && <NoData />}
              {data.length > 0 &&
                data.map((item, index) => (
                  <Item
                    key={index}
                    type={4}
                    data={item}
                    onTap={onItemTap}
                    index={index}
                    onSoldout={onSoldout}
                  />
                ))}
            </>
          ) : (
            <Loading />
          )}
        </Scroll>
      </div>

    </div>
  );
};

export default GoodsManagement;
