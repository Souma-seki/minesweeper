import { useState } from 'react';
import styles from './index.module.css';

const normalInput = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const normalBombMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const Home = () => {
  const [userInputs, setUserInputs] = useState(normalInput);
  const [bombMap, setBombMap] = useState(normalBombMap);
  const direction = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];
  const board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  const newUserInputs: number[][] = JSON.parse(JSON.stringify(userInputs));
  const newBombMap: number[][] = JSON.parse(JSON.stringify(bombMap));

  const setBombRandom = () => {
    const a = Math.floor(Math.random() * 9);
    const b = Math.floor(Math.random() * 9);
    if (newBombMap[a][b] === 0) {
      newBombMap[a][b] = 1;
    } else {
      setBombRandom();
    }

    setBombMap(newBombMap);
  };

  function newGame() {
    setUserInputs(normalInput);
    setBombMap(normalBombMap);
  }

  function endGaame() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[j][i] === 10) {
          if (newBombMap[j][i] === 0) {
            board[j][i] = 12;
          }
        } else {
          if (newBombMap[j][i]) {
            if (board[j][i] < 9) {
              board[j][i] = 11;
            }
          }
        }
      }
    }
  }

  const checkAround = (x: number, y: number) => {
    board[y][x] = 0;
    if (newBombMap[y][x]) {
      board[y][x] = 111;
    } else {
      for (let k = 0; k < 2; k++) {
        if (
          board[y][x] === 0 //&& newUserInputs[y][x] !== 10
        ) {
          for (const d of direction) {
            if (k) {
              if (
                board[y + d[1]] !== undefined &&
                board[x + d[0]] !== undefined &&
                board[y + d[1]][x + d[0]] === -1 &&
                newBombMap[y + d[1]][x + d[0]] === 0
              ) {
                if (
                  newUserInputs[y + d[1]][x + d[0]] === 10 ||
                  newUserInputs[y + d[1]][x + d[0]] === 9
                ) {
                  clickCell(x + d[0], y + d[1]);
                }
                checkAround(x + d[0], y + d[1]);
              }
            } else {
              if (
                newBombMap[y + d[1]] !== undefined &&
                newBombMap[x + d[0]] !== undefined &&
                newBombMap[y + d[1]][x + d[0]] === 1
              ) {
                board[y][x] += 1;
              }
            }
          }
        }
      }
    }
  };

  const makeBoard = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newUserInputs[j][i] === 1) {
          checkAround(i, j);
        } else if (newUserInputs[j][i] > 2) {
          board[j][i] = newUserInputs[j][i];
        }
      }
    }
  };
  //右クリック時の挙動
  const rClickCell = (x: number, y: number) => {
    document.getElementsByTagName('html')[0].oncontextmenu = function () {
      return false;
    };
    if (game > 0 && game < 82) {
      if (board[y][x] === -1) {
        newUserInputs[y][x] = 10;
      } else if (board[y][x] === 10) {
        newUserInputs[y][x] = 9;
      } else if (board[y][x] === 9) {
        newUserInputs[y][x] = 0;
      }
      setUserInputs(newUserInputs);
    }
  };
  //左クリック時の挙動
  const clickCell = (x: number, y: number) => {
    if (game > -1 && game < 82) {
      if (newUserInputs.some((row: number[]) => row.includes(1))) {
        if (board[y][x] < 9 && board[y][x] > 0) {
          //console.log('a');
          let count = 0;
          for (let k = 0; k < 2; k++) {
            for (const d of direction) {
              if (k) {
                if (
                  board[y + d[1]] !== undefined &&
                  board[x + d[0]] !== undefined &&
                  board[y][x] === count &&
                  board[y + d[1]][x + d[0]] === -1 &&
                  newUserInputs[y + d[1]][x + d[0]] !== 10
                ) {
                  console.log(count);
                  newUserInputs[y + d[1]][x + d[0]] = 1;
                  //checkAround(x + d[0], y + d[1]);
                }
              } else {
                if (
                  newBombMap[y + d[1]] !== undefined &&
                  newBombMap[x + d[0]] !== undefined &&
                  newUserInputs[y + d[1]][x + d[0]] === 10
                ) {
                  count += 1;
                  console.log(count);
                }
              }
            }
          }
        }
      } else {
        //bomb配置
        newBombMap[y][x] = 1;
        for (const d of direction) {
          if (newBombMap[y + d[1]] !== undefined && newBombMap[x + d[0]] !== undefined) {
            newBombMap[y + d[1]][x + d[0]] = 1;
          }
        }
        for (let b = 0; b < 10; b++) {
          setBombRandom();
        }
        newBombMap[y][x] = 0;
        for (const d of direction) {
          if (newBombMap[y + d[1]] !== undefined && newBombMap[x + d[0]] !== undefined) {
            newBombMap[y + d[1]][x + d[0]] = 0;
          }
        }
      }
      if (newUserInputs[y][x] !== 10) {
        newUserInputs[y][x] = 1;
      }
      setUserInputs(newUserInputs);
    }
  };
  makeBoard();
  if (board.some((row: number[]) => row.includes(111))) {
    endGaame();
  }
  let game = 0;
  //ゲームの状態判断
  if (newUserInputs.some((row: number[]) => row.includes(1))) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newBombMap[j][i]) {
          if (board[j][i] === -1 || board[j][i] === 10) {
            game += 1;
          }
          if (newUserInputs[j][i] === 1) {
            game = -999;
          }
        } else {
          if (board[j][i] !== -1 && board[j][i] !== 10 && board[j][i] !== 9) {
            game += 1;
          }
        }
      }
    }
    if (game === 81) {
      //旗を出す
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (newBombMap[j][i]) {
            board[j][i] = 10;
          }
        }
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.menuBoard} style={{}}>
        <div className={styles.nikkoriTile} style={{}}>
          <div
            className={styles.nikkori}
            style={{ backgroundPosition: game === 81 ? 60 : game < 0 ? 30 : 90 }}
            onClick={() => newGame()}
          />
        </div>
      </div>
      <div className={styles.containerBorder}>
        <div className={styles.board}>
          {board.map((row: number[], y) =>
            row.map((cell, x) => (
              <div
                className={styles.border}
                key={`${x}-${y}`}
                onClick={() => clickCell(x, y)}
                onContextMenu={() => rClickCell(x, y)}
                style={{ backgroundColor: cell > 100 ? '#f00' : '#bbb' }}
              >
                {cell !== 0 && (
                  <div
                    className={styles.cell}
                    style={{ backgroundPosition: -30 * (cell % 100) + 30 }}
                  >
                    {(cell % 100 === -1 ||
                      cell % 100 === 9 ||
                      cell % 100 === 10 ||
                      cell % 100 === 12) && (
                      <div className={styles.tile} style={{}}>
                        {(cell % 100 === 9 || cell % 100 === 10) && (
                          <div
                            className={styles.flag}
                            style={{
                              backgroundPosition: -30 * (cell % 100) + 30,
                            }}
                          />
                        )}
                        {cell === 12 && <div className={styles.batu} />}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
