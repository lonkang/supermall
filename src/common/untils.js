// export function debounce(func, delay) {
//   let timer = null 
//   return (...args) => {
//     if(timer) clearTimeout(timer) 
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, delay)
//   }
// }
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


// // 传入一个函数 一个延迟事件 
// export function debounce(fn, delay) {
//   //  设置time 为null
//   let timer = null
//   // 返回 一个函数
//   return (...args) => {
//     // 如果timer存在 就清理定时器timer
//     if(timer) clearTimeout(timer)
//     // 把 setTimeout 返回给
//     timer = setTimeout(() => {
//       fn.apply(this, args)
//     }, delay)
//   }
// }
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

