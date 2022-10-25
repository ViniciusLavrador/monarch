import classNames from "classnames";
import Image from "next/image";
import React, { DetailedHTMLProps, KeyboardEvent, SelectHTMLAttributes, useId } from "react";

type SelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  label: React.ReactNode;
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  variant?: "primary" | "secondary";
  options?: SelectOptionProps[];
  required?: boolean;
  preventDefaultOnEnter?: boolean;
};

const inputStylesMap: Record<NonNullable<SelectProps["variant"]>, string> = {
  primary:
    "bg-valhalla-50 border-valhalla-600 placeholder-gray-400 text-white focus:ring-yellow-500 focus:border-yellow-500",
  secondary:
    "bg-gray-50 border-gray-600 placeholder-gray-400 text-valhalla-400 focus:ring-yellow-500 focus:border-yellow-500",
};

const labelStylesMap: Record<NonNullable<SelectProps["variant"]>, string> = {
  primary: "text-gray-300",
  secondary: "text-valhalla-300",
};

const Select: React.FC<SelectProps> = ({
  children,
  label,
  labelProps,
  className,
  id,
  variant = "primary",
  options = [],
  preventDefaultOnEnter,
  onKeyDown: externalOnKeyDown,
  ...props
}) => {
  const onKeyDown = (ev: KeyboardEvent<HTMLSelectElement>) => {
    if (preventDefaultOnEnter && ev.key === "Enter") {
      ev.preventDefault();
    }

    if (externalOnKeyDown) {
      return externalOnKeyDown(ev);
    }

    return false;
  };

  const generatedId = useId();
  const { className: labelInboundClassname, ...otherLabelProps } = labelProps || {};

  const labelClassname = classNames(
    "block mb-2 text-sm font-medium",
    labelStylesMap[variant],
    labelInboundClassname,
  );

  const inputClassname = classNames(
    "text-sm rounded-lg block w-full p-2.5 cursor-pointer border",
    inputStylesMap[variant],
  );

  return (
    <div className={className}>
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
      <select id={id || generatedId} className={inputClassname} onKeyDown={onKeyDown} {...props}>
        {options.map(({ key, label, ...optionProps }) => (
          <option key={key} {...optionProps}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
