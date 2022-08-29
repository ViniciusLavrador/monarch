import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonVariants = "primary" | "secondary" | "tertiary" | "highlight" | "muted";
type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: ButtonVariants;
  disableShadows?: boolean;
};

const Button: FCWithChildren<ButtonProps> = ({
  variant,
  children,
  className,
  disableShadows,
  ...props
}) => {
  if (!variant) variant = "primary";
  if (variant === "muted") props.disabled = true;

  const primaryStyles = [
    {
      "bg-valhalla-600 focus:ring-valhalla-300 text-white": variant === "primary",
    },
    { "hover:bg-valhalla-700": variant === "primary" && !props.disabled },
  ];

  const secondaryStyles = [
    {
      "bg-valhalla-200 focus:ring-valhalla-300 text-white": variant === "secondary",
    },
    { "hover:bg-valhalla-700": variant === "secondary" && !props.disabled },
  ];

  const tertiaryStyles = [
    {
      "bg-transparent ring ring-valhalla-200 text-white focus:ring-valhalla-700":
        variant === "tertiary",
    },
    {
      "hover:bg-valhalla-700 hover:ring-valhalla-700": variant === "tertiary" && !props.disabled,
    },
  ];

  const highlightStyles = [
    { "bg-yellow-500 focus:ring-yellow-300 text-white": variant === "highlight" },
    { "hover:bg-yellow-600": variant === "highlight" && !props.disabled },
  ];

  const mutedStyles = [{ "bg-valhalla-50 text-white bg-opacity-30": variant === "muted" }];

  return (
    <button
      className={classNames([
        "rounded-lg p-3",
        "transition-all",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        { "shadow-lg": !disableShadows },
        { "active:shadow-none": !disableShadows },
        ...primaryStyles,
        ...secondaryStyles,
        ...tertiaryStyles,
        ...highlightStyles,
        ...mutedStyles,
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
