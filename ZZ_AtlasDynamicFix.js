/**
 * Atlas Vivo MILK — Correções dinâmicas sem alterar Interface.html.
 * Objetivo: ligar folhas curatoriais novas, PHOTOS_NUNO_A, falas, desafios e logs
 * preservando o desenho público, assets oficiais, MILKs, densidade e personagens.
 */

var NUNO_A_FOLDER_ID = '17Vv1flwF0CtULJTWAZI64Sa-kbFHdfsf';

var EXTRA_SHEETS = {
  COLECAO_FOTOS_NUNO_A: 'COLECAO_FOTOS_NUNO_A',
  ANEXOS_USUARIO: 'ANEXOS_USUARIO',
  FALAS_SERES: 'FALAS_SERES',
  DESAFIOS_SEMANAIS_ATLAS: 'DESAFIOS_SEMANAIS_ATLAS',
  BILHETES_CURATORIAIS_PUBLICOS: 'BILHETES_CURATORIAIS_PUBLICOS',
  DINAMICAS_PUBLICAS_ATLAS: 'DINAMICAS_PUBLICAS_ATLAS',
  GATILHOS_BILHETES_ACOES: 'GATILHOS_BILHETES_ACOES',
  ROTEIRO_CURATORIAL_DISPOSITIVOS: 'ROTEIRO_CURATORIAL_DISPOSITIVOS',
  BILHETES_LEITURA_MUNDO: 'BILHETES_LEITURA_MUNDO',
  MOTOR_CRONICAS_FUCO: 'MOTOR_CRONICAS_FUCO',
  REPERTORIO_TERRITORIAL_FREGUESIAS: 'REPERTORIO_TERRITORIAL_FREGUESIAS',
  LOG_GERACOES_PUBLICAS: 'LOG_GERACOES_PUBLICAS'
};

function safeReadSheetByName_(name) {
  try { return readSheet_(ss_(), name) || []; } catch (e) { return []; }
}

function getNunoAPhotos_() {
  var rows = safeReadSheetByName_(EXTRA_SHEETS.COLECAO_FOTOS_NUNO_A);
  var out = [];
  rows.forEach(function(r) {
    var id = fileId_(pick_(r, ['file_id','id','imagem_drive_id','url_drive','url']));
    var nome = clean_(pick_(r, ['nome_ficheiro','file_name','nome','titulo_curatorial']));
    if (!id && !nome) return;
    out.push({
      foto_id: clean_(pick_(r, ['foto_id'])) || ('NUNO_A_' + id),
      file_id: id,
      nome_ficheiro: nome,
      url_drive: clean_(pick_(r, ['url_drive'])) || (id ? 'https://drive.google.com/file/d/' + id + '/view?usp=drivesdk' : ''),
      url_publica_lh3: clean_(pick_(r, ['url_publica_lh3','url_publica','imagem_url'])) || (id ? img_(id) : ''),
      titulo_curatorial: clean_(pick_(r, ['titulo_curatorial','titulo'])) || nome,
      tema: clean_(pick_(r, ['tema'])) || 'galeria_diletante',
      palavras_ativadoras: clean_(pick_(r, ['palavras_ativadoras','palavras_chave'])) || 'rua; vestígio; erro; saudade; bairro',
      territorio_associado: clean_(pick_(r, ['territorio_associado','territorio','freguesia'])) || '',
      descricao_visual: clean_(pick_(r, ['descricao_visual','descricao'])) || '',
      bilhete_base: clean_(pick_(r, ['bilhete_base','bilhete'])) || 'A Galeria devolve uma imagem que não explica: desloca.',
      pergunta_base: clean_(pick_(r, ['pergunta_base','pergunta_convite','gatilho_reflexao'])) || 'Que palavra desta fotografia ainda não encontrou lugar no bairro?',
      credito: clean_(pick_(r, ['credito'])) || 'Nuno A',
      rights_statement: clean_(pick_(r, ['rights_statement','direitos'])) || 'http://rightsstatements.org/vocab/InC/1.0/',
      rosto_visivel: clean_(pick_(r, ['rosto_visivel'])) || 'A_VERIFICAR',
      ativo: !String(pick_(r, ['ativo','estado'])).match(/nao|não|false|0/i),
      uso_no_atlas: 'Galeria Diletante — coleção fotográfica autoral, separada de Nuno/Escuta'
    });
  });
  return out.filter(function(x){ return x.ativo && x.url_publica_lh3; });
}

