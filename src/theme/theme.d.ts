import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    board: {
      background: string;
    };

    lane: {
      background: string;
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
