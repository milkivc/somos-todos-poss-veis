/**
 * Atlas Vivo MILK — patch público final de runtime sem alterar Interface.html.
 * Correção cirúrgica: pára de tentar maquilhar PNGs com fundo branco.
 * Se o asset oficial contém branco incorporado, o runtime oculta a imagem com caixa
 * e renderiza um ícone transparente equivalente no botão, preservando função pública.
 */

var doGet_BASE_INTERFACE_RUNTIME_FIX_ = doGet;

doGet = function(e) {
  try { ensureOfficialDensityImported_(); } catch (densityErr) {}
  var r = String((e && e.parameter && e.parameter.r) || '').toLowerCase();
  var out = doGet_BASE_INTERFACE_RUNTIME_FIX_(e);
  if (r) return out;
  try {
    if (!out || typeof out.getContent !== 'function' || typeof out.setContent !== 'function') return out;
    var html = out.getContent();
    html = html.replace(/<style id="ATLAS_RUNTIME_VISUAL_FIX_2026_05_10">[\s\S]*?<\/script>\s*/g, '');
    html = html.replace(/<style id="ATLAS_RUNTIME_VISUAL_FIX_FINAL_2026_05_11">[\s\S]*?<\/script>\s*/g, '');
    html = html.replace('</body>', buildAtlasRuntimeVisualPatch_() + '\n</body>');
    out.setContent(html);
  } catch (err) {}
  return out;
};

