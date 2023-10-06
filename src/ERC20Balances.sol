// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

interface ERC20 {
    function balanceOf(address) external view returns (uint256);
}

contract ERC20Balances {
    constructor(address user, address[] memory tokens) payable {
        uint256[] memory balances = new uint256[](tokens.length);
        for (uint256 i = 0; i < tokens.length;) {
            balances[i] = ERC20(tokens[i]).balanceOf(user);
            unchecked {
                ++i;
            }
        }
        bytes memory data = abi.encode(balances);
        assembly {
            let dataStart := add(data, 0x20)
            return(dataStart, sub(msize(), dataStart))
        }
    }
}
