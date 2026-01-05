/**
 * Configuration de la structure de l'article Best Pomodoro Online
 * Ce fichier définit comment l'article doit être généré dynamiquement
 */

export const getBestPomodoroOnlineConfig = (article: any) => [
  {
    id: 'what-is-online-pomodoro',
    title: article.sections.whatIsOnlinePomodoro.title,
    type: 'text' as const,
    content: [
      article.sections.whatIsOnlinePomodoro.content1,
      article.sections.whatIsOnlinePomodoro.content2,
      article.sections.whatIsOnlinePomodoro.content3,
    ],
  },
  {
    id: 'how-to-choose',
    title: article.sections.howToChoose.title,
    type: 'text' as const,
    intro: article.sections.howToChoose.intro,
    subsections: [
      {
        id: 'simplicity',
        title: article.sections.howToChoose.simplicity.title,
        content: article.sections.howToChoose.simplicity.content,
      },
      {
        id: 'features',
        title: article.sections.howToChoose.features.title,
        content: article.sections.howToChoose.features.content,
      },
      {
        id: 'free',
        title: article.sections.howToChoose.free.title,
        content: article.sections.howToChoose.free.content,
      },
      {
        id: 'gamification',
        title: article.sections.howToChoose.gamification.title,
        content: article.sections.howToChoose.gamification.content,
      },
      {
        id: 'statistics',
        title: article.sections.howToChoose.statistics.title,
        content: article.sections.howToChoose.statistics.content,
      },
      {
        id: 'ux',
        title: article.sections.howToChoose.ux.title,
        content: article.sections.howToChoose.ux.content,
      },
      {
        id: 'no-signup',
        title: article.sections.howToChoose.noSignup.title,
        content: article.sections.howToChoose.noSignup.content,
      },
      {
        id: 'multi-device',
        title: article.sections.howToChoose.multiDevice.title,
        content: article.sections.howToChoose.multiDevice.content,
      },
    ],
  },
  {
    id: 'comparison',
    title: article.sections.comparison.title,
    type: 'apps' as const,
    intro: article.sections.comparison.intro,
    data: {
      apps: article.apps,
      appDetails: article.appDetails,
    },
  },
  {
    id: 'comparison-table',
    title: article.sections.comparisonTable.title,
    type: 'comparison-table' as const,
    data: {
      apps: article.apps,
      headers: article.sections.comparisonTable.headers,
      tableLabels: article.table,
    },
  },
  {
    id: 'classic-vs-gamified',
    title: article.sections.classicVsGamified.title,
    type: 'text' as const,
    intro: article.sections.classicVsGamified.intro,
    subsections: [
      {
        id: 'differences',
        title: article.sections.classicVsGamified.differences.title,
        content: article.sections.classicVsGamified.differences.content,
      },
      {
        id: 'psychological',
        title: article.sections.classicVsGamified.psychological.title,
        content: article.sections.classicVsGamified.psychological.content,
      },
      {
        id: 'long-term',
        title: article.sections.classicVsGamified.longTerm.title,
        content: article.sections.classicVsGamified.longTerm.content,
      },
    ],
  },
  {
    id: 'by-profile',
    title: article.sections.byProfile.title,
    type: 'text' as const,
    subsections: [
      {
        id: 'students',
        title: article.sections.byProfile.students.title,
        content: article.sections.byProfile.students.content,
      },
      {
        id: 'freelancers',
        title: article.sections.byProfile.freelancers.title,
        content: article.sections.byProfile.freelancers.content,
      },
      {
        id: 'developers',
        title: article.sections.byProfile.developers.title,
        content: article.sections.byProfile.developers.content,
      },
      {
        id: 'remote-work',
        title: article.sections.byProfile.remoteWork.title,
        content: article.sections.byProfile.remoteWork.content,
      },
      {
        id: 'creatives',
        title: article.sections.byProfile.creatives.title,
        content: article.sections.byProfile.creatives.content,
      },
    ],
  },
  {
    id: 'free-enough',
    title: article.sections.freeEnough.title,
    type: 'text' as const,
    subsections: [
      {
        id: 'limits',
        title: article.sections.freeEnough.limits.title,
        content: article.sections.freeEnough.limits.content,
      },
      {
        id: 'when-upgrade',
        title: article.sections.freeEnough.whenUpgrade.title,
        content: article.sections.freeEnough.whenUpgrade.content,
      },
    ],
  },
  {
    id: 'faq',
    title: article.sections.faq.title,
    type: 'faq' as const,
    data: article.sections.faq,
  },
  {
    id: 'conclusion',
    title: article.sections.conclusion.title,
    type: 'text' as const,
    content: [
      article.sections.conclusion.content1,
      article.sections.conclusion.content2,
      article.sections.conclusion.content3,
    ],
  },
];

