import { DefaultTheme } from "styled-components";

const sharedTheme: Omit<DefaultTheme, "board"> = {
  lane: {
    background: "#ebecf0",
  },
  card: {
    background: "white",
    color: "black",
    dragging: {
      background: "#E1E3E7",
      color: "#E1E3E7",
    },
  },
};
export default sharedTheme;
