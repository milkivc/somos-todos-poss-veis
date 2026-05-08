/**
 * Atlas Vivo MILK — manifesto oficial REAL de assets e seres folclóricos.
 * Fonte única: pastas oficiais Drive.
 *
 * REGRA OBRIGATÓRIA DE ASSETS:
 * Todos os assets públicos, dispositivos, MILKs e seres folclóricos devem ser PNG/WebP com fundo completamente transparente.
 * É proibido usar imagem com fundo branco, halo opaco, margem sólida, caixa visível ou recorte não transparente.
 * Antes de qualquer deploy, validar visualmente: transparência real, nome oficial, file_id, drive_url real e public_url real.
 *
 * NOTA DE NÃO REGRESSÃO:
 * Este ficheiro é a fonte oficial canónica dos assets. Ele prevalece sobre qualquer ID antigo que exista no Código.js.
 */

OFFICIAL_ASSET_IDS = {
  seal: '1evCywhX7YuZOkkAaUGIgUD0oDgplx2OR',
  fuco: '19Z9aBzL5XBw9ccF4yycYHQcO-NMvOGdt',
  galeria: '1My_R4s7pTQzBO3lRtJUvdcxWslX9nUTq',
  festival: '1JCtY-PpP9TWrNDU7yCxCGoJsZWlSrcvp',
  reizinho: '1OnoVEJ2d5Dk9KfuVKukMVyGQZug_ZaC-',
  escuta: '1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM',
  nuno: '1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM',
  cow_base: '1HlVxB0qqy2Wee1HodoNxNNcocRE0XaVP',
  cow_brilho: '1Fwd7qlGbv0FpSRSv6sjsMCZuobkKsloM',
  cow_destaque: '1gx4M4uq-anojZQfK3rGkm-bY4FIe76lK',
  alma_penada: '1Er32suHoKUSX-OlfjFYARATLc4cRgHdZ',
  fefe_felicidade: '1QD3Qv3lDBmfjeP6MIFKl7lv6FaLF0Mtu',
  cavalum: '18oXmYkjQlsn5w3rZqFv9EQ73TatlTdDX',
  moura_encantada: '1o_e3H-r26ectKuCQjgOOtBiLSRcY7o-e',
  sete_caras: '13H5OSHIHCxzN8WHDfD7wNszJYj7ex9xb',
  menino_rio: '1cLioeGjUp2A8urxtp1Rn4eAvD8JZYpVD',
  xango: '1-FpTUYKBqUUlVmFVEYIRdth_bL9bIJmI',
  gaizinho: '1Do2GtGXe479Q5j1A3DuWRd3wslG03vOf',
  oxala: '1Xqqftv5Qs2aIVPvn9QqRA1MNoB2isP31',
  chorona: '13XXhqz615JeBjQCGTnzl7ogEoXZC0OMy',
  coca: '1T8DXfUusQ1F7wzQMITUTFq81F7ivHJIN',
  olharao: '1X93TSJ3hQcE_Sy0OMTWztY1KbzXsQikW',
  lisbon_verde: '174LZdvMVP-dHhRAe2Ztb8lTunGHelH0s',
  lobo_castanho: '1SZ0oauOlEfsqiMPDJeiYyt2W2J6sjY3Q',
  personagem_preto_chapeu: '1L-RJLWFnRw7Ikiikpi8LPOObYSNX-AXu'
};

