import React from 'react';
import './index.scss'

const index = () => {
  return (
    <div className="page not-weixin text-center mt-99">
      <img className="icon-info" src={require('./images/icon-info.png')} alt=""/>
      <p className="f20 mt-30">请在微信客户端打开链接</p>
    </div>
  );
}

export default index;
