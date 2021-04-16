/**
 * Module with service functions.
 */

//service
let logger = require("service.logger");


/**
 * Know is store not full.
 *
 * @param {Creep|Structure} object instance to know is capacity not full
 *
 * @return {boolean}
 */
let isFull = function (object) {
	return object.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
};

/**
 * Know is store not empty.
 *
 * @param {Creep|Structure} object instance to know is capacity not full
 *
 * @return {boolean}
 */
let isEmpty = function (object) {
	return object.store.getUsedCapacity(RESOURCE_ENERGY) == 0;
};

/**
 * Know is structure in progress.
 *
 * @param {StructureController} structure instance to know is in progress
 *
 * @return {boolean}
 */
let isInProgress = function (structure) {
	return structure.progressTotal - structure.progress > 0;
};

/**
 * Know is capacity not full.
 *
 * @param {String} sourceId
 *
 * @return {number|null} position in Memory.sources
 */
let getSourceNumberById = function (sourceId) {
	let position = -1;
	let found = false;
	Memory.sources.forEach(
		function (source, index) {
			if (sourceId.localeCompare(source.id) == 0) {
				found = true;
				position = index;
				return;
			}
		}
	);
	if (found) {
		return position;
	} else {
		return null;
	}
};

/**
 * Mark sources in range 10 from pos as dangerous.
 *
 * @param {RoomPosition} pos
 */
let markDangerousSources = function (pos) {
	let range = 10;
	let sources = pos.findInRange(FIND_SOURCES, range);
	sources.forEach(
		function (source) {
			let index = getSourceNumberById(source.id);
			if (index != -1) {
				Memory.sources[index].isDangerous = true;
				logger.alert(`Source (id : ${source.id}) was marked as dangerous.`)
			}
		}
	);
};


module.exports = {
	isFull,
	isEmpty,
	isInProgress,
	getSourceNumberById,
	markDangerousSources
};