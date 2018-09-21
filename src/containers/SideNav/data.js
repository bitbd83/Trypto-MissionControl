import React from 'react';

export const menuList = [
  { menu: 'sidebar.dashboard', icon: 'zmdi-view-dashboard', link: '/app/dashboard' },
  {
    menu: 'sidebar.orders',
    icon: 'zmdi-shopping-cart',
    link: '/app/orders',
  },
  {
    menu: 'sidebar.events',
    icon: 'zmdi-view-agenda',
    link: '/app/events',
  },
  { menu: 'sidebar.venues', icon: 'zmdi-view-list', link: '/app/venues' },
  { menu: 'sidebar.hotels', icon: 'zmdi-hotel', link: '/app/hotels' },
  {
    menu: 'sidebar.affiliates',
    icon: 'zmdi-view-subtitles',
    link: '/app/affiliates',
  },
  { menu: 'sidebar.questions', icon: 'zmdi-comment-alert', link: '/app/questions' },
  // { menu: 'sidebar.questions_section', icon: 'zmdi-comment-alert', link: '/app/questions-section' },
  {
    menu: 'sidebar.discounts',
    icon: 'zmdi-paypal',
    link: '/app/discounts',
  },
  { menu: 'sidebar.taxes', text: '%', link: '/app/taxes' },
  { menu: 'sidebar.fees', icon: 'zmdi-assignment', link: '/app/fees' },
  {
    menu: 'sidebar.settings',
    icon: 'zmdi-settings',
    submenu: [
      { name: 'sidebar.settings.tenantsettings', link: '/app/settings/tenant' },
      { name: 'sidebar.settings.paymentprocessors', link: '/app/settings/paymentprocessors' },
      { name: 'sidebar.settings.transactionfee', link: '/app/settings/transactionfee' },
      { name: 'sidebar.settings.siteadministrators', link: '/app/settings/siteadministrators' },
    ],
  },
];
