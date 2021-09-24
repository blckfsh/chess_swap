import React, { Component } from 'react'
import Web3 from 'web3'
import KingToken from '../abis/KingToken.json'
import QueenToken from '../abis/QueenToken.json'
import RookToken from '../abis/RookToken.json'
import BishopToken from '../abis/BishopToken.json'
import KnightToken from '../abis/KnightToken.json'
import PawnToken from '../abis/PawnToken.json'
import ChessSwap from '../abis/ChessSwap.json'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    // Load Network Id
    const networkId = await web3.eth.net.getId()

    // Load King Token
    const tokenKingData = KingToken.networks[networkId]
    if (tokenKingData) {
      const kingtoken = new web3.eth.Contract(KingToken.abi, tokenKingData.address)
      this.setState({ kingtoken })
      let kingTokenBalance = await kingtoken.methods.balanceOf(this.state.account).call()
      console.log("kingTokenBalance", kingTokenBalance.toString())
      this.setState({ kingTokenBalance: kingTokenBalance.toString() })
    }
    else {
      window.alert('King Token contract not deployed to detected network.')
    }

    // Load Queen Token
    const tokenQueenData = QueenToken.networks[networkId]
    if (tokenQueenData) {
      const queentoken = new web3.eth.Contract(QueenToken.abi, tokenQueenData.address)
      this.setState({ queentoken })
      let queenTokenBalance = await queentoken.methods.balanceOf(this.state.account).call()
      console.log("queenTokenBalance", queenTokenBalance.toString())
      this.setState({ queenTokenBalance: queenTokenBalance.toString() })
    }
    else {
      window.alert('Queen Token contract not deployed to detected network.')
    }

    // Load Rook Token
    const tokenRookData = RookToken.networks[networkId]
    if (tokenRookData) {
      const rooktoken = new web3.eth.Contract(RookToken.abi, tokenRookData.address)
      this.setState({ rooktoken })
      let rookTokenBalance = await rooktoken.methods.balanceOf(this.state.account).call()
      console.log("rookTokenBalance", rookTokenBalance.toString())
      this.setState({ rookTokenBalance: rookTokenBalance.toString() })
    }
    else {
      window.alert('Rook Token contract not deployed to detected network.')
    }

    // Load Bishop Token
    const tokenBishopData = BishopToken.networks[networkId]
    if (tokenBishopData) {
      const bishoptoken = new web3.eth.Contract(BishopToken.abi, tokenBishopData.address)
      this.setState({ bishoptoken })
      let bishopTokenBalance = await bishoptoken.methods.balanceOf(this.state.account).call()
      console.log("bishopTokenBalance", bishopTokenBalance.toString())
      this.setState({ bishopTokenBalance: bishopTokenBalance.toString() })
    }
    else {
      window.alert('Bishop Token contract not deployed to detected network.')
    }

    // Load Knight Token
    const tokenKnightData = KnightToken.networks[networkId]
    if (tokenKnightData) {
      const knighttoken = new web3.eth.Contract(KnightToken.abi, tokenKnightData.address)
      this.setState({ knighttoken })
      let knightTokenBalance = await knighttoken.methods.balanceOf(this.state.account).call()
      console.log("knightTokenBalance", knightTokenBalance.toString())
      this.setState({ knightTokenBalance: knightTokenBalance.toString() })
    }
    else {
      window.alert('Knight Token contract not deployed to detected network.')
    }

    // Load Pawn Token
    const tokenPawnData = PawnToken.networks[networkId]
    if (tokenPawnData) {
      const pawntoken = new web3.eth.Contract(PawnToken.abi, tokenPawnData.address)
      this.setState({ pawntoken })
      let pawnTokenBalance = await pawntoken.methods.balanceOf(this.state.account).call()
      console.log("pawnTokenBalance", pawnTokenBalance.toString())
      this.setState({ pawnTokenBalance: pawnTokenBalance.toString() })
    }
    else {
      window.alert('Pawn Token contract not deployed to detected network.')
    }

    // Load ChessSwap
    const chessSwapData = ChessSwap.networks[networkId]
    if (chessSwapData) {
      const chessSwap = new web3.eth.Contract(ChessSwap.abi, chessSwapData.address)
      this.setState({ chessSwap })
    }
    else {
      window.alert('ChessSwap contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying Metamask!')
    }
  }

  buyKingTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.chessSwap.methods.buyKingTokens()
                              .send({ value: etherAmount, from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.setState({ loading: false })
    })
  }

  sellKingTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.kingtoken.methods.approve(this.state.chessSwap.address, tokenAmount)
                              .send({ from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.state.chessSwap.methods.sellKingTokens(tokenAmount).send({ from: this.state.account })
                                .on('transactionHash', (hash) => {
                                  this.setState({ loading: false })
                                })
    })
  }

  buyQueenTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.chessSwap.methods.buyQueenTokens()
                              .send({ value: etherAmount, from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.setState({ loading: false })
    })
  }

  sellQueenTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.queentoken.methods.approve(this.state.chessSwap.address, tokenAmount)
                              .send({ from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.state.chessSwap.methods.sellQueenTokens(tokenAmount).send({ from: this.state.account })
                                .on('transactionHash', (hash) => {
                                  this.setState({ loading: false })
                                })
    })
  }

  buyRookTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.chessSwap.methods.buyRookTokens()
                              .send({ value: etherAmount, from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.setState({ loading: false })
    })
  }

  sellRookTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.rooktoken.methods.approve(this.state.chessSwap.address, tokenAmount)
                              .send({ from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.state.chessSwap.methods.sellRookTokens(tokenAmount).send({ from: this.state.account })
                                .on('transactionHash', (hash) => {
                                  this.setState({ loading: false })
                                })
    })
  }

  buyBishopTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.chessSwap.methods.buyBishopTokens()
                              .send({ value: etherAmount, from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.setState({ loading: false })
    })
  }

  sellBishopTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.bishoptoken.methods.approve(this.state.chessSwap.address, tokenAmount)
                              .send({ from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.state.chessSwap.methods.sellBishopTokens(tokenAmount).send({ from: this.state.account })
                                .on('transactionHash', (hash) => {
                                  this.setState({ loading: false })
                                })
    })
  }

  buyKnightTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.chessSwap.methods.buyKnightTokens()
                              .send({ value: etherAmount, from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.setState({ loading: false })
    })
  }

  sellKnightTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.knighttoken.methods.approve(this.state.chessSwap.address, tokenAmount)
                              .send({ from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.state.chessSwap.methods.sellKnightTokens(tokenAmount).send({ from: this.state.account })
                                .on('transactionHash', (hash) => {
                                  this.setState({ loading: false })
                                })
    })
  }

  buyPawnTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.chessSwap.methods.buyPawnTokens()
                              .send({ value: etherAmount, from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.setState({ loading: false })
    })
  }

  sellPawnTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.pawntoken.methods.approve(this.state.chessSwap.address, tokenAmount)
                              .send({ from: this.state.account })
                              .on('transactionHash', (hash) => {
                                this.state.chessSwap.methods.sellPawnTokens(tokenAmount).send({ from: this.state.account })
                                .on('transactionHash', (hash) => {
                                  this.setState({ loading: false })
                                })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      kingtoken: {},
      queentoken: {},
      rook: {},
      bishoptoken: {},
      knighttoken: {},
      pawntoken: {},
      chessSwap: {},
      ethBalance: '0',
      kingTokenBalance: '0',
      queenTokenBalance: '0',
      bishopTokenBalance: '0',
      knightTokenBalance: '0',
      pawnTokenBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
                  ethBalance={this.state.ethBalance}
                  kingTokenBalance={this.state.kingTokenBalance}
                  queenTokenBalance={this.state.queenTokenBalance}
                  rookTokenBalance={this.state.rookTokenBalance}
                  bishopTokenBalance={this.state.bishopTokenBalance}
                  knightTokenBalance={this.state.knightTokenBalance}
                  pawnTokenBalance={this.state.pawnTokenBalance}
                  buyKingTokens={this.buyKingTokens}
                  sellKingTokens={this.sellKingTokens}
                  buyQueenTokens={this.buyQueenTokens}
                  sellQueenTokens={this.sellQueenTokens}
                  buyRookTokens={this.buyRookTokens}
                  sellRookTokens={this.sellRookTokens}
                  buyBishopTokens={this.buyBishopTokens}
                  sellBishopTokens={this.sellBishopTokens}
                  buyKnightTokens={this.buyKnightTokens}
                  sellKnightTokens={this.sellKnightTokens}
                  buyPawnTokens={this.buyPawnTokens}
                  sellPawnTokens={this.sellPawnTokens}
                />
    }
    return (
      <div>
        <Header account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                  { content }
              </div>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
