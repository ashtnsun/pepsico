// Promotions. Copy, dates, prizes, FAQs and images come from the live site
// (joy-pepsico.eu/en-gb/promotions, captured 2026-10-23). Nothing here is invented
// except the prototype-only fields marked PROTOTYPE.

export type Prize = { name: string; image: string; /** PROTOTYPE: can this prize be won instantly? */ instant?: boolean }
export type Step = { text: string; image?: string }
export type Faq = { q: string; a: string }

/** How entering works. instant = find out straight away (and join the draw); draw = entered into a prize draw. */
export type Mechanic = 'instant' | 'draw'

export type PromoTheme = {
  /** Brand color of the hero band, step circles and prize band (live site teaser/branding colors). */
  bg: string
  /** Hero CTA ("Participate here") colors. */
  ctaBg: string
  ctaText: string
  /** Decoration image used on the hero band and teaser card. */
  deco?: string
  teaserDeco?: string
}

export type Promo = {
  slug: string
  brand: string          // brand slug (or 'joy' for multi-brand JOY promotions)
  brandLabel: string     // shown in breadcrumb and filters
  title: string          // hero title on the promotion page
  subtitle: string
  teaserTitle: string
  teaserText: string
  start: string          // YYYY-MM-DD
  end: string
  countries: string[]
  theme: PromoTheme
  images: { header: string; headerMobile: string; logo: string; card: string; teaser?: string; teaserMobile?: string; cta?: string; ctaMobile?: string }
  steps: Step[]
  stepsTitle?: string
  disclaimer?: string
  prizesTitle: string
  prizesSubtitle?: string
  prizes: Prize[]
  faqs: Faq[]
  /** PROTOTYPE fields used by the participation flow */
  mechanic: Mechanic
  limit: 'week' | 'day' | 'once'
  codePrefix: string
  codeHelp: string
  drawPrize?: string
}

const img = (slug: string, file: string) => `./images/promos/${slug}/${file}`
const g = (file: string) => `./images/global/${file}`

const doritosTheme: PromoTheme = { bg: '#E31722', ctaBg: '#FFFFFF', ctaText: '#1443FF', deco: g('deco-doritos.svg'), teaserDeco: g('teaser-deco-doritos.webp') }
const joyTheme: PromoTheme = { bg: '#0E38DF', ctaBg: '#FFE600', ctaText: '#0E38DF', teaserDeco: g('teaser-deco-default.webp'), deco: g('teaser-deco-default.webp') }

const doritosSteps = (slug: string): Step[] => [
  { text: 'Purchase a Doritos Promotional Pack', image: img(slug, 'step-1.webp') },
  { text: 'Scan QR code to log in or register an account', image: img(slug, 'step-2.webp') },
  { text: 'Enter your Code (starts GBC)', image: img(slug, 'step-3.webp') },
]

