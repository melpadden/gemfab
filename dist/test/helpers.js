"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test1D = exports.test2D = exports.check_gas = exports.U256_MAX = exports.RAD = exports.RAY = exports.WAD = exports.BANKYEAR = exports.N = exports.apy = exports.rad = exports.ray = exports.wad = exports.send = exports.revert = exports.snapshot = void 0;
var ethers_1 = require("ethers");
var minihat_1 = require("minihat");
var mocha_1 = require("mocha");
var minihat_2 = require("minihat");
Object.defineProperty(exports, "snapshot", { enumerable: true, get: function () { return minihat_2.snapshot; } });
Object.defineProperty(exports, "revert", { enumerable: true, get: function () { return minihat_2.revert; } });
Object.defineProperty(exports, "send", { enumerable: true, get: function () { return minihat_2.send; } });
Object.defineProperty(exports, "wad", { enumerable: true, get: function () { return minihat_2.wad; } });
Object.defineProperty(exports, "ray", { enumerable: true, get: function () { return minihat_2.ray; } });
Object.defineProperty(exports, "rad", { enumerable: true, get: function () { return minihat_2.rad; } });
Object.defineProperty(exports, "apy", { enumerable: true, get: function () { return minihat_2.apy; } });
Object.defineProperty(exports, "N", { enumerable: true, get: function () { return minihat_2.N; } });
Object.defineProperty(exports, "BANKYEAR", { enumerable: true, get: function () { return minihat_2.BANKYEAR; } });
Object.defineProperty(exports, "WAD", { enumerable: true, get: function () { return minihat_2.WAD; } });
Object.defineProperty(exports, "RAY", { enumerable: true, get: function () { return minihat_2.RAY; } });
Object.defineProperty(exports, "RAD", { enumerable: true, get: function () { return minihat_2.RAD; } });
Object.defineProperty(exports, "U256_MAX", { enumerable: true, get: function () { return minihat_2.U256_MAX; } });
var debug = require('debug')('rico:test');
var ramp_members = ['vel', 'rel', 'bel', 'cel'];
function check_gas(gas, minGas, maxGas) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, minihat_1.want)(gas.toNumber()).to.be.at.most(maxGas)];
                case 1:
                    _a.sent();
                    if (gas.toNumber() < minGas) {
                        console.log("gas reduction: previous min=", minGas, " gas used=", gas.toNumber());
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.check_gas = check_gas;
//
// for move patterns
// verify takes previous dst value
function test2D(name, init, fillDst, fill, clear, stay, one, two, bounds, verify) {
    var _this = this;
    var ZERO;
    if (Buffer.isBuffer(one)) {
        ZERO = Buffer.from('00'.repeat(32), 'hex');
    }
    else if (typeof (one) == 'boolean') {
        ZERO = false;
    }
    else if (ethers_1.BigNumber.isBigNumber(one)) {
        ZERO = ethers_1.constants.Zero;
    }
    else if (typeof (one) == 'number') {
        ZERO = 0;
    }
    var makeTests = function (subTest, next) {
        var initAndFill = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fillDst(ZERO, next)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        var testName = name + ' dst at ' + subTest;
        if (verify) {
            test1D(testName, initAndFill, fill, clear, stay, one, two, bounds[subTest], verify(next));
        }
        else {
            test1D(testName, initAndFill, fill, clear, stay, one, two, bounds[subTest]);
        }
    };
    makeTests(0, ethers_1.constants.Zero);
    makeTests(1, one);
    makeTests(2, two);
}
exports.test2D = test2D;
// generate 1d tests
// takes three functions that manipulate state
// fill: increase value by one
// clear: decrease value by one
// stay: keep value the same, using the method being profiled
// fill, clear and stay should return undefined if they don't use the method being tested
// verify: verify the new src and dst values
function test1D(name, init, fill, clear, stay, one, two, bounds, verify) {
    var _this = this;
    function assert_def(gas) {
        minihat_1.chai.assert(gas != undefined, "Testing fill/clear/stay, but it returned undefined.  This test can be removed.");
    }
    (0, mocha_1.describe)(name, function () {
        var ZERO;
        if (Buffer.isBuffer(one)) {
            ZERO = Buffer.from('00'.repeat(32), 'hex');
        }
        else if (typeof (one) == 'boolean') {
            ZERO = false;
        }
        else if (ethers_1.BigNumber.isBigNumber(one)) {
            ZERO = ethers_1.constants.Zero;
        }
        else if (typeof (one) == 'number') {
            ZERO = 0;
        }
        //let ZERO = typeof(one) == 'boolean' ? false : typeof(one) == 'Buffer' ? Buffer.from(0)
        //  : BigNumber.from(0)
        beforeEach(init);
        (0, mocha_1.describe)('no change', function () {
            if (bounds[0] != undefined && bounds[0][0] != undefined) {
                it('0->0', function () { return __awaiter(_this, void 0, void 0, function () {
                    var tx, gas, bound;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, stay(ZERO)];
                            case 1:
                                tx = _a.sent();
                                assert_def(tx);
                                gas = tx.gasUsed;
                                if (!verify) return [3 /*break*/, 3];
                                return [4 /*yield*/, verify(ZERO, ZERO)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                bound = bounds[0][0];
                                return [4 /*yield*/, check_gas(gas, bound[0], bound[1])];
                            case 4:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            if (bounds[1] != undefined && bounds[1][1] != undefined) {
                it('1->1', function () { return __awaiter(_this, void 0, void 0, function () {
                    var tx, gas, bound;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fill(ZERO, one)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, stay(one)];
                            case 2:
                                tx = _a.sent();
                                assert_def(tx);
                                if (!verify) return [3 /*break*/, 4];
                                return [4 /*yield*/, verify(one, one)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                gas = tx.gasUsed;
                                bound = bounds[1][1];
                                return [4 /*yield*/, check_gas(gas, bound[0], bound[1])];
                            case 5:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
        });
        (0, mocha_1.describe)('change', function () {
            if (bounds[0] != undefined && bounds[0][1] != undefined) {
                it('0->1', function () { return __awaiter(_this, void 0, void 0, function () {
                    var tx, gas, bound;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fill(ZERO, one)];
                            case 1:
                                tx = _a.sent();
                                assert_def(tx);
                                gas = tx.gasUsed;
                                if (!verify) return [3 /*break*/, 3];
                                return [4 /*yield*/, verify(ZERO, one)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                bound = bounds[0][1];
                                return [4 /*yield*/, check_gas(gas, bound[0], bound[1])];
                            case 4:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            if (bounds[1] != undefined && bounds[1][0] != undefined) {
                it('1->0', function () { return __awaiter(_this, void 0, void 0, function () {
                    var tx, gas, bound;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fill(ZERO, one)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, clear(one, ZERO)];
                            case 2:
                                tx = _a.sent();
                                assert_def(tx);
                                gas = tx.gasUsed;
                                if (!verify) return [3 /*break*/, 4];
                                return [4 /*yield*/, verify(one, ZERO)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                bound = bounds[1][0];
                                return [4 /*yield*/, check_gas(gas, bound[0], bound[1])];
                            case 5:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            if (bounds[1] != undefined && bounds[1][2] != undefined) {
                it('1->2', function () { return __awaiter(_this, void 0, void 0, function () {
                    var tx, gas, bound;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // 1->2 invalid for bools
                                (0, minihat_1.want)(one).to.not.be.a('boolean');
                                return [4 /*yield*/, fill(ZERO, one)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fill(one, two)];
                            case 2:
                                tx = _a.sent();
                                assert_def(tx);
                                gas = tx.gasUsed;
                                if (!verify) return [3 /*break*/, 4];
                                return [4 /*yield*/, verify(one, two)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                bound = bounds[1][2];
                                return [4 /*yield*/, check_gas(gas, bound[0], bound[1])];
                            case 5:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            if (bounds[2] != undefined && bounds[2][1] != undefined) {
                it('2->1', function () { return __awaiter(_this, void 0, void 0, function () {
                    var tx, gas, bound;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // 1->2 invalid for bools
                                (0, minihat_1.want)(one).to.not.be.a('boolean');
                                return [4 /*yield*/, fill(ZERO, two)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, clear(two, one)];
                            case 2:
                                tx = _a.sent();
                                assert_def(tx);
                                gas = tx.gasUsed;
                                if (!verify) return [3 /*break*/, 4];
                                return [4 /*yield*/, verify(two, one)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                bound = bounds[2][1];
                                return [4 /*yield*/, check_gas(gas, bound[0], bound[1])];
                            case 5:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
        });
    });
}
exports.test1D = test1D;
