"use strict";
// modified version of openzeppelin-contracts ERC20.behavior.js
//   https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/test/token/ERC20/ERC20.behavior.js
//
// The MIT License (MIT)
// Copyright (c) 2016-2020 zOS Global Limited
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/LICENSE
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
var expect = require('chai').expect;
var expectRevert = function (f, msg) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, expect(f).rejectedWith(msg)];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); }); };
var expectEvent = require('./helpers').expectEvent;
var ethers_1 = require("ethers");
function shouldBehaveLikeERC20(errorPrefix, initialSupply, _initialHolder, _recipient, _anotherAccount) {
    {
        var initialHolder_1, recipient_1, anotherAccount_1;
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _initialHolder];
                        case 1:
                            initialHolder_1 = _a.sent();
                            return [4 /*yield*/, _recipient];
                        case 2:
                            recipient_1 = _a.sent();
                            return [4 /*yield*/, _anotherAccount];
                        case 3:
                            anotherAccount_1 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        describe('total supply', function () {
            it('returns the total amount of tokens', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = expect;
                                return [4 /*yield*/, this.token.totalSupply()];
                            case 1:
                                _a.apply(void 0, [_b.sent()]).to.eql(initialSupply);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        describe('balanceOf', function () {
            describe('when the requested account has no tokens', function () {
                it('returns zero', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = expect;
                                    return [4 /*yield*/, this.token.balanceOf(anotherAccount_1.address)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]).to.eql(ethers_1.constants.Zero);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            describe('when the requested account has some tokens', function () {
                it('returns the total amount of tokens', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = expect;
                                    return [4 /*yield*/, this.token.balanceOf(initialHolder_1.address)];
                                case 1:
                                    _a.apply(void 0, [_b.sent()]).to.eql(initialSupply);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
        });
        describe('transfer', function () {
            shouldBehaveLikeERC20Transfer(errorPrefix, _initialHolder, _recipient, initialSupply, function (from, to, value) {
                return this.token.connect(from).transfer(to.address, value);
            });
        });
        describe('transfer from', function () {
            var spender;
            beforeEach(function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, _recipient];
                            case 1:
                                spender = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            describe('when the token owner is not the zero address', function () {
                var tokenOwner;
                beforeEach(function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, _initialHolder];
                                case 1:
                                    tokenOwner = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                describe('when the recipient is not the zero address', function () {
                    var to;
                    beforeEach(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, _anotherAccount];
                                    case 1:
                                        to = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    describe('when the spender has enough approved balance', function () {
                        beforeEach(function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.token.connect(initialHolder_1).approve(spender.address, initialSupply)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        describe('when the token owner has enough balance', function () {
                            var amount = initialSupply;
                            it('transfers the requested amount', function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0: return [4 /*yield*/, this.token.connect(spender).transferFrom(tokenOwner.address, to.address, amount)];
                                            case 1:
                                                _c.sent();
                                                _a = expect;
                                                return [4 /*yield*/, this.token.balanceOf(tokenOwner.address)];
                                            case 2:
                                                _a.apply(void 0, [_c.sent()]).to.eql(ethers_1.constants.Zero);
                                                _b = expect;
                                                return [4 /*yield*/, this.token.balanceOf(to.address)];
                                            case 3:
                                                _b.apply(void 0, [_c.sent()]).to.eql(amount);
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                            it('decreases the spender allowance', function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, this.token.connect(spender).transferFrom(tokenOwner.address, to.address, amount)];
                                            case 1:
                                                _b.sent();
                                                _a = expect;
                                                return [4 /*yield*/, this.token.allowance(tokenOwner.address, spender.address)];
                                            case 2:
                                                _a.apply(void 0, [_b.sent()]).to.eql(ethers_1.constants.Zero);
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                            it('emits a transfer event', function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    var tx, rx;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.token.connect(spender).transferFrom(tokenOwner.address, to.address, amount)];
                                            case 1:
                                                tx = _a.sent();
                                                return [4 /*yield*/, tx.wait()];
                                            case 2:
                                                rx = _a.sent();
                                                expectEvent(rx, 'Transfer', {
                                                    src: tokenOwner.address,
                                                    dst: to.address,
                                                    wad: amount,
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                            /* // not required for EIP20
                            it('emits an approval event', async function () {
                              const { logs } = await this.token.transferFrom(tokenOwner, to, amount, { from: spender });
              
                              expectEvent.inLogs(logs, 'Approval', {
                                src: tokenOwner,
                                usr: spender,
                                wad: await this.token.allowance(tokenOwner, spender),
                              });
                            });
                            */
                        });
                        describe('when the token owner does not have enough balance', function () {
                            var amount = initialSupply.add(1);
                            it('reverts', function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, expectRevert(this.token.connect(spender).transferFrom(tokenOwner.address, to.address, amount), "ErrUnderflow")];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                        });
                    });
                    describe('when the spender does not have enough approved balance', function () {
                        beforeEach(function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.token.connect(tokenOwner).approve(spender.address, initialSupply.sub(1))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        describe('when the token owner has enough balance', function () {
                            var amount = initialSupply;
                            it('reverts', function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, expectRevert(this.token.connect(spender).transferFrom(tokenOwner.address, to.address, amount), "ErrUnderflow")];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                        });
                        describe('when the token owner does not have enough balance', function () {
                            var amount = initialSupply.add(1);
                            it('reverts', function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, expectRevert(this.token.connect(spender).transferFrom(tokenOwner.address, to.address, amount), "ErrUnderflow")];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
                /*
                describe('when the recipient is the zero address', function () {
                  const amount = initialSupply;
                  const to = ZERO_ADDRESS;
        
                  beforeEach(async function () {
                    await this.token.approve(spender, amount, { from: tokenOwner });
                  });
        
                  it('reverts', async function () {
                    await expectRevert(this.token.transferFrom(
                      tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer to the zero address`,
                    );
                  });
                });
                */
            });
            /*
            describe('when the token owner is the zero address', function () {
              const amount = 0;
              const tokenOwner = ZERO_ADDRESS;
              const to = recipient;
      
              it('reverts', async function () {
                await expectRevert(this.token.transferFrom(
                  tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer from the zero address`,
                );
              });
            });
            */
        });
        describe('approve', function () {
            shouldBehaveLikeERC20Approve(errorPrefix, _initialHolder, _recipient, initialSupply, function (owner, spender, amount) {
                return this.token.connect(owner).approve(spender.address, amount);
            });
        });
    }
}
function shouldBehaveLikeERC20Transfer(errorPrefix, _from, _to, balance, transfer) {
    {
        var from_1, to_1;
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _from];
                        case 1:
                            from_1 = _a.sent();
                            return [4 /*yield*/, _to];
                        case 2:
                            to_1 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        describe('when the recipient is not the zero address', function () {
            describe('when the sender does not have enough balance', function () {
                var amount = balance.add(1);
                it('reverts', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, expectRevert(transfer.call(this, from_1, to_1, amount), "ErrUnderflow")];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            describe('when the sender transfers all balance', function () {
                var amount = balance;
                it('transfers the requested amount', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, transfer.call(this, from_1, to_1, amount)];
                                case 1:
                                    _c.sent();
                                    _a = expect;
                                    return [4 /*yield*/, this.token.balanceOf(from_1.address)];
                                case 2:
                                    _a.apply(void 0, [_c.sent()]).to.eql(ethers_1.constants.Zero);
                                    _b = expect;
                                    return [4 /*yield*/, this.token.balanceOf(to_1.address)];
                                case 3:
                                    _b.apply(void 0, [_c.sent()]).to.eql(amount);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('emits a transfer event', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var tx, rx;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transfer.call(this, from_1, to_1, amount)];
                                case 1:
                                    tx = _a.sent();
                                    return [4 /*yield*/, tx.wait()];
                                case 2:
                                    rx = _a.sent();
                                    expectEvent(rx, 'Transfer', {
                                        src: from_1.address,
                                        dst: to_1.address,
                                        wad: amount,
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            describe('when the sender transfers zero tokens', function () {
                var amount = ethers_1.constants.Zero;
                it('transfers the requested amount', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, transfer.call(this, from_1, to_1, amount)];
                                case 1:
                                    _c.sent();
                                    _a = expect;
                                    return [4 /*yield*/, this.token.balanceOf(from_1.address)];
                                case 2:
                                    _a.apply(void 0, [_c.sent()]).to.eql(balance);
                                    _b = expect;
                                    return [4 /*yield*/, this.token.balanceOf(to_1.address)];
                                case 3:
                                    _b.apply(void 0, [_c.sent()]).to.eql(ethers_1.constants.Zero);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('emits a transfer event', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var tx, rx;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, transfer.call(this, from_1, to_1, amount)];
                                case 1:
                                    tx = _a.sent();
                                    return [4 /*yield*/, tx.wait()];
                                case 2:
                                    rx = _a.sent();
                                    expectEvent(rx, 'Transfer', {
                                        src: from_1.address,
                                        dst: to_1.address,
                                        wad: amount,
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
        });
    }
    /*
    describe('when the recipient is the zero address', function () {
      it('reverts', async function () {
        await expectRevert(transfer.call(this, from, ZERO_ADDRESS, balance),
          `${errorPrefix}: transfer to the zero address`,
        );
      });
    });
    */
}
function shouldBehaveLikeERC20Approve(errorPrefix, _owner, _spender, supply, approve) {
    {
        var owner_1, spender_1;
        beforeEach(function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _owner];
                        case 1:
                            owner_1 = _a.sent();
                            return [4 /*yield*/, _spender];
                        case 2:
                            spender_1 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        describe('when the spender is not the zero address', function () {
            describe('when the sender has enough balance', function () {
                var amount = supply;
                it('emits an approval event', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var tx, rx;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, approve.call(this, owner_1, spender_1, amount)];
                                case 1:
                                    tx = _a.sent();
                                    return [4 /*yield*/, tx.wait()];
                                case 2:
                                    rx = _a.sent();
                                    expectEvent(rx, 'Approval', {
                                        src: owner_1.address,
                                        usr: spender_1.address,
                                        wad: amount,
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                describe('when there was no approved amount before', function () {
                    it('approves the requested amount', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, approve.call(this, owner_1, spender_1, amount)];
                                    case 1:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, this.token.allowance(owner_1.address, spender_1.address)];
                                    case 2:
                                        _a.apply(void 0, [_b.sent()]).to.eql(amount);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
                describe('when the spender had an approved amount', function () {
                    beforeEach(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, approve.call(this, owner_1, spender_1, ethers_1.BigNumber.from(1))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    it('approves the requested amount and replaces the previous one', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, approve.call(this, owner_1, spender_1, amount)];
                                    case 1:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, this.token.allowance(owner_1.address, spender_1.address)];
                                    case 2:
                                        _a.apply(void 0, [_b.sent()]).to.eql(amount);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
            });
            describe('when the sender does not have enough balance', function () {
                var amount = supply.add(1);
                it('emits an approval event', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var tx, rx;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, approve.call(this, owner_1, spender_1, amount)];
                                case 1:
                                    tx = _a.sent();
                                    return [4 /*yield*/, tx.wait()];
                                case 2:
                                    rx = _a.sent();
                                    expectEvent(rx, 'Approval', {
                                        src: owner_1.address,
                                        usr: spender_1.address,
                                        wad: amount,
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                describe('when there was no approved amount before', function () {
                    it('approves the requested amount', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, approve.call(this, owner_1, spender_1, amount)];
                                    case 1:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, this.token.allowance(owner_1.address, spender_1.address)];
                                    case 2:
                                        _a.apply(void 0, [_b.sent()]).to.eql(amount);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
                describe('when the spender had an approved amount', function () {
                    beforeEach(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, approve.call(this, owner_1, spender_1, ethers_1.constants.One)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    it('approves the requested amount and replaces the previous one', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, approve.call(this, owner_1, spender_1, amount)];
                                    case 1:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, this.token.allowance(owner_1.address, spender_1.address)];
                                    case 2:
                                        _a.apply(void 0, [_b.sent()]).to.eql(amount);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
            });
        });
    }
    /*
    describe('when the spender is the zero address', function () {
      it('reverts', async function () {
        await expectRevert(approve.call(this, owner, ZERO_ADDRESS, supply),
          `${errorPrefix}: approve to the zero address`,
        );
      });
    });
    */
}
module.exports = {
    shouldBehaveLikeERC20: shouldBehaveLikeERC20,
    shouldBehaveLikeERC20Transfer: shouldBehaveLikeERC20Transfer,
    shouldBehaveLikeERC20Approve: shouldBehaveLikeERC20Approve,
};
