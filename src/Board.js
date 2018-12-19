// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // [
    //   [0, 0, 0, 0],
    //   [1, 1, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0]
    // ]
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //fiter array to extract arr[i] === 1;
      //check arr.length > 1
      var length =  this.rows()[rowIndex].filter((elements) => elements === 1).length;
      // [1,1,0,0] -> [1,1]
      return length > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // check all rows
      // iterate over this.rows() -> nested arrays
      var checkRow;
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        checkRow = this.hasRowConflictAt(i);
        if (checkRow === true) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var count = 0;
      for (var i = 0; i < board.length; i++) {
        if (board[i][colIndex] === 1) {
          count++;
        }
      }
      if (count > 1){
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // for loop to loop through columns
      var checkRow;
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        checkRow = this.hasColConflictAt(i);
        if (checkRow === true) {
          return true;
        }
      }
      // inside loop, use colconflict
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // [
    //   [0, 0, 1, 0],
    //   [1, 1, 0, 1],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0]
    // ]
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // 0 value - that's row 0, column 0
      // all positive values - row 0, column arg
      // colIndex - rowindex
      // (col) 2 - (row) 0 = +2
      // all negative values - row indexes
      // (col) 0 - (row) 2 = -2
      var board = this.rows();
      var rowCount = 0;
      var count = 0;
      if (majorDiagonalColumnIndexAtFirstRow > 0) {
        for (var i = majorDiagonalColumnIndexAtFirstRow; i < board.length; i++) {
          if (board[rowCount][i] === 1){
            count++;
          }
          rowCount++;
          if (count > 1) {
            return true;
          }
        }
      } else if (majorDiagonalColumnIndexAtFirstRow < 0) {
        var colCount = 0;
        for (var i = (majorDiagonalColumnIndexAtFirstRow * (-1)); i < board.length; i++) {
          if (board[i][colCount] === 1){
            count++;
          }
          colCount++;
          if (count > 1) {
            return true;
          }
        }
      } else {
        for (var i = 0; i < board.length; i++) {
          if (board[i][i] === 1) {
            count++;
          }
          if (count > 1) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // let's say the arg is 2 - row 0, column 2
    // when I check a diagnoal, I'm moving by adding 1 to both row and column - so next spot is row 1, column 3
    // when the column num is positive, I'm closer to running out of columns than rows

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // check all maj diagonals on board
      // call above function for each possible maj diagonal

      // what is the total number of diagonal rows for a given table with size n?
      // 2n - 3 <- works for all boards 3 and bigger
      // start at negative value of length + 1, run through positive - 1
      var board = this.rows();
      var checkLoc;
      for (var i = ((board.length * (-1)) + 1); i < (board.length - 1); i++) {
        checkLoc = this.hasMajorDiagonalConflictAt(i);
        if (checkLoc === true) {
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // 2n - 3 = total number of minor diagonals on the board
      var board = this.rows();
      var count = 0;
      // if minorDiag <= board.length - 1 (3) <- top side of board
      if (minorDiagonalColumnIndexAtFirstRow <= (board.length - 1)) {
        var rowLoc = 0;
        for (var i = minorDiagonalColumnIndexAtFirstRow; i >= 0; i--) { // i is the column
          if (board[rowLoc][i] === 1) {
            count++;
          }
          rowLoc++
          if (count > 1) {
            return true;
          }
        }
      } else if (minorDiagonalColumnIndexAtFirstRow > (board.length - 1)) {
        // 5 -> 2
        // 4 -> 1
        var colLoc = (board.length - 1);
        for (var i = (minorDiagonalColumnIndexAtFirstRow - (board.length - 1)); i < board.length; i++) {
          // i is the row
          if (board[i][colLoc] === 1) {
            count++;
          }
          colLoc--; // moves one column to the left
          if (count > 1) {
            return true;
          }
        }
      }
        //
      // if minorDiag > board.length - 1 <- right side of board
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // loop through all minor diagonal
      var board = this.rows();
      var check = false;
      var maxDiagonal = (2 * board.length) - 3;
      for (var i = 1; i <= maxDiagonal; i++) {
        // check each diagonal the helper function
        check = this.hasMinorDiagonalConflictAt(i);
        if (check) {
          return true;
        }
      }

      // if help function return true ==> return true
      //return false;
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
