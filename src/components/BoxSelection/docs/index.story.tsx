import * as React from 'react';
import * as examples from './examples';
import {
  description,
  header,
  api,
  divider,
  importExample,
  playground,
  tab,
  code as baseCode,
  tabs,
  testkit,
  title,
} from 'wix-storybook-utils/Sections';
import { OptimizedStylesBanner } from '../../../../stories/OptimizedStylesBanner';
import { settingsApi } from '../../../../stories/utils/SettingsApi';
import { allComponents } from '../../../../stories/utils/allComponents';
import { settingsPanel } from '../../../../stories/utils/SettingsPanel';
import * as BoxSelectionWiringExampleRaw from '!raw-loader!./BoxSelectionWiringExample.tsx';
import * as BoxSelectionWiringExampleCSSRaw from '!raw-loader!./BoxSelectionWiringExample.st.css';
import { BoxSelectionWiringExample } from './BoxSelectionWiringExample';
import { BoxSelection } from '../';
import { storyComponent } from '../../../../stories/helperComponents/storyComponent';
import { StoryCategory } from '../../../../stories/storyHierarchy';
import { BoxSize } from '../BoxSelection';
import { BOX_SELECTION_DATA_HOOKS } from '../dataHooks';

const code = (config) =>
  baseCode({ components: allComponents, compact: true, ...config });

const children = [
  {
    label: '1 child',
    value: (
      <BoxSelection.Option key={1} id={'1'}>
        <div>Item-{1}</div>
      </BoxSelection.Option>
    ),
  },
  {
    label: '10 childrens with second selected',
    value: Array.apply(null, Array(10)).map((_n, i: number) => (
      <BoxSelection.Option key={i} id={`${i}`} checked={i === 1}>
        <div>Item-{i + 1}</div>
      </BoxSelection.Option>
    )),
  },
  {
    label: 'Unavailable , Disabled, Checked + Disabled',
    value: [1, 2, 3].map((n) => (
      <BoxSelection.Option
        key={n}
        id={`${n}`}
        unavailable={n === 1}
        disabled={n === 2 || n === 3}
        checked={n === 3}
      >
        <div>Item-{n}</div>
      </BoxSelection.Option>
    )),
  },
];

export default {
  category: StoryCategory.COMPONENTS,
  storyName: 'BoxSelection',
  component: storyComponent(BoxSelection),
  componentPath: '../BoxSelection.tsx',
  componentProps: () => ({
    'data-hook': BOX_SELECTION_DATA_HOOKS.BOX_SELECTION_WRAPPER,
    size: BoxSize.xLarge,
    name: 'hours',
    ariaLabel: '',
    ariaLabelledBy: '',
    children: children[0].value,
  }),
  exampleProps: {
    children,
    size: Object.values(BoxSize),
  },
  dataHook: BOX_SELECTION_DATA_HOOKS.BOX_SELECTION_WRAPPER,
  sections: [
    header({
      component: <OptimizedStylesBanner />,
    }),
    tabs([
      tab({
        title: 'Usage',
        sections: [
          description(
            'The box selection is used to give the user to select single or multiple boxes.',
          ),

          importExample({
            source: examples.importExample,
          }),

          divider(),

          title('Examples'),

          ...[
            {
              title: 'Unchecked And Checked',
              source: examples.uncheckedAndCheckedExample,
            },
            { title: 'Small Size', source: examples.smallSizeExample },
            { title: 'Disabled', source: examples.disabledExmaple },
            {
              title: 'Checked And Disabled',
              source: examples.disabledAndCheckedExmaple,
            },
            { title: 'Unavailable', source: examples.unavailableExample },
          ].map(code),
        ],
      }),
      ...[
        { title: 'API', sections: [api()] },
        {
          title: 'Style API',
          sections: [settingsApi()],
        },
        { title: 'TestKit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
        {
          title: 'Settings Panel',
          sections: [
            settingsPanel({
              title: 'BoxSelection Panel',
              example: <BoxSelectionWiringExample />,
              rawSource: BoxSelectionWiringExampleRaw,
              rawCSSSource: BoxSelectionWiringExampleCSSRaw,
              params: {
                numbers: [
                  {
                    label: 'Item Gap',
                    wixParam: 'itemGap',
                    defaultNumber: 12,
                    unit: 'px',
                  },
                  {
                    label: 'Border Radius',
                    wixParam: 'boxBorderRadius',
                    defaultNumber: 1,
                    unit: 'px',
                  },
                  {
                    label: 'Border Width',
                    wixParam: 'boxBorderWidth',
                    defaultNumber: 1,
                    unit: 'px',
                  },
                ],
                colors: [
                  {
                    label: 'Box Selection BG',
                    wixParam: 'selectedBoxColor',
                    defaultColor: 'color-8',
                  },
                  {
                    label: 'Box BG',
                    wixParam: 'boxFillColor',
                    defaultColor: 'color-1',
                  },
                  {
                    label: 'Box Border color',
                    wixParam: 'borderColor',
                    defaultColor: 'color-5',
                  },
                ],
              },
            }),
          ],
        },
      ].map(tab),
    ]),
  ],
};
