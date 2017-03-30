//Creating object (API) startTicTacToe

var startTicTacToe = {
  
  gameInPlay: false,
  
  winCombinations: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [7, 5, 3]
  ],
  
  playerOneScore: 0,
  
  playerTwoScore: 0,
  
  timeOuts: [],
  
  initializeVars: function() {
    this.numFilledIn = 0;
    this.currentBoard = {
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: ''
    };
  },
  
  initializeGame: function() {
    TicTacToe.initializeVars();
    TicTacToe.display.drawBoard();
    $('.game-choice button').click(function() {
      TicTacToe.secondPlayer = TicTacToe.game.gameSelection(this);
      TicTacToe.display.hideGameChoice();
      TicTacToe.display.showGameStarter(TicTacToe.secondPlayer);
      $('.game-starter .choose-x, .game-starter .choose-o').off().click(TicTacToe.game.firstGame);

      $('.back-button').on('click', function() {
        TicTacToe.display.hideGameStarter();
        TicTacToe.display.showGameChoice();
      });
    });
    $('.hard-reset').on('click', TicTacToe.game.resetGame);
  },
  

  /*=========================
      Display functions
==========================*/

display: {  
  
  hideGameStarter: function() {
  $('.game-starter').fadeOut();
},

  showGameStarter: function(isTwoPlayer) {
  var message;
  if (isTwoPlayer) {
    message = "Player 1 : Would you like X or O?"
  }
  else {
    message = "Would you like to be X or O?";
  }
  TicTacToe.timeOuts.push(
    setTimeout(function() {
      $('.game-starter').fadeIn(500).children('p').text(message);
  }, 700));
},

  showGameChoice: function() {
  $('.game-choice').fadeIn(600);
},

  hideGameChoice: function() {
  $('.game-choice').fadeOut(600);
},

  showPlayerOnePrompt: function() {
  if (TicTacToe.secondPlayer) {
    $('.player-one-turn p').text('Go Player 1!');
  }
  else {
    $('.player-one-turn p').text('Your turn!');
  }
  $('.player-one-turn').animate({'top': '-45px'}, 500);
},

  hidePlayerOnePrompt: function() {
  $('.player-one-turn').animate({'top': '0'}, 500);
},

  showPlayerTwoPrompt: function() {
  if (TicTacToe.secondPlayer) {
    $('.player-two-turn p').text('Go Player 2!');
  }
  else {
    $('.player-two-turn p').text('Computer\'s turn');
  }
  $('.player-two-turn').animate({'top': '-45px'}, 500);
},

  hidePlayerTwoPrompt: function() {
  $('.player-two-turn').animate({'top': '0'}, 500);
},

  showDrawMessage: function() {
  TicTacToe.timeOuts.push(
    setTimeout(function() {
    $('.draw-message').fadeIn(500);
  }, 1500));
},

  hideDrawMessage: function() {
  $('.draw-message').fadeOut(1000);
},

  showLoseMessage: function() {
    TicTacToe.timeOuts.push(
      setTimeout(function() {
    $('.lose-message').fadeIn(500);
}, 1500)
    );
},

  hideLoseMessage: function() {
  $('.lose-message').fadeOut(1000);
},

  showWinMessage: function() {
    TicTacToe.timeOuts.push(
      setTimeout(function() {
    $('.win-message').fadeIn(500).children('p').text("Player " + TicTacToe.turn + " wins!! :D ")
}, 1500));
},

  hideWinMessage: function() {
  $('.win-message').fadeOut(1000);
},

  drawBoard: function() { //***************************************************************************************************************************************************
    TicTacToe.timeOuts.push(setTimeout(function() {
    var c = document.getElementById("myCanvas");
    var canvas = c.getContext("2d");
    canvas.lineWidth = 1;
    canvas.strokeStyle = "#fff";
    //vertical lines
    canvas.beginPath();
    canvas.moveTo(100, 0);
    canvas.lineTo(100, 146.5);
    canvas.closePath();
    canvas.stroke();
    canvas.beginPath();
    canvas.moveTo(200, 0);
    canvas.lineTo(200, 146.5);
    canvas.closePath();
    canvas.stroke();

    // horizontal lines
    canvas.lineWidth = .5;

    canvas.beginPath();
    canvas.moveTo(4, 48.5);
    canvas.lineTo(296, 48.5);
    canvas.closePath();
    canvas.stroke();
      
    canvas.beginPath();
    canvas.moveTo(4, 98.5);
    canvas.lineTo(296, 98.5);
    canvas.closePath();
    canvas.stroke();  
  }, 1500));
},

  resetSquares: function() {
  $('.boxes').html('');
  for (var i = 1; i <= 9; i++) {
    var box = '<li class="' + i + '"><i class="letter"><span></span></i></li>';
    $(box).appendTo($('.boxes'));
  }
},
  
  showScore: function() {
    if (TicTacToe.secondPlayer) {
      $('.score-1').children('.name').text('player 1'); 
      $('.score-2').children('.name').text('player 2'); 
    }
    else {
      $('.score-1').children('.name').text('player 1'); 
      $('.score-2').children('.name').text('computer'); 
    }
    $('.score-1, .score-2').children('.points').text('0');
    $('.score-1,.score-2, .points-divider').fadeIn();
  },
  
  updateScore: function(turn) {
    var currentScore = turn === 1 ? TicTacToe.playerOneScore : TicTacToe.playerTwoScore;

    $('.score-' + turn).children('.points').text(currentScore);
  }
},

