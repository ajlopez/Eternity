
var eternity = require('../'),
    assert = require('assert');
    
// create puzzle initial position

var puzzle = eternity.createPuzzle();

// match gray pieces

var width = puzzle.getWidth();
var height = puzzle.getHeight();

for (var x = 0; x < width; x++)
    for (var y = 0; y < height; y++) {
        if (x == 0 || x == width - 1 || y == 0 || y == height - 1)
            assert.equal(puzzle.match(x, y, [0, 0, 0, 0]), null);
        else
            assert.ok(puzzle.match(x, y, [0, 0, 0, 0]));
    }

// match four color piece in inner area

for (var x = 2; x < width - 2; x++)
    for (var y = 2; y < height - 2; y++) {
        var results = puzzle.match(x, y, [1, 2, 3, 4]);
        assert.ok(results);
        assert.ok(Array.isArray(results));
        assert.equal(results.length, 4);
    }

// match piece on top left corner

var result = puzzle.match(1, 1, [1, 2, 0, 0]);
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 1);
assert.equal(result[0][0], 0);
assert.equal(result[0][1], 0);
assert.equal(result[0][2], 1);
assert.equal(result[0][3], 2);

// match piece on top right corner

var result = puzzle.match(16, 1, [1, 2, 0, 0]);
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 1);
assert.equal(result[0][0], 2);
assert.equal(result[0][1], 0);
assert.equal(result[0][2], 0);
assert.equal(result[0][3], 1);

// match piece on border

var result = puzzle.match(2, 1, [1, 2, 3, 0]);
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 1);
assert.equal(result[0][0], 3);
assert.equal(result[0][1], 0);
assert.equal(result[0][2], 1);
assert.equal(result[0][3], 2);

// match four colour piece in inner cell

var result = puzzle.match(3, 4, [1, 2, 3, 4]);
assert.ok(result);
assert.ok(Array.isArray(result));
assert.equal(result.length, 4);

// match pieces at top left corner

var matches = puzzle.matchPieces(1, 1, [[1, 2, 0, 0], [3, 4, 0, 0], [1, 2, 3, 4]]);
assert.ok(matches);
assert.ok(Array.isArray(matches));
assert.equal(matches.length, 2);
assert.equal(matches[0][0], 0);
assert.equal(matches[0][1], 0);
assert.equal(matches[0][2], 1);
assert.equal(matches[0][3], 2);
assert.equal(matches[1][0], 0);
assert.equal(matches[1][1], 0);
assert.equal(matches[1][2], 3);
assert.equal(matches[1][3], 4);