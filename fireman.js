class Fireman {
    constructor(x, y,spray, w = 50, h = 50) {
      this.x = x;
      this.y = y;
      this.img = loadImage('https://i.imgur.com/1g4LjX8.png')
      this.w = 50
      this.h = 100
      this.onFire = false
      this.speed = 100
      this.dead = false
    }
  
    show() {
        image(this.img,this.x, this.y,this.w,this.h)
    }
    moveRight(){
        this.x = this.x + this.speed
    }
    moveLeft(){
        this.x = this.x - this.speed
    }
    moveUp(){
      this.y = this.y - this.speed
    }
    moveDown(){
        this.y = this.y + this.speed
    }
    
    sprayWater(){
      for (var i =0;i<20;i++){
        var rx = random(-5,5)
        var ry = random(-5,5)
        fill(0,100,200,10)
        noStroke()
            var w = ellipse(this.x+rx,this.y+ry-10,50,50)
        spray.push(w)
      }
    }
  }