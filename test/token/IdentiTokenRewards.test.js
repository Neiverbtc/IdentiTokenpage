const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentiTokenRewards", function() {
    let identiTokenRewards;
    let identityVerification;
    let owner;
    let user;
    let verifier;
    let anotherUser;

    beforeEach(async function() {
        [owner, user, verifier, anotherUser] = await ethers.getSigners();

        const IdentityVerificationManager = await ethers.getContractFactory("contracts/verification/IdentityVerificationManager.sol:IdentityVerificationManager");
        identityVerification = await IdentityVerificationManager.deploy(owner.address);
        await identityVerification.waitForDeployment();

        const IdentiToken = await ethers.getContractFactory("contracts/token/IdentiToken.sol:IdentiToken");
        identiTokenRewards = await IdentiToken.deploy(await identityVerification.getAddress());
        await identiTokenRewards.waitForDeployment();

        await identityVerification.setTokenContract(await identiTokenRewards.getAddress());
        await identityVerification.addVerifier(verifier.address);
    });

    describe("Recompensas por Verificación", function() {
        it("Debe recompensar correctamente por verificación de identidad", async function() {
            await identityVerification.connect(verifier).verifyIdentity(user.address);
            
            const balance = await identiTokenRewards.balanceOf(user.address);
            expect(balance).to.equal(ethers.parseEther("100"));
        });

        it("No debe permitir recompensas duplicadas", async function() {
            await identityVerification.connect(verifier).verifyIdentity(user.address);
            
            await expect(
                identityVerification.connect(verifier).verifyIdentity(user.address)
            ).to.be.revertedWithCustomError(identityVerification, "AlreadyVerified");
        });
    });
});