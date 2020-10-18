import * as React from 'react';
import { TPAComponentProps } from '../../types';

import WSRAddItem from 'wix-style-react/dist/src/AddItem';
import ThemeProvider from 'wix-style-react/dist/src/ThemeProvider';
import { theme } from './WSRTheme';

import { st, classes } from './AddItem.st.css';
import { DATA_HOOKS } from './constants';

export enum ICON_SIZE {
  small = 'small',
  medium = 'medium',
  large = 'large',
  xLarge = 'xLarge',
}

export enum ALIGNMENT {
  center = 'center',
  right = 'right',
  left = 'left',
}

export enum DIRECTION {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

const WSR_SIZE_MAP = {
  [ICON_SIZE.small]: 'tiny',
  [ICON_SIZE.medium]: 'small',
  [ICON_SIZE.large]: 'medium',
  [ICON_SIZE.xLarge]: 'large',
};

export interface AddItemProps extends TPAComponentProps {
  /** Applies disabled styles */
  disabled?: boolean;
  /** Applies error styles */
  hasError?: boolean;
  /** Content horizontal alignment */
  alignment?: ALIGNMENT;
  /** Indicates whether to display the content horizontally or vertically */
  direction: DIRECTION;
  /** Size to control the size of the icon  */
  iconSize?: ICON_SIZE;
  /** Could be any renderable node */
  children?: React.ReactNode;
  /** Click event handler  */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface DefaultProps {
  disabled: boolean;
  hasError: boolean;
  alignment: ALIGNMENT;
  direction: DIRECTION;
  iconSize: ICON_SIZE;
}

/** Add Item is a component used to add new items to an existing items list. */
export class AddItem extends React.Component<AddItemProps> {
  static displayName = 'AddItem';
  static defaultProps: DefaultProps = {
    disabled: false,
    hasError: false,
    alignment: ALIGNMENT.center,
    direction: DIRECTION.horizontal,
    iconSize: ICON_SIZE.medium,
  };

  render() {
    const {
      className,
      children,
      disabled,
      alignment,
      direction,
      iconSize,
      hasError,
      onClick,
    } = this.props;

    const rootClassName = st(classes.root, className);
    const noChildren = !children;

    return (
      <ThemeProvider
        dataHook={this.props['data-hook']}
        theme={theme(rootClassName)}
      >
        <WSRAddItem
          className={st(
            classes.wsrAddItemRoot,
            { hasError, direction, noChildren },
            className,
          )}
          dataHook={DATA_HOOKS.ADD_ITEM}
          disabled={disabled}
          theme="dashes"
          alignItems={alignment}
          borderRadius="0"
          // @ts-ignore
          size={WSR_SIZE_MAP[iconSize]}
          onClick={onClick}
        >
          {() => (
            <div className={classes.text} data-hook={DATA_HOOKS.TEXT}>
              {children}
            </div>
          )}
        </WSRAddItem>
      </ThemeProvider>
    );
  }
}
