//////////////////////////
// Canvas Class
//////////////////////////

var Canvas = function() {

	this.canvas = {};

	this.init();
}

Canvas.prototype.init = function() {

	this.canvas.Canvas = document.getElementById('canvas');
	this.canvas.ctx = this.canvas.Canvas.getContext('2d');
	this.canvas.Canvas.width = $(window).width();
	this.canvas.Canvas.height = $(window).height();
	this.canvas.particleArray = [];
	this.canvas.positionArray = [];
	this.canvas.img = new Picture(this.canvas, this.callback.bind(this));

    this.guiPropertiesToChange = {
        radiusMin : 1,
        radiusMax: 5,
        colors: {
        color_1: '#CE1141',
        color_2: '#061922',
        color_3: '#EEEEEE'}

    }

    this.gui_init();
	// this.mouse = new Mouse();
}

Canvas.prototype.callback = function(positions) {

	this.canvas.positionArray = positions;
	this.canvas.ctx.clearRect(0, 0, this.canvas.Canvas.width, this.canvas.Canvas.height);
	var self = this;

	this.canvas.positionArray.forEach(function(e) {
		self.canvas.particleArray.push(
			new Particle(self.canvas, e.x, e.y)
		);
	})
	this.loopArray();

};

Canvas.prototype.drawArray = function() {
	this.canvas.ctx.clearRect(0, 0, this.canvas.Canvas.width, this.canvas.Canvas.height);
	this.canvas.particleArray.forEach(function(e) {
		e.draw();
	});
};

Canvas.prototype.loopArray = function() {
	this.drawArray();
	window.requestAnimationFrame(this.loopArray.bind(this));
}

// Method which return a random number between a min and a max
Canvas.prototype.getRandom = function(min, max) {
	return Math.random() * (max - min) + min;
}

// Method which return a new X position for the object
Canvas.prototype.giveDestinationX = function() {
	return Math.floor(Math.random() * this.canvas.Canvas.width);
}

// Method which return a new Y position for the object
Canvas.prototype.giveDestinationY = function() {
		return Math.floor(Math.random() * this.canvas.Canvas.height);
}

Canvas.prototype.gui_init = function(){
    var gui = new dat.GUI();

    var folder = gui.addFolder('Properties');

    var particle_radius_min = folder.add(this.guiPropertiesToChange, 'radiusMin', 1, 4).step(1);
    var particle_radius_max = folder.add(this.guiPropertiesToChange, 'radiusMax', 5, 10).step(1);
    var particle_color_1 = folder.addColor(this.guiPropertiesToChange.colors, 'color_1');
    var particle_color_2 = folder.addColor(this.guiPropertiesToChange.colors, 'color_2');
    var particle_color_3 = folder.addColor(this.guiPropertiesToChange.colors, 'color_3');

    folder.open();

    particle_radius_min.onChange(this.gui_UpdateParticlesProperties.bind(this));
    particle_radius_max.onChange(this.gui_UpdateParticlesProperties.bind(this));
    particle_color_1.onChange(this.gui_UpdateParticlesProperties.bind(this));
    particle_color_2.onChange(this.gui_UpdateParticlesProperties.bind(this));
    particle_color_3.onChange(this.gui_UpdateParticlesProperties.bind(this));
}

Canvas.prototype.gui_UpdateParticlesProperties = function(){

    var self = this;
    this.canvas.particleArray.forEach(function(e){
        e.updateProperties(self.guiPropertiesToChange);
    })
}


// End of the class Canvas
