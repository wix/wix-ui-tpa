import * as React from 'react';
import { ALIGNMENT, SKIN, Tabs, VARIANT } from '.';
import { visualize, story, snap } from '../../../test/visual/Snapper';
import { TPAComponentsProvider } from '../TPAComponentsConfig';

const items = [0, 1, 2, 4].map(i => ({ title: `Title ${i}` }));

class TabsVisual extends React.Component {
  static defaultProps = {
    tabsProps: {},
    mobile: false,
  };

  render() {
    const { tabsProps, mobile } = this.props as any;

    return (
      <TPAComponentsProvider value={{ mobile }}>
        <Tabs
          data-hook={'storybook-e2e-Tabs'}
          items={items}
          activeTabIndex={0}
          {...tabsProps}
        />
      </TPAComponentsProvider>
    );
  }
}

visualize('Tabs', () => {
  const renderTest = (props?: object, mobile?: boolean) => () => (
    <TabsVisual tabsProps={props} mobile={mobile} />
  );

  story('basic', () => {
    snap('default', renderTest());

    snap('mobile', renderTest({}, true));
  });

  story('Alignments', () => {
    Object.values(ALIGNMENT).map(alignment => {
      snap(alignment, renderTest({ alignment }));
    });
  });

  story('Variants', () => {
    Object.values(VARIANT).map(variant => {
      snap(variant, renderTest({ variant }));
    });
  });

  story('Skins', () => {
    Object.values(SKIN).map(skin => {
      snap(skin, renderTest({ skin }));
    });
  });
});
