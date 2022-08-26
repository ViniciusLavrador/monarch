import { Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";

const MenuButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <button
    type="button"
    className="flex w-10 h-10 text-yellow-500 transition-colors rounded-lg cursor-pointer bg-valhalla-50 place-content-center hover:bg-yellow-500 hover:text-valhalla-50"
    onClick={onClick}
  >
    <MenuIcon className="w-6 h-6 m-auto" />
  </button>
);

const CloseButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <button
    type="button"
    className="z-50 flex w-10 h-10 text-yellow-500 transition-colors rounded-lg cursor-pointer bg-valhalla-50 place-content-center hover:bg-yellow-500 hover:text-valhalla-50"
    onClick={onClick}
  >
    <XIcon className="w-6 h-6 m-auto" />
  </button>
);

const Logo: React.FC = () => (
  <div className="relative w-20 h-20">
    <Image src="/monarch-logo.svg" layout="fill" alt="Monarch logo" />
  </div>
);

const Nav: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full gap-5 p-10">
        <Logo />
        <Transition
          appear={true}
          show={showNavbar}
          enter="transition-all duration-300"
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition-all duration-300"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="translate-x-full opacity-0"
          className="fixed top-0 z-40 flex items-center h-screen right-10 w-fit"
        >
          <div className="h-[90%] bg-valhalla-400 shadow-lg rounded-xl p-4 overflow-y-auto w-80">
            <div className="flex flex-row justify-end">
              <CloseButton onClick={() => setShowNavbar(!showNavbar)} />
            </div>
          </div>
        </Transition>
        <Transition
          appear={true}
          show={!showNavbar}
          enter="transition-all duration-300"
          enterFrom="translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition-all duration-300"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="translate-x-full opacity-0"
        >
          <MenuButton onClick={() => setShowNavbar(!showNavbar)} />
        </Transition>
      </div>
    </>
  );
};

export default Nav;
