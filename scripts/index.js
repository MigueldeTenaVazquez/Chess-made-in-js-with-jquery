lastSelectedPiece = undefined;

//Prints the pieces in the board
function printPieces(pieces) {
  console.log(printConsoleMatrix(pieces, 0));
  console.log(printConsoleMatrix(pieces, 1));
  console.log(printConsoleMatrix(pieces, 2));
  //The content of every cell is erased
  $("td").each(function (n) {
    $(this).html(null);
  });

  //Adds a image to every cell that contais a piece in the piece matrix
  for (let i = 0; i < BOARDSIZE; i++) {
    for (let j = 0; j < BOARDSIZE; j++) {
      if (pieces[i][j][0]) {
        $("#board td[id = " + j + "_" + i + "]").html('<img src="xadrez/' + pieces[i][j][0] + pieces[i][j][1] + '.png">');
      }
    }
  }
}

//Adds the events to the pieces
function addEvents(pieces) {
  $("#board td").click(function () {
    selectedCell = $(this).attr("id");
    let scx = +selectedCell.split("_")[1];
    let scy = +selectedCell.split("_")[0];
    let selectedPiece = pieces[scx][scy];
    //If the selected cell is marked as hint
    if (pieces[scx][scy][3]) {
      let lscx = +lastSelectedCell.split("_")[1];
      let lscy = +lastSelectedCell.split("_")[0];
      if(pieces[scx][scy][3]==4) enPassant(pieces, scx, lscx, scy, lscy);
      movePiece(pieces, scx, lscx, scy, lscy);
      clearAllHint(pieces);
      turn = turn == "W" ? "B" : "W";
    } else {
      clearAllHint(pieces);
      if (selectedPiece) {
        let pieceType = selectedPiece[0];
        let pieceColor = selectedPiece[1];
        let pieceMove = selectedPiece[2];
        if (pieceColor == turn) {
          pieceHint(pieces, scx, scy, pieceType, pieceColor, pieceMove);
        }
      }
      console.log(printConsoleMatrix(pieces, 3));
    }
    
    lastSelectedCell = selectedCell;
  });
}

function checkCoordinates(x, offsetx, y, offsety) {
  return (x + offsetx >= 0) && (x + offsetx < 8) && (y + offsety >= 0) && (y + offsety < 8);
}

function selectTd(x, offsetx, y, offsety) {
  return $(`td[id = ${y + offsety}_${x + offsetx}]`);
}

function checkPiece(pieces, x, offsetx, y, offsety) {
  return pieces[x + offsetx][y + offsety][0];
}

function checkPieceColor(pieces, x, offsetx, y, offsety, pieceColor) {
  if (checkPiece(pieces, x, offsetx, y, offsety)) {
    return pieces[x + offsetx][y + offsety][1] == pieceColor;
  } else {
    return false;
  }
}

function addHint(pieces, x, offsetx, y, offsety, hint){
  let text=""
  if(hint){
    if(hint == 1){
      text="hint";
    }else if(hint == 2){
      text="eat";
    }else if (hint == 3){
      text="check";
    }else if (hint == 4){
      text="eat"
    }else{
      alert.log("algo va mal")
    }
    selectTd(x, offsetx, y, offsety).addClass(text);
    pieces[x + offsetx][y + offsety][3]=hint;
  }else{
    alert("algo va mal")
  }
}

function clearAllHint(pieces) {
  $("#board td").each(function () {
    $(this).removeClass("hint");
    $(this).removeClass("eat");
    $(this).removeClass("check");
  });
  for (let i = 0; i < BOARDSIZE; i++){
    for (let j = 0; j < BOARDSIZE; j++){
      pieces[i][j][3]=0;
    }
  }
  
}

function pieceHint(pieces, x, y, pieceType, pieceColor, pieceMove) {
  let offsetx;
  let offsety;
  let vectorOffsetx;
  let vectorOffsety;
  let maxSize;
  switch (pieceType) {
    case "R":
      vectorOffsetx = new Array(-1, +1, +0, +0);
      vectorOffsety = new Array(+0, +0, -1, +1);
      maxSize = 8;
      break;
    case "N":
      vectorOffsetx = new Array(-1, -2, +1, +2, -1, -2, +1, +2);
      vectorOffsety = new Array(-2, -1, -2, -1, +2, +1, +2, +1);
      maxSize = 1;
      break;
    case "B":
      vectorOffsetx = new Array(-1, +1, -1, +1);
      vectorOffsety = new Array(-1, -1, +1, +1);
      maxSize = 8;
      break;
    case "K":
      vectorOffsetx = new Array(-1, +1, -1, +1, -1, +1, +0, +0);
      vectorOffsety = new Array(-1, -1, +1, +1, +0, +0, -1, +1);
      maxSize = 1;
      break;
    case "Q":
      vectorOffsetx = new Array(-1, +1, -1, +1, -1, +1, +0, +0);
      vectorOffsety = new Array(-1, -1, +1, +1, +0, +0, -1, +1);
      maxSize = 8;
      break;
  }
  if(pieceType == "P"){
    pawnHint(pieces, x, y, pieceColor, pieceType, pieceMove);
  }else{
    for (let i = 0; i < vectorOffsetx.length; i++) {
      offsetx = vectorOffsetx[i];
      offsety = vectorOffsety[i];
      let j = 0;
      while (checkCoordinates(x, offsetx, y, offsety) && (j < maxSize)) {
        if (!checkPiece(pieces, x, offsetx, y, offsety)) {
          hint=1;
          addHint(pieces, x, offsetx, y, offsety, hint);
        } else if (!checkPieceColor(pieces, x, offsetx, y, offsety, pieceColor)) {
          hint=2;
          addHint(pieces, x, offsetx, y, offsety, hint);
          break;
        } else {
          break;
        }
  
        if (offsetx > 0) {
          offsetx++;
        } else if (offsetx < 0) {
          offsetx--;
        }
  
        if (offsety > 0) {
          offsety++;
        } else if (offsety < 0) {
          offsety--;
        }
        j++;
      }
    }
  }
}

function pawnHint(pieces, x, y, pieceColor, pieceType, pieceMove){
  
  let offsetx = pieceColor == "W" ? -1 : 1;
  let offsety = 0;
  let hint;
  if (pieceMove == 0) {
    if (checkCoordinates(x, offsetx * 2, y, offsety) && !checkPiece(pieces, x, offsetx * 2, y, offsety)) {
      hint=1;
      addHint(pieces, x, offsetx * 2, y, offsety, hint);
    }
  }
  if (checkCoordinates(x, offsetx, y, offsety) && !checkPiece(pieces, x, offsetx, y, offsety)) {
    hint=1;
    addHint(pieces, x, offsetx, y, offsety, hint);
  }
  vectorOffsety = new Array(+1, -1);
  for (let i = 0; i < 2; i++) {
    offsety = vectorOffsety[i];
    if (checkCoordinates(x, offsetx, y, offsety) && checkPiece(pieces, x, offsetx, y, offsety) && !checkPieceColor(pieces, x, offsetx, y, offsety, pieceColor)) {
      hint=2;
      addHint(pieces, x, offsetx, y, offsety, hint);
    }
  }
  vectorOffsety = new Array(+1, -1);
  for (let i = 0; i < 2; i++) {
    offsety = vectorOffsety[i];
    if (checkCoordinates(x, 0, y, offsety) && checkPiece(pieces, x, 0, y, offsety) && !checkPieceColor(pieces, x, 0, y, offsety, pieceColor) && pieces[x+0][y+offsety][0]==pieceType) {
      hint=4;
      addHint(pieces, x, offsetx, y, offsety, hint);
    }
  }
}

function movePiece(pieces, scx, lscx, scy, lscy){
  pieces[scx][scy] = pieces[lscx][lscy];
  pieces[scx][scy][2]++;
  eraseCell(pieces, lscx, lscy)
  printPieces(pieces);
  
}

function printConsoleMatrix(pieces, n){
  let text = "";
  for(let i=0; i < BOARDSIZE; i++){
      for (let j=0; j < BOARDSIZE; j++){
        text+=pieces[i][j][n]+" "
      }
      text += "\n"
  }
  return text;
}

function enPassant(pieces, scx, lscx, scy, lscy){
  let offsetx
  if(pieces[lscx][lscy][1]=="W"){
    offsetx = +1;
  }else{
    offsetx = -1
  }
  eraseCell(pieces, scx + offsetx, scy);
}

function eraseCell(pieces, x, y){
  pieces[x][y] = new Array(0,0,0,0);
}
