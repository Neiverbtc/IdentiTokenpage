const { ethers } = require('ethers');

class ContractInteractionManager {
  constructor(provider) {
    this.provider = provider;
    this.contracts = {};
  }

  async connectToContract(name, address, abi) {
    try {
      const contract = new ethers.Contract(address, abi, this.provider);
      this.contracts[name] = contract;
      return contract;
    } catch (error) {
      console.error(`Error al conectar con el contrato ${name}:`, error);
      throw error;
    }
  }

  async validateContractInteraction(contractName) {
    const contract = this.contracts[contractName];
    if (!contract) {
      throw new Error(`Contrato ${contractName} no encontrado`);
    }
    
    try {
      // Validar que el contrato responde
      await contract.provider.getCode(contract.target);
      return true;
    } catch (error) {
      console.error(`Error al validar contrato ${contractName}:`, error);
      return false;
    }
  }

  getContractAddresses() {
    return Object.entries(this.contracts).reduce((acc, [name, contract]) => {
      acc[name] = contract.target;
      return acc;
    }, {});
  }
}

module.exports = ContractInteractionManager;