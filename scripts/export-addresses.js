const ContractAddressManager = require('../utils/contractAddresses');

async function main() {
  try {
    const addressManager = new ContractAddressManager();
    
    // Exportar direcciones para Core Testnet
    addressManager.exportAddressesMarkdown('core_testnet');
    
    console.log('Exportación de direcciones completada con éxito.');
  } catch (error) {
    console.error('Error durante la exportación:', error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });