function noGrid() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0) return false;
        }
    }
    return true;
}

function getPosTop(i, j) {
    return 120 * i + 10;
}

function getPosLeft(i, j) {
    return 120 * j + 10;
}

function getBgColor(i, j) {
    switch (board[i][j]) {
        case 2:
            return "#eee4da";
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#9c0";
        case 1024:
            return "#33b5e5";
        case 2048:
            return "#09c";
        case 4096:
            return "#a6c";
        case 8192:
            return "#93c";
    }
    return "#000";
}

function getNumColor(i, j) {
    return board[i][j] <= 4 ? "#776e65" : "#fff";
}

function canMoveLeft() {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) return true;
        }
    }
    return false;
}

function canMoveUp() {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[j - 1][i] === 0 || board[j - 1][i] === board[j][i]) return true;
        }
    }
    return false;
}

function canMoveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) return true;
        }
    }
    return false;
}

function canMoveDown() {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[j + 1][i] === 0 || board[j + 1][i] === board[j][i]) return true;
        }
    }
    return false;
}

function canNotMove() {
    if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)) {
        return false;
    } else {
        return true;
    }
}