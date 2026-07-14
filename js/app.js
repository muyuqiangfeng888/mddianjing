/* ============================================================
   MD电竞 · app.js
   页面交互逻辑。分类和点单卡片全部由 products.js 的数据渲染，
   这个文件本身不需要因为增删项目而修改。
   ============================================================ */

// 下单收集表单地址（腾讯文档等）
// 现在所有项目都有"手游/端游"选项，默认走下面这两个表单——
// 只需要在这里改这两个链接，全站所有项目就都跟着换了。
// 如果某个项目的手游或端游要单独用不同的表单，去 products.js
// 那个项目的 platforms 里给对应平台加一个 formUrl 字段，会优先用那个。
const ORDER_FORM_URL_MOBILE = 'https://doc.weixin.qq.com/forms/AH0AxweMAF8Ab4AWwaDAHkCNpX0Pk0wXf';
const ORDER_FORM_URL_PC = 'https://doc.weixin.qq.com/forms/AH0AxweMAF8Ab4AWwaDAHkCNNfuRaV10f';
// 没有手游/端游选项的老项目，走这个兜底表单
const ORDER_FORM_URL = 'https://docs.qq.com/form/page/replace-with-your-form-id';

// 联系方式，改这里就行
const CONTACT = {
  officialAccount: 'MD电竞Pro',
  kookId: '～暂未开放～',
};

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  bindOrderDetailEvents();
  bindMiscEvents();
  setupReveal();
  setupFloatCta();
  fillContactInfo();
});

/* ---------------- 分类 + 商品渲染（数据驱动） ---------------- */

function getCategoriesFromProducts() {
  // 按照 PRODUCTS 数组中第一次出现的顺序，自动收集所有分类
  const seen = [];
  PRODUCTS.forEach(p => {
    if (!seen.includes(p.cat)) seen.push(p.cat);
  });
  return seen.map((cat, i) => ({
    id: cat,
    name: (CATEGORY_META[cat] && CATEGORY_META[cat].name) || cat,
    icon: (CATEGORY_META[cat] && CATEGORY_META[cat].icon) || '📦',
    tintIndex: i % 5,
  }));
}

const CATEGORIES = getCategoriesFromProducts();

function renderCategories() {
  const categoryTabsEl = document.getElementById('categoryTabs');
  const orderGridEl = document.getElementById('orderGrid');

  if (CATEGORIES.length === 0) {
    categoryTabsEl.innerHTML = '';
    orderGridEl.innerHTML = '<div class="order-empty">暂无上架项目，敬请期待</div>';
    return;
  }

  categoryTabsEl.innerHTML = CATEGORIES.map((c, i) =>
    `<button class="category-tab${i === 0 ? ' active' : ''}" data-cat="${c.id}">${c.icon} ${c.name}</button>`
  ).join('');

  renderOrderItems(CATEGORIES[0].id);

  categoryTabsEl.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabsEl.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderOrderItems(tab.dataset.cat);
    });
  });
}

function coverMarkup(item, tintIndex) {
  if (item.cover) {
    // 图片加载失败时自动回退到占位图标，不会出现破图
    return `<img src="${item.cover}" alt="${item.name}" loading="lazy"
              onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'img-fallback',textContent:'${(CATEGORY_META[item.cat] && CATEGORY_META[item.cat].icon) || '📦'}'}))">`;
  }
  return `<div class="img-fallback">${(CATEGORY_META[item.cat] && CATEGORY_META[item.cat].icon) || '📦'}</div>`;
}

function cardPriceMarkup(it) {
  if (it.hidePrice) return '<span style="font-size:14px;color:var(--muted);">敬请期待</span>';
  if (it.platforms && it.platforms.length) {
    const minPrice = Math.min(...it.platforms.map(p => p.price));
    return '¥' + minPrice + '<small> 起</small>';
  }
  return '¥' + it.price + '<small> /' + it.unit + '</small>';
}

