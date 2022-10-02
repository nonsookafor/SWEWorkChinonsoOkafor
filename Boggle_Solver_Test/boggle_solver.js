/**
 * Fucntion to validate point
 * the dictionary present inside of the Boggle board.
 * @param {int[]} point - The Boggle game board.
 * @param {string[]} grid - The list of available words.
 * @return {boolean} solutions - Possible solutions to the Boggle board.
 */
function validatePoint(point, grid) {
  if ((0 <= point[0] && point[0] <= grid.length - 1) && (0 <= point[1] &&
point[1] <= grid[0].length - 1)) {
    return true;
  }
  return false;
}

/**
 * Function to get all possible words that can be created from grid
 * and in dictionary
 * @param {string[]} grid - The Boggle game board.
 * @param {string[]} usedPoints - Points already used.
 * @param {int} i - Position of row.
 * @param {int} j - Position of column.
 * @param {string} currentSubWord - Current prefix.
 * @param {string[]} allCasesDictionary - The list of available
 *  words and prefix.
 * @param {string[]} solutions - Final Solution.
 * @return {void}
 */
function getResults(grid, usedPoints, i, j, currentSubWord, allCasesDictionary,
    solutions) {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
    return;
  }
  if (!(currentSubWord in allCasesDictionary)) {
    return;
  }

  if ((allCasesDictionary[currentSubWord] == true) &&
(currentSubWord.length >= 3)) {
    if (!(solutions.includes(currentSubWord))) {
      solutions.push(currentSubWord);
    }
  }

  const adjMatrix = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0],
    [1, -1], [0, -1]];
  for (let idx = 0; idx < adjMatrix.length; idx++) {
    num1 = adjMatrix[idx][0] + i;
    num2 = adjMatrix[idx][1] + j;
    if (!(usedPoints.includes((String(num1) + ',' + String(num2)))) &&
validatePoint([num1, num2], grid)) {
      currentUsedPoints = [...usedPoints];
      currentUsedPoints.push(String(num1) + ',' + String(num2));
      getResults(grid, currentUsedPoints, num1, num2, currentSubWord +
grid[num1][num2], allCasesDictionary, solutions);
    }
  }
}

/**
 * function to check if grid is valid.
 * @param {string[]} grid - The Boggle game board.
 * @return {boolean} True or False.
 */
function isGridValid(grid) {
  regex = /(st|qu)|[a-prt-z]/;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!grid[i][j].match(regex)) {
        return false;
      }
    }
  }
  return true;
}


/**
 * Function to convert all letters in grid to lowercase.
 * @param {string[]} grid - The Boggle game board.
 * @return {string[]} True or False.
 */
function gridToLower(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }
  return grid;
}

/**
 * Function to convert all letters in dict to lowercase.
 * @param {string[]} dict - A Dictionary of words.
 * @return {string[]} True or False.
 */
function dictToLower(dict) {
  for (let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
  return dict;
}

// function to return our answer
exports.findAllSolutions = function(grid, dictionary) {
  const solutions = [];
  const allCasesDictionary = {'': false};

  grid = gridToLower(grid);
  dictionary = dictToLower(dictionary);

  if ((!isGridValid(grid)) || (grid == null) || (dictionary == null)||
(grid.constructor !== Array) || (dictionary.constructor !== Array)) {
    return solutions;
  }

  const N = grid.length;
  for (let i = 0; i < N; i++) {
    if (grid[i].length != N || grid[i] == []) {
      return solutions;
    }
  }

  for (let i = 0; i < dictionary.length; i++) {
    allCasesDictionary[dictionary[i]] = true;
    let wordSubString = '';

    for (let j = 0; j < dictionary[i].length - 1; j++) {
      wordSubString += dictionary[i][j];
      if (!(wordSubString in allCasesDictionary)) {
        allCasesDictionary[wordSubString] = false;
      } else if ((wordSubString in allCasesDictionary) &&
(allCasesDictionary[wordSubString]) == true) {
        allCasesDictionary[wordSubString] = true;
      }
    }
  }

  for (let i = 0; i <grid.length; i++) {
    for (let j = 0; j <grid.length; j++) {
      getResults(grid, [String(i) + ',' + String(j)], i, j, grid[i][j],
          allCasesDictionary, solutions);
    }
  }
  return solutions;
};
