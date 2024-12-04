const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentityVerificationManager", function() {
  let identityVerification;
  let identiToken;
  let owner;
  let verifier;
  let user;

  beforeEach(async function() {
    [owner, verifier, user] = await ethers.getSigners();

    const IdentityVerificationManager = await ethers.getContractFactory("IdentityVerificationManager");
    identityVerification = await IdentityVerificationManager.deploy(owner.address);
    await identityVerification.waitForDeployment();

    const IdentiToken = await ethers.getContractFactory("IdentiToken");
    identiToken = await IdentiToken.deploy(await identityVerification.getAddress());
    await identiToken.waitForDeployment();

    await identityVerification.setTokenContract(await identiToken.getAddress());
  });

  describe("Gestión de verificadores", function() {
    it("Solo el owner puede añadir verificadores", async function() {
      await expect(
        identityVerification.connect(verifier).addVerifier(verifier.address)
      ).to.be.reverted;

      await expect(identityVerification.addVerifier(verifier.address))
        .to.emit(identityVerification, "VerifierAdded")
        .withArgs(verifier.address);
    });
  });
});