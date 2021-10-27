
import ParticleHandler from './particle-handler.js';
import Particle from './particle.js';
import Random from '../misc/random.js';

export default class ParticleEmitter {

	constructor(position, radius, theta, color, velocity) {
		this.position = position;
		this.radius = radius;
		this.theta = theta;
		this.color = color;
		this.velocity = velocity;
		this.particleHandler = new ParticleHandler();
		this.random = new Random();
	}

	addParticles() {
		for (let i = 0; i < 1; i++) {
			this.particleHandler.add(new Particle(
				[
					this.position[0] + Math.cos(this.theta) * this.radius,
					this.position[1] + Math.sin(this.theta) * this.radius,
				],
				Math.random() * Math.PI,
				25,
				[Math.random() * Math.PI * 2, Math.random() * 2],
				this.color,
				1
			));
		}
	}

	tick() {
		this.theta += this.velocity;
		this.color += 1;
		this.addParticles();
		this.particleHandler.tick();
	}

	draw(c) {
		this.particleHandler.draw(c);
	}
};