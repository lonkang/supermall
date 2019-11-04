module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视口的宽度，对应的就是我们设计稿的宽度
      viewportHeight: 667, // 视口的高度， 对应的就是设计稿的高度
      unitPrecision: 5, // 指定 'px' 转换为视窗单位值得小数位数
      viewPortUnit: 'vw', // 指定转换成为视窗得高度 建议使用vm
      selectorBlackList: ['ignore', 'tab-bar'], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于1px不转换
      mediaQuery: false, // 允许再媒体查询中转换px
      exclude: [/TabBar.vue$/]
    }
  }
}
