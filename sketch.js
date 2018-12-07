//global variables
var bubbles = []
var trees = []
var spray = []
var flaming = false
var fireAlarm
var fireman
var enemies = []
var mic
var gameover
var points
var total = 0

//Getting those imagez loaded bitch
function preload() {
  seq = loadImage('https://i.imgur.com/XuIG6mO.png')
  rw = loadImage('https://i.imgur.com/tqiQuKe.png')
  mc = loadImage('https://i.imgur.com/X1PHJex.png')
  st = loadImage('https://i.imgur.com/rCqzbdQ.png')
}

function setup() {
  //Create Canvas and settings
  createCanvas(1200, 600);
  imageMode(CENTER)
  fireAlarm = createElement("h1", "")
  gameover = createElement("h1", "")
  points = createElement("h1", "Trees Saved: ")
  
  //Create initial trees
  trees = [seq, rw, mc]
  for (var i = 0; i < 200; i++) {
    let x = random(width)
    let y = random(height)
    let img = random(trees)
    b = new Bubble(x, y, img, trees);
    bubbles.push(b)
  }
  
  //Create fireman
  fireman = new Fireman(width/2,height/2)
  
  //Create enemies
  for (var j = 0; j < 8; j++) {
    e = new Enemy()
    while(e.spawn()==false){
      e.spawn()
    }
    enemies[j] = e
  }
  
  //Audio input
  mic = new p5.AudioIn()
  mic.start()
}

function draw() {
  cursor('https://i.imgur.com/ohGs6Ew.png', 30, 2)
  background(220);
  
  //Shits on fire movement
  fireAlarm.position(width/2-50 + random(-1, 1), 680)
  
  //Trees
  for (var i = 0; i < bubbles.length - 1; i++) {
    bubbles[i].show()
    bubbles[i].move()
    
    //Set on fire if mouse intersects
    if (bubbles[i].mouseIn(mouseX, mouseY)) {
      bubbles[i].changeImage()
    }
    
    //Check and change to flaming if intersecting with flaming tree
    changeFlame()
    spreadFire(bubbles[i])
    
    //after trees exit canvas create new ones on the other side
    if (bubbles[i].x < 0 - bubbles[i].img.width) {
      circleBack(bubbles[i])
    }
    
    if (bubbles[i].onFire){
    	if (bubbles[i].bubbleIn(fireman)&&!fireman.dead) {
      	bubbles[i].watered=true
      	total += 1
      	actualPoints = floor(total)
    		points.html("Trees Saved: " + actualPoints)
        bubbles[i].onFire = false
    	}
    }
  }
  
  //FIREMAN display and water
  fireman.sprayWater()
  fireman.show()
  if (spray.length > 20) {
    spray.splice(0,1)
    }
  
  //Enemy display and move toward firemant
  for (var enemy of enemies){
  	enemy.show()
    enemy.attack()
    enemy.moveTo()
    enemy.gameOver(fireman)
  }
  
}

function keyPressed() {
  //Clear all fire
  if (keyCode === SHIFT) {
    for (let bubble of bubbles) {
      bubble.onFire = false
    }
  }
  //Fireman controls
  if (keyCode === RIGHT_ARROW) {
      fireman.moveRight()
    }
  if (keyCode === LEFT_ARROW) {
      fireman.moveLeft()
    }
  if (keyCode === UP_ARROW) {
      fireman.moveUp()
    }
  if (keyCode === DOWN_ARROW) {
      fireman.moveDown()
    }
}


function circleBack(b) {
  b.img = random(trees)
  b.w = b.img.width
  b.h = b.img.height
  b.onFire = false
  b.x = width + b.w/2
  b.y = random(height)
  b.watered = false
}

function flames() {
  fireAlarm.html("Shits on Fire!")
  flaming = true
}

function spreadFire(b) {
  for (var j = 0; j < bubbles.length - 1; j++) {
    if (b != bubbles[j] &&
      b.onFire &&
      (b.bubbleIn(bubbles[j]))) {
      bubbles[j].changeImage()
    }
  }
}

function checkFlames() {
  flameCount = 0
	for (var i = 0; i < bubbles.length - 1; i++)
    if (bubbles[i].onFire && !bubbles[i].watered) {
      flameCount = 1
    }
  return flameCount == 1
}

function changeFlame() {
	if (checkFlames()) {
      flames()
    } else {
    	fireAlarm.html("")
    	flaming = false
    }
}