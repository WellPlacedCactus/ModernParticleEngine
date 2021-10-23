
export default class Random {

	constructor() {}

	randint(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
}