import { useState, useEffect } from 'react';
import styles from './index.module.css';

const Home = () => {
  //難易度
  const [difficuly, setDifficuly] = useState(1);

  //board作成
  const cleateBoard = (x: number, y: number, fill: number) =>
    [...Array(y)].map(() => [...Array(x)].map(() => fill));
  let board = cleateBoard(9, 9, -1);
  let bombcount = 0;
  let inputboard = cleateBoard(9, 9, 0);
  let bombboard = cleateBoard(9, 9, 0);

  if (difficuly === 1) {
    board = cleateBoard(9, 9, -1);
    bombcount = 10;
  }
  if (difficuly === 2) {
    board = cleateBoard(16, 16, -1);
    bombcount = 40;
  }
  if (difficuly === 3) {
    board = cleateBoard(30, 16, -1);
    bombcount = 99;
  }

  const reset = (difficuly: number) => {
    setTimer(0);
    if (difficuly === 1) {
      bombboard = cleateBoard(9, 9, 0);
      inputboard = cleateBoard(9, 9, 0);
      setBombMap(bombboard);
      setUserInputs(inputboard);
    } else if (difficuly === 2) {
      bombboard = cleateBoard(16, 16, 0);
      inputboard = cleateBoard(16, 16, 0);
      setBombMap(bombboard);
      setUserInputs(inputboard);
    } else if (difficuly === 3) {
      bombboard = cleateBoard(30, 16, 0);
      inputboard = cleateBoard(30, 16, 0);
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

  const choiceEasy = () => {
    setDifficuly(1);
    reset(1);
  };

  const choiceNormal = () => {
    setDifficuly(2);
    reset(2);
  };
  const choiceHard = () => {
    setDifficuly(3);
    reset(3);
  };

  const [userInputs, setUserInputs] = useState(inputboard);
  const [bombMap, setBombMap] = useState(bombboard);
  const newBombMap = structuredClone(bombMap);
  const newUserInputs = structuredClone(userInputs);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);

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

  //タイマー
  useEffect(() => {
    if (isFailure || clear) {
      return;
    }
    if (isPlaying) {
      const time = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      return () => clearInterval(time);
    }
  }, [isFailure, clear, isPlaying]);

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

  //周囲の爆弾の数を数える
  const bombCounts = (x: number, y: number) => {
    let count = 0;
    for (const direction of directions) {
      const [dx, dy] = direction;
      const X = x + dx;
      const Y = y + dy;
      if (X >= 0 && X < board[0].length && Y >= 0 && Y < board.length && bombMap[Y][X] === 1) {
        count++;
      }
    }
    return count;
  };
  console.table(userInputs);

  //爆弾召喚
  const openBombs = () => {
    for (let y = 0; y < bombMap.length; y++) {
      for (let x = 0; x < bombMap[y].length; x++) {
        if (bombMap[y][x] === 1) {
          board[y][x] = 11;
          userInputs[y][x] = 1;
        }
      }
    }
  };

  //旗カウント
  const flagCount = () => {
    let count = 0;
    for (let y = 0; y < bombMap.length; y++) {
      for (let x = 0; x < bombMap[y].length; x++) {
        if (board[y][x] === 9) {
          count++;
        }
      }
    }
    return count;
  };

  //空白連鎖
  const blank = (x: number, y: number) => {
    let count = 0;
    for (const direction of directions) {
      const [dx, dy] = direction;
      const nx = x + dx;
      const ny = y + dy;
      if (board[ny] !== undefined && board[ny][nx] !== undefined) {
        if (newBombMap[ny][nx] === 1) {
          count++;
        }
      }
    }
    board[y][x] = count;
    newUserInputs[y][x] = 1;
    if (count === 0) {
      for (const direction of directions) {
        const [dx, dy] = direction;
        const nx = x + dx;
        const ny = y + dy;
        if (board[ny] !== undefined && board[ny][nx] !== undefined && newUserInputs[ny][nx] === 0) {
          blank(nx, ny);
        }
      }
    }
  };

  //左クリック(マスを開く)
  const clickL = (x: number, y: number) => {
    const flag = userInputs[y][x];
    if (gameOver) return;
    if (flag === 2) return;
    if (First()) {
      const setUpBombMap = () => {
        newBombMap[y][x] = 1;
        while (newBombMap.flat().filter((cell) => cell === 1).length < bombcount) {
          const nx = Math.floor(Math.random() * board[0].length);
          const ny = Math.floor(Math.random() * board.length);
          newBombMap[ny][nx] = 1;
        }
        newBombMap[y][x] = 0;
      };
      setUpBombMap();
      setBombMap(newBombMap);
    }
    const userInput = userInputs[y][x];
    if ((newUserInputs[y][x] !== 2 && userInput === 0) || userInput === 2) {
      newUserInputs[y][x] = 1;
      if (board[y][x] === -1 && bombMap[y][x] === 1) {
        // alert('GameOver');
        setGameOver(true);
        openBombs();
        return;
      }
      const bombCount = bombCounts(x, y);
      if (bombCount === 0) {
        blank(x, y);
      } else {
        board[y][x] = bombCount;
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
    if (isFailure || clear) return;
    if (board[y][x] === -1 && newUserInputs[y][x] === 0) {
      newUserInputs[y][x] = 2;
    } else if (newUserInputs[y][x] === 2) {
      newUserInputs[y][x] = 0;
    }
    setUserInputs(newUserInputs);
  };

  Newboard();

  //爆弾表示
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
      <div className={styles.header}>
        <div className={styles.level}>
          <div
            className={`${styles.easy} ${difficuly === 1 ? styles.active : ''}`}
            onClick={choiceEasy}
          >
            初級
          </div>
          <div
            className={`${styles.normal} ${difficuly === 2 ? styles.active : ''}`}
            onClick={choiceNormal}
          >
            中級
          </div>
          <div
            className={`${styles.hard} ${difficuly === 3 ? styles.active : ''}`}
            onClick={choiceHard}
          >
            上級
          </div>
        </div>
        <div
          className={`${difficuly === 1 ? styles.topflame1 : ''} ${difficuly === 2 ? styles.topflame2 : ''} ${difficuly === 3 ? styles.topflame3 : ''}`}
          onClick={() => reset(difficuly)}
        >
          <div className={styles.counter}>{bombcount - flagCount()}</div>
          <button
            className={styles.sampleStyle}
            style={{ backgroundPosition: '-360px' }}
            onClick={() => {
              for (let y = 0; y < 9; y++) {
                for (let x = 0; x < 9; x++) {
                  newBombMap[y][x] = 0;
                  newUserInputs[y][x] = 0;
                  board[y][x] = -1;
                }
              }
              setBombMap(newBombMap);
              setUserInputs(newUserInputs);
              clearInterval(timer);
            }}
          />
          <div className={styles.timer}>{timer}</div>
        </div>
      </div>
      <div
        className={`${difficuly === 1 ? styles.boardoutsideflame1 : ''} ${difficuly === 2 ? styles.boardoutsideflame2 : ''} ${difficuly === 3 ? styles.boardoutsideflame3 : ''}`}
      >
        <div
          className={`${difficuly === 1 ? styles.boardflame1 : ''} ${difficuly === 2 ? styles.boardflame2 : ''} ${difficuly === 3 ? styles.boardflame3 : ''}`}
        >
          <div
            className={`${difficuly === 1 ? styles.boardstyle1 : ''} ${difficuly === 2 ? styles.boardstyle2 : ''} ${difficuly === 3 ? styles.boardstyle3 : ''}`}
          >
            <div className={styles.grid}>
              {board.map((row, y) =>
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
                      backgroundColor: cell !== -1 && cell !== 9 ? '#919191' : '#c6c6c6',
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
      </div>
    </div>
  );
};
export default Home;
