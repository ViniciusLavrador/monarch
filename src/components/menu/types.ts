import React, { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

namespace Navigator {
  export type Branch = {
    key: string;
    component: React.ReactNode;
    navigator: Navigator[];
    buttonProps?: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    panelProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  };
  export type Button = {
    key: string;
    component: React.ReactNode;
    buttonProps: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  };

  export type Navigator = Button | Branch;

  export function isNavButton(nav: Navigator): nav is Button {
    return typeof (nav as Branch).navigator === "undefined";
  }
}

export default Navigator;
