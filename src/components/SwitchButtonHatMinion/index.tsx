import React, { useState } from 'react';
import axios from 'axios';
import './styles.scss';

import {MinionBehavior} from "../../models/MinionBehavior";

interface SwitchButtonMinionProps {
  minionBehavior: MinionBehavior;
  callbackFromParent: Function;
}

const SwitchButtonHatMinion: React.FC<SwitchButtonMinionProps> = (props: SwitchButtonMinionProps) => {
  let rota: string = process.env.REACT_APP_URL===undefined?'':process.env.REACT_APP_URL + '/hat';

  const [estado] = useState(true);

  async function handleClick() {
    props.minionBehavior.stress = !props.minionBehavior.stress;
    const newMinionBehavior: MinionBehavior = {...props.minionBehavior};
    props.callbackFromParent(newMinionBehavior);
    console.log('👉 Resultado:', props.minionBehavior.stress);
    try {
      const response = await axios.put(rota, 
        {
          "status": estado ? 1 : 0
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
      console.log('👉 Returned data:', response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }
  return (
    <div className="SwitchButtonHatMinion">
      <div className="wrapper">
        <input type="checkbox" name="checkboxHat" className="switch" onClick={handleClick} />
      </div>
    </div>
  )
}

export default SwitchButtonHatMinion;