
var eternity = require('../'),
    assert = require('assert');
    
// generates 5x5 with 6 colors and gray
    
var initial = eternity.createPuzzle(5, 5);
initial.generate(6);

var puzzle = eternity.createPuzzle(5, 5);

var pieces = puzzle.getPieces();