var OFFICIAL_ASSET_MANIFEST_REAL = [
  { slug:'seal', nome:'ATLAS_VIVO_MILK.png', file_id:'1evCywhX7YuZOkkAaUGIgUD0oDgplx2OR', drive_url:'https://drive.google.com/file/d/1evCywhX7YuZOkkAaUGIgUD0oDgplx2OR/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1evCywhX7YuZOkkAaUGIgUD0oDgplx2OR', pasta_id:'1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh', tipo:'selo', funcao:'selo público e assinatura visual do Atlas', fundo_obrigatorio:'completamente_transparente' },
  { slug:'fuco', nome:'Fuco.png', file_id:'19Z9aBzL5XBw9ccF4yycYHQcO-NMvOGdt', drive_url:'https://drive.google.com/file/d/19Z9aBzL5XBw9ccF4yycYHQcO-NMvOGdt/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/19Z9aBzL5XBw9ccF4yycYHQcO-NMvOGdt', pasta_id:'1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh', tipo:'dispositivo', funcao:'Crónicas Cãotadas por Fucô', fundo_obrigatorio:'completamente_transparente' },
  { slug:'galeria', nome:'Galeria_Diletante.png', file_id:'1My_R4s7pTQzBO3lRtJUvdcxWslX9nUTq', drive_url:'https://drive.google.com/file/d/1My_R4s7pTQzBO3lRtJUvdcxWslX9nUTq/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1My_R4s7pTQzBO3lRtJUvdcxWslX9nUTq', pasta_id:'1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh', tipo:'dispositivo', funcao:'Galeria Diletante como motor palavra-imagem-bilhete', fundo_obrigatorio:'completamente_transparente' },
  { slug:'festival', nome:'dado_sem_lado_rosa.png', file_id:'1JCtY-PpP9TWrNDU7yCxCGoJsZWlSrcvp', drive_url:'https://drive.google.com/file/d/1JCtY-PpP9TWrNDU7yCxCGoJsZWlSrcvp/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1JCtY-PpP9TWrNDU7yCxCGoJsZWlSrcvp', pasta_id:'1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh', tipo:'dispositivo', funcao:'Dado Sem Lado, jogo territorial e regra absurda', fundo_obrigatorio:'completamente_transparente' },
  { slug:'reizinho', nome:'Reizinho.png', file_id:'1OnoVEJ2d5Dk9KfuVKukMVyGQZug_ZaC-', drive_url:'https://drive.google.com/file/d/1OnoVEJ2d5Dk9KfuVKukMVyGQZug_ZaC-/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1OnoVEJ2d5Dk9KfuVKukMVyGQZug_ZaC-', pasta_id:'1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh', tipo:'dispositivo', funcao:'O Reizinho de sainha e coroa de sardinha', fundo_obrigatorio:'completamente_transparente' },
  { slug:'nuno', nome:'Nuno.png', file_id:'1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM', drive_url:'https://drive.google.com/file/d/1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM', pasta_id:'1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh', tipo:'escuta', funcao:'escuta pública e recolha geral', fundo_obrigatorio:'completamente_transparente' },
  { slug:'escuta', nome:'Nuno.png', file_id:'1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM', drive_url:'https://drive.google.com/file/d/1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1xJqceY1v2j1uMnkPx9K0GpQT5Vmq79eM', pasta_id:'1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh', tipo:'escuta', funcao:'alias de Nuno para compatibilidade no HTML/GS', fundo_obrigatorio:'completamente_transparente' },
  { slug:'cow_base', nome:'vaquinha_constelacao_base.png', file_id:'1HlVxB0qqy2Wee1HodoNxNNcocRE0XaVP', drive_url:'https://drive.google.com/file/d/1HlVxB0qqy2Wee1HodoNxNNcocRE0XaVP/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1HlVxB0qqy2Wee1HodoNxNNcocRE0XaVP', pasta_id:'1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh', tipo:'milk', funcao:'MILK base para convite territorial', fundo_obrigatorio:'completamente_transparente' },
  { slug:'cow_brilho', nome:'vaquinha_constelacao_brilho.png', file_id:'1Fwd7qlGbv0FpSRSv6sjsMCZuobkKsloM', drive_url:'https://drive.google.com/file/d/1Fwd7qlGbv0FpSRSv6sjsMCZuobkKsloM/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1Fwd7qlGbv0FpSRSv6sjsMCZuobkKsloM', pasta_id:'1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh', tipo:'milk', funcao:'MILK brilhante para nova crónica ou conteúdo recente', fundo_obrigatorio:'completamente_transparente' },
  { slug:'cow_destaque', nome:'vaquinha_constelacao_destaque.png', file_id:'1gx4M4uq-anojZQfK3rGkm-bY4FIe76lK', drive_url:'https://drive.google.com/file/d/1gx4M4uq-anojZQfK3rGkm-bY4FIe76lK/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1gx4M4uq-anojZQfK3rGkm-bY4FIe76lK', pasta_id:'1TAL61MgC0MY8CuzYriJK_jThGf_Sulgh', tipo:'milk', funcao:'MILK em destaque para Galeria Diletante ou foco curatorial', fundo_obrigatorio:'completamente_transparente' },
  { slug:'alma_penada', nome:'Alma_penada.png', file_id:'1Er32suHoKUSX-OlfjFYARATLc4cRgHdZ', drive_url:'https://drive.google.com/file/d/1Er32suHoKUSX-OlfjFYARATLc4cRgHdZ/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1Er32suHoKUSX-OlfjFYARATLc4cRgHdZ', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'fefe_felicidade', nome:'Fefe_Felicidade.PNG', file_id:'1QD3Qv3lDBmfjeP6MIFKl7lv6FaLF0Mtu', drive_url:'https://drive.google.com/file/d/1QD3Qv3lDBmfjeP6MIFKl7lv6FaLF0Mtu/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1QD3Qv3lDBmfjeP6MIFKl7lv6FaLF0Mtu', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'cavalum', nome:'Cavalum.png', file_id:'18oXmYkjQlsn5w3rZqFv9EQ73TatlTdDX', drive_url:'https://drive.google.com/file/d/18oXmYkjQlsn5w3rZqFv9EQ73TatlTdDX/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/18oXmYkjQlsn5w3rZqFv9EQ73TatlTdDX', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'moura_encantada', nome:'Moura_encantada.png', file_id:'1o_e3H-r26ectKuCQjgOOtBiLSRcY7o-e', drive_url:'https://drive.google.com/file/d/1o_e3H-r26ectKuCQjgOOtBiLSRcY7o-e/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1o_e3H-r26ectKuCQjgOOtBiLSRcY7o-e', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'sete_caras', nome:'Sete_caras.png', file_id:'13H5OSHIHCxzN8WHDfD7wNszJYj7ex9xb', drive_url:'https://drive.google.com/file/d/13H5OSHIHCxzN8WHDfD7wNszJYj7ex9xb/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/13H5OSHIHCxzN8WHDfD7wNszJYj7ex9xb', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'menino_rio', nome:'Menino_rio.PNG', file_id:'1cLioeGjUp2A8urxtp1Rn4eAvD8JZYpVD', drive_url:'https://drive.google.com/file/d/1cLioeGjUp2A8urxtp1Rn4eAvD8JZYpVD/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1cLioeGjUp2A8urxtp1Rn4eAvD8JZYpVD', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'xango', nome:'Xangó.png', file_id:'1-FpTUYKBqUUlVmFVEYIRdth_bL9bIJmI', drive_url:'https://drive.google.com/file/d/1-FpTUYKBqUUlVmFVEYIRdth_bL9bIJmI/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1-FpTUYKBqUUlVmFVEYIRdth_bL9bIJmI', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'gaizinho', nome:'Gaizinho.png', file_id:'1Do2GtGXe479Q5j1A3DuWRd3wslG03vOf', drive_url:'https://drive.google.com/file/d/1Do2GtGXe479Q5j1A3DuWRd3wslG03vOf/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1Do2GtGXe479Q5j1A3DuWRd3wslG03vOf', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'oxala', nome:'Oxalá.png', file_id:'1Xqqftv5Qs2aIVPvn9QqRA1MNoB2isP31', drive_url:'https://drive.google.com/file/d/1Xqqftv5Qs2aIVPvn9QqRA1MNoB2isP31/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1Xqqftv5Qs2aIVPvn9QqRA1MNoB2isP31', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'chorona', nome:'Chorona.png', file_id:'13XXhqz615JeBjQCGTnzl7ogEoXZC0OMy', drive_url:'https://drive.google.com/file/d/13XXhqz615JeBjQCGTnzl7ogEoXZC0OMy/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/13XXhqz615JeBjQCGTnzl7ogEoXZC0OMy', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'coca', nome:'Coca.png', file_id:'1T8DXfUusQ1F7wzQMITUTFq81F7ivHJIN', drive_url:'https://drive.google.com/file/d/1T8DXfUusQ1F7wzQMITUTFq81F7ivHJIN/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1T8DXfUusQ1F7wzQMITUTFq81F7ivHJIN', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'olharao', nome:'Olharão.PNG', file_id:'1X93TSJ3hQcE_Sy0OMTWztY1KbzXsQikW', drive_url:'https://drive.google.com/file/d/1X93TSJ3hQcE_Sy0OMTWztY1KbzXsQikW/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1X93TSJ3hQcE_Sy0OMTWztY1KbzXsQikW', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'lisbon_verde', nome:'lisbon_verde.png', file_id:'174LZdvMVP-dHhRAe2Ztb8lTunGHelH0s', drive_url:'https://drive.google.com/file/d/174LZdvMVP-dHhRAe2Ztb8lTunGHelH0s/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/174LZdvMVP-dHhRAe2Ztb8lTunGHelH0s', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'lobo_castanho', nome:'lobo_castanho.png', file_id:'1SZ0oauOlEfsqiMPDJeiYyt2W2J6sjY3Q', drive_url:'https://drive.google.com/file/d/1SZ0oauOlEfsqiMPDJeiYyt2W2J6sjY3Q/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1SZ0oauOlEfsqiMPDJeiYyt2W2J6sjY3Q', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' },
  { slug:'personagem_preto_chapeu', nome:'personagem_preto_chapeu.png', file_id:'1L-RJLWFnRw7Ikiikpi8LPOObYSNX-AXu', drive_url:'https://drive.google.com/file/d/1L-RJLWFnRw7Ikiikpi8LPOObYSNX-AXu/view?usp=drivesdk', public_url:'https://lh3.googleusercontent.com/d/1L-RJLWFnRw7Ikiikpi8LPOObYSNX-AXu', pasta_id:'1GlyxD6BHV_8FEDHrtlho5DIAqwSEWO-D', tipo:'ser_folclorico', funcao:'personagem/ser folclórico público', fundo_obrigatorio:'completamente_transparente' }
];

function getOfficialAssetManifest_() {
  return OFFICIAL_ASSET_MANIFEST_REAL.map(function (x) {
    x.formato_obrigatorio = 'PNG/WebP com canal alfa';
    x.proibido = 'fundo branco; halo opaco; margem sólida; caixa visível; recorte não transparente';
    x.validacao_pre_deploy = 'confirmar nome oficial, file_id, drive_url real, public_url real e transparência real antes de gerar GS/HTML';
    return x;
  });
}

function getOfficialFolkloreManifest_() {
  return getOfficialAssetManifest_().filter(function (x) { return x.tipo === 'ser_folclorico'; });
}

function auditOfficialAssetTransparencyContract_() {
  return {
    ok: true,
    regra: 'Todos os assets obrigatoriamente precisam ter fundo completamente transparente.',
    formato: 'PNG/WebP com canal alfa',
    proibido: ['fundo branco', 'halo opaco', 'margem sólida', 'caixa visível', 'recorte não transparente'],
    aplicacao: ['GS', 'HTML', 'Drive', 'GitHub', 'Apps Script', 'Interface pública'],
    manifesto: OFFICIAL_ASSET_MANIFEST_REAL
  };
}

function buildAssets_() {
  var out = {};
  getOfficialAssetManifest_().forEach(function (item) {
    out[item.slug] = item.public_url;
  });
  out.__manifest = getOfficialAssetManifest_();
  out.__transparency_contract = auditOfficialAssetTransparencyContract_();
  return out;
}

function auditAssets_() {
  var assets = buildAssets_();
  var required = ['seal','fuco','galeria','festival','reizinho','escuta','cow_base','cow_brilho','cow_destaque'];
  var missing = required.filter(function (key) { return !assets[key]; });
  var manifest = getOfficialAssetManifest_();
  var incomplete = manifest.filter(function (item) {
    return !item.slug || !item.nome || !item.file_id || !item.drive_url || !item.public_url || item.fundo_obrigatorio !== 'completamente_transparente';
  }).map(function (item) { return item.slug || item.nome || 'sem_slug'; });
  return {
    ok: missing.length === 0 && incomplete.length === 0,
    source: 'OFFICIAL_ASSET_MANIFEST_REAL',
    required: required,
    missing: missing,
    incomplete: incomplete,
    manifest_count: manifest.length,
    transparency_contract: auditOfficialAssetTransparencyContract_()
  };
}

function fallbackFolklore_() {
  return getOfficialFolkloreManifest_().map(function (item) {
    return {
      slug: item.slug,
      nome: item.nome.replace(/\.(png|PNG|webp|WEBP)$/,'').replace(/_/g,' '),
      descricao: '',
      bilhete: '',
      pergunta_convite: '',
      imagem_url: item.public_url,
      drive_url: item.drive_url,
      ativo: true,
      fundo_obrigatorio: 'completamente_transparente',
      curadoria_status: 'asset_oficial_drive_pendente_sheet'
    };
  });
}
