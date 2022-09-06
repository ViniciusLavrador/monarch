import { LegacyRef } from "react";

export type BaseNavProps = {
  showNavbar: boolean;
  drawerRef: LegacyRef<HTMLDivElement>;
  onDrawerClose: () => void;
  onDrawerOpen: () => void;
  containerClassName?: string;
};

export type TransitionProps = {
  show?: boolean;
  className?: string;
  appear?: boolean;
};
