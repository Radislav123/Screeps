/**
 * Module responsible for utilizing.
 * Should be used only in "main.js".
 */

//service
let roleNames = require("service.constants").roleNames;
let logger = require("service.logger");
let service = require("service");


let ait = "\n\t";

/**
 * Utilize creeps.
 */
let utilizeCreeps = function () {
	for (let creepName in Memory.creeps) {
		//ait - additionalInformationTransfer
		if (!Game.creeps[creepName]) {
			let creep = Memory.creeps[creepName];

			if (roleNames.workers.includes(creep.role)) {
				utilizeWorker(creepName, creep.role, creep.sourceId);
			} else {
				logger.warning(`Could not utilize creep correctly because of unknown role : ${creep.role}`);
			}

			//deletes creep memory
			delete Memory.creeps[creepName];

			logger.info(`Utilizing creep memory.${ait}(creepName : ${creepName})`);
		}
	}
};

/**
 * Utilize harvester
 *
 * @param {String} creepName
 * @param {String} creepRole
 * @param {String} sourceId
 */
let utilizeWorker = function (creepName, creepRole, sourceId) {
	Memory.sources[service.getSourceNumberById(sourceId)].assignedCreepsNumber--;
	Memory.creepsNumbers.workers[creepRole]--;
	logger.info(`Utilizing worker (${creepName}).`);
};

module.exports = {
	utilizeCreeps
};