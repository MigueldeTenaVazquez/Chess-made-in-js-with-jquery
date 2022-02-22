turn = "W";
const BOARDSIZE = 8;

//Creates the initial state of the board
function startGame() {
    
    //Creates the board
    let text = "";
    text += '<table id="board">';
    for (let i = 0; i < BOARDSIZE; i++) {
        text += "<tr>";
        for (let j = 0; j < BOARDSIZE; j++) {
            text += "<td></td>";
        }
        text += "</tr>";
    }
    text += "</table>";
    $("#game").html(text);

    //Asigns ID to the cells of the board
    let row = 0;
    let col = 0;
    $("#board td").each(function (n) {
        $(this).attr("id", row + "_" + col);
        row++;
        if (! (row < 8)) {
            col++;
            row = 0;
        }
    });

    //Calculates the cell size so it fits the end user screen and adds color to the cells
    let gameHeight = $("#game").height();
    let gameWidth = $("#game").width();
    let cellSize = gameHeight > gameWidth ? gameWidth / 8 : gameHeight / 8;

    $("#board td").each(function(n){

        //Adds width and height to the cells
        $(this).width(cellSize + "px");
        $(this).height(cellSize + "px");

        //Adds color to the cells
        let x = +$(this).attr("id").split("_")[0];
        let y = +$(this).attr("id").split("_")[1];
        if((x+y)%2==0){
           $(this).addClass("colorBeige");
        }else{
           $(this).addClass("colorOlive");
        }
    });

    //Creates the piece matrix. Fills it with the initial state.
    let pieces = new Array(BOARDSIZE);
    let color;
    for (let i = 0; i < BOARDSIZE; i++) {
        pieces[i] = new Array(BOARDSIZE);
    }

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
    printPieces(pieces);

    //Adds the flag "first move" to the pawns
    for (let i = 0; i < BOARDSIZE; i++) {
        for (let j = 0; j < BOARDSIZE; j++) {
            if(pieces[i][j]){
                if (pieces[i][j].charAt(0) == "P") {
                    $("#board td[id = "+j+"_"+i+"]").attr("firstMove", true);
                }
            }
        }
    }

    addEvents(pieces);
}
