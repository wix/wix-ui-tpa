import * as React from 'react';
import { SocialBarIcon } from './SocialBarIcon';

import styles from './SocialBar.st.css';

export type SocialBarTheme = 'light' | 'dark';

export interface SocialBarProps {
  theme?: SocialBarTheme;
}

interface DefaultProps {
  theme: SocialBarTheme;
}

export interface SocialBarInjectedProps {
  socialBarTheme: SocialBarTheme;
}

/** SocialBar */
export class SocialBar extends React.Component<SocialBarProps> {
  static Icon = SocialBarIcon;
  static displayName = 'SocialBar';
  static defaultProps: DefaultProps = { theme: 'light' };

  render() {
    const { theme, children, ...rest } = this.props;

    const childProps: SocialBarInjectedProps = { socialBarTheme: theme };

    return (
      <div {...styles('root', { theme }, rest)}>
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return React.cloneElement(child, childProps);
        })}
      </div>
    );
  }
}
