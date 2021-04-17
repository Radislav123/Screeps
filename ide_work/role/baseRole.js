// noinspection JSUnresolvedVariable

/**
 * Module with base creep role for all others.
 * It is abstract role and should not be used for job or spawn.
 */

//service
let logger = require("service/logger");


//abstract role
let baseRole = {};

baseRole.roleName = undefined;
baseRole.groupName = undefined;
baseRole.body = undefined;
baseRole.getSpawnTime = function () {
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
 * @param {StructureSpawn} spawn that will make the creep
 * @param {{}} creepMemory of creating creep
 *
 * @return {number} spawnCode
 */
baseRole.spawnCreep = function (creepRole, spawn, creepMemory) {
	creepMemory["roleName"] = creepRole.roleName;
	creepMemory["groupName"] = creepRole.groupName;

	let creepName = creepRole.roleName + Game.time
	let spawnCode = spawn.spawnCreep(creepRole.body, creepName, {"memory": creepMemory});
	logger.info(`Spawning a creep (spawnCode : ${spawnCode}).`);

	Memory.creepNumbers[creepRole.groupName][creepRole.roleName]++;
	Memory.creepNamesByRole[creepRole.groupName][creepRole.roleName].push(creepName)

	return spawnCode;
};

module.exports = baseRole;
