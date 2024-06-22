import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
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
  const [userInputs, setUserInputs] = useState(zeroBoard);
  //bombMap=0,爆弾なし bombMap=1,爆弾
  const [bombMap, setBombMap] = useState(zeroBoard);
  //初回クリック後のマップ
  const newBombMap = structuredClone(bombMap);
  //newUserInputs=0,開いてないマスnewUserInputs=1,開いたマスnewUserInputs=2,旗
  const newUserInputs = structuredClone(userInputs);
  const [gameOver, setGameOver] = useState(false);

  //初回クリックの時
  const First = () => !bombMap.flat().includes(1);

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
          nboard[y][x] = 11;
          for (let y = 0; y < bombMap.length; y++) {
            for (let x = 0; x < bombMap[y].length; x++) {
              if (bombMap[y][x] === 1) {
                board[y][x] = 11;
              }
            }
          }
        }
      }
    }
  };

  //空白連鎖
  const blank = (x: number, y: number) => {
    const bombCount = bombCounts(x, y);
    board[y][x] = bombCount;

    for (const direction of directions) {
      const [fx, fy] = direction;
      const X2 = x + fx;
      const Y2 = y + fy;
      if (
        X2 >= 0 &&
        X2 < 9 &&
        Y2 >= 0 &&
        Y2 < 9 &&
        newUserInputs[Y2][X2] === 0 &&
        bombCount === 0
      ) {
        newUserInputs[Y2][X2] = 1;
        blank(X2, Y2);
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
    if ((newUserInputs[y][x] !== 2 && userInput === 0) || userInput === 2) {
      newUserInputs[y][x] = 1;

      if (bombMap[y][x] === 1) {
        alert('GameOver');
        setGameOver(true);
        openBombs();
        return;
      }

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
    nboard[y][x] = newUserInputs[y][x] === 2 ? 9 : -1;
    for (let y = 0; y < bombMap.length; y++) {
      for (let x = 0; x < bombMap[y].length; x++) {
        if (newUserInputs[y][x] === 2) board[y][x] = 9;
        else if (newUserInputs[y][x] === 0) board[y][x] = -1;
      }
    }
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
      <div className={styles.minesweeper}>
        <div className={styles.header}>
          <div className={styles.counter}>10</div>
          <button
            className={styles.sampleStyle}
            style={{ backgroundPosition: '-360px' }}
            onClick={() => {
              setUserInputs(zeroBoard);
              setBombMap(zeroBoard);
              setBoard([
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
