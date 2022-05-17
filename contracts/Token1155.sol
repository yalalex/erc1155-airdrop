// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Token1155 is ERC1155, Ownable {
    
    string public name; //NFT collection name
    string public path = "https://gateway.pinata.cloud/ipfs/XXX/"; //initial uri. Replace triple X with your collection IPFS

    constructor(string memory _name, uint256 _quantity, uint256 _id, address _airdropContractAddress)
        ERC1155("https://gateway.pinata.cloud/ipfs/XXX/{id}.json") //replace triple X with your collection IPFS
    {
        name = _name;
        _mint(msg.sender, _id, _quantity, "");
        _setApprovalForAll(msg.sender, _airdropContractAddress, true);
    }

    function uri(uint256 _tokenId) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                path, 
                Strings.toString(_tokenId), 
                ".json"
            )
        );
    } 

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
        path = newuri;
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