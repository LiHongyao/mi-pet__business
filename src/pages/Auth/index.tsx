import React, { useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { login } from '../../api/user'
import Utils from '../../utils/utils';
import Cookie from '../../utils/cookie';

// 公众号
// wxec2e0c1b7421b750
// daa00c7e3aa0156b326f08fa991ee377

interface IParams {
  type: string
}
const Auth: React.FC = () => {
  // params
  const { type } = useParams<IParams>();
  const history = useHistory();
  // methods
  const jumpAuth = () => {
    const appId =  process.env.REACT_APP_APPID;
    const redirect_uri = window.location.origin + '/auth/callback';
    const path = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
    window.location.href = path;
  }
  const handleCallback = useCallback(() => {
    const code = Utils.getUrlParamByName('code');
    login(code).then(res => {
      const {token, isBusiness } = res.data;
      Cookie.set('token', token);
      Cookie.set('isBusiness', isBusiness);
      switch(isBusiness) {
        case 0:
          history.replace('/business-apply');
          break;
        case 1:
          const path = sessionStorage.pathname ? sessionStorage.pathname : '/index';
          history.replace(path);
          break;
        case 2:
          history.replace('/applying');
          break;
      }
    }).catch(error => {})
  }, [history]);
  // effects
  useEffect(() => {
    if(type === 'jump') {
      jumpAuth();
    }else {
      handleCallback();
    }
  }, [type, handleCallback]);
  // render
  return (<></>);
}

export default Auth;
