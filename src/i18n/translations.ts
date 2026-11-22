export const translations = {
  fr: {
    pages: {
      contact: {
        htmlTitle: 'Contact – Pomocha',
        metaDescription: 'Contactez l\'équipe Pomocha pour toute question, suggestion ou partenariat. Nous sommes à votre écoute.',
        h1: 'Contactez-nous',
        intro: 'Une question, une suggestion, ou une envie de collaborer ? L\'équipe Pomocha est à votre écoute.',
        sections: {
          email: {
            title: 'Par email',
            content: 'Envoyez-nous un message à l\'adresse suivante :',
            address: 'team@pomocha.fr',
          },
          social: {
            title: 'Sur les réseaux',
            content: 'Suivez-nous et échangez avec nous sur X/Twitter :',
            handle: '@Team_Pomocha',
          },
          response: {
            title: 'Délai de réponse',
            content: 'Nous faisons de notre mieux pour répondre sous 48h. Pour les demandes urgentes, privilégiez l\'email.',
          },
        },
      },
      legal: {
        htmlTitle: 'Mentions légales – Pomocha',
        metaDescription: 'Mentions légales, conditions d\'utilisation et politique de confidentialité de Pomocha.',
        h1: 'Mentions légales',
        intro: 'Informations légales relatives au site pomocha.fr et à l\'application Pomocha.',
        sections: {
          editor: {
            title: 'Éditeur du site',
            content: 'Le site pomocha.fr est édité par l\'équipe Pomocha.',
            items: [
              'Site web : https://www.pomocha.fr',
              'Application : https://www.pomocha.io',
              'Contact : team@pomocha.fr',
            ],
          },
          hosting: {
            title: 'Hébergement',
            content: 'Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.',
          },
          intellectual: {
            title: 'Propriété intellectuelle',
            content: 'L\'ensemble du contenu du site (textes, images, logos, icônes) est protégé par le droit d\'auteur. Toute reproduction sans autorisation préalable est interdite.',
          },
          data: {
            title: 'Protection des données',
            content: 'Pomocha respecte votre vie privée. Les données collectées sont utilisées uniquement pour le fonctionnement de l\'application. Aucune donnée n\'est vendue à des tiers. Pour toute demande relative à vos données personnelles, contactez-nous à team@pomocha.fr.',
          },
          cookies: {
            title: 'Cookies',
            content: 'Le site utilise des cookies techniques nécessaires à son fonctionnement et des cookies analytiques (Vercel Analytics) pour améliorer l\'expérience utilisateur.',
          },
        },
      },
    },
  },
  en: {
    pages: {
      contact: {
        htmlTitle: 'Contact – Pomocha',
        metaDescription: 'Contact the Pomocha team for any question, suggestion or partnership. We are here to help.',
        h1: 'Contact us',
        intro: 'A question, a suggestion, or want to collaborate? The Pomocha team is here to help.',
        sections: {
          email: {
            title: 'By email',
            content: 'Send us a message at:',
            address: 'team@pomocha.fr',
          },
          social: {
            title: 'On social media',
            content: 'Follow us and connect on X/Twitter:',
            handle: '@Team_Pomocha',
          },
          response: {
            title: 'Response time',
            content: 'We do our best to respond within 48 hours. For urgent requests, please use email.',
          },
        },
      },
      legal: {
        htmlTitle: 'Legal Notice – Pomocha',
        metaDescription: 'Legal notice, terms of use and privacy policy for Pomocha.',
        h1: 'Legal Notice',
        intro: 'Legal information regarding the pomocha.fr website and the Pomocha application.',
        sections: {
          editor: {
            title: 'Website editor',
            content: 'The pomocha.fr website is published by the Pomocha team.',
            items: [
              'Website: https://www.pomocha.fr',
              'Application: https://www.pomocha.io',
              'Contact: team@pomocha.fr',
            ],
          },
          hosting: {
            title: 'Hosting',
            content: 'The website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States.',
          },
          intellectual: {
            title: 'Intellectual property',
            content: 'All content on this website (text, images, logos, icons) is protected by copyright. Any reproduction without prior authorization is prohibited.',
          },
          data: {
            title: 'Data protection',
            content: 'Pomocha respects your privacy. Collected data is used solely for the operation of the application. No data is sold to third parties. For any request regarding your personal data, contact us at team@pomocha.fr.',
          },
          cookies: {
            title: 'Cookies',
            content: 'This website uses technical cookies necessary for its operation and analytical cookies (Vercel Analytics) to improve user experience.',
          },
        },
      },
    },
  },
};

export type Locale = keyof typeof translations;
