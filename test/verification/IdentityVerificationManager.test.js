const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentityVerificationManager", function() {
    let verificationManager;
    let identiToken;
    let owner;
    let verifier;
    let user;

    beforeEach(async function() {
        [owner, verifier, user] = await ethers.getSigners();

        // Desplegar IdentityVerificationManager
        const IdentityVerificationManager = await ethers.getContractFactory("contracts/verification/IdentityVerificationManager.sol:IdentityVerificationManager");
        verificationManager = await IdentityVerificationManager.deploy(owner.address);
        await verificationManager.waitForDeployment();

        // Desplegar IdentiToken
        const IdentiToken = await ethers.getContractFactory("contracts/token/IdentiToken.sol:IdentiToken");
        identiToken = await IdentiToken.deploy(await verificationManager.getAddress());
        await identiToken.waitForDeployment();

        // Configurar el contrato de token
        await verificationManager.setTokenContract(await identiToken.getAddress());
    });

    describe("Gestión de Verificadores", function() {
        it("Solo el owner puede añadir verificadores", async function() {
            await expect(
                verificationManager.connect(verifier).addVerifier(verifier.address)
            ).to.be.reverted;

            await expect(verificationManager.addVerifier(verifier.address))
                .to.emit(verificationManager, "VerifierAdded")
                .withArgs(verifier.address);
        });
    });
});