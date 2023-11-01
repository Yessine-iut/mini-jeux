// 1 On définisse une sorte de "programme principal"
// le point d'entrée du code qui sera appelée dès que la
// page ET SES RESSOURCES est chargée
window.onload = init;

let grille;
let parametre;
let canvas, ctx, canvasLargeur, canvasHauteur;
let mousePos = {};
let userState = "rien";
let cookieDragguee = null;
let assets;
let mysetInterval;
let tabQuetes = [];
let stop = false;
let secondes = 0;


function init() {
    // appelée quand la page et ses ressources sont prêtes.
    // On dit aussi que le DOM est ready (en fait un peu plus...)
    loadAssets(startGame);
    let difficulte;
    mysetInterval = setInterval(setTimer, 1000);
    if (localStorage["match3difficulte"] == "easy") {
        difficulte = 0;
        parametre = new Parametre(3500, 30, 6);


    } else if (localStorage["match3difficulte"] == "medium") {
        difficulte = 1;
        parametre = new Parametre(3500, 25, 6);



    } else if (localStorage["match3difficulte"] == "hard") {
        difficulte = 2;
        parametre = new Parametre(4500, 20, 6);


    }

    tabQuetes[0] = new Quete("progressbarbefore", difficulte, "txt");
    tabQuetes[1] = new Quete("progressbar2before", difficulte, "txt2");
    tabQuetes[2] = new Quete("progressbar3before", difficulte, "txt3");
    document.getElementById('difficulteJeu').innerHTML = "Difficulty : " + difficulte;

    checkFinPartie();

}


//Met à jour le timer
function setTimer() {
    //timer affiché en haut du jeu
    ++secondes;
    document.getElementById("seconds").innerHTML = pad(secondes % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(secondes / 60));
}

function pad(val) {
    //savoir si on a qu'un chiffre, auquel cas on met un 0 avant.
    var v = val + "";
    if (v.length < 2)
        return "0" + v;
    else
        return v;
}



function startGame(assetsLoaded) {
    assets = assetsLoaded;

    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvasLargeur = canvas.width;
    canvasHauteur = canvas.height;


    grille = new Grille(9, 9, canvasLargeur, canvasHauteur, assetsLoaded, parametre.nbCookieDifferent);
    canvas.onmousedown = traiteMouseDown;
    canvas.onmouseup = traiteMouseUp;
    canvas.onmousemove = traiteMouseMove;



    requestAnimationFrame(animationLoop);
}
//Evenement lors d'un clic
function traiteMouseDown(event) {



    if (localStorage["son"] == 'sonore') {
        assets.plop.play();

    }
    switch (userState) {

        case "cookieEnDrag":
        case "rien":
            // on a cliqué sur une cookie, on va recherche la cookie en fonction
            // du x et du y cliqué
            // puis on va changer l'état pour "cookieEnDrag"
            userState = "cookieEnDrag";

            cookieDraggee = grille.getCookie(mousePos.x, mousePos.y);


    }
}
//Evenement lors du relachement du clic, fonction qui fait une chute et vérifie si le jeu n'est pas fini
async function traiteMouseUp(event) {


    switch (userState) {
        case "cookieEnDrag":
            cookieCible = grille.getCookie(mousePos.x, mousePos.y);
            // regarder si on peut swapper ? ou si on est pas trop loin....
            if (Cookie.distance(cookieDraggee, cookieCible) === 1 && possibleSwitch(cookieDraggee, cookieCible)) {
                let cookietype = cookieCible.type;
                let cookieimage = cookieCible.image;
                let cookieX = cookieCible.currentX;
                let cookieY = cookieCible.currentY;



                cookieCible.type = cookieDraggee.type;
                cookieCible.image = cookieDraggee.image;
                cookieCible.currentX = cookieDraggee.currentX;
                cookieCible.currentY = cookieDraggee.currentY;

                cookieDraggee.type = cookietype;
                cookieDraggee.image = cookieimage;
                cookieDraggee.currentX = cookieX;
                cookieDraggee.currentY = cookieY;

                cookieCible.etat = "switch";
                cookieDraggee.etat = "switch";


                grille.detecterAlignement();

                while (grille.detecterBoucle()) {
                    if (localStorage["son"] == 'sonore') {
                        assets.explosion.play();

                    }
                    userState = "rien";
                    grille.updateScore();
                    updateQuest(grille);

                    while (grille.detecterBoucle()) {

                        await sleep(500).then(() => {

                            grille.chute_de_cookie();

                            grille.nouveau_cookie2();

                        });

                    }
                    await sleep(500).then(() => {
                        grille.detecterAlignement();


                    });

                }
                updateCoup();


            }
            userState = "rien";

            break;
        case "rien":

            break;
    }
}
//Faire un temps d'arrêt
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
//Avoir la position de la souris
function getMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    mousePos = {
        x: x,
        y: y,
    };
}
//Met à jour l'état des quêtes ainsi que la progression
function updateQuest(grille) {
    for (let i = 0; i < tabQuetes.length; i++) {
        tabQuetes[i].update(grille);
    }


}

