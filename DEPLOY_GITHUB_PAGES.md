# Publicação da V4.3 no GitHub Pages

**Atenção:** a V3 permanece publicada até que você faça o merge da V4.3 na `main` e o workflow de deploy conclua.

## 1. Faça o teste local

```powershell
npm install
npm run typecheck
npm run test
npm run build
npm run dev
```

Se algum comando falhar, corrija antes de publicar.

## 2. Preserve a V3 e publique o código em uma branch

No clone do repositório `MarceloFraitag/meu-portifolio`, com a V3 em `main`:

```powershell
git switch main
git pull origin main
git tag backup-v3-pre-v4.3
git push origin backup-v3-pre-v4.3
git switch -c portfolio-v4.3
```

Copie o **conteúdo interno** desta pasta para a raiz do repositório, substituindo os arquivos antigos. Não copie a pasta `node_modules` nem `dist`. Remova da branch os arquivos legados da V3 que não fazem parte da V4.3 (preservados na tag).

```powershell
git add -A
git commit -m "V4.3 - Portfolio profissional com cursos"
git push -u origin portfolio-v4.3
```

Abra um Pull Request `portfolio-v4.3` -> `main`, aguarde o workflow de validação e revise a prévia local antes do merge.

## 3. Configure Pages

No GitHub: Settings > Pages > Build and deployment > Source: **GitHub Actions**.

Depois de aprovado, faça o merge. O workflow `Deploy Portfolio V4.3` executará `typecheck`, testes, build e publicação. Acompanhe em Actions.

Endereço esperado: https://marcelofraitag.github.io/meu-portifolio/

## 4. Observações

- O Vite está configurado com `base: '/meu-portifolio/'`.
- Verifique as permissões de acesso aos certificados do Google Drive e a exposição de dados pessoais.
- Links e formulários externos precisam ser testados na publicação real.
- Se o build falhar, o workflow não publicará a V4.3.
- Para reverter, restaure a tag `backup-v3-pre-v4.3` em uma branch e faça um novo PR.
