"use strict";
// modified version openzeppelin-contracts draft-ERC20Permit.test.js
//   https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/test/token/ERC20/extensions/draft-ERC20Permit.test.js
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
/* eslint-disable */
var hardhat_1 = require("hardhat");
var hh = __importStar(require("hardhat"));
var minihat_1 = require("minihat");
var expect = require('chai').expect;
var expectRevert = function (f, msg) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, expect(f).rejectedWith(msg)];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); }); };
var BN = require('bn.js').BN;
var constants = hardhat_1.ethers.constants, BigNumber = hardhat_1.ethers.BigNumber, utils = hardhat_1.ethers.utils;
var Permit = [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
];
var hre = require('hardhat');
describe('ERC20Permit', function () {
    var initialHolder, spender, recipient, other;
    var name = utils.formatBytes32String('GemPermit');
    var symbol = utils.formatBytes32String('GEM');
    var version = '0';
    var initialSupply = BigNumber.from(100);
    var chainId;
    var gem;
    var gem_type;
    var gemfab;
    var gemfab_type;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        var gemaddr;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
                case 1:
                    _a = _b.sent(), initialHolder = _a[0], spender = _a[1], recipient = _a[2], other = _a[3];
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('Gem', initialHolder)];
                case 2:
                    gem_type = _b.sent();
                    return [4 /*yield*/, hardhat_1.ethers.getContractFactory('GemFab', initialHolder)];
                case 3:
                    gemfab_type = _b.sent();
                    return [4 /*yield*/, gemfab_type.deploy()];
                case 4:
                    gemfab = _b.sent();
                    return [4 /*yield*/, gemfab.callStatic.build(name, symbol)];
                case 5:
                    gemaddr = _b.sent();
                    return [4 /*yield*/, (0, minihat_1.send)(gemfab.build, name, symbol)];
                case 6:
                    _b.sent();
                    gem = gem_type.attach(gemaddr);
                    return [4 /*yield*/, (0, minihat_1.snapshot)(hh)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, hh.network.config.chainId];
                case 8:
                    chainId = _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, minihat_1.revert)(hh)];
                    case 1:
                        _b.sent();
                        this.token = gem;
                        // We get the chain id from the contract because Ganache (used for coverage) does not return the same chain id
                        // from within the EVM as from the JSON RPC interface.
                        // See https://github.com/trufflesuite/ganache-core/issues/515
                        //this.chainId = await this.token.getChainId();
                        //Gem doesn't have getChainId...hh env has same chainid
                        _a = this;
                        return [4 /*yield*/, hh.network.config.chainId];
                    case 2:
                        // We get the chain id from the contract because Ganache (used for coverage) does not return the same chain id
                        // from within the EVM as from the JSON RPC interface.
                        // See https://github.com/trufflesuite/ganache-core/issues/515
                        //this.chainId = await this.token.getChainId();
                        //Gem doesn't have getChainId...hh env has same chainid
                        _a.chainId = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('initial nonce is 0', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = expect;
                        return [4 /*yield*/, this.token.nonces(initialHolder.address)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eql(constants.Zero);
                        return [2 /*return*/];
                }
            });
        });
    });
    /*
    it('domain separator', async function () {
      expect(
        await this.token.DOMAIN_SEPARATOR(),
      ).to.equal(
        await domainSeparator(name, version, this.chainId, this.token.address),
      );
    });
     */
    describe('permit', function () {
        var _this = this;
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
        var nonce = 0;
        var deadline = constants.MaxUint256;
        var value;
        before(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                value = {
                    owner: initialHolder.address,
                    spender: spender.address,
                    value: 42,
                    nonce: nonce,
                    deadline: deadline
                };
                domain.chainId = chainId;
                domain.verifyingContract = gem.address;
                return [2 /*return*/];
            });
        }); });
        it('accepts owner signature', function () {
            return __awaiter(this, void 0, void 0, function () {
                var signature, _a, v, r, s, receipt, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, initialHolder._signTypedData(domain, types, value)];
                        case 1:
                            signature = _d.sent();
                            _a = hardhat_1.ethers.utils.splitSignature(signature), v = _a.v, r = _a.r, s = _a.s;
                            return [4 /*yield*/, this.token.permit(initialHolder.address, spender.address, value.value, value.deadline, v, r, s)];
                        case 2:
                            receipt = _d.sent();
                            _b = expect;
                            return [4 /*yield*/, this.token.nonces(initialHolder.address)];
                        case 3:
                            _b.apply(void 0, [_d.sent()]).to.eql(hardhat_1.ethers.constants.One);
                            _c = expect;
                            return [4 /*yield*/, this.token.allowance(initialHolder.address, spender.address)];
                        case 4:
                            _c.apply(void 0, [_d.sent()]).to.eql(BigNumber.from(value.value));
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('rejects reused signature', function () {
            return __awaiter(this, void 0, void 0, function () {
                var signature, _a, v, r, s;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, initialHolder._signTypedData(domain, types, value)];
                        case 1:
                            signature = _b.sent();
                            _a = hardhat_1.ethers.utils.splitSignature(signature), v = _a.v, r = _a.r, s = _a.s;
                            return [4 /*yield*/, this.token.permit(initialHolder.address, spender.address, value.value, value.deadline, v, r, s)];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, expectRevert(this.token.permit(initialHolder.address, spender.address, value.value, value.deadline, v, r, s), 'ErrPermitSignature')];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('rejects other signature', function () {
            return __awaiter(this, void 0, void 0, function () {
                var signature, _a, v, r, s;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, other._signTypedData(domain, types, value)];
                        case 1:
                            signature = _b.sent();
                            _a = hardhat_1.ethers.utils.splitSignature(signature), v = _a.v, r = _a.r, s = _a.s;
                            return [4 /*yield*/, expectRevert(this.token.permit(initialHolder.address, spender.address, value.value, value.deadline, v, r, s), 'ErrPermitSignature')];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('rejects expired permit', function () {
            return __awaiter(this, void 0, void 0, function () {
                var signature, _a, v, r, s;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            value.deadline = Math.floor(Date.now() / 1000) - 10;
                            return [4 /*yield*/, initialHolder._signTypedData(domain, types, value)];
                        case 1:
                            signature = _b.sent();
                            _a = hardhat_1.ethers.utils.splitSignature(signature), v = _a.v, r = _a.r, s = _a.s;
                            return [4 /*yield*/, expectRevert(this.token.permit(initialHolder.address, spender.address, value.value, value.deadline, v, r, s), 'ErrPermitDeadline')];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