function buildAtlasRuntimeVisualPatch_() {
  return '\n<style id="ATLAS_RUNTIME_VISUAL_FIX_FINAL_2026_05_11">\n' +
    '.leaflet-marker-icon[src*=marker-icon],.leaflet-marker-shadow{display:none!important;opacity:0!important;pointer-events:none!important}\n' +
    '.leaflet-marker-icon,.leaflet-marker-icon img,.device,.device img{background:transparent!important;border:0!important}\n' +
    '.device{background:transparent!important;box-shadow:none!important;border:0!important;backdrop-filter:none!important;overflow:visible!important}\n' +
    '.device img,.asset-cleaned{background:transparent!important;box-shadow:none!important;border:0!important}\n' +
    '#fucoImg,#galeriaImg{display:none!important;visibility:hidden!important;opacity:0!important}\n' +
    '#dogDevice::before{content:"🐕";font-size:58px;line-height:1;display:block;filter:drop-shadow(0 0 10px rgba(255,255,255,.22)) drop-shadow(0 0 18px rgba(118,210,255,.18));animation:devicePulse 4.6s ease-in-out infinite}\n' +
    '#galleryDevice::before{content:"DILETANTE\\A GALERIA";white-space:pre;display:flex;align-items:center;justify-content:center;width:74px;height:74px;border-radius:17px;background:linear-gradient(135deg,rgba(255,67,164,.92),rgba(255,226,75,.92),rgba(78,160,255,.92));color:#071018;font-weight:900;font-size:12px;line-height:1.02;letter-spacing:.04em;text-align:center;box-shadow:0 0 12px rgba(255,255,255,.12);animation:devicePulse 5.2s ease-in-out infinite}\n' +
    '@keyframes devicePulse{0%,100%{transform:translateY(0) scale(.98);opacity:.92}50%{transform:translateY(-5px) scale(1.04);opacity:1}}\n' +
    '#festivalImg,#reizinhoImg,#escutaImg{mix-blend-mode:normal!important;background:transparent!important;filter:drop-shadow(0 0 11px rgba(255,255,255,.08))!important}\n' +
    '.cowMarker{transform:scale(.22)!important;transform-origin:center center!important;opacity:.66!important}\n' +
    '.publicMilk{opacity:.88!important}.territoryMilk{opacity:.52!important}\n' +
    '.cowMarker img{background:transparent!important;border:0!important;box-shadow:none!important;animation:milkCorePulse 3.1s ease-in-out infinite;filter:drop-shadow(0 0 2px rgba(255,255,255,.52)) drop-shadow(0 0 6px rgba(110,210,255,.28)) brightness(1.13) saturate(1.06)!important}\n' +
    '.density-sem_dado img{filter:drop-shadow(0 0 2px rgba(150,220,255,.54)) drop-shadow(0 0 7px rgba(150,220,255,.22)) brightness(1.10) saturate(1.04)!important}\n' +
    '.density-baixa img{filter:drop-shadow(0 0 2px rgba(70,145,255,.62)) drop-shadow(0 0 8px rgba(70,145,255,.26)) brightness(1.12) saturate(1.10)!important}\n' +
    '.density-media_baixa img{filter:drop-shadow(0 0 2px rgba(40,245,255,.70)) drop-shadow(0 0 8px rgba(40,245,255,.30)) brightness(1.14) saturate(1.16)!important}\n' +
    '.density-media img{filter:drop-shadow(0 0 3px rgba(255,224,55,.76)) drop-shadow(0 0 9px rgba(255,224,55,.34)) brightness(1.16) saturate(1.20)!important}\n' +
    '.density-alta img{filter:drop-shadow(0 0 3px rgba(255,133,38,.84)) drop-shadow(0 0 10px rgba(255,133,38,.38)) brightness(1.18) saturate(1.24)!important}\n' +
    '.density-muito_alta img{filter:drop-shadow(0 0 3px rgba(255,38,82,.92)) drop-shadow(0 0 12px rgba(255,38,82,.44)) brightness(1.20) saturate(1.28)!important}\n' +
    '@keyframes milkCorePulse{0%,100%{opacity:.48;transform:scale(.78)}50%{opacity:.92;transform:scale(1.05)}}\n' +
    '#cardGatilhoBlock{display:none!important}\n' +
    '.floatingTickets{position:fixed;left:148px;bottom:34px;z-index:9000;display:flex;flex-direction:column;gap:10px;max-width:420px;pointer-events:none}\n' +
    '.floatingTicket{padding:12px 14px;border-radius:18px;background:rgba(0,0,0,.84);border:1px solid rgba(255,255,255,.16);color:#fff;box-shadow:0 10px 28px rgba(0,0,0,.34);font-size:13px;line-height:1.45;backdrop-filter:blur(8px);animation:ticketFloat 5.4s ease-in-out infinite}\n' +
    '.floatingTicket strong{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.62);margin-bottom:3px}\n' +
    '@keyframes ticketFloat{0%,100%{transform:translateY(0);opacity:.88}50%{transform:translateY(-6px);opacity:1}}\n' +
    '.folkloreMarker{opacity:1!important;z-index:6500!important}.folkloreMarker img{filter:drop-shadow(0 0 9px rgba(255,255,255,.56)) drop-shadow(0 0 18px rgba(120,220,255,.28)) brightness(1.08)!important}\n' +
    '@media(max-width:840px){.floatingTickets{left:10px;right:10px;bottom:92px;max-width:none}.cowMarker{transform:scale(.18)!important}}\n' +
    '</style>\n' +
    '<script id="ATLAS_RUNTIME_VISUAL_FIX_FINAL_2026_05_11">\n' +
    '(function(){\n' +
    'function C(v){return String(v||\"\").replace(/\\s+/g,\" \" ).trim()}\n' +
    'function addClassDensity(){document.querySelectorAll(\".cowMarker\").forEach(function(el){if(!/density-/.test(el.className))el.classList.add(\"density-sem_dado\")})}\n' +
    'function patchStep(){try{if(window.step&&!window.step.__milkSparse){window.step=function(z){if(z<=5)return 130;if(z===6)return 80;if(z===7)return 45;if(z===8)return 24;if(z===9)return 12;if(z===10)return 6;return 3};window.step.__milkSparse=1;if(window.updateTerritorySymbols)window.updateTerritorySymbols();}}catch(e){}}\n' +
    'function hideG(){var b=document.getElementById(\"cardGatilhoBlock\");if(b)b.style.display=\"none\";var g=document.getElementById(\"cardGatilho\");if(g)g.textContent=\"\"}\n' +
    'function box(){var b=document.getElementById(\"floatingTickets\");if(!b){b=document.createElement(\"div\");b.id=\"floatingTickets\";b.className=\"floatingTickets\";document.body.appendChild(b)}return b}\n' +
    'function ticket(t){if(!t)return;var b=box();b.innerHTML=\"\";var e=document.createElement(\"div\");e.className=\"floatingTicket\";e.innerHTML=\"<strong>chamamento territorial</strong>\"+t;b.appendChild(e);setTimeout(function(){if(e&&e.parentNode)e.parentNode.removeChild(e)},14000)}\n' +
    'function patchFill(){if(!window.fillSideCard||window.fillSideCard.__milkFinal)return;var old=window.fillSideCard;window.fillSideCard=function(r){old(r);hideG();var t=C((r&&r.gatilho_reflexao)||(r&&r.pergunta_convite)||(r&&r.pergunta_base));if(!t)t=\"Que objeto, voz ou gesto deste lugar merece voltar à superfície?\";ticket(t)};window.fillSideCard.__milkFinal=1}\n' +
    'function clearPins(){document.querySelectorAll(\".leaflet-marker-icon[src*=marker-icon],.leaflet-marker-shadow\").forEach(function(x){x.remove()})}\n' +
    'function ensureFolklore(){document.querySelectorAll(\".folkloreMarker\").forEach(function(x){x.style.display=\"flex\";x.style.opacity=\"1\"})}\n' +
    'var n=0,t=setInterval(function(){n++;patchStep();hideG();patchFill();clearPins();addClassDensity();ensureFolklore();if(n>100)clearInterval(t)},300);\n' +
    '})();\n' +
    '</script>\n';
}
