// noinspection JSUnresolvedVariable

/**
 * Module with harvester creep role.
 * Harvest energy.
 */

//creeps roles
let roleWorker = require("role.worker");

//service
let role = require("service.constants").roleNames.workers[0];
let errorCodes = require("service.constants").errorCodes;
let filters = require("service.filters");


let roleHarvester = Object.create(roleWorker);
roleHarvester.super = roleWorker;
roleHarvester.role = role;

/**
 * Spawn the new harvester creep.
 *
 * @param {StructureSpawn} spawn - spawn that will make the creep
 *
 * @return {number} spawnCode
 */
roleHarvester.spawnCreep = function (spawn) {
	return this.super.spawnCreep(this, spawn);
};

/**
 * Creep task to work (harvest and store energy).
 *
 * @param {Creep} creep instance to execute task
 */
roleHarvester.work = function (creep) {
	this.super.work(creep, this.specificTask);
};

/**
 * Creep task to store energy.
 *
 * @param {Creep} creep instance to execute task
 *
 * @return {number} OK (0) or error code
 */
roleHarvester.specificTask = function (creep) {
	let errorCode = OK;
	let targets = filters.getNotFullStructures(creep.room);
	if (targets.length > 0) {
		if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(targets[0]);
		}
	} else {
		errorCode = errorCodes.ERR_NOT_ENOUGH_TARGETS;
	}
	return errorCode;
};


module.exports = roleHarvester;
