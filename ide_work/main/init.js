// noinspection JSUnresolvedVariable

/**
 * Module responsible for init actions.
 * Should be used only in "main/index.js" (main.js after flattering).
 */

//creep roles
let harvester = require("role/harvester");
let upgrader = require("role/upgrader");
let builder = require("role/builder");

//service
let projectCreepRoles = require("service/constants").projectCreepRoles;
let projectCreepRoleGroups = require("service/constants").projectCreepRoleGroups;
let filters = require("service/filters");
let logger = require("service/logger");
let service = require("service");


let creepRoles = {
	[projectCreepRoleGroups.worker]: [harvester, builder, upgrader]
};

/**
 * Initializes everything is needed while respawn.
 *
 * @param {Room} room in which the first spawn is placed
 */
let initRoom = function (room) {
	initMemory(room);
	initSources(room);
	initHostiles(room);
	initCreepLimits();
	initCreeps(room);
};

let initMemory = function (room) {
	delete Memory.sources;
	delete Memory.creeps;
	delete Memory.creepNamesByRole;
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

let initCreepLimits = function () {
	Memory.maxCreepNumbers = {};
	for (let groupName in projectCreepRoles) {
		Memory.maxCreepNumbers[groupName] = {};
		for (let roleName in projectCreepRoles[groupName]) {
			Memory.maxCreepNumbers[groupName][roleName] = 0;
		}
	}

	initWorkerLimits();

	logger.info(`Creep limits were inited (time : ${Game.time}).`);
}

let initWorkerLimits = function () {
	let workersPerSource = {};
	workersPerSource[projectCreepRoles.worker.harvester] = 3;
	workersPerSource[projectCreepRoles.worker.builder] = 3;
	workersPerSource[projectCreepRoles.worker.upgrader] = 4;

	let safeSourcesNumber = filters.getSafeSources().length;
	for (let workerRole in workersPerSource) {
		Memory.maxCreepNumbers.worker[workerRole] = safeSourcesNumber * workersPerSource[workerRole];
	}
};

/**
 * Write room sources in Memory and clear creep(s).memory.assignedSourceId.
 *
 * @param {Room} room
 */
let initSources = function (room) {
	let foundSources = room.find(FIND_SOURCES);
	let sources = [];
	foundSources.forEach(
		function (foundSource) {
			sources.push(
				//source structure
				{
					id: foundSource.id,
					assignedCreepsAmount: 0,
					isDangerous: false,
					position: foundSource.pos,
				}
			)
		}
	);
	filters.getWorkers().forEach(
		function (creep) {
			creep.memory.assignedSourceId = undefined;
		}
	);
	Memory.sources = sources;
	logger.info(`Sources were inited (time : ${Game.time}).`);
};

/**
 * Init all hostile objects in the room.
 *
 * @param {Room} room
 */
let initHostiles = function (room) {
	let hostileStructures = room.find(FIND_HOSTILE_STRUCTURES);
	hostileStructures.forEach(
		function (hostileStructure) {
			service.markDangerousSources(hostileStructure.pos);
		}
	);
	logger.info(`Hostiles were inited (time : ${Game.time}).`);
};

/**
 * Init all creeps in the room.
 *
 * @param {Room} room
 */
let initCreeps = function (room) {
	delete Memory.creeps;

	room.find(FIND_MY_CREEPS).forEach(
		function (creep) {
			let creepRole = getCreepRoleByName(creep.name)
			Memory.creepNamesByRole[creepRole.groupName][creepRole.roleName].push(creep.name)
			creepRole.reinitCreepMemory(creep, creepRole)
			creepRole.assignToSource(creep);
		}
	)

	logger.info(`Creeps were inited (time : ${Game.time}).`);
}

let getCreepRoleByName = function (creepName) {
	let creepRole = undefined;
	for (let groupName in creepRoles) {
		creepRoles[groupName].forEach(
			function (role) {
				if (creepName.includes(role.roleName)) {
					creepRole = role;
				}
			}
		)
	}
	return creepRole;
}


module.exports = {
	initRoom
};
