// noinspection JSUnresolvedVariable

/**
 * Module with constants.
 */

//screeps find constants
//https://screeps.fandom.com/wiki/Find_Constants

//todo: remove this constant?
const projectCreepRoleGroups = {
	worker: "worker",
};

const projectCreepRoles = {
	[projectCreepRoleGroups.worker]: {
		harvester: "harvester",
		builder: "builder",
		upgrader: "upgrader"
	}
};

const projectErrorCodes = {
	ERR_NOT_ENOUGH_TARGETS: -999
};

module.exports = {
	projectCreepRoleGroups,
	projectCreepRoles,
	projectErrorCodes
};