function getFalasSeres_() {
  return safeReadSheetByName_(EXTRA_SHEETS.FALAS_SERES).filter(function(r){
    return !String(pick_(r, ['ativo','estado'])).match(/nao|não|false|0/i);
  }).map(function(r){
    return {
      fala_id: clean_(pick_(r, ['fala_id','id'])),
      personagem_id: clean_(pick_(r, ['personagem_id','personagem','slug'])) || '*',
      texto: clean_(pick_(r, ['texto','fala','mensagem'])),
      fonte: clean_(pick_(r, ['fonte'])) || 'sheet_oficial',
      autoral: clean_(pick_(r, ['autoral'])) || 'A_VERIFICAR',
      humor: clean_(pick_(r, ['humor'])) || 'absurdo_suave',
      faixa_etaria: clean_(pick_(r, ['faixa_etaria','etario'])) || 'todas',
      regra_cuidado: clean_(pick_(r, ['regra_cuidado'])) || ''
    };
  }).filter(function(x){ return x.texto; });
}

function getDesafiosSemanais_() {
  return safeReadSheetByName_(EXTRA_SHEETS.DESAFIOS_SEMANAIS_ATLAS).filter(function(r){
    return !String(pick_(r, ['ativo','estado'])).match(/nao|não|false|0/i);
  }).map(function(r){
    return {
      desafio_id: clean_(pick_(r, ['desafio_id','id'])),
      semana_iso: clean_(pick_(r, ['semana_iso','semana'])),
      programa_slug: clean_(pick_(r, ['programa_slug'])) || 'atlas',
      territorio: clean_(pick_(r, ['territorio','freguesia'])) || 'qualquer',
      texto_desafio: clean_(pick_(r, ['texto_desafio','desafio','texto'])),
      prova_esperada: clean_(pick_(r, ['prova_esperada'])),
      sem_rosto: clean_(pick_(r, ['sem_rosto'])) || 'SIM',
      faixa_etaria: clean_(pick_(r, ['faixa_etaria'])) || 'todas',
      regras_cuidado: clean_(pick_(r, ['regras_cuidado','regra_cuidado'])),
      validado_por: clean_(pick_(r, ['validado_por'])) || 'MILK'
    };
  }).filter(function(x){ return x.texto_desafio; });
}

function getRepertorioTerritorial_() {
  return safeReadSheetByName_(EXTRA_SHEETS.REPERTORIO_TERRITORIAL_FREGUESIAS).map(function(r){
    return {
      freguesia: clean_(pick_(r, ['freguesia'])),
      municipio: clean_(pick_(r, ['municipio','concelho'])),
      brincadeiras_tradicionais: clean_(pick_(r, ['brincadeiras_tradicionais'])),
      comida_raiz_documentada: clean_(pick_(r, ['comida_raiz_documentada'])),
      primeira_datacao_comida: clean_(pick_(r, ['primeira_datacao_comida'])),
      curiosidades_raras: clean_(pick_(r, ['curiosidades_raras'])),
      girias_ditos_expressoes: clean_(pick_(r, ['girias_ditos_expressoes'])),
      cheiros_materiais_sons: clean_(pick_(r, ['cheiros_materiais_sons'])),
      historias_absurdas_ou_engracadas: clean_(pick_(r, ['historias_absurdas_ou_engracadas'])),
      patrimonio_imaterial_associado: clean_(pick_(r, ['patrimonio_imaterial_associado'])),
      grau_confianca: clean_(pick_(r, ['grau_confianca'])) || 'baixo_ate_validar',
      publicavel: clean_(pick_(r, ['publicavel'])) || 'NAO_PUBLICAR_SEM_REVISAO'
    };
  }).filter(function(x){ return x.freguesia || x.municipio; });
}

