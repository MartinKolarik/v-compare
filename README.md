# v-compare

Compare version numbers in any format (not necessarily semver)

## Installation

```
$ npm install v-compare
```

or

```
<script src="https://cdn.jsdelivr.net/npm/v-compare@1.0.0"></script>
```

## Usage

```js
const vCompare = require('v-compare'); // or window.vCompare
const versions = [ '2.2', '3', '2.0-alpha', '2.0', '2.1.0', '1', '3.1' ];

versions.sort(vCompare); // => [ '1', '2.0-alpha', '2.0', '2.1.0', '2.2', '3', '3.1' ]
versions.sort(vCompare.rCompare); // => [ '3.1', '3', '2.2', '2.1.0', '2.0', '2.0-alpha', '1' ]
```

## License
Copyright (c) 2017 Martin Kolárik. Released under the MIT license.
