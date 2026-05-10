/**
 * Atlas Vivo MILK — Runtime visual fix sem alterar Interface.html.
 * Corrige regressões visuais geradas por Leaflet/GeoJSON e liga Galeria Diletante
 * às fotos Nuno A já expostas no bootstrap. Não altera layout, assets, MILKs, mapa,
 * freguesias, selos ou dispositivos oficiais.
 */

var doGet_BASE_INTERFACE_RUNTIME_FIX_ = doGet;

doGet = function(e) {
  var r = String((e && e.parameter && e.parameter.r) || '').toLowerCase();
  var out = doGet_BASE_INTERFACE_RUNTIME_FIX_(e);
  if (r) return out;
  try {
    if (!out || typeof out.getContent !== 'function' || typeof out.setContent !== 'function') return out;
    var html = out.getContent();
    var injection = buildAtlasRuntimeVisualPatch_();
    if (html.indexOf('ATLAS_RUNTIME_VISUAL_FIX_2026_05_10') < 0) {
      html = html.replace('</body>', injection + '\n</body>');
      out.setContent(html);
    }
  } catch (err) {}
  return out;
};

function buildAtlasRuntimeVisualPatch_() {
  return '\n<style id="ATLAS_RUNTIME_VISUAL_FIX_2026_05_10">\n' +
    '.leaflet-marker-icon[src*=marker-icon],.leaflet-marker-shadow{display:none!important;opacity:0!important;pointer-events:none!important}\n' +
    '.nunoAFrame{margin:10px 0 12px;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04)}\n' +
    '.nunoAFrame img{display:block;width:100%;max-height:260px;object-fit:cover;background:transparent}\n' +
    '.nunoACaption{padding:10px 12px;font-size:12px;line-height:1.45;color:rgba(255,255,255,.78)}\n' +
    '</style>\n' +
    '<script id="ATLAS_RUNTIME_VISUAL_FIX_2026_05_10">\n' +
    '(function(){\n' +
    '  function a(x){return Array.isArray(x)?x:[]}\n' +
    '  function c(v){return String(v||\"\").replace(/\\s+/g,\" \" ).trim()}\n' +
    '  function data(){return window.__ATLAS_DATA__||window.BOOTSTRAP||{}}\n' +
    '  function nunoPhotos(){var d=data();var p=a(d.fotos_nuno_a);if(!p.length&&d.device_payloads)p=a(d.device_payloads.galeria_diletante_nuno_a);return p.filter(function(x){return x&&(x.url_publica_lh3||x.imagem_url||x.public_url)})}\n' +
    '  function pick(list){if(!list.length)return null;var k=Math.floor((Date.now()/1000)%list.length);return list[k]}\n' +
    '  function side(r){\n' +
    '    var sc=document.getElementById(\"sideCard\"); if(!sc)return;\n' +
    '    var img=r.url_publica_lh3||r.imagem_url||r.public_url||\"\";\n' +
    '    var title=c(r.titulo_curatorial||r.titulo_publico||r.nome_ficheiro||\"Galeria Diletante — Nuno A\");\n' +
    '    var bilhete=c(r.bilhete_base||r.bilhete||\"A Galeria devolve uma imagem que não explica: desloca.\");\n' +
    '    var pergunta=c(r.pergunta_base||r.pergunta_convite||\"Que palavra desta fotografia ainda não encontrou lugar no bairro?\");\n' +
    '    document.getElementById(\"cardTitle\").textContent=title;\n' +
    '    document.getElementById(\"cardMeta\").textContent=[\"Nuno A\",c(r.territorio_associado),\"Galeria Diletante\"].filter(Boolean).join(\" · \" );\n' +
    '    document.getElementById(\"cardBody\").innerHTML=\"<div class=\\\"nunoAFrame\\\"><img src=\\\"\"+img+\"\\\" alt=\\\"Fotografia de Nuno A — Galeria Diletante\\\"><div class=\\\"nunoACaption\\\">Coleção fotográfica autoral de Nuno A. Esta imagem não é o asset Nuno/Escuta e não pertence aos personagens folclóricos.</div></div>\";\n' +
    '    document.getElementById(\"cardBilhete\").textContent=bilhete; document.getElementById(\"cardBilheteBlock\").style.display=\"block\";\n' +
    '    document.getElementById(\"cardGatilho\").textContent=pergunta; document.getElementById(\"cardGatilhoBlock\").style.display=\"block\";\n' +
    '    var tags=document.getElementById(\"cardTags\"); tags.innerHTML=\"\"; [\"galeria_diletante\",\"nuno_a\",\"fotografia_autoral\"].forEach(function(t){var s=document.createElement(\"span\");s.className=\"sideTag\";s.textContent=t;tags.appendChild(s)});\n' +
    '    document.getElementById(\"cardClassBlock\").style.display=\"block\"; sc.style.display=\"block\";\n' +
    '  }\n' +
    '  function showGallery(){var p=pick(nunoPhotos()); if(p) side(p);}\n' +
    '  function bind(){var g=document.getElementById(\"galleryDevice\"); if(!g||g.dataset.nunoAFixed)return; g.dataset.nunoAFixed=\"1\"; g.onclick=function(ev){ev.preventDefault(); try{toggleNote(\"galleryNote\",\"galleryDevice\")}catch(e){} showGallery(); return false;};}\n' +
    '  var tries=0; var t=setInterval(function(){tries++; bind(); if(nunoPhotos().length||tries>30) clearInterval(t)},500);\n' +
    '  setTimeout(function(){document.querySelectorAll(\".leaflet-marker-icon[src*=marker-icon],.leaflet-marker-shadow\").forEach(function(x){x.remove()})},1200);\n' +
    '})();\n' +
    '</script>\n';
}
