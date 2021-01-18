//global variables
var trees = []
var treeTypes = []
var spray = []
var flaming = false
var fireAlarm
var fireman
var enemies = []
var mic
var gameover
var points
var total = 0
var flamingBears = 0

//Getting those imagez loaded bitch
function preload() {
  seq = loadImage('https://i.imgur.com/XuIG6mO.png')
  rw = loadImage('https://i.imgur.com/tqiQuKe.png')
  mc = loadImage('https://i.imgur.com/X1PHJex.png')
  st = loadImage('https://i.imgur.com/rCqzbdQ.png')
}

//Chrome Security requires a mouse click before audio
function mouseClicked(){
   if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

//SETUP
function setup() {
  //Create Canvas and settings
  createCanvas(1200, 600);
  imageMode(CENTER)
  fireAlarm = createElement("h1", "")
  gameover = createElement("h1", "")
  points = createElement("h1", "Trees Saved: ")

  resetGame = select('#reset')
  resetGame.position(width/2,50)
  resetGame.mouseClicked(resetthegame)

  instructions = select('#instructions')
  instructions.position(1200,60)

  
  //Create initial trees
  treeTypes = [seq, rw, mc]
  for (var i = 0; i < 200; i++) {
    let x = random(width)
    let y = random(height)
    let img = random(treeTypes)
    tree = new Tree(x, y, img);
    trees.push(tree)
  }
  
  //Create fireman
  fireman = new Fireman(width/2,height/2)
  
  //Create initial enemies
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

//MAIN LOOP
function draw() {
  cursor('https://i.imgur.com/ohGs6Ew.png', 30, 2)
  background(220);
  
  //Shits on fire movement
  fireAlarm.position(width/2-50 + random(-1, 1), 680)
  
  //Trees
  for (var i = 0; i < trees.length - 1; i++) {
    trees[i].show()
    trees[i].move()
    
    //Set on fire if mouse intersects
    if (trees[i].mouseIn(mouseX, mouseY)) {
      trees[i].changeImage()
    }
 
    //Set on fire if flaming bear intersects
    for(var e of enemies){
      if(trees[i].treeIn(e)&&e.onFire){
        trees[i].changeImage()
      }
    }
    
    //Check and change to flaming if intersecting with flaming tree
    changeFlame()
    spreadFire(trees[i])
    
    //after trees exit canvas create new ones on the other side
    if (trees[i].x < 0 - trees[i].img.width) {
      circleBack(trees[i])
    }
    
    if (trees[i].onFire){
    	if (trees[i].treeIn(fireman)&&!fireman.dead) {
      	trees[i].watered=true
      	total += 1
    		points.html("Trees Saved: " + total)
        trees[i].onFire = false
    	}
    }
  }
  //END OF TREES INFO
  
  //FIREMAN display and water
  fireman.sprayWater()
  fireman.show()
  if (spray.length > 20) {
    spray.splice(0,1)
    }
    
  //Fireman controls
  if (keyIsDown(RIGHT_ARROW)&&fireman.x<width-fireman.w/2) {
    fireman.moveRight()
  }
  if (keyIsDown(LEFT_ARROW)&&fireman.x>0+fireman.w/2) {
    fireman.moveLeft()
  }
  if (keyIsDown(UP_ARROW)&&fireman.y>0+fireman.h/2) {
    fireman.moveUp()
  }
  if (keyIsDown(DOWN_ARROW)&&fireman.y<height-fireman.h/2) {
    fireman.moveDown()
  }
  
  //FINAL BOSS SPAWNS
  if (total == 20 && flamingBears == 0){
    spawnFbear()
    flamingBears = 1
  }
  if (total == 40 && flamingBears == 1){
    spawnFbear()
    flamingBears = 2
  }
  if (total == 50 && flamingBears == 2){
    spawnFbear()
    flamingBears = 3
  }

  //Enemy display and move toward firemant
  for (var enemy of enemies){
  	enemy.show()
    enemy.attack()
    enemy.moveTo()
    enemy.gameOver(fireman)
  }
  
}
//END OF MAIN LOOP

function circleBack(tree) {
  // creates new tree on the right when one exits on the left
  tree.img = random(treeTypes)
  tree.w = tree.img.width
  tree.h = tree.img.height
  tree.onFire = false
  tree.x = width + tree.w/2
  tree.y = random(height)
  tree.watered = false
}

function flames() {
  // shows the html element beneath the game
  fireAlarm.html("Shits on Fire!")
  flaming = true
}

function spreadFire(tree) {
  // makes the fire spread
  for (var j = 0; j < trees.length - 1; j++) {
    if (tree != trees[j] &&
      tree.onFire &&
      (tree.treeIn(trees[j]))) {
        trees[j].changeImage()
    }
  }
}

function checkFlames() {
  //checks if any trees are on fire, if so it returns true
  flameCount = 0
	for (var i = 0; i < trees.length - 1; i++)
    if (trees[i].onFire && !trees[i].watered) {
      flameCount = 1
    }
  return flameCount == 1
}

function changeFlame() {
  // controls the html fire alarm text
	if (checkFlames()) {
      flames()
    } else {
    	fireAlarm.html("")
    	flaming = false
    }
}

function spawnFbear(){
  e = new Enemy()
  while(e.spawn()==false){
    e.spawn()
  }
  e.speed = 3
  e.onFire = true
  enemies.push(e)
}

//RESET THE GAME!!!!
function resetthegame(){
  //reset fire on trees
  for (let tree of trees) {
    tree.onFire = false
  }

  //reset enemies
  enemies = []
  flamingBears = 0
  for (var j = 0; j < 8; j++) {
    e = new Enemy()
    while(e.spawn()==false){
      e.spawn()
    }
    enemies[j] = e
  }

  //reset point count
  total = 0
  points.html("Trees Saved: " + total)

  //reset fireman
  fireman
  fireman.x=width/2
  fireman.y=height/2
  fireman.dead = false

  gameover.html("")
}
