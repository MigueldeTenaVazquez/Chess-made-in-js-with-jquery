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
          let maxSize
          if(pieceType=="P"){
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
            vectorOffsety = new Array(-1, +1);
            for (let i = 0; i < 2; i++) {
              offsety = vectorOffsety[i];
              if (checkCoordinates(scx, offsetx, scy, offsety) && checkPiece(pieces, scx, offsetx, scy, offsety) && !checkPieceColor(pieces, scx, offsetx, scy, offsety, pieceColor)) {
                selectTd(scx, offsetx, scy, offsety).addClass("hintEat");
              }
            }
          }
          switch (pieceType) {
            case "R":
              maxSize = 8;
              vectorOffsetx = new Array(-1, 1, 0, 0);
              vectorOffsety = new Array(0, 0, -1, 1);
              break;
            case "N":
              maxSize = 1;
              vectorOffsetx = new Array(-1, -2, +1, +2, -1, -2, +1, +2);
              vectorOffsety = new Array(-2, -1, -2, -1, +2, +1, +2, +1);
              break;
            case "B":
              maxSize = 8
              vectorOffsetx = new Array(-1, 1, -1, 1);
              vectorOffsety = new Array(-1, -1, 1, 1);
              break;
            case "K":
              maxSize = 1
              vectorOffsetx = new Array(-1, 1, -1, 1, -1, 1, 0, 0);
              vectorOffsety = new Array(-1, -1, 1, 1, 0, 0, -1, 1);
              break;
            case "Q":
              maxSize = 8;
              vectorOffsetx = new Array(-1, 1, -1, 1, -1, 1, 0, 0);
              vectorOffsety = new Array(-1, -1, 1, 1, 0, 0, -1, 1);
              break;
          }
          pieceMovement(pieces, scx, offsetx, scy, offsety, pieceColor, vectorOffsetx, vectorOffsety, maxSize);
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
