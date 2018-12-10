class Tree {
    constructor(x, y, img, w = 50, h = 50) {
      this.x = x;
      this.y = y;
      this.img = img
      this.w = this.img.width;
      this.h = this.img.height;
      this.fire = st
      this.onFire = false
      this.watered = false
    }
    move() {
      this.x += -.4
      this.y += random(-1, 1)
    }
    show() {
      image(this.img, this.x, this.y, this.w, this.h)
      if (this.onFire && !this.watered) {
        image(this.fire, this.x, this.y - this.h / 4, 30, 30)
      }
    }
  
    mouseIn(px, py) {
      return px > this.x - this.w / 2 &&
        px < this.x + this.w / 2 &&
        py > this.y - this.h / 2 &&
        py < this.y + this.h / 2
    }
  
    treeIn(other) {
      return !(other.x - other.w / 2 > this.x + this.w / 2 ||
        other.x + other.w / 2 < this.x - this.w / 2 ||
        other.y - other.h / 2 > this.y + this.h / 2 ||
        other.y + other.h / 2 < this.y - this.h / 2)
    }
  
    changeImage() {
      if (!this.watered) {
        this.onFire = true
      }
    }
  
    hover() {
      this.stroke = 10
    }
  
    noHover() {
      this.stroke = 4
    }
  }