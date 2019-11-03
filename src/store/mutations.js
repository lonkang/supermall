import { ADD_COUNTER, ADD_TO_CART } from './mutations-type'

  export default {
      // mutations唯一目的就是修改state中的状态
      // mutations的每一个方法尽可能的完成的事单一一点
      [ADD_COUNTER](state, payload) {
        // 有商品的话再添加就把数量加1
        payload.count ++ 
      },
      [ADD_TO_CART](state, payload) {
        // 没有商品的时侯 就添加进去
        payload.checked = true
        state.cartList.push(payload)
      }
  }