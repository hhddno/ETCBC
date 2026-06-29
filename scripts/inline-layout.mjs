/**
 * Inline header, footer, domain cards, reviews and gallery into HTML
 * so crawlers and no-JS users see full content.
 * Run: node scripts/inline-layout.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const SITE = {
  name: 'ETCBC',
  fullName: 'Entreprise Turpin Construction Bois Charpente',
  owner: 'Hadrien Turpin',
  siret: '931 522 700 00018',
  phone: '06 19 85 61 22',
  phoneLink: 'tel:+33619856122',
  email: 'contact@etcbc-charpente.com',
  address: '210 route du parc naturel',
  city: '24630 Jumilhac-le-Grand',
  logo: 'images/logo.png',
  logoFallback: 'images/logo.webp',
};

const NAV_ITEMS = [
  { href: '/', label: 'Accueil' },
  { href: '/charpente', label: 'Charpente' },
  { href: '/amenagement-combles', label: 'Combles' },
  { href: '/construction-bois', label: 'Construction bois' },
  { href: '/couverture', label: 'Couverture' },
  { href: '/menuiseries', label: 'Menuiseries' },
  { href: '/realisations', label: 'Nos réalisations' },
  { href: '/contact', label: 'Contact' },
];

const DOMAINS = [
  {
    id: 'charpente',
    title: 'Charpente',
    href: '/charpente',
    image: 'images/gallery/realisation-10.webp',
    intro: 'Fabrication, pose, rénovation et modification de charpentes pour le neuf comme la rénovation.',
    skills: ['Charpentes traditionnelles', 'Fermettes & lamellé-collé', 'Carports, hauts-vents & terrasses', 'Aménagement de combles'],
    cta: 'Découvrir la charpente',
  },
  {
    id: 'amenagement-combles',
    title: 'Aménagement de combles',
    href: '/amenagement-combles',
    image: 'images/gallery/realisation-11.webp',
    intro: "Transformation de combles en espaces habitables, en partenariat avec Combles d'en France.",
    skills: ['Étude de faisabilité', 'Renforcement de charpente', 'Poutre espace', 'Fermettes & combles perdus'],
    cta: "Découvrir l'aménagement de combles",
  },
  {
    id: 'construction-bois',
    title: 'Construction bois',
    href: '/construction-bois',
    image: 'images/gallery/realisation-18.webp',
    intro: 'Maisons à ossature bois, extensions et surélévations réalisées sur mesure.',
    skills: ['Maisons ossature bois', 'Agrandissements & extensions', 'Surélévation de bâtiments', 'Construction clé en main'],
    cta: 'Découvrir la construction bois',
  },
  {
    id: 'couverture',
    title: 'Couverture',
    href: '/couverture',
    image: 'images/gallery/realisation-06.webp',
    intro: 'Création et rénovation de toitures avec des matériaux durables et esthétiques.',
    skills: ['Tuiles mécaniques & plates', 'Ardoise & zinc', 'Bac acier', 'Rénovation complète de toiture'],
    cta: 'Découvrir la couverture',
  },
  {
    id: 'menuiseries',
    title: 'Menuiseries',
    href: '/menuiseries',
    image: 'images/gallery/realisation-04.webp',
    intro: "Menuiseries sur mesure en bois pour l'intérieur comme l'extérieur.",
    skills: ['Fenêtres & portes', 'Escaliers & aménagements', 'Terrasses en bois', 'Ouvrages extérieurs'],
    cta: 'Découvrir les menuiseries',
  },
];

const REVIEWS = [
  { name: 'Stephanie Marchal', text: "Notre maçon et nous avons eu raison de faire confiance à M. Turpin ! Très bon travail sur cette pose de charpente pour réaliser une toiture au dessus de notre terrasse. Malgré la distance (travaux dans le dpt 77) tout s'est parfaitement déroulé. Il ne reste plus qu'à poser les tuiles !" },
  { name: 'Machiel Mathijssen', text: "Hadrien a fait un travail fantastique pour l'aménagement de nos combles. Non seulement il réfléchit avec vous et donne d'excellents conseils, mais il respecte aussi vos idées. Professionnel jusqu'au bout des doigts, toujours ponctuel et fiable. Nous le recommandons sans aucun doute !" },
  { name: 'mélanie Renard', text: "Hadrien est un professionnel d'expérience qui sait s'adapter à la complexité du chantier. Nous le recommandons à la fois pour son professionnalisme, son sens de l'esthétique, son sérieux. Les délais ont été respectés, le chantier toujours laissé propre. Merci pour notre belle toiture." },
  { name: 'Dimitri Maris', text: "Merci à Hadrien pour la réalisation de la nouvelle couverture de notre maison. L'ensemble du chantier s'est déroulé de la meilleure des manières malgré la météo. La réalisation de la toiture a été parfaite. Nous recommandons avec plaisir ETCBC à toute personne qui aurait besoin d'un bon charpentier couvreur." },
  { name: 'Clémentine Bert', text: "Hadrien est intervenu pour reprendre notre charpente. Il est d'excellent conseil, honnête, ses prix sont justes et son travail fait avec passion. Nous sommes très satisfait de sa façon de travailler et du résultat obtenu. Nous recommandons chaudement cette entreprise." },
  { name: 'Joël LIVYNS', text: 'Très bon travail à un prix raisonnable.' },
  { name: 'Elevage de La Note Feutrée', text: "Travail de qualité et entreprise sérieuse ! Hadrien Turpin est un charpentier d'expérience, aussi efficace que passionné. Ses devis sont techniquement détaillés, expliqués et transparents. Les prix sont justes et le travail fait dans les délais. Je recommande." },
  { name: 'Pierre VROOM', text: "Professionnel, sérieux et fiable. Contact humain très agréable. Nous avons fait refaire notre toit de hangar et le travail est excellent. Nous recommandons l'entreprise ETCBC et surtout Hadrien Turpin." },
];

const PAGES = [
  { file: 'index.html', path: '/' },
  { file: 'charpente.html', path: '/charpente' },
  { file: 'amenagement-combles.html', path: '/amenagement-combles' },
  { file: 'construction-bois.html', path: '/construction-bois' },
  { file: 'couverture.html', path: '/couverture' },
  { file: 'menuiseries.html', path: '/menuiseries' },
  { file: 'realisations.html', path: '/realisations' },
  { file: 'contact.html', path: '/contact' },
  { file: 'mentions-legales.html', path: '/mentions-legales' },
];

function renderHeader(currentPath) {
  const navLinks = NAV_ITEMS.map(
    (item) => `<a href="${item.href}" class="${currentPath === item.href ? 'active' : ''}">${item.label}</a>`
  ).join('');

  return `
    <header class="site-header" id="siteHeader">
      <div class="header-layout">
        <a href="/" class="site-logo" aria-label="Accueil ETCBC">
          <img src="${SITE.logo}" alt="${SITE.fullName}" width="160" height="184" onerror="this.onerror=null;this.src='${SITE.logoFallback}'">
        </a>
        <div class="header-aside">
          <div class="header-content">
            <div class="header-top">
              <a href="${SITE.phoneLink}" class="header-phone" aria-label="Appeler ${SITE.phone}">
                <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>${SITE.phone}</span>
              </a>
              <a href="/contact" class="btn btn-primary header-cta">Devis gratuit</a>
            </div>
            <nav class="header-nav" id="navbar" aria-label="Navigation principale">
              <div class="nav-links" id="navLinks">${navLinks}</div>
              <button class="nav-toggle" id="navToggle" aria-label="Ouvrir le menu" aria-expanded="false" type="button">
                <span></span><span></span><span></span>
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div class="nav-overlay" id="navOverlay"></div>
    </header>`;
}

function renderFooter() {
  const year = new Date().getFullYear();
  const serviceLinks = DOMAINS.map((d) => `<a href="${d.href}">${d.title}</a>`).join('');

  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="${SITE.logo}" alt="${SITE.name}" width="80" height="92" onerror="this.onerror=null;this.src='${SITE.logoFallback}'">
            <p><strong>${SITE.fullName}</strong><br>${SITE.owner}<br>SIRET : ${SITE.siret}</p>
            <p style="margin-top:0.75rem">Charpente · Combles · Construction bois · Couverture · Menuiseries<br>${SITE.address} — ${SITE.city}</p>
          </div>
          <div class="footer-links">
            <h4>Services</h4>
            ${serviceLinks}
          </div>
          <div class="footer-links">
            <h4>Navigation</h4>
            <a href="/">Accueil</a>
            <a href="/realisations">Nos réalisations</a>
            <a href="/contact">Contact</a>
          </div>
          <div class="footer-links">
            <h4>Contact</h4>
            <a href="${SITE.phoneLink}">${SITE.phone}</a>
            <a href="mailto:${SITE.email}" style="display:block;margin-top:0.35rem">${SITE.email}</a>
            <p style="margin-top:0.5rem">${SITE.address}<br>${SITE.city}</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${year} ${SITE.name} — ${SITE.fullName}</span>
          <a href="/mentions-legales">Mentions légales &amp; confidentialité</a>
        </div>
      </div>
    </footer>
    <div class="floating-cta">
      <a href="${SITE.phoneLink}" class="phone-btn" aria-label="Appeler">&#9742;</a>
      <a href="#" class="top-btn" id="backToTop" aria-label="Retour en haut">&#8593;</a>
    </div>`;
}

function renderDomains() {
  return DOMAINS.map(
    (d) => `
    <article class="domain-card reveal" id="domain-${d.id}">
      <div class="domain-card-image">
        <img src="${d.image}" alt="${d.title} — ETCBC Jumilhac-le-Grand" width="600" height="280" loading="lazy">
        <span class="domain-card-tag">${d.title}</span>
      </div>
      <div class="domain-card-body">
        <h3>${d.title}</h3>
        <p class="domain-intro">${d.intro}</p>
        <ul class="domain-skills">
          ${d.skills.map((s) => `<li>${s}</li>`).join('')}
        </ul>
        <a href="${d.href}" class="btn btn-primary">${d.cta}</a>
      </div>
    </article>`
  ).join('');
}

function renderReviews() {
  const cards = REVIEWS.map(
    (r) => `
      <div class="review-card">
        <div class="review-card-inner">
          <p class="review-text">${r.text}</p>
          <div class="review-author">
            <div class="review-author-info">
              <div class="name">${r.name}</div>
              <div class="source">Avis Google</div>
            </div>
          </div>
        </div>
      </div>`
  ).join('');

  const dots = REVIEWS.map((_, i) => `<button type="button" data-index="${i}" class="${i === 0 ? 'active' : ''}" aria-label="Avis ${i + 1}"></button>`).join('');

  return `
    <section class="reviews" id="avis">
      <div class="container">
        <div class="reviews-header reveal">
          <div class="section-title" style="text-align:left;margin:0">
            <h2>Les avis de nos clients</h2>
            <div class="accent-line" style="margin-left:0"></div>
          </div>
          <div class="reviews-score">
            <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span class="score">5.0</span>
            <span style="color:var(--text-light)">(${REVIEWS.length} avis Google)</span>
          </div>
        </div>
        <div class="reviews-slider reveal">
          <div class="reviews-track" id="reviewsTrack">${cards}</div>
          <div class="reviews-nav">
            <button type="button" id="reviewPrev" aria-label="Avis précédent">&#8592;</button>
            <div class="reviews-dots" id="reviewDots">${dots}</div>
            <button type="button" id="reviewNext" aria-label="Avis suivant">&#8594;</button>
          </div>
        </div>
      </div>
    </section>`;
}

function renderGallery(photos) {
  return photos
    .map(
      (p) => `
      <div class="gallery-item reveal" data-category="${p.category}">
        <img src="${p.file}" alt="${p.alt}" width="400" height="300" loading="lazy">
        <div class="gallery-item-overlay"><span>${p.label}</span></div>
      </div>`
    )
    .join('');
}

const SKIP_LINK = '<a class="skip-link" href="#main-content">Aller au contenu principal</a>';

for (const page of PAGES) {
  const filePath = path.join(root, page.file);
  let html = fs.readFileSync(filePath, 'utf8');

  const header = renderHeader(page.path);
  const footer = renderFooter();

  html = html.replace(/<div id="site-header">[\s\S]*?<\/div>\s*(?=<main)/, `<div id="site-header">${header}</div>\n\n  `);
  html = html.replace(/<div id="site-footer">[\s\S]*?<\/div>\s*(?=<script)/, `<div id="site-footer">${footer}</div>\n  `);

  if (!html.includes('skip-link')) {
    html = html.replace('<body>', `<body>\n  ${SKIP_LINK}`);
  }

  if (!html.includes('id="main-content"')) {
    html = html.replace('<main>', '<main id="main-content">');
  }

  if (page.file === 'index.html') {
    html = html.replace(
      /<div class="domains-grid" id="domainsGrid">[\s\S]*?<\/div>/,
      `<div class="domains-grid" id="domainsGrid">${renderDomains()}</div>`
    );
    html = html.replace(
      /<div id="site-reviews">[\s\S]*?<\/div>\s*\n\s*<section class="zone"/,
      `<div id="site-reviews">${renderReviews()}</div>\n\n    <section class="zone"`
    );
  }

  if (page.file === 'realisations.html') {
    const photos = JSON.parse(fs.readFileSync(path.join(root, 'data/gallery.json'), 'utf8'));
    html = html.replace(
      /<div class="gallery-grid" id="galleryGrid">[\s\S]*?<\/div>/,
      `<div class="gallery-grid" id="galleryGrid">${renderGallery(photos)}</div>`
    );
  }

  fs.writeFileSync(filePath, html);
  console.log('Updated', page.file);
}

console.log('Static layout inlined.');
