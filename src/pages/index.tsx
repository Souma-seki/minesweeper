import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [count, setCount] = useState(0);
  //難易度
  const [difficuly, setDifficuly] = useState(1);

  const easy = () => {
    setDifficuly(1);
  };
  const normal = () => {
    setDifficuly(2);
  };
  const hard = () => {
    setDifficuly(3);
  };

  const cleateBoard = (x: number, y: number, fill: number) =>
    [...Array(y)].map(() => [...Array(x)].map(() => fill));
  let board2 = cleateBoard(9, 9, -1);
  let bombcount = 10;
  let inputboard = cleateBoard(9, 9, 0);
  let bombboard = cleateBoard(9, 9, 0);

  if (difficuly === 1) {
    board2 = cleateBoard(9, 9, -1);
    bombcount = 10;
  }
  if (difficuly === 2) {
    board2 = cleateBoard(16, 16, -1);
    bombcount = 40;
  }
  if (difficuly === 3) {
    board2 = cleateBoard(30, 16, -1);
    bombcount = 99;
  }

  const reset = (difficuly) => {
    if (difficuly === 1) {
      bombboard = cleateBoard(9, 9, 0);
      inputboard = cleateBoard(9, 9, 0);
      setCount(0);
      setBombMap(bombboard);
      setUserInputs(inputboard);
    }
    if (difficuly === 2) {
      bombboard = cleateBoard(16, 16, 0);
      inputboard = cleateBoard(16, 16, 0);
      setCount(0);
      setBombMap(bombboard);
      setUserInputs(inputboard);
    }
    if (difficuly === 3) {
      bombboard = cleateBoard(30, 16, 0);
      inputboard = cleateBoard(30, 16, 0);
      setCount(0);
      setBombMap(bombboard);
      setUserInputs(inputboard);
    }
  };

  const Newboard = () => {
    bombMap.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (bombMap[y][x] === 1 && userInputs[y][x] === 1) {
          board[y][x] = 11;
        } else if (userInputs[y][x] === 1) {
          blank(x, y);
        } else if (userInputs[y][x] === 2) {
          board[y][x] = 9;
        } else if (bombMap[y][x] === 1 && clear) {
          board[y][x] = 9;
        }
      });
    });
  };
  //-1開いてない
  //0何もない
  //1~8
  //9旗
  //10爆弾
  //11クリックした爆弾
  const [board, setBoard] = useState([
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ]);
  const nboard = structuredClone(board);
  const zeroBoard = [...Array(9)].map(() => [...Array(9)].map(() => 0));
  //userInputs=0,未クリック userInputs=1,クリック
  const [userInputs, setUserInputs] = useState(inputboard);
  //bombMap=0,爆弾なし bombMap=1,爆弾
  const [bombMap, setBombMap] = useState(bombboard);
  //初回クリック後のマップ
  const newBombMap = structuredClone(bombMap);
  //newUserInputs=0,開いてないマスnewUserInputs=1,開いたマスnewUserInputs=2,旗
  const newUserInputs = structuredClone(userInputs);
  const [gameOver, setGameOver] = useState(false);
  const newBoard = structuredClone(board);

  //初回クリックの時
  const First = () => !bombMap.flat().includes(1);
  const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
  const isFailure = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  );
  //クリア
  const clear = board.every((row, y) =>
    row.every((cell, x) => {
      if (bombMap[y][x] !== 1) {
        return userInputs[y][x] === 1;
      }
      return true;
    }),
  );

  const directions = [
    [0, 1], // 下
    [0, -1], // 上
    [1, 1], // 右下
    [1, -1], // 右上
    [1, 0], // 右
    [-1, 0], // 左
    [-1, 1], // 左下
    [-1, -1], // 左上
  ];
  //爆弾の数を数える
  const bombCounts = (x: number, y: number) => {
    let count = 0;
    for (const direction of directions) {
      const [dx, dy] = direction;
      const X = x + dx;
      const Y = y + dy;
      if (X >= 0 && X < 9 && Y >= 0 && Y < 9 && bombMap[Y][X] === 1) {
        count++;
      }
    }
    return count;
  };

  //爆弾召喚
  const openBombs = () => {
    for (let y = 0; y < bombMap.length; y++) {
      for (let x = 0; x < bombMap[y].length; x++) {
        if (bombMap[y][x] === 1) {
          newBoard[y][x] = 11;
        }
      }
      setBoard(newBoard);
    }
  };

  const blank = (x: number, y: number) => {
    let count = 0;
    for (const direction of directions) {
      const [dx, dy] = direction;
      const nx = x + dx;
      const ny = y + dy;
      if (newBoard[ny] !== undefined && newBoard[ny][nx] !== undefined) {
        if (newBombMap[ny][nx] === 1) {
          count++;
        }
      }
    }
    newBoard[y][x] = count;
    newUserInputs[y][x] = 1;
    if (count === 0) {
      for (const direction of directions) {
        const [dx, dy] = direction;
        const nx = x + dx;
        const ny = y + dy;
        if (
          newBoard[ny] !== undefined &&
          newBoard[ny][nx] !== undefined &&
          newUserInputs[ny][nx] === 0
        ) {
          blank(nx, ny);
        }
      }
    }
  };

  //左クリック(マスを開く)
  const clickL = (x: number, y: number) => {
    // const flag = userInputs[y][x];
    // if (gameOver) return;
    // if (flag === 2) return;
    if (isFailure || clear) return;

    if (First()) {
      const setUpBombMap = () => {
        newBombMap[y][x] = 1;
        while (newBombMap.flat().filter((cell) => cell === 1).length < 11) {
          const nx = Math.floor(Math.random() * 9);
          const ny = Math.floor(Math.random() * 9);
          newBombMap[ny][nx] = 1;
        }
        newBombMap[y][x] = 0;
      };
      setUpBombMap();
      setBombMap(newBombMap);
    }

    const userInput = userInputs[y][x];
    if (board[y][x] === -1 && userInput === 0) {
      newUserInputs[y][x] = 1;
      setUserInputs(newUserInputs);

      if (board[y][x] === -1 && bombMap[y][x] === 1) {
        alert('GameOver');
        setGameOver(true);
        openBombs();
        return;
      }

      ////
      const bombCount = bombCounts(x, y);
      if (bombCount === 0) {
        blank(x, y);
      } else {
        nboard[y][x] = bombCount;
      }
      for (let y = 0; y < bombMap.length; y++) {
        for (let x = 0; x < bombMap[y].length; x++) {
          if (newUserInputs[y][x] === 1) {
            board[y][x] = bombCount;
          }
        }
      }

      setUserInputs(newUserInputs);
    }
  };
  ////
  //周囲の爆弾の数表示
  const cellNumber = (x: number, y: number) => {
    const userInput = userInputs[y][x];
    if (userInput === 1) {
      const bombCount = bombCounts(x, y);
      if (bombMap[y][x] !== 1 && bombCount > 0) {
        return (
          <div
            className={styles.sampleStyle}
            style={{
              backgroundPosition: `${-30 * (bombCount - 1)}px`,
            }}
          />
        );
      }
    }
    return null;
  };

  //右クリック（旗を置く）
  const clickR = (x: number, y: number) => {
    const userInput = userInputs[y][x];
    if (userInput === 1) return;

    newUserInputs[y][x] = newUserInputs[y][x] === 2 ? 0 : 2;
    setUserInputs(newUserInputs);

    for (let y = 0; y < bombMap.length; y++) {
      for (let x = 0; x < bombMap[y].length; x++) {
        if (newUserInputs[y][x] === 2) newBoard[y][x] = 9;
        else if (newUserInputs[y][x] === 0) newBoard[y][x] = -1;
      }
    }
    setBoard(newBoard);
  };

  //爆弾設置
  const renderBomb = () => {
    return (
      <div
        className={styles.sampleStyle}
        style={{
          backgroundPosition: '-300px',
        }}
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.level}>
        <div
          className={styles.easy}
          onClick={easy}
          style={{
            color: difficuly !== 1 ? 'blue' : 'black',
          }}
        >
          初級
        </div>
        <div
          className={styles.normal}
          onClick={normal}
          style={{
            color: difficuly !== 2 ? 'blue' : 'black',
          }}
        >
          中級
        </div>
        <div
          className={styles.hard}
          onClick={hard}
          style={{
            color: difficuly !== 3 ? 'blue' : 'black',
          }}
        >
          上級
        </div>
      </div>
      <div className={styles.minesweeper}>
        <div className={styles.header}>
          <div className={styles.counter}>10</div>
          <button
            className={styles.sampleStyle}
            style={{ backgroundPosition: '-360px' }}
            onClick={() => {
              for (let y = 0; y < 9; y++) {
                for (let x = 0; x < 9; x++) {
                  newBombMap[y][x] = 0;
                  newUserInputs[y][x] = 0;
                  newBoard[y][x] = -1;
                }
              }
              setBombMap(newBombMap);
              setUserInputs(newUserInputs);
              setBoard(newBoard);
            }}
          />
          <div className={styles.timer}>000</div>
        </div>
        <div className={styles.grid}>
          {nboard.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`${styles.cell} ${cell !== -1 ? styles.opened : ''}`}
                onClick={() => clickL(x, y)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  clickR(x, y);
                }}
                style={{
                  backgroundColor: cell !== -1 ? '#919191' : '#c6c6c6',
                }}
              >
                {cell === 9 ? (
                  <div
                    className={styles.sampleStyle}
                    style={{
                      backgroundPosition: '-270px',
                    }}
                  />
                ) : (
                  <>
                    {cellNumber(x, y)}
                    {cell === 11 ? renderBomb() : null}
                  </>
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
