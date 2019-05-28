import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { StylableUnidriverUtil, UniDriver } from 'wix-ui-test-utils/unidriver';
import style from './CardList.st.css';

export interface cardListDriver extends BaseUniDriver {
  isDividerWidth(dividerWidth): Promise<boolean>;
  isItemsPerRow(itemsPerRow): Promise<boolean>;
  isItemMaxWidth(itemsPerRow): Promise<boolean>;
  isWithDivider(): Promise<boolean>;
}

export const cardListDriverFactory = (base: UniDriver): cardListDriver => {
  const stylableUtil = new StylableUnidriverUtil(style);

  return {
    ...baseUniDriverFactory(base),
    isItemsPerRow: async itemsPerRow => {
      return (await base.$('ul').attr('style')).includes(
        `repeat(${itemsPerRow},`,
      );
    },
    isItemMaxWidth: async itemMaxWidth => {
      return (await base.$('ul').attr('style')).includes(itemMaxWidth);
    },
    isWithDivider: async () => {
      return stylableUtil.hasStyleState(base, 'dividers');
    },
    isDividerWidth: async dividerWidth => {
      return (await base.$('style').text()).includes(`height: ${dividerWidth}`);
    },
  };
};
