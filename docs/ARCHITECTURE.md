# Notes techniques

Site statique multi-pages, même logique que les autres sites Bulle : HTML + `css/styles.css` + modules dans `js/`.

## Galerie

Les réalisations sont dans `data/realisations.json`. `realisations.html` filtre par catégorie côté client sans backend.

## SEO

`js/seo.js` injecte le JSON-LD (LocalBusiness, FAQ, fil d'Ariane) et les canonicals. URL de base dans la constante `SITE` de `js/main.js`.

## Contact

FormSubmit vers `contact@etcbc-charpente.com`. Pas de base de données.

## Infra

`vercel.json` : `cleanUrls`, redirects `.html` → sans extension, cache long sur `/fonts` et `/images`. CSP `frame-ancestors` pour l'embed depuis bulletonsite.com.

Scripts Node dans `scripts/` : polices, images (sharp), patch des liens internes.
