import React, { useState, useEffect, useRef } from "react";

import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import PullDown from "@better-scroll/pull-down";

import LoadMore from "./LoadMore";
import PullRefresh from "./PullRefresh";

import "./index.scss";

// 下拉状态
export enum kPullDownStatus {
  REFRESH = 'REFRESH',
  LOADING = 'LOADING',
  DONE = 'DONE',
}

// 上拉状态
export enum kPullUpStatus {
  INITIAL = 'INITIAL',
  MORE = 'MORE',
  NO_MORE = 'NO_MORE',
  LOADING = 'LOADING',
  LOADED = 'LOADED'
}


BScroll.use(Pullup).use(PullDown);

interface IProps {
  height?: number; 
  onScroll?: Function; 
  onPullUp?: Function; 
  pullUpStatus?: kPullUpStatus; 
  onPullDown?: Function; 
  pullDownStatus?: kPullDownStatus; 
}

const Scroll: React.FC<IProps> = (props) => {

  const {
    height = 500,
    pullUpStatus,
    pullDownStatus,
    onScroll,
    onPullUp,
    onPullDown,
  } = props;

  // refs
  const lgScrollRef = useRef<HTMLDivElement>();

  // states
  const [bScroll, setBScroll] = useState(null);

  // initialize
  useEffect(() => {
    console.log("__init_bScroll__");
    const scroll = new BScroll(lgScrollRef.current, {
      scrollY: true,
      probeType: 3, // 实时派发scroll事件
      bounce: {
        top: true,
        right: false,
        bottom: false,
        left: false,
      },
      pullUpLoad: !!onPullUp,
      pullDownRefresh: !!onPullDown
        ? {
            threshold: 80,
            stop: 60,
          }
        : false,
      click: true
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
  }, [onPullDown, onPullUp]);

  // => 滚动
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", onScroll);
    return () => {
      bScroll.off("scroll", onScroll);
    };
  }, [bScroll, onScroll]);

  // => 上拉加载更多
  useEffect(() => {
    // 如果bScrool或者onPullUp不存在再或者上拉加载状态为初始状态，则不响应上拉加载
    if (!bScroll || !onPullUp || pullUpStatus === kPullUpStatus.NO_MORE || pullUpStatus === kPullUpStatus.INITIAL) return;
    bScroll.on("pullingUp", onPullUp);
    bScroll.finishPullUp();
    return () => {
      bScroll.off("pullingUp", onPullUp);
    };
  }, [bScroll, onPullUp, pullUpStatus]);

  // =>下拉刷新
  useEffect(() => {
    if (!bScroll || !onPullDown) return;
    bScroll.on("pullingDown", onPullDown);
    return () => {
      bScroll.off("pullingDown", onPullDown);
    };
  }, [bScroll, onPullDown]);



  // 监听 - 上拉状态变化
  useEffect(() => {
    
    if(bScroll && (pullUpStatus === kPullUpStatus.MORE || pullUpStatus === kPullUpStatus.NO_MORE)) {
      let _timer = setTimeout(() => {
        console.log('___上拉/刷新scroll____')
        bScroll.finishPullUp()
        bScroll.refresh();
        clearTimeout(_timer);
      }, 300);
    }
  }, [bScroll, pullUpStatus])
  // 监听 - 下拉状态变化
  useEffect(() => {
    if(bScroll && pullDownStatus === kPullDownStatus.DONE) {
      console.log('___下拉/刷新scroll____')
      let _timer = setTimeout(() => {
        bScroll.finishPullDown()
        bScroll.refresh();
        clearTimeout(_timer);
      }, 300);
    }
  }, [bScroll, pullDownStatus])

  // 监听高度变化
  useEffect(() => {
    if(bScroll) {
      bScroll.refresh();
    }
  }, [bScroll, height])

  return (
    <div className="lg-scroll" style={height ? {height: height + 'px' } : {} } ref={lgScrollRef}>
      {/* 滚动内容 */}
      <div
        className="lhy-scroll__content"
        style={height ? { minHeight: height + 1 + 'px' } : {}}
      >
        {/* 下拉刷新 */}
        {onPullDown && <PullRefresh status={pullDownStatus} />}
        {/* 滚动内容 */}
        {props.children}
        {/* 上拉加载 */}
        {onPullUp && (<LoadMore visible={!!pullUpStatus} status={pullUpStatus} />)}
      </div>
    </div>
  );
};

export default Scroll;

