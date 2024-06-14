import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [sampleVal, setsampleVal] = useState(0);
  console.log(sampleVal);
  return (
    <div className={styles.container}>
      <div className={styles.sampleStyle} style={{ backgroundPosition: `${sampleVal * -30}px` }} />
      <button onClick={() => setsampleVal((val) => (val + 1) % 14)}>Sample</button>

      <div className={styles.minesweeper}>
        <div className={styles.header}>
          <div className={styles.counter}>10</div>
          <div className={styles.face}>😊</div>
          <div className={styles.timer}>000</div>
          <div className={styles.grid}>
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
            <div className={styles.cell} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// ボード ます 爆弾数 リセットボタン タイマー １－８未開旗爆弾   CSS（タイマーとかの数字は画像ORCSS）
// 爆弾あるない０，１
// 爆弾数1~8、爆弾、旗、未開、更地、開いたときの爆弾
// 爆弾ランダム設置
// １クリック目は絶対爆弾じゃない
// １クリック後ランダム爆弾配布
// 爆弾０の時連鎖
// １クリック目は全部０
//初級、中級、上級、カスタム
// 左クリック→解放右クリック→旗
// 爆弾を踏んだ時に爆弾の場所を教えてくれるように
//
