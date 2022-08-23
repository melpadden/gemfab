"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var hh = __importStar(require("hardhat"));
var hardhat_1 = require("hardhat");
var minihat_1 = require("minihat");
var constants = hardhat_1.ethers.constants, BigNumber = hardhat_1.ethers.BigNumber, utils = hardhat_1.ethers.utils;
var helpers_1 = require("./helpers");
var bounds_1 = require("./bounds");
var bounds = bounds_1.bounds.gem;
var expectEvent = require('./ERC20/helpers').expectEvent;
var debug = require('debug')('gemfab:test');
var types = {
    Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
    ]
};
var domain = {
    name: 'GemPermit',
    version: '0',
    chainId: undefined,
    verifyingContract: undefined
};
describe('gemfab', function () {
    var chainId;
    var ali, bob, cat;
    var ALI, BOB, CAT;
    var gem;
    var gem_type;
    var gemfab;
    var gemfab_type;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, symbol, gemaddr;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    _a = _c.sent(), ali = _a[0], bob = _a[1], cat = _a[2];
                    _b = [ali, bob, cat].map(function (signer) { return signer.address; }), ALI = _b[0], BOB = _b[1], CAT = _b[2];
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Gem', ali)];
                case 2:
                    gem_type = _c.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('GemFab', ali)];
                case 3:
                    gemfab_type = _c.sent();
                    return [4 /*yield*/, gemfab_type.deploy()];
                case 4:
                    gemfab = _c.sent();
                    name = utils.formatBytes32String('Mock Cash');
                    symbol = utils.formatBytes32String('CASH');
                    return [4 /*yield*/, gemfab.callStatic.build(name, symbol)];
                case 5:
                    gemaddr = _c.sent();
                    return [4 /*yield*/, (0, minihat_1.send)(gemfab.build, name, symbol)];
                case 6:
                    _c.sent();
                    gem = gem_type.attach(gemaddr);
                    return [4 /*yield*/, (0, minihat_1.snapshot)(hh)];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, hh.network.config.chainId];
                case 8:
                    chainId = _c.sent();
                    domain.chainId = chainId;
                    domain.verifyingContract = gem.address;
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, minihat_1.revert)(hh)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('mint ward', function () { return __awaiter(void 0, void 0, void 0, function () {
        var bal, gembob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.mint, ALI, 100)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, gem.balanceOf(ALI)];
                case 2:
                    bal = _a.sent();
                    (0, minihat_1.want)(bal.toNumber()).equal(100);
                    gembob = gem.connect(bob);
                    return [4 /*yield*/, (0, minihat_1.fail)('ErrWard', gembob.mint, BOB, 100)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('burn underflow', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.mint, ALI, 100)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, minihat_1.send)(gem.mint, BOB, 100)];
                case 2:
                    _a.sent(); // totalSupply wont be cause of underflow
                    return [4 /*yield*/, (0, minihat_1.fail)('ErrUnderflow', gem.burn, ALI, 101)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('coverage', function () {
        describe('mint', function () {
            it('overflow', function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.mint, ALI, constants.MaxUint256.div(2))];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, (0, minihat_1.send)(gem.mint, BOB, constants.MaxUint256.div(2))];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, (0, minihat_1.send)(gem.mint, CAT, 1)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, (0, minihat_1.fail)('ErrOverflow', gem.mint, CAT, 1)];
                            case 4:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('approve', function () {
            it('nonzero', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.approve, BOB, 0)];
                            case 1:
                                _c.sent();
                                _a = minihat_1.want;
                                return [4 /*yield*/, gem.allowance(ALI, BOB)];
                            case 2:
                                _a.apply(void 0, [(_c.sent()).toNumber()]).to.equal(0);
                                return [4 /*yield*/, (0, minihat_1.send)(gem.approve, BOB, 1)];
                            case 3:
                                _c.sent();
                                _b = minihat_1.want;
                                return [4 /*yield*/, gem.allowance(ALI, BOB)];
                            case 4:
                                _b.apply(void 0, [(_c.sent()).toNumber()]).to.equal(1);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
    });
    describe(' gas cost', function () {
        function check(gas, minGas, maxGas) {
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
        it('decimals', function () { return __awaiter(void 0, void 0, void 0, function () {
            var gas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, gem.estimateGas.decimals()];
                    case 1:
                        gas = _a.sent();
                        return [4 /*yield*/, check(gas, bounds.decimals[0], bounds.decimals[1])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        var NOP = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        {
            var fill_1 = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, (0, minihat_1.send)(gem.mint, ALI, next - prev)];
                });
            }); };
            var clear = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.burn, ALI, prev - next)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var stay = function (prev) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, fill_1(prev, prev)];
                });
            }); };
            (0, helpers_1.test1D)('mint', NOP, fill_1, clear, stay, 1, 2, bounds.mint);
        }
        {
            var fillDst = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.mint, BOB, next - prev)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var fill = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.mint, ALI, next - prev)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var clear_1 = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, (0, minihat_1.send)(gem.transfer, BOB, prev - next)];
                });
            }); };
            var stay = function (prev) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, clear_1(prev, prev)];
                });
            }); };
            (0, helpers_1.test2D)('transfer', NOP, fillDst, fill, clear_1, stay, 1, 2, bounds.transfer);
        }
        {
            var fillDst = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.mint, BOB, next - prev)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var fill = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.mint, ALI, next - prev)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var clear = function (maxAllow) { return function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                var max;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            max = constants.MaxUint256;
                            // approve is always nonzero->nonzero for now
                            return [4 /*yield*/, (0, minihat_1.send)(gem.approve, BOB, maxAllow ? max : max.sub(1))];
                        case 1:
                            // approve is always nonzero->nonzero for now
                            _a.sent();
                            // tx with msg.sender == bob to account for tokens that treat allowance(a, a) == inf
                            return [2 /*return*/, (0, minihat_1.send)(gem.connect(bob).transferFrom, ALI, BOB, prev - next)];
                    }
                });
            }); }; };
            var stay = function (prev) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, (0, minihat_1.send)(gem.connect(bob).transferFrom, ALI, BOB, 0)];
                });
            }); };
            (0, helpers_1.test2D)('transferFrom sub-max allowance', NOP, fillDst, fill, clear(false), stay, 1, 2, bounds.transferFrom.notMaxAllowance);
            (0, helpers_1.test2D)('transferFrom max allowance', NOP, fillDst, fill, clear(true), stay, 1, 2, bounds.transferFrom.maxAllowance);
        }
        {
            var fill = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.mint, ALI, next - prev)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            var clear_2 = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, (0, minihat_1.send)(gem.burn, ALI, prev - next)];
                });
            }); };
            var stay = function (prev) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, clear_2(prev, prev)];
                });
            }); };
            (0, helpers_1.test1D)('burn', NOP, fill, clear_2, stay, 1, 2, bounds.burn);
        }
        {
            var fill_2 = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, (0, minihat_1.send)(gem.approve, ALI, next)];
                });
            }); };
            var clear = fill_2;
            var stay = function (prev) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, fill_2(prev, prev)];
                });
            }); };
            (0, helpers_1.test1D)('approve', NOP, fill_2, clear, stay, 1, 2, bounds.approve);
        }
        {
            var deadline_1 = Math.floor(Date.now() / 1000) * 2;
            var fill_3 = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                var value, signature, sig;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = {
                                owner: ALI,
                                spender: BOB,
                                value: next
                            };
                            return [4 /*yield*/, gem.nonces(ALI)];
                        case 1:
                            value = (_a.nonce = _b.sent(),
                                _a.deadline = deadline_1,
                                _a);
                            return [4 /*yield*/, ali._signTypedData(domain, types, value)];
                        case 2:
                            signature = _b.sent();
                            sig = hardhat_1.ethers.utils.splitSignature(signature);
                            return [2 /*return*/, (0, minihat_1.send)(gem.permit, ALI, BOB, value.value, deadline_1, sig.v, sig.r, sig.s)];
                    }
                });
            }); };
            var clear = fill_3;
            var stay = function (prev) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, fill_3(prev, prev)];
                });
            }); };
            (0, helpers_1.test1D)('permit', NOP, fill_3, clear, stay, 1, 2, bounds.permit);
        }
        {
            var fill_4 = function (prev, next) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, (0, minihat_1.send)(gem.ward, BOB, next)];
                });
            }); };
            var clear = fill_4;
            var stay = function (prev) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, fill_4(prev, prev)];
                });
            }); };
            (0, helpers_1.test1D)('ward', NOP, fill_4, clear, stay, true, undefined, bounds.ward);
        }
    });
    describe('rely/deny', function () {
        it('rely/deny permissions', function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0: return [4 /*yield*/, (0, minihat_1.fail)('ErrWard', gem.connect(bob).ward, ALI, false)];
                        case 1:
                            _k.sent();
                            return [4 /*yield*/, (0, minihat_1.fail)('ErrWard', gem.connect(bob).ward, BOB, false)];
                        case 2:
                            _k.sent();
                            return [4 /*yield*/, (0, minihat_1.fail)('ErrWard', gem.connect(bob).ward, ALI, true)];
                        case 3:
                            _k.sent();
                            return [4 /*yield*/, (0, minihat_1.fail)('ErrWard', gem.connect(bob).ward, BOB, true)];
                        case 4:
                            _k.sent();
                            _a = minihat_1.want;
                            return [4 /*yield*/, gem.wards(ALI)];
                        case 5:
                            _a.apply(void 0, [_k.sent()]).to.equal(true);
                            return [4 /*yield*/, (0, minihat_1.send)(gem.ward, BOB, false)];
                        case 6:
                            _k.sent();
                            _b = minihat_1.want;
                            return [4 /*yield*/, gem.wards(ALI)];
                        case 7:
                            _b.apply(void 0, [_k.sent()]).to.equal(true);
                            _c = minihat_1.want;
                            return [4 /*yield*/, gem.wards(BOB)];
                        case 8:
                            _c.apply(void 0, [_k.sent()]).to.equal(false);
                            return [4 /*yield*/, (0, minihat_1.send)(gem.ward, BOB, true)];
                        case 9:
                            _k.sent();
                            _d = minihat_1.want;
                            return [4 /*yield*/, gem.wards(ALI)];
                        case 10:
                            _d.apply(void 0, [_k.sent()]).to.equal(true);
                            _e = minihat_1.want;
                            return [4 /*yield*/, gem.wards(BOB)];
                        case 11:
                            _e.apply(void 0, [_k.sent()]).to.equal(true);
                            return [4 /*yield*/, (0, minihat_1.send)(gem.ward, BOB, false)];
                        case 12:
                            _k.sent();
                            _f = minihat_1.want;
                            return [4 /*yield*/, gem.wards(ALI)];
                        case 13:
                            _f.apply(void 0, [_k.sent()]).to.equal(true);
                            _g = minihat_1.want;
                            return [4 /*yield*/, gem.wards(BOB)];
                        case 14:
                            _g.apply(void 0, [_k.sent()]).to.equal(false);
                            return [4 /*yield*/, (0, minihat_1.send)(gem.ward, ALI, false)];
                        case 15:
                            _k.sent();
                            //lockout
                            _h = minihat_1.want;
                            return [4 /*yield*/, gem.wards(ALI)];
                        case 16:
                            //lockout
                            _h.apply(void 0, [_k.sent()]).to.equal(false);
                            _j = minihat_1.want;
                            return [4 /*yield*/, gem.wards(BOB)];
                        case 17:
                            _j.apply(void 0, [_k.sent()]).to.equal(false);
                            return [4 /*yield*/, (0, minihat_1.fail)('ErrWard', gem.ward, ALI, true)];
                        case 18:
                            _k.sent();
                            return [4 /*yield*/, (0, minihat_1.fail)('ErrWard', gem.connect(bob).ward, ALI, true)];
                        case 19:
                            _k.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('lockout example', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.mint, ALI, 1)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, gem.connect(bob).ward(ALI, false).then(function (res) { }, function (err) { })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gem.mint, ALI, 1)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('burn', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, minihat_1.send)(gem.mint, ALI, 1)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.fail)('ErrWard', gem.connect(bob).burn, ALI, 1)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gem.ward, BOB, true)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gem.connect(bob).burn, ALI, 1)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('mint', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, minihat_1.fail)('ErrWard', gem.connect(bob).burn, ALI, 1)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gem.ward, BOB, true)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gem.connect(bob).mint, ALI, 1)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('public methods', function () {
            return __awaiter(this, void 0, void 0, function () {
                var amt, nonce, deadline, value, gembob, signature, sig;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            amt = 42;
                            nonce = 0;
                            deadline = Math.floor(Date.now() / 1000) * 2;
                            value = {
                                owner: ALI,
                                spender: BOB,
                                value: amt,
                                nonce: nonce,
                                deadline: deadline
                            };
                            return [4 /*yield*/, (0, minihat_1.send)(gem.mint, ALI, 100)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gem.transfer, BOB, 100)];
                        case 2:
                            _a.sent();
                            gembob = gem.connect(bob);
                            // pass with bob denied
                            return [4 /*yield*/, (0, minihat_1.send)(gem.ward, BOB, false)];
                        case 3:
                            // pass with bob denied
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gembob.transfer, ALI, 1)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gembob.approve, ALI, 1)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gembob.approve, BOB, 1)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gembob.transferFrom, BOB, ALI, 1)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, ali._signTypedData(domain, types, value)];
                        case 8:
                            signature = _a.sent();
                            sig = hardhat_1.ethers.utils.splitSignature(signature);
                            return [4 /*yield*/, (0, minihat_1.send)(gem.connect(bob).permit, ALI, BOB, amt, deadline, sig.v, sig.r, sig.s)];
                        case 9:
                            _a.sent();
                            // pass with bob relied
                            return [4 /*yield*/, (0, minihat_1.send)(gem.ward, BOB, true)];
                        case 10:
                            // pass with bob relied
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gembob.transfer, ALI, 1)];
                        case 11:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gembob.approve, ALI, 1)];
                        case 12:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gembob.approve, BOB, 1)];
                        case 13:
                            _a.sent();
                            return [4 /*yield*/, (0, minihat_1.send)(gembob.transferFrom, BOB, ALI, 1)];
                        case 14:
                            _a.sent();
                            value.nonce++;
                            return [4 /*yield*/, ali._signTypedData(domain, types, value)];
                        case 15:
                            signature = _a.sent();
                            sig = hardhat_1.ethers.utils.splitSignature(signature);
                            return [4 /*yield*/, (0, minihat_1.send)(gem.connect(bob).permit, ALI, BOB, amt, deadline, sig.v, sig.r, sig.s)];
                        case 16:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    it('code doesnt change bc we dont use any immutable (in-code) vars', function () { return __awaiter(void 0, void 0, void 0, function () {
        var name, symbol, gem2addr, gem2, gem_code, gem2_code;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = utils.formatBytes32String('other');
                    symbol = utils.formatBytes32String('OTHER');
                    return [4 /*yield*/, gemfab.callStatic.build(name, symbol)];
                case 1:
                    gem2addr = _a.sent();
                    return [4 /*yield*/, (0, minihat_1.send)(gemfab.build, name, symbol)];
                case 2:
                    _a.sent();
                    gem2 = gem_type.attach(gem2addr);
                    return [4 /*yield*/, hardhat_1.ethers.provider.getCode(gem.address)];
                case 3:
                    gem_code = _a.sent();
                    return [4 /*yield*/, hardhat_1.ethers.provider.getCode(gem2.address)];
                case 4:
                    gem2_code = _a.sent();
                    (0, minihat_1.want)(gem_code).eq(gem2_code);
                    return [2 /*return*/];
            }
        });
    }); });
});
