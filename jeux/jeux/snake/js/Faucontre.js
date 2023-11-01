class faucontre {
    constructor() {
        this.image = new Image();
        this.image.src = "./assets/images/faucontre2.png";
        this.x;
        this.y;
        this.newFaucontre();
    }

    newFaucontre() {
        this.x = Math.random()*document.querySelector("#canvas").width;
        this.y = Math.random()*document.querySelector("#canvas").height;
        if(checkBadSpawn(this.x,this.y) || checkSpawnedInsideTail(this.x,this.y))
            this.newFaucontre();
    }

    draw() {
        let canvas = document.querySelector("#canvas");
        let context = canvas.getContext("2d");
        context.drawImage(this.image, this.x, this.y, 45, 35);
        this.hasKilledVeggie(this.x,this.y);
    }

    hasKilledVeggie(x,y){
        if(!invincibility){
            if(checkCollisionImage(x+5,y+5)){
                var audio = new Audio('assets/sons/faucontre.wav');
                audio.volume = 0.5;
                if (!checkmuted()) 
                    audio.play();
                showEnd(false);
            }
        }
    }
}