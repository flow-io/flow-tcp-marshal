/**
*
*	MARSHAL: string
*
*
*	DESCRIPTION:
*		- Method for marshalling string data.
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
	* FUNCTION: stringMarshal( delimiter )
	*	Returns a function for marshalling streamed string data.
	*
	* @private
	* @param {String} delimiter - value delimiter
	* @returns {Function} function for mashalling streamed string data
	*/
	function stringMarshal( delimiter ) {
		/**
		* FUNCTION: marshal( data, encoding, clbk )
		*	Marshals strings for TCP transmission.
		*
		* @private
		* @param {Object} data - streamed data
		* @param {String} encoding
		* @param {Function} clbk - callback to invoke after handling streamed data. Function accepts two arguments: [ error, chunk ].
		*/
		return function marshal( data, encoding, clbk ) {
			if ( typeof data !== 'string' ) {
				clbk( new TypeError( 'marshal()::invalid data format. Streamed data must be a string.' ) );
				return;
			}
			data += delimiter;
			clbk( null, new Buffer( data ) );
		}; // end FUNCTION marshal()
	} // end FUNCTION stringMarshal()


	// EXPORTS //

	module.exports = stringMarshal;

})();