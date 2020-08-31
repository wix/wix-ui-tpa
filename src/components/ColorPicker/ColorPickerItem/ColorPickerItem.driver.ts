import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { StylableUnidriverUtil, UniDriver } from 'wix-ui-test-utils/unidriver';
import { tooltipDriverFactory } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.driver';
import { radioButtonDriverFactory } from 'wix-ui-core/dist/src/components/radio-button/RadioButton.driver';
import { Simulate } from 'react-dom/test-utils';
import {
  colorPickerItemDataHook,
  colorPickerItemTooltipDataHook,
} from '../dataHooks';
import * as style from './ColorPickerItem.st.css';

export interface ColorPickerItemDriver extends BaseUniDriver {
  isDisabled(): Promise<boolean>;
  isCrossedOut(): Promise<boolean>;
  getTooltipText(): Promise<string>;
  hasTooltip(): Promise<boolean>;
}

export const colorPickerItemDriverFactory = (
  base: UniDriver,
): ColorPickerItemDriver => {
  const stylableUtil = new StylableUnidriverUtil(style);
  const baseUniDriver = baseUniDriverFactory(base);
  const getTooltipDriver = async () => {
    const element = (await baseUniDriver.element()).querySelector(
      `[data-hook=${colorPickerItemTooltipDataHook}]`,
    );
    return tooltipDriverFactory({ element, eventTrigger: Simulate });
  };
  const getCoreRadioButtonDriver = async () => {
    const element = (await baseUniDriver.element()).querySelector(
      `[data-hook="${colorPickerItemDataHook}"]`,
    );
    return radioButtonDriverFactory({ element, eventTrigger: Simulate });
  };

  return {
    ...baseUniDriverFactory(base),
    isDisabled: async () => {
      return (await getCoreRadioButtonDriver()).isDisabled();
      return (
        (await base
          .$(`[data-hook="${colorPickerItemDataHook}"]`)
          .attr('disabled')) !== null
      );
    },
    isCrossedOut: async () => {
      return !!(await stylableUtil.getStyleState(
        base.$(`[data-hook="${colorPickerItemDataHook}"]`),
        'isCrossedOut',
      ));
    },
    getTooltipText: async () => {
      const tooltipDriver = await getTooltipDriver();
      return tooltipDriver.getTooltipText();
    },
    hasTooltip: async () => {
      const tooltipDriver = await getTooltipDriver();
      return tooltipDriver.exists();
    },
  };
};