// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "erc721a/contracts/ERC721A.sol";

contract Event3 is ERC721A {
    constructor() ERC721A("Event3", "E3") {}

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return "ipfs://bafkreiao2zhe37fou342rfrpowhqnvcaudpyus7nuxwcklzzfu3kwbrsca";
    }

    function mint(uint256 quantity) external payable {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        _mint(msg.sender, quantity);
    }
}
