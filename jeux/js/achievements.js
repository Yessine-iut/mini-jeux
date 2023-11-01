class Achievements {
    constructor(nom){
        this.nomutilisateur=nom;
        this.scores = [0,0,0];
        this.achievements = [];
        this.initialiserAchievements();
    }

    initialiserAchievements(){
        this.achievements.push(new Achieve("Débutant","Completer ton premier jeu",[true,true,true],false,1));
        this.achievements.push(new Achieve("Experimenté","Completer n'importe quel jeu 5 fois",[true,true,true],false,5));
        this.achievements.push(new Achieve("Maitre","Completer n'importe quel jeu 5 fois en difficile",[true,true,true],true,5));
        this.achievements.push(new Achieve("Maitre du snake","Completer le snake 10 fois",[true,false,false],false,10));
        this.achievements.push(new Achieve("Maitre du match3","Completer le match3 10 fois",[false,true,false],false,10));
        this.achievements.push(new Achieve("Maitre du shoot em up","Completer le shoot em up 10 fois",[false,false,true],false,10));
    }
}