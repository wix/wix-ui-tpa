import * as React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';
import { isUniEnzymeTestkitExists } from 'wix-ui-test-utils/enzyme';
import { isUniTestkitExists } from 'wix-ui-test-utils/vanilla';
import { mount } from 'enzyme';
import { colorPickerDriverFactory } from './ColorPicker.driver';
import { ColorPicker } from './';
import { colorPickerTestkitFactory } from '../../testkit';
import { colorPickerTestkitFactory as enzymeColorPickerTestkitFactory } from '../../testkit/enzyme';
import { eventually } from 'wix-ui-test-utils/dist/src/protractor/utils';
import { jsdomReactUniDriver } from '@unidriver/jsdom-react';

describe('ColorPicker', () => {
  const createDriver = createUniDriverFactory(colorPickerDriverFactory);
  let bodyUniDriver;

  beforeAll(() => {
    bodyUniDriver = jsdomReactUniDriver(document.body);
  });

  afterEach(() => {
    // this is obviousle a "hack".
    // this data-hook is taken from the wix-ui-core/Popover implementation:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-ui-core/src/components/popover/Popover.uni.driver.ts#L17
    // TODO fix TooltipDriver in core, to remove the portal when not needed
    const portal =
      document && document.querySelector('[data-hook="popover-portal"]');

    if (portal) {
      portal.remove();
    }
  });

  it('should render', async () => {
    const driver = createDriver(<ColorPicker onChange={e => {}} />);
    expect(await driver.exists()).toBe(true);
  });

  it('should call onChange callback (select by index)', async () => {
    const onChange = jest.fn();

    const driver = createDriver(
      <ColorPicker onChange={onChange}>
        <ColorPicker.Item aria-label={'red color'} value={'red'} />
      </ColorPicker>,
    );

    await driver.selectByIndex(0);

    await eventually(() => expect(onChange).toBeCalled);
  });

  it('should call onChange callback (select by color)', async () => {
    const onChange = jest.fn();
    const color = 'red';

    const driver = createDriver(
      <ColorPicker onChange={onChange}>
        <ColorPicker.Item aria-label={'red color'} value={color} />
      </ColorPicker>,
    );

    await driver.selectByColor(color);

    await eventually(() => expect(onChange).toBeCalled);
  });

  it('should support ColorPickerItemDriver (disabled, isCrossedOut)', async () => {
    const onChange = jest.fn();

    const driver = createDriver(
      <ColorPicker onChange={onChange}>
        <ColorPicker.Item aria-label={'red color'} value="red" isCrossedOut />
        <ColorPicker.Item aria-label={'red color'} value="blue" disabled />
      </ColorPicker>,
    );

    const itemDriverFirst = driver.getItemAt(0);
    const itemDriverSecond = driver.getItemAt(1);

    expect(await itemDriverFirst.isCrossedOut()).toBe(true);
    expect(await itemDriverFirst.isDisabled()).toBe(false);

    expect(await itemDriverSecond.isCrossedOut()).toBe(false);
    expect(await itemDriverSecond.isDisabled()).toBe(true);
  });

  it('should support ColorPickerItemDriver (tooltip)', async () => {
    const onChange = jest.fn();
    const color = 'red';

    const driver = createDriver(
      <ColorPicker onChange={onChange}>
        <ColorPicker.Item
          aria-label={'red color'}
          value={color}
          tooltip="Hello"
        />
      </ColorPicker>,
    );

    const itemDriverFirst = driver.getItemAt(0);

    expect(await itemDriverFirst.getTooltipText(bodyUniDriver)).toBe(
      'ArrowTop.svgHello',
    );
  });

  describe('testkit', () => {
    it('should exist', async () => {
      expect(
        await isUniTestkitExists(
          <ColorPicker onChange={e => {}} />,
          colorPickerTestkitFactory,
          {
            dataHookPropName: 'data-hook',
          },
        ),
      ).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', async () => {
      expect(
        await isUniEnzymeTestkitExists(
          <ColorPicker onChange={e => {}} />,
          enzymeColorPickerTestkitFactory,
          mount,
          {
            dataHookPropName: 'data-hook',
          },
        ),
      ).toBe(true);
    });
  });
});
