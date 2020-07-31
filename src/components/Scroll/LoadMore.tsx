import React, { memo } from 'react';
import './LoadMore.scss';

interface ContentText {
    contentdown: string,
    contentrefresh: string,
    contentnomore: string
}
interface Props {
    height?: string,
    color?: string,
    status?: string,
    visible?: boolean,
    contentText?: ContentText
}
const defaultContentText: ContentText = {
    contentdown: '上拉加载更多',
    contentrefresh: '数据加载中，请稍后',
    contentnomore: '没有更多数据了'
}

const LoadMore: React.FC<Props> = props => {
    // 默认值
    const {
        height = '80px',
        color = '#999999',
        status = 'loading',
        contentText = defaultContentText,
        visible = false
    } = props;

    return (
        <div className="lhy-load-more__wrapper" style={{ height, opacity: visible ? 1 : 0 }}>
            {/* loading图标 */}
            {status === 'loading' && (
                <div className="lhy-load-more__gif">
                    <div className="load1">
                        <div style={{ background: color }} />
                        <div style={{ background: color }} />
                        <div style={{ background: color }} />
                        <div style={{ background: color }} />
                    </div>
                    <div className="load2">
                        <div style={{ background: color }} />
                        <div style={{ background: color }} />
                        <div style={{ background: color }} />
                        <div style={{ background: color }} />
                    </div>
                    <div className="load3">
                        <div style={{ background: color }} />
                        <div style={{ background: color }} />
                        <div style={{ background: color }} />
                        <div style={{ background: color }} />
                    </div>
                </div>
            )}
            {/* 文字 */}
            <div className="lhy-load-more__text" style={{ color }}>{status === 'more' ? contentText.contentdown : (status === 'loading' ? contentText.contentrefresh : contentText.contentnomore)}</div>
        </div>
    );
}

export default memo(LoadMore);
