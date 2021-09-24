const KingToken = artifacts.require("KingToken");
const QueenToken = artifacts.require("QueenToken");
const RookToken = artifacts.require("RookToken");
const BishopToken = artifacts.require("BishopToken");
const KnightToken = artifacts.require("KnightToken");
const PawnToken = artifacts.require("PawnToken");
const ChessSwap = artifacts.require("ChessSwap");

module.exports = async function(deployer) {
  // Deploy Chess - Tokens
  await deployer.deploy(KingToken);
  await deployer.deploy(QueenToken);
  await deployer.deploy(RookToken);
  await deployer.deploy(BishopToken);
  await deployer.deploy(KnightToken);
  await deployer.deploy(PawnToken);

  const kingtoken = await KingToken.deployed();
  const queentoken = await QueenToken.deployed();
  const rooktoken = await RookToken.deployed();
  const bishoptoken = await BishopToken.deployed();
  const knighttoken = await KnightToken.deployed();
  const pawntoken = await PawnToken.deployed();

  // Deploy ChessSwap
  await deployer.deploy(ChessSwap, kingtoken.address, queentoken.address, rooktoken.address, bishoptoken.address, knighttoken.address, pawntoken.address);

  // Deploy ChessSwap
  const chessSwap = await ChessSwap.deployed();

  // Transfer all tokens to EthSwap (KNG = 1M)
  await kingtoken.transfer(chessSwap.address, '1000000000000000000000000');

  // Transfer all tokens to EthSwap (QEN = 2M)
  await queentoken.transfer(chessSwap.address, '2000000000000000000000000');

  // Transfer all tokens to EthSwap (ROK = 3M)
  await rooktoken.transfer(chessSwap.address, '3000000000000000000000000');

  // Transfer all tokens to EthSwap (BSP = 4M)
  await bishoptoken.transfer(chessSwap.address, '4000000000000000000000000');

  // Transfer all tokens to EthSwap (KNT = 4M)
  await knighttoken.transfer(chessSwap.address, '4000000000000000000000000');

  // Transfer all tokens to EthSwap (KNT = 5M)
  await pawntoken.transfer(chessSwap.address, '5000000000000000000000000');
};
