function drawSnake(posX, posY) {
    drawHead(posX, posY );
    dragSegment(0, posX, posY);
    for (var i = x.length - 1; i >= 0; i--) {
        dragSegment(i + 1, x[i], y[i]);
    }
    drawTail();
}

function drawHead(xin, yin) {
    /* la tête est clairement inspirée du JS bin donné par M. Buffa:
    jsbin.com/bofimu/ */
    dx = xin - x[0];
    dy = yin - y[0];
    angle = Math.atan2(dy, dx);
    ctx.save();
    ctx.translate(xin, yin);
    ctx.rotate(angle - (2 * Math.PI / 180));
    ctx.translate(0, -10);
    ctx.fillStyle = "lime";
    ctx.fillRect(0, 0, 15, 20);
    ctx.fillRect(15, 5, 8, 10);
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(7, 5, 4, 0, 2 * Math.PI, false);
    ctx.arc(7, 15, 4, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(7, 5, 2, 0, 2 * Math.PI, false);
    ctx.arc(7, 15, 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(23, 7);
    ctx.lineTo(30, 7);
    ctx.lineTo(23, 10);
    ctx.lineTo(30, 13);
    ctx.lineTo(23, 13);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
}

function drawTail() {
    dx = x[tailleVeggie - 2] - x[tailleVeggie - 1];
    dy = y[tailleVeggie - 2] - y[tailleVeggie - 1];
    angle = Math.atan2(dy, dx);
    ctx.save();
    ctx.translate(x[tailleVeggie - 1], y[tailleVeggie - 1]);
    ctx.rotate(angle - (2 * Math.PI / 180));
    ctx.translate(0, -5);
    ctx.fillStyle = "darkgreen";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-20, 5);
    ctx.lineTo(0, 10);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function dragSegment(indexSegment, xin, yin) {
    dx = xin - x[indexSegment];
    dy = yin - y[indexSegment];
    angle = Math.atan2(dy, dx);
    x[indexSegment] = xin - Math.cos(angle) * largeurSegment;
    y[indexSegment] = yin - Math.sin(angle) * largeurSegment;
    ctx.save();
    ctx.translate(x[indexSegment], y[indexSegment]);
    ctx.rotate(angle);
    drawLine(0, 0, largeurSegment, 0, generateColor(indexSegment), 10);
    ctx.restore();
}
var invincibility = false;

function generateColor(indexSegment) {
    if(invincibility == true) 
        return "#" + ((1<<24)*Math.random() | 0).toString(16);
    else if (indexSegment % 3 == 1)
        return "white";
    else if (indexSegment % 3 == 2)
        return "lime";
    else
        return "black";
}

function drawLine(x1, y1, x2, y2, color, width) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}

function checkKnockout(){
    if(checkCollisionWall(x[0],y[0]))
        showEnd(false);
}

function checkCollisionImage(xImage,yImage){
    //+= taille de l'image
    if(checkEat(x[0],y[0],xImage,yImage))
        return true;
}

function checkCollisionTail(){
    for(let i=tailleVeggie-1;i>0;i--){
        if(checkSamePosTail(x[0],y[0],x[i],y[i])){
            //console.log("la tête a touché la partie: " +i);
            showEnd(false);
        }
    }
}

function checkSpawnedInsideTail(x,y){
    for(let i=tailleVeggie;i>0;i--){
        if(checkSamePosTail(x[i],y[i],x,y))
            return true;
    }
    return false;
}

function checkSamePosTail(x1,y1,x2,y2){
   if(Math.abs(Math.floor(x1-x2))<=6 && Math.abs(Math.floor(y1-y2))<=6)
      return true;
}