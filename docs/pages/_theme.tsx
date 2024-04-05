import { createTheme, defaultSideNavs } from 'vite-pages-theme-doc';

import React from 'react';

import Component404 from './404';

export default createTheme({
  logo: <div style={{ fontSize: '20px' }}>React heatmap</div>,
  topNavs: [
    {
      label: 'Readme',
      path: '/',
    },
    {
      label: 'Demo',
      path: '/demos/demo',
      activeIfMatch: '/components',
    },
    { label: 'Github', href: 'https://github.com/ductinhkzz/react-heatmap' },
  ],
  sideNavs: (ctx) => {
    return defaultSideNavs(ctx, {
      groupConfig: {
        components: {
          demos: {
            label: 'Demos (dev only)',
            order: -1,
          },
          general: {
            label: 'General',
            order: 1,
          },
          'data-display': {
            label: 'Data Display',
            order: 2,
          },
        },
      },
    });
  },
  Component404,
});
