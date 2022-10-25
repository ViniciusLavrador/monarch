import { PropsWithoutRef, useEffect } from "react";
import { useIMask, IMask } from "react-imask";

export type BaseMaskedInputProps = {
  maskProps: IMask.AnyMaskedOptions;
} & PropsWithoutRef<InputProps>;

const BaseMaskedInput: React.FC<BaseMaskedInputProps> = ({ maskProps, value, ...props }) => {
  const { ref } = useIMask(maskProps);

  return <input ref={ref} {...props} type="text" />;
};

export default BaseMaskedInput;
