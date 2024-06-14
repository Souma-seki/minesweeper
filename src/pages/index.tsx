import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [sampleVal, setsampleVal] = useState(0);
  console.log(sampleVal);
  return (
    <div className={styles.container}>
      <div className={styles.sampleStyle} style={{ backgroundPosition: `${sampleVal * -40}px` }} />
      <button onClick={() => setsampleVal((val) => (val + 1) % 14)}>Sample</button>
    </div>
  );
};

export default Home;
