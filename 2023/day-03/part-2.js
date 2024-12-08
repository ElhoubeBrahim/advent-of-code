const fs = require('fs');

fs.readFile('puzzle.txt', (err, data) => {
  if (err) throw err;

  const puzzle = data.toString().split("\n");
  let matrix = [];
  let sum = 0;

  for (let i = 0; i < puzzle.length; i++) {
    const line = puzzle[i];
    matrix.push(line.trim().split(''));
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const char = matrix[i][j];
      let numbers = [];

      if (isPossibleGear(char)) {
        let topNums = readNumbers(matrix, i - 1, j);
        let bottomNums = readNumbers(matrix, i + 1, j);

        let leftNum = readLeftNumber(matrix, i, j);
        let rightNum = readRightNumber(matrix, i, j);

        numbers.push(...topNums);
        numbers.push(...bottomNums);
        
        if (leftNum !== '') {
          numbers.push(leftNum);
        }

        if (rightNum !== '') {
          numbers.push(rightNum);
        }
        
        if (numbers.length == 2) {
          sum += multiplyArray(numbers);
        }

        // console.log(char, i, j);

        // console.log('\ttopNums', topNums);
        // console.log('\tbottomNums', bottomNums);
        // console.log('\tleftNum', leftNum);
        // console.log('\trightNum', rightNum);
      }
    }
  }

  console.log(sum);
});

function isDigit(char) {
  return char >= '0' && char <= '9';
}

function isPossibleGear(char) {
  return char === '*';
}

function readNumbers(matrix, i, j) {
  let numbers = [];

  const leftNum = readLeftNumber(matrix, i, j);
  const rightNum = readRightNumber(matrix, i, j);

  if (isDigit(matrix[i][j])) {
    numbers.push(leftNum + matrix[i][j] + rightNum);
  } else {
    numbers.push(leftNum);
    numbers.push(rightNum);
  }

  return numbers.filter(n => n !== '');
}

function readLeftNumber(matrix, i, j) {
  let number = '';

  j = j - 1;
  while (j >= 0 && isDigit(matrix[i][j])) {
    number = matrix[i][j] + number;
    j--;
  }

  return number;
}

function readRightNumber(matrix, i, j) {
  let number = '';

  j = j + 1;
  while (j < matrix[i].length && isDigit(matrix[i][j])) {
    number = number + matrix[i][j];
    j++;
  }

  return number;
}

function multiplyArray(arr) {
  let sum = 1;
  for (let i = 0; i < arr.length; i++) {
    sum *= parseInt(arr[i]);
  }

  return sum;
}