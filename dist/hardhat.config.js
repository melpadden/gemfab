"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-ethers");
require("./task/deploy-gemfab");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
exports.default = {
    paths: {
        sources: "./src"
    },
    solidity: {
        version: '0.8.15',
        settings: {
            optimizer: {
                enabled: true,
                runs: 20000
            }
        }
    }
};
