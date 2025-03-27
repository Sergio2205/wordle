Quadrille.CELL_LENGTH = 100;
let board, close, correct, wrong, word; //tablero, colores, palabra a adivinar
let currentTry=[], correctas=[], cercanas=[]; //intento del usuario, vector booleano de letras correctas y cercanas 
let contador=0
let title = "WORD OF THE DAY";
Quadrille.OUTLINE="black"
Quadrille.OUTLINE_WEIGHT=10;
let currentRow=0
let currentCol=0
let tamLetra=50;
let wordPool=["abejas", "abrazo", "adopta", "afloja", "agudos", "ahorca", "alarma","Berlin","cabeza","Boyaca","Brasil","barren","belico","cabras","Canada","calvos","camino","caidos","cebras","Chavez","copula","craneo","delfin","diezmo","drogas","Egipto","encoge","fabula","Dublin","equipo","estafa","existe","fangos","fisura","fisico","franco","gnomos","Guinea","Guyana","hechos","hindus","hordas","hacian","herida","gotica","iglues","inocuo","intimo","Israel","jardin","lamina","Kuwait","latido","libros","Libano","maduro","mangos","mesero","muerta","Mexico","martir","mutila","naipes","Nevada","numero","nobles","oculto","orejas","orbita","ordeno","ovejas","paises","oxidar","Panama","peajes","orugas","pistas","pobres","pedido","pollos","German","primas","pulsos","picaro","pirita","quiero","qatari","reales","recoge","reptil","rifles","romano","rubial","rapido","salmos","cebada","sauces","cegado","sensor","Serbia","ciervo","Suecia","tabues","texano","torres","trompa","turcas","tactil","tomate","tunica","tipico","taller","ultimo","Uganda","ulcera","vegano","valido","vicios","votare","viajes","vergas","yardas","zurdos","arabes","igneos","ovalos","unicos","utiles","epocas","exitos"]


let numLetras=6;
let gameEnded=false //se modifica si llega al maximo de intentos
let gameWon=false // se modifica si adivina la palabra
let titleX = 0
let titleY = 0

let circles=[];
let squares=[];

function setup() {
  for (let i=0; i<wordPool.length; i++){
    wordPool[i]=wordPool[i].toLowerCase()
  }
  board = createQuadrille(numLetras, 6)
  close = color("orange")
  correct = color("green")
  wrong = color("gray")
  createCanvas(board.width * Quadrille.CELL_LENGTH, (board.height+1) * Quadrille.CELL_LENGTH);
  // word="PRUEBA"
  word=random(wordPool)
  //console.log(word)
  
  frameRate(10);
  
   for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let side = random(10, 30); //diametro para circulos, lado para cuadrados
    let c = color(random(255), random(255), random(255), 100); // Color aleatorio con transparencia
    let speedX = random(-2, 2);
    let speedY = random(-2, 2);
    squares.push({ x, y, side, color: c, speedX, speedY });
    circles.push({ x, y, side, color: c, speedX, speedY });
  }
}

function draw() {
  background("#white");
 
  let titleAncho = numLetras * Quadrille.CELL_LENGTH
  let titleAlto = Quadrille.CELL_LENGTH; 
  let titleColor = color("green"); 
  fill(titleColor)
  rect(titleX, titleY, titleAncho, titleAlto)
  fill("white")
  textSize(tamLetra);
  textAlign(CENTER, CENTER);
  text(title, titleX + titleAncho / 2, titleY + titleAlto / 2)
  
  if (((gameEnded || gameWon)==false)){
    drawQuadrille(board,{x:0, y:Quadrille.CELL_LENGTH});
  }
  
  else{
    if (gameWon==true){
      //display ganaste
      background(color(50,100,150))
      for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        fill(circle.color);
        noStroke();
        ellipse(circle.x, circle.y, circle.side);
        circle.x += circle.speedX;
        circle.y += circle.speedY;
        
        if (circle.x < 0 || circle.x > width) {
          circle.speedX *= -1;
        }
        if (circle.y < 0 || circle.y > height) {
          circle.speedY *= -1;
        }
      }

    textSize(tamLetra);
    textAlign(CENTER, CENTER);
    fill("white");
    text("GANASTE", width / 2, height / 2);
      
    }
    else{
      //display perdiste
      background(color(150,50,50))
      for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        fill(square.color);
        noStroke();
        rect(square.x, square.y, square.side);
        square.x += square.speedX;
        square.y += square.speedY;
        
        if (square.x < 0 || square.x > width) {
          square.speedX *= -1;
        }
        if (square.y < 0 || square.y > height) {
          square.speedY *= -1;
        }
      }

    textSize(tamLetra);
    textAlign(CENTER, CENTER);
    fill("white");
    text("PERDISTE", width / 2, height / 2-2*tamLetra);
    textSize(tamLetra-10)
    text("La palabra correcta es: " + word, width / 2, height / 2 + 2*tamLetra)
    }
  }
  
}
  

