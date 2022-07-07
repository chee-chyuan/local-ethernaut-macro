"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-waffle");
const config = {
    solidity: {
        compilers: [
            {
                version: "0.8.9"
            },
            {
                version: "0.6.0",
            }
        ],
    },
    defaultNetwork: "localhost",
};
exports.default = config;
