import React from "react";
import StringInput from "./StringInput";

interface EditableProps<T> {
  value: T;
  children: (value: T) => React.ReactNode;
  onChange: (value: T) => void;
}

export default function Editable<T>({
  value,
  children,
  onChange,
}: EditableProps<T>) {
  const [edit, setEdit] = React.useState(false);
  const [uncommitedValue, setUncommitedValue] = React.useState<string>(
    `${value}`
  );

  React.useEffect(() => {
    setEdit(false);
    setUncommitedValue(`${value}`);
  }, [value]);

  const startEdit = React.useCallback(() => {
    setEdit(true);
  }, []);

  if (edit) {
    return (
      <StringInput value={uncommitedValue} onChange={setUncommitedValue} />
    );
  }
  return <div onDoubleClick={startEdit}>{children(value)}</div>;
}
