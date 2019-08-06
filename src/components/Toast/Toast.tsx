import * as React from 'react';
import styles from './Toast.st.css';
import { TPAComponentsConsumer } from '../TPAComponentsConfig';
import { CloseIconButton } from './CloseIconButton/CloseIconButton';
import { DefaultProps, ToastProps } from './types';

export class Toast extends React.Component<ToastProps> {
  static displayName = 'Toast';

  static defaultProps: DefaultProps = {
    shouldShowCloseButton: false,
  };

  handleOnCloseClick = (event: MouseEvent) => {
    const { onClose } = this.props;
    onClose && onClose(event);
  };

  render() {
    const { skin, shouldShowCloseButton, children, ...rest } = this.props;

    return (
      <TPAComponentsConsumer>
        {({ mobile, rtl }) => (
          <div
            {...styles('root', { mobile, rtl, skin }, rest)}
            role="alert"
            data-skin={skin}
            data-mobile={mobile}
          >
            <span role="presentation" className={styles.gapBeforeMessage} />
            <span className={styles.message} data-hook="message">
              {children}
            </span>
            {shouldShowCloseButton ? (
              <div className={styles.closeButtonWrapper}>
                <CloseIconButton
                  onClick={this.handleOnCloseClick}
                  data-hook="closeButton"
                />
              </div>
            ) : (
              <span role="presentation" className={styles.gapAfterMessage} />
            )}
          </div>
        )}
      </TPAComponentsConsumer>
    );
  }
}
