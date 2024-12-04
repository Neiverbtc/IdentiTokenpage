const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentiTokenConfig", function() {
    let tokenConfigTest;
    
    beforeEach(async function() {
        const TestContract = await ethers.getContractFactory("IdentiTokenConfigTest");
        tokenConfigTest = await TestContract.deploy();
        await tokenConfigTest.waitForDeployment();
    });

    describe("Configuración de Recompensas", function() {
        it("Debe tener los valores correctos para las recompensas", async function() {
            const verificationReward = await tokenConfigTest.getVerificationReward();
            expect(verificationReward).to.equal(ethers.parseEther("100"));

            const maxDailyReward = await tokenConfigTest.getMaxDailyReward();
            expect(maxDailyReward).to.equal(ethers.parseEther("1000"));

            const minActivityReward = await tokenConfigTest.getMinActivityReward();
            expect(minActivityReward).to.equal(ethers.parseEther("1"));

            const maxActivityReward = await tokenConfigTest.getMaxActivityReward();
            expect(maxActivityReward).to.equal(ethers.parseEther("50"));

            const initialSupply = await tokenConfigTest.getInitialSupply();
            expect(initialSupply).to.equal(ethers.parseEther("10000000"));

            const rewardCooldown = await tokenConfigTest.getRewardCooldown();
            expect(rewardCooldown).to.equal(24 * 60 * 60); // 24 horas en segundos
        });
    });
});