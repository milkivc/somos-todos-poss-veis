const baseUrl = process.env.ATLAS_URL || 'https://script.google.com/macros/s/AKfycbw0X-g5f6dpkBcVl0BcqC0AOZIBA_Q1y7iOHOXKtGds_UmVCD6SV8dbCMP0zm8Ecc6Oaw/exec';
const cleanBase = baseUrl.split('?')[0];

const requiredAssets = [
  'seal', 'fuco', 'festival', 'galeria', 'reizinho', 'escuta', 'nuno', 'cow_base', 'cow_brilho', 'cow_destaque'
];

const expectedAssetFragments = {
  seal: '1evCywhX7YuZOkkAaUGIgUD0oDgplx2OR',
  fuco: '19Z9aBzL5XBw9ccF4yycYHQcO-NMvOGdt',
  festival: '1JCtY-PpP9TWrNDU7yCxCGoJsZWlSrcvp',
  galeria: '1My_R4s7pTQzBO3lRtJUvdcxWslX9nUTq',
  reizinho: '1OnoVEJ2d5Dk9KfuVKukMVyGQZug_ZaC-',
  escuta: '1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM',
  nuno: '1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM',
  cow_base: '1HlVxB0qqy2Wee1HodoNxNNcocRE0XaVP',
  cow_brilho: '1Fwd7qlGbv0FpSRSv6sjsMCZuobkKsloM',
  cow_destaque: '1gx4M4uq-anojZQfK3rGkm-bY4FIe76lK'
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function getJson(route) {
  const url = `${cleanBase}?r=${route}&v=${Date.now()}`;
  const res = await fetch(url, { redirect: 'follow' });
  assert(res.ok, `${route}: HTTP ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`${route}: resposta não é JSON válido. Início: ${text.slice(0, 240)}`);
  }
}

async function getText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  assert(res.ok, `HTML: HTTP ${res.status}`);
  return await res.text();
}

const assetsPayload = await getJson('assets');
assert(assetsPayload.ok === true, 'assets: ok não é true');
assert(assetsPayload.audit?.ok === true || assetsPayload.assets_audit?.ok === true, 'assets: auditoria não está OK');
for (const key of requiredAssets) {
  const url = assetsPayload.assets?.[key];
  assert(url, `assets: falta ${key}`);
  assert(url.includes(expectedAssetFragments[key]), `assets: ${key} não usa ID oficial: ${url}`);
}
console.log('OK assets oficiais');

const health = await getJson('health');
assert(health.ok === true, 'health: ok não é true');
assert(health.assets_ok === true, 'health: assets_ok não é true');
assert(Number(health.points_count) > 0, `health: points_count inválido ${health.points_count}`);
assert(Number(health.territory_count) > 0, `health: territory_count inválido ${health.territory_count}`);
console.log(`OK health: points=${health.points_count} territory=${health.territory_count}`);

const bootstrap = await getJson('bootstrap');
assert(bootstrap.ok === true, 'bootstrap: ok não é true');
assert(bootstrap.privacy_email, 'bootstrap: falta privacy_email');
assert(bootstrap.assets_audit?.ok === true || bootstrap.audit?.ok === true || assetsPayload.audit?.ok === true, 'bootstrap: assets_audit não OK');
const territory = bootstrap.territory || bootstrap.territorios || bootstrap['território'] || [];
const points = bootstrap.points || bootstrap.map_points || bootstrap.pontos || bootstrap.festas || [];
assert(Array.isArray(territory) && territory.length > 0, 'bootstrap: não há territory/territorios/território');
assert(Array.isArray(points) && points.length > 0, 'bootstrap: não há points/map_points/pontos/festas');
console.log(`OK bootstrap: territory=${territory.length} points=${points.length}`);

const html = await getText(`${cleanBase}?v=${Date.now()}`);
assert(html.includes('cowMarker'), 'HTML publicado não contém cowMarker; provável versão antiga no Apps Script');
assert(html.includes("data['território']") || html.includes('data[\'território\']') || html.includes('território'), 'HTML publicado não contém alias território');
assert(html.includes('deviceFallback'), 'HTML publicado não contém programas fallback dos dispositivos');
assert(!html.includes('Master consolidado'), 'HTML publicado ainda contém Master consolidado');
console.log('OK HTML publicado contém correções essenciais');

console.log('ATLAS_ENDPOINT_SMOKE_TEST_OK');
