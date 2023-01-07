pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// import "hardhat/console.sol";

contract MintPass is ERC721URIStorage, Ownable {
    bool public saleIsActive = false;
    uint256 public totalMintPass = 5000;
    uint256 public availableMintPass = 5000;
    uint256 public tokenPrice = 0.07 ether;

    mapping(address => uint256[]) public holderTokenIDs;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("BonsaiMintPass", "BMP") {}

    function mintItem(address to, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        require(availableMintPass > 0, "NFT Pass are sold out");
        require(msg.value >= tokenPrice, "Not Enough ETH");
        require(saleIsActive, "Tickets are not on sale");

        uint256 newItemId = _tokenIds.current();

        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        availableMintPass = availableMintPass - 1;

        return newItemId;
    }

    function aavailableMintPassCount() public view returns (uint256) {
        return availableMintPass;
    }

    function totalMintPassCount() public view returns (uint256) {
        return totalMintPass;
    }

    function openSale() public onlyOwner {
        saleIsActive = true;
    }

    function closeSale() public onlyOwner {
        saleIsActive = false;
    }
}
