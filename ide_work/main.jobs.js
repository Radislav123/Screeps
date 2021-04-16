// noinspection JSUnresolvedVariable

/**
 * Module responsible for creep jobs.
 * Should be used only in "main.js".
 */

//creeps roles
let roleHarvester = require("ide_work/role.harvester");
let roleUpgrader = require("ide_work/role.upgrader");
let roleBuilder = require("ide_work/role.builder");

//service
let filters = require("ide_work/service.filters");


/**
 * Gives all creeps a job.
 */
let makeJobs = function () {
	makeWorkersJobs()
};


let makeWorkersJobs = function () {
	filters.getHarvesters().forEach(
		function (creep) {
			roleHarvester.work(creep);
		}
	);
	filters.getBuilders().forEach(
		function (creep) {
			roleBuilder.work(creep);
		}
	);
	filters.getUpgraders().forEach(
		function (creep) {
			roleUpgrader.work(creep);
		}
	);
};


module.exports = {
	makeJobs
};