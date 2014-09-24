/**
*
*	MARSHAL: boolean
*
*
*	DESCRIPTION:
*		- Method for marshalling boolean data.
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

(function(){
	'use strict';

	/**
	* FUNCTION: booleanMarshal( delimiter )
	*	Returns a function for marshalling streamed boolean data.
	*
	* @private
	* @param {String} delimiter - value delimiter
	* @returns {Function} function for mashalling streamed boolean data
	*/
	function booleanMarshal( delimiter ) {
		/**
		* FUNCTION: marshal( data, encoding, clbk )
		*	Marshals booleans for TCP transmission.
		*
		* @private
		* @param {Object} data - streamed data
		* @param {String} encoding
		* @param {Function} clbk - callback to invoke after handling streamed data. Function accepts two arguments: [ error, chunk ].
		*/
		return function marshal( data, encoding, clbk ) {
			if ( typeof data !== 'boolean' ) {
				clbk( new TypeError( 'marshal()::invalid data format. Streamed data must be a boolean.' ) );
				return;
			}
			if ( data ) {
				data = '1';
			} else {
				data = '0';
			}
			data += delimiter;
			clbk( null, new Buffer( data ) );
		}; // end FUNCTION marshal()
	} // end FUNCTION booleanMarshal()


	// EXPORTS //

	module.exports = booleanMarshal;

})();