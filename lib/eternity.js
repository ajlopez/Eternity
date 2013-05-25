
'use strict';

if (typeof simpleboard === 'undefined')
    var simpleboard = require('simpleboard');

var eternity = (function () {
    function Puzzle() {
        var board = createBoard();
        
        this.getPiece = function (x, y) {
            return board.getContent(x, y);
        };

        this.getPiecePositions = function () {
            return board.getPositions();
        };

        this.getWidth = function () {
            return board.getWidth();
        };

        this.getHeight = function () {
            return board.getHeight();
        };

        this.matchSet = function (pieces) {
            var width = board.getWidth();
            var height = board.getHeight();
            var result = [];

            for (var x = 1; x < width - 1; x++)
                for (var y = 1; y < height - 1; y++) {
                    var matches = this.matchPieces(x, y, pieces);
                    if (matches && matches.length > 0)
                        result.push({ x: x, y: y, matches: matches });
                }

            return result;
        };

        this.matchPieces = function (x, y, pieces) {
            var matches = [];

            for (var n in pieces) {
                result = this.match(x, y, pieces[n]);
                
                if (result)
                    matches = matches.concat(result);
            }

            return matches;
        };

        this.match = function (x, y, piece) {
            var oldpiece = board.getContent(x, y);

            if (oldpiece)
                return null;

            var left = board.getContent(x - 1, y);
            var top = board.getContent(x, y - 1);
            var right = board.getContent(x + 1, y);
            var bottom = board.getContent(x, y + 1);

            var results = [];

            for (var result = match(piece, left, top, right, bottom), k = 0; k < 4; k++) {
                if (result)
                    results.push(result);

                if (k < 3) {
                    piece = rotate(piece);
                    result = match(piece, left, top, right, bottom);
                }
            }

            if (results.length === 0)
                return null;

            return results;
        };
    }

    function match(piece, left, top, right, bottom) {
        if (left && left[2] !== piece[0])
            return null;
        if (!left && piece[0] === 0)
            return null;

        if (top && top[3] !== piece[1])
            return null;
        if (!top && piece[1] === 0)
            return null;

        if (right && right[0] !== piece[2])
            return null;
        if (!right && piece[2] === 0)
            return null;

        if (bottom && bottom[1] !== piece[3])
            return null;
        if (!bottom && piece[3] === 0)
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
