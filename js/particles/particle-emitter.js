
import ParticleHandler from './particle-handler.js';
import Particle from './particle.js';
import Random from '../misc/random.js';

export default class ParticleEmitter {

	constructor(x, y, radius, velocity) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.velocity = velocity;
		this.angle = 0;
		this.color = 0;
		this.particleHandler = new ParticleHandler();
		this.random = new Random();
	}

	tick(canvas) {
		this.angle += this.velocity;
		this.x = Math.floor(canvas.width / 2 + Math.cos(this.angle) * this.radius * 2);
		this.y = Math.floor(canvas.height / 2 + Math.sin(this.angle) * this.radius);
		this.color += 1;
		this.particleHandler.add(new Particle(
			[this.x, this.y],
			Math.random() * Math.PI,
			25,
			[Math.random() * Math.PI * 2, Math.random() * 2],
			this.color,
			1
		));
		this.particleHandler.tick();
	}

	draw(c) {
		this.particleHandler.draw(c);
	}
}