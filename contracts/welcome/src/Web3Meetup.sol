// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "erc721a/contracts/ERC721A.sol";

contract Web3Meetup is ERC721A {
    constructor() ERC721A("Web3Meetup", "W3M") {}

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return "ipfs://bafkreicbdttmkb4m23a2crl2fwnstcrh4b7nkhhqz5epxebyddcuexu2py";
    }

    function mint(uint256 quantity) external payable {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        _mint(msg.sender, quantity);
    }
}
