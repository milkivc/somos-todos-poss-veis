/**
 * Atlas Vivo MILK — neutralização oficial do patch de runtime.
 * Este ficheiro permanece apenas para sobrescrever versões anteriores no Apps Script.
 * Não altera assets, não substitui imagens, não injeta CSS/JS e não interfere na Interface.html.
 * A correção oficial deve viver em Interface.html, Código.gs, Sheets e assets oficiais do Drive.
 */

var doGet_BASE_INTERFACE_RUNTIME_FIX_ = doGet;

doGet = function(e) {
  return doGet_BASE_INTERFACE_RUNTIME_FIX_(e);
};
