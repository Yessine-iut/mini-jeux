class Quete{

    constructor(id,difficulte,txt) {
      this.id=id; 
     
      this.etat="en cours";
      this.widthAtteint = 0;
      let elem=document.getElementById(id);
      elem.style.width="0px";
this.txt=txt;
    switch (id) {
      case "progressbarbefore":
        this.initType1(difficulte);

        break;
      case "progressbar2before":
        this.initType2(difficulte);

        break;
      case "progressbar3before":
        this.initType3(difficulte);
         break;
    }
      
          
 }

//Initialiser une quête de type 1
 initType1(difficulte){

  
  if (difficulte == 0) {
    this.objectif = 9;
    this.type = 3;
    document.getElementById("txt").innerHTML = "Explode 9 Donuts";
  } else if (difficulte == 1) {
    this.objectif = 12;
    this.type = 3;
    document.getElementById("txt").innerHTML = "Explode 12 Donuts";
  } else {
    this.objectif = 15;
    this.type = 5;
    document.getElementById("txt").innerHTML = "Explode 15 Stars";
  }
 }
//Initialiser une quête de type 2
 initType2(difficulte){
  if(difficulte==0){
    this.objectif=3;
    this.ligne=8;

    document.getElementById("txt2").innerHTML="Explode 3 Cookies in line 9";

  }else if(difficulte==1){
    this.objectif=9;
    this.ligne=4;
    document.getElementById("txt2").innerHTML="Explode 9 Cookies in line 5";

  }else{
    this.objectif=12;
    this.ligne=0;
    document.getElementById("txt2").innerHTML="Explode 9 Cookies in line 1";

  }
 }
//Initialiser une quête de type 3
 initType3(difficulte){
  if(difficulte==0){
    this.objectif=1;
    this.type=5;
    this.ligne=8;
    document.getElementById(this.txt).innerHTML="Explode 1 Star in line 9";

  }else if(difficulte==1){
    this.objectif=2;
    this.type=3;
    this.ligne=5;
    document.getElementById(this.txt).innerHTML="Explode 3 Donuts in line 6";

  }else{
    this.objectif=3;
    this.type=0;
    this.ligne=0;
    document.getElementById(this.txt).innerHTML="Explode 3 Croissants in line 1";

  }
    
 }
 //Mettre à jour la quête
 update(grille) {

  let elem = document.getElementById(this.id);
    let nb = parseInt(elem.style.width.substr(0, elem.style.width.length - 2));
      for (let l = 0; l < grille.nbLignes; l++) {
        for (let c = 0; c < grille.nbColonnes; c++) {
          if(grille.tabCookies[l][c].etat=="disparaitre" 
          ){
            if(this.id=="progressbar2before" && l == this.ligne){
              elem.style.width = nb + "px";
              nb = nb + 600 / this.objectif;

            }else if(this.id=="progressbarbefore" && grille.tabCookies[l][c].type == this.type){
              elem.style.width = nb + "px";
              nb = nb + 600 / this.objectif;

            }
            else if(this.id=="progressbar3before" && grille.tabCookies[l][c].type == this.type  && l == this.ligne){
              elem.style.width = nb + "px";
              nb = nb + 600 / this.objectif;

            }


            if(nb<=600 && nb>= 598 && this.id=="progressbar2before"){
              nb=600;

            }
            elem.style.width = nb + "px";
          }
         
            
          }
        }

    if (this.etat != "completed") {
      if (nb >= 600) {
        elem.style.borderRadius = "0em";
        this.etat = "completed";
        document.getElementById(this.txt).innerHTML = "Completed +100pts";
        document.getElementById("scoreFinal").innerHTML =
          parseInt(document.getElementById("scoreFinal").innerHTML) + 100;
        document.getElementById("score").innerHTML =
          "Score : " +
          parseInt(document.getElementById("scoreFinal").innerHTML);
        document.getElementById("scoreFinal2").innerHTML =
          "Your score : " +
          parseInt(document.getElementById("scoreFinal").innerHTML);
      }
    }

  }

  
  
  
  }
  