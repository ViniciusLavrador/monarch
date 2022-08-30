import { NextPage } from "next";
import * as layouts from "../layouts";

export declare global {
  // Utilities
  export type FCWithChildren<P = {}> = React.FC<React.PropsWithChildren<P>>;
  export type WithSomeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

  // Icons
  export type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

  // Layout Types
  export type Layout = keyof typeof layouts;
  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    layout?: Layout;
  };
}
