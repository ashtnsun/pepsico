// Brand pages. Copy, colors, links and images are taken from the live site
// (joy-pepsico.eu/en-gb/brands/*, captured 2026-10-23).

export type BrandNews = { title: string; text: string; video?: string; image?: string }

export type Brand = {
  slug: string
  name: string
  logo: string
  /** Change 32: logo for the navbar on the brand colour, when the normal one has dark text that disappears on it. DERIVED: the dark wordmark recoloured white. */
  logoOnBand?: string
  hero: string
  heroMobile: string
  /** Color of the "Welcome" band under the hero (live site `.branding`). */
  band: string
  /** Text color on the band. */
  bandText: string
  /** "Visit brand website" button on the band. */
  bandCta: { bg: string; text: string }
  /** Change 50: second colour (breadcrumb, newsletter, participation pages) when the calculated shade (state/chrome.ts) doesn't suit the brand. */
  shade?: string
  /** Change 51: text colour on the brand colour and shade, instead of the 4.5:1 rule (state/chrome.ts). */
  text?: string
  deco?: string
  welcome: string
  tagline?: string
  website: string
  news: BrandNews[]
}

const img = (p: string) => `./images/${p}`

export const brands: Brand[] = [
  {
    slug: 'doritos', name: 'Doritos', logo: img('brands/logo-doritos.webp'),
    hero: img('brands/hero-doritos-desktop.webp'), heroMobile: img('brands/hero-doritos-mobile.webp'),
    band: '#E31722', bandText: '#FFFFFF', bandCta: { bg: '#FFFFFF', text: '#0E38DF' }, deco: img('global/deco-doritos.svg'),
    welcome: 'Welcome to Doritos on Joy by PepsiCo!',
    tagline: 'Dare yourself! Be a triangle in a world full of circles.',
    website: 'https://www.doritos.co.uk/',
    news: [
      { title: 'See how we set a world record for the longest cheese pull', text: "Go behind the scenes as Doritos pulls off the World's highest ever cheese pull", video: './media/doritos-news-1.mp4' },
      { title: 'Be a triangle in a world of circles', text: 'Doritos: for the bold in everyone', video: './media/doritos-news-2.mp4' },
    ],
  },
  {
    slug: 'rockstar', name: 'Rockstar', logo: img('brands/logo-rockstar.webp'), logoOnBand: img('brands/logo-rockstar-on-dark.webp'),
    hero: img('brands/hero-rockstar-desktop.webp'), heroMobile: img('brands/hero-rockstar-mobile.webp'),
    band: '#000000', bandText: '#FFFFFF', bandCta: { bg: '#FFFFFF', text: '#0E38DF' }, deco: img('global/deco-rockstar.svg'),
    welcome: 'Welcome to Rockstar - Energy for the Good Times',
    website: 'https://www.rockstarenergy.co.uk/',
    news: [],
  },
  {
    slug: 'pepsi', name: 'Pepsi', logo: img('brands/logo-pepsi.webp'),
    hero: img('brands/hero-pepsi-desktop.webp'), heroMobile: img('brands/hero-pepsi-mobile.webp'),
    band: '#000000', bandText: '#FFFFFF', bandCta: { bg: '#FFFFFF', text: '#0E38DF' }, deco: img('global/deco-pepsi.svg'),
    welcome: 'Welcome to Pepsi on Joy by PepsiCo!',
    tagline: 'Where There’s A Ball There’s A Way. #ThirstyForMore',
    website: 'https://www.pepsi.co.uk/',
    news: [],
  },
  {
    slug: 'walkers', name: 'Walkers', logo: img('brands/logo-walkers.webp'),
    hero: img('brands/hero-walkers-desktop.webp'), heroMobile: img('brands/hero-walkers-mobile.webp'),
    band: '#C4000A', bandText: '#FFFFFF', bandCta: { bg: '#FFE600', text: '#C4000A' },
    welcome: 'Welcome to Walkers on Joy by PepsiCo!',
    tagline: 'When Life gives you potatoes, make crisps.',
    website: 'https://www.walkers.co.uk/',
    news: [{ title: 'Its Crunch time. Pick your winner.', text: 'Only One Can Stay.', image: img('home/walkers-duaf.jpg') }],
  },
  {
    slug: '7up', name: '7UP', logo: img('brands/logo-7up.webp'),
    hero: img('brands/hero-7up-desktop.webp'), heroMobile: img('brands/hero-7up-mobile.webp'),
    // Change 51: white text on both 7UP greens, as on the live site (user's choice). White fails 4.5:1 on them
    // (2.7:1 and 3.3:1); the 7UP brand sheet asks for black.
    band: '#00B74F', bandText: '#FFFFFF', bandCta: { bg: '#FFFFFF', text: '#0E38DF' }, deco: img('global/deco-7up.svg'),
    shade: '#00A349', // 7UP brand sheet (Sponsor Files 18:17502) tertiary green, replacing the DERIVED mint #66D495
    text: '#FFFFFF',
    welcome: 'Welcome to 7UP on Joy by PepsiCo!',
    tagline: 'Refreshing 7up taste, Zero sugar. The lemon & lime twist that refreshes like no other.',
    website: 'https://www.7up.co.uk/',
    news: [],
  },
  {
    slug: 'lipton-ice-tea', name: 'Lipton', logo: img('brands/logo-lipton.webp'),
    hero: img('brands/hero-lipton-desktop.webp'), heroMobile: img('brands/hero-lipton-mobile.webp'),
    band: '#FFE300', bandText: '#333333', bandCta: { bg: '#FFFFFF', text: '#0E38DF' }, deco: img('global/deco-lipton.svg'),
    welcome: 'Welcome to Lipton on Joy by PepsiCo!',
    tagline: 'We bring out the sunshine in you and turn every occasion into a small moment of joy.',
    website: 'https://www.liptonicedtea.com/en-gb',
    news: [{ title: 'Meet your match', text: 'Take our quiz and find your bestea for life.', image: img('home/lipton-quiz.jpg') }],
  },
  {
    slug: 'quaker', name: 'Quaker', logo: img('brands/logo-quaker.webp'), logoOnBand: img('brands/logo-quaker-on-dark.webp'),
    hero: img('brands/hero-quaker-desktop.webp'), heroMobile: img('brands/hero-quaker-mobile.webp'),
    band: '#00273B', bandText: '#FFFFFF', bandCta: { bg: '#FFFFFF', text: '#0E38DF' }, deco: img('global/deco-quaker.svg'),
    welcome: 'Welcome to Quaker on Joy by PepsiCo!',
    tagline: 'We all have a fire inside us – a passion and purpose that powers our everyday.',
    website: 'https://www.quaker.co.uk/',
    news: [],
  },
  {
    slug: 'popworks', name: 'Popworks', logo: img('brands/logo-popworks.webp'),
    hero: img('brands/hero-popworks-desktop.webp'), heroMobile: img('brands/hero-popworks-mobile.webp'),
    band: '#202F64', bandText: '#FFFFFF', bandCta: { bg: '#FFFFFF', text: '#0E38DF' }, deco: img('global/deco-popworks.svg'),
    welcome: 'Welcome to Popworks on Joy by PepsiCo!',
    tagline: 'That popped crisp with real crunch. Crunchy | Puffy | Tasty | Never Fried',
    website: 'https://www.popworks-snacks.com/',
    news: [],
  },
]

export const getBrand = (slug?: string) => brands.find((b) => b.slug === slug)
