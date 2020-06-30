import {
  AppMenuLink,
  MiniAppMenuLink,
} from 'src/common/app-sidenav/app-sidenav.component';

export const APP_MENU_LINKS: AppMenuLink[] = [
  {
    name: 'mini-app1',
    displayName: 'Mini App 1',
    url: 'mini-app1',
  },
  {
    name: 'mini-app2',
    displayName: 'Mini App 2',
    url: 'mini-app2',
  },
  {
    name: 'mini-app3',
    displayName: 'Mini App 3',
    url: 'mini-app3',
  },
];

export const MINI_APP_MENU_LINKS: MiniAppMenuLink[] = [
  {
    name: 'account',
    path: '/account',
    displayName: 'Account',
  },
  {
    name: 'profile',
    path: '/profile',
    displayName: 'Profile',
  },
];