function buildBilhetes_(points, personagens, publicacoes) {
  var out = [];
  safeReadSheetByName_(EXTRA_SHEETS.BILHETES_CURATORIAIS_PUBLICOS).forEach(function(r){
    var texto = clean_(pick_(r, ['texto','texto_modelo','bilhete','frase_bilhete']));
    if (texto) out.push({ origem: clean_(pick_(r, ['programa_slug','origem'])) || 'bilhete_curatorial', titulo: clean_(pick_(r, ['titulo','bilhete_slug'])) || 'Bilhete curatorial', texto: texto, pergunta: clean_(pick_(r, ['pergunta','pergunta_modelo','gatilho'])) });
  });
  safeReadSheetByName_(EXTRA_SHEETS.BILHETES_LEITURA_MUNDO).forEach(function(r){
    var texto = clean_(pick_(r, ['texto_modelo','texto','bilhete']));
    if (texto) out.push({ origem: clean_(pick_(r, ['programa_slug'])) || 'leitura_mundo', titulo: clean_(pick_(r, ['bilhete_slug','familia'])) || 'Leitura do mundo', texto: texto, pergunta: clean_(pick_(r, ['pergunta_modelo','pergunta'])) });
  });
  (points || []).forEach(function(p){ if (p.frase_bilhete || p.gatilho_reflexao) out.push({ origem:p.dispositivo_origem, titulo:p.titulo_publico, texto:p.frase_bilhete, pergunta:p.gatilho_reflexao, lat:p.lat, lng:p.lng }); });
  (personagens || []).forEach(function(p){ if (p.bilhete || p.pergunta_convite) out.push({ origem:'folclore', titulo:p.nome, texto:p.bilhete, pergunta:p.pergunta_convite, imagem_url:p.imagem_url }); });
  (publicacoes || []).forEach(function(p){ var b = clean_(pick_(p, ['frase_entrada','bilhete','bilhete_curatorial'])); if (b) out.push({ origem:'publicacao_editorial', titulo:clean_(pick_(p, ['titulo_publico','titulo'])), texto:b }); });
  return out;
}

function buildDevicePayloads_(points, personagens, editorial) {
  function by(origin){ return (points || []).filter(function(p){ return p.dispositivo_origem === origin || (origin === 'folclore' && p.tipo_entrada === 'personagem'); }); }
  return {
    galeria_diletante: by('galeria'),
    galeria_diletante_nuno_a: getNunoAPhotos_(),
    dado_sem_lado: by('festival'),
    desafios_semanais: getDesafiosSemanais_(),
    caotadas_fuco: by('caotadas'),
    cronicas_fuco_motor: safeReadSheetByName_(EXTRA_SHEETS.MOTOR_CRONICAS_FUCO),
    repertorio_territorial: getRepertorioTerritorial_(),
    reizinho_sainha: by('reizinho'),
    folclore_vivo: personagens || [],
    falas_seres: getFalasSeres_(),
    publicacoes: (editorial && editorial.publicacoes_editoriais) || [],
    gatilhos: (editorial && editorial.gatilhos_semanticos) || [],
    gatilhos_bilhetes_acoes: safeReadSheetByName_(EXTRA_SHEETS.GATILHOS_BILHETES_ACOES),
    dinamicas_publicas: safeReadSheetByName_(EXTRA_SHEETS.DINAMICAS_PUBLICAS_ATLAS),
    roteiro_curatorial: safeReadSheetByName_(EXTRA_SHEETS.ROTEIRO_CURATORIAL_DISPOSITIVOS)
  };
}

var buildPublicPayload_BASE_MILK_ = buildPublicPayload_;
buildPublicPayload_ = function() {
  var payload = buildPublicPayload_BASE_MILK_();
  var editorial = getEditorialPayload_();
  var personagens = payload.personagens || [];
  var points = payload.points || [];
  payload.fotos_nuno_a = getNunoAPhotos_();
  payload.falas_seres = getFalasSeres_();
  payload.desafios_semanais = getDesafiosSemanais_();
  payload.repertorio_territorial = getRepertorioTerritorial_();
  payload.bilhetes_curatoriais = buildBilhetes_(points, personagens, editorial.publicacoes_editoriais);
  payload.device_payloads = buildDevicePayloads_(points, personagens, editorial);
  payload.meta = payload.meta || {};
  payload.meta.dynamic_fix = 'ZZ_AtlasDynamicFix_2026_05_10';
  payload.meta.fotos_nuno_a_count = payload.fotos_nuno_a.length;
  payload.meta.falas_seres_count = payload.falas_seres.length;
  payload.meta.desafios_semanais_count = payload.desafios_semanais.length;
  payload.meta.repertorio_territorial_count = payload.repertorio_territorial.length;
  return payload;
};

