/** Atlas Vivo MILK — Código.js operacional oficial
 * Backend Apps Script: Sheets + Drive + JSON + submissões.
 * Fonte oficial: Drive/Sheets MILK. Sem Leaflet no GS.
 */

var CONFIG = {
  ASSETS_FOLDER_ID: '1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh',
  FOLKLORE_FOLDER_ID: '1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D',
  SPREADSHEET_ID: '1WPyQ5ALgS-GxiGE1NeEQJ6Zk2sR4uYsJ-_jOW-jkopQ',
  PRIVACY_EMAIL: 'somostodospossiveis@gmail.com',
  TIMEZONE: 'Europe/Lisbon',
  SHEETS: {
    FREGUESIAS_BASE: 'FREGUESIAS_BASE',
    FREGUESIAS_POLIGONOS: 'FREGUESIAS_POLIGONOS',
    GEORREFERENCIAS_FREGUESIAS_CAOP2024: 'GEORREFERENCIAS_FREGUESIAS_CAOP2024',
    DENSIDADE_DEMOGRAFICA: 'DENSIDADE_DEMOGRAFICA',
    PUBLICAR_MAPA: 'PUBLICAR_MAPA',
    PLANILHA_PUBLICA: 'PLANILHA_PUBLICA',
    PLANILHA_PUBLICA_FESTAS_TOTAL: 'PLANILHA_PUBLICA_FESTAS_TOTAL',
    PERSONAGENS_FOLCLORICOS_ATLAS: 'PERSONAGENS_FOLCLORICOS_ATLAS',
    PROGRAMAS_EDITORIAIS: 'PROGRAMAS_EDITORIAIS',
    FORMULARIO_EDITORIAL_OFICIAL: 'FORMULARIO_EDITORIAL_OFICIAL',
    VALIDACAO_EDITORIAL_OFICIAL: 'VALIDACAO_EDITORIAL_OFICIAL',
    GATILHOS_SEMANTICOS: 'GATILHOS_SEMANTICOS',
    PUBLICACOES_EDITORIAIS: 'PUBLICACOES_EDITORIAIS',
    ASSETS_EDITORIAIS_OFICIAIS: 'ASSETS_EDITORIAIS_OFICIAIS',
    ENTRADAS_BRUTAS: 'ENTRADAS_BRUTAS',
    ENTRADAS_EDITORIAIS: 'ENTRADAS_EDITORIAIS',
    REVISAO_INTERNA: 'REVISAO_INTERNA',
    REGISTRO_DIARIO_ATLAS: 'REGISTRO_DIARIO_ATLAS'
  }
};

var OFFICIAL_ASSET_IDS = {
  seal: '1RJLFOHqoVY4QTR81oZb8G6SIqN1GZwH9',
  fuco: '1Io0s9yQyFrfBzceg-1dbhM0EoJiZgAmv',
  galeria: '1n76q6FyaB89wOnH4xAsT8ofjvfoBICM3',
  festival: '1JCtY-PpP9TWrNDU7yCxCGoJsZWlSrcvp',
  reizinho: '1OnoVEJ2d5Dk9KfuVKukMVyGQZug_ZaC-',
  escuta: '1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM',
  nuno: '1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM',
  cow_base: '1HlVxB0qqy2Wee1HodoNxNNcocRE0XaVP',
  cow_brilho: '1Fwd7qlGbv0FpSRSv6sjsMCZuobkKsloM',
  cow_destaque: '1gx4M4uq-anojZQfK3rGkm-bY4FIe76lK',
  alma_penada: '1Er32suHoKUSX-OlfjFYARATLc4cRgHdZ',
  moura_encantada: '1o_e3H-r26ectKuCQjgOOtBiLSRcY7o-e',
  coca: '1T8DXfUusQ1F7wzQMITUTFq81F7ivHJIN',
  cavalum: '18oXmYkjQlsn5w3rZqFv9EQ73TatlTdDX',
  sete_caras: '13H5OSHIHCxzN8WHDfD7wNszJYj7ex9xb',
  menino_rio: '1cLioeGjUp2A8urxtp1Rn4eAvD8JZYpVD',
  xango: '1-FpTUYKBqUUlVmFVEYIRdth_bL9bIJmI',
  oxala: '1Xqqftv5Qs2aIVPvn9QqRA1MNoB2isP31',
  chorona: '13XXhqz615JeBjQCGTnzl7ogEoXZC0OMy',
  olharao: '1X93TSJ3hQcE_Sy0OMTWztY1KbzXsQikW',
  fefe_felicidade: '1QD3Qv3lDBmfjeP6MIFKl7lv6FaLF0Mtu',
  gaizinho: '1Do2GtGXe479Q5j1A3DuWRd3wslG03vOf',
  lisbon_verde: '174LZdvMVP-dHhRAe2Ztb8lTunGHelH0s',
  lobo_castanho: '1SZ0oauOlEfsqiMPDJeiYyt2W2J6sjY3Q',
  personagem_preto_chapeu: '1L-RJLWFnRw7Ikiikpi8LPOObYSNX-AXu'
};

