const files = [
  ['ActionsMenuLayout.bundle.min.js', 6],
  ['ActionsMenuLayoutExtended.bundle.min.js', 6.1],
  ['AddItem.bundle.min.js', 45.5],
  ['AddItemExtended.bundle.min.js', 45.8],
  ['Autocomplete.bundle.min.js', 37],
  ['Avatar.bundle.min.js', 16],
  ['AvatarGroupExtended.bundle.min.js', 19.6],
  ['AvatarGroup.bundle.min.js', 19],
  ['Badge.bundle.min.js', 5],
  ['BadgeExtended.bundle.min.js', 5],
  ['Button.bundle.min.js', 9],
  ['ButtonExtended.bundle.min.js', 10.3],
  ['CalendarCell.bundle.min.js', 5],
  ['CalendarCellExtended.bundle.min.js', 5],
  ['CalendarPopover.bundle.min.js', 10],
  ['CalendarPopoverExtended.bundle.min.js', 11.5],
  ['Card.bundle.min.js', 5],
  ['Checkbox.bundle.min.js', 7],
  ['CheckboxExtended.bundle.min.js', 7.2],
  ['CheckboxGroup.bundle.min.js', 5],
  ['CheckboxGroupExtended.bundle.min.js', 7.6],
  ['ColorPicker.bundle.min.js', 36],
  ['CopyUrlButton.bundle.min.js', 38],
  ['CopyUrlButtonExtended.bundle.min.js', 38],
  ['Counter.bundle.min.js', 34],
  ['CounterExtended.bundle.min.js', 34.2],
  ['DatePicker.bundle.min.js', 187],
  ['DatePickerExtended.bundle.min.js', 124],
  ['DatePickerInput.bundle.min.js', 210],
  ['DatePickerInputExtended.bundle.min.js', 147],
  ['Dialog.bundle.min.js', 11],
  ['DialogExtended.bundle.min.js', 14.8],
  ['Divider.bundle.min.js', 5],
  ['DividerExtended.bundle.min.js', 5],
  ['DotNavigation.bundle.min.js', 8],
  ['DotNavigationExtended.bundle.min.js', 8.1],
  ['Dropdown.bundle.min.js', 48],
  ['DropdownExtended.bundle.min.js', 48],
  ['Event.bundle.min.js', 8],
  ['EventExtended.bundle.min.js', 8.5],
  ['FloatingDropdown.bundle.min.js', 39.5],
  ['FloatingDropdownExtended.bundle.min.js', 39.8],
  ['Grid.bundle.min.js', 5],
  ['IconButton.bundle.min.js', 7],
  ['IconButtonExtended.bundle.min.js', 7.2],
  ['IconToggle.bundle.min.js', 6],
  ['IconToggleExtended.bundle.min.js', 6.4],
  ['Image.bundle.min.js', 13],
  ['Input.bundle.min.js', 6],
  ['InputExtended.bundle.min.js', 5.7],
  ['LikeButton.bundle.min.js', 7],
  ['LikeButtonExtended.bundle.min.js', 7.2],
  ['NewCard.bundle.min.js', 5],
  ['NewCardExtended.bundle.min.js', 5.2],
  ['OverlappingCard.bundle.min.js', 5],
  ['OverlappingCardExtended.bundle.js', 20.9],
  ['Pagination.bundle.min.js', 10],
  ['PaginationExtended.bundle.js', 18.2],
  ['Picker.bundle.min.js', 9],
  ['PickerExtended.bundle.js', 16.8],
  ['ProgressBar.bundle.min.js', 6],
  ['ProgressBarExtended.bundle.js', 10.2],
  ['RadioButton.bundle.min.js', 7],
  ['RadioButtonExtended.bundle.js', 12.5],
  ['RadioButtonGroup.bundle.min.js', 5],
  ['RadioButtonGroupExtended.bundle.js', 13.4],
  ['Ratings.bundle.min.js', 7.5],
  ['RatingsExtended.bundle.js', 13.4],
  ['SectionNotification.bundle.min.js', 10.5],
  ['ShareButton.bundle.min.js', 8],
  ['ShareButtonExtended.bundle.js', 14],
  ['SocialBar.bundle.min.js', 35],
  ['SocialBarExtended.bundle.js', 90.5],
  ['Spinner.bundle.min.js', 5],
  ['SpinnerExtended.bundle.js', 5],
  ['StatesButton.bundle.min.js', 10],
  ['StripCard.bundle.min.js', 5],
  ['Tabs.bundle.min.js', 17],
  ['TabsExtended.bundle.js', 45.6],
  ['Tags.bundle.min.js', 8],
  ['TagsExtended.bundle.js', 14.1],
  ['Text.bundle.min.js', 5],
  ['TextExtended.bundle.js', 5.2],
  ['TextArea.bundle.min.js', 33],
  ['TextAreaExtended.bundle.js', 79.2],
  ['TextButton.bundle.min.js', 7],
  ['TextButtonExtended.bundle.js', 13.3],
  ['TextField.bundle.min.js', 37],
  ['TextFieldExtended.bundle.js', 85.8],
  ['Toast.bundle.min.js', 8],
  ['ToggleSwitch.bundle.min.js', 6],
  ['ToggleSwitchExtended.bundle.js', 10.4],
  ['Tooltip.bundle.min.js', 31],
];

module.exports = {
  bundleSize: {
    files: files.map(([name, size]) => ({
      glob: `.perfer/dist/statics/${name}`,
      maxSize: `${size}kb`,
    })),
  },
};
