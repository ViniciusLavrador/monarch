import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type BaseCardProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "title"
> & {
  title?: React.ReactNode;
  footer?: React.ReactNode;
};

const BaseCard: FCWithChildren<BaseCardProps> = ({
  children,
  className,
  title,
  footer,
  ...props
}) => {
  return (
    <div className={classNames("bg-valhalla-400 rounded-lg px-6 py-6", className)} {...props}>
      <div className="h-full flex flex-col gap-4">
        {title && <span className="font-normal tracking-widest text-xs text-gray-50">{title}</span>}
        <div className="grow">{children}</div>
        {footer}
      </div>
    </div>
  );
};

export default BaseCard;
