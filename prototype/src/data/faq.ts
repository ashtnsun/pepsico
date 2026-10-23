// General FAQ, copied from joy-pepsico.eu/en-gb/faq (captured 2026-10-23).
import type { Faq } from './promos'

export const generalFaqs: { group: string; items: Faq[] }[] = [
  {
    group: 'About Joy',
    items: [
      { q: 'What is Joy?', a: "It's the destination for all your favourite PepsiCo snacks and beverages with all the latest promotions, competitions and news." },
      { q: 'What are the benefits of being a Joy member?', a: 'Being a member of the Joy platform offers you the chance to explore promotions, get the latest brand news and behind the scenes, and much more!' },
      { q: 'Is there an app for Joy?', a: 'Currently, there is no Joy app available for European countries. If you find similar apps on the App Store, they may only be available in other countries.' },
      { q: 'Can I receive free product samples or merchandise from PepsiCo?', a: 'Unfortunately, we are not giving out free samples at this time. But keep an eye on our social media and Joy platform where we often organize competitions.' },
    ],
  },
  {
    group: 'Account and login',
    items: [
      { q: 'How do I register?', a: 'To register on Joy, simply complete the registration form. Fill in all the required fields and be sure to review the Terms and Conditions. Remember to log in within the first 7 days after your registration to activate your account, otherwise it will be automatically removed. Alternatively, you can register using your Facebook or Google account.' },
      { q: 'How can I log in?', a: 'If you are registered and want to login, just click on the Login button. You can either log in via Joy Account where you will receive a mail with a magic link for direct login or you can log in via social media account. Please note that the magic link will expire after 5 minutes. If you need more time, please request a new magic link email by clicking Log In again.' },
      { q: 'If a password screen appears when I attempt to log in, what should I do next?', a: 'If a password entry field appears, it means that no user account is associated with the entered email address. In this case, click the "Back to Login" button and ensure that you have entered the correct email address. If you don\'t have an account yet, you can register here.' },
      { q: 'Can I register on the Joy platform if I am under 18 years of age?', a: 'No, this platform is not intended for minors under 18 years of age. PepsiCo does not process personal data of minors, except in cases authorised by law.' },
      { q: 'How can I delete my Joy account?', a: 'To delete your account, log into your profile and click on "Delete Profile" at the bottom of the settings page. Deleting your Joy account will automatically remove your personal data from the Joy platform.' },
    ],
  },
  {
    group: 'Promotions',
    items: [
      { q: 'Do I have to be a registered user of the Joy platform to take part in competitions?', a: 'Yes, you have to be a registered Joy user to participate in competitions on the platform.' },
      { q: 'If I delete my Joy account, will my entries for ongoing competitions on the Joy platform also be deleted?', a: 'Yes, after deleting your Joy account, all entries for ongoing competitions will also be deleted.' },
      { q: 'If I delete my Joy account, will my data from winner list of competitions on the Joy platform also be deleted?', a: 'Yes, if you delete your Joy account, your data from all winner lists of competitions on the Joy platform will also be deleted.' },
    ],
  },
  {
    group: 'Privacy and data',
    items: [
      { q: 'How will my personal data be used/processed?', a: 'You can find everything about the use of your personal data in our privacy policy.' },
      { q: 'Will my personal data be automatically deleted from Joy platform after a specific period of time?', a: 'Yes, your personal data will be deleted automatically after 2 years.' },
      { q: 'If I delete my Joy account, will my marketing consents also be withdrawn?', a: 'Yes, deleting your Joy account withdraws your marketing consents automatically.' },
    ],
  },
  {
    group: 'Contact',
    items: [
      { q: 'I need technical support related to Joy platform registration or logging in, who should I contact?', a: 'Reach out to us using the contact form.' },
      { q: 'I have a suggestion related to a specific brand or PepsiCo product.', a: 'Reach out to us using the contact form.' },
    ],
  },
]
