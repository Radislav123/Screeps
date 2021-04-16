// noinspection JSUnresolvedVariable

/**
 * Module with builder creep role.
 * Build structures.
 */

//creeps roles
let roleWorker = require("ide_work/role.worker");

//service
let role = require("ide_work/service.constants").roleNames.workers[1];
let errorCodes = require("ide_work/service.constants").errorCodes;
let filters = require("ide_work/service.filters");


let roleBuilder = Object.create(roleWorker);
roleBuilder.super = roleWorker;
roleBuilder.role = role;

/**
 * Spawn the new harvester creep.
 *
 * @param {StructureSpawn} spawn that will make the creep
 *
 * @return {number} spawnCode
 */
roleBuilder.spawnCreep = function (spawn) {
	return this.super.spawnCreep(this, spawn);
};

/**
 * Creep task to work (harvest energy and build structures).
 *
 * @param {Creep} creep instance to execute task
 */
roleBuilder.work = function (creep) {
	this.super.work(creep, this.specificTask);
};

/**
 * Creep task to build structures.
 *
 * @param {Creep} creep instance to execute task
 *
 * @return {number} OK (0) or error code
 */
roleBuilder.specificTask = function (creep) {
	let errorCode = OK;
	let targets = filters.getConstructionSites(creep.room);
	if (targets.length > 0) {
		if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(targets[0]);
		}
	} else {
		errorCode = errorCodes.ERR_NOT_ENOUGH_TARGETS;
	}
	return errorCode;
};


module.exports = roleBuilder;
