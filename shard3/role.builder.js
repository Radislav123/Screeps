// noinspection JSUnresolvedVariable

/**
 * Module with builder creep role.
 * Build structures.
 */

//creeps roles
let roleWorker = require("role.worker");

//service
let roleName = require("service.constants").projectCreepRoles.worker.builder;
let projectErrorCodes = require("service.constants").projectErrorCodes;
let filters = require("service.filters");


let builder = Object.create(roleWorker);
builder.super = roleWorker;
builder.roleName = roleName;

/**
 * Spawn builder.
 *
 * @param {StructureSpawn} spawn that will create the creep
 *
 * @return {number} spawnCode
 */
builder.spawnCreep = function (spawn) {
	return this.super.spawnCreep(this, spawn);
};

/**
 * Check can a builder be spawned.
 *
 * @param {StructureSpawn} spawn that will check availability to spawn
 *
 * @return {number} spawnCode
 */
builder.canSpawnCreep = function (spawn) {
	return this.super.canSpawnCreep(this, spawn)
}

/**
 * Creep task to work (harvest energy and build structures).
 *
 * @param {Creep} creep instance to execute task
 */
builder.work = function (creep) {
	this.super.work(creep, this.specificTask);
};

/**
 * Creep task to build structures.
 *
 * @param {Creep} creep instance to execute task
 *
 * @return {number} OK (0) or error code
 */
builder.specificTask = function (creep) {
	let errorCode = OK;
	let targets = filters.getConstructionSites(creep.room);
	if (targets.length > 0) {
		if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(targets[0]);
		}
	} else {
		errorCode = projectErrorCodes.ERR_NOT_ENOUGH_TARGETS;
	}
	return errorCode;
};


module.exports = builder;