export const promos: Promo[] = [
  {
    slug: 'avengers-doomsday', brand: 'joy', brandLabel: 'JOY',
    title: 'ASSEMBLE YOUR SNACKS', subtitle: 'CHANCE TO WIN HOLIDAYS AND OTHER PRIZES EVERY HOUR',
    teaserTitle: 'ASSEMBLE YOUR SNACKS', teaserText: 'CHANCE TO WIN HOLIDAYS AND OTHER PRIZES EVERY HOUR',
    start: '2026-09-01', end: '2026-12-31', countries: ['gb', 'ie'], theme: joyTheme,
    images: {
      header: img('avengers-doomsday', 'header-desktop.webp'), headerMobile: img('avengers-doomsday', 'header-mobile.webp'),
      logo: img('avengers-doomsday', 'logo.webp'), card: img('avengers-doomsday', 'card.webp'),
      teaser: img('avengers-doomsday', 'teaser-desktop.webp'), teaserMobile: img('avengers-doomsday', 'teaser-mobile.webp'),
      cta: img('avengers-doomsday', 'cta-desktop.webp'), ctaMobile: img('avengers-doomsday', 'cta-mobile.webp'),
    },
    stepsTitle: 'HOW TO TAKE PART',
    steps: [
      { text: 'Purchase a promotional pack and scan QR code', image: img('avengers-doomsday', 'step-1.webp') },
      { text: 'Register or log in to Joy', image: img('avengers-doomsday', 'step-2.webp') },
      { text: 'Enter code on the back of pack to find out if you’ve won!', image: img('avengers-doomsday', 'step-3.webp') },
    ],
    disclaimer: 'UK (excl. C.I & I.O.M) & ROI, 18+ only. 06:00 – 23:59 daily 01/09/26 – 31/12/26. Purchase Promotional Pack, scan the QR code, sign in to your JOY account (or create one for free), enter the code of the back of pack to find out instantly if you have won a Tier 2, Tier 3 or Tier 4 Prize. All entries entered into Tier 1 prize draw. Purchase required. Prizes: Tier 1: 1 of 2 x Trip to Tokyo for winner & 3 guests (2 adults, 2 children U16) incl flights, accom, activities & £700 (or € equivalent). Tier 2: 466 x Hasbro merch. Tier 3: 2440 x pairs of Vue cinema voucher codes (booking fees may apply). Tier 4: 1464 x Walkers-branded merch. Retain packaging & receipt to claim. Internet access, email address & UK or ROI Bank Account required. Wrap-Up Draw: 01/01/27 – 28/02/27. Prize: 1 x £250 (or € equivalent). Max 1 entry per person per week. Max 1 Prize type per person. Visit www.joy-pepsico.eu/en-gb/promotions/Avengers-Doomsday for full T&Cs & Prize details. Promoter: Walkers Snacks Limited, 7th Floor, 1 Station Hill Square, Reading, England, RG1 1LN.',
    prizesTitle: 'THOUSANDS OF PRIZES',
    prizes: [
      { name: 'Avengers Themed Holiday to Tokyo', image: img('avengers-doomsday', 'prize-tokyo.webp') },
      { name: 'Hasbro Dr Doom Helmet', image: img('avengers-doomsday', 'prize-helmet.webp'), instant: true },
      { name: 'Hasbro Captain America Shield', image: img('avengers-doomsday', 'prize-shield.webp'), instant: true },
      { name: 'Hasbro Thor’s Hammer', image: img('avengers-doomsday', 'prize-hammer.webp'), instant: true },
      { name: 'Hasbro Marvel Legends Figure', image: img('avengers-doomsday', 'prize-thor.webp'), instant: true },
      { name: 'Snack Clips', image: img('avengers-doomsday', 'prize-monster-munch.webp'), instant: true },
      { name: 'Pair of Vue Cinema Tickets', image: img('avengers-doomsday', 'prize-tickets.webp'), instant: true },
    ],
    faqs: [
      { q: 'How do I enter?', a: 'Purchase a pack and scan the QR code on the back of pack. Register or log in to your JOY account, submit your entry. You will then find out instantly if you have won a prize. You will also automatically be entered into the prize draw to win an Avengers-themed holiday to Tokyo.' },
      { q: 'How many times can I enter?', a: 'Entry is restricted to one entry per person, per week. The week resets on a Monday, so if you enter on a Wednesday, you can enter again with your next code on Monday.' },
      { q: 'What can I win?', a: 'There are 4370 instant win prizes to be won. 1464 x Monster Munch Snack Clips, 2440 pairs of Vue cinema tickets and 466 x Hasbro merchandise. Every entry is entered into the prize draw to win 2 x Holidays to Tokyo.' },
      { q: 'What are the dates of the promotion?', a: 'The promotion opens 00:06:00 BST on 1st September 2026 and closes 23:59:59 BST inclusive on 31st December 2026. Any entries received before or after this time will not be included in the promotion.' },
    ],
    mechanic: 'instant', limit: 'week', codePrefix: 'GB',
    codeHelp: 'Find the code on the back of the pack, in the best-before box. It starts with GB.',
    drawPrize: 'an Avengers themed holiday to Tokyo',
  },
  {
    slug: 'las-vegas-wrap', brand: 'doritos', brandLabel: 'Doritos',
    title: 'Doritos & F1®', subtitle: 'Win £100 Cash',
    teaserTitle: 'Win £100', teaserText: 'Enter our Doritos & F1® Wrap up draw for a chance to win £100',
    start: '2026-09-27', end: '2026-11-25', countries: ['gb', 'ie'], theme: doritosTheme,
    images: {
      header: img('las-vegas-wrap', 'header-desktop.webp'), headerMobile: img('las-vegas-wrap', 'header-mobile.webp'),
      logo: img('las-vegas-wrap', 'logo.webp'), card: img('las-vegas-wrap', 'card.webp'),
      teaser: img('las-vegas-wrap', 'teaser-desktop.webp'), teaserMobile: img('las-vegas-wrap', 'teaser-mobile.webp'),
      cta: img('las-vegas-wrap', 'cta-desktop.webp'), ctaMobile: img('las-vegas-wrap', 'cta-mobile.webp'),
    },
    steps: doritosSteps('las-vegas-wrap'),
    disclaimer: 'UK & ROI, 18+ only. Main Period: 08:00 – 20:00 daily between 20/07/26 – 27/09/26. Wrap Up Period: 20:01 27/09/26 – 23:59 25/11/26. Purchase Promotional Pack, scan QR code or visit www.joy-pepsico.eu/en-gb/promotions/doritos/Las-Vegas, register your details & enter code on outer pack then select your race entry option: either Instant Win hourly prizes (Race 1) or Grand Prize draw (Race 2). Prizes: Race 1: 840 hourly prizes of F1, or F1 & Doritos co-branded, Merchandise. Race 2: 1 x trip to attend FORMULA 1 HEINEKEN LAS VEGAS GRAND PRIX 2026 on 20–22/11/26 for the winner & 1 guest including 2 x Grandstand tickets, flights, accommodation, transfer to the event & £500 (or € equivalent). Wrap Up Prize: 1 x £100 (or € equivalent). Retain outer Pack. Internet access, email address & UK/ROI bank account required. Max 1 entry per person per day during main period, 1 entry per person during wrap up period. Max 1 prize per race category. Promoter: Walkers Snacks Limited.',
    prizesTitle: 'Doritos & F1®', prizesSubtitle: 'See what you can Win!',
    prizes: [{ name: '£100', image: img('las-vegas-wrap', 'prize-100.webp') }],
    faqs: [
      { q: 'WHAT IS THE DORITOS & F1® PROMOTION?', a: 'The boldest sport meets the boldest snack. How to enter: purchase a Promotional Pack & scan QR code or visit www.joy-pepsico.eu/en-gb/promotions/doritos/Las-Vegas. Log in or register a Joy account by submitting your details (full name, email address & country) & enter using your unique code on-pack. During the wrap up period every entry goes into the draw for £100.' },
      { q: 'WHEN IS THE PROMOTION RUNNING?', a: 'The main promotion runs 08:00 – 20:00 daily between 20/07/26 – 27/09/26 and for the wrap up period between 27/09/26 – 25/11/26.' },
      { q: 'WHERE CAN I FIND THE CODE ON MY PROMOTIONAL PACK?', a: 'The code can be found on the outer film in the best before box starting GBC.' },
      { q: 'WHO CAN PARTICIPATE IN THE PROMOTION?', a: 'This Promotion is open to residents of the United Kingdom and Republic of Ireland aged 18 or over, and is not open to employees, contractors or agents of the Promoter, their group companies or family members, or anyone else connected to the Promotion.' },
      { q: 'WHAT IF I HAVE QUESTIONS OR TECHNICAL ISSUES RELATED TO THE PROMOTION?', a: 'If you are experiencing technical issues related to the promotion, our first recommendation is to check whether your question has been answered within this FAQs document. If you can’t find an answer to your question or continue to have technical issues with the Promotion, please contact the customer support.' },
      { q: 'HOW DO I KNOW IF MY PACK IS A PROMOTIONAL PACK?', a: 'Look out for the special F1 design on these products: Doritos Chilli Heatwave 5PK, Doritos Cool Original 5PK, Doritos Tangy Cheese 5PK.' },
    ],
    mechanic: 'draw', limit: 'once', codePrefix: 'GBC',
    codeHelp: 'Find the code on the outer film of the pack, in the best-before box. It starts with GBC.',
    drawPrize: '£100 cash',
  },
  {
    slug: 'las-vegas', brand: 'doritos', brandLabel: 'Doritos',
    title: 'Doritos & F1®', subtitle: 'Win a Trip to F1® in Las Vegas, plus a prize every hour',
    teaserTitle: 'Doritos & F1®', teaserText: 'Win a Trip to F1® in Las Vegas, plus a prize every hour',
    start: '2026-07-20', end: '2026-09-27', countries: ['gb', 'ie'], theme: doritosTheme,
    images: {
      header: img('las-vegas', 'header-desktop.webp'), headerMobile: img('las-vegas', 'header-mobile.webp'),
      logo: img('las-vegas', 'logo.webp'), card: img('las-vegas', 'card.webp'),
    },
    steps: doritosSteps('las-vegas-wrap'),
    prizesTitle: 'Win a Trip to F1® in Las Vegas, plus a prize every hour', prizesSubtitle: 'Epic Prizes to be Won!',
    prizes: [
      { name: 'Trip to F1® in Las Vegas', image: img('las-vegas', 'prize-trip.webp') },
      { name: 'F1® Cap', image: img('las-vegas', 'prize-cap.webp') },
    ],
    faqs: [],
    mechanic: 'instant', limit: 'day', codePrefix: 'GBC', codeHelp: '',
  },
  {
    slug: 'pepsi-music', brand: 'pepsi', brandLabel: 'Pepsi',
    title: 'WIN YOUR WAY TO A YEAR OF LIVE MUSIC', subtitle: 'Win instant prizes & a Pepsi Music Stage Pass.',
    teaserTitle: 'WIN YOUR WAY TO A YEAR OF LIVE MUSIC', teaserText: 'Win instant prizes & a Pepsi Music Stage Pass. Enter now!',
    start: '2026-06-01', end: '2026-09-30', countries: ['gb'],
    theme: { bg: '#000000', ctaBg: '#FFFFFF', ctaText: '#1443FF', teaserDeco: g('teaser-deco-pepsi.webp') },
    images: {
      header: img('pepsi-music', 'header-desktop.webp'), headerMobile: img('pepsi-music', 'header-mobile.webp'),
      logo: img('pepsi-music', 'logo.webp'), card: img('pepsi-music', 'card.webp'),
    },
    steps: [],
    prizesTitle: 'PRIZES TO BE WON',
    prizes: [
      { name: 'A pair of VIP Weekend Creamfields Festival Tickets with camping', image: img('pepsi-music', 'prize-creamfields.webp') },
      { name: 'A pair of Friday VIP Reading Festival Day Tickets', image: img('pepsi-music', 'prize-reading.webp') },
      { name: 'A pair of tickets to The O2 arena to a show of your choice', image: img('pepsi-music', 'prize-o2.webp') },
      { name: 'Anker Soundcore 2 Portable Bluetooth Speaker', image: img('pepsi-music', 'prize-speaker.webp') },
      { name: 'Pepsi Bucket Hat', image: img('pepsi-music', 'prize-bucket-hat.webp') },
      { name: 'Pepsi Sunglasses', image: img('pepsi-music', 'prize-sunglasses.webp') },
    ],
    faqs: [],
    mechanic: 'instant', limit: 'day', codePrefix: 'GB', codeHelp: '',
  },
  {
    slug: 'walkers-gdk', brand: 'walkers', brandLabel: 'Walkers',
    title: 'MAX FLAVOUR WITH GDK', subtitle: 'Use your code at a GDK restaurant and enjoy 2 for 1 kebabs.',
    teaserTitle: 'MAX FLAVOUR WITH GDK', teaserText: 'Buy a promo pack of Walkers MAX, score 2-for-1 GDK kebabs.',
    start: '2025-08-18', end: '2026-08-17', countries: ['gb'],
    theme: { bg: '#000000', ctaBg: '#1443FF', ctaText: '#FFFFFF', teaserDeco: g('teaser-deco-walkers-max.webp') },
    images: {
      header: img('walkers-gdk', 'header-desktop.webp'), headerMobile: img('walkers-gdk', 'header-mobile.webp'),
      logo: img('walkers-gdk', 'logo.webp'), card: img('walkers-gdk', 'card.webp'),
    },
    steps: [],
    prizesTitle: 'Powered by Walkers MAX',
    prizes: [{ name: '2-FOR-1 GDK KEBAB VOUCHER', image: img('walkers-gdk', 'prize-voucher.webp') }],
    faqs: [],
    mechanic: 'instant', limit: 'week', codePrefix: 'GB', codeHelp: '',
  },
  {
    slug: 'pepsi-ea', brand: 'pepsi', brandLabel: 'Pepsi',
    title: 'PEPSI x EA SPORTS FC™ 25 PROMO', subtitle: 'Level up your game with in-game rewards and gaming prizes',
    teaserTitle: 'PEPSI x EA SPORTS FC™ 25 PROMO', teaserText: 'Together with EA SPORTS FC™ 25 we offer you a chance to win unique prizes!',
    start: '2024-10-16', end: '2024-12-29', countries: ['gb', 'ie'],
    theme: { bg: '#000000', ctaBg: '#0025FF', ctaText: '#FFFFFF', teaserDeco: g('teaser-deco-pepsi-ea.webp') },
    images: {
      header: img('pepsi-ea', 'header-desktop.webp'), headerMobile: img('pepsi-ea', 'header-mobile.webp'),
      logo: img('pepsi-ea', 'logo.webp'), card: img('pepsi-ea', 'card.webp'),
    },
    steps: [],
    prizesTitle: 'EA SPORTS FC™ 25 IN-GAME REWARDS AND GAMING PRIZES',
    prizes: [
      { name: 'CHANCE TO WIN: EA SPORTS FC™ 25 games', image: img('pepsi-ea', 'prize-game.webp') },
      { name: 'FREE IN-GAME REWARD: 3 ‘Thirsty For More’ Pepsi Crests + 400 Season Points', image: img('pepsi-ea', 'prize-crests.webp') },
      { name: 'FREE IN-GAME REWARD: 6 ‘Thirsty For More’ Pepsi Kits + 400 Season Points', image: img('pepsi-ea', 'prize-kits.webp') },
      { name: 'FREE IN-GAME REWARD: 3 ‘Thirsty For More’ Pepsi XL TIFOs + 400 Season Points', image: img('pepsi-ea', 'prize-xl-tifos.webp') },
    ],
    faqs: [],
    mechanic: 'instant', limit: 'once', codePrefix: 'GB', codeHelp: '',
  },
]

export const getPromo = (slug?: string) => promos.find((p) => p.slug === slug)
