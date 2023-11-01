function creerCanvas(){
    // creation d'un canvas "responsive" qui s'adapte à la div parent
    var canvas = document.createElement('canvas');
    canvas.setAttribute("id", "canvas");
    var p = document.createElement('p');
    p.setAttribute("id", "toucheP");
    var canvasContainer = document.getElementById("canvasContainer");
    p.innerHTML+="Appuyez sur 'p' pour débuter la partie de Veggie 🐍";
    p.style.top=canvasContainer.clientHeight/2+"px";
    p.style.left=(canvasContainer.clientWidth/2)-300+"px";

    largeur= window.getComputedStyle(canvasContainer).getPropertyValue('width');
    hauteur = window.getComputedStyle(canvasContainer).getPropertyValue('height');

    var fH = document.getElementsByClassName("foot")[0].offsetHeight +10;
    canvas.setAttribute('width',canvasContainer.clientWidth-40);
    canvas.setAttribute('height',canvasContainer.clientHeight-fH);
    canvas.style.width = canvasContainer.clientWidth-40;
    canvas.style.height = canvasContainer.clientHeight-fH;
    canvasContainer.append(p);

    canvasContainer.append(canvas);
    console.log("creation du canvas depuis le javascript");
  }