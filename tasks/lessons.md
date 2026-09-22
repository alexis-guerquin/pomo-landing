# Leçons

## 2026-09-22

- Préserver les modifications non liées déjà présentes dans le dépôt et limiter les changements à la page de suppression de compte et à son routage.
- Le pré-rendu doit inclure explicitement chaque URL publique ; `/delete-account` est donc ajouté à `prerender.mjs` et au sitemap, puis vérifié par `npm run build`.
