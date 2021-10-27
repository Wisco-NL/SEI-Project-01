document.addEventListener('DOMContentLoaded', () => {
  const gameboard = document.querySelector('.gameboard');
  let squares = Array.from(document.querySelectorAll('.gameboard div'));
  let nextRandom = 0;
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
  let currentPosition = 4;
  let currentRotation = 0;

  //Picks random tetromino and displays in the first rotation position
  random = Math.floor(Math.random() * tetrominoes.length);
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
      //nextRandom passes tetromino from preview to game board
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * tetrominoes.length);
      current = tetrominoes[random][currentRotation];
      currentPosition = 4;
      drawGamePiece();
      previewShape();
    }
  };

  //assign keyCodes
  const movement = (e) => {
    if (e.keyCode === 37) {
      left();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      right();
    } else if (e.keyCode === 40) {
      down();
    }
  };
  document.addEventListener('keyup', movement);

  // Make the game pieces move down every second
  const down = () => {
    undrawGamePiece();
    currentPosition += 10;
    drawGamePiece();
    previewShape();
    gameBoardFloor();
  };

  moveTimer = setInterval(down, 1000);

  //Moving the tetromino left
  const left = () => {
    undrawGamePiece();
    const leftEdge = current.some((index) => (currentPosition + index) % 10 === 0);
    if (!leftEdge) currentPosition -= 1;
    if (current.some((index) => squares[currentPosition + index].classList.contains('floor'))) {
      currentPosition += 1;
    }
    drawGamePiece();
  };

  const right = () => {
    undrawGamePiece();
    const rightEdge = current.some((index) => (currentPosition + index) % 10 === 9);
    if (!rightEdge) currentPosition += 1;
    if (current.some((index) => squares[currentPosition + index].classList.contains('floor'))) {
      currentPosition -= 1;
    }
    drawGamePiece();
  };

  const checkRotation = () => {
    // Get current position
    //check if the game piece is on the left side
    if ((currentPosition + 1) % 10 < 4) {
      //if on the left side then use code to stop wrap around to right side. Code from line 147
      if (current.some((index) => (currentPosition + index) % 10 === 9)) {
        currentPosition += 1;
        //Check game pieces incase pieces needs more then one movement
        checkRotation(currentPosition);
      }
    } else if (currentPosition % 10 > 5) {
      if (current.some((index) => (currentPosition + index) % 10 === 0)) {
        currentPosition -= 1;
        checkRotation(currentPosition);
      }
    }
  };

  //spin the tetromino
  const rotate = () => {
    undrawGamePiece();
    currentRotation++;
    if (currentRotation === current.length) {
      //if the current rotation gets to 4, make it go back to 0
      currentRotation = 0;
    }

    current = tetrominoes[random][currentRotation];
    checkRotation();
    drawGamePiece();
  };

  //Show next tetromino in the preview grid
  const nextSquares = Array.from(document.querySelectorAll('.preview-grid div'));
  // const previewWidth = 4;
  let previewIndex = 0;

  //First rotation of the tetromino to be placed in the preview
  const previewTetromino = [
    [0, 1, 5, 9], //l
    [1, 2, 5, 9], //j
    [1, 5, 6, 10], //s
    [2, 5, 6, 9], //z
    [5, 8, 9, 10], //t
    [5, 6, 9, 10], //o
    [1, 5, 9, 13], //i
  ];

  //Place the shapes in the preview grid
  const previewShape = () => {
    nextSquares.forEach((square) => {
      square.classList.remove('tetromino');
      square.style.backgroundImage = '';
    });
    previewTetromino[nextRandom].forEach((index) => {
      nextSquares[previewIndex + index].classList.add('tetromino');
      nextSquares[previewIndex + index].style.backgroundImage = colors[nextRandom];
    });
  };
});
