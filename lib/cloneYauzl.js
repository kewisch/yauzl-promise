/* --------------------
 * yauzl-promise module
 * Clone yauzl object
 * ------------------*/

'use strict';

// Modules
const util = require('util'),
	{EventEmitter} = require('events');

// Exports
module.exports = function(yauzl) {
	// Clone main object
	yauzl = Object.assign({}, yauzl);

	// Clone ZipFile constructor
	const ZipFileOriginal = yauzl.ZipFile;
	function ZipFile() {
		ZipFileOriginal.call(this);
	}
	util.inherits(ZipFile, EventEmitter);
	Object.assign(ZipFile, ZipFileOriginal);
	Object.assign(ZipFile.prototype, ZipFileOriginal.prototype);
	yauzl.ZipFile = ZipFile;

	// Clone Entry constructor
	const EntryOriginal = yauzl.Entry;
	function Entry() {
		EntryOriginal.call(this);
	}
	Object.assign(Entry, EntryOriginal);
	Object.assign(Entry.prototype, EntryOriginal.prototype);
	yauzl.Entry = Entry;

	// Return cloned copy of yauzl
	return yauzl;
};