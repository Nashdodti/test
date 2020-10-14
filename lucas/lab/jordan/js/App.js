var App = function() {

    this.init();
}

App.prototype.init = function() {

    this.canvas = new Canvas();
}
$(document).ready(function() {

    var app = new App();
    console.log('No-minified code is available at https://github.com/lmarti17/Michael-Jordan-Particles');
});