function doGet(e) {
  var r = String((e && e.parameter && e.parameter.r) || '').toLowerCase();
  try {
    if (r === 'health' || r === 'diagnostico') return json_(getHealthPayload_());
    if (r === 'assets') return json_({ ok: true, assets: buildAssets_(), audit: auditAssets_() });
    if (r === 'points') return json_({ ok: true, points: getPublicPoints_() });
    if (r === 'territory_layers') return json_(getTerritoryLayers_());
    if (r === 'personagens' || r === 'folklore') return json_({ ok: true, personagens: getFolkloreCharacters_() });
    if (r === 'editorial') return json_(getEditorialPayload_());
    if (r === 'density') return json_({ ok: true, legend: densityLegend_(), density: readSheet_(ss_(), CONFIG.SHEETS.DENSIDADE_DEMOGRAFICA) });
    if (r === 'privacy') return json_({ ok: true, privacy_policy: privacyPolicy_() });
    if (r === 'bootstrap') return json_(buildPublicPayload_());
  } catch (err) {
    return json_({ ok: false, route: r, error: String(err) });
  }

  try {
    var t = HtmlService.createTemplateFromFile('Interface');
    t.bootstrap_json = JSON.stringify(buildTemplateBootstrap_());
    return t.evaluate().setTitle('Atlas Vivo MILK').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (errHtml) {
    return HtmlService.createHtmlOutput('<pre style="white-space:pre-wrap;padding:24px;color:white;background:#000">ERRO INTERFACE\n' + esc_(String(errHtml)) + '</pre>')
      .setTitle('Atlas Vivo MILK — erro').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

function doPost(e) {
  try {
    var r = String((e && e.parameter && e.parameter.r) || 'submit').toLowerCase();
    if (r !== 'submit') return json_({ ok: false, error: 'Rota POST desconhecida' });
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    return json_(handleSubmission_(JSON.parse(raw || '{}')));
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function buildTemplateBootstrap_() {
  var url = '';
  try { url = ScriptApp.getService().getUrl() || ''; } catch (e) {}
  return {
    ok: true,
    lazy_bootstrap: true,
    bootstrap_url: url ? url + '?r=bootstrap' : '?r=bootstrap',
    health_url: url ? url + '?r=health' : '?r=health',
    territory_layers_url: url ? url + '?r=territory_layers' : '?r=territory_layers',
    personagens_url: url ? url + '?r=personagens' : '?r=personagens',
    submit_endpoint: url || '',
    privacy_email: CONFIG.PRIVACY_EMAIL,
    assets: buildAssets_()
  };
}

function buildPublicPayload_() {
  var layers = getTerritoryLayers_();
  var points = getPublicPoints_();
  var personagens = getFolkloreCharacters_();
  var editorial = getEditorialPayload_();
  var serviceUrl = '';
  try { serviceUrl = ScriptApp.getService().getUrl() || ''; } catch (e) {}

  return {
    ok: true,
    source: 'Google Sheets + Drive oficiais MILK',
    privacy_email: CONFIG.PRIVACY_EMAIL,
    assets: buildAssets_(),
    assets_audit: auditAssets_(),
    territory: layers.territory_points,
    territorios: layers.territory_points,
    territory_geojson: layers.territory_geojson,
    territory_layers: layers.territory_layers,
    points: points,
    map_points: points,
    personagens: personagens,
    programas_editoriais: editorial.programas_editoriais,
    formulario_editorial: editorial.formulario_editorial,
    validacao_editorial: editorial.validacao_editorial,
    gatilhos_semanticos: editorial.gatilhos_semanticos,
    publicacoes_editoriais: editorial.publicacoes_editoriais,
    device_payloads: buildDevicePayloads_(points, personagens, editorial),
    bilhetes_curatoriais: buildBilhetes_(points, personagens, editorial.publicacoes_editoriais),
    density_legend: densityLegend_(),
    privacy_policy: privacyPolicy_(),
    submit_endpoint: serviceUrl || '',
    meta: {
      generated_at: nowIso_(),
      interface_contract: 'preserved_lazy_bootstrap',
      auto_publish: false,
      points_count: points.length,
      territory_count: layers.territory_points.length,
      territory_geojson_count: (layers.territory_geojson.features || []).length,
      territory_layers_count: layers.territory_layers.length,
      personagens_count: personagens.length,
      assets_ok: auditAssets_().ok
    }
  };
}

function getHealthPayload_() {
  var layers = getTerritoryLayers_();
  var points = getPublicPoints_();
  var chars = getFolkloreCharacters_();
  var audit = auditAssets_();
  return {
    ok: true,
    spreadsheet_id: CONFIG.SPREADSHEET_ID,
    assets_folder_id: CONFIG.ASSETS_FOLDER_ID,
    assets_ok: audit.ok,
    assets_missing: audit.missing,
    points_count: points.length,
    territory_count: layers.territory_points.length,
    territory_geojson_count: (layers.territory_geojson.features || []).length,
    territory_layers_count: layers.territory_layers.length,
    personagens_count: chars.length,
    generated_at: nowIso_()
  };
}

function buildAssets_() {
  var out = {};
  Object.keys(OFFICIAL_ASSET_IDS).forEach(function(k) { out[k] = img_(OFFICIAL_ASSET_IDS[k]); });
  try {
    readSheet_(ss_(), CONFIG.SHEETS.ASSETS_EDITORIAIS_OFICIAIS).forEach(function(row) {
      var key = normHeader_(pick_(row, ['asset_slug','slug','chave','asset','nome']));
      var id = fileId_(pick_(row, ['file_id','id_arquivo','id_file','url','link_drive']));
      if (key && id) out[key] = img_(id);
    });
  } catch (e) {}
  return out;
}

function auditAssets_() {
  var a = buildAssets_();
  var required = ['seal','fuco','galeria','festival','reizinho','escuta','cow_base','cow_brilho','cow_destaque'];
  var missing = required.filter(function(k){ return !a[k]; });
  return { ok: missing.length === 0, missing: missing };
}

function getTerritoryLayers_() {
  var rows = [];
  var ss = ss_();
  [CONFIG.SHEETS.FREGUESIAS_POLIGONOS, CONFIG.SHEETS.GEORREFERENCIAS_FREGUESIAS_CAOP2024, CONFIG.SHEETS.FREGUESIAS_BASE].forEach(function(name) {
    rows = rows.concat(readSheet_(ss, name));
  });
  var densityMap = buildDensityMap_(ss);
  var points = [];
  var features = [];
  rows.forEach(function(r) {
    var p = territoryPoint_(r, densityMap);
    if (!p) return;
    points.push(p);
    var geom = geometry_(r, p);
    if (geom) features.push({ type: 'Feature', geometry: geom, properties: p });
  });
  points = uniq_(points, function(p){ return [p.codigo, p.freguesia, p.municipio, p.lat, p.lng].join('|'); });
  features = uniq_(features, function(f){ var p = f.properties || {}; return [p.codigo, p.freguesia, p.municipio, p.lat, p.lng].join('|'); });
  var geo = { type: 'FeatureCollection', features: features };
  return { ok: true, territory_points: points, territory_geojson: geo, territory_layers: [{ id:'freguesias_oficiais', label:'Freguesias oficiais', geojson: geo, points: points }] };
}

function territoryPoint_(r, densityMap) {
  var lat = num_(pick_(r, ['lat_centro','lat','latitude','coordenada_lat']));
  var lng = num_(pick_(r, ['lng_centro','lng','lon','longitude','coordenada_lng']));
  if (!isFinite(lat) || !isFinite(lng)) return null;
  var freg = clean_(pick_(r, ['freguesia_nome','nome_freguesia','freguesia']));
  var mun = clean_(pick_(r, ['municipio_nome','municipio','concelho']));
  var cod = clean_(pick_(r, ['codigo_freguesia','freguesia_id_oficial','dtmnfr','dicofre','codigo']));
  var dens = densityFromRow_(r, densityMap, freg, mun, cod);
  return attachDensity_({
    id: cod || normHeader_(freg + '-' + mun), codigo: cod,
    territorio_id: clean_(pick_(r, ['territorio_id'])) || (cod ? 'PT-FREG-' + cod : ''),
    freguesia: freg, municipio: mun, concelho: mun,
    distrito: clean_(pick_(r, ['distrito_ou_ilha','distrito'])),
    lat: lat, lng: lng,
    estado_visual: clean_(pick_(r, ['estado_visual','marcador'])) || 'convite',
    visibilidade: clean_(pick_(r, ['visibilidade'])) || 'publico'
  }, dens);
}

function geometry_(r, p) {
  var raw = clean_(pick_(r, ['geojson','geometry']));
  if (raw && raw.indexOf('{') === 0 && raw !== 'PENDENTE_IMPORTACAO_OFICIAL') { try { return JSON.parse(raw); } catch(e){} }
  return { type: 'Point', coordinates: [p.lng, p.lat] };
}

function getPublicPoints_() {
  var ss = ss_();
  var densityMap = buildDensityMap_(ss);
  var all = [];
  [CONFIG.SHEETS.PUBLICAR_MAPA, CONFIG.SHEETS.PLANILHA_PUBLICA, CONFIG.SHEETS.PLANILHA_PUBLICA_FESTAS_TOTAL].forEach(function(name) {
    readSheet_(ss, name).forEach(function(r) { var p = publicPoint_(r, name, densityMap); if (p) all.push(p); });
  });
  getEditorialPayload_().publicacoes_editoriais.forEach(function(r){ var p = publicPoint_(r, CONFIG.SHEETS.PUBLICACOES_EDITORIAIS, densityMap); if (p) all.push(p); });
  return uniq_(all, function(p){ return [p.id_publicacao, p.titulo_publico, p.lat, p.lng].join('|'); });
}

function publicPoint_(r, source, densityMap) {
  var lat = num_(pick_(r, ['lat','latitude','lat_centro','coordenada_lat']));
  var lng = num_(pick_(r, ['lng','lon','longitude','lng_centro','coordenada_lng']));
  if (!isFinite(lat) || !isFinite(lng)) return null;
  var status = normText_(pick_(r, ['status_publicacao','status','estado_publicacao','estado']));
  var consent = pick_(r, ['consentimento_ok','consent_public','consentimento_publicacao','publicar']);
  if (status && ['publicado','validado_milk','validado','ativo','aprovado','public'].indexOf(status) === -1) return null;
  if (consent && !bool_(consent)) return null;
  var tipo = inferType_(r, source);
  var origem = inferOrigin_(r, tipo);
  var freg = clean_(pick_(r, ['freguesia','territorio']));
  var mun = clean_(pick_(r, ['concelho','municipio','municipality']));
  var cod = clean_(pick_(r, ['codigo_freguesia','dicofre','territorio_id']));
  return attachDensity_({
    id_publicacao: clean_(pick_(r, ['id_publicacao','id','slug'])) || Utilities.getUuid(),
    lat: lat, lng: lng,
    titulo_publico: clean_(pick_(r, ['titulo_publico','titulo','nome','nome_publico','nome_do_ponto'])) || 'Ponto MILK',
    freguesia: freg, concelho: mun, municipio: mun,
    distrito: clean_(pick_(r, ['distrito'])),
    texto_curto: clean_(pick_(r, ['texto_curto','descricao_publica','descricao','historia','texto'])),
    frase_bilhete: clean_(pick_(r, ['frase_bilhete','frase_entrada','bilhete','bilhete_curatorial'])),
    gatilho_reflexao: clean_(pick_(r, ['gatilho_reflexao','pergunta_convite','desafio_ou_convite','desafio'])),
    tipo_entrada: tipo,
    dispositivo_origem: origem,
    estado_visual: inferState_(r, origem, tipo),
    fonte: source,
    imagem_url: assetUrl_(pick_(r, ['imagem_url','asset_publico','url_imagem','link_drive'])),
    audio_url: assetUrl_(pick_(r, ['audio_url','audio_publico'])),
    curadoria_status: 'oficial_sheet'
  }, densityFromRow_(r, densityMap, freg, mun, cod));
}

function getFolkloreCharacters_() {
  var rows = readSheet_(ss_(), CONFIG.SHEETS.PERSONAGENS_FOLCLORICOS_ATLAS);
  var list = rows.map(function(r){ return folkloreRow_(r); }).filter(Boolean);
  if (!list.length) list = fallbackFolklore_();
  return uniq_(list, function(p){ return p.slug || p.nome; });
}

function folkloreRow_(r) {
  var nome = clean_(pick_(r, ['nome','personagem','titulo','nome_publico']));
  if (!nome) return null;
  var slug = normHeader_(pick_(r, ['slug','nome','personagem','titulo']));
  return {
    nome: nome, slug: slug,
    freguesia: clean_(pick_(r, ['freguesia','territorio'])),
    municipio: clean_(pick_(r, ['municipio','concelho'])),
    descricao: clean_(pick_(r, ['descricao','historia','texto','descricao_publica'])),
    bilhete: clean_(pick_(r, ['bilhete','bilhete_curatorial','frase_bilhete','frase_entrada'])),
    pergunta_convite: clean_(pick_(r, ['pergunta_convite','gatilho_reflexao','desafio'])),
    imagem_url: assetUrl_(pick_(r, ['imagem_url','asset_publico','url','link_drive','file_id'])) || (OFFICIAL_ASSET_IDS[slug] ? img_(OFFICIAL_ASSET_IDS[slug]) : ''),
    lat: num_(pick_(r, ['lat','latitude','lat_centro'])),
    lng: num_(pick_(r, ['lng','lon','longitude','lng_centro'])),
    ativo: !String(pick_(r, ['ativo','estado'])).match(/nao|não|false|0/i),
    curadoria_status: 'oficial_sheet'
  };
}

function fallbackFolklore_() {
  var arr = [['alma_penada','Alma Penada'],['moura_encantada','Moura Encantada'],['coca','Coca'],['cavalum','Cavalum'],['sete_caras','Sete Caras'],['menino_rio','Menino Rio'],['chorona','Chorona'],['olharao','Olharão'],['fefe_felicidade','Fefe Felicidade'],['gaizinho','Gaizinho'],['xango','Xangó'],['oxala','Oxalá'],['lisbon_verde','Lisbon Verde'],['lobo_castanho','Lobo Castanho'],['personagem_preto_chapeu','Personagem Preto Chapéu']];
  return arr.map(function(x){ return { slug:x[0], nome:x[1], descricao:'', bilhete:'', pergunta_convite:'', imagem_url: OFFICIAL_ASSET_IDS[x[0]] ? img_(OFFICIAL_ASSET_IDS[x[0]]) : '', ativo:true, curadoria_status:'asset_oficial_drive_pendente_sheet' }; });
}

function getEditorialPayload_() {
  var ss = ss_();
  var programas = readSheet_(ss, CONFIG.SHEETS.PROGRAMAS_EDITORIAIS);
  var formulario = readSheet_(ss, CONFIG.SHEETS.FORMULARIO_EDITORIAL_OFICIAL);
  var validacao = readSheet_(ss, CONFIG.SHEETS.VALIDACAO_EDITORIAL_OFICIAL);
  var gatilhos = readSheet_(ss, CONFIG.SHEETS.GATILHOS_SEMANTICOS);
  var publicacoes = readSheet_(ss, CONFIG.SHEETS.PUBLICACOES_EDITORIAIS).filter(function(r){
    var s = normText_(pick_(r, ['status_publicacao','status']));
    return !s || ['publicado','validado_milk','ativo','aprovado'].indexOf(s) >= 0;
  });
  return { ok:true, programas_editoriais: programas, formulario_editorial: formByProgram_(formulario), validacao_editorial: validacao, gatilhos_semanticos: gatilhos, publicacoes_editoriais: publicacoes };
}

function buildDevicePayloads_(points, personagens, editorial) {
  function by(origin){ return (points || []).filter(function(p){ return p.dispositivo_origem === origin || (origin === 'folclore' && p.tipo_entrada === 'personagem'); }); }
  return { galeria_diletante: by('galeria'), dado_sem_lado: by('festival'), caotadas_fuco: by('caotadas'), reizinho_sainha: by('reizinho'), folclore_vivo: personagens || [], publicacoes: (editorial && editorial.publicacoes_editoriais) || [], gatilhos: (editorial && editorial.gatilhos_semanticos) || [] };
}

function buildBilhetes_(points, personagens, publicacoes) {
  var out = [];
  (points || []).forEach(function(p){ if (p.frase_bilhete || p.gatilho_reflexao) out.push({ origem:p.dispositivo_origem, titulo:p.titulo_publico, texto:p.frase_bilhete, pergunta:p.gatilho_reflexao, lat:p.lat, lng:p.lng }); });
  (personagens || []).forEach(function(p){ if (p.bilhete || p.pergunta_convite) out.push({ origem:'folclore', titulo:p.nome, texto:p.bilhete, pergunta:p.pergunta_convite, imagem_url:p.imagem_url }); });
  (publicacoes || []).forEach(function(p){ var b = clean_(pick_(p, ['frase_entrada','bilhete','bilhete_curatorial'])); if (b) out.push({ origem:'publicacao_editorial', titulo:clean_(pick_(p, ['titulo_publico','titulo'])), texto:b }); });
  return out;
}

function handleSubmission_(payload) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    validateSubmission_(payload);
    var ss = ss_();
    var now = new Date();
    var id = 'ENT-' + Utilities.formatDate(now, CONFIG.TIMEZONE, 'yyyyMMdd-HHmmss') + '-' + Utilities.getUuid().slice(0,8);
    var target = clean_(payload.programa_slug) ? CONFIG.SHEETS.ENTRADAS_EDITORIAIS : CONFIG.SHEETS.ENTRADAS_BRUTAS;
    var obj = {
      id_entrada: id,
      data_submissao: now.toISOString(),
      programa_slug: payload.programa_slug || '',
      titulo: payload.titulo || '',
      texto_principal: payload.texto_principal || payload.memory_text || '',
      assinatura: payload.assinatura || payload.signature || '',
      pseudonimo: payload.pseudonimo || '',
      fonte_oral: payload.fonte_oral || '',
      freguesia: payload.freguesia || payload.territory || '',
      municipio: payload.municipio || payload.municipality || '',
      distrito: payload.distrito || payload.district || '',
      rua_ou_toponimo: payload.rua_ou_toponimo || '',
      frase_curta_publica: payload.frase_curta_publica || '',
      imagem_drive_id: payload.imagem_drive_id || '',
      audio_drive_id: payload.audio_drive_id || '',
      idade_faixa: payload.age_band || payload.idade_faixa || '',
      consent_internal: payload.consent_internal ? 'SIM' : 'NAO',
      consent_public: payload.consent_public ? 'SIM' : 'NAO',
      consent_future: payload.consent_future ? 'SIM' : 'NAO',
      base_legal: 'RGPD: consentimento para receção interna e revisão humana; publicação apenas após consentimento específico e validação.',
      privacy_email: CONFIG.PRIVACY_EMAIL,
      fonte_cnpd: 'https://www.cnpd.pt/',
      artigo80_referencia: 'https://artigo80.pt/',
      publicavel: payload.consent_public ? 'PENDENTE_REVISAO' : 'NAO',
      estado_revisao: 'PENDENTE'
    };
    appendObj_(ensureSheet_(ss, target), obj);
    appendObj_(ensureSheet_(ss, CONFIG.SHEETS.REVISAO_INTERNA), {
      id_entrada:id, data_registo:now.toISOString(), modo:clean_(payload.programa_slug)?'editorial':'geral', programa_slug:obj.programa_slug,
      freguesia:obj.freguesia, municipio:obj.municipio, titulo:obj.titulo, resumo:clean_(obj.texto_principal).slice(0,250),
      estado_revisao:'PENDENTE', consentimento_interno:obj.consent_internal, consentimento_publicacao:obj.consent_public,
      idade_faixa:obj.idade_faixa, risco_rgpd:payload.consent_public?'medio':'baixo_sem_publicacao', validacao_cnpd:'PENDENTE',
      anonimizacao_necessaria:'AVALIAR', pseudonimizar:'AVALIAR', publicavel:payload.consent_public?'PENDENTE_REVISAO':'NAO',
      motivo_bloqueio:payload.consent_public?'':'Sem consentimento público específico', fonte_cnpd:'https://www.cnpd.pt/', artigo80_referencia:'https://artigo80.pt/'
    });
    appendObj_(ensureSheet_(ss, CONFIG.SHEETS.REGISTRO_DIARIO_ATLAS), {
      codigo_do_dia: Utilities.formatDate(now, CONFIG.TIMEZONE, 'yyyyMMdd'), timestamp: now.toISOString(), tipo_evento:'SUBMISSAO_PUBLICA_RECEBIDA', id_entrada:id,
      folha_origem:target, estado:'PENDENTE_REVISAO', rgpd:'CONSENTIMENTO_INTERNO_SIM', publicavel:payload.consent_public?'PENDENTE_VALIDACAO':'NAO_PUBLICAR_SEM_CONSENTIMENTO', observacao:'Não publica automaticamente.'
    });
    return { ok:true, id_entrada:id, message:'Submissão recebida. Será revista internamente antes de qualquer publicação.' };
  } catch (err) {
    return { ok:false, error:String(err) };
  } finally { try { lock.releaseLock(); } catch(e){} }
}

function validateSubmission_(p) {
  if (!p) throw new Error('Payload vazio');
  var age = normText_(p.age_band || p.idade_faixa || '');
  if (age === 'under_13' || age === 'menos_de_13' || age === 'menor_13') throw new Error('Menores de 13 anos não podem submeter diretamente.');
  if (!p.consent_internal) throw new Error('É necessário autorizar a receção interna e a revisão humana.');
  var txt = clean_(p.texto_principal || p.memory_text || p.titulo || p.frase_curta_publica || p.imagem_drive_id || p.audio_drive_id);
  if (!txt) throw new Error('Escreva ou indique o conteúdo que pretende partilhar.');
}

function inferType_(r, source) {
  var s = normText_(pick_(r, ['tipo_entrada','tipo','tipo_pin','verbo','categoria']));
  if (source === CONFIG.SHEETS.PLANILHA_PUBLICA_FESTAS_TOTAL || s.indexOf('festa') >= 0) return 'festa';
  if (s.indexOf('cron') >= 0) return 'cronica';
  if (s.indexOf('brinc') >= 0 || s.indexOf('piada') >= 0) return 'brincadeira';
  if (s.indexOf('person') >= 0 || s.indexOf('folcl') >= 0) return 'personagem';
  if (s.indexOf('mem') >= 0) return 'memoria';
  return s || 'expressao';
}
function inferOrigin_(r, tipo) {
  var s = normText_(pick_(r, ['dispositivo_origem','origem','nucleo','programa_slug']));
  if (s.indexOf('galeria') >= 0) return 'galeria';
  if (s.indexOf('dado') >= 0 || s.indexOf('festival') >= 0 || tipo === 'festa') return 'festival';
  if (s.indexOf('fuco') >= 0 || s.indexOf('caot') >= 0 || tipo === 'cronica') return 'caotadas';
  if (s.indexOf('reiz') >= 0 || tipo === 'brincadeira') return 'reizinho';
  if (tipo === 'personagem') return 'folclore';
  return 'atlas';
}
function inferState_(r, origem, tipo) {
  var s = normText_(pick_(r, ['estado_visual','estado','status_visual']));
  if (s.indexOf('galeria') >= 0 || origem === 'galeria') return 'galeria_diletante';
  if (s.indexOf('cronica') >= 0 || origem === 'caotadas' || tipo === 'festa') return 'nova_cronica';
  return 'convite';
}

function buildDensityMap_(ss) {
  var map = {};
  readSheet_(ss, CONFIG.SHEETS.DENSIDADE_DEMOGRAFICA).forEach(function(r){
    var dens = densityValue_(r);
    var freg = normHeader_(pick_(r, ['freguesia','nome_freguesia','freguesia_nome']));
    var mun = normHeader_(pick_(r, ['municipio','concelho','municipio_nome']));
    var cod = clean_(pick_(r, ['codigo_freguesia','dicofre','dtmnfr','codigo']));
    if (isFinite(dens)) {
      if (cod) map['cod:' + cod] = dens;
      if (freg || mun) map['fm:' + freg + '|' + mun] = dens;
    }
  });
  return map;
}
function densityFromRow_(r, map, freg, mun, cod) {
  var n = densityValue_(r);
  if (isFinite(n)) return n;
  if (cod && map['cod:' + cod] !== undefined) return map['cod:' + cod];
  var k = 'fm:' + normHeader_(freg) + '|' + normHeader_(mun);
  return map[k] !== undefined ? map[k] : null;
}
function densityValue_(r) { var n = num_(pick_(r, ['densidade_demografica','densidade_populacional','habitantes_km2','hab_km2','densidade','pop_density'])); return isFinite(n) ? n : null; }
function densityClass_(n) { if (!isFinite(n)) return 'sem_dado'; if (n < 80) return 'baixa'; if (n < 250) return 'media_baixa'; if (n < 1000) return 'media'; if (n < 3500) return 'alta'; return 'muito_alta'; }
function densityColor_(k) { var m = { sem_dado:'#7fd2ff', baixa:'#5aa8ff', media_baixa:'#55e6ff', media:'#ffe867', alta:'#ff9b45', muito_alta:'#ff4f5e' }; return m[k] || m.sem_dado; }
function attachDensity_(obj, dens) { var k = densityClass_(dens); obj.densidade_demografica = isFinite(dens) ? dens : ''; obj.density_value = isFinite(dens) ? dens : null; obj.density_class = k; obj.density_color = densityColor_(k); return obj; }
function densityLegend_() { return ['sem_dado','baixa','media_baixa','media','alta','muito_alta'].map(function(k){ return { class:k, color:densityColor_(k) }; }); }
function privacyPolicy_() { return { privacy_email:CONFIG.PRIVACY_EMAIL, cnpd_url:'https://www.cnpd.pt/', artigo80_url:'https://artigo80.pt/', under_13_blocked:true, publication_requires_human_review:true, auto_publish:false, rights:['acesso','retificacao','apagamento','limitacao','portabilidade','oposicao','retirada_consentimento'] }; }

function ss_(){ return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID); }
function json_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function nowIso_(){ return Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX"); }
function img_(id){ return id ? 'https://lh3.googleusercontent.com/d/' + id : ''; }
function esc_(s){ return String(s).replace(/[&<>]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]; }); }
function clean_(v){ return String(v == null ? '' : v).replace(/\s+/g,' ').trim(); }
function normHeader_(v){ return clean_(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }
function normText_(v){ return clean_(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
function bool_(v){ return ['sim','s','true','1','yes','ok','ativo','publicado','validado','aprovado'].indexOf(normText_(v)) >= 0; }
function num_(v){ if(v===null||v===undefined||v==='') return null; var n = Number(String(v).replace(',','.')); return isFinite(n) ? n : null; }
function pick_(obj, aliases){ obj=obj||{}; for(var i=0;i<aliases.length;i++){ var k=normHeader_(aliases[i]); if(Object.prototype.hasOwnProperty.call(obj,k)){ var v=obj[k]; if(clean_(v)!=='') return v; }} return ''; }
function fileId_(v){ var s=clean_(v); if(!s) return ''; var m=s.match(/\/d\/([a-zA-Z0-9_-]+)/)||s.match(/[?&]id=([a-zA-Z0-9_-]+)/); if(m&&m[1]) return m[1]; return /^[a-zA-Z0-9_-]{20,}$/.test(s)?s:''; }
function assetUrl_(v){ var id=fileId_(v); return id ? img_(id) : clean_(v); }
function uniq_(arr, fn){ var seen={}; var out=[]; (arr||[]).forEach(function(x){ var k=fn(x); if(!k||seen[k]) return; seen[k]=true; out.push(x); }); return out; }
function readSheet_(ss, name){ var sh; try { sh=ss.getSheetByName(name); } catch(e){ return []; } if(!sh || sh.getLastRow()<1 || sh.getLastColumn()<1) return []; var values=sh.getRange(1,1,sh.getLastRow(),sh.getLastColumn()).getValues(); var header=(values.shift()||[]).map(normHeader_); var out=[]; values.forEach(function(row){ var o={}; var has=false; header.forEach(function(h,i){ if(!h) return; o[h]=row[i]; if(clean_(row[i])!=='') has=true; }); if(has) out.push(o); }); return out; }
function ensureSheet_(ss,name){ return ss.getSheetByName(name)||ss.insertSheet(name); }
function appendObj_(sh,obj){ var lastCol=Math.max(1,sh.getLastColumn()); var headers=[]; if(sh.getLastRow()>0) headers=sh.getRange(1,1,1,lastCol).getValues()[0].map(normHeader_).filter(Boolean); if(!headers.length){ headers=Object.keys(obj); sh.getRange(1,1,1,headers.length).setValues([headers]); } sh.appendRow(headers.map(function(h){ return obj[h] !== undefined ? obj[h] : ''; })); }
function formByProgram_(rows){ var out={}; (rows||[]).forEach(function(r){ var slug=clean_(pick_(r,['programa_slug','slug']))||'*'; if(!out[slug]) out[slug]=[]; out[slug].push(r); }); return out; }
function include(filename){ return HtmlService.createHtmlOutputFromFile(filename).getContent(); }
