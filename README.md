# Pocha

Site vitrine de Pocha, le minuteur Pomodoro au capybara. La version française est servie sur [pomocha.fr](https://www.pomocha.fr/) et la version anglaise sur [/en](https://www.pomocha.fr/en).

```sh
npm ci
npm run dev
npm run lint
npm run build
```

Le build pré-rend les pages et leurs métadonnées en français et en anglais. Le sitemap généré dans `dist/sitemap.xml` utilise les URL du routeur et les captures décrites dans `src/config/landing.ts`. Le build vérifie les réécritures Vercel et la présence des images du sitemap.

Les pages d’assistance, de contact, de confidentialité, de conditions, de mentions légales, de suppression de compte et les règles de la communauté gardent leurs URL françaises. Les pages équivalentes en anglais sont sous `/en`.

L’icône officielle vient de la fiche Apple 6802377633. Les captures iPhone et Mac proviennent des interfaces Pocha, les images de présentation iPhone des fiches publiques App Store France et États-Unis, et l’aperçu web du dépôt portfolio. Les boucles de la mascotte proviennent du dépôt web `pomo`. Les liens et descriptions publics sont dans `public/llms.txt`.
