for (let i = 0; i < BOARDSIZE; i++) {
    if (i >= 2 && i <= 5) continue;
    color = i < 3 ? "B" : "W";
    if (i == 0 || i == 7) {
        pieces[i][0] = pieces[i][7] = "R" + color;
        pieces[i][1] = pieces[i][6] = "N" + color;
        pieces[i][2] = pieces[i][5] = "B" + color;
        pieces[i][3] = "Q" + color;
        pieces[i][4] = "K" + color;
    } else {
        for (let j = 0; j < BOARDSIZE; j++) {
            pieces[i][j] = "P" + color;
        }
    }
}