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

var board = new Board(4);

var solution = 0;
var checkWholeBoard = function(board, row) {
// for each spot in row
// for (var i = 0; i < board.length; i++)
// place in col 0 <- the board is updated to have one piece on it
  var columnConflictCheck = board.hasAnyColConflicts;
  // check for conflict <- has any col or row conflict
  if (columnConflictCheck) {
    // if there is conflict, then go to next spot in row
  } else {
    /*
    if no conflict
    if nextRow !== (n - 1) <- if I'm on row 3, don't do recursion
      checkWholeBoard(board, nextRow); <- this board will have a piece at [0,0];
      nextRow++;
    if nextRow === (n - 1) <- am I on the last row?
      increment solution++
    */
  }
  // if we find one solution, will the whole function stop? or can we keep it going?

};



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
