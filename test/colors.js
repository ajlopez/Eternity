
var eternity = require('../'),
    assert = require('assert');
    
// generates 3x3 with 2 colors and gray
    
var puzzle = eternity.createPuzzle(3, 3);
puzzle.generate(2);

var pieces = puzzle.getPieces();

assert.ok(pieces);
assert.ok(Array.isArray(pieces));
assert.equal(pieces.length, 3 * 3);

// it is a valid solution

assert.ok(puzzle.isValid());
    
// generates 4x4 with 3 colors and gray
    
var puzzle = eternity.createPuzzle(4, 4);
puzzle.generate(3);

var pieces = puzzle.getPieces();

assert.ok(pieces);
assert.ok(Array.isArray(pieces));
assert.equal(pieces.length, 4 * 4);

// it is a valid solution

assert.ok(puzzle.isValid());
    
// generates 5x5 with 6 colors and gray
    
var puzzle = eternity.createPuzzle(5, 5);
puzzle.generate(6);

var pieces = puzzle.getPieces();

assert.ok(pieces);
assert.ok(Array.isArray(pieces));
assert.equal(pieces.length, 5 * 5);

// it is a valid solution

assert.ok(puzzle.isValid());
    
// generates 18x18 with 10 colors and gray
    
var puzzle = eternity.createPuzzle();
puzzle.generate(10);

var pieces = puzzle.getPieces();

assert.ok(pieces);
assert.ok(Array.isArray(pieces));
assert.equal(pieces.length, 18 * 18);

// it is a valid solution

assert.ok(puzzle.isValid());
