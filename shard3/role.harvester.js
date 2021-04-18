// noinspection JSUnresolvedVariable

/**
 * Module with harvester creep role.
 * Harvest energy.
 */

//creep roles
let worker = require("role.worker");

//service
let roleName = require("service.constants").projectCreepRoles.worker.harvester;
let projectErrorCodes = require("service.constants").projectErrorCodes;
let filters = require("service.filters");


let harvester = Object.create(worker);
harvester.super = worker;
harvester.roleName = roleName;

/**
 * Spawn harvester.
 *
 * @param {StructureSpawn} spawn that will create the creep
 *
 * @return {number} spawnCode
 */
harvester.spawnCreep = function (spawn) {
	return this.super.spawnCreep(this, spawn);
};

/**
 * Check can a harvester be spawned.
 *
 * @param {StructureSpawn} spawn that will check availability to spawn
 *
 * @return {number} spawnCode
 */
harvester.canSpawnCreep = function (spawn) {
	return this.super.canSpawnCreep(this, spawn)
}

/**
 * Creep task to work (harvest and store energy).
 *
 * @param {Creep} creep instance to execute task
 */
harvester.work = function (creep) {
	this.super.work(creep, this.specificTask);
};

/**
 * Creep task to store energy.
 *
 * @param {Creep} creep instance to execute task
 *
 * @return {number} OK (0) or error code
 */
harvester.specificTask = function (creep) {
	let errorCode = OK;
	let targets = filters.getNotFullStructures(creep.room);
	if (targets.length > 0) {
		if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(targets[0]);
		}
	} else {
		errorCode = projectErrorCodes.ERR_NOT_ENOUGH_TARGETS;
	}
	return errorCode;
};


module.exports = harvester;
