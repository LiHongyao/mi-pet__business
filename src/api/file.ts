import request from './request'

interface IUpload {
  images: string[],
  type: string
}
export function upload(data: IUpload) {
  return request({
    url: '/merchant/file/upload',
    method: 'POST',
    data
  })
}