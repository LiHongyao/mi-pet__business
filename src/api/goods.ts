import request from './request'

interface ISpec {
  item: string,
  wholesale_price: string,
  original_price: string,
  sale_price: string
}
interface IUploadGoods {
  banners: string[],
  infos: string[],
  items: ISpec[],
  title: string,
  brand: string,
  type_id: number,
  label_id: number,
  expiration_date: number
}

/**
 * 商品上传
 * @param data 
 */
export function add(data: IUploadGoods) {
  return request({
    url: '/merchant/goods/add',
    method: 'POST',
    data
  });
}

/**
 * 商品列表/搜索
 * @param data 
 */
export function list(data: any) {
  return request({
    url: '/merchant/goods/list',
    method: 'POST',
    data
  })
}

/**
 * 商品下架
 * @param goodsId 
 */
export function soldout(goodsId: number ) {
  return request({
    url: '/merchant/goods/soldout',
    method: 'POST',
    data: { goodsId }

  })
}


/**
 * 商品详情
 * @param goodsId 
 */
export function details(goodsId: number ) {
  return request({
    url: `/merchant/goods/${goodsId}`
  })
}