/**
*
*	MARSHAL: JSON
*
*
*	DESCRIPTION:
*		- Method for marshalling JSON.
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
	* FUNCTION: jsonMarshal( delimiter )
	*	Returns a function for marshalling streamed JSON data.
	*
	* @private
	* @param {String} delimiter - value delimiter
	* @returns {Function} function for mashalling streamed JSON data
	*/
	function jsonMarshal( delimiter ) {
		/**
		* FUNCTION: marshal( data, encoding, clbk )
		*	Marshals JSON for TCP transmission.
		*
		* @private
		* @param {Object} data - streamed data
		* @param {String} encoding
		* @param {Function} clbk - callback to invoke after handling streamed data. Function accepts two arguments: [ error, chunk ].
		*/
		return function marshal( data, encoding, clbk ) {
			if ( (typeof data !== 'object' || data === null)  && !Array.isArray( data ) ) {
				clbk( new TypeError( 'marshal()::invalid data format. Streamed data must be a data object or array.' ) );
				return;
			}
			data = JSON.stringify( data ) + delimiter;
			clbk( null, new Buffer( data ) );
		}; // end FUNCTION marshal()
	} // end FUNCTION jsonMarshal()


	// EXPORTS //

	module.exports = jsonMarshal;

})();