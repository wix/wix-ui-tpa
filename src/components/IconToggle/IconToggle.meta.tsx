import * as React from 'react';
import { IconToggle } from '.';
import { Heart } from '../../assets/icons';
import Registry from '@ui-autotools/registry';

const IconToggleMetadata = Registry.getComponentMetadata(IconToggle);
IconToggleMetadata.nonReactStrictModeCompliant = true;

IconToggleMetadata.addSim({
  title: 'with label',
  props: {
    icon: <Heart />,
    label: 'Heart',
  },
});

IconToggleMetadata.addSim({
  title: 'without label',
  props: {
    icon: <Heart />,
    'aria-label': 'Heart',
  },
});
