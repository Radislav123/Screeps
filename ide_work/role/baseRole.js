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
baseRole.body = undefined;
baseRole.getSpawnTime = function () {
	let spawnTime = undefined;
	if (this.body != undefined) {
		spawnTime = this.body.length*3;
	}
	return spawnTime;
};

/**
 * Spawn a creep.
 *
 * @param {Object} creepFrame
 * @param {StructureSpawn} spawn that will make the creep
 * @param {{}} memory of creating creep
 *
 * @return {number} spawnCode
 */
baseRole.spawnCreep = function (creepFrame, spawn, memory) {
	memory["roleName"] = creepFrame.roleName;

	let spawnCode = spawn.spawnCreep(creepFrame.body, creepFrame.roleName + Game.time, {"memory": memory});
	logger.info(`Spawning a creep (spawnCode : ${spawnCode}).`);
	return spawnCode;
};

module.exports = baseRole;
