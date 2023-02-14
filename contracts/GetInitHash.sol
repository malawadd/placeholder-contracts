// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './ManaclesPair.sol';

contract CallHash {
    function getInitHash() public pure returns(bytes32){
        bytes memory bytecode = type(ManaclesPair).creationCode;
        return keccak256(abi.encodePacked(bytecode));
    }
}