import { configure, addParameters, addDecorator } from '@storybook/react';
import styleProcessor from 'wix-style-processor';
import { create } from '@storybook/theming';
import { version } from '../package.json';
import FocusRingToggle from './addons/FocusRingToggle';

function loadStories() {
  require('../stories');
  require('../mocks');
  require('./stories.scss');
  setTimeout(() => {
    styleProcessor.init();
  });
}

function configureStorybook() {
  configure(loadStories, module);
}

const theme = create({
  base: 'light',
  brandTitle: `wix-ui-tpa v${version}`,
  brandUrl: 'https://github.com/wix/wix-ui-tpa',
});

addParameters({
  options: {
    theme,
    name: 'wix-ui-tpa',
    url: 'https://github.com/wix/wix-ui-tpa',
    storySort: (a, b) =>
        a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    showRoots: true,
  },
});

addDecorator(FocusRingToggle);

configureStorybook();

if (module.hot) {
  module.hot.accept('../stories', () => {
    configureStorybook();
  });
}
