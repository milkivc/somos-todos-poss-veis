# Auditoria de execução segura — Atlas Vivo MILK

Data: 2026-05-16
Repositório: milkivc/somos-todos-poss-veis
Modo: ação não destrutiva, sem alteração de Interface.html, Código.js ou appsscript.json.

## 1. Estado confirmado

Foi confirmado que o repositório público oficial acessível é `milkivc/somos-todos-poss-veis`, com permissões administrativas e de escrita disponíveis para a conta ligada.

Ficheiros estruturais encontrados no repositório:

- `Código.js`
- `Interface.html`
- `appsscript.json`
- `.github/workflows/deploy-appscript.yml`
- ficheiros auxiliares `ZZ_Atlas*.js`

## 2. O que não foi alterado

Não foi feita alteração em:

- `Interface.html`
- `Código.js`
- `appsscript.json`
- ficheiros `ZZ_Atlas*.js`
- workflow de deploy

Razão: o problema relatado pelo utilizador é de autorização OAuth/Google Apps Script, não de interface visual. Alterar HTML ou backend sem confirmar o ponto exato de falha criaria risco de regressão.

## 3. Causa técnica isolada

O workflow `.github/workflows/deploy-appscript.yml` executa:

```bash
clasp push --force
clasp run executarImportacaoDensidadeOficialAtlas
clasp run verificarDensidadeOficialAtlas
clasp deploy --deploymentId ...
```

As chamadas `clasp run` exigem que a conta Google ligada ao Apps Script tenha autorizado os escopos OAuth pedidos no `appsscript.json`.

O manifesto atual pede os seguintes escopos:

```json
[
  "https://www.googleapis.com/auth/script.external_request",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.readonly"
]
```

Portanto, quando o Apps Script mostra a mensagem “A execução deste projeto requer acesso à sua Conta Google. Tente novamente e permita o acesso desta vez”, isso significa que a autorização OAuth ainda não foi concluída para a conta executora. O GitHub não consegue ultrapassar essa autorização por código sem credenciais OAuth válidas.

## 4. Decisão de não regressão

A ação correta não é continuar a “tentar” funções aleatórias dentro do Apps Script. A autorização deve ser resolvida uma única vez, pela rota oficial de OAuth, ou o workflow deve ser ajustado futuramente para separar:

1. push de ficheiros;
2. execução de funções que exigem autorização;
3. deploy do Web App.

Essa separação evita que uma falha de autorização numa função auxiliar bloqueie todo o deploy.

## 5. Próxima ação segura recomendada

Executar uma das duas rotas abaixo, sem mexer na interface:

### Rota A — autorização manual única no Apps Script

1. Abrir o projeto no Apps Script.
2. Escolher uma função simples que use os mesmos serviços, por exemplo `getHealthPayload_` não aparece no seletor por ser privada, então usar uma função pública de diagnóstico se existir.
3. Clicar em Executar.
4. Clicar em Rever autorização.
5. Escolher a conta Google correta.
6. Abrir “Avançado”, se surgir aviso de app não verificada.
7. Permitir os escopos pedidos.
8. Só depois executar novamente o deploy pelo GitHub.

### Rota B — endurecimento do workflow

Criar uma alteração futura no workflow para que `clasp push --force` e `clasp deploy` possam correr separados de `clasp run executarImportacaoDensidadeOficialAtlas` e `clasp run verificarDensidadeOficialAtlas`.

Essa rota reduz bloqueios e evita perda de tempo quando o problema é autorização e não código.

## 6. Critério de encerramento

A ação só deve ser considerada concluída quando:

- o Apps Script aceitar os escopos OAuth sem novo pedido de autorização;
- `clasp push --force` concluir;
- `clasp deploy` atualizar o Web App;
- `?r=health` devolver JSON válido;
- `?r=bootstrap` devolver JSON válido;
- a interface pública abrir sem erro;
- nenhuma alteração visual não solicitada tiver sido introduzida.

## 7. Proibição operacional

Não substituir `Interface.html` nem `Código.js` por versões novas enquanto o bloqueio atual for de OAuth/autorização. Isso não resolveria a autorização e poderia destruir estado visual ou funcional já existente.
