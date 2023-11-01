//vie du joueur
class Heart {
    constructor(x,y) {
        
      this.width = 25;
      this.height = 25;
      this.image = new Image();
      this.image.src = 'assets/images/heart seu.png';
      this.x = x;
      this.y = y;
    }
  
      draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }

    }