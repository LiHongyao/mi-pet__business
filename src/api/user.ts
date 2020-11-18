import request from './request'

/**
 * 登录
 * @param code 
 */
export function login(code: string) {
  return request({
    url: '/merchant/login',
    method: 'POST',
    data: { code }
  })
}

/**
 * 获取验证码
 * @param phone 手机号码
 */
export function code(phone: string) {
  return request({
    url: '/merchant/user/code',
    method: 'POST',
    data: { phone }
  })
}

/**
 * 注册商家
 * @param data 
 */
export function apply(data: {
  phone: string,
  username: string,
  phonecode: string
}) {
  return request({
    url: '/merchant/user/apply',
    method: 'POST',
    data
  })
}