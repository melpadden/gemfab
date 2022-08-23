"use strict";
// modified version of openzeppelin-contracts ERC20.test.js
//   https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/test/token/ERC20/ERC20.test.js
//
// The MIT License (MIT)
// Copyright (c) 2016-2020 zOS Global Limited
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/LICENSE
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
var hardhat_1 = require("hardhat");
var hh = __importStar(require("hardhat"));
var minihat_1 = require("minihat");
var ethers_1 = require("ethers");
var expectEvent = require('./helpers').expectEvent;
var expect = require('chai').expect;
var expectRevert = function (f, msg) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, expect(f).rejectedWith(msg)];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); }); };
var BigNumber = hardhat_1.ethers.BigNumber;
var _a = require('./ERC20.behavior'), shouldBehaveLikeERC20 = _a.shouldBehaveLikeERC20, shouldBehaveLikeERC20Transfer = _a.shouldBehaveLikeERC20Transfer, shouldBehaveLikeERC20Approve = _a.shouldBehaveLikeERC20Approve;
//const Gem    = artifacts.require('Gem');
//const GemFab = artifacts.require('GemFab');
//const ERC20DecimalsMock = artifacts.require('ERC20DecimalsMock');
//
function decreaseAllowance(token, ali, bob, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var allowance, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, token.allowance(ali.address, bob.address)];
                case 1:
                    allowance = _a.sent();
                    return [4 /*yield*/, token.connect(ali).approve(bob.address, allowance.sub(amount))];
                case 2:
                    tx = _a.sent();
                    return [2 /*return*/, tx];
            }
        });
    });
}
function increaseAllowance(token, ali, bob, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var allowance, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, token.allowance(ali.address, bob.address)];
                case 1:
                    allowance = _a.sent();
                    return [4 /*yield*/, token.connect(ali).approve(bob.address, allowance.add(amount))];
                case 2:
                    tx = _a.sent();
                    return [2 /*return*/, tx];
            }
        });
    });
}
var _initialHolder, _recipient, _anotherAccount;
var initialHolder, recipient, anotherAccount;
describe('ERC20', function () {
    var name = ethers_1.utils.formatBytes32String('Gem');
    var symbol = ethers_1.utils.formatBytes32String('GEM');
    var initialSupply = BigNumber.from(1000);
    var gem;
    var gem_type;
    var gemfab;
    var gemfab_type;
    var signers = hardhat_1.ethers.getSigners();
    _initialHolder = signers.then(function (s) { return s[0]; });
    _recipient = signers.then(function (s) { return s[1]; });
    _anotherAccount = signers.then(function (s) { return s[2]; });
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            var ali, gemaddr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _initialHolder];
                    case 1:
                        //[initialHolder, recipient, anotherAccount] = [ali, bob, cat].map(signer => signer.address)
                        initialHolder = _a.sent();
                        return [4 /*yield*/, _recipient];
                    case 2:
                        recipient = _a.sent();
                        return [4 /*yield*/, _anotherAccount];
                    case 3:
                        anotherAccount = _a.sent();
                        ali = initialHolder;
                        return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Gem', ali)];
                    case 4:
                        gem_type = _a.sent();
                        return [4 /*yield*/, hardhat_1.ethers.getContractFactory('GemFab', ali)];
                    case 5:
                        gemfab_type = _a.sent();
                        return [4 /*yield*/, gemfab_type.deploy()];
                    case 6:
                        gemfab = _a.sent();
                        return [4 /*yield*/, gemfab.callStatic.build(name, symbol)];
                    case 7:
                        gemaddr = _a.sent();
                        return [4 /*yield*/, (0, minihat_1.send)(gemfab.build, name, symbol)];
                    case 8:
                        _a.sent();
                        gem = gem_type.attach(gemaddr);
                        return [4 /*yield*/, (0, minihat_1.snapshot)(hh)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, minihat_1.revert)(hh)];
                    case 1:
                        _a.sent();
                        this.token = gem;
                        return [4 /*yield*/, this.token.mint(initialHolder.address, initialSupply)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('has a name', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = expect;
                        return [4 /*yield*/, this.token.name()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.equal(name);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('has a symbol', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = expect;
                        return [4 /*yield*/, this.token.symbol()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.equal(symbol);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('has 18 decimals', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = expect;
                        return [4 /*yield*/, this.token.decimals()];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.equal(18);
                        return [2 /*return*/];
                }
            });
        });
    });
    /*
  describe('set decimals', function () {
    const decimals = new BN(6);

    it('can set decimals during construction', async function () {
      const token = await ERC20DecimalsMock.new(name, symbol, decimals);
      expect(await token.decimals()).to.be.bignumber.equal(decimals);
    });
  });
  */
    shouldBehaveLikeERC20('ERC20', initialSupply, _initialHolder, _recipient, _anotherAccount);
    describe('decrease allowance', function () {
        describe('when the spender is not the zero address', function () {
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
            function shouldDecreaseApproval(amount) {
                /* // no decreaseAllowance contract method
                describe('when there was no approved amount before', function () {
                  it('reverts', async function () {
                    await expectRevert(decreaseAllowance(this.token, initialHolder, spender, amount), 'GEM/allowance underflow.',
                    );
                  });
                });
                */
                describe('when the spender had an approved amount', function () {
                    var approvedAmount = amount;
                    beforeEach(function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = this;
                                        return [4 /*yield*/, this.token.approve(spender.address, approvedAmount)];
                                    case 1:
                                        (_a.logs = (_b.sent()).logs);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    it('emits an approval event', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var tx, rx;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, decreaseAllowance(this.token, initialHolder, spender, approvedAmount)];
                                    case 1:
                                        tx = _a.sent();
                                        return [4 /*yield*/, tx.wait()];
                                    case 2:
                                        rx = _a.sent();
                                        expectEvent(rx, 'Approval', {
                                            src: initialHolder.address,
                                            usr: spender.address,
                                            wad: ethers_1.constants.Zero,
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    it('decreases the spender allowance subtracting the requested amount', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, decreaseAllowance(this.token, initialHolder, spender, approvedAmount.sub(1))];
                                    case 1:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, this.token.allowance(initialHolder.address, spender.address)];
                                    case 2:
                                        _a.apply(void 0, [_b.sent()]).to.eql(ethers_1.constants.One);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    it('sets the allowance to zero when all allowance is removed', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, decreaseAllowance(this.token, initialHolder, spender, approvedAmount)];
                                    case 1:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, this.token.allowance(initialHolder.address, spender.address)];
                                    case 2:
                                        _a.apply(void 0, [_b.sent()]).to.eql(ethers_1.constants.Zero);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    /* // no decreaseAllowance contract method
                    it('reverts when more than the full allowance is removed', async function () {
                      await expectRevert(
                        decreaseAllowance(this.token, initialHolder, spender, approvedAmount.add(1), { from: initialHolder }),
                        'Reverted, check reason',
                      );
                    });
                    */
                });
            }
            describe('when the sender has enough balance', function () {
                var amount = initialSupply;
                shouldDecreaseApproval(amount);
            });
            describe('when the sender does not have enough balance', function () {
                var amount = initialSupply.add(1);
                shouldDecreaseApproval(amount);
            });
        });
        /* // null checks not part of spec
        describe('when the spender is the zero address', function () {
          const amount = initialSupply;
          const spender = ZERO_ADDRESS;
    
          it('reverts', async function () {
            await expectRevert(decreaseAllowance(
              this.token, initialHolder, spender, amount), 'Reverted, check reason',
            );
          });
        });
        */
    });
    describe('increase allowance', function () {
        var amount = initialSupply;
        describe('when the spender is not the zero address', function () {
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
            describe('when the sender has enough balance', function () {
                it('emits an approval event', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var tx, rx;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, increaseAllowance(this.token, initialHolder, spender, amount)];
                                case 1:
                                    tx = _a.sent();
                                    return [4 /*yield*/, tx.wait()];
                                case 2:
                                    rx = _a.sent();
                                    expectEvent(rx, 'Approval', {
                                        src: initialHolder.address,
                                        usr: spender.address,
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
                                    case 0: return [4 /*yield*/, increaseAllowance(this.token, initialHolder, spender, amount)];
                                    case 1:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, this.token.allowance(initialHolder.address, spender.address)];
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
                                    case 0: return [4 /*yield*/, this.token.connect(initialHolder).approve(spender.address, ethers_1.constants.One)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    it('increases the spender allowance adding the requested amount', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, increaseAllowance(this.token, initialHolder, spender, amount)];
                                    case 1:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, this.token.allowance(initialHolder.address, spender.address)];
                                    case 2:
                                        _a.apply(void 0, [_b.sent()]).to.eql(amount.add(1));
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
            });
            describe('when the sender does not have enough balance', function () {
                var amount = initialSupply.add(1);
                it('emits an approval event', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var tx, rx;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, increaseAllowance(this.token, initialHolder, spender, amount)];
                                case 1:
                                    tx = _a.sent();
                                    return [4 /*yield*/, tx.wait()];
                                case 2:
                                    rx = _a.sent();
                                    expectEvent(rx, 'Approval', {
                                        src: initialHolder.address,
                                        usr: spender.address,
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
                                    case 0: return [4 /*yield*/, increaseAllowance(this.token, initialHolder, spender, amount)];
                                    case 1:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, this.token.allowance(initialHolder.address, spender.address)];
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
                                    case 0: return [4 /*yield*/, this.token.connect(initialHolder).approve(spender.address, ethers_1.constants.One)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    it('increases the spender allowance adding the requested amount', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, increaseAllowance(this.token, initialHolder, spender, amount)];
                                    case 1:
                                        _b.sent();
                                        _a = expect;
                                        return [4 /*yield*/, this.token.allowance(initialHolder.address, spender.address)];
                                    case 2:
                                        _a.apply(void 0, [_b.sent()]).to.eql(amount.add(1));
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
            });
        });
        /* // null checks not part of spec
        describe('when the spender is the zero address', function () {
          const spender = ZERO_ADDRESS;
    
          it('reverts', async function () {
            await expectRevert(
              increaseAllowance(this.token, initialHolder, spender, amount), 'ERC20: approve to the zero address',
            );
          });
        });
        */
    });
    describe('_mint', function () {
        var amount = BigNumber.from(50);
        /* // null checks not part of spec
        it('rejects a null account', async function () {
          await expectRevert(
            this.token.mint(ZERO_ADDRESS, amount), 'VM Exception while processing transaction: revert unimplemented',
          );
        });
        */
        describe('for a non zero account', function () {
            beforeEach('minting', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var tx, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, this.token.mint(recipient.address, amount)];
                            case 1:
                                tx = _b.sent();
                                _a = this;
                                return [4 /*yield*/, tx.wait()];
                            case 2:
                                _a.rx = _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('increments totalSupply', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var expectedSupply, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                expectedSupply = initialSupply.add(amount);
                                _a = expect;
                                return [4 /*yield*/, this.token.totalSupply()];
                            case 1:
                                _a.apply(void 0, [_b.sent()]).to.eql(expectedSupply);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('increments recipient balance', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = expect;
                                return [4 /*yield*/, this.token.balanceOf(recipient.address)];
                            case 1:
                                _a.apply(void 0, [_b.sent()]).to.eql(amount);
                                return [2 /*return*/];
                        }
                    });
                });
            });
            it('emits Mint event', function () {
                return __awaiter(this, void 0, void 0, function () {
                    var event;
                    return __generator(this, function (_a) {
                        event = expectEvent(this.rx, 'Mint', {
                            caller: initialHolder.address,
                            user: recipient.address,
                            wad: amount
                        });
                        return [2 /*return*/];
                    });
                });
            });
            /*
                  it('emits Transfer event', async function () {
                    const event = expectEvent(this.rx, 'Transfer', {
                      src: ZERO_ADDRESS,
                      dst: recipient,
                    });
            
                    expect(event.args.wad).to.be.bignumber.equal(amount);
                  });
            */
        });
    });
    describe('_burn', function () {
        /* // null checks not part of spec
        it('rejects a null account', async function () {
          await expectRevert(this.token.burn(ZERO_ADDRESS, new BN(1)),
            'ERC20: burn from the zero address');
        });
        */
        describe('for a non zero account', function () {
            it('rejects burning more than balance', function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, expectRevert(this.token.burn(initialHolder.address, initialSupply.add(1)), 'ErrUnderflow')];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            });
            var describeBurn = function (description, amount) {
                describe(description, function () {
                    beforeEach('burning', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var tx, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this.token.connect(initialHolder).burn(initialHolder.address, amount)];
                                    case 1:
                                        tx = _b.sent();
                                        _a = this;
                                        return [4 /*yield*/, tx.wait()];
                                    case 2:
                                        _a.rx = _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    it('decrements totalSupply', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var expectedSupply, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        expectedSupply = initialSupply.sub(amount);
                                        _a = expect;
                                        return [4 /*yield*/, this.token.totalSupply()];
                                    case 1:
                                        _a.apply(void 0, [_b.sent()]).to.eql(expectedSupply);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    it('decrements initialHolder balance', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var expectedBalance, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        expectedBalance = initialSupply.sub(amount);
                                        _a = expect;
                                        return [4 /*yield*/, this.token.balanceOf(initialHolder.address)];
                                    case 1:
                                        _a.apply(void 0, [_b.sent()]).to.be.eql(expectedBalance);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    it('emits Burn event', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var event;
                            return __generator(this, function (_a) {
                                event = expectEvent(this.rx, 'Burn', {
                                    caller: initialHolder.address,
                                    user: initialHolder.address,
                                    wad: amount
                                });
                                return [2 /*return*/];
                            });
                        });
                    });
                    /*
                              it('emits Transfer event', async function () {
                                const event = expectEvent(this.rx, 'Transfer', {
                                  src: initialHolder,
                                  dst: ZERO_ADDRESS,
                                });
                    
                                expect(event.args.wad).to.be.bignumber.equal(amount);
                              });
                    */
                });
            };
            describeBurn('for entire balance', initialSupply);
            describeBurn('for less amount than balance', initialSupply.sub(1));
        });
    });
    /*
    describe('_transfer', function () {
      shouldBehaveLikeERC20Transfer('ERC20', initialHolder, recipient, initialSupply, function (from, to, amount) {
        return this.token.transferInternal(from, to, amount, {from: initialHolder});
      });
  
      describe('when the sender is the zero address', function () {
        it('reverts', async function () {
          await expectRevert(this.token.transferInternal(ZERO_ADDRESS, recipient, initialSupply),
            'ERC20: transfer from the zero address',
          );
        });
      });
    });
    */
    /*
    describe('_approve', function () {
      shouldBehaveLikeERC20Approve('ERC20', initialHolder, recipient, initialSupply, function (owner, spender, amount) {
        return this.token.approveInternal(owner, spender, amount, {from: initialHolder});
      });
  
      describe('when the owner is the zero address', function () {
        it('reverts', async function () {
          await expectRevert(this.token.approveInternal(ZERO_ADDRESS, recipient, initialSupply),
            'ERC20: approve from the zero address',
          );
        });
      });
    });
    */
});
