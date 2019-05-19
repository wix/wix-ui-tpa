import * as React from 'react';
import classnames from 'classnames';
import { ChevronLeft, ChevronRight } from 'wix-ui-icons-common';
import { TabItem } from '../Tab/Tab';
import { ScrollableTabs } from '../ScrollableTabs/ScrollableTabs';
import { TabsNavButton } from '../TabsNavButton/TabsNavButton';
import { ALIGNMENT, SKIN, VARIANT } from '../../Tabs/constants';
import style from './Tabs.st.css';

const enum NavButtonOptions {
  both = 'both',
  left = 'left',
  right = 'right',
  none = 'none',
}

export interface TabsProps {
  /** tabs to be displayed */
  items: TabItem[];
  /** callback function when tab is selected , returning the selected item index */
  onTabClick?(index: number): void;
  /** index of the selected tab item */
  activeTabIndex?: number;
  /** control whether to display border under tabs*/
  skin?: SKIN;
  /** control where to align the tabs */
  alignment?: ALIGNMENT;
  /** control whether to set tabs on all content width*/
  variant?: VARIANT;
}

interface TabsState {
  navButtons?: NavButtonOptions;
  tabsKey: string;
}

export class Tabs extends React.Component<TabsProps, TabsState> {
  private _tabsRef: ScrollableTabs;

  state = {
    navButtons: NavButtonOptions.none,
    tabsKey: 'asd',
  };

  _onClickLeft = () => {
    this._tabsRef.scrollLeft();
  };

  _onClickRight = () => {
    this._tabsRef.scrollRight();
  };

  _onClickItem = () => {};

  _onScroll = (event: React.UIEvent) => {
    const { navButtons } = this.state;
    const target = event.target as HTMLDivElement;
    const navigationWidth = target.clientWidth;
    const navigationScrollWidth = target.scrollWidth;
    const scrollLeft = target.scrollLeft;
    let newNavButtons = NavButtonOptions.none;

    if (scrollLeft > 0) {
      newNavButtons = NavButtonOptions.left;
    }

    if (scrollLeft + navigationWidth < navigationScrollWidth) {
      newNavButtons =
        newNavButtons === NavButtonOptions.none
          ? NavButtonOptions.right
          : NavButtonOptions.both;
    }

    if (newNavButtons !== navButtons) {
      this.setState({ navButtons: newNavButtons });
    }
  };

  _tabsRefCallback = (el: ScrollableTabs) => {
    this._tabsRef = el;
  };

  render() {
    const { navButtons } = this.state;
    const {
      items,
      alignment,
      skin,
      variant,
      activeTabIndex,
      onTabClick,
    } = this.props;

    return (
      <div {...style('root', { navButtons }, this.props)}>
        <ScrollableTabs
          alignment={alignment}
          variant={variant}
          skin={skin}
          items={items}
          className={style.navigation}
          onClickItem={onTabClick}
          onScroll={this._onScroll}
          activeTabIndex={activeTabIndex}
          ref={this._tabsRefCallback}
        />
        <TabsNavButton
          onClick={this._onClickLeft}
          className={classnames(style.navBtn, style.navBtnLeft)}
        >
          <ChevronLeft size="35" />
        </TabsNavButton>
        <TabsNavButton
          onClick={this._onClickRight}
          className={classnames(style.navBtn, style.navBtnRight)}
        >
          <ChevronRight size="35" />
        </TabsNavButton>
      </div>
    );
  }
}
