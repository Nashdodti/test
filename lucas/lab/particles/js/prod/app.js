
var Transition;(function(){'use strict';var instance;Transition=function(){if(instance){return instance;}
this.dom={};this.dom.slide=$('.section');this.init();instance=this;}
Transition.prototype.init=function(){this.count=0;this.callbacks=[];}
Transition.prototype.onMove=function(callback){this.callbacks.push(callback);}
Transition.prototype.getDirection=function(direction,stepForward){if(stepForward==0){this.count--;}
else if(stepForward==1){this.count++;}
if(direction==='up'&&this.count-1>=0){this.count--;}else if(direction==='down'&&this.count+1<this.dom.slide.length){this.count++;}else{return;}
this.trigger(this.count,direction);}
Transition.prototype.trigger=function(index,direction){var args=[index,direction];for(var i=0;i<this.callbacks.length;i++){this.callbacks[i].apply(this,[args]);}}})();var Particle=function(canvas,colorIndex){this.canvas=canvas;this.properties={};this.init(colorIndex);};Particle.prototype.init=function(colorIndex){this.properties.radius=this.getRandom(1,5);this.properties.color=colorIndex[this.getRandom(0,4)];this.properties.x=this.giveDestinationX();this.properties.y=this.canvas.Canvas.height+10;this.properties.tween=TweenLite.to(this.properties,0.1,{ease:Power1.easeInOut,x:this.getRandom(0,this.canvas.Canvas.width),y:this.canvas.Canvas.height+10});this.draw();}
Particle.prototype.draw=function(){this.canvas.ctx.beginPath();this.canvas.ctx.arc(this.properties.x,this.properties.y,this.properties.radius,0,2*Math.PI,false);this.canvas.ctx.fillStyle=this.properties.color;this.canvas.ctx.fill();}
Particle.prototype.updatePosition=function(destinationY){var timer=(typeof destinationY==='undefined')?this.getRandom(3,7):this.depthTimer();if(destinationY===undefined){if(this.properties.tween.progress()>0.95){this.tweenParticle(this.getRandom(0,this.canvas.Canvas.height),timer);}}else{this.properties.tween.kill();this.tweenParticle(destinationY,timer);}}
Particle.prototype.tweenParticle=function(destinationY,timer){var self=this;this.properties.tween=TweenLite.to(this.properties,timer,{bezier:{curviness:5,values:[{x:self.getRandom(0,self.canvas.Canvas.width),y:self.getRandom(0,self.canvas.Canvas.height)},{x:self.getRandom(0,self.canvas.Canvas.width),y:self.getRandom(0,self.canvas.Canvas.height)}]},ease:Power1.easeInOut,x:self.getRandom(0,self.canvas.Canvas.width),y:destinationY});}
Particle.prototype.giveDestinationX=function(){return Math.floor(Math.random()*this.canvas.Canvas.width);}
Particle.prototype.getRandom=function(min,max){return Math.floor(Math.random()*(max-min)+min);}
Particle.prototype.depthTimer=function(){var tab=['',4,3,1.5,1,0.5];return tab[this.properties.radius];}
var ParticleManager=function(canvas){this.canvas=canvas;this.elements={};this.init();}
ParticleManager.prototype.init=function(){this.elements.colorRange=[["#1460A8","#3A8AC1","#8CB8D8","#F1F2F4","#0C0A0D"],["#B1DE7C","#9DD65C","#89CE3B","#75B42D","#5F9325"],["#DF6868","#D63E3E","#CA2B2B","#A82424","#871D1D"]];this.elements.particleArray=this.generateArray(3,30);this.elements.arrayToUpdate=this.elements.particleArray[0];this.updateArray();this.transition=new Transition();this.transition.onMove(this.escapeAnimation.bind(this));this.transition.onMove(this.updateArrayToMove.bind(this));}
ParticleManager.prototype.generateArray=function(numberOfArrays,numberParticleForEach){var tab=[];for(var i=0;i<numberOfArrays;i++){tab[i]=[];for(var j=0;j<numberParticleForEach;j++){tab[i][j]=new Particle(this.canvas,this.elements.colorRange[i]);};}
return tab;};ParticleManager.prototype.updateArray=function(destination){this.elements.arrayToUpdate.forEach(function(e){e.updatePosition(destination);})};ParticleManager.prototype.updateArrayToMove=function(args){this.elements.arrayToUpdate=this.elements.particleArray[args[0]];}
ParticleManager.prototype.escapeAnimation=function(args){if(args[1]==='up'){this.updateArray(this.canvas.Canvas.height+10);}else if(args[1]==='down'){this.updateArray(-10);}}
var Canvas=function(){this.canvas={};this.init();}
Canvas.prototype.init=function(){this.canvas.Canvas=document.getElementById('canvas');this.canvas.ctx=this.canvas.Canvas.getContext('2d');this.canvas.Canvas.width=$(window).width();this.canvas.Canvas.height=$(window).height();this.manager=new ParticleManager(this.canvas);this.drawArray();this.loopDraw();}
Canvas.prototype.drawArray=function(){this.canvas.ctx.clearRect(0,0,this.canvas.Canvas.width,this.canvas.Canvas.height);this.manager.elements.particleArray.forEach(function(array){array.forEach(function(e){e.draw();})});};Canvas.prototype.loopDraw=function(){this.drawArray();this.manager.updateArray();window.requestAnimationFrame(this.loopDraw.bind(this));}
var EventListener=function(){this.init();this.transition=new Transition();}
EventListener.prototype.init=function(){this.scroll();this.click();this.keydown();}
EventListener.prototype.animate=function(direction,stepForward){this.transition.getDirection(direction,stepForward);}
EventListener.prototype.scroll=function(){var self=this;var wheel=new WheelEvent('wheel');$('body').on('wheel',function(event){(event.originalEvent.wheelDeltaY>0)?self.animate('up'):self.animate('down');});}
EventListener.prototype.click=function(){var self=this;$('ul.menu li').on('click',function(){var lastIndex=$('ul.menu li.active').index();var index=$(this).index();if(lastIndex==0&&index==2){var stepForward=1;self.animate('down',stepForward);$('ul.menu li').removeClass('active');$(this).addClass('active');return;}else if(lastIndex==2&&index==0){var stepForward=0;self.animate('up',stepForward);$('ul.menu li').removeClass('active');$(this).addClass('active');return;}
if(index>lastIndex){self.animate('down');}else if(index<lastIndex){self.animate('up');}else{return;}
$('ul.menu li').removeClass('active');$(this).addClass('active');})}
EventListener.prototype.keydown=function(){var self=this;$('body').on('keydown',function(e){if(e.keyCode==38){self.animate('up');}else if(e.keyCode==40){self.animate('down');}})}
var Static=function(){this.domElements={};this.init();}
Static.prototype.init=function(){console.log('Particles are homemade :) No library there.');this.domElementsFind();this.transition=new Transition();this.transition.onMove(this.changeMenuColor.bind(this));this.transition.onMove(this.changeSection.bind(this));this.eventListener=new EventListener();}
Static.prototype.domElementsFind=function(){this.windowWidth=$(window).width();this.windowHeight=$(window).height();this.domElements.wrapper=$('#wrapper');this.domElements.body=$('body');this.domElements.menuLi=$('ul.menu li');this.domElements.menuLiActive=$('ul.menu li.active');this.domElements.section=$('section');this.domElements.sectionHome=$('section#home');this.domElements.title=$('h1.title');this.domElements.sectionWork=$('section#work');this.domElements.sectionContact=$('section#contact');this.domElements.internship=$('p.internship');this.domElements.social=$('ul.social li');var self=this;$(document).ready(function(){self.styleAdd();})}
Static.prototype.styleAdd=function(){var self=this;setTimeout(function(){self.domElements.sectionHome.addClass('arrival');},1);}
Static.prototype.changeMenuColor=function(args){var index=args[0];this.domElements.menuLi.removeClass();if(index===0){this.domElements.menuLi.addClass('blue');}else if(index===1){this.domElements.menuLi.addClass('green');}else{this.domElements.menuLi.addClass('red');}}
Static.prototype.changeSection=function(args){this.domElements.section.removeClass('arrival');$('.section_'+(parseInt(args[0]+1))).addClass('arrival');this.domElements.menuLi.removeClass('active');$('ul.menu').find("[data-target='"+args[0]+"']").addClass('active');}
var App=function(){this.init();}
App.prototype.init=function(){this.static=new Static();this.canvas=new Canvas();}
var app=new App();