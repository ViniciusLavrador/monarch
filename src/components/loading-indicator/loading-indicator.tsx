import Image from "next/image";

import { Transition } from "@headlessui/react";

const LoadingIndicator: React.FC<{ show: boolean }> = ({ show }) => {
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
      className="w-28 h-16 pl-4 fixed -right-4 bottom-10 flex flex-row items-center bg-yellow-500 shadow-lg"
    >
      <div className="w-8 h-8 relative">
        <Image src="/icons/loading/ball-triangle.svg" layout="fill" alt="Loading indicator" />
      </div>
    </Transition>
  );
};

export default LoadingIndicator;
