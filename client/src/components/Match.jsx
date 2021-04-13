import React, { useState } from 'react';
import axios from 'axios';

export default function Match() {
  const [identicalArr, setidenticalArr] = useState([]);
  const split = () => {
    axios.get('http://localhost:5000/split').then((res) => {
      console.log(res.data);
    });
  };
  const match = () => {
    axios.get('http://localhost:5000/match').then((res) => {
      console.log(res.data);
      setidenticalArr(res.data);
    });
  };
  return (
    <div>
      <button onClick={split}>Split</button>

      <button onClick={match}>Match</button>
      {/* dummy image */}

      {identicalArr.map((fileName) => {
        return <img src={`http://localhost:3000/images/${fileName}`} alt='' />;
      })}
    </div>
  );
}
