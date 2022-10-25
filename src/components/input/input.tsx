import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes, useId, KeyboardEvent } from "react";
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
  preventDefaultOnEnter?: boolean;
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
  preventDefaultOnEnter,
  onKeyDown: extenalOnKeyDown,
  ...props
}) => {
  const onKeyDown = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (preventDefaultOnEnter && ev.key === "Enter") {
      ev.preventDefault();
    }

    if (extenalOnKeyDown) {
      return extenalOnKeyDown(ev);
    }

    return false;
  };
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
      onKeyDown={onKeyDown}
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
      onKeyDown={(ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          return false;
        }
      }}
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
