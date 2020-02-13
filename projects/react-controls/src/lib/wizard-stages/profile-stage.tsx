import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';

import { StageProps } from './stage-props';

export interface ProfileStageData {
  name: string;
  surname: string;
  phoneNumber: string;
}

const defaultValue: ProfileStageData = {
  name: '',
  surname: '',
  phoneNumber: ''
};

export function ProfileStage(props: StageProps<ProfileStageData>) {
  const value: ProfileStageData = props.value || defaultValue;

  const [name, setName] = useState(value.name);
  const [surname, setSurname] = useState(value.surname);
  const [phoneNumber, setPhoneNumber] = useState(value.phoneNumber);

  useEffect(() => {
    if (props.onChange) {
      props.onChange({ name, surname, phoneNumber });
    }
  }, [name, surname, phoneNumber]);

  return (
    <>
      <TextField
        label='Name'
        style={{ margin: 8 }}
        fullWidth
        margin='normal'
        onChange={data => setName((data.nativeEvent.target as HTMLInputElement).value)}
        value={name}
      />
      <TextField
        label='Surname'
        style={{ margin: 8 }}
        fullWidth
        margin='normal'
        onChange={data => setSurname((data.nativeEvent.target as HTMLInputElement).value)}
        value={surname}
      />
      <TextField
        label='Phone number'
        style={{ margin: 8 }}
        fullWidth
        margin='normal'
        onChange={data => setPhoneNumber((data.nativeEvent.target as HTMLInputElement).value)}
        value={phoneNumber}
      />
    </>
  );
}
