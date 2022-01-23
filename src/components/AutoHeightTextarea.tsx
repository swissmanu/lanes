import React from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
  margin: 0;
  padding: 0;
  overflow-y: hidden;
`;

const AutoHeightTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
>((props, forwardedRef) => {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  React.useImperativeHandle(forwardedRef, () => ref.current!, [ref]);

  const resize = React.useCallback(() => {
    if (ref.current) {
      ref.current.style.height = `0px`;
      ref.current.style.height = `${ref.current?.scrollHeight ?? 0}px`;
    }
  }, []);

  React.useEffect(() => resize(), [resize]);
  React.useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.addEventListener("input", resize);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("input", resize);
      }
    };
  }, [resize]);

  return <Textarea {...props} ref={ref} />;
});
export default AutoHeightTextarea;
