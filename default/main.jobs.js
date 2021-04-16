// noinspection JSUnresolvedVariable

/**
 * Module responsible for creep jobs.
 * Should be used only in "main.js".
 */

//creeps roles
let roleHarvester = require("role.harvester");
let roleUpgrader = require("role.upgrader");
let roleBuilder = require("role.builder");

//service
let filters = require("service.filters");


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