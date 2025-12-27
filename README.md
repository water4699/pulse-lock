# Strength Progress Tracker

<!-- Development update: Enhanced documentation structure -->

An encrypted strength training progress tracker built with FHEVM (Fully Homomorphic Encryption Virtual Machine) by Zama. This application allows users to privately record and track their strength training data (max weight, sets, reps) with end-to-end encryption.

## 🌐 Live Demo

**Deployed Application**: [https://fitness-kappa-dusky.vercel.app/](https://fitness-kappa-dusky.vercel.app/)

**Demo Video**: [Watch the full demo walkthrough](https://github.com/AnnabelleGraham/pulse-lock-progress/blob/master/fitness.mp4) 

## 📋 Contract Information

**Sepolia Testnet Contract Address**: `0x2eFa81c03B964276334035C76bB9C2D018DAa43d`

**Contract Verification**: [View on Etherscan](https://sepolia.etherscan.io/address/0x2eFa81c03B964276334035C76bB9C2D018DAa43d)

## Features

- **Privacy-Preserving**: All training data is encrypted using FHE (Fully Homomorphic Encryption)
- **User-Controlled**: Only you can decrypt and view your training data
- **Blockchain-Based**: Data stored on-chain in encrypted form
- **Rainbow Wallet Integration**: Easy wallet connection using RainbowKit
- **Secure Storage**: Encrypted data remains private even on public blockchain
- **Gas Optimized**: Smart contract optimized for minimal gas usage
- **Responsive Design**: Mobile-friendly interface for all devices

## Security

This application implements state-of-the-art privacy protection:

- **FHE Encryption**: Training data is encrypted before being sent to the blockchain
- **Zero-Knowledge**: No one can view your data without your explicit permission
- **Contract-Level Security**: Smart contract follows best practices for gas optimization and security

## Quick Start

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm or yarn/pnpm**: Package manager
- **Rainbow Wallet**: Browser extension installed (for full functionality)
- **MetaMask or similar**: Alternative wallet support

### Installation & Setup

1. **Clone and install dependencies**

   ```bash
   git clone https://github.com/AnnabelleGraham/pulse-lock-progress.git
   cd pulse-lock-progress
   npm install
   cd frontend
   npm install
   cd ..
   ```

2. **Set up environment variables**

   ```bash
   npx hardhat vars set MNEMONIC
   npx hardhat vars set INFURA_API_KEY
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

3. **Compile contracts**

   ```bash
   npm run compile
   ```

4. **Deploy to Sepolia Testnet** (Already deployed)

   The contract is already deployed on Sepolia testnet. For local development:

   ```bash
   # Start local Hardhat node with FHEVM support
   npx hardhat node

   # Deploy to local network (in another terminal)
   npx hardhat deploy --network localhost
   ```

5. **Run the application**

   ```bash
   cd frontend
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser

### Live Demo Usage

For immediate testing without local setup:

1. Visit the [live demo](https://fitness-kappa-dusky.vercel.app/)
2. Connect your Rainbow wallet
3. Switch to Sepolia testnet in your wallet
4. Record your training sessions
5. Decrypt and view your private data

## Project Structure

```
strength-progress-tracker/
├── contracts/                    # Smart contract source files
│   └── StrengthProgressTracker.sol
├── deploy/                       # Deployment scripts
├── test/                         # Test files
│   ├── StrengthProgressTracker.ts
│   └── StrengthProgressTrackerSepolia.ts
├── frontend/                     # Next.js frontend application
│   ├── app/                      # Next.js app directory
│   ├── components/               # React components
│   ├── hooks/                    # Custom React hooks
│   └── fhevm/                    # FHEVM integration
├── hardhat.config.ts             # Hardhat configuration
└── package.json                  # Dependencies and scripts
```

## Usage

### Basic Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your Rainbow wallet
2. **Network Selection**: Ensure you're on Sepolia testnet for the deployed contract
3. **Record Training**:
   - Enter your max weight (kg)
   - Enter number of sets
   - Enter number of reps per set
   - Click "Record Training Session"
4. **View Training History**: Your encrypted records appear in chronological order
5. **Decrypt Records**: Click "Decrypt" on any record to reveal the plaintext values

### Advanced Features

- **Form Validation**: Real-time validation with error messages
- **Error Handling**: Comprehensive error handling for network issues and FHEVM failures
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Gas Optimization**: Smart contract optimized for minimal transaction costs

### Troubleshooting

- **FHEVM Relayer Issues**: If encryption/decryption fails, try refreshing or switching networks
- **Contract Not Found**: Ensure you're connected to Sepolia testnet
- **Wallet Connection**: Make sure your wallet is properly configured

## Available Scripts

| Script             | Description              |
| ------------------ | ------------------------ |
| `npm run compile`  | Compile all contracts    |
| `npm run test`     | Run all tests            |
| `npm run coverage` | Generate coverage report |
| `npm run lint`     | Run linting checks       |
| `npm run clean`    | Clean build artifacts    |

## Technology Stack

- **Smart Contracts**: Solidity 0.8.24 with FHE support (optimized for gas efficiency)
- **FHE Encryption**: Zama FHEVM v0.2.0 for homomorphic encryption
- **Frontend**: Next.js 15.4.2, React 19.1.0 with TypeScript
- **Wallet Integration**: RainbowKit v2.0.0, Wagmi v2.0.0, Ethers.js v6
- **Blockchain**: Ethereum Sepolia Testnet & Local Hardhat Network
- **Development Tools**: Hardhat, TypeChain, Tailwind CSS, PostCSS
- **Build Optimization**: Turbopack, SWC compiler, gas reporter

## Contract Deployment Details

### Sepolia Testnet
- **Contract Address**: `0x2eFa81c03B964276334035C76bB9C2D018DAa43d`
- **Network**: Ethereum Sepolia Testnet (Chain ID: 11155111)
- **Block Explorer**: [Etherscan Sepolia](https://sepolia.etherscan.io/address/0x2eFa81c03B964276334035C76bB9C2D018DAa43d)
- **FHEVM Compatibility**: Fully compatible with Zama FHEVM relayer

### Local Development
- **Contract Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Network**: Hardhat Localhost (Chain ID: 31337)
- **Mock FHEVM**: Enabled for testing without external relayer

### Deployment Verification
```bash
# Verify contract on Sepolia
npx hardhat verify --network sepolia 0x2eFa81c03B964276334035C76bB9C2D018DAa43d
```

## Vercel Deployment

The frontend is deployed on Vercel with the following configuration:
- **URL**: https://fitness-kappa-dusky.vercel.app/
- **Framework**: Next.js 15
- **Build Command**: `npm run build`
- **Node Version**: 20.x
- **Environment**: Production optimized

## License

This project is licensed under the BSD-3-Clause-Clear License.

## API Reference

### Smart Contract Functions

- `recordTraining(externalEuint32, externalEuint32, externalEuint32, bytes, bytes, bytes)` - Record encrypted training data
- `getRecordCount(address)` - Get number of records for a user
- `getRecord(address, uint256)` - Get specific encrypted record
- `getAllRecords(address)` - Get all encrypted records for a user

### Frontend Components

- `StrengthTrackerDemo` - Main application component
- `useStrengthTracker` - Custom hook for contract interactions
- `useRainbowProvider` - Wallet connection management

## Security Considerations

- All user data is encrypted before blockchain storage
- Private keys never leave the user's wallet
- FHE operations use zero-knowledge proofs
- Contract follows OpenZeppelin security patterns

## Performance Metrics

- **Gas Usage**: Optimized for minimal transaction costs
- **Encryption Speed**: ~2-3 seconds per operation
- **Decryption Speed**: ~1-2 seconds per record
- **Frontend Load**: <3 seconds initial page load

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support & Resources

- **Live Demo**: [https://fitness-kappa-dusky.vercel.app/](https://fitness-kappa-dusky.vercel.app/)
- **Demo Video**: [Watch the full demo walkthrough](https://github.com/AnnabelleGraham/pulse-lock-progress/blob/master/fitness.mp4) | [Download Video](https://github.com/AnnabelleGraham/pulse-lock-progress/raw/master/fitness.mp4)
- **FHEVM Documentation**: [docs.zama.ai](https://docs.zama.ai)
- **Zama Community**: [Discord](https://discord.gg/zama)
- **GitHub Issues**: [Report bugs](https://github.com/AnnabelleGraham/pulse-lock-progress/issues)
- **Contract on Etherscan**: [Sepolia Explorer](https://sepolia.etherscan.io/address/0x2eFa81c03B964276334035C76bB9C2D018DAa43d)

## License

This project is licensed under the BSD-3-Clause-Clear License.

---

**Built with ❤️ using Zama FHEVM - Privacy-Preserving Web3 Fitness Tracking**




