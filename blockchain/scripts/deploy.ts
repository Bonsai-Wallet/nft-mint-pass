import { ethers } from 'hardhat';

async function main() {
  const MintPass = await ethers.getContractFactory('MintPass');
  const mintPass = await MintPass.deploy();

  await mintPass.deployed();

  console.log(`Mint pass contract deployed`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
