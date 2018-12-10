class Enemy {
    constructor() {
      this.x = random(-width,width*2)
      this.y = random(-height,height*2)
      this.img = loadImage('https://i.imgur.com/j5fHktZ.png')
      this.fire = loadImage('https://i.imgur.com/rCqzbdQ.png')
      this.w = 80
      this.h = 50
      this.onFire = false
      this.speed = 1
      this.direction = 1
    }
  
    spawn(){
      if(this.x>width || 
        this.x<0 || 
        this.y >height||
        this.y<0){
          this.x = this.x
          this.y = this.y
          return true
        }
        else {
          this.x = random(-width,width*2)
          this.y = random(-height,height*2)
          return false
        }
    }

    show() {
        image(this.img,this.x, this.y,this.w,this.h)
        if (this.onFire) {
          image(this.fire, this.x+10, this.y - this.h / 4, 30, 30)
          image(this.fire, this.x-10, this.y - this.h / 4, 30, 30)
        }
    }
    
    moveTo(){
      if (this.x<fireman.x) {
          this.x = this.x + this.speed * this.direction
      }
      if (this.y<fireman.y){
          this.y = this.y + this.speed * this.direction
      }
      if (this.x>fireman.x) {
          this.x = this.x - this.speed * this.direction
      }
      if (this.y>fireman.y){
          this.y = this.y - this.speed * this.direction
      }
    }
    
    attack() {
        if (mic.getLevel()>.1){
          this.direction = -1
      }
        if (this.x>width +100 ||
         this.x< -100 ||
         this.y>height+50||
         this.y<-50) {
              this.direction = 1
      }
    }
    killF(other) {
      return !(other.x-other.w/2 > this.x +this.w/2 ||
               other.x+other.w/2 < this.x -this.w/2 ||
               other.y-other.h/2 > this.y +this.h/2 ||
               other.y+other.h/2 < this.y -this.h/2)
    }
    gameOver(other){
        if (this.killF(other)) {
          gameover.html("GAMEOVER")
        gameover.position(width/2-100,height/2+30)
        other.dead = true
      }
    }
  }