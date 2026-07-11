/* ============================================================
   MD电竞 · products.js
   ------------------------------------------------------------
   这是唯一需要维护的数据文件。
   以后新增 / 修改 / 删除项目，只需要编辑下面的 PRODUCTS 数组，
   不需要碰 index.html 或 style.css。

   分类（category）会根据 PRODUCTS 里出现的 cat 自动生成 Tab，
   新增一个新的 cat 值，页面会自动多出一个分类，无需手动配置。

   图片：
   - cover        封面图，显示在点单中心的卡片上
   - detailImage  详情页图片，可以是一张（字符串）或多张（数组）
   - 图片一律放在 images/products/ 文件夹里，这里只填相对路径。
   - 不使用 Base64，图片文件与代码分离，方便你直接在 GitHub 网页
     端上传/替换图片，不用改代码。
   - 如果某个项目暂时没有图片，把 cover / detailImage 留空字符串
     "" 即可，卡片会自动显示一个占位图标，不会报错。

   订单表单地址在 js/app.js 顶部的 ORDER_FORM_URL 常量里配置。
   ============================================================ */

const CATEGORY_META = {
  // key: { name: 显示名称, icon: emoji 图标 }
  // 新增分类时，如果想要更友好的名字/图标，在这里加一条即可；
  // 如果没加，页面会用 cat 原始值当作名字，也不会报错。
  baodi:  { name: '保底单', icon: '🛡️' },
  duhong: { name: '赌红单', icon: '🎲' },
  quwei:  { name: '趣味单', icon: '🎉' },
  paodao: { name: '跑刀',   icon: '🔪' },
  peiwan: { name: '陪玩',   icon: '🎮' },
};

const PRODUCTS = [
  // ---------- 保底单 ----------
  {
    id: 'b1',
    cat: 'baodi',
    name: '绝密航天＆巴克什',
    price: 78,
    unit: '局',
    tag: '',
    cover: 'images/products/b1-cover.jpg',
    detailImage: 'images/products/b1-detail.jpg',
    desc: '78r保底700w',
    detail: '对局内出现任何问题请保存录屏联系客服处理。',
    notice: '下单前请仔细阅读以下点单须知',
  },
  {
    id: 'b2',
    cat: 'baodi',
    name: '绝密航天＆巴克什',
    price: 98,
    unit: '局',
    tag: '',
    cover: 'images/products/b2-cover.jpg',
    detailImage: 'images/products/b2-detail.jpg',
    desc: '98r保底1000w',
    detail: '对局内出现任何问题请保存录屏联系客服处理。',
    notice: '下单前请仔细阅读以下点单须知',
  },
  {
    id: 'b3',
    cat: 'baodi',
    name: '绝密航天＆巴克什',
    price: 58,
    unit: '局',
    tag: '',
    cover: 'images/products/b3-cover.jpg',
    detailImage: 'images/products/b3-detail.jpg',
    desc: '58r保底500w',
    detail: '对局内出现任何问题请保存录屏联系客服处理。',
    notice: '下单前请仔细阅读以下点单须知',
  },
  {
    id: 'b4',
    cat: 'baodi',
    name: '绝密航天＆巴克什',
    price: 78,
    unit: '局',
    tag: '',
    cover: 'images/products/b4-cover.jpg',
    detailImage: 'images/products/b4-detail.jpg',
    desc: '78r保底700w',
    detail: '对局内出现任何问题请保存录屏联系客服处理。',
    notice: '下单前请仔细阅读以下点单须知',
  },
  {
    id: 'b5',
    cat: 'baodi',
    name: '绝密监狱',
    price: 128,
    unit: '局',
    tag: '',
    cover: 'images/products/b5-cover.jpg',
    detailImage: 'images/products/b5-detail.jpg',
    desc: '128r保底700w',
    detail: '对局内出现任何问题请保存录屏联系客服处理。',
    notice: '下单前请仔细阅读以下点单须知',
  },

  // ---------- 赌红单 ----------
  {
    id: 'd1',
    cat: 'duhong',
    name: '浮力补偿设备',
    price: 488,
    unit: '局',
    tag: '',
    cover: 'images/products/d1-cover.jpg',
    detailImage: 'images/products/d1-detail.jpg',
    desc: '基础保底3888w，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理。',
    notice: '下单前请仔细阅读以下点单须知',
  },
  {
    id: 'd2',
    cat: 'duhong',
    name: '雷明顿打字机',
    price: 1288,
    unit: '局',
    tag: '高赔率',
    cover: 'images/products/d2-cover.jpg',
    detailImage: 'images/products/d2-detail.jpg',
    desc: '基础保底8888w，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理。',
    notice: '下单前请仔细阅读以下点单须知',
  },
  {
    id: 'd3',
    cat: 'duhong',
    name: '卫星锅',
    price: 58,
    unit: '局',
    tag: '',
    cover: 'images/products/d3-cover.jpg',
    detailImage: 'images/products/d3-detail.jpg',
    desc: '基础保底500w，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理。',
    notice: '下单前请仔细阅读以下点单须知',
  },
  {
    id: 'd4',
    cat: 'duhong',
    name: '火箭燃料',
    price: 288,
    unit: '局',
    tag: '',
    cover: 'images/products/d4-cover.jpg',
    detailImage: 'images/products/d4-detail.jpg',
    desc: '基础保底2288w，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理。',
    notice: '下单前请仔细阅读以下点单须知',
  },

  // ---------- 跑刀 ----------
  {
    id: 'p1',
    cat: 'paodao',
    name: '1000w哈弗币',
    price: 60,
    unit: '局',
    tag: '',
    cover: 'images/products/p1-cover.jpg',
    detailImage: 'images/products/p1-detail.jpg',
    desc: '1000w哈弗币',
    detail: '力求以最快效率完成订单。',
    notice: '若对订单有疑问请及时联系客服',
  },

  // ---------- 趣味单（示例：敬请期待类项目） ----------
  {
    id: 'q1',
    cat: 'quwei',
    name: '加速上架中~',
    price: 0,
    unit: '局',
    tag: '敬请期待',
    hidePrice: true,
    cover: '',
    detailImage: '',
    desc: '加速上架中~',
    detail: '对局内出现任何问题请保存录屏联系客服处理。',
    notice: '下单前请仔细阅读以下点单须知',
  },

  /* ------------------------------------------------------------
     以后新增项目，直接复制一份上面的对象、改内容即可，例如：

     {
       id: 'b6',                              // 唯一 id，不要和别的项目重复
       cat: 'baodi',                          // 分类 key，新分类会自动出现
       name: '项目名称',
       price: 100,
       unit: '局',
       tag: '',                               // 角标文字，没有就留空字符串
       cover: 'images/products/b6-cover.jpg',
       detailImage: [                          // 详情图支持多张
         'images/products/b6-detail-1.jpg',
         'images/products/b6-detail-2.jpg',
       ],
       desc: '简介，展示在卡片上',
       detail: '服务说明，展示在详情页',
       notice: '注意事项，展示在详情页',
     },
  ------------------------------------------------------------ */
];
