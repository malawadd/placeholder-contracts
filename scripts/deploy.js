// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {

  console.log("***********Deploying Init Gen*************")
  const InitCode = await ethers.getContractFactory("CallHash");
  const initcode = await InitCode.deploy();
  await initcode.deployed()
  console.log(`Init code has been deployed to ${initcode.address}`)




  const genInitCodeHash = await initcode.getInitHash();

  console.log("Generated Init code: ", genInitCodeHash);


    
    console.log("***********Deploying Mock Tokens*************")
    // USDC mock tokens (local only)
    //addrs :0xB11011307e0F3c805387c10aa69F874244b1bec3
    const MockToken = await hre.ethers.getContractFactory("MockToken");
    const usdc = await MockToken.deploy("USDC", "USDC", 6 );
    await usdc.deployed();
    console.log("usdc:", usdc.address);


    // Weth mock tokens (local only)

    const Weth = await MockToken.deploy("Weth", "Weth", 18 );
    await Weth.deployed();
    console.log("Weth:", Weth.address);

    // Wbit mock tokens (local only)

    const Wbit = await MockToken.deploy("Wbit", "Wbit", 18 );
    await Wbit.deployed();
    console.log("Wbit:", Wbit.address);

    // DAI mock tokens (local only)

    const Dai = await MockToken.deploy("Dai", "Dai", 18 );
    await Dai.deployed();
    console.log("Dai:", Dai.address);

     // Deploying ManaclesFactory 
  const feesetterAddress = "0x840C1b6ce85bBFEbcFAd737514c0097B078a7E7E"
  console.log("***********Deploying ManaclesFactory*************")
  const ManaclesFactory = await hre.ethers.getContractFactory("ManaclesFactory");
  console.log("this")
  const manaclesFactory = await ManaclesFactory.deploy(feesetterAddress);
  await manaclesFactory.deployed();
  console.log(`FosowapFactory has been deployed to ${manaclesFactory.address}`);

  // Deploying FoowswapRouter1
  console.log("***********Deploying ManaclesRouter01*************")
  const ManaclesRouter01 = await hre.ethers.getContractFactory("ManaclesRouter01")
  const manaclesRouter01 = await ManaclesRouter01.deploy(manaclesFactory.address, Wbit.address)
  await manaclesRouter01.deployed()
  console.log(`ManaclesRouter01 has been deployed to ${manaclesRouter01.address}`)

  // Deploying FoowswapRouter2
  console.log("***********Deploying ManaclesRouter02*************")
  const ManaclesRouter02 = await hre.ethers.getContractFactory("ManaclesRouter02")
  const manaclesRouter02 = await ManaclesRouter02.deploy(manaclesFactory.address, Wbit.address)
  await manaclesRouter02.deployed()
  console.log(`ManaclesRouter02 has been deployed to ${manaclesRouter02.address}`)

  fs.writeFileSync(
    "./contractAddress.js", `
    export const genInitCodeHash = "${genInitCodeHash}";
    export const usdc = "${usdc.address}";
    export const Weth = "${Weth.address}";
    export const Wbit = "${Wbit.address}";
    export const Dai = "${Dai.address}";
    export const manaclesFactory = "${manaclesFactory.address}";
    export const manaclesRouter01 = "${manaclesRouter01.address}";
    export const manaclesRouter02 = "${manaclesRouter02.address}";
    `
  )
  }


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
