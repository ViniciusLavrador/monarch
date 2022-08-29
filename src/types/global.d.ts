export declare global {
  export type FCWithChildren<P = {}> = React.FC<React.PropsWithChildren<P>>;
  export type WithSomeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
  export type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;
}