function traiteMouseMove(event) {
    getMousePos(event);
}

function animationLoop() {
    // Efface le canvas

    ctx.clearRect(0, 0, canvasLargeur, canvasHauteur);

    // On dessine les objets
    grille.drawGrille(ctx);
    grille.showCookies(ctx);



    switch (userState) {
        case "cookieEnDrag": {
            cookieDraggee.dragAndDraw(ctx, mousePos.x, mousePos.y);
            break;
        }
    }
    if (!noblocage()) {
        let overlay = document.getElementById('overlay3');
        overlay.style.display = 'block';
        let overlay2 = document.getElementById('popup3');
        overlay2.style.display = 'block';
    }
    // on demande à redessiner 60 fois par seconde
    requestAnimationFrame(animationLoop);

}
//Regarde si y a win ou defaite
function checkFinPartie() {
    if (!stop) {
        if (win()) {
            popUpFinPartie("scoref", "overlay2", "scoreFinal2");
            clearInterval(mysetInterval);
        } else if (gameover()) {
            popUpFinPartie("scoref2", "overlay", "scoreFinal");
            clearInterval(mysetInterval);

        }
        requestAnimationFrame(checkFinPartie);
    }
}
//Affiche n'importe quel popup de l'html en proposant l'ID des éléments en paramètre
function popUpFinPartie(idS, idO, idSF) {
    stop = true;
    let nomutilisateur = localStorage['userPseudo'];
    let finalscore = parseInt(document.getElementById("coup").innerHTML.slice(13)-1);
    let scores = JSON.parse(localStorage['scores']);
    let scoreshtml = document.getElementsByClassName(idS);
    if (idS == "scoref2") {
        document.getElementById(idSF).innerHTML = parseInt(document.getElementById("coup").innerHTML.slice(13))

    } else {
        document.getElementById(idSF).innerHTML = "Moves left : " + parseInt(document.getElementById("coup").innerHTML.slice(13) - 1)

    }

    if (typeof nomutilisateur === 'undefined')
        nomutilisateur = "invité";
    if (typeof scores === 'undefined')
        scores = new ScoreGlobal();
    updatehighscores(scores.scoreMatch3, nomutilisateur, finalscore, scores.nbLignes);

    for (i = 0; i < scores.nbLignes; i++) {
        scoreshtml[i].innerText = scores.scoreMatch3[0][i] + " - " + scores.scoreMatch3[1][i];
    }
    achievements(nomutilisateur, finalscore);
    let overlay = document.getElementById(idO);
    overlay.style.display = 'block';
    let overlay2 = document.getElementById('popup');
    localStorage['scores'] = JSON.stringify(scores);
    overlay2.style.backgroundImage = "url('assets/images/gameover.png')";
    clearInterval(mysetInterval);


}
function achievements(nomutilisateur, finalscore) {
    let arr = JSON.parse(localStorage['achievements']);
    for (let i = 0; i < arr.length; i++) {
        if (nomutilisateur === arr[i].nomutilisateur) {
            updateScores(arr[i], 1, finalscore);
            let difficulte = parseInt(document.getElementById("difficulteJeu").innerHTML.slice(12));
            updateAchievements(arr[i], 1, difficulte);
        }
    }
    localStorage['achievements'] = JSON.stringify(arr);
}
//Savoir si c'est possible de faire un switch
function possibleSwitch(cookieCible, cookieDraggee) {
    let cookietype = cookieCible.type;
    let cookieimage = cookieCible.image;

    cookieCible.type = cookieDraggee.type;
    cookieCible.image = cookieDraggee.image;

    cookieDraggee.type = cookietype;
    cookieDraggee.image = cookieimage;



    if (grille.detecterMatchLignes() || grille.detecterMatchColonnes()) {
        cookieDraggee.type = cookieCible.type;
        cookieDraggee.image = cookieCible.image;
        cookieCible.type = cookietype;
        cookieCible.image = cookieimage;
        return true;
    }
    cookieDraggee.type = cookieCible.type;
    cookieDraggee.image = cookieCible.image;

    cookieCible.type = cookietype;
    cookieCible.image = cookieimage;
    return false;
}

