var path = require('path');
var test = require('tap').test;
var attachTestStorage = require('../fixtures/attach-test-storage');
var extract = require('../fixtures/extract');

var renderedTarget = require('../../src/sprites/rendered-target');
var runtime = require('../../src/engine/runtime');
var sb2 = require('../../src/import/sb2import');

test('spec', function (t) {
    t.type(sb2, 'function');
    t.end();
});

test('default', function (t) {
    // Get SB2 JSON (string)
    var uri = path.resolve(__dirname, '../fixtures/default.sb2');
    var file = extract(uri);

    // Create runtime instance & load SB2 into it
    var rt = new runtime();
    attachTestStorage(rt);
    sb2(file, rt).then(function (targets) {
        // Test
        t.type(file, 'string');
        t.type(rt, 'object');
        t.type(targets, 'object');

        t.ok(targets[0] instanceof renderedTarget);
        t.type(targets[0].id, 'string');
        t.type(targets[0].blocks, 'object');
        t.type(targets[0].variables, 'object');
        t.type(targets[0].lists, 'object');

        t.equal(targets[0].isOriginal, true);
        t.equal(targets[0].currentCostume, 0);
        t.equal(targets[0].isOriginal, true);
        t.equal(targets[0].isStage, true);

        t.ok(targets[1] instanceof renderedTarget);
        t.type(targets[1].id, 'string');
        t.type(targets[1].blocks, 'object');
        t.type(targets[1].variables, 'object');
        t.type(targets[1].lists, 'object');

        t.equal(targets[1].isOriginal, true);
        t.equal(targets[1].currentCostume, 0);
        t.equal(targets[1].isOriginal, true);
        t.equal(targets[1].isStage, false);
        t.end();
    });
});
