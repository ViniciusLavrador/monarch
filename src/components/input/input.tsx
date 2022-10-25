import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes, PropsWithoutRef, useId, forwardRef } from "react";
import { IMask } from "react-imask";
import BaseMaskedInput from "./base-masked-input";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: React.ReactNode;
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  variant?: "primary" | "secondary";
  maskProps?: IMask.AnyMaskedOptions;
};

const inputStylesMap: Record<NonNullable<InputProps["variant"]>, string> = {
  primary:
    "bg-valhalla-50 border-valhalla-600 placeholder-gray-400 text-white focus:ring-yellow-500 focus:border-yellow-500",
  secondary:
    "bg-gray-50 border-gray-600 placeholder-gray-400 text-valhalla-400 focus:ring-yellow-500 focus:border-yellow-500",
};

const labelStylesMap: Record<NonNullable<InputProps["variant"]>, string> = {
  primary: "text-gray-300",
  secondary: "text-valhalla-300",
};

const Input: React.FC<InputProps> = ({
  label,
  labelProps,
  className,
  id,
  variant = "primary",
  maskProps,
  ...props
}) => {
  const { className: labelInboundClassname, ...otherLabelProps } = labelProps || {};

  const generatedId = useId();

  const labelClassname = classNames(
    "block mb-2 text-sm font-medium",
    labelStylesMap[variant],
    labelInboundClassname,
  );

  const inputComponent = !!maskProps ? (
    <BaseMaskedInput
      id={id || generatedId}
      className={classNames(
        "border text-sm rounded-lg block w-full p-2.5",
        inputStylesMap[variant],
      )}
      maskProps={maskProps}
      {...props}
    />
  ) : (
    <input
      id={id || generatedId}
      className={classNames(
        "border text-sm rounded-lg block w-full p-2.5",
        inputStylesMap[variant],
      )}
      {...props}
    />
  );

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id || generatedId}
          className={classNames("relative", labelClassname)}
          {...otherLabelProps}
        >
          {label}
          {props.required && (
            <span className="text-red-500 font-bold text-lg absolute -top-1 ml-1">*</span>
          )}
        </label>
      )}
      {inputComponent}
    </div>
  );
};

export default Input;
