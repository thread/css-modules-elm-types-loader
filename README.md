# css-modules-elm-types-loader

A webpack loader that takes CSS modules and produces an Elm module with a type alias for the classes defined.

_This module was inspired by and taken from the [typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader), so credit for the approach and codebase goes to that project. We've updated the code to output Elm based files, rather than TypeScript._

## Usage

```
yarn add @teamthread/css-modules-elm-types-loader
```

This module replaces the `css-loader`, so you should update your webpack config:

```js
// before
loader: 'css-loader'
// after
loader: '@teamthread/css-modules-elm-types-loader'
```

## File naming

Given a file with this CSS at the path shown:

```css
/* path: /app/LikedItems/liked_items.module.scss */
.likedItems {
  color: red
}

.likedItemsHeader {
  color: blue
}
```

This plugin will generate the following Elm file:

```elm
-- /app/LikedItems/Styles.elm

module LikedItems.Styles exposing (Styles)

type alias Styles = {
    likedItems: String
    ,likedItemsHeader: String
}
```

This has been created to suit how we're loading our CSS with JavaScript and applying it to Elm (via flags). We'd love to make this plugin more generic and useful to all; so please feel free to open an issue with thoughts on how we could improve this.


## Options

Any loader options are passed through to `css-loader`.

The options that this module supports are:

- `runElmFormat [default: false]` this means the resulting Elm files will be run through elm-format. If this is turned on, it is expected that `yarn elm-format` will work, so ensure that `elm-format` is installed to your project.

## Changelog

__2 May 2018__

- First release.
