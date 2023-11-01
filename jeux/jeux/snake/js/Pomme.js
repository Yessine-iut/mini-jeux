class pomme {
    constructor() {
        this.image = new Image();
        this.image.src = "./assets/images/pomme.png";
        this.x;
        this.y;
        this.isEaten = false;
        this.newPomme();
    }

    newPomme() {
        this.isEaten = true;
        this.x = Math.random()*document.querySelector("#canvas").width;
        this.y = Math.random()*document.querySelector("#canvas").height;
        if(checkBadSpawn(this.x,this.y) || checkSpawnedInsideTail(this.x,this.y))
            this.newPomme();
    }

    hasBeenEaten(x,y){
        if(checkCollisionImage(x,y)){
            var audio = new Audio('assets/sons/pomme.wav');
            audio.volume = 0.5;
            if (!checkmuted()) {
                audio.play();
            }
            this.newPomme();
            grandir();
        }
    }

    draw() {
        let canvas = document.querySelector("#canvas");
        let context = canvas.getContext("2d");
        context.drawImage(this.image, this.x, this.y, 25, 25);
        this.hasBeenEaten(this.x,this.y);
    }
}