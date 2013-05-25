
var eternity = require('../'),
    assert = require('assert');
    
// generates 4x4 with 6 colors and gray
    
var initial = eternity.createPuzzle(4, 4);
initial.generate(6);
var pieces = initial.getPieces();

var puzzle = eternity.createPuzzle(4, 4);

assert.ok(puzzle.solve(pieces));
assert.ok(puzzle.isValid());

// generates 5x5 with 8 colors and gray
    
var initial = eternity.createPuzzle(5, 5);
initial.generate(8);
var pieces = initial.getPieces();

var puzzle = eternity.createPuzzle(5, 5);

assert.ok(puzzle.solve(pieces));
assert.ok(puzzle.isValid());

// generates 6x6 with 12 colors and gray
    
var initial = eternity.createPuzzle(6, 6);
initial.generate(12);
var pieces = initial.getPieces();

var puzzle = eternity.createPuzzle(6, 6);

assert.ok(puzzle.solve(pieces));
assert.ok(puzzle.isValid());
