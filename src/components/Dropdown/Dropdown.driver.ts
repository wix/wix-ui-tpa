import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { Simulate } from 'react-dom/test-utils';
import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { dropdownDriverFactory as coreDriverFactory } from 'wix-ui-core/dist/src/components/dropdown/Dropdown.driver';
import { hasDataAttr, hasMobile } from '../../test/utils';
import { DATA_ATTRIBUTES, DATA_HOOKS } from './constants';
import { tooltipDriverFactory } from '../Tooltip/Tooltip.driver';

export interface DropdownDriver extends BaseDropdownDriver, BaseUniDriver {
  isMobile(): Promise<boolean>;
  isNativeSelect(): Promise<boolean>;
  getDropdownCoreDriver(baseUniDriver: BaseUniDriver);
  getTooltipDriver(baseUniDriver: BaseUniDriver);
}

interface BaseDropdownDriver {
  isDisabled(): Promise<boolean>;
  areOptionsShown(): Promise<boolean>;
  getOptionsCount(): Promise<number>;
  selectOptionAt(index: number): Promise<void>;
  hasError(): Promise<boolean>;
  hasErrorMessage(): Promise<boolean>;
  getErrorMessageContent(): Promise<string>;
  click(): Promise<void>;
  hasAriaHasPopup(): Promise<boolean>;
  getAriaLabel(): Promise<string | null>;
  getAriaLabelledBy(): Promise<string | null>;
  getDisplayedSelectedValue(): Promise<string>;
}

const getDropdownCoreDriver = async (baseUniDriver: BaseUniDriver) => {
  const element = (await baseUniDriver.element()).querySelector(
    `[data-hook="${DATA_HOOKS.coreDropdown}"]`,
  );
  return coreDriverFactory({ element, eventTrigger: Simulate });
};

const getTooltipDriver = async (baseUniDriver: BaseUniDriver) => {
  const element = (await baseUniDriver.element()).querySelector(
    `[data-hook="${DATA_HOOKS.errorTooltip}"]`,
  );
  return tooltipDriverFactory({ element, eventTrigger: Simulate });
};

const getDropdownNativeSelect = async (base: UniDriver) => {
  return base.$(`[data-hook="${DATA_HOOKS.nativeSelect}"]`);
};

const regularDriver = (
  base: UniDriver,
  baseUniDriver: BaseUniDriver,
): BaseDropdownDriver => {
  const getDropdownBase = async () => {
    return base.$(`[data-hook="${DATA_HOOKS.base}"]`);
  };

  return {
    isDisabled: async () =>
      (await (await getDropdownBase()).attr('disabled')) !== null,
    hasAriaHasPopup: async () =>
      (await (await getDropdownBase()).attr('aria-haspopup')) !== null,
    getAriaLabel: async () => (await getDropdownBase()).attr('aria-label'),
    getAriaLabelledBy: async () =>
      (await getDropdownBase()).attr('aria-labelledby'),
    click: async () => (await getDropdownCoreDriver(baseUniDriver)).click(),
    areOptionsShown: async () =>
      (await getDropdownCoreDriver(baseUniDriver)).isContentElementExists(),
    getOptionsCount: async () =>
      (await getDropdownCoreDriver(baseUniDriver)).getOptionsCount(),
    selectOptionAt: async (index: number) => {
      (await getDropdownCoreDriver(baseUniDriver)).optionAt(index).click();
    },
    hasErrorMessage: async () =>
      (await getTooltipDriver(baseUniDriver)).exists(),
    hasError: async () =>
      hasDataAttr(await getDropdownBase(), 'dropdown-base-error', 'true'),
    getErrorMessageContent: async () => {
      const tooltipDriver = await getTooltipDriver(baseUniDriver);
      tooltipDriver.mouseEnter();
      return tooltipDriver.getContentElement().innerHTML;
    },
  };
};

const nativeDriver = (
  base: UniDriver,
  baseUniDriver: BaseUniDriver,
): BaseDropdownDriver => {
  const getNativeOptions = () =>
    base.$$(`option:not([data-hook="${DATA_HOOKS.placeholderOption}"])`);
  const warnUnsupportedFunction = (fnName: string) => {
    console.warn(
      `Function ${fnName} is not supported within native dropdown mode.`,
    );
    return null;
  };

  return {
    isDisabled: async () =>
      (await (await getDropdownNativeSelect(base)).attr('disabled')) !== null,
    getAriaLabel: async () =>
      (await getDropdownNativeSelect(base)).attr('aria-label'),
    getAriaLabelledBy: async () =>
      (await getDropdownNativeSelect(base)).attr('aria-labelledby'),
    hasAriaHasPopup: async () => warnUnsupportedFunction('hasAriaHasPopup'),
    click: async () => warnUnsupportedFunction('click'),
    areOptionsShown: async () => warnUnsupportedFunction('areOptionsShown'),
    selectOptionAt: async (index: number) => {
      const option = getNativeOptions().get(index);
      const isDisabled = (await option.attr('disabled')) !== null;
      !isDisabled && Simulate.change(await option.getNative());
    },
    getOptionsCount: async () => getNativeOptions().count(),
    hasErrorMessage: async () =>
      (await getTooltipDriver(baseUniDriver)).exists(),
    hasError: async () =>
      (await (await getDropdownNativeSelect(base)).attr(
        DATA_ATTRIBUTES.error,
      )) !== null,
    getErrorMessageContent: async () => {
      const tooltipDriver = await getTooltipDriver(baseUniDriver);
      tooltipDriver.mouseEnter();
      return tooltipDriver.getContentElement().innerHTML;
    },
  };
};

export const dropdownDriverFactory = (base: UniDriver): DropdownDriver => {
  const baseUniDriver = baseUniDriverFactory(base);
  const isNativeSelect = async () =>
    (await getDropdownNativeSelect(base)).exists();

  const getDriver = async () =>
    (await isNativeSelect())
      ? nativeDriver(base, baseUniDriver)
      : regularDriver(base, baseUniDriver);

  return {
    ...baseUniDriver,
    isMobile: () => hasMobile(base),
    isNativeSelect,
    isDisabled: async () => (await getDriver()).isDisabled(),
    hasAriaHasPopup: async () => (await getDriver()).hasAriaHasPopup(),
    getAriaLabel: async () => (await getDriver()).getAriaLabel(),
    getAriaLabelledBy: async () => (await getDriver()).getAriaLabelledBy(),
    click: async () => (await getDriver()).click(),
    areOptionsShown: async () => (await getDriver()).areOptionsShown(),
    getOptionsCount: async () => (await getDriver()).getOptionsCount(),
    selectOptionAt: async (index: number) =>
      (await getDriver()).selectOptionAt(index),
    hasErrorMessage: async () => (await getDriver()).hasErrorMessage(),
    hasError: async () => (await getDriver()).hasError(),
    getErrorMessageContent: async () =>
      (await getDriver()).getErrorMessageContent(),
    getTooltipDriver,
    getDropdownCoreDriver,
    getDisplayedSelectedValue: async () => {
      return (await getDropdownBase()).text();
    },
  };
};
