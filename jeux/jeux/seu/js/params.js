//parametres de jeu par rapport à la difficulté
class Params {
    constructor(difficulte) {
        this.compteurscorenemies = 0;
        this.compteurscorevies = 0;
        this.compteurscorebombes = 0;
        this.spawntimer = 1000;
        this.capenemies = 3;
        this.vitesse = 60;
        switch (difficulte) {
            case "easy":
                this.vies = 4;
                this.bombes = 4;
                this.threesholdv = 5000;
                this.threesholdb = 2500;
                this.modifierscore = 0.8;
                this.maxvitesse = 80;
                this.difficulte = "easy";
                break;
            case "hard":
                this.vies = 2;
                this.bombes = 3;
                this.threesholdv = 15000;
                this.threesholdb = 7500;
                this.modifierscore = 1.2;
                this.maxvitesse = 120;
                this.difficulte = "hard";
                break;
            default: // medium par defaut
                this.vies = 3;
                this.bombes = 3;
                this.threesholdv = 10000;
                this.threesholdb = 5000;
                this.modifierscore = 1;
                this.maxvitesse = 100;
                this.difficulte = "medium";
        }
    }
    //maj des params à partir du score actuel, params en question sont les vies, les bombes et la puissance des ennemis (frequence de leur apparition et leur vitesse)
    updatestats(points) {
        this.compteurscorenemies += points;
        this.compteurscorevies += points;
        this.compteurscorebombes += points;
        if (this.compteurscorevies >= this.threesholdv) {
            this.compteurscorevies -= this.threesholdv;
            this.vies = Math.min(this.vies+1, 6);
            this.threesholdv += 5000;
        }

        if (this.compteurscorebombes >= this.threesholdb) {
            this.compteurscorebombes -= this.threesholdb;
            this.bombes = Math.min(this.bombes+1, 6);
            this.threesholdb += 2500;
        }

        if (this.compteurscorenemies >= 10000) {
            this.compteurscorenemies -= 10000;
            this.vitesse = Math.min(this.vitesse + 2, this.maxvitesse);
            this.spawntimer = Math.min(this.spawntimer - 50, 200);
            this.capenemies = Math.min(this.capenemies + 1, 6);
        }
    }

    getdifficulteid(){
        switch (this.difficulte) {
            case "easy":
                return 0;
            case "hard":
               return 2;
            default: // medium par defaut
                return 1;
        }
    }
}