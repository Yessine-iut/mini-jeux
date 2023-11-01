var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var params = new Params(localStorage["seudifficulte"]);
var score = new Score(document.getElementById("myScore"), params.difficulte);
var unmute = true;
var player;

//booleans d'états de jeu
nostop = true;
nopause = true;
noinvincible = true;
inputbombe = true;
blink = false; //boolean de clignotement du vaisseau

//tabs des elements de jeu
tabEnemies = [];
tabVies = [];
tabBombes = [];
tabMissiles = [];

//met en pause le jeu et met un timer pour éviter appuis repetés sur la detection repeté de la mise en pause
function pause() {
  if (keys[27] && nopause == true) {
    if (nostop) {
      nostop = false;
      score.pause = true;
    }
    else {
      nostop = true;
      score.pause = false;
    }
    nopause = false;
    setTimeout(inputpause, 200);
  }
}

//sleep du timer de pause
function inputpause() {
  nopause = true;
}

velY = 0, velX = 0, speed = 2, friction = 0.98, keys = [];
//maj du jeu par rapport aux touches du clavier touchées
function updateInput() {

  if (keys[38]) {
    if (velY > -speed) {
      velY--;
    }
  }
  if (keys[40]) {
    if (velY < speed) {
      velY++;
    }
  }
  if (keys[39]) {
    if (velX < speed) {
      velX++;
    }
  }
  if (keys[37]) {
    if (velX > -speed) {
      velX--;
    }
  }
  if (keys[32]) {
    if (nopause) {
      addpro(player.xcenter + player.tailletriangle, player.ycenter, 1, true, player.laserstyle);
      setTimeout(inputpause, 300);
    }
    nopause = false;
  }
  if (keys[88]) {
    bombenemies();
  }

  velY *= friction;
  velX *= friction;
  player.updatepos(velX, velY);
  player.move(canvas.width - 40, canvas.height - 45);
}

//detruit la grosse partie des ennemis sur l'écran en utilisant une bombe
function bombenemies() {
  if (params.bombes > 0 && inputbombe) {
    inputbombe = false; //pour éviter double input et activer plusieurs bombes au meme temps
    params.bombes--;
    for (t = 0; t < tabEnemies.length; t++) {
      soundExplosion();
      score.updatekilled(tabEnemies[t].type);
      tabEnemies.splice(t, 1);
      score.updatescore(300);
      params.updatestats(300);
    }
  }
  setInterval(activerinputbombe, 1000);
}

//reactive l'input de la bombe après delai
function activerinputbombe() {
  inputbombe = true;
}

//rajoute un projectile sur l'écran provenant d'un ennemi ou du joueur
function addpro(a, b, c, bb, style) {
  tabMissiles.push(new Laser(a, b, c, style))
  if (bb) {
    var audio = new Audio('assets/sons/projectile.wav');
    audio.volume = 0.2;
    if (unmute) {
      audio.play();
    }
  }
}

//cree un ennemi aléatoirement
function spawnEnemies() {
  if (nostop) {
    tabTypes = [1, 2, 3, 4];
    offsetx = 0;
    offsety = 0;
    type = tabTypes[Math.floor(Math.random() * tabTypes.length)];
    nbenemies = Math.min(Math.floor(Math.random() * params.capenemies - 1), params.capenemies);
    for (i = 0; i < nbenemies; i++) {
      tabEnemies.push(new Enemy(type, canvas.width, canvas.height, offsetx, offsety));
      offsetx -= 25;
      offsety -= 25;

    }
  }
}

//verifie si le jeu est muté
function checkmuted() {
  if (localStorage["son"] == "sonore") {
    unmute = true;
  }
  else unmute = false;
}

function init() {
  //listeners des touches de clavier
  window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);

  document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
  });

  initViesBombes();
  initPlayer();
  checkmuted();
}

//initialisation des bombes et vies par rapport à la difficulté
function initViesBombes() {
  var compt = 10;
  for (i = 0; i < 6; i++) {
    tabVies[i] = new Heart(compt, 100);
    tabBombes[i] = new Bomb(compt, 130);
    compt += 30;
  }
}

//initialisation du vaisseau du joueur
function initPlayer() {
  player = new Player(canvas.width / 2, canvas.height - canvas.height / 64);
}

//dessine tous les missiles 
function drawMissile() {
  for (i = 0; i < tabMissiles.length; i++) {
    tabMissiles[i].draw(ctx);
  }
}

//dessine le joueur, si le joueur est touché alors on dessine une fois sur 2 pour faire un effet de clignotage pour l'invulnerabilité
function drawPerso() {
  if (noinvincible) {
    player.draw(ctx);
  }
  else {
    if (blink) {
      blink = false;
    }
    else {
      player.draw(ctx);
      blink = true;
    }
  }
  ctx.fill();
}

//dessine les ennemis 
function drawEnemie() {
  for (i = 0; i < tabEnemies.length; i++) {
    tabEnemies[i].draw(ctx);
  }
}


//maj de la position de chaque missile dans la direction qu'il face
function updatemissil() {
  for (i = 0; i < tabMissiles.length; i++) {
    tabMissiles[i].updatepos(3); //3 est la vitesse du missile 
    if (tabMissiles[i].y < 0 || tabMissiles[i].y > canvas.height) {
      if(tabMissiles[i]==tabMissiles.length-1)
        tabMissiles.pop();
        else tabMissiles.splice(i, 1);
    }
  }
}

//son d'explosion d'un ennemi
function soundExplosion() {
  var audio = new Audio('assets/sons/invaderkilled.wav');
  audio.volume = 0.2;
  if (unmute) {
    audio.play();
  }
}

//verification de collisions entre missile et ennemie/joueur
function collision() {
  var rectwidth = canvas.width / 1.5 / 6 - 20;
  var rectheight = 20;
  for (i = 1; i < tabMissiles.length; i++) {
    for (t = 0; t < tabEnemies.length; t++) {
      if (tabMissiles[i].sens == 1 && tabMissiles[i].y - 1 - rectheight < tabEnemies[t].y && tabMissiles[i].x < tabEnemies[t].x + rectwidth && tabMissiles[i].x > tabEnemies[t].x) {
        tabMissiles.splice(i, 1);
        soundExplosion();
        tabEnemies[t].vies--;
        score.updatescore(100);
        params.updatestats(100);
        if (tabEnemies[t].vies <= 0) {
          score.updatescore(300);
          score.updatekilled(tabEnemies[t].type);
          params.updatestats(300);
          tabEnemies.splice(t, 1);
        }
      }
    }
  }

}

//maj des ennemis, s'ils sont morts alors on les retire de la liste
function updateEnemie() {
  if (nostop) {
    for (i = 0; i < tabEnemies.length; i++) {
      tabEnemies[i].updatepos(canvas.width, canvas.height);
      if (tabEnemies[i].end)
        tabEnemies.splice(i, 1);
    }
  }
}

//box de gameover, si le jeu est fini alors on l'affiche
function gameoverbox() {
  nostop = false;
  let nomutilisateur = localStorage['userPseudo'];
  let finalscore = score.points * params.modifierscore;
  let scores = JSON.parse(localStorage['scores']);
  let scoreshtml = document.getElementsByClassName("scoref");
  if (typeof nomutilisateur === 'undefined')
    nomutilisateur = "invité";
  if (typeof scores === 'undefined')
    scores = new ScoreGlobal();
  achievements(nomutilisateur, finalscore);
  updatehighscores(scores.scoreSeu, nomutilisateur, finalscore, scores.nbLignes);
  for (i = 0; i < scores.nbLignes; i++) {
    scoreshtml[i + 1].innerText = (i + 1) + ". " + scores.scoreSeu[0][i] + " - " + scores.scoreSeu[1][i];
  }
  document.getElementById('final').innerText = "your final score is : " + finalscore;
  document.getElementById('light').style.display = 'block';
  document.getElementById('fade').style.display = 'block';
  localStorage['scores'] = JSON.stringify(scores);
}

//maj les données utilisateurs dans le localstorage, les trophées et score
function achievements(nomutilisateur, finalscore) {
  let arr = JSON.parse(localStorage['achievements']);
  for (let i = 0; i < arr.length; i++) {
    if (nomutilisateur === arr[i].nomutilisateur) {
      updateScores(arr[i], 2, finalscore);
      updateAchievements(arr[i], 2, params.getdifficulteid());
    }
  }
  localStorage['achievements'] = JSON.stringify(arr);
}

//si le joueur perd toutes les vies, c'est gameover
function lose() {
  if (nostop)
    gameoverbox();
}


//creation de projectiles pour chaque ennemi, ceci est random
function enemieAtak() {
  for (i = 0; i < tabEnemies.length; i++) {
    if (Math.random() < 0.01) {
      addpro(tabEnemies[i].x + tabEnemies[i].width / 2, tabEnemies[i].y + tabEnemies[i].height, -1, false, tabEnemies[i].laserstyle);
    }
  }
}

//verification de la vie du joueur
function lifecheck() {
  for (i = 0; i < tabMissiles.length; i++) {
    if (tabMissiles[i].x < player.xright + 20 && tabMissiles[i].x > player.xleft && tabMissiles[i].y > player.yleft
      && tabMissiles[i].y < player.yright + 25 && tabMissiles[i].sens == -1) {
      tabMissiles.splice(i, 1);
      if (noinvincible) {
        params.vies--;
        noinvincible = false;
        setTimeout(fininvincibilite, 2000);
      }
    }
  }
}

//invincibilité du joueur jusqu'à activation de la méthode qui la desactive
function fininvincibilite() {
  noinvincible = true;
}


//dessine la partie droite du canvas avec les scores et vies
function drawScore() {
  score.draw();
  lifebombdraw();
}

//dessine chaque bombe et vie du joueur
function lifebombdraw() {
  for (i = 0; i < params.vies; i++)
    tabVies[i].draw(score.ctx);
  for (i = 0; i < params.bombes; i++)
    tabBombes[i].draw(score.ctx);
}

//boucle principale du script
function main() {
  pause();
  drawScore();
  checkmuted();
  //si plus de vie, gameover après un bref delai
  if (params.vies <= 0) {
    setInterval(lose, 500);
  }
  if (nostop) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPerso();
    drawMissile();
    updatemissil();
    collision();
    drawEnemie();
    enemieAtak();
    lifecheck();
    updateInput();
  }
}


init();
setInterval(spawnEnemies, params.spawntimer);
setInterval(updateEnemie, params.vitesse);
setInterval(main, 5);
