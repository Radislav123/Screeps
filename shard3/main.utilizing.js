// noinspection JSUnresolvedVariable

/**
 * Module responsible for utilizing.
 * Should be used only in "main/index.js" (main.js after flattering).
 */

//service
let projectCreepRoles = require("service.constants").projectCreepRoles;
let logger = require("service.logger");
let service = require("service");

/**
 * Utilize creeps.
 */
let utilizeCreeps = function () {
	for (let creepName in Memory.creeps) {
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
			let creepNameIndex = Memory.creepNamesByRole[creep.groupName][creep.roleName].indexOf(creepName);
			Memory.creepNamesByRole[creep.groupName][creep.roleName].splice(creepNameIndex, 1);

			logger.info(`Creep (name : ${creepName}) memory: was utilized`);
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
	logger.info(`Worker was utilized (name : ${creepName}).`);
};

module.exports = {
	utilizeCreeps
};
