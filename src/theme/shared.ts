import { DefaultTheme } from "styled-components";

const sharedTheme: Omit<DefaultTheme, "board"> = {
  lane: {
    background: "rgb(235, 236, 240)",
  },
  createLane: {
    background: "rgba(235, 236, 240, .5)",
    placeholderColor: "white",
    focusedPlaceholderColor: "black",
  },
  createTask: {
    background: "none",
    placeholderColor: "#6c6e70",
    focusedPlaceholderColor: "#6c6e70",
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
