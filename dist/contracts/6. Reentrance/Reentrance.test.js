"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
let victim;
let attacker;
describe("Attacking Reentrance", function () {
    beforeEach(async () => {
        const Victim = await hardhat_1.ethers.getContractFactory("Reentrance");
        victim = await Victim.deploy({ value: 5 });
        const Attacker = await hardhat_1.ethers.getContractFactory("AttackingReentrance");
        attacker = await Attacker.deploy(victim.address, { value: 1 });
    });
    // Get this to pass!
    it("Succesfully take all the ETH out of the contract", async () => {
        await attacker.hackContract();
        const provider = hardhat_1.waffle.provider;
        const balance = await provider.getBalance(victim.address);
        (0, chai_1.expect)(balance).to.equal(0);
    });
});
