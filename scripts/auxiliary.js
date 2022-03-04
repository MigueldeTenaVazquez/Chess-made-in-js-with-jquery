//Prints the pieces in the board
function printPieces(pieces) {
    console.log(printConsoleMatrix(pieces, 0));
    console.log(printConsoleMatrix(pieces, 1));
    console.log(printConsoleMatrix(pieces, 2));
    //The content of every cell is erased
    $("td").each(function(n) {
        $(this).html(null);
    });

    //Adds a image to every cell that contais a piece in the piece matrix
    for (let i = 0; i < BOARDSIZE; i++) {
        for (let j = 0; j < BOARDSIZE; j++) {
            if (pieces[i][j][0]) {
                $("#board td[id = " + j + "_" + i + "]").html('<img src="./images/' + pieces[i][j][0] + pieces[i][j][1] + '.png">');
            }
        }
    }
}

function eraseCell(pieces, x, y) {
    pieces[x][y] = new Array(0, 0, 0, 0);
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

function checkPieceMove(pieces, x, offsetx, y, offsety, move) {
    if (checkPiece(pieces, x, offsetx, y, offsety)) {
        console.log(pieces[x + offsetx][y + offsety][2], move)
        return pieces[x + offsetx][y + offsety][2] == move;
    } else {
        return false;
    }
}

function checkCoordinates(x, offsetx, y, offsety) {
    return (x + offsetx >= 0) && (x + offsetx < 8) && (y + offsety >= 0) && (y + offsety < 8);
}

function selectTd(x, offsetx, y, offsety) {
    return $(`td[id = ${y + offsety}_${x + offsetx}]`);
}

function printConsoleMatrix(pieces, n) {
    let text = "";
    for (let i = 0; i < BOARDSIZE; i++) {
        for (let j = 0; j < BOARDSIZE; j++) {
            text += pieces[i][j][n] + " "
        }
        text += "\n"
    }
    return text;
}