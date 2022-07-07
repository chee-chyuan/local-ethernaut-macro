"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
let victim;
let attacker;
let hacker;
let deployer;
let kingPlayer;
describe("Attacking King", function () {
    beforeEach(async () => {
        [hacker, deployer, kingPlayer] = await hardhat_1.ethers.getSigners();
        const Victim = await hardhat_1.ethers.getContractFactory("King");
        victim = await Victim.connect(deployer).deploy({
            value: hardhat_1.ethers.utils.parseEther("1"),
        });
        const Attacker = await hardhat_1.ethers.getContractFactory("AttackingKing");
        attacker = await Attacker.connect(hacker).deploy(victim.address, {
            value: hardhat_1.ethers.utils.parseEther("5"),
        });
    });
    // Get this to pass!
    it("Succesfully become and remain the king forever", async () => {
        await attacker.hackContract({ gasLimit: 30000000 });
        try {
            await kingPlayer.sendTransaction({
                value: hardhat_1.ethers.utils.parseEther("100"),
                to: victim.address,
                gasLimit: 30000000,
            });
        }
        catch (error) {
            console.log("error: ", error);
        }
        const king = await victim._king();
        (0, chai_1.expect)(king).to.not.equal(kingPlayer.address);
    });
});
