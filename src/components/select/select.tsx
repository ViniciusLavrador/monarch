import classNames from "classnames";
import { DetailedHTMLProps, SelectHTMLAttributes, useId } from "react";

type SelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  label: React.ReactNode;
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
};

const Select: FCWithChildren<SelectProps> = ({
  children,
  label,
  labelProps,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const { className: labelInboundClassname, ...otherLabelProps } = labelProps || {};

  const labelClassname = classNames(
    "block mb-2 text-sm font-medium text-gray-300",
    labelInboundClassname,
  );

  return (
    <div className={className}>
      <label htmlFor={id || generatedId} className={labelClassname} {...otherLabelProps}>
        {label}
      </label>
      <select
        id={id || generatedId}
        className="cursor-pointer w-full rounded-lg text-white border bg-valhalla-50 border-valhalla-600 focus:ring-yellow-500 focus:border-yellow-500"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
