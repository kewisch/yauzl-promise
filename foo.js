'use strict';

const yauzlMac = require('yauzl-mac');
let yauzl = require('./lib/');
yauzl = yauzl.useYauzl(yauzlMac);

const pathJoin = require('path').join;
const co = require('co-bluebird');

const path = pathJoin(__dirname, '../yauzl-mac/test files/test.zip');

co(function*() {
	const zipFile = yield yauzl.open(path, {supportMacArchiveUtility: true});
	console.log('zipFile:', cleanZip(zipFile));

	while(true) {
		const entry = yield zipFile.readEntry();
		if (!entry) break;
		console.log('entry:', cleanEntry(entry));
	}

	yield zipFile.close();
	console.log('zipFile end:', cleanZip(zipFile));
}).done();

// Utility functions
function cleanZip(zip) {
	return cloneExcept(zip, ['domain', '_events', '_eventsCount', '_maxListeners', 'reader', '_interceptors']);
}

function cleanEntry(entry) {
	return cloneExcept(entry, ['zipFile', 'fileComment']);
}

function cloneExcept(obj, except) {
	const out = {};
	for (let key in obj) {
		if (obj.hasOwnProperty(key) && except.indexOf(key) == -1) out[key] = obj[key];
	}
	return out;
}
