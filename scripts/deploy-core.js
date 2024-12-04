const hre = require("hardhat");
const ContractAddressManager = require('../utils/contractAddresses');
const DeployHelper = require('../utils/deployHelper');

const NETWORK = 'core_testnet';

const CONTRACT_NAMES = {
    VERIFICATION_MANAGER: "IdentityVerificationManager",
    ACTIVITY_TRACKER: "ActivityTracker",
    REWARD_DISTRIBUTOR: "RewardDistributor",
    IDENTI_TOKEN: "IdentiToken"
};

async function main() {
    try {
        console.log("Iniciando despliegue de contratos en Core Blockchain Testnet...");

        const [deployer] = await ethers.getSigners();
        console.log("Cuenta de despliegue:", deployer.address);
        console.log("Balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "tCORE");

        const addressManager = new ContractAddressManager();
        const addresses = addressManager.loadAddresses()[NETWORK] || {};
        const deployHelper = new DeployHelper(NETWORK, deployer);

        // Sistema de verificación
        const verificationManager = await deployHelper.deployOrAttach(
            "IdentityVerificationManager",
            CONTRACT_NAMES.VERIFICATION_MANAGER,
            addresses.IdentityVerificationManager,
            deployer.address
        );

        // Sistema de tracking y recompensas
        const activityTracker = await deployHelper.deployOrAttach(
            "ActivityTracker",
            CONTRACT_NAMES.ACTIVITY_TRACKER,
            addresses.ActivityTracker
        );

        const rewardDistributor = await deployHelper.deployOrAttach(
            "RewardDistributor",
            CONTRACT_NAMES.REWARD_DISTRIBUTOR,
            addresses.RewardDistributor,
            await activityTracker.getAddress()
        );

        // Sistema de tokens
        const identiToken = await deployHelper.deployOrAttach(
            "IdentiToken",
            CONTRACT_NAMES.IDENTI_TOKEN,
            addresses.IdentiToken,
            await verificationManager.getAddress()
        );

        // Configuración si es nuevo despliegue
        if (!addresses.IdentiToken) {
            console.log("\nConfigurando contratos...");
            
            console.log("- Configurando token en VerificationManager...");
            await verificationManager.setTokenContract(await identiToken.getAddress());
            
            console.log("- Configurando verificador inicial...");
            if (!(await verificationManager.isVerifier(deployer.address))) {
                await verificationManager.addVerifier(deployer.address);
            }
        }

        // Guardar direcciones
        const newAddresses = deployHelper.getDeployedAddresses();
        addressManager.saveAddresses(NETWORK, { ...addresses, ...newAddresses });

        console.log("\nDespliegue completado exitosamente!");

    } catch (error) {
        console.error("\nError durante el despliegue:");
        console.error(error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });