import classNames from "classnames";
import Image from "next/image";

import { Transition } from "react-transition-group";

const LoadingIndicator: React.FC<{ show: boolean }> = ({ show }) => {
  const animationClasses = {
    entering: "animate-in slide-in-from-right duration-700",
    entered: "animate-in slide-in-from-right duration-700",
    exiting: "animate-out slide-out-to-right duration-700",
    exited: "animate-out slide-out-to-right duration-700",
    unmounted: "",
  };

  return (
    <Transition in={show} timeout={700} unmountOnExit>
      {(state) => (
        <div
          className={classNames(
            "w-28 h-16 pl-4 fixed -right-4 bottom-10",
            "flex flex-row items-center",
            "bg-yellow-500 shadow-lg",
            animationClasses[state],
          )}
        >
          <div className="w-8 h-8 relative">
            <Image src="/icons/loading/ball-triangle.svg" layout="fill" alt="Loading indicator" />
          </div>
        </div>
      )}
    </Transition>
  );
};

export default LoadingIndicator;
