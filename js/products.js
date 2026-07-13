/* ============================================================
   MD电竞 · products.js
   ------------------------------------------------------------
   这是唯一需要维护的数据文件。
   以后新增 / 修改 / 删除项目，只需要编辑下面的 PRODUCTS 数组，
   不需要碰 index.html 或 style.css。

   分类（category）会根据 PRODUCTS 里出现的 cat 自动生成 Tab，
   新增一个新的 cat 值，页面会自动多出一个分类，无需手动配置。

   图片：
   - cover        封面图，显示在点单中心的卡片上（一张）
   - detailImage  详情页图片，统一用【数组】格式，哪怕只有一张也要
                   写成 ['xxx.jpg'] 这样，以后要加图直接往数组里加
                   一行就行，不用改格式。
   - 图片一律放在 images/products/ 文件夹里，这里只填相对路径。
   - 不使用 Base64，图片文件与代码分离，方便你直接在 GitHub 网页
     端上传/替换图片，不用改代码。
   - 图片还没传的话，路径先保持现在写的样子占位即可，页面会自动
     显示分类图标占位，不会破图；等你传好同名图片，页面自动换成
     真实图片，不用改这个文件。

   手游/端游（现在全站项目默认都有）：
   每个项目用 platforms 字段（数组）代替单一的 price/unit，
   详情页会自动出现"手游／端游"按钮，点哪个价格就变成哪个。
   两个平台默认走 js/app.js 顶部的 ORDER_FORM_URL_MOBILE /
   ORDER_FORM_URL_PC 这两个表单地址——只要在那边填好链接，
   全站所有项目就都跟着生效，不用一个个项目改。
   如果某个项目的手游或端游想单独用别的表单，在对应平台里加一个
   formUrl 字段即可，会优先用那个，不受全站默认值影响。
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

// 生成一个项目的 手游/端游 平台数组的小工具，避免每个项目重复写一样的结构。
// price 两个平台先填一样的，以后要分开定价，直接把这里返回值里的
// pcPrice 改成不一样的数字即可（默认等于 price）。
function makePlatforms(price, unit, desc, pcPrice) {
  return [
    { key: 'mobile', label: '手游', price: price, unit: unit, desc: desc },
    { key: 'pc',     label: '端游', price: (pcPrice !== undefined ? pcPrice : price), unit: unit, desc: desc },
  ];
}

const PRODUCTS = [
  // ---------- 保底单 ----------
  {
    id: 'b1',
    cat: 'baodi',
    name: '体验单',
    tag: '',
    cover: 'images/products/b1-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '60r保底600w',
    detail: '体验单每天每人仅限一单',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(60, '单', '60r保底600w'),
  },
  {
    id: 'b2',
    cat: 'baodi',
    name: '福利单',
    tag: '',Zplatforms: makePlatforms(60, '单', '60r保底600w'),
    cover: 'images/products/b2-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '85r保底1000w',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(85, '单', '85r保底1000w,99'),
  },
  {
    id: 'b3',
    cat: 'baodi',
    name: '福利单',
    tag: '',
    cover: 'images/products/b3-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '99r保底1488w',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(99, '单', '99r保底1488w'),
  },
  {
    id: 'b4',
    cat: 'baodi',
    name: '机密单',
    tag: '',
    cover: 'images/products/b4-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '58r保底500w',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(58, '单', '58r保底500w'),
  },
  {
    id: 'b5',
    cat: 'baodi',
    name: '绝密航天＆巴克什',
    tag: '',
    cover: 'images/products/b5-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '78r保底700w',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(78, '单', '78r保底700w'),
  },
  {
    id: 'b6',
    cat: 'baodi',
    name: '绝密监狱',
    tag: '',
    cover: 'images/products/b6-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '128r保底700w',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(128, '单', '128r保底700w'),
  },

  // ---------- 赌红单 ----------
  {
    id: 'd1',
    cat: 'duhong',
    name: '浮力补偿设备',
    tag: '',
    cover: 'images/products/d1-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保4888w，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(588, '局', '基础保4888w，不出不结单'),
  },
  {
    id: 'd2',
    cat: 'duhong',
    name: '雷明顿打字机',
    tag: '',
    cover: 'images/products/d2-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保底8888w，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(1288, '局', '基础保底8888w，不出不结单'),
  },
  {
    id: 'd3',
    cat: 'duhong',
    name: '卫星锅',
    tag: '',
    cover: 'images/products/d3-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保底500w，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(58, '局', '基础保底500w，不出不结单'),
  },
  {
    id: 'd4',
    cat: 'duhong',
    name: '火箭燃料',
    tag: '',
    cover: 'images/products/d4-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保底2288w，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(288, '局', '基础保底2288w，不出不结单'),
  },
  {
    id: 'd5',
    cat: 'duhong',
    name: '万金泪冠',
    tag: '',
    cover: 'images/products/d5-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保底一个亿，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(3888, '局', '基础保底一个亿，不出不结单'),
  },
  {
    id: 'd6',
    cat: 'duhong',
    name: '纵横',
    tag: '',
    cover: 'images/products/d6-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保底一个亿，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(3888, '局', '基础保底一个亿，不出不结单'),
  },
  {
    id: 'd7',
    cat: 'duhong',
    name: '天圆地方',
    tag: '',
    cover: 'images/products/d7-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保底7888w，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(888, '局', '基础保底7888w，不出不结单'),
  },
  {
    id: 'd8',
    cat: 'duhong',
    name: '非洲之心',
    tag: '',
    cover: 'images/products/d8-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保底两个亿，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(16888, '局', '基础保底两个亿，不出不结单'),
  },
  {
    id: 'd9',
    cat: 'duhong',
    name: '海洋之泪',
    tag: '',
    cover: 'images/products/d9-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保底两个亿，不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(18888, '局', '基础保底两个亿，不出不结单'),
  },

  // ---------- 趣味单 ----------
  {
    id: 'q1',
    cat: 'quwei',
    name: '勇敢者',
    tag: '',
    cover: 'images/products/q1-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '无基础保底',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(528, '局', '无基础保底'),
  },
  {
    id: 'q2',
    cat: 'quwei',
    name: '炫彩勇敢者',
    tag: '',
    cover: 'images/products/q2-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '无基础保底',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(1888, '局', '无基础保底'),
  },
  {
    id: 'q3',
    cat: 'quwei',
    name: '赌狗单',
    tag: '',
    cover: 'images/products/q3-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保底888w，老板猜对出生点保底翻倍（仅一次机会）开局前和打手确认要猜的出生点',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(178, '局', '基础保底888w，猜对出生点保底翻倍（仅一次机会）'),
  },
  {
    id: 'q4',
    cat: 'quwei',
    name: '妙手回春',
    tag: '',
    cover: 'images/products/q4-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '基础保底788w，老板对局中选择医疗位，打手倒地时每救起一位打手保底＋50w',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(158, '局', '基础保底788w，每救起一位打手保底＋50w'),
  },
  {
    id: 'q5',
    cat: 'quwei',
    name: '单局带出四种不同颜色镭射',
    tag: '',
    cover: 'images/products/q5-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '无基础保底，单局需成功撤离并带出四种不同颜色的镭射（红蓝绿紫），不出不结单',
    detail: '对局内出现任何问题请保存录屏联系客服处理',
    notice: '下单前请仔细阅读以下点单须知',
    platforms: makePlatforms(488, '局', '需带出红蓝绿紫四种镭射，不出不结单'),
  },

  // ---------- 跑刀单 ----------
  {
    id: 'p1',
    cat: 'paodao',
    name: '1000w哈弗币',
    tag: '',
    cover: 'images/products/p1-cover.jpg',
    detailImage: ['images/products/884.png'],
    desc: '',
    detail: '力求以最快效率完成订单',
    notice: '若对订单有疑问请及时联系客服',
    platforms: makePlatforms(60, '局', ''),
  },

  /* ------------------------------------------------------------
     以后新增项目，直接复制一份上面的对象、改内容即可，例如：

     {
       id: 'b7',                              // 唯一 id，不要和别的项目重复
       cat: 'baodi',                          // 分类 key，新分类会自动出现
       name: '项目名称',
       tag: '',                               // 角标文字，没有就留空字符串
       cover: 'images/products/b7-cover.jpg',
       detailImage: [                          // 详情图统一数组格式，加图直接往里加一行
         'images/products/b7-detail-1.jpg',
         'images/products/b7-detail-2.jpg',
       ],
       desc: '简介，展示在卡片上',
       detail: '服务说明，展示在详情页',
       notice: '注意事项，展示在详情页',
       platforms: makePlatforms(100, '局', '简介，展示在卡片上'),   // 价格用这个工具函数生成
     },

     // 如果这个项目手游/端游价格不一样，第四个参数传端游的价格：
     // platforms: makePlatforms(60, '局', '简介', 80),  // 手游60，端游80
  ------------------------------------------------------------ */
];
