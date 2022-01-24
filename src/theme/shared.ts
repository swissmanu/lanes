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
