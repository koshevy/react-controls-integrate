import React, {useState, useEffect} from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import { StageProps } from './stage-props';

export interface CheckListStageData {
  neverGonnaGive: boolean;
  neverGonnaLet: boolean;
  neverGonnaRun: boolean;
  neverGonnaMake: boolean;
}

const defaultValue: CheckListStageData = {
  neverGonnaGive: false,
  neverGonnaLet: false,
  neverGonnaRun: false,
  neverGonnaMake: false
};

export function CheckListStage(props: StageProps<CheckListStageData>) {
  const value: CheckListStageData = props.value || defaultValue;

  const [neverGonnaGive, setNeverGonnaGive] = useState(value.neverGonnaGive);
  const [neverGonnaLet, setNeverGonnaLet] = useState(value.neverGonnaLet);
  const [neverGonnaRun, setNeverGonnaRun] = useState(value.neverGonnaRun);
  const [neverGonnaMake, setNeverGonnaMake] = useState(value.neverGonnaMake);

  useEffect(() => {
    if (props.onChange) {
      props.onChange({
        neverGonnaGive,
        neverGonnaLet,
        neverGonnaRun,
        neverGonnaMake
      });
    }
  }, [
    neverGonnaGive,
    neverGonnaLet,
    neverGonnaRun,
    neverGonnaMake
  ]);

  return (
    <>
      <FormGroup>
        <FormLabel component='legend'>Remind lines you knew:</FormLabel>
        <FormControlLabel
          control={
            <Checkbox checked={neverGonnaGive}
                      onChange={event => setNeverGonnaGive(event.target.checked)}
            />
          }
          label='Never gonna give you up'
        />
        <FormControlLabel
          control={
            <Checkbox checked={neverGonnaLet}
                      onChange={event => setNeverGonnaLet(event.target.checked)}
            />
          }
          label='Never gonna let you down'
        />
        <FormControlLabel
          control={
            <Checkbox checked={neverGonnaRun}
                      onChange={event => setNeverGonnaRun(event.target.checked)}
            />
          }
          label='Never gonna run around and desert you'
        />
        <FormControlLabel
          control={
            <Checkbox checked={neverGonnaMake}
                      onChange={event => setNeverGonnaMake(event.target.checked)}
            />
          }
          label='Never gonna make you cry'
        />
      </FormGroup>
    </>
  );
}
