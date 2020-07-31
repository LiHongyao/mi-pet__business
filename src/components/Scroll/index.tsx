import React, { memo, useEffect, useState, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';

import BScroll from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import PullDown from '@better-scroll/pull-down';
import LoadMore from './LoadMore';
import PullRefresh from './PullRefresh';
import './index.scss';

BScroll.use(Pullup).use(PullDown);

interface IProps {
    children: React.ReactElement[],
    height?: string,
    direction?: string,
    pullUpStatus: string,
    pullDownStatus: string,

    onScroll?: () => void,
    onPullUp?: () => void,
    onPullDown?: () => void
}

interface IRefs {
    refresh: () => void,
    finishPullUp: () => void,
    finishPullDown: () => void
}


const Scroll: React.RefForwardingComponent<IRefs, IProps> = (props, ref) => {
    // props
    const { direction = 'vertical', height, pullUpStatus, pullDownStatus } = props;
    const { onScroll, onPullUp, onPullDown } = props;

    // refs
    const lhyScrollWrapperRef = useRef<HTMLDivElement>(null);

    // states
    const [bScroll, setBScroll] = useState<BScroll | null>(null);

    // events
    const finishPullUp = useCallback(() => {
        if (bScroll) {
            let _timer = setTimeout(() => {
                bScroll.finishPullUp();
                bScroll.refresh();
                clearTimeout(_timer);
            }, 500);
        }
    }, [bScroll]);

    const finishPullDown = useCallback(() => {
        if (bScroll) {
            let _timer = setTimeout(() => {
                bScroll.finishPullDown()
                bScroll.refresh();
                clearTimeout(_timer);
            }, 300);
        }
    }, [bScroll]);

    const refresh = () => {
        if (bScroll) {
            console.log('刷新...')
            bScroll.refresh();
        }
    }

    // ref
    useImperativeHandle(ref, () => ({
        refresh,
        finishPullUp,
        finishPullDown
    }));

    // => 初始化
    useEffect(() => {
        console.log('__init_bScroll__');
        const scroll = new BScroll(lhyScrollWrapperRef.current!, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType: 3, // 实时派发scroll事件
            bounce: {
                top: true,
                right: false,
                bottom: false,
                left: false
            },
            pullUpLoad: !!onPullUp,
            pullDownRefresh: !!onPullDown ? {
                threshold: 100,
                stop: 60
            } : false,
            click: true
        });
        setBScroll(scroll);
        return () => {
            setBScroll(null);
        }
    }, [direction, onPullDown, onPullUp]);

    // => 监听滚动
    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', onScroll);
        return () => {
            bScroll.off('scroll', onScroll);
        }
    }, [bScroll, onScroll]);


    // => 上拉加载更多
    useEffect(() => {
        if (!bScroll || !onPullUp) return;
        bScroll.on('pullingUp', onPullUp);
        return () => {
            bScroll.off('pullingUp', onPullUp);
        }
    }, [bScroll, onPullUp])

    // =>下拉刷新
    useEffect(() => {
        if (!bScroll || !onPullDown) return;
        bScroll.on('pullingDown', onPullDown);
        return () => {
            bScroll.off('pullingDown', onPullDown);
        }
    }, [bScroll, onPullDown]);

    return (
        <div className="lhy-scroll__wrapper" ref={lhyScrollWrapperRef} style={{ height }}>
            {/* 滚动内容 */}
            <div className="lhy-scroll__content" style={{ minHeight: `calc(${height} + 1px)` }}>
                {/* 下拉刷新 */}
                {onPullDown && <PullRefresh status={pullDownStatus} />}
                {/* 滚动内容 */}
                {props.children}
                {/* 上拉加载 */}
                {onPullUp && <LoadMore visible={!!pullUpStatus} status={pullUpStatus} />}
            </div>
        </div>
    );
}




export default memo(forwardRef(Scroll));
