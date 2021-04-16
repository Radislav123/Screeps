// noinspection JSUnresolvedVariable

/**
 * Module with worker creep role, which is base for harvester, builder and upgrader.
 * It is abstract role and should not be used for job or spawn.
 */

//creeps roles
let baseRole = require("role/baseRole");

//service
let errorCodes = require("service/constants").errorCodes;
let filters = require("service/filters");
let logger = require("service/logger");
let service = require("service");


//abstract role
let worker = Object.create(baseRole);
worker.super = baseRole;
worker.role = undefined;
worker.body = [WORK, CARRY, MOVE];

/**
 * Spawn a creep.
 *
 * @param {Object} creepFrame
 * @param {StructureSpawn} spawn that will make the creep
 *
 * @return {number} spawnCode
 */
worker.spawnCreep = function (creepFrame, spawn) {
	let memory = {
		sourceId: 0,
		playingRole: false
	};
	return this.super.spawnCreep(creepFrame, spawn, memory);
};

/**
 * Creep task to work (harvest and playRole).
 *
 * @param {Creep} creep instance to work
 * @param {function} specificTask
 */
worker.work = function (creep, specificTask) {
	let taskToExecute;
	if (service.isFull(creep)) {
		taskToExecute = specificTask;
		creep.memory.playingRole = true;
	} else if (service.isEmpty(creep)) {
		taskToExecute = this.harvest;
		creep.memory.playingRole = false;
	} else {
		if (creep.memory.playingRole) {
			taskToExecute = specificTask;
		} else {
			taskToExecute = this.harvest;
		}
	}
	//if worker can not execute its specific task,
	//it will execute upgrader role
	if (taskToExecute(creep) == errorCodes.ERR_NOT_ENOUGH_TARGETS) {
		this.specificTask(creep);
	}
};


/**
 * Creep task to harvest energy from assigned source.
 *
 * @param {Creep} creep - creep instance to execute task
 */
worker.harvest = function (creep) {
	let source = Game.getObjectById(creep.memory.sourceId);
	if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
		creep.moveTo(source);
	}
};


/**
 * Creep task to upgrade controller.
 *
 * @param {Creep} creep instance to execute task
 *
 * @return {number} OK (0) or error code
 */
//Is here to avoid circular reference to roleUpgrader
//in roleBuilder and roleHarvester this method is overwritten by theirs
worker.specificTask = function (creep) {
	let errorCode = OK;
	if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
		creep.moveTo(creep.room.controller);
	}
	return errorCode;
};

/**
 * Get the most unloaded source to harvest from.
 *
 * @return {[]} [sourceId, sourceNumber] - [the most unloaded source id, source number in memory]
 */
worker.getLessLoadedSourceId = function () {
	let sources = Memory.sources;
	let minCreepsNumber = sources[0].assignedCreepsNumber;
	let minCreepsSourceNumber = 0;

	sources.forEach(
		function (source, sourceNumber) {
			if (source.assignedCreepsNumber < minCreepsNumber && !source.isDangerous) {
				minCreepsNumber = source.assignedCreepsNumber.length;
				minCreepsSourceNumber = sourceNumber;
			}
		}
	);

	return [sources[minCreepsSourceNumber].id, minCreepsSourceNumber];
};

/**
 * Assign source to creep.
 *
 * @param {String} creepId
 *
 * @return {String} assigned sourceId
 */
worker.assignSourceToWorker = function (creepId) {
	let [sourceId, sourceNumber] = this.getLessLoadedSourceId();
	Game.getObjectById(creepId).memory.sourceId = sourceId;
	Memory.sources[sourceNumber].assignedCreepsNumber++;
	logger.info(`Creep (id : ${creepId}) was assigned to the source (id : ${sourceId}).`);
	return sourceId;
};

/**
 * Memorize room sources in Memory and clear creep(s).memory.sourceId.
 *
 * @param {Room} room
 */
worker.initializeSources = function (room) {
	let defaultSources = room.find(FIND_SOURCES);
	let sources = [];
	defaultSources.forEach(
		function (defaultSource) {
			sources.push(
				//source structure
				{
					id: defaultSource.id,
					assignedCreepsNumber: 0,
					isDangerous: false
				}
			)
		}
	);
	filters.getWorkers().forEach(
		function (creep) {
			creep.memory.sourceId = undefined;
		}
	);
	Memory.sources = sources;
};

worker.assignSourcesToAllWorkers = function () {
	filters.getWorkers().forEach(
		function (creep) {
			this.assignSourceToWorker(creep.id);
		}
	);
	logger.info("All sources were assigned to workers.");
};


module.exports = worker;