//Savoir si on a gagné
function win() {
    let x = parseInt(document.getElementById("scoreFinal").innerHTML);
    if (x > parametre.score) {
        return true;
    } else
        false;

}
//En cas de blocage du jeu (impossible de switch et jeu non terminé) alors cette fonction refait une grile et notifie le joueur
function noblocage() {

    for (let l = 0; l < grille.nbLignes; l++) {

        for (let c = 0; c < grille.nbColonnes; c++) {
            //Ligne et colonne pas à l'extrémité

            if (grille.tabCookies[l][c].ligne != 0 && grille.tabCookies[l][c].colonne != grille.nbColonnes - 1 && grille.tabCookies[l][c].colonne != 0 && grille.tabCookies[l][c].ligne != grille.nbLignes - 1) {

                if (possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l + 1][c]) || possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l - 1][c]) ||
                    possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c + 1]) || possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c - 1])) {
                    return true;
                }

            }

            //A l'extrémité ligne et colonne
            else if (grille.tabCookies[l][c].ligne == 0 || grille.tabCookies[l][c].ligne == grille.nbLignes - 1 && (grille.tabCookies[l][c].colonne == 0 || grille.tabCookies[l][c].colonne == grille.nbColonnes - 1)) {
                if (grille.tabCookies[l][c].ligne == 0 && grille.tabCookies[l][c].colonne == 0) {

                    if (possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l + 1][c]) ||
                        possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c + 1])) {
                        return true;
                    }
                } else if (grille.tabCookies[l][c].ligne == grille.nbLignes - 1 && grille.tabCookies[l][c].colonne == grille.nbColonnes - 1) {
                    if (possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l - 1][c]) ||
                        possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c - 1])) {
                        return true;
                    }
                } else if (grille.tabCookies[l][c].ligne == 0 && grille.tabCookies[l][c].colonne == grille.nbColonnes - 1) {
                    if (possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l + 1][c]) ||
                        possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c - 1])) {
                        return true;
                    }

                } else if (grille.tabCookies[l][c].ligne == grille.nbLignes - 1 && grille.tabCookies[l][c].colonne == 0) {
                    if (possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l - 1][c]) ||
                        possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c + 1])) {
                        return true;
                    }

                }
            }
            //Extremite ligne
            else if (grille.tabCookies[l][c].ligne == 0 || grille.tabCookies[l][c].ligne == grille.nbLignes - 1) {

                if (grille.tabCookies[l][c].ligne == 0) {
                    if (possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l + 1][c]) || possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c - 1]) || possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c + 1])) {

                        return true;
                    }
                } else {
                    if (possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l - 1][c]) || possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c - 1]) || possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c + 1])) {

                        return true;
                    }

                }


            }

            //Extremite Colonne
            else if (grille.tabCookies[l][c].colonne == 0 || grille.tabCookies[l][c].colonne == grille.nbColonnes - 1) {
                if (grille.tabCookies[l][c].colonne == 0) {
                    if (possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l - 1][c]) || possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l + 1][c]) || possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c + 1])) {

                        return true;
                    }

                } else {
                    if (possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l - 1][c]) || possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l + 1][c]) || possibleSwitch(grille.tabCookies[l][c], grille.tabCookies[l][c - 1])) {

                        return true;
                    }
                }
            }
        }
    }
    return false;
}
//On decremente le coup dans le html
function updateCoup() {
    let restemp = parseInt(document.getElementById("coup").innerHTML.slice(13)) - 1;
    document.getElementById("coup").innerHTML = "Moves left : " + restemp;




}
//Savoir si on a perdu
function gameover() {
    let restemp = parseInt(document.getElementById("coup").innerHTML.slice(13));
    if (restemp > 0) {
        return false;
    } else
        return true;
}
