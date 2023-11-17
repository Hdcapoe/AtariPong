const canvas = document.querySelector('#board');

const c = canvas.getContext('2d');

const net = {
	x: canvas.width / 2 - 2 / 2,
	y: 0,
	width: 2,
	height: 10,
	color: 'turquoise',
};

const scoreboard = {
	player: 0,
	player2: 0,
};

const scoreDisplayPlayer1 = document.createElement('div');
scoreDisplayPlayer1.style.position = 'absolute';
scoreDisplayPlayer1.style.left = '50px';
scoreDisplayPlayer1.style.top = '50px';
scoreDisplayPlayer1.style.fontSize = '50px';
scoreDisplayPlayer1.style.fontWeight = 'bold';
scoreDisplayPlayer1.style.color = 'white';
document.body.appendChild(scoreDisplayPlayer1);

const scoreDisplayPlayer2 = document.createElement('div');
scoreDisplayPlayer2.style.position = 'absolute';
scoreDisplayPlayer2.style.right = '50px';
scoreDisplayPlayer2.style.top = '50px';
scoreDisplayPlayer2.style.fontSize = '50px';
scoreDisplayPlayer2.style.fontWeight = 'bold';
scoreDisplayPlayer2.style.color = 'white';
document.body.appendChild(scoreDisplayPlayer2);

const backgroundImage = new Image();
backgroundImage.src = 'atarilogo2.jpg';

const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', resetGame);

backgroundImage.onload = function () {
	c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

c.fillRect(0, 0, canvas.width, canvas.height);

class Ball {
	constructor(position, radius, velocity) {
		this.position = position;
		this.radius = radius;
		this.velocity = velocity;
		this.hue = 0;
	}

	draw() {
		this.hue = (this.hue + 1) % 360;

		const color = `hsl(${this.hue}, 100%, 50%)`;

		c.fillStyle = color;
		c.beginPath();
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
		c.closePath();
		c.fill();

		if (
			this.position.y - this.radius < 0 ||
			this.position.y + this.radius > canvas.height
		) {
			this.velocity.y = -this.velocity.y;

			this.position.y =
				this.position.y < this.radius
					? this.radius
					: canvas.height - this.radius;
		}

		if (
			this.position.x - this.radius <= player.position.x + 15 &&
			this.position.x + this.radius >= player.position.x &&
			this.position.y + this.radius >= player.position.y &&
			this.position.y - this.radius <= player.position.y + 30
		) {
			this.velocity.x = -this.velocity.x;
		}

		if (
			this.position.x + this.radius >= player2.position.x &&
			this.position.x - this.radius <= player2.position.x + 15 &&
			this.position.y + this.radius >= player2.position.y &&
			this.position.y - this.radius <= player2.position.y + 30
		) {
			this.velocity.x = -this.velocity.x;
		}
	}
}

const ball = new Ball(
	{
		x: canvas.width / 2,
		y: canvas.height / 2,
	},
	5,
	{ x: 2, y: 2 }
);
('black');

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



let spacebarPressed = false;

function startGame() {
    // Initialize the ball in the middle
    ball.position = { x: canvas.width / 2, y: canvas.height / 2 };
    ball.velocity = { x: 2, y: 2 };

    // Start the animation loop
    animate();
}

// Add event listener for spacebar press
window.addEventListener('keydown', (event) => {
    if (event.key === ' ' && !spacebarPressed) {
        spacebarPressed = true;
        startGame();
    }
});


function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    player.draw();
    player2.draw();

    

    if (keys.d.pressed) {
        player.position.y = 3;
    } else if (keys.e.pressed) {
        player.position.y = -3;
    }

    if (keys.ArrowDown.pressed) {
        moveDown2();
    } else if (keys.ArrowUp.pressed) {
        moveUp2();
    }

    ball.position.x += ball.velocity.x;
    ball.position.y += ball.velocity.y;

    drawnet();
    ball.draw();

    if (ball.position.x - ball.radius < 0) {
        scoreboard.player2++;
        resetBall();
    }

    if (ball.position.x + ball.radius > canvas.width) {
        scoreboard.player++;
        resetBall();
    }
    scoreDisplayPlayer1.textContent = `Player 1: ${scoreboard.player}`;
    scoreDisplayPlayer2.textContent = `Player 2: ${scoreboard.player2}`;

    function resetBall() {
        ball.position = { x: canvas.width / 2, y: canvas.height / 2 };
        ball.velocity = { x: 2, y: 2 };
    }
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
			player.position.y += 3;

			if (player.position.y > canvas.height) {
				player.position.y = -30;
			}

			setTimeout(() => moveDown(player), 16);
		}
	}

	function moveUp(player) {
		if (isMoving) {
			player.position.y -= 3;

			if (player.position.y + 30 < 0) {
				player.position.y = canvas.height;
			}

			setTimeout(() => moveUp(player), 16);
		}
	}

	function moveDown2(player2) {
		if (isMoving) {
			player2.position.y += 3;

			if (player2.position.y > canvas.height) {
				player2.position.y = -30;
			}

			setTimeout(() => moveDown2(player2), 16);
		}
	}

	function moveUp2(player2) {
		if (isMoving) {
			player2.position.y -= 3;

			if (player2.position.y + 30 < 0) {
				player2.position.y = canvas.height;
			}

			setTimeout(() => moveUp2(player2), 16);
		}
	}

	function resetGame() {
		scoreboard.player = 0;
		scoreboard.player2 = 0;
	}



