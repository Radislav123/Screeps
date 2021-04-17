// noinspection JSUnresolvedVariable

/**
 * Module responsible for utilizing.
 * Should be used only in "main/index.js" (main.js after flattering).
 */

//service
let projectCreepRoles = require("service/constants").projectCreepRoles;
let logger = require("service/logger");
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

			if (Object.keys(projectCreepRoles.worker).includes(creep.roleName)) {
				utilizeWorker(creepName, creep.roleName, creep.sourceId);
			} else {
				logger.warning(`Could not utilize creep correctly because of unknown role : ${creep.roleName}`);
			}

			//deletes creep memory
			delete Memory.creeps[creepName];
			//deletes creepName from Memory.creepNamesByRole
			delete Memory.creepNamesByRole[creep.groupName][creep.roleName]

			logger.info(`Utilizing creep memory.${ait}(creep name : ${creepName})`);
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
	Memory.sources[service.getSourceNumberById(sourceId)].assignedCreepsAmount--;
	Memory.creepNumbers.worker[creepRole]--;
	logger.info(`Utilizing worker (${creepName}).`);
};

module.exports = {
	utilizeCreeps
};
