document.addEventListener('DOMContentLoaded', () => {
  const gameboard = document.querySelector('.gameboard');
  let squares = Array.from(document.querySelectorAll('.gameboard div'));
  const colors = [
    'url(images/blue-tetromino.png)',
    'url(images/grey-tetromino.png)',
    'url(images/purple-tetromino.png)',
    'url(images/green-tetromino.png)',
    'url(images/pink-tetromino.png)',
    'url(images/yellow-tetromino.png)',
    'url(images/red-tetromino.png)',
  ];
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
    [1, 10, 11, 12],
    [1, 11, 12, 21],
    [10, 11, 12, 21],
    [1, 10, 11, 21],
  ];

  const oTetromino = [
    [0, 1, 10, 11],
    [0, 1, 10, 11],
    [0, 1, 10, 11],
    [0, 1, 10, 11],
  ];

  const iTetromino = [
    [1, 11, 21, 31],
    [10, 11, 12, 13],
    [1, 11, 21, 31],
    [10, 11, 12, 13],
  ];

  const tetrominoes = [
    lTetromino,
    jTetromino,
    sTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];
  let currentPosition = 3;
  let currentRotation = 0;

  //Picks random tetromino and displays in the first rotation position
  let random = Math.floor(Math.random() * tetrominoes.length);
  let current = tetrominoes[random][currentRotation];

  //Drawing the Tetromino
  const drawGamePiece = () => {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
      squares[currentPosition + index].style.backgroundImage = colors[random];
    });
  };

  // Undraw Tetromino
  const undrawGamePiece = () => {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino');
      squares[currentPosition + index].style.backgroundImage = 'none';
    });
  };

  //Stop game pieces from going through the game board floor
  const gameBoardFloor = () => {
    if (
      current.some((index) => squares[currentPosition + index + 10].classList.contains('floor'))
    ) {
      current.forEach((index) => squares[currentPosition + index].classList.add('floor'));
      //Start a new tetromino falling
      random = Math.floor(Math.random() * tetrominoes.length);
      current = Math.floor(Math.random() * tetrominoes.length);
      current = tetrominoes[random][currentRotation];
      currentPosition = 4;
      drawGamePiece();
    }
  };

  // Make the game pieces move down every second
  const down = () => {
    undrawGamePiece();
    currentPosition += 10;
    drawGamePiece();
    gameBoardFloor();
  };

  moveTimer = setInterval(down, 1000);
});
