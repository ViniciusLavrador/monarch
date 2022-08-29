import { Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { useClickOutside, useHotkeys, useWindowScroll } from "@mantine/hooks";
import Image from "next/image";
import { config } from "node-config-ts";
import { LegacyRef, useState } from "react";

const SIMPLE_NAV_TRIGGER_POS = 150;

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
    className="text-valhalla-50 transition-colors cursor-pointer place-content-center hover:text-yellow-500"
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

type TransitionProps = {
  show?: boolean;
  className?: string;
  appear?: boolean;
};

const BaseNavigationTransition: FCWithChildren<TransitionProps> = ({ children, ...props }) => (
  <Transition
    enter="transition-all duration-300"
    enterFrom="md:translate-x-full md:translate-y-0 translate-y-full opacity-0"
    enterTo="md:translate-x-0 md:translate-y-0 translate-y-0 opacity-100"
    leave="transition-all duration-300"
    leaveFrom="md:translate-x-0 translate-y-0 opacity-100"
    leaveTo="md:translate-x-full md:translate-y-0 translate-y-full opacity-0"
    {...props}
  >
    {children}
  </Transition>
);

const FullNav: React.FC<{
  showNavbar: boolean;
  drawerRef: LegacyRef<HTMLDivElement>;
  onDrawerClose: () => void;
  onDrawerOpen: () => void;
}> = ({ showNavbar, drawerRef, onDrawerClose, onDrawerOpen }) => (
  <div className="container mx-auto flex flex-row items-center justify-between w-full gap-5 py-10 px-5 md:px-0">
    <Logo />
    <BaseNavigationTransition
      show={showNavbar}
      className="fixed top-0 z-40 flex items-center h-screen w-full right-0 md:right-10 md:w-80"
    >
      <div
        className="h-full md:h-[90%] bg-valhalla-400 shadow-lg rounded-xl p-4 overflow-y-auto w-full"
        ref={drawerRef}
      >
        <div className="flex flex-row justify-end">
          <CloseButton onClick={onDrawerClose} />
        </div>
      </div>
    </BaseNavigationTransition>
    <BaseNavigationTransition show={!showNavbar}>
      <MenuButton onClick={onDrawerOpen} />
    </BaseNavigationTransition>
  </div>
);

const SimpleNav: React.FC<{
  showNavbar: boolean;
  drawerRef: LegacyRef<HTMLDivElement>;
  onDrawerClose: () => void;
  onDrawerOpen: () => void;
}> = ({ showNavbar, drawerRef, onDrawerClose, onDrawerOpen }) => (
  <div className="bg-valhalla-700 fixed top-0 w-full">
    <div className="container mx-auto flex flex-row items-center justify-between w-full gap-5 py-2 px-5 md:px-0">
      <Logo />
      <BaseNavigationTransition
        show={showNavbar}
        className="fixed top-0 z-40 flex items-center h-screen w-full right-0 md:right-10 md:w-80"
      >
        <div
          className="h-full md:h-[90%] bg-valhalla-400 shadow-lg rounded-xl p-4 overflow-y-auto w-full"
          ref={drawerRef}
        >
          <div className="flex flex-row justify-end">
            <CloseButton onClick={onDrawerClose} />
          </div>
        </div>
      </BaseNavigationTransition>
      <BaseNavigationTransition show={!showNavbar}>
        <MenuButton onClick={onDrawerOpen} />
      </BaseNavigationTransition>
    </div>
  </div>
);

const Nav: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const drawerRef = useClickOutside(() => setShowNavbar(false));
  const [scroll] = useWindowScroll();
  useHotkeys([["Escape", () => showNavbar && setShowNavbar(false)]]);

  const isOnTop = scroll.y <= SIMPLE_NAV_TRIGGER_POS;

  return (
    <>
      <FullNav
        drawerRef={drawerRef}
        onDrawerClose={() => setShowNavbar(false)}
        onDrawerOpen={() => setShowNavbar(true)}
        showNavbar={showNavbar}
      />

      <Transition
        show={!isOnTop}
        enter="transition-all duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <SimpleNav
          drawerRef={drawerRef}
          onDrawerClose={() => setShowNavbar(false)}
          onDrawerOpen={() => setShowNavbar(true)}
          showNavbar={showNavbar}
        />
      </Transition>
    </>
  );
};

export default Nav;
