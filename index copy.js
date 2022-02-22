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
                  if (checkCoordinates(scx, offsetx * 2, scy, offsety) && !checkPiece(pieces, scx, offsetx * 2, scy, offsety)) {
                    selectTd(scx, offsetx * 2, scy, offsety).addClass("hint");
                  }
                }
                if (checkCoordinates(scx, offsetx, scy, offsety) && !checkPiece(pieces, scx, offsetx, scy, offsety)) {
                  selectTd(scx, offsetx, scy, offsety).addClass("hint");
                }
                vectorOffsety = new Array(-1, -1);
                for (let i = 0; i < 2; i++) {
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
              pieceMovement(pieces, scx, offsetx, scy, offsety, pieceColor, orientationx, orientationy, 8)
              break;
            case "N":
              orientationx = new Array(-1, -2, +1, +2, -1, -2, +1, +2);
              orientationy = new Array(-2, -1, -2, -1, +2, +1, +2, +1);
              pieceMovement(pieces, scx, offsetx, scy, offsety, pieceColor, orientationx, orientationy, 1)
              break;
            case "B":
              orientationx = new Array(-1, 1, -1, 1);
              orientationy = new Array(-1, -1, 1, 1);
              pieceMovement(pieces, scx, offsetx, scy, offsety, pieceColor, orientationx, orientationy, 8);
              break;
            case "K":
              orientationx = new Array(-1, 1, -1, 1, -1, 1, 0, 0);
              orientationy = new Array(-1, -1, 1, 1, 0, 0, -1, 1);
              pieceMovement(pieces, scx, offsetx, scy, offsety, pieceColor, orientationx, orientationy, 1);
              break;
            case "Q":
              orientationx = new Array(-1, 1, -1, 1, -1, 1, 0, 0);
              orientationy = new Array(-1, -1, 1, 1, 0, 0, -1, 1);
              pieceMovement(pieces, scx, offsetx, scy, offsety, pieceColor, orientationx, orientationy, 8);
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

function selectTd(x, offsetx, y, offsety) {
  return $(`td[id = ${y + offsety}_${x + offsetx}]`);
}

function checkPiece(pieces, x, offsetx, y, offsety) {
  return pieces[x + offsetx][y + offsety];
}

function checkPieceColor(pieces, x, offsetx, y, offsety, pieceColor) {
  if (checkPiece(pieces, x, offsetx, y, offsety)) {
    return pieces[x + offsetx][y + offsety].charAt(1) == pieceColor;
  } else {
    return 0;
  }
}

function pieceMovement(pieces, x, offsetx, y, offsety, pieceColor, orientationx, orientationy, maxSize) {
  for (let i = 0; i < orientationx.length; i++) {
    offsetx = orientationx[i];
    offsety = orientationy[i];
    let j = 0;
    while (checkCoordinates(x, offsetx, y, offsety) && (j < maxSize)) {
      if (!checkPiece(pieces, x, offsetx, y, offsety)) {
        selectTd(x, offsetx, y, offsety).addClass("hint");
      } else if (!checkPieceColor(pieces, x, offsetx, y, offsety, pieceColor)) {
        selectTd(x, offsetx, y, offsety).addClass("hintEat");
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
