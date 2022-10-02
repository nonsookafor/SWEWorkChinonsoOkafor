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