function renderOrderItems(catId) {
  const orderGridEl = document.getElementById('orderGrid');
  const items = PRODUCTS.filter(it => it.cat === catId);
  const tintIndex = CATEGORIES.findIndex(c => c.id === catId) % 5;

  if (items.length === 0) {
    orderGridEl.innerHTML = '<div class="order-empty">该分类暂无项目</div>';
    return;
  }

  orderGridEl.innerHTML = items.map(it => `
    <div class="order-card" data-id="${it.id}">
      <div class="order-img cat-tint-${tintIndex}">
        ${coverMarkup(it, tintIndex)}
        ${it.tag ? `<span class="order-img-tag">${it.tag}</span>` : ''}
      </div>
      <div class="order-info">
        <div class="order-name">${it.name}</div>
        <div class="order-desc">${it.desc || ''}</div>
        <div class="order-price-row">
          <div class="order-price">${cardPriceMarkup(it)}</div>
          <div class="order-arrow">›</div>
        </div>
      </div>
    </div>
  `).join('');

  orderGridEl.querySelectorAll('.order-card').forEach(card => {
    card.addEventListener('click', () => {
      const item = PRODUCTS.find(x => x.id === card.dataset.id);
      if (item) openOrderDetail(item);
    });
  });
}

/* ---------------- 详情二级页面 ---------------- */

const orderDetailEl = document.getElementById('orderDetail');
let detailOpen = false;
let currentDetailItem = null;   // 当前打开的项目
let currentPlatformIndex = 0;   // 当前选中的 手游/端游 下标（如果有）

function detailImagesArray(item) {
  if (!item.detailImage) return [];
  return Array.isArray(item.detailImage) ? item.detailImage.filter(Boolean) : [item.detailImage];
}

// 渲染 手游/端游 切换按钮；没有 platforms 字段就隐藏整个区块
function renderPlatformToggle(item) {
  const wrap = document.getElementById('platformToggle');
  if (!item || !item.platforms || !item.platforms.length) {
    wrap.innerHTML = '';
    wrap.style.display = 'none';
    return;
  }
  wrap.style.display = 'flex';
  wrap.innerHTML = item.platforms.map((p, i) =>
    `<button class="platform-btn${i === 0 ? ' active' : ''}" data-index="${i}">${p.label}</button>`
  ).join('');
  wrap.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectPlatform(item, Number(btn.dataset.index));
    });
  });
}

// 切到某个平台（手游/端游），只更新价格区，不重新加载整个详情页
function selectPlatform(item, index) {
  currentPlatformIndex = index;
  const p = item.platforms[index];
  document.getElementById('detailPriceNum').textContent = p.price;
  document.getElementById('detailUnit').textContent = '/ ' + p.unit;
  document.getElementById('platformDesc').textContent = p.desc || '';
}

function populateOrderDetail(item) {
  const heroEl = document.getElementById('detailHero');
  const images = detailImagesArray(item);
  const heroImg = item.cover || images[0] || '';
  const fallbackIcon = (CATEGORY_META[item.cat] && CATEGORY_META[item.cat].icon) || '📦';
  const tintIndex = CATEGORIES.findIndex(c => c.id === item.cat) % 5;

  heroEl.className = 'order-detail-hero cat-tint-' + tintIndex;
  heroEl.innerHTML = heroImg
    ? `<img src="${heroImg}" alt="${item.name}" onerror="this.parentElement.innerHTML='<div class=\\'img-fallback\\'>${fallbackIcon}</div>'">`
    : `<div class="img-fallback">${fallbackIcon}</div>`;

  document.getElementById('detailHeaderTitle').textContent = item.name;
  const catName = (CATEGORY_META[item.cat] && CATEGORY_META[item.cat].name) || item.cat;
  document.getElementById('detailTag').textContent = catName;
  document.getElementById('detailTitle').textContent = item.name;

  currentDetailItem = item;
  currentPlatformIndex = 0;

  const priceEl = document.getElementById('detailPriceNum');
  const unitEl = document.getElementById('detailUnit');
  const currencyEl = document.querySelector('.order-detail-price .currency');
  const platformDescEl = document.getElementById('platformDesc');

  if (item.hidePrice) {
    currencyEl.style.display = 'none';
    priceEl.textContent = '敬请期待';
    priceEl.style.fontSize = '20px';
    unitEl.textContent = '';
    platformDescEl.textContent = '';
    renderPlatformToggle(null);
  } else if (item.platforms && item.platforms.length) {
    // 手游/端游价格不同：按钮切换，不用二级页面
    currencyEl.style.display = 'inline';
    priceEl.style.fontSize = '';
    renderPlatformToggle(item);
    selectPlatform(item, 0);
  } else {
    currencyEl.style.display = 'inline';
    priceEl.style.fontSize = '';
    priceEl.textContent = item.price;
    unitEl.textContent = '/ ' + item.unit;
    platformDescEl.textContent = '';
    renderPlatformToggle(null);
  }

  document.getElementById('detailDesc').textContent = item.detail || '';
  document.getElementById('detailNotice').textContent = item.notice || '';

  // 详情图（支持多张，图集展示；没有图不显示这个区块）
  const imagesSection = document.getElementById('detailImagesSection');
  const imagesWrap = document.getElementById('detailImages');
  if (images.length) {
    imagesWrap.innerHTML = images.map(src =>
      `<img src="${src}" alt="${item.name}详情图" loading="lazy" onerror="this.remove()">`
    ).join('');
    imagesSection.style.display = '';
  } else {
    imagesWrap.innerHTML = '';
    imagesSection.style.display = 'none';
  }

  const orderBtn = document.getElementById('detailOrderBtn');
  orderBtn.style.display = item.hidePrice ? 'none' : '';
}

