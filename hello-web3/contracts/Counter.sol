// SPDX-License-Identifier: UNLICENSE

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint256 counts;

    constructor() {
        counts = 0;
    }

    function add() public {
        counts++;
    }

    function decrement() public {
        counts--;
    }

    function getCounts() public view returns (uint256) {
        return counts;
    }
}
