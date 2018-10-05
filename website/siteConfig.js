/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

// Users are listed in a seperate config file
const users = require('./users.js')

const siteConfig = {
  title: 'Lighthouse',
  tagline: 'GraphQL Server for Laravel',
  
  url: 'https://lighthouse-php.netlify.com',
  // Since this is the only project at the above url, use the root path
  baseUrl: '/',
  
  repoUrl: 'https://github.com/nuwave/lighthouse',
  editUrl: 'https://github.com/nuwave/lighthouse-docs/edit/master/docs/',
  
  // Used for publishing and more
  projectName: 'lighthouse-php',
  organizationName: 'nuwave',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'
  
  headerLinks: [
    {
      label: 'Docs',
      doc: 'installation',
    },
    {
      label: 'Resources',
      page: 'resources',
    },
    {
      label: 'Users',
      page: 'users',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/nuwave/lighthouse',
    },
  ],
  users,
  
  headerIcon: 'img/logo.svg',
  footerIcon: 'img/logo.svg',
  favicon: 'img/favicon.png',
  
  colors: {
    primaryColor: '#A74FF4',
    secondaryColor: '#191E38',
  },
  
  fonts: {
    myFont: ['Miriam Libre', 'Serif'],
    myOtherFont: ['-apple-system', 'system-ui'],
  },
  
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: 'Copyright © ' + new Date().getFullYear() + ' Christopher Moore',
  
  // Use prism for syntax highlighting, as highlightjs does not support graphql
  usePrism: true,
  
  // Add custom scripts here that would be placed in <script> tags
  scripts: [
    'https://buttons.github.io/buttons.js',
  ],
  
  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
  
  /* Open Graph and Twitter card images */
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',
}

module.exports = siteConfig
