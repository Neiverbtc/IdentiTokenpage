const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentiToken", function() {
  let identiToken;
  let identityVerification;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function() {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Desplegar IdentityVerificationManager
    const IdentityVerification = await ethers.getContractFactory("IdentityVerificationManager");
    identityVerification = await IdentityVerification.deploy(owner.address);
    await identityVerification.waitForDeployment();

    // Desplegar IdentiToken
    const IdentiToken = await ethers.getContractFactory("IdentiToken");
    identiToken = await IdentiToken.deploy(await identityVerification.getAddress());
    await identiToken.waitForDeployment();

    // Actualizar la dirección del token en IdentityVerificationManager
    await identityVerification.setTokenContract(await identiToken.getAddress());
  });

  describe("Funcionalidad básica", function() {
    it("Debe tener el nombre y símbolo correctos", async function() {
      expect(await identiToken.name()).to.equal("IdentiToken");
      expect(await identiToken.symbol()).to.equal("IDT");
    });

    it("Debe asignar el suministro total al creador", async function() {
      const totalSupply = await identiToken.totalSupply();
      const ownerBalance = await identiToken.balanceOf(owner.address);
      expect(ownerBalance).to.equal(totalSupply);
    });
  });
});