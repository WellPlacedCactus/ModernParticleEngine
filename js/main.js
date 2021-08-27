
/////////////////////////////////////////////////////// GLOBALS
const input = document.querySelector('input');
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/////////////////////////////////////////////////////// EVENTS

input.addEventListener('keydown', ({keyCode}) => {
	if (keyCode == 13) {
		eval(input.value);
		input.value = '';
	}
});

window.addEventListener('load', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
});

window.addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

window.addEventListener('keypress', e => {
	input.focus();
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
		this.x = props['xPosition'];
		this.y = props['yPosition'];
		this.s = props['size'];
		this.c = props['color'];
		this.d = props['velocityDirection'];
		this.m = props['velocityMagnitude'];
		this.a = props['drawAngle'];
		this.dead = false;
	}

	tick() {
		this.translate();
		this.rotate(0.1);
		this.scale(0.1);
		this.slow(0.01);
		this.fade(5);
	}

	die() {
		this.dead = true;
	}

	translate() {
		this.x += Math.cos(this.d) * this.m;
		this.y += Math.sin(this.d) * this.m;
	}

	rotate(factor) {
		this.a += Math.random() * factor;
	}

	scale(factor) {
		this.s -= Math.random() * factor;
		if (this.s < 0) this.die();
	}

	slow(factor) {
		this.m -= Math.random() * factor;
		if (this.m < 0) this.die();
	}

	fade(factor) {
		this.c.a -= Math.random() * factor;
		if (this.c.a < 0) this.die();
	}

	draw() {
		c.save();
		c.translate(this.x + this.s / 2, this.y + this.s / 2);
		c.rotate(this.a);
		c.translate(-this.x - this.s / 2, -this.y - this.s / 2);
		c.fillStyle = this.c.toString();
		c.fillRect(this.x, this.y, this.s, this.s);
		c.restore();
	}
}

class Emitter {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.mag = 10;
		this.dirX = 1;
		this.dirY = 1;
		this.parts = [];
	}

	tick() {
		this.move();
		for (let i = 0; i < 15; i++) this.emit();
	}
	
	move() {
		this.x += this.dirX * this.mag;
		this.y += this.dirY * this.mag;
		if (this.x < 0 || this.x > canvas.width) this.dirX *= -1;
		if (this.y < 0 || this.y > canvas.height) this.dirY *= -1;
	}

	emit() {
		this.parts.push(new Part({
			'xPosition': this.x + Math.random() * 10 + 10,
			'yPosition': this.y + Math.random() * 10 + 10,
			'size': Math.random() * 10 + 10,
			'color': new Color(
				255,
				this.x / canvas.width * 255,
				this.y / canvas.height * 255,
				Math.random() * 255
			),
			'velocityDirection': Math.random() * Math.PI * 2,
			'velocityMagnitude': Math.random() * 5,
			'drawAngle': Math.random() * Math.PI
		}));
	}

	draw() {
		for (let i = this.parts.length - 1; i >= 0; --i) {
			const part = this.parts[i];
			part.tick();
			part.draw();
			if (part.dead) this.parts.splice(i, 1);
		}
	}
}

/////////////////////////////////////////////////////// IMPLEMENTATION

let emitter = new Emitter();
function init() {
	emitter = new Emitter();
}

function loop() {
	/////////////////////////////////////////////////// loop
	requestAnimationFrame(loop);

	/////////////////////////////////////////////////// fill
	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height);

	/////////////////////////////////////////////////// particles
	emitter.tick();
	emitter.draw();

	/////////////////////////////////////////////////// embeded console
	c.font = '23px Comic Sans MS';
	c.fillStyle = 'white';
	c.fillText(input.value, 0, 23);
}

init();
loop();