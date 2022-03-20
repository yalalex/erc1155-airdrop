// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Token1155 is ERC1155, Ownable {
    
    string public name; //NFT name
    uint256 public quantity; //quantity to mint on contract deployment
    address public approvedAddress; //airdrop contract address
    constructor(string memory _name, uint256 _quantity, address _address)
        ERC1155("https://gateway.pinata.cloud/ipfs/XXX/{id}.json")
    {
        name = _name;
        quantity = _quantity;
        approvedAddress = _address;
        _mint(msg.sender, 1, quantity, "");
        _setApprovalForAll(msg.sender, approvedAddress, true);
    }

    function uri(uint256 _tokenId) override public pure returns (string memory) {
        return string(
            abi.encodePacked(
                "https://gateway.pinata.cloud/ipfs/XXX/", 
                Strings.toString(_tokenId), 
                ".json"
            )
        );
    } 

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }
}