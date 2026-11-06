(function () {
  var BASE = window.MM_BASE || '';
  // Формы профилей: чертёж сечения вместо фото там, где фотографий пока нет
  var S = {
    armatura: '<circle cx="24" cy="24" r="12"/><path d="M24 6v4M24 38v4M6 24h4M38 24h4M11.3 11.3l2.8 2.8M33.900 33.900l2.800 2.800M11.300 36.700l2.800-2.800M33.900 14.100l2.800-2.800" class="ln"/>',
    'truba-profilnaya': '<path fill-rule="evenodd" d="M8 8h32v32H8zM13 13v22h22V13z"/>',
    'truba-kruglaya': '<path fill-rule="evenodd" d="M24 6a18 18 0 1 0 0 36 18 18 0 0 0 0-36zm0 5a13 13 0 1 1 0 26 13 13 0 0 1 0-26z"/>',
    shveller: '<path d="M12 7h26v6H18v22h20v6H12z"/>',
    'balka-dvutavrovaya': '<path d="M9 7h30v6H27v22h12v6H9v-6h12V13H9z"/>',
    'ugolok-stalnoj': '<path d="M11 7h6v25h24v6H11z"/>',
    'polosa-stalnaya': '<path d="M5 20h38v8H5z"/>',
    'kvadrat-stalnoj': '<path d="M11 11h26v26H11z"/>',
    'provoloka-vyazalnaya': '<path class="ln" d="M6 16c5-6 8-6 9 0s4 22 9 16 4-22 9-16 4 22 9 16"/>',
    profnastil: '<path class="ln" d="M4 31h7l4-13h7l4 13h7l4-13h7"/>',
    'listovoj-prokat': '<path d="M4 22h40v3H4z"/>',
    'setka-metallicheskaya': '<path class="ln" d="M7 7h34v34H7zM18 7v34M30 7v34M7 18h34M7 30h34"/>',
    'svai-vintovye': '<path d="M21 4h6v35l-3 5-3-5z"/><path class="ln" d="M13 24c7 5 15 5 22 0"/>',
    'otvody-stalnye': '<path class="ln ln--bold" d="M9 9c0 16 14 30 30 30"/>',
    'zaglushki-dlya-trub': '<path fill-rule="evenodd" d="M8 8h32v32H8zM22 18v12h4V18z"/>'
  };
  var CATS = [
    { id: 'armatura', name: 'Арматура', sub: 'Рифлёная А3, гладкая А1, композитная АСП', photo: 'img/images-1.jpg', alt: 'Связка рифлёной арматуры' },
    { id: 'truba-kruglaya', name: 'Труба круглая', sub: 'ВГП, оцинкованная ВГП, электросварная', photo: 'img/images.jpg', alt: 'Стопка круглых труб' },
    { id: 'shveller', name: 'Швеллер', sub: 'Стальной швеллер разных размеров', photo: 'img/images-2.jpg', alt: 'Стальной швеллер' },
    { id: 'profnastil', name: 'Профнастил', sub: 'Н75, С8, С20', photo: 'img/images-3.jpg', alt: 'Лист профнастила' },
    { id: 'listovoj-prokat', name: 'Листовой прокат', sub: 'Рифлёный, оцинкованный, горячекатаный, холоднокатаный', photo: 'img/images-4.jpg', alt: 'Стальные листы' },
    { id: 'zaglushki-dlya-trub', name: 'Заглушки для труб', sub: 'Квадратные и прямоугольные', photo: 'assets/img/cat/zaglushki-dlya-trub.jpg', alt: 'Чёрная пластиковая заглушка для трубы' },
    { id: 'truba-profilnaya', name: 'Труба профильная', sub: 'Квадратная и прямоугольная', photo: 'assets/img/cat/truba-profilnaya.jpg', alt: 'Стальные профильные трубы' },
    { id: 'balka-dvutavrovaya', name: 'Балка двутавровая', photo: 'assets/img/cat/balka-dvutavrovaya.jpg', alt: 'Двутавровая балка' },
    { id: 'ugolok-stalnoj', name: 'Уголок стальной', photo: 'assets/img/cat/ugolok-stalnoj.jpg', alt: 'Стальные уголки' },
    { id: 'polosa-stalnaya', name: 'Полоса стальная', photo: 'assets/img/cat/polosa-stalnaya.jpg', alt: 'Стальные полосы' },
    { id: 'kvadrat-stalnoj', name: 'Квадрат стальной', photo: 'assets/img/cat/kvadrat-stalnoj.jpg', alt: 'Стальной квадрат' },
    { id: 'provoloka-vyazalnaya', name: 'Проволока вязальная', photo: 'assets/img/cat/provoloka-vyazalnaya.jpg', alt: 'Моток проволоки' },
    { id: 'setka-metallicheskaya', name: 'Сетка металлическая', sub: 'Сварная в картах и рулонах, рабица', photo: 'assets/img/cat/setka-metallicheskaya.jpg', alt: 'Сварная сетка из арматуры' },
    { id: 'svai-vintovye', name: 'Сваи винтовые' },
    { id: 'otvody-stalnye', name: 'Отводы стальные', sub: 'Оцинкованные и неоцинкованные' }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' р.'; };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var icon = function (id) { return '<svg class="prof" viewBox="0 0 48 48" aria-hidden="true">' + S[id] + '</svg>'; };
  // Похожие русские и латинские буквы считаем одной: «с20» и «c20», «а500» и «a500»
  var LOOKALIKE = { 'а': 'a', 'в': 'b', 'е': 'e', 'к': 'k', 'м': 'm', 'н': 'h', 'о': 'o', 'р': 'p', 'с': 'c', 'т': 't', 'у': 'y', 'х': 'x' };
  var norm = function (s) {
    return s.toLowerCase().replace(/ё/g, 'е').replace(/[а-я]/g, function (c) { return LOOKALIKE[c] || c; })
      .replace(/[×*]/g, 'x').replace(/,/g, '.')
      .replace(/(\d)\s*(?:x|ha)\s*(?=\d)/g, '$1x')        // «40 х 20», «40 на 20» → 40x20
      .replace(/([^\d\s.x-])-(?=\d)/g, '$1')              // «н-75» → н75
      .replace(/(\d)([^\d\s.,x)-])/g, '$1 $2')            // «12мм», «12б1» → 12 мм, 12 б1
      .replace(/\s+/g, ' ').trim();
  };
  // Другие названия того же товара и слова с беглой гласной
  var SYNONYMS = [
    [/^(уголк|угольник)/, 'уголок'], [/^профлист/, 'профнастил'], [/^оцинк/, 'оцинк'], [/^рифл/, 'рифлен'],
    [/^сва[яиюйе]/, 'винтов'], [/^двутавр/, 'двутавр'], [/^композит/, 'композит']
  ];
  var STOP = { 'на': 1, 'мм': 1, 'м': 1, 'х': 1, 'x': 1, 'и': 1, 'для': 1, 'размер': 1, 'размером': 1 };
  var escRe = function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
  function tokenRe(word) {
    var isSize = /^\d/.test(word);
    // Размер ищем целиком: «12» не находит 112 и 120, «5» не находит 0,5
    if (isSize) return new RegExp('(?:^|[^\\d.])' + escRe(word) + '(?!\\d)');
    return new RegExp('(?:^|[^a-zа-я0-9])' + escRe(word));
  }
  function queryTokens(q) {
    // Склонения убираем до замены букв: «трубы» → «труб», «арматуру» → «арматур»
    var words = q.toLowerCase().replace(/ё/g, 'е').replace(/[×*]/g, 'x').split(/[\s]+/).filter(Boolean);
    // «Заглушка для труб» не должна попадать в выдачу по слову «труба», и наоборот
    if (words.some(function (w) { return /^заглушк/.test(w); })) words = words.filter(function (w) { return !/^труб/.test(w); });
    var joined = words.map(function (w) {
      if (/\d/.test(w)) return w;
      for (var i = 0; i < SYNONYMS.length; i++) if (SYNONYMS[i][0].test(w)) return SYNONYMS[i][1];
      return w.length > 3 ? w.replace(/[аеиоуыэюяйь]+$/, '') : w;
    }).join(' ');
    return norm(joined.replace(/(\d)\s*(?:х|x|на)\s*(?=\d)/g, '$1x')).split(' ').filter(function (w) {
      return w && !STOP[w] && !STOP[w.replace(/[a-z]/g, function (c) { for (var k in LOOKALIKE) if (LOOKALIKE[k] === c) return k; return c; })];
    }).map(tokenRe);
  }

  // На сайте есть подразделы «квадратная» и «прямоугольная», а в названиях этих слов нет
  function shapeWord(name, cat) {
    if (cat !== 'truba-profilnaya' && cat !== 'zaglushki-dlya-trub') return '';
    var m = name.match(/(\d+)x(\d+)/);
    return m ? (m[1] === m[2] ? ' квадратная' : ' прямоугольная') : '';
  }

  var ITEMS = [];
  CATS.forEach(function (c) {
    var list = window.PRICES[c.id] || [];
    list.forEach(function (r) {
      ITEMS.push({ key: r[3], cat: c.id, name: r[0], price: r[1], old: r[2] || null, url: BASE + r[3] + '/', unit: r[4] || '', s: norm(r[0].replace('для труб', '') + ' ' + c.name.replace('для труб', '') + shapeWord(r[0], c.id)) });
    });
    c.count = list.length;
    c.min = Math.min.apply(null, list.map(function (r) { return r[1]; }));
  });
  var BY_KEY = {};
  ITEMS.forEach(function (i) { BY_KEY[i.key] = i; });
  // В поиске «труба» находит и круглую, и профильную; название раздела учитывается
  var match = function (q) {
    var t = queryTokens(q);
    return ITEMS.filter(function (i) { return t.every(function (re) { return re.test(i.s); }); });
  };

  var catById = {};
  CATS.forEach(function (c) { catById[c.id] = c; });
  var dealPic = function (c) { return c.photo ? BASE + 'assets/img/deal/' + c.id + '.jpg' : catPic(c); };
  var catPic = function (c) { return BASE + (c.photo || 'assets/img/cat/' + c.id + '.svg'); };
  var unitOf = function (i) { return i.unit ? '<small>' + i.unit + '</small>' : ''; };

  /* Товары со скидкой: лучшая скидка в каждом разделе, сначала разделы с фото */
  var offOf = function (i) { return i.old ? Math.round((i.old - i.price) / i.old * 100) : 0; };
  if ($('maxOff')) $('maxOff').textContent = ITEMS.reduce(function (m, i) { return Math.max(m, offOf(i)); }, 0);
  var DEALS = CATS.map(function (c) {
    return ITEMS.filter(function (i) { return i.cat === c.id && i.old; }).sort(function (a, b) { return offOf(b) - offOf(a); })[0];
  }).filter(Boolean);
  function renderDeals() {
    if (!$('deals')) return;
    $('deals').innerHTML = DEALS.map(function (i) {
      var c = catById[i.cat];
      return '<article class="deal"><a class="deal__img" href="' + i.url + '"><img src="' + dealPic(c) + '" alt="' + esc(c.alt || c.name) + '" loading="lazy"><em>−' + offOf(i) + '%</em></a>' +
        '<p class="deal__price"><b>' + fmt(i.price) + '</b><s>' + fmt(i.old) + '</s></p>' + (i.unit ? '<p class="deal__unit">' + i.unit + '</p>' : '') + '<h3><a href="' + i.url + '">' + esc(i.name) + '</a></h3>' +
        '<div class="deal__act">' + actionHtml(i.key, cart[i.key] || 0) + '</div></article>';
    }).join('');
  }

  /* Прайс */
  var state = { cat: 'all', q: '', sale: false, shown: 12 };
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem('mm-cart')) || {}; } catch (e) { cart = {}; }

  if ($('priceCats')) $('priceCats').innerHTML = '<button type="button" class="pcat" data-pcat="all"><span class="pcat__all">Все разделы</span><small>' + ITEMS.length + '</small></button>' +
    CATS.map(function (c) {
      return '<button type="button" class="pcat" data-pcat="' + c.id + '">' + icon(c.id) + '<span>' + c.name + '</span><small>' + c.count + '</small></button>';
    }).join('');

  function renderPrices() {
    if (!$('priceList')) return;
    var list = state.q ? match(state.q) : ITEMS;
    list = list.filter(function (i) { return (state.cat === 'all' || i.cat === state.cat) && (!state.sale || i.old); });
    var box = $('priceList');
    if (!list.length) {
      box.innerHTML = '<li class="plist__empty"><b>Такой позиции в прайсе нет.</b> Проверьте размер или позвоните: <a href="tel:+79164037316">+7 (916) 403-73-16</a>. Менеджер подскажет, что есть в наличии.</li>';
    } else {
      box.innerHTML = list.slice(0, state.shown).map(function (i) {
        var off = i.old ? Math.round((i.old - i.price) / i.old * 100) : 0;
        var qty = cart[i.key] || 0;
        return '<li class="prow"><img class="prow__pic" src="' + catPic(catById[i.cat]) + '" alt="" loading="lazy"><a class="prow__name" href="' + i.url + '">' + esc(i.name) + '</a>' +
          '<span class="prow__price"><b>' + fmt(i.price) + '</b>' + unitOf(i) + (i.old ? '<s>' + fmt(i.old) + '</s><em>−' + off + '%</em>' : '') + '</span>' +
          '<span class="prow__act">' + actionHtml(i.key, qty) + '</span></li>';
      }).join('');
    }
    var more = list.length - state.shown;
    $('priceMore').hidden = more <= 0;
    $('priceMore').textContent = 'Показать ещё ' + Math.min(more, 20) + ' из ' + Math.max(more, 0);
    $('priceCount').textContent = 'Найдено: ' + list.length;
    document.querySelectorAll('[data-pcat]').forEach(function (b) {
      var on = b.getAttribute('data-pcat') === state.cat;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on);
    });
  }
  function actionHtml(key, qty) {
    return qty
      ? '<span class="stepper"><button type="button" data-dec="' + key + '" aria-label="Уменьшить">−</button><output>' + qty + '</output><button type="button" data-inc="' + key + '" aria-label="Увеличить">+</button></span>'
      : '<button class="btn btn--small" type="button" data-inc="' + key + '">В расчёт</button>';
  }
  function goPrices(cat, q, sale) {
    if (!$('prices')) {
      location.href = BASE + 'index.html?q=' + encodeURIComponent(q || '') + (sale ? '&sale=1' : '') + '#prices';
      return;
    }
    state.cat = cat || 'all';
    state.q = q || '';
    state.sale = !!sale;
    state.shown = 12;
    $('priceSearch').value = state.q;
    $('onlySale').checked = state.sale;
    renderPrices();
    closeMega();
    closeResults();
    $('prices').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  /* Заявка */
  function saveCart() {
    try { localStorage.setItem('mm-cart', JSON.stringify(cart)); } catch (e) {}
    var keys = Object.keys(cart).filter(function (k) { return BY_KEY[k]; });
    var positions = keys.length;
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = positions;
      el.classList.toggle('is-full', positions > 0);
    });
    var total = keys.reduce(function (s, k) { return s + BY_KEY[k].price * cart[k]; }, 0);
    $('cartForm').hidden = !positions;
    $('cartBody').innerHTML = positions
      ? '<ul class="clist">' + keys.map(function (k) {
          var i = BY_KEY[k];
          return '<li><a class="clist__name" href="' + i.url + '">' + esc(i.name) + '</a><span class="clist__row">' + actionHtml(k, cart[k]) + '<b>' + fmt(i.price * cart[k]) + '</b></span></li>';
        }).join('') + '</ul><p class="ctotal"><span>Предварительно, без доставки</span><b>' + fmt(total) + '</b></p>'
      : '<p class="cempty">Пока пусто. Добавьте позиции из прайса, и они появятся здесь.</p><a class="btn btn--line" href="' + BASE + 'index.html#prices" data-close>Перейти к ценам</a>';
  }
  function change(key, d) {
    cart[key] = (cart[key] || 0) + d;
    if (cart[key] <= 0) delete cart[key];
    saveCart();
    renderPrices();
    renderDeals();
    renderActs();
    renderResults();
  }
  // Кнопки «В заявку» в готовых строках на страницах разделов и товаров
  function renderActs() {
    document.querySelectorAll('[data-act]').forEach(function (el) {
      var k = el.getAttribute('data-act');
      el.innerHTML = actionHtml(k, cart[k] || 0);
    });
  }

  /* Поиск на первом экране */
  var heroInput = $('heroSearch');
  var lastQuery = '';
  function closeResults() { $('searchResults').hidden = true; }
  function renderResults() {
    var q = heroInput.value, box = $('searchResults');
    if (!norm(q)) { closeResults(); return; }
    var r = match(q);
    var list = box.querySelector('.search__list');
    var top = list ? list.scrollTop : 0; // при нажатии «В заявку» список не должен прыгать наверх
    box.hidden = false;
    box.innerHTML = r.length
      ? '<div class="search__list" tabindex="0">' + r.map(function (i) {
          return '<div class="sres">' + icon(i.cat) + '<a href="' + i.url + '">' + esc(i.name) + '</a><b>' + fmt(i.price) + '</b>' + actionHtml(i.key, cart[i.key] || 0) + '</div>';
        }).join('') + '</div><button class="sres__all" type="button" data-all>Открыть в прайсе: ' + r.length + '</button>'
      : '<p class="sres__none">Ничего не нашли. Попробуйте только название или только размер.</p>';
    list = box.querySelector('.search__list');
    if (list) {
      // Список вместе с кнопкой под ним должен помещаться в окно
      var bar = document.querySelector('.mobilebar').offsetHeight;
      var room = innerHeight - list.getBoundingClientRect().top - bar - 64;
      if (room < 220) {
        scrollBy({ top: 220 - room, behavior: 'auto' });
        room = 220;
      }
      list.style.maxHeight = Math.min(room, 380) + 'px';
      if (q === lastQuery) list.scrollTop = top;
    }
    lastQuery = q;
  }
  heroInput.addEventListener('input', renderResults);
  heroInput.addEventListener('focus', renderResults);
  heroInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); goPrices('all', heroInput.value); }
    if (e.key === 'Escape') closeResults();
  });

  /* Меню каталога */
  var mega = $('mega'), megaBtns = document.querySelectorAll('[data-mega]');
  function setMega(open) {
    mega.hidden = !open;
    megaBtns.forEach(function (b) { b.setAttribute('aria-expanded', open); });
  }
  function closeMega() { setMega(false); }
  megaBtns.forEach(function (b) {
    b.addEventListener('click', function (e) { e.stopPropagation(); setMega(mega.hidden); });
  });

  /* Фильтр в списке на странице раздела */
  if ($('catFilter')) {
    var filterRows = function () {
      var q = $('catFilter').value, sale = $('catSale') && $('catSale').checked, hits = {};
      if (norm(q)) match(q).forEach(function (i) { hits[i.key] = 1; });
      var n = 0;
      document.querySelectorAll('.plist--static .prow').forEach(function (r) {
        var key = r.getAttribute('data-key'), i = BY_KEY[key];
        var on = (!norm(q) || hits[key]) && (!sale || (i && i.old));
        r.hidden = !on;
        if (on) n++;
      });
      $('catCount').textContent = 'Найдено: ' + n;
      $('catEmpty').hidden = n > 0;
    };
    $('catFilter').addEventListener('input', filterRows);
    if ($('catSale')) $('catSale').addEventListener('change', filterRows);
  }

  /* Лента товаров: листается свайпом и стрелками */
  function slide(id, dir) {
    var track = $(id), max = track.scrollWidth - track.clientWidth;
    var left = track.scrollLeft + dir * track.clientWidth;
    if (left > max + 4) left = 0;
    if (left < -4 && track.scrollLeft < 4) left = max;
    track.scrollTo({ left: left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  /* Фильтры прайса */
  if ($('priceList')) {
    $('priceSearch').addEventListener('input', function () { state.q = this.value; state.shown = 12; renderPrices(); });
    $('onlySale').addEventListener('change', function () { state.sale = this.checked; state.shown = 12; renderPrices(); });
    $('priceMore').addEventListener('click', function () { state.shown += 20; renderPrices(); });
    // Переход с других страниц: поиск и скидки передаются в адресе
    var params = new URLSearchParams(location.search);
    state.q = params.get('q') || '';
    state.sale = params.get('sale') === '1';
    $('priceSearch').value = state.q;
    $('onlySale').checked = state.sale;
  }

  /* Калькулятор доставки: тарифы со страницы mosmetalloprokat.ru/dostavka */
  var WEIGHTS = ['до 1,5 т', 'до 3 т', 'до 5 т', 'до 6 т', 'до 10 т'];
  var ZONES = [
    { name: 'Север Москвы', color: '#d9c02f', r: [5500, 6500, 7500, 9000, 15000] },
    { name: 'В пределах 3-го кольца', color: '#2f9fdc', r: [5000, 6000, 7000, 8000, 14000] },
    { name: 'В пределах Садового кольца', color: '#e8509f', r: [5500, 6500, 7500, 8500, 15000] },
    { name: 'Юг Москвы', color: '#3fa34b', r: [4500, 5500, 6500, 7500, 13000] },
    { name: 'За МКАД', color: '#8d9196', r: [60, 70, 80, 90, 100], perKm: true }
  ];
  var RUB = [500, 800, 1000, 1200, 1500];
  var UNLOAD = ['40 минут', '1 час', '1 час', '1 час', '1,5 часа'];
  var IDLE = [800, 900, 1000, 1200, 1500];
  var calc = { z: 1, w: 0 };
  var row = function (title, cells) { return '<tr><th scope="row">' + title + '</th>' + cells + '</tr>'; };
  var plain = function (list, f) { return list.map(function (v) { return '<td>' + f(v) + '</td>'; }).join(''); };
  if ($('calc')) {
  $('calcZone').innerHTML = ZONES.map(function (z, n) { return '<button type="button" data-zone="' + n + '"><i style="background:' + z.color + '"></i>' + z.name + '</button>'; }).join('');
  $('calcWeight').innerHTML = WEIGHTS.map(function (w, n) { return '<button type="button" data-weight="' + n + '">' + w + '</button>'; }).join('');
  $('tariffs').innerHTML = '<thead><tr><th scope="col">Вес груза</th>' + WEIGHTS.map(function (w) { return '<th scope="col">' + w + '</th>'; }).join('') + '</tr></thead><tbody>' +
    ZONES.map(function (z, n) {
      return row('<i style="background:' + z.color + '"></i>' + z.name, z.r.map(function (v, w) {
        return '<td data-z="' + n + '" data-w="' + w + '"><button class="tcell" type="button" data-cell="' + n + ':' + w + '">' + (z.perKm ? v + '\u00a0р/км' : fmt(v)) + '</button></td>';
      }).join(''));
    }).join('') +
    row('Доплата: Рублёво-Успенское, Рублёвское, Подушкинское шоссе', RUB.map(function (v, w) { return '<td data-rub="' + w + '"><button class="tcell" type="button" data-rubcell="' + w + '">+' + fmt(v) + '</button></td>'; }).join('')) +
    row('Доплата за вечер, с 19:00 до 24:00', '<td colspan="5" data-eve><button class="tcell tcell--wide" type="button" data-evecell>+' + fmt(3000) + ' на любой груз</button></td>') +
    row('Норма разгрузки', plain(UNLOAD, String)) +
    row('Час простоя', plain(IDLE, fmt)) + '</tbody>';
  ['calcKm', 'calcRub', 'calcEve'].forEach(function (id) { $(id).addEventListener('input', renderCalc); });
  }
  function tellSum() {
    toast(ZONES[calc.z].name + ', ' + WEIGHTS[calc.w] + ': предварительно ' + $('calcOut').querySelector('b').textContent);
  }
  function renderCalc() {
    if (!$('calc')) return;
    var z = ZONES[calc.z], rate = z.r[calc.w], base = rate, note = '';
    $('calcKmWrap').hidden = !z.perKm;
    if (z.perKm) {
      var km = Math.max(0, parseInt($('calcKm').value, 10) || 0);
      base = rate * km;
      note = fmt(rate) + ' за км × ' + km + ' км';
    }
    var sum = base + ($('calcRub').checked ? RUB[calc.w] : 0) + ($('calcEve').checked ? 3000 : 0);
    $('calcOut').innerHTML = '<span class="calc__label">Предварительно' + (note ? ', ' + note : '') + '</span><b>' + fmt(sum) + '</b>' +
      '<span class="calc__note">Норма разгрузки: ' + UNLOAD[calc.w] + '. Час простоя сверх нормы: ' + fmt(IDLE[calc.w]) + '</span>';
    document.querySelectorAll('[data-zone]').forEach(function (b) {
      var on = +b.getAttribute('data-zone') === calc.z;
      b.classList.toggle('is-on', on);
      if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', on);
    });
    document.querySelectorAll('#tariffs td[data-z]').forEach(function (td) {
      td.classList.toggle('is-on', +td.getAttribute('data-z') === calc.z && +td.getAttribute('data-w') === calc.w);
    });
    document.querySelectorAll('#tariffs td[data-rub]').forEach(function (td) {
      td.classList.toggle('is-on', $('calcRub').checked && +td.getAttribute('data-rub') === calc.w);
    });
    document.querySelectorAll('#tariffs td[data-eve]').forEach(function (td) { td.classList.toggle('is-on', $('calcEve').checked); });
    document.querySelectorAll('[data-weight]').forEach(function (b, n) { b.classList.toggle('is-on', n === calc.w); b.setAttribute('aria-pressed', n === calc.w); });
  }

  /* Окна */
  var toastTimer;
  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 5000);
  }
  /* Отправка заявок. Адрес приёма задаётся в assets/config.js; пока его нет, заявка уходит письмом через почту посетителя */
  var LABELS = { consent: 'Согласие на обработку данных', marketing: 'Согласие на звонки и SMS', name: 'Имя', phone: 'Телефон', comment: 'Комментарий', question: 'Вопрос' };
  function cartLines() {
    return Object.keys(cart).filter(function (k) { return BY_KEY[k]; }).map(function (k) {
      var i = BY_KEY[k];
      return i.name + ': ' + cart[k] + ' × ' + fmt(i.price) + (i.unit ? ' ' + i.unit : '');
    });
  }
  window.MM_openMail = window.MM_openMail || function (url) { location.href = url; };
  function sendLead(f) {
    var kind = f.getAttribute('data-lead') || 'Расчёт стоимости', lines = [], data = { kind: kind, page: location.href };
    new FormData(f).forEach(function (v, k) {
      if (!String(v).trim()) return;
      data[k] = String(v).trim();
      lines.push((LABELS[k] || k) + ': ' + data[k]);
    });
    if (f.id === 'cartForm') {
      data.items = cartLines();
      lines.push('', 'Позиции:');
      lines = lines.concat(data.items);
    }
    if (window.MM_LEAD_URL) {
      fetch(window.MM_LEAD_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); })
        .then(function () {
          toast('Отправлено. Менеджер свяжется с вами.');
          f.reset();
          if (f.id === 'cartForm') { cart = {}; saveCart(); renderPrices(); renderDeals(); renderActs(); }
        })
        .catch(function () { toast('Не отправилось. Позвоните нам: +7 (916) 403-73-16'); });
    } else {
      window.MM_openMail('mailto:info@mosmetalloprokat.ru?subject=' + encodeURIComponent(kind + ' с сайта') + '&body=' + encodeURIComponent(lines.join('\n')));
      toast('Открываем почту. Отправьте письмо, и менеджер свяжется с вами.');
    }
  }
  document.querySelectorAll('form[data-lead]').forEach(function (f) {
    var phone = f.querySelector('[name=phone]');
    if (phone) phone.addEventListener('input', function () {
      this.setCustomValidity(this.value.replace(/\D/g, '').length < 10 ? 'Укажите телефон полностью, например +7 916 403-73-16' : '');
    });
    var consent = f.querySelector('[name=consent]');
    if (consent) {
      consent.addEventListener('invalid', function () { this.setCustomValidity('Без этого согласия мы не сможем сделать расчёт'); });
      consent.addEventListener('change', function () { this.setCustomValidity(''); });
    }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (phone && phone.value.replace(/\D/g, '').length < 10) { phone.setCustomValidity('Укажите телефон полностью, например +7 916 403-73-16'); phone.reportValidity(); return; }
      sendLead(f);
      var d = f.closest('dialog');
      if (d) d.close();
    });
  });
  document.querySelectorAll('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  });

  /* Единый обработчик кнопок */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button, a, .zmap__z');
    if (!e.target.closest('.search')) closeResults();
    if (!e.target.closest('#mega') || e.target.closest('#mega a')) closeMega();
    if (!t) return;
    var a;
    if ((a = t.getAttribute('data-inc')) !== null) { var isNew = !cart[a]; change(a, 1); if (isNew) toast('Добавлено в расчёт: ' + BY_KEY[a].name); }
    else if ((a = t.getAttribute('data-dec')) !== null) change(a, -1);
    else if ((a = t.getAttribute('data-cat'))) goPrices(a);
    else if ((a = t.getAttribute('data-pcat'))) { state.cat = a; state.shown = 12; renderPrices(); }
    else if ((a = t.getAttribute('data-carousel'))) slide(a, +t.getAttribute('data-dir'));
    else if (t.hasAttribute('data-sale')) goPrices('all', '', true);
    else if (t.hasAttribute('data-all')) goPrices('all', heroInput.value);
    else if ((a = t.getAttribute('data-zone'))) { calc.z = +a; renderCalc(); }
    else if ((a = t.getAttribute('data-weight'))) { calc.w = +a; renderCalc(); }
    else if ((a = t.getAttribute('data-cell'))) { a = a.split(':'); calc.z = +a[0]; calc.w = +a[1]; renderCalc(); tellSum(); }
    else if ((a = t.getAttribute('data-rubcell')) !== null) { var sameRub = $('calcRub').checked && calc.w === +a; calc.w = +a; $('calcRub').checked = !sameRub; renderCalc(); tellSum(); }
    else if (t.hasAttribute('data-evecell')) { $('calcEve').checked = !$('calcEve').checked; renderCalc(); tellSum(); }
    else if ((a = t.getAttribute('data-open'))) $(a).showModal();
    else if (t.hasAttribute('data-open-cart')) { saveCart(); $('cart').showModal(); }
    if (t.hasAttribute('data-close')) { var d = t.closest('dialog'); if (d) d.close(); }
  });

  /* Шапка лежит на фото: фото заходит под неё на её высоту, а ниже первого экрана она плотнее */
  var headerEl = document.querySelector('.header');
  function fitHead() {
    document.documentElement.style.setProperty('--head', headerEl.offsetHeight + 'px');
  }
  function stickHead() {
    var hero = document.querySelector('.top');
    headerEl.classList.toggle('is-stuck', !hero || hero.getBoundingClientRect().bottom < headerEl.offsetHeight + 40);
  }
  addEventListener('resize', function () { fitHead(); stickHead(); });
  addEventListener('scroll', stickHead, { passive: true });
  fitHead();
  stickHead();

  /* Балка покачивается на тросе и слегка отзывается на прокрутку */
  var beam = document.querySelector('.top__beam');
  if (beam && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var swing = 1.2, swingV = 0, last = 0, lastY = scrollY, onScreen = true, running = false;
    var tick = function (now) {
      if (!onScreen) { running = false; return; }
      var dt = Math.min((now - last) / 1000 || 0, .05);
      last = now;
      swingV += (-3.2 * swing - .9 * swingV) * dt;
      swing += swingV * dt;
      beam.style.transform = 'rotate(' + (Math.sin(now / 1000 * 2 * Math.PI / 6) * .8 + swing).toFixed(3) + 'deg)';
      requestAnimationFrame(tick);
    };
    var start = function () { if (!running) { running = true; requestAnimationFrame(tick); } };
    addEventListener('scroll', function () {
      swingV += Math.max(-.5, Math.min(.5, (scrollY - lastY) * .006));
      lastY = scrollY;
    }, { passive: true });
    new IntersectionObserver(function (e) {
      onScreen = e[0].isIntersecting;
      if (onScreen) start();
    }).observe(document.querySelector('.top'));
    start();
  }

  saveCart();
  renderPrices();
  renderDeals();
  renderActs();
  renderCalc();
})();

