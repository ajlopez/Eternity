
var eternity = require('../'),
    assert = require('assert');
    
var puzzle = eternity.createPuzzle();
puzzle.generate(6);

var pieces = puzzle.getPieces();

assert.ok(pieces);
assert.ok(Array.isArray(pieces));
assert.equal(pieces.length, 18 * 18);

