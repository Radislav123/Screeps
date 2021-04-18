// noinspection JSUnresolvedVariable

/**
 * Module responsible for creep jobs.
 * Should be used only in "main/index.js" (main.js after flattering).
 */

//creeps roles
let harvester = require("role.harvester");
let upgrader = require("role.upgrader");
let builder = require("role.builder");

//service
let filters = require("service.filters");


/**
 * Gives all creeps job.
 */
let makeJobs = function () {
	makeWorkerJobs();
};


let makeWorkerJobs = function () {
	filters.getHarvesters().forEach(
		function (creep) {
			harvester.work(creep);
		}
	);
	filters.getBuilders().forEach(
		function (creep) {
			builder.work(creep);
		}
	);
	filters.getUpgraders().forEach(
		function (creep) {
			upgrader.work(creep);
		}
	);
};


module.exports = {
	makeJobs
};
