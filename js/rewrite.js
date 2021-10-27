
/////////////////////////////////////////////////////// IMPORTS

import ParticleEmitter from './particles/particle-emitter.js';

/////////////////////////////////////////////////////// ENGINE

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/////////////////////////////////////////////////////// EVENTS

addEventListener('load', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
	loop();
});

addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

/////////////////////////////////////////////////////// IMPLEMENTATION

let fillAlpha = 0.1;
let emitters = [];
let emitterCount = 3;

function init() {
	emitters = [];
	for (let i = 0; i < emitterCount; i++) {
		emitters.push(new ParticleEmitter(
			[canvas.width / 2, canvas.height / 2],
			canvas.width / 5,
			Math.PI * 2 * i / emitterCount,
			360 * i / emitterCount,
			0.05
		));
	}
	emitters.push(new ParticleEmitter(
		[canvas.width / 2, canvas.height / 2],
		0,
		0,
		0,
		0
	));
}

function loop() {
	/////////////////////////////////////////////////// loop
	requestAnimationFrame(loop);

	/////////////////////////////////////////////////// fill
	c.fillStyle = `rgba(0, 0, 0, ${fillAlpha})`;
	c.fillRect(0, 0, canvas.width, canvas.height);

	/////////////////////////////////////////////////// particles
	emitters.forEach(emitter => {
		emitter.tick();
		emitter.draw(c);
	});
}