const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Bonsai Mint Pass contract', function () {
  let MintPass: {
    deployed: () => any;
    totalMintPass: () => any;
    availableMintPass: () => any;
    tokenPrice: () => any;
    openSale: () => void;
    mintItem: (
      arg0: string,
      arg1: string,
      arg2: { value: bigint; from: any }
    ) => void;
    closeSale: () => void;
  };

  before((done) => {
    setTimeout(done, 2000);
  });

  beforeEach(async () => {
    const MintPassConttract = await ethers.getContractFactory('MintPass');
    MintPass = await MintPassConttract.deploy();
    await MintPass.deployed();
  });

  afterEach((done) => {
    setTimeout(done, 1000);
  });

  describe('Mint Contract', function () {
    const tokenURI = 'someTokenURI/1';

    it.only('Should return excpeted values', async function () {
      expect(await MintPass.totalMintPass()).to.equal('5000');
      expect(await MintPass.availableMintPass()).to.equal('5000');
      expect(await MintPass.tokenPrice()).to.equal(70000000000000000n);
    });

    it('should mint an NFT pass if Sale is active', async () => {
      const [owner, addr1] = await ethers.getSigners();
      const obj = { value: 70000000000000000n, from: owner.address };

      MintPass.openSale();

      expect(await MintPass.availableMintPass()).to.equal('5000');
      MintPass.mintItem(addr1.address, tokenURI, obj);
      expect(await MintPass.availableMintPass()).to.equal('4999');
    });

    it('should mot mint an NFT pass if Sale closed', async () => {
      const [owner, addr1] = await ethers.getSigners();
      const obj = { value: 70000000000000000n, from: owner.address };

      MintPass.closeSale();
      MintPass.mintItem(addr1.address, tokenURI, obj);

      expect(await MintPass.availableMintPass()).to.equal('5000');
      await expect(
        MintPass.mintItem(addr1.address, tokenURI, obj)
      ).to.be.revertedWith('Tickets are not on sale');
    });

    it('should mot mint an NFT pass if value is less than 0.07 eth', async () => {
      const [owner, addr1] = await ethers.getSigners();
      const obj = { value: 40000000000000000n, from: owner.address };
      const tokenURI = 'someTokenURI/1';

      MintPass.closeSale();

      MintPass.mintItem(addr1.address, tokenURI, obj);
      await expect(
        MintPass.mintItem(addr1.address, tokenURI, obj)
      ).to.be.revertedWith('Not Enough ETH');
      expect(await MintPass.availableMintPass()).to.equal('5000');
    });
  });
});
