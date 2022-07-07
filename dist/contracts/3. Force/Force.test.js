"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
let victim;
let attacker;
describe("Attacking Force", function () {
    beforeEach(async () => {
        const Victim = await hardhat_1.ethers.getContractFactory("Force");
        victim = await Victim.deploy();
        const Attacker = await hardhat_1.ethers.getContractFactory("AttackingForce");
        attacker = await Attacker.deploy(victim.address, { value: 100 });
    });
    // Get this to pass!
    it("Succesfully give the force contract some ETH", async () => {
        await attacker.hackContract();
        const provider = hardhat_1.waffle.provider;
        const balance = await provider.getBalance(victim.address);
        (0, chai_1.expect)(balance).to.be.above(0);
    });
});
