import React from "react";
import styled from "styled-components";

interface TextEditorProps {
  className?: string;
  value: string;
  inTabOrder?: boolean;
  onChange: (value: string) => void;
}

const Textarea = styled.textarea`
  background: none;
  border: none;
  resize: none;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    color: black;
    background: white;
    cursor: unset;
  }
`;

const TextEditor: React.FC<TextEditorProps> = ({ value: initialValue, className, onChange, inTabOrder = false }) => {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => setValue(initialValue), [initialValue]);

  const commit = React.useCallback(() => {
    ref.current?.blur();
    onChange(value);
  }, [onChange, value]);

  const cancel = React.useCallback(() => {
    ref.current?.blur();
    setValue(initialValue);
  }, [initialValue]);

  const onChangeTextarea = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value ?? "";
    setValue(v);
  }, []);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        cancel();
      } else if ((e.key === "Enter" && !e.shiftKey) || e.key === "Tab") {
        commit();
      }
    },
    [cancel, commit]
  );

  const onFocus = React.useCallback(() => {
    if (ref.current) {
      ref.current.select();
    }
  }, []);

  return (
    <Textarea
      ref={ref}
      className={className}
      value={value}
      tabIndex={!inTabOrder ? -1 : undefined}
      autoCorrect="off"
      spellCheck="false"
      autoComplete="off"
      onChange={onChangeTextarea}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    />
  );
};
export default TextEditor;
