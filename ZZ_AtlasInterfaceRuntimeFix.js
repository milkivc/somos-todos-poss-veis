/**
 * Atlas Vivo MILK — Runtime visual fix sem alterar Interface.html.
 * Corrige marcadores padrão Leaflet, reduz amontoamento visual das MILKs,
 * reforça luz por densidade, remove gatilho da ficha e transforma gatilhos em
 * bilhetes soltos de chamamento. Liga Galeria Diletante às fotos Nuno A.
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
    html = html.replace(/<style id="ATLAS_RUNTIME_VISUAL_FIX_2026_05_10">[\s\S]*?<\/script>\s*/g, '');
    html = html.replace('</body>', injection + '\n</body>');
    out.setContent(html);
  } catch (err) {}
  return out;
};

function buildAtlasRuntimeVisualPatch_() {
  return '\n<style id="ATLAS_RUNTIME_VISUAL_FIX_2026_05_10">\n' +
    '.leaflet-marker-icon[src*=marker-icon],.leaflet-marker-shadow{display:none!important;opacity:0!important;pointer-events:none!important}\n' +
    '.leaflet-marker-icon{background:transparent!important;border:0!important}\n' +
    '.cowMarker{transform:scale(.58)!important;transform-origin:center center!important;opacity:.74!important}\n' +
    '.publicMilk{opacity:.82!important}.territoryMilk{opacity:.68!important}\n' +
    '.cowMarker img{background:transparent!important;border:0!important;box-shadow:none!important}\n' +
    '.density-sem_dado img{filter:drop-shadow(0 0 4px rgba(150,220,255,.45)) drop-shadow(0 0 10px rgba(150,220,255,.28))!important}\n' +
    '.density-baixa img{filter:drop-shadow(0 0 5px rgba(86,160,255,.58)) drop-shadow(0 0 13px rgba(86,160,255,.36))!important}\n' +
    '.density-media_baixa img{filter:drop-shadow(0 0 5px rgba(90,240,255,.62)) drop-shadow(0 0 15px rgba(90,240,255,.38))!important}\n' +
    '.density-media img{filter:drop-shadow(0 0 5px rgba(255,231,91,.68)) drop-shadow(0 0 16px rgba(255,231,91,.42))!important}\n' +
    '.density-alta img{filter:drop-shadow(0 0 5px rgba(255,149,55,.72)) drop-shadow(0 0 18px rgba(255,149,55,.48))!important}\n' +
    '.density-muito_alta img{filter:drop-shadow(0 0 6px rgba(255,70,89,.82)) drop-shadow(0 0 22px rgba(255,70,89,.56))!important}\n' +
    '.device{background:rgba(0,0,0,.08)!important;box-shadow:0 0 16px rgba(255,255,255,.045)!important}\n' +
    '.device img{background:transparent!important;border:0!important;box-shadow:none!important}\n' +
    '#fucoImg,#galeriaImg{background:transparent!important;filter:drop-shadow(0 0 8px rgba(255,255,255,.16)) saturate(1.05)!important}\n' +
    '#cardGatilhoBlock{display:none!important}\n' +
    '.floatingTickets{position:fixed;left:148px;bottom:34px;z-index:5600;display:flex;flex-direction:column;gap:10px;max-width:380px;pointer-events:none}\n' +
    '.floatingTicket{padding:11px 13px;border-radius:17px;background:rgba(0,0,0,.78);border:1px solid rgba(255,255,255,.14);color:#fff;box-shadow:0 10px 26px rgba(0,0,0,.30);font-size:13px;line-height:1.45;backdrop-filter:blur(8px);animation:ticketFloat 5.4s ease-in-out infinite}\n' +
    '.floatingTicket strong{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.58);margin-bottom:3px}\n' +
    '@keyframes ticketFloat{0%,100%{transform:translateY(0);opacity:.86}50%{transform:translateY(-6px);opacity:1}}\n' +
    '.nunoAFrame{margin:10px 0 12px;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04)}\n' +
    '.nunoAFrame img{display:block;width:100%;max-height:260px;object-fit:cover;background:transparent}\n' +
    '.nunoACaption{padding:10px 12px;font-size:12px;line-height:1.45;color:rgba(255,255,255,.78)}\n' +
    '@media(max-width:840px){.floatingTickets{left:10px;right:10px;bottom:92px;max-width:none}.cowMarker{transform:scale(.52)!important}}\n' +
    '</style>\n' +
    '<script id="ATLAS_RUNTIME_VISUAL_FIX_2026_05_10">\n' +
    '(function(){\n' +
    '  function a(x){return Array.isArray(x)?x:[]}\n' +
    '  function c(v){return String(v||\"\").replace(/\\s+/g,\" \" ).trim()}\n' +
    '  function data(){return window.__ATLAS_DATA__||window.BOOTSTRAP||{}}\n' +
    '  function nunoPhotos(){var d=data();var p=a(d.fotos_nuno_a);if(!p.length&&d.device_payloads)p=a(d.device_payloads.galeria_diletante_nuno_a);return p.filter(function(x){return x&&(x.url_publica_lh3||x.imagem_url||x.public_url)})}\n' +
    '  function pick(list){if(!list.length)return null;var k=Math.floor((Date.now()/1000)%list.length);return list[k]}\n' +
    '  function tickets(){var d=data(),out=[];a(d.bilhetes_curatoriais).forEach(function(x){if(c(x.pergunta||x.texto))out.push(c(x.pergunta||x.texto))});a(d.desafios_semanais).forEach(function(x){if(c(x.texto_desafio))out.push(c(x.texto_desafio))});return out}\n' +
    '  function ticketBox(){var b=document.getElementById(\"floatingTickets\");if(!b){b=document.createElement(\"div\");b.id=\"floatingTickets\";b.className=\"floatingTickets\";document.body.appendChild(b)}return b}\n' +
    '  function showTicket(txt,label){if(!txt)return;var b=ticketBox();b.innerHTML=\"\";var e=document.createElement(\"div\");e.className=\"floatingTicket\";e.innerHTML=\"<strong>bilhete de escrita</strong>\"+txt;b.appendChild(e);setTimeout(function(){if(e&&e.parentNode)e.parentNode.removeChild(e)},12000)}\n' +
    '  function floatingFromCurrent(r){var txt=c((r&&r.gatilho_reflexao)||(r&&r.pergunta_convite)||(r&&r.pergunta_base));if(!txt){var ts=tickets();txt=ts.length?ts[Math.floor((Date.now()/1000)%ts.length)]:\"Escreve uma memória pequena deste lugar, sem provar nada.\"}showTicket(txt)}\n' +
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
    '    document.getElementById(\"cardGatilho\").textContent=\"\"; document.getElementById(\"cardGatilhoBlock\").style.display=\"none\";\n' +
    '    var tags=document.getElementById(\"cardTags\"); tags.innerHTML=\"\"; [\"galeria_diletante\",\"nuno_a\",\"fotografia_autoral\"].forEach(function(t){var s=document.createElement(\"span\");s.className=\"sideTag\";s.textContent=t;tags.appendChild(s)});\n' +
    '    document.getElementById(\"cardClassBlock\").style.display=\"block\"; sc.style.display=\"block\"; showTicket(pergunta);\n' +
    '  }\n' +
    '  function patchFill(){if(!window.fillSideCard||window.fillSideCard.__ticketFixed)return;var old=window.fillSideCard;window.fillSideCard=function(r){old(r);try{document.getElementById(\"cardGatilho\").textContent=\"\";document.getElementById(\"cardGatilhoBlock\").style.display=\"none\";floatingFromCurrent(r)}catch(e){}};window.fillSideCard.__ticketFixed=true}\n' +
    '  function showGallery(){var p=pick(nunoPhotos()); if(p) side(p);}\n' +
    '  function bind(){var g=document.getElementById(\"galleryDevice\"); if(!g||g.dataset.nunoAFixed)return; g.dataset.nunoAFixed=\"1\"; g.onclick=function(ev){ev.preventDefault(); try{toggleNote(\"galleryNote\",\"galleryDevice\")}catch(e){} showGallery(); return false;};}\n' +
    '  function cleanLeaflet(){document.querySelectorAll(\".leaflet-marker-icon[src*=marker-icon],.leaflet-marker-shadow\").forEach(function(x){x.remove()})}\n' +
    '  var tries=0; var t=setInterval(function(){tries++; bind(); patchFill(); cleanLeaflet(); if(tries>40) clearInterval(t)},500);\n' +
    '})();\n' +
    '</script>\n';
}
