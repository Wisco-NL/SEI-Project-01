document.addEventListener('DOMContentLoaded', () => {
  const gameboard = document.querySelector('.gameboard');
  let squares = Array.from(document.querySelectorAll('.gameboard div'));
  width = 10;
  //Drawing the game pieces
  const lTetromino = [
    [0, 1, 11, 21],
    [10, 11, 12, 2],
    [1, 11, 21, 22],
    [10, 20, 11, 12],
  ];

  const jTetromino = [
    [1, 2, 11, 21],
    [10, 11, 12, 22],
    [20, 21, 11, 1],
    [0, 10, 11, 12],
  ];

  const sTetromino = [
    [1, 2, 10, 11],
    [1, 11, 12, 22],
    [1, 2, 10, 11],
    [1, 11, 12, 22],
  ];

  const zTetromino = [
    [0, 1, 11, 12],
    [1, 11, 10, 20],
    [0, 1, 11, 12],
    [1, 11, 10, 20],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const tetrominoes = [
    zTetromino,
    sTetromino,
    lTetromino,
    jTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];
  let currentPosition = 4;
  //Picks random tetromino and displays in the first rotation position
  let currentRotation = 0;
  let random = Math.floor(Math.random() * tetrominoes.length);
  let current = tetrominoes[random][currentRotation];

  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
    });
  }

  draw();
});
