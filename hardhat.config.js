require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    educhain: {
      url: process.env.API_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
};


