const hre = require("hardhat");

async function validateContract(contract, address) {
  const code = await ethers.provider.getCode(address);
  if (code === '0x') throw new Error(`Contract ${contract} not deployed properly`);
}

async function validateTokenConfig(identiToken, verificationManager, deployer) {
  const name = await identiToken.name();
  const symbol = await identiToken.symbol();
  const totalSupply = await identiToken.totalSupply();
  
  if (name !== "IdentiToken" || symbol !== "IDT") {
    throw new Error("Token configuration invalid");
  }

  const linkedToken = await verificationManager.identiToken();
  if (linkedToken.toLowerCase() !== (await identiToken.getAddress()).toLowerCase()) {
    throw new Error("Token not properly linked to VerificationManager");
  }

  const isVerifier = await verificationManager.isVerifier(deployer.address);
  if (!isVerifier) {
    throw new Error("Verifier role not properly set");
  }

  return { name, symbol, totalSupply };
}

async function main() {
  try {
    console.log("Iniciando despliegue de contratos...");

    const [deployer] = await ethers.getSigners();
    console.log("Desplegando contratos con la cuenta:", deployer.address);
    console.log("Balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");

    // 1. Desplegar contratos base y utilidades
    console.log("\nDesplegando contratos base...");
    
    // BaseValidator
    const BaseValidatorTest = await hre.ethers.getContractFactory("BaseValidatorTest");
    const baseValidator = await BaseValidatorTest.deploy();
    await baseValidator.waitForDeployment();
    console.log("BaseValidator desplegado en:", await baseValidator.getAddress());
    
    // RewardValidator
    const RewardValidatorTest = await hre.ethers.getContractFactory("RewardValidatorTest");
    const rewardValidator = await RewardValidatorTest.deploy();
    await rewardValidator.waitForDeployment();
    console.log("RewardValidator desplegado en:", await rewardValidator.getAddress());

    // 2. Desplegar sistema de tracking y recompensas
    console.log("\nDesplegando sistema de tracking y recompensas...");
    
    // RewardTrackingTest
    const RewardTrackingTest = await hre.ethers.getContractFactory("RewardTrackingTest");
    const rewardTracking = await RewardTrackingTest.deploy();
    await rewardTracking.waitForDeployment();
    console.log("RewardTracking desplegado en:", await rewardTracking.getAddress());

    // ActivityTracker
    const ActivityTracker = await hre.ethers.getContractFactory("ActivityTracker");
    const activityTracker = await ActivityTracker.deploy();
    await activityTracker.waitForDeployment();
    const activityTrackerAddress = await activityTracker.getAddress();
    console.log("ActivityTracker desplegado en:", activityTrackerAddress);

    // RewardDistributor
    const RewardDistributor = await hre.ethers.getContractFactory("RewardDistributor");
    const rewardDistributor = await RewardDistributor.deploy(activityTrackerAddress);
    await rewardDistributor.waitForDeployment();
    const rewardDistributorAddress = await rewardDistributor.getAddress();
    console.log("RewardDistributor desplegado en:", rewardDistributorAddress);

    // 3. Desplegar sistema de verificación
    console.log("\nDesplegando sistema de verificación...");

    // IdentityVerificationBase
    const IdentityVerificationBase = await hre.ethers.getContractFactory("IdentityVerificationBase");
    const verificationBase = await IdentityVerificationBase.deploy(deployer.address);
    await verificationBase.waitForDeployment();
    console.log("IdentityVerificationBase desplegado en:", await verificationBase.getAddress());

    // IdentityVerificationManager
    const IdentityVerificationManager = await hre.ethers.getContractFactory("IdentityVerificationManager");
    const verificationManager = await IdentityVerificationManager.deploy(deployer.address);
    await verificationManager.waitForDeployment();
    const verificationManagerAddress = await verificationManager.getAddress();
    console.log("IdentityVerificationManager desplegado en:", verificationManagerAddress);

    // 4. Desplegar sistema de tokens
    console.log("\nDesplegando sistema de tokens...");

    // IdentiTokenConfig
    const IdentiTokenConfigTest = await hre.ethers.getContractFactory("IdentiTokenConfigTest");
    const tokenConfig = await IdentiTokenConfigTest.deploy();
    await tokenConfig.waitForDeployment();
    console.log("IdentiTokenConfig desplegado en:", await tokenConfig.getAddress());

    // IdentiToken
    const IdentiToken = await hre.ethers.getContractFactory("IdentiToken");
    const identiToken = await IdentiToken.deploy(verificationManagerAddress);
    await identiToken.waitForDeployment();
    const identiTokenAddress = await identiToken.getAddress();
    console.log("IdentiToken desplegado en:", identiTokenAddress);

    // 5. Configurar contratos
    console.log("\nConfigurando contratos...");

    console.log("- Configurando token en VerificationManager...");
    const setTokenTx = await verificationManager.setTokenContract(identiTokenAddress);
    await setTokenTx.wait();

    console.log("- Añadiendo verificador inicial...");
    const addVerifierTx = await verificationManager.addVerifier(deployer.address);
    await addVerifierTx.wait();

    // 6. Validaciones
    console.log("\nValidando configuración...");
    const config = await validateTokenConfig(identiToken, verificationManager, deployer);

    // Verificar tracking de actividad
    console.log("\nVerificando funcionalidad básica...");
    const activityType = "query";
    await activityTracker.recordActivity(deployer.address, activityType);
    const [queries, , , total] = await activityTracker.getUserMetrics(deployer.address);
    if (queries.toString() !== "1" || total.toString() !== "1") {
      throw new Error("Activity tracking not working properly");
    }

    // Verificar configuración de recompensas
    const verificationReward = await tokenConfig.getVerificationReward();
    const maxDailyReward = await tokenConfig.getMaxDailyReward();
    console.log("\nVerificando configuración de recompensas:");
    console.log("- Recompensa por verificación:", ethers.formatEther(verificationReward), "IDT");
    console.log("- Recompensa diaria máxima:", ethers.formatEther(maxDailyReward), "IDT");

    console.log("\nResumen de despliegue:");
    console.log("------------------");
    console.log("Contratos base:");
    console.log("- BaseValidator:", await baseValidator.getAddress());
    console.log("- RewardValidator:", await rewardValidator.getAddress());
    console.log("\nSistema de tracking y recompensas:");
    console.log("- RewardTracking:", await rewardTracking.getAddress());
    console.log("- ActivityTracker:", activityTrackerAddress);
    console.log("- RewardDistributor:", rewardDistributorAddress);
    console.log("\nSistema de verificación:");
    console.log("- IdentityVerificationBase:", await verificationBase.getAddress());
    console.log("- IdentityVerificationManager:", verificationManagerAddress);
    console.log("\nSistema de tokens:");
    console.log("- IdentiTokenConfig:", await tokenConfig.getAddress());
    console.log("- IdentiToken:", identiTokenAddress);
    
    console.log("\nConfiguración del token:");
    console.log("- Nombre:", config.name);
    console.log("- Símbolo:", config.symbol);
    console.log("- Suministro total:", ethers.formatEther(config.totalSupply), "IDT");

    console.log("\nDespliegue completado exitosamente!");
    
  } catch (error) {
    console.error("\nError durante el despliegue:");
    console.error(error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });