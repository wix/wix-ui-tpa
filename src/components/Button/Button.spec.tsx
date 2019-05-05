import * as React from 'react';
import { buttonDriverFactory } from './Button.driver';
import { Button } from './';
import { isUniEnzymeTestkitExists } from 'wix-ui-test-utils/enzyme';
import { isUniTestkitExists } from 'wix-ui-test-utils/vanilla';
import { mount } from 'enzyme';
import { buttonTestkitFactory } from '../../testkit';
import { buttonTestkitFactory as enzymeButtonTestkitFactory } from '../../testkit/enzyme';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';
import { WixUiTpaConfigWrapper } from '../WixUiTpaConfig';

describe('Button', () => {
  const createDriver = createUniDriverFactory(buttonDriverFactory);

  it('should render', async () => {
    const value = 'hello!';
    const driver = createDriver(<Button>{value}</Button>);
    expect(await driver.getButtonTextContent()).toEqual(value);
  });

  it('should set to fullWidth', async () => {
    const driver = createDriver(<Button fullWidth />);
    expect(await driver.isFullWidth()).toEqual(true);
  });

  it('should use mobile design', async () => {
    const driver = createDriver(WixUiTpaConfigWrapper({mobile: true})(<Button />));
    expect(await driver.isMobile()).toEqual(true);
  });

  describe('testkit', () => {
    it('should exist', async () => {
      expect(
        await isUniTestkitExists(<Button />, buttonTestkitFactory, {
          dataHookPropName: 'data-hook',
        }),
      ).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', async () => {
      expect(
        await isUniEnzymeTestkitExists(
          <Button />,
          enzymeButtonTestkitFactory,
          mount,
          { dataHookPropName: 'data-hook' },
        ),
      ).toBe(true);
    });
  });
});
