const siteMetadata = {
  title: 'Archeomaps',
  author: 'Steve Jonk',
  headerTitle: 'Archeomaps',
  description:
    'Archeomaps is a website about maps and archeology, with a lot of information about various historical sites.',
  language: 'en-us',
  siteUrl: 'https://stevejonk.com',
  siteRepo: 'https://github.com/SteveJonk/stef-site',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'info@stevejonk.com',
  github: 'https://github.com/SteveJonk',
  twitter: 'https://twitter.com/stevejonk',
  facebook: 'https://www.facebook.com/SteveJonk',
  youtube: 'https://www.youtube.com/channel/UCMlPY3jFIf5IYLhRZRYac2g',
  linkedin: 'https://www.linkedin.com/in/steve-jonk-frontend-developer/',
  locale: 'nl-NL',
  // TODO: Add Google Analytics
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports plausible, simpleAnalytics, umami or googleAnalytics
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  },
}

module.exports = siteMetadata