var getHealthPayload_BASE_MILK_ = getHealthPayload_;
getHealthPayload_ = function() {
  var h = getHealthPayload_BASE_MILK_();
  h.fotos_nuno_a_count = getNunoAPhotos_().length;
  h.falas_seres_count = getFalasSeres_().length;
  h.desafios_semanais_count = getDesafiosSemanais_().length;
  h.repertorio_territorial_count = getRepertorioTerritorial_().length;
  h.dynamic_fix = 'ZZ_AtlasDynamicFix_2026_05_10';
  try { h.density_official_import = ensureOfficialDensityImported_(); } catch (e) { h.density_official_import = { ok:false, error:String(e && e.message || e) }; }
  return h;
};

var validateSubmission_BASE_MILK_ = validateSubmission_;
validateSubmission_ = function(p) {
  if (!p) throw new Error('Payload vazio');
  var age = normText_(p.age_band || p.idade_faixa || '');
  if (age === 'under_13' || age === 'menos_de_13' || age === 'menor_13') throw new Error('Menores de 13 anos não podem submeter diretamente.');
  if (!p.consent_internal) throw new Error('É necessário autorizar a receção interna e a revisão humana.');
  var txt = clean_(p.texto_principal || p.memory_text || p.titulo || p.frase_curta_publica || p.imagem_drive_id || p.audio_drive_id || p.anexo_id);
  if (!txt) throw new Error('Escreva ou indique o conteúdo que pretende partilhar.');
};

