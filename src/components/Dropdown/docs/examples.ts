import { DROPDOWN_ALIGNMENT } from '../Dropdown';

import {
  baseOptions,
  numberOptions,
  optionsWithIcon,
  optionsWithIconAndSubtitles,
  optionsWithSections,
  optionsWithSubtitle,
} from './exampleOptions';

export const importExample = `import { Dropdown, DROPDOWN_ALIGNMENT } from 'wix-ui-tpa/Dropdown';`;

export const example = `
    <Dropdown placeholder="Placeholder Text" options={${JSON.stringify(
      baseOptions,
    )}} />
`;

export const disabledExample = `
    <Dropdown placeholder="Placeholder Text" disabled options={${JSON.stringify(
      baseOptions,
    )}}/>
`;

export const alignmentExample = `
    <Dropdown placeholder="Placeholder Text" options={${JSON.stringify(
      baseOptions,
    )}} alignment="${DROPDOWN_ALIGNMENT.center}" label="Label Text" />
`;

export const errorExample = `
    <Dropdown placeholder="Placeholder Text" error={true} options={${JSON.stringify(
      baseOptions,
    )}}/>
`;

export const errorWithMessageExample = `
    <Dropdown placeholder="Placeholder Text" error={true} errorMessage="The coupon code is not valid" options={${JSON.stringify(
      baseOptions,
    )}}/>
`;

export const withLabelExample = `
    <Dropdown placeholder="Placeholder Text" label="Label Text" options={${JSON.stringify(
      baseOptions,
    )}}/>
`;

export const sectionTitleExample = `
    <Dropdown placeholder="Placeholder Text" label="Label Text" options={${JSON.stringify(
      optionsWithSections,
    )}}/>
`;

export const withSubtitlesExample = `
    <Dropdown placeholder="Placeholder Text" options={${JSON.stringify(
      optionsWithSubtitle,
    )}} />
`;

export const withIconsExample = `
    <Dropdown placeholder="Placeholder Text" options={${JSON.stringify(
      optionsWithIcon,
    )}} />
`;

export const withIconsAndSubtitlesExample = `
    <Dropdown placeholder="Placeholder Text" options={${JSON.stringify(
      optionsWithIconAndSubtitles,
    )}} />
`;

export const minWidthExample = `
    <div style={{width: '0px'}}>
        <Dropdown options={${JSON.stringify(
          numberOptions,
        )}} initialSelectedId={0}/>
    </div>
`;

export const mobileExample = `
    <ExampleWithContextProps mobile={true}>
        <Dropdown />
    </ExampleWithContextProps>
`;
