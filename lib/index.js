/**
*
*	STREAM: tcp-marshal
*
*
*	DESCRIPTION:
*		- Transform stream factory to format data for TCP transmission.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var through2 = require( 'through2' );


	// MARSHAL METHODS //

	var marshal, formats;

	marshal = {
		'json': require( './json.js' ),
		'number': require( './number.js' ),
		'string': require( './string.js' ),
		'boolean': require( './boolean.js' )
	};

	formats = Object.keys( marshal );


	// FACTORY //

	/**
	* FUNCTION: Factory()
	*	Stream factory constructor.
	*
	* @constructor
	* @returns {Factory} Factory instance
	*/
	function Factory() {
		this._delimiter = '\n';
		this._format = 'json';
		this._marshal = marshal[ 'json' ];
		return this;
	} // end FUNCTION Factory()

	/**
	* METHOD: delimiter( [value] )
	*	This method is a setter/getter. If a `delimiter` is provided, sets the `delimiter`. If no `delimiter` is provided, returns the `delimiter` used when marshalling streamed data.
	*
	* @param {String} [value] - delimiter
	* @returns {Factory|String} Factory instance or delimiter
	*/
	Factory.prototype.delimiter = function( value ) {
		if ( !arguments.length ) {
			return this._delimiter;
		}
		if ( typeof value !== 'string' ) {
			throw new TypeError( 'delimiter()::invalid input argument. Delimiter must be a string.' );
		}
		this._delimiter = value;
		return this;
	}; // end METHOD delimiter()

	/**
	* METHOD: marshal( [format] )
	*	This method is a setter/getter. If a `format` is provided, sets the marshal `format`. If no `format` is provided, returns the marshal `format`.
	*
	* @param {String} format - marshal format
	* @returns {Factory|String} Factory instance or marshal format
	*/
	Factory.prototype.marshal = function( format ) {
		if ( !arguments.length ) {
			return this._format;
		}
		if ( typeof format !== 'string' ) {
			throw new TypeError( 'marshal()::invalid input argument. Format must be a string.' );
		}
		if ( formats.indexOf( format ) === -1 ) {
			throw new TypeError( 'marshal()::invalid input argument. Unrecognized format. Must be one of: [' + formats.join( ',' ) + '].' );
		}
		this._format = format;
		this._marshal = marshal[ format ];
		return this;
	}; // end METHOD marshal()

	/**
	* METHOD: stream()
	*	Returns a through stream for marshalling streamed data for TCP transmission.
	*
	* @returns {Stream} through stream
	*/
	Factory.prototype.stream = function() {
		var onData = this._marshal( this._delimiter );
		return through2( {'objectMode': true}, onData );
	}; // end METHOD stream()

	
	// EXPORTS //

	module.exports = function createFactory() {
		return new Factory();
	};

})();