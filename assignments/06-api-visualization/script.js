let gameOver = false; // variable to stop all movement
const POKEBALL_SPEED = 7; // constant speed of the pokeballs

async function getPokemon(id) {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await res.json();
}

function getRandomNum(min, max) { // simple random number function
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


class Ball { // ball class for all pokeballs
    constructor(x, y, r, pokemonID) {
        this.position = createVector(x, y); // create vector to hold the position of the ball
        this.velocity = p5.Vector.random2D().setMag(POKEBALL_SPEED); // create a velocity vector pointing in a random direction
        this.radius = r;
        this.pokemonID = pokemonID;
        this.img = null;
        this.maxHealth = null; // load stats
        this.health = null; //
        this.attack = null; //
        this.name = null; //
        this.dead = false; //
        this.loadPokemonSpriteAndStats();
    }

    async loadPokemonSpriteAndStats() {

        let pokemon = await getPokemon(this.pokemonID);
        let imageURL = pokemon.sprites.front_default;
        loadImage(imageURL, (loadedImg) => { // fetch and wait for image to download for p5
            this.img = loadedImg;
        });
        this.name = pokemon.name;
        this.health = pokemon.stats["0"].base_stat;
        this.maxHealth = pokemon.stats["0"].base_stat;
        this.attack = pokemon.stats["1"].base_stat;
        this.speed = pokemon.stats["5"].base_stat;

    }

    update() { // update function controlling game flow

        if (gameOver) { return }; // if the game is over, stop all updating

        if (this.dead != true) { // if a specific pokeball is dead, do not update it
            if (this.velocity.magSq() > 0) { // if the pokeball is moving, standardize the velocity
                this.velocity.setMag(POKEBALL_SPEED);
            }
            this.position.add(this.velocity); // add the velocity vector to the position vector which moves it
        }

    }

    checkBoundaryCollision() { // function to check if the pokeball has hit the walls of the window
        if (this.position.x > width - this.radius) {
            this.position.x = width - this.radius;
            this.velocity.x *= -1; // if it has, flip its velocity direction
        } else if (this.position.x < this.radius) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }

        if (this.position.y > height - this.radius) {
            this.position.y = height - this.radius;
            this.velocity.y *= -1;
        } else if (this.position.y < this.radius) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
        }
    }

    checkCollision(other) { // function to check if the pokeball has hit another POKEBALL

        if (this.dead || other.dead) return; // if either are dead, do not do anything (pass through)

        if (this.health === null || other.health === null) return; // if they hit eachother before stats have been loaded, ignore

        let normal = p5.Vector.sub(other.position, this.position) // create a vector with the 
        let dist = normal.mag() // get distance
        let minDist = this.radius + other.radius;

        if (dist < minDist && dist > 0) { // check if the distance between them is less than combined radii
            let overlap = (minDist - dist) * 0.5;
            normal.normalize(); // get direction

            let correction = p5.Vector.mult(normal, overlap); // correct the positions of the balls so they are perfectly touching
            this.position.sub(correction)
            other.position.add(correction);

            let relVelocity = p5.Vector.sub(this.velocity, other.velocity); // get the relative velocity for the two balls
            let impulse = relVelocity.dot(normal); // use a dot product to calculate the strength of impact

            if (impulse > 0) { // big crash

                let impulseVector = p5.Vector.mult(normal, impulse); // create the vector for the push apart for the balls
                this.velocity.sub(impulseVector); // this ball gets a push backward away from the impact
                other.velocity.add(impulseVector); // other ball gets a push forward away from the impact

                if (this.velocity.magSq() === 0) { // make sure head on collisions don't leave a ball with no velocity
                    this.velocity = p5.Vector.mult(normal, -1);
                }
                if (other.velocity.magSq() === 0) {
                    other.velocity = normal.copy();
                }

                this.velocity.setMag(POKEBALL_SPEED);
                other.velocity.setMag(POKEBALL_SPEED);

                let pokemon1_attack = this.attack
                let pokemon1_health = this.health
                let pokemon1_speed = this.speed

                let pokemon2_attack = other.attack
                let pokemon2_health = other.health
                let pokemon2_speed = other.speed

                let winningPoke = (pokemon1_speed > pokemon2_speed) ? this : other; // using ternary and speed stat, calculate which pokeball gets to attakc
                let losingPoke = (pokemon1_speed > pokemon2_speed) ? other : this;


                losingPoke.health -= ( winningPoke.attack / 2.25 ) // apply the damage

                if (losingPoke.health <= 0) { // if the attack leaves the pokemon less than 0 health, kill it
                    losingPoke.dead = true;
                }

            }
        }
    }

    display() {

        stroke("black");
        strokeWeight(3);
        fill(40); 
        circle(this.position.x, this.position.y, this.radius * 2);

        if (!this.dead && this.maxHealth) { // create the small inner circle of red
            let healthRatio = constrain(this.health / this.maxHealth, 0, 1); // scales with health in the radius and keeps it between 0 and 1
            let innerDiameter = this.radius * 2 * healthRatio;

            noStroke();
            fill("red");
            circle(this.position.x, this.position.y, innerDiameter);
        } else if (this.dead) { // make it a darker color
            noStroke();
            fill(80);
            circle(this.position.x, this.position.y, this.radius * 2);
        }

        if (this.img) {
            imageMode(CENTER);
            if (this.dead) { // tint the image if the pokemon has died (also transparent)
                tint(120, 180);
            } else {
                tint(255, 200);
            }
            image(this.img, this.position.x, this.position.y, this.radius * 2, this.radius * 2);
            noTint();
        }
    }
}

