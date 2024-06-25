import { useState } from 'react';
// import React, { useEffect } from 'react';
import styles from './index.module.css';

const Home = () => {
  // const [count, setCount] = useState<number>(0);
  // const SevenSegmentDisplay: React.FC<{ count: number }> = ({ count }) => {
  //   const formattedCount = String(count).padStart(3, '0');

  //   return (
  //     <div className={styles.sevensegment}>
  //       {formattedCount.split('').map((digit, index) => (
  //         <span key={index} className={styles.digit}>
  //           {digit}
  //         </span>
  //       ))}
  //     </div>
  //   );
  // };

  const [difficulty, setDifficulty] = useState<'Easy' | 'Normal' | 'Hard'>('Easy');

  const generateboard = (x: number, y: number, fill: number) =>
    [...Array(y)].map(() => [...Array(x)].map(() => fill));
  let board = generateboard(9, 9, -1);
  let bombcount = 10;
  let inputboard = generateboard(9, 9, 0);
  let bombboard = generateboard(9, 9, 0);
  if (difficulty === 'Easy') {
    board = generateboard(9, 9, -1);
    bombcount = 10;
  } else if (difficulty === 'Normal') {
    board = generateboard(16, 16, -1);
    bombcount = 40;
  } else {
    board = generateboard(30, 16, -1);
    bombcount = 99;
  }
  const [bombMap, setBombMap] = useState(bombboard);
  const [userIn, setUserIn] = useState(inputboard); ////
  const difficultResetgame = (difficulty: 'Easy' | 'Normal' | 'Hard') => {
    console.log(difficulty);
    if (difficulty === 'Easy') {
      bombboard = generateboard(9, 9, 0);
      inputboard = generateboard(9, 9, 0);
      setCount(0);
      setBombMap(bombboard);
      setUserIn(inputboard);
    } else if (difficulty === 'Normal') {
      bombboard = generateboard(16, 16, 0);
      inputboard = generateboard(16, 16, 0);
      setCount(0);
      setBombMap(bombboard);
      setUserIn(inputboard);
    } else {
      bombboard = generateboard(30, 16, 0);
      inputboard = generateboard(30, 16, 0);
      setCount(0);
      setBombMap(bombboard);
      setUserIn(inputboard);
    }
  };
  ////
  const updateboard = () => {
    bombMap.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (bombMap[i][j] === 1 && userIn[i][j] === 1) {
          board[i][j] = 11;
        } else if (userIn[i][j] === 1) {
          // arounder(i, j);
        } else if (userIn[i][j] === 2) {
          board[i][j] = 9;
        } else if (userIn[i][j] === 3) {
          board[i][j] = 10;
        } else if (isClear && bombMap[i][j] === 1) {
          board[i][j] = 10;
        }
      });
    });
  };
  ////
  const isPlaying = userIn.some((row) => row.some((input) => input !== 0));
  const isFailure = userIn.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  );
  const isClear = board.every((row, y) =>
    row.every((cell, x) => {
      if (bombMap[y][x] !== 1) {
        return userIn[y][x] === 1;
      }
      return true;
    }),
  );
  ////

  useEffect(() => {
    if (isClear || isFailure) {
      return;
    }
    if (isPlaying) {
      const interval = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isClear, isFailure, isPlaying]);

  const clickHandler = (x: number, y: number) => {
    if (isFailure || isClear) return;

    const Num = (col: number) => bombMap.flat().filter((c) => c === col).length;
    let bombcountnow = 0;

    if (Num(1) === 0) {
      const newBombMap = structuredClone(bombMap);
      while (bombcountnow < bombcount) {
        const randomY = Math.floor(Math.random() * newBombMap.length);
        const randomX = Math.floor(Math.random() * newBombMap[0].length);
        if (newBombMap[randomY][randomX] !== 1 && !(y === randomY && x === randomX)) {
          newBombMap[randomY][randomX] = 1;
          bombcountnow++;
        }
      }
      setBombMap(newBombMap);
    }

    const newUserIn = structuredClone(userIn);

    if (board[y][x] === -1 && userIn[y][x] === 0) {
      newUserIn[y][x] = 1;
      setUserIn(newUserIn);
    }
    ////

    if (board[y][x] === -1 && bombMap[y][x] === 1) {
      isFailure;
    }
  };

  // const arounder = (i: number, j: number) => {
  //   const directions = [
  //     [-1, 0],
  //     [-1, -1],
  //     [0, -1],
  //     [1, -1],
  //     [1, 0],
  //     [1, 1],
  //     [0, 1],
  //     [-1, 1],
  //   ];

  //   let aroundcount = 0;

  //   for (const direct of directions) {
  //     const [I, J] = direct;
  //     if (j + J >= 0 && j + J < board[0].length && i + I >= 0 && i + I < board.length) {
  //       if (bombMap[i + I] !== undefined && bombMap[i + I][j + J] !== undefined) {
  //         if (bombMap[i + I][j + J] === 1) {
  //           aroundcount++;
  //         }
  //         board[i][j] = aroundcount;
  //       }
  //     }
  //   }

  //   board[i][j] = aroundcount;

  //   if (aroundcount === 0) {
  //     userIn[i][j] = 1;
  //     for (const direct of directions) {
  //       const [I, J] = direct;
  //       if (j + J >= 0 && j + J < board[0].length && i + I >= 0 && i + I < board.length) {
  //         if (bombMap[i + I][j + J] === 1 && (userIn[i][j] === 2 || userIn[i][j] === 3)) {
  //           userIn[i][j] = 0;
  //         }
  //         if (
  //           userIn[i + I][j + J] === 0 ||
  //           userIn[i + I][j + J] === 2 ||
  //           userIn[i + I][j + J] === 3
  //         ) {
  //           if (userIn[i + I][j + J] === 2 || userIn[i + I][j + J] === 3) {
  //             userIn[i + I][j + J] = 0;
  //           }//
  //           if (board[i + I][j + J] === -1) {
  //             board[i + I][j + J] = aroundcount + 1;
  //             userIn[i + I][j + J] = 1;

  //             arounder(i + I, j + J);
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  const RightClick = (event: React.MouseEvent, x: number, y: number) => {
    event.preventDefault();

    if (isFailure || isClear) return; //

    const newUserIn = structuredClone(userIn);

    if (board[y][x] === -1 && newUserIn[y][x] === 0) {
      newUserIn[y][x] = 3;
      setUserIn(newUserIn);
    } else if (newUserIn[y][x] === 3) {
      newUserIn[y][x] = 2;
      setUserIn(newUserIn);
    } else if (newUserIn[y][x] === 2) {
      newUserIn[y][x] = 0;
      setUserIn(newUserIn);
    }
  };

  const NumBoard = (col: number) => board.flat().filter((c) => c === col).length;

  updateboard();

  const handleEasyClick = () => {
    setDifficulty('Easy');
    difficultResetgame('Easy');
  };
  const handleNormalClick = () => {
    setDifficulty('Normal');
    difficultResetgame('Normal');
  };

  const handleHardClick = () => {
    setDifficulty('Hard');
    difficultResetgame('Hard');
  };

  console.log('board');
  console.table(board);
  console.log('bombMap');
  console.table(bombMap);
  console.log('userIn');
  console.table(userIn);
  console.log('bombboard');
  return (
    <div className={styles.container}>
      <div className={styles.difficulty}>
        <a
          className={`${styles.levelLink} ${difficulty === 'Easy' ? styles.active : ''}`}
          onClick={handleEasyClick}
        >
          初級
        </a>
        <a
          className={`${styles.levelLink} ${difficulty === 'Normal' ? styles.active : ''}`}
          onClick={handleNormalClick}
        >
          中級
        </a>
        <a
          className={`${styles.levelLink} ${difficulty === 'Hard' ? styles.active : ''}`}
          onClick={handleHardClick}
        >
          上級
        </a>
      </div>
      <div className={styles.minesweepercontainer}>
        <div
          className={styles.gameoverboardflame}
          style={{ display: isClear || isFailure ? '' : 'none' }}
        >
          <div className={styles.gameoverboard}>
            <span className={styles.text} style={{ display: isClear ? '' : 'none' }}>
              回避成功
            </span>
            <span className={styles.text} style={{ display: isClear ? 'none' : '' }}>
              回避失敗
            </span>
          </div>
        </div>
        <div
          className={`${difficulty === 'Easy' ? styles.boardoutsideflame1 : ''} ${difficulty === 'Normal' ? styles.boardoutsideflame2 : ''} ${difficulty === 'Hard' ? styles.boardoutsideflame3 : ''}`}
        >
          <div className={styles.boardcontainer}>
            <div
              className={`${difficulty === 'Easy' ? styles.topflame1 : ''} ${difficulty === 'Normal' ? styles.topflame2 : ''} ${difficulty === 'Hard' ? styles.topflame3 : ''}`}
              onClick={() => difficultResetgame(difficulty)}
            >
              <div className={styles.flagflame}>
                <div className={styles.flagboard}>
                  <span className={styles.digit}>{bombcount - NumBoard(10)}</span>
                </div>
              </div>
              <div
                className={`${difficulty === 'Easy' ? styles.resetoutflame1 : ''} ${difficulty === 'Normal' ? styles.resetoutflame2 : ''} ${difficulty === 'Hard' ? styles.resetoutflame3 : ''}`}
              >
                <div className={styles.resetflame}>
                  <div
                    className={styles.reset}
                    style={{
                      backgroundPosition: isClear
                        ? `-360px 0px`
                        : isFailure
                          ? `-390px 0px`
                          : isPlaying
                            ? `-330px 0px`
                            : `-330px 0px`,
                    }}
                  />
                </div>
              </div>
              <div className={styles.timerflame}>
                <div className={styles.timerboard}>
                  <SevenSegmentDisplay count={count} />
                </div>
              </div>
            </div>
            <div
              className={`${difficulty === 'Easy' ? styles.boardflame1 : ''} ${difficulty === 'Normal' ? styles.boardflame2 : ''} ${difficulty === 'Hard' ? styles.boardflame3 : ''}`}
            >
              <div
                className={`${difficulty === 'Easy' ? styles.boardstyle1 : ''} ${difficulty === 'Normal' ? styles.boardstyle2 : ''} ${difficulty === 'Hard' ? styles.boardstyle3 : ''}`}
              >
                {board.map((row, y) =>
                  row.map((cell, x) => {
                    if (isFailure && bombMap[y][x] === 1) {
                      return (
                        <div
                          className={`${styles.cellstyle} ${styles.samplestyle} `}
                          key={`${x}-${y}`}
                          onClick={() => clickHandler(x, y)}
                          onContextMenu={(event) => RightClick(event, x, y)}
                          style={{
                            backgroundPosition: `-300px 0px`,
                            backgroundColor: bombMap[y][x] === 1 && userIn[y][x] === 1 ? `red` : '',
                          }}
                        />
                      );
                    } else {
                      return (
                        <div
                          className={`${styles.cellstyle} ${styles.samplestyle} ${cell === -1 ? styles.stonestyle : cell === 9 || cell === 10 ? `${styles.stonestyle} ${styles.flag} ${styles.question}` : ''}`}
                          key={`${x}-${y}`}
                          onClick={() => clickHandler(x, y)}
                          onContextMenu={(event) => RightClick(event, x, y)}
                          style={{
                            backgroundPosition:
                              cell === 9 || cell === 10
                                ? `${-22.9 * (cell - 1)}px 0px`
                                : `${-30 * (cell - 1)}px 0px`,
                          }}
                        />
                      );
                    }
                  }),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const initialRows = 9;
  const initialCols = 9;
  const bombCount = 10;
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  const [bomb, setbombCount] = useState(bombCount);
  const [difficulty, setDifficulty] = useState('easy');

  // ボードを生成する関数
  const createBoard = (rows: number, cols: number) => {
    return [...Array(rows)].map(() => Array(cols).fill(0));
  };

  // 初期状態のボードと爆弾マップ
  const [userInputs, setUserInputs] = useState(createBoard(initialRows, initialCols));
  const [bombMap, setBombMap] = useState(createBoard(initialRows, initialCols));

  // const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
  const isFailure = (userInputs: number[][], bombMap: number[][]) =>
    userInputs.some((row, y) => row.some((input, x) => input === 1 && bombMap[y][x] === 1));

  const board = [...Array(rows)].map(() => Array(cols).fill(-1));

  const directions = [
    [0, 1], //下
    [0, -1], //上
    [1, 0], //右
    [-1, 0], //左
    [1, 1], //右下
    [1, -1], //右上
    [-1, 1], //左下
    [-1, -1], //左上
  ];

  //ランダム取得
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const newBombMap = structuredClone(bombMap);
  const newUserInputs = structuredClone(userInputs);

  //右クリック
  const clickR = (x: number, y: number) => {
    //デフォルトの右クリックのメニューが出ないようにする
    document.getElementsByTagName('html')[0].oncontextmenu = () => false;
    //右クリックでuserInputの0と2を入れ替える
    if (newUserInputs[y][x] === 1) return;
    newUserInputs[y][x] = newUserInputs[y][x] === 2 ? 0 : 2;
    setUserInputs(newUserInputs);
  };

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    if (userInputs[y][x] === 0) {
      newUserInputs[y][x] = 1;

      // 初回クリック時の爆弾設置
      const inputfilter = (col: number) => newBombMap.flat().filter((v) => v === col).length;
      if (inputfilter(1) === 0) {
        // まだ爆弾が設置されていない場合
        while (inputfilter(1) < bomb) {
          // 爆弾が10個になるまで設置
          const nx = getRandomInt(0, cols);
          const ny = getRandomInt(0, rows);
          if (nx !== x || ny !== y) {
            // クリックしたマスには設置しない
            if (newBombMap[ny] !== undefined && newBombMap[ny][nx] !== undefined) {
              newBombMap[ny][nx] = 1;
            }
          }
        }
      }
      console.log(inputfilter(1));
    }

    setBombMap(newBombMap);
    setUserInputs(newUserInputs);
  };

  //空白連鎖
  function blank(x: number, y: number) {
    let count = 0;
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (newBombMap[ny] !== undefined && newBombMap[ny][nx] !== undefined) {
        if (newBombMap[ny][nx] === 1) {
          count++;
        }
      }
    }
    board[y][x] = count;
    if (count === 0) {
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          newUserInputs[ny] !== undefined &&
          newUserInputs[ny][nx] !== undefined &&
          newUserInputs[ny][nx] === 0
        ) {
          newUserInputs[ny][nx] = 1;
          blank(nx, ny);
        }
      }
    }
  }

  //ボードサイズを変更する関数
  const changeBoardSize = (
    newRows: number,
    newCols: number,
    difficulty: string,
    newBomb: number,
  ) => {
    setRows(newRows);
    setCols(newCols);
    setbombCount(newBomb);
    setDifficulty(difficulty);
    setUserInputs(createBoard(newRows, newCols));
    setBombMap(createBoard(newRows, newCols));
  };

  //旗置く
  for (let d = 0; d < cols; d++) {
    for (let c = 0; c < rows; c++) {
      if (userInputs[c][d] === 2) {
        board[c][d] = 10;
      }
      if (userInputs[c][d] === 0) {
        board[c][d] = -1;
      }
    }
  }

  //爆弾踏んだ時に爆弾表示
  if (isFailure(userInputs, bombMap)) {
    for (let d = 0; d < cols; d++) {
      for (let c = 0; c < rows; c++) {
        if (bombMap[c][d] === 1) {
          board[c][d] = 11;
        }
      }
    }
  }

  // 爆弾チェックと周囲の爆弾数を更新
  for (let d = 0; d < cols; d++) {
    for (let c = 0; c < rows; c++) {
      if (userInputs[c][d] === 1) {
        if (bombMap[c][d] === 1) {
          board[c][d] = 11; // 爆弾があるマス
        } else {
          blank(d, c); // 周囲の爆弾数を数えて、必要に応じて連鎖的に開ける
        }
      }
    }
  }

  console.table(board);
  console.table(userInputs);
  console.table(bombMap);
  return (
    <div className={styles.container}>
      <div className={styles.allall}>
        {/* 上の部分 */}
        <div className={styles.head}>
          <div className={styles.easy} onClick={() => changeBoardSize(9, 9, 'easy', 10)}>
            初級
          </div>
          <div className={styles.middle} onClick={() => changeBoardSize(16, 16, 'middle', 40)}>
            中級
          </div>
          <div className={styles.hard} onClick={() => changeBoardSize(16, 30, 'hard', 99)}>
            上級
          </div>
          <div className={styles.custom}>カスタム</div>
        </div>

        {/* 灰色全体 */}
        <div className={styles.allbackground}>
          <div className={styles.boardstyle}>
            {/* タイマー・ニコちゃん・旗 */}
            <div className={styles.gamehead}>
              <div className={styles.flag}>999</div>
              <button
                className={styles.reset}
                style={{ backgroundPosition: `30px 0` }}
                onClick={() => {
                  for (let d = 0; d < cols; d++) {
                    for (let c = 0; c < rows; c++) {
                      newBombMap[c][d] = 0;
                      newUserInputs[c][d] = 0;
                      board[c][d] = -1;
                    }
                  }
                  setBombMap(createBoard(rows, cols));
                  setUserInputs(createBoard(rows, cols));
                }}
              />
              <div className={styles.timer}>999</div>
            </div>
            {/* マップ */}
            <div className={`${styles.backgroundmap} ${styles[difficulty]}`}>
              {board.map((row, y) =>
                row.map((bomb, x) => (
                  <div
                    className={styles.cellStyle}
                    key={`${x}-${y}`}
                    onClick={() => clickHandler(x, y)}
                    onContextMenu={() => clickR(x, y)}
                    style={{
                      backgroundColor: bomb === -1 ? '#e4e4e4' : bomb === 10 ? '#e4e4e4' : '#bbb',
                    }}
                  >
                    {bomb !== -1 && bomb !== 0 && (
                      <div
                        className={styles.aaaa}
                        style={{ backgroundPosition: `${-30 * (board[y][x] - 1)}px 0` }}
                      />
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

// アロー関数の()の中を指定しないと一個前の更新の情報になる
//clickHandlerの中はクリックされたことが保証されているが、それ以外はされていないのでfor文で確かめる必要あり
//userImputはclickHandlerの外で変更したくないので別の条件式を考える

// 0 -> 未クリック
// 1 -> 左クリック
// 2 -> 旗

// 0 -> ボム無し
// 1 -> ボム有り

// -1 -> 石
// 0 -> 画像無しセル
// 1~8 -> 数字セル
// 9 -> 石とはてな
// 10 -> 石と旗
// 11 -> ボムセル