// Сайт открыт двойным щелчком из папки: браузер не подставляет index.html сам
(function () {
  if (location.protocol !== 'file:') return;
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.protocol !== 'file:') return;
    if (/\/$/.test(a.pathname)) {
      e.preventDefault();
      location.href = a.pathname + 'index.html' + a.search + a.hash;
    }
  });
})();

// Поиск: на главной стоит рядом с балкой, а когда первый экран уехал, возвращается в шапку
(function () {
  var head = document.querySelector('.header'), search = head && head.querySelector('.search');
  if (!search) return;
  var input = search.querySelector('input'), btn = head.querySelector('.searchbtn'), slot = document.getElementById('topSearch');
  var row = head.querySelector('.header__in'), before = search.nextElementSibling;
  if (btn) btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = head.classList.toggle('is-search');
    btn.setAttribute('aria-expanded', open);
    if (open) input.focus();
  });
  input.addEventListener('input', function () {
    var box = search.querySelector('.search__results');
    if (!box.hidden && box.getBoundingClientRect().bottom > innerHeight) box.scrollIntoView({ block: 'nearest' });
  });
  if (!slot) return;
  function place(inHero) {
    var had = document.activeElement === input;
    if (inHero) { slot.appendChild(search); head.classList.remove('is-search'); }
    else row.insertBefore(search, before);
    head.classList.toggle('has-hero-search', inHero);
    if (had) input.focus();
  }
  place(true);
  new IntersectionObserver(function (es) { place(es[0].isIntersecting); }, { rootMargin: '-' + head.offsetHeight + 'px 0px 0px 0px' }).observe(slot);
})();