function openOrderDetail(item) {
  populateOrderDetail(item);
  orderDetailEl.classList.add('active');
  document.body.style.overflow = 'hidden';
  detailOpen = true;
  history.pushState({ orderDetail: item.id }, '', '#order-' + item.id);
}

function closeOrderDetailUI() {
  orderDetailEl.classList.remove('active');
  document.body.style.overflow = '';
  detailOpen = false;
}

function detailGoTo(targetId) {
  if (detailOpen) history.back();
  setTimeout(() => {
    const target = document.getElementById(targetId);
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, detailOpen ? 320 : 0);
}

function bindOrderDetailEvents() {
  document.getElementById('detailBack').addEventListener('click', () => history.back());

  window.addEventListener('popstate', () => {
    if (detailOpen) closeOrderDetailUI();
  });

  document.getElementById('detailContactBtn').addEventListener('click', () => detailGoTo('contact'));
  document.getElementById('detailOrderBtn').addEventListener('click', () => {
    // 手游/端游各自跳转到自己的下单表单；
    // 项目/平台自己没单独配 formUrl 的话，就按平台走全站默认的手游/端游表单
    let targetUrl = ORDER_FORM_URL;
    if (currentDetailItem) {
      if (currentDetailItem.platforms && currentDetailItem.platforms.length) {
        const p = currentDetailItem.platforms[currentPlatformIndex];
        const platformDefault = p && p.key === 'pc' ? ORDER_FORM_URL_PC : ORDER_FORM_URL_MOBILE;
        targetUrl = (p && p.formUrl) || currentDetailItem.formUrl || platformDefault;
      } else {
        targetUrl = currentDetailItem.formUrl || ORDER_FORM_URL;
      }
    }
    if (detailOpen) history.back();
    setTimeout(() => { window.location.href = targetUrl; }, detailOpen ? 320 : 0);
  });

  // 支持直接通过链接打开某个项目详情，例如分享 #order-p1
  if (location.hash.startsWith('#order-')) {
    const sharedItem = PRODUCTS.find(x => x.id === location.hash.slice(7));
    if (sharedItem) {
      populateOrderDetail(sharedItem);
      orderDetailEl.classList.add('active');
      document.body.style.overflow = 'hidden';
      detailOpen = true;
    }
  }
}

/* ---------------- 其他交互 ---------------- */

function fillContactInfo() {
  const wechatEl = document.getElementById('contactWechatValue');
  const kookEl = document.getElementById('contactKookValue');
  if (wechatEl) wechatEl.textContent = CONTACT.officialAccount;
  if (kookEl) kookEl.textContent = CONTACT.kookId;
}

function setupReveal() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => el.classList.add('pre'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('pre');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }
  setTimeout(() => reveals.forEach(el => el.classList.remove('pre')), 1200);
}

function setupFloatCta() {
  const contactSection = document.getElementById('contact');
  const floatCta = document.getElementById('floatCta');
  if (!contactSection || !floatCta) return;
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      floatCta.style.opacity = e.isIntersecting ? '0' : '1';
      floatCta.style.pointerEvents = e.isIntersecting ? 'none' : 'auto';
    });
  }, { threshold: 0.3 });
  contactObserver.observe(contactSection);
}

function bindMiscEvents() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
