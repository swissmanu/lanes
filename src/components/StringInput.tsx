import React from "react";

interface StringInputProps {
  value: string;
  onChange: (value: string) => void;
}

const StringInput: React.FC<StringInputProps> = ({ value, onChange }) => {
  const onChangeInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value ?? "";
      onChange(v);
    },
    [onChange]
  );

  return <input type="text" value={value} onChange={onChangeInput} />;
};
export default StringInput;
