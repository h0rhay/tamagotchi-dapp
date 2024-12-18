# Tamagotchi dApp

A simple experiment with MetaMask, Web3.js, and Solidity. This dApp allows you to interact with a Tamagotchi-like smart contract on the blockchain.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MetaMask](https://metamask.io/) browser extension
- A web browser (Chrome, Firefox, or Brave)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your contract address
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## MetaMask Configuration

1. Install the MetaMask browser extension
2. Create or import a wallet
3. Connect to the Sepolia test network
4. Get some test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
5. When prompted by the dApp, connect your MetaMask wallet

## Features

- Feed your Tamagotchi
- Play with your Tamagotchi
- Check your Tamagotchi's health status

## Development

This project uses:
- Vite for development and building
- TypeScript for type safety
- Web3.js for blockchain interactions
- Solidity for smart contract (deployed on Sepolia)

## License

MIT 