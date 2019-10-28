import React, { InputHTMLAttributes } from 'react';
import './InputField.scss';
import { TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';

type Props = TextFieldProps & {
  onTextChange(text: string): void;
};

export default (props: Props) => {
  const { onTextChange, variant, ...rest } = props;
  return (
    <TextField
      onChange={e => props.onTextChange(e.target.value)}
      variant={variant || ('filled' as any)}
      {...rest}
    />
  );
};
