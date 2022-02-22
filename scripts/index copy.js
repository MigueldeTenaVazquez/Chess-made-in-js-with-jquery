lastSelectedPiece = undefined;

//Prints the pieces in the board
function printPieces(pieces) {
  //The content of every cell is erased
  $("td").each(function (n) {
    $(this).html(null);
  });

  //
  for (let i = 0; i < BOARDSIZE; i++) {
    for (let j = 0; j < BOARDSIZE; j++) {
      if (pieces[i][j] != null) {
        $("#board td[id = " + j + "_" + i + "]").html(
          '<img src="xadrez/' + pieces[i][j] + '.png">'
        );
      }
    }
  }
}

function addEvents(pieces) {
  $("#board td").click(function () {
    selectedCell = $(this).attr("id");
    let scx = +selectedCell.split("_")[1];
    let scy = +selectedCell.split("_")[0];
    let selectedPiece = pieces[scx][scy];
    if ($(this).hasClass("hint") || $(this).hasClass("hintEat")) {
      clearHint();
      let lscx = +lastSelectedCell.split("_")[1];
      let lscy = +lastSelectedCell.split("_")[0];
      pieces[scx][scy] = pieces[lscx][lscy];
      pieces[lscx][lscy] = null;
      printPieces(pieces);
      turn = turn == "W" ? "B" : "W";
    } else {
      clearHint();
      if (selectedPiece) {
        let pieceType = selectedPiece.charAt(0);
        let pieceColor = selectedPiece.charAt(1);
        let offset;
        if (pieceColor == turn) {
          let offsetx;
          let offsety;
          let vectorOffsetx;
          let vectorOffsety;
          let orientationx;
          let orientationy;
          switch (pieceType) {
            case "P":
              {
                offsetx = pieceColor == "W" ? -1 : 1;
                offsety = 0;
                if ($(this).attr("firstMove")) {
                  if (checkCoordinates(scx, offsetx*2, scy, offsety) && !checkPiece(pieces, scx, offsetx*2, scy, offsety)) {
                    selectTd(scx, offsetx*2, scy, offsety).addClass("hint");
                  }
                }
                if (checkCoordinates(scx, offsetx, scy, offsety) && !checkPiece(pieces, scx, offsetx, scy, offsety)) {
                  selectTd(scx, offsetx, scy, offsety).addClass("hint");
                }
                vectorOffsety = new Array(-1, -1);
                for(let i=0; i<2; i++){
                  offsety = vectorOffsety[i];
                  if (checkCoordinates(scx, offsetx, scy, offsety) && checkPiece(pieces, scx, offsetx, scy, offsety) && !checkPieceColor(pieces, scx, offsetx, scy, offsety, pieceColor)) {
                    selectTd(scx, offsetx, scy, offsety).addClass("hintEat");
                  }
                }
              }
              break;
            case "R":
              orientationx = new Array(-1, 1, 0, 0);
              orientationy = new Array(0, 0, -1, 1);
              for (let i=0; i<4; i++) {
                console.log("hola")
                offsetx = orientationx[i];
                offsety = orientationy[i];
                while(checkCoordinates(scx, offsetx, scy, offsety)){

                  if (checkPiece(pieces, scx, offsetx, scy, offsety)) {
                    selectTd(scx, offsetx, scy, offsety).addClass("hint");
                  } else if (!checkPieceColor(pieces, scx, offsetx, scy, offsety, pieceColor)) {
                    selectTd(scx, offsetx, scy, offsety).addClass("hintEat");
                    break;
                  }
                  if(offsetx>0){
                    
                  }
                }
              }
              
              for (let offset = -1; (scx + offset >= 0); offset--) {
                if (!(pieces[scx + offset][scy])) {
                  $(`td[id = ${scy}_${scx + offset}]`).addClass("hint");
                } else if (pieces[scx + offset][scy].charAt(1) != pieceColor) {
                  $(`td[id = ${scy}_${scx + offset}]`).addClass("hintEat");
                  break;
                } else {
                  break;
                }
              }
              for (let offset = 1; (scy + offset < 8); offset++) {
                if (!(pieces[scx][scy + offset])) {
                  $(`td[id = ${scy + offset}_${scx}]`).addClass("hint");
                } else if (pieces[scx][scy + offset].charAt(1) != pieceColor) {
                  $(`td[id = ${scy + offset}_${scx}]`).addClass("hintEat");
                  break;
                } else {
                  break;
                }
              }
              for (let offset = -1; (scy + offset >= 0); offset--) {
                if (!(pieces[scx][scy + offset])) {
                  $(`td[id = ${scy + offset}_${scx}]`).addClass("hint");
                } else if (pieces[scx][scy + offset].charAt(1) != pieceColor) {
                  $(`td[id = ${scy + offset}_${scx}]`).addClass("hintEat");
                  break;
                } else {
                  break;
                }
              }
              
              break;
            case "N":
              {
                let offsetx
                let offsety
                offsetx = -1;
                offsety = -2;
                if ((scx + offsetx >= 0) && (scy + offsety >= 0)) {
                  if ((!(pieces[scx + offsetx][scy + offsety]))) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                  } else if (pieces[scx + offsetx][scy + offsety].charAt(1) != pieceColor) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hintEat");
                  }
                }
                offsetx = -2;
                offsety = -1;
                if ((scx + offsetx >= 0) && (scy + offsety >= 0)) {
                  if ((!(pieces[scx + offsetx][scy + offsety]))) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                  } else if (pieces[scx + offsetx][scy + offsety].charAt(1) != pieceColor) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hintEat");
                  }
                }
                offsetx = 1;
                offsety = -2;
                if ((scx + offsetx < 8) && (scy + offsety >= 0)) {
                  if ((!(pieces[scx + offsetx][scy + offsety]))) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                  } else if (pieces[scx + offsetx][scy + offsety].charAt(1) != pieceColor) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hintEat");
                  }
                }
                offsetx = 2;
                offsety = -1;
                if ((scx + offsetx < 8) && (scy + offsety >= 0)) {
                  if ((!(pieces[scx + offsetx][scy + offsety]))) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                  } else if (pieces[scx + offsetx][scy + offsety].charAt(1) != pieceColor) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hintEat");
                  }
                }
                offsetx = -1;
                offsety = 2;
                if ((scx + offsetx >= 0) && (scy + offsety < 8)) {
                  if ((!(pieces[scx + offsetx][scy + offsety]))) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                  } else if (pieces[scx + offsetx][scy + offsety].charAt(1) != pieceColor) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hintEat");
                  }
                }
                offsetx = -2;
                offsety = 1;
                if ((scx + offsetx >= 0) && (scy + offsety < 8)) {
                  if ((!(pieces[scx + offsetx][scy + offsety]))) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                  } else if (pieces[scx + offsetx][scy + offsety].charAt(1) != pieceColor) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hintEat");
                  }
                }
                offsetx = 1;
                offsety = 2;
                if ((scx + offsetx < 8) && (scy + offsety < 8)) {
                  if ((!(pieces[scx + offsetx][scy + offsety]))) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                  } else if (pieces[scx + offsetx][scy + offsety].charAt(1) != pieceColor) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hintEat");
                  }
                }
                offsetx = 2;
                offsety = 1;
                if ((scx + offsetx < 8) && (scy + offsety < 8)) {
                  if ((!(pieces[scx + offsetx][scy + offsety]))) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                  } else if (pieces[scx + offsetx][scy + offsety].charAt(1) != pieceColor) {
                    $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hintEat");
                  }
                }
              }
              break;
            case "B":
              for (let offsetx = -1, offsety = -1; (scx + offsetx >= 0) && (scy + offsety >= 0) && !(pieces[scx + offsetx][scy + offsety]); offsetx--, offsety--) {
                $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
              }
              for (let offsetx = -1, offsety = +1; (scx + offsetx >= 0) && (scy + offsety < 8) && !(pieces[scx + offsetx][scy + offsety]); offsetx--, offsety++) {
                $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
              }
              for (let offsetx = +1, offsety = -1; (scx + offsetx < 8) && (scy + offsety >= 0) && !(pieces[scx + offsetx][scy + offsety]); offsetx++, offsety--) {
                $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
              }
              for (let offsetx = +1, offsety = +1; (scx + offsetx < 8) && (scy + offsety < 8) && !(pieces[scx + offsetx][scy + offsety]); offsetx++, offsety++) {
                $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
              }
              break;
            case "K":
              {
                let offsetx
                let offsety
                offsetx = -1;
                offsety = -1;
                if ((scx + offsetx >= 0) && (scy + offsety >= 0) && (!(pieces[scx + offsetx][scy + offsety]))) {
                  $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                }
                offsetx = -1;
                offsety = 0;
                if ((scx + offsetx >= 0) && (!(pieces[scx + offsetx][scy + offsety]))) {
                  $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                }
                offsetx = -1;
                offsety = 1;
                if ((scx + offsetx >= 0) && (scy + offsety < 8) && (!(pieces[scx + offsetx][scy + offsety]))) {
                  $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                }
                offsetx = 0;
                offsety = -1;
                if ((scy + offsety >= 0) && (!(pieces[scx + offsetx][scy + offsety]))) {
                  $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                }
                offsetx = 0;
                offsety = 1;
                if ((scy + offsety < 8) && (!(pieces[scx + offsetx][scy + offsety]))) {
                  $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                }
                offsetx = 1;
                offsety = -1;
                if ((scx + offsetx < 8) && (scy + offsety >= 0) && (!(pieces[scx + offsetx][scy + offsety]))) {
                  $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                }
                offsetx = 1;
                offsety = 0;
                if ((scx + offsetx < 8) && (!(pieces[scx + offsetx][scy + offsety]))) {
                  $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                }
                offsetx = 1;
                offsety = 1;
                if ((scx + offsetx < 8) && (scy + offsety < 8) && (!(pieces[scx + offsetx][scy + offsety]))) {
                  $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
                }
              }
              break;
            case "Q":
              for (let offset = 1; (scx + offset < 8) && !(pieces[scx + offset][scy]); offset++) {
                $(`td[id = ${scy}_${scx + offset}]`).addClass("hint");
              }
              for (let offset = -1; (scx + offset >= 0) && !(pieces[scx + offset][scy]); offset--) {
                $(`td[id = ${scy}_${scx + offset}]`).addClass("hint");
              }
              for (let offset = 1; (scy + offset < 8) && !(pieces[scx][scy + offset]); offset++) {
                $(`td[id = ${scy + offset}_${scx}]`).addClass("hint");
              }
              for (let offset = -1; (scy + offset >= 0) && !(pieces[scx][scy + offset]); offset--) {
                $(`td[id = ${scy + offset}_${scx}]`).addClass("hint");
              }
              for (let offsetx = -1, offsety = -1; (scx + offsetx >= 0) && (scy + offsety >= 0) && !(pieces[scx + offsetx][scy + offsety]); offsetx--, offsety--) {
                $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
              }
              for (let offsetx = -1, offsety = +1; (scx + offsetx >= 0) && (scy + offsety < 8) && !(pieces[scx + offsetx][scy + offsety]); offsetx--, offsety++) {
                $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
              }
              for (let offsetx = +1, offsety = -1; (scx + offsetx < 8) && (scy + offsety >= 0) && !(pieces[scx + offsetx][scy + offsety]); offsetx++, offsety--) {
                $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
              }
              for (let offsetx = +1, offsety = +1; (scx + offsetx < 8) && (scy + offsety < 8) && !(pieces[scx + offsetx][scy + offsety]); offsetx++, offsety++) {
                $(`td[id = ${scy + offsety}_${scx + offsetx}]`).addClass("hint");
              }
              break;
          }
        }
      }
    }

    lastSelectedCell = selectedCell;
  });
}

