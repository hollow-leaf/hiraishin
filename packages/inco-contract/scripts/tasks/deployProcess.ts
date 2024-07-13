import { task } from "hardhat/config"
import { readFileSync, writeFileSync } from "../helpers/pathHelper"
task("deploy:contract", "Deploy contract")
  .addParam("contract")
  .setAction(async ({ contract }, hre) => {
    await hre.run("compile")
    const [signer]: any = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory(contract)
    // if you mint in constructor, you need to add value in deploy function
    const deployContract: any = await contractFactory.connect(signer).deploy()
    console.log(`TestToken.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "mainContract.json", addressData)

    await deployContract.deployed()
  },
  )

task("deploy:token", "Deploy contract")
  .addFlag("verify", "Validate contract after deploy")
  .setAction(async ({ verify }, hre) => {
    await hre.run("compile")
    const [signer]: any = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory("EncryptedERC20")
    // if you mint in constructor, you need to add value in deploy function
    const deployContract: any = await contractFactory.connect(signer).deploy()
    console.log(`EncryptedERC20.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "EncryptedERC20.json", addressData)

    await deployContract.deployed()

    if (verify) {
      console.log("verifying contract...")
      await deployContract.deployTransaction.wait(3)
      try {
        await hre.run("verify:verify", {
          address: deployContract.address,
          constructorArguments: [],
          contract: "contracts/EncryptedERC20.sol:EncryptedERC20",
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )

task("deploy:enc", "Deploy encode location contract")
  .addFlag("verify", "Validate contract after deploy")
  .setAction(async ({ verify }, hre) => {
    await hre.run("compile")
    const [signer]: any = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory("EncLocation")
    // if you mint in constructor, you need to add value in deploy function
    const deployContract: any = await contractFactory.connect(signer).deploy()
    console.log(`EncLocation.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, "EncLocation.json", addressData)

    await deployContract.deployed()

    if (verify) {
      console.log("verifying contract...")
      await deployContract.deployTransaction.wait(3)
      try {
        await hre.run("verify:verify", {
          address: deployContract.address,
          constructorArguments: [],
          contract: "contracts/EncLocation.sol:EncLocation",
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )
