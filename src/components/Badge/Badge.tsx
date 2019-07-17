import * as React from 'react';
import styles from './Badge.st.css';

export enum BADGE_PRIORITY {
  default = 'default',
  light = 'light',
  primary = 'primary',
}

export interface BadgeProps {
  priority?: BADGE_PRIORITY;
}

class Badge extends React.Component<BadgeProps> {
  static displayName = 'Badge';

  render() {
    const { priority, children, ...rest } = this.props;
    return (
      <div
        data-priority={priority}
        {...styles(
          'root',
          {
            priority,
          },
          rest,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
}

export { Badge };
