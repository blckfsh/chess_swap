import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'

class Main extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currentForm: 'buy'
		}
	}

	render() {

		let content
		if (this.state.currentForm === 'buy') {
			content = <BuyForm
							ethBalance={this.props.ethBalance}
							kingTokenBalance={this.props.kingTokenBalance}
							queenTokenBalance={this.props.queenTokenBalance}
							rookTokenBalance={this.props.rookTokenBalance}
							bishopTokenBalance={this.props.bishopTokenBalance}
							knightTokenBalance={this.props.knightTokenBalance}
							pawnTokenBalance={this.props.pawnTokenBalance}
							buyKingTokens={this.props.buyKingTokens}
							buyQueenTokens={this.props.buyQueenTokens}
							buyRookTokens={this.props.buyRookTokens}
							buyBishopTokens={this.props.buyBishopTokens}
							buyKnightTokens={this.props.buyKnightTokens}
							buyPawnTokens={this.props.buyPawnTokens}
						/>
		} else {
			content = <SellForm
							ethBalance={this.props.ethBalance}
							kingTokenBalance={this.props.kingTokenBalance}
							queenTokenBalance={this.props.queenTokenBalance}
							rookTokenBalance={this.props.rookTokenBalance}
							bishopTokenBalance={this.props.bishopTokenBalance}
							knightTokenBalance={this.props.knightTokenBalance}
							pawnTokenBalance={this.props.pawnTokenBalance}
							sellKingTokens={this.props.sellKingTokens}
							sellQueenTokens={this.props.sellQueenTokens}
							sellRookTokens={this.props.sellRookTokens}
							sellBishopTokens={this.props.sellBishopTokens}
							sellKnightTokens={this.props.sellKnightTokens}
							sellPawnTokens={this.props.sellPawnTokens}
						/>
		}

		return (
				<div id="content" className="mt-3">
					<div className="d-flex justify-content-center mb-3">
						<button
							className="btn btn-light customBuy"
							onClick={(event) => {
								this.setState({ currentForm: 'buy' })
							}}
						>
							Buy
						</button>
						<span className="text-muted">&nbsp; &nbsp; &nbsp;</span>
						<button
							className="btn btn-light customSell"
							onClick={(event) => {
								this.setState({ currentForm: 'sell' })
							}}
						>
							Sell
						</button>
					</div>
					<div className="card mb-4 customCard">
						<div className="card-body">
							{ content }
						</div>
					</div>
				</div>
		);
	}
}

export default Main;
