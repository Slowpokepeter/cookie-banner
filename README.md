# Cookie Consent Banner

## Props

- **style**: Specifies the style of the banner. Options are `'light'` and `'dark'`.

  - Type: `string`
  - Default: `'light'`

- **rejectButton**: Controls the visibility of the reject button. Options are `'show'` and `'none'`.

  - Type: `string`
  - Default: `'show'`

- **acceptButtonColor**: Sets the background color of the accept button.

  - Type: `string`
  - Default: `'#4CAF50'`

- **position**: Specifies the position of the modal. Options are `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`.

  - Type: `string`
  - Default: `'bottom-right'`

- **onCustomize**: Callback function that is triggered when the customize button is clicked.
  - Type: `function`
  - Default: `() => {}`
