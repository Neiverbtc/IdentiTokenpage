require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    core_testnet: {
      url: "https://rpc.test.btcs.network",
      chainId: 1115,
      accounts: [PRIVATE_KEY],
      gasPrice: "auto"
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true
  },
  etherscan: {
    apiKey: {
      core_testnet: "NO_API_KEY_REQUIRED" // Core Testnet no requiere API key para verificación
    },
    customChains: [
      {
        network: "core_testnet",
        chainId: 1115,
        urls: {
          apiURL: "https://scan.test.btcs.network/api",
          browserURL: "https://scan.test.btcs.network"
        }
      }
    ]
  }
};