// noinspection JSUnresolvedVariable

/**
 * Module responsible for init actions.
 * Should be used only in "main/index.js" (main.js after flattering).
 */

//creeps roles
let roleWorker = require("role/worker");

//service
let projectCreepRoles = require("service/constants").projectCreepRoles;
let filters = require("service/filters");
let logger = require("service/logger");
let service = require("service");


/**
 * Initializes everything is needed while respawn.
 *
 * @param {Room} room in which the first spawn is placed
 */
let init = function (room) {
	initMemory(room);
	initSources(room);
	initHostiles(room);
	initWorkersLimits();
	if (Memory.reInit) {
		roleWorker.assignSourcesToAllWorkers();
	}
};

let initMemory = function (room) {
	delete Memory.sources;
	delete Memory.spawning;
	delete Memory.creeps;
	delete Memory.creepNamesByRole;
	Memory.spawning = undefined;
	Memory.keyControllerId = room.controller.id;

	//creepNamesByRole init
	Memory.creepNamesByRole = {};
	for (let group in projectCreepRoles) {
		Memory.creepNamesByRole[group] = {};
		Object.values(projectCreepRoles[group]).forEach(
			function (roleName) {
				Memory.creepNamesByRole[group][roleName] = [];
			}
		);
	}

	logger.info(`Memory was inited (time : ${Game.time}).`);
};

let initWorkersLimits = function () {
	let workersPerSource = {};
	workersPerSource[projectCreepRoles.worker.harvester] = 3;
	workersPerSource[projectCreepRoles.worker.builder] = 3;
	workersPerSource[projectCreepRoles.worker.upgrader] = 4;

	Memory.maxWorkerNumbers = {};
	let safeSourcesNumber = filters.getSafeSources().length;
	for (let workerRole in workersPerSource) {
		Memory.maxWorkerNumbers[workerRole] = safeSourcesNumber * workersPerSource[workerRole];
	}

	logger.info(`Workers limits were inited (time : ${Game.time}).`);
};

let initSources = function (room) {
	roleWorker.initializeSources(room);
	logger.info(`Sources were inited (time : ${Game.time}).`);
};

let initHostiles = function (room) {
	let hostileStructures = room.find(FIND_HOSTILE_STRUCTURES);
	hostileStructures.forEach(
		function (hostileStructure) {
			service.markDangerousSources(hostileStructure.pos)
		}
	);
	logger.info(`Hostiles were inited (time : ${Game.time}).`);
};


module.exports = {
	init
};
