import React, { useState } from 'react'
import { Button, Toast } from 'antd-mobile';
import { useTitle } from '../../hooks/index';
import CodeBox from '../../components/@lgs/CodeBox';
import InputItem from '../../components/@lgs/InputItem/InputItem';
import Api from '../../api';
import Validator from '../../utils/validator'
import './index.scss';
import { useHistory } from 'react-router';

const BusinessApply: React.FC = () => {

  const history = useHistory()
  
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [phonecode, setPhonecode] = useState('');
  const [check, setCheck] = useState(false);

  const onSubmit = () => {
    if(!Validator.tel(phone)) {
      Toast.info('请输入合法手机号！');
    }else if(!/^\d{6}$/.test(phonecode)) {
      Toast.info('请输入6位数验证码');
    }else if(!username) {
      Toast.info('请输入商家名称');
    }else {
      Api.user.apply({
        phone,
        username,
        phonecode
      }).then(() => {
        history.push('/applying');
      });
    }
  }
  const onGetCode = () => {
    if(!Validator.tel(phone)) {
      Toast.info('请输入合法手机号！');
    }else {
      Api.user.code(phone).then(res => {
        setCheck(true)
        console.log(res);
      })
    }
  }
  useTitle('入驻商家');
 
  return (
    <div className="page px-10 pt-10">
      <div className="px-12 bg-FFFFFF rounded-12">
        <InputItem label="商家名称" placeHolder="请输入商家名称" onChange={(value) => { setUserName(value)}} />
        <InputItem label="手机号" placeHolder="请输入手机号码" type="tel" maxLength={11} onChange={(value) => { setPhone(value)}}/>
        <CodeBox onButtonTap={onGetCode} onChange={(value) => { setPhonecode(value)}} check={check} />
      </div>
     
      <Button className="submit-button" activeStyle={false} onClick={onSubmit}>提交申请</Button>
    </div>
  )
}
export default BusinessApply;
