import Web3 from 'web3'
import type { Contract } from 'web3-eth-contract'
import { contractAbi } from './contract-abi'

interface Web3State {
  web3: Web3 | null
  contract: Contract | null
  currentAccount: string | null
}

const state: Web3State = {
  web3: null,
  contract: null,
  currentAccount: null
}

function updateUI(message: string) {
  const output = document.getElementById('output')
  if (output) output.textContent = message
}

async function connectToMetaMask() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed')
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    })

    if (!accounts?.length) {
      throw new Error('No accounts found! Please connect to MetaMask')
    }

    state.currentAccount = accounts[0]
    state.web3 = new Web3(window.ethereum)
    state.contract = new state.web3.eth.Contract(
      contractAbi,
      import.meta.env.VITE_CONTRACT_ADDRESS
    )

    updateUI('Connected to MetaMask!')
    return true
  } catch (error) {
    console.error('Failed to connect:', error)
    updateUI(error instanceof Error ? error.message : 'Failed to connect')
    return false
  }
}

async function ensureConnection() {
  if (!state.web3 || !state.contract || !state.currentAccount) {
    return await connectToMetaMask()
  }
  return true
}

async function handleFeed() {
  if (!await ensureConnection()) return
  
  try {
    await state.contract?.methods.feed().send({ 
      from: state.currentAccount 
    })
    updateUI('You fed your Tamagotchi!')
  } catch (error) {
    console.error('Feed error:', error)
    updateUI(error instanceof Error ? error.message : 'Failed to feed')
  }
}

async function handlePlay() {
  if (!await ensureConnection()) return
  
  try {
    await state.contract?.methods.play().send({ 
      from: state.currentAccount 
    })
    updateUI('You played with your Tamagotchi!')
  } catch (error) {
    console.error('Play error:', error)
    updateUI(error instanceof Error ? error.message : 'Failed to play')
  }
}

async function handleCheckHealth() {
  if (!await ensureConnection()) return
  
  try {
    const health = await state.contract?.methods.checkHealth().call()
    updateUI(health)
  } catch (error) {
    console.error('CheckHealth error:', error)
    updateUI(error instanceof Error ? error.message : 'Failed to check health')
  }
}

function handleAccountsChanged(accounts: string[]) {
  state.currentAccount = accounts[0] || null
  if (!accounts.length) {
    updateUI('Please connect to MetaMask')
  }
}

function setupEventListeners() {
  window.ethereum.on('accountsChanged', handleAccountsChanged)
  window.ethereum.on('chainChanged', () => window.location.reload())
  
  const buttons = {
    feed: document.getElementById('feedButton'),
    play: document.getElementById('playButton'),
    health: document.getElementById('checkHealthButton')
  }

  buttons.feed?.addEventListener('click', handleFeed)
  buttons.play?.addEventListener('click', handlePlay)
  buttons.health?.addEventListener('click', handleCheckHealth)
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners()
  connectToMetaMask()
}) 