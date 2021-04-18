// noinspection JSUnresolvedVariable

/**
 * Module with worker creep role, which is base for harvester, builder and upgrader.
 * It is abstract role and should not be used for job or spawn.
 */

//creeps roles
let baseRole = require("role/baseRole");

//service
let groupName = require("service/constants").projectCreepRoleGroups.worker;
let projectErrorCodes = require("service/constants").projectErrorCodes;
let logger = require("service/logger");
let service = require("service");


//abstract role
let worker = Object.create(baseRole);
worker.super = baseRole;
worker.roleName = undefined;
worker.groupName = groupName;
worker.body = [WORK, CARRY, MOVE];

/**
 * Spawn a creep.
 *
 * @param {Object} creepRole
 * @param {StructureSpawn} spawn that will make the creep
 *
 * @return {number} spawnCode
 */
worker.spawnCreep = function (creepRole, spawn) {
	let creepMemory = {
		assignedSourceId: 0,
	};
	return this.super.spawnCreep(creepRole, spawn, creepMemory);
};

/**
 * Reinit creeps memory.
 *
 * @param {Creep} creep
 * @param {Object} creepRole
 */
worker.reinitCreepMemory = function (creep, creepRole) {
	let creepMemory = {
		assignedSourceId: 0,
	};
	return this.super.reinitCreepMemory(creep, creepRole, creepMemory)
}

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
	if (taskToExecute(creep) == projectErrorCodes.ERR_NOT_ENOUGH_TARGETS) {
		this.specificTask(creep);
	}
};


/**
 * Creep task to harvest energy from assigned source.
 *
 * @param {Creep} creep - creep instance to execute task
 */
worker.harvest = function (creep) {
	let source = Game.getObjectById(creep.memory.assignedSourceId);
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
//Is here to avoid circular reference to upgrader
//in builder and harvester this method is overwritten by theirs
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
 * @return {[]} [assignedSourceId, sourceNumber] - [the most unloaded source id, source number in memory]
 */
worker.getLessLoadedSource = function () {
	let sources = Memory.sources;
	let minCreepsAmount = sources[0].assignedCreepsAmount;
	let minCreepsSourceNumber = 0;

	sources.forEach(
		function (source, sourceNumber) {
			if (source.assignedCreepsAmount < minCreepsAmount && !source.isDangerous) {
				minCreepsAmount = source.assignedCreepsAmount.length;
				minCreepsSourceNumber = sourceNumber;
			}
		}
	);

	return [sources[minCreepsSourceNumber], minCreepsSourceNumber];
};

/**
 * Assign source to creep.
 *
 * @param {Creep} creep
 *
 * @return {Source} assigned source
 */
worker.assignToSource = function (creep) {
	let [source, sourceNumber] = this.getLessLoadedSource();
	creep.memory.assignedSourceId = source.id;
	Memory.sources[sourceNumber].assignedCreepsAmount++;
	logger.info(`The creep (name : ${creep.name}) was assigned to the source (position : ${JSON.stringify(source.position)}).`);
	return source;
};


module.exports = worker;
