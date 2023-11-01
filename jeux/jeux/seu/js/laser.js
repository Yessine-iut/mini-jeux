//projectiles du joueur ou de l'ennemi
class Laser{
constructor(x,y, sens,style) {
    this.sens = sens;
    this.x = x;
    this.y = y;
    this.style = style;
  }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, 10);
        ctx.fillStyle = this.style;
        ctx.fill();
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
    }

    updatepos(vitesse){
        this.y -=vitesse*this.sens;
    }

  }