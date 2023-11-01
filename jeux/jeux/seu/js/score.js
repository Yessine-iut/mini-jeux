//fenetre droite de score dans le canvas
class Score {
    constructor(canvas, difficulte) {
        this.difficulte = difficulte;
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.chiffres = [];
        this.points = 0;

        //images pour chaque element de la barre de score
        this.zero = new Image();
        this.zero.src = 'assets/images/zero seu.png';
        this.one = new Image();
        this.one.src = 'assets/images/one seu.png';
        this.two = new Image();
        this.two.src = 'assets/images/two seu.png';
        this.three = new Image();
        this.three.src = 'assets/images/three seu.png';
        this.four = new Image();
        this.four.src = 'assets/images/four seu.png';
        this.five = new Image();
        this.five.src = 'assets/images/five seu.png';
        this.six = new Image();
        this.six.src = 'assets/images/six seu.png';
        this.seven = new Image();
        this.seven.src = 'assets/images/seven seu.png';
        this.eight = new Image();
        this.eight.src = 'assets/images/eight seu.png';
        this.nine = new Image();
        this.nine.src = 'assets/images/nine seu.png';
        this.paused = new Image();
        this.paused.src = 'assets/images/pause seu.png';
        this.easy = new Image();
        this.easy.src = 'assets/images/easy mode seu.png';
        this.medium = new Image();
        this.medium.src = 'assets/images/medium mode seu.png';
        this.hard = new Image();
        this.hard.src = 'assets/images/hard mode seu.png';
        this.ekilled = new Image();
        this.ekilled.src = 'assets/images/enemies killed seu.png';
        this.x = new Image();
        this.x.src = 'assets/images/x seu.png';
        this.type1 = new Image();
        this.type1.src = 'assets/images/enemy1 seu.png';
        this.type2 = new Image();
        this.type2.src = 'assets/images/enemy2 seu.png';
        this.type3 = new Image();
        this.type3.src = 'assets/images/enemy3 seu.png';
        this.type4 = new Image();
        this.type4.src = 'assets/images/enemy4 seu.png';
        this.pause = false;
        this.typekilled = [0, 0, 0, 0];

        this.chiffres.push(this.zero, this.one, this.two, this.three, this.four, this.five, this.six, this.seven, this.eight, this.nine);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawdifficulte();
        var compteur = 0;
        var chiffrecompt = this.points;
        for (var i = 9; i > 0; i--) {
            this.ctx.drawImage(this.chiffres[chiffrecompt % 10], this.width - 30 + compteur, 20, 18, 25);
            compteur -= 20;
            chiffrecompt = Math.floor(chiffrecompt / 10);
        }
        if (this.pause)
            this.ctx.drawImage(this.paused, 10, this.height / 3, 180, 30);

        this.ctx.drawImage(this.ekilled, 10, this.height / 2, 180, 20);
        this.ctx.drawImage(this.type1, 10, this.height / 2 + 40, 40, 40);
        this.ctx.drawImage(this.type2, 10, this.height / 2 + 85, 40, 40);
        this.ctx.drawImage(this.type3, 10, this.height / 2 + 130, 40, 40);
        this.ctx.drawImage(this.type4, 10, this.height / 2 + 175, 40, 40);
        compteur = 55;
        for (var i = 0; i < 4; i++) {
            this.ctx.drawImage(this.x, 60, this.height / 2 + compteur, 15, 15);
            compteur += 45;
        }
        var compteur2 = 0;
        for (var j = 0; j < this.typekilled.length; j++) {
            compteur = 0;
            chiffrecompt = this.typekilled[j];
            for (i = 3; i > 0; i--) {
                this.ctx.drawImage(this.chiffres[chiffrecompt % 10], this.width / 2 + 30 + compteur, this.height / 2 + 52 + compteur2, 15, 20);
                compteur -= 20;
                chiffrecompt=Math.floor(chiffrecompt/10);
            }
            compteur2 += 45;
        }
    }

    drawdifficulte() {
        switch (this.difficulte) {
            case "easy":
                this.ctx.drawImage(this.easy, 10, 60, 180, 30);
                break;
            case "medium":
                this.ctx.drawImage(this.medium, 10, 60, 180, 30);
                break;
            case "hard":
                this.ctx.drawImage(this.hard, 10, 60, 180, 30);
                break;
        }
    }

    updatekilled(type) {
        this.typekilled[type - 1]++;
    }
    updatescore(points) {
        this.points += points;
    }

}