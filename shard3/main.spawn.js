// noinspection JSUnresolvedVariable

/**
 * Module responsible for creeps spawn.
 * Should be used only in "main/index.js" (main.js after flattering).
 */

//creep roles
let harvester = require("role.harvester");
let upgrader = require("role.upgrader");
let builder = require("role.builder");

//service
let projectCreepRoleGroups = require("service.constants").projectCreepRoleGroups;


// this order affects the spawn order
let creepRoles = {
	[projectCreepRoleGroups.worker]: [harvester, builder, upgrader]
};


/**
 * Initializes everything is needed while respawn.
 *
 * @param {StructureSpawn} spawn which will create creep
 */
let spawnCreep = function (spawn) {
	spawnWorker(spawn);
};

let spawnWorker = function (spawn) {
	//spawn evaluating each spawnTimes game tick
	let spawnTime = 10;
	creepRoles.worker.forEach(
		function (workerRole) {
			if (Game.time % spawnTime == 0 &&
				workerRole.canSpawnCreep(spawn) == OK &&
				Memory.creepNamesByRole.worker[workerRole.roleName].length < Memory.maxCreepNumbers.worker[workerRole.roleName] &&
				spawn.memory.spawningCreepRoleName == undefined) {
				workerRole.spawnCreep(spawn);
				spawn.memory.spawningCreepRoleName = workerRole.roleName;
			}
			if (spawn.spawning) {
				if (Game.time % spawnTime == 1 &&
					spawn.memory.spawningCreepRoleName == workerRole.roleName) {
					workerRole.assignToSource(Game.creeps[spawn.spawning.name]);
				}
				if (spawn.spawning.remainingTime == 1 &&
					spawn.memory.spawningCreepRoleName == workerRole.roleName) {
					spawn.memory.spawningCreepRoleName = undefined;
				}
			}
		}
	);
};


module.exports = {
	spawnCreep
};
