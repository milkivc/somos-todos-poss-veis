/**
 * Atlas Vivo MILK — correção oficial de assets e seres folclóricos.
 * Fonte única: pastas oficiais Drive.
 * Este ficheiro existe para corrigir a configuração antes do deploy, sem reescrever a Interface.
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

function getOfficialAssetManifest_() {
  return [
    { slug: 'seal', nome: 'ATLAS_VIVO_MILK.png', file_id: OFFICIAL_ASSET_IDS.seal, pasta: CONFIG.ASSETS_FOLDER_ID, tipo: 'selo' },
    { slug: 'fuco', nome: 'Fuco.png', file_id: OFFICIAL_ASSET_IDS.fuco, pasta: CONFIG.ASSETS_FOLDER_ID, tipo: 'dispositivo' },
    { slug: 'galeria', nome: 'Galeria_Diletante.png', file_id: OFFICIAL_ASSET_IDS.galeria, pasta: CONFIG.ASSETS_FOLDER_ID, tipo: 'dispositivo' },
    { slug: 'festival', nome: 'dado_sem_lado_rosa.png', file_id: OFFICIAL_ASSET_IDS.festival, pasta: CONFIG.ASSETS_FOLDER_ID, tipo: 'dispositivo' },
    { slug: 'reizinho', nome: 'Reizinho.png', file_id: OFFICIAL_ASSET_IDS.reizinho, pasta: CONFIG.ASSETS_FOLDER_ID, tipo: 'dispositivo' },
    { slug: 'nuno', nome: 'Nuno.png', file_id: OFFICIAL_ASSET_IDS.nuno, pasta: CONFIG.ASSETS_FOLDER_ID, tipo: 'escuta' },
    { slug: 'cow_base', nome: 'vaquinha_constelacao_base.png', file_id: OFFICIAL_ASSET_IDS.cow_base, pasta: CONFIG.ASSETS_FOLDER_ID, tipo: 'milk' },
    { slug: 'cow_brilho', nome: 'vaquinha_constelacao_brilho.png', file_id: OFFICIAL_ASSET_IDS.cow_brilho, pasta: CONFIG.ASSETS_FOLDER_ID, tipo: 'milk' },
    { slug: 'cow_destaque', nome: 'vaquinha_constelacao_destaque.png', file_id: OFFICIAL_ASSET_IDS.cow_destaque, pasta: CONFIG.ASSETS_FOLDER_ID, tipo: 'milk' },
    { slug: 'alma_penada', nome: 'Alma_penada.png', file_id: OFFICIAL_ASSET_IDS.alma_penada, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'fefe_felicidade', nome: 'Fefe_Felicidade.PNG', file_id: OFFICIAL_ASSET_IDS.fefe_felicidade, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'cavalum', nome: 'Cavalum.png', file_id: OFFICIAL_ASSET_IDS.cavalum, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'moura_encantada', nome: 'Moura_encantada.png', file_id: OFFICIAL_ASSET_IDS.moura_encantada, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'sete_caras', nome: 'Sete_caras.png', file_id: OFFICIAL_ASSET_IDS.sete_caras, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'menino_rio', nome: 'Menino_rio.PNG', file_id: OFFICIAL_ASSET_IDS.menino_rio, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'xango', nome: 'Xangó.png', file_id: OFFICIAL_ASSET_IDS.xango, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'gaizinho', nome: 'Gaizinho.png', file_id: OFFICIAL_ASSET_IDS.gaizinho, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'oxala', nome: 'Oxalá.png', file_id: OFFICIAL_ASSET_IDS.oxala, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'chorona', nome: 'Chorona.png', file_id: OFFICIAL_ASSET_IDS.chorona, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'coca', nome: 'Coca.png', file_id: OFFICIAL_ASSET_IDS.coca, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'olharao', nome: 'Olharão.PNG', file_id: OFFICIAL_ASSET_IDS.olharao, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'lisbon_verde', nome: 'lisbon_verde.png', file_id: OFFICIAL_ASSET_IDS.lisbon_verde, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'lobo_castanho', nome: 'lobo_castanho.png', file_id: OFFICIAL_ASSET_IDS.lobo_castanho, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' },
    { slug: 'personagem_preto_chapeu', nome: 'personagem_preto_chapeu.png', file_id: OFFICIAL_ASSET_IDS.personagem_preto_chapeu, pasta: CONFIG.FOLKLORE_FOLDER_ID, tipo: 'ser_folclorico' }
  ];
}

function getOfficialFolkloreManifest_() {
  return getOfficialAssetManifest_().filter(function (x) { return x.tipo === 'ser_folclorico'; });
}
