function movePiece(pieces, scx, lscx, scy, lscy) {
    pieces[scx][scy] = pieces[lscx][lscy];
    pieces[scx][scy][2]++;
    eraseCell(pieces, lscx, lscy)
    printPieces(pieces);

}

function enPassant(pieces, scx, lscx, scy, lscy) {
    let offsetx
    if (pieces[lscx][lscy][1] == "W") {
        offsetx = +1;
    } else {
        offsetx = -1
    }
    eraseCell(pieces, scx + offsetx, scy);
}