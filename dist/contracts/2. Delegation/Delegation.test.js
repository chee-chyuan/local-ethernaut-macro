"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
let victim;
let attacker;
let hacker;
let delegateContract;
let deployer;
describe("Attacking Delegation", function () {
    beforeEach(async () => {
        [hacker, deployer] = await hardhat_1.ethers.getSigners();
        const DelegateContract = await hardhat_1.ethers.getContractFactory("Delegate");
        delegateContract = await DelegateContract.connect(deployer).deploy(deployer.address);
        const Victim = await hardhat_1.ethers.getContractFactory("Delegation");
        victim = await Victim.connect(deployer).deploy(delegateContract.address);
        const Attacker = await hardhat_1.ethers.getContractFactory("AttackingDelegation");
        attacker = await Attacker.deploy(victim.address);
    });
    // Get this to pass!
    it("Succesfully taken ownership", async () => {
        await attacker.hackContract({ gasLimit: 30000000 });
        const owner = await victim.owner();
        (0, chai_1.expect)(owner).to.be.equal(attacker.address);
    });
});
