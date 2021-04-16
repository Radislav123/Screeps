// noinspection JSUnresolvedVariable

/**
 * Module with harvester creep role.
 * Harvest energy.
 */

//creep roles
let worker = require("role/worker");

//service
let role = require("service/constants").roleNames.workers[3];


let creepPuller = Object.create(worker);
creepPuller.body = [MOVE, MOVE, MOVE, MOVE];
creepPuller.super = worker;
creepPuller.role = role;

/**
 * Spawn the new harvester creep.
 *
 * @param {StructureSpawn} spawn - spawn that will make the creep
 *
 * @return {number} spawnCode
 */
creepPuller.spawnCreep = function (spawn) {
	return this.super.spawnCreep(this, spawn);
};

module.exports = creepPuller;
