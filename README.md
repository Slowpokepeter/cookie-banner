# Cookie Consent Banner

<img src="https://github.com/Slowpokepeter/cookie-banner/assets/101063969/06729641-b833-4ad2-bac0-0b4ba236efb7" />

To add this cookie banner to your webflow project simply add this script to the `head` of your website or page:
```
<script src="https://cookie-banner-five.vercel.app/static/js/main.85603790.js" defer
  data-style="light"
  data-reject-button="none"
  data-accept-button-color="#635BFF"
  data-accept-button-text-color="#FFFFFF"
  data-position="bottom-right">
</script>
```
You can change the props as you'd like. Reference the props below:

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
