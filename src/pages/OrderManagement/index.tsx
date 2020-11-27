import React, { useRef, useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useTitle } from "../../hooks/index";

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
import Api from "../../api";
import "./index.scss";
import { Toast } from "antd-mobile";
import Utils from "../../utils/utils";
import Cookie from "../../utils/cookie";

const OrderManagement: React.FC = () => {
  // history
  const history = useHistory();
  // state
  const [data, setData] = useState<SPMS.IGoodsItem[] | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [type, setType] = useState(1);
  const [page, setPage] = useState(1);
  const [scrollHeight, setScrollHeight] = useState(0);

  const [visible, setVisible] = useState(false);
  const [downUrl, setDownUrl] = useState('');

  // methods
  const getData = (ktype: kPullType) => {
    // 根据上拉/下拉处理页码
    let _page: number;
    switch (ktype) {
      case kPullType.REFRESH:
        _page = 1;
        break;
      case kPullType.LOAD_MORE:
        _page = page + 1;
        break;
    }
    return new Promise((resolve, reject) => {
      Api.order
        .list({
          type,
          pageSize: 10,
          page: _page,
        })
        .then((res) => {
          const {
            data,
            pages: { pageNo, total },
          } = res.data;
          // 计算totalPage
          setPage(pageNo);
          setData((prevState) => {
            if (!prevState || ktype === kPullType.REFRESH) {
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
        });
    });
  };

  // events
  const onMenuItemTap = useCallback((index: number) => {
    setType(index);
  }, []);

  const onItemTap = useCallback(
    ({ orderId, type }) => {
      history.push(`/order-details/${orderId}/${type}`);
    },
    [history]
  );
  const onExport = () => {
    Api.order.download().then(res => {
      setVisible(true);
      setDownUrl(res.data);
    })
  }
 

  const onImport = (event) => {
    Toast.loading('上传中...', 1000);
    // 上传文件
    const file = event.target.files[0];
    if(!file) return;
    // if(!/.xlsx?^/.test(file.name)) {
    //   Toast.info('仅支持.xlsx/.xls类型的文件');
    //   return;
    // }
    const formData = new FormData();
    formData.append('file', file);
    fetch(`${process.env.REACT_APP_HOST}/merchant/order/import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Cookie.get('token')}`
      },
      body: formData,
    }).then(async response => {
      const res = await response.clone().json();
      if(res.status === 200) {
        Toast.info('导入成功');
        onPullDown();
      }else {
        Toast.info(res.msg)
      }
    })
    
  }

  // hooks
  useTitle("订单管理");
  const [pullDownStatus, onPullDown] = usePullDown(
    getData.bind(null, kPullType.REFRESH),
    false
  );
  const [pullUpStatus, onPullUp, setPullUpStatus] = usePullUp(
    getData.bind(null, kPullType.LOAD_MORE),
    pullDownStatus
  );

  // effects
  useEffect(() => {
    const node = listRef.current;
    if (node) {
      setScrollHeight(
        document.body.clientHeight -
          (node as HTMLDivElement).getBoundingClientRect().top
      );
    }
  }, [listRef]);
  useEffect(() => {
    setPullUpStatus(kPullUpStatus.INITIAL);
    setData(null);
    onPullDown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="page order-management">
      {/* 弹框 */}
      <div className={`dialog ${visible ? 'visible' : ''}`}>
        <div className="dialog__content">
          <div className="dialog__tips">订单文件链接已复制，请打开浏览器粘贴下载</div>
          <div className="dialog__button" onClick={() => {
            Utils.clipboard(downUrl);
            setVisible(false);
          }}>知道了</div>
        </div>
      </div>
      {/* menu */}
      <div className="menu">
        {["待发货", "已完成", "退款/售后"].map((item, i) => (
          <section
            className={`menu-item ${type - 1 === i ? "selected" : ""}`}
            key={`item__${i}`}
            onClick={() => onMenuItemTap(i + 1)}
          >
            {item}
          </section>
        ))}
      </div>
      <div className="px-10 mt-10" ref={listRef}>
        <Scroll
          height={scrollHeight}
          pullUpStatus={pullUpStatus}
          pullDownStatus={pullDownStatus}
          onPullDown={onPullDown}
          onPullUp={onPullUp}
        >
          {data ? (
            <>
              {data.length === 0 && <NoData />}
              {data.length > 0 &&
                data.map((item, index) => (
                  <Item
                    key={index}
                    type={type}
                    data={item}
                    index={index}
                    onTap={onItemTap}
                  />
                ))}
            </>
          ) : (
            <Loading />
          )}
        </Scroll>
      </div>
      {/* 导出 */}
      {type === 1 && (
        <div className="handle-wrapper">
          <div className="button bg-F82F5C color-FFFFFF flex-center mb-12  f10 lh-16 rounded-4 noselect" onClick={onExport}>导出订单</div>
          <div className="button bg-F82F5C color-FFFFFF flex-center  f10 lh-16  rounded-4 noselect">
            <label htmlFor="file">导入订单</label>
            <input id="file" type="file" onChange={onImport}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
