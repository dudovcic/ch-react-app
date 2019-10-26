import React from 'react';

interface Props {
  value?: string;
  disabled?: boolean;
  onChange(text: string): void;
}

export default (props: Props) => {
  return (
    <div className="InputField">
      <input
        className="Input"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};
