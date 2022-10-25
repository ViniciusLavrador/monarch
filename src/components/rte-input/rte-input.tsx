import { ComponentProps, useState } from "react";
import classNames from "classnames";

import RichTextEditor from "./base-rte";

import { useId } from "@mantine/hooks";
import useDelayRender from "../../hooks/use-delay-render/use-rendered";

type RTEInputProps = ComponentProps<typeof RichTextEditor> & {
  label?: React.ReactNode;
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  variant?: "primary" | "secondary";
  required?: boolean;
};

const inputStylesMap: Record<NonNullable<RTEInputProps["variant"]>, string> = {
  primary:
    "bg-valhalla-50 border-valhalla-600 placeholder-gray-400 text-white focus-within:ring-yellow-500 focus-within:border-yellow-500",
  secondary:
    "bg-gray-50 border-gray-600 placeholder-gray-400 text-valhalla-400 focus-within:ring-yellow-500 focus-within:border-yellow-500",
};

const toolbarStylesMap: Record<NonNullable<RTEInputProps["variant"]>, string> = {
  primary: "bg-valhalla-200 border-none",
  secondary: "bg-gray-200 border-none",
};

const toolbarControlStylesMap: Record<NonNullable<RTEInputProps["variant"]>, string> = {
  primary: "text-white hover:text-valhalla-300",
  secondary: "border-valhalla-50 text-valhalla-50 hover:text-valhalla-600",
};

const labelStylesMap: Record<NonNullable<RTEInputProps["variant"]>, string> = {
  primary: "text-gray-300",
  secondary: "text-valhalla-300",
};

const RTEInput: React.FC<RTEInputProps> = ({
  className,
  variant = "primary",
  labelProps,
  label,
  id,
  required = false,
  ...props
}) => {
  const { className: labelInboundClassname, ...otherLabelProps } = labelProps || {};

  const generatedId = useId();

  const labelClassname = classNames(
    "block mb-2 text-sm font-medium",
    labelStylesMap[variant],
    labelInboundClassname,
  );

  const rteComponent = useDelayRender(
    <RichTextEditor
      id={id || generatedId}
      className={classNames("border text-sm rounded-lg block w-full p-2", inputStylesMap[variant])}
      classNames={{
        toolbar: classNames("rounded-lg", toolbarStylesMap[variant]),
        toolbarControl: classNames(toolbarControlStylesMap[variant]),
      }}
      {...props}
    />,
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
          {required && (
            <span className="text-red-500 font-bold text-lg absolute -top-1 ml-1">*</span>
          )}
        </label>
      )}
      {rteComponent}
    </div>
  );
};

export default RTEInput;
