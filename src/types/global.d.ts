import { NextPage } from "next";
import {
  ButtonHTMLAttributes,
  ComponentType,
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
  OptionHTMLAttributes,
} from "react";
import * as layouts from "../layouts";

export declare global {
  // HTML Shorthands
  type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  type SelectOptionProps = DetailedHTMLProps<
    OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >;

  // Utilities
  export type FCWithChildren<P = {}> = React.FC<React.PropsWithChildren<P>>;
  export type WithSomeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
  export type PropsFromComponentType<C extends ComponentType<any>> = C extends ComponentType<
    infer P
  >
    ? P
    : never;

  // Icons
  export type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

  // Layout Types
  export type Layout = keyof typeof layouts;
  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    layout?: Layout;
  };
}
