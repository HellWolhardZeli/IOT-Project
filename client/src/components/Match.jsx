import React, { useState } from 'react';
import { Grid, Card, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';
import styles from './FileUpload.module.css';
export default function Match() {
  const [identicalArr, setidenticalArr] = useState([]);
  const [done, setDone] = useState('');
  const split = () => {
    axios.get('http://localhost:5000/split').then((res) => {
      console.log(res.data);
      setDone(res.data);
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
      <button className={styles.button} onClick={split}>
        Split
      </button>
      <p>{done}</p>

      <button className={styles.button} onClick={match}>
        Match
      </button>
      {/* dummy image */}
      <Grid relaxed columns={4}>
        {identicalArr.map((fileName) => {
          return (
            /* <Card className={styles.card}>
            <Image src={`http://localhost:3000/images/${fileName}`} wrapped ui={false} />
            <Card.Content>
              <Card.Description>
                Confidence:
              </Card.Description>
            </Card.Content>
            
          </Card> */

            <Grid.Column>
              <Image
                src={`http://localhost:3000/images/${fileName.filepath}`}
              />
              <p>Confidence: {fileName.confidence}</p>
            </Grid.Column>
          );

          /* <img src={`http://localhost:3000/images/${fileName}`} alt='' />; */
        })}
      </Grid>
    </div>
  );
}
