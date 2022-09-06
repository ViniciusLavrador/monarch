import classNames from "classnames";
import React, { DetailedHTMLProps, InputHTMLAttributes, useId } from "react";

type CheckboxProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type"
> & {
  label: React.ReactNode;
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  labelProps,
  className: containerInboundClassname,
  id,
  ...props
}) => {
  const generatedId = useId();
  const { className: labelInboundClassname, ...otherLabelProps } = labelProps || {};

  const labelClassname = classNames(
    "ml-2 text-sm font-medium text-gray-300 select-none cursor-pointer",
    labelInboundClassname,
  );

  const containerClassName = classNames("flex items-start", containerInboundClassname);

  return (
    <div className={containerClassName}>
      <div className="flex items-center h-5">
        <input
          {...props}
          type="checkbox"
          className="cursor-pointer w-4 h-4 rounded border focus:ring-3 bg-valhalla-50 border-valhalla-600 focus:ring-valhalla-600 ring-offset-valhalla-800"
          id={id || generatedId}
        />
      </div>
      <label className={labelClassname} {...otherLabelProps} htmlFor={id || generatedId}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
