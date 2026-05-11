/**
 * Atlas Vivo MILK — patch público final de runtime sem alterar Interface.html.
 * Corrige excesso de amontoamento/brilho, remove caixas brancas por blend-mode quando canvas/CORS falha,
 * mantém chamamento territorial fora da ficha e conserva luz por densidade.
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
    '#fucoImg,#galeriaImg{mix-blend-mode:multiply!important;filter:drop-shadow(0 0 10px rgba(255,255,255,.10)) contrast(1.08) saturate(1.08)!important}\n' +
    '#festivalImg,#reizinhoImg,#escutaImg{mix-blend-mode:normal!important;background:transparent!important;filter:drop-shadow(0 0 11px rgba(255,255,255,.08))!important}\n' +
    '.cowMarker{transform:scale(.26)!important;transform-origin:center center!important;opacity:.70!important}\n' +
    '.publicMilk{opacity:.90!important}.territoryMilk{opacity:.58!important}\n' +
    '.cowMarker img{background:transparent!important;border:0!important;box-shadow:none!important;animation:milkCorePulse 2.8s ease-in-out infinite;filter:drop-shadow(0 0 2px rgba(255,255,255,.64)) drop-shadow(0 0 7px rgba(110,210,255,.34)) brightness(1.16) saturate(1.10)!important}\n' +
    '.density-sem_dado img{filter:drop-shadow(0 0 2px rgba(150,220,255,.70)) drop-shadow(0 0 8px rgba(150,220,255,.30)) brightness(1.12) saturate(1.08)!important}\n' +
    '.density-baixa img{filter:drop-shadow(0 0 3px rgba(70,145,255,.82)) drop-shadow(0 0 9px rgba(70,145,255,.36)) brightness(1.14) saturate(1.14)!important}\n' +
    '.density-media_baixa img{filter:drop-shadow(0 0 3px rgba(40,245,255,.88)) drop-shadow(0 0 10px rgba(40,245,255,.40)) brightness(1.16) saturate(1.20)!important}\n' +
    '.density-media img{filter:drop-shadow(0 0 3px rgba(255,224,55,.95)) drop-shadow(0 0 11px rgba(255,224,55,.44)) brightness(1.18) saturate(1.24)!important}\n' +
    '.density-alta img{filter:drop-shadow(0 0 4px rgba(255,133,38,.98)) drop-shadow(0 0 12px rgba(255,133,38,.50)) brightness(1.20) saturate(1.28)!important}\n' +
    '.density-muito_alta img{filter:drop-shadow(0 0 4px rgba(255,38,82,1)) drop-shadow(0 0 14px rgba(255,38,82,.58)) brightness(1.23) saturate(1.34)!important}\n' +
    '@keyframes milkCorePulse{0%,100%{opacity:.55;transform:scale(.82)}50%{opacity:1;transform:scale(1.10)}}\n' +
    '#cardGatilhoBlock{display:none!important}\n' +
    '.floatingTickets{position:fixed;left:148px;bottom:34px;z-index:9000;display:flex;flex-direction:column;gap:10px;max-width:420px;pointer-events:none}\n' +
    '.floatingTicket{padding:12px 14px;border-radius:18px;background:rgba(0,0,0,.84);border:1px solid rgba(255,255,255,.16);color:#fff;box-shadow:0 10px 28px rgba(0,0,0,.34);font-size:13px;line-height:1.45;backdrop-filter:blur(8px);animation:ticketFloat 5.4s ease-in-out infinite}\n' +
    '.floatingTicket strong{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.62);margin-bottom:3px}\n' +
    '@keyframes ticketFloat{0%,100%{transform:translateY(0);opacity:.88}50%{transform:translateY(-6px);opacity:1}}\n' +
    '.folkloreMarker{opacity:1!important;z-index:6500!important}.folkloreMarker img{filter:drop-shadow(0 0 9px rgba(255,255,255,.56)) drop-shadow(0 0 18px rgba(120,220,255,.28)) brightness(1.08)!important}\n' +
    '@media(max-width:840px){.floatingTickets{left:10px;right:10px;bottom:92px;max-width:none}.cowMarker{transform:scale(.22)!important}}\n' +
    '</style>\n' +
    '<script id="ATLAS_RUNTIME_VISUAL_FIX_FINAL_2026_05_11">\n' +
    '(function(){\n' +
    'function C(v){return String(v||\"\").replace(/\\s+/g,\" \" ).trim()}\n' +
    'function addClassDensity(){document.querySelectorAll(\".cowMarker\").forEach(function(el){if(!/density-/.test(el.className))el.classList.add(\"density-sem_dado\")})}\n' +
    'function patchStep(){try{if(window.step&&!window.step.__milkSparse){window.step=function(z){if(z<=5)return 95;if(z===6)return 55;if(z===7)return 30;if(z===8)return 16;if(z===9)return 8;if(z===10)return 4;return 2};window.step.__milkSparse=1;if(window.updateTerritorySymbols)window.updateTerritorySymbols();}}catch(e){}}\n' +
    'function cleanImg(img){if(!img||img.dataset.alphaCleaned)return;img.dataset.alphaCleaned=\"1\";var src=img.currentSrc||img.src;if(!src)return;var probe=new Image();probe.crossOrigin=\"anonymous\";probe.onload=function(){try{var w=probe.naturalWidth,h=probe.naturalHeight;if(!w||!h)return;var cn=document.createElement(\"canvas\");cn.width=w;cn.height=h;var ctx=cn.getContext(\"2d\",{willReadFrequently:true});ctx.drawImage(probe,0,0,w,h);var im=ctx.getImageData(0,0,w,h),d=im.data;for(var i=0;i<d.length;i+=4){var r=d[i],g=d[i+1],b=d[i+2],a=d[i+3];var max=Math.max(r,g,b),min=Math.min(r,g,b);var white=(r>222&&g>222&&b>222);var nearWhite=(r>202&&g>202&&b>202&&(max-min)<38);var paleShadow=(r>170&&g>170&&b>170&&(max-min)<30);if(white){d[i+3]=0}else if(nearWhite){d[i+3]=Math.min(a,12)}else if(paleShadow){d[i+3]=Math.min(a,34)}}ctx.putImageData(im,0,0);img.src=cn.toDataURL(\"image/png\");img.classList.add(\"asset-cleaned\");}catch(e){img.classList.add(\"asset-clean-failed\")}};probe.onerror=function(){img.classList.add(\"asset-clean-failed\")};probe.src=src}\n' +
    'function cleanTargets(){document.querySelectorAll(\"#fucoImg,#galeriaImg,#festivalImg,#reizinhoImg,#escutaImg,.device img,.leaflet-marker-icon img\").forEach(cleanImg)}\n' +
    'function hideG(){var b=document.getElementById(\"cardGatilhoBlock\");if(b)b.style.display=\"none\";var g=document.getElementById(\"cardGatilho\");if(g)g.textContent=\"\"}\n' +
    'function box(){var b=document.getElementById(\"floatingTickets\");if(!b){b=document.createElement(\"div\");b.id=\"floatingTickets\";b.className=\"floatingTickets\";document.body.appendChild(b)}return b}\n' +
    'function ticket(t){if(!t)return;var b=box();b.innerHTML=\"\";var e=document.createElement(\"div\");e.className=\"floatingTicket\";e.innerHTML=\"<strong>chamamento territorial</strong>\"+t;b.appendChild(e);setTimeout(function(){if(e&&e.parentNode)e.parentNode.removeChild(e)},14000)}\n' +
    'function patchFill(){if(!window.fillSideCard||window.fillSideCard.__milkFinal)return;var old=window.fillSideCard;window.fillSideCard=function(r){old(r);hideG();var t=C((r&&r.gatilho_reflexao)||(r&&r.pergunta_convite)||(r&&r.pergunta_base));if(!t)t=\"Que objeto, voz ou gesto deste lugar merece voltar à superfície?\";ticket(t)};window.fillSideCard.__milkFinal=1}\n' +
    'function clearPins(){document.querySelectorAll(\".leaflet-marker-icon[src*=marker-icon],.leaflet-marker-shadow\").forEach(function(x){x.remove()})}\n' +
    'function ensureFolklore(){document.querySelectorAll(\".folkloreMarker\").forEach(function(x){x.style.display=\"flex\";x.style.opacity=\"1\"})}\n' +
    'var n=0,t=setInterval(function(){n++;patchStep();cleanTargets();hideG();patchFill();clearPins();addClassDensity();ensureFolklore();if(n>100)clearInterval(t)},300);\n' +
    '})();\n' +
    '</script>\n';
}
