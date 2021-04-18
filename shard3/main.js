// noinspection JSUnresolvedVariable

/**
 * Main module. Enter point.
 */

//main functions
let init = require("main.init").init;
let utilizeCreeps = require("main.utilizing").utilizeCreeps;
let makeJobs = require("main.jobs").makeJobs;
let spawnCreep = require("main.spawn").spawnCreep;
// noinspection JSUnusedLocalSymbols
let logger = require("service.logger");


module.exports.loop = function () {

	//init actions
	let spawn = Game.spawns["Spawn1"];
	if (spawn.room.controller.id != Memory.keyControllerId || Memory.reInit) {
		init(spawn.room);
		Memory.reInit = false;
	}

	//utilize
	let utilizeCreepsTime = 100;
	if (Game.time % utilizeCreepsTime == 0) {
		utilizeCreeps();
	}

	//spawn
	spawnCreep(spawn);

	//jobs
	makeJobs();

};
