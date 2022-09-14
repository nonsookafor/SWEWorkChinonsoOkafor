//Chinonso Okafor. @02986857

/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */

function getResults(grid, usedPoints, i, j, currentSubWord, allCasesDictionary, solutions) {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
    return;
  }
  if (!(currentSubWord in allCasesDictionary)) {
    return;
  }
  // console.log(currentSubWord, usedPoints, "nn");
  if ((allCasesDictionary[currentSubWord] == true) && (currentSubWord.length >= 3)) {
    // solutions.push(currentSubWord);
    if (!(solutions.includes(currentSubWord))) {
      solutions.push(currentSubWord);
    }
  }
  
  if (!(usedPoints.includes((String(i+1) + "," + String(j+1)))) && (i < grid.length - 1 && j < grid[0].length - 1)) {
    currentUsedPoints = [...usedPoints];
    currentUsedPoints.push(String(i+1) + "," + String(j+1));
    getResults(grid, currentUsedPoints, i + 1, j + 1, currentSubWord + grid[i+1][j+1], allCasesDictionary, solutions);
  } 

  if (!(usedPoints.includes((String(i-1) + "," + String(j-1)))) && (i > 0 && j > 0)) {
    currentUsedPoints = [...usedPoints];
    currentUsedPoints.push(String(i-1) + "," + String(j-1));
    getResults(grid, currentUsedPoints, i - 1, j - 1, currentSubWord + grid[i-1][j-1], allCasesDictionary, solutions);
  }

  if (!(usedPoints.includes((String(i+1) + "," + String(j-1)))) && (i < grid.length - 1 && j > 0)) {
    currentUsedPoints = [...usedPoints];
    currentUsedPoints.push(String(i+1) + "," + String(j-1));
    getResults(grid, currentUsedPoints, i + 1, j - 1, currentSubWord + grid[i+1][j-1], allCasesDictionary, solutions);
  }

  if (!(usedPoints.includes((String(i-1) + "," + String(j+1)))) && (i >0 && j < grid[0].length - 1)) {
    currentUsedPoints = [...usedPoints];
    currentUsedPoints.push(String(i-1) + "," + String(j+1));
    getResults(grid, currentUsedPoints, i - 1, j + 1, currentSubWord + grid[i-1][j+1], allCasesDictionary, solutions);
  }

  if (!(usedPoints.includes((String(i) + "," + String(j+1)))) && (j < grid[0].length - 1)) {
    currentUsedPoints = [...usedPoints];
    currentUsedPoints.push(String(i) + "," + String(j+1));
    getResults(grid, currentUsedPoints, i, j + 1, currentSubWord + grid[i][j+1], allCasesDictionary, solutions);
  }

  if (!(usedPoints.includes((String(i) + "," + String(j-1)))) && (j > 0)) {
    currentUsedPoints = [...usedPoints];
    currentUsedPoints.push(String(i) + "," + String(j-1));
    getResults(grid, currentUsedPoints, i, j - 1, currentSubWord + grid[i][j-1], allCasesDictionary, solutions);
  }

  if (!(usedPoints.includes((String(i+1) + "," + String(j)))) && (i < grid.length - 1)) {
    currentUsedPoints = [...usedPoints];
    currentUsedPoints.push(String(i+1) + "," + String(j));
    getResults(grid, currentUsedPoints, i + 1, j, currentSubWord + grid[i+1][j], allCasesDictionary, solutions);
  }

  if (!(usedPoints.includes((String(i-1) + "," + String(j)))) && (i > 0)) {
    currentUsedPoints = [...usedPoints];
    currentUsedPoints.push(String(i-1) + "," + String(j));
    getResults(grid, currentUsedPoints, i - 1, j, currentSubWord + grid[i-1][j], allCasesDictionary, solutions);
  }
  
  //console.log("\n\n\n")
}

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

function gridToLower(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }
  return grid;
}

function dictToLower(dict) {
  for (let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
  return dict;
}

 exports.findAllSolutions = function(grid, dictionary) {
  // console.log(/(st|qu)|[a-prt-z]/.test("r1"))
  let solutions = [],
   allCasesDictionary = {"": false};

  grid = gridToLower(grid);
  dictionary = dictToLower(dictionary);

  if ((!isGridValid(grid)) || (grid == null) || (dictionary == null) ||(grid.constructor !== Array) || (dictionary.constructor !== Array)) {
    return solutions;
  }

  let N = grid.length;
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
      }
      else if ((wordSubString in allCasesDictionary) && (allCasesDictionary[wordSubString]) == true) {
        allCasesDictionary[wordSubString] = true;
      }
    }
  }

  // console.log(allCasesDictionary);
  for (let i = 0; i <grid.length; i++) {
    for (let j = 0; j <grid.length; j++) {
      getResults(grid, [String(i) + "," + String(j)], i, j, grid[i][j], allCasesDictionary, solutions)
    }
  }
  //console.log(solutions.length)
  return solutions;
}

var grid = [["St", "R", "T"],
           ["O", "T", "QU"],
           ["A", "A", "T"]];
var dictionary = ["strt", "to", "so", "at", "aat", "quat"];
let grid4 = [
      ["A", "QU", "C"],
      ["C", "D", "F"]
    ];
let dictionary4 = ["AQUCC", "AQUC", "QUA", "QUD"];
var grid3 = [["A", "B"], ["C", "D"]];
var dictionary3 = ["A", "B", "AC", 'ACA', "ACB", "DE"];
var grid1 = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'fR2'],
              ['St', 'N', 'T', 'A']];
var dictionary1 = ['ART', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                  'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar', "getwe"];
var grid2 = [["A", "B", "C", "D"], ["E", "F", "G", "H"], ["I", "J", 'K', 'L'], ["A", "B", 'C', "D"]];
var dictionary2 = ["ABEF", "AFJIEB", "DGKD", "DGKA"];

console.log(exports.findAllSolutions(grid4, dictionary4));