/* End display function */

/*=========================
      Game Logic
==========================*/

game: {
	
  whoStarts: function() {
    var random = Math.floor(Math.random() * 2 + 1);
    return random;
  },
  
  gameSelection: function(item) {
    if ($(item).text() === 'One Player') {
      // returns what secondPlayer value to set
      return false;
    }
    else {
      return true;
    } 
  },
  
  firstGame: function() {
    TicTacToe.playerOneSymbol = $(this).text();
    TicTacToe.playerTwoSymbol = TicTacToe.playerOneSymbol == 'X' ? 'O' : 'X'; 
    TicTacToe.turn = TicTacToe.game.whoStarts();
    TicTacToe.display.hideGameStarter();
    $('#myCanvas').animate({'opacity': '1'}, 1200);
    $('.hard-reset').fadeIn(600);
    TicTacToe.display.showScore();
    TicTacToe.display.resetSquares();
    TicTacToe.game.play();
  },
 // *******************************************************************************************************************************************************************************************
  play: function() {
    
    TicTacToe.gameInPlay = true;
    $('.boxes li').on('click', function() {
     TicTacToe.game.playerTurn(this);
    });  
    
    TicTacToe.timeOuts.push(
      setTimeout(function(){
      if (TicTacToe.turn === 1) {
        TicTacToe.display.showPlayerOnePrompt();
      }
      else if (TicTacToe.turn === 2) {
        TicTacToe.display.showPlayerTwoPrompt();
      }
    }, 1500),
    setTimeout(function() {
      if (TicTacToe.turn === 2 && !TicTacToe.secondPlayer) {
        TicTacToe.game.computerPlay();
      }
    }, 1200));
  },
  
  playerTurn: function(square) {
    var symbol = TicTacToe.turn === 1 ? TicTacToe.playerOneSymbol : TicTacToe.playerTwoSymbol;
    var box = $(square).children('i').children('span');
    if (box.text() === '' && TicTacToe.gameInPlay && (TicTacToe.turn === 1 || (TicTacToe.turn === 2 && TicTacToe.secondPlayer))) {
      box.text(symbol);
      var number = $(square).attr('class');
      TicTacToe.game.updateSquare(number, symbol);
      TicTacToe.game.endTurn(symbol);
    }
  },
  
  computerPlay: function() {
    var computer = TicTacToe.computer;
    //test computer move suggestion
    var boxNumber;
    if (computer.computerWhichMove(TicTacToe.game) && TicTacToe.turn === 2) {
      boxNumber = computer.computerWhichMove(TicTacToe.game);
      var currentBox = $('.' + boxNumber).children('i');
      
      var symbol = TicTacToe.playerTwoSymbol;

      TicTacToe.timeOuts.push(
        setTimeout(function() {
        currentBox.children('span').text(symbol);
        TicTacToe.game.updateSquare(boxNumber, TicTacToe.playerTwoSymbol);
        TicTacToe.game.endTurn(symbol);
      }, 1000));
    } 
  },
  
  endTurn: function(symbol) {
    TicTacToe.numFilledIn = TicTacToe.numFilledIn + 1;
    if (TicTacToe.gameInPlay) {
      if (TicTacToe.game.checkWin(symbol)[0]) {
        TicTacToe.game.updateScore(TicTacToe.turn);
        if (TicTacToe.secondPlayer) {
          TicTacToe.display.showWinMessage();
        }
        else {
          TicTacToe.turn === 1 ? TicTacToe.display.showWinMessage() : TicTacToe.display.showLoseMessage();
        }
        TicTacToe.gameInPlay = false;
        TicTacToe.game.showWinningCombination();
        TicTacToe.display.hidePlayerOnePrompt();
        TicTacToe.display.hidePlayerTwoPrompt();
        TicTacToe.game.reset();
      }
      // stop if it is a draw
      else if (TicTacToe.numFilledIn >= 9) {
        TicTacToe.gameInPlay = false;
        TicTacToe.display.hidePlayerOnePrompt();
        TicTacToe.display.hidePlayerTwoPrompt();
        TicTacToe.display.showDrawMessage();
        TicTacToe.turn = TicTacToe.game.whoStarts();
        TicTacToe.game.reset();
      } else {
        if (TicTacToe.turn === 1) {
          TicTacToe.display.hidePlayerOnePrompt();
          TicTacToe.display.showPlayerTwoPrompt();
          TicTacToe.turn = 2;
          // call computer turn if no second player
          if (!TicTacToe.secondPlayer) {
            TicTacToe.game.computerPlay();
          }
        } else if (TicTacToe.turn === 2) {
          TicTacToe.display.showPlayerOnePrompt();
          TicTacToe.display.hidePlayerTwoPrompt();
          TicTacToe.turn = 1;
        }
      }
    }
  },
  
  updateSquare: function(number, symbol) {
    TicTacToe.currentBoard[number] = symbol;
  },
  
  checkWin: function(symbol) {
    var currentBoard = TicTacToe.currentBoard;
    var wins = TicTacToe.winCombinations;
    var winningCombo = [];
    var winner = wins.some(function(combination) {
      var winning = true;
      for (var i = 0; i < combination.length; i++) {
        if (currentBoard[combination[i]] !== symbol) {
          winning = false;
        }
      }
      if (winning) {
        winningCombo = combination;
      }
      return winning;
    });
    return [winner, winningCombo];
  },
  
  showWinningCombination: function() {
    var symbol = TicTacToe.turn === 1 ? TicTacToe.playerOneSymbol : TicTacToe.playerTwoSymbol;
    var combo = TicTacToe.game.checkWin(symbol)[1];
    for (var i = 0; i < combo.length; i++) {
      var currentBox = '.' + combo[i]; 
   // Black box and rotating test for winning combo  
        $(currentBox).children('i').addClass('win').children('span').addClass('rotate');
     }
  },
  
  updateScore: function(turn) {
    turn === 1 ? TicTacToe.playerOneScore += 1 : TicTacToe.playerTwoScore += 1; 
    
    TicTacToe.display.updateScore(turn);
    
  },
  
  reset: function() {
    TicTacToe.initializeVars();
    
    TicTacToe.timeOuts.push(
      setTimeout(function() {
        TicTacToe.display.hideDrawMessage();
        TicTacToe.display.hideLoseMessage();
        TicTacToe.display.hideWinMessage();
        $('.boxes li').fadeOut();
      }, 5000),
      setTimeout(function(){
        TicTacToe.display.resetSquares();
        $('.boxes li').fadeIn();
        TicTacToe.numFilledIn = 0;
      }, 6000),
    //Make sure time for next timeout is long enough
    //to not cause problems after first game
      setTimeout(function() {
        TicTacToe.gameInPlay = true;
        TicTacToe.game.play();
      }, 6000)
      );
  },
  
  resetGame: function() {
    $('#myCanvas').css('opacity', '0');
    $('.hard-reset').fadeOut();
    $('.points-divider, .score-1, .score-2').fadeOut();
    TicTacToe.playerOneScore = 0;
    TicTacToe.playerTwoScore = 0;
    TicTacToe.display.resetSquares();
    TicTacToe.initializeVars();
    TicTacToe.gameInPlay = false;
    TicTacToe.playerOneSymbol = null;
    TicTacToe.playerTwoSymbol = null;
    TicTacToe.timeOuts.forEach(function(timer) {
      clearTimeout(timer);
    });
    $('.draw-message, .win-message, .lose-message').hide();
    TicTacToe.display.hidePlayerOnePrompt();
    TicTacToe.display.hidePlayerTwoPrompt();
    TicTacToe.display.showGameChoice();
  }
},

