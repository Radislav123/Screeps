// noinspection JSUnresolvedVariable

/**
 * Module with upgrader creep role.
 * Harvest energy.
 */

//creep roles
let worker = require("role/worker");

//service
let role = require("service/constants").roleNames.workers[2];


//upgrader.specificTask is stored as worker.specificTask
//to avoid circular reference
let upgrader = Object.create(worker);
upgrader.super = worker;
upgrader.role = role;

/**
 * Spawn the new upgrader creep.
 *
 * @param {StructureSpawn} spawn - spawn that will make the creep
 *
 * @return {number} spawnCode
 */
upgrader.spawnCreep = function (spawn) {
	return this.super.spawnCreep(this, spawn);
};

/**
 * Creep task to work (harvest energy and upgrade controller).
 *
 * @param {Creep} creep instance to execute task
 */
upgrader.work = function (creep) {
	this.super.work(creep, this.specificTask);
};


module.exports = upgrader;
