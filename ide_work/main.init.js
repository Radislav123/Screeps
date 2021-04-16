// noinspection JSUnresolvedVariable

/**
 * Module responsible for init actions.
 * Should be used only in "main.js".
 */

//creeps roles
let roleWorker = require("ide_work/role.worker");

//service
let roleNames = require("ide_work/service.constants").roleNames;
let filters = require("ide_work/service.filters");
let logger = require("ide_work/service.logger");
let service = require("ide_work/service");


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
	Memory.spawning = undefined;
	Memory.keyControllerId = room.controller.id;

	//creeps numbers init
	Memory.creepsNumbers = {};
	for (let group in roleNames) {
		Memory.creepsNumbers[group] = {};
		roleNames[group].forEach(
			function (roleName) {
				Memory.creepsNumbers[group][roleName] = 0;
			}
		);
	}

	logger.info(`Memory was inited (time : ${Game.time}).`);
};

let initWorkersLimits = function () {
	let workersPerSource = {};
	//harvester
	workersPerSource[roleNames.workers[0]] = 3;
	//builder
	workersPerSource[roleNames.workers[1]] = 3;
	//upgrader
	workersPerSource[roleNames.workers[2]] = 4;

	Memory.maxWorkersNumber = {};
	let safeSourcesNumber = filters.getSafeSources().length;
	for (let workerRole in workersPerSource) {
		Memory.maxWorkersNumber[workerRole] = safeSourcesNumber * workersPerSource[workerRole];
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