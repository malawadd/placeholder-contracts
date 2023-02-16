// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {

  console.log("***********multicall*************")
  const Multicall = await ethers.getContractFactory("Multicall");
  const multicall = await Multicall.deploy();
  await multicall.deployed()
  console.log(`Init code has been deployed to ${multicall.address}`)




  fs.writeFileSync(
    "./multicall.js", `
    export const multicall = "${multicall}";
    `
  )
  }


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
