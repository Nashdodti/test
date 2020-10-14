//////////////////////////
// Mouse Class
//////////////////////////

var Mouse = function() {


	this.init();

}

Mouse.prototype.init = function() {

	this.eventListener();
}


Mouse.prototype.eventListener = function() {

	var self = this;
	$(window).on('mouseMove', function(e) {

		self.mouseX = e.pageX;
		self.mousey = e.pageY;

	});

	// console.log(this.mouseX);
	// console.log(this.mouseY);
};


// End of the class Mouse
