import React, { InputHTMLAttributes } from 'react';
import './InputField.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  disabled?: boolean;
  onTextChange(text: string): void;
}

export default (props: Props) => {
  const { onTextChange, value, ...rest } = props;
  return (
    <div className="InputField">
      <input
        className="Input"
        value={value}
        onChange={e => props.onTextChange(e.target.value)}
        {...rest}
      />
    </div>
  );
};
