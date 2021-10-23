
/////////////////////////////////////////////////////// IMPORTS

import ParticleEmitter from './particles/particle-emitter.js';

/////////////////////////////////////////////////////// GLOBALS

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/////////////////////////////////////////////////////// EVENTS

addEventListener('load', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
});

addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

/////////////////////////////////////////////////////// IMPLEMENTATION

let fillAlpha = 0.5;
let particleEmitter = null;

function init() {
	particleEmitter = new ParticleEmitter(0, 0, 100, 0.1);
}

function loop() {
	/////////////////////////////////////////////////// loop
	requestAnimationFrame(loop);

	/////////////////////////////////////////////////// fill
	c.fillStyle = `rgba(0, 0, 0, ${fillAlpha})`;
	c.fillRect(0, 0, canvas.width, canvas.height);

	/////////////////////////////////////////////////// particles
	particleEmitter.tick(canvas);
	particleEmitter.draw(c);
}

init();
loop();