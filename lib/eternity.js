
'use strict';

if (typeof simpleboard === 'undefined')
    var simpleboard = require('simpleboard');

var eternity = (function () {
    var checks = [[-1, 0, 0, 2], [0, -1, 1, 3], [1, 0, 2, 0], [0, 1, 3, 1]];
    var nchecks = checks.length;
    
    function Puzzle() {
        var board = createBoard();
        
        this.getPiece = function (x, y) {
            return board.getContent(x, y);
        };
        
        this.getPieces = function () {
            return board.getPositions();
        };
        
        this.getWidth = function () {
            return board.getWidth();
        };
        
        this.getHeight = function () {
            return board.getHeight();
        };
        
        this.match = function (x, y, piece) {
            var oldpiece = board.getContent(x, y);
            
            if (oldpiece)
                return null;
                
            var left = board.getContent(x - 1, y);
            var top = board.getContent(x, y - 1);
            var right = board.getContent(x + 1, y);
            var bottom = board.getContent(x, y + 1);
            
            for (var result = match(piece, left, top, right, bottom), k = 0; k < 4; k++) {
                if (result)
                    return result;
                    
                if (k < 3) {
                    piece = rotate(piece);
                    result = match(piece, left, top, right, bottom);
                }
            }
            
            return null;
        };
    }
    
    function match(piece, left, top, right, bottom) {
        if (left && left[2] !== piece[0])
            return null;

        if (top && top[3] !== piece[1])
            return null;

        if (right && right[0] !== piece[2])
            return null;

        if (bottom && bottom[1] !== piece[3])
            return null;

        return piece;
    }
    
    function rotate(piece) {
        return [piece[1], piece[2], piece[3], piece[0]];
    }
    
    function createBoard() {
        var board = simpleboard.createBoard(18, 18);
        
        for (var x = 0; x < 18; x++) {
            board.putContent(x, 0, [0, 0, 0, 0]);
            board.putContent(x, 17, [0, 0, 0, 0]);
        }
        
        for (var y = 1; y < 17; y++) {
            board.putContent(0, y, [0, 0, 0, 0]);
            board.putContent(17, y, [0, 0, 0, 0]);
        }
        
        return board;
    }

    var result = {
        createPuzzle: function () { return new Puzzle(); }
    };

    return result;
})();

if (typeof window === 'undefined') {
	module.exports = eternity;
}
