window.onload = init;
var canvas, ctx;
var tailleVeggie = 3;
var largeurSegment = 10;
var maxTailleVeggie=75;
var enemy;
var apple;
var champignon;
var isPlaying = false;
var score=0;
var muted= false;
var nomutilisateur;
var facile=true;
var x = Array.apply(null, Array(tailleVeggie)).map(Number.prototype.valueOf,0);
var y = Array.apply(null, Array(tailleVeggie)).map(Number.prototype.valueOf,0);
var mousePos;

function init() {
  //on crée le bouton pour mute et le canvas
  creerBoutonParamSon();
  creerCanvas();
  console.log("est ce que jeu lancé en mode difficile? --> "+ localStorage['isSnakeDifficile']);

  nomutilisateur = localStorage['userPseudo'];
  if (typeof nomutilisateur === 'undefined')
    nomutilisateur = "invité";
  //màj info dans bordure 
  document.getElementById("pseudo").innerHTML += nomutilisateur;
  //info du canvas
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');
  canvas.addEventListener('mousemove', function (evt) {
  mousePos = getMousePos(canvas, evt);
  }, false);
  //crée une référence des objets enemies et nourriture
  enemy = new faucontre();
  apple = new pomme();
  champignon = new champi();
  //si on appuie sur la touche p --> jeu en pause
  window.addEventListener('keydown', pause, true);

  if(localStorage['isSnakeDifficile'] == "true"){
   document.getElementById("difficulté").innerHTML += "difficile";
   facile=false;
   enemy2 = new faucontre();
   enemy3 = new faucontre();
   setInterval(updateFaucontre,3000);
   requestAnimationFrame(animateDifficile);
  }else{
      document.getElementById("difficulté").innerHTML += "facile";
      setInterval(updateFaucontre,5000);
      requestAnimationFrame(animate);
  }
}

function pause(e){
   var key = e.keyCode;
   if (key === 80){ //touche p
      if(document.getElementById("toucheP")!=null){
         //supprime le paragraphe
         document.getElementById("toucheP").remove();
      }
      if (isPlaying == true){
         isPlaying = false;
         console.log("jeu en pause");
         //affiche "pause" dans la bordure où il y a le score
         document.getElementById("score").innerHTML = "Score: "+ score + "&emsp;&emsp;&emsp;pause";
      }
      else{
         isPlaying = true;
         console.log("jeu repris");
         //on reprend l'animation (suivant le mode de jeu)
         if(facile==true){
            requestAnimationFrame(animate);
         }else{
            requestAnimationFrame(animateDifficile);
         }
         //on retire le mot "pause" de la bordure
         document.getElementById("score").innerHTML = "Score: "+ score;
      } 
   }
}

function getMousePos(canvas, evt) {
   var rect = canvas.getBoundingClientRect();
   return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top-20
   };
}

//animation difficulté facile
function animate() {
   if(isPlaying){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if(mousePos !== undefined) {
         drawSnake(mousePos.x, mousePos.y);
      }
      requestAnimationFrame(animate);
      if(mousePos!=undefined && mousePos != null){
         //on vérifie si le snake ne s'est pas tapé à lui même ou au mur
         checkKnockout();
         checkCollisionTail();
      }
      //affichage (dessin) des références des objets enemies et nourriture
      enemy.draw();
      apple.draw();
      if(champignon !=null)
         champignon.draw();  
   }
}

//animation si mode difficile
function animateDifficile() {
   if(isPlaying){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if(mousePos !== undefined) 
         drawSnake(mousePos.x, mousePos.y);
      requestAnimationFrame(animateDifficile);
      if(mousePos!=undefined && mousePos != null){
         //on vérifie si le snake ne s'est pas tapé à lui même ou au mur
         checkKnockout();
         checkCollisionTail();
      }
      //affichage (dessin) des références des objets enemies et nourriture
      enemy.draw();
      enemy2.draw();
      enemy3.draw();
      apple.draw();
      if(champignon !=null)
         champignon.draw();
   }
}

function updateFaucontre(){
   //nouveau faucon toutes les 5 secondes
   if(isPlaying){
      enemy.newFaucontre();
      if(localStorage['isSnakeDifficile'] == "true"){
         enemy2.newFaucontre();
         enemy3.newFaucontre();
         //si un faucon est apparu sur un autre, on regénère les faucons
         if(checkSamePos(enemy.x,enemy.y,enemy2.x,enemy2.y)||(enemy.x,enemy.y,enemy3.x,enemy3.y)||(enemy2.x,enemy2.y,enemy3.x,enemy3.y)){
            enemy.newFaucontre();
            enemy2.newFaucontre();
            enemy3.newFaucontre();
         }
      }
   }
}

