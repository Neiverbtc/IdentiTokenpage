const { ethers } = require('hardhat');

class DeployHelper {
  constructor(network, signer) {
    this.network = network;
    this.signer = signer;
    this.deployedContracts = new Map();
  }

  async deployOrAttach(name, contractName, existingAddress, ...args) {
    try {
      console.log(`\nVerificando ${name}...`);
      
      if (existingAddress) {
        console.log(`${name} ya desplegado en:`, existingAddress);
        const Contract = await ethers.getContractFactory(contractName, this.signer);
        const contract = Contract.attach(existingAddress);
        this.deployedContracts.set(name, contract);
        return contract;
      }

      console.log(`Desplegando ${name}...`);
      const Contract = await ethers.getContractFactory(contractName, this.signer);
      const contract = await Contract.deploy(...args);
      await contract.waitForDeployment();
      const address = await contract.getAddress();
      console.log(`${name} desplegado en:`, address);
      
      this.deployedContracts.set(name, contract);
      return contract;
    } catch (error) {
      console.error(`Error al desplegar/conectar ${name}:`, error);
      throw error;
    }
  }

  getDeployedAddresses() {
    const addresses = {};
    for (const [name, contract] of this.deployedContracts.entries()) {
      addresses[name] = contract.target;
    }
    return addresses;
  }
}

module.exports = DeployHelper;