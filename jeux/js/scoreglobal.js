class ScoreGlobal {

  constructor() {
    this.scoreMatch3 = [];
    this.scoreSnake = [];
    this.scoreSeu = [];
    this.nbLignes = 5;
    this.initScores();
  }

  initScores() {
    this.scoreMatch3 = this.initScoresDefault();
    this.scoreSnake = this.initScoresDefault();
    this.scoreSeu = this.initScoresDefault();
  }

  initScoresDefault() {
    let matrice = create2DArray(this.nbLignes);
    let noms = ["Ahmed", "Ben el bey", "Buffa", "Nortier", "Renevier"];
    let scores = [0, 0, 0, 0, 0];

    for (let i = 0; i < this.nbLignes; i++) {
      matrice[0][i] = noms[i];
      matrice[1][i] = scores[i];
    }
    return matrice;
  }
}

//createur de matrices
function create2DArray(rows) {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
  }
  return arr;
}

//mise à jour des high score du jeu en param
function updatehighscores(scores, nom, fscore, nblignes) {
  let nomprov = nom;
  let first = true;
  let scoreprov = fscore;
  let scoreprov2 = 0;
  let nomprov2 = "";
  for (i = 0; i < nblignes; i++) {
    if (first) {
      if (scores[1][i] <= scoreprov) {
        scoreprov2 = scores[1][i];
        nomprov2 = scores[0][i];
        scores[0][i] = nomprov;
        scores[1][i] = scoreprov;
        first = false;
      }
    }
    else {
      if (scores[1][i] <= scoreprov2) {
        scoreprov = scores[1][i];
        nomprov = scores[0][i];
        scores[0][i] = nomprov2;
        scores[1][i] = scoreprov2;
        first = true;
      }
    }
  }
}