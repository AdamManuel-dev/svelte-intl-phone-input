# International Phone Number Input Field

A Svelte based internation phone number input field that has full validation for international numbers and a dropdown menu to pick the country code

## Usage

> This project is not yet complete, I will update this later. 

### How to build the component locally?

1. Build the component using `yarn build`
2. (Optional) Create a `public` folder
3. (Optional) Create an `public/index.html` file
4. Copy the built component inside a `vendor` folder (accesible from `index.html`)
5. Import the component from the HTML using the `defer` attribute
   ```html
   <script defer src="vendor/svelte-custom-element.0.1.0.min.js"></script>
   ```
6. Open the `index.html` and enjoy the web component

## Available scripts

* `start`: alias of `yarn storybook`
* `build`: builds your app as a web component and outputs a minified and a normal version to `/dist`
* `storybook`: runs the storybook, this is used when develop because of the live reloading
* `test`: runs all test inside `src/` and tries to build the widget

## Contributing to Translations

Currently this component has support for i18n, but I do not have the resources or time to fully implement the translations. If anyone wants to contribute to the translations feel free to create a PR, any help is appreciated.