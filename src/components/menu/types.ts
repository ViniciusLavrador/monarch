import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

namespace Navigator {
  export type Branch = {
    title: string;
    banchNavigator: Navigator[];
    buttonProps?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  };
  export type Button = {
    title: string;
    buttonProps: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  };

  export type Navigator = Button | Branch;

  export function isNavButton(nav: Navigator): nav is Button {
    return typeof (nav as Branch).banchNavigator === "undefined";
  }
}

export default Navigator;
