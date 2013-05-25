
var eternity = require('../'),
    assert = require('assert');
    
// create puzzle initial position

var puzzle = eternity.createPuzzle();
assert.ok(puzzle);
assert.equal(puzzle.getWidth(), 18);
assert.equal(puzzle.getHeight(), 18);

var positions = puzzle.getPiecePositions();

assert.ok(positions);
assert.equal(positions.length, 17 * 4);

var pieces = puzzle.getPieces();

assert.ok(pieces);
assert.equal(pieces.length, 17 * 4);
pieces.forEach(function (piece) {
    assert.ok(piece);
    assert.ok(Array.isArray(piece));
    assert.equal(piece.length, 4);
    assert.equal(piece[0], 0);
    assert.equal(piece[1], 0);
    assert.equal(piece[2], 0);
    assert.equal(piece[3], 0);
});

var width = puzzle.getWidth();
var height = puzzle.getHeight();

for (var x = 0; x < width; x++)
    for (var y = 0; y < height; y++) {
        var piece = puzzle.getPiece(x, y);
        if (x == 0 || x == width - 1 || y == 0 || y == height - 1) {
            assert.ok(piece);
            assert.ok(Array.isArray(piece));
            assert.equal(4, piece.length);
            assert.equal(0, piece[0]);
            assert.equal(0, piece[1]);
            assert.equal(0, piece[2]);
            assert.equal(0, piece[3]);
        }
        else
            assert.equal(piece, null);
    }

// create small puzzle initial position

var spuzzle = eternity.createPuzzle(6, 4);
assert.ok(spuzzle);
assert.equal(spuzzle.getWidth(), 6);
assert.equal(spuzzle.getHeight(), 4);

