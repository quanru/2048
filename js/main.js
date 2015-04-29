$(document).ready(function() {
    newGame();
    $("#newGame").click(newGame);
});
$(document).keydown(inputNav);
var board = [],
    score;

function newGame() {
    init();
    genNum();
    genNum();
}

function init() {
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            $("#container").append('<div class = "gridNum" id = "grid-num-' + i + '-' + j + '"></div>');
            var gridNum = $('#grid-num-' + i + '-' + j);
            gridNum.css({
                    'width':'0',
                    'height':'0'
                });
        }
    }
    score = 0;
}

function genNum() {
    if (noGrid()) {
        return false;
    } else {
        var nonNull = [];
        for (var m = 0; m < 4; m++) {
            for (var n = 0; n < 4; n++) {
                if (board[m][n] === 0) {
                    nonNull.push(m + ' ' + n);
                }
            }
        }
        var randomPos = parseInt(Math.random() * (nonNull.length - 1));
        x = nonNull[randomPos].substring(0, 1);
        y = nonNull[randomPos].substring(2);
        board[x][y] = Math.random() > 0.5 ? 2 : 4;
       numShowupAnimation( x, y, board[x][y]);
    }
    return true;
}

function updateBoard() {
    $(".gridNum").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#container").append('<div class = "gridNum" id = "grid-num-' + i + '-' + j + '"></div>');
            var gridNum = $('#grid-num-' + i + '-' + j);
            if (board[i][j] !== 0) {
                gridNum.css({
                        'backgroundColor': getBgColor( i, j),
                        'color': getNumColor( i, j ),
                        'top': getPosTop( i, j ),
                        'left': getPosLeft( i, j ),
                    });
                gridNum.text(board[i][j]);
            }
            else{
                gridNum.css({
                    'width':'0',
                    'height': '0'
                });
            }
        }
    }
}

function inputNav(event) {
    switch (event.keyCode) {
        case 37: //left
            if (canMoveLeft()) {
                moveLeft();
            }
            break;
        case 38: //up
            if (canMoveUp()) {
                moveUp();
            }
            break;
        case 39: //right
            if (canMoveRight()) {
                moveRight();
            }
            break;
        case 40: //down
            if (canMoveDown()) {
                moveDown();
            }
            break;
        default:
            break;
    }
    updateBoard();
    updateScore(score);
    genNum();
    isGameOver();
}

function isGameOver() {
    if (canNotMove()) alert("Game Over!");
}

function moveLeft() {
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j > 0; j--) {
            if (board[i][j] !== 0) {
                if (board[i][j - 1] === 0) {
                    board[i][j - 1] = board[i][j];
                    board[i][j] = 0;
                    moveLeft();
                } else if (board[i][j - 1] == board[i][j]) {
                    board[i][j - 1] *= 2;
                    board[i][j] = 0;
                    score += board[i][j - 1];
                    moveLeft();
                }
            }
        }
    }
    return true;
}

function moveUp() {
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j > 0; j--) {
            if (board[j][i] !== 0) {
                if (board[j - 1][i] === 0) {
                    board[j - 1][i] = board[j][i];
                    board[j][i] = 0;
                    moveUp();
                } else if (board[j - 1][i] == board[j][i]) {
                    board[j - 1][i] *= 2;
                    board[j][i] = 0;
                    score += board[j - 1][i];
                    moveUp();
                }
            }
        }
    }
    return true;
}

function moveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] !== 0) {
                if (board[i][j + 1] === 0) {
                    board[i][j + 1] = board[i][j];
                    board[i][j] = 0;
                    moveRight();
                } else if (board[i][j + 1] == board[i][j]) {
                    board[i][j + 1] *= 2;
                    board[i][j] = 0;
                    score += board[i][j + 1];
                    moveRight();
                }
            }
        }
    }
    return true;
}

function moveDown() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[j][i] !== 0) {
                if (board[j + 1][i] === 0) {
                    board[j + 1][i] = board[j][i];
                    board[j][i] = 0;
                    moveDown();
                } else if (board[j + 1][i] == board[j][i]) {
                    board[j + 1][i] *= 2;
                    board[j][i] = 0;
                    score += board[j + 1][i];
                    moveDown();
                }
            }
        }
    }
    return true;
}

function numShowupAnimation ( posx, posy, num ) {
    var numEle = $('#grid-num-' + posx + '-' + posy );
    numEle.css({
        'backgroundColor': getBgColor( posx, posy),
        'color': getNumColor( posx, posy ),
        'top': getPosTop( posx, posy ),
        'left': getPosLeft( posx, posy ),
        'width': '0',
        'height': '0'
    });
    numEle.text( num );

    numEle.animate({
        width:"100px",
        height:"100px"
    },150);
}

function updateScore(score) {
    $("#score").text("score:" + score);
}