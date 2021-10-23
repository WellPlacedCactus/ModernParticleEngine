
import Particle from './particle.js';

export default class ParticleHandler {

	constructor() {
		this.particles = [];
	}

	add(object) {
		if (object instanceof Particle) {
			object.handler = this;
			this.particles.push(object);
		}
	}

	tick() {
		for (let i = this.particles.length - 1; i >= 0; --i) {
			const particle = this.particles[i];
			particle.tick();
			if (particle.dead) {
				this.particles.splice(i, 1);
			}
		}
	}

	draw(c) {
		for (let i = this.particles.length - 1; i >= 0; --i) {
			const particle = this.particles[i];
			particle.draw(c);
		}
	}
}