import React, { memo } from 'react';
import './PullRefresh.scss';


interface IContentText {
    contentpull?: string,
    contentrefresh?: string,
    contentdone?: string
}
interface IProps {
    height?: string,
    color?: string,
    status: string,
    contentText?: IContentText
}

const defaultContentText: IContentText = {
    contentpull: '下拉刷新数据',
    contentrefresh: '数据加载中，请稍后',
    contentdone: '数据加载完成'
}
const PullRefresh: React.FC<IProps> = props => {
    const {
        color = '#999999',
        status = 'refresh',
        height = '60px',
        contentText = defaultContentText
    } = props;
    return (
        <div className="lhy-pull-refresh__wrapper" style={{ height }}>
            {/* loading图标 */}
            {status === 'loading' && (
                <div className="lhy-pull-refresh__gif">
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
            <div className="lhy-pull-refresh__text" style={{ color }}>{status === 'refresh' ? contentText.contentpull : (status === 'loading' ? contentText.contentrefresh : contentText.contentdone)}</div>
        </div>
    );
}



export default memo(PullRefresh);
