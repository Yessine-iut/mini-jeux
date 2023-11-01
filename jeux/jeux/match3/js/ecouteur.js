function quitter(){
    let overlay=document.getElementById('overlay3');
    overlay.style.display='none';
    grille.remplirTableauDeCookies(6);
    
  }

 
  function hover(element) {
    if(element.getAttribute('src')=='assets/images/tryagain.png'){
         element.setAttribute('src', 'assets/images/tryagains.png');

    }
    else if(element.getAttribute('src')=='assets/images/mix.png'){
         element.setAttribute('src', 'assets/images/mixhover.png');

    }
          
 else{
         element.setAttribute('src', 'assets/images/leaderboards.png');

    }
}

  
  function unhover(element) {
    if(element.getAttribute('src')=='assets/images/tryagains.png'){
         element.setAttribute('src', 'assets/images/tryagain.png');

    }
    else if(element.getAttribute('src')=='assets/images/mixhover.png'){
         element.setAttribute('src', 'assets/images/mix.png');

     }

 else{
         element.setAttribute('src', 'assets/images/leaderboard.png');

    }
    
  }

 