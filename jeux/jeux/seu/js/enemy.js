//ennemie du joueur, on distingue 4 types possibles
class Enemy {
    constructor(type, cwidth, cheight, offsetx, offsety) {
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.type = type;
        this.cwidth = cwidth + 20;
        this.cheight = cheight;
        this.width = 40;
        this.height = 40;
        this.image = new Image();
        this.end = false;
        this.tabTargetX = [];
        this.tabTargetY = [];
        this.vitesse = 1;
        this.createpatterns();
    }

    //creation à partir du type des ennemis, de leurs positions ainsi que leur positions cibles (indicant leur mouvement)
    createpatterns() {
        switch (this.type) {
            case 1:
                this.image.src = 'assets/images/enemy1 seu.png';
                this.laserstyle = "#FFFF00";
                this.vies = 2;
                this.y = 0 - this.offsety;
                var tabPositions = [10, this.cwidth - 40];
                this.x = tabPositions[Math.floor(Math.random() * tabPositions.length)];
                if (this.x == 10) {
                    this.tabTargetX[0] = this.cwidth / 2 + 10;
                    this.tabTargetX[1] = 10;
                    this.tabTargetX[2] = this.cwidth / 2 + 10;
                    this.compteur = -1;
                }
                else {
                    this.tabTargetX[0] = this.cwidth / 3;
                    this.tabTargetX[1] = this.cwidth - 40;
                    this.tabTargetX[2] = this.cwidth / 3;
                    this.compteur = 1;
                }
                this.tabTargetY[0] = this.cheight / 2;
                this.tabTargetY[1] = this.cheight * 2 / 3;
                this.tabTargetY[2] = this.cheight;
                this.new = false;
                this.dxj = 0;
                this.dyj = 0;
                break;
            case 2:
                this.image.src = 'assets/images/enemy2 seu.png';
                this.laserstyle = "#1CFF00";
                this.vies = 1;
                this.y = -10 - this.offsety;
                this.x = this.cwidth / 2 - this.offsetx;
                if (Math.random < 0.5)
                    this.sens = -1;
                else this.sens = 1;
                break;
            case 3:
                this.image.src = 'assets/images/enemy3 seu.png';
                this.laserstyle = "#FF0000";
                this.vies = 2;
                this.y = this.cheight / 5;
                var tabPositions = [0, this.cwidth];
                this.x = tabPositions[Math.floor(Math.random() * tabPositions.length)];
                if (this.x == 0) {
                    this.sens = 1;
                }
                else this.sens = -1;
                this.x += this.offsetx * this.sens * this.sens;
                break;

            case 4:
                this.image.src = 'assets/images/enemy4 seu.png';
                this.laserstyle = "#434347";
                this.vies = 1;
                this.y = -10 - this.offsety;
                var tabPositions = [100, this.cwidth - 100];
                this.x = tabPositions[Math.floor(Math.random() * tabPositions.length)];
                break;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    updatepos() {
        if (this.y > this.cheight)
            this.end = true;
        switch (this.type) {
            case 1:
                this.updatepost1();
                break;
            case 2:
                this.updatepost2();
                break;
            case 3:
                this.updatepost3();
                break;
            case 4:
                this.updatepost4();
                break;
        }
    }

    updatepost1() {
        if (this.tabTargetX.length > 0) {
            if (this.new == false) {
                var ax = this.tabTargetX[0];
                var ay = this.tabTargetY[0];
                var dx = ax - this.x;
                var dy = ay - this.y;
                var delta = Math.atan(dy / dx);
                this.dxj = Math.sin(delta) * (this.vitesse + 20);
                this.dyj = Math.cos(delta) * (this.vitesse + 20);
                this.new = true;
            }
            this.x += this.dxj;
            this.y += this.dyj;
            if (this.x > ax && this.compteur == -1) {
                this.compteur = 1;
                this.tabTargetX.splice(0, 1);
                this.tabTargetY.splice(0, 1);
                this.new = false;
            }
            else if (this.x < ax && this.compteur == 1) {
                this.compteur = -1;
                this.tabTargetX.splice(0, 1);
                this.tabTargetY.splice(0, 1);
                this.new = false;

            }
        }
    }

    updatepost2() {
        this.y += this.vitesse;
        this.x += this.vitesse * this.sens * 25;
        if (this.x > this.cwidth * 2 / 3) {
            this.sens = -1;
            this.x = Math.min(this.cwidth * 2 / 3, this.x);
        }
        else if (this.x < this.cwidth / 3) {
            this.sens = 1;
            this.x = Math.max(this.cwidth / 3, this.x);
        }
    }

    updatepost3() {
        this.x += this.vitesse + 15 * this.sens;
        this.y += this.vitesse * 1 / 5;
        if (this.sens == 1 && this.x == this.cwidth)
            this.end = true;
        if (this.sens == -1 && this.x == 0)
            this.end = true;
    }

    updatepost4() {
        this.y += this.vitesse + 15;
    }

}