import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manual selection for the Wiki layout
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🚀 Quickstart',
      items: [
        'installation'
      ],
    },
    {
      type: 'category',
      label: '⚙️ Core Concepts',
      items: [
        'user-operations', 
        'data-storage',
        'url-structure',
        'data-formats',
      ],
    },
    {
      type: 'category',
      label: '🌐 Sessions',
      items: [
        'sessions/authentication',
        'sessions/open',
        'sessions/ping',
        'sessions/check',
        'sessions/close',
      ],
    },
    {
      type: 'category',
      label: '🪢 Integration',
      items: ['unity-achievements', 'scores', 'unity-friends', 'batch-requests'],
    },
  ],
};

export default sidebars;
