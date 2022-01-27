import React from "react";
import styled from "styled-components";
import AutoHeightTextarea from "./AutoHeightTextarea";

interface TextEditorProps {
  className?: string;
  value: string;
  placeholder?: string;
  inTabOrder?: boolean;
  allowInputLineBreak?: boolean;
  onChange: (value: string) => void;
}

const Textarea = styled(AutoHeightTextarea)`
  background: none;
  color: inherit;
  border: none;
  resize: none;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  cursor: pointer;
  padding: 1px 2px;

  &:focus {
    cursor: initial;
  }
`;

const TextEditor = React.forwardRef<HTMLTextAreaElement, TextEditorProps>(
  (
    { value: initialValue, className, placeholder, onChange, inTabOrder = false, allowInputLineBreak = false },
    forwardedRef
  ) => {
    const ref = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(forwardedRef, () => ref.current!);

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
          e.preventDefault();
        } else if ((e.key === "Enter" && !e.shiftKey) || e.key === "Tab") {
          commit();
          e.preventDefault();
        } else if (e.key === "Enter" && e.shiftKey && !allowInputLineBreak) {
          e.preventDefault();
        }
      },
      [allowInputLineBreak, cancel, commit]
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
        placeholder={placeholder}
        onChange={onChangeTextarea}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
      />
    );
  }
);
export default TextEditor;
