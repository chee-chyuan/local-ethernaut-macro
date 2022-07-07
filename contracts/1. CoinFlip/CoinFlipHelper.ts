import { expect } from "chai";
import { ethers } from "hardhat";

const helper = async (victim: any, attacker: any) => {
  // add code here that will help you pass the test
  const numOfBlocks = 10;

  for (let i = 0; i < numOfBlocks; i++) {
    const tx = await attacker.hackContract();
    await tx.wait();
  }
};

export default helper;
