import * as React from 'react';
import { st, classes } from './CheckboxGroup.st.css';
import { Checkbox } from '../Checkbox';
import { TPAComponentProps } from '../../types';

export enum Layout {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}
export interface CheckboxGroupProps extends TPAComponentProps {
  label?: string | React.ReactNode;
  children?: any;
  layout?: Layout;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  'data-hook'?: string;
}

interface DefaultProps {
  layout: Layout;
}

export class CheckboxGroup extends React.Component<CheckboxGroupProps> {
  static displayName = 'CheckboxGroup';
  static defaultProps: DefaultProps = {
    layout: Layout.Vertical,
  };

  render() {
    const {
      label,
      layout,
      error,
      disabled,
      errorText,
      className
    } = this.props;

    return (
      <fieldset
        data-hook={this.props['data-hook']}
        className={st('root', { layout, disabled }, className)}
      >
        {!!label && <legend className={classes.label}>{label}</legend>}

        <div className={classes.wrapper}>
          {React.Children.map(
            this.props.children,
            (child: Checkbox, idx: number) => {
              if (!React.isValidElement(child)) {
                return null;
              }
              return (
                <>
                  {React.cloneElement(child, {
                    key: idx,
                    error,
                    disabled,
                  })}
                </>
              );
            },
          )}
        </div>
        {!!errorText && !disabled && (
          <span className={classes.error}>{errorText}</span>
        )}
      </fieldset>
    );
  }
}
