
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	getMarshal = require( './../lib/json.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'marshal-json', function tests() {
	'use strict';

	// SETUP //

	var marshal;

	beforeEach( function() {
		marshal = getMarshal( '\n' );
	});

	// TESTS //

	it( 'should export function', function test() {
		expect( getMarshal ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		expect( marshal ).to.be.a( 'function' );
	});

	it( 'should return an error if not provided an object or array', function test() {
		var values = [
				5,
				'5',
				true,
				NaN,
				null,
				undefined,
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			badValue( values[i] );
		}

		function badValue( value ) {
			marshal( value, 'utf8', onError );
		}
		function onError( err ) {
			if ( err ) {
				assert.ok( true );
				return;
			}
			assert.notOk( true );
		}
	});

	it( 'should marshal streamed data as a buffer', function test() {
		marshal( {'foo':'bar'}, 'utf8', function onData( err, data ) {
			if ( err ) {
				assert.notOk( true );
				return;
			}
			assert.ok( data instanceof Buffer );
		});
	});

	it( 'should marshal streamed JSON data', function test() {
		var expected = {'foo':'bar'},
			actual;
		marshal( expected, 'utf8', function onData( err, data ) {
			if ( err ) {
				assert.notOk( true );
				return;
			}
			data = data.toString();
			assert.strictEqual( data.slice( data.length-1 ), '\n' );

			actual = JSON.parse( data.toString() );
			assert.deepEqual( actual, expected );
		});
	});

});