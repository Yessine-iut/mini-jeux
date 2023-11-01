class champi {
    constructor() {
        this.image = new Image();
        this.image.src = "./assets/images/champi.png";
        this.x;
        this.y;
        this.newChampi();
    }

    newChampi() {
        this.x = Math.random()*document.querySelector("#canvas").width;
        this.y = Math.random()*document.querySelector("#canvas").height;
        if(checkBadSpawn(this.x,this.y) || checkSpawnedInsideTail(this.x,this.y))
            this.newChampi();
    }

    hasBeenEaten(x,y){
        if(checkCollisionImage(x,y)){
            var audio = new Audio('assets/sons/champi.wav');
            audio.volume = 0.5;
            if (!checkmuted()) 
                audio.play();
            invincibility=true;
            setTimeout(removeInvincibility, 5400);
            removeChampignon();
        }
    }

    draw() {
        let canvas = document.querySelector("#canvas");
        let context = canvas.getContext("2d");
        context.drawImage(this.image, this.x, this.y, 45, 35);
        this.hasBeenEaten(this.x,this.y);
    }
}