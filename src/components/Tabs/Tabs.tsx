import * as React from 'react';
import classnames from 'classnames';
import ReactResizeDetector from 'react-resize-detector';
import ChevronLeft from 'wix-ui-icons-common/ChevronLeft';
import ChevronRight from 'wix-ui-icons-common/ChevronRight';
import { TPAComponentsConsumer } from '../TPAComponentsConfig';
import { TabItem } from './Tab';
import { ScrollableTabs } from './ScrollableTabs';
import { TabsNavButton } from './TabsNavButton';
import { ALIGNMENT, SKIN, VARIANT } from './constants';
import style from './Tabs.st.css';
import { TABS_DATA_HOOKS, TABS_DATA_KEYS } from './dataHooks';
import { TPAComponentProps } from '../../types';

const SCROLL_EPSILON = 1;

export const enum NavButtonOptions {
  both = 'both',
  left = 'left',
  right = 'right',
  none = 'none',
}

export interface TabsProps extends TPAComponentProps {
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
  'data-hook'?: string;
}

interface TabsState {
  navButtons?: NavButtonOptions;
  animateIndicator: boolean;
  selectedTab: number;
}

export class Tabs extends React.Component<TabsProps, TabsState> {
  private _tabsRef: ScrollableTabs;
  private _resizeTimer: NodeJS.Timeout;
  private _indicatorTimer: NodeJS.Timeout;

  static defaultProps = {
    skin: SKIN.fullUnderline,
    variant: VARIANT.fit,
    alignment: ALIGNMENT.center,
  };

  state = {
    navButtons: NavButtonOptions.none,
    animateIndicator: false,
    selectedTab: this.props.activeTabIndex,
  };

  static getDerivedStateFromProps(props, state) {
    let newState = null;

    if (state.selectedTab !== props.activeTabIndex) {
      newState = {
        navButtons: state.navButtons,
        animateIndicator: true,
      };
    }

    return newState;
  }

  componentDidMount() {
    this._updateButtonsIfNeeded();
  }

  componentDidUpdate() {
    const { selectedTab } = this.state;
    const { activeTabIndex } = this.props;

    clearTimeout(this._indicatorTimer);

    if (selectedTab !== activeTabIndex) {
      this.setState(
        { selectedTab: activeTabIndex, animateIndicator: true },
        () => {
          this._indicatorTimer = setTimeout(() => {
            this.setState({
              animateIndicator: false,
            });
          }, 350);
        },
      );
    }

    this._updateButtonsIfNeeded();
  }

  componentWillUnmount(): void {
    clearTimeout(this._resizeTimer);
    clearTimeout(this._indicatorTimer);
  }

  _onClickLeft = () => {
    this._tabsRef.scrollLeft();
  };

  _onClickRight = () => {
    this._tabsRef.scrollRight();
  };

  _onClickItem = (index: number) => {
    const { activeTabIndex, onTabClick } = this.props;

    if (index !== activeTabIndex) {
      onTabClick(index);
    }
  };

  _getNewNavButtons() {
    const scrollPosition = this._tabsRef.getNavScrollPosition();
    let newNavButtons = NavButtonOptions.none;

    if (scrollPosition.scrollLeft >= SCROLL_EPSILON) {
      newNavButtons = NavButtonOptions.left;
    }

    if (scrollPosition.scrollRight >= SCROLL_EPSILON) {
      newNavButtons =
        newNavButtons === NavButtonOptions.none
          ? NavButtonOptions.right
          : NavButtonOptions.both;
    }

    return newNavButtons;
  }

  _updateButtonsIfNeeded = () => {
    const { navButtons } = this.state;
    const newNavButtons = this._getNewNavButtons();

    if (newNavButtons !== navButtons) {
      this.setState({ navButtons: newNavButtons });
    }
  }

  _onResize = () => {
    clearTimeout(this._resizeTimer);

    this._updateButtonsIfNeeded();

    this._resizeTimer = setTimeout(() => {
      this._tabsRef.updateIndicatorPosition();
    }, 100);
  };

  _tabsRefCallback = (el: ScrollableTabs) => {
    this._tabsRef = el;
  };

  _getDataAttributes(mobile) {
    const { navButtons } = this.state;
    const { skin } = this.props;

    return {
      [TABS_DATA_KEYS.skin]: skin,
      [TABS_DATA_KEYS.mobile]: mobile,
      [TABS_DATA_KEYS.navButtons]: navButtons,
    };
  }

  render() {
    const { navButtons, animateIndicator, selectedTab } = this.state;
    const { items, alignment, skin, variant } = this.props;

    return (
      <TPAComponentsConsumer>
        {({ mobile }) => (
          <div
            {...style('root', { skin, navButtons, mobile }, this.props)}
            {...this._getDataAttributes(mobile)}
            data-hook={this.props['data-hook']}
          >
            <ReactResizeDetector handleWidth onResize={this._onResize} />
            <ScrollableTabs
              alignment={alignment}
              variant={variant}
              items={items}
              className={style.navigation}
              onClickItem={this._onClickItem}
              onScroll={this._updateButtonsIfNeeded}
              activeTabIndex={selectedTab}
              animateIndicator={animateIndicator}
              ref={this._tabsRefCallback}
            />
            <TabsNavButton
              onClick={this._onClickLeft}
              className={classnames(style.navBtn, style.navBtnLeft)}
              tabIndex={NavButtonOptions.right ? -1 : 0}
              data-hook={TABS_DATA_HOOKS.leftNavButton}
            >
              <ChevronLeft />
            </TabsNavButton>
            <TabsNavButton
              onClick={this._onClickRight}
              className={classnames(style.navBtn, style.navBtnRight)}
              tabIndex={NavButtonOptions.left ? -1 : 0}
              data-hook={TABS_DATA_HOOKS.rightNavButton}
            >
              <ChevronRight />
            </TabsNavButton>
            <div className={style.border} />
          </div>
        )}
      </TPAComponentsConsumer>
    );
  }
}
