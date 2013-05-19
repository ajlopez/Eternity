
var eternity = require('../'),
    assert = require('assert');
    
// create puzzle initial position

var puzzle = eternity.createPuzzle();

// accepts gray pieces

var width = puzzle.getWidth();
var height = puzzle.getHeight();

for (var x = 0; x < width; x++)
    for (var y = 0; y < height; y++) {
        if (x == 0 || x == width - 1 || y == 0 || y == height - 1)
            assert.equal(puzzle.acceptPiece(x, y, [0, 0, 0, 0]), false);
        else
            assert.ok(puzzle.acceptPiece(x, y, [0, 0, 0, 0]));
    }

// accepts four color piece in inner area

for (var x = 2; x < width - 2; x++)
    for (var y = 2; y < height - 2; y++)
        assert.ok(puzzle.acceptPiece(x, y, [1, 2, 3, 4]));
