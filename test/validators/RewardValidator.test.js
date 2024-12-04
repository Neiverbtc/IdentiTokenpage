const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RewardValidator", function() {
  let rewardValidatorTest;
  let owner;
  const MIN_REWARD = ethers.parseEther("0.01");
  const MAX_REWARD = ethers.parseEther("1000");

  before(async function() {
    [owner] = await ethers.getSigners();
    
    const RewardValidatorTest = await ethers.getContractFactory("RewardValidatorTest");
    rewardValidatorTest = await RewardValidatorTest.deploy();
    await rewardValidatorTest.waitForDeployment();
  });

  describe("Validación de operaciones de recompensa", function() {
    it("Debe validar una operación correcta", async function() {
      const amount = ethers.parseEther("1");
      await expect(rewardValidatorTest.validarOperacion(owner.address, amount))
        .to.not.be.reverted;
    });

    it("Debe revertir con recompensa muy pequeña", async function() {
      const amount = ethers.parseEther("0.009");
      await expect(rewardValidatorTest.validarOperacion(owner.address, amount))
        .to.be.revertedWithCustomError(rewardValidatorTest, "InvalidAmount");
    });

    it("Debe revertir con recompensa muy grande", async function() {
      const amount = ethers.parseEther("1001");
      await expect(rewardValidatorTest.validarOperacion(owner.address, amount))
        .to.be.revertedWithCustomError(rewardValidatorTest, "InvalidAmount");
    });
  });
});