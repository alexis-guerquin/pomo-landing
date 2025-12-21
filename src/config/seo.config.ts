/**
 * Configuration SEO centralisée pour Pomocha
 * Expert Google SEO - Optimisation des balises title et meta description
 */

export const SEO_CONFIG = {
  baseUrl: 'https://pomocha.fr',
  siteName: 'Pomocha',
  defaultTitle: 'Pomocha – App Pomodoro avec récompenses et statistiques',
  titleTemplate: '%s | Pomocha',
  
  defaultDescription:
    'Transformez votre concentration en progression avec Pomocha : minuteur Pomodoro, missions quotidiennes, badges, trophées et statistiques de focus.',
  
  defaultKeywords: [
    'Pomodoro',
    'minuteur Pomodoro',
    'technique Pomodoro',
    'productivité',
    'concentration',
    'focus',
    'deep work',
    'récompenses',
    'gamification',
    'statistiques',
    'temps de travail',
    'gestion du temps',
    'application Pomodoro',
    'timer Pomodoro',
    'Pomocha',
  ],

  defaultImage: '/pomocha-og.png',
  
  social: {
    twitter: '@pomocha', // À remplacer par votre handle Twitter
    // facebook: 'pomocha',
    // instagram: 'pomocha',
  },

  organization: {
    name: 'Pomocha',
    logo: '/logo.png',
    description:
      'Application de minuteur Pomodoro avec gamification et statistiques pour améliorer la productivité et la concentration',
  },
};

/**
 * Meta tags optimisés pour chaque page
 * Structure: [Route]: { title, description, keywords, ogImage }
 */
export const PAGE_SEO = {
  home: {
    title: 'Pomocha – App Pomodoro avec récompenses et statistiques | Focus & Productivité',
    description:
      'Transformez votre concentration en progression avec Pomocha : minuteur Pomodoro, missions quotidiennes, badges, trophées et statistiques de focus. Idéal pour étudiants, freelances et créateurs.',
    keywords: [
      ...SEO_CONFIG.defaultKeywords,
      'app étudiants',
      'app freelances',
      'missions quotidiennes',
      'badges',
      'trophées',
    ],
  },

  pomodoroTimer: {
    title: 'Minuteur Pomodoro – Simple, épuré, sans distraction',
    description:
      'Un minuteur Pomodoro minimaliste pensé pour le deep work. Intervalles personnalisables, rappels de pause et notifications sonores. Le focus, en toute simplicité.',
    keywords: [
      'minuteur Pomodoro',
      'timer Pomodoro',
      'technique Pomodoro',
      'deep work',
      'concentration',
      'sessions de travail',
      'pauses',
      'focus',
      '25 minutes',
      'productivité',
    ],
  },

  rewardsSystem: {
    title: 'Motivation & Récompenses – Quêtes, trophées et badges',
    description:
      'Transformez vos sessions Pomodoro en progression : missions quotidiennes, trophées avec paliers, badges communs et événementiels. La régularité est la clé de la réussite.',
    keywords: [
      'récompenses',
      'gamification',
      'missions quotidiennes',
      'trophées',
      'badges',
      'motivation',
      'productivité',
      'régularité',
      'succès',
      'progression',
    ],
  },

  statistics: {
    title: 'Statistiques de focus – Visualisez votre progression',
    description:
      'Des graphiques et des insights pour comprendre vos habitudes : heures productives, séries, progression et tendances. Une productivité pilotée par les données.',
    keywords: [
      'statistiques',
      'graphiques',
      'analytics',
      'progression',
      'tendances',
      'habitudes',
      'temps de travail',
      'productivité',
      'suivi',
      'données',
      'rapports',
    ],
  },

  students: {
    title: 'App Pomodoro pour étudiants – Étudier mieux, pas plus dur',
    description:
      'Une app Pomodoro gamifiée pensée pour les étudiants. Construisez des séries d\'étude, complétez des quêtes quotidiennes et rendez la préparation aux exams vraiment motivante.',
    keywords: [
      'Pomodoro étudiants',
      'révisions',
      'études',
      'concentration étudiante',
      'exams',
      'sessions d\'étude',
      'productivité étudiante',
      'mémorisation',
      'deep work',
      'focus étudiant',
    ],
  },

  freelancers: {
    title: 'App Pomodoro pour freelances – Focus, suivi du temps, livrer plus',
    description:
      'Une app Pomodoro pensée pour les freelances : sessions de deep work, suivi du temps prêt pour les clients, séries de focus et productivité sans distraction.',
    keywords: [
      'Pomodoro freelance',
      'suivi du temps',
      'deep work',
      'productivité freelance',
      'gestion du temps',
      'facturation',
      'clients',
      'projets',
      'concentration',
      'travail indépendant',
    ],
  },

  about: {
    title: 'À propos de Pomocha – Un Pomodoro simple pour le deep work',
    description:
      'Découvrez pourquoi nous avons créé Pomocha : un minuteur Pomodoro minimaliste avec motivation & récompenses, et des statistiques de focus — pensé pour une productivité sans distraction.',
    keywords: [
      'à propos Pomocha',
      'philosophie',
      'mission',
      'vision',
      'productivité',
      'concentration',
      'deep work',
    ],
  },
};

