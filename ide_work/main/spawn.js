// noinspection JSUnresolvedVariable

/**
 * Module responsible for creeps spawn.
 * Should be used only in "main/index.js" (main.js after flattering).
 */

//creeps roles
let roleHarvester = require("role/harvester");
let roleUpgrader = require("role/upgrader");
let roleBuilder = require("role/builder");


// this order affects the spawn order
let creepsRoles = {
	workers: [roleHarvester, roleBuilder, roleUpgrader]
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
	creepsRoles.workers.forEach(
		function (workerRole) {
			if (Game.time % workerRole.getSpawnTime() == 0 &&
				spawn.canCreateCreep(workerRole.body) == OK &&
				Memory.creepsNumbers.workers[workerRole.role] < Memory.maxWorkersNumber[workerRole.role] &&
				Memory.spawning == undefined) {
				workerRole.spawnCreep(spawn);
				Memory.spawning = workerRole.role;
				Memory.creepsNumbers.workers[workerRole.role]++;
			}
			if (spawn.spawning) {
				if (Game.time % workerRole.getSpawnTime() == 1 &&
					Memory.spawning == workerRole.role) {
					workerRole.assignSourceToWorker(Game.creeps[spawn.spawning.name]);
				}
				if (spawn.spawning.remainingTime == 1 &&
					Memory.spawning == workerRole.role) {
					Memory.spawning = undefined;
				}
			}
		}
	);
};


module.exports = {
	spawnCreep
};
