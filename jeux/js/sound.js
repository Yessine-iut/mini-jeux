var estMuet = 1;

function creerBoutonParamSon() {
    var input = document.createElement("input");
    input.setAttribute("id", "boutonParamSon");
    document.getElementById('paramSon').append(input);
    localStorage["son"]="sonore";
    var btn = document.getElementById('boutonParamSon');
    if(localStorage["son"]=="sonore"){
        btn.setAttribute('value',"🔊");

    }else
    btn.setAttribute('value',"🔇");



    btn.setAttribute('title',"désactiver le son");
    btn.setAttribute('type',"submit");
    btn.setAttribute('onClick',"parametrerSon(estMuet+1)");

}

function parametrerSon(num) {
    this.estMuet=num;

    //on veut rendre muet la page
    if(localStorage["son"]=="sonore"){
        changerIcone();
    //on veut remettre les effets sonores
    } else{
        retablirIcone();
    }
}

function changerIcone(){
    var btn = document.getElementById('boutonParamSon');
    btn.setAttribute('value',"🔇");

localStorage["son"]="muet";
    btn.setAttribute('title',"activer le son");
}
function retablirIcone(){
    var btn = document.getElementById('boutonParamSon');
    btn.setAttribute('value',"🔊");
    localStorage["son"]="sonore";

    btn.setAttribute('title',"désactiver le son");
}

