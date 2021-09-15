
/////////////////////////////////////////////////////// UTILITY FUNCTIONS

const randint = (min, max) => Math.floor(Math.random() * (max - min) + min + 1);

/////////////////////////////////////////////////////// GLOBALS

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/////////////////////////////////////////////////////// EVENTS

window.addEventListener('load', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
});

window.addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

/////////////////////////////////////////////////////// OBJECTS

class Color {
	constructor(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}
 
	toString() {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 255})`;
	}
}

class Part {
	constructor(props) {
		this.x = props['x'] ? props['x'] : canvas.width / 2;
		this.y = props['y'] ? props['y'] : canvas.height / 2;
		this.s = props['size'] ? props['size'] : 15;
		this.c = props['color'] ? props['color'] : new Color(255, 255, 255, 255);
		this.d = props['direction'] ? props['direction'] : 0;
		this.m = props['speed'] ? props['speed'] : 0;
		this.dead = false;
	}

	tick() {
		this.translate();
		this.scale(-0.01);
		this.slow(0);
		this.fade(5);
	}

	draw() {
		c.fillStyle = this.c.toString();
		c.fillRect(this.x + this.s, this.y + this.s, this.s * 2, this.s * 2);
	}

	die() {
		this.dead = true;
	}

	translate() {
		this.x += Math.cos(this.d) * this.m;
		this.y += Math.sin(this.d) * this.m;
	}

	scale(factor) {
		this.s += factor;
		if (this.s < 0) this.die();
	}

	slow(factor) {
		this.m -= factor;
		if (this.m < 0) this.die();
	}

	fade(factor) {
		this.c.a -= factor;
		if (this.c.a < 0) this.die();
	}
}

class Emitter {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.a = 0;
		this.v = 0.1;
		this.parts = [];
		this.partsEmitted = 5;
	}

	tick() {
		this.move();
		for (let i = 0; i < this.partsEmitted; i++) this.emit();
	}
	
	move() {
		// this.x = canvas.width / 2;
		// this.y = canvas.height / 2;
		this.a += this.v;
		this.x = canvas.width / 2 + 100 * Math.cos(this.a);
		this.y = canvas.height / 2 + 100 * Math.sin(this.a);

		// this.x = canvas.width / 2 + 5 * Math.cos(7 * this.a) * 50;
		// this.y = canvas.height / 2 + 5 * Math.sin(5 * this.a) * 50;
	}

	emit() {
		this.parts.push(new Part({
			'x': this.x,
			'y': this.y,
			'size': randint(5, 15),
			'color': new Color(
				255,
				this.x / canvas.width * 255,
				this.y / canvas.height * 255,
				255
			),
			'direction': Math.random() * Math.PI * -1,
			'speed': Math.random() * 1
		}));
	}

	draw() {
		for (let i = this.parts.length - 1; i >= 0; --i) {
			const part = this.parts[i];
			part.tick();
			if (part.dead) {
				this.parts.splice(i, 1);
				continue;
			}
			part.draw();
		}
	}
}

/////////////////////////////////////////////////////// IMPLEMENTATION

let emitter = new Emitter();
let fillAlpha = 0.5;

function init() {
	emitter = new Emitter();
}

function loop() {
	/////////////////////////////////////////////////// loop
	requestAnimationFrame(loop);

	/////////////////////////////////////////////////// fill
	c.fillStyle = `rgba(0, 0, 0, ${fillAlpha})`;
	c.fillRect(0, 0, canvas.width, canvas.height);

	/////////////////////////////////////////////////// particles
	emitter.tick();
	emitter.draw();
}

init();
loop();