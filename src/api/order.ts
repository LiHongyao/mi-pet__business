import request from './request'


/**
 * 获取订单列表
 * @param data 
 */
export function list(data: {
  type: number,
  pageSize: number,
  page: number
}) {
  return request({
    url: '/merchant/order/list',
    method: 'POST',
    data
  })
}

/**
 * 订单详情
 * @param orderId 
 */
export function details(orderId: number) {
  return request({
    url: `/merchant/order/${orderId}`,
  })
}

/**
 * 发货
 * @param data 
 */
export function deliver(data: {
  orderId: number,
  expNumber: string,
  expName?: string
}) {
  return request({
    url: '/merchant/order/deliver',
    method: 'POST',
    data
  })
}


