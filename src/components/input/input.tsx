import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes, useId } from "react";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: React.ReactNode;
  labelProps?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
};

const Input: React.FC<InputProps> = ({ label, labelProps, className, id, ...props }) => {
  const generatedId = useId();
  const { className: labelInboundClassname, ...otherLabelProps } = labelProps || {};

  const labelClassname = classNames(
    "block mb-2 text-sm font-medium text-gray-300",
    labelInboundClassname,
  );

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id || generatedId} className={labelClassname}>
          {label}
        </label>
      )}
      <input
        id={id || generatedId}
        className="border text-sm rounded-lg block w-full p-2.5 bg-valhalla-50 border-valhalla-600 placeholder-gray-400 text-white focus:ring-yellow-500 focus:border-yellow-500"
        {...props}
      />
    </div>
  );
};

export default Input;
