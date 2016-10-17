# parse-human-date-range

[![Build Status][ci-img]][ci]

Parse human-readable date to range of dates.

## Install

```sh
npm install parse-human-date-range --save
```

## Usage

```js
var parse = require('human-date-range');

parse('last 2 days');
/* [
	Sat Oct 15 2016 14:00:00 GMT+0200 (CEST),
	Sun Oct 16 2016 14:00:00 GMT+0200 (CEST)
] */

parse('next 2 weeks');
/* [
	Tue Oct 18 2016 14:00:00 GMT+0200 (CEST),
	Wed Oct 19 2016 14:00:00 GMT+0200 (CEST),
	Thu Oct 20 2016 14:00:00 GMT+0200 (CEST),
	Fri Oct 21 2016 14:00:00 GMT+0200 (CEST),
	Sat Oct 22 2016 14:00:00 GMT+0200 (CEST),
	Sun Oct 23 2016 14:00:00 GMT+0200 (CEST),
	Mon Oct 24 2016 14:00:00 GMT+0200 (CEST),
	...
] */

parse('last 2 tuesdays'):
/* [
	Tue Oct 04 2016 14:00:00 GMT+0200 (CEST),
	Tue Oct 11 2016 14:00:00 GMT+0200 (CEST)
] */

```

More usage examples can be found in [tests](test/index.js).

## API

### parse(str, [offset])

Returns: `Date[]`

Parses human-readable date into range of dates. Unparseable string will return array with `offset` date.

#### str

Type: `String`

Human-readable date.

#### offset

Type: `Date`  
Default: `new Date()`

Date offset which will be used as starting point for calculation.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/parse-human-date-range
[ci-img]: https://img.shields.io/travis/niksy/parse-human-date-range.svg
