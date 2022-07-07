"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper = async (victim, attacker) => {
    // add code here that will help you pass the test
    const numOfBlocks = 10;
    for (let i = 0; i < numOfBlocks; i++) {
        const tx = await attacker.hackContract();
        await tx.wait();
    }
};
exports.default = helper;
