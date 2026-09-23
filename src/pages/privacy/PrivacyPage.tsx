import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

const supportEmail = 'team@pomocha.fr';

export default function PrivacyPage() {
  const { locale } = useI18n();
  const fr = locale === 'fr';
  const copy = fr ? {
    title: 'Politique de confidentialité – POCHA',
    description: 'Découvrez quelles données POCHA collecte, pourquoi elles sont utilisées et comment exercer vos droits.',
    intro: 'Dernière mise à jour : 23 septembre 2026. Cette politique concerne l’application mobile POCHA et le site pomocha.fr.',
    sections: [
      ['Responsable du traitement', 'Le service POCHA est exploité par l’équipe Pomocha. Pour toute question relative à la confidentialité, contactez team@pomocha.fr.'],
      ['Données collectées', 'Lorsque vous créez un compte, nous traitons votre adresse e-mail, votre nom ou pseudonyme, votre identifiant POCHA et les informations nécessaires à l’authentification. Nous enregistrons aussi les projets, sessions de concentration, réglages, objectifs, progression, statistiques, badges, récompenses et données sociales que vous choisissez d’utiliser.'],
      ['Fonctions sociales', 'Si vous utilisez l’espace Amis, nous traitons vos relations, réussites partagées, réactions POCH, notifications, signalements et blocages. Les publications sont générées à partir de réussites POCHA prédéfinies ; aucun texte, photo ou vidéo libre n’est publié dans le fil.'],
      ['Bouclier de distractions', 'Sur Android, le service d’accessibilité est facultatif. Il détecte uniquement le nom technique de l’application affichée afin de bloquer les applications que vous avez choisies pendant une session. Le contenu de l’écran n’est pas lu. Ces informations restent sur l’appareil et ne sont ni enregistrées sur nos serveurs ni partagées.'],
      ['Finalités et base légale', 'Nous utilisons ces données pour fournir votre compte et les fonctions demandées, synchroniser votre progression, sécuriser le service, prévenir les abus, assurer le support et respecter nos obligations légales. Le traitement repose selon le cas sur l’exécution du service, notre intérêt légitime à sécuriser POCHA, votre consentement ou une obligation légale.'],
      ['Destinataires et hébergement', 'Les données sont accessibles uniquement aux prestataires nécessaires au fonctionnement du service, notamment l’hébergement et l’authentification. Le site utilise Vercel Analytics pour mesurer des statistiques de fréquentation agrégées. Nous ne vendons pas vos données personnelles.'],
      ['Conservation', 'Les données liées au compte sont conservées tant que celui-ci est actif. Lors d’une suppression, les données directement rattachées au compte sont supprimées ; des informations strictement nécessaires peuvent être conservées si la loi l’impose ou pour prévenir la fraude et les abus.'],
      ['Vos droits', 'Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou la portabilité de vos données, et vous opposer à certains traitements. Vous pouvez supprimer votre compte dans l’application ou depuis la page dédiée. Vous pouvez également saisir l’autorité de contrôle compétente.'],
      ['Sécurité et mineurs', 'Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger les données. POCHA n’est pas destiné aux enfants de moins de 13 ans.'],
    ],
    deletion: 'Supprimer mon compte',
  } : {
    title: 'Privacy Policy – POCHA',
    description: 'Learn what data POCHA collects, why it is used, and how to exercise your rights.',
    intro: 'Last updated: September 23, 2026. This policy applies to the POCHA mobile app and pomocha.fr website.',
    sections: [
      ['Data controller', 'POCHA is operated by the Pomocha team. For privacy questions, contact team@pomocha.fr.'],
      ['Data we collect', 'When you create an account, we process your email address, name or nickname, POCHA identifier, and authentication information. We also store projects, focus sessions, settings, goals, progress, statistics, badges, rewards, and social data you choose to use.'],
      ['Social features', 'If you use Friends, we process your connections, shared achievements, POCH reactions, notifications, reports, and blocks. Posts are generated from predefined POCHA achievements; users cannot publish free-form text, photos, or videos to the feed.'],
      ['Distraction shield', 'On Android, the accessibility service is optional. It detects only the technical package name of the app on screen to block apps you selected during an active session. Screen content is not read. This information stays on the device and is neither stored on our servers nor shared.'],
      ['Purposes and legal basis', 'We use this data to provide your account and requested features, sync progress, secure the service, prevent abuse, provide support, and comply with legal duties. Depending on the processing, the basis is performance of the service, our legitimate security interests, consent, or a legal obligation.'],
      ['Recipients and hosting', 'Data is available only to providers needed to operate the service, including hosting and authentication. The website uses Vercel Analytics for aggregated traffic measurement. We do not sell personal data.'],
      ['Retention', 'Account data is kept while your account is active. When it is deleted, data directly associated with the account is removed; strictly necessary information may be retained where required by law or to prevent fraud and abuse.'],
      ['Your rights', 'You may request access, correction, deletion, restriction, or portability of your data and object to certain processing. You can delete your account in the app or from the dedicated page. You may also contact your competent supervisory authority.'],
      ['Security and children', 'We use reasonable technical and organisational safeguards. POCHA is not intended for children under 13.'],
    ],
    deletion: 'Delete my account',
  };

  return (
    <PageLayout htmlTitle={copy.title} metaDescription={copy.description} h1={copy.title} intro={copy.intro}>
      {copy.sections.map(([title, body]) => <section className="page-layout__section" key={title}><h2>{title}</h2><p>{body}</p></section>)}
      <section className="page-layout__section">
        <p><a href="/delete-account">{copy.deletion}</a> · <a href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
      </section>
    </PageLayout>
  );
}
