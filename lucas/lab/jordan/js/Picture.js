//////////////////////////
// Class Picture
//////////////////////////

var Picture = function(canvas, callback) {

	this.canvas = canvas;
	this.callback = callback;

	this.init();
}

Picture.prototype.init = function() {

	this.img = new Image();
	this.img.src = 'jordan.png';

	this.img.size = this.canvas.Canvas.height;
	this.img.drawPosition = this.center();

	var self = this;

	this.img.onload = function() {
		self.canvas.ctx.drawImage(self.img, self.img.drawPosition[0], self.img.drawPosition[1], self.img.size, self.img.size);
		var data = self.canvas.ctx.getImageData(0, 0, self.canvas.Canvas.width, self.canvas.Canvas.height).data;
		var positions = [];

		for (var i = 0; i < data.length - 136; i += 136) {
			if (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0 && data[i + 3] == 255) {
				positions.push({
					x: Math.floor(i / 4 % self.canvas.Canvas.width),
					y: Math.floor(i / 4 / self.canvas.Canvas.width)
				});
			}
		}
		self.callback.call(this, positions);
	}
}

Picture.prototype.center = function() {

	var x = (this.canvas.Canvas.width / 2) - (this.img.size / 2);
	var y = (this.canvas.Canvas.height / 2) - (this.img.size / 2);
	return [x, y];
}

// End of the class Picture
