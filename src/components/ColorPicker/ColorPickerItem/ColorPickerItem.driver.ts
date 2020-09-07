import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { StylableUnidriverUtil, UniDriver } from 'wix-ui-test-utils/unidriver';
import { tooltipDriverFactory } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.uni.driver';
import { radioButtonDriverFactory } from 'wix-ui-core/dist/src/components/radio-button/RadioButton.driver';
import { Simulate } from 'react-dom/test-utils';
import { colorPickerItemTooltipDataHook } from '../dataHooks';
import * as style from './ColorPickerItem.st.css';

export interface ColorPickerItemDriver extends BaseUniDriver {
  isDisabled(): Promise<boolean>;
  isCrossedOut(): Promise<boolean>;
  getTooltipText(bodyUniDriver: UniDriver): Promise<string>;
  hasTooltip(bodyUniDriver: UniDriver): Promise<boolean>;
}

export const colorPickerItemDriverFactory = (
  base: UniDriver,
): ColorPickerItemDriver => {
  const stylableUtil = new StylableUnidriverUtil(style);
  const baseUniDriver = baseUniDriverFactory(base);

  const getTooltipDriver = async (body: UniDriver) => {
    const element = base.$(`[data-hook=${colorPickerItemTooltipDataHook}]`);
    return tooltipDriverFactory(element, body);
  };

  const getCoreRadioButtonDriver = async () => {
    return radioButtonDriverFactory({
      element: await baseUniDriver.element(),
      eventTrigger: Simulate,
    });
  };

  return {
    ...baseUniDriver,
    isDisabled: async () => {
      return (await getCoreRadioButtonDriver()).isDisabled();
    },
    isCrossedOut: async () => {
      return !!(await stylableUtil.getStyleState(base, 'isCrossedOut'));
    },
    getTooltipText: async bodyUniDriver => {
      const tooltipDriver = await getTooltipDriver(bodyUniDriver);
      return tooltipDriver.getTooltipText();
    },
    hasTooltip: async bodyUniDriver => {
      const tooltipDriver = await getTooltipDriver(bodyUniDriver);
      return tooltipDriver.exists();
    },
  };
};