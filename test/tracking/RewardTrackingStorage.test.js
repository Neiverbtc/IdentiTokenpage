const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("RewardTrackingStorage", function() {
  let rewardTrackingTest;
  let owner;
  let user;

  beforeEach(async function() {
    [owner, user] = await ethers.getSigners();
    
    const RewardTrackingTest = await ethers.getContractFactory("RewardTrackingTest");
    rewardTrackingTest = await RewardTrackingTest.deploy();
    await rewardTrackingTest.waitForDeployment();
  });

  describe("Tracking de recompensas", function() {
    it("Debe actualizar el tracking correctamente", async function() {
      const amount = ethers.parseEther("100");
      await expect(rewardTrackingTest.updateRewardTracking(user.address, amount))
        .to.not.be.reverted;

      const [totalDiario, ultimaRecompensa] = await rewardTrackingTest.getRewardTracking(user.address);
      expect(totalDiario).to.equal(amount);
      expect(ultimaRecompensa).to.be.closeTo(
        BigInt(await time.latest()),
        BigInt(2)
      );
    });

    it("Debe resetear el contador diario después de 24 horas", async function() {
      const amount = ethers.parseEther("100");
      
      // Primera recompensa
      await rewardTrackingTest.updateRewardTracking(user.address, amount);
      
      // Avanzar 24 horas
      await time.increase(24 * 60 * 60);
      
      // Segunda recompensa
      await rewardTrackingTest.updateRewardTracking(user.address, amount);
      
      const [totalDiario] = await rewardTrackingTest.getRewardTracking(user.address);
      expect(totalDiario).to.equal(amount);
    });

    it("Debe revertir si excede el límite diario", async function() {
      const amount = ethers.parseEther("5001");
      await expect(rewardTrackingTest.updateRewardTracking(user.address, amount))
        .to.be.revertedWithCustomError(rewardTrackingTest, "DailyRewardLimitExceeded");
    });
  });
});