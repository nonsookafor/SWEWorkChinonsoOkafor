const boggle_solver = require('/home/codio/workspace/Boggle_Testing/boggle_solver.js');

/** Lowercases a string array in-place. (Used for case-insensitive string array
 *  matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}

describe('Boggle Solver tests suite:', () => {
  describe('Normal input', () => {
    test('Normal Case 3 * 3', () => {
      let grid = [
      ["A", "QU", "C"],
      ["C", "D", "F"],
      ["g", "D", "F"]
    ];
      let dictionary = ["AQUCC", "AQUC", "QUA", "QUD"];
      let expected = ["AQUC","QUA","QUD"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
 
  test('Normal Case 4 * 4', () => {
      let grid = [
      ["A", "QU", "C", "j"],
      ["C", "D", "F", 'K'],
      ["g", "D", "F", "k"],
      ["g", "D", "F", "k"]
    ];
      let dictionary = ["AQUCC", "AQUC", "QUA", "QUD"];
      let expected = ["AQUC","QUA","QUD"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

  test('Normal Case 5 * 5', () => {
      let grid = [
      ["A", "QU", "C", "j", 'd'],
      ["C", "D", "F", 'K', "h"],
      ["g", "D", "F", "k", "j"],
      ["g", "D", "F", "k", 'h'],
      ["g", "D", "F", "k", 'h']
    ];
      let dictionary = ["AQUCC", "AQUC", "QUA", "QUD", "acggg", "ddddffff"];
      let expected = ["AQUC","QUA","QUD", "acggg", "ddddffff"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
 
  });

  
  describe('Problem contraints', () => {
    // Cases such as Qu'
    test('handles QU', () => {
      // Make sure QU is treated as 1 word
      let grid = [
      ["A", "QU", "C"],
      ["C", "D", "F"],
      ["g", "D", "F"]
    ];
      let dictionary = ["AQUCC", "AQUC", "QUA", "QUD"];
      let expected = ["AQUC","QUA","QUD"];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
 
  });

  describe('Duplicate Letters', () => {
    test('Immediate Loop', () => {
      let grid = [
      ["A", "QU"],
      ["A", "D"]
    ];
      let dictionary = ["AQUA", "AQUD", "QUA", "QUD", "AAD", "AAQUD"];
      let expected = ["AQUD","QUA","QUD", "AAQUD", 'AQUA', "AAD"];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Later Loop', () => {
      let grid = [
      ["A", "QU", "C"],
      ["C", "D", "F"],
      ["g", "D", "F"]
    ];
      let dictionary = ["AQUCC", "AQUC", "QUA", "QUD"];
      let expected = ["AQUC","QUA","QUD"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
 
  });

  
  describe('Input edge cases', () => {

    // Example Test using Jess
    test('Dictionary is empty', () => {
      // (Edge case) Since there are no possible solutiona, it should return an
      // empty list.
      let grid = [['A', 'B', 'C', 'D'],
                    ['E', 'F', 'G', 'H'],
                    ['I', 'J', 'K', 'L'],
                    ['M', 'N', 'O', 'P']];
      let dictionary = [];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Empty Board', () => {

      let grid = [];
      let dictionary = ["app"];
      let expected = [];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
  describe('QU/ST', () => {

    test('QU Basic Functionality', () => {

      let grid = [
      ["A", "QU", "C"],
      ["C", "D", "F"],
      ["g", "D", "F"]
    ];
      let dictionary = ["AQUCC", "AQUC", "QUA", "QUD"];
      let expected = ["AQUC","QUA","QUD"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('ST Basic Functionality', () => {

      let grid = [
      ["A", "st", "C"],
      ["C", "D", "F"],
      ["g", "D", "F"]
    ];
      let dictionary = ["ASTCC", "ASTC", "STA", "STD"];
      let expected = ["ASTC","StA","STD"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('q in List', () => {

      let grid = [
      ["A", "QU", "C"],
      ["C", "q", "F"],
      ["g", "D", "F"]
    ];
      let dictionary = ["AQUCC", "AQUC", "QUA", "QUD", "acqu", "acq"];
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test('Trailing q', () => {

      let grid = [
      ["A", "QU", "C"],
      ["C", "D", "F"],
      ["g", "D", "F"]
    ];
      let dictionary = ["AQUCC", "AQUC", "QUA", "QUD", "acqu", "acq"];
      let expected = ["AQUC", "QUA", "QUD", "acqu"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);

      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
});
