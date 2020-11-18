import React, { memo } from "react";
import "./index.scss";

interface IProps {
  title: string;
  value?: string;
  required?: boolean;
  border?: boolean;
  isLink?: boolean,
  field?: boolean,
  customCls?: string,
  children?: JSX.Element | JSX.Element[]
}
const Cell: React.FC<IProps> = (props) => {
  const { title, value, isLink, border, customCls } = props;
  console.log(props.children);
  return (
    <div className={`lg-cell ${border ? 'lg-cell__border' : ''} ${customCls || ''}`}>
      {/* 左边文字 */}
      <div className={`lg-cell__title`}>
        {title.split("").map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </div>
      {/* 内容 */}
      <div className="lg-cell__value">
        { value && value}
        { props.children && props.children}
      </div>
      {/* 右侧图标 */}
      {isLink && <img src={require('./images/icon_arrow_right.png')} alt="" className="lg-cell__arrow" />}
    </div>
  );
};

export default memo(Cell);
