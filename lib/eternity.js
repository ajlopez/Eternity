
'use strict';

if (typeof simpleboard === 'undefined')
    var simpleboard = require('simpleboard');

var eternity = (function () {
    function Puzzle(width, height) {
        width = width || 18;
        height = height || 18;
    
        var board = createBoard(width, height);
        
        this.getPiece = function (x, y) {
            return board.getContent(x, y);
        };

        this.getPiecePositions = function () {
            return board.getPositions();
        };
        
        this.getPieces = function() {
            var pieces = [];
            
            board.getPositions().forEach(function(position) {
                pieces.push(position.content);
            });
            
            return pieces;
        }

        this.getWidth = function () {
            return width;
        };

        this.getHeight = function () {
            return height;
        };

        this.matchSet = function (pieces) {
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
        
        this.generate = function(ncolors) { 
            var colors = generateColors(ncolors, (width - 2) * (height - 2) * 2);
            
            for (var x = 1; x < width - 1; x++)
                for (var y = 1; y < height - 1; y++) {
                    var piece = [-1, -1, -1, -1];
                    var pos = ((x - 1) + (y - 1) * (width - 3)) * 2;

                    if (x === 1)
                        piece[0] = 0;
                    else
                        piece[0] = colors[pos - 2];
                        
                    if (x === width - 2)
                        piece[2] = 0;
                    else
                        piece[2] = colors[pos];
                        
                    if (y === 1)
                        piece[1] = 0;
                    else
                        piece[1] = colors[pos - (width - 3) * 2 + 1];
                        
                    if (y === height - 2)
                        piece[3] = 0;
                    else
                        piece[3] = colors[pos + 1];
                        
                    board.putContent(x, y, piece);
                }
        };
        
        this.isValid = function () {
            for (var x = 1; x < width - 1 ; x++)
                for (var y = 1; y < height - 1; y++) {
                    var piece = this.getPiece(x, y);
                    
                    if (!piece)
                        continue;
                        
                    var left = board.getContent(x - 1, y);
                    var top = board.getContent(x, y - 1);
                    var right = board.getContent(x + 1, y);
                    var bottom = board.getContent(x, y + 1);

                    if (!match(piece, left, top, right, bottom))
                        return false;
                }
                
            return true;
        };
    }
    
    function generateColors(ncolors, ntotal)
    {
        var colors = [];
        
        for (var k = 0; k < ntotal; k++)
            colors[k] = (k % ncolors) + 1;
        
        return shuffle(colors);
    }
    
    // http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
    
    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
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
    
    function createBoard(width, height) {
        var board = simpleboard.createBoard(width, height);
        
        for (var x = 0; x < width; x++) {
            board.putContent(x, 0, [0, 0, 0, 0]);
            board.putContent(x, height - 1, [0, 0, 0, 0]);
        }
        
        for (var y = 1; y < height - 1; y++) {
            board.putContent(0, y, [0, 0, 0, 0]);
            board.putContent(width - 1, y, [0, 0, 0, 0]);
        }
        
        return board;
    }

    var result = {
        createPuzzle: function (width, height) { return new Puzzle(width, height); }
    };

    return result;
})();

if (typeof window === 'undefined') {
	module.exports = eternity;
}
