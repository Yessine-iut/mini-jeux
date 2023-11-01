/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
class Grille {
  tabCookies = [];

  constructor(l, c, canvasLargeur, canvasHauteur, assetsLoaded,nbDeCookiesDifferents) {
    this.nbLignes = l;
    this.nbColonnes = c;
    this.canvasLargeur = canvasLargeur;
    this.canvasHauteur = canvasHauteur;
    this.cookiesCliquees = [];
    this.largeurColonnes = canvasLargeur / c;
    this.hauteurLignes = canvasHauteur / l;
    this.assets = assetsLoaded;

    // on passe en paramètre le nombre de cookies différents. 4 = facile, 5 = moyen,
    // 6 = difficile
    this.remplirTableauDeCookies(nbDeCookiesDifferents); // valeurs possible : 4, 5, 6 par ex
  }

  drawGrille(ctx) {
    ctx.save();
    // todo : dessiner une grille
    // on est en mode "path"
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "lightgrey";

    // lignes verticales de la grille
    for (
      let x = this.largeurColonnes;
      x < this.canvasLargeur;
      x += this.largeurColonnes
    ) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvasHauteur);
    }

    // lignes verticales de la grille
    for (
      let y = this.hauteurLignes;
      y < this.canvasHauteur;
      y += this.hauteurLignes
    ) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvasLargeur, y);
    }

    ctx.stroke();

    ctx.restore();
  }
  /**
   * parcours la liste des divs de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies(ctx) {
    ctx.save();
    let y = 0;
    for (let l = 0; l < this.nbLignes; l++) {
      let x = 7;
      for (let c = 0; c < this.nbColonnes; c++) {
        let cookie = this.tabCookies[l][c];

        cookie.draw(ctx, x, y);
        x += this.largeurColonnes;
      }
      y += this.hauteurLignes;
    }
     
    ctx.restore();
  }
//Obtenir un cookie
  getCookie(x, y) {
    let c = Math.floor(x/( 0.8*this.largeurColonnes));
    let l = Math.floor(y/ (0.8*this.hauteurLignes));

    return this.tabCookies[l][c];
  }

//Disparaitre les cookies match-3
  detecterMatch3Lignes() {
    for (let l = 0; l < this.nbLignes; l++) {
      for (let c = 0; c < this.nbColonnes; c++) {
        if (c + 2 < this.nbColonnes) {
          if (this.tabCookies[l][c].type == this.tabCookies[l][c + 1].type && this.tabCookies[l][c + 1].type == this.tabCookies[l][c + 2].type) {
            this.tabCookies[l][c].marque = 1;
            this.tabCookies[l][c + 1].marque = 1;
            this.tabCookies[l][c + 2].marque = 1;
            this.tabCookies[l][c].etat= "disparaitre";
            this.tabCookies[l][c + 1].etat = "disparaitre";
            this.tabCookies[l][c + 2].etat = "disparaitre";

          }
        }
      }
    }
  }
//Disparaitre les cookies match-3
  detecterMatch3Colonnes() {
    for (let c = 0; c < this.nbColonnes; c++) {
      for (let l = 0; l < this.nbLignes; l++) {
        if (l + 2 < this.nbLignes) {
          if (this.tabCookies[l][c].type == this.tabCookies[l + 1][c].type && this.tabCookies[l + 1][c].type == this.tabCookies[l + 2][c].type) {
            this.tabCookies[l][c].marque = 1;
            this.tabCookies[l + 1][c].marque = 1;
            this.tabCookies[l + 2][c].marque = 1;
            this.tabCookies[l][c].etat= "disparaitre";
            this.tabCookies[l + 1][c].etat = "disparaitre";
            this.tabCookies[l + 2][c].etat="disparaitre";

        
          }
        }
      }
    }
  }
  //Savoir si y a toujours des cookies à casser
  detecterBoucle(){
    for (let c = 0; c < this.nbColonnes; c++) {
      for (let l = 0; l < this.nbLignes; l++) {
        if(this.tabCookies[l][c].marque==1){
return true;
        }
  }
}}

  detecterAlignement() {
    this.detecterMatch3Lignes();
    this.detecterMatch3Colonnes();

  }
    //Savoir si y a un match-3 en colonne
  detecterMatchColonnes() {
    for (let c = 0; c < this.nbColonnes; c++) {
      for (let l = 0; l < this.nbLignes; l++) {
        if (l + 2 < this.nbLignes) {
          if (this.tabCookies[l][c].type == this.tabCookies[l + 1][c].type && this.tabCookies[l + 1][c].type == this.tabCookies[l + 2][c].type) {
           return true;
          }
        }
      }
    }
  }
  //Savoir si y a un match-3 en ligne
  detecterMatchLignes() {
    for (let l = 0; l < this.nbLignes; l++) {
      for (let c = 0; c < this.nbColonnes; c++) {
        if (c + 2 < this.nbColonnes) {
          if (this.tabCookies[l][c].type == this.tabCookies[l][c + 1].type && this.tabCookies[l][c + 1].type == this.tabCookies[l][c + 2].type) {
              return true;
          }
        }
      }
    }
  }
//Faire la chute
  chute_de_cookie() {
    for (let c = this.nbLignes - 1; c >= 0; c--) {
      for (let l = this.nbColonnes - 1; l > 0; l--) {
        if (this.tabCookies[l][c].marque === 1) {
        if(!(this.tabCookies[l-1][c].marque==1)){
          this.tabCookies[l][c].etat="chute";
        }
          let tmpCookieType = this.tabCookies[l][c].type;
          let tmpCookieImage = this.tabCookies[l][c].image;
          let tmpCookieMarque = this.tabCookies[l][c].marque;

          this.tabCookies[l][c].type = this.tabCookies[l - 1][c].type;
          this.tabCookies[l][c].marque = this.tabCookies[l - 1][c].marque;
          this.tabCookies[l][c].image = this.tabCookies[l - 1][c].image;
          this.tabCookies[l][c].currentY = this.tabCookies[l - 1][c].currentY;

          this.tabCookies[l - 1][c].type = tmpCookieType;
          this.tabCookies[l - 1][c].marque = tmpCookieMarque;
          this.tabCookies[l - 1][c].image = tmpCookieImage;
        }
      }
    }
  }
//Mettre à jour le score
 updateScore(){
  for (let l = 0; l < this.nbLignes; l++) {
    for (let c = 0; c < this.nbColonnes; c++) {
      if (this.tabCookies[l][c].marque === 1) {
        let addition=10+this.tabCookies[l][c].type*10;

        document.getElementById("scoreFinal").innerHTML=parseInt(document.getElementById("scoreFinal").innerHTML)+addition;
        document.getElementById("score").innerHTML="Score : "+parseInt(document.getElementById("scoreFinal").innerHTML);
       

      
      }
    }
  }
 
 }
 //Création des nouveaux cookies pour commencer un tab sans match-3 (hors chute)
 nouveau_cookie2() {
  for (let l = 0; l < this.nbLignes; l++) {
    for (let c = 0; c < this.nbColonnes; c++) {
      if (this.tabCookies[l][c].marque === 1 && l==0) {
    this.nouveauC(l,c);      

        if(l==0){
          this.tabCookies[l][c].etat="nouveau";
                }
        

        

      }
    }
  }
}
//Création d'un nouveau cookie après une chute
  nouveau_cookie(y) {
    for (let l = 0; l < this.nbLignes; l++) {
      for (let c = 0; c < this.nbColonnes; c++) {
       
        if (this.tabCookies[l][c].marque === 1) {
      
      this.nouveauC(l,c);       
        
          
          if(y==1 && l==0){
            this.tabCookies[l][c].etat="nouveau";

          }

        }
      
    }
  }
}
//Création d'un nouveau cookie
  nouveauC(l,c){
    let type = Math.floor(Math.random() * 6); // retourne un random entre 0 et 5
       let cookie;
          switch (type) {
            case 0:
              cookie = new Cookie(type, l, c, this.assets.croissant);
              break;
            case 1:
              cookie = new Cookie(type, l, c, this.assets.cupcake);
              break;
            case 2:
              cookie = new Cookie(type, l, c, this.assets.danish);
              break;
            case 3:
              cookie = new Cookie(type, l, c, this.assets.donut);
              break;
            case 4:
              cookie = new Cookie(type, l, c, this.assets.macaroon);
              break;
            case 5:
              cookie = new Cookie(type, l, c, this.assets.sugarCookie);
              break;
          }
          this.tabCookies[l][c] = cookie;
  }
//Initialiser le jeu sans match-3
   commencerTabSansCasser(){
    for (let l = 0; l < this.nbLignes; l++) {
      for (let c = 0; c < this.nbColonnes; c++) {
        if(this.tabCookies[l][c].etat=="disparaitre"){
          this.tabCookies[l][c].etat="chute";
        }
      }}

   }
   //Remplir le tableau de cookies
  remplirTableauDeCookies(nbDeCookiesDifferents) {
    this.tabCookies = create2DArray(this.nbLignes);

    for (let l = 0; l < this.nbLignes; l++) {
      for (let c = 0; c < this.nbColonnes; c++) {
       this.nouveauC(l,c);
      }
    }
    while(this.detecterMatchLignes()||this.detecterMatchColonnes()  ){
      this.detecterAlignement();
      this.chute_de_cookie();
      this.nouveau_cookie(1);
      this.commencerTabSansCasser();
    }
  }
}
