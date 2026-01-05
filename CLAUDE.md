# Documentation CLAUDE - Pomocha Landing Page

## 📋 Vue d'ensemble du projet

**Pomocha Landing** est le site vitrine de l'application Pomocha.io - une application Pomodoro gamifiée avec système de récompenses et statistiques.

- 🌐 **Production** : [pomocha.fr](https://pomocha.fr)
- 🎯 **App principale** : [pomocha.io](https://pomocha.io)
- 🚀 **Stack** : React 19 + TypeScript + Vite 7
- 📦 **Déploiement** : Vercel

---

## 🏗️ Architecture du Code

### Structure des dossiers

```
src/
├── components/          # Composants réutilisables
│   ├── CharacterReveal/ # Système de grattage de personnage
│   ├── CTASection/      # Call-to-action
│   ├── Footer/          # Pied de page
│   ├── HeroSection/     # Section héro de la landing
│   ├── LanguageSwitcher/# Sélecteur de langue
│   ├── MiniFeature/     # Cards de fonctionnalités
│   ├── Navbar/          # Navigation principale
│   ├── ScrollToTop/     # Bouton retour en haut
│   ├── SEO/             # Composants SEO
│   └── ui/              # Composants UI génériques
│       ├── 3DButton/    # Bouton 3D stylisé
│       └── ScratchToReveal/ # Canvas de grattage
├── pages/               # Pages de l'application
│   ├── about/           # Page À propos
│   ├── blog/            # Blog et articles
│   │   ├── articles/    # Articles individuels
│   │   ├── ArticlePage.tsx
│   │   └── BlogPage.tsx
│   ├── features/        # Pages de fonctionnalités
│   │   ├── PomodoroTimerPage.tsx
│   │   ├── MotivationRewardsPage.tsx
│   │   └── FocusStatisticsPage.tsx
│   ├── use-cases/       # Pages cas d'usage
│   │   ├── StudentsPage.tsx
│   │   └── FreelancersPage.tsx
│   └── LandingPage.tsx  # Page d'accueil
├── layouts/             # Layouts de pages
│   └── PageLayout/      # Layout principal avec header/footer
├── contexts/            # Contextes React
│   └── I18nContext.tsx  # Gestion i18n
├── hooks/               # Hooks personnalisés
│   ├── use-outside-click.ts
│   ├── usePageMeta.ts   # Gestion des meta tags
│   ├── useSmoothScroll.ts
│   └── useStructuredData.ts
├── i18n/                # Internationalisation
│   ├── blogs/           # Traductions des articles
│   │   ├── bestPomodoroApps/
│   │   ├── bestPomodoroOnline/
│   │   ├── en.ts        # Index anglais
│   │   └── fr.ts        # Index français
│   └── translations.ts  # Toutes les traductions
├── config/              # Fichiers de configuration
│   ├── features.config.ts
│   ├── mini-features.config.ts
│   └── seo.config.ts
├── styles/              # Styles globaux
│   └── variables.css    # Variables CSS
├── lib/                 # Utilitaires
│   └── utils.ts
└── types/               # Déclarations TypeScript
    └── lenis.d.ts
```

---

## 🌍 Système d'Internationalisation (i18n)

### Architecture i18n

Le projet utilise un système i18n personnalisé avec React Context.

#### 1. Context Provider (`I18nContext.tsx`)

```typescript
// Structure du contexte
type I18nContextType = {
  locale: Locale;           // 'fr' | 'en'
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;       // Objet de traductions typé
};

// Fonctionnalités
- Détection automatique de la langue du navigateur
- Persistance dans localStorage (clé: 'pomocha-locale')
- Mise à jour de l'attribut lang du HTML
- Hook useI18n() pour accéder aux traductions
```

#### 2. Structure des traductions (`i18n/translations.ts`)

```typescript
export const translations = {
  fr: {
    seo: { ... },              // Métadonnées SEO
    pages: { ... },            // Contenu des pages
    components: { ... },       // Textes des composants
    features: { ... },         // Configuration des fonctionnalités
    miniFeatures: { ... },     // Mini-features
  },
  en: { 
    // Structure identique en anglais
  }
};

export type Locale = 'fr' | 'en';
export type TranslationKeys = typeof translations.fr;
```

#### 3. Utilisation dans les composants

```typescript
// Dans n'importe quel composant
import { useI18n } from '../contexts/I18nContext';

function MyComponent() {
  const { t, locale, setLocale } = useI18n();
  
  return (
    <div>
      <h1>{t.pages.about.h1}</h1>
      <p>{t.pages.about.intro}</p>
      <button onClick={() => setLocale('en')}>
        {t.components.languageSwitcher.switchToEnglish}
      </button>
    </div>
  );
}
```

#### 4. Traductions des articles de blog

Les articles ont leurs propres fichiers de traduction :

```
i18n/blogs/
├── bestPomodoroApps/
│   ├── en.ts
│   └── fr.ts
├── bestPomodoroOnline/
│   ├── en.ts
│   └── fr.ts
├── en.ts  # Index qui exporte blogTranslations
└── fr.ts  # Index qui exporte blogTranslations
```

Structure d'un article de blog :

```typescript
export const bestPomodoroApps = {
  slug: 'best-pomodoro-apps-2025',
  title: 'Les meilleures applications Pomodoro en 2025',
  description: 'Comparatif complet...',
  date: '2025-01-22',
  readTime: '15 min',
  image: '/blog/pomocha-1.png',
  intro: 'Introduction...',
  tocTitle: 'Table des matières',
  sections: {
    whatIsPomodoro: {
      title: 'Qu\'est-ce que la technique Pomodoro ?',
      content1: '...',
    },
    // ... autres sections
  },
  apps: [
    {
      name: 'Pomocha',
      tagline: 'Le Pomodoro gamifié...',
      bestFor: 'Gamification & motivation',
      platform: 'Web',
      free: true,
      standoutFeature: 'Système de badges',
      description: '...',
      whoItsFor: '...',
      pros: ['...'],
      cons: ['...'],
      pricing: 'Gratuit / Premium 4.99€/mois',
      images: [
        { src: '/blog/pomocha-1.png', alt: 'Interface Pomocha' }
      ]
    }
  ]
};
```

---

## 📝 Système d'Articles de Blog

### Architecture du blog

#### 1. Page de liste (`BlogPage.tsx`)

- Affiche la liste de tous les articles
- Récupère les données depuis `t.pages.blog.articles`
- Cards cliquables avec image, titre, description, date, temps de lecture

#### 2. Page d'article (`ArticlePage.tsx`)

**Mapping des articles** :
```typescript
const articleComponents: { [key: string]: React.ComponentType } = {
  bestPomodoroOnline: BestPomodoroOnlineArticle,
  bestPomodoroApps: BestPomodoroAppsArticle,
  // Ajouter ici les nouveaux articles
};
```

**Routing dynamique** :
- URL : `/blog/:slug`
- Le slug est récupéré depuis les traductions
- Recherche l'article correspondant dans `t.pages.blog.articles`
- Affiche le composant associé

#### 3. Composants d'article (`articles/*.tsx`)

**Structure type d'un article** :

```typescript
export function BestPomodoroAppsArticle() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocItems, setTocItems] = useState<TableOfContentItem[]>([]);
  
  useEffect(() => {
    // Générer la table des matières
    // Observer les sections pour la navigation
  }, [t]);
  
  return (
    <div className="blog-article-container">
      {/* Sidebar avec table des matières */}
      <aside className="blog-toc">
        <nav className="blog-toc__nav">
          {/* Liste des sections avec détection de la section active */}
        </nav>
      </aside>
      
      {/* Contenu de l'article */}
      <article className="blog-article">
        <div className="blog-article__meta">
          <time dateTime="...">{date}</time>
        </div>
        
        <div className="blog-article__content">
          {/* Sections avec IDs pour la navigation */}
          <section id="what-is-pomodoro" className="blog-section">
            <h2>{t.pages.blog.articles.bestPomodoroApps.sections.whatIsPomodoro.title}</h2>
            <p>{t.pages.blog.articles.bestPomodoroApps.sections.whatIsPomodoro.content1}</p>
          </section>
          
          {/* Autres sections */}
        </div>
      </article>
    </div>
  );
}
```

**Fonctionnalités des articles** :
- ✅ Table des matières avec navigation smooth scroll
- ✅ Détection de la section active (IntersectionObserver)
- ✅ Sections avec IDs uniques
- ✅ Styles dédiés (`Article.css`)
- ✅ Support des images
- ✅ Support des tableaux comparatifs
- ✅ Liste pros/cons pour chaque app
- ✅ Responsive (sidebar → mobile menu)

### Ajouter un nouvel article

**Étapes** :

1. **Créer les traductions** :
```typescript
// src/i18n/blogs/nomArticle/fr.ts
export const nomArticle = {
  slug: 'slug-de-l-article',
  title: 'Titre de l\'article',
  description: 'Description courte',
  date: '2025-01-22',
  readTime: '10 min',
  image: '/blog/image.png',
  intro: 'Introduction...',
  sections: {
    section1: {
      title: 'Titre section 1',
      content: '...'
    }
  }
};

// src/i18n/blogs/nomArticle/en.ts
// Version anglaise
```

2. **Exporter dans l'index** :
```typescript
// src/i18n/blogs/fr.ts
import { nomArticle } from './nomArticle/fr';

export const blogTranslations = {
  articles: {
    nomArticle,
    // ... autres articles
  }
};
```

3. **Créer le composant** :
```typescript
// src/pages/blog/articles/NomArticle.tsx
export function NomArticleComponent() {
  const { t } = useI18n();
  // ... Structure similaire aux autres articles
}
```

4. **Ajouter au mapping** :
```typescript
// src/pages/blog/ArticlePage.tsx
const articleComponents = {
  nomArticle: NomArticleComponent,
  // ... autres
};
```

5. **Ajouter à la liste du blog** :
```typescript
// src/pages/blog/BlogPage.tsx
const articles = [
  {
    slug: t.pages.blog.articles.nomArticle.slug,
    title: t.pages.blog.articles.nomArticle.title,
    // ...
  }
];
```

---

## 🎨 Composants Clés

### PageLayout

Layout principal qui wrap toutes les pages :

```typescript
<PageLayout
  htmlTitle="Titre pour <title>"
  metaDescription="Description meta"
  h1="Titre principal H1"
  intro="Paragraphe d'introduction"
>
  {children}
</PageLayout>
```

**Fonctionnalités** :
- Navbar responsive
- Footer
- Meta tags SEO (via usePageMeta)
- Structure sémantique HTML5

### HeroSection

Section héro de la landing page avec :
- Animation Framer Motion
- Tagline, titre, description, CTA
- Badges de disponibilité
- Images responsive

### CharacterReveal

Composant interactif de grattage :
- Canvas HTML5 pour l'effet scratch
- Révèle un personnage caché
- Animation et tracking du scratch
- Tooltip d'aide

### MiniFeature

Cards de fonctionnalités avec :
- Image
- Titre et description
- Liste d'items
- Bouton CTA
- Animation au hover

---

## 🔍 SEO et Meta Tags

### Hook usePageMeta

Gère dynamiquement les meta tags :

```typescript
usePageMeta({
  title: 'Titre de la page',
  description: 'Description',
  ogTitle: 'Titre Open Graph',
  ogDescription: 'Description OG',
  ogImage: 'https://pomocha.fr/pomocha-og.png',
  ogUrl: 'https://pomocha.fr',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  keywords: 'pomodoro, productivité, focus',
  canonicalUrl: 'https://pomocha.fr'
});
```

**Meta tags générés** :
- Title tag
- Description
- Keywords
- Canonical URL
- Open Graph (og:title, og:description, og:image, og:url, og:type)
- Twitter Card (twitter:card, twitter:title, twitter:description, twitter:image)

### Configuration SEO

`src/config/seo.config.ts` contient les valeurs par défaut pour chaque page.

---

## 🎯 Routing

### Structure des routes

```typescript
// src/App.tsx
<Routes>
  <Route path="/" element={<LandingPage />} />
  
  {/* Features */}
  <Route path="/features/pomodoro-timer" element={<PomodoroTimerPage />} />
  <Route path="/features/rewards-system" element={<MotivationRewardsPage />} />
  <Route path="/features/statistics" element={<FocusStatisticsPage />} />
  
  {/* Use Cases */}
  <Route path="/use-cases/students" element={<StudentsPage />} />
  <Route path="/use-cases/freelancers" element={<FreelancersPage />} />
  
  {/* About & Blog */}
  <Route path="/about" element={<AboutPage />} />
  <Route path="/blog" element={<BlogPage />} />
  <Route path="/blog/:slug" element={<ArticlePage />} />
</Routes>
```

### Lazy Loading

Toutes les pages sont chargées en lazy avec `React.lazy()` pour optimiser le LCP.

```typescript
const LandingPage = lazy(() => import('./pages/LandingPage'));
```

---

## ⚡ Optimisations Performance

### Build & Bundling

**Code splitting manuel** (vite.config.ts) :
```typescript
manualChunks: {
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-motion': ['framer-motion'],
}
```

### CSS Non-bloquant

Plugin Vite custom qui transforme les `<link rel="stylesheet">` en `<link rel="preload">` avec fallback :

```html
<link rel="preload" as="style" href="style.css" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="style.css"></noscript>
```

### Assets

- Inline des assets < 4KB
- Compression des images
- Lazy loading des images avec `loading="lazy"`
- Fonts préchargées

---

## 🛠️ Développement

### Commandes

```bash
npm run dev      # Serveur de développement (port 5173)
npm run build    # Build de production
npm run preview  # Preview du build
npm run lint     # Linter ESLint
```

### Scripts utilitaires

- `extract-translations.js` : Extraction des traductions
- `extract-blog-translations.js` : Extraction des traductions de blog

### Conventions de code

1. **Composants** : PascalCase, un composant par dossier avec index.ts
2. **Fichiers CSS** : Nom du composant (ex: `Navbar.css`)
3. **Hooks** : Préfixe `use` (ex: `usePageMeta`)
4. **Types** : Interfaces en PascalCase
5. **Variables CSS** : Préfixe `--theme-` ou `--color-`

---

## 📦 Dépendances Principales

| Package | Version | Usage |
|---------|---------|-------|
| react | 19.2.0 | Framework UI |
| react-router-dom | 7.10.1 | Routing |
| framer-motion | 12.23.26 | Animations |
| lenis | 1.3.16 | Smooth scroll |
| @vercel/analytics | 1.6.1 | Analytics |
| vite | 7.2.4 | Build tool |
| typescript | 5.9.3 | Type checking |

---

## 🚀 Déploiement

### Vercel

Configuration dans `vercel.json` :
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Variables d'environnement

Aucune variable d'environnement requise pour le build.

---

## 📚 Ressources

- **Repository** : [GitHub/pomocha]
- **Production** : [pomocha.fr](https://pomocha.fr)
- **App** : [pomocha.io](https://pomocha.io)
- **Design System** : Variables CSS dans `src/styles/variables.css`

---

## 🐛 Résolution de problèmes courants

### HMR ne fonctionne pas

Le contexte I18n exporte un hook (`useI18n`) ce qui peut casser le Fast Refresh. C'est normal et déclenche un page reload.

### Les traductions ne se mettent pas à jour

Vérifier :
1. Le fichier de traduction est bien importé
2. L'export est ajouté dans l'index (`fr.ts` ou `en.ts`)
3. La structure de l'objet correspond à l'accès (`t.pages.blog...`)

### Le routing d'article ne fonctionne pas

Vérifier :
1. Le slug dans la traduction
2. Le composant est ajouté au mapping dans `ArticlePage.tsx`
3. L'article est dans la liste de `BlogPage.tsx`

---

**Dernière mise à jour** : Janvier 2025

