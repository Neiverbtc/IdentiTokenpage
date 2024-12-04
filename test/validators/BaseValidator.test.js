const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BaseValidator", function() {
  let baseValidatorTest;
  let owner;

  before(async function() {
    [owner] = await ethers.getSigners();
    
    // Desplegamos un contrato de prueba para acceder a las funciones de la librería
    const BaseValidatorTest = await ethers.getContractFactory("BaseValidatorTest");
    baseValidatorTest = await BaseValidatorTest.deploy();
    await baseValidatorTest.waitForDeployment();
  });

  describe("Validación de direcciones", function() {
    it("Debe validar una dirección correcta", async function() {
      await expect(baseValidatorTest.validateAccount(owner.address))
        .to.not.be.reverted;
    });

    it("Debe revertir con dirección cero", async function() {
      await expect(baseValidatorTest.validateAccount(ethers.ZeroAddress))
        .to.be.revertedWithCustomError(baseValidatorTest, "InvalidAccount");
    });
  });

  describe("Validación de cantidades", function() {
    it("Debe validar una cantidad dentro del rango", async function() {
      await expect(baseValidatorTest.validateAmount(50, 1, 100))
        .to.not.be.reverted;
    });

    it("Debe revertir con cantidad cero", async function() {
      await expect(baseValidatorTest.validateAmount(0, 1, 100))
        .to.be.revertedWithCustomError(baseValidatorTest, "ZeroAmount");
    });

    it("Debe revertir con cantidad menor al mínimo", async function() {
      await expect(baseValidatorTest.validateAmount(1, 10, 100))
        .to.be.revertedWithCustomError(baseValidatorTest, "InvalidAmount");
    });

    it("Debe revertir con cantidad mayor al máximo", async function() {
      await expect(baseValidatorTest.validateAmount(101, 1, 100))
        .to.be.revertedWithCustomError(baseValidatorTest, "InvalidAmount");
    });
  });
});