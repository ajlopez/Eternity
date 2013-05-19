
var eternity = require('../'),
    assert = require('assert');
    
// create board

var board = eternity.createBoard();
assert.ok(board);
assert.equal(board.getWidth(), 18);
assert.equal(board.getHeight(), 18);

var positions = board.getPositions();

assert.ok(positions);
assert.equal(positions.length, 17 * 4);
