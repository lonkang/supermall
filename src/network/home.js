import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: "/home/multidata"
  })
}

// 获取商品信息
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}