require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    educhain: {
      url: process.env.EDUCHAIN_RPC_URL || process.env.API_URL,
      accounts: process.env.ACCOUNT_PRIVATE_KEY ? [process.env.ACCOUNT_PRIVATE_KEY] : process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};


