const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Bonsai Mint Pass contract', function () {
  let MintPass: { deployed: () => any; totalMintPass: () => any };

  before((done) => {
    setTimeout(done, 2000);
  });

  beforeEach(async () => {
    const MintPassConttract = await ethers.getContractFactory('MintPass');
    MintPass = await MintPassConttract.deploy();
  });

  describe('TotalSupply', function () {
    it('Total Supply should equal to 5000 units', async function () {
      await MintPass.deployed();
      expect(await MintPass.totalMintPass()).to.equal('5000');
    });
  });
});
