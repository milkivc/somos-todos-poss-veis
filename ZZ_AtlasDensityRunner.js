/**
 * Atlas Vivo MILK — Importador final de densidade oficial a partir da folha RAW INE.
 * Não expõe dados sensíveis. Escreve somente dados públicos oficiais no Sheets.
 * FORCE_WORKFLOW_TRIGGER_2026_05_11_A
 */
function importOfficialDensityINE0011613_() {
  var ss = ss_();
  var base = safeReadSheetByName_('FREGUESIAS_BASE');
  if (!base || base.length < 1000) throw new Error('FREGUESIAS_BASE insuficiente');
  var rawSheet = ss.getSheetByName('INE_0011613_RAW_IMPORT_20260504');
  if (!rawSheet) throw new Error('INE_0011613_RAW_IMPORT_20260504 ausente');
  var last = rawSheet.getLastRow();
  if (last < 1000) throw new Error('RAW INE insuficiente');
  var raw = rawSheet.getRange(1, 1, last, 1).getValues().map(function(r){ return String(r[0] || ''); });
  var found = {};
  var rec = {};
  function flush() {
    if (rec.geocod && rec.valor !== undefined && (rec.dim_3 === 'T' || rec.dim_3_t === 'HM')) found[rec.geocod] = rec.valor;
    rec = {};
  }
  raw.forEach(function(line){
    var m;
    if ((m = line.match(/geocod\s*:\s*"([0-9]{6})"/))) rec.geocod = m[1];
    else if ((m = line.match(/geodsg\s*:\s*"([^"]*)/))) rec.geodsg = m[1];
    else if ((m = line.match(/dim_3\s*:\s*"([^"]*)"/))) rec.dim_3 = m[1];
    else if ((m = line.match(/dim_3_t\s*:\s*"([^"]*)"/))) rec.dim_3_t = m[1];
    else if ((m = line.match(/valor\s*:\s*"?([0-9]+(?:[\.,][0-9]+)?)/))) { rec.valor = Number(m[1].replace(',', '.')); flush(); }
    else if (line.trim() === '}') flush();
  });
  var rows = [];
  base.forEach(function(r){
    var freg = clean_(pick_(r, ['freguesia']));
    var mun = clean_(pick_(r, ['municipio','concelho']));
    var code = String(pick_(r, ['codigo_freguesia','freguesia_id_oficial']) || '').replace(/\D/g, '');
    if (!freg || !code) return;
    if (code.length < 6) code = ('000000' + code).slice(-6);
    var dens = found[code];
    var cls = classifyOfficialDensity_(dens);
    var light = densityLight_(cls);
    rows.push(['PT-FREG-' + code, code, freg, mun, '', '', dens === undefined ? '' : dens, cls, 'INE — Indicador 0011613 — Densidade populacional, Censos 2021', 'https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0011613&lang=PT', '2021', 'ativo_densidade_oficial', light[0], light[2], 'sim','sim','publico','validado_por_fonte_oficial', dens === undefined ? 'SEM_DADO_INE_0011613' : 'IMPORTADO_INE_0011613_RAW', 'Densidade demográfica oficial INE 0011613 ligada à MILK por classe de luz territorial.', 'MILK', Utilities.formatDate(new Date(), 'Europe/Lisbon', 'yyyy-MM-dd HH:mm:ss'), 'INE_0011613_CENSOS_2021_RAW_SHEET', dens === undefined ? 'verificar_correspondencia_codigo' : 'usar_classe_densidade_no_mapa']);
  });
  var sh = ss.getSheetByName('DENSIDADE_DEMOGRAFICA');
  var header = ['territorio_id','freguesia_id_oficial','freguesia','municipio','populacao','area_km2','densidade_demografica','classe_densidade','fonte_populacao','url_fonte','data_fonte','estado_visual','luz_milk','efeito_luz','regra_anti_centralidade_famosa','silencio_lido_como_vestigio','visibilidade','validacao_humana','estado_importacao','observacao_curatorial','responsavel','data_importacao','hash_ou_id_fonte','proxima_acao'];
  sh.clearContents();
  sh.getRange(1, 1, 1, header.length).setValues([header]);
  for (var i = 0; i < rows.length; i += 500) sh.getRange(i + 2, 1, Math.min(500, rows.length - i), header.length).setValues(rows.slice(i, i + 500));
  var okRows = rows.filter(function(x){ return x[6] !== ''; }).length;
  try { ss.getSheetByName('IMPORTACAO_TERRITORIAL_LOG').appendRow([new Date(),'DENSIDADE_OFICIAL_IMPORT_RAW_SHEET',rows.length,okRows,'INE_0011613_CENSOS_2021_RAW_SHEET']); } catch(e) {}
  return { ok: okRows > 1000, status: 'imported_from_raw_sheet', rows: rows.length, matched: okRows, source: 'INE_0011613_CENSOS_2021_RAW_SHEET' };
}

function executarImportacaoDensidadeOficialAtlas() { return importOfficialDensityINE0011613_(); }
function verificarDensidadeOficialAtlas() {
  var sh = ss_().getSheetByName('DENSIDADE_DEMOGRAFICA');
  var last = sh ? sh.getLastRow() : 0;
  if (!sh || last < 2) return { ok:false, rows:0 };
  var vals = sh.getRange(2, 8, last - 1, 1).getValues();
  var counts = { sem_dado:0, baixa:0, media_baixa:0, media:0, alta:0, muito_alta:0, total:last-1 };
  vals.forEach(function(r){ var c = String(r[0] || 'sem_dado'); if (counts[c] === undefined) counts[c] = 0; counts[c]++; });
  return { ok: last > 1000, rows:last - 1, classes:counts };
}