function checkWord(){
  let splitWord=word.split('')
  //let checkedWord=splitWord
  //currentTry=currentTry.split('')
  //let correctas, cercanas
  
  for(let i=0; i<splitWord.length;i++){
     if (splitWord[i]==currentTry[i]){
       correctas[i]=true
       cercanas[i]=true
       splitWord[i]=' '
     } 
     else{
       correctas[i]=false
     }
  }
  //console.log(splitWord)
  for (let i=0;i<splitWord.length;i++){
    for (let j=0;j<splitWord.length;j++){
          if (splitWord[j]==currentTry[i]&&correctas[i]==false){
            cercanas[i]=true;
            splitWord[j]=' '
            break
          }
         else{
           cercanas[i]=false
         }
         
       }
    }

  //console.log(correctas,cercanas)
 return finishedTry(); 
}

function updateQuadrille(){
  
  typedWord=[]
  for (let i=0;i<currentTry.length;i++){
    pg=createGraphics(Quadrille.CELL_LENGTH,Quadrille.CELL_LENGTH)
    pg.background("white")
    pg.fill("black")
    pg.textSize(tamLetra);
    pg.textAlign(CENTER, CENTER);
    pg.text(currentTry[i], Quadrille.CELL_LENGTH / 2, Quadrille.CELL_LENGTH / 2)
    typedWord.push(pg)  
  }
  typedWord=createQuadrille([typedWord])
  /*contador=0;
  while (contador<board.height){
     if (board.isEmpty(contador,1)){
           break
         }
      contador+=1
   }
   */
    //console.log(contador)
    //drawQuadrille(typedWord,{x:0, y:Quadrille.CELL_LENGTH*(contador+1)})
    board.clear(currentRow)
    board=Quadrille.or(board,typedWord,currentRow,0)
    
}

function keyPressed() {
  
  if ((esLetra() && currentTry.length <numLetras) && (gameEnded || gameWon)==false) {
    append(currentTry, key);
    //console.log(currentTry)
    updateQuadrille()
  } 
  
  else if (keyCode == BACKSPACE) {
    currentTry = currentTry.slice(0, -1);
    updateQuadrille()
    //console.log(currentTry)
  } 
  
  else if (keyCode == ENTER && currentTry.length==numLetras) {
    //currentTry=currentTry.toUpperCase()
    return checkWord();
  }
}

function finishedTry(){
  
    if(currentRow==board.height-1){
      gameEnded=true     
    }
    
    //let rowToUpdate=createQuadrille(numLetras,1)
    let rowToUpdate=[]
    for(let i=0;i<numLetras;i++){
      let cellToUpdate=createGraphics(Quadrille.CELL_LENGTH,Quadrille.CELL_LENGTH)
      //let cellToUpdate=createQuadrille(currentTry[i])
      
      
      if (correctas[i]==true){
        //board.fill(contador,i,correct)
        cellToUpdate.background(correct)
        
          
      }
      else if(cercanas[i]==true){
        //board.fill(contador,i,close)
        cellToUpdate.background(close)
      }
      else{
        //board.fill(contador,i,wrong)
        cellToUpdate.background(wrong)
      }
      
    cellToUpdate.fill("white")
    cellToUpdate.textSize(tamLetra);
    cellToUpdate.textAlign(CENTER, CENTER);
    cellToUpdate.text(currentTry[i], Quadrille.CELL_LENGTH / 2, Quadrille.CELL_LENGTH / 2)
      //cellToUpdate.fill(currentTry[i])
      
      //value1=rowToUpdate.read(1,i)
      //rowToUpdate.replace(value1,cellToUpdate)
      //append(rowToUpdate,cellToUpdate)
      rowToUpdate.push(cellToUpdate)
      
      
    }
    let tempQuadrille=createQuadrille([rowToUpdate])
    board.clear(currentRow)
    board=Quadrille.or(board,tempQuadrille, currentRow,0)
    currentTry=[]
    
    let verificacion=true
    for (let i=0; i<correctas.length;i++){
      verificacion=verificacion && correctas[i]
    }
    if (verificacion==true){
      gameWon=true
    }
    correctas=[]
    cercanas=[]
    currentRow+=1
}
  
  function esLetra(){
    if (key>'`' && key<'{'){
      return true      
    }
    else{
      return false
    }
  }