
export default class Particle {

	constructor(position, rotation, scale, velocity, color, alpha) {
		this.dead = false;
		this.handler = null;
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;
		this.velocity = velocity;
		this.color = color;
		this.alpha = alpha;
	}

	die() {
		this.dead = true;
	}

	translate(vector) {
		this.position[0] += Math.cos(vector[0]) * vector[1];
		this.position[1] += Math.sin(vector[0]) * vector[1];
	}

	rotate(scalar) {
		this.rotation += scalar;
	}

	scaleBy(scalar) {
		this.scale += scalar;
		if (this.scale < 0) {
			this.die();
		}
	}

	slow(scalar) {
		this.velocity[1] -= scalar;
		if (this.velocity[1] < 0) {
			this.die();
		}
	}

	fade(scalar) {
		this.alpha -= scalar;
		if (this.alpha < 0) {
			this.die();
		}
	}

	tick() {
		this.translate(this.velocity);
		this.rotate(0);
		this.scaleBy(-Math.random());
		this.slow(0);
		this.fade(0.05 * Math.random());
	}

	draw(c) {
		c.fillStyle = `hsla(${this.color}, 100%, 50%, ${this.alpha})`;
		c.save();
		c.translate(this.position[0], this.position[1]);
		c.rotate(this.rotation);
		c.fillRect(-this.scale, -this.scale, this.scale * 2, this.scale * 2);
		c.restore();
	}
}