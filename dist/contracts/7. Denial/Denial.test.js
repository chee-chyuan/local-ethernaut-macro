"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
let victim;
let attacker;
let deployer;
let hacker;
describe("Attacking Denial", function () {
    beforeEach(async () => {
        [hacker, deployer] = await hardhat_1.ethers.getSigners();
        const Victim = await hardhat_1.ethers.getContractFactory("Denial");
        victim = await Victim.connect(deployer).deploy({
            value: hardhat_1.ethers.utils.parseEther("100"),
        });
        const Attacker = await hardhat_1.ethers.getContractFactory("AttackingDenial");
        attacker = await Attacker.connect(hacker).deploy(victim.address);
        victim.setWithdrawPartner(attacker.address);
    });
    // Get this to pass!
    it("Succesfully stop the owner from withdrawing", async () => {
        const provider = hardhat_1.ethers.provider;
        let error;
        try {
            await provider.getBalance(deployer.address);
            await victim.withdraw();
        }
        catch (err) {
            error = err.message;
        }
        finally {
            if (!error) {
                chai_1.assert.fail("Deployer got their funds!");
            }
            (0, chai_1.expect)(error).to.include("Transaction ran out of gas");
        }
    });
});
