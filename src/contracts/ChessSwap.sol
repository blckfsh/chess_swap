pragma solidity ^0.5.0;

import "./KingToken.sol";
import "./QueenToken.sol";
import "./BishopToken.sol";
import "./KnightToken.sol";
import "./RookToken.sol";
import "./PawnToken.sol";

contract ChessSwap {
  string public name = "ChessSwap Instant Exchange";
  KingToken public kingtoken;
  QueenToken public queentoken;
  RookToken public rooktoken;
  BishopToken public bishoptoken;
  KnightToken public knighttoken;
  PawnToken public pawntoken;

  uint public kingRate = 100;
  uint public queenRate = 200;
  uint public rookRate = 300;
  uint public bishopknightRate = 400;
  uint public pawnRate = 500;

  event KingTokenPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event KingTokenSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event QueenTokenPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event QueenTokenSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event RookTokenPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event RookTokenSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event BishopTokenPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event BishopTokenSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event KnightTokenPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event KnightTokenSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event PawnTokenPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event PawnTokenSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(KingToken _kingtoken, QueenToken _queentoken, RookToken _rooktoken, BishopToken _bishoptoken, KnightToken _knighttoken, PawnToken _pawntoken) public {
    kingtoken = _kingtoken;
    queentoken = _queentoken;
    rooktoken = _rooktoken;
    bishoptoken = _bishoptoken;
    knighttoken = _knighttoken;
    pawntoken = _pawntoken;
  }

  function buyKingTokens() public payable {
    // Redemption rate = # of tokens they receive for 1 ether
    // Amount of Ethereum * Redemption kingRate
    // Calculate the numbers to buyKingToken
    uint kingTokenAmount = msg.value * kingRate;

    // Require ChessSwap to have enough tokens
    require(kingtoken.balanceOf(address(this)) >= kingTokenAmount);

    // Transfer King Tokens to the user
    kingtoken.transfer(msg.sender, kingTokenAmount);

    // Emit an event
    emit KingTokenPurchased(msg.sender, address(kingtoken), kingTokenAmount, kingRate);
  }

  function sellKingTokens(uint _amount) public {
    // User can't sell more tokens more than they have
    require(kingtoken.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / kingRate;

    // Require that ChessSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    kingtoken.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    // Emit an event
    emit KingTokenSold(msg.sender, address(kingtoken), _amount, kingRate);
  }

  function buyQueenTokens() public payable {
    // Redemption rate = # of tokens they receive for 1 ether
    // Amount of Ethereum * Redemption queenRate
    // Calculate the numbers to buyQueenToken
    uint queenTokenAmount = msg.value * queenRate;

    // Require ChessSwap to have enough tokens
    require(queentoken.balanceOf(address(this)) >= queenTokenAmount);

    // Transfer Queen Tokens to the user
    queentoken.transfer(msg.sender, queenTokenAmount);

    // Emit an event
    emit QueenTokenPurchased(msg.sender, address(queentoken), queenTokenAmount, queenRate);
  }

  function sellQueenTokens(uint _amount) public {
    // User can't sell more tokens more than they have
    require(queentoken.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / queenRate;

    // Require that ChessSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    queentoken.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    // Emit an event
    emit QueenTokenSold(msg.sender, address(queentoken), _amount, queenRate);
  }

  function buyRookTokens() public payable {
    // Redemption rate = # of tokens they receive for 1 ether
    // Amount of Ethereum * Redemption rookRate
    // Calculate the numbers to buyRookToken
    uint rookTokenAmount = msg.value * rookRate;

    // Require ChessSwap to have enough tokens
    require(rooktoken.balanceOf(address(this)) >= rookTokenAmount);

    // Transfer Rook Tokens to the user
    rooktoken.transfer(msg.sender, rookTokenAmount);

    // Emit an event
    emit RookTokenPurchased(msg.sender, address(rooktoken), rookTokenAmount, rookRate);
  }

  function sellRookTokens(uint _amount) public {
    // User can't sell more tokens more than they have
    require(rooktoken.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / rookRate;

    // Require that ChessSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    rooktoken.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    // Emit an event
    emit RookTokenSold(msg.sender, address(rooktoken), _amount, rookRate);
  }

  function buyBishopTokens() public payable {
    // Redemption rate = # of tokens they receive for 1 ether
    // Amount of Ethereum * Redemption bishopknightRate
    // Calculate the numbers to buyBishopToken
    uint bishopTokenAmount = msg.value * bishopknightRate;

    // Require ChessSwap to have enough tokens
    require(bishoptoken.balanceOf(address(this)) >= bishopTokenAmount);

    // Transfer Bishop Tokens to the user
    bishoptoken.transfer(msg.sender, bishopTokenAmount);

    // Emit an event
    emit BishopTokenPurchased(msg.sender, address(bishoptoken), bishopTokenAmount, bishopknightRate);
  }

  function sellBishopTokens(uint _amount) public {
    // User can't sell more tokens more than they have
    require(bishoptoken.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / bishopknightRate;

    // Require that ChessSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    bishoptoken.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    // Emit an event
    emit BishopTokenSold(msg.sender, address(bishoptoken), _amount, bishopknightRate);
  }

  function buyKnightTokens() public payable {
    // Redemption rate = # of tokens they receive for 1 ether
    // Amount of Ethereum * Redemption bishopknightRate
    // Calculate the numbers to buyKnightToken
    uint knightTokenAmount = msg.value * bishopknightRate;

    // Require ChessSwap to have enough tokens
    require(knighttoken.balanceOf(address(this)) >= knightTokenAmount);

    // Transfer Knight Tokens to the user
    knighttoken.transfer(msg.sender, knightTokenAmount);

    // Emit an event
    emit KnightTokenPurchased(msg.sender, address(knighttoken), knightTokenAmount, bishopknightRate);
  }

  function sellKnightTokens(uint _amount) public {
    // User can't sell more tokens more than they have
    require(knighttoken.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / bishopknightRate;

    // Require that ChessSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    knighttoken.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    // Emit an event
    emit KnightTokenSold(msg.sender, address(knighttoken), _amount, bishopknightRate);
  }

  function buyPawnTokens() public payable {
    // Redemption rate = # of tokens they receive for 1 ether
    // Amount of Ethereum * Redemption pawnRate
    // Calculate the numbers to buyPawnToken
    uint pawnTokenAmount = msg.value * pawnRate;

    // Require ChessSwap to have enough tokens
    require(pawntoken.balanceOf(address(this)) >= pawnTokenAmount);

    // Transfer Pawn Tokens to the user
    pawntoken.transfer(msg.sender, pawnTokenAmount);

    // Emit an event
    emit PawnTokenPurchased(msg.sender, address(pawntoken), pawnTokenAmount, pawnRate);
  }

  function sellPawnTokens(uint _amount) public {
    // User can't sell more tokens more than they have
    require(pawntoken.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / pawnRate;

    // Require that ChessSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    pawntoken.transferFrom(msg.sender, address(this), _amount);
    msg.sender.transfer(etherAmount);

    // Emit an event
    emit PawnTokenSold(msg.sender, address(pawntoken), _amount, pawnRate);
  }

}