let balls = [];
const NUM_BALLS = 12; // pokeball amount
const BALL_RADIUS = 50;

function setup() {

    // make canvas in middle no matter what
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('position', 'fixed');
    cnv.style('top', '0');
    cnv.style('left', '0');
    cnv.style('z-index', '-1');
    cnv.style('pointer-events', 'none');

    while (balls.length < NUM_BALLS) {
        let candidate = new Ball( // create a new pokeball
            random(BALL_RADIUS, width - BALL_RADIUS),
            random(BALL_RADIUS, height - BALL_RADIUS),
            BALL_RADIUS,
            getRandomNum(1, 1000)
        );

        let overlapping = false;
        for (let other of balls) {
            let d = p5.Vector.dist(candidate.position, other.position);
            if (d < BALL_RADIUS * 2) {
                overlapping = true; // if any of the pokeballs are on this one, stop this pokemon from generating
                break;
            }
        }

        if (!overlapping) {
            balls.push(candidate);
        }
    }
}

function draw() { // draw the canvas every frame
    background(51);
    drawingContext.shadowOffsetX = 1;
    drawingContext.shadowOffsetY = 1;
    drawingContext.shadowBlur = 3;
    drawingContext.shadowColor = color(0, 0, 0, 100);

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            balls[i].checkCollision(balls[j]); // check all balls with all other balls
        }
    }

    for (let b of balls) {
        b.update();
        b.checkBoundaryCollision();
        b.display();
    }

    if (!gameOver) { // if game is not over:

        let aliveBalls = balls.filter(b => !b.dead); // check to see how many are alive

        if (aliveBalls.length === 1) { // if only one, thats the winner!

            let winner = aliveBalls[0];

            let announcement = document.createElement("h1")
            announcement.style.fontFamily = "Arial, sans-serif"
            announcement.style.display = "flex";
            announcement.style.justifyContent = "center";
            announcement.style.alignItems = "center";
            announcement.style.paddingTop = "2%";
            announcement.style.color = "#FFD700"
            announcement.innerHTML = `The Winner is ${winner.name.toUpperCase()}!`

            let announcboard = document.querySelector("#announcement")
            announcboard.append(announcement);

            gameOver = true;

        }
    }

}