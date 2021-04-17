// noinspection JSUnresolvedVariable

/**
 * Module responsible for creeps spawn.
 * Should be used only in "main/index.js" (main.js after flattering).
 */

//creep roles
let harvester = require("role/harvester");
let upgrader = require("role/upgrader");
let builder = require("role/builder");


// this order affects the spawn order
let creepRoles = {
	workers: [harvester, builder, upgrader]
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
	creepRoles.workers.forEach(
		function (workerRole) {
			if (Game.time % workerRole.getSpawnTime() == 0 &&
				spawn.canCreateCreep(workerRole.body) == OK &&
				Memory.creepNamesByRole.worker[workerRole.roleName].length < Memory.maxWorkerNumbers[workerRole.roleName] &&
				Memory.spawning == undefined) {
				workerRole.spawnCreep(spawn);
				Memory.spawning = workerRole.roleName;
			}
			if (spawn.spawning) {
				if (Game.time % workerRole.getSpawnTime() == 1 &&
					Memory.spawning == workerRole.roleName) {
					workerRole.assignSourceToWorker(Game.creeps[spawn.spawning.name]);
				}
				if (spawn.spawning.remainingTime == 1 &&
					Memory.spawning == workerRole.roleName) {
					Memory.spawning = undefined;
				}
			}
		}
	);
};


module.exports = {
	spawnCreep
};
