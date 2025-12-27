import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log(`Deploying StrengthProgressTracker from: ${deployer}`);

  const deployedStrengthTracker = await deploy("StrengthProgressTracker", {
    from: deployer,
    log: true,
    gasLimit: 5000000, // Increased gas limit for FHE operations
  });

  console.log(`StrengthProgressTracker contract deployed at: ${deployedStrengthTracker.address}`);

  // Verify deployment on supported networks
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for deployment confirmation...");
    await hre.ethers.provider.waitForTransaction(deployedStrengthTracker.transactionHash!);

    // Additional verification could be added here
    console.log("Contract deployment verified successfully");
  }
};
export default func;
func.id = "deploy_strengthTracker"; // id required to prevent reexecution
func.tags = ["StrengthProgressTracker"];


