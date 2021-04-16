// noinspection JSUnresolvedVariable

/**
 * Module with functions to get filtered lists.
 */

//service
let roleNames = require("service.constants").roleNames;
let service = require("service");


/**
 * Return array of creeps with specified role.
 *
 * @param {String} group of creep role
 * @param {number} number of creep role in the group
 *
 * @return {[]} array of creeps
 */
let getCreepsWithRole = function (group, number = undefined) {
	let creeps = [];
	if (number == undefined) {
		//find only by group
		for (let creepName in Game.creeps) {
			if (roleNames[group].includes(Game.creeps[creepName].memory.role)) {
				creeps.push(Game.creeps[creepName])
			}
		}
	} else {
		//find by group and number
		for (let creepName in Game.creeps) {
			if (Game.creeps[creepName].memory.role == roleNames[group][number]) {
				creeps.push(Game.creeps[creepName])
			}
		}
	}
	return creeps;
};

/**
 * Return array of creeps with harvester role.
 *
 * @return {[]} array of creeps
 */
let getHarvesters = function () {
	return getCreepsWithRole("workers", 0);
};

/**
 * Return array of creeps with builder role.
 *
 * @return {[]} array of creeps
 */
let getBuilders = function () {
	return getCreepsWithRole("workers", 1);
};

/**
 * Return array of creeps with upgrader role.
 *
 * @return {[]} array of creeps
 */
let getUpgraders = function () {
	return getCreepsWithRole("workers", 2);
};

/**
 * Return array of creeps with workers roles.
 *
 * @return {[]} array of creeps
 */
let getWorkers = function () {
	return getCreepsWithRole("workers");
};


/**
 * Return array of safe sources (source.isDangerous == false).
 *
 * @return {[]} array of creeps
 */
let getSafeSources = function () {
	let safeSources = [];
	Memory.sources.forEach(
		function (source) {
			if (!source.isDangerous) {
				safeSources.push(source);
			}
		}
	);
	return safeSources;
};

/**
 * Return array of my not full structures.
 *
 * @param {Room} room
 *
 * @return {[]} array of structures
 */
let getNotFullStructures = function (room) {
	return room.find(
		FIND_STRUCTURES,
		{
			filter: (structure) => {
				return structure.store && !service.isFull(structure);
			}
		}
	);
};

/**
 * Return array of my in progress structures.
 *
 * @param {Room} room
 *
 * @return {[]} array of structures
 */
let getController = function (room) {
	return room.find(
		FIND_MY_STRUCTURES,
		{
			filter: (structure) => {
				return structure.structureType == STRUCTURE_CONTROLLER;
			}
		}
	);
};

/**
 * Return array of my in progress structures.
 *
 * @param {Room} room
 *
 * @return {[]} array of structures
 */
let getConstructionSites = function (room) {
	return room.find(FIND_CONSTRUCTION_SITES);
};

module.exports = {
	getHarvesters,
	getBuilders,
	getUpgraders,
	getWorkers,
	getSafeSources,
	getNotFullStructures,
	getController,
	getConstructionSites
};