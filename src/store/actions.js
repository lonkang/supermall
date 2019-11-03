import { ADD_COUNTER, ADD_TO_CART } from './mutations-type'

export default  {
  // 判断逻辑和异步操作都可放在actions中
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 查询之前的数组是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 判断oldProduct
    if(oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
      resolve('当前商品数量+1')
    }else{
      // context.cartList.push(payload)
      payload.count = 1
      context.commit(ADD_TO_CART, payload)
      resolve('添加了新的商品')
    }
    })
  }
}