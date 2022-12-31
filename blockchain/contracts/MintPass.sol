// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/drafts/Counters.sol";

contract MintPassToken is ERC721 {
    bool saleIsActive = false;
    uint256 public totalMintPass = 5000;
    uint256 public availableMintPass = 5000;
    uint256 public tokenPrice = 70000000000000000;

    mapping(address => uint256[]) public holderTokenIDs;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("BonsaiMintPass", "BMP") {}

    function mintItem(address to, string memory uri) public payable {
        require(availableTickets > 0, "NFT Pass are sold out");
        require(saleIsActive, "Tickets are not on sale");

        uint256 newItemId = _tokenIds.current();

        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        availableMintPass = availableMintPass - 1;

        return newItemId;
    }

    function availableTicketsCount() public view returns (uint256) {
        return availableTickets;
    }

    function totalTicketsCount() public view returns (uint256) {
        return totalTickets;
    }

    function openSale() public onlyOwner {
        saleIsActive = true;
    }

    function closeSale() public onlyOwner {
        saleIsActive = false;
    }
}
