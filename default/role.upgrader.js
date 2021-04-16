/**
 * Module with upgrader creep role.
 * Harvest energy.
 */

//creep roles
let roleWorker = require("role.worker");

//service
let role = require("service.constants").roleNames.workers[2];
let logger = require("service.logger");


//roleUpgrader.specificTask is stored as roleWorker.specificTask
//to avoid circular reference
let roleUpgrader = Object.create(roleWorker);
roleUpgrader.super = roleWorker;
roleUpgrader.role = role;

/**
 * Spawn the new upgrader creep.
 *
 * @param {StructureSpawn} spawn - spawn that will make the creep
 *
 * @return {number} spawnCode
 */
roleUpgrader.spawnCreep = function (spawn) {
	return this.super.spawnCreep(this, spawn);
};

/**
 * Creep task to work (harvest energy and upgrade controller).
 *
 * @param {Creep} creep instance to execute task
 */
roleUpgrader.work = function (creep) {
	this.super.work(creep, this.specificTask);
};


module.exports = roleUpgrader;