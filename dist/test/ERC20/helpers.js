// redo expectEvent to work with ethers
//     https://github.com/OpenZeppelin/openzeppelin-test-helpers/blob/master/src/expectEvent.js
//
// The MIT License (MIT)
// Copyright (c) 2018 OpenZeppelin
// https://github.com/OpenZeppelin/openzeppelin-test-helpers/blob/master/LICENSE
var expect = require("chai").expect;
// matches eventName
// matches data if defined
function expectEvent(receipt, eventName, eventArgs, data) {
    if (eventArgs === void 0) { eventArgs = {}; }
    if (data === void 0) { data = undefined; }
    var args = Object.keys(eventArgs).map(function (key) { return eventArgs[key]; });
    var found = false;
    receipt.events.forEach(function (event) {
        if (event.event == eventName && (data == undefined || data == event.data)) {
            var match_1 = true;
            Object.keys(eventArgs).forEach(function (key) {
                try {
                    if (eventName == undefined) {
                        expect(eventArgs[key]).to.eql(event.topics[key]);
                    }
                    else {
                        expect(eventArgs[key]).to.eql(event.args[key]);
                    }
                }
                catch (_a) {
                    match_1 = false;
                }
            });
            found = found || match_1;
        }
    });
    expect(found).to.equal(true, "No '".concat(eventName, "' events found with args ").concat(args));
}
module.exports = { expectEvent: expectEvent };