function clearHint() {
  $("#board td").each(function (n) {
    $(this).removeClass("hint");
    $(this).removeClass("hintEat")
  });
}

function checkCoordinates(x, offsetx, y, offsety) {
  return (x + offsetx >= 0) && (x + offsetx < 8) && (y + offsety >= 0) && (y + offsety < 8);
}

function selectTd(x, offsetx, y, offsety){
  return $(`td[id = ${y + offsety}_${x + offsetx}]`);
}

function checkPiece(pieces, x, offsetx, y, offsety){
  return pieces[x + offsetx][y + offsety];
}

function checkPieceColor(pieces, x, offsetx, y, offsety, pieceColor){
  if(checkPiece(pieces, x, offsetx, y, offsety)){
    console.log(pieces[x + offsetx][y + offsety].charAt(1));
    console.log(pieceColor)
    return pieces[x + offsetx][y + offsety].charAt(1) == pieceColor;
  }else{
    return 0;
  }
}
/*
function addEvents(pieces) {
  $("#board td").click(function () {
    let id1 = $(this).attr("id");
    let x1 = +id1.split("_")[0];
    let y1 = +id1.split("_")[1];
    id2;
    x2;
    y2;
    if (!id2) {
      id2 = id1;
      x2 = +id2.split("_")[0];
      y2 = +id2.split("_")[1];
      showPosibleMove(pieces, x2, y2);
    } else if (id2 == id1) {
      id2 = null;
      removePosibleMove();
    } else {
      pieces = movePiece(pieces, selectedPieceId, posId);
      removePosibleMove();
      printPieces(pieces);
      id2 = null;
    }
  });
}

function showPosibleMove(pieces, x, y) {
  let piece = pieces[x][y].split("")[0];
  let color = pieces[x][y].split("")[1];
  if (piece == "P") {
    let signo;
    let end = x == 1 || x == 6 ? 3 : 2;
    if ((color == "W")) {
      if(!pieces[x-1][y-1]){
        for (let i = 1; i < end; i++){
          board.rows[x - i].cells[y].classList.add("hint")
        }
      }
      if(pieces[x-1][y-1]){
        if(pieces[x-1][y-1].split("")[1]=="B"){
          board.rows[x-1].cells[y-1].classList.add("hintEat")
        }
      }
      if(pieces[x-1][y+1]){
        if(pieces[x-1][y+1].split("")[1]=="B"){
          board.rows[x-1].cells[y+1].classList.add("hintEat")
        }
      }
    } else {
      for (let i = 1; i < end; i++){
        board.rows[x + i].cells[y].classList.add("hint");
      }
    }
  }else if(piece=="R"){
    for (let i = 1; board.rows[x].cells[y]; i++){
      board.rows[x - i].cells[y].classList.add("hint");
    }
  }
}

function removePosibleMove() {
  for (let i = 0; i < BOARDSIZE; i++) {
    for (let j = 0; j < BOARDSIZE; j++) {
      board.rows[i].cells[j].classList.remove("hint");
      board.rows[i].cells[j].classList.remove("hintEat");
    }
  }
}

function movePiece(pieces, idStart, idDestination) {
  if (
    board.rows[idDestination[0]].cells[idDestination[1]].classList.contains(
      "hint"
    )||board.rows[idDestination[0]].cells[idDestination[1]].classList.contains(
      "hintEat"
    )
  ) {
    pieces[idDestination[0]][idDestination[1]] = pieces[idStart[0]][idStart[1]];
    pieces[idStart[0]][idStart[1]] = null;
  }
  return pieces;
}
*/
