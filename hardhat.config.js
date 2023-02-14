require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "mantle",
  networks: {
    mantle: {
      chainId: 5001,
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [process.env.PRIVATE_KEY],
  },
  mumbai: {
    url: process.env.MUMBAI,
    accounts: [process.env.PRIVATE_KEY],

  },
  },
  solidity: {
    compilers: [{
      version: "0.8.7",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }]}
};
