import Image from "next/image";

import { Transition } from "@headlessui/react";

const LoadingIndicator: React.FC<{
  show: boolean;
}> = ({ show }) => {
  return (
    <Transition
      appear={true}
      show={show}
      enter="transition-transform duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition-transform duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      className="fixed flex flex-row items-center h-16 pl-4 bg-yellow-500 shadow-lg w-28 -right-4 bottom-10 z-50"
    >
      <div className="relative w-8 h-8">
        <Image src="/icons/loading/ball-triangle.svg" layout="fill" alt="Loading indicator" />
      </div>
    </Transition>
  );
};

export default LoadingIndicator;