// DENSIDADE OFICIAL — INE 0011613 Censos 2021. Importa para DENSIDADE_DEMOGRAFICA sem inventar valores.
var DENSITY_OFFICIAL_CFG = {
  url: 'https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0011613&lang=PT',
  fonte: 'INE — Indicador 0011613 — Densidade populacional, Censos 2021',
  fonte_id: 'INE_0011613_CENSOS_2021',
  periodo: '2021'
};
function classifyOfficialDensity_(n){n=Number(n);if(!isFinite(n))return 'sem_dado';if(n<50)return 'baixa';if(n<150)return 'media_baixa';if(n<500)return 'media';if(n<1500)return 'alta';return 'muito_alta';}
function densityLight_(c){var m={sem_dado:['azul_frio','#6ecbff','pulso_lacuna'],baixa:['azul','#78d9ff','pulso_baixa'],media_baixa:['ciano_verde','#9cffb8','pulso_media_baixa'],media:['amarelo','#fff27a','pulso_media'],alta:['laranja','#ffb45c','pulso_alta'],muito_alta:['rosa_vermelho','#ff5f8f','pulso_muito_alta']};return m[c]||m.sem_dado;}
function normOfficial_(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
function numOfficial_(v){if(v===null||v===undefined||v==='')return '';var s=String(v).replace(/\s/g,'').replace(',','.');var n=Number(s);return isFinite(n)?n:'';}
function currentDensityRows_(){var sh=ss_().getSheetByName('DENSIDADE_DEMOGRAFICA');return sh?Math.max(0,sh.getLastRow()-1):0;}
function ensureOfficialDensityImported_(){var existing=currentDensityRows_();if(existing>1000)return {ok:true,status:'already_imported',rows:existing,source:DENSITY_OFFICIAL_CFG.fonte_id};return importOfficialDensityINE0011613_();}
function importOfficialDensityINE0011613_(){var base=safeReadSheetByName_('FREGUESIAS_BASE');if(base.length<1000)throw new Error('FREGUESIAS_BASE insuficiente para cruzamento oficial');var byCode={},byName={};base.forEach(function(r){var code=String(pick_(r,['codigo_freguesia','freguesia_id_oficial'])).replace(/\D/g,'');if(code.length<6)code=('000000'+code).slice(-6);var freg=clean_(pick_(r,['freguesia']));var mun=clean_(pick_(r,['municipio','concelho']));if(code)byCode[code]={code:code,freguesia:freg,municipio:mun};if(freg&&mun)byName[normOfficial_(freg+' '+mun)]={code:code,freguesia:freg,municipio:mun};});var res=UrlFetchApp.fetch(DENSITY_OFFICIAL_CFG.url,{muteHttpExceptions:true,followRedirects:true});if(res.getResponseCode()<200||res.getResponseCode()>=300)throw new Error('INE HTTP '+res.getResponseCode());var data=JSON.parse(res.getContentText('UTF-8'));var found={};function scan(x){if(!x)return;if(Array.isArray(x)){x.forEach(scan);return;}if(typeof x==='object'){var vals=[],ks=Object.keys(x);ks.forEach(function(k){var v=x[k];if(v!==null&&typeof v!=='object')vals.push(String(v));});var code='';vals.forEach(function(v){var m=String(v).match(/\b\d{6}\b/);if(m&&byCode[m[0]])code=m[0];});if(!code){var joined=normOfficial_(vals.join(' '));for(var nm in byName){if(joined.indexOf(nm)>=0){code=byName[nm].code;break;}}}var value='';ks.forEach(function(k){if(value===''){var nk=normOfficial_(k);if(nk.indexOf('valor')>=0||nk==='value'||nk.indexOf('obs_value')>=0)value=numOfficial_(x[k]);}});if(value===''){ks.forEach(function(k){if(value===''){var nk=normOfficial_(k);if(nk.indexOf('geo')<0&&nk.indexOf('cod')<0&&nk.indexOf('ano')<0&&nk.indexOf('period')<0){var n=numOfficial_(x[k]);if(n!==''&&n>=0&&n<50000)value=n;}}});}if(code&&value!==''&&!found[code])found[code]=value;ks.forEach(function(k){if(typeof x[k]==='object')scan(x[k]);});}}
scan(data);var rows=[];Object.keys(byCode).forEach(function(code){var b=byCode[code],dens=found[code],cls=classifyOfficialDensity_(dens),light=densityLight_(cls);if(dens!==undefined){rows.push(['PT-FREG-'+code,code,b.freguesia,b.municipio,'','',dens,cls,DENSITY_OFFICIAL_CFG.fonte,DENSITY_OFFICIAL_CFG.url,DENSITY_OFFICIAL_CFG.periodo,'ativo_densidade_oficial',light[0],light[2],'sim','sim','publico','validado_por_fonte_oficial','IMPORTADO_INE_0011613','Densidade demográfica oficial INE 0011613 ligada à MILK por classe de luz territorial.','MILK',Utilities.formatDate(new Date(),'Europe/Lisbon','yyyy-MM-dd HH:mm:ss'),DENSITY_OFFICIAL_CFG.fonte_id,'usar_classe_densidade_no_mapa']);}});if(rows.length<1000)throw new Error('Parser INE não confirmou granularidade suficiente: '+rows.length);var sh=ss_().getSheetByName('DENSIDADE_DEMOGRAFICA');var header=['territorio_id','freguesia_id_oficial','freguesia','municipio','populacao','area_km2','densidade_demografica','classe_densidade','fonte_populacao','url_fonte','data_fonte','estado_visual','luz_milk','efeito_luz','regra_anti_centralidade_famosa','silencio_lido_como_vestigio','visibilidade','validacao_humana','estado_importacao','observacao_curatorial','responsavel','data_importacao','hash_ou_id_fonte','proxima_acao'];sh.clearContents();sh.getRange(1,1,1,header.length).setValues([header]);for(var i=0;i<rows.length;i+=500)sh.getRange(i+2,1,Math.min(500,rows.length-i),header.length).setValues(rows.slice(i,i+500));try{ss_().getSheetByName('IMPORTACAO_TERRITORIAL_LOG').appendRow([new Date(),'DENSIDADE_OFICIAL_IMPORT',rows.length,DENSITY_OFFICIAL_CFG.fonte_id,DENSITY_OFFICIAL_CFG.url]);}catch(e){}return {ok:true,status:'imported',rows:rows.length,source:DENSITY_OFFICIAL_CFG.fonte_id};}

// DEPLOY_TRIGGER_DENSITY_OFFICIAL_2026_05_10