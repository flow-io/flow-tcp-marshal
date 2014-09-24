flow-tcp-marshal
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Transform stream factory to format data for TCP transmission.


## Installation

``` bash
$ npm install flow-tcp-marshal
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To create a stream factory,

``` javascript
var flowFactory = require( 'flow-tcp-marshal' );

// Create a new factory:
var flow = flowFactory();
```

The factory has the following methods...


#### flow.delimiter( [value] )

This method is a setter/getter. If no `delimiter` is provided, returns the `delimiter` used when marshalling streamed data. To set the `delimiter`,

``` javascript
flow.delimiter( ' | ' );
```

The default `delimiter` is a line feed: `\n`.


#### flow.marshal( [format] )

This method is a setter/getter. If no `format` is provided, returns the marshal `format`. To set the `format`,

``` javascript
flow.marshal( 'number' );
```

Available formats include: `json`, `number`, `string`, and `boolean`.

The default marshal format is `json`.


#### flow.stream()

To create a new stream,

``` javascript
var stream = flowStream.stream();
```


## Notes

When used as setters, all setter/getter methods are chainable. For example,

``` javascript
var flowFactory = require( 'flow-tcp-marshal' );

var stream = flowFactory()
	.delimiter( ' | ' )
	.marshal( 'number' )
	.stream();
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	flowFactory = require( 'flow-tcp-marshal' );

// Create some data...
var data = new Array( 20 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new stream:
var stream = flowFactory()
	.delimiter( ' | ' )
	.marshal( 'number' )
	.stream();

// Pipe the data:
readStream
	.pipe( stream )
	.pipe( eventStream.map( function( d, clbk ){
		clbk( null, d.toString() );
	}))
	.pipe( process.stdout );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/flow-tcp-marshal.svg
[npm-url]: https://npmjs.org/package/flow-tcp-marshal

[travis-image]: http://img.shields.io/travis/flow-io/flow-tcp-marshal/master.svg
[travis-url]: https://travis-ci.org/flow-io/flow-tcp-marshal

[coveralls-image]: https://img.shields.io/coveralls/flow-io/flow-tcp-marshal/master.svg
[coveralls-url]: https://coveralls.io/r/flow-io/flow-tcp-marshal?branch=master

[dependencies-image]: http://img.shields.io/david/flow-io/flow-tcp-marshal.svg
[dependencies-url]: https://david-dm.org/flow-io/flow-tcp-marshal

[dev-dependencies-image]: http://img.shields.io/david/dev/flow-io/flow-tcp-marshal.svg
[dev-dependencies-url]: https://david-dm.org/dev/flow-io/flow-tcp-marshal

[github-issues-image]: http://img.shields.io/github/issues/flow-io/flow-tcp-marshal.svg
[github-issues-url]: https://github.com/flow-io/flow-tcp-marshal/issues