
var eternity = require('../'),
    assert = require('assert');
    
// generates 4x4 with 6 colors and gray
    
var initial = eternity.createPuzzle(4, 4);
initial.generate(6);
var pieces = initial.getPieces();

var puzzle = eternity.createPuzzle(4, 4);

assert.ok(puzzle.solve(pieces));
assert.ok(puzzle.isValid());

