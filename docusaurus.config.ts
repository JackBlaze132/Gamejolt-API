import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Game Jolt API Wiki',
  tagline: 'Modern, Interactive Documentation for Unity & Web',
  favicon: 'img/favicon.ico',

  /*
  future: {
    v4: true,
  },
  */

  baseUrl: '/', // Changed from '/Gamejolt-API/' for local dev if needed, but let's just comment out faster
  url: 'https://JackBlaze132.github.io',
  baseUrl: '/Gamejolt-API/',

  organizationName: 'JackBlaze132',
  projectName: 'Gamejolt-API',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          path: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'GJ Achievement Wiki',
      logo: {
        alt: 'Game Jolt Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/ederd/Gamejolt-Achievements-Wiki',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Unity Achievements',
              to: '/docs/unity-achievements',
            },
          ],
        },
        {
          title: 'Official Links',
          items: [
            {
              label: 'Game Jolt Site',
              href: 'https://gamejolt.com',
            },
            {
              label: 'API Documentation',
              href: 'https://gamejolt.com/game-api/doc',
            },
          ],
        },
      ],
      copyright: 'Built with 💚 for the Game Jolt community.',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

export default config;
