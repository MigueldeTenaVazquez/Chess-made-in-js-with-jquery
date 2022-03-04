function pieceHint(pieces, x, y, pieceType, pieceColor, pieceMove) {
    let offsetx;
    let offsety;
    let vectorOffsetx;
    let vectorOffsety;
    let maxSize;
    switch (pieceType) {
        case "P":
            pawnHint(pieces, x, y, pieceColor, pieceType, pieceMove);
            break;
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
    if (pieceType != "P") {
        for (let i = 0; i < vectorOffsetx.length; i++) {
            offsetx = vectorOffsetx[i];
            offsety = vectorOffsety[i];
            let j = 0;
            while (checkCoordinates(x, offsetx, y, offsety) && (j < maxSize)) {
                if (!checkPiece(pieces, x, offsetx, y, offsety)) {
                    hint = 1;
                    addHint(pieces, x, offsetx, y, offsety, hint);
                } else if (!checkPieceColor(pieces, x, offsetx, y, offsety, pieceColor)) {
                    hint = 2;
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

function addHint(pieces, x, offsetx, y, offsety, hint) {
    let text = ""
    if (hint) {
        switch (hint) {
            case 1:
                text = "hint";
                break;
            case 2:
                text = "eat";
                break;
            case 3:
                text = "check";
                break;
            case 4:
                text = "eat"
                break;
            case 5:
                text = "castling"
                break;
            default:
                alert.log("algo va mal");
        }
        selectTd(x, offsetx, y, offsety).addClass(text);
        pieces[x + offsetx][y + offsety][3] = hint;
    } else {
        alert("algo va mal")
    }
}

function clearAllHint(pieces) {
    $("#board td").each(function () {
        $(this).removeClass("hint");
        $(this).removeClass("eat");
        $(this).removeClass("check");
    });
    for (let i = 0; i < BOARDSIZE; i++) {
        for (let j = 0; j < BOARDSIZE; j++) {
            pieces[i][j][3] = 0;
        }
    }

}

function pawnHint(pieces, x, y, pieceColor, pieceType, pieceMove) {

    let offsetx = pieceColor == "W" ? -1 : 1;
    let offsety = 0;
    let hint;
    if (pieceMove == 0) {
        if (checkCoordinates(x, offsetx * 2, y, offsety) && !checkPiece(pieces, x, offsetx * 2, y, offsety)) {
            hint = 1;
            addHint(pieces, x, offsetx * 2, y, offsety, hint);
        }
    }
    if (checkCoordinates(x, offsetx, y, offsety) && !checkPiece(pieces, x, offsetx, y, offsety)) {
        hint = 1;
        addHint(pieces, x, offsetx, y, offsety, hint);
    }
    vectorOffsety = new Array(+1, -1);
    for (let i = 0; i < 2; i++) {
        offsety = vectorOffsety[i];
        if (checkCoordinates(x, offsetx, y, offsety) && checkPiece(pieces, x, offsetx, y, offsety) && !checkPieceColor(pieces, x, offsetx, y, offsety, pieceColor)) {
            hint = 2;
            addHint(pieces, x, offsetx, y, offsety, hint);
        }
    }
    vectorOffsety = new Array(+1, -1);
    for (let i = 0; i < 2; i++) {
        offsety = vectorOffsety[i];
        console.log(pieceMove)
        if (checkCoordinates(x, 0, y, offsety) && checkPiece(pieces, x, 0, y, offsety) && !checkPieceColor(pieces, x, 0, y, offsety, pieceColor) && checkPiece(pieces, x, 0, y, offsety) && checkPieceMove(pieces, x, 0, y, offsety, 1)) {
            hint = 4;
            addHint(pieces, x, offsetx, y, offsety, hint);
        }
    }
}