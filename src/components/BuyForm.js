import React, { Component } from 'react'
import tokenLogo from './token-logo.png'
 import ethLogo from './eth-logo.png'
import kng from './kng.png'
import qen from './qen.png'
import rok from './rok.png'
import bsp from './bsp.png'
import knt from './knt.png'
import pwn from './pwn.png'

class BuyForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			output: '0',
			value: 'KNG',
			tokens: ['KNG', 'QEN', 'ROK', 'BSP', 'KNT', 'PWN'],
			description: '1 ETH = 100 King Tokens'
		}
		this.handleSelect = this.handleSelect.bind(this)
	}

	componentDidMount() {
		console.log(this.state.description)
	}

	handleSelect(event) {

		if (event.target.value === 'QEN') {
			this.setState({ description: '1 ETH = 200 Queen Tokens' })
		}
		else if (event.target.value === 'KNG') {
			this.setState({ description: '1 ETH = 100 King Tokens' })
		}
    else if (event.target.value === 'ROK') {
			this.setState({ description: '1 ETH = 300 Rook Tokens' })
		}
    else if (event.target.value === 'BSP') {
			this.setState({ description: '1 ETH = 400 Bishop Tokens' })
		}
    else if (event.target.value === 'KNT') {
			this.setState({ description: '1 ETH = 400 Knight Tokens' })
		}
    else if (event.target.value === 'PWN') {
			this.setState({ description: '1 ETH = 500 Pawn Tokens' })
		}
		this.setState({value: event.target.value})
	}

	render() {
		return (
			<form className="mb-3" onSubmit={(event) => {
				event.preventDefault()
				let etherAmount
				etherAmount = this.input.value.toString()
				etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')

				if (this.state.value === 'KNG') {
						this.props.buyKingTokens(etherAmount)
				}
				else if (this.state.value === 'QEN') {
					this.props.buyQueenTokens(etherAmount)
				}
        else if (this.state.value === 'ROK') {
					this.props.buyRookTokens(etherAmount)
				}
        else if (this.state.value === 'BSP') {
					this.props.buyBishopTokens(etherAmount)
				}
        else if (this.state.value === 'KNT') {
					this.props.buyKnightTokens(etherAmount)
				}
        else if (this.state.value === 'PWN') {
					this.props.buyPawnTokens(etherAmount)
				}

			}}>
			<div>
			<label className="float-left"><b>Input</b></label>
			<span className="float-right text-muted">
			Balance: { window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
			</span>
			</div>
			<div className="input-group mb-4">
			<input
			type="text"
			onChange={(event) => {
				console.log("changing...")
				const etherAmount = this.input.value.toString()

				if (this.state.value === 'KNG') {
					this.setState({
						output: etherAmount * 100
					})
				}
				else if (this.state.value === 'QEN') {
					this.setState({
						output: etherAmount * 200
					})
				}
        else if (this.state.value === 'ROK') {
					this.setState({
						output: etherAmount * 300
					})
				}
        else if (this.state.value === 'BSP') {
					this.setState({
						output: etherAmount * 400
					})
				}
        else if (this.state.value === 'KNT') {
					this.setState({
						output: etherAmount * 400
					})
				}
        else if (this.state.value === 'PWN') {
					this.setState({
						output: etherAmount * 500
					})
				}

				console.log(this.state.output)
			}}
			ref={(input) => {this.input = input}}
			className="form-control form-control-lg"
			placeholder="0"
			required />
			<div className="input-group-append">
			<div className="input-group-text">
			<img src={ ethLogo } height="32" alt="" />
			&nbsp;&nbsp;&nbsp; ETH
			</div>
			</div>
			</div>
			<div>
			<label className="float-left"><b>Output</b></label>
			<span className="float-right text-muted">
			Balance: { this.state.value === 'KNG' ?
                  window.web3.utils.fromWei(this.props.kingTokenBalance, 'Ether')
                  : this.state.value === 'QEN' ? window.web3.utils.fromWei(this.props.queenTokenBalance, 'Ether')
                  : this.state.value === 'BSP' ? window.web3.utils.fromWei(this.props.bishopTokenBalance, 'Ether')
                  : this.state.value === 'KNT' ? window.web3.utils.fromWei(this.props.knightTokenBalance, 'Ether')
                  : this.state.value === 'ROK' ? window.web3.utils.fromWei(this.props.rookTokenBalance, 'Ether')
                  : window.web3.utils.fromWei(this.props.pawnTokenBalance, 'Ether') }
			</span>
			</div>
			<div className="input-group mb-2">
			<input
			type="text"
			className="form-control form-control-lg"
			placeholder="0"
			disabled
			value={this.state.output}
			/>
			<div className="input-group-append">
			<div className="input-group-text">
			<img src={ this.state.value === 'KNG' ? kng : this.state.value === 'QEN' ? qen : this.state.value === 'BSP' ? bsp : this.state.value === 'KNT' ? knt : this.state.value === 'ROK' ? rok : this.state.value === 'PWN' ? pwn : tokenLogo } height="32" alt="" />
			&nbsp;
			<select className="form-select customSelect" name="value" onChange={this.handleSelect}>
				{ this.state.tokens.map((token, index) => {
					return (
							<option key={index} value={token}>{token}</option>
					)
				}) }
			</select>
			</div>
			</div>
			</div>
			<div className="mb-5">
			<span className="float-left text-muted">Exchange Rate</span>
			<span className="float-right text-muted">{ this.state.description }</span>
			</div>
			<button type="submit" className="btn btn-primary btn-block btn-lg customSwap">SWAP</button>
			</form>
		);
	}
}

export default BuyForm;
