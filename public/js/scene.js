// All variables are instantiated in the setup function.

// Store the canvas variable for easy access.
var canvas;

// Background color variable.
var backgroundColor;

// Hue value for all objects in the scene.
var objectHue;

// Ping circle object variables.
var pingValue;
var pingSpeed;
var pingSize;

// Variables for managing the particles.
var particleMax, particleSize, particleSpeed, particleDistance, particleRepel;

var particles = []; // Main particle object storage.
var particleCount; // Current particle count.

// Ping circle that corresponds to requests made for server uptime tests.
function drawWave() {
    colorMode(HSB, 100); // Set the correct color mode.

    noFill();
    strokeWeight(16 - (pingValue / pingSize * 16));
    stroke(objectHue, 255, 255, 255 - (pingValue / pingSize * 280));
    ellipse(width / 2, height / 2, pingValue);
}

// Updates the circle and resets its position if needed.
function updateWave() {
    pingValue += pingSpeed;
}

// Resets the ping wave.
function startWave() {
    pingValue = 0;
}

// Particle creation function. Uses window size for particle count.
function createParticles() {
    // Set the correct particle count if it wasn't already set.
    if (particleCount == null) particleCount = (width * height) / 10000;

    // Calculate a count of particles that responds to the screen size.
    var mean = (width * height) / 10000;

    // Iterate over our particle range and start adding data to the particle array.
    for (var i = 0; i < particleCount * particleMult; i++) {
        if (i > mean * particleMult) {
            particles.splice(i, 1); // Delete particles that pass the count.

        } else {
            if (particles[i] == null) {
                particles[i] = [
                    createVector(
                        random(width),
                        random(height)
                    ),
                    createVector(
                        random(particleSpeed) - particleSpeed / 2,
                        random(particleSpeed) - particleSpeed / 2
                    )
                ];
            }
        }
    }

    particleCount = mean;
}

// Drawing loop for particles.
function drawParticles() {
    colorMode(HSB, 100); // Set the correct color mode.

    // Iterate over particles with each checking another for it's distance.
    for (var i = 0; i < particles.length; i++) {
        var aPos = particles[i][0]; // Get the position of the first particle.

        fill(objectHue, 255, 255); // Set the color for the particle dots.

        strokeWeight(0);
        ellipse(aPos.x, aPos.y, particleSize, particleSize); // Draw  a dot.

        for (var j = i + 1; j < particles.length; j++) {
            var bPos = particles[j][0]; // Get the position of the second particle.

            var dist = aPos.dist(bPos); // Calculate the distance between particles.

            if (dist <= particleDistance) { // If the dist
                var influence = dist / particleDistance;
                strokeWeight(particleLine - influence);
                stroke(objectHue, 255, 255 - 255 * influence, 255 - 255 * influence);

                line(aPos.x, aPos.y, bPos.x, bPos.y);
            }
        }
    }
}

// Main particle physics calculation and mouse response.
function updateParticles() {
    var mousePos = createVector(mouseX, mouseY); // Get the mouse position.

    // Iterate over particles.
    for (var i = 0; i < particles.length; i++) {
        var pos = particles[i][0];
        var speed = particles[i][1];

        pos.add(speed); // Apply the particle movement to its position.

        var distToMouse = mousePos.dist(pos); // Get the distance of the particle to the mouse cursor.

        // If the distance is shorter than the repel distance we apply force to the particle.
        if (distToMouse < particleRepel) {
            var repel = createVector(pos.x - mousePos.x, pos.y - mousePos.y);
            var distFrac = (particleRepel - distToMouse) / particleRepel
            repel.setMag(50 * distFrac * distFrac);
            pos.add(repel);
        }

        if (pos.x > width) {
            pos.x -= width;
            pos.y += random(height / 10) - height / 20;

        } else if (pos.x < 0) {
            pos.x += width;
            pos.y += random(height / 10) - height / 20;
        }

        if (pos.y > height) {
            pos.y -= height;
            pos.x += random(width / 10) - width / 20;

        } else if (pos.y < 0) {
            pos.y += height;
            pos.x += random(width / 10) - width / 20;
        }
    }
}

// Program entry point.
function setup() {
    // Create the canvas in the base page.
    canvas = createCanvas(windowWidth, windowHeight);

    // Get the correct parent by its ID.
    canvas.parent("canvas");

    // Set drawing defaults.
    frameRate(60);
    stroke(255);

    // Set the gradient values.
    backgroundColor = color(255, 255, 255);

    // Set the hue for objects in the scene.
    objectHue = 58;

    // Set ping circle variables.
    pingValue = (width * height);;
    pingSpeed = 10;
    pingSize = (width + height);

    // Set particle variables.
    particleMult = 0.75;
    particleSize = 4;
    particleLine = 1;
    particleRepel = 128;
    particleDistance = 128;
    particleSpeed = 1;

    createParticles(); // Create the particles with the set values.
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    pingSize = (width + height); // Update the size of the ping circle max.

    createParticles(); // Recreate particles with the new screen settings.
}

// Called each frame.
function draw() {
    background(backgroundColor); // Reset the background color.

    drawWave(); // Draw the server ping circle.
    updateWave(); // Update the ping circle.

    drawParticles(); // Draw particles.
    updateParticles(); // Update particle logic.
}
