const canvas = document.querySelector('#board');

const ball = document.getElementById('ball');

const c = canvas.getContext('2d');

const net = {
	x: canvas.width / 2 - 2 / 2,
	y: 0,
	width: 2,
	height: 10,
	color: 'turquoise',
};

const backgroundImage = new Image();
backgroundImage.src = 'atarilogo2.jpg';

backgroundImage.onload = function () {
	c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
	constructor(position) {
		this.position = position;
	}
	draw() {
		c.fillStyle = 'orange';
		c.fillRect(this.position.x, this.position.y, 15, 30);
	}
}

const player = new Sprite({
	x: 0,
	y: 0,
});

const player2 = new Sprite({
	x: canvas.width - 20,
	y: canvas.height / 2,
});

player.draw();
player2.draw();

let isMoving = false;

const keys = {
	d: {
		pressed: false,
	},
	e: {
		pressed: false,
	},
	ArrowUp: {
		pressed: false,
	},
	ArrowDown: {
		pressed: false,
	},
};

function drawnet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        c.fillStyle = net.color;
        c.fillRect(net.x, net.y + i, net.width, net.height);
    }
}

function animate() {
	window.requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	// Draw the background image
	c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
	// Draw the player
	player.draw();
	player2.draw();

	if (keys.d.pressed) {
		player.position.y = 2;
	} else if (keys.e.pressed) {
		player.position.y = -2;
	}

	if (keys.ArrowDown.pressed) {
		moveDown2();
	} else if (keys.ArrowUp.pressed) {
		moveUp2();
    }
    drawnet()
}

animate();

window.addEventListener('keydown', (event) => {
	if (!isMoving) {
		isMoving = true;
		switch (event.key) {
			case 'd':
				moveDown(player);
				break;
			case 'e':
				moveUp(player);
				break;
			case 'ArrowUp':
				moveUp2(player2);
				break;
			case 'ArrowDown':
				moveDown2(player2);
				break;
		}
	}
});

window.addEventListener('keyup', (event) => {
	if (['e', 'd', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
		isMoving = false;
	}
});

function moveDown(player) {
	if (isMoving) {
		player.position.y += 2;
		animate();
		setTimeout(() => moveDown(player), 16);
	}
}

function moveDown2(player2) {
	if (isMoving) {
		player2.position.y += 2;
		animate();
		setTimeout(() => moveDown2(player2), 16);
	}
}

function moveUp(player) {
	if (isMoving) {
		player.position.y -= 2;
		animate();
		setTimeout(() => moveUp(player), 16);
	}
}

function moveUp2(player2) {
	if (isMoving) {
		player2.position.y -= 2;
		animate();
		setTimeout(() => moveUp2(player2), 16);
	}
}
