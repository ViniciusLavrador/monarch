import { Transition } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  HomeIcon,
  HomeModernIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { useClickOutside, useHotkeys, useWindowScroll } from "@mantine/hooks";
import classNames from "classnames";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Menu, { applyActiveClassnameToContainer, MenuButtonContainer } from "../menu/menu";
import { CloseButton, MenuButton } from "./nav-buttons";
import { BaseNavProps, TransitionProps } from "./types";

const SIMPLE_NAV_TRIGGER_POS = 150;

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="relative w-20 h-20 cursor-pointer">
    <Image src="/monarch-logo.svg" layout="fill" alt="Monarch logo" onClick={onClick} />
  </div>
);

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

const BaseNav: React.FC<BaseNavProps> = ({
  showNavbar,
  drawerRef,
  onDrawerClose,
  onDrawerOpen,
  containerClassName,
}) => {
  const { push, pathname } = useRouter();

  return (
    <div
      className={classNames([
        "container mx-auto flex flex-row items-center justify-between w-full gap-5 py-5 px-5 md:px-0",
        containerClassName,
      ])}
    >
      <Logo onClick={() => push("/")} />
      <BaseNavigationTransition
        show={showNavbar}
        className="fixed top-0 z-40 flex items-center h-screen w-full right-0 md:right-10 md:w-80 "
      >
        <div
          className="h-full md:h-[90%] bg-valhalla-400 shadow-lg rounded-xl p-4 overflow-y-auto w-full flex flex-col"
          ref={drawerRef}
        >
          <div className="flex flex-row justify-end">
            <CloseButton onClick={onDrawerClose} />
          </div>

          {/* Regular Itens */}
          <Menu
            containerProps={{
              className: "pt-8",
            }}
            nav={[
              {
                key: "home-btn",
                component: (
                  <MenuButtonContainer>
                    <HomeIcon className="h-6 w-6 group-hover:animate-pulse" /> In??cio
                  </MenuButtonContainer>
                ),
                buttonProps: {
                  onClick: () => push("/"),
                  className: applyActiveClassnameToContainer(["/"].includes(pathname)),
                },
              },
              {
                key: "/preferences",
                component: (
                  <MenuButtonContainer>
                    <AdjustmentsHorizontalIcon className="h-6 w-6 group-hover:animate-pulse" />{" "}
                    Prefer??ncias
                  </MenuButtonContainer>
                ),
                buttonProps: {
                  onClick: () => push("/preferences"),
                  className: applyActiveClassnameToContainer(["/preferences"].includes(pathname)),
                },
              },
              {
                key: "/properties",
                component: (
                  <MenuButtonContainer>
                    <HomeModernIcon className="h-6 w-6 group-hover:animate-pulse" /> Propriedades
                  </MenuButtonContainer>
                ),
                buttonProps: {
                  onClick: () => push("/properties"),
                  className: applyActiveClassnameToContainer(["/properties"].includes(pathname)),
                },
              },
            ]}
          />

          <div className="grow"></div>

          {/* Bottom Itens */}
          <Menu
            containerProps={{
              className: "pt-4",
            }}
            nav={[
              {
                key: "logout-btn",
                component: (
                  <MenuButtonContainer>
                    <ArrowLeftOnRectangleIcon className="h-6 w-6" /> Sair
                  </MenuButtonContainer>
                ),
                buttonProps: { onClick: () => signOut() },
              },
            ]}
          />
        </div>
      </BaseNavigationTransition>
      <BaseNavigationTransition show={!showNavbar}>
        <MenuButton onClick={onDrawerOpen} />
      </BaseNavigationTransition>
    </div>
  );
};

const FixedNav: React.FC<Omit<BaseNavProps, "containerClassName">> = (props) => (
  <div className="bg-valhalla-700 fixed top-0 w-full z-50">
    <BaseNav containerClassName="py-2" {...props} />
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
      <BaseNav
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
        <FixedNav
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