/* End Game Logic */

/*================================
    Computer Move Decisions
=================================*/

computer: {
	
  computerWhichMove: function () {
    var move = this.winOrBlockChoice('win')[0];
    if (!move) {
      move = this.winOrBlockChoice('block')[0];
      console.log(this.winOrBlockChoice('block'));
    }
    if (!move) {
      move = this.doubleThreatChoice('win');
    }
    if (!move) {
      move = this.doubleThreatChoice('block');
    }
    if (!move) {
      move = this.firstPlay();
    }
    if (!move) {
      move = this.playCenter();
    }
    if (!move) {
      move = this.emptyCorner();
    }
    if (!move) {
      move = this.emptySide();
    }
    move = (move && TicTacToe.currentBoard[move]) === '' ? move : false;
    return move;
  },

  winOrBlockChoice: function(choiceType, board) {
    var board = board || TicTacToe.currentBoard;
    if (choiceType === 'win') {
      var currentSymbol = TicTacToe.playerTwoSymbol;
      var opponentSymbol = TicTacToe.playerOneSymbol;
    } else if (choiceType === 'block') {
      var currentSymbol = TicTacToe.playerOneSymbol;
      var opponentSymbol = TicTacToe.playerTwoSymbol;
    } else {
      return;
    }
    var moves = [];
    TicTacToe.winCombinations.forEach(function(combo) {
      var notFound = [];
      var notPlayer = true;
      for (var i = 0; i < combo.length; i++) {
        if (board[combo[i]] !== currentSymbol) {
          if (board[combo[i]] === opponentSymbol) {
            notPlayer = false;
          } else {
            notFound.push(combo[i]);
          }
        }
      }
      if (notFound.length === 1 && notPlayer) {
        var move = notFound[0];
        moves.push(move);
      }
    });
    return moves;
},

  doubleThreatChoice: function(choiceType) {
  // use winChoice function to test a spot for double threat
  var board = TicTacToe.currentBoard;
  var move;

  if (choiceType === 'win') {
    var currentSymbol = TicTacToe.playerTwoSymbol;
    var opponentSymbol = TicTacToe.playerOneSymbol;
  } else if (choiceType === 'block') {
    var currentSymbol = TicTacToe.playerOneSymbol;
    var opponentSymbol = TicTacToe.playerTwoSymbol;
  }

  // forced diagonal win on 4th move prevention
    if (board[5] === currentSymbol && TicTacToe.numFilledIn === 3) {
      if ((board[1] === opponentSymbol && board[9] === opponentSymbol) || (board[3] === opponentSymbol && board[7] === opponentSymbol)) {
        // Play an edge to block double threat
        move = this.emptySide();
      }
    }
  
    if (!move && board[5] === opponentSymbol && TicTacToe.numFilledIn === 2) {
      move = this.diagonalSecondAttack();
    }

  if (!move) {
    // clone current board;
    var testBoard = $.extend({}, board);
    for (var i = 1; i <= 9; i++) {

      testBoard = $.extend({}, board);
      if (testBoard[i] === '') {
        testBoard[i] = currentSymbol;
        if (this.winOrBlockChoice(choiceType, testBoard).length >= 2) {
          move = i;
        }
      }
    }
  }
  return move || false;
},

  diagonalSecondAttack: function() {
  var board = TicTacToe.currentBoard;
  var comp = TicTacToe.playerTwoSymbol;
  var corners = [1,3,7,9];
  for (var i = 0; i < corners.length; i++) {
    if (board[corners[i]] === comp) {
      return 10 - corners[i];
    }
  }
},

  firstPlay: function() {
  var board = TicTacToe.currentBoard;
 var corners = [1, 3, 7, 9];
  var move;
  if (TicTacToe.numFilledIn === 1) {
    // player plays center
    if (board[5] === TicTacToe.playerOneSymbol) {
      var cornerNum = Math.floor(Math.random() * 4 + 1);
      move = [1, 3, 7, 9][cornerNum];
    }
    //player plays corner, play opposite corner
    else {
      for (var i = 0; i < corners.length; i++) {
        if (TicTacToe.currentBoard[corners[i]] === TicTacToe.playerOneSymbol) {
          move = 5;
        }
      }
    }
  } else if (TicTacToe.numFilledIn === 0) {
    var cornerNum = Math.floor(Math.random() * corners.length + 1);
    move = corners[cornerNum];
  }
  return move ? move : false;
},
  
  playCenter: function() {
    if (TicTacToe.currentBoard[5] === '') {
      return 5;
    }
  },
  
  emptyCorner: function() {
  var board = TicTacToe.currentBoard;
  var corners = [1, 3, 7, 9];
  var move;
  for (var i = 0; i < corners.length; i++) {
    if (board[corners[i]] === '') {
      move = corners[i];
    }
  }
  return move || false;
},

  emptySide: function() {
  var sides = [2, 4, 6, 8];
  for (var i = 0; i < sides.length; i++) {
    if (TicTacToe.currentBoard[sides[i]] === '') {
      return sides[i];
    }
  }
  return false;
}
}

/* End Computer Move Decisions */
};

/* 
using timeouts with loops
http://stackoverflow.com/questions/25311892/cleartimeout-for-settimeout-in-for-loop
*/


var TicTacToe = TicTacToe || startTicTacToe;


$(document).ready(function() {  
  TicTacToe.initializeGame();
});
