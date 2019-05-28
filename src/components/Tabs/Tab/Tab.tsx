import * as React from 'react';
import { isSelectKey } from '../utils';
import style from './Tab.st.css';
import { TABS_DATA_KEYS } from '../dataHooks';

export interface TabItem {
  /** Title of the tab */
  title?: string;
}

interface TabProps {
  item: TabItem;
  index: number;
  isActive: boolean;
  onClick(index: number): void;
  className: string;
  dataHook: string;
}

export const Tab = React.forwardRef<HTMLDivElement, TabProps>((props, ref) => {
  const { index, item, onClick, isActive, dataHook } = props;
  const title = item.title;
  const onSelectTab = () => {
    onClick(index);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keyCode = e.keyCode;

    if (isSelectKey(keyCode)) {
      onSelectTab();
      e.preventDefault();
      return false;
    }
  };
  const dataAttributes = {
    [TABS_DATA_KEYS.tabIndex]: index,
    [TABS_DATA_KEYS.tabIsActive]: isActive,
  };

  return (
    <div
      {...style('root', {}, props)}
      ref={ref}
      {...dataAttributes}
      data-hook={dataHook}
      key={`${title}-${index}`}
      onClick={onSelectTab}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {title}
      <div className={style.focusIndicatorWrapper} tabIndex={-1}>
        <div className={style.focusIndicator} tabIndex={-1}/>
      </div>
    </div>
  );
});
