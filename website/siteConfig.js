/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [{
  caption: "User1",
  // You will need to prepend the image path with your baseUrl
  // if it is not '/', like: '/test-site/img/logo.svg'.
  image: "/img/logo.svg",
  infoLink: "https://www.facebook.com",
  pinned: true
}];

const siteConfig = {
  title: "Lighthouse" /* title for your website */ ,
  tagline: "GraphQL Server for Laravel",
  url: "https://lighthouse-php.netlify.com" /* your website url */ ,
  baseUrl: "/" /* base url for your project */ ,
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',
  editUrl: "https://github.com/nuwave/lighthouse-docs/edit/master/docs/",

  // Used for publishing and more
  projectName: "lighthouse-php",
  organizationName: "nuwave",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [{
      doc: "introduction",
      label: "Docs"
    },
    {
      doc: "walkthrough",
      label: "Walkthrough"
    },
    {
      href: "https://github.com/nuwave/lighthouse",
      label: "Code"
    },
    {
      href: "https://github.com/nuwave/lighthouse/issues",
      label: "Issues"
    }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: "img/logo.svg",
  footerIcon: "img/logo.svg",
  favicon: "img/favicon.png",

  /* colors for website */
  colors: {
    primaryColor: "#A74FF4",
    secondaryColor: "#191E38"
  },

  /* custom fonts for website */
  fonts: {
    myFont: ["Miriam Libre", "Serif"],
    myOtherFont: ["-apple-system", "system-ui"]
  },

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: "Copyright © " + new Date().getFullYear() + " Christopher Moore",

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: "foundation"
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ["https://buttons.github.io/buttons.js"],

  /* On page navigation for the current documentation page */
  onPageNav: "separate",

  /* Open Graph and Twitter card images */
  ogImage: "img/docusaurus.png",
  twitterImage: "img/docusaurus.png",

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: "https://github.com/nuwave/lighthouse",

  usePrism: true
};

module.exports = siteConfig;