/**
 * Atlas Vivo MILK — correção oficial de assets e seres folclóricos.
 * Fonte única: pastas oficiais Drive.
 * Este ficheiro existe para corrigir a configuração antes do deploy, sem reescrever a Interface.
 *
 * REGRA OBRIGATÓRIA DE ASSETS:
 * Todos os assets públicos, dispositivos, MILKs e seres folclóricos devem ser PNG/WebP com fundo completamente transparente.
 * É proibido usar imagem com fundo branco, halo opaco, margem sólida, caixa visível ou recorte não transparente.
 * Antes de qualquer deploy, validar visualmente: transparência real, nome oficial, file_id, URL completa Drive e public_url.
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

function officialDriveViewUrl_(fileId) {
  return 'https://drive.google.com/file/d/' + fileId + '/view?usp=drivesdk';
}

function officialPublicAssetUrl_(fileId) {
  return 'https://lh3.googleusercontent.com/d/' + fileId;
}

function makeOfficialAsset_(slug, nome, fileId, pasta, tipo, funcao) {
  return {
    slug: slug,
    nome: nome,
    file_id: fileId,
    drive_url: officialDriveViewUrl_(fileId),
    public_url: officialPublicAssetUrl_(fileId),
    pasta_id: pasta,
    tipo: tipo,
    funcao: funcao || '',
    formato_obrigatorio: 'PNG/WebP com canal alfa',
    fundo_obrigatorio: 'completamente_transparente',
    proibido: 'fundo branco; halo opaco; margem sólida; caixa visível; recorte não transparente',
    validacao_pre_deploy: 'confirmar nome oficial, file_id, drive_url, public_url e transparência real antes de gerar GS/HTML'
  };
}

function getOfficialAssetManifest_() {
  return [
    makeOfficialAsset_('seal', 'ATLAS_VIVO_MILK.png', OFFICIAL_ASSET_IDS.seal, CONFIG.ASSETS_FOLDER_ID, 'selo', 'selo público e assinatura visual do Atlas'),
    makeOfficialAsset_('fuco', 'Fuco.png', OFFICIAL_ASSET_IDS.fuco, CONFIG.ASSETS_FOLDER_ID, 'dispositivo', 'Crónicas Cãotadas por Fucô'),
    makeOfficialAsset_('galeria', 'Galeria_Diletante.png', OFFICIAL_ASSET_IDS.galeria, CONFIG.ASSETS_FOLDER_ID, 'dispositivo', 'Galeria Diletante como motor palavra-imagem-bilhete'),
    makeOfficialAsset_('festival', 'dado_sem_lado_rosa.png', OFFICIAL_ASSET_IDS.festival, CONFIG.ASSETS_FOLDER_ID, 'dispositivo', 'Dado Sem Lado, jogo territorial e regra absurda'),
    makeOfficialAsset_('reizinho', 'Reizinho.png', OFFICIAL_ASSET_IDS.reizinho, CONFIG.ASSETS_FOLDER_ID, 'dispositivo', 'O Reizinho de sainha e coroa de sardinha'),
    makeOfficialAsset_('nuno', 'Nuno.png', OFFICIAL_ASSET_IDS.nuno, CONFIG.ASSETS_FOLDER_ID, 'escuta', 'escuta pública e recolha geral'),
    makeOfficialAsset_('escuta', 'Nuno.png', OFFICIAL_ASSET_IDS.escuta, CONFIG.ASSETS_FOLDER_ID, 'escuta', 'alias de Nuno para compatibilidade no HTML/GS'),
    makeOfficialAsset_('cow_base', 'vaquinha_constelacao_base.png', OFFICIAL_ASSET_IDS.cow_base, CONFIG.ASSETS_FOLDER_ID, 'milk', 'MILK base para convite territorial'),
    makeOfficialAsset_('cow_brilho', 'vaquinha_constelacao_brilho.png', OFFICIAL_ASSET_IDS.cow_brilho, CONFIG.ASSETS_FOLDER_ID, 'milk', 'MILK brilhante para nova crónica ou conteúdo recente'),
    makeOfficialAsset_('cow_destaque', 'vaquinha_constelacao_destaque.png', OFFICIAL_ASSET_IDS.cow_destaque, CONFIG.ASSETS_FOLDER_ID, 'milk', 'MILK em destaque para Galeria Diletante ou foco curatorial'),

    makeOfficialAsset_('alma_penada', 'Alma_penada.png', OFFICIAL_ASSET_IDS.alma_penada, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('fefe_felicidade', 'Fefe_Felicidade.PNG', OFFICIAL_ASSET_IDS.fefe_felicidade, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('cavalum', 'Cavalum.png', OFFICIAL_ASSET_IDS.cavalum, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('moura_encantada', 'Moura_encantada.png', OFFICIAL_ASSET_IDS.moura_encantada, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('sete_caras', 'Sete_caras.png', OFFICIAL_ASSET_IDS.sete_caras, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('menino_rio', 'Menino_rio.PNG', OFFICIAL_ASSET_IDS.menino_rio, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('xango', 'Xangó.png', OFFICIAL_ASSET_IDS.xango, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('gaizinho', 'Gaizinho.png', OFFICIAL_ASSET_IDS.gaizinho, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('oxala', 'Oxalá.png', OFFICIAL_ASSET_IDS.oxala, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('chorona', 'Chorona.png', OFFICIAL_ASSET_IDS.chorona, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('coca', 'Coca.png', OFFICIAL_ASSET_IDS.coca, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('olharao', 'Olharão.PNG', OFFICIAL_ASSET_IDS.olharao, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('lisbon_verde', 'lisbon_verde.png', OFFICIAL_ASSET_IDS.lisbon_verde, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('lobo_castanho', 'lobo_castanho.png', OFFICIAL_ASSET_IDS.lobo_castanho, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público'),
    makeOfficialAsset_('personagem_preto_chapeu', 'personagem_preto_chapeu.png', OFFICIAL_ASSET_IDS.personagem_preto_chapeu, CONFIG.FOLKLORE_FOLDER_ID, 'ser_folclorico', 'personagem/ser folclórico público')
  ];
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
    aplicacao: ['GS', 'HTML', 'Drive', 'GitHub', 'Apps Script', 'Interface pública']
  };
}
