import React, { useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react'
import TabMenu from '../../components/TabMenu'
import Item from '../../components/Item/Item'
import Scroll from '../../components/Scroll'
import './index.scss'



interface IOptions {
  flag: string,
  pageNo: number,
  allPage: number,
  pullUpStatus: string,
  pullDownStatus: string,
  data: object | null
}


const DATA_MODEL = (): IOptions => ({
  flag: '',
  pageNo: 1,
  allPage: 1,
  pullUpStatus: '',
  pullDownStatus: 'refresh',
  data: null
})

const OrderManagement: React.FC = () => {

  // state
  const [curIndex, setCurIndex] = useState<number>(0);

  const [aOptions, setAOptions] = useState<IOptions>(DATA_MODEL());
  const [bOptions, setBOptions] = useState<IOptions>(DATA_MODEL());
  const [cOptions, setCOptions] = useState<IOptions>(DATA_MODEL());

  // refs
  const aScrollRef = useRef<any>();
  const bScrollRef = useRef<any>();
  const cScrollRef = useRef<any>();

  // 计算scroll高度
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const menuRef = useRef<any>();
  useLayoutEffect(() => {
    setScrollHeight(menuRef.current.height)
  }, []);

  const aOptionsRef = useRef<IOptions>();
  const bOptionsRef = useRef<IOptions>();
  const cOptionsRef = useRef<IOptions>();
  const curIndexRef = useRef<number>();

  useLayoutEffect(() => {
    aOptionsRef.current = aOptions;
  }, [aOptions]);
  useLayoutEffect(() => {
    bOptionsRef.current = bOptions;
  }, [bOptions]);
  useLayoutEffect(() => {
    cOptionsRef.current = cOptions;
  }, [cOptions]);
  useLayoutEffect(() => {
    curIndexRef.current = curIndex;
  }, [curIndex]);

  // methods
  const getData = useCallback(() => {
    setTimeout(() => {
      const pages = 10, pageNo = 3;
      // 分类处理
      switch (curIndexRef.current) {
        case 0:
          // 更新数据
          setAOptions(prevState => ({
            ...prevState,
            allPage: pages,
            data: null,
            pullUpStatus: 'more'
          }));

          // 更新scroll
          if (aScrollRef.current) {
            if (aOptionsRef.current!.flag === 'refresh') {
              setAOptions(prevState => ({ ...prevState, pullDownStatus: 'done' }));
              aScrollRef.current.finishPullDown();
              setTimeout(() => {
                setAOptions(prevState => ({ ...prevState, pullDownStatus: 'refresh' }));
              }, 800);
            } else if (aOptionsRef.current!.flag === 'load') {
              aScrollRef.current.finishPullUp();
            } else {
              aScrollRef.current.refresh();
            }
          }
          break;
        case 1:
          // 更新数据
          setBOptions(prevState => ({
            ...prevState,
            allPage: pages,
            data: null,
            pullUpStatus: 'more'
          }));
          // 更新scroll
          if (bScrollRef.current) {
            if (bOptionsRef.current!.flag === 'refresh') {
              setBOptions(prevState => ({ ...prevState, pullDownStatus: 'done' }));
              bScrollRef.current.finishPullDown();
              setTimeout(() => {
                setBOptions(prevState => ({ ...prevState, pullDownStatus: 'refresh' }));
              }, 800);
            } else if (bOptionsRef.current!.flag === 'load') {
              bScrollRef.current.finishPullUp();
            } else {
              bScrollRef.current.refresh();
            }
          }
          break;
        case 2:
          // 更新数据
          // 更新scroll
          if (cScrollRef.current) {
            if (cOptionsRef.current!.flag === 'refresh') {
              setBOptions(prevState => ({ ...prevState, pullDownStatus: 'done' }));
              cScrollRef.current.finishPullDown();
              setTimeout(() => {
                setBOptions(prevState => ({ ...prevState, pullDownStatus: 'refresh' }));
              }, 800);
            } else if (cOptionsRef.current!.flag === 'load') {
              cScrollRef.current.finishPullUp();
            } else {
              cScrollRef.current.refresh();
            }
          }
          break;
        default: { }
      }
    }, 0)
  }, []);

  // events
  const onMenuItemTap = useCallback((index) => {
    setCurIndex(index);
    switch (index) {
      // 待发货
      case 0:
        !aOptionsRef.current!.data && getData();
        break;
      // 已完成
      case 1:
        !bOptionsRef.current!.data && getData();
        break;
      // 退款/售后
      case 2:
        !cOptionsRef.current!.data && getData();
        break;
    }
  }, []);

  const onRefresh = useCallback(() => {
    console.log('下拉刷新')
    switch (curIndexRef.current) {
      // 待发货
      case 0:
        setAOptions(prevState => ({
          ...prevState,
          pullDownStatus: 'loading',
          flag: 'refresh',
          pageNo: 1
        }));
        getData();
        break;
      // 已完成
      case 1:
        setBOptions(prevState => ({
          ...prevState,
          pullDownStatus: 'loading',
          flag: 'refresh',
          pageNo: 1
        }));
        getData();
        break;
      // 退款/售后
      case 2:
        setCOptions(prevState => ({
          ...prevState,
          pullDownStatus: 'loading',
          flag: 'refresh',
          pageNo: 1
        }));
        getData();
        break;
    }
  }, []);
  const onLoadMore = useCallback(() => {
    switch (curIndexRef.current) {
      case 1: {
        const { pageNo, allPage, pullUpStatus } = aOptionsRef.current!;
        if (!pullUpStatus) {
          aScrollRef.current.finishPullUp();
          return;
        }
        if (pageNo >= allPage) {
          setAOptions(prevState => ({ ...prevState, pullUpStatus: 'nomore' }));
          aScrollRef.current.finishPullUp();
          return;
        }
        setAOptions(prevState => ({
          ...prevState,
          pullUpStatus: 'loading',
          flag: 'load',
          pageNo: pageNo + 1
        }));
        getData();
      }
        break;
      case 1: {
        const { pageNo, allPage, pullUpStatus } = bOptionsRef.current!;
        if (!pullUpStatus) {
          bScrollRef.current.finishPullUp();
          return;
        }
        if (pageNo >= allPage) {
          setBOptions(prevState => ({ ...prevState, pullUpStatus: 'nomore' }));
          bScrollRef.current.finishPullUp();
          return;
        }
        setBOptions(prevState => ({
          ...prevState,
          pullUpStatus: 'loading',
          flag: 'load',
          pageNo: pageNo + 1
        }));
        getData();
      }
        break;
      case 2: {
        const { pageNo, allPage, pullUpStatus } = cOptionsRef.current!;
        if (!pullUpStatus) {
          cScrollRef.current.finishPullUp();
          return;
        }
        if (pageNo >= allPage) {
          setCOptions(prevState => ({ ...prevState, pullUpStatus: 'nomore' }));
          cScrollRef.current.finishPullUp();
          return;
        }
        setCOptions(prevState => ({
          ...prevState,
          pullUpStatus: 'loading',
          flag: 'load',
          pageNo: pageNo + 1
        }));
        getData();
      }
        break;
      default: { }
    }
  }, []);

  // effects
  useEffect(() => {
    getData();
  }, [getData]);


  return (
    <div className="page order-management">
      <TabMenu
        ref={menuRef}
        menus={['待发货', '已完成', '退款/售后']}
        onMenuItemTap={onMenuItemTap}
      >
        {/* 待发货 */}
        <React.Fragment>
          <div className="px-10 pt-10">
            <Scroll
              ref={aScrollRef}
              height={scrollHeight + 'px'}
              pullUpStatus={aOptions.pullUpStatus}
              pullDownStatus={aOptions.pullDownStatus}
              onPullDown={onRefresh}
              onPullUp={onLoadMore}
            >
              <Item type={0} />
              <Item type={3} />
            </Scroll>
          </div>
        </React.Fragment>
        {/* 已完成 */}
        <React.Fragment>
          <div className="px-10 pt-10">
            <Scroll
              ref={bScrollRef}
              height={scrollHeight + 'px'}
              pullUpStatus={bOptions.pullUpStatus}
              pullDownStatus={bOptions.pullDownStatus}
              onPullDown={onRefresh}
              onPullUp={onLoadMore}
            >
              <Item type={1} />
              <Item type={1} />
              <Item type={1} />
              <Item type={1} />
              <Item type={1} />
              <Item type={1} />
              <Item type={1} />
              <Item type={1} />
              <Item type={1} />
              <Item type={1} />
            </Scroll>
          </div>
        </React.Fragment>
        {/* 退款/售后 */}
        <React.Fragment>
          <div className="px-10">
            <Scroll
              ref={cScrollRef}
              height={scrollHeight + 'px'}
              pullUpStatus={cOptions.pullUpStatus}
              pullDownStatus={cOptions.pullDownStatus}
              onPullDown={onRefresh}
              onPullUp={onLoadMore}
            >
              <Item type={2} />
              <Item type={2} />
            </Scroll>
          </div>
        </React.Fragment>
      </TabMenu>
    </div>
  )
};

export default OrderManagement;




