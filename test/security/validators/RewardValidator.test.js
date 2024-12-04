const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("RewardValidator", function() {
    let rewardValidatorTest;
    let owner;
    let user;

    beforeEach(async function() {
        [owner, user] = await ethers.getSigners();
        
        const RewardValidatorTest = await ethers.getContractFactory("RewardValidatorTest");
        rewardValidatorTest = await RewardValidatorTest.deploy();
        await rewardValidatorTest.waitForDeployment();
    });

    describe("Validación de Recompensas", function() {
        it("Debe validar una operación correcta", async function() {
            const amount = ethers.parseEther("10");
            await expect(rewardValidatorTest.validarOperacion(user.address, amount))
                .to.not.be.reverted;
        });

        it("Debe revertir con recompensa muy pequeña", async function() {
            const amount = ethers.parseEther("0.1");
            await expect(rewardValidatorTest.validarOperacion(user.address, amount))
                .to.be.revertedWithCustomError(rewardValidatorTest, "InvalidAmount");
        });

        it("Debe revertir con recompensa muy grande", async function() {
            const amount = ethers.parseEther("1000");
            await expect(rewardValidatorTest.validarOperacion(user.address, amount))
                .to.be.revertedWithCustomError(rewardValidatorTest, "InvalidAmount");
        });
    });
});