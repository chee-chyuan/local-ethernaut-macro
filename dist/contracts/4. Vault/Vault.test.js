"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const VaultHelper_1 = __importDefault(require("./VaultHelper"));
let victim;
describe("Attacking Vault", function () {
    beforeEach(async () => {
        const Victim = await hardhat_1.ethers.getContractFactory("Vault");
        victim = await Victim.deploy(hardhat_1.ethers.utils.formatBytes32String("A very strong password"));
    });
    // Get this to pass!
    it("Succesfully unlock the vault", async () => {
        await (0, VaultHelper_1.default)(victim);
        const locked = await victim.locked();
        (0, chai_1.expect)(locked).to.be.equal(false);
    });
});
