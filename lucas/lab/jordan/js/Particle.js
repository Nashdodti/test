//////////////////////////
// Class Particle
//////////////////////////

var Particle = function(canvas, destinationX, destinationY) {

	this.canvas = canvas;
	this.properties = {};
	this.variantProperties = {};
    this.destinationX = destinationX;
    this.destinationY = destinationY;
	this.init();
};

Particle.prototype.init = function() {

    this.properties.x = this.giveDestinationX();
    this.properties.y = this.giveDestinationY();

    this.variantProperties.radiusMin = 1;
    this.variantProperties.radiusMax = 5;
    this.variantProperties.colors = {
        color_1 : "#CE1141",
        color_2 : "#061922",
        color_3 : "#EEEEEE"
    }

    // Set parameters that can change
    this.createSettings();
	// Draw the Particle when instanced
	this.draw();

	this.updatePosition(this.destinationX, this.destinationY);
}

Particle.prototype.updateProperties = function(properties) {

    if(properties){
        this.variantProperties = properties;
        }
        this.createSettings();
}

Particle.prototype.createSettings = function(){

    this.properties.radius = this.getRandom(this.variantProperties.radiusMin,this.variantProperties.radiusMax);
    this.properties.color = this.getRandomColor();
}

// Method which draw a Particle
Particle.prototype.draw = function() {

	this.canvas.ctx.beginPath();
	this.canvas.ctx.arc(this.properties.x, this.properties.y, this.properties.radius, 0, 2 * Math.PI, false);
	this.canvas.ctx.fillStyle = this.properties.color;
	this.canvas.ctx.fill();
}

Particle.prototype.updatePosition = function(destinationX, destinationY) {
	var self = this;
	this.properties.tween = TweenLite.to(this.properties, this.getRandom(2, 7), {
		ease: Power1.easeInOut,
		x: destinationX,
		y: destinationY,
		onComplete: function() {
			self.updatePosition(self.destinationX + self.getRandom(-10, 10), self.destinationY + self.getRandom(-10, 10));
		}
	});
}

Particle.prototype.getRandomColor = function(){

    var colorTab = []
    var i = 0;
    for(var key in this.variantProperties.colors) {
        colorTab[i] = this.variantProperties.colors[key];
        i += 1;
    }
    return colorTab[this.getRandom(0,3)]
}

// Method wich return a new X position for the object
Particle.prototype.giveDestinationX = function() {
	return Math.floor(Math.random() * this.canvas.Canvas.width);
}

// Method wich return a new Y position for the object
Particle.prototype.giveDestinationY = function() {
	return Math.floor(Math.random() * this.canvas.Canvas.height);
}

Particle.prototype.getRandom = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

// End of the class Particle
