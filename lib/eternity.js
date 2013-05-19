
'use strict';

if (typeof simpleboard === 'undefined')
    var simpleboard = require('simpleboard');

var eternity = (function () {
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
