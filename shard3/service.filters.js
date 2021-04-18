// noinspection JSUnresolvedVariable

/**
 * Module with functions to get filtered lists.
 */

//service
let projectCreepRoles = require("service.constants").projectCreepRoles;
let projectCreepRoleGroups = require("service.constants").projectCreepRoleGroups;
let service = require("service");
// noinspection JSUnusedLocalSymbols
let logger = require("service.logger");


/**
 * Return array of creeps with specified groupName or roleName.
 *
 * @param {String} groupName of creep roleName
 * @param {number} roleName of creep roleName in the group
 *
 * @return {[]} array of creeps
 */
let getCreepsByGroupAndRole = function (groupName, roleName = undefined) {
	let foundCreeps = [];
	if (roleName == undefined) {
		//find only by group name
		for (let roleName in Memory.creepNamesByRole[groupName]) {
			Memory.creepNamesByRole[groupName][roleName].forEach(
				function (creepName) {
					foundCreeps.push(Game.creeps[creepName])
				}
			)
		}
	} else {
		//find by group and role names
		Memory.creepNamesByRole[groupName][roleName].forEach(
			function (creepName) {
				foundCreeps.push(Game.creeps[creepName])
			}
		)
	}
	return foundCreeps;
};

/**
 * Return array of creeps with harvester roleName.
 *
 * @return {[]} array of creeps
 */
let getHarvesters = function () {
	return getCreepsByGroupAndRole(projectCreepRoleGroups.worker, projectCreepRoles.worker.harvester);
};

/**
 * Return array of creeps with builder roleName.
 *
 * @return {[]} array of creeps
 */
let getBuilders = function () {
	return getCreepsByGroupAndRole(projectCreepRoleGroups.worker, projectCreepRoles.worker.builder);
};

/**
 * Return array of creeps with upgrader roleName.
 *
 * @return {[]} array of creeps
 */
let getUpgraders = function () {
	return getCreepsByGroupAndRole(projectCreepRoleGroups.worker, projectCreepRoles.worker.upgrader);
};

/**
 * Return array of creeps with worker roles.
 *
 * @return {[]} array of creeps
 */
let getWorkers = function () {
	return getCreepsByGroupAndRole(projectCreepRoleGroups.worker);
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
