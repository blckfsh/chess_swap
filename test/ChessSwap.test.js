const KingToken = artifacts.require('KingToken')
const QueenToken = artifacts.require('QueenToken')
const RookToken = artifacts.require('RookToken')
const BishopToken = artifacts.require('BishopToken')
const KnightToken = artifacts.require('KnightToken')
const PawnToken = artifacts.require('PawnToken')
const ChessSwap = artifacts.require('ChessSwap')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');

}

contract('ChessSwap', ([deployer, investor]) => {
  let kingtoken, queentoken, bishoptoken, knighttoken, rooktoken, pawntoken, chessSwap

  before(async () => {
    // KING Tokens
    kingtoken = await KingToken.new()

    // QUEEN Tokens
    queentoken = await QueenToken.new()

    // ROOK Tokens
    rooktoken = await RookToken.new()

    // BISHOP Tokens
    bishoptoken = await BishopToken.new()

    // KNIGHT Tokens
    knighttoken = await KnightToken.new()

    // PAWN Tokens
    pawntoken = await PawnToken.new()

    chessSwap = await ChessSwap.new(kingtoken.address, queentoken.address, rooktoken.address, bishoptoken.address, knighttoken.address, pawntoken.address)

    // Transfer all tokens to EthSwap (1 million)
    await kingtoken.transfer(chessSwap.address, tokens('1000000'));

    // Transfer all tokens to EthSwap (2 million)
    await queentoken.transfer(chessSwap.address, tokens('2000000'));

    // Transfer all tokens to EthSwap (3 million)
    await rooktoken.transfer(chessSwap.address, tokens('3000000'));

    // Transfer all tokens to EthSwap (4 million)
    await bishoptoken.transfer(chessSwap.address, tokens('4000000'));

    // Transfer all tokens to EthSwap (4 million)
    await knighttoken.transfer(chessSwap.address, tokens('4000000'));

    // Transfer all tokens to EthSwap (5 million)
    await pawntoken.transfer(chessSwap.address, tokens('5000000'));
  })

  describe('King Token deployment', async ()  => {
    it('contract has a name', async () => {
      const name = await kingtoken.name()
      assert.equal(name, 'Chess King Token')
    })
  })

  describe('Queen Token deployment', async ()  => {
    it('contract has a name', async () => {
      const name = await queentoken.name()
      assert.equal(name, 'Chess Queen Token')
    })
  })

  describe('Rook Token deployment', async ()  => {
    it('contract has a name', async () => {
      const name = await rooktoken.name()
      assert.equal(name, 'Chess Rook Token')
    })
  })

  describe('Bishop Token deployment', async ()  => {
    it('contract has a name', async () => {
      const name = await bishoptoken.name()
      assert.equal(name, 'Chess Bishop Token')
    })
  })

  describe('Knight Token deployment', async ()  => {
    it('contract has a name', async () => {
      const name = await knighttoken.name()
      assert.equal(name, 'Chess Knight Token')
    })
  })

  describe('Pawn Token deployment', async ()  => {
    it('contract has a name', async () => {
      const name = await pawntoken.name()
      assert.equal(name, 'Chess Pawn Token')
    })
  })

  describe('ChessSwap deployment', async ()  => {
    it('contract has a name', async () => {

      const name = await chessSwap.name()
      assert.equal(name, 'ChessSwap Instant Exchange')
    })

    it('king - contract has tokens', async () => {
      let balance = await kingtoken.balanceOf(chessSwap.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })

    it('queen - contract has tokens', async () => {
      let balance = await queentoken.balanceOf(chessSwap.address)
      assert.equal(balance.toString(), tokens('2000000'))
    })

    it('rook - contract has tokens', async () => {
      let balance = await rooktoken.balanceOf(chessSwap.address)
      assert.equal(balance.toString(), tokens('3000000'))
    })

    it('bishop - contract has tokens', async () => {
      let balance = await bishoptoken.balanceOf(chessSwap.address)
      assert.equal(balance.toString(), tokens('4000000'))
    })

    it('knight - contract has tokens', async () => {
      let balance = await knighttoken.balanceOf(chessSwap.address)
      assert.equal(balance.toString(), tokens('4000000'))
    })

    it('pawn - contract has tokens', async () => {
      let balance = await pawntoken.balanceOf(chessSwap.address)
      assert.equal(balance.toString(), tokens('5000000'))
    })
  })

  describe('buyKingTokens()', async () => {
    let result

    before(async () => {
      // Purchase King tokens before each example
      result = await chessSwap.buyKingTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await kingtoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('100'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await kingtoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('999900'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('1', 'ether'))

      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, kingtoken.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')
    })
  })

  describe('sellKingTokens()', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before the purchase
      await kingtoken.approve(chessSwap.address, tokens('100'), { from: investor })

      // Investor sells tokens
      result = await chessSwap.sellKingTokens(tokens('100'), { from: investor })
    })

    it('Allows user to instantly sell tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await kingtoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await kingtoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('1000000'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('0', 'ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, kingtoken.address)
      assert.equal(event.amount.toString(), tokens('100').toString())
      assert.equal(event.rate.toString(), '100')

      // FAILURE: Investor can't sell more tokens than they have
      await chessSwap.sellKingTokens(tokens('500'), { from: investor }).should.be.rejected;
    })
  })

  describe('buyQueenTokens()', async () => {
    let result

    before(async () => {
      // Purchase Queen tokens before each example
      result = await chessSwap.buyQueenTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await queentoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('200'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await queentoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('1999800'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('1', 'ether'))

      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, queentoken.address)
      assert.equal(event.amount.toString(), tokens('200').toString())
      assert.equal(event.rate.toString(), '200')
    })
  })

  describe('sellQueenTokens()', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before the purchase
      await queentoken.approve(chessSwap.address, tokens('200'), { from: investor })

      // Investor sells tokens
      result = await chessSwap.sellQueenTokens(tokens('200'), { from: investor })
    })

    it('Allows user to instantly sell tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await queentoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await queentoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('2000000'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('0', 'ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, queentoken.address)
      assert.equal(event.amount.toString(), tokens('200').toString())
      assert.equal(event.rate.toString(), '200')

      // FAILURE: Investor can't sell more tokens than they have
      await chessSwap.sellQueenTokens(tokens('500'), { from: investor }).should.be.rejected;
    })
  })

  describe('buyRookTokens()', async () => {
    let result

    before(async () => {
      // Purchase Rook tokens before each example
      result = await chessSwap.buyRookTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await rooktoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('300'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await rooktoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('2999700'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('1', 'ether'))

      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, rooktoken.address)
      assert.equal(event.amount.toString(), tokens('300').toString())
      assert.equal(event.rate.toString(), '300')
    })
  })

  describe('sellRookTokens()', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before the purchase
      await rooktoken.approve(chessSwap.address, tokens('300'), { from: investor })

      // Investor sells tokens
      result = await chessSwap.sellRookTokens(tokens('300'), { from: investor })
    })

    it('Allows user to instantly sell tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await rooktoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await rooktoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('3000000'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('0', 'ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, rooktoken.address)
      assert.equal(event.amount.toString(), tokens('300').toString())
      assert.equal(event.rate.toString(), '300')

      // FAILURE: Investor can't sell more tokens than they have
      await chessSwap.sellRookTokens(tokens('500'), { from: investor }).should.be.rejected;
    })
  })

  describe('buyBishopTokens()', async () => {
    let result

    before(async () => {
      // Purchase Bishop tokens before each example
      result = await chessSwap.buyBishopTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await bishoptoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('400'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await bishoptoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('3999600'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('1', 'ether'))

      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, bishoptoken.address)
      assert.equal(event.amount.toString(), tokens('400').toString())
      assert.equal(event.rate.toString(), '400')
    })
  })

  describe('sellBishopTokens()', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before the purchase
      await bishoptoken.approve(chessSwap.address, tokens('400'), { from: investor })

      // Investor sells tokens
      result = await chessSwap.sellBishopTokens(tokens('400'), { from: investor })
    })

    it('Allows user to instantly sell tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await bishoptoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await bishoptoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('4000000'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('0', 'ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, bishoptoken.address)
      assert.equal(event.amount.toString(), tokens('400').toString())
      assert.equal(event.rate.toString(), '400')

      // FAILURE: Investor can't sell more tokens than they have
      await chessSwap.sellBishopTokens(tokens('500'), { from: investor }).should.be.rejected;
    })
  })

  describe('buyKnightTokens()', async () => {
    let result

    before(async () => {
      // Purchase Knight tokens before each example
      result = await chessSwap.buyKnightTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await knighttoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('400'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await knighttoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('3999600'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('1', 'ether'))

      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, knighttoken.address)
      assert.equal(event.amount.toString(), tokens('400').toString())
      assert.equal(event.rate.toString(), '400')
    })
  })

  describe('sellKnightTokens()', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before the purchase
      await knighttoken.approve(chessSwap.address, tokens('400'), { from: investor })

      // Investor sells tokens
      result = await chessSwap.sellKnightTokens(tokens('400'), { from: investor })
    })

    it('Allows user to instantly sell tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await knighttoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await knighttoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('4000000'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('0', 'ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, knighttoken.address)
      assert.equal(event.amount.toString(), tokens('400').toString())
      assert.equal(event.rate.toString(), '400')

      // FAILURE: Investor can't sell more tokens than they have
      await chessSwap.sellKnightTokens(tokens('500'), { from: investor }).should.be.rejected;
    })
  })

  describe('buyPawnTokens()', async () => {
    let result

    before(async () => {
      // Purchase Pawn tokens before each example
      result = await chessSwap.buyPawnTokens({ from: investor, value: web3.utils.toWei('1', 'ether')})
    })

    it('Allows user to instantly purchase tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await pawntoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('500'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await pawntoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('4999500'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('1', 'ether'))

      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, pawntoken.address)
      assert.equal(event.amount.toString(), tokens('500').toString())
      assert.equal(event.rate.toString(), '500')
    })
  })

  describe('sellPawnTokens()', async () => {
    let result

    before(async () => {
      // Investor must approve tokens before the purchase
      await pawntoken.approve(chessSwap.address, tokens('500'), { from: investor })

      // Investor sells tokens
      result = await chessSwap.sellPawnTokens(tokens('500'), { from: investor })
    })

    it('Allows user to instantly sell tokens from chessSwap for a fixed price', async () => {
      // Check investor token balance after purchase
      let investorBalance = await pawntoken.balanceOf(investor)
      assert.equal(investorBalance.toString(), tokens('0'))

      // Check chessSwap balance after purchase
      let chessSwapBalance
      chessSwapBalance = await pawntoken.balanceOf(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), tokens('5000000'))
      chessSwapBalance = await web3.eth.getBalance(chessSwap.address)
      assert.equal(chessSwapBalance.toString(), web3.utils.toWei('0', 'ether'))

      // Check logs to ensure event was emitted with correct data
      const event = result.logs[0].args
      assert.equal(event.account, investor)
      assert.equal(event.token, pawntoken.address)
      assert.equal(event.amount.toString(), tokens('500').toString())
      assert.equal(event.rate.toString(), '500')

      // FAILURE: Investor can't sell more tokens than they have
      await chessSwap.sellPawnTokens(tokens('600'), { from: investor }).should.be.rejected;
    })
  })

})
