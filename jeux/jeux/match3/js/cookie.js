class Cookie {
  constructor(type, ligne, colonne, image) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;

    this.image = image; // pour canvas
    this.width = 75;
    this.height = 75;
    this.etat="chute";
    this.currentY = 0;
    this.currentX = 0;
    this.zoomFactor = 0; // 1 = taille normale, 0.5 = 2 fois plus petit
    this.dureeTotaleExplosion = 20; // en "frames" 50 * 1/60ème de seconde = 50 * 16,6 ms
    this.nbFramesEcouleesPendantExplosion = 0;
    this.marque = 0;
    this.zoomFactor2= 1;
  }


    draw(ctx, x, y) {
      ctx.save();
      switch (this.etat) {
        case "normal":
          ctx.drawImage(this.image, x, y, this.width, this.height);
          this.currentX=x;

          break;
        case "chute":
          ctx.drawImage(this.image, x, this.currentY, this.width, this.height);
          this.currentX=x;
          if (this.currentY < y) {
            this.currentY += 5;
          } else {
            this.etat = "normal";
          }
          break;
          
          case "disparaitre" :
            ctx.translate(x, y);
  
            // pour recentrer on va décaler le repère d'une demi largeur et hauteur du rectangle
            // on va le retailler 
            // et on va ensuite appliquer la translatin inverse d'une demi largeur et hauteur
            ctx.translate(this.width/2, this.height/2);
            ctx.scale(this.zoomFactor2, this.zoomFactor2);
            ctx.translate(-this.width/2, -this.height/2);
  
            // zoom arrière
            if(!(this.zoomFactor2 < 0.01)) {
              ctx.drawImage(this.image, 0, 0, this.width, this.height);
              this.zoomFactor2 -= 0.08;
            } else {
              
            }
            break;
            case "switch" :
              ctx.drawImage(this.image, this.currentX, this.currentY, this.width, this.height);
              if (this.currentX < x) {
                this.currentX += 5;
              }
              else if(this.currentX>x){
                this.currentX -= 5;
                if(this.currentX <x){
                  this.currentX=x;
                }
              }
              if (this.currentY < y) {
                this.currentY += 5;
              }  else if(this.currentY>y){
                this.currentY -= 5;
                if(this.currentY <y){
                  this.currentY=y;
                }
              }
             
              
              break;
             case "nouveau" :
              ctx.translate(x, y);

              // pour recentrer on va décaler le repère d'une demi largeur et hauteur du rectangle
              // on va le retailler 
              // et on va ensuite appliquer la translatin inverse d'une demi largeur et hauteur
              ctx.translate(this.width/2, this.height/2);
              
              if(this.zoomFactor>1){
                ctx.scale(1, 1);

              }
              else
              ctx.scale(this.zoomFactor, this.zoomFactor);
              ctx.translate(-this.width/2, -this.height/2);
              if(!(this.zoomFactor > 1)) {
                ctx.drawImage(this.image, 0, 0, this.width, this.height);
                this.zoomFactor += 0.05;
              } else {
                this.etat = "normal";

                this.zoomFactor = 0;

              }
             
              break;
             
              
      }
  
      ctx.restore();
    }
  

  dragAndDraw(ctx, x, y) {
    ctx.save();
    ctx.drawImage(this.image, x/0.8, y/0.8, this.width, this.height);
    ctx.restore();
  }

  
  static distance(cookie1, cookie2) {
    let l1 = cookie1.ligne;
    let c1 = cookie1.colonne;
    let l2 = cookie2.ligne;
    let c2 = cookie2.colonne;

    const distance = Math.sqrt((c2 - c1) * (c2 - c1) + (l2 - l1) * (l2 - l1));
    return distance;
  }

  supprimer() {
    this.etat = "exploser";
  }
}
