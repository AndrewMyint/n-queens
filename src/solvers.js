/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// base case - we hit the bottom-right position of the board (max row, max column)


    // if there is conflict, then go to next spot in row

    /*
    if no conflict
    if nextRow !== (n - 1) <- if I'm on row 3, don't do recursion
      checkWholeBoard(board, nextRow); <- this board will have a piece at [0,0];
      nextRow++;
    if nextRow === (n - 1) <- am I on the last row?
      increment solution++
    */

  // if we find one solution, will the whole function stop? or can we keep it going?




window.findNRooksSolution = function(n) {
  var solution = new Board({n : n}); //fixme

  var returnFirstSolution = function(board, row) {
    var currentRow = board.rows()[row];
    // for each spot in row
    for (var i = 0; i < currentRow.length; i++) {
      board.togglePiece(row, i);
      // place in col 0 <- the board is updated to have one piece on it
      var columnConflictCheck = board.hasAnyColConflicts();
      // check for conflict <- has any col or row conflict
      if (columnConflictCheck) {
        board.togglePiece(row, i);
      } else {
        var nextRow = row + 1;
        if (nextRow === currentRow.length) {
          // solutionCount++;
          // board.togglePiece(row, i);
          return;
        } else {
          returnFirstSolution(board, nextRow);
          return;
         // board.togglePiece(row, i);
        }
      }
    }
  };
  returnFirstSolution(solution, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n : n});

  var checkWholeBoard = function(board, row, colObj) {
    var currentRow = board.rows()[row];
    if (colObj === undefined) {
      colObj = {};
      for (var i = 0; i < currentRow.length; i++) {
        colObj[i] = false;
      }
    }
    // for each spot in row
    for (var i = 0; i < currentRow.length; i++) {
      if (colObj[i] === true) {
        // nothing because I already know this column is occupied
      } else {
        board.togglePiece(row, i);
        colObj[i] = true;
        // place in col 0 <- the board is updated to have one piece on it
        // var columnConflictCheck = board.hasAnyColConflicts();
        // check for conflict <- has any col or row conflict
        // if (columnConflictCheck) {
        //   board.togglePiece(row, i);
        // } else {
        var nextRow = row + 1;
        if (nextRow === currentRow.length) {
          solutionCount++;
          board.togglePiece(row, i);
          colObj[i] = false;
        } else {
          checkWholeBoard(board, nextRow, colObj);
          board.togglePiece(row, i);
          colObj[i] = false;
        }
        // }
      }
    }
  };

  checkWholeBoard(board, 0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n : n}); //fixme
  var solutionFound = false;

  var returnFirstQueenSolution = function(board, row) {
    if (board.rows().length === 0) {
      return;
    }
    var currentRow = board.rows()[row];
    // for each spot in row
    for (var i = 0; i < currentRow.length; i++) {
      board.togglePiece(row, i);
      // place in col 0 <- the board is updated to have one piece on it
      // check for conflict <- has any col or row conflict
      if (board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
        board.togglePiece(row, i);
      } else {
        var nextRow = row + 1;
        if (nextRow === currentRow.length) {
          // solutionCount++;
          // board.togglePiece(row, i);
          solutionFound = true;
          return;
        } else {
          returnFirstQueenSolution(board, nextRow);
          if (solutionFound) {
            return;
          } else {
            board.togglePiece(row, i);
          }
        }
      }
    }
  };
  returnFirstQueenSolution(solution, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) { return 1; }
  var solutionCount = 0; //fixme
  var board = new Board({n : n});

  var checkWholeBoardQueens = function(board, row) {
    var currentRow = board.rows()[row];
    // for each spot in row
    for (var i = 0; i < currentRow.length; i++) {
      board.togglePiece(row, i);
      if (board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
        board.togglePiece(row, i);
      } else {
        var nextRow = row + 1;
        if (nextRow === currentRow.length) {
          solutionCount++;
          board.togglePiece(row, i);
        } else {
          checkWholeBoardQueens(board, nextRow);
          board.togglePiece(row, i);
        }
      }
    }
  };

  checkWholeBoardQueens(board, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
