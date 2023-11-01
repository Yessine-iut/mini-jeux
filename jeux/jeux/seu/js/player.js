//vaisseau du joueur
class Player {
    constructor(x, y) {
        this.tailletriangle = 15; //hitbox
        this.width = 60;
        this.height = 60;
        this.image = new Image();
        this.image.src = 'assets/images/spaceship2 seu.png';
        this.laserstyle = "#FFFFFF";
        this.xleft = x - this.tailletriangle;
        this.xright = x + this.tailletriangle;
        this.xcenter = x;
        this.yleft = y;
        this.yright = y;
        this.ycenter = y - this.tailletriangle * 2;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.xleft, this.yleft, this.width, this.height);
    }

    updatepos(velx, vely) {
        this.xleft += velx;
        this.xright += velx;
        this.xcenter += velx;
        this.yleft += vely;
        this.yright += vely;
        this.ycenter += vely;
    }

    move(cwidth, cheight){
        if (this.xleft >= cwidth -20 ||
            this.xright >= cwidth  + this.tailletriangle * 2 -20||
            this.xcenter >= cwidth  + this.tailletriangle-20) {
           this.moveright(cwidth);
         } if (this.xleft <= -5 ||
            this.xright <= this.tailletriangle * 2-5 ||
            this.xcenter <= this.tailletriangle-5) {
           this.moveleft();
         }
         if (this.yleft >= cheight -20 ||
            this.yright >= cheight  + this.tailletriangle * 2-20 ||
            this.ycenter >= cheight + this.tailletriangle-20) {
          this.movebottom(cheight);
        } if (this.yleft <= -5 ||
            this.yright <= this.tailletriangle * 2-5 ||
            this.ycenter <= this.tailletriangle-5) {
         this.movetop();
       }
    }

    moveright(cwidth) {
        this.xleft = Math.min(cwidth -20, this.xleft);
      
        this.xright = Math.min(cwidth + this.tailletriangle * 2-20, this.xright);
      
        this.xcenter = Math.min(cwidth  + this.tailletriangle-20, this.xcenter);
      
      }
    moveleft() {
      
        this.xleft = Math.max(-5, this.xleft);
      
        this.xright = Math.max(this.tailletriangle * 2-5, this.xright);
      
        this.xcenter = Math.max(this.tailletriangle-5, this.xcenter);
      }
      
    movebottom(cheight) {
      
        this.yleft = Math.min(cheight -20, this.yleft);
      
        this.yright = Math.min(cheight + this.tailletriangle * 2-20, this.yright);
      
        this.ycenter = Math.min(cheight + this.tailletriangle-20, this.ycenter);
      
      }
     movetop() {
      
        this.yleft = Math.max(-5, this.yleft);
      
        this.yright = Math.max(this.tailletriangle * 2-5, this.yright);
      
        this.ycenter = Math.max(this.tailletriangle-5, this.ycenter);
      }

}