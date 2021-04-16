// noinspection JSUnresolvedVariable

/**
 * Module with logger.
 */

let logger = {};
//https://www.w3schools.com/colors/colors_picker.asp
let colors = {
	'0': '#666666',
	'1': '#737373',
	'2': '#999999',
	'3': '#809fff',
	'4': '#e65c00',
	'5': '#ff5050',
	'6': '#008800'
};

logger.info = function (message) {
	console.log(makeColorfulMessage("info - " + message, colors[2]));
};

logger.cpuUsage = function (func, ...args) {
	logCpuUsage(func, ...args);
};

logger.cpuUsageWithWritingInMemory = function (func, ...args) {
	Memory[func.name] += logCpuUsage(func, ...args);
};

logger.debug = function (message) {
	console.log(makeColorfulMessage("debug - " + message, colors[6]));
};

logger.warning = function (message) {
	console.log(makeColorfulMessage("warning - " + message, colors[4]));
};

/**
 * For in-game alerts.
 * @param {String} message
 */
logger.alert = function (message) {
	console.log(makeColorfulMessage("alert - " + message, colors[5]));
};

/**
 * For internal use
 *
 * @param {function} func to compute usage
 * @param args for func
 *
 * @return {number} cpu usage
 */
let logCpuUsage = function (func, ...args) {
	let cpuUsage = getFunctionCpuUsage(func, ...args);
	let message = func.name + " : " + cpuUsage;
	console.log(makeColorfulMessage("cpuUsage - " + message, colors[1]));
	return cpuUsage;
};

/**
 * Return function cpu usage.
 *
 * @param {function} func to compute usage
 * @param args for func
 *
 * @return {number} cpu usage
 */
let getFunctionCpuUsage = function (func, ...args) {
	let cpuOldUsage = Game.cpu.getUsed();
	func(...args);
	return Game.cpu.getUsed() - cpuOldUsage;
};

/**
 * Make Message colorful in console output.
 *
 * @param {String} message
 * @param {String} colorCode in "#xxxxxx" format
 */
let makeColorfulMessage = function (message, colorCode) {
	return '<span ' + colorCode + 'style="color: ; ">' + message + '</span>';
};


module.exports = logger;
