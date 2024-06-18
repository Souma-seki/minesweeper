// // // // ボード ます 爆弾数リセットボタン タイマー １－８未開旗爆弾   CSS（タイマーとかの数字は画像ORCSS）
// // // // 爆弾あるない０，１ OK
// // // // 爆弾数1~8、爆弾、旗、未開、更地、開いたときの爆弾
// // // // 爆弾ランダム設置 OK
// // // // １クリック目は絶対爆弾じゃない
// // // // １クリック後ランダム爆弾配布
// // // // 爆弾０の時連鎖
// // // // １クリック目は全部０OK
// // // //初級、中級、上級、カスタム
// // // // 左クリック→解放右クリック→旗
// // // // 爆弾を踏んだ時に爆弾の場所を教えてくれるように

// import { useState } from 'react';
// import styles from './index.module.css';

// const Home = () => {
//   const zeroBoard = [...Array(9)].map(() => [...Array(9)].map(() => 0));
//   const [userInputs, setUserInputs] = useState(zeroBoard);
//   const [bombMap, setBombMap] = useState(zeroBoard);
//   const newBombMap = structuredClone(bombMap);
//   const newUserInputs = structuredClone(userInputs);

//   //初回
//   const First = () => !bombMap.flat().includes(1);

//   //左クリック(マスを開く)
//   const clickL = (x: number, y: number) => {
//     const [bombMap, setbombMap] = useState([
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 3, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     ]);
//     const [userInputs, setuserInputs] = useState([
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 3, 0, 0, 0, 0],
//       [0, 0, 0, 1, 2, 3, 0, 0, 0],
//       [0, 0, 3, 2, 1, 0, 0, 0, 0],
//       [0, 0, 0, 3, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//       [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     ]);

//     if (First()) {
//       const setUpBombMap = () => {
//         newBombMap[y][x] = 1;
//         while (newBombMap.flat().filter((cell) => cell === 1).length < 11) {
//           const nx = Math.floor(Math.random() * 9);
//           const ny = Math.floor(Math.random() * 9);
//           newBombMap[ny][nx] = 1;
//         }
//         newBombMap[y][x] = 0;
//       };
//       setUpBombMap();
//       setBombMap(newBombMap);
//     }
//     const userInput = userInputs[y][x];
//     if (userInput === 0) {
//       newUserInputs[y][x] = 1;
//       setUserInputs(newUserInputs);
//     }
//   };

//   //右クリック（旗を置く）
//   const clickR = (x: number, y: number) => {
//     document.getElementsByTagName('html')[0].oncontextmenu = () => false;

//     const userInput = userInputs[y][x];
//     if (userInput === 1) return;

//     //0,2,3を0,1,2,にして2,3,4にして2,3,0にする
//     const newUserInput = (Math.max(0, userInput - 1) + 2) % 4;
//     newUserInputs[y][x] = newUserInput;
//     //書き換えたuserInputsをセット
//     setUserInputs(newUserInputs);
//   };

//   const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
//   const isFailure = userInputs.some((row, y) =>
//     row.some((input, x) => input === 1 && bombMap[y][x] === 1),
//   );

//   const renderBomb = (x: number, y: number) => {
//     return bombMap[y][x] === 1 ? (
//       <div
//         className={styles.sampleStyle}
//         style={{
//           backgroundPosition: '-360px',
//         }}
//       />
//     ) : (
//       <div className={styles.cell} />
//     );
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.minesweeper}>
//         <div className={styles.header}>
//           <div className={styles.counter}>10</div>
//           <div className={styles.sampleStyle} style={{ backgroundPosition: `-330px` }} />
//           <div className={styles.timer}>000</div>
//         </div>
//         <div className={styles.grid}>
//           {userInputs.map((row, y) =>
//             row.map((cell, x) => (
//               <div
//                 key={`${x}-${y}`}
//                 className={styles.cell}
//                 onClick={() => clickL(x, y)}
//                 style={{
//                   backgroundColor: cell === 1 ? '#919191' : '#c6c6c6',
//                   ...(cell === 2 && { backgroundPosition: `-330px` }),
//                 }}
//               >
//                 {bombMap[y][x] === 1 && cell === 1 ? renderBomb(x, y) : null}
//               </div>
//             )),
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const zeroBoard = [...Array(9)].map(() => [...Array(9)].map(() => 0));
  const [userInputs, setUserInputs] = useState(zeroBoard);
  const [bombMap, setBombMap] = useState(zeroBoard);
  const newBombMap = structuredClone(bombMap);
  const newUserInputs = structuredClone(userInputs);

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

  //左クリック(マスを開く)
  const clickL = (x: number, y: number) => {
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
    if (userInput === 0) {
      newUserInputs[y][x] = 1;
      setUserInputs(newUserInputs);
    }
  };

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

  // //右クリック（旗を置く）
  // const clickR = (x: number, y: number) => {
  //   document.getElementsByTagName('html')[0].oncontextmenu = () => false;

  //   const userInput = userInputs[y][x];
  //   if (userInput === 1) return;

  //   const newUserInput = (Math.max(0, userInput - 1) + 2) % 4;
  //   newUserInputs[y][x] = newUserInput;
  //   setUserInputs(newUserInputs);
  // };

  // const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
  // const isFailure = userInputs.some((row, y) =>
  //   row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  // );

  const renderBomb = (x: number, y: number) => {
    return bombMap[y][x] === 1 ? (
      <div
        className={styles.sampleStyle}
        style={{
          backgroundPosition: '-360px',
        }}
      />
    ) : (
      <div className={styles.cell} />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.minesweeper}>
        <div className={styles.header}>
          <div className={styles.counter}>10</div>
          <div className={styles.sampleStyle} style={{ backgroundPosition: `-330px` }} />
          <div className={styles.timer}>000</div>
        </div>
        <div className={styles.grid}>
          {userInputs.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={styles.cell}
                onClick={() => clickL(x, y)}
                // onContextMenu={() => clickR(x, y)}
                style={{
                  backgroundColor: cell === 1 ? '#919191' : '#c6c6c6',
                  ...(cell === 2 && { backgroundPosition: `-330px` }),
                }}
              >
                {cellNumber(x, y)}
                {bombMap[y][x] === 1 && cell === 1 ? renderBomb(x, y) : null}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
``;
