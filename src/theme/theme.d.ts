import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    board: {
      background: string;
    };

    lane: {
      background: string;
    };
    createLane: {
      background: string;
      placeholderColor: string;
      focusedPlaceholderColor: string;
    };

    card: {
      background: string;
      color: string;
      dragging: {
        background: string;
        color: string;
      };
    };
  }
}
