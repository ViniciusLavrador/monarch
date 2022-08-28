export declare global {
  export type FCWithChildren<P = {}> = React.FC<PropsWithChildren<P>>;
  export type WithSomeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
}