//en mode facile, 2 champignons d'invincibilité spawn
//en mode difficile seulement 1 apparaît
//le champignon doit disparaitre une fois mangé!
var champNum=0;
function removeChampignon(){
   champNum++;
   if(champNum==1 && facile==true)
      champignon.newChampi();
   else champignon=null;
}
//quand les 5secondes du couldown d'invincibilité du champignon sont écoulées
function removeInvincibility(){
   invincibility= false;
}

//si le snake touche le mur
function checkCollisionWall(x,y){
   if (x > (canvas.width-30) || x<30) {
      return true;
   }
   if (y > (canvas.height -20) || y < 30) {
       return true;
   }
}

//si un champignon, une pomme ou un faucon appraît à moitié dans le mur, on renvoit true
function checkBadSpawn(x,y){
   if (x > (canvas.width-40) || x<40 || y > (canvas.height -40 ) || y < 40) 
      return true;
}

//si un champignon, une pomme ou un faucon sont les uns sur les autres en renvoit true
function checkSamePos(x1,y1,x2,y2){
   if(Math.abs(Math.floor(x1-x2))<=20 && Math.abs(Math.floor(y1-y2))<=20)
      return true;
}

//si le snake a touché un objet (champi, pomme ou faucon...)
function checkEat(x1,y1,x2,y2){
   if(x2<x1)
      x1-=20;
   if(y2<y1)
      y1-=20;
   return checkSamePos(x1,y1,x2,y2);
}

//pour savoir si le jeu peut faire du bruit ou si le joueur a désactivé le son
function checkmuted() {
   if (localStorage["son"] == "sonore") {
     muted = false;
   }
   else muted = true;
   return muted;
 }

//Veggie devient plus grand
/* IMPORTANT
   la condition de victoire est là: on veut une taille de veggie
   égale à conditionwin pour "gagner"
*/
function grandir(){
   let conditionwin=52;
   scorer();
   if(localStorage['isSnakeDifficile'] == "true"){
      conditionwin=72;
   }
   if(tailleVeggie<conditionwin){
      x[tailleVeggie]=x[tailleVeggie-1];
      y[tailleVeggie]=y[tailleVeggie-1];
      tailleVeggie++;
   } else{
      showEnd(true);
   }
}
 //incrémenter le score
 function scorer(){
    if(localStorage['isSnakeDifficile'] == "true")
       score+=12
    else
      score+=10;
   document.getElementById("score").innerHTML = "Score: "+ score;
}


/*afficher la popup de fin*/
function showEnd(isWin){
   isPlaying=false;
   window.removeEventListener("keydown", pause, true);
   var modal = document.getElementById("end");
   var close = document.getElementsByClassName("close")[0];
   var scoreModal = document.getElementById("scoreModal");
   scoreModal.innerText+=score;

   if(isWin){
      document.getElementById("lose").remove();
      document.getElementById("loseImage").remove();
   }else{
      document.getElementById("win").remove();
      document.getElementById("winImage").remove();
   }

   modal.style.display = "block";
   achievements(nomutilisateur, score);
   gameoverbox();
}

//afin d'afficher les scores dans la popup de fin
function gameoverbox() {
   let nomutilisateur = localStorage['userPseudo'];
   let scores = JSON.parse(localStorage['scores']);
   let scoreshtml = document.getElementsByClassName("scoref");
   if (typeof nomutilisateur === 'undefined')
     nomutilisateur = "invité";
   if (typeof scores === 'undefined')
     scores = new ScoreGlobal();
   updatehighscores(scores.scoreSnake, nomutilisateur, score, scores.nbLignes);
   for (i = 0; i < scores.nbLignes; i++) 
     scoreshtml[i].innerText = (i+1) + ". " + scores.scoreSnake[0][i] + " - " + scores.scoreSnake[1][i];
   localStorage['scores']=JSON.stringify(scores);
 }

//afin de màj les trophées dans scores.html
function achievements(nomutilisateur, finalscore) {
   let arr = JSON.parse(localStorage['achievements']);
   for (let i = 0; i < arr.length; i++) {
     if (nomutilisateur===arr[i].nomutilisateur){
       updateScores(arr[i],0,finalscore);
       updateAchievements(arr[i],0,0);
     }
   }
   localStorage['achievements'] = JSON.stringify(arr);
}