# MD电竞官网 - 维护说明

## 目录结构

```
/
├── index.html          页面结构（一般不用改）
├── css/
│   └── style.css        样式（一般不用改）
├── js/
│   ├── products.js      ★ 所有项目数据，新增/改价/删除项目改这里
│   └── app.js            页面逻辑（联系方式、下单表单地址在这里改）
└── images/
    ├── products/         项目封面图 + 详情图放这里
    ├── banner/            收款码等横幅图片
    └── icons/             预留
```

## 以后怎么新增一个项目？

1. 把封面图、详情图丢进 `images/products/` 文件夹（文件名自己起，比如 `b6-cover.jpg`）。
2. 打开 `js/products.js`，在 `PRODUCTS` 数组里复制一份现有的项目对象，
   改成新项目的信息，把 `cover` / `detailImage` 填成刚才上传的图片路径。
3. 保存、上传到 GitHub，页面会自动更新，不用改 `index.html`。

## 怎么改价格 / 简介 / 下架某个项目？

- 改价格、简介：在 `js/products.js` 里找到对应项目，直接改字段。
- 下架某个项目：把它对应的那一整段对象删掉，或者暂时用 `//` 注释掉即可。

## 怎么新增一个分类？

不用手动加分类，只要在 `js/products.js` 新项目的 `cat` 字段填一个新的值
（比如 `peiwan`），页面顶部会自动多出一个分类 Tab。
如果想要这个分类有专属的中文名字和图标，去 `products.js` 顶部的
`CATEGORY_META` 里加一行就行，不加也不会报错（会直接显示 cat 原始值）。

## 手游/端游价格不同怎么配置？

现在全站每个项目默认都有"手游／端游"按钮，点哪个价格就变成哪个，
下单按钮也会跳到对应平台的表单。

在 `js/products.js` 里，每个项目用 `platforms` 字段（而不是单独的
`price` / `unit`）。为了少打字，文件顶部有个 `makePlatforms()` 小工具：

```js
platforms: makePlatforms(60, '局', '60r保底600w'),        // 手游/端游价格一样，都是60
platforms: makePlatforms(60, '局', '60r保底600w', 80),     // 手游60，端游80（第4个参数是端游价）
```

两个平台默认都会跳到 `js/app.js` 顶部配的 `ORDER_FORM_URL_MOBILE`
（手游）和 `ORDER_FORM_URL_PC`（端游）——**只需要改这两个链接，
全站所有项目就都跟着生效**，不用一个个项目单独配。

如果某个项目的手游或端游要单独用别的表单（不走全站默认），
不用 `makePlatforms()`，改成手写完整的 platforms 数组，加 `formUrl`：

```js
platforms: [
  { key: 'mobile', label: '手游', price: 60, unit: '局', desc: '60r保底600w', formUrl: '这个项目专属的手游表单' },
  { key: 'pc',     label: '端游', price: 80, unit: '局', desc: '80r保底600w', formUrl: '这个项目专属的端游表单' },
],
```

## 联系方式 / 下单表单地址

在 `js/app.js` 顶部：

```js
const ORDER_FORM_URL_MOBILE = '...'; // 手游默认下单表单，全站生效
const ORDER_FORM_URL_PC = '...';     // 端游默认下单表单，全站生效
const ORDER_FORM_URL = '...';        // 没有手游/端游选项的老项目走这个
const CONTACT = {
  wechatId: 'your_wechat_id',
  qq: '000000000',
};
```

## 图片说明

- 全部使用「路径引用」，没有使用 Base64，图片文件和代码是分开的，
  以后可以直接在 GitHub 网页端上传/替换/删除图片文件，不用碰代码。
- `detailImage` 统一用数组格式，哪怕只有一张也写成 `['xxx.jpg']`，
  以后要加图，直接在数组里多写一行路径即可。
- 图片还没传的话，路径先保持代码里写的样子（占位），页面会自动显示
  分类图标，不会破图；等你传好同名图片，页面自动换成真实图片。
