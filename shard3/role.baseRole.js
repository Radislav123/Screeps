// noinspection JSUnresolvedVariable

/**
 * Module with base creep role for all others.
 * It is abstract role and should not be used for job or spawn.
 */

//service
let logger = require("service.logger");


//abstract role
let baseRole = {};

baseRole.roleName = undefined;
baseRole.groupName = undefined;
baseRole.body = undefined;
baseRole.getSpawnDuration = function () {
	let spawnTime = undefined;
	if (this.body != undefined) {
		spawnTime = this.body.length * 3;
	}
	return spawnTime;
};

/**
 * Spawn a creep.
 *
 * @param {Object} creepRole
 * @param {StructureSpawn} spawn that will create the creep
 * @param {Object} creepMemory
 *
 * @return {number} spawnCode
 */
baseRole.spawnCreep = function (creepRole, spawn, creepMemory) {
	creepMemory["roleName"] = creepRole.roleName;
	creepMemory["groupName"] = creepRole.groupName;
	creepMemory["playingRole"] = false;

	let creepName = creepRole.roleName + Game.time
	let spawnCode = spawn.spawnCreep(creepRole.body, creepName, {"memory": creepMemory});
	Memory.creepNamesByRole[creepRole.groupName][creepRole.roleName].push(creepName)
	logger.info(`Creep spawn was started (spawnCode : ${spawnCode}).`);
	return spawnCode;
};

/**
 * Reinit creeps memory.
 *
 * @param {Creep} creep
 * @param {Object} creepRole
 * @param {Object} creepMemory
 */
baseRole.reinitCreepMemory = function (creep, creepRole, creepMemory) {
	creepMemory["roleName"] = creepRole.roleName;
	creepMemory["groupName"] = creepRole.groupName;
	creepMemory["playingRole"] = false;
	creep.memory = creepMemory;
	logger.info(`Creeps (name : ${creep.name}) memory was reinited.`)
}

/**
 * Check can a creep be spawned.
 * Should be overridden in each creep role (harvester is the example).
 *
 * @param {Object} creepRole
 * @param {StructureSpawn} spawn that will check availability to spawn
 *
 * @return {number} spawnCode
 */
baseRole.canSpawnCreep = function (creepRole, spawn) {
	let creepName = creepRole.roleName + Game.time
	return spawn.spawnCreep(creepRole.body, creepName, {"dryRun": true});
}

module.exports = baseRole;
