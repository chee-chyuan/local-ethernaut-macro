"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const CoinFlipHelper_1 = __importDefault(require("./CoinFlipHelper"));
let victim;
let attacker;
describe("Attacking CoinFlip", function () {
    beforeEach(async () => {
        const Victim = await hardhat_1.ethers.getContractFactory("CoinFlip");
        victim = await Victim.deploy();
        const Attacker = await hardhat_1.ethers.getContractFactory("AttackingCoinFlip");
        attacker = await Attacker.deploy(victim.address);
    });
    // Get this to pass!
    it("Succesfully guessess the correct outcome 10 times in a row", async () => {
        await (0, CoinFlipHelper_1.default)(victim, attacker);
        const consecutiveWins = await victim.consecutiveWins();
        (0, chai_1.expect)(consecutiveWins).to.be.equal(10);
    });
});
