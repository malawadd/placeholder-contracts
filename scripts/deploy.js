// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  
console.log("Deploying contracts with the account:");
  // USDC mock tokens (local only)

  //addrs :0xB11011307e0F3c805387c10aa69F874244b1bec3
  const MockToken = await hre.ethers.getContractFactory("MockToken");
  const usdc = await MockToken.deploy("USDC", "USDC", 6 );
  await usdc.deployed();
  console.log("usdc:", usdc.address);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
