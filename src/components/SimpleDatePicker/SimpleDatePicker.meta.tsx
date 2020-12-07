import { SimpleDatePicker, SimpleDatePickerProps } from '.';
import Registry from '@ui-autotools/registry';

const SimpleDatePickerMetadata = Registry.getComponentMetadata(SimpleDatePicker);
SimpleDatePickerMetadata.nonReactStrictModeCompliant = true;

SimpleDatePickerMetadata.addSim({
  title: 'render',
  props: {
    buttonText: 'Click me!'
  } as SimpleDatePickerProps,
});
