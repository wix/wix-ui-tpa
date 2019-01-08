import * as React from 'react';
import {textDriverFactory} from './Text.driver';
import {Text, TYPOGRAPHY} from './';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {mount} from 'enzyme';
import {textTestkitFactory} from '../../testkit';
import {textTestkitFactory as enzymeTextTestkitFactory} from '../../testkit/enzyme';

describe('Text', () => {
  const createDriver = createDriverFactory(textDriverFactory);
  let driver;

  function expectTextToHaveAttributes(expectedTag, expectedTypography) {
    expect(driver.getTagName()).toEqual(expectedTag);
    expect(driver.getTypography()).toEqual(expectedTypography);
  }

  it('should render', () => {
    const value = 'hello!';

    driver = createDriver(<Text>{value}</Text>);

    expect(driver.getContent()).toEqual(value);
  });

  it('should render smallTitle', () => {
    const expectedTag = 'h5';
    const expectedTypography = TYPOGRAPHY.smallTitle;

    driver = createDriver(<Text typography={expectedTypography}/>);

    expectTextToHaveAttributes(expectedTag, expectedTypography);
  });

  it('should render runningText', () => {
    const expectedTag = 'p';
    const expectedTypography = TYPOGRAPHY.runningText;

    driver = createDriver(<Text typography={expectedTypography}/>);

    expectTextToHaveAttributes(expectedTag, expectedTypography);
  });

  it('should use runningText as default', () => {
    const expectedTag = 'p';
    const expectedTypography = TYPOGRAPHY.runningText;

    driver = createDriver(<Text/>);

    expectTextToHaveAttributes(expectedTag, expectedTypography);
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Text/>, textTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Text/>, enzymeTextTestkitFactory, mount)).toBe(true);
    });
  });
});
