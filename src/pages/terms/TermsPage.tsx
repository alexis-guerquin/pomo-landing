import { Link } from 'react-router-dom';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useI18n } from '../../contexts/I18nContext';

export default function TermsPage() {
  const { locale } = useI18n();
  const fr = locale === 'fr';
  const copy = fr ? {
    title: 'Conditions d’utilisation — POCHA',
    intro: 'Retrouvez les conditions applicables à l’application et les informations utiles pour vos achats et abonnements.',
    license: 'Licence de l’application Apple',
    licenseText: 'Pour l’application distribuée par l’App Store sur iPhone, iPad et Mac, consultez le contrat de licence standard d’Apple (EULA).',
    licenseLink: 'Lire le contrat de licence standard d’Apple',
    premium: 'Achats et abonnements Premium',
    premiumText: 'Le prix, la durée et les fonctionnalités incluses sont affichés dans l’application avant de confirmer un achat. Le paiement est géré par la boutique utilisée pour l’achat : Apple pour l’App Store, Google pour Google Play. Les abonnements se renouvellent automatiquement sauf résiliation dans les réglages de cette boutique avant la date de renouvellement indiquée. Les conditions d’un éventuel essai sont présentées avant sa confirmation.',
    manage: 'Gérer un achat',
    manageText: 'Vous pouvez gérer ou résilier votre abonnement auprès de la boutique d’origine. La désinstallation de Pocha et la suppression du compte ne résilient pas un abonnement. Pour retrouver un achat App Store, utilisez « Restaurer les achats » dans l’écran Premium avec le compte Apple ayant réalisé l’achat.',
    apple: 'Abonnements Apple', google: 'Abonnements Google Play',
    account: 'Compte, communauté et données',
    accountText: 'Vous êtes responsable de la sécurité de votre compte. Les fonctions sociales sont soumises aux règles de la communauté POCHA. Vous pouvez signaler un contenu ou demander de l’aide au support. Notre politique de confidentialité explique le traitement de vos données et la suppression de compte.',
    privacy: 'Confidentialité', community: 'Règles de la communauté', deletion: 'Supprimer mon compte', help: 'Aide et support',
  } : {
    title: 'Terms of use — POCHA',
    intro: 'Find the terms applicable to the app and information about purchases and subscriptions.',
    license: 'Apple app license',
    licenseText: 'For the app distributed through the App Store on iPhone, iPad and Mac, see Apple’s standard End User License Agreement (EULA).',
    licenseLink: 'Read Apple’s standard EULA',
    premium: 'Premium purchases and subscriptions',
    premiumText: 'The price, duration and included features are shown in the app before you confirm a purchase. Payment is handled by the store used for the purchase: Apple for the App Store and Google for Google Play. Subscriptions renew automatically unless cancelled in that store’s settings before the displayed renewal date. Terms of any trial are shown before confirmation.',
    manage: 'Manage a purchase',
    manageText: 'Manage or cancel your subscription through the original store. Uninstalling Pocha or deleting your account does not cancel a subscription. To recover an App Store purchase, use “Restore purchases” on the Premium screen with the Apple account that made the purchase.',
    apple: 'Apple subscriptions', google: 'Google Play subscriptions',
    account: 'Account, community and data',
    accountText: 'You are responsible for keeping your account secure. Social features are subject to POCHA’s community guidelines. You can report content or ask support for help. Our privacy policy explains how we handle your data and account deletion.',
    privacy: 'Privacy policy', community: 'Community guidelines', deletion: 'Delete my account', help: 'Help and support',
  };
  return <PageLayout htmlTitle={copy.title} h1={copy.title} intro={copy.intro} metaDescription={copy.intro}>
    <section className="page-layout__section"><h2>{copy.license}</h2><p>{copy.licenseText}</p><p><a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer">{copy.licenseLink}</a></p></section>
    <section className="page-layout__section"><h2>{copy.premium}</h2><p>{copy.premiumText}</p></section>
    <section className="page-layout__section"><h2>{copy.manage}</h2><p>{copy.manageText}</p><p><a href="https://apps.apple.com/account/subscriptions">{copy.apple}</a> · <a href="https://play.google.com/store/account/subscriptions">{copy.google}</a></p></section>
    <section className="page-layout__section"><h2>{copy.account}</h2><p>{copy.accountText}</p><p><Link to="/privacy">{copy.privacy}</Link> · <Link to="/community-guidelines">{copy.community}</Link> · <Link to="/delete-account">{copy.deletion}</Link> · <Link to="/support">{copy.help}</Link></p></section>
  </PageLayout>;
}
