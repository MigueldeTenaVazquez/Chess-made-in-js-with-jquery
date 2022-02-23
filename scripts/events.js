lastSelectedPiece = undefined;

//Adds the events to the pieces
function addEvents(pieces) {
    $("#board td").click(function() {
        selectedCell = $(this).attr("id");
        let scx = +selectedCell.split("_")[1];
        let scy = +selectedCell.split("_")[0];
        let selectedPiece = pieces[scx][scy];
        //If the selected cell is marked as hint
        if (pieces[scx][scy][3]) {
            let lscx = +lastSelectedCell.split("_")[1];
            let lscy = +lastSelectedCell.split("_")[0];
            if (pieces[scx][scy][3] == 4) enPassant(pieces, scx, lscx, scy, lscy);
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