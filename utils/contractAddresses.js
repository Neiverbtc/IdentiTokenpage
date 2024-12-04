const fs = require('fs');
const path = require('path');

class ContractAddressManager {
  constructor() {
    this.addressesFile = path.join(__dirname, '../contracts.json');
    this.addresses = this.loadAddresses();
  }

  loadAddresses() {
    try {
      if (fs.existsSync(this.addressesFile)) {
        return JSON.parse(fs.readFileSync(this.addressesFile, 'utf8'));
      }
      return {};
    } catch (error) {
      console.error('Error al cargar las direcciones:', error);
      return {};
    }
  }

  saveAddresses(network, addresses) {
    try {
      const data = {
        ...this.addresses,
        [network]: {
          ...addresses,
          lastUpdated: new Date().toISOString()
        }
      };
      fs.writeFileSync(this.addressesFile, JSON.stringify(data, null, 2));
      console.log(`\nDirecciones guardadas en: ${this.addressesFile}`);
    } catch (error) {
      console.error('Error al guardar las direcciones:', error);
    }
  }

  generateAddressesMarkdown(network) {
    const networkData = this.addresses[network];
    if (!networkData) {
      return 'No hay direcciones registradas para esta red.';
    }

    const { lastUpdated, ...addresses } = networkData;
    let markdown = `# Direcciones de Contratos - ${network}\n\n`;
    markdown += `Última actualización: ${new Date(lastUpdated).toLocaleString()}\n\n`;

    // Contratos Base
    markdown += '## Contratos Base\n\n';
    markdown += '| Contrato | Dirección |\n';
    markdown += '|----------|------------|\n';
    if (addresses.BaseValidator) markdown += `| BaseValidator | \`${addresses.BaseValidator}\` |\n`;
    if (addresses.RewardValidator) markdown += `| RewardValidator | \`${addresses.RewardValidator}\` |\n`;

    // Sistema de Tracking y Recompensas
    markdown += '\n## Sistema de Tracking y Recompensas\n\n';
    markdown += '| Contrato | Dirección |\n';
    markdown += '|----------|------------|\n';
    if (addresses.RewardTracking) markdown += `| RewardTracking | \`${addresses.RewardTracking}\` |\n`;
    if (addresses.ActivityTracker) markdown += `| ActivityTracker | \`${addresses.ActivityTracker}\` |\n`;
    if (addresses.RewardDistributor) markdown += `| RewardDistributor | \`${addresses.RewardDistributor}\` |\n`;

    // Sistema de Verificación
    markdown += '\n## Sistema de Verificación\n\n';
    markdown += '| Contrato | Dirección |\n';
    markdown += '|----------|------------|\n';
    if (addresses.IdentityVerificationManager) {
      markdown += `| IdentityVerificationManager | \`${addresses.IdentityVerificationManager}\` |\n`;
    }

    // Sistema de Tokens
    markdown += '\n## Sistema de Tokens\n\n';
    markdown += '| Contrato | Dirección |\n';
    markdown += '|----------|------------|\n';
    if (addresses.IdentiTokenConfig) markdown += `| IdentiTokenConfig | \`${addresses.IdentiTokenConfig}\` |\n`;
    if (addresses.IdentiToken) markdown += `| IdentiToken | \`${addresses.IdentiToken}\` |\n`;

    return markdown;
  }

  exportAddressesMarkdown(network) {
    const markdown = this.generateAddressesMarkdown(network);
    const outputFile = path.join(__dirname, '../CONTRACT_ADDRESSES.md');
    fs.writeFileSync(outputFile, markdown);
    console.log(`\nDirecciones exportadas a: ${outputFile}`);
  }
}

module.exports = ContractAddressManager